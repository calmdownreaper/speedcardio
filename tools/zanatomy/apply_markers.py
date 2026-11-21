#!/usr/bin/env python3
"""Rewrite the region files' marker tables from tools/zanatomy/markers.json.

The surviving markers and their anchor/view metadata come from the frozen
`original.json` snapshot, so rerunning does not depend on the current region
file contents. Regions with no markers (upper limb) are left alone.
"""

import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
import map as source_map  # noqa: E402

REGION_DIR = os.path.join(ROOT, 'subjects', 'msk', 'regions')


def main():
    with open(os.path.join(HERE, 'markers.json'), encoding='utf-8') as handle:
        markers = json.load(handle)
    with open(os.path.join(HERE, 'original.json'), encoding='utf-8') as handle:
        original = json.load(handle)

    for region, keep in source_map.MARKERS.items():
        path = os.path.join(REGION_DIR, region + '.js')
        with open(path, encoding='utf-8') as handle:
            source = handle.read()
        if not keep:
            print(f'{region:8s} no markers, table untouched')
            continue
        meta = original['markerMeta'][region]

        lines = ['export const markers = {']
        for marker_id in keep:
            text = json.dumps(markers[region][marker_id], separators=(', ', ': '))
            lines.append(f'  {marker_id}: {text},')
        lines.append('};')
        markers_block = '\n'.join(lines)

        lines = ['// Anchor bones for each point marker and the view that shows it best.',
                 'export const markerMeta = {']
        for marker_id in keep:
            item = meta[marker_id]
            anchors = ', '.join(f"'{anchor}'" for anchor in item['anchors'])
            text = f"  {marker_id}: {{ anchors: [{anchors}], view: '{item['view']}' }},"
            if len(text) > 108:
                lines.append(f'  {marker_id}: {{')
                lines.append(f"    anchors: [{anchors}], view: '{item['view']}',")
                lines.append('  },')
            else:
                lines.append(text)
        lines.append('};')
        meta_block = '\n'.join(lines)

        source = re.sub(r'export const markers = \{.*?\n\};', markers_block, source, count=1, flags=re.S)
        source = re.sub(r'// Anchor bones for each point marker and the view that shows it best\.\nexport const markerMeta = \{.*?\n\};',
                        meta_block, source, count=1, flags=re.S)
        with open(path, 'w', encoding='utf-8') as handle:
            handle.write(source)
        print(f'{region:8s} {len(keep)} markers written')


if __name__ == '__main__':
    main()
