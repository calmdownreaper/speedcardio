import { COLORS, DECKS, DEFAULT_COLOR } from './data.js?v=160';
import * as material from './content.js?v=160';
import { LESSONS } from './lessons.js?v=160';
import { TERRITORIES } from './territories.js?v=160';
import { BLOOD_FLOW } from './bloodflow.js?v=160';
import { BRANCHES, BRANCH_GROUPS } from './branches.js?v=160';
import { buildRegions, REGION_CONTEXT } from './curriculum.js?v=160';
import { SLIDE_QUESTIONS, SLIDE_UNITS } from './slides/index.js?v=160';
import { HEART_AULAS, HEART_AULAS_PT } from './aulas-heart.js?v=160';
import { AORTA_AULAS, AORTA_AULAS_PT } from './aulas-aorta.js?v=160';
import { VEINS_AULAS, VEINS_AULAS_PT } from './aulas-veins.js?v=160';
import { LYMPH_AULAS, LYMPH_AULAS_PT } from './aulas-lymph.js?v=160';
import { CARDIOGENESIS_AULAS, CARDIOGENESIS_AULAS_PT } from './aulas-cardiogenesis.js?v=160';
import { RESP1_AULAS, RESP1_AULAS_PT } from './aulas-resp1.js?v=160';
import { RESP2_AULAS, RESP2_AULAS_PT } from './aulas-resp2.js?v=160';
import { ARTERY_TREE, ARTERY_TREE_PT } from './aulas-artery-tree.js?v=160';
import { BRANCHES_PT } from './aulas-branches-pt.js?v=160';
import { createBloodFlowDrill } from './aulas-bloodflow.js?v=160';
import { createAulaSequences } from './aulas-sequences.js?v=160';
import { NOTES, NOTES_PT } from './notes.js?v=160';

const ITEMS = Object.fromEntries(DECKS.flatMap(deck => deck.itens.map(item => [item.id, { ...item, deck }])));

const REGION_PURPOSES = {
  orientation: 'Learn directions and the landmarks used throughout the path.',
  camaras: 'Locate the four chambers and their shared muscle wall.',
  vasos: 'Trace the large vessels entering and leaving the heart.',
  valvas: 'Find the one-way valve flaps and their supporting muscles.',
  laringe: 'Name the cartilages, ligaments and the muscles that move the vocal folds.',
  coronarias: 'Follow the arteries across the heart’s surface.',
  veias: 'Trace the veins returning blood from the heart muscle.',
  vias: 'Follow the airway fork into the lobar bronchi and the five lobes.',
  segd: 'Locate the segments within the three right lung lobes.',
  sege: 'Locate the segments within the two left lung lobes.',
  artpulm: 'Follow the pulmonary artery into each lobe and segment beside its bronchus.',
  veipulm: 'Trace the intersegmental veins back to the four pulmonary veins.',
  mediastino: 'Explore the central compartment, chest wall vessels and thoracic skeleton.',
  membro: 'Follow the subclavian into the neck, then the axillary, brachial, radial and ulnar arteries down to the palmar arches.',
};

const SKELETON_IDS = ['manubrio', 'esterno', 'xifoide', 'claviculas', 'cart_costais', 'costela_1', 'costela_2', 'costela_4', 'costela_5', 'costelas_rest', 'vertebras_toracicas'];

function baseColor(id) {
  if (COLORS[id]) return COLORS[id];
  const deck = ITEMS[id]?.deck.id;
  if (deck === 'coronarias') return '#d35b54';
  if (deck === 'valvas') return id.startsWith('pap') ? '#d77a6e' : '#f0dcc4';
  if (deck === 'segd' || deck === 'sege') {
    const segment = id.slice(3);
    if (['apical', 'post', 'ant'].includes(segment)) return '#67b39b';
    if (['lat', 'med', 'lsup', 'linf'].includes(segment)) return '#d6aa6c';
    return '#759ebc';
  }
  return DEFAULT_COLOR;
}

// Keep hidden/posterior landmarks in their teaching view. Lateral views
// provide another useful angle for landmarks on the lateral heart/lung borders.
function teachingView(id) {
  if (/^(pulm_|ao_ant$|ao_post|tri_|mit_|pap_)/.test(id)) return 'sup';
  if (['diafragma', 'phren_inf_a_d', 'phren_inf_a_e', 'phren_inf_v', 'phren_sup_v'].includes(id)) return 'inf';
  if (['ae', 'vpsd', 'vpid', 'vpse', 'vpie', 'seio', 'dp', 'vcmedia', 'aodesc', 'esofago', 'azigo', 'hemiazigo', 'sept_dp', 'vent_post_acd', 'vpve', 'apd',
    'azigo_acs', 'eso_art', 'vertebras_toracicas', 'pica_d1', 'pica_e1', 'pica_d2', 'pica_e2', 'pica_sup_d', 'pica_sup_e',
    'a_sd_sup', 'a_se_sup', 'v_sd_sup', 'v_se_sup', 'a_sd_basal', 'a_se_basal', 'lobinfd', 'blob_inf_d', 'blob_inf_e', 'lobo_inf_d', 'lobo_inf_e', 'v_sd_binf', 'v_se_binf', 'pica_rest_d', 'pica_rest_e', 'tcc_d', 'tcc_e',
    'dscap_d', 'circscap_d', 'chumpost_d', 'cervprof_d', 'iorec_d'].includes(id)
      || /_(post|bpost)$/.test(id)) return 'post';
  return 'ant';
}
function memoryView(id) {
  if (['ad', 'acd', 'marg_d', 'vcparva', 'sd_lat', 'sd_blat', 'lobo_sup_d', 'lobo_med_d', 'lobo_inf_d'].includes(id)) return 'dir';
  if (['ve', 'cx', 'se_blat', 'lobo_sup_e', 'lobo_inf_e'].includes(id)) return 'esq';
  return teachingView(id);
}

const regions = buildRegions(ITEMS);

const CLINICAL_ABBR = {
  ad: 'RA', ae: 'LA', vd: 'RV', ve: 'LV',
  acd: 'RCA', tce: 'LMCA', dae: 'LAD', cx: 'LCx', dp: 'PDA',
  vcs: 'SVC', vci: 'IVC', tp: 'MPA', apd: 'RPA', ape: 'LPA',
  vpsd: 'RSPV', vpid: 'RIPV', vpse: 'LSPV', vpie: 'LIPV',
  seio: 'CS', vcmagna: 'GCV', vcmedia: 'MCV', vcparva: 'SCV',
  bpd: 'RMB', bpe: 'LMB', bint_d: 'BI',
  lobo_sup_d: 'RUL', lobo_med_d: 'RML', lobo_inf_d: 'RLL', lobo_sup_e: 'LUL', lobo_inf_e: 'LLL',
  ccd: 'RCCA', cce: 'LCCA', scd: 'RSCA', sce: 'LSCA',
  ita_d: 'RITA', ita_e: 'LITA',
  lar_pca: 'PCA', lar_lca: 'LCA',
};

const VEIN_ARTERY_PAIRS = {
  vcmagna: { arteries: ['dae', 'cx'], label: 'LAD / LCx' },
  vcmedia: { arteries: ['dp'], label: 'PDA' },
  vcparva: { arteries: ['acd'], label: 'RCA' },
  vpve: { arteries: ['vent_post_acd'], label: 'Posterolateral branches' },
  seio: { arteries: ['cx', 'dp'], label: 'LCx / PDA (AV groove)' },
};

const CROSS_NEIGHBOR_PAIRS = [
  ['vcmagna', 'dae', 'The great cardiac vein drains along the anterior groove beside the LAD before curving under the left auricle beside the LCx.'],
  ['vcmagna', 'cx', 'The great cardiac vein accompanies the circumflex artery in the left AV groove before widening into the coronary sinus.'],
  ['vcmedia', 'dp', 'The middle cardiac vein ascends beside the PDA in the posterior interventricular groove toward the coronary sinus.'],
  ['vcparva', 'acd', 'The small cardiac vein runs in the right AV groove alongside the RCA before opening into the coronary sinus.'],
  ['vpve', 'vent_post_acd', 'The posterior vein of the LV ascends on the inferior LV wall near the posterolateral arterial branches.'],
  ['seio', 'cx', 'The coronary sinus is the wide venous channel in the posterior left AV groove; the circumflex artery runs alongside it.'],
  ['pulm_post', 'ao_ant', 'In the superior view, the pulmonary valve sits anteriorly and the aortic valve sits posteriorly right behind it.'],
  ['pulm_ant_d', 'ao_ant', 'Pulmonary cusps guard the anterior outflow trunk to the lungs; aortic cusps sit posteriorly at the root of the aorta.'],
  ['mit_ant', 'ao_post_e', 'The anterior mitral leaflet is an inlet flap continuous with the aortic root, whereas aortic cusps guard the outflow tract.'],
  ['tri_sep', 'mit_ant', 'The septal tricuspid leaflet sits on the right and attaches more apically than the anterior mitral leaflet on the left.'],
  ['aoasc', 'tp', 'The pulmonary trunk arises anteriorly from the RV and crosses in front of the ascending aorta, which rises behind it from the LV.'],
  ['ad', 'vcs', 'The SVC enters the upper right atrium from above; the right atrium is the chamber forming the right cardiac border.'],
  ['ad', 'vci', 'The IVC ascends through the diaphragm at T8 into the inferior right atrium; the right atrium is the receiving chamber itself.'],
  ['vd', 'tp', 'The right ventricle is the broad anterior chamber whose infundibulum narrows upward into the pulmonary trunk.'],
  ['ve', 'aoasc', 'The left ventricle forms the thick-walled apex; the ascending aorta is the systemic outflow vessel rising from it.'],
  ['ae', 'esofago', 'The left atrium forms the posterior cardiac base; the esophagus is the muscular tube descending directly behind it.'],
  ['aodesc', 'esofago', 'The descending thoracic aorta runs to the left of the vertebral bodies, whereas the esophagus descends in front of it toward T10.'],
  ['traqueia', 'esofago', 'The trachea is the anterior cartilaginous airway; the esophagus lies directly posterior to its membranous wall.'],
  ['bpd', 'apd', 'The right main bronchus is the airway fork to the right lung; the right pulmonary artery crosses anterior to it at the hilum.'],
  ['bpe', 'ape', 'The left main bronchus passes beneath the aortic arch and left pulmonary artery; the artery arches above it.'],
];

const NEIGHBOR_MAP = {};
const PAIR_CONTRASTS = {};
for (const [a, b, text] of CROSS_NEIGHBOR_PAIRS) {
  (NEIGHBOR_MAP[a] ??= []).push(b);
  (NEIGHBOR_MAP[b] ??= []).push(a);
  PAIR_CONTRASTS[[a, b].sort().join('|')] = text;
}

export default {
  id: 'cardio',
  name: 'SpeedCardio',
  tagline: 'Heart and lung anatomy',
  description: 'Study the heart and lungs with 3D anatomy, recall drills, and oral exam practice.',
  storagePrefix: 'sc2_',
  slideQuestions: SLIDE_QUESTIONS,
  slideUnits: SLIDE_UNITS,
  aulas: [...HEART_AULAS, ...AORTA_AULAS, ...VEINS_AULAS, ...LYMPH_AULAS, ...CARDIOGENESIS_AULAS, ...RESP1_AULAS, ...RESP2_AULAS],
  aulasPt: {
    ...HEART_AULAS_PT, ...AORTA_AULAS_PT, ...VEINS_AULAS_PT, ...LYMPH_AULAS_PT,
    ...CARDIOGENESIS_AULAS_PT, ...RESP1_AULAS_PT, ...RESP2_AULAS_PT,
  },
  notes: NOTES,
  notesPt: NOTES_PT,
  arteryTree: ARTERY_TREE,
  arteryTreePt: ARTERY_TREE_PT,
  branchesPt: BRANCHES_PT,
  createBloodFlowDrill,
  createAulaSequences,
  groupMapByArea: true,
  decks: DECKS,
  colors: COLORS,
  defaultColor: DEFAULT_COLOR,
  baseColor,
  regions,
  regionContext: REGION_CONTEXT,
  regionPurposes: REGION_PURPOSES,
  clinicalAbbr: CLINICAL_ABBR,
  veinArteryPairs: VEIN_ARTERY_PAIRS,
  neighborMap: NEIGHBOR_MAP,
  pairContrasts: PAIR_CONTRASTS,
  content: {
    CONTENT: material.CONTENT || {},
    THEORY: material.THEORY || [],
    ORIENTATION: (material.ORIENTATION || []).filter(step => step?.title),
    LESSON_CUES: material.LESSON_CUES || {},
    LESSON_DETAIL: material.LESSON_DETAIL || {},
    REGION_OVERVIEW: material.REGION_OVERVIEW || {},
    LEVEL_OVERVIEW: material.LEVEL_OVERVIEW || {},
    LEVEL_CONTRAST: material.LEVEL_CONTRAST || {},
    LEVEL_CHECK: material.LEVEL_CHECK || {},
    ROUND_CLUES: material.ROUND_CLUES || {},
  },
  lessons: LESSONS,
  theory: material.THEORY || [],
  orientation: (material.ORIENTATION || []).filter(step => step?.title),
  territories: TERRITORIES,
  branches: BRANCHES,
  branchGroups: BRANCH_GROUPS,
  bloodFlow: BLOOD_FLOW,
  model: { kind: 'packed', manifest: './models.json', minDistanceMm: 12 },
  markers: {},
  atlasIds: [...new Set(regions.flatMap(region => region.ids))],
  // The arm reaches far below the thorax, so its arteries start hidden to keep the heart large in the opening frame.
  atlasHidden: [...SKELETON_IDS, ...(regions.find(region => region.id === 'membro')?.ids || [])],
  skeletonIds: SKELETON_IDS,
  mapDefaultIds: ['ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'tp', 'vcs', 'traqueia', 'bpd', 'bpe'],
  mapHeading: 'Heart & lungs map',
  atlasNote: 'The thoracic skeleton and the neck and upper limb arteries start hidden; tick them in the list to show them.',
  teachingView,
  memoryView,
};
