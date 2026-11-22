#!/usr/bin/env python3
"""Bring selected Z-Anatomy structures into SpeedCardio's BodyParts3D model.

SpeedCardio stays on BodyParts3D. This adds the structures Z-Anatomy has and
the current model lacks (lung lobes, lobar bronchi, segmental pulmonary
arteries and veins and a few thoracic outlet / chest wall vessels) without
touching the existing parts.

One exception: the BP3D part `pap_ve_al` holds *both* left ventricular
papillary muscles. It is split in two, and the half nearest the warped
Z-Anatomy posteromedial muscle becomes the new part `pap_ve_pm`.

The two atlases come from different bodies, so a single rigid fit leaves the
new vessels off the existing bronchi. Instead:

1. Every structure that exists in both atlases is a *pair* (Z objects <->
   BP3D part): heart, great vessels, airway down to the segmental bronchial
   trees, esophagus, sternum, ribs, cartilages, clavicles, vertebrae.
2. A labelled similarity ICP (each Z point matched only inside its own pair)
   gives one global fit.
3. Each pair then gets its own local similarity fit, which yields
   displacement samples; a regularised thin-plate spline through them is the
   final warp, applied to the new structures.

`--check` runs a hold-out test first: the segmental bronchi are left out of
the warp and the warped Z bronchi are compared against the BP3D segment trees.

Writes the new parts into models.bin / models.json, keeping the existing bytes
and the global centre/scale. Run: python3 -I tools/zanatomy/cardio_extras.py [--check]
"""

import json
import os
import pickle
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.dirname(os.path.dirname(HERE))
CACHE = os.path.join(HERE, '.cache')

# ---- pairs: Z objects -> BP3D parts (used only to build the warp) ----------------
SEG_R = [('BI', 'Apical segmental bronchus of right lung (BI)', 'sd_apical'),
         ('BII', 'Posterior segmental bronchus of right lung (BII)', 'sd_post'),
         ('BIII', 'Anterior segmental bronchus of right lung (BIII)', 'sd_ant'),
         ('BIV', 'Lateral segmental bronchus of right lung (BIV)', 'sd_lat'),
         ('BV', 'Medial segmental bronchus of right lung (BV)', 'sd_med'),
         ('BVI', 'Superior segmental bronchus of right lung (BVI)', 'sd_sup'),
         ('BVII', 'Medial basal segmental bronchus of right lung (BVII)', 'sd_bmed'),
         ('BVIII', 'Anterior basal segmental bronchus of right lung (BVIII)', 'sd_bant'),
         ('BIX', 'Lateral basal segmental bronchus of right lung (BIX)', 'sd_blat'),
         ('BX', 'Posterior basal segmental bronchus of right lung (BX)', 'sd_bpost')]
SEG_L = [('BI+II', 'Apicoposterior segmental bronchus of left lung (BI+BII)', 'se_apical se_post'),
         ('BIII', 'Anterior segmental bronchus of left lung (BIII)', 'se_ant'),
         ('BIV', 'Superior lingular segmental bronchus of left lung (BIV)', 'se_lsup'),
         ('BV', 'Inferior lingular segmental bronchus of left lung (BV)', 'se_linf'),
         ('BVI', 'Superior segmental bronchus of left lung (BVI)', 'se_sup'),
         ('BVII', 'Medial basal segmental bronchus of left lung (BVII)|(Anteromedial basal segmental bronchus of left lung)', 'se_bmed'),
         ('BVIII', 'Anterior basal segmental bronchus of left lung (BVIII)', 'se_bant'),
         ('BIX', 'Lateral basal segmental bronchus of left lung (BIX)', 'se_blat'),
         ('BX', 'Posterior basal segmental bronchus of left lung (BX)', 'se_bpost')]
SEGMENTS = [(z, b) for _, z, b in SEG_R + SEG_L]

ORD = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth']
ORDL = [o.lower() for o in ORD]


def both(name):
    return f'{name}.r|{name}.l'


PAIRS = [
    ('Right atrium|Left atrium|Right ventricle|Left ventricle', 'ad ae vd ve paredev'),
    ('Ascending aorta', 'aoasc'), ('Aortic arch', 'arco'), ('Thoracic aorta', 'aodesc'),
    ('Pulmonary trunk|Bifurcation of pulmonary trunk', 'tp'),
    ('Right pulmonary artery', 'apd'), ('Left pulmonary artery', 'ape'),
    ('Superior vena cava', 'vcs'), ('Inferior vena cava (thoracic part)', 'vci'),
    ('Right superior pulmonary vein', 'vpsd'), ('Right inferior pulmonary vein', 'vpid'),
    ('Left superior pulmonary vein', 'vpse'), ('Left inferior pulmonary vein', 'vpie'),
    ('Brachiocephalic trunk', 'tbc'), ('Right common carotid artery', 'ccd'),
    ('Left common carotid artery', 'cce'), ('Right subclavian artery', 'scd'),
    ('Left subclavian artery', 'sce'), ('Right brachiocephalic vein', 'vbcd'),
    ('Left brachiocephalic vein', 'vbce'), ('Azygos vein', 'azigo'),
    ('Hemi-azygos vein', 'hemiazigo'), ('Accessory hemi-azygos vein', 'azigo_acs'),
    ('Internal thoracic artery.r', 'ita_d'), ('Internal thoracic artery.l', 'ita_e'),
    ('Internal thoracic veins.r', 'itv_d'),
    ('Supreme intercostal artery.r', 'pica_sup_d'), ('Supreme intercostal artery.l', 'pica_sup_e'),
    ('Trachea', 'traqueia'), ('Right main bronchus', 'bpd'), ('Left main bronchus', 'bpe'),
    ('Oesophagus', 'esofago'),
    ('Manubrium of sternum', 'manubrio'), ('Body of sternum', 'esterno'), ('Xiphoid process', 'xifoide'),
    (both('Clavicle'), 'claviculas'),
    (both('First rib'), 'costela_1'), (both('Second rib'), 'costela_2'),
    (both('Fourth rib'), 'costela_4'), (both('Fifth rib'), 'costela_5'),
    ('|'.join(both(f'{o} rib') for o in ('Third', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth')), 'costelas_rest'),
    ('|'.join(both(f'Costal cartilage of {o} rib') for o in ORDL[:7]), 'cart_costais'),
    ('|'.join(f'Vertebra T{i}' for i in range(1, 13)), 'vertebras_toracicas'),
] + SEGMENTS

# ---- new parts: id -> Z object names ---------------------------------------------
NEW = {
    # lobes
    'lobo_sup_d': 'Superior lobe of right lung', 'lobo_med_d': 'Middle lobe of right lung',
    'lobo_inf_d': 'Inferior lobe of right lung', 'lobo_sup_e': 'Superior lobe of left lung',
    'lobo_inf_e': 'Inferior lobe of left lung',
    # lobar bronchi
    'blob_sup_d': 'Right superior lobar bronchus', 'bint_d': 'Intermediate bronchus.r',
    'blob_med_d': 'Middle lobar bronchus.r', 'blob_inf_d': 'Right inferior lobar bronchus',
    'blob_sup_e': 'Left superior lobar bronchus', 'blob_inf_e': 'Left inferior lobar bronchus',
    # right pulmonary artery branches
    'lobmedd': 'Middle lobar artery of right lung', 'lobinfd': 'Inferior lobar artery of right lung',
    'a_sd_apical': 'Apical segmental artery of right lung', 'a_sd_post': 'Posterior segmental artery of right lung',
    'a_sd_ant': 'Anterior segmental artery of right lung', 'a_sd_lat': 'Lateral segmental artery of right lung',
    'a_sd_med': 'Medial segmental artery of right lung', 'a_sd_sup': 'Superior segmental artery of right lung',
    # Z-Anatomy's four basal arteries do not run with the basal bronchi of the
    # same name (anterior/lateral swap, medial follows the posterior), so they
    # come in as one basal part per side instead of four doubtful labels.
    'a_sd_basal': 'Medial basal segmental artery of right lung|Anterior basal segmental artery of right lung'
                  '|Lateral basal segmental artery of right lung|Posterior basal segmental artery of right lung',
    # left pulmonary artery branches
    'a_se_apical': 'Apical segmental artery of left lung', 'a_se_post': 'Posterior segmental artery of left lung',
    'a_se_ant': 'Anterior segmental artery of left lung', 'a_se_lsup': 'Superior lingular artery of left lung',
    'a_se_linf': 'Inferior lingular artery of left lung', 'a_se_sup': 'Superior segmental artery of left lung',
    'a_se_basal': 'Medial basal segmental artery of left lung|Anterior basal segmental artery of left lung'
                  '|Lateral basal segmental artery of left lung|Posterior basal segmental artery of left lung',
    # right pulmonary vein tributaries
    'v_sd_apical': 'Apical vein of right lung', 'v_sd_post': 'Posterior vein of right lung',
    'v_sd_ant': 'Anterior vein of right lung', 'v_sd_lat': 'Lateral vein of right lung',
    'v_sd_med': 'Medial vein of right lung', 'v_sd_sup': 'Superior vein of right lung',
    'v_sd_bsup': 'Superior basal vein of right lung', 'v_sd_binf': 'Inferior basal vein of right lung',
    # left pulmonary vein tributaries
    'v_se_apicpost': 'Apicoposterior vein of left lung', 'v_se_ant': 'Anterior vein of left lung',
    'v_se_ling': 'Lingular vein of left lung|Superior lingular vein of left lung|Inferior lingular vein of left lung',
    'v_se_sup': 'Superior vein of left lung',
    'v_se_bsup': 'Superior basal vein of left lung', 'v_se_binf': 'Inferior basal vein of left lung',
    # thoracic outlet and chest wall
    'vsc_d': 'Right subclavian vein', 'vsc_e': 'Left subclavian vein',
    'tcc_d': 'Costocervical trunk.r', 'tcc_e': 'Costocervical trunk.l',
    'ttc_d': 'Thyrocervical trunk.r', 'ttc_e': 'Thyrocervical trunk.l',
    'pica_rest_d': 'Posterior intercostal arteries.r', 'pica_rest_e': 'Posterior intercostal arteries.l',
    'mfa_d': 'Musculophrenic artery.r', 'mfa_e': 'Musculophrenic artery.l',
    'aes_d': 'Superior epigastric artery.r', 'aes_e': 'Superior epigastric artery.l',
}


# ---- data -------------------------------------------------------------------------
def load_bp3d():
    meta = json.load(open(os.path.join(SITE, 'models.json')))
    buf = open(os.path.join(SITE, 'models.bin'), 'rb').read()
    itype = np.uint16 if meta['indexBytes'] == 2 else np.uint32
    center, scale = np.array(meta['center']), meta['scale']
    parts = {}
    for pid, p in meta['parts'].items():
        q = np.frombuffer(buf, np.int16, p['p'][1], p['p'][0]).reshape(-1, 3)
        parts[pid] = q / 32767.0 * scale + center
    return meta, buf, parts


def load_z():
    objs = {}
    for key in ('cv', 'vi', 'sk'):
        objs.update(pickle.load(open(os.path.join(CACHE, key + '.pkl'), 'rb'))['objects'])
    return objs


def zmesh(objs, names):
    pos, idx, base = [], [], 0
    for name in names.split('|'):
        o = objs[name]
        p = np.asarray(o['pos'], np.float64).reshape(-1, 3)
        pos.append(p)
        idx.append(np.asarray(o['idx'], np.int64) + base)
        base += len(p)
    return np.vstack(pos), np.concatenate(idx)


# ---- geometry helpers -------------------------------------------------------------
def nearest(a, b, chunk=512):
    out_i = np.empty(len(a), np.int64)
    out_d = np.empty(len(a))
    bb = (b ** 2).sum(1)
    for s in range(0, len(a), chunk):
        blk = a[s:s + chunk]
        d = (blk ** 2).sum(1)[:, None] - 2 * blk @ b.T + bb[None, :]
        i = d.argmin(1)
        out_i[s:s + chunk] = i
        out_d[s:s + chunk] = np.sqrt(np.maximum(d[np.arange(len(i)), i], 0))
    return out_i, out_d


def similarity(src, dst, w=None):
    """Umeyama: s, R, t minimising |s R src + t - dst| (optionally weighted)."""
    w = np.ones(len(src)) if w is None else w
    w = w / w.sum()
    ms, md = w @ src, w @ dst
    a, b = src - ms, dst - md
    u, sig, vt = np.linalg.svd((b * w[:, None]).T @ a)
    d = np.eye(3)
    d[2, 2] = np.sign(np.linalg.det(u @ vt))
    R = u @ d @ vt
    s = (sig * np.diag(d)).sum() / (w @ (a ** 2).sum(1))
    return s, R, md - s * R @ ms


def apply(T, p):
    s, R, t = T
    return s * p @ R.T + t


def sample(points, n, seed):
    if len(points) <= n:
        return points
    return points[np.random.default_rng(seed).choice(len(points), n, replace=False)]


def labelled_icp(srcs, dsts, T, iters=30, weights=None, scale_free=True):
    """One similarity for several labelled point sets."""
    for _ in range(iters):
        S, D, W = [], [], []
        for k, (src, dst) in enumerate(zip(srcs, dsts)):
            moved = apply(T, src)
            i, d = nearest(moved, dst)
            keep = d <= np.percentile(d, 85)
            S.append(src[keep])
            D.append(dst[i[keep]])
            W.append(np.full(keep.sum(), (weights[k] if weights else 1.0) / max(keep.sum(), 1)))
        S, D, W = np.vstack(S), np.vstack(D), np.concatenate(W)
        s, R, t = similarity(S, D, W)
        if not scale_free:
            # Keep the incoming scale: small vessels would otherwise shrink
            # onto their partner instead of moving to it.
            s = T[0]
            t = (W @ (D - s * S @ R.T)) / W.sum()
        T = (s, R, t)
    return T


class TPS:
    """3D polyharmonic spline (kernel -r, conditionally positive definite)
    with ridge smoothing; coordinates are centred for conditioning."""

    def __init__(self, ctrl, target, lam):
        self.mu = ctrl.mean(0)
        ctrl = ctrl - self.mu
        n = len(ctrl)
        K = -np.sqrt(((ctrl[:, None] - ctrl[None]) ** 2).sum(-1))
        P = np.hstack([np.ones((n, 1)), ctrl])
        A = np.zeros((n + 4, n + 4))
        A[:n, :n] = K + lam * np.eye(n)
        A[:n, n:] = P
        A[n:, :n] = P.T
        rhs = np.zeros((n + 4, 3))
        rhs[:n] = target - self.mu
        sol = np.linalg.solve(A, rhs)
        self.ctrl, self.w, self.a = ctrl, sol[:n], sol[n:]

    def __call__(self, p):
        out = np.empty_like(p)
        for s in range(0, len(p), 2048):
            blk = p[s:s + 2048] - self.mu
            K = -np.sqrt(((blk[:, None] - self.ctrl[None]) ** 2).sum(-1))
            out[s:s + 2048] = K @ self.w + self.a[0] + blk @ self.a[1:] + self.mu
        return out


def build_warp(Z, B, pairs, lam=0.5, report=None):
    zs = [sample(zmesh(Z, z)[0], 1500, 1) for z, _ in pairs]
    bs = [sample(np.vstack([B[b] for b in bb.split()]), 4000, 2) for _, bb in pairs]
    # Initial: centroid + RMS scale over the heart and airway.
    core = [k for k, (_, b) in enumerate(pairs) if b in ('ad ae vd ve paredev', 'traqueia', 'bpd', 'bpe', 'aoasc', 'arco')]
    zc, bc = np.vstack([zs[k] for k in core]), np.vstack([bs[k] for k in core])
    s = np.sqrt(((bc - bc.mean(0)) ** 2).sum(1).mean() / ((zc - zc.mean(0)) ** 2).sum(1).mean())
    T = (s, np.eye(3), bc.mean(0) - s * zc.mean(0))
    T = labelled_icp([zs[k] for k in core], [bs[k] for k in core], T, 20)
    T = labelled_icp(zs, bs, T, 25)
    if report is not None:
        report['global_scale'] = round(float(T[0]), 3)
    ctrl, target = [], []
    for k, (z, b) in enumerate(pairs):
        L = labelled_icp([zs[k]], [bs[k]], T, 15, scale_free=False)
        n = 120 if b in ('ad ae vd ve paredev', 'vertebras_toracicas', 'costelas_rest', 'cart_costais') else 40
        pts = sample(zs[k], n, 3 + k)
        g = apply(T, pts)
        loc = apply(L, pts)
        # Clamp each local correction: a pair that slides along itself should
        # not drag the whole field.
        disp = loc - g
        norm = np.linalg.norm(disp, axis=1, keepdims=True)
        disp = np.where(norm > 25, disp * 25 / np.maximum(norm, 1e-9), disp)
        ctrl.append(g)
        target.append(g + disp)
    ctrl, target = np.vstack(ctrl), np.vstack(target)
    tps = TPS(ctrl, target, lam)

    def warp(p):
        return tps(apply(T, p))
    return warp, T


def pair_fit(warped, dst):
    _, d1 = nearest(sample(warped, 1500, 7), dst)
    _, d2 = nearest(sample(dst, 1500, 8), warped)
    return float(np.median(np.concatenate([d1, d2])))


def holdout(Z, B, lam=2.0):
    base = [p for p in PAIRS if p not in SEGMENTS]
    warp, T = build_warp(Z, B, base, lam)
    seg_ids = [b for _, b in SEGMENTS]
    all_b = {b: np.vstack([B[x] for x in b.split()]) for b in seg_ids}
    print('hold-out: Z segmental bronchi vs BP3D segment trees (median sym. distance, mm)')
    print(f'{"segment":20s} {"rigid":>7s} {"warp":>7s}  label hit rigid/warp')
    tot = []
    for z, b in SEGMENTS:
        zp = zmesh(Z, z)[0]
        rp, wp = apply(T, zp), warp(zp)
        r, w = pair_fit(rp, all_b[b]), pair_fit(wp, all_b[b])
        hits = []
        for cand in (rp, wp):
            pts = sample(cand, 400, 9)
            best = np.full(len(pts), np.inf)
            lab = np.empty(len(pts), object)
            for other in seg_ids:
                _, d = nearest(pts, sample(all_b[other], 3000, 5))
                better = d < best
                best[better] = d[better]
                lab[better] = other
            hits.append((lab == b).mean())
        tot.append((r, w, *hits))
        print(f'{b:20s} {r:7.1f} {w:7.1f}  {hits[0]:5.0%} {hits[1]:5.0%}')
    print('mean', np.round(np.mean(tot, 0), 2))


# Z object used only to tell which half of BP3D pap_ve_al is posteromedial.
LV_PM_GUIDE = 'Inferior papillary muscle of left ventricle'


def split_lv_papillary(meta, out, parts, guide):
    """Split BP3D pap_ve_al into anterolateral (kept in place) and posteromedial."""
    itype = np.uint16 if meta['indexBytes'] == 2 else np.uint32
    p = parts['pap_ve_al']
    q = np.frombuffer(bytes(out), np.int16, p['p'][1], p['p'][0]).reshape(-1, 3).copy()
    idx = np.frombuffer(bytes(out), itype, p['i'][1], p['i'][0]).astype(np.int64)
    pos = q / 32767.0 * meta['scale'] + np.array(meta['center'])
    # Connected components over shared vertices.
    parent = np.arange(len(pos))

    def find(a):
        while parent[a] != a:
            parent[a] = parent[parent[a]]
            a = parent[a]
        return a
    for a, b, c in idx.reshape(-1, 3):
        for x, y in ((a, b), (b, c)):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
    comp = np.array([find(i) for i in range(len(pos))])
    # Two-means on vertices, seeded at the guide and the vertex farthest from it.
    cent = np.array([guide, pos[((pos - guide) ** 2).sum(1).argmax()]])
    for _ in range(50):
        lab = ((pos[:, None] - cent[None]) ** 2).sum(-1).argmin(1)
        cent = np.array([pos[lab == k].mean(0) for k in (0, 1)])
    # Whole components follow their majority, so no muscle is cut mid-mesh.
    for c in np.unique(comp):
        m = comp == c
        lab[m] = np.bincount(lab[m], minlength=2).argmax()
    tri = idx.reshape(-1, 3)
    pm_tri = lab[tri[:, 0]] == 0
    gap = np.linalg.norm(cent[0] - cent[1])
    if gap < 15 or not (0.25 < pm_tri.mean() < 0.75):
        sys.exit(f'pap_ve_al does not split cleanly (gap {gap:.1f} mm, pm share {pm_tri.mean():.2f})')

    def subset(t):
        used = np.unique(t)
        remap = np.full(len(pos), -1)
        remap[used] = np.arange(len(used))
        return q[used], remap[t].reshape(-1)
    al_q, al_i = subset(tri[~pm_tri])
    pm_q, pm_i = subset(tri[pm_tri])
    # Anterolateral half overwrites the old bytes in place (it is smaller).
    out[p['p'][0]:p['p'][0] + al_q.nbytes] = al_q.tobytes()
    ib = al_i.astype(itype).tobytes()
    out[p['i'][0]:p['i'][0] + len(ib)] = ib
    parts['pap_ve_al'] = {'p': [p['p'][0], al_q.size], 'i': [p['i'][0], al_i.size]}
    while len(out) % 4:
        out += b'\0'
    p0 = len(out)
    out += pm_q.tobytes()
    while len(out) % 4:
        out += b'\0'
    i0 = len(out)
    out += pm_i.astype(itype).tobytes()
    parts['pap_ve_pm'] = {'p': [p0, pm_q.size], 'i': [i0, pm_i.size]}
    print(f'  split pap_ve_al: gap {gap:.1f} mm, {len(al_q)} v anterolateral, {len(pm_q)} v posteromedial')


def main():
    meta, buf, B = load_bp3d()
    Z = load_z()
    if '--check' in sys.argv:
        for lam in [float(x) for x in sys.argv[sys.argv.index('--check') + 1:]] or [2.0]:
            print('lambda', lam)
            holdout(Z, B, lam)
        return
    report = {}
    warp, T = build_warp(Z, B, PAIRS, report=report)
    print(f'global similarity scale {report["global_scale"]}')
    for z, b in PAIRS:
        w = warp(zmesh(Z, z)[0])
        print(f'  fit {b:22s} {pair_fit(w, np.vstack([B[x] for x in b.split()])):5.1f} mm')

    center, scale = np.array(meta['center']), meta['scale']
    out = bytearray(buf)
    parts = dict(meta['parts'])
    added = []
    for pid, names in NEW.items():
        if pid in parts:
            sys.exit(f'{pid} already exists')
        pos, idx = zmesh(Z, names)
        pos = warp(pos)
        q = (pos - center) / scale * 32767
        if np.abs(q).max() > 32767:
            sys.exit(f'{pid} falls outside the model box ({np.abs(q).max():.0f})')
        if len(pos) > 65535:
            sys.exit(f'{pid} has {len(pos)} vertices, over the uint16 index limit')
        q = np.round(q).astype(np.int16)
        while len(out) % 4:
            out += b'\0'
        p0 = len(out)
        out += q.tobytes()
        while len(out) % 4:
            out += b'\0'
        i0 = len(out)
        out += idx.astype(np.uint16).tobytes()
        parts[pid] = {'p': [p0, q.size], 'i': [i0, idx.size]}
        added.append((pid, len(pos), len(idx) // 3))
    if 'pap_ve_pm' in parts:
        sys.exit('pap_ve_pm already exists')
    split_lv_papillary(meta, out, parts, warp(zmesh(Z, LV_PM_GUIDE)[0]).mean(0))
    while len(out) % 4:
        out += b'\0'
    meta = {**meta, 'parts': parts, 'bytes': len(out)}
    open(os.path.join(SITE, 'models.bin'), 'wb').write(out)
    json.dump(meta, open(os.path.join(SITE, 'models.json'), 'w'), separators=(',', ':'))
    for pid, v, t in added:
        print(f'  + {pid:14s} {v:6d} v {t:6d} t')
    print(f'models.bin {len(buf) / 1e6:.2f} -> {len(out) / 1e6:.2f} MB, {len(parts)} parts')


if __name__ == '__main__':
    main()
