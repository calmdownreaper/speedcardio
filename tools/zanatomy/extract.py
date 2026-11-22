#!/usr/bin/env python3
"""Parse the Z-Anatomy FBX exports into a compact, reusable cache.

The cache stores every named object as flat float positions already converted
to SpeedMSK's frame (millimetres, z up, anterior -y, right -x) plus triangle
indices, wound so the surface points out of the bone. Parsing the three
9-40 MB FBX files takes seconds; exporting regions from the cache takes
seconds.

Usage: python3 tools/zanatomy/extract.py [--force]
"""

import os
import pickle
import re
import sys
import time
from array import array

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, '.cache')
SCRATCH = ('/private/tmp/claude-501/-Users-joaolutz-projeto-anatomia/'
           '91f0d3cd-a4c8-41a4-afa5-92ff552c939d/scratchpad')
SOURCES = {
    'sk': os.path.expanduser('~/Downloads/SkeletalSystem100.fbx'),
    'mu': os.path.expanduser('~/Downloads/MuscularSystem100.fbx'),
    'jo': os.path.join(SCRATCH, 'zdl', 'Joints100.fbx'),
    'cv': os.path.expanduser('~/Downloads/CardioVascular41.fbx'),
    'vi': os.path.expanduser('~/Downloads/VisceralSystem100.fbx'),
}

# FBX is Y up, +Z anterior, +X left. SpeedMSK is Z up, -Y anterior, -X right.
FRAME = ((10.0, 0.0, 0.0), (0.0, 0.0, -10.0), (0.0, 10.0, 0.0))


def mm(value):
    return round(value * 10.0, 3)


def compose(ns, model_id):
    """Return (R, T) mapping this model's raw vertices to the FBX world."""
    P, mod, par, matrix = ns['P'], ns['mod'], ns['par'], ns['M']
    R = [[1.0, 0.0, 0.0], [0.0, 1.0, 0.0], [0.0, 0.0, 1.0]]
    T = [0.0, 0.0, 0.0]
    node = model_id
    while node in mod:
        local_r, local_t = matrix(P.get(node, {}))
        R = [[sum(local_r[i][k] * R[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
        T = [sum(local_r[i][k] * T[k] for k in range(3)) + local_t[i] for i in range(3)]
        node = par.get(node)
    # Convert to millimetres and SpeedMSK axes.
    R = [[sum(FRAME[i][k] * R[k][j] for k in range(3)) for j in range(3)] for i in range(3)]
    T = [sum(FRAME[i][k] * T[k] for k in range(3)) for i in range(3)]
    return R, T


def triangulate(polygon_index):
    triangles = array('I')
    fan = []
    for value in polygon_index:
        if value < 0:
            fan.append(~value)
            for j in range(1, len(fan) - 1):
                triangles.extend((fan[0], fan[j], fan[j + 1]))
            fan = []
        else:
            fan.append(value)
    return triangles


def determinant(R):
    return (R[0][0] * (R[1][1] * R[2][2] - R[1][2] * R[2][1])
            - R[0][1] * (R[1][0] * R[2][2] - R[1][2] * R[2][0])
            + R[0][2] * (R[1][0] * R[2][1] - R[1][1] * R[2][0]))


def flip_winding(triangles):
    """Swap the last two indices of every triangle.

    Z-Anatomy mirrors the right-side instances with a negative scale. The
    composed transform then has a negative determinant: positions come out
    correct, but the triangles keep their original winding and every face
    points into the bone. Flip them back when that happens.
    """
    flipped = array('I', triangles)
    for index in range(0, len(flipped), 3):
        flipped[index + 1], flipped[index + 2] = flipped[index + 2], flipped[index + 1]
    return flipped


def closed(positions, indices):
    """True when no edge is used by a single face, i.e. the shell is closed."""
    if not indices:
        return False
    points = np.asarray(positions, dtype=np.float64).reshape(-1, 3)
    faces = np.asarray(indices, dtype=np.int64).reshape(-1, 3)
    edges = np.sort(np.concatenate((faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]])), axis=1)
    _, counts = np.unique(edges, axis=0, return_counts=True)
    return not (counts == 1).any()


def signed_volume(positions, indices):
    points = np.asarray(positions, dtype=np.float64).reshape(-1, 3)
    faces = np.asarray(indices, dtype=np.int64).reshape(-1, 3)
    if not len(faces):
        return 0.0
    a, b, c = points[faces[:, 0]], points[faces[:, 1]], points[faces[:, 2]]
    return float(np.einsum('ij,ij->i', a, np.cross(b, c)).sum() / 6)


def orient(positions, indices):
    """Return the indices wound with the surface pointing out of the bone.

    A closed shell has a well-defined inside: its signed volume must be
    positive. Open shells (fascia sheets, sinus linings) have no inside; for
    them the determinant flip is the only meaningful correction.
    """
    if closed(positions, indices) and signed_volume(positions, indices) < 0:
        return flip_winding(indices)
    return indices


def extract(key, path, force=False):
    os.makedirs(CACHE, exist_ok=True)
    target = os.path.join(CACHE, key + '.pkl')
    helpers = [os.path.join(HERE, name) for name in ('extract.py', 'fbxcore.py', 'props.py', 'xform.py')]
    parser = max(os.path.getmtime(name) for name in helpers)
    if (not force and os.path.exists(target)
            and os.path.getmtime(target) >= max(os.path.getmtime(path), parser)):
        print(f'{key}: cache up to date')
        return

    started = time.time()
    ns = {'sys': sys}
    previous = sys.argv
    sys.argv = ['x', path]
    try:
        for helper in ('fbxcore.py', 'props.py', 'xform.py'):
            with open(os.path.join(HERE, helper), encoding='utf-8') as handle:
                exec(compile(handle.read(), helper, 'exec'), ns)
    finally:
        sys.argv = previous
    mod, m2g, geo, pidx = ns['mod'], ns['m2g'], ns['geo'], ns['pidx']
    objects = {}
    for model_id, geometry_id in m2g.items():
        name = mod[model_id]
        if re.fullmatch(r'Cross Section.*', name):
            continue
        raw = geo[geometry_id]
        R, T = compose(ns, model_id)
        positions = array('f', bytes(12 * (len(raw) // 3)))
        for i in range(0, len(raw), 3):
            x, y, z = raw[i], raw[i + 1], raw[i + 2]
            positions[i] = R[0][0] * x + R[0][1] * y + R[0][2] * z + T[0]
            positions[i + 1] = R[1][0] * x + R[1][1] * y + R[1][2] * z + T[1]
            positions[i + 2] = R[2][0] * x + R[2][1] * y + R[2][2] * z + T[2]
        indices = triangulate(pidx.get(geometry_id, ()))
        if determinant(R) < 0:
            indices = flip_winding(indices)
        indices = orient(positions, indices)
        if not indices:
            continue
        if name in objects:
            existing = objects[name]
            offset = len(existing['pos']) // 3
            existing['pos'].extend(positions)
            existing['idx'].extend(index + offset for index in indices)
        else:
            objects[name] = {'pos': positions, 'idx': indices}

    with open(target, 'wb') as handle:
        pickle.dump({'source': path, 'objects': objects}, handle, protocol=5)
    print(f'{key}: {len(objects)} objects, {sum(len(o["pos"]) // 3 for o in objects.values())} verts '
          f'in {time.time() - started:.0f}s -> {target}')


def main():
    force = '--force' in sys.argv
    for key, path in SOURCES.items():
        if not os.path.exists(path):
            sys.exit(f'missing FBX: {path}')
        extract(key, path, force)


if __name__ == '__main__':
    main()
