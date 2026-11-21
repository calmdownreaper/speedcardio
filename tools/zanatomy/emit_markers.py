#!/usr/bin/env python3
"""Recompute the surviving point markers in the Z-Anatomy frame.

BodyParts3D markers are hand-placed in the old millimetre frame. Two sources
put them back on the new anatomy:

* Z-Anatomy ships thin annotation strips (`.j` / `.i` objects) for many skull
  landmarks. Those carry the exact new position; a strip's two ends are the
  label and the anatomical point, so we keep the end closest to the local
  bbox-mapped marker.
* Everywhere else we map the old point through the local bounding box of its
  anchor bones (frozen in original.json) and, when it is already within 10 mm
  of the surface, snap it to the nearest anchor vertex. Markers in NO_SNAP are
  never snapped.

Reads `original.json`, never the current marker modules, so reruns are
idempotent. Writes `markers.json`; apply_markers.py rewrites the region files.
"""

import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
sys.path.insert(0, HERE)
import map as source_map  # noqa: E402
import export_regions  # noqa: E402

# Skull landmarks that Z-Anatomy annotates with a thin strip. The strip is a
# callout: one end is the label, the other is the structure.
ANNOTATIONS = {
    'glabella': ('Glabella.j', False),
    'inion': ('External occipital protuberance.j', False),
    'mastoid_process': (('Mastoid process.i', 'Mastoid process.j'), True),
    'foramen_magnum': ('Foramen magnum.j', False),
    'foramen_ovale': ('Foramen ovale.j', True),
    'foramen_rotundum': ('Foramen rotundum.j', True),
    'foramen_spinosum': ('Foramen spinosum.j', True),
    'jugular_foramen': ('Jugular notch of occipital bone.j', True),
    'optic_canal': ('Optic canal.j', True),
    'mental_foramen': ('Mental foramen.j', True),
}

SNAP_LIMIT = 10.0
SNAP_ALWAYS = {'xiphisternal_joint'}


def new_geometry(built):
    """id -> (low, high, vertices) in new millimetres."""
    parts = {}
    for region, region_parts in built.items():
        for part, (positions, _) in region_parts.items():
            low = [min(positions[i::3]) for i in range(3)]
            high = [max(positions[i::3]) for i in range(3)]
            vertices = [(positions[i], positions[i + 1], positions[i + 2]) for i in range(0, len(positions), 3)]
            parts[part] = (low, high, vertices)
    return parts


def map_point(point, old_low, old_high, new_low, new_high):
    result = []
    for axis in range(3):
        old_extent = old_high[axis] - old_low[axis]
        new_extent = new_high[axis] - new_low[axis]
        fraction = (point[axis] - old_low[axis]) / old_extent if old_extent > 1e-6 else .5
        result.append(new_low[axis] + fraction * new_extent)
    return result


def nearest(vertices, point):
    best, best_distance = None, 1e18
    for vertex in vertices:
        distance = ((vertex[0] - point[0]) ** 2 + (vertex[1] - point[1]) ** 2
                    + (vertex[2] - point[2]) ** 2)
        if distance < best_distance:
            best_distance, best = distance, vertex
    return best, best_distance ** .5


def strip_ends(source, name):
    """The two ends of an annotation strip: midpoints of its bbox extremes."""
    positions = source[name]['pos']
    low = [min(positions[i::3]) for i in range(3)]
    high = [max(positions[i::3]) for i in range(3)]
    axis = max(range(3), key=lambda i: high[i] - low[i])
    ends = []
    for value in (low[axis], high[axis]):
        point = [(low[i] + high[i]) / 2 for i in range(3)]
        point[axis] = value
        ends.append(point)
    return ends


def main():
    with open(os.path.join(HERE, 'original.json'), encoding='utf-8') as handle:
        original = json.load(handle)
    libraries = {key: export_regions.load_source(key) for key in export_regions.SOURCES}
    built = {}
    for region, parts in source_map.REGIONS.items():
        built[region] = {}
        for part in parts:
            data, _ = export_regions.gather(libraries, region, part)
            if data is None:
                sys.exit(f'missing new geometry for {region}/{part}')
            built[region][part] = data
    new = new_geometry(built)

    out = {}
    for region, keep in source_map.MARKERS.items():
        out[region] = {}
        print(f'\n{region}')
        for marker_id in keep:
            planning = original['anchorBoxes'][region][marker_id]
            anchors = planning['anchors']
            old_low, old_high = planning['low'], planning['high']
            new_low = [min(new[part][0][axis] for part in anchors) for axis in range(3)]
            new_high = [max(new[part][1][axis] for part in anchors) for axis in range(3)]
            vertices = [vertex for part in anchors for vertex in new[part][2]]

            raw = original['markers'][region][marker_id]
            bilateral = isinstance(raw[0], list)
            points = raw if bilateral else [raw]
            mapped = [map_point(point, old_low, old_high, new_low, new_high) for point in points]

            if marker_id in ANNOTATIONS:
                names, mirror = ANNOTATIONS[marker_id]
                names = (names,) if isinstance(names, str) else names
                ends = []
                for name in names:
                    if name not in libraries['sk']:
                        sys.exit(f'annotation {name} missing from skeletal cache')
                    pair = strip_ends(libraries['sk'], name)
                    target = mapped[0] if not mirror else [abs(value) if i == 0 else value
                                                          for i, value in enumerate(mapped[0])]
                    near, _ = nearest([tuple(end) for end in pair], target)
                    ends.append([round(value, 1) for value in near])
                if mirror:
                    ends = [[abs(point[0]) if len(names) == 1 else point[0]] + point[1:] for point in ends]
                    if len(ends) == 1:
                        ends = [ends[0], [-ends[0][0], ends[0][1], ends[0][2]]]
                    ends.sort(key=lambda point: point[0])
                moved = ends
                note = ' annotation'
            else:
                moved = []
                for point in mapped:
                    target = list(point)
                    note = ''
                    if marker_id not in source_map.NO_SNAP:
                        best, distance = nearest(vertices, target)
                        if marker_id in SNAP_ALWAYS or distance <= SNAP_LIMIT:
                            target = list(best)
                            note = f' snapped {distance:.1f}mm'
                    moved.append([round(value, 1) for value in target])
                if not bilateral:
                    moved = moved[0]

            if not bilateral and isinstance(moved, list) and moved and isinstance(moved[0], list):
                moved = moved[0]
            out[region][marker_id] = moved
            print(f'  {marker_id:32s} -> {moved}{note}')

    path = os.path.join(HERE, 'markers.json')
    with open(path, 'w', encoding='utf-8') as handle:
        json.dump(out, handle, indent=1)
    print(f'\nwrote {path}')


if __name__ == '__main__':
    main()
