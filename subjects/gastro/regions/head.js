// SpeedGastro · Mouth & pharynx. Structure names only; facts come later from the professor's slides.
const S = (id, pt, en, alt, dica, fatos) => ({ id, pt, en, alt, dica, fatos });
export const deck = { id: "head", titulo: "Mouth & pharynx", cor: "#c98a7a", ctx: [], itens: [
  S("tongue", "Tongue", "Tongue", ["Língua"], "", []),
  S("teeth", "Permanent teeth", "Permanent teeth", ["Dentes permanentes"], "", []),
  S("submandibular_gland", "Submandibular gland", "Submandibular gland", ["Glândula submandibular"], "", []),
  S("sublingual_gland", "Sublingual gland", "Sublingual gland", ["Glândula sublingual"], "", []),
  S("superior_constrictor", "Superior pharyngeal constrictor", "Superior pharyngeal constrictor", ["Constritor superior da faringe"], "", []),
  S("middle_constrictor", "Middle pharyngeal constrictor", "Middle pharyngeal constrictor", ["Constritor médio da faringe"], "", []),
  S("inferior_constrictor", "Inferior pharyngeal constrictor", "Inferior pharyngeal constrictor", ["Constritor inferior da faringe"], "", []),
  S("palatopharyngeus", "Palatopharyngeus", "Palatopharyngeus", ["Palatofaríngeo"], "", []),
  S("salpingopharyngeus", "Salpingopharyngeus", "Salpingopharyngeus", ["Salpingofaríngeo"], "", []),
  S("stylopharyngeus", "Stylopharyngeus", "Stylopharyngeus", ["Estilofaríngeo"], "", []),
  S("pharyngeal_raphe", "Pharyngeal raphe", "Pharyngeal raphe", ["Rafe da faringe"], "", []),
]};
export const region = { id: "head", title: "Mouth & pharynx", area: "Head and neck" };
export const levels = [{ title: "Mouth & pharynx", ids: ["tongue", "teeth", "submandibular_gland", "sublingual_gland", "superior_constrictor", "middle_constrictor", "inferior_constrictor", "palatopharyngeus", "salpingopharyngeus", "stylopharyngeus", "pharyngeal_raphe"] }];
export const colors = {"tongue": "#c98a7a", "teeth": "#c98a7a", "submandibular_gland": "#c98a7a", "sublingual_gland": "#c98a7a", "superior_constrictor": "#c98a7a", "middle_constrictor": "#c98a7a", "inferior_constrictor": "#c98a7a", "palatopharyngeus": "#c98a7a", "salpingopharyngeus": "#c98a7a", "stylopharyngeus": "#c98a7a", "pharyngeal_raphe": "#c98a7a"};
export const markers = {}; export const markerMeta = {};
export const purpose = '';
export const overview = '';
export const lessons = {}; export const lessonCues = {}; export const roundClues = {};
export const content = {}; export const viewHints = {};
