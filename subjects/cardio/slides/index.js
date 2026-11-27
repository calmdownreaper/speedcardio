// Professor's slides: one question bank per lecture deck (Prof. Ratti, A.Y. 2026/27).
// Every row cites the slide it comes from (ref). Built by the slides audit in
// research/prof_slides/cobertura/. Answers rotate so the correct option is not fixed.
import heart from './heart.js?v=157';
import arteries from './arteries.js?v=157';
import veins from './veins.js?v=157';
import lymph from './lymph.js?v=157';
import cardiogenesis from './cardiogenesis.js?v=157';
import airwaysUpper from './airways_upper.js?v=157';
import airwaysLower from './airways_lower.js?v=157';

const HEART = ['ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'tp', 'vcs', 'vci'];

export const SLIDE_UNITS = {
  heart: { label: 'Heart', visible: HEART, ghost: [] },
  arteries: { label: 'Aorta and arteries', visible: ['aoasc', 'arco', 'aodesc', 'tbc', 'ccd', 'cce', 'scd', 'sce', 'axa_d', 'bra_d', 'rad_d', 'uln_d', 'ad', 'ae', 'vd', 've'], ghost: ['ad', 'ae', 'vd', 've'] },
  veins: { label: 'Veins', visible: ['vcs', 'vci', 'vbcd', 'vbce', 'azigo', 'hemiazigo', 'azigo_acs', 'ad', 'ae', 'vd', 've'], ghost: ['ad', 'ae', 'vd', 've'] },
  lymph: { label: 'Lymphatic system', visible: ['aodesc', 'esofago', 'azigo', 'vbcd', 'vbce', 'vcs', 'traqueia', 'ad', 'ae', 'vd', 've'], ghost: ['ad', 'ae', 'vd', 've', 'traqueia'] },
  cardiogenesis: { label: 'Cardiogenesis', visible: [...HEART, 'tbc', 'ccd', 'cce', 'scd', 'sce', 'apd', 'ape', 'aodesc'], ghost: [] },
  airwaysUpper: { label: 'Upper airways and larynx', visible: ['lar_hio', 'lar_tir', 'lar_cri', 'lar_epi', 'lar_ari', 'lar_cor', 'lar_mth', 'lar_mct'], ghost: [] },
  airwaysLower: { label: 'Trachea, bronchi and lungs', visible: ['traqueia', 'bpd', 'bpe', 'lobo_sup_d', 'lobo_med_d', 'lobo_inf_d', 'lobo_sup_e', 'lobo_inf_e'], ghost: ['lobo_sup_d', 'lobo_med_d', 'lobo_inf_d', 'lobo_sup_e', 'lobo_inf_e'] },
};

const BANKS = { heart, arteries, veins, lymph, cardiogenesis, airwaysUpper, airwaysLower };

export const SLIDE_QUESTIONS = Object.entries(BANKS).flatMap(([unit, rows]) => rows.map((row, index) => {
  const choices = [row.correct, ...row.wrong];
  const answer = (index * 3 + unit.length) % choices.length;
  return {
    ...row, unit, id: `${unit}:${row.ref}:${row.q}`, answer, highlight: /highlighted/i.test(row.q),
    options: choices.map((_, position) => choices[(position - answer + choices.length) % choices.length]),
  };
}));
