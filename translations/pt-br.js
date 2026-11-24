// Brazilian Portuguese canonical names. Additional content must be translated
// before a locale switch can be offered for the full curriculum.
export const structureNames = {
  lar_hio: 'Osso hioide',
  lar_tir: 'Cartilagem tireóidea',
  lar_cri: 'Cartilagem cricóidea',
  lar_epi: 'Epiglote',
  lar_ari: 'Cartilagens aritenóideas',
  lar_cor: 'Cartilagens corniculadas',
  lar_mth: 'Membrana tireo-hióidea',
  lar_mct: 'Ligamento cricotireóideo mediano',
  lar_vl: 'Ligamentos vocais',
  lar_he: 'Ligamento hioepiglótico',
  lar_te: 'Ligamento tireoepiglótico',
  lar_ct: 'Músculo cricotireóideo',
  lar_pca: 'Músculo cricoaritenóideo posterior',
  lar_lca: 'Músculo cricoaritenóideo lateral',
  lar_arit: 'Músculos interaritenóideos',
  lar_ta: 'Músculo tireoaritenóideo',
  lar_voc: 'Músculo vocal',
};

// Corrections for names whose literal translation is ambiguous in anatomy.
Object.assign(structureNames, {
  pulm_ant_d: 'Cúspide anterior direita da valva pulmonar',
  pulm_ant_e: 'Cúspide anterior esquerda da valva pulmonar',
  pulm_post: 'Cúspide posterior da valva pulmonar',
  tce: 'Tronco da artéria coronária esquerda',
  vent_ant_d_dae: 'Ramos ventriculares anteriores direitos da artéria interventricular anterior',
  cone_e: 'Ramo do cone da artéria interventricular anterior',
  sept_da: 'Ramos septais da artéria interventricular anterior',
  sept_dp: 'Ramos septais da artéria interventricular posterior',
  vent_ant_acd: 'Ramo ventricular anterior da artéria coronária direita',
  vent_post_acd: 'Ramo ventricular posterior da artéria coronária direita',
  v_se_ling: 'Veia lingular',
  nasion: 'Násio', axis: 'Áxis', radius: 'Rádio',
  longus_colli: 'Longo do pescoço', levatores_costarum: 'Levantadores das costelas',
  xiphisternal_joint: 'Articulação xifoesternal',
  glenoid_labrum: 'Lábio glenoidal', teres_major: 'Redondo maior',
  rectus_sheath: 'Bainha do reto do abdome', plantaris: 'Plantar',
});
