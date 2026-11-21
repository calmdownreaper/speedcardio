#!/usr/bin/env python3
"""Pack Z-Anatomy meshes into the SpeedMSK region bins.

Reads the cache written by extract.py, resolves map.MAP to real objects,
quantises every vertex into the shared int16 frame, and writes msk/*.bin plus
msk/models.json. The format is unchanged from the BodyParts3D build: per region
a 2- or 4-byte index width, per part an int16 position range and an index
range.

Usage: python3 tools/zanatomy/export_regions.py [--report]
"""

import json
import os
import pickle
import re
import struct
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CACHE = os.path.join(HERE, '.cache')
sys.path.insert(0, HERE)
import map as source_map  # noqa: E402

SOURCES = ('sk', 'mu', 'jo')


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

    all_points = [value for region in built.values() for part in region.values() for value in part['pos']]
    minimum = [min(all_points[i::3]) for i in range(3)]
    maximum = [max(all_points[i::3]) for i in range(3)]
    center = [(low + high) / 2 for low, high in zip(minimum, maximum)]
    scale = max(high - low for low, high in zip(minimum, maximum)) / 2
    print(f'frame center {[round(value, 3) for value in center]} scale {scale:.3f}')

    manifest = {'center': center, 'scale': scale, 'regions': {}}
    for region, parts in built.items():
        index_bytes = 2 if all(len(part['pos']) // 3 <= 65535 for part in parts.values()) else 4
        out = bytearray()
        meta_parts = {}
        for part_id, part in parts.items():
            quantised = [
                max(-32767, min(32767, round((value - center[i % 3]) / scale * 32767)))
                for i, value in enumerate(part['pos'])
            ]
            offset = len(out)
            out += struct.pack('<%dh' % len(quantised), *quantised)
            if len(out) % 4:
                out += b'\0' * (4 - len(out) % 4)
            index_offset = len(out)
            out += struct.pack('<%d%s' % (len(part['idx']), 'H' if index_bytes == 2 else 'I'), *part['idx'])
            meta_parts[part_id] = {'p': [offset, len(quantised)], 'i': [index_offset, len(part['idx'])]}
        path = os.path.join(ROOT, 'msk', region + '.bin')
        with open(path, 'wb') as handle:
            handle.write(out)
        manifest['regions'][region] = {
            'file': region + '.bin', 'indexBytes': index_bytes,
            'parts': meta_parts, 'bytes': len(out),
        }
        vertices = sum(len(part['pos']) // 3 for part in parts.values())
        triangles = sum(len(part['idx']) // 3 for part in parts.values())
        print(f'{region:8s} {len(parts):2d} parts {vertices:8d} verts {triangles:8d} tris '
              f'{len(out) / 1048576:6.2f} MB indexBytes={index_bytes}')

    manifest_path = os.path.join(ROOT, 'msk', 'models.json')
    with open(manifest_path, 'w', encoding='utf-8') as handle:
        json.dump(manifest, handle)
    total = sum(info['bytes'] for info in manifest['regions'].values())
    print(f'total {total / 1048576:.2f} MB, {sum(len(region) for region in built.values())} parts')
    print(f'manifest {os.path.relpath(manifest_path, ROOT)}')


if __name__ == '__main__':
    main()
