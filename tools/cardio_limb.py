#!/usr/bin/env python3
"""Add the right upper-limb and neck arteries (plus arm bones) to SpeedCardio's model.

These meshes are native BodyParts3D (ISA tree), the same frame as the base model,
so no warp is needed. The arm reaches far below the current model box, so every
existing part is decoded to millimetres and the whole set is re-quantized against
the new symmetric box. Existing ids and their geometry are kept unchanged.

Run: python3 -I tools/cardio_limb.py   (refuses to run twice: ids must be new)
"""
import json
import os
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(HERE)
ISA = os.path.join(SITE, '..', 'isa_BP3D_4.0_obj_99', 'isa_BP3D_4.0_obj_99')

NEW = {
    # neck and thoracic outlet (right)
    'vert_d': ['FJ1725'], 'cid_d': ['FJ1682'],
    'tirinf_d': ['FJ2209'], 'tcerv_d': ['FJ2309', 'FJ2308'], 'supsc_d': ['FJ2303'],
    'dscap_d': ['FJ2284'], 'cervprof_d': ['FJ2278'],
    # axilla
    'axa_d': ['FJ2268'], 'torlat_d': ['FJ1938'], 'subsc_d': ['FJ2298'],
    'circscap_d': ['FJ2273'], 'thdors_d': ['FJ2305'],
    'chumant_d': ['FJ2264'], 'chumpost_d': ['FJ2291', 'FJ2292'],
    # arm
    'bra_d': ['FJ2271'], 'bprof_d': ['FJ2277', 'FJ2362', 'FJ2262'],
    'ucs_d': ['FJ2373'], 'uci_d': ['FJ2267'],
    # forearm
    'rad_d': ['FJ2294'], 'radrec_d': ['FJ2295'],
    'uln_d': ['FJ2310'], 'ulnrec_d': ['FJ2311', 'FJ2293'],
    'iocom_d': ['FJ2275'], 'ioant_d': ['FJ2266'], 'iorec_d': ['FJ2297'],
    # hand
    'arcsup_d': ['FJ2300'], 'digpalm_d': ['FJ2343', 'FJ2344', 'FJ2345', 'FJ2370'],
    'arcprof_d': ['FJ2279'], 'metpalm_d': ['FJ2289'],
    'princeps_d': ['FJ2372', 'FJ2371'], 'indicis_d': ['FJ2342', 'FJ2363'],
    # bones for context
    'humero_d': ['FJ3368'], 'radio_d': ['FJ3349'], 'ulna_d': ['FJ3391'],
}


def load_obj(files):
    pos, idx, base = [], [], 0
    for name in files:
        verts, faces = [], []
        with open(os.path.join(ISA, name + '.obj'), encoding='latin-1') as fh:
            for line in fh:
                if line.startswith('v '):
                    verts.append([float(x) for x in line.split()[1:4]])
                elif line.startswith('f '):
                    vs = [int(t.split('/')[0]) - 1 for t in line.split()[1:]]
                    for i in range(1, len(vs) - 1):
                        faces.append((vs[0] + base, vs[i] + base, vs[i + 1] + base))
        pos.append(np.array(verts))
        idx.append(np.array(faces, np.int64).reshape(-1))
        base += len(verts)
    return np.vstack(pos), np.concatenate(idx)


def main():
    meta = json.load(open(os.path.join(SITE, 'models.json')))
    buf = open(os.path.join(SITE, 'models.bin'), 'rb').read()
    if meta['indexBytes'] != 2:
        sys.exit('expected 2-byte indices')
    center, scale = np.array(meta['center']), meta['scale']
    groups = {}
    for pid, p in meta['parts'].items():
        q = np.frombuffer(buf, np.int16, p['p'][1], p['p'][0]).reshape(-1, 3)
        groups[pid] = (q / 32767.0 * scale + center, np.frombuffer(buf, np.uint16, p['i'][1], p['i'][0]).astype(np.int64))
    old = list(groups)
    for pid, files in NEW.items():
        if pid in groups:
            sys.exit(f'{pid} already exists')
        pos, idx = load_obj(files)
        if len(pos) > 65535:
            sys.exit(f'{pid} has {len(pos)} vertices')
        groups[pid] = (pos, idx)
    allp = np.vstack([g[0] for g in groups.values()])
    mn, mx = allp.min(0), allp.max(0)
    ctr = (mn + mx) / 2
    ext = float((mx - mn).max() / 2)
    out = bytearray()
    parts = {}
    for pid, (pos, idx) in groups.items():
        q = np.clip(np.round((pos - ctr) / ext * 32767), -32767, 32767).astype(np.int16)
        while len(out) % 4:
            out += b'\0'
        p0 = len(out)
        out += q.tobytes()
        while len(out) % 4:
            out += b'\0'
        i0 = len(out)
        out += idx.astype(np.uint16).tobytes()
        parts[pid] = {'p': [p0, q.size], 'i': [i0, idx.size]}
    while len(out) % 4:
        out += b'\0'
    # Check: every old part decodes back to its old millimetres.
    worst = 0
    for pid in old:
        p = parts[pid]
        q = np.frombuffer(bytes(out), np.int16, p['p'][1], p['p'][0]).reshape(-1, 3)
        worst = max(worst, np.abs(q / 32767.0 * ext + ctr - groups[pid][0]).max())
    meta = {**meta, 'center': ctr.tolist(), 'scale': ext, 'parts': parts, 'bytes': len(out)}
    open(os.path.join(SITE, 'models.bin'), 'wb').write(out)
    json.dump(meta, open(os.path.join(SITE, 'models.json'), 'w'), separators=(',', ':'))
    for pid in NEW:
        print(f'  + {pid:12s} {len(groups[pid][0]):6d} v')
    print(f'scale {scale:.1f} -> {ext:.1f}, centre {np.round(ctr, 1)}, max requant error {worst:.3f} mm')
    print(f'models.bin {len(buf) / 1e6:.2f} -> {len(out) / 1e6:.2f} MB, {len(parts)} parts')


if __name__ == '__main__':
    main()
