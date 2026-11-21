#!/usr/bin/env python3
"""Pack Z-Anatomy meshes into the SpeedMSK region bins.

Reads the cache written by extract.py, resolves map.MAP to real objects and
writes msk/*.bin plus msk/models.json. The format is unchanged from the
BodyParts3D build: per region a 2- or 4-byte index width, per part an int16
position range and an index range.

Z-Anatomy ships decimated triangle meshes. Parts whose triangles are coarse
for their own size get one Loop subdivision step, so the viewer sees a smooth
surface instead of polygon silhouettes. Dense parts keep their authored
triangles; the selection rule keeps the total under twice the previous
20.6 MB. The shared center/scale frame is computed from the unsubdivided
geometry, so markers and camera framing do not move.

Usage: python3 tools/zanatomy/export_regions.py [--report]
"""

import json
import os
import pickle
import re
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CACHE = os.path.join(HERE, '.cache')
sys.path.insert(0, HERE)
import map as source_map  # noqa: E402
import subdivide  # noqa: E402

SOURCES = ('sk', 'mu', 'jo')

# One Loop step for parts whose mean triangle edge is coarser than 4.5 mm, or
# coarser than 1.1% of the part's own bounding-box diagonal (small structures
# are judged at the zoom they are studied at).
COARSE_MM = 4.5
COARSE_REL = 0.011
# Just under twice the 20.6 MB the previous build occupied.
BUDGET_BYTES = 41_000_000


def load_source(key):
    path = os.path.join(CACHE, key + '.pkl')
    if not os.path.exists(path):
        sys.exit(f'missing cache {path}; run tools/zanatomy/extract.py first')
    with open(path, 'rb') as handle:
        return pickle.load(handle)['objects']


def resolve(patterns, libraries):
    """Return the named objects matching these patterns, once each."""
    compiled = [re.compile(pattern) for pattern in patterns]
    hits = []
    seen = set()
    for key, objects in libraries.items():
        for name in objects:
            if name in seen:
                continue
            if any(pattern.fullmatch(name) for pattern in compiled):
                hits.append((key, name))
                seen.add(name)
    return hits


def gather(libraries, region, part):
    patterns = source_map.MAP[region][part]
    hits = resolve(patterns, libraries)
    if not hits:
        return None, []
    positions = []
    indices = []
    objects = []
    for key, name in hits:
        obj = libraries[key][name]
        base = len(positions) // 3
        positions.extend(obj['pos'])
        indices.extend(index + base for index in obj['idx'])
        objects.append((key, name))
    return (positions, indices), objects


def coarseness(positions, indices):
    """Mean triangle edge in millimetres and the part's bounding-box diagonal."""
    points = np.asarray(positions, dtype=np.float64).reshape(-1, 3)
    faces = np.asarray(indices, dtype=np.int64).reshape(-1, 3)
    if not len(faces):
        return 0.0, 0.0
    first = points[faces[:, 0]]
    lengths = np.concatenate((
        np.linalg.norm(points[faces[:, 1]] - first, axis=1),
        np.linalg.norm(points[faces[:, 2]] - points[faces[:, 1]], axis=1),
        np.linalg.norm(first - points[faces[:, 2]], axis=1),
    ))
    diagonal = points.max(axis=0) - points.min(axis=0)
    return float(lengths.mean()), float(np.linalg.norm(diagonal))


def smooth(part):
    edge, diagonal = coarseness(part['pos'], part['idx'])
    if edge <= COARSE_MM and (not diagonal or edge / diagonal <= COARSE_REL):
        return False
    positions, indices = subdivide.subdivide(
        np.asarray(part['pos'], dtype=np.float64),
        np.asarray(part['idx'], dtype=np.int64),
    )
    part['pos'] = positions
    part['idx'] = indices
    return True


def main():
    report = '--report' in sys.argv
    libraries = {key: load_source(key) for key in SOURCES}

    built = {}
    problems = []
    matched_names = {}
    for region, parts in source_map.REGIONS.items():
        built[region] = {}
        for part in parts:
            data, objects = gather(libraries, region, part)
            if data is None:
                problems.append(f'{region}/{part}: no object matches {source_map.MAP[region][part]}')
                continue
            positions, indices = data
            if len(positions) % 3 or len(indices) % 3:
                problems.append(f'{region}/{part}: malformed geometry')
            built[region][part] = {'pos': positions, 'idx': indices}
            for key, name in objects:
                if name in matched_names:
                    problems.append(f'{name} matched twice ({matched_names[name]} and {region}/{part})')
                matched_names[name] = f'{region}/{part}'
            if report:
                print(f'{region:8s} {part:32s} {len(objects):3d} objects '
                      f'{len(positions) // 3:7d} verts {len(indices) // 3:7d} tris')

    if problems:
        for problem in problems:
            print('PROBLEM', problem)
        sys.exit(1)

    # The frame is measured before smoothing so markers, which live in these
    # millimetres, keep their placement and the camera keeps its scale.
    all_points = [value for region in built.values() for part in region.values() for value in part['pos']]
    minimum = [min(all_points[i::3]) for i in range(3)]
    maximum = [max(all_points[i::3]) for i in range(3)]
    center = [(low + high) / 2 for low, high in zip(minimum, maximum)]
    scale = max(high - low for low, high in zip(minimum, maximum)) / 2
    print(f'frame center {[round(value, 3) for value in center]} scale {scale:.3f}')

    smoothed = sum(smooth(part) for region in built.values() for part in region.values())
    print(f'smoothing {smoothed} parts with one Loop step')

    manifest = {'center': center, 'scale': scale, 'regions': {}}
    total_before = 0
    total_after = 0
    for region, parts in built.items():
        index_bytes = 2 if all(len(part['pos']) // 3 <= 65535 for part in parts.values()) else 4
        out = bytearray()
        meta_parts = {}
        for part_id, part in parts.items():
            positions = np.asarray(part['pos'], dtype=np.float64).reshape(-1, 3)
            indices = np.asarray(part['idx'], dtype=np.int64).reshape(-1)
            quantised = np.clip(
                np.rint((positions - np.asarray(center)) / scale * 32767),
                -32767, 32767,
            ).astype('<i2')
            offset = len(out)
            out += quantised.tobytes()
            if len(out) % 4:
                out += b'\0' * (4 - len(out) % 4)
            index_offset = len(out)
            out += indices.astype('<u2' if index_bytes == 2 else '<u4').tobytes()
            meta_parts[part_id] = {'p': [offset, int(quantised.size)], 'i': [index_offset, int(indices.size)]}
        path = os.path.join(ROOT, 'msk', region + '.bin')
        before = os.path.getsize(path) if os.path.exists(path) else 0
        with open(path, 'wb') as handle:
            handle.write(out)
        total_before += before
        total_after += len(out)
        manifest['regions'][region] = {
            'file': region + '.bin', 'indexBytes': index_bytes,
            'parts': meta_parts, 'bytes': len(out),
        }
        vertices = sum(part['p'][1] // 3 for part in meta_parts.values())
        triangles = sum(part['i'][1] // 3 for part in meta_parts.values())
        print(f'{region:8s} {len(parts):2d} parts {vertices:8d} verts {triangles:8d} tris '
              f'{before / 1048576:5.2f} -> {len(out) / 1048576:5.2f} MB indexBytes={index_bytes}')

    manifest_path = os.path.join(ROOT, 'msk', 'models.json')
    with open(manifest_path, 'w', encoding='utf-8') as handle:
        json.dump(manifest, handle)
    print(f'total {total_before / 1048576:.2f} -> {total_after / 1048576:.2f} MB, '
          f'{sum(len(region) for region in built.values())} parts, {smoothed} smoothed')
    print(f'manifest {os.path.relpath(manifest_path, ROOT)}')
    if total_after > BUDGET_BYTES:
        sys.exit(f'over budget: {total_after / 1048576:.2f} MB > {BUDGET_BYTES / 1048576:.2f} MB')


if __name__ == '__main__':
    main()
