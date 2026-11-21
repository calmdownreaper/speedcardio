# Converte OBJs do BodyParts3D em models.bin + models.json (agrupados por estrutura).
#
# This is the original heart/lung pipeline extended with the mediastinum and
# thoracic-wall meshes. It keeps the same quantization contract used by viewer.js:
#   positions: int16, centred/scaled to the global model box
#   indices:   uint32, 4-byte aligned
#   parts:     { p:[byteOffset, valueCount], i:[byteOffset, valueCount] }
# Existing ids keep their names; new ids are appended to the output.
import os, json, struct, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'partof_BP3D_4.0_obj_99')
EXTRA = os.path.join(HERE, '..', 'isa_extra')
ISA = os.path.join(HERE, '..', 'isa_BP3D_4.0_obj_99', 'isa_BP3D_4.0_obj_99')

# id -> English names in the BodyParts3D headers. Every file matching a name is
# merged into that id. Old ids are unchanged.
MAP = {
 # ---- original heart / lung ids -------------------------------------------------
 'ad':['Wall of right atrium'], 'ae':['Wall of left atrium'],
 'paredev':['Wall of ventricle'], 'sept_da':['Septal branch of anterior interventricular artery'], 'sept_dp':['First septal branch of right posterior interventricular artery','Second septal branch of right posterior interventricular artery'],
 'vd':['Cavity of right ventricle'], 've':['Cavity of left ventricle'],
 'tri_ant':['Anterior leaflet of tricuspid valve'],'tri_post':['Posterior leaflet of tricuspid valve'],'tri_sep':['Septal leaflet of tricuspid valve'],
 'mit_ant':['Anterior leaflet of mitral valve'],'mit_post':['Posterior leaflet of mitral valve'],
 'pulm_ant_e':['Left anterior cusp of pulmonary valve'],'pulm_ant_d':['Right anterior cusp of pulmonary valve'],'pulm_post':['Posterior cusp of pulmonary valve'],
 'ao_ant':['Anterior cusp of aortic valve'],'ao_post_d':['Right posterior cusp of aortic valve'],'ao_post_e':['Left posterior cusp of aortic valve'],
 'pap_vd_ant':['Anterior papillary muscle of right ventricle'],'pap_vd_post':['Posterior papillary muscle of right ventricle'],'pap_vd_sep':['Septal papillary muscle of right ventricle'],
 'pap_ve_al':['Lateral papillary muscle of left ventricle','Anterolateral head of lateral papillary muscle of left ventricle'],
 'tce':['Trunk of left coronary artery'],'dae':['Trunk of anterior interventricular branch of left coronary artery'],
 'diag':['Diagonal branch of anterior descending branch of left coronary artery'],
 'cone_e':['Conus branch of anterior interventricular branch of left coronary artery'],
 'vent_ant_d_dae':['First right anterior branch of anterior interventricular branch of left coronary artery','Second right anterior branch of anterior interventricular branch of left coronary artery','Third right anterior branch of anterior interventricular branch of left coronary artery'],
 'cx':['Circumflex branch of left coronary artery'],
 'acd':['Trunk of right coronary artery'],'marg_d':['Marginal branch of right coronary artery'],
 'vent_ant_acd':['First anterior ventricular branch of right coronary artery'],
 'dp':['Posterior interventricular branch of right coronary artery'],
 'vent_post_acd':['First posterior ventricular branch of right coronary artery'],
 'seio':['Coronary sinus'],'vcmagna':['Great cardiac vein'],'vcmedia':['Middle cardiac vein'],'vcparva':['Small cardiac vein'],'vpve':['Posterior vein of left ventricle'],
 'aoasc':['Ascending aorta'],'arco':['Arch of aorta'],'aodesc':['Descending thoracic aorta'],
 'tbc':['Brachiocephalic artery'],'ccd':['Right common carotid artery'],'cce':['Left common carotid artery'],
 'scd':['Right subclavian artery'],'sce':['Left subclavian artery'],
 'vcs':['Superior vena cava'],'vci':['Inferior vena cava'],
 'vbcd':['Right brachiocephalic vein'],'vbce':['Left brachiocephalic vein'],
 'azigo':['Azygos vein'],'hemiazigo':['Hemiazygos vein'],
 'tp':['Pulmonary trunk'],'apd':['Right pulmonary artery'],'ape':['Left pulmonary artery'],'lobsupd':['Right upper lobar artery'],
 'vpsd':['Right superior pulmonary vein'],'vpid':['Right inferior pulmonary vein'],
 'vpse':['Left superior pulmonary vein'],'vpie':['Left inferior pulmonary vein'],
 'traqueia':['Trachea'],'bpd':['Right main bronchus proper'],'bpe':['Left main bronchus'],
 'sd_apical':['Right apical segmental bronchial tree'],'sd_post':['Right posterior segmental bronchial tree'],'sd_ant':['Right anterior segmental bronchial tree'],
 'sd_lat':['Lateral segmental bronchial tree'],'sd_med':['Medial segmental bronchial tree'],
 'sd_sup':['Right superior segmental bronchial tree'],'sd_bmed':['Right medial basal segmental bronchial tree'],'sd_bant':['Right anterior basal segmental bronchial tree'],
 'sd_blat':['Right lateral basal segmental bronchial tree'],'sd_bpost':['Right posterior basal segmental bronchial tree'],
 'se_apical':['Left apical segmental bronchial tree'],'se_post':['Left posterior segmental bronchial tree'],'se_ant':['Left anterior segmental bronchial tree'],
 'se_lsup':['Superior lingular bronchial tree'],'se_linf':['Inferior lingular bronchial tree'],
 'se_sup':['Left superior segmental bronchial tree'],'se_bmed':['Left medial basal segmental bronchial tree'],'se_bant':['Left anterior basal segmental bronchial tree'],
 'se_blat':['Left lateral basal segmental bronchial tree'],'se_bpost':['Left posterior basal segmental bronchial tree'],
 'esofago':['Esophagus'],'timo_d':['Right lobe of thymus'],'timo_e':['Left lobe of thymus'],

 # ---- mediastinum & thoracic wall ------------------------------------------------
 'diafragma':['Diaphragm'],
 'eso_art':['Esophageal artery'],
 'azigo_acs':['Accessory hemiazygos vein'],
 'ita_d':['Right internal thoracic artery'], 'ita_e':['Left internal thoracic artery'],
 'itv_d':['Right internal thoracic vein'],
 # itv_e is not present in BP3D 4.0; it is mirrored from itv_d below.
 'itv_e':[],
 'pica_d1':['Right first posterior intercostal artery'], 'pica_e1':['Left first posterior intercostal artery'],
 'pica_d2':['Right second posterior intercostal artery'], 'pica_e2':['Left second posterior intercostal artery'],
 'pica_sup_d':['Right superior intercostal artery'], 'pica_sup_e':['Left superior intercostal artery'],
 'icv_ant_d':[], 'icv_ant_e':[],
 'phren_inf_a_d':['Right inferior phrenic artery'], 'phren_inf_a_e':['Left inferior phrenic artery'],
 'phren_inf_v':['Inferior phrenic vein'], 'phren_sup_v':['Superior phrenic vein'],

 # ---- thoracic skeleton (context, with a few quiz landmarks) ----------------------
 'manubrio':['Manubrium'], 'esterno':['Body of sternum'], 'xifoide':['Xiphoid process'],
 'claviculas':['Left clavicle','Right clavicle'],
 'cart_costais':['Left first costal cartilage','Right first costal cartilage','Left second costal cartilage','Right second costal cartilage',
                 'Left third costal cartilage','Right third costal cartilage','Left fourth costal cartilage','Right fourth costal cartilage',
                 'Left fifth costal cartilage','Right fifth costal cartilage','Left sixth costal cartilage','Right sixth costal cartilage',
                 'Left seventh costal cartilage','Right seventh costal cartilage'],
 'costela_1':['Left first rib','Right first rib'], 'costela_2':['Left second rib','Right second rib'],
 'costela_4':['Left fourth rib','Right fourth rib'], 'costela_5':['Left fifth rib','Right fifth rib'],
 'costelas_rest':['Left third rib','Right third rib','Left sixth rib','Right sixth rib','Left seventh rib','Right seventh rib',
                  'Left eighth rib','Right eighth rib','Left ninth rib','Right ninth rib','Left tenth rib','Right tenth rib',
                  'Left eleventh rib','Right eleventh rib','Left twelfth rib','Right twelfth rib'],
 'vertebras_toracicas':['First thoracic vertebra','Second thoracic vertebra','Third thoracic vertebra','Fourth thoracic vertebra',
                        'Fifth thoracic vertebra','Sixth thoracic vertebra','Seventh thoracic vertebra','Eighth thoracic vertebra',
                        'Ninth thoracic vertebra','Tenth thoracic vertebra','Eleventh thoracic vertebra','Twelfth thoracic vertebra'],
 # larynx (ISA-only, see FILES)
 'lar_hio':[],
 'lar_tir':[],
 'lar_cri':[],
 'lar_epi':[],
 'lar_ari':[],
 'lar_cor':[],
 'lar_mth':[],
 'lar_mct':[],
 'lar_vl':[],
 'lar_he':[],
 'lar_te':[],
 'lar_ct':[],
 'lar_pca':[],
 'lar_lca':[],
 'lar_arit':[],
 'lar_ta':[],
 'lar_voc':[],
}

# Parts that live only in the ISA tree, addressed by file id.
FILES = {
 'azigo_acs':['FJ1981.obj'],       # Accessory hemiazygos vein
 'icv_ant_d':['FJ1994.obj'],       # right set of anterior intercostal veins
 'icv_ant_e':['FJ1985.obj'],       # left set of anterior intercostal veins
 'pica_d1':['FJ1939.obj'], 'pica_e1':['FJ1973.obj'],
 'pica_d2':['FJ1950.obj'], 'pica_e2':['FJ1974.obj'],
 'lar_hio':['FJ2772.obj'],
 'lar_tir':['FJ2808.obj'],
 'lar_cri':['FJ2440.obj'],
 'lar_epi':['FJ2770.obj'],
 'lar_ari':['FJ2775.obj', 'FJ2792.obj'],
 'lar_cor':['FJ2776.obj', 'FJ2793.obj'],
 'lar_mth':['FJ2786.obj', 'FJ2804.obj', 'FJ2790.obj', 'FJ2779.obj', 'FJ2797.obj'],
 'lar_mct':['FJ2789.obj'],
 'lar_vl':['FJ2787.obj', 'FJ2805.obj'],
 'lar_he':['FJ2771.obj'],
 'lar_te':['FJ2807.obj'],
 'lar_ct':['FJ2783.obj', 'FJ2801.obj', 'FJ2781.obj', 'FJ2799.obj'],
 'lar_pca':['FJ2782.obj', 'FJ2800.obj'],
 'lar_lca':['FJ2778.obj', 'FJ2796.obj'],
 'lar_arit':['FJ2809.obj', 'FJ2780.obj', 'FJ2798.obj'],
 'lar_ta':['FJ2784.obj', 'FJ2802.obj'],
 'lar_voc':['FJ2788.obj', 'FJ2806.obj'],
}
# id -> source id mirrored across the midsagittal plane (x -> -x, winding reversed).
MIRROR = {'itv_e':'itv_d'}

name2id = {n:k for k,v in MAP.items() for n in v}
groups = {k:{'pos':[], 'idx':[]} for k in MAP}
seen = {k:False for k in MAP}


def english_name(path):
    with open(path, encoding='latin-1') as fh:
        for line in fh:
            if line.startswith('# English name'):
                return line.split(':',1)[1].strip()
            if not line.startswith('#'):
                return None
    return None


def add_obj(path, key):
    g = groups[key]
    base = len(g['pos']) // 3
    with open(path, encoding='latin-1') as fh:
        for line in fh:
            if line.startswith('v '):
                g['pos'].extend(float(x) for x in line.split()[1:4])
            elif line.startswith('f '):
                vs = [int(t.split('/')[0]) - 1 + base for t in line.split()[1:]]
                for i in range(1, len(vs) - 1):
                    g['idx'].extend((vs[0], vs[i], vs[i+1]))
    seen[key] = True


# 1. canonical part-of-body meshes
for name in sorted(os.listdir(SRC)):
    if not name.endswith('.obj'):
        continue
    path = os.path.join(SRC, name)
    key = name2id.get(english_name(path))
    if key:
        add_obj(path, key)

# 2. the small set of files that were already taken from isa_extra
for name in sorted(os.listdir(EXTRA)):
    if not name.endswith('.obj'):
        continue
    path = os.path.join(EXTRA, name)
    key = name2id.get(english_name(path))
    if key:
        add_obj(path, key)

# 3. ISA-only meshes addressed explicitly
for key, files in FILES.items():
    for name in files:
        path = os.path.join(ISA, name)
        if not os.path.exists(path):
            print('MISSING ISA FILE', name, file=sys.stderr)
            sys.exit(1)
        add_obj(path, key)

# 4. mirrored parts
for key, source in MIRROR.items():
    src = groups[source]
    g = groups[key]
    g['pos'] = [(-value if i % 3 == 0 else value) for i, value in enumerate(src['pos'])]
    g['idx'] = []
    for i in range(0, len(src['idx']), 3):
        a, b, c = src['idx'][i:i+3]
        g['idx'].extend((a, c, b))
    seen[key] = True

missing = [k for k, g in groups.items() if not g['pos'] or not g['idx']]
if missing:
    print('MISSING', missing)
    sys.exit(1)

# Normalize the whole specimen to one symmetric int16 box.
allp = [c for g in groups.values() for c in g['pos']]
mn = [min(allp[i::3]) for i in range(3)]
mx = [max(allp[i::3]) for i in range(3)]
ctr = [(a+b)/2 for a, b in zip(mn, mx)]
ext = max(b-a for a, b in zip(mn, mx)) / 2

out = bytearray()
index_bytes = 2 if all(max(g['idx']) <= 65535 for g in groups.values()) else 4
index_format = 'H' if index_bytes == 2 else 'I'
meta = {'center': ctr, 'scale': ext, 'indexBytes': index_bytes, 'parts': {}}
for k, g in groups.items():
    q = [max(-32767, min(32767, round((c-ctr[i % 3])/ext*32767))) for i, c in enumerate(g['pos'])]
    off = len(out)
    out += struct.pack('<%dh' % len(q), *q)
    if len(out) % 4:
        out += b'\0' * (4 - len(out) % 4)
    ioff = len(out)
    out += struct.pack(f"<{len(g['idx'])}{index_format}", *g['idx'])
    meta['parts'][k] = {'p': [off, len(q)], 'i': [ioff, len(g['idx'])]}

meta['bytes'] = len(out)
open(os.path.join(HERE, 'models.bin'), 'wb').write(out)
json.dump(meta, open(os.path.join(HERE, 'models.json'), 'w'))
print('ok', len(out)//1024, 'KB', len(groups), 'parts')
