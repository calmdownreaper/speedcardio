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


def add_obj(path, key, group=None, flags=None):
    g = groups[key] if group is None else group
    base = len(g['pos']) // 3
    with open(path, encoding='latin-1') as fh:
        for line in fh:
            if line.startswith('v '):
                g['pos'].extend(float(x) for x in line.split()[1:4])
            elif line.startswith('f '):
                vs = [int(t.split('/')[0]) - 1 + base for t in line.split()[1:]]
                for i in range(1, len(vs) - 1):
                    g['idx'].extend((vs[0], vs[i], vs[i+1]))
    if flags is None:
        seen[key] = True


# ---------------------------------------------------------------------------
# SpeedMSK: one manifest + one .bin per curriculum region, all quantized
# against a single whole-body box so every region aligns in the viewer.
# Run: python3 build_models.py msk
# ---------------------------------------------------------------------------
MSK = {
    'skull': {
        'frontal': ['Frontal bone'],
        'parietal': ['Left parietal bone', 'Right parietal bone'],
        'temporal': ['Left temporal bone', 'Right temporal bone'],
        'occipital': ['Occipital bone'],
        'sphenoid': ['Sphenoid bone'],
        'ethmoid': ['Ethmoid'],
        'maxilla': ['Left maxilla', 'Right maxilla'],
        'mandible': ['Mandible'],
        'zygomatic': ['Left zygomatic bone', 'Right zygomatic bone'],
        'nasal': ['Left nasal bone', 'Right nasal bone'],
        'vomer': ['Vomer'],
        'palatine': ['Left palatine bone', 'Right palatine bone'],
    },
    'spine': {
        'atlas': ['Atlas'],
        'axis': ['Axis'],
        'cervical_vertebra': ['Third cervical vertebra', 'Fourth cervical vertebra', 'Fifth cervical vertebra',
                              'Sixth cervical vertebra', 'Seventh cervical vertebra'],
        'thoracic_vertebra': ['First thoracic vertebra', 'Second thoracic vertebra', 'Third thoracic vertebra',
                              'Fourth thoracic vertebra', 'Fifth thoracic vertebra', 'Sixth thoracic vertebra',
                              'Seventh thoracic vertebra', 'Eighth thoracic vertebra', 'Ninth thoracic vertebra',
                              'Tenth thoracic vertebra', 'Eleventh thoracic vertebra', 'Twelfth thoracic vertebra'],
        'lumbar_vertebra': ['First lumbar vertebra', 'Second lumbar vertebra', 'Third lumbar vertebra',
                            'Fourth lumbar vertebra', 'Fifth lumbar vertebra'],
        'sacrum': ['Sacrum'],
        'iv_disc': ['Intervertebral disk', 'Intervertebral disk of axis',
                    'Intervertebral disk of third cervical vertebra', 'Intervertebral disk of fourth cervical vertebra',
                    'Intervertebral disk of fifth cervical vertebra', 'Intervertebral disk of sixth cervical vertebra',
                    'Intervertebral disk of seventh cervical vertebra',
                    'Intervertebral disk of first thoracic vertebra', 'Intervertebral disk of second thoracic vertebra',
                    'Intervertebral disk of third thoracic vertebra', 'Intervertebral disk of fourth thoracic vertebra',
                    'Intervertebral disk of fifth thoracic vertebra', 'Intervertebral disk of sixth thoracic vertebra',
                    'Intervertebral disk of seventh thoracic vertebra', 'Intervertebral disk of eighth thoracic vertebra',
                    'Intervertebral disk of ninth thoracic vertebra', 'Intervertebral disk of tenth thoracic vertebra',
                    'Intervertebral disk of eleventh thoracic vertebra',
                    'Intervertebral disk of first lumbar vertebra', 'Intervertebral disk of second lumbar vertebra',
                    'Intervertebral disk of third lumbar vertebra', 'Intervertebral disk of fourth lumbar vertebra',
                    'Intervertebral disk of fifth lumbar vertebra'],
        'iliocostalis': ['Left iliocostalis cervicis', 'Right iliocostalis cervicis',
                         'Left iliocostalis thoracis', 'Right iliocostalis thoracis',
                         'Left iliocostalis lumborum', 'Right iliocostalis lumborum'],
        'longissimus': ['Left longissimus capitis', 'Right longissimus capitis',
                        'Left longissimus cervicis', 'Right longissimus cervicis',
                        'Left longissimus thoracis', 'Right longissimus thoracis'],
        'spinalis': ['Left spinalis thoracis', 'Right spinalis thoracis'],
        'semispinalis': ['Left semispinalis capitis', 'Right semispinalis capitis',
                         'Left semispinalis cervicis', 'Right semispinalis cervicis',
                         'Left semispinalis thoracis', 'Right semispinalis thoracis'],
        'splenius_capitis': ['Left splenius capitis', 'Right splenius capitis'],
        'rectus_capitis_posterior_major': ['Left rectus capitis posterior major', 'Right rectus capitis posterior major'],
        'longus_colli': ['Superior oblique part of left longus colli', 'Superior oblique part of right longus colli',
                         'Inferior oblique part of left longus colli', 'Inferior oblique part of right longus colli'],
        'scalenus_anterior': ['Left scalenus anterior', 'Right scalenus anterior'],
    },
    'thorax': {
        'sternum': ['Manubrium', 'Body of sternum', 'Xiphoid process'],
        'ribs': ['Left first rib', 'Right first rib', 'Left second rib', 'Right second rib',
                 'Left third rib', 'Right third rib', 'Left fourth rib', 'Right fourth rib',
                 'Left fifth rib', 'Right fifth rib', 'Left sixth rib', 'Right sixth rib',
                 'Left seventh rib', 'Right seventh rib', 'Left eighth rib', 'Right eighth rib',
                 'Left ninth rib', 'Right ninth rib', 'Left tenth rib', 'Right tenth rib',
                 'Left eleventh rib', 'Right eleventh rib', 'Left twelfth rib', 'Right twelfth rib'],
        'costal_cartilages': ['Left first costal cartilage', 'Right first costal cartilage',
                              'Left second costal cartilage', 'Right second costal cartilage',
                              'Left third costal cartilage', 'Right third costal cartilage',
                              'Left fourth costal cartilage', 'Right fourth costal cartilage',
                              'Left fifth costal cartilage', 'Right fifth costal cartilage',
                              'Left sixth costal cartilage', 'Right sixth costal cartilage',
                              'Left seventh costal cartilage', 'Right seventh costal cartilage'],
        'intercostals_external': ['External intercostal muscle'],
        'intercostals_internal': ['Internal intercostal muscle'],
        'intercostals_innermost': ['Innermost intercostal muscle'],
        'diaphragm': ['Diaphragm'],
        'transversus_thoracis': ['Left transversus thoracis', 'Right transversus thoracis'],
        'serratus_posterior_superior': ['Left serratus posterior superior', 'Right serratus posterior superior'],
        'serratus_posterior_inferior': ['Left serratus posterior inferior', 'Right serratus posterior inferior'],
        'levatores_costarum': ['Set of left levatores costarum breves', 'Set of left levatores costarum longi',
                               'Set of right levatores costarum breves', 'Set of right levatores costarum longi'],
    },
    'pelvis': {
        'hip_bone': ['Left hip bone', 'Right hip bone'],
        'gluteus_maximus': ['Left gluteus maximus', 'Right gluteus maximus'],
        'gluteus_medius': ['Left gluteus medius', 'Right gluteus medius'],
        'gluteus_minimus': ['Left gluteus minimus', 'Right gluteus minimus'],
        'piriformis': ['Left piriformis', 'Right piriformis'],
        'obturator_internus': ['Left obturator internus', 'Right obturator internus'],
        'iliacus': ['Left iliacus', 'Right iliacus'],
        'psoas_major': ['Left psoas major', 'Right psoas major'],
        'coccygeus': ['Left coccygeus', 'Right coccygeus'],
        'pubococcygeus': ['Left pubococcygeus', 'Right pubococcygeus'],
        'iliococcygeus': ['Left iliococcygeus', 'Right iliococcygeus'],
    },
    'abdomen': {
        'external_oblique': ['Left external oblique', 'Right external oblique'],
        'linea_alba': ['Linea alba'],
    },
    'lower': {
        'femur': ['Left femur', 'Right femur'],
        'tibia': ['Left tibia', 'Right tibia'],
        'fibula': ['Left fibula', 'Right fibula'],
        'patella': ['Left patella', 'Right patella'],
        'tarsal_bones': ['Left calcaneus', 'Right calcaneus', 'Left talus', 'Right talus',
                         'Navicular bone of left foot', 'Navicular bone of right foot',
                         'Left cuboid bone', 'Right cuboid bone',
                         'Left medial cuneiform bone', 'Right medial cuneiform bone',
                         'Left intermediate cuneiform bone', 'Right intermediate cuneiform bone',
                         'Left lateral cuneiform bone', 'Right lateral cuneiform bone'],
        'metatarsals': ['Left first metatarsal bone', 'Right first metatarsal bone',
                        'Left second metatarsal bone', 'Right second metatarsal bone',
                        'Left third metatarsal bone', 'Right third metatarsal bone',
                        'Left fourth metatarsal bone', 'Right fourth metatarsal bone',
                        'Left fifth metatarsal bone', 'Right fifth metatarsal bone'],
        'toe_phalanges': ['Proximal phalanx of left big toe', 'Proximal phalanx of right big toe',
                          'Distal phalanx of left big toe', 'Distal phalanx of right big toe',
                          'Proximal phalanx of left second toe', 'Proximal phalanx of right second toe',
                          'Middle phalanx of left second toe', 'Middle phalanx of right second toe',
                          'Distal phalanx of left second toe', 'Distal phalanx of right second toe',
                          'Proximal phalanx of left third toe', 'Proximal phalanx of right third toe',
                          'Middle phalanx of left third toe', 'Middle phalanx of right third toe',
                          'Distal phalanx of left third toe', 'Distal phalanx of right third toe',
                          'Proximal phalanx of left fourth toe', 'Proximal phalanx of right fourth toe',
                          'Middle phalanx of left fourth toe', 'Middle phalanx of right fourth toe',
                          'Distal phalanx of left fourth toe', 'Distal phalanx of right fourth toe',
                          'Proximal phalanx of left little toe', 'Proximal phalanx of right little toe',
                          'Middle phalanx of left little toe', 'Middle phalanx of right little toe',
                          'Distal phalanx of left little toe', 'Distal phalanx of right little toe'],
        'calcaneal_tendon': ['Left calcaneal tendon', 'Right calcaneal tendon'],
        'long_plantar_lig': ['Left long plantar ligament', 'Right long plantar ligament'],
        'sartorius': ['Left sartorius', 'Right sartorius'],
        'rectus_femoris': ['Left rectus femoris', 'Right rectus femoris'],
        'vastus_lateralis': ['Left vastus lateralis', 'Right vastus lateralis'],
        'vastus_medialis': ['Left vastus medialis', 'Right vastus medialis'],
        'vastus_intermedius': ['Left vastus intermedius', 'Right vastus intermedius'],
        'biceps_femoris': ['Long head of left biceps femoris', 'Long head of right biceps femoris',
                           'Short head of left biceps femoris', 'Short head of right biceps femoris'],
        'semitendinosus': ['Left semitendinosus', 'Right semitendinosus'],
        'semimembranosus': ['Left semimembranosus', 'Right semimembranosus'],
        'adductor_longus': ['Left adductor longus', 'Right adductor longus'],
        'adductor_magnus': ['Left adductor magnus', 'Right adductor magnus'],
        'gracilis': ['Left gracilis', 'Right gracilis'],
        'tensor_fasciae_latae': ['Left tensor fasciae latae', 'Right tensor fasciae latae'],
        'iliotibial_tract': ['Left iliotibial tract', 'Right iliotibial tract'],
        'gastrocnemius': ['Medial head of left gastrocnemius', 'Medial head of right gastrocnemius',
                          'Lateral head of left gastrocnemius', 'Lateral head of right gastrocnemius'],
        'soleus': ['Left soleus', 'Right soleus'],
        'plantaris': ['Left plantaris', 'Right plantaris'],
        'tibialis_anterior': ['Left tibialis anterior', 'Right tibialis anterior'],
        'tibialis_posterior': ['Left tibialis posterior', 'Right tibialis posterior'],
        'fibularis_longus': ['Left fibularis longus', 'Right fibularis longus'],
        'fibularis_brevis': ['Left fibularis brevis', 'Right fibularis brevis'],
        'popliteus': ['Left popliteus', 'Right popliteus'],
        'extensor_digitorum_longus': ['Left extensor digitorum longus', 'Right extensor digitorum longus'],
        'flexor_digitorum_longus': ['Left flexor digitorum longus', 'Right flexor digitorum longus'],
        'flexor_hallucis_longus': ['Left flexor hallucis longus', 'Right flexor hallucis longus'],
    },
    'upper': {
        'clavicle': ['Left clavicle', 'Right clavicle'],
        'scapula': ['Left scapula', 'Right scapula'],
        'humerus': ['Left humerus', 'Right humerus'],
        'radius': ['Left radius', 'Right radius'],
        'ulna': ['Left ulna', 'Right ulna'],
        'supraspinatus': ['Left supraspinatus', 'Right supraspinatus'],
        'infraspinatus': ['Left infraspinatus muscle', 'Right infraspinatus muscle'],
        'teres_minor': ['Left teres minor', 'Right teres minor'],
        'subscapularis': ['Left subscapularis', 'Right subscapularis'],
        'deltoid': ['Acromial part of left deltoid', 'Acromial part of right deltoid',
                    'Clavicular part of left deltoid', 'Clavicular part of right deltoid',
                    'Spinal part of left deltoid', 'Spinal part of right deltoid'],
        'teres_major': ['Left teres major', 'Right teres major'],
        'pectoralis_major': ['Clavicular part of left pectoralis major', 'Clavicular part of right pectoralis major',
                             'Sternocostal part of left pectoralis major', 'Sternocostal part of right pectoralis major',
                             'Abdominal part of left pectoralis major', 'Abdominal part of right pectoralis major'],
        'trapezius': ['Ascending part of left trapezius', 'Ascending part of right trapezius',
                      'Descending part of left trapezius', 'Descending part of right trapezius',
                      'Transverse part of left trapezius', 'Transverse part of right trapezius'],
        'levator_scapulae': ['Left levator scapulae', 'Right levator scapulae'],
        'rhomboid_major': ['Left rhomboid major', 'Right rhomboid major'],
        'rhomboid_minor': ['Left rhomboid minor', 'Right rhomboid minor'],
        'serratus_anterior': ['Left serratus anterior', 'Right serratus anterior'],
        'biceps_brachii': ['Long head of left biceps brachii', 'Long head of right biceps brachii',
                           'Short head of left biceps brachii', 'Short head of right biceps brachii'],
        'brachialis': ['Left brachialis', 'Right brachialis'],
        'coracobrachialis': ['Left coracobrachialis', 'Right coracobrachialis'],
        'triceps_brachii': ['Long head of left triceps brachii', 'Long head of right triceps brachii',
                            'Lateral head of left triceps brachii', 'Lateral head of right triceps brachii',
                            'Medial head of left triceps brachii', 'Medial head of right triceps brachii'],
        'brachioradialis': ['Left brachioradialis', 'Right brachioradialis'],
        'flexor_carpi_radialis': ['Left flexor carpi radialis', 'Right flexor carpi radialis'],
        'flexor_carpi_ulnaris': ['Humeral head of left flexor carpi ulnaris', 'Humeral head of right flexor carpi ulnaris',
                                 'Ulnar head of left flexor carpi ulnaris', 'Ulnar head of right flexor carpi ulnaris'],
        'extensor_digitorum': ['Left extensor digitorum', 'Right extensor digitorum'],
    },
}


def build_msk():
    wanted = {name: (region, key) for region, parts in MSK.items() for key, names in parts.items() for name in names}
    found = {region: {key: {'pos': [], 'idx': []} for key in parts} for region, parts in MSK.items()}
    seen_names = set()
    for name in sorted(os.listdir(ISA)):
        if not name.endswith('.obj'):
            continue
        path = os.path.join(ISA, name)
        english = english_name(path)
        target = wanted.get(english)
        if not target:
            continue
        region, key = target
        add_obj(path, key, group=found[region][key], flags=seen_names)
    missing = [(region, key) for region, parts in MSK.items() for key in parts
               if not found[region][key]['pos'] or not found[region][key]['idx']]
    if missing:
        print('MISSING MSK', missing, file=sys.stderr)
        sys.exit(1)

    allp = [c for parts in found.values() for g in parts.values() for c in g['pos']]
    mn = [min(allp[i::3]) for i in range(3)]
    mx = [max(allp[i::3]) for i in range(3)]
    ctr = [(a + b) / 2 for a, b in zip(mn, mx)]
    ext = max(b - a for a, b in zip(mn, mx)) / 2

    os.makedirs(os.path.join(HERE, 'msk'), exist_ok=True)
    manifest = {'center': ctr, 'scale': ext, 'regions': {}}
    for region, parts in found.items():
        index_bytes = 2 if all(max(g['idx']) <= 65535 for g in parts.values()) else 4
        index_format = 'H' if index_bytes == 2 else 'I'
        out = bytearray()
        meta = {'file': f'{region}.bin', 'indexBytes': index_bytes, 'parts': {}}
        for key, g in parts.items():
            q = [max(-32767, min(32767, round((c - ctr[i % 3]) / ext * 32767))) for i, c in enumerate(g['pos'])]
            off = len(out)
            out += struct.pack('<%dh' % len(q), *q)
            if len(out) % 4:
                out += b'\0' * (4 - len(out) % 4)
            ioff = len(out)
            out += struct.pack(f"<{len(g['idx'])}{index_format}", *g['idx'])
            meta['parts'][key] = {'p': [off, len(q)], 'i': [ioff, len(g['idx'])]}
        open(os.path.join(HERE, 'msk', meta['file']), 'wb').write(out)
        meta['bytes'] = len(out)
        manifest['regions'][region] = meta
        print('msk', region, len(out) // 1024, 'KB', len(parts), 'parts')
    json.dump(manifest, open(os.path.join(HERE, 'msk', 'models.json'), 'w'))
    print('msk ok', len(manifest['regions']), 'regions')



# ---------------------------------------------------------------------------
# SpeedGastro: one manifest + one .bin per group, same format as SpeedMSK.
# Run: python3 build_models.py gastro
# ---------------------------------------------------------------------------
def _lr(name):
    return ['Left ' + name, 'Right ' + name]

_TEETH = [f'{side} {jaw} {kind}' for side in ('Left', 'Right') for jaw in ('upper', 'lower') for kind in (
    'central secondary incisor tooth', 'lateral secondary incisor tooth', 'secondary canine tooth',
    'first secondary premolar tooth', 'second secondary premolar tooth',
    'first secondary molar tooth', 'second secondary molar tooth')]

GASTRO = {
    'head': {
        'tongue': ['Tongue'],
        'teeth': _TEETH,
        'submandibular_gland': _lr('submandibular gland'),
        'sublingual_gland': _lr('sublingual gland'),
        'superior_constrictor': _lr('superior pharyngeal constrictor'),
        'middle_constrictor': _lr('middle pharyngeal constrictor'),
        'inferior_constrictor': _lr('inferior pharyngeal constrictor'),
        'palatopharyngeus': _lr('palatopharyngeus'),
        'salpingopharyngeus': _lr('salpingopharyngeus'),
        'stylopharyngeus': _lr('stylopharyngeus'),
        'pharyngeal_raphe': ['Pharyngeal raphe'],
    },
    'organs': {
        'esophagus': ['Esophagus'],
        'diaphragm_g': ['Diaphragm'],
        'stomach': ['Stomach'],
        'duodenum': ['Duodenum'],
        'jejunum': ['Proximal part of jejunum', 'Middle part of jejunum', 'Distal part of jejunum'],
        'ileum': ['Proximal part of ileum', 'Middle part of ileum', 'Distal part of ileum'],
        'ileocecal_junction': ['Ileocecal junction'],
        'appendix': ['Appendix'],
        'mesoappendix': ['Mesoappendix'],
        'ascending_colon': ['Ascending colon'],
        'transverse_colon': ['Transverse colon'],
        'descending_colon': ['Descending colon'],
        'taeniae_coli': ['Taenia libera', 'Taenia mesocolica', 'Taenia omentalis'],
        'rectum': ['Rectum'],
        'external_anal_sphincter': ['External anal sphincter'],
        'puborectalis': _lr('puborectalis'),
        'caudate_lobe': ['Caudate lobe of liver'],
        'gallbladder': ['Gallbladder'],
        'cystic_duct': ['Cystic duct'],
        'common_hepatic_duct': ['Common hepatic duct'],
        'hepatic_ducts': ['Left hepatic duct', 'Right hepatic duct'],
        'pancreas': ['Parenchyma of pancreas'],
        'pancreatic_duct': ['Pancreatic duct tree'],
        'spleen': ['Spleen'],
    },
    'vessels': {
        'abdominal_aorta_g': ['Abdominal aorta'],
        'ivc_g': ['Inferior vena cava'],
        'celiac_trunk': ['Celiac trunk'],
        'left_gastric_a': ['Left gastric artery'],
        'right_gastric_a': ['Right gastric artery'],
        'common_hepatic_a': ['Common hepatic artery'],
        'proper_hepatic_a': ['Hepatic artery proper'],
        'gastroduodenal_a': ['Trunk of gastroduodenal artery'],
        'gastroepiploic_a': ['Left gastro-epiploic artery', 'Right gastro-epiploic artery'],
        'splenic_a': ['Splenic artery'],
        'pancreaticoduodenal_a': ['Anterior superior pancreaticoduodenal artery', 'Posterior superior pancreaticoduodenal artery',
                                  'Inferior pancreaticoduodenal artery', 'Anterior inferior pancreaticoduodenal artery',
                                  'Posterior inferior pancreaticoduodenal artery'],
        'sma': ['Trunk of superior mesenteric artery'],
        'ileocolic_a': ['Ileocolic artery'],
        'appendicular_a': ['Appendicular artery'],
        'right_colic_a': ['Right colic artery'],
        'middle_colic_a': ['Middle colic artery'],
        'ima': ['Inferior mesenteric artery'],
        'left_colic_a': ['Left colic artery'],
        'sigmoid_a': ['Sigmoid artery'],
        'superior_rectal_a': ['Superior rectal artery'],
        'hepatic_portal_v': ['Hepatic portal vein'],
        'splenic_v': ['Splenic vein'],
        'smv': ['Superior mesenteric vein'],
        'imv': ['Inferior mesenteric vein'],
        'gastric_v': ['Left gastric vein', 'Right gastric vein'],
        'hepatic_v': ['Left hepatic vein', 'Middle hepatic vein', 'Right hepatic vein'],
    },
}


def build_gastro():
    wanted = {name: (region, key) for region, parts in GASTRO.items() for key, names in parts.items() for name in names}
    found = {region: {key: {'pos': [], 'idx': []} for key in parts} for region, parts in GASTRO.items()}
    used = set()
    # Prefer the is-a files; fall back to part-of/extra only for names the is-a set lacks.
    for folder in (ISA, SRC, EXTRA):
        hits = []
        for name in sorted(os.listdir(folder)):
            if not name.endswith('.obj'):
                continue
            path = os.path.join(folder, name)
            english = english_name(path)
            if english in wanted and english not in used:
                hits.append((english, path))
        for english, path in hits:
            region, key = wanted[english]
            add_obj(path, key, group=found[region][key], flags=used)
        used.update(english for english, _ in hits)
    missing = [key for region, parts in found.items() for key, g in parts.items() if not g['idx']]
    if missing:
        print('MISSING GASTRO', missing, file=sys.stderr)
        sys.exit(1)
    allp = [c for parts in found.values() for g in parts.values() for c in g['pos']]
    mn = [min(allp[i::3]) for i in range(3)]
    mx = [max(allp[i::3]) for i in range(3)]
    ctr = [(a + b) / 2 for a, b in zip(mn, mx)]
    ext = max(b - a for a, b in zip(mn, mx)) / 2
    os.makedirs(os.path.join(HERE, 'gastro'), exist_ok=True)
    manifest = {'center': ctr, 'scale': ext, 'regions': {}}
    for region, parts in found.items():
        index_bytes = 2 if all(max(g['idx']) <= 65535 for g in parts.values()) else 4
        index_format = 'H' if index_bytes == 2 else 'I'
        out = bytearray()
        meta = {'file': f'{region}.bin', 'indexBytes': index_bytes, 'parts': {}}
        for key, g in parts.items():
            q = [max(-32767, min(32767, round((c - ctr[i % 3]) / ext * 32767))) for i, c in enumerate(g['pos'])]
            off = len(out)
            out += struct.pack('<%dh' % len(q), *q)
            if len(out) % 4:
                out += b'\0' * (4 - len(out) % 4)
            ioff = len(out)
            out += struct.pack(f"<{len(g['idx'])}{index_format}", *g['idx'])
            meta['parts'][key] = {'p': [off, len(q)], 'i': [ioff, len(g['idx'])]}
        open(os.path.join(HERE, 'gastro', meta['file']), 'wb').write(out)
        meta['bytes'] = len(out)
        manifest['regions'][region] = meta
        print('gastro', region, len(out) // 1024, 'KB', len(parts), 'parts')
    json.dump(manifest, open(os.path.join(HERE, 'gastro', 'models.json'), 'w'))
    print('gastro ok', sum(len(r['parts']) for r in manifest['regions'].values()), 'parts')


if 'gastro' in sys.argv[1:]:
    build_gastro()
    sys.exit(0)

if 'msk' in sys.argv[1:]:
    build_msk()
    sys.exit(0)


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
