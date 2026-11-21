// SpeedCardio curriculum. Kept byte-for-byte equivalent to the original
// study.js CURRICULUM so level ids, unlock order and sc2_ progress survive.

const CURRICULUM = [
  ['laringe', 'Larynx', [
    ['Cartilages and hyoid', 'lar_hio lar_tir lar_cri lar_epi lar_ari lar_cor'],
    ['Membranes and ligaments', 'lar_mth lar_mct lar_vl lar_he lar_te'],
    ['Intrinsic muscles', 'lar_ct lar_pca lar_lca lar_arit lar_ta lar_voc'],
  ]],
  ['coronarias', 'Coronary arteries', [
    ['Coronary trunks and major branches', 'acd tce dae cx dp'],
    ['Anterior and septal branches', 'diag vent_ant_d_dae cone_e sept_da sept_dp'],
    ['Right coronary branches', 'marg_d vent_ant_acd vent_post_acd'],
  ]],
  ['camaras', 'Chambers', [
    ['Atria and ventricles', 'ad ae vd ve paredev'],
  ]],
  ['vasos', 'Great vessels', [
    ['Aorta and arch branches', 'aoasc arco aodesc tbc cce sce'],
    ['Systemic vessels', 'ccd scd vcs vci vbcd vbce'],
    ['Pulmonary arteries', 'tp apd ape lobsupd'],
    ['Pulmonary veins', 'vpsd vpid vpse vpie'],
    ['Mediastinal neighbors', 'azigo hemiazigo esofago timo_d timo_e'],
  ]],
  ['valvas', 'Valves and papillary muscles', [
    ['Atrioventricular leaflets', 'tri_ant tri_post tri_sep mit_ant mit_post'],
    ['Semilunar cusps', 'pulm_ant_d pulm_ant_e pulm_post ao_ant ao_post_e ao_post_d'],
    ['Papillary muscles', 'pap_vd_ant pap_vd_post pap_vd_sep pap_ve_al'],
  ]],
  ['veias', 'Cardiac veins', [
    ['Venous drainage of the heart', 'seio vcmagna vcmedia vcparva vpve'],
  ]],
  ['vias', 'Trachea and bronchi', [
    ['Trachea and main bronchi', 'traqueia bpd bpe'],
  ]],
  ['segd', 'Right lung segments', [
    ['Right upper and middle lobes', 'sd_apical sd_post sd_ant sd_lat sd_med'],
    ['Right lower lobe', 'sd_sup sd_bmed sd_bant sd_blat sd_bpost'],
  ]],
  ['sege', 'Left lung segments', [
    ['Left upper lobe and its tongue-like part (lingula)', 'se_apical se_post se_ant se_lsup se_linf'],
    ['Left lower lobe', 'se_sup se_bmed se_bant se_blat se_bpost'],
  ]],
  ['mediastino', 'Mediastinum & thoracic wall', [
    ['Mediastinum: central compartment', 'esofago eso_art azigo hemiazigo azigo_acs timo_d timo_e'],
    ['Diaphragm and phrenic vessels', 'diafragma phren_inf_a_d phren_inf_a_e phren_inf_v phren_sup_v'],
    ['Thoracic wall vessels', 'ita_d ita_e itv_d itv_e pica_d1 pica_e1 pica_d2 pica_e2 pica_sup_d pica_sup_e icv_ant_d icv_ant_e'],
    ['Thoracic skeleton landmarks', 'manubrio esterno xifoide claviculas cart_costais costela_1 costela_2 costela_4 costela_5 costelas_rest vertebras_toracicas'],
  ]],
];

function mixGroups(groups) {
  return Array.from({ length: Math.max(...groups.map(group => group.length)) }, (_, index) =>
    groups.flatMap(group => group[index] ? [group[index]] : [])).flat();
}

export function buildRegions(ITEMS) {
  return CURRICULUM.map(([id, title, chapters]) => {
    const levels = chapters.map(([name, ids], index) => ({
      id: `${id}-${index + 1}`, region: id, title: name, ids: ids.toLowerCase().split(' ').filter(key => ITEMS[key]),
    })).filter(level => level.ids.length);
    const mixed = mixGroups(levels.map(level => level.ids));
    const runs = Math.min(2, Math.ceil(mixed.length / 6));
    for (let part = 0; part < runs; part++) {
      const suffix = runs > 1 ? ` · Part ${part + 1}` : '';
      const start = Math.round(part * mixed.length / runs);
      const end = Math.round((part + 1) * mixed.length / runs);
      levels.push({ id: `${id}-speed-${part + 1}`, region: id, title: `Speed run${suffix}`, ids: mixed.slice(start, end), speed: true });
    }
    return { id, title, levels, ids: [...new Set(mixed)], area: ['vias', 'segd', 'sege'].includes(id) ? 'Lungs' : id === 'mediastino' ? 'Thorax' : id === 'laringe' ? 'Neck' : 'Heart' };
  });
}

// Structures shown as surrounding ghost context in the mediastinum region.
export const REGION_CONTEXT = {
  mediastino: [
    'ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'aodesc', 'tp', 'vcs', 'vci', 'traqueia', 'bpd', 'bpe',
    'esofago', 'diafragma', 'eso_art', 'azigo', 'hemiazigo', 'azigo_acs', 'timo_d', 'timo_e',
    'phren_inf_a_d', 'phren_inf_a_e', 'phren_inf_v', 'phren_sup_v',
    'ita_d', 'ita_e', 'itv_d', 'itv_e', 'pica_d1', 'pica_e1', 'pica_d2', 'pica_e2', 'pica_sup_d', 'pica_sup_e',
    'icv_ant_d', 'icv_ant_e',
    'manubrio', 'esterno', 'xifoide', 'claviculas', 'cart_costais', 'costela_1', 'costela_2', 'costela_4',
    'costela_5', 'costelas_rest', 'vertebras_toracicas',
  ],
};
