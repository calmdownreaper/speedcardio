#!/usr/bin/env python3
"""Pack hand-cut landmark areas into msk/areas.bin.

Source: landmarks.glb from SampleSize1 Bone Landmarks
(github.com/SampleSize1/Anatomy-Atlas, bone-landmarks/), Z-Anatomy bones with
each landmark cut out as its own piece, CC BY-SA 4.0. Decompress it first:

  npx @gltf-transform/cli copy landmarks.glb plain.glb
  npx @gltf-transform/cli dequantize plain.glb deq.glb

Their frame is metres, Y up; BodyParts3D is millimetres, Z up:
  X = x*1000, Y = -z*1000, Z = y*1000   (checked: median offset < 1 mm).
Pieces are written in the shared msk/models.json center/scale frame (int16
normalised positions, uint16 indices) and listed under "areas" there.

Usage: python3 tools/zanatomy/import_landmark_areas.py path/to/deq.glb
"""

import json
import os
import struct
import sys

import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
MANIFEST = os.path.join(ROOT, 'msk', 'models.json')
OUT = os.path.join(ROOT, 'msk', 'areas.bin')

# Our marker id -> their piece names (both sides where they split them).
AREAS = {
    'glabella': ['frontal_bone_glabella'],
    'inion': ['occipital_bone_external_occipital_protuberance'],
    'mastoid_process': ['temporal_bone_mastoid_process_l', 'temporal_bone_mastoid_process_r'],
    'foramen_magnum': ['occipital_bone_foramen_magnum'],
    'foramen_ovale': ['sphenoid_bone_foramen_ovale'],
    'foramen_rotundum': ['sphenoid_bone_foramen_rotundum'],
    'foramen_spinosum': ['sphenoid_bone_foramen_spinosum'],
    'internal_acoustic_meatus': ['temporal_bone_internal_acoustic_meatus_l', 'temporal_bone_internal_acoustic_meatus_r'],
    'optic_canal': ['sphenoid_bone_optic_canal'],
    'superior_orbital_fissure': ['sphenoid_bone_superior_orbital_fissure'],
    'infraorbital_foramen': ['maxilla_infraorbital_foramen_l', 'maxilla_infraorbital_foramen_r'],
    'mental_foramen': ['mandible_mental_foramen'],
}


def load_glb(path):
    data = open(path, 'rb').read()
    size = struct.unpack('<I', data[12:16])[0]
    doc = json.loads(data[20:20 + size])
    blob = data[20 + size + 8:]
    kinds = {5126: np.float32, 5123: np.uint16, 5125: np.uint32, 5121: np.uint8}
    widths = {'SCALAR': 1, 'VEC2': 2, 'VEC3': 3, 'VEC4': 4}

    def accessor(index):
        acc = doc['accessors'][index]
        view = doc['bufferViews'][acc['bufferView']]
        kind, width = kinds[acc['componentType']], widths[acc['type']]
        offset = view.get('byteOffset', 0) + acc.get('byteOffset', 0)
        stride = view.get('byteStride')
        item = width * np.dtype(kind).itemsize
        if stride and stride != item:
            raw = np.frombuffer(blob, np.uint8, count=stride * acc['count'], offset=offset)
            return raw.reshape(acc['count'], stride)[:, :item].copy().view(kind).reshape(acc['count'], width)
        return np.frombuffer(blob, kind, count=acc['count'] * width, offset=offset).reshape(acc['count'], width)

    pieces = {}
    for node in doc['nodes']:
        if 'mesh' not in node:
            continue
        if 'rotation' in node:
            sys.exit(f'unexpected rotation on {node["name"]}')
        prim = doc['meshes'][node['mesh']]['primitives'][0]
        verts = accessor(prim['attributes']['POSITION']).astype(np.float64)
        verts = verts * np.array(node.get('scale', [1, 1, 1])) + np.array(node.get('translation', [0, 0, 0]))
        faces = accessor(prim['indices']).reshape(-1, 3).astype(np.int64)
        bp = np.c_[verts[:, 0] * 1000, -verts[:, 2] * 1000, verts[:, 1] * 1000]
        pieces[node['name']] = (bp, faces)
    return pieces


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    pieces = load_glb(sys.argv[1])
    manifest = json.load(open(MANIFEST))
    center, scale = np.asarray(manifest['center']), manifest['scale']
    blob = bytearray()
    parts = {}
    for marker_id, names in AREAS.items():
        verts, faces = [], []
        base = 0
        for name in names:
            v, f = pieces[name]
            verts.append(v)
            faces.append(f + base)
            base += len(v)
        verts, faces = np.vstack(verts), np.vstack(faces)
        if len(verts) > 65535:
            sys.exit(f'{marker_id}: too many vertices for uint16')
        packed = np.clip(np.rint((verts - center) / scale * 32767), -32767, 32767).astype('<i2').ravel()
        p_off = len(blob)
        blob += packed.tobytes()
        if len(blob) % 2:
            blob += b'\0'
        i_off = len(blob)
        blob += faces.astype('<u2').ravel().tobytes()
        while len(blob) % 4:
            blob += b'\0'
        parts[marker_id] = {'p': [p_off, packed.size], 'i': [i_off, faces.size]}
    open(OUT, 'wb').write(blob)
    manifest['areas'] = {
        'file': 'areas.bin', 'indexBytes': 2, 'bytes': len(blob), 'parts': parts,
        'credit': 'Landmark areas: SampleSize1 Bone Landmarks, CC BY-SA 4.0',
    }
    json.dump(manifest, open(MANIFEST, 'w'))
    print(f'{len(parts)} areas, {len(blob) / 1024:.0f} KB -> {OUT}')


if __name__ == '__main__':
    main()
