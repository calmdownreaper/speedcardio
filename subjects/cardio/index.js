import { COLORS, DECKS, DEFAULT_COLOR } from './data.js?v=61';
import * as material from './content.js?v=61';
import { LESSONS } from './lessons.js?v=61';
import { TERRITORIES } from './territories.js?v=61';
import { buildRegions, REGION_CONTEXT } from './curriculum.js?v=61';

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
    'a_sd_sup', 'a_se_sup', 'v_sd_sup', 'v_se_sup', 'a_sd_basal', 'a_se_basal', 'lobinfd', 'blob_inf_d', 'blob_inf_e', 'lobo_inf_d', 'lobo_inf_e', 'v_sd_binf', 'v_se_binf', 'pica_rest_d', 'pica_rest_e', 'tcc_d', 'tcc_e'].includes(id)
      || /_(post|bpost)$/.test(id)) return 'post';
  return 'ant';
}
function memoryView(id) {
  if (['ad', 'acd', 'marg_d', 'vcparva', 'sd_lat', 'sd_blat', 'lobo_sup_d', 'lobo_med_d', 'lobo_inf_d'].includes(id)) return 'dir';
  if (['ve', 'cx', 'se_blat', 'lobo_sup_e', 'lobo_inf_e'].includes(id)) return 'esq';
  return teachingView(id);
}

const regions = buildRegions(ITEMS);

export default {
  id: 'cardio',
  name: 'SpeedCardio',
  tagline: 'Heart and lung anatomy',
  description: 'Study the heart and lungs with 3D anatomy, recall drills, and oral exam practice.',
  storagePrefix: 'sc2_',
  decks: DECKS,
  colors: COLORS,
  defaultColor: DEFAULT_COLOR,
  baseColor,
  regions,
  regionContext: REGION_CONTEXT,
  regionPurposes: REGION_PURPOSES,
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
  model: { kind: 'packed', manifest: './models.json' },
  markers: {},
  atlasIds: [...new Set(regions.flatMap(region => region.ids))],
  atlasHidden: SKELETON_IDS,
  skeletonIds: SKELETON_IDS,
  mapDefaultIds: ['ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'tp', 'vcs', 'traqueia', 'bpd', 'bpe'],
  mapHeading: 'Heart & lungs map',
  atlasNote: 'The thoracic skeleton starts hidden; tick it in the list to show it.',
  teachingView,
  memoryView,
};
