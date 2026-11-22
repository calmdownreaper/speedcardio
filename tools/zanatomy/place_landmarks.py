#!/usr/bin/env python3
"""Move point landmarks onto their real anatomical spot, from the geometry.

emit_markers.py carried the old BodyParts3D points over by bounding-box
mapping, which can land several millimetres (or centimetres) off the
structure. This pass replaces those guesses with positions derived from the
Z-Anatomy meshes themselves:

* joints  -> the contact zone between the two articulating bones (the
  vertices of one bone within a few mm of the other), taking the contact
  cluster nearest the previous guess and snapping onto the bone surface;
* sutural points -> where the named bones meet (bregma, nasion, pterion);
* annotated points -> the end of the Z-Anatomy callout strip that touches
  bone (the other end floats at the label);
* patellar ligament -> midway between its origin and insertion patches.

Reads and rewrites markers.json in place, then run apply_markers.py.
Run with `python3 -I tools/zanatomy/place_landmarks.py`.
"""

import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import export_regions  # noqa: E402
import map as source_map  # noqa: E402

LIB = {key: export_regions.load_source(key) for key in export_regions.SOURCES}
SK = LIB['sk']


def obj(name, key='sk'):
    return np.asarray(LIB[key][name]['pos'], dtype=np.float64).reshape(-1, 3)


_parts = {}


def part(region, name):
    if (region, name) not in _parts:
        data, _ = export_regions.gather(LIB, region, name)
        _parts[(region, name)] = np.asarray(data[0], dtype=np.float64).reshape(-1, 3)
    return _parts[(region, name)]


def nearest_distance(points, cloud, chunk=2048):
    """Distance from each point to its nearest neighbour in cloud."""
    out = np.empty(len(points))
    for start in range(0, len(points), chunk):
        block = points[start:start + chunk]
        best = np.full(len(block), np.inf)
        for inner in range(0, len(cloud), 8192):
            c = cloud[inner:inner + 8192]
            d = ((block[:, None, :] - c[None, :, :]) ** 2).sum(-1).min(1)
            best = np.minimum(best, d)
        out[start:start + chunk] = np.sqrt(best)
    return out


def snap(point, cloud):
    i = int(((cloud - point) ** 2).sum(1).argmin())
    return cloud[i]


def near(cloud, point, radius):
    return cloud[((cloud - point) ** 2).sum(1) < radius ** 2]


def contact(a, b, guess, limit=3.0, window=40.0, cluster=8.0):
    """Centre of the a/b contact zone nearest the guess, on a's surface."""
    a_local = near(a, guess, window)
    b_local = near(b, guess, window + limit)
    if not len(a_local) or not len(b_local):
        return None
    d = nearest_distance(a_local, b_local)
    for lim in (limit, limit * 2, limit * 4):
        touching = a_local[d < lim]
        if len(touching):
            break
    else:
        return None
    seed = touching[((touching - guess) ** 2).sum(1).argmin()]
    group = near(touching, seed, cluster)
    return snap(group.mean(0), a_local)


def strip_tip(name, bone):
    """The end of a callout strip that sits on bone."""
    p = obj(name)
    c = p.mean(0)
    axis = np.linalg.svd(p - c)[2][0]
    t = (p - c) @ axis
    span = t.max() - t.min()
    ends = [p[t < t.min() + .3 * span].mean(0), p[t > t.max() - .3 * span].mean(0)]
    return min(ends, key=lambda e: nearest_distance(e[None], bone)[0])


def bilateral(fn, previous):
    """Apply fn per side, keeping the previous left/right order."""
    return [fn(np.asarray(point, dtype=np.float64)) for point in previous]


def r(point):
    return [round(float(v), 1) for v in point]


def main():
    path = os.path.join(HERE, 'markers.json')
    with open(path, encoding='utf-8') as handle:
        markers = json.load(handle)
    report = []

    def put(region, marker_id, value):
        old = markers[region][marker_id]
        markers[region][marker_id] = value
        pairs = zip(old, value) if isinstance(old[0], list) else [(old, value)]
        moved = max(float(np.linalg.norm(np.subtract(a, b))) for a, b in pairs)
        report.append(f'{region:8s} {marker_id:30s} moved {moved:5.1f} mm')

    # --- skull -----------------------------------------------------------
    frontal = obj('Frontal bone')
    parietal = np.vstack([obj('Parietal bone.r'), obj('Parietal bone.l')])
    sphenoid = obj('Sphenoid bone')
    temporal = {1: None, -1: None}
    nasal = np.vstack([obj('Nasal bone.r'), obj('Nasal bone.l')])
    skull = np.vstack([part('skull', p) for p in source_map.REGIONS['skull']])

    fp = frontal[nearest_distance(frontal, parietal) < 3]
    top = fp[np.abs(fp[:, 0]) < 6]
    put('skull', 'bregma', r(top[top[:, 2].argmax()]))

    fn = frontal[nearest_distance(frontal, nasal) < 3]
    mid = fn[np.abs(fn[:, 0]) < 3]
    nasion = mid[mid[:, 2].argmax()] if len(mid) else fn[np.abs(fn[:, 0]).argmin()]
    put('skull', 'nasion', r(nasion))

    temporal_all = {
        side: obj(name) for side, name in ((-1, 'Temporal bone.r'), (1, 'Temporal bone.l'))}
    parietal_side = {-1: obj('Parietal bone.r'), 1: obj('Parietal bone.l')}

    def pterion(prev):
        side = 1 if prev[0] > 0 else -1
        cand = sphenoid[sphenoid[:, 0] * side > 30]
        score = np.maximum.reduce([
            nearest_distance(cand, frontal),
            nearest_distance(cand, parietal_side[side]),
            nearest_distance(cand, temporal_all[side]),
        ])
        return r(cand[score.argmin()])
    put('skull', 'pterion', bilateral(pterion, markers['skull']['pterion']))

    for marker_id, name in (('glabella', 'Glabella.j'),
                            ('inion', 'External occipital protuberance.j')):
        put('skull', marker_id, r(snap(strip_tip(name, skull), skull)))

    # Superior orbital fissure: the gap between the lesser and greater wings,
    # lateral to and just below the orbital opening of the optic canal.
    def sof(prev):
        side = 1 if prev[0] > 0 else -1
        optic = np.asarray(markers['skull']['optic_canal'][0 if markers['skull']['optic_canal'][0][0] * side > 0 else 1])
        guess = optic + np.array([side * 9.0, 2.0, -7.0])
        return r(snap(guess, sphenoid))
    put('skull', 'superior_orbital_fissure', bilateral(sof, markers['skull']['superior_orbital_fissure']))

    # Every other skull point: make sure it sits on bone.
    put('skull', 'internal_acoustic_meatus',
        bilateral(lambda p: r(snap(p, skull)), markers['skull']['internal_acoustic_meatus']))
    # Infraorbital foramen: on the maxilla's anterior face, below the orbit's
    # midline (not on the nasal side), so search lateral maxilla only.
    maxilla = part('skull', 'maxilla')

    def infraorbital(prev):
        side = 1 if prev[0] > 0 else -1
        cand = maxilla[(maxilla[:, 0] * side > 20) & (maxilla[:, 0] * side < 30)]
        cand = cand[np.abs(cand[:, 2] - prev[2]) < 4]
        return r(cand[cand[:, 1].argmin()])
    put('skull', 'infraorbital_foramen', bilateral(infraorbital, markers['skull']['infraorbital_foramen']))

    # --- joints ------------------------------------------------------------
    joints = {
        ('spine', 'atlantooccipital_joint'): (('skull', 'occipital'), ('spine', 'atlas')),
        ('spine', 'atlantoaxial_joint'): (('spine', 'atlas'), ('spine', 'axis')),
        ('thorax', 'costovertebral_joint'): (('thorax', 'ribs'), ('spine', 'thoracic_vertebra')),
        ('thorax', 'costotransverse_joint'): (('thorax', 'ribs'), ('spine', 'thoracic_vertebra')),
        ('thorax', 'costochondral_joint'): (('thorax', 'ribs'), ('thorax', 'costal_cartilages')),
        ('thorax', 'sternocostal_joint'): (('thorax', 'costal_cartilages'), ('thorax', 'sternum')),
        ('pelvis', 'sacroiliac_joint'): (('pelvis', 'hip_bone'), ('spine', 'sacrum')),
        ('lower', 'ankle_joint'): (('lower', 'tibia'), ('lower', 'tarsal_bones')),
    }
    for (region, marker_id), (a, b) in joints.items():
        A, B = part(*a), part(*b)
        prev = markers[region][marker_id]

        def at(point, A=A, B=B):
            hit = contact(A, B, point)
            if hit is None:
                sys.exit(f'no contact for {region}/{marker_id} near {point}')
            return r(hit)
        put(region, marker_id, bilateral(at, prev) if isinstance(prev[0], list) else at(np.asarray(prev)))

    body = obj('Body of sternum')
    put('thorax', 'manubriosternal_joint', r(contact(body, obj('Manubrium of sternum'),
                                                     np.asarray(markers['thorax']['manubriosternal_joint']), window=80)))
    xs = contact(body, obj('Xiphoid process'), np.asarray(markers['thorax']['xiphisternal_joint']), window=80)
    front = body[(np.abs(body[:, 0]) < 2) & (np.abs(body[:, 2] - xs[2]) < 3)]
    put('thorax', 'xiphisternal_joint', r(front[front[:, 1].argmin()]))

    # --- patellar ligament ---------------------------------------------------
    def ligament(prev):
        tag = 'r' if prev[0] < 0 else 'l'
        o = obj(f'Patellar ligament.o{tag}').mean(0)
        e = obj(f'Patellar ligament.e{tag}').mean(0)
        return r((o + e) / 2)
    put('lower', 'patellar_ligament', bilateral(ligament, markers['lower']['patellar_ligament']))

    with open(path, 'w', encoding='utf-8') as handle:
        json.dump(markers, handle, indent=1)
    print('\n'.join(report))
    print(f'wrote {path}')


if __name__ == '__main__':
    main()
