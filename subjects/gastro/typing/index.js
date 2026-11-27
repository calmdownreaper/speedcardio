// SpeedGastro typing drills. Each deck: facts only from the professor's slides (research/gastro_slides/<deck>/digest.md).
// Items carry d3 = { focus, note?, view? } (mesh ids from gastro/models.json or landmark ids) and info = [en, pt].
import oralCavity from './oral_cavity.js?v=157';
import salivaryGlands from './salivary_glands.js?v=157';
import pharynx from './pharynx.js?v=157';
import oesophagus from './oesophagus.js?v=157';
import peritoneumAns from './peritoneum_ans.js?v=157';
import stomach from './stomach.js?v=157';
import liver from './liver.js?v=157';
import duodenum from './duodenum.js?v=157';
import jejunumIleum from './jejunum_ileum.js?v=157';
import largeIntestine from './large_intestine.js?v=157';
import rectum from './rectum.js?v=157';
import pancreasSpleen from './pancreas_spleen.js?v=157';
import gallbladderSma from './gallbladder_sma.js?v=157';
import { landmarks, spotMm, names, areas } from './landmarks.js?v=157';

export const title = ['SpeedGastro · Typing drills', 'SpeedGastro · Treino de digitação'];
export const decks = [oralCavity, salivaryGlands, pharynx, oesophagus, peritoneumAns, stomach, liver, duodenum, jejunumIleum, largeIntestine, rectum, pancreasSpleen, gallbladderSma];
export const model3d = { landmarks, spotMm, names, areas, frame: ['stomach', 'duodenum', 'spleen'] };
