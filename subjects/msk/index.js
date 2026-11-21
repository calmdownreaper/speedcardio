const V = '?v=57';
// Add a region by writing regions/<id>.js and listing it here.
const REGION_FILES = ['skull', 'spine', 'thorax', 'pelvis', 'upper', 'abdomen', 'lower'];
const ALL = (await Promise.all(REGION_FILES.map(async name => {
  try {
    return await import(`./regions/${name}.js${V}`);
  } catch (error) {
    console.error(`SpeedMSK region "${name}" failed to load`, error);
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
  id: 'msk',
  name: 'SpeedMSK',
  tagline: 'Musculoskeletal anatomy',
  description: 'Study bones, joints and muscles region by region with 3D anatomy, recall drills and 30L exam content.',
  storagePrefix: 'sm2_',
  deriveOralFromLessons: true,
  findViewUsesTeaching: true,
  decks: ALL.map(entry => entry.deck),
  colors,
  defaultColor: '#d9b38c',
  baseColor: id => colors[id] || '#d9b38c',
  regions,
  regionContext: {},
  regionPurposes,
  content,
  lessons,
  theory: [],
  orientation: [],
  territories: [],
  model: { kind: 'regions', manifest: './msk/models.json' },
  markers,
  markerMeta,
  markerSpace: 'world',
  markerSize: .008,
  atlasIds,
  atlasHomeDeck: true,
  atlasHidden: [],
  skeletonIds: [],
  mapDefaultIds: atlasIds,
  mapHeading: 'Musculoskeletal map',
  atlasNote: 'Point markers stand for structures without a mesh, such as joint spaces, ligaments and foramina.',
  regionPadding: { skull: .96, thorax: 1.04, pelvis: 1.02, abdomen: 1.02 },
  teachingView: viewFor,
  memoryView: viewFor,
};
