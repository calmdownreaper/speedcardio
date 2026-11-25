// SpeedCardio curriculum ordered macro-to-micro across Heart, Airways & lungs, and Thorax.
// All level IDs and intra-region chapters are preserved so sc2_ progress survives 1:1.

const CURRICULUM = [
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
    ['Papillary muscles', 'pap_vd_ant pap_vd_post pap_vd_sep pap_ve_al pap_ve_pm'],
  ]],
  ['coronarias', 'Coronary arteries', [
    ['Coronary trunks and major branches', 'acd tce dae cx dp'],
    ['Anterior and septal branches', 'diag vent_ant_d_dae cone_e sept_da sept_dp'],
    ['Right coronary branches', 'marg_d vent_ant_acd vent_post_acd'],
  ]],
  ['veias', 'Cardiac veins', [
    ['Venous drainage of the heart', 'seio vcmagna vcmedia vcparva vpve'],
  ]],
  ['laringe', 'Larynx', [
    ['Cartilages and hyoid', 'lar_hio lar_tir lar_cri lar_epi lar_ari lar_cor'],
    ['Membranes and ligaments', 'lar_mth lar_mct lar_vl lar_he lar_te'],
    ['Intrinsic muscles', 'lar_ct lar_pca lar_lca lar_arit lar_ta lar_voc'],
  ]],
  ['vias', 'Airways and lung lobes', [
    ['Trachea and main bronchi', 'traqueia bpd bpe'],
    ['Lobar bronchi', 'blob_sup_d bint_d blob_med_d blob_inf_d blob_sup_e blob_inf_e'],
    ['Lung lobes', 'lobo_sup_d lobo_med_d lobo_inf_d lobo_sup_e lobo_inf_e'],
  ]],
  ['segd', 'Right lung segments', [
    ['Right upper and middle lobes', 'sd_apical sd_post sd_ant sd_lat sd_med'],
    ['Right lower lobe', 'sd_sup sd_bmed sd_bant sd_blat sd_bpost'],
  ]],
  ['sege', 'Left lung segments', [
    ['Left upper lobe and its tongue-like part (lingula)', 'se_apical se_post se_ant se_lsup se_linf'],
    ['Left lower lobe', 'se_sup se_bmed se_bant se_blat se_bpost'],
  ]],
  ['artpulm', 'Pulmonary artery branches', [
    ['Right upper lobe arteries', 'a_sd_apical a_sd_post a_sd_ant'],
    ['Right middle and lower lobe arteries', 'lobmedd a_sd_lat a_sd_med lobinfd a_sd_sup a_sd_basal'],
    ['Left lung arteries', 'a_se_apical a_se_post a_se_ant a_se_lsup a_se_linf a_se_sup a_se_basal'],
  ]],
  ['veipulm', 'Pulmonary vein tributaries', [
    ['Right pulmonary vein tributaries', 'v_sd_apical v_sd_post v_sd_ant v_sd_lat v_sd_med v_sd_sup v_sd_bsup v_sd_binf'],
    ['Left pulmonary vein tributaries', 'v_se_apicpost v_se_ant v_se_ling v_se_sup v_se_bsup v_se_binf'],
  ]],
  ['mediastino', 'Mediastinum & thoracic wall', [
    ['Mediastinum: central compartment', 'esofago eso_art azigo hemiazigo azigo_acs timo_d timo_e'],
    ['Diaphragm and phrenic vessels', 'diafragma phren_inf_a_d phren_inf_a_e phren_inf_v phren_sup_v'],
    ['Thoracic wall vessels', 'ita_d ita_e itv_d itv_e pica_d1 pica_e1 pica_d2 pica_e2 pica_sup_d pica_sup_e icv_ant_d icv_ant_e'],
    ['Thoracic skeleton landmarks', 'manubrio esterno xifoide claviculas cart_costais costela_1 costela_2 costela_4 costela_5 costelas_rest vertebras_toracicas'],
    ['Thoracic outlet and chest wall vessels', 'vsc_d vsc_e ttc_d ttc_e tcc_d tcc_e pica_rest_d pica_rest_e mfa_d mfa_e aes_d aes_e'],
  ]],
  ['membro', 'Neck & upper limb arteries', [
    ['Subclavian branches in the neck', 'vert_d cid_d tirinf_d tcerv_d supsc_d dscap_d cervprof_d'],
    ['Axillary artery and its branches', 'axa_d torlat_d subsc_d circscap_d thdors_d chumant_d chumpost_d'],
    ['Brachial artery and the elbow anastomosis', 'bra_d bprof_d ucs_d uci_d radrec_d ulnrec_d iorec_d'],
    ['Forearm and hand', 'rad_d uln_d iocom_d ioant_d arcsup_d digpalm_d arcprof_d metpalm_d princeps_d indicis_d'],
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
    return { id, title, levels, ids: [...new Set(mixed)], area: ['laringe', 'vias', 'segd', 'sege', 'artpulm', 'veipulm'].includes(id) ? 'Airways and lungs' : id === 'mediastino' ? 'Thorax' : id === 'membro' ? 'Neck and upper limb' : 'Heart' };
  });
}

// Structures shown as surrounding ghost context in the mediastinum region.
export const REGION_CONTEXT = {
  membro: [
    'aoasc', 'arco', 'tbc', 'ccd', 'cce', 'scd', 'sce', 'ttc_d', 'tcc_d', 'ita_d', 'pica_sup_d', 'vsc_d',
    'claviculas', 'costela_1', 'manubrio', 'humero_d', 'radio_d', 'ulna_d',
  ],
  mediastino: [
    'ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'aodesc', 'tp', 'vcs', 'vci', 'traqueia', 'bpd', 'bpe',
    'esofago', 'diafragma', 'eso_art', 'azigo', 'hemiazigo', 'azigo_acs', 'timo_d', 'timo_e',
    'phren_inf_a_d', 'phren_inf_a_e', 'phren_inf_v', 'phren_sup_v',
    'ita_d', 'ita_e', 'itv_d', 'itv_e', 'pica_d1', 'pica_e1', 'pica_d2', 'pica_e2', 'pica_sup_d', 'pica_sup_e',
    'icv_ant_d', 'icv_ant_e',
    'manubrio', 'esterno', 'xifoide', 'claviculas', 'cart_costais', 'costela_1', 'costela_2', 'costela_4',
    'costela_5', 'costelas_rest', 'vertebras_toracicas',
    'scd', 'sce', 'vsc_d', 'vsc_e', 'ttc_d', 'ttc_e', 'tcc_d', 'tcc_e', 'mfa_d', 'mfa_e', 'aes_d', 'aes_e',
  ],
};
