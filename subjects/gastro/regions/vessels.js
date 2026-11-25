// SpeedGastro · GI vessels. Structure names only; facts come later from the professor's slides.
const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });
export const deck = { id: "vessels", titulo: "GI vessels", cor: "#c0504d", ctx: [], itens: [
  S("abdominal_aorta_g", "Abdominal aorta", "Abdominal aorta", ["Aorta abdominal"], "", []),
  S("ivc_g", "Inferior vena cava", "Inferior vena cava", ["Veia cava inferior"], "", []),
  S("celiac_trunk", "Celiac trunk", "Celiac trunk", ["Tronco celíaco"], "", []),
  S("left_gastric_a", "Left gastric artery", "Left gastric artery", ["Artéria gástrica esquerda"], "", []),
  S("right_gastric_a", "Right gastric artery", "Right gastric artery", ["Artéria gástrica direita"], "", []),
  S("common_hepatic_a", "Common hepatic artery", "Common hepatic artery", ["Artéria hepática comum"], "", []),
  S("proper_hepatic_a", "Proper hepatic artery", "Proper hepatic artery", ["Artéria hepática própria"], "", []),
  S("gastroduodenal_a", "Gastroduodenal artery", "Gastroduodenal artery", ["Artéria gastroduodenal"], "", []),
  S("gastroepiploic_a", "Gastro-omental arteries", "Gastro-omental arteries", ["Artérias gastromentais"], "", []),
  S("splenic_a", "Splenic artery", "Splenic artery", ["Artéria esplênica"], "", []),
  S("pancreaticoduodenal_a", "Pancreaticoduodenal arteries", "Pancreaticoduodenal arteries", ["Artérias pancreaticoduodenais"], "", []),
  S("sma", "Superior mesenteric artery", "Superior mesenteric artery", ["Artéria mesentérica superior"], "", []),
  S("ileocolic_a", "Ileocolic artery", "Ileocolic artery", ["Artéria ileocólica"], "", []),
  S("appendicular_a", "Appendicular artery", "Appendicular artery", ["Artéria apendicular"], "", []),
  S("right_colic_a", "Right colic artery", "Right colic artery", ["Artéria cólica direita"], "", []),
  S("middle_colic_a", "Middle colic artery", "Middle colic artery", ["Artéria cólica média"], "", []),
  S("ima", "Inferior mesenteric artery", "Inferior mesenteric artery", ["Artéria mesentérica inferior"], "", []),
  S("left_colic_a", "Left colic artery", "Left colic artery", ["Artéria cólica esquerda"], "", []),
  S("sigmoid_a", "Sigmoid arteries", "Sigmoid arteries", ["Artérias sigmóideas"], "", []),
  S("superior_rectal_a", "Superior rectal artery", "Superior rectal artery", ["Artéria retal superior"], "", []),
  S("hepatic_portal_v", "Hepatic portal vein", "Hepatic portal vein", ["Veia porta do fígado"], "", []),
  S("splenic_v", "Splenic vein", "Splenic vein", ["Veia esplênica"], "", []),
  S("smv", "Superior mesenteric vein", "Superior mesenteric vein", ["Veia mesentérica superior"], "", []),
  S("imv", "Inferior mesenteric vein", "Inferior mesenteric vein", ["Veia mesentérica inferior"], "", []),
  S("gastric_v", "Gastric veins", "Gastric veins", ["Veias gástricas"], "", []),
  S("hepatic_v", "Hepatic veins", "Hepatic veins", ["Veias hepáticas"], "", []),
]};
export const region = { id: "vessels", title: "GI vessels", area: "Abdomen" };
export const levels = [{ title: "GI vessels", ids: ["abdominal_aorta_g", "ivc_g", "celiac_trunk", "left_gastric_a", "right_gastric_a", "common_hepatic_a", "proper_hepatic_a", "gastroduodenal_a", "gastroepiploic_a", "splenic_a", "pancreaticoduodenal_a", "sma", "ileocolic_a", "appendicular_a", "right_colic_a", "middle_colic_a", "ima", "left_colic_a", "sigmoid_a", "superior_rectal_a", "hepatic_portal_v", "splenic_v", "smv", "imv", "gastric_v", "hepatic_v"] }];
export const colors = {"abdominal_aorta_g": "#c0504d", "ivc_g": "#4a6fb5", "celiac_trunk": "#c0504d", "left_gastric_a": "#c0504d", "right_gastric_a": "#c0504d", "common_hepatic_a": "#c0504d", "proper_hepatic_a": "#c0504d", "gastroduodenal_a": "#c0504d", "gastroepiploic_a": "#c0504d", "splenic_a": "#c0504d", "pancreaticoduodenal_a": "#c0504d", "sma": "#c0504d", "ileocolic_a": "#c0504d", "appendicular_a": "#c0504d", "right_colic_a": "#c0504d", "middle_colic_a": "#c0504d", "ima": "#c0504d", "left_colic_a": "#c0504d", "sigmoid_a": "#c0504d", "superior_rectal_a": "#c0504d", "hepatic_portal_v": "#4a6fb5", "splenic_v": "#4a6fb5", "smv": "#4a6fb5", "imv": "#4a6fb5", "gastric_v": "#4a6fb5", "hepatic_v": "#4a6fb5"};
export const markers = {}; export const markerMeta = {};
export const purpose = '';
export const overview = '';
export const lessons = {}; export const lessonCues = {}; export const roundClues = {};
export const content = {}; export const viewHints = {};
