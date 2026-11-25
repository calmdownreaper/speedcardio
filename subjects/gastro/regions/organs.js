// SpeedGastro · GI organs. Structure names only; facts come later from the professor's slides.
const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });
export const deck = { id: "organs", titulo: "GI organs", cor: "#d9a066", ctx: [], itens: [
  S("esophagus", "Esophagus", "Esophagus", ["Esôfago"], "", []),
  S("diaphragm_g", "Diaphragm", "Diaphragm", ["Diafragma"], "", []),
  S("stomach", "Stomach", "Stomach", ["Estômago"], "", []),
  S("duodenum", "Duodenum", "Duodenum", ["Duodeno"], "", []),
  S("jejunum", "Jejunum", "Jejunum", ["Jejuno"], "", []),
  S("ileum", "Ileum", "Ileum", ["Íleo"], "", []),
  S("ileocecal_junction", "Ileocecal junction", "Ileocecal junction", ["Junção ileocecal"], "", []),
  S("appendix", "Vermiform appendix", "Vermiform appendix", ["Apêndice vermiforme"], "", []),
  S("mesoappendix", "Mesoappendix", "Mesoappendix", ["Mesoapêndice"], "", []),
  S("ascending_colon", "Ascending colon", "Ascending colon", ["Colo ascendente"], "", []),
  S("transverse_colon", "Transverse colon", "Transverse colon", ["Colo transverso"], "", []),
  S("descending_colon", "Descending colon", "Descending colon", ["Colo descendente"], "", []),
  S("taeniae_coli", "Taeniae coli", "Taeniae coli", ["Tênias do colo"], "", []),
  S("rectum", "Rectum", "Rectum", ["Reto"], "", []),
  S("external_anal_sphincter", "External anal sphincter", "External anal sphincter", ["Esfíncter externo do ânus"], "", []),
  S("puborectalis", "Puborectalis", "Puborectalis", ["Puborretal"], "", []),
  S("caudate_lobe", "Caudate lobe of liver", "Caudate lobe of liver", ["Lobo caudado do fígado"], "", []),
  S("gallbladder", "Gallbladder", "Gallbladder", ["Vesícula biliar"], "", []),
  S("cystic_duct", "Cystic duct", "Cystic duct", ["Ducto cístico"], "", []),
  S("common_hepatic_duct", "Common hepatic duct", "Common hepatic duct", ["Ducto hepático comum"], "", []),
  S("hepatic_ducts", "Right and left hepatic ducts", "Right and left hepatic ducts", ["Ductos hepáticos direito e esquerdo"], "", []),
  S("pancreas", "Pancreas", "Pancreas", ["Pâncreas"], "", []),
  S("pancreatic_duct", "Pancreatic duct", "Pancreatic duct", ["Ducto pancreático"], "", []),
  S("spleen", "Spleen", "Spleen", ["Baço"], "", []),
]};
export const region = { id: "organs", title: "GI organs", area: "Abdomen" };
export const levels = [{ title: "GI organs", ids: ["esophagus", "diaphragm_g", "stomach", "duodenum", "jejunum", "ileum", "ileocecal_junction", "appendix", "mesoappendix", "ascending_colon", "transverse_colon", "descending_colon", "taeniae_coli", "rectum", "external_anal_sphincter", "puborectalis", "caudate_lobe", "gallbladder", "cystic_duct", "common_hepatic_duct", "hepatic_ducts", "pancreas", "pancreatic_duct", "spleen"] }];
export const colors = {"esophagus": "#d9a066", "diaphragm_g": "#d9a066", "stomach": "#d9a066", "duodenum": "#d9a066", "jejunum": "#d9a066", "ileum": "#d9a066", "ileocecal_junction": "#d9a066", "appendix": "#d9a066", "mesoappendix": "#d9a066", "ascending_colon": "#d9a066", "transverse_colon": "#d9a066", "descending_colon": "#d9a066", "taeniae_coli": "#d9a066", "rectum": "#d9a066", "external_anal_sphincter": "#d9a066", "puborectalis": "#d9a066", "caudate_lobe": "#d9a066", "gallbladder": "#d9a066", "cystic_duct": "#d9a066", "common_hepatic_duct": "#d9a066", "hepatic_ducts": "#d9a066", "pancreas": "#d9a066", "pancreatic_duct": "#d9a066", "spleen": "#d9a066"};
export const markers = {}; export const markerMeta = {};
export const purpose = '';
export const overview = '';
export const lessons = {}; export const lessonCues = {}; export const roundClues = {};
export const content = {}; export const viewHints = {};
