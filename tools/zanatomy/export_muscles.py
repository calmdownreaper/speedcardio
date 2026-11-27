#!/usr/bin/env python3
"""Append the cached Z-Anatomy muscular system to the SpeedMSK manifest.

Run with python3 tools/zanatomy/export_muscles.py. The extract.py cache
already stores positions in SpeedMSK millimetres.
"""

import json
import pickle
import re
from pathlib import Path

import numpy as np


HERE = Path(__file__).resolve().parent
MSK = HERE.parents[1] / 'msk'
REGION = 'muscles'
BUDGET_BYTES = 12_000_000
SMALL_MESH_VERTICES = 2_000
NAME_SUFFIX = re.compile(
    r'(?:(?:\.[lr]|\s*\((?:left|right)\)|\s+(?:left|right)|\.\d{3})\s*)+$',
    re.IGNORECASE,
)


def source_name(name):
    return NAME_SUFFIX.sub('', name.strip()).strip()


def part_id(name):
    return re.sub(r'[^a-z0-9]+', '_', name.lower()).strip('_')


def simplify(points, faces, cell_mm):
    """Cluster nearby vertices, retaining the winding of surviving faces."""
    cells = np.floor((points - points.min(axis=0)) / cell_mm).astype(np.int32)
    _, cell = np.unique(cells, axis=0, return_inverse=True)
    cell = cell.ravel()
    counts = np.bincount(cell)
    positions = np.column_stack([
        np.bincount(cell, weights=axis) / counts for axis in points.T
    ])
    faces = cell[faces]
    a, b, c = faces.T
    faces = faces[(a != b) & (b != c) & (c != a)]
    if not len(faces):
        raise ValueError('Simplification removed a complete mesh')
    _, first = np.unique(np.sort(faces, axis=1), axis=0, return_index=True)
    used, remapped = np.unique(faces[np.sort(first)], return_inverse=True)
    return positions[used], remapped.reshape(-1, 3)


def pack(parts, center, scale, cell_mm):
    geometries = {}
    simplified = 0
    for key, objects in parts.items():
        vertices, triangles = [], []
        base = 0
        for points, faces in objects:
            if cell_mm and len(points) > SMALL_MESH_VERTICES:
                diagonal = np.linalg.norm(np.ptp(points, axis=0))
                points, faces = simplify(points, faces, min(cell_mm, .05 * diagonal))
                simplified += 1
            vertices.append(points)
            triangles.append(faces + base)
            base += len(points)
        geometries[key] = (np.concatenate(vertices), np.concatenate(triangles))

    index_bytes = 2 if all(len(p) <= 65536 for p, _ in geometries.values()) else 4
    out = bytearray()
    registry = {}
    for key, (points, faces) in geometries.items():
        # A few extremal points lie just outside the legacy frame. Use the
        # existing pack's saturation rule to keep alignment with its meshes.
        quantised = np.clip(np.rint((points - center) / scale * 32767),
                            -32767, 32767).astype('<i2')
        pos_offset = len(out)
        out.extend(quantised.tobytes())
        out.extend(b'\0' * (-len(out) % 4))
        index_offset = len(out)
        out.extend(faces.astype('<u2' if index_bytes == 2 else '<u4').tobytes())
        registry[key] = {'p': [pos_offset, points.size], 'i': [index_offset, faces.size]}
    return out, registry, index_bytes, simplified


def main():
    manifest_path = MSK / 'models.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    existing = {key for region, info in manifest['regions'].items() if region != REGION
                for key in info['parts']}
    with (HERE / '.cache' / 'mu.pkl').open('rb') as cache:
        objects = pickle.load(cache)['objects']

    parts = {}
    names = {}
    skipped = set()
    for original, geometry in sorted(objects.items()):
        name = source_name(original)
        key = part_id(name)
        if not key:
            raise ValueError(f'Invalid source name: {original!r}')
        if key in existing:
            skipped.add(key)
            continue
        points = np.asarray(geometry['pos'], dtype=np.float64).reshape(-1, 3)
        faces = np.asarray(geometry['idx'], dtype=np.int64).reshape(-1, 3)
        parts.setdefault(key, []).append((points, faces))
        names.setdefault(key, name)

    parts = dict(sorted(parts.items()))
    center = np.asarray(manifest['center'])
    scale = manifest['scale']
    for cell_mm in (0, 2, 3, 3.25, 3.5, 3.75, 4, 4.5, 5):
        out, registry, index_bytes, simplified = pack(parts, center, scale, cell_mm)
        if len(out) <= BUDGET_BYTES:
            break
    else:
        raise SystemExit(f'Muscle pack exceeds {BUDGET_BYTES:,} bytes')

    filename = REGION + '.bin'
    manifest['regions'][REGION] = {
        'file': filename, 'indexBytes': index_bytes, 'parts': registry, 'bytes': len(out),
    }
    catalog = [{'id': key, 'name': names[key]} for key in parts]
    (MSK / filename).write_bytes(out)
    (MSK / 'muscle-ids.json').write_text(
        json.dumps(catalog, ensure_ascii=False, indent=2) + '\n', encoding='utf-8',
    )
    manifest_path.write_text(json.dumps(manifest, separators=(',', ':')), encoding='utf-8')
    print(f'{len(parts)} parts, {len(out):,} bytes, '
          f'{simplified} source meshes simplified on a {cell_mm:g} mm grid')
    print(f'Skipped {len(skipped)} existing ids: {", ".join(sorted(skipped))}')


if __name__ == '__main__':
    main()
