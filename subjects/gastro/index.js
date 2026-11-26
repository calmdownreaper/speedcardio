const V = '?v=107';
import { AULAS, AULAS_PT, SLIDE_QUESTIONS, SLIDE_UNITS } from './aulas/index.js?v=107';
// Add a region by writing regions/<id>.js and listing it here.
const REGION_FILES = ['head', 'organs', 'vessels'];
const ALL = (await Promise.all(REGION_FILES.map(async name => {
  try {
    return await import(`./regions/${name}.js${V}`);
  } catch (error) {
    console.error(`SpeedGastro region "${name}" failed to load`, error);
    return null;
  }
}))).filter(Boolean);
const ITEMS = Object.fromEntries(ALL.flatMap(region => region.deck.itens.map(item => [item.id, item])));

function buildRegion(entry) {
  const levels = entry.levels.map((level, index) => ({
    id: `${entry.region.id}-${level.bonus ? '30l' : index + 1}`,
    region: entry.region.id,
    title: level.title,
    ids: level.ids.filter(id => ITEMS[id]),
    ...(level.bonus ? { bonus: true } : {}),
  })).filter(level => level.ids.length);
  return {
    id: entry.region.id,
    title: entry.region.title,
    area: entry.region.area,
    levels,
    ids: [...new Set(levels.flatMap(level => level.ids))],
  };
}

const regions = ALL.map(buildRegion);
const colors = Object.assign({}, ...ALL.map(entry => entry.colors));
const markers = Object.assign({}, ...ALL.map(entry => entry.markers || {}));
const markerMeta = Object.assign({}, ...ALL.map(entry => entry.markerMeta || {}));
const lessons = Object.assign({}, ...ALL.map(entry => entry.lessons));
const regionPurposes = Object.fromEntries(ALL.map(entry => [entry.region.id, entry.purpose]));

const content = {
  CONTENT: {},
  THEORY: [],
  ORIENTATION: [],
  LESSON_CUES: Object.assign({}, ...ALL.map(entry => entry.content.LESSON_CUES || {})),
  ROUND_CLUES: Object.assign({}, ...ALL.map(entry => entry.content.ROUND_CLUES || {})),
  LESSON_DETAIL: {},
  REGION_OVERVIEW: Object.assign({}, ...ALL.map(entry => entry.content.REGION_OVERVIEW || {})),
  LEVEL_OVERVIEW: Object.assign({}, ...ALL.map(entry => entry.content.LEVEL_OVERVIEW || {})),
  LEVEL_CONTRAST: Object.assign({}, ...ALL.map(entry => entry.content.LEVEL_CONTRAST || {})),
  LEVEL_CHECK: Object.assign({}, ...ALL.map(entry => entry.content.LEVEL_CHECK || {})),
};

function viewFor(id) {
  for (const entry of ALL) {
    const meta = entry.markerMeta?.[id];
    if (meta?.view) return meta.view;
    if (entry.viewHints?.post?.includes(id)) return 'post';
    if (entry.viewHints?.sup?.includes(id)) return 'sup';
    if (entry.viewHints?.inf?.includes(id)) return 'inf';
  }
  return 'ant';
}

const atlasIds = ALL.flatMap(entry => entry.deck.itens.map(item => item.id));

export default {
  id: 'gastro',
  name: 'SpeedGastro',
  tagline: 'Gastrointestinal anatomy',
  description: 'Study the digestive tract, its glands and its vessels with 3D anatomy.',
  storagePrefix: 'sg1_',
  deriveOralFromLessons: true,
  findViewUsesTeaching: true,
  decks: ALL.map(entry => entry.deck),
  colors,
  defaultColor: '#d9a066',
  baseColor: id => colors[id] || '#d9a066',
  regions,
  regionContext: {},
  regionPurposes,
  content,
  lessons,
  aulas: AULAS,
  aulasPt: AULAS_PT,
  slideQuestions: SLIDE_QUESTIONS,
  slideUnits: SLIDE_UNITS,
  termAliases: [
    ...Object.values(ITEMS).flatMap(item => (item.alt || []).map(alias => [alias, item.id])),
    ['left gastro-omental artery', 'gastroepiploic_a'], ['right gastro-omental artery', 'gastroepiploic_a'],
    ['artéria gastromental esquerda', 'gastroepiploic_a'], ['artéria gastromental direita', 'gastroepiploic_a'],
    ['superior pancreaticoduodenal artery', 'pancreaticoduodenal_a'], ['inferior pancreaticoduodenal artery', 'pancreaticoduodenal_a'],
    ['artéria pancreaticoduodenal superior', 'pancreaticoduodenal_a'], ['artéria pancreaticoduodenal inferior', 'pancreaticoduodenal_a'],
    ['portal vein', 'hepatic_portal_v'], ['veia porta', 'hepatic_portal_v'], ['veia porta hepática', 'hepatic_portal_v'],
    ['caudate lobe', 'caudate_lobe'], ['lobo caudado', 'caudate_lobe'],
  ],
  theory: [],
  orientation: [],
  territories: [],
  model: { kind: 'regions', manifest: './gastro/models.json' },
  markers,
  markerMeta,
  markerSpace: 'world',
  markerSize: .008,
  atlasIds,
  atlasHomeDeck: true,
  atlasHidden: [],
  skeletonIds: [],
  mapDefaultIds: atlasIds,
  mapHeading: 'Gastrointestinal map',
  atlasNote: 'The local 3D set lacks the whole liver, cecum, sigmoid colon, anal canal, parotid and peritoneum.',
  regionPadding: {},
  teachingView: viewFor,
  memoryView: viewFor,
};
