#!/usr/bin/env python3
"""Freeze the pre-migration marker inputs for the Z-Anatomy rebuild.

`emit_markers.py` needs three immutable things: the BodyParts3D marker
coordinates, the anchor bones/view for each surviving marker, and the old
anchor bounding boxes in the old millimetre frame. The bins and marker modules
are replaced by the migration, so this script records them once in
`original.json` (committed). Rebuilds read that snapshot and are idempotent.

The baseline is the last BodyParts3D commit. If the repository is rebased, set
BASELINE explicitly or pass the commit as argv[1].

Usage: python3 tools/zanatomy/snapshot_original.py [commit]
"""

import json
import os
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
CACHE = os.path.join(HERE, '.cache')
BASELINE = 'b26781e'
sys.path.insert(0, HERE)
import map as source_map  # noqa: E402


def show(commit, path):
    return subprocess.run(
        ['git', 'show', f'{commit}:{path}'],
        cwd=ROOT, check=True, capture_output=True, text=True,
    ).stdout


def parse_markers(source):
    match = re.search(r'export const markers = \{(.*?)\n\};', source, re.S)
    markers = {}
    for line in (match.group(1) if match else '').splitlines():
        found = re.match(r'\s*([a-z0-9_]+): (\[.*?\]),?\s*$', line)
        if found:
            markers[found.group(1)] = json.loads(found.group(2))
    return markers


def parse_meta(source):
    match = re.search(r'export const markerMeta = \{(.*?)\n\};', source, re.S)
    text = match.group(1) if match else ''
    entries = {}
    index = 0
    while True:
        found = re.search(r'([a-z0-9_]+): \{', text[index:])
        if not found:
            break
        cursor = index + found.end()
        depth = 1
        while cursor < len(text) and depth:
            if text[cursor] == '{':
                depth += 1
            elif text[cursor] == '}':
                depth -= 1
            cursor += 1
        body = text[index + found.end():cursor - 1]
        anchors = re.search(r'anchors: \[(.*?)\]', body, re.S)
        view = re.search(r"view: '(\w+)'", body)
        entries[found.group(1)] = {
            'anchors': re.findall(r"'([a-z0-9_]+)'", anchors.group(1)) if anchors else [],
            'view': view.group(1) if view else 'ant',
        }
        index = cursor
    return entries


def old_bounds(manifest):
    """id -> (low, high) from the frozen BodyParts3D bins."""
    boxes = {}
    buffers = {}
    for region, info in manifest['regions'].items():
        if info['file'] not in buffers:
            with open(os.path.join(CACHE, 'old', info['file']), 'rb') as handle:
                buffers[info['file']] = handle.read()
        buffer = buffers[info['file']]
        for part, meta in info['parts'].items():
            start, length = meta['p']
            values = memoryview(buffer)[start:start + length * 2].cast('h')
            low = [1e18] * 3
            high = [-1e18] * 3
            for index in range(0, len(values), 3):
                for axis in range(3):
                    value = values[index + axis] / 32767 * manifest['scale'] + manifest['center'][axis]
                    low[axis] = min(low[axis], value)
                    high[axis] = max(high[axis], value)
            boxes[part] = (low, high)
    return boxes


def main():
    commit = sys.argv[1] if len(sys.argv) > 1 else BASELINE
    with open(os.path.join(CACHE, 'old', 'models.json'), encoding='utf-8') as handle:
        manifest = json.load(handle)
    boxes = old_bounds(manifest)

    snapshot = {'baseline': commit, 'markers': {}, 'markerMeta': {}, 'anchorBoxes': {}}
    for region, keep in source_map.MARKERS.items():
        old_source = show(commit, f'subjects/msk/regions/{region}.js')
        original = parse_markers(old_source)
        current = open(os.path.join(ROOT, 'subjects', 'msk', 'regions', region + '.js'), encoding='utf-8').read()
        meta = parse_meta(current)
        snapshot['markers'][region] = {}
        snapshot['markerMeta'][region] = {}
        snapshot['anchorBoxes'][region] = {}
        for marker_id in keep:
            if marker_id not in original:
                sys.exit(f'{region}: original marker {marker_id} missing in {commit}')
            if marker_id not in meta:
                sys.exit(f'{region}: anchor metadata for {marker_id} missing')
            anchors = meta[marker_id]['anchors']
            snapshot['markers'][region][marker_id] = original[marker_id]
            snapshot['markerMeta'][region][marker_id] = meta[marker_id]
            snapshot['anchorBoxes'][region][marker_id] = {
                'anchors': anchors,
                'low': [min(boxes[anchor][0][axis] for anchor in anchors) for axis in range(3)],
                'high': [max(boxes[anchor][1][axis] for anchor in anchors) for axis in range(3)],
            }
    path = os.path.join(HERE, 'original.json')
    with open(path, 'w', encoding='utf-8') as handle:
        json.dump(snapshot, handle, indent=1)
    print(f'wrote {path} from {commit}: '
          f'{sum(len(region) for region in snapshot["markers"].values())} markers')


if __name__ == '__main__':
    main()
