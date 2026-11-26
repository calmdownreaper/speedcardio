import { correctSound, isMuted, keySound, setMuted, wrongKeySound } from './sound.js?v=114';
import { createEngine } from './aulas-engine.js?v=114';
import { SUBJECTS, subjectFromUrl, subjectUrl } from './subjects/registry.js?v=114';
import {
  IDS, ITEMS, LEVELS, REGIONS, REGION_CONTEXT, ROUND_NAMES, Recall, day, fold, gradeCard, initStudy, matchDaily,
  readProgress, recordLaterRecall, saveProgress as writeProgress, shuffle, streak,
} from './study.js?v=114';

// Boot the selected subject before any UI state is derived. Start fetching the
// viewer module and model assets in parallel so the 3D scene doesn't wait on
// the subject pack waterfall.
const V = '?v=114';
const subjectId = subjectFromUrl();
const subject = SUBJECTS.find(entry => entry.id === subjectId) || SUBJECTS[0];
let viewerModulePromise = import(`./viewer.js${V}`);
const preloadManifestUrl = { msk: './msk/models.json', gastro: './gastro/models.json' }[subject.id] || './models.json';
let modelPreload = {
  manifest: fetch(`${preloadManifestUrl}${V}`, { cache: 'force-cache' }).then(r => {
    if (!r.ok) throw new Error('Model index unavailable');
    return r.json();
  }).catch(() => null),
  buffer: subject.id === 'cardio'
    ? fetch(`./models.bin${V}`, { cache: 'force-cache' }).then(r => {
      if (!r.ok) throw new Error('Model geometry unavailable');
      return r.arrayBuffer();
    }).catch(() => null)
    : null,
};
let savedLanguage = 'en';
try { savedLanguage = localStorage.getItem('anatomy_language') || 'en'; } catch { /* storage unavailable */ }
const requestedLanguage = new URLSearchParams(location.search).get('lang');
const language = ['en', 'pt-BR'].includes(requestedLanguage) ? requestedLanguage : savedLanguage === 'pt-BR' ? 'pt-BR' : 'en';
const sourcePack = (await subject.load()).default;
const localization = language === 'pt-BR' ? await import('./translations/localize.js?v=114') : null;
const pack = localization ? localization.localizePack(sourcePack) : sourcePack;
document.documentElement.lang = language;
initStudy(pack);
if (localization) localization.installInterfaceTranslation();
document.documentElement.dataset.subject = pack.id;

const material = pack.content;
const TERRITORIES = pack.territories || [];
const BRANCHES = pack.branches || [];
const BRANCH_GROUPS = pack.branchGroups || {};
const SLIDE_QUESTIONS = pack.slideQuestions || [];
const SLIDE_UNITS = pack.slideUnits || {};
const BLOOD_FLOW = pack.bloodFlow || [];
const AULAS = pack.aulas || [];
const AULAS_ORDER = AULAS.map(block => block.id);
const SUPPLY_BLOCKS = AULAS.filter(block => block.supply);
const aulas = createEngine({ packId: pack.id });
const aulasQuestions = new Map(SLIDE_QUESTIONS.map(question => [question.id, question]));
const VEIN_ARTERY_PAIRS = pack.veinArteryPairs || {};
const PAIR_CONTRASTS = pack.pairContrasts || {};
const LESSONS = pack.lessons || {};
const REGION_PURPOSES = pack.regionPurposes || {};
const ATLAS_IDS = pack.atlasIds || IDS;
const SKELETON_IDS = pack.skeletonIds || [];
const MAP_DEFAULT_IDS = pack.mapDefaultIds || IDS;

const CONTENT = material.CONTENT || {};
const lessonCue = id => material.LESSON_CUES?.[id] || ITEMS[id]?.dica || '';
const THEORY = material.THEORY || [];
const ORIENTATION = (material.ORIENTATION || []).filter(step => step?.title);
const LESSON_DETAIL = material.LESSON_DETAIL || {};
const LEVEL_OVERVIEW = material.LEVEL_OVERVIEW || {};
const REGION_OVERVIEW = material.REGION_OVERVIEW || {};
const LEVEL_CONTRAST = material.LEVEL_CONTRAST || {};
const LEVEL_CHECK = material.LEVEL_CHECK || {};
const $ = id => document.getElementById(id);
const appHeader = document.querySelector('.app-header');
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const icon = (name, size = 18) => `<svg class="icon" width="${size}" height="${size}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const markdown = text => escape(text).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const list = values => `<ul>${values.map(value => `<li>${escape(value)}</li>`).join('')}</ul>`;
const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
const shortDate = iso => {
  if (!iso) return '';
  const [year, month, date] = iso.split('-').map(Number);
  return new Date(year, month - 1, date).toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-GB', { day: 'numeric', month: 'short' });
};
const todayLabel = () => new Date().toLocaleDateString(language === 'pt-BR' ? 'pt-BR' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
const studyTime = seconds => {
  const total = Number(seconds) || 0;
  if (total < 60) return `${Math.round(total)}s`;
  const minutes = Math.round(total / 60);
  return minutes < 60 ? `${minutes}m` : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};
const progress = readProgress();
const regions = Object.fromEntries(REGIONS.map(region => [region.id, region]));
const orientation = { id: 'orientation', title: 'Orientation', area: 'Heart' };
// The curriculum cross-lists a few mediastinal structures under Great vessels.
// Give each structure one Atlas home (its last region) so rows and counts agree.
const ATLAS_GROUP_OF = new Map();
REGIONS.forEach((region, index) => region.ids.forEach(id => ATLAS_GROUP_OF.set(id, index)));
// Cardio keeps its historical "last region wins" Atlas home. Subjects with
// cross-region curriculum references can instead group every part by its
// owning deck, so a rib stays under Thorax when Abdomen also cites it.
const ATLAS_GROUPS = pack.atlasHomeDeck
  ? REGIONS.map(region => ({
    id: region.id, title: region.title,
    ids: ATLAS_IDS.filter(id => ITEMS[id]?.deck.id === region.id),
  })).filter(group => group.ids.length)
  : REGIONS.map((region, index) => ({
    id: region.id, title: region.title,
    ids: region.ids.filter(id => ITEMS[id] && ATLAS_GROUP_OF.get(id) === index),
  })).filter(group => group.ids.length);
const ATLAS_REGION = Object.fromEntries(ATLAS_GROUPS.flatMap(group => group.ids.map(id => [id, group.title])));
const ATLAS_SET = new Set(ATLAS_IDS);
const ATLAS_SEARCH_TEXT = new Map(ATLAS_IDS.map(id => {
  const item = ITEMS[id];
  return [id, item ? fold(`${item.pt} ${ATLAS_REGION[id] || ''} ${item.deck.titulo}`) : ''];
}));
const atlas = { query: '', hidden: new Set([...(pack.atlasHidden || []), ...ATLAS_IDS.filter(id => pack.markers?.[id])]), focus: [], active: null, open: false, view: 'ant' };
const sectionTitles = {
  definition: 'Definition', location: 'Location and projection', relations: 'Relations',
  function: 'Function and action', origin: 'Origin', insertion: 'Insertion', nerve: 'Nerve supply',
  course: 'Origin, course and termination', branches: 'Branches and tributaries',
  supply: 'Supply and drainage', internal: 'Internal features', development: 'Development',
  clinical: 'Clinical correlations', imaging: 'Imaging',
};
const views = {
  ant: 'Anterior', post: 'Posterior', dir: 'Right lateral',
  esq: 'Left lateral', sup: 'Superior', inf: 'Inferior',
};
const coarsePointer = matchMedia('(pointer: coarse)');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const answerCharacters = /[^\p{L}\p{M}\p{N} ()+'’‘–—-]/gu;
let page = 'map';
const firstNext = nextLevel();
let selectedRegion = firstNext?.region || (ORIENTATION.length ? 'orientation' : REGIONS[0]?.id);
let selectedLevel = firstNext?.id || (ORIENTATION.length ? undefined : REGIONS[0]?.levels[0]?.id);
let mapTab = null;
let activity;
let viewer;
let viewerStatus = 'loading';
let model;
let advanceTimer;
let wrongTimer;
let mockTimer;
let aulasTimer;
let shortcuts = new Map();
let actions = [];
let started = performance.now();

function button(label, run, options = {}) {
  const index = actions.push(run) - 1;
  if (options.key) shortcuts.set(options.key, run);
  const start = options.icon ? icon(options.icon, 16) : '';
  const end = options.iconEnd ? icon(options.iconEnd, 16) : '';
  return `<button type="button" class="button ${options.class || ''}" data-action="${index}"${options.attrs ? ` ${options.attrs}` : ''} ${options.disabled ? 'disabled' : ''}>${start}${label}${end}</button>`;
}

// Ask before abandoning a recall run that is under way.
function leaveGuard() {
  const run = activity?.type === 'recall' || activity?.type === 'round' ? activity.run : null;
  if (!run || (!run.keys && run.round === 1 && !run.index)) return true;
  return window.confirm(language === 'pt-BR' ? 'Sair desta sessão? O progresso destas rodadas será perdido.' : 'Leave this run? Your progress in these rounds will be lost.');
}

const languageSelect = document.getElementById('language-select');
if (languageSelect) {
  languageSelect.value = language;
  languageSelect.addEventListener('change', () => {
    if (!leaveGuard()) { languageSelect.value = language; return; }
    const nextLanguage = languageSelect.value === 'pt-BR' ? 'pt-BR' : 'en';
    try { localStorage.setItem('anatomy_language', nextLanguage); } catch { /* URL preserves the selection */ }
    const url = new URL(location.href);
    url.searchParams.set('lang', nextLanguage);
    location.assign(url.href);
  });
}

function setPage(next) {
  stopTimers();
  if (atlas.open) setAtlasDrawer(false, { restoreFocus: false });
  page = next;
  activity = null;
  render();
  $('main').focus({ preventScroll: true });
  window.scrollTo(0, 0);
}

function launch(type, state) {
  stopTimers();
  activity = { type, ...state };
  started = performance.now();
  render({ top: true, activate: true });
}

function scrollBelowHeader(element) {
  element.scrollIntoView({
    block: 'start',
    behavior: reducedMotion.matches ? 'auto' : 'smooth',
  });
}

function stopTimers() {
  clearTimeout(advanceTimer);
  clearTimeout(wrongTimer);
  clearInterval(mockTimer);
  mockTimer = undefined;
  clearInterval(aulasTimer);
  aulasTimer = undefined;
}

function recordActivity() {
  const today = day();
  progress.activity[today] = (progress.activity[today] || 0) + Math.max(1, Math.round((performance.now() - started) / 1000));
  started = performance.now();
  saveProgress(progress);
}

function saveProgress(progress) {
  $('storage-status').hidden = writeProgress(progress);
}

function savedLevel(id) { return progress.levels[id] || {}; }
function requiredLevels() { return LEVELS.filter(level => !level.bonus); }
function previousRequired(level) {
  const list = LEVELS.filter(entry => entry.region === level.region);
  const index = list.indexOf(level);
  for (let cursor = index - 1; cursor >= 0; cursor--) {
    if (!list[cursor].bonus) return list[cursor];
  }
  return null;
}
function nextLevel() {
  if (ORIENTATION.length && !savedLevel('orientation').passed) return orientation;
  return LEVELS.find(level => !level.bonus && !savedLevel(level.id).passed);
}
function unlocked(level) {
  if (level.id === 'orientation' || savedLevel(level.id).passed) return true;
  const previous = previousRequired(level);
  if (level.bonus && !previous) return false;
  return !previous || Boolean(savedLevel(previous.id).passed);
}

function passedLevel(level) { return savedLevel(level.id).passed; }
function dueIds() {
  const today = day();
  return IDS.filter(id => progress.cards[id]?.due <= today);
}
function stars(id) { return savedLevel(id).stars || [false, false, false]; }
function starsHTML(id) {
  const earned = stars(id);
  const count = earned.filter(Boolean).length;
  return `<span class="stars" role="img" aria-label="${count} of 3 stars">${earned.map(on =>
    `<span class="star${on ? ' on' : ''}" aria-hidden="true">${icon(on ? 'star-filled' : 'star', 15)}</span>`).join('')}</span>`;
}

function render({ top = false, activate = false } = {}) {
  actions = [];
  shortcuts = new Map();
  model = null;
  document.querySelectorAll('nav [data-nav]').forEach(tab => {
    if (tab.dataset.nav === page) tab.setAttribute('aria-current', 'page');
    else tab.removeAttribute('aria-current');
  });
  const due = dueIds().length;
  $('due-badge').hidden = !due;
  $('due-badge').textContent = due;
  const days = streak(progress);
  $('header-streak').textContent = days ? `${days}-day streak` : 'No streak yet';
  $('header-streak').dataset.state = days ? 'on' : 'idle';

  const renderer = activity
    ? { orientation: renderOrientation, lesson: renderLesson, recall: renderRecall, round: renderRoundEnd,
      results: renderRecallResults, find: renderFind, quiz: renderQuiz, oral: renderOral, topic: renderTopic,
      aulas: renderAulas,
      aulasCatalog: renderAulasCatalog,
      mock: renderMock, mockResults: renderMockResults, complete: renderComplete }[activity.type]
    : { map: renderMap, atlas: renderAtlas, daily: renderDaily, theory: renderTheory, progress: renderProgress }[page];
  const html = renderer();
  const workspace = $('workspace');
  const host = model ? $('practice') : $('page');
  workspace.hidden = !model;
  workspace.className = model ? `workspace ${model.layout || 'study-layout'}` : 'workspace';
  $('page').hidden = Boolean(model);
  const other = model ? $('page') : $('practice');
  other.replaceChildren();
  host.innerHTML = html;
  if (activity?.type === 'mock') {
    updateMockTimer();
    mockTimer ??= setInterval(updateMockTimer, 250);
  }
  if (activity?.type === 'aulas' && activity.stage === 'test') {
    updateAulasTimer();
    aulasTimer ??= setInterval(updateAulasTimer, 1000);
  }
  updateModel();
  const input = $('typer');
  input.hidden = activity?.type !== 'recall' || !modelLoaded();
  if (!input.hidden) {
    input.value = activity.run.round === 1 ? '' : activity.run.typed;
    drawWord();
    if (!coarsePointer.matches) focusTyper();
  } else if (activate) {
    const title = host.querySelector('h1');
    title?.setAttribute('tabindex', '-1');
    title?.focus({ preventScroll: true });
  }
  if (top) window.scrollTo(0, 0);
  saveAppState();
}

function setModel(ids, options = {}) {
  const valid = sequence => [...new Set((sequence || []).filter(id => ITEMS[id]))];
  const focus = valid(options.focus);
  model = { ...options, ids: valid(ids), focus, context: valid(options.context), anchors: markerAnchors(focus) };
}

// Point markers name the bones they sit on or connect. Those bones stay
// readable while the rest of the region is ghosted behind them.
function markerAnchors(focus) {
  return [...new Set((focus || []).flatMap(id => pack.markerMeta?.[id]?.anchors || []).filter(id => ITEMS[id]))];
}
function markerView(id) {
  return pack.markerMeta?.[id]?.view;
}
function focusedStructureView(focus, fallback) {
  if (focus?.length !== 1) return fallback;
  const id = focus[0];
  // MSK packs declare a teaching view for point markers and hidden structures;
  // other subjects keep the view the learner chose.
  const preferred = pack.markerMeta ? (markerView(id) || teachingView(id)) : null;
  return preferred || fallback;
}

function showStructure(id, options = {}) {
  const item = ITEMS[id];
  if (!item) return;
  const { scope, context, ...rest } = options;
  setModel(scope?.length ? scope : item.deck.itens.map(entry => entry.id), {
    title: item.deck.titulo, context: context || item.deck.ctx, focus: [id], ...rest,
  });
}

// Mixed-deck levels use their own ids, with the regional thorax as ghost context.
function regionScope(level) {
  const context = level && REGION_CONTEXT[level.region];
  return context
    ? { scope: level.ids, context, faint: SKELETON_IDS, title: regions[level.region]?.title || 'Regional context', padding: 1.28 } : {};
}

function modelLoaded() {
  if (viewerStatus !== 'ready' || !viewer) return false;
  if (!model) return true;
  return viewer.loadedFor([...model.ids, ...(model.context || []), ...(model.focus || []), ...(model.anchors || [])]);
}

function updateModel() {
  if (!model) {
    const orientHint = $('model-orient-hint');
    if (orientHint) orientHint.hidden = true;
    if (pack.markers && Object.keys(pack.markers).length) viewer?.paint({ ids: [] }, true);
    viewer?.focusAxis(false);
    return;
  }
  model.anchors = markerAnchors(model.focus);
  $('model-label').textContent = model.title || 'Heart and lungs';
  $('model-angle').textContent = views[model.view] || '3D specimen';
  $('view-direction').value = model.view || 'ant';
  syncModelStatus();
  $('view-toolbar').hidden = !(viewer && model.controls);
  $('view-back').hidden = !(viewer && model.clickedFocus && model.step);
  $('view-isolate').disabled = !model.focus.length;
  $('view-ghost').disabled = !model.focus.length;
  $('reticle').hidden = !(viewer && model.pick);
  $('pick-center').hidden = !(viewer && model.pick);
  const refocus = model.clickedFocus || model.frameFocus;
  const config = refocus ? { ...model, close: model.frameFocus || model.close, subtleFocus: false } : model;
  // Only the step focus, an unhighlighted Find target, or checked Atlas
  // entries can request landmarks. Context and anchors are mesh support.
  const markerIds = (model.atlas ? model.ids : [...model.focus, model.markerTarget])
    .filter(id => pack.markers?.[id]);
  const orientHint = $('model-orient-hint');
  if (orientHint) {
    const showHint = Boolean(model.orientHint) && (!model.orientHintForView || model.view === model.orientHintForView);
    orientHint.hidden = !showHint;
    orientHint.textContent = showHint ? model.orientHint : '';
  }
  viewer?.paint({ ...config, markerIds }, model.preserveCamera && !refocus);
  viewer?.focusAxis(activity?.type === 'orientation' && activity.index === 0);
}

function syncModelStatus() {
  $('model-status').hidden = viewerStatus === 'failed' || modelLoaded();
}

function stepSnapshot() {
  return { ids: [...model.ids], context: [...(model.context || [])], focus: [...model.focus], close: model.close, title: model.title, view: model.view };
}
function syncTermFocusUI(activeId) {
  for (const el of document.querySelectorAll('.term-3d')) {
    el.classList.toggle('is-active', Boolean(activeId) && el.dataset.focusId === activeId);
  }
  const bar = $('aulas-focus-bar');
  if (!bar) return;
  if (!activeId || !ITEMS[activeId]) {
    bar.hidden = true;
    bar.innerHTML = '';
    return;
  }
  const role = NOTES[activeId]?.role;
  bar.hidden = false;
  bar.innerHTML = `<span><strong>${escape(ITEMS[activeId].pt)}</strong>${role ? ` — <em>${escape(role)}</em>` : ''}</span>
    <button type="button" class="button term-reset" data-focus-reset="1">${aulaText('Reset view', 'Restaurar vista')}</button>`;
}
function focusGroup(ids, title) {
  if (!model) return;
  if (model.clickedFocus && model.focus.length === ids.length && ids.every(id => model.focus.includes(id))) return restoreStepView();
  const step = model.step || stepSnapshot();
  model = { ...model, focus: ids, close: true, clickedFocus: true, title, step };
  updateModel();
}
function focusStructure(id) {
  if (!model || !ITEMS[id]) return;
  if (model.clickedFocus && model.focus.length === 1 && model.focus[0] === id) return restoreStepView();
  const step = model.step || stepSnapshot();
  const ids = model.ids.includes(id) ? model.ids : [...model.ids, id];
  const isInternal = /^(tri_|mit_|ao_ant$|ao_post|pulm_|pap_)/.test(id);
  const ghostBase = isInternal ? ['ad', 'ae', 'vd', 've', 'paredev'] : [];
  const context = [...new Set([...(model.context || []), ...ghostBase])].filter(entry => entry !== id);
  model = { ...model, ids, context, focus: [id], close: true, frameFocus: true, clickedFocus: true, title: ITEMS[id].pt, view: focusedStructureView([id], teachingView(id)), step };
  updateModel(true);
  syncTermFocusUI(id);
}
function restoreStepView() {
  if (!model?.step) return;
  const { ids, context, focus, close, title, view } = model.step;
  model = { ...model, ids, context, focus, close, title, view, clickedFocus: false };
  delete model.step;
  updateModel(true);
  syncTermFocusUI(null);
}
function linkedText(text, ids) {
  const names = ids.map(id => [id, ITEMS[id]?.pt]).filter(([,name]) => name);
  const pattern = names.map(([,name]) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  if (!pattern) return escape(text);
  return text.split(new RegExp('(' + pattern + ')', 'gi')).map(part => {
    const match = names.find(([,name]) => name.toLowerCase() === part.toLowerCase());
    return match ? button(escape(part), () => focusStructure(match[0]), { class: 'inline-structure' }) : escape(part);
  }).join('');
}

function startOrientation() {
  launch('orientation', { index: 0 });
}

function renderOrientation() {
  const { index } = activity;
  const step = ORIENTATION[index];
  if (step) {
    const scope = [...new Set([...MAP_DEFAULT_IDS, ...(step.scope || []), ...(step.focus || [])])];
    setModel(scope, {
      focus: step.focus, view: step.view, controls: true, subtleFocus: step.subtle !== false, explore: true,
      close: true, padding: step.padding || 1.62, title: 'Heart orientation',
    });
  }
  const finish = () => {
    progress.levels.orientation = { passed: true };
    recordActivity();
    openLevel(LEVELS[0]);
  };
  const move = offset => { activity.index += offset; render({ activate: true }); };
  return `<div class="prompt">
    <div class="eyebrow">Orientation${step ? ` / ${index + 1} of ${ORIENTATION.length}` : ''}</div>
    <h1>${escape(step?.title || 'Orientation tour')}</h1>
    <p>${linkedText(step?.text || '', step?.focus || [])}</p>
    <p class="support">What to notice: ${escape(step?.notice)}</p><div class="chips">${(step?.chips || step?.focus || []).filter(id => ITEMS[id]).map(id => `${button(escape(ITEMS[id].pt), () => focusStructure(id))}`).join('')}</div>
    ${step?.choice === 'valves' ? `<div class="actions" aria-label="Choose exit valve">${button('Pulmonary valve', () => focusGroup(['pulm_ant_d', 'pulm_ant_e', 'pulm_post'], 'Pulmonary valve'))}${button('Aortic valve', () => focusGroup(['ao_ant', 'ao_post_e', 'ao_post_d'], 'Aortic valve'))}</div>` : ''}
    ${index === ORIENTATION.length - 1 ? `<h2>Landmarks you learned</h2>${list(['Base: the superior-posterior part, marked by the left atrium', 'Apex: the pointed tip of the left ventricle', 'Anterior: the broad right ventricle', 'Right border: the right atrium between two large veins', 'Exit vessels and valves: pulmonary trunk and aorta', 'Posterior and surface vessels: pulmonary veins, coronary sinus, LAD and great cardiac vein', 'Lungs: right three lobes, left two with the lingula', 'Airway: trachea divides at the carina; the right bronchus is steeper', 'Posterior mediastinum: esophagus behind the left atrium, descending aorta to its left'])}` : ''}
    <div class="actions">${index ? button('Previous view', () => move(-1), { icon: 'arrow-left' }) : ''}
      ${index === ORIENTATION.length - 1 && BLOOD_FLOW.length ? button('Blood pathway', startBloodFlow, { icon: 'route' }) : ''}
      ${step && index + 1 < ORIENTATION.length ? button('Next view', () => move(1), { key: 'Enter', class: 'primary', iconEnd: 'arrow-right' })
        : button('Start Level 1', finish, { key: 'Enter', class: 'primary', iconEnd: 'arrow-right' })}
    </div></div>`;
}

function openLevel(level) {
  if (!level || !unlocked(level)) return;
  if (level === orientation) return startOrientation();
  selectedRegion = level.region;
  selectedLevel = level.id;
  if (!savedLevel(level.id).lesson) startMemorize(level);
  else beginRecall(level.ids, 'level', level);
}

// Memorize: short summary of each structure, find them, then the typing rounds.
// Learn: the full topographical lesson (overview, structures, find, contrast, check).
function startMemorize(level) { launch('lesson', { level, mode: 'memorize', stage: 'structure', index: 0 }); }
function startLearn(level) { launch('lesson', { level, mode: 'learn', stage: 'overview' }); }

function availableQuestions(id) {
  return (CONTENT[id]?.mcq || []).filter(validQuestion);
}
function validQuestion(question) {
  return Boolean(question?.q && Array.isArray(question.options) && question.options.length >= 2
    && Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length);
}

function overviewFor(level) {
  return LEVEL_OVERVIEW[level.id] || REGION_OVERVIEW[level.region]
    || `Explore ${String(level.title || 'these structures').toLowerCase()} on the model, then test yourself on each one.`;
}
function detailFor(id) {
  return LESSON_DETAIL[id] || { text: lessonCue(id) };
}
function contrastFor(level) {
  const direct = LEVEL_CONTRAST[level.id];
  if (direct) return direct;
  const regional = Object.entries(LEVEL_CONTRAST)
    .filter(([id]) => id.startsWith(`${level.region}-`))
    .map(([, contrast]) => contrast)
    .find(contrast => level.ids.includes(contrast.a) && level.ids.includes(contrast.b));
  if (regional) return regional;
  const [a, b] = level.ids;
  if (!a || !b) return null;
  return {
    a, b, title: `${ITEMS[a].pt} or ${ITEMS[b].pt}`,
    text: `Both belong to this mixed run. ${lessonCue(a)} In contrast, ${lessonCue(b)}`,
  };
}
function lessonView(level) {
  if (level.id === 'valvas-2') return 'sup';
  if (level.region === 'veias' || level.id === 'mediastino-1') return 'post';
  if (level.id === 'mediastino-2') return 'inf';
  return 'ant';
}
function isLungSegmentRegion(regionId) {
  return regionId === 'segd' || regionId === 'sege';
}
function lobeLegendMarkup() {
  return language === 'pt-BR'
    ? `<div class="lobe-legend" role="note"><span class="lobe-legend-label">Lobos:</span><span><i class="lobe-dot sup" aria-hidden="true"></i>Verde = superior</span><span><i class="lobe-dot mid" aria-hidden="true"></i>Âmbar = médio / língula</span><span><i class="lobe-dot inf" aria-hidden="true"></i>Azul = inferior</span></div>`
    : `<div class="lobe-legend" role="note"><span class="lobe-legend-label">Lobes:</span><span><i class="lobe-dot sup" aria-hidden="true"></i>Green = superior</span><span><i class="lobe-dot mid" aria-hidden="true"></i>Amber = middle / lingula</span><span><i class="lobe-dot inf" aria-hidden="true"></i>Blue = inferior</span></div>`;
}
function paredevHintMarkup() {
  return `<aside class="wall-hint" role="note">${language === 'pt-BR'
    ? 'Parede muscular compartilhada (paredes livres + septo) que envolve os dois ventrículos — não é uma das cavidades.'
    : 'Shared muscular wall (free walls + septum) enclosing both ventricles — not one of the four cavities.'}</aside>`;
}
function findTargets(level) {
  const targets = level.ids.filter(id => id !== 'paredev');
  return targets.length ? targets : [...level.ids];
}
// Distinct, high-contrast hues; each lesson structure keeps one for the whole lesson.
const LESSON_PALETTE = ['#ffd84a', '#4dd0e1', '#ff7ab6', '#8bd450', '#b18cff', '#ff9f43',
  '#5b9dff', '#2ee6a6', '#f25f5c', '#e8e3d0', '#c0ca33', '#ff6bd6'];
function levelPalette(level) {
  if (isLungSegmentRegion(level.region) && pack.baseColor) {
    return Object.fromEntries(level.ids.map(id => [id, pack.baseColor(id)]));
  }
  return Object.fromEntries(level.ids.map((id, index) => [id, LESSON_PALETTE[index % LESSON_PALETTE.length]]));
}
const swatch = (level, id, color) => `<i class="swatch" style="--swatch:${color || levelPalette(level)[id] || 'var(--mute)'}" aria-hidden="true"></i>`;
function levelContext(level, { subtleArteries = [], arteryColors = {} } = {}) {
  const markerOnly = level.ids.every(id => pack.markers?.[id]);
  const regionMeshes = markerOnly
    ? regions[level.region]?.ids.filter(id => !pack.markers?.[id] && !level.ids.includes(id)) || []
    : [];
  const baseContext = markerOnly
    ? [...new Set([...(ITEMS[level.ids[0]]?.deck.ctx || []), ...regionMeshes])]
    : REGION_CONTEXT[level.region] || ITEMS[level.ids[0]]?.deck.ctx || [];
  const context = [...new Set([...baseContext, ...subtleArteries])];
  const extras = {};
  if (level.id === 'valvas-2') {
    extras.subtleContext = ['aoasc', 'tp'];
    extras.subtleContextOpacity = .24;
    extras.orientHint = language === 'pt-BR' ? 'Anterior: pulmonar · Posterior: aórtica' : 'Anterior: pulmonary · Posterior: aortic';
    extras.orientHintForView = 'sup';
  } else if (subtleArteries.length) {
    extras.subtleContext = subtleArteries;
    extras.subtleContextOpacity = .46;
    extras.extraPalette = arteryColors;
  }
  return {
    context,
    ...(markerOnly ? { contextOpacity: .42, padding: 1.08 } : {}),
    ...extras,
  };
}
function levelModel(level, options = {}) {
  const { extraPalette, ...base } = levelContext(level, options.veinContext);
  const { veinContext: _ignored, ...modelOptions } = options;
  const palette = { ...levelPalette(level), ...(extraPalette || {}), ...(modelOptions.palette || {}) };
  setModel(level.ids, {
    ...base,
    palette,
    title: level.title,
    faint: REGION_CONTEXT[level.region] ? SKELETON_IDS : undefined,
    padding: base.padding || (level.region === 'mediastino' ? 1.32 : 1.26),
    ...modelOptions,
  });
}
function shuffledQuestion(question) {
  const correct = question.options[question.answer];
  const options = shuffle(question.options);
  return { ...question, options, answer: options.indexOf(correct) };
}
function checkFor(level) {
  const authored = (LEVEL_CHECK[level.id] || []).filter(validQuestion);
  if (authored.length >= 2) return authored.map(shuffledQuestion);
  const ids = level.ids.filter(id => ITEMS[id]);
  const positions = [...new Set([0, Math.floor(ids.length / 2), ids.length - 1])]
    .filter(index => index >= 0 && index < ids.length);
  return positions.map(position => {
    const id = ids[position];
    const options = shuffle([id, ...shuffle(ids.filter(other => other !== id)).slice(0, 3)]);
    return {
      q: `Which structure is described? “${lessonCue(id)}”`,
      options: options.map(key => ITEMS[key].pt),
      answer: options.indexOf(id),
      why: lessonCue(id),
    };
  });
}

function setLessonFindFeedback(text, tone = '') {
  activity.findFeedback = text ? { text, tone } : null;
  const line = $('find-feedback');
  if (!line) return;
  line.textContent = text || '';
  line.className = `feedback ${tone}`;
}

// Guided find: after the structures are taught, the learner locates them one at a time.
function lessonFindOrder(level) {
  if (!activity.order) activity.order = shuffle(findTargets(level));
  return activity.order;
}

function lessonFindPick(id) {
  const state = activity;
  if (state?.type !== 'lesson' || state.stage !== 'find') return;
  const order = lessonFindOrder(state.level);
  const found = state.found || (state.found = []);
  const target = order[found.length];
  if (!target) return;
  if (!id) return setLessonFindFeedback('No structure at that point. Rotate the model and try again.', 'bad');
  if (id !== target) {
    state.misses = (state.misses || 0) + 1;
    const clicked = ITEMS[id]?.pt;
    return setLessonFindFeedback(order.includes(id) && clicked
      ? `That is ${clicked}. Look for ${ITEMS[target].pt}.`
      : `Not ${ITEMS[target].pt}. Rotate the model and try again.`, 'bad');
  }
  found.push(id);
  state.revealed = false;
  const next = order[found.length];
  setLessonFindFeedback(next ? `Right — ${ITEMS[id].pt}.` : `Right — ${ITEMS[id].pt}. All ${order.length} found.`, 'good');
  correctSound();
  render();
  if (!next) $('practice').querySelector('.primary')?.focus({ preventScroll: true });
}

function lessonSteps(level, mode) {
  if (mode === 'memorize') return [['structure', 'Read'], ['find', 'Find'], ['rounds', 'Type']];
  return [['overview', 'Overview'], ['structure', 'Structures'], ['find', 'Find'],
    ...(contrastFor(level) ? [['contrast', 'Contrast']] : []), ['check', 'Check']];
}
function lessonStepper(level, stage, mode) {
  const steps = lessonSteps(level, mode);
  const current = Math.max(0, steps.findIndex(([key]) => key === (stage === 'checkDone' ? 'check' : stage)));
  return `<div class="lesson-top">
    <ol class="stepper" aria-label="Lesson steps">${steps.map(([key, label], index) =>
      `<li class="${index < current ? 'done' : index === current ? 'now' : ''}"${index === current ? ' aria-current="step"' : ''}><span>${label}</span></li>`).join('')}</ol>
    ${button('Exit', () => setPage('map'), { icon: 'x', class: 'exit' })}</div>`;
}

function lessonBlocks(id) {
  const blocks = LESSONS[id];
  if (!blocks) return `<p class="lesson-body">${markdown(detailFor(id).text)}</p>`;
  const facts = rows => `<dl class="lesson-facts">${rows.filter(([, text]) => text)
    .map(([label, text]) => `<div><dt>${label}</dt><dd>${markdown(text)}</dd></div>`).join('')}</dl>`;
  const more = [['Origin', blocks.origin], ['Insertion', blocks.insertion], ['Nerve supply', blocks.nerve],
    ['Relations', blocks.relations], ['Name', blocks.name]].filter(([, text]) => text);
  return `${blocks.lead ? `<p class="lesson-lead">${markdown(blocks.lead)}</p>` : ''}
    ${facts([['Where', blocks.where], ['Function', blocks.function]])}
    ${more.length ? `<details class="lesson-more"><summary>More detail</summary>${facts(more)}</details>` : ''}`;
}

function renderLesson() {
  const { level } = activity;
  const memorize = activity.mode === 'memorize';
  const stage = activity.stage || (memorize ? 'structure' : 'overview');
  const total = level.ids.length;
  const contrast = contrastFor(level);
  const top = lessonStepper(level, stage, activity.mode);
  const lungSeg = isLungSegmentRegion(level.region);
  const chipColor = key => lungSeg ? pack.baseColor?.(key) : undefined;
  const chip = (key, chosen, run) => button(`${swatch(level, key, chipColor(key))}${escape(ITEMS[key].pt)}`, run, { class: `chip-swatch ${chosen ? 'chosen' : ''}` });
  if (level.region === 'veias' && activity.showVeinsArteries === undefined) activity.showVeinsArteries = true;
  const veinContextFor = targetIds => {
    if (level.region !== 'veias' || !activity.showVeinsArteries) return undefined;
    const subtleArteries = [...new Set(targetIds.flatMap(id => VEIN_ARTERY_PAIRS[id]?.arteries || []).filter(id => ITEMS[id]))];
    if (!subtleArteries.length) return undefined;
    return { subtleArteries, arteryColors: Object.fromEntries(subtleArteries.map(id => [id, '#e05a52'])) };
  };
  const veinToggleMarkup = () => level.region === 'veias'
    ? `<div class="vein-tools">${button(activity.showVeinsArteries ? (language === 'pt-BR' ? 'Ocultar artérias acompanhantes' : 'Hide accompanying arteries') : (language === 'pt-BR' ? 'Mostrar artérias acompanhantes' : 'Show accompanying arteries'), () => {
      activity.showVeinsArteries = !activity.showVeinsArteries;
      render();
    }, { class: 'vein-toggle', icon: activity.showVeinsArteries ? 'eye-off' : 'eye' })}</div>` : '';
  const startRounds = () => {
    progress.levels[level.id] = { ...savedLevel(level.id), lesson: true };
    saveProgress(progress);
    beginRecall(level.ids, 'level', level);
  };
  const openCheck = () => {
    if (!activity.check) activity.check = { questions: checkFor(level), index: 0, results: [] };
    activity.stage = 'check';
    delete activity.answer;
    render({ top: true, activate: true });
  };
  const goStage = (next, extra = {}) => {
    Object.assign(activity, { stage: next }, extra);
    render({ top: true, activate: true });
  };
  const jump = index => goStage('structure', { index });
  const openFind = () => goStage('find', { found: [], order: null, findFeedback: null, revealed: false, misses: 0, findView: undefined });
  const afterFind = () => memorize ? startRounds() : contrast ? goStage('contrast') : openCheck();
  const skipLessonButton = () => button(language === 'pt-BR' ? 'Pular para o treino' : 'Skip to practice', startRounds);

  if (stage === 'structure') {
    const index = Math.min(Math.max(Number(activity.index) || 0, 0), Math.max(total - 1, 0));
    activity.index = index;
    const id = level.ids[index];
    const item = ITEMS[id];
    levelModel(level, { view: teachingView(id), controls: true, explore: true, focus: [id], close: true, markerLabels: true, veinContext: veinContextFor([id]) });
    const last = index + 1 === total;
    const clinical = LESSONS[id]?.clinical || detailFor(id).clinical;
    const pair = level.region === 'veias' ? VEIN_ARTERY_PAIRS[id] : null;
    return `<div class="prompt lesson-structure">${top}
      <div class="eyebrow">${memorize ? 'Memorize' : 'Learn'} · ${escape(level.title)} · ${index + 1} of ${total}</div>
      <h1>${swatch(level, id, chipColor(id))}${escape(item.pt)}${item.tag ? ` <small translate="no">${escape(item.tag)}</small>` : ''}${item.abbr ? ` <small class="clinical-abbr" translate="no">${escape(item.abbr)}</small>` : ''}</h1>
      ${meaningMarkup(id)}
      ${lungSeg ? lobeLegendMarkup() : ''}
      ${id === 'paredev' ? paredevHintMarkup() : ''}
      ${pair ? `<div class="pair-badge">${language === 'pt-BR' ? 'Artéria acompanhante:' : 'Accompanying artery:'} <strong translate="no">${escape(pair.label)}</strong></div>` : ''}
      ${veinToggleMarkup()}
      ${memorize ? `<p class="lesson-body">${markdown(detailFor(id).text)}</p>` : lessonBlocks(id)}
      ${memorize ? '' : slotsMarkup(id)}
      ${clinical && !memorize ? `<aside class="clinical-note"><span class="clinical-label">Clinical note</span><p>${escape(clinical)}</p></aside>` : ''}
      ${level.region === 'mediastino' ? '<p class="support">Small vessel? Use Isolate to show only the highlighted structure.</p>' : ''}
      <div class="chips">${level.ids.map((key, position) => chip(key, key === id, () => key === id ? focusStructure(key) : jump(position))).join('')}</div>
      <div class="actions">
        ${button('Previous', () => index ? jump(index - 1) : goStage('overview'), { icon: 'arrow-left', disabled: memorize && !index })}
        ${skipLessonButton()}
        ${button(last ? 'Find them on the model' : 'Next structure', last ? openFind : () => jump(index + 1), { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}
      </div></div>`;
  }

  if (stage === 'find') {
    const order = lessonFindOrder(level);
    const found = (activity.found || []).filter(id => order.includes(id));
    activity.found = found;
    const target = order[found.length];
    const allFound = !target;
    const completion = order.some(id => pack.markers?.[id])
      ? 'You located every structure in this level.'
      : 'Each structure now keeps its lesson colour on the model.';
    const feedback = activity.findFeedback;
    const preferred = target && pack.markerMeta?.[target] ? markerView(target) : null;
    const foundMeshes = found.filter(id => !pack.markers?.[id]);
    levelModel(level, {
      markerTarget: target,
      view: activity.findView || preferred || lessonView(level), controls: true, pick: !allFound && modelLoaded(), explore: false,
      focus: activity.revealed && target ? [...foundMeshes, target] : foundMeshes, close: false,
      pickIds: order, preserveCamera: (found.length > 0 || activity.revealed) && !(activity.revealed && pack.markerMeta?.[target]),
    });
    const ready = modelLoaded();
    const reveal = () => {
      activity.revealed = true;
      activity.findFeedback = { text: `${ITEMS[target].pt} is lit on the model. Click it to continue.`, tone: '' };
      render();
    };
    return `<div class="prompt lesson-find">${top}
      <div class="eyebrow">${memorize ? 'Memorize' : 'Learn'} · Find them · ${found.length} of ${order.length}</div>
      <h1>${allFound ? 'All found' : `Click the <span class="target-name">${escape(ITEMS[target].pt)}</span>`}</h1>
      ${lungSeg ? lobeLegendMarkup() : ''}
      <p class="support">${!ready ? 'Loading the 3D region…' : allFound ? completion : 'Rotate or zoom if it is hidden. Wrong clicks tell you what you touched.'}</p>
      <div class="find-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${order.length}" aria-valuenow="${found.length}" aria-label="Structures found"><span class="find-bar" style="width:${Math.round(found.length / order.length * 100)}%"></span></div>
      <p id="find-feedback" class="feedback ${feedback?.tone || ''}" role="status">${feedback ? escape(feedback.text) : ''}</p>
      <ul class="find-list" aria-label="Structures to find">${order.map(id => {
        const done = found.includes(id);
        return `<li class="find-chip${done ? ' found' : ''}${id === target ? ' current' : ''}">${done ? swatch(level, id, chipColor(id)) : '<i class="swatch empty" aria-hidden="true"></i>'}<span>${escape(ITEMS[id].pt)}</span></li>`;
      }).join('')}</ul>
      ${order.length < total ? '<p class="support">The ventricular wall wraps the others, so it is not part of this task.</p>' : ''}
      ${viewerStatus !== 'ready' ? `<p class="support" role="status">${viewerStatus === 'loading' ? 'Waiting for the 3D model…' : 'The 3D model is required to find structures.'}</p>` : ''}
      ${viewerStatus === 'ready' && !ready ? '<p class="support" role="status">Loading the 3D region…</p>' : ''}
      <div class="actions">
        ${button('Previous', () => jump(total - 1), { icon: 'arrow-left' })}
        ${skipLessonButton()}
        ${allFound ? button(memorize ? 'Start Round 1' : contrast ? 'Next: contrast' : 'Take the check', afterFind, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })
          : button('Show me', reveal, { icon: 'eye', disabled: activity.revealed })}
      </div></div>`;
  }

  if (stage === 'contrast' && contrast) {
    levelModel(level, { view: teachingView(contrast.a), controls: true, explore: true, focus: [contrast.a, contrast.b], close: true, markerLabels: true });
    return `<div class="prompt lesson-contrast">${top}
      <div class="eyebrow">${escape(level.title)} · Don’t mix them up</div>
      <h1>${escape(contrast.title)}</h1>
      <p class="contrast-text">${escape(contrast.text)}</p>
      <div class="chips">${[contrast.a, contrast.b].filter(id => ITEMS[id]).map(id => chip(id, false, () => focusStructure(id))).join('')}</div>
      <div class="actions">
        ${button('Previous', openFind, { icon: 'arrow-left' })}
        ${skipLessonButton()}
        ${button('Take the check', openCheck, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}
      </div></div>`;
  }

  if (stage === 'checkDone') {
    const check = activity.check || { results: [] };
    const score = check.results.filter(result => result.correct).length;
    const wrong = check.results.filter(result => !result.correct);
    levelModel(level, { view: lessonView(level), controls: true, explore: true, paletteAll: true, layout: 'study-layout lesson-check', markerLabels: true });
    return `<div class="prompt lesson-done">${top}
      <div class="eyebrow">${escape(level.title)} · Check complete</div>
      <h1><span class="${score === check.results.length ? 'good' : ''}">${score}</span> of ${check.results.length} correct</h1>
      ${wrong.length
        ? `<div class="check-hints"><h2>One more look before Round 1</h2><ul>${wrong.map(result =>
          `<li><strong>${escape(result.q)}</strong><p>${escape(result.why)}</p></li>`).join('')}</ul></div>`
        : '<p class="support">Every question correct. Round 1 starts when you are ready.</p>'}
      <div class="actions">${button('Start Round 1', startRounds, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}</div>
    </div>`;
  }

  if (stage === 'check' || stage === 'contrast') {
    if (!activity.check) activity.check = { questions: checkFor(level), index: 0, results: [] };
    const check = activity.check;
    check.index = Math.min(Math.max(Number(check.index) || 0, 0), Math.max(check.questions.length - 1, 0));
    const question = check.questions[check.index];
    // After answering, light the structure the right answer names (if it is one).
    const named = question && activity.answer !== undefined
      ? level.ids.find(id => fold(ITEMS[id].pt) === fold(question.options[question.answer] || '')) : null;
    levelModel(level, { view: named ? teachingView(named) : lessonView(level), controls: true, explore: false,
      focus: named ? [named] : [], close: Boolean(named), layout: 'study-layout lesson-check', preserveCamera: !named && check.index > 0, markerLabels: Boolean(named) });
    if (!question) {
      return `<div class="prompt lesson-done">${top}<h1>Check the level</h1>
        <p>No check questions are available for this level.</p>
        <div class="actions">${button('Start Round 1', startRounds, { class: 'primary', key: 'Enter' })}</div></div>`;
    }
    const next = () => {
      if (activity.answer === undefined) return;
      check.results.push({ q: question.q, correct: activity.answer === question.answer, why: question.why });
      delete activity.answer;
      if (check.index + 1 < check.questions.length) check.index++;
      else activity.stage = 'checkDone';
      render({ top: true, activate: true });
    };
    return `<div class="prompt lesson-check">${top}
      <div class="eyebrow">${escape(level.title)} · Question ${check.index + 1} of ${check.questions.length}</div>
      ${quizMarkup(question, activity)}
      <div class="actions">${activity.answer !== undefined
        ? button(check.index + 1 === check.questions.length ? 'Finish check' : 'Next question', next, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' }) : ''}</div>
    </div>`;
  }

  levelModel(level, { view: lessonView(level), controls: true, explore: true, paletteAll: !lungSeg, markerLabels: true, veinContext: veinContextFor(level.ids) });
  return `<div class="prompt lesson-overview">${top}
    <div class="eyebrow">${escape(regions[level.region]?.title || '')} · Learn</div>
    <h1>${escape(level.title)}</h1>
    <p class="lesson-body">${escape(overviewFor(level))}</p>
    ${lungSeg ? lobeLegendMarkup() : ''}
    ${level.id === 'camaras-1' ? paredevHintMarkup() : ''}
    ${level.region === 'veias' ? `<div class="pair-badge">${language === 'pt-BR' ? 'Pares venosos-arteriais:' : 'Vein–artery pairs:'} <span translate="no">${language === 'pt-BR' ? 'Magna ↔ DA/Cx · Média ↔ DP · Parva ↔ ACD' : 'Great ↔ LAD/LCx · Middle ↔ PDA · Small ↔ RCA'}</span></div>${veinToggleMarkup()}` : ''}
    <h2 class="legend-title">${plural(total, 'structure')} in this level</h2>
    <div class="chips legend">${level.ids.map(id => chip(id, false, () => focusStructure(id))).join('')}</div>
    <p class="support">${lungSeg ? (language === 'pt-BR' ? 'As cores representam os lobos pulmonares. Clique em um nome para destacar o segmento isolado.' : 'Colours match the lung lobes. Click a name to highlight that segment alone.') : 'Each colour stays with its structure for the whole lesson. Click a name to light it alone.'}</p>
    <div class="actions">${skipLessonButton()}${button('Learn the structures', () => jump(0), { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}</div>
  </div>`;
}

function renderMap() {
  const region = regions[selectedRegion];
  const next = nextLevel();
  const level = region?.levels.find(item => item.id === selectedLevel) || region?.levels[0];
  const levels = [...(ORIENTATION.length ? [orientation] : []), ...requiredLevels()];
  const done = levels.filter(passedLevel).length;
  const heartArea = REGIONS.find(r => ['camaras', 'vasos', 'valvas', 'coronarias', 'veias'].includes(r.id))?.area
    || (language === 'pt-BR' ? 'Coração' : 'Heart');
  const map = [...(ORIENTATION.length ? [{ id: 'orientation', title: 'Orientation', area: heartArea }] : []), ...REGIONS];
  const groupedAreas = Boolean(pack.groupMapByArea) || new Set(REGIONS.map(r => r.area).filter(Boolean)).size < REGIONS.length;
  function chooseRegion(id) {
    selectedRegion = id;
    selectedLevel = regions[id]?.levels.find(item => unlocked(item) && !passedLevel(item))?.id;
    render();
    // Bring the region's levels into view when they sit below the fold.
    requestAnimationFrame(() => {
      const heading = $('level-list-title');
      if (!heading) return;
      heading.focus({ preventScroll: true });
      const box = heading.getBoundingClientRect();
      if (box.top > window.innerHeight * .6 || box.top < appHeader.getBoundingClientRect().bottom) scrollBelowHeader(heading);
    });
  }
  const requiredIds = region ? region.ids.filter(id => region.levels.some(level => !level.bonus && level.ids.includes(id))) : [];
  const overviewIds = region && REGION_CONTEXT[region.id] ? requiredIds.filter(id => !SKELETON_IDS.includes(id)) : requiredIds;
  const meshOverviewIds = overviewIds.filter(id => !pack.markers?.[id]);
  setModel(overviewIds.length ? meshOverviewIds : MAP_DEFAULT_IDS, {
    title: region?.title || 'Thoracic anatomy', layout: 'map-layout', view: pack.regionView?.[region?.id] || 'ant',
    context: region ? (REGION_CONTEXT[region.id] || ITEMS[region.ids[0]].deck.ctx) : [],
    ...(pack.regionPadding?.[region?.id] ? { padding: pack.regionPadding[region.id] } : {}),
  });
  const hasAulas = AULAS.length > 0;
  const activeTab = (mapTab && (mapTab !== 'aulas' || hasAulas)) ? mapTab : (hasAulas ? 'aulas' : 'regions');
  const setMapTab = tab => {
    mapTab = tab;
    render();
    document.querySelector('.map-tab[aria-selected="true"]')?.focus({ preventScroll: true });
  };

  const aulasProgress = hasAulas ? aulas.getProgress().blocks : {};
  const aulasDone = hasAulas ? AULAS.filter(block => aulasProgress[block.id]?.passed).length : 0;
  const nextAula = hasAulas ? AULAS.find(block => !aulasProgress[block.id]?.passed && aulaOpen(block)) : null;
  const troubleCount = troubleQuestions().length;
  const nextLabel = next?.id === 'orientation' ? 'Start' : 'Continue';

  let primaryStrip;
  if (nextAula) {
    primaryStrip = `<section class="map-next" aria-label="${aulaText('Next step', 'Próximo passo')}" translate="no">
      <div class="map-next-copy">
        <h2>${escape(nextAula.title)}</h2>
      </div>
      <div class="map-next-actions">
        ${troubleCount ? button(`${aulaText('Trouble spots', 'Pontos fracos')} (${troubleCount})`, startTrouble) : ''}
        ${button(aulasDone ? aulaText('Continue', 'Continuar') : aulaText('Start', 'Começar'), () => startAula(nextAula), { class: 'primary', iconEnd: 'arrow-right' })}
      </div>
    </section>`;
  } else {
    primaryStrip = `<section class="map-next" aria-label="${aulaText('Next step', 'Próximo passo')}">
      <div class="map-next-copy">
        <h2>${next ? escape(next.title) : LEVELS.some(l => l.bonus) ? 'Required levels passed' : 'All levels passed'}</h2>
        ${next?.id === 'orientation' ? '<p>Start here: directions and landmarks.</p>' : ''}
      </div>
      <div class="map-next-actions">
        ${troubleCount ? button(`<span translate="no">${aulaText('Trouble spots', 'Pontos fracos')} (${troubleCount})</span>`, startTrouble) : ''}
        ${next ? button(nextLabel, () => next.id === 'orientation' ? startOrientation() : openLevel(next), { class: 'primary', iconEnd: 'arrow-right' }) : button('Open Daily', () => setPage('daily'), { class: 'primary' })}
      </div>
    </section>`;
  }

  const tabs = [
    ...(hasAulas ? [{ id: 'aulas', label: aulaText('Lessons', 'Aulas'), count: `${aulasDone}/${AULAS.length}` }] : []),
    { id: 'regions', label: aulaText('3D Regions', 'Regiões 3D'), count: `${done}/${levels.length}` },
    { id: 'practice', label: aulaText('Practice', 'Prática') },
  ];
  const tabBar = `<div class="map-tabs" role="tablist" aria-label="${aulaText('Study views', 'Modos de navegação')}" translate="no">${tabs.map(tab =>
    button(`<span>${escape(tab.label)}</span>${tab.count ? `<small>${escape(tab.count)}</small>` : ''}`,
      () => setMapTab(tab.id),
      { class: `map-tab ${activeTab === tab.id ? 'is-active' : ''}`, attrs: `role="tab" aria-selected="${activeTab === tab.id}"` })
  ).join('')}</div>`;

  let panelMarkup = '';
  if (activeTab === 'aulas') {
    panelMarkup = `<div class="map-panel" role="tabpanel">${renderAulasMap()}</div>`;
  } else if (activeTab === 'regions') {
    const stopMarkup = entry => {
      const required = entry.levels?.filter(item => !item.bonus) || [];
      const count = required.filter(passedLevel).length;
      const status = entry.levels ? `${count}/${required.length}` : savedLevel(entry.id).passed ? icon('check', 14) : '';
      return button(`<span class="path-name">${escape(entry.title)}</span><span class="path-count">${status}</span>`,
        () => chooseRegion(entry.id), { class: `path-stop ${entry.id === selectedRegion ? 'chosen' : ''}` });
    };
    let regionsMarkup;
    if (groupedAreas) {
      const areaGroups = [];
      const byArea = new Map();
      map.forEach(entry => {
        const areaName = entry.area || (language === 'pt-BR' ? 'Outros' : 'Other');
        if (!byArea.has(areaName)) {
          const group = { area: areaName, items: [] };
          byArea.set(areaName, group);
          areaGroups.push(group);
        }
        byArea.get(areaName).items.push(entry);
      });
      regionsMarkup = `<div class="map-areas" aria-label="Curriculum regions">${areaGroups.map(group => `
        <section class="map-area" aria-label="${escape(group.area)}">
          <h3 class="map-area-title"${language === 'pt-BR' ? ' translate="no"' : ''}>${escape(group.area)}</h3>
          <div class="path">${group.items.map(stopMarkup).join('')}</div>
        </section>`).join('')}</div>`;
    } else {
      regionsMarkup = `<div class="path" aria-label="Curriculum regions">${map.map(stopMarkup).join('')}</div>`;
    }
    const regionPurpose = REGION_PURPOSES[region?.id || 'orientation'] || '';
    panelMarkup = `<div class="map-panel" role="tabpanel">
      ${regionsMarkup}
      <div class="region-detail">
        <div class="region-detail-head">
          <div>
            <h2 class="level-list-title" id="level-list-title" tabindex="-1">${escape(region?.title || 'Orientation')}</h2>
            ${regionPurpose ? `<p class="region-purpose">${escape(regionPurpose)}</p>` : ''}
          </div>
          ${region ? button('Recall region', () => startFullRecall(region), { class: 'region-recall-btn' }) : ''}
        </div>
        <div class="level-list">
          ${!region ? `<div class="level-item"><div class="level-heading"><h2>Orientation tour</h2></div><p>Learn the heart’s surfaces, borders and axis on the 3D model.</p>
            <div class="actions">${button(savedLevel('orientation').passed ? 'Redo orientation' : 'Start orientation', startOrientation, { class: 'primary' })}</div></div>`
            : region.levels.map(entry => renderLevelRow(entry, level)).join('')}
        </div>
      </div>
    </div>`;
  } else {
    const modeRow = (iconName, title, text, action, highlight = false) => `<li class="mode-row ${highlight ? 'is-featured' : ''}">
      <span class="mode-row-icon" aria-hidden="true">${icon(iconName, 17)}</span>
      <div class="mode-row-text"><h3>${title}</h3>${text ? `<p>${text}</p>` : ''}</div>
      <div class="mode-row-action">${action}</div>
    </li>`;
    panelMarkup = `<div class="map-panel" role="tabpanel">
      <ul class="mode-list" aria-label="Study modes">
        ${troubleCount ? modeRow('crosshair', aulaText('Trouble spots', 'Pontos fracos'),
          `<span translate="no">${aulaText(`${troubleCount} questions to fix · each leaves after 2 right in a row`, `${troubleCount} questões para corrigir · cada uma sai após 2 acertos seguidos`)}</span>`,
          button(aulaText('Practise', 'Praticar'), startTrouble, { class: 'primary' }), true) : ''}
        ${nextAula && modeRow('arrow-right', next ? escape(next.title) : LEVELS.some(l => l.bonus) ? 'Required levels passed' : 'All levels passed',
          next?.id === 'orientation' ? 'Start here: directions and landmarks.' : '',
          next ? button(nextLabel, () => next.id === 'orientation' ? startOrientation() : openLevel(next), { iconEnd: 'arrow-right' }) : button('Open Daily', () => setPage('daily'))) || ''}
        ${BLOOD_FLOW.length ? modeRow('route', aulaText('Blood pathway', 'Trajeto do sangue'), aulaText('Follow the 12 steps of blood flow through the heart in 3D.', 'Acompanhe as 12 etapas do trajeto do sangue no coração em 3D.'), button(aulaText('Study', 'Estudar'), startBloodFlow)) : ''}
        ${aulaSequences.map(sequence => modeRow('route', escape(sequence.title), sequence.unit === 'lymph'
          ? aulaText('Follow lymph from the tissues to the veins.', 'Acompanhe a linfa dos tecidos até as veias.')
          : aulaText('Follow cardiac development by week.', 'Acompanhe o desenvolvimento cardíaco semana a semana.'),
          button(aulaText('Open', 'Abrir'), () => startAula(sequence)))).join('')}
        ${TERRITORIES.length ? modeRow('crosshair', 'Coronary territories', 'Match each wall to its artery.', button(aulaText('Open', 'Abrir'), startTerritories)) : ''}
        ${SLIDE_QUESTIONS.length ? modeRow('book', "Professor's slides", `<span translate="no">${aulaText(`${slidesMastered()} questions mastered`, `${slidesMastered()} questões dominadas`)}</span>`, button(aulaText('Open', 'Abrir'), startSlides)) : ''}
        ${SUPPLY_BLOCKS.length ? modeRow('route', aulaText('Supply guide: branching and territories', 'Guia de vascularização: ramificações e territórios'), aulaText('Arteries, veins and nerves of each organ, the branching trees and the territories, without unlocking the course.', 'Artérias, veias e nervos de cada órgão, as árvores de ramificação e os territórios, sem precisar destravar o curso.'), button(aulaText('Open', 'Abrir'), startSupply)) : ''}
        ${BRANCHES.length ? modeRow('route', 'Artery branching', 'Where each artery comes from, what it divides into, where it changes name.', button(aulaText('Open', 'Abrir'), startBranching)) : ''}
        ${modeRow('calendar', 'Structure of the day', 'One structure from memory.', button('Recall', () => startDailyStructure()))}
        ${modeRow('rotate-cw', 'All structures', `${IDS.length} structures · one continuous recall, including unstudied material.`, button('Recall all', () => startFullRecall()))}
      </ul>
    </div>`;
  }

  return `<div class="map-content">
    <div class="page-head map-head">
      <h1>${escape(pack.mapHeading || `${pack.name} map`)}</h1>
    </div>
    ${primaryStrip}
    ${tabBar}
    ${panelMarkup}
  </div>`;
}

const aulaText = (en, pt) => language === 'pt-BR' ? pt : en;
const NOTES = pack.notes || {};
const SLOT_LABELS = { from: ['From', 'Origem'], supplies: ['Supplies', 'Irriga/inerva'], suppliedBy: ['Supplied by', 'Irrigação / inervação'], drains: ['Drains', 'Drena'],
  receives: ['Receives', 'Recebe'], sends: ['Sends to', 'Envia para'], clinical: ['Clinical', 'Clínica'] };
let meaningHints = true;
try { meaningHints = localStorage.getItem('meaning_hints') !== '0'; } catch (_) { /* default on */ }
function toggleMeaningHints() {
  meaningHints = !meaningHints;
  try { localStorage.setItem('meaning_hints', meaningHints ? '1' : '0'); } catch (_) { /* session only */ }
  render();
}
const meaningLabel = () => meaningHints ? aulaText('Hide meaning', 'Ocultar significado') : aulaText('Show meaning', 'Mostrar significado');
function meaningMarkup(id, atlasMode = false) {
  const role = NOTES[id]?.role;
  if (!role) return '';
  return `<p class="meaning-line" translate="no">${meaningHints ? `<span class="meaning-role">${escape(role)}</span>` : ''}
    ${atlasMode ? `<button type="button" class="button meaning-toggle" data-atlas-action="meaning">${meaningLabel()}</button>`
      : button(meaningLabel(), toggleMeaningHints, { class: 'meaning-toggle' })}</p>`;
}
function slotsMarkup(id) {
  const slots = NOTES[id]?.slots;
  if (!slots || !Object.keys(slots).length) return '';
  return `<dl class="note-slots" translate="no">${Object.entries(SLOT_LABELS).filter(([key]) => slots[key]).map(([key, [en, pt]]) =>
    `<div><dt>${aulaText(en, pt)}</dt><dd>${escape(slots[key])}</dd></div>`).join('')}</dl>`;
}

const TERM_3D_ALIASES = [
  ['ascending aorta', 'aoasc'], ['aorta ascendente', 'aoasc'],
  ['aortic arch', 'arco'], ['arch of aorta', 'arco'], ['arco aórtico', 'arco'], ['arco da aorta', 'arco'],
  ['descending thoracic aorta', 'aodesc'], ['descending aorta', 'aodesc'], ['thoracic aorta', 'aodesc'],
  ['aorta torácica descendente', 'aodesc'], ['aorta descendente', 'aodesc'], ['aorta torácica', 'aodesc'],
  ['brachiocephalic trunk', 'tbc'], ['tronco braquiocefálico', 'tbc'],
  ['right common carotid artery', 'ccd'], ['right common carotid', 'ccd'], ['carótida comum direita', 'ccd'],
  ['left common carotid artery', 'cce'], ['left common carotid', 'cce'], ['carótida comum esquerda', 'cce'],
  ['right subclavian artery', 'scd'], ['right subclavian', 'scd'], ['subclávia direita', 'scd'],
  ['left subclavian artery', 'sce'], ['left subclavian', 'sce'], ['subclávia esquerda', 'sce'],
  ['subclavian artery', 'scd'], ['artéria subclávia', 'scd'], ['subclávia', 'scd'],
  ['internal thoracic artery', 'ita_d'], ['artéria torácica interna', 'ita_d'], ['internal thoracic vessels', 'ita_d'], ['vasos torácicos internos', 'ita_d'],
  ['internal thoracic vein', 'itv_d'], ['veia torácica interna', 'itv_d'],
  ['musculophrenic artery', 'mfa_d'], ['musculophrenic', 'mfa_d'], ['musculofrênica', 'mfa_d'],
  ['superior epigastric artery', 'aes_d'], ['superior epigastric', 'aes_d'], ['epigástrica superior', 'aes_d'],
  ['thyrocervical trunk', 'ttc_d'], ['tronco tireocervical', 'ttc_d'],
  ['costocervical trunk', 'tcc_d'], ['tronco costocervical', 'tcc_d'],
  ['vertebral artery', 'vert_d'], ['artéria vertebral', 'vert_d'],
  ['inferior thyroid artery', 'tirinf_d'], ['artéria tireóidea inferior', 'tirinf_d'],
  ['transverse cervical artery', 'tcerv_d'], ['cervical transversa', 'tcerv_d'],
  ['suprascapular artery', 'supsc_d'], ['artéria supraescapular', 'supsc_d'],
  ['dorsal scapular artery', 'dscap_d'], ['dorsal da escápula', 'dscap_d'],
  ['deep cervical artery', 'cervprof_d'], ['cervical profunda', 'cervprof_d'],
  ['axillary artery', 'axa_d'], ['artéria axilar', 'axa_d'],
  ['lateral thoracic artery', 'torlat_d'], ['torácica lateral', 'torlat_d'],
  ['subscapular artery', 'subsc_d'], ['artéria subescapular', 'subsc_d'],
  ['circumflex scapular artery', 'circscap_d'], ['circunflexa da escápula', 'circscap_d'],
  ['thoracodorsal artery', 'thdors_d'], ['toracodorsal', 'thdors_d'],
  ['brachial artery', 'bra_d'], ['artéria braquial', 'bra_d'],
  ['deep brachial artery', 'bprof_d'], ['braquial profunda', 'bprof_d'],
  ['radial artery', 'rad_d'], ['artéria radial', 'rad_d'],
  ['ulnar artery', 'uln_d'], ['artéria ulnar', 'uln_d'],
  ['superficial palmar arch', 'arcsup_d'], ['arco palmar superficial', 'arcsup_d'],
  ['deep palmar arch', 'arcprof_d'], ['arco palmar profundo', 'arcprof_d'],
  ['superior vena cava', 'vcs'], ['veia cava superior', 'vcs'], ['SVC', 'vcs'], ['VCS', 'vcs'],
  ['inferior vena cava', 'vci'], ['veia cava inferior', 'vci'], ['IVC', 'vci'], ['VCI', 'vci'],
  ['right brachiocephalic vein', 'vbcd'], ['veia braquiocefálica direita', 'vbcd'],
  ['left brachiocephalic vein', 'vbce'], ['veia braquiocefálica esquerda', 'vbce'],
  ['brachiocephalic veins', 'vbcd'], ['veias braquiocefálicas', 'vbcd'],
  ['subclavian vein', 'vsc_d'], ['veia subclávia', 'vsc_d'],
  ['azygos vein', 'azigo'], ['veia ázigos', 'azigo'],
  ['accessory hemiazygos vein', 'azigo_acs'], ['hemiázigos acessória', 'azigo_acs'],
  ['hemiazygos vein', 'hemiazigo'], ['veia hemiázigos', 'hemiazigo'],
  ['pulmonary trunk', 'tp'], ['tronco pulmonar', 'tp'],
  ['right pulmonary artery', 'apd'], ['artéria pulmonar direita', 'apd'],
  ['left pulmonary artery', 'ape'], ['artéria pulmonar esquerda', 'ape'],
  ['pulmonary veins', 'vpse'], ['veias pulmonares', 'vpse'],
  ['right atrium', 'ad'], ['átrio direito', 'ad'],
  ['left atrium', 'ae'], ['átrio esquerdo', 'ae'],
  ['right ventricle', 'vd'], ['ventrículo direito', 'vd'],
  ['left ventricle', 've'], ['ventrículo esquerdo', 've'],
  ['myocardium', 'paredev'], ['miocárdio', 'paredev'],
  ['tricuspid valve', 'tri_ant'], ['valva tricúspide', 'tri_ant'], ['tricúspide', 'tri_ant'],
  ['mitral valve', 'mit_ant'], ['valva mitral', 'mit_ant'], ['mitral', 'mit_ant'],
  ['aortic valve', 'ao_ant'], ['valva aórtica', 'ao_ant'],
  ['pulmonary valve', 'pulm_ant_e'], ['valva pulmonar', 'pulm_ant_e'],
  ['right coronary artery', 'acd'], ['artéria coronária direita', 'acd'], ['RCA', 'acd'], ['ACD', 'acd'],
  ['left coronary artery', 'tce'], ['artéria coronária esquerda', 'tce'], ['coronária esquerda', 'tce'], ['LCA', 'tce'], ['ACE', 'tce'],
  ['anterior interventricular branch', 'dae'], ['ramo interventricular anterior', 'dae'], ['left anterior descending', 'dae'], ['LAD', 'dae'],
  ['circumflex branch', 'cx'], ['circumflex artery', 'cx'], ['ramo circunflexo', 'cx'], ['artéria circunflexa', 'cx'],
  ['posterior interventricular branch', 'dp'], ['posterior descending artery', 'dp'], ['ramo interventricular posterior', 'dp'], ['artéria descendente posterior', 'dp'], ['PDA', 'dp'],
  ['coronary sinus', 'seio'], ['seio coronário', 'seio'],
  ['great cardiac vein', 'vcmagna'], ['veia cardíaca magna', 'vcmagna'],
  ['middle cardiac vein', 'vcmedia'], ['veia cardíaca média', 'vcmedia'],
  ['small cardiac vein', 'vcparva'], ['pequena veia cardíaca', 'vcparva'], ['veia cardíaca parva', 'vcparva'],
  ['posterior vein of the left ventricle', 'vpve'], ['veia posterior do ventrículo esquerdo', 'vpve'],
  ['esophagus', 'esofago'], ['esôfago', 'esofago'],
  ['diaphragm', 'diafragma'], ['diafragma', 'diafragma'],
  ['sternum', 'esterno'], ['esterno', 'esterno'],
  ['thymus gland', 'timo_d'], ['thymus', 'timo_d'], ['timo', 'timo_d'],
  ['trachea', 'traqueia'], ['traqueia', 'traqueia'],
  ['right main bronchus', 'bpd'], ['brônquio principal direito', 'bpd'],
  ['left main bronchus', 'bpe'], ['brônquio principal esquerdo', 'bpe'],
  ['thyroid cartilage', 'lar_tir'], ['cartilagem tireóidea', 'lar_tir'], ['cartilagem tireoide', 'lar_tir'],
  ['cricoid cartilage', 'lar_cri'], ['cartilagem cricóidea', 'lar_cri'], ['cartilagem cricoide', 'lar_cri'],
  ['epiglottis', 'lar_epi'], ['epiglote', 'lar_epi'],
  ['arytenoid cartilage', 'lar_ari'], ['cartilagem aritenóidea', 'lar_ari'], ['aritenoide', 'lar_ari'],
  ['corniculate cartilage', 'lar_cor'], ['cartilagem corniculada', 'lar_cor'],
  ['hyoid bone', 'lar_hio'], ['osso hioide', 'lar_hio'], ['hioide', 'lar_hio'],
  ['thyrohyoid membrane', 'lar_mth'], ['membrana tireo-hióidea', 'lar_mth'],
  ['cricothyroid ligament', 'lar_mct'], ['ligamento cricotireóideo', 'lar_mct'],
  ['posterior cricoarytenoid', 'lar_pca'], ['cricoaritenóideo posterior', 'lar_pca'],
  ['lateral cricoarytenoid', 'lar_lca'], ['cricoaritenóideo lateral', 'lar_lca'],
  ['cricothyroid', 'lar_ct'], ['cricotireóideo', 'lar_ct'],
  ['vocal ligament', 'lar_vl'], ['ligamento vocal', 'lar_vl'],
];

function termCategory(id) {
  const deck = ITEMS[id]?.deck.id;
  if (deck === 'coronarias' || deck === 'artpulm' || deck === 'membro' || /^(aoasc|arco|aodesc|tbc|cc[de]|sc[de]|tp|ap[de]|ita_|mfa_|aes_|ttc_|tcc_|pica_|eso_art|phren_inf_a_)/.test(id)) return 'artery';
  if (deck === 'veias' || deck === 'veipulm' || /^(vcs|vci|vbc[de]|azigo|hemiazigo|vsc_|itv_|icv_|phren_inf_v|phren_sup_v|vp[si][de])/.test(id)) return 'vein';
  if (deck === 'valvas') return 'valve';
  if (deck === 'camaras') return 'chamber';
  if (deck === 'laringe' || deck === 'vias' || deck === 'segd' || deck === 'sege' || deck === 'lobos') return 'airway';
  return 'other';
}

let termMatcherCache = null;
function getTermMatcher() {
  if (termMatcherCache) return termMatcherCache;
  const byLower = new Map();
  for (const [alias, id] of [...(pack.termAliases || []), ...TERM_3D_ALIASES]) {
    if (ITEMS[id] && !byLower.has(alias.toLowerCase())) byLower.set(alias.toLowerCase(), id);
  }
  for (const [id, item] of Object.entries(ITEMS)) {
    const label = item?.pt?.trim();
    if (label && label.length >= 4 && !byLower.has(label.toLowerCase())) byLower.set(label.toLowerCase(), id);
  }
  const keys = [...byLower.keys()].sort((a, b) => b.length - a.length);
  const escRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = keys.length ? new RegExp(`(?<![\\p{L}\\p{N}])(${keys.map(escRe).join('|')})(?![\\p{L}\\p{N}])`, 'giu') : null;
  termMatcherCache = { byLower, regex };
  return termMatcherCache;
}

const NUM_RE = /\b(?:\d+(?:[.,–-]\d+)?\s*(?:%|mL|cm|mmHg|µm|s\b|seconds?\b|segundos?\b|years?\b|anos?\b|°|degrees?\b|graus?\b)|[CTLS]\d+(?:[–-][CTLS]?\d+)?|(?:day|dia|week|semana)\s+\d+(?:[–-]\d+)?|\d+(?:st|nd|rd|th|º|ª))\b/giu;
const KEY_RE = /(?<![\p{L}\p{N}])(pars membranacea|Valsalva|Arantius|Arâncio|Koch triangle|triângulo de Koch|Eustachian valve|valva de Eustáquio|Thebesian valve|valva de Tebésio|vein of Marshall|veia de Marshall|ligament of Marshall|ligamento de Marshall|diverticulum of Haller|divertículo de Haller|Legamento arterioso di Botallo|ligamentum arteriosum|ligamento arterioso|moderator band|banda moderadora|septomarginal trabecula|trabécula septomarginal|conus arteriosus|cone arterial|crista terminalis|crista terminal|fossa ovalis|fossa oval|ansa subclavia|alça subclávia|stellate ganglion|gânglio estrelado|cisterna chyli|cisterna do quilo|Kiesselbach|conus elasticus|cone elástico|subclavian steal|anisosphygmia|anisosfigmia|systole|sístole|diastole|diástole|acute margin|margem aguda|obtuse margin|margem obtusa|transverse pericardial sinus|seio pericárdico transverso|transverse sinus|seio transverso|oblique pericardial sinus|seio pericárdico oblíquo|oblique sinus|seio oblíquo|fibrous skeleton|esqueleto fibroso|bundle of His|feixe de His|Purkinje|sinoatrial \(SA\) node|SA node|nó sinoatrial|nó SA|AV node|nó AV|right dominance|dominância direita|left dominance|dominância esquerda|codominance|codominância|capacitance|capacitância|conducting|condutores|distributing|distribuidores|exchange|de troca|epicardium|epicárdio|endocardium|endocárdio|pericardium|pericárdio|noncoronary|não coronariana|bicuspid|bicúspide|abducts|abduz|adducts|aduz)(?![\p{L}\p{N}])/giu;

function formatPlainSegment(text, isStart = false) {
  let lead = '';
  let body = text;
  if (isStart) {
    const colon = body.match(/^([^:]{2,48}:)(\s+)/);
    if (colon) {
      lead = `<strong class="term-lead">${escape(colon[1])}</strong>${colon[2]}`;
      body = body.slice(colon[0].length);
    }
  }
  const parts = [];
  let cursor = 0;
  const combined = new RegExp(`(${NUM_RE.source})|(${KEY_RE.source})`, 'giu');
  for (const m of body.matchAll(combined)) {
    if (m.index > cursor) parts.push(escape(body.slice(cursor, m.index)));
    if (m[1]) parts.push(`<strong class="term-num">${escape(m[1])}</strong>`);
    else if (m[2]) parts.push(`<em class="term-key">${escape(m[2])}</em>`);
    cursor = m.index + m[0].length;
  }
  if (cursor < body.length) parts.push(escape(body.slice(cursor)));
  return lead + parts.join('');
}

function richText(text, { link3d = true } = {}) {
  const raw = String(text ?? '');
  if (!raw) return '';
  if (!link3d) return formatPlainSegment(raw, true);
  const { byLower, regex } = getTermMatcher();
  if (!regex) return formatPlainSegment(raw, true);
  const out = [];
  let cursor = 0;
  let has3d = false;
  for (const m of raw.matchAll(regex)) {
    const matched = m[0];
    const id = byLower.get(matched.toLowerCase());
    if (!id) continue;
    if (m.index > cursor) out.push(formatPlainSegment(raw.slice(cursor, m.index), cursor === 0));
    const cat = termCategory(id);
    const role = NOTES[id]?.role;
    const tip = role ? `${ITEMS[id].pt} — ${role} (${aulaText('click to highlight in 3D', 'clique para destacar no 3D')})`
      : `${ITEMS[id].pt} (${aulaText('click to highlight in 3D', 'clique para destacar no 3D')})`;
    out.push(`<button type="button" class="term-3d term-3d--${cat}" data-focus-id="${escape(id)}" title="${escape(tip)}">${escape(matched)}</button>`);
    has3d = true;
    cursor = m.index + matched.length;
  }
  if (cursor < raw.length) out.push(formatPlainSegment(raw.slice(cursor), cursor === 0));
  return out.join('');
}

const richList = (values, opts) => `<ul>${values.map(value => `<li>${richText(value, opts)}</li>`).join('')}</ul>`;
// Full-page explanations: card.body is a list of paragraphs ("### " starts a subhead).
const richBody = (paragraphs, opts) => `<div class="aulas-body">${paragraphs.map(text => text.startsWith('### ')
  ? `<h3 class="aulas-subhead">${escape(text.slice(4))}</h3>` : `<p>${richText(text, opts)}</p>`).join('')}</div>`;
const cardText = (card, opts) => (card.diagram ? renderDiagram(card.diagram) : '') + (card.body ? richBody(card.body, opts) : richList(card.facts || [], opts));

// Schematic tree diagrams (SVG) for vessels and nerves: an indented tree whose labels stay
// hidden until tapped, with dashed brackets for anastomoses listed in a numbered legend.
// diagram = { root: { label, note?, children? }, links?: [{ from, to, label }] } (from/to are labels).
function renderDiagram(diagram) {
  const rows = [];
  const walk = (node, depth, parent) => {
    const row = { node, depth, parent, index: rows.length };
    rows.push(row);
    (node.children || []).forEach(child => walk(child, depth + 1, row));
  };
  walk(diagram.root, 0, null);
  const H = 30, X = 14, INDENT = 22, W = 360;
  const links = (diagram.links || []).map((link, index) => ({ ...link, n: index + 1,
    a: rows.find(row => row.node.label === link.from), b: rows.find(row => row.node.label === link.to) })).filter(link => link.a && link.b);
  const height = rows.length * H + 10;
  const y = row => row.index * H + 20;
  const lines = rows.filter(row => row.parent).map(row => {
    const px = X + row.parent.depth * INDENT + 5;
    return `<path class="dg-edge" d="M${px} ${y(row.parent) + 6} V${y(row)} H${X + row.depth * INDENT - 2}"/>`;
  }).join('');
  const nodes = rows.map(row => {
    const x = X + row.depth * INDENT;
    const hidden = row.depth > 0 ? ' dg-hidden' : '';
    const note = row.node.note ? ` <tspan class="dg-note">${escape(row.node.note)}</tspan>` : '';
    return `<g class="dg-node${hidden}" tabindex="0" role="button" data-dg="${row.index}">
      <circle cx="${x + 5}" cy="${y(row)}" r="4"/>
      <text class="dg-label" x="${x + 14}" y="${y(row) + 4}">${escape(row.node.label)}${note}</text>
      <rect class="dg-mask" x="${x + 12}" y="${y(row) - 10}" width="${Math.min(150, W - x - 30)}" height="20" rx="6"/>
      <text class="dg-q" x="${x + 20}" y="${y(row) + 4}">?</text></g>`;
  }).join('');
  const arcs = links.map((link, i) => {
    const ax = W - 14 - i * 9, y1 = y(link.a), y2 = y(link.b);
    return `<path class="dg-link" d="M${ax - 8} ${y1} H${ax} V${y2} H${ax - 8}"/><text class="dg-link-n" x="${ax + 3}" y="${(y1 + y2) / 2 + 4}">${link.n}</text>`;
  }).join('');
  const legend = links.length ? `<ol class="dg-legend">${links.map(link => `<li>${escape(link.label || '')} <span class="dg-pair">${escape(link.from)} ⟷ ${escape(link.to)}</span></li>`).join('')}</ol>` : '';
  return `<figure class="dg" data-diagram>
    <div class="dg-tools"><span class="muted">${aulaText('Tap a branch to reveal it.', 'Toque em um ramo para revelá-lo.')}</span>
      <button type="button" class="dg-all">${aulaText('Reveal all', 'Revelar tudo')}</button></div>
    <svg viewBox="0 0 ${W} ${height}" role="img">${lines}${arcs}${nodes}</svg>${legend}</figure>`;
}
document.addEventListener('click', event => {
  const all = event.target.closest?.('.dg-all');
  if (all) {
    const figure = all.closest('.dg');
    const hide = figure.dataset.revealed === '1';
    figure.querySelectorAll('.dg-node').forEach((node, index) => index && node.classList.toggle('dg-hidden', hide));
    figure.dataset.revealed = hide ? '' : '1';
    all.textContent = hide ? aulaText('Reveal all', 'Revelar tudo') : aulaText('Hide all', 'Esconder tudo');
    return;
  }
  const node = event.target.closest?.('.dg-node');
  if (node) node.classList.remove('dg-hidden');
});

document.addEventListener('click', event => {
  const reset = event.target.closest('[data-focus-reset]');
  if (reset) { restoreStepView(); return; }
  const btn = event.target.closest('.term-3d[data-focus-id]');
  if (!btn) return;
  focusStructure(btn.dataset.focusId);
});

const aulaStageLabel = () => [aulaText('Study', 'Estudo'), aulaText('Practice', 'Prática'), aulaText('Test', 'Teste')];
const aulaUnitOrder = unit => AULAS.filter(b => (b.unit || 'heart') === (unit || 'heart')).map(b => b.id);
const aulaOpen = () => true; // every lesson can be opened (skipping does not mark anything as passed)
const aulaItems = block => (block.questions || block.questionIds.map(id => aulasQuestions.get(id))).filter(Boolean);
const REVIEW_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000;
function startAula(block) {
  if (!block?.cards.length || (AULAS.includes(block) && !aulaOpen(block))) return;
  const saved = block.sequenceOnly ? null : ['practice', 'test'].find(stage => aulas.hasSavedSession(block.id, stage));
  if (saved) {
    stopTimers();
    activity = { type: 'aulas', block, stage: saved, cardIndex: 0 };
    started = performance.now();
    changeAulaStage(saved);
    return;
  }
  launch('aulas', { block, stage: 'study', cardIndex: 0 });
}

function renderAulasMap() {
  if (!AULAS.length) return '';
  const { blocks } = aulas.getProgress();
  const groups = new Map();
  for (const block of AULAS) {
    const unit = block.unit || 'heart';
    if (!groups.has(unit)) groups.set(unit, []);
    const listInUnit = groups.get(unit);
    listInUnit.push({ block });
  }
  const currentUnit = AULAS.find(block => !blocks[block.id]?.passed)?.unit || 'heart';
  const nowMs = Date.now();
  return `<section class="aulas-map" translate="no">
    ${Array.from(groups, ([unit, entries]) => {
      const completed = entries.filter(({ block }) => blocks[block.id]?.passed).length;
      return `<details ${unit === currentUnit ? 'open' : ''}>
        <summary><span>${escape(SLIDE_UNITS[unit]?.label || unit)}</span><small>${completed}/${entries.length}</small></summary>
        <ol class="aulas-blocks">${entries.map(({ block }, index) => {
      const record = blocks[block.id];
      const reviewDue = Boolean(record?.passed && record.lastReviewedAt && nowMs - record.lastReviewedAt >= REVIEW_INTERVAL_MS);
      const status = reviewDue ? aulaText('Review due', 'Revisar') : record?.passed ? aulaText('Passed', 'Concluído') : '';
      const mark = record?.passed ? icon('check', 15) : '';
      const stateClass = record?.passed ? 'is-passed' : 'aulas-available';
      return `<li>${button(`<span class="aulas-num">${index + 1}.</span><span>${escape(block.title)}</span>${status || mark ? `<small>${mark}${status}</small>` : ''}`, () => startAula(block),
        { class: `aulas-block ${stateClass}` })}</li>`;
        }).join('')}</ol></details>`;
    }).join('')}
  </section>`;
}

function aulaScene(entry, unit, reveal = true, trail = []) {
  const scene = entry.scene || SLIDE_UNITS[entry.unit || unit] || { visible: [], ghost: [], label: '' };
  const ids = [...(entry.focus || [])];
  if (reveal) ids.push(...(entry.reveal || []));
  const focus = reveal || entry.highlight ? ids : [];
  const trailIds = trail.flatMap(step => step.focus);
  const palette = {};
  const flowColor = blood => blood === 'venous' ? '#3b82f6' : '#ef4444';
  if (entry.blood) {
    for (const step of [...trail, entry]) {
      for (const id of step.focus) palette[id] = flowColor(step.blood);
    }
    if (reveal) {
      for (const id of entry.reveal || []) palette[id] = flowColor(entry.revealBlood || entry.blood);
    }
  }
  const focusSet = new Set(focus);
  const context = [...new Set([...(scene.ghost || []), ...(entry.ghost || [])])].filter(id => !focusSet.has(id));
  const shown = [...scene.visible, ...trailIds, ...ids];
  if (!shown.length) return;
  setModel(shown, { title: scene.label, context, focus, palette, view: entry.view || scene.view || 'ant',
    subtleContext: trailIds, controls: true, padding: 1.3, frameFocus: focus.length > 0 });
}

function changeAulaStage(stage, { fresh = false } = {}) {
  const state = activity;
  stopTimers();
  state.stage = stage;
  const questions = aulaItems(state.block);
  const previousSlides = stage === 'practice' ? slidesStats() : {};
  const weakIds = new Set(questions.filter(question => previousSlides[question.id] === 0).map(question => question.id));
  state.session = aulas.createSession({ mode: stage, blockId: state.block.id, questions, weakIds, fresh });
  delete state.feedback;
  render({ top: true, activate: true });
}

function updateAulasTimer() {
  const clock = $('aulas-timer');
  if (!clock || activity?.stage !== 'test') return;
  const total = Math.max(0, Math.floor((Date.now() - activity.session.startedAt) / 1000));
  clock.textContent = `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`;
}

function answerAula(index) {
  const state = activity;
  const { session } = state;
  const question = session.current;
  if (!question || state.feedback) return;
  const testing = session.mode === 'test';
  const correct = index === question.answer;
  const hint = session.hintLevel;
  if (!testing) state.feedback = { question, index, correct, hint };
  aulas.answer(session, { correct });
  if (aulasQuestions.has(question.id)) {
    const stats = slidesStats();
    stats[question.id] = Number(correct && !hint);
    saveSlidesStats(stats);
  }
  if (testing && session.finished) {
    state.stage = 'result';
    stopTimers();
    recordActivity();
  }
  render({ top: testing, activate: testing });
  if (!testing) document.querySelector('.aulas-screen .primary')?.focus({ preventScroll: true });
}

function renderAulas() {
  const state = activity;
  const { block, stage } = state;
  const labels = aulaStageLabel();
  const stageIds = ['study', 'practice', 'test'];
  const activeStage = stageIds.indexOf(stage === 'result' ? 'test' : stage);
  const goAulaStage = target => {
    if (target === 'study') {
      stopTimers();
      state.stage = 'study';
      state.cardIndex = Math.min(Math.max(Number(state.cardIndex) || 0, 0), Math.max(block.cards.length - 1, 0));
      delete state.feedback;
      render({ top: true, activate: true });
      return;
    }
    aulas.completeStudy(block.id);
    changeAulaStage(target, { fresh: stage === 'result' && target === 'test' });
  };
  const header = block.sequenceOnly ? '' : `<ol class="aulas-stages" aria-label="${aulaText('Lesson stages', 'Etapas da aula')}">${labels.map((label, index) =>
    `<li ${index === activeStage ? 'aria-current="step"' : ''}>${stageIds[index] === stage
      ? `<span class="aulas-stage-btn">${label}</span>`
      : button(
      `${index < activeStage ? icon('check', 14) : ''}${label}`,
      () => goAulaStage(stageIds[index]),
      { class: 'aulas-stage-btn' }
    )}</li>`).join('')}</ol>`;
  const back = button(aulaText('Back to map', 'Voltar ao mapa'), () => setPage('map'), { icon: 'arrow-left' });
  if (stage === 'study') {
    const index = state.cardIndex;
    const card = block.cards[index];
    const last = index === block.cards.length - 1;
    aulaScene(card, block.unit || 'heart', true, card.blood ? block.cards.slice(0, index) : []);
    const jump = target => { state.cardIndex = target; render({ top: true, activate: true }); };
    const trail = block.sequence ? `<ol class="flow-track aulas-sequence" aria-label="${aulaText('Sequence steps', 'Etapas da sequência')}">${block.cards.map((step, index) =>
      `<li ${index === state.cardIndex ? 'aria-current="step"' : ''}>${button(escape(step.short || step.title), () => jump(index),
        { class: `flow-slot ${index === state.cardIndex ? 'current' : index < state.cardIndex ? 'done' : ''} ${step.blood || ''}` })}</li>`).join('')}</ol>` : '';
    const legend = card.blood ? `<div class="flow-legend">
      <span><i class="flow-dot venous" aria-hidden="true"></i>${aulaText('Oxygen-poor blood', 'Sangue pobre em oxigênio')}</span>
      <span><i class="flow-dot arterial" aria-hidden="true"></i>${aulaText('Oxygen-rich blood', 'Sangue rico em oxigênio')}</span>
    </div>` : '';
    return `<div class="screen aulas-screen" translate="no">${header}
      <h1>${escape(card.title)}</h1>
      ${trail}${legend}
      <div id="aulas-focus-bar" class="aulas-focus-bar" hidden></div>
      ${card.body && card.ref ? `<p class="aulas-ref muted">${/[–-]/.test(card.ref) ? 'Slides' : 'Slide'} ${escape(card.ref)}</p>` : ''}
      ${cardText(card)}
      ${block.unit === 'cardiogenesis'
        ? `<p class="muted">${aulaText('The 3D model shows adult structures as reference points for development.', 'O modelo 3D mostra estruturas adultas como referências para entender o desenvolvimento.')}</p>`
        : card.contextOnly || card.focus?.length === 0 ? `<p class="muted">${aulaText('The model shows the surrounding anatomy.', 'O modelo mostra a anatomia ao redor.')}</p>` : ''}
      ${card.confusion ? `<p class="aulas-confusion"><strong>${aulaText('Common confusion', 'Confusão comum')}</strong> ${richText(card.confusion)}</p>` : ''}
      <div class="actions">${back}
        ${index ? button(block.sequence ? aulaText('Previous step', 'Etapa anterior') : aulaText('Previous card', 'Cartão anterior'), () => jump(index - 1)) : ''}
        ${last && block.sequenceOnly ? '' : button(last ? aulaText('Start practice', 'Começar a prática') : block.sequence ? aulaText('Next step', 'Próxima etapa') : aulaText('Next card', 'Próximo cartão'), () => {
          if (!last) return jump(index + 1);
          aulas.completeStudy(block.id);
          changeAulaStage('practice');
        }, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}
      </div></div>`;
  }
  const { session } = state;
  if (stage === 'result') {
    const { correct, total, score, passed, elapsedMs } = session.result;
    const record = aulas.getProgress().blocks[block.id];
    const placement = AULAS.indexOf(block);
    const next = placement >= 0 ? AULAS[placement + 1] : null;
    const misses = session.answers.filter(answer => !answer.correct).map(answer => aulaItems(block).find(question => question.id === answer.id)).filter(Boolean);
    return `<div class="screen aulas-screen result" translate="no">${header}
      <h1>${passed ? icon('check', 24) : ''} ${score}% · ${passed ? aulaText('Passed', 'Aprovado') : aulaText('Try again', 'Tente novamente')}</h1>
      <p>${aulaText(`${correct} of ${total} correct · ${studyTime(elapsedMs / 1000)} · Best: ${record?.bestScore ?? score}%`, `${correct} de ${total} acertos · ${studyTime(elapsedMs / 1000)} · Melhor resultado: ${record?.bestScore ?? score}%`)}</p>
      <p>${aulaText('Passing score: 90%.', 'Nota para aprovação: 90%.')}</p>
      <div class="actions">${back}
        ${button(aulaText('Practise again', 'Praticar de novo'), () => changeAulaStage('practice', { fresh: true }))}
        ${button(aulaText('Retake test', 'Refazer o teste'), () => changeAulaStage('test', { fresh: true }))}
        ${passed && next ? button(aulaText('Open next block', 'Abrir próximo bloco'), () => startAula(next), { class: 'primary', key: 'Enter' }) : ''}
      </div>
      ${misses.length ? `<h2>${aulaText('Review missed questions', 'Revisar questões erradas')}</h2>
        <div class="detail-list">${misses.map(question => `<div><strong>${escape(question.q)}</strong>
          <p>${escape(question.options[question.answer])}</p><p class="muted">${richText(question.why, { link3d: false })}</p></div>`).join('')}</div>` : ''}
    </div>`;
  }
  const testing = stage === 'test';
  if (session.finished && !state.feedback) {
    return `<div class="screen aulas-screen" translate="no">${header}<h1>${escape(block.title)}</h1>
      <p>${aulaText('You answered every question correctly without help.', 'Você respondeu a todas as questões corretamente e sem ajuda.')}</p>
      <p>${aulaText('The test records your time, gives one attempt per question and has no hints. Pass with 90%.', 'O teste registra o tempo, dá uma tentativa por questão e não tem dicas. Para passar, obtenha 90%.')}</p>
      <div class="actions">${back}${button(aulaText('Start timed test', 'Começar o teste cronometrado'), () => changeAulaStage('test', { fresh: true }), { class: 'primary', key: 'Enter' })}</div>
    </div>`;
  }
  const feedback = state.feedback;
  const question = feedback?.question || session.current;
  const right = feedback?.correct;
  const name = question.options[question.answer];
  const hint = feedback?.hint ?? session.hintLevel;
  aulaScene(question, block.unit || 'heart', Boolean(feedback));
  function advance() {
    delete state.feedback;
    render({ top: true, activate: true });
  }
  const refNum = ref => {
    const m = String(ref || '').match(/^(R[12]-|[A-Z])(\d+)/);
    return m ? [m[1], Number(m[2])] : null;
  };
  const matchCard = (blk, q) => {
    const qRef = refNum(q.ref);
    if (!qRef || !blk?.cards?.length) return null;
    for (const c of blk.cards) {
      for (const part of String(c.ref || '').split(',')) {
        const bounds = part.trim().split(/[–-]/).map(s => s.trim()).filter(Boolean);
        const start = refNum(bounds[0]);
        if (!start || start[0] !== qRef[0]) continue;
        const end = bounds[1] ? (refNum(bounds[1]) || [start[0], Number(bounds[1])]) : start;
        if (qRef[1] >= start[1] && qRef[1] <= (end?.[1] ?? start[1])) return c;
      }
    }
    return null;
  };
  const eliminated = (() => {
    if (testing || feedback || hint < 1 || hint >= 3 || question.options.length < 4) return new Set();
    const wrongs = question.options.map((_, i) => i).filter(i => i !== question.answer);
    let hash = 0;
    for (const ch of String(question.id)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
    const keepWrong = wrongs[hash % wrongs.length];
    return new Set(wrongs.filter(i => i !== keepWrong));
  })();
  const studyCard = !testing ? matchCard(block, question) : null;
  const studyCardBody = c => `<strong>${escape(c.title)}${c.ref ? ` · Slide ${escape(c.ref)}` : ''}</strong>${cardText(c, { link3d: Boolean(feedback) })}${c.confusion ? `<p class="muted"><strong>${aulaText('Common confusion', 'Confusão comum')}:</strong> ${richText(c.confusion, { link3d: Boolean(feedback) })}</p>` : ''}`;
  const learned = new Set(session.answers.filter(answer => answer.correct && !answer.assisted).map(answer => answer.id)).size;
  const count = testing ? `${session.index + 1}/${session.total}` : aulaText(`${learned}/${session.total} learned`, `${learned}/${session.total} aprendidos`);
  return `<div class="screen aulas-screen prompt" translate="no">${header}
    <p class="aulas-count">${count}${testing ? ' · <time id="aulas-timer"></time>' : ''}</p>
    <h1>${escape(block.title)}</h1>
    <div class="quiz"><p class="question">${escape(question.q)}</p>
      ${hint === 3 && !feedback ? `<form class="aulas-retype">
        <label for="aulas-answer">${aulaText('Retype the answer', 'Digite a resposta novamente')} <strong>${escape(name)}</strong></label>
        <input id="aulas-answer" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" required>
        <button class="button" type="submit">${aulaText('Check answer', 'Conferir resposta')}</button>
        <p id="aulas-retype-feedback" role="status"></p>
      </form>` : `<div class="options">${question.options.map((option, index) => button(
        `<span class="option-letter">${String.fromCharCode(65 + index)}</span>${escape(option)}`, () => answerAula(index), {
          class: `option ${feedback && index === question.answer ? 'option-correct' : feedback && index === feedback.index ? 'option-wrong' : eliminated.has(index) ? 'option-eliminated' : ''}`, disabled: Boolean(feedback) || eliminated.has(index) })).join('')}</div>`}
      ${feedback ? `<div id="aulas-focus-bar" class="aulas-focus-bar" hidden></div><p class="aulas-confusion" role="status"><strong>${right ? aulaText('Correct.', 'Correto.') : aulaText('Review the answer.', 'Revise a resposta.')}</strong>
        ${richText(question.why)} ${!right || hint ? aulaText('You will see this question again.', 'Esta questão vai voltar na fila.') : ''}</p>
        ${!right && studyCard ? `<details class="aulas-study-ref"><summary>${aulaText('Review study card', 'Rever cartão de estudo')}${studyCard.ref ? ` · Slide ${escape(studyCard.ref)}` : ''}</summary>${studyCardBody(studyCard)}</details>` : ''}` : ''}
      ${!feedback && hint === 1 ? `<p class="muted" role="status">${aulaText('Two wrong options eliminated.', 'Duas alternativas incorretas eliminadas.')}</p>` : ''}
      ${!feedback && hint === 2 ? (studyCard
        ? `<div class="aulas-study-ref" role="status">${studyCardBody(studyCard)}</div>`
        : `<p role="status">${aulaText('First letter', 'Primeira letra')}: ${escape(name.match(/\p{L}/u)?.[0] || name[0])}</p>`) : ''}
    </div>
    <div class="actions">${back}
      ${!testing && !feedback && session.answers.length > 0 ? button(aulaText('Restart', 'Recomeçar'), () => changeAulaStage('practice', { fresh: true })) : ''}
      ${!testing && !feedback && hint < 3 ? button([
        aulaText('Eliminate 2 wrong options', 'Eliminar 2 incorretas'),
        studyCard ? aulaText('Show study card', 'Ver cartão de estudo') : aulaText('Show first letter', 'Mostrar primeira letra'),
        aulaText('Show answer to retype', 'Mostrar resposta para redigitar')
      ][hint], () => {
        aulas.useHint(session);
        render();
        ($('aulas-answer') || document.querySelector('.aulas-hint'))?.focus({ preventScroll: true });
      }, { class: 'aulas-hint' }) : ''}
      ${feedback ? button(aulaText('Continue', 'Continuar'), advance, { class: 'primary', key: 'Enter' }) : ''}
    </div></div>`;
}

document.addEventListener('submit', event => {
  if (!event.target.matches('.aulas-retype')) return;
  event.preventDefault();
  const question = activity?.session?.current;
  if (!question) return;
  const input = $('aulas-answer');
  if (fold(input.value.trim()) !== fold(question.options[question.answer])) {
    $('aulas-retype-feedback').textContent = aulaText('Match the answer shown above.', 'Digite a resposta como aparece acima.');
    input.focus();
    return;
  }
  answerAula(question.answer);
});

function renderLevelRow(level, selected) {
  const open = unlocked(level);
  const label = level === selected ? 'selected' : '';
  return `<div class="level-item ${label}">
    <div class="level-heading"><h2>${escape(level.title)}${level.bonus ? ' <span class="bonus-tag">Bonus</span>' : ''}</h2>${starsHTML(level.id)}</div>
    <p>${level.ids.length} structures${!open || passedLevel(level) || savedLevel(level.id).clearedOn ? ' · ' : ''}${!open ? (previousRequired(level) ? `Pass ${escape(previousRequired(level).title)} to ${level.bonus ? 'open this bonus' : 'unlock'}` : level.bonus ? 'Pass the previous level to open the bonus' : 'Pass the previous level to unlock') : passedLevel(level) ? 'Passed' : savedLevel(level.id).clearedOn ? 'Replay the recall rounds to pass' : ''}</p>
    ${open ? `<div class="actions">${button(passedLevel(level) ? 'Name it' : savedLevel(level.id).lesson ? 'Start rounds' : 'Memorize',
      () => openLevel(level), { class: level === selected ? 'primary' : '' })}
      ${savedLevel(level.id).lesson ? button('Memorize again', () => startMemorize(level), { icon: 'rotate-ccw' }) : ''}
      ${button('Learn', () => startLearn(level), { icon: 'book' })}
      ${passedLevel(level) ? modeButtons(level) : ''}</div>` : ''}
  </div>`;
}

function modeButtons(level) {
  return [button('Find it', () => startFind(level)), button('Relations', () => startRelations(level)),
    button('Oral exam', () => startOral(level))].join('');
}

function beginRecall(ids, kind, level, challengeDate) {
  launch('recall', { level, challengeDate, run: new Recall(ids, kind) });
}

function regionRecallIds(region) {
  const owned = IDS.filter(id => ITEMS[id].deck.id === region.id);
  return [...new Set([...region.ids, ...owned])].filter(id => ITEMS[id]);
}

function startFullRecall(region) {
  const ids = region ? regionRecallIds(region) : IDS;
  if (!ids.length) return;
  launch('recall', { recallTitle: region ? `${region.title} · full recall` : 'All structures',
    run: new Recall(ids, 'full') });
}

function startDailyStructure(now = new Date()) {
  beginRecall([matchDaily(now)], 'day', undefined, day(0, now));
}

function displayWpm(run) {
  return run.round === 1 && run.active >= 3000 ? run.wpm : null;
}

// Keep hidden/posterior landmarks in their teaching view. Lateral views
// provide another useful angle for landmarks on the lateral heart/lung borders.
function teachingView(id) { return pack.teachingView?.(id) || 'ant'; }
function memoryView(id) { return pack.memoryView?.(id) || teachingView(id); }

function renderRecall() {
  const { run, level } = activity;
  const { item, round, kind } = run;
  const memory = round === 3;
  const view = memory ? memoryView(item.id) : teachingView(item.id);
  showStructure(item.id, { view, close: true, padding: 1.26, layout: 'recall-layout', controls: true, ...regionScope(level || activity.from) });
  const title = kind === 'full' ? activity.recallTitle : kind === 'level' ? level.title : { daily: 'Daily review', day: 'Structure of the day', weak: 'Drill weakest', mistakes: 'Drill mistakes' }[kind];
  if (!modelLoaded()) {
    const loading = viewerStatus === 'loading' || (viewerStatus === 'ready' && !modelLoaded());
    return `<div class="prompt"><h1>${escape(title)}</h1>
      <p role="status">${loading ? 'Loading the 3D region…' : 'The 3D model is required for recall.'}</p>
      <div class="actions">${loading ? '' : button('Retry 3D model', loadViewer, { class: 'primary' })}
        ${button('Back', () => setPage(page))}</div></div>`;
  }
  const label = kind === 'level' ? `Round ${round} · ${ROUND_NAMES[round - 1]}` : 'From memory';
  const clue = run.hint || round === 2 ? (material.ROUND_CLUES[item.id]) : memory ? "Name the highlighted structure from memory." : round === 1 ? 'Type over the letters, including the spaces.' : 'Name the highlighted structure.';
  const primary = round === 1 ? '' : button('Check answer', checkRecall, { class: 'primary check', icon: 'check' });
  const abbrMarkup = round === 1 && item.tag
    ? `<span class="segment-tag"><span translate="no">${escape(item.tag)}</span> · ${language === 'pt-BR' ? 'código do segmento' : 'segment code'}</span>`
    : round === 1 && item.abbr
      ? `<span class="segment-tag">${language === 'pt-BR' ? 'Sigla clínica' : 'Clinical abbr.'}: <strong translate="no">${escape(item.abbr)}</strong></span>`
      : '';
  return `<div class="recall">
    <div class="recall-top">
      <div><h1>${escape(title)}</h1><span class="eyebrow">${label}</span></div>
      <div class="stats" aria-label="Round statistics"><span id="wpm-stat" hidden><b id="wpm"></b> wpm</span>
        <span><b id="accuracy">${run.accuracy}</b>%</span><span><b id="round-done">${run.results[round].correct.size}</b> / ${run.ids.length} recalled</span><span id="review-count"></span></div>
    </div>
    <p class="view-banner">${escape(views[view])} view</p><div class="answer-area">
      <label for="typer" id="word" class="word" aria-hidden="true"></label>
      <p id="typing-warning" class="typing-warning" role="status" hidden></p>
      ${abbrMarkup}
      ${item.id === 'paredev' ? paredevHintMarkup() : ''}
      <p id="clue" class="subline">${escape(clue)}</p>
      <p id="feedback" class="feedback" role="status"></p>
      <div id="answer-actions" class="actions">
        ${button('Type answer', focusTyper, { class: 'type-button' })}${primary}
        ${round > 1 ? button('Reveal', revealRecall, { icon: 'eye' }) : ''}
        ${kind === 'day' ? button('Get a hint', giveHint, { icon: 'lightbulb' }) : ''}
      </div>
      <div id="continue-actions" class="actions" hidden>${button('Continue', advanceRecall, { class: 'primary', iconEnd: 'arrow-right' })}</div>
    </div></div>`;
}

function focusTyper() { $('typer')?.focus({ preventScroll: true }); }

function onInput(event) {
  if (event.isComposing || activity?.type !== 'recall' || !modelLoaded()) return;
  const input = event.target;
  const { run } = activity;
  const text = input.value.normalize('NFC');
  if (run.round === 1) {
    input.value = '';
    if (text) typeText(text);
    return;
  }
  if (!run.feedback) {
    const typed = text.replace(answerCharacters, '').replace(/ +/g, ' ').trimStart().slice(0, 100);
    if (typed !== run.typed) keySound();
    run.typed = typed;
    drawWord();
  }
  if (input.value !== run.typed) input.value = run.typed;
}

function typeText(text) {
  const { run } = activity;
  if (run.feedback) return;
  let wrong = false;
  for (const char of text) {
    if (!char.replace(answerCharacters, '')) continue;
    wrong = run.type(char, performance.now()) === 'wrong-key' || wrong;
  }
  if (run.round !== 1) $('typer').value = run.typed;
  drawWord(wrong);
  if (wrong) wrongKeySound(); else keySound();
  const warning = $('typing-warning');
  if (warning) {
    warning.textContent = wrong ? 'That key doesn’t match. Type the next letter shown.' : '';
    warning.hidden = !wrong;
  }
  if (wrong) {
    clearTimeout(wrongTimer);
    navigator.vibrate?.(50);
    wrongTimer = setTimeout(() => drawWord(), 240);
  }
  if (run.feedback) showRecallFeedback();
}

function drawWord(wrong = false) {
  if (activity?.type !== 'recall' || !$('word')) return;
  const { run } = activity;
  const { item, round, typed, position, feedback } = run;
  const word = $('word');
  const hint = round === 2 || run.hint;
  const name = item.typing;
  const entered = hint && typed && typed[0].toLowerCase() !== name[0].toLowerCase() ? name[0] + typed : typed;
  const shown = feedback ? name : (round === 1 || hint) ? [...name].map((letter, index) => {
    if (round === 1) return letter;
    if (entered[index]) return letter.toLowerCase() === entered[index].toLowerCase() ? letter : entered[index];
    return letter === ' ' ? ' ' : index === 0 ? letter : '·';
  }).join('') + typed.slice(name.length) : typed;
  const cursor = round === 1 ? position : hint ? Math.max(1, entered.length) : typed.length;
  word.className = `word ${shown.length > 17 ? 'long' : shown.length > 11 ? 'medium' : ''} ${feedback ? feedback.correct ? 'solved' : 'revealed' : ''}`;
  if (wrong && !feedback && !reducedMotion.matches) {
    word.getAnimations().forEach(animation => animation.cancel());
    word.animate([
      { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' },
      { transform: 'translateX(-2px)' }, { transform: 'translateX(0)' },
    ], { duration: 260, easing: 'ease-out' });
  }
  word.innerHTML = [...shown].map((char, index) => {
    const tone = feedback || index < cursor ? 'ink' : round === 1 ? 'ghost' : index === 0 ? 'first' : 'dot';
    return `<span class="${tone} ${!feedback && index === cursor ? 'caret' : ''} ${wrong && index === cursor ? 'wrong' : ''}">${escape(char)}</span>`;
  }).join('') + (!feedback && cursor >= shown.length ? '<span class="caret"></span>' : '');
  $('accuracy').textContent = run.accuracy;
  const wpm = displayWpm(run);
  $('wpm-stat').hidden = wpm === null;
  $('wpm').textContent = wpm;
  $('round-done').textContent = run.results[round].correct.size;
  const checkButton = document.querySelector('.answer-area .check');
  if (checkButton) checkButton.disabled = !run.typed;
  const reviews = run.queue.length - run.ids.length;
  $('review-count').textContent = reviews ? `+${reviews} review${reviews === 1 ? '' : 's'}` : '';
}

function giveHint() {
  const { run } = activity;
  run.hint = true;
  $('clue').textContent = 'Use the first letter and word lengths shown above.';
  drawWord();
  if (!coarsePointer.matches) focusTyper();
}

function checkRecall() {
  const { run } = activity;
  if (run.feedback) {
    if (run.round > 1) advanceRecall();
    return;
  }
  run.submit();
  if (run.feedback) showRecallFeedback();
  else focusTyper();
}

function revealRecall() {
  if (activity.run.feedback) return;
  activity.run.submit(true);
  showRecallFeedback();
}

function contrastBetween(targetId, guessedId) {
  const direct = Object.values(LEVEL_CONTRAST).find(c =>
    (c.a === targetId && c.b === guessedId) || (c.a === guessedId && c.b === targetId));
  if (direct?.text) return direct.text;
  const pairKey = [targetId, guessedId].sort().join('|');
  if (PAIR_CONTRASTS[pairKey]) return PAIR_CONTRASTS[pairKey];
  const target = ITEMS[targetId];
  const guessed = ITEMS[guessedId];
  if (!target || !guessed) return '';
  const cleanCue = id => String(lessonCue(id) || '').replace(/\s+/g, ' ').trim().replace(/\.$/, '');
  const tCue = cleanCue(targetId);
  const gCue = cleanCue(guessedId);
  if (!tCue || !gCue) return '';
  return language === 'pt-BR'
    ? `${target.pt}: ${tCue}. Já ${guessed.pt}: ${gCue}.`
    : `${target.pt}: ${tCue}. By contrast, ${guessed.pt}: ${gCue}.`;
}

function showRecallFeedback() {
  const { run } = activity;
  const { feedback, item, round } = run;
  if (!feedback) return;
  saveAppState();
  clearTimeout(wrongTimer);
  drawWord();
  const line = $('feedback');
  $('answer-actions').hidden = true;
  if (feedback.correct) {
    correctSound();
    line.className = 'feedback good verdict';
    line.innerHTML = `<strong class="verdict-tag">${icon('check', 15)}Correct</strong>${round === 1 ? '' : ` <span>${escape(item.pt)} · ${escape(lessonCue(item.id))}</span>`}`;
    if (round > 1) $('continue-actions').hidden = false;
    if (round === 1) advanceTimer = setTimeout(advanceRecall, 520);
    return;
  }
  line.className = 'feedback bad';
  if (round === 3) $("clue").textContent = "Name the highlighted structure from memory.";
  let contrastHtml = '';
  let hasContrast = false;
  if (feedback.confusion && round >= 2) {
    const guessedId = feedback.confusion.id;
    const targetId = item.id;
    if (model) {
      model = {
        ...model,
        ids: [...new Set([...(model.ids || []), targetId, guessedId])],
        focus: [targetId, guessedId],
        palette: { [targetId]: '#3ddc84', [guessedId]: '#ff5a6a' },
        frameFocus: true,
        preserveCamera: false,
      };
      updateModel();
    }
    const contrastSentence = contrastBetween(targetId, guessedId);
    hasContrast = Boolean(contrastSentence);
    const legendText = language === 'pt-BR'
      ? `<span class="contrast-legend"><span class="contrast-pill good"><i></i>Correta: ${escape(item.pt)}</span><span class="contrast-pill bad"><i></i>Seu palpite: ${escape(feedback.confusion.pt)}</span></span>`
      : `<span class="contrast-legend"><span class="contrast-pill good"><i></i>Correct: ${escape(item.pt)}</span><span class="contrast-pill bad"><i></i>Your guess: ${escape(feedback.confusion.pt)}</span></span>`;
    contrastHtml = `${legendText}${contrastSentence ? `<span class="contrast-delta">${escape(contrastSentence)}</span>` : ''}`;
  }
  const intro = language === 'pt-BR'
    ? feedback.near ? `Quase! O nome é ${item.typing}.`
      : feedback.confusion ? `Você respondeu ${feedback.confusion.pt}. Esta estrutura é ${item.pt}.`
      : feedback.reveal ? `Esta estrutura é ${item.pt}.` : `Você digitou “${feedback.guess}”. Esta estrutura é ${item.pt}.`
    : feedback.near ? `So close. It’s spelled ${item.typing}.`
      : feedback.confusion ? `You named ${feedback.confusion.pt}. This is ${item.pt}.`
      : feedback.reveal ? `This is ${item.pt}.` : `You typed “${feedback.guess}”. This is ${item.pt}.`;
  const clue = hasContrast ? '' : lessonCue(item.id).trimEnd();
  const punctuation = clue && !/[.!?…]$/.test(clue) ? '.' : '';
  const suffix = feedback.requeued ? (language === 'pt-BR' ? ' Ela aparecerá novamente.' : ' It will come up again.') : '';
  line.className = 'feedback bad verdict';
  line.innerHTML = `<strong class="verdict-tag">${icon('x', 15)}${feedback.reveal ? 'Revealed' : 'Not quite'}</strong> <span>${escape(`${intro}${clue ? ` ${clue}${punctuation}` : ''}${suffix}`)}</span>${contrastHtml}`;
  $('continue-actions').hidden = false;
  if (!coarsePointer.matches) focusTyper();
}

function advanceRecall() {
  stopTimers();
  if (activity?.type !== 'recall' || !activity.run.advance()) return;
  const { run, level } = activity;
  const keepKeyboard = document.activeElement === $('typer');
  if (run.id) {
    render();
    if (keepKeyboard) focusTyper();
    return;
  }
  if (run.kind === 'level' && run.round < 3) {
    recordActivity();
    activity.type = 'round';
    render({ top: true, activate: true });
  } else finishRecall(run, level);
}

function renderRoundEnd() {
  const { run, level } = activity;
  const next = run.round + 1;
  return `<div class="screen result">
    <div class="eyebrow">${escape(level.title)}</div>
    <h1>Round ${run.round} complete</h1>
    <p>${run.results[run.round].correct.size} of ${run.ids.length} structures answered.</p>
    <div class="round-banner"><strong>${ROUND_NAMES[next - 1]}</strong><p>${next === 2
      ? 'Use the first letter and the location clue. Check your answer when you’re ready.'
      : 'Recall the name from a close-up, without a clue.'}</p></div>
    <div class="actions">${button(`Start Round ${next}`, () => {
      run.startRound(next);
      activity.type = 'recall';
      render({ top: true });
    }, { class: 'primary', key: 'Enter' })}</div></div>`;
}

function finishRecall(run, level) {
  const last = run.results[3];
  const today = day();
  if (level) {
    const prior = savedLevel(level.id);
    const second = run.results[2];
    const passed = last.correct.size === run.ids.length && second.correct.size === run.ids.length;
    const earned = [true, stars(level.id)[1] || !last.missed.size, stars(level.id)[2]];
    progress.levels[level.id] = { ...prior, clearedOn: prior.clearedOn || today, stars: earned, passed: prior.passed || passed };
    for (const id of run.ids) gradeCard(progress, id, last.missed.has(id) ? 0 : second.missed.has(id) ? 2 : 3);
  } else {
    for (const id of run.ids) gradeCard(progress, id, last.missed.has(id) ? 0 : last.hinted.has(id) ? 2 : 3);
    if (run.kind === 'daily' || run.kind === 'full') recordLaterRecall(progress, last, today);
    if (run.kind === 'day') {
      const date = activity.challengeDate;
      const outcome = last.missed.size ? 'missed' : last.hinted.size ? 'hint' : 'correct';
      const rank = { missed: 0, hint: 1, correct: 2 };
      if (rank[outcome] > (rank[progress.daily[date]] ?? -1)) progress.daily[date] = outcome;
    }
  }
  recordActivity();
  activity.type = 'results';
  render({ top: true, activate: true });
}

function renderRecallResults() {
  const { run, level } = activity;
  const final = run.results[3];
  const second = run.results[2];
  const firstTry = (round, id) => round.correct.has(id) && !round.missed.has(id);
  const clean = run.ids.filter(id => firstTry(final, id)).length;
  const percent = Math.round((clean + (second ? run.ids.filter(id => firstTry(second, id)).length : 0))
    / (run.ids.length * (second ? 2 : 1)) * 100);
  const next = level && LEVELS.slice(LEVELS.indexOf(level) + 1).find(entry => !entry.bonus);
  const wpm = displayWpm(run);
  const nextDue = run.ids.map(id => progress.cards[id]?.due).filter(Boolean).sort()[0];
  const caption = run.kind === 'full' ? activity.recallTitle : level ? level.title : { daily: 'Daily review', day: 'Structure of the day', weak: 'Drill weakest', mistakes: 'Drill mistakes' }[run.kind];
  const title = level ? passedLevel(level) ? 'Level passed' : 'Rounds complete' : 'Recall complete';
  const clinical = level ? run.ids.map(id => CONTENT[id]?.oral?.clinical?.[0]).find(Boolean) : null;
  const mistakes = run.ids.filter(id => Object.values(run.results).some(round => round.missed.has(id) || round.hinted.has(id)));
  const from = level || activity.from;
  const back = from || run.kind === 'full' ? ['Back to map', 'map'] : run.kind === 'weak' ? ['Back to progress', 'progress'] : ['Back to daily', 'daily'];
  return `<div class="screen result">
    <div class="eyebrow">${escape(caption)} · ${day()}</div><h1>${title}</h1>
    ${level && !passedLevel(level) ? '<p>To unlock the next level, recall every structure at least once in both recall rounds.</p>' : ''}
    <div class="metrics"><div><b>${percent}%</b><span>First-try recall</span></div>
      <div><b>${nextDue === day(1) ? 'Tomorrow' : escape(nextDue || '—')}</b><span>Next review</span></div>
      <div><b>${wpm === null ? '' : wpm + ' · '}${run.accuracy}%</b><span>${wpm === null ? 'Accuracy' : 'WPM · accuracy'}</span></div></div>
    ${level ? `<div class="star-breakdown">${['Finish the level', 'Round 3 without mistakes', 'Recall on another day'].map((label, index) =>
      `<span><b class="${stars(level.id)[index] ? 'earned' : ''}">${icon(stars(level.id)[index] ? 'star-filled' : 'star', 15)}</b>${label}</span>`).join('')}</div>` : ''}
    <div class="actions">
      ${next && unlocked(next) ? button(`Next · ${escape(next.title)}`, () => openLevel(next), { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' }) : ''}
      ${level ? button('Play rounds again', () => beginRecall(level.ids, 'level', level), { class: passedLevel(level) ? '' : 'primary', icon: 'rotate-ccw' }) : ''}
      ${level ? button('Learn this level', () => startLearn(level), { icon: 'book' }) : ''}
      ${mistakes.length ? button(`Drill ${mistakes.length} mistake${mistakes.length > 1 ? 's' : ''}`, () =>
        launch('recall', { from, run: new Recall(mistakes, 'mistakes') }), { icon: 'rotate-ccw' }) : ''}
      ${button(back[0], () => setPage(back[1]), { icon: 'arrow-left' })}
    </div>
    ${level && passedLevel(level) ? `<div class="actions">${modeButtons(level)}${level.region === 'valvas' && BLOOD_FLOW.length ? button('Blood pathway', startBloodFlow, { icon: 'route' }) : ''}</div>` : ''}
    <h2>What you recalled</h2>
    <div class="detail-list">${run.ids.map(id => `<div><strong>${escape(ITEMS[id].pt)}</strong>
      <p>${escape(ITEMS[id].dica)}</p><span class="${final.missed.has(id) ? 'bad' : 'good'}">
        ${final.missed.has(id) ? final.correct.has(id) ? 'Recalled on a retry' : 'Needs review'
          : second?.missed.has(id) ? 'Recovered in Round 3' : final.hinted.has(id) ? 'Recalled with a hint' : 'First try'}</span></div>`).join('')}</div>
    ${clinical ? `<div class="round-banner"><strong>Exam angle</strong><p>${escape(clinical)}</p></div>` : ''}
  </div>`;
}

function renderDaily() {
  const due = dueIds();
  const id = matchDaily();
  const daily = progress.daily[day()];
  return `<div class="screen">
    <div class="page-head"><h1>Daily review</h1><p>${due.length ? `${due.length} structure${due.length === 1 ? '' : 's'} due across the curriculum` : 'You’re caught up.'}</p></div>
    <div class="study-row"><div><h2>Warm-up</h2><p>${due.length ? 'Recall due structures from a close-up.' : 'Finish a practice session to add structures to your review schedule.'}</p></div>
      ${due.length ? button('Start warm-up', () => beginRecall(shuffle(due), 'daily'), { class: 'primary' }) : button('Open the map', () => setPage('map'))}</div>
    <div class="study-row"><div><h2>Structure of the day</h2>
      <p>${daily ? escape(ITEMS[id]?.pt) + ' · ' + ({ correct: 'Recalled', hint: 'Recalled with a hint', missed: 'Reviewed' })[daily] : 'One structure to identify from memory. A hint is available.'}</p></div>
      ${id ? button(daily ? 'Try it again' : 'Start daily structure', () => startDailyStructure(), { class: due.length ? '' : 'primary' }) : ''}</div>
    <div class="study-row"><div><h2>Mock oral exam</h2><p>Two structures${THEORY.length ? ' and one theory question' : ''}.</p></div>
      ${button('Mock exam', startMock)}</div>
  </div>`;
}

function startFind(level) {
  launch('find', { level, ids: shuffle(level.ids), index: 0, tries: 0, feedback: '', correct: 0, done: false });
}

function renderFind() {
  const state = activity;
  const { level, ids, index, tries, feedback, done } = state;
  const id = ids[index];
  setModel(level.ids, {
    title: REGION_CONTEXT[level.region] ? regions[level.region]?.title : ITEMS[id].deck.titulo,
    palette: levelPalette(level),
    ...levelContext(level), focus: done ? [id] : [], markerTarget: id,
    view: state.direction || (pack.findViewUsesTeaching ? teachingView(id) : 'ant'),
    controls: true, pick: Boolean(viewer && !done && modelLoaded()),
    preserveCamera: Boolean(tries) && !(done && pack.markerMeta?.[id]),
  });
  const ready = modelLoaded();
  function next() {
    if (index + 1 === ids.length) {
      recordActivity();
      activity = { type: 'complete', title: 'Find it complete', label: level.title, description: `${state.correct} of ${ids.length} structures located.`, level };
    } else {
      Object.assign(state, { index: index + 1, tries: 0, done: false, feedback: '', direction: undefined });
    }
    render({ activate: true });
  }
  return `<div class="prompt"><div class="eyebrow">Find it / ${index + 1} of ${ids.length}</div>
    <h1>${escape(ITEMS[id].pt)}</h1>
    <p>${!viewer ? 'The 3D model is required to locate this structure.' : ready ? 'Select this structure on the model. Drag to rotate.' : 'Loading the 3D region…'}</p>
    ${viewer && !done ? '<p class="support">Use the arrow keys to aim, then select “Pick at crosshair”.</p>' : ''}
    <p class="feedback ${done && state.hit ? 'good' : 'bad'}" role="status">${escape(feedback)}</p>
    <div class="actions">${done ? button(index + 1 === ids.length ? 'See results' : 'Next structure', next, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })
      : viewer && ready ? button('Reveal on model', () => findPick(undefined, true), { icon: 'eye' }) : button('Back to level', () => setPage('map'), { icon: 'arrow-left' })}</div></div>`;
}

function findPick(id, reveal = false) {
  if (!modelLoaded()) return;
  if (activity?.type === 'lesson' && activity.stage === 'find') {
    lessonFindPick(id);
    return;
  }
  const state = activity;
  if (state?.type !== 'find' || state.done) return;
  if (!id && !reveal) {
    $('practice').querySelector('[role="status"]').textContent = 'No structure at that point. Rotate the model and try again.';
    return;
  }
  const target = state.ids[state.index];
  state.tries++;
  state.hit = id === target;
  state.done = state.hit || state.tries >= 2 || reveal;
  if (state.done) {
    if (state.hit) state.correct++;
    gradeCard(progress, target, state.hit ? state.tries === 1 ? 3 : 2 : 0);
    saveProgress(progress);
  }
  state.feedback = state.hit ? `Correct. ${ITEMS[target].dica}` : state.done
    ? `Highlighted: ${ITEMS[target].pt}. ${ITEMS[target].dica}`
    : `You selected ${ITEMS[id]?.pt}. One try left.`;
  render();
  if (state.done) $('practice').querySelector('.primary')?.focus({ preventScroll: true });
}

function startRelations(level) {
  const exam = (LEVEL_CHECK[level.id] || []).filter(question => question.exam && validQuestion(question)).map(question => ({ question: shuffledQuestion(question) }));
  const questions = shuffle([...level.ids.flatMap(id => availableQuestions(id).slice(0, 1).map(question => ({ question, id }))), ...exam]);
  launch('quiz', { level, questions, index: 0, correct: 0, title: 'Relations', label: level.title });
}

const SLIDES_KEY = `slides_stats_${pack.id || 'pack'}`;
function slidesStats() {
  try {
    const value = JSON.parse(localStorage.getItem(SLIDES_KEY) || '{}');
    return value && typeof value === 'object' && !Array.isArray(value) ? value : {};
  } catch { return {}; }
}
function saveSlidesStats(stats) {
  try { localStorage.setItem(SLIDES_KEY, JSON.stringify(stats)); } catch { /* Storage is optional. */ }
}
function slidesMastered(pool = SLIDE_QUESTIONS) {
  const stats = slidesStats();
  return `${pool.filter(entry => stats[entry.id] === 1).length}/${pool.length}`;
}

const territoryQuestions = TERRITORIES.map((question, index) => ({
  ...question, id: `territory:${sourcePack.territories[index].prompt}`, q: question.prompt, highlight: true,
}));
const branchingQuestions = BRANCHES.map((question, index) => ({
  ...question, id: `branch:${sourcePack.branches[index].prompt}`, q: question.prompt, highlight: true,
  scene: BRANCH_GROUPS[question.group],
}));
const bloodFlowDrill = pack.createBloodFlowDrill?.(BLOOD_FLOW, aulaText);
const aulaSequences = pack.createAulaSequences?.(aulaText) || [];
const arteryTree = (pack.arteryTree || []).map(card => ({ ...card, scene: BRANCH_GROUPS[card.group] }));

function startBloodFlow() { startAula(bloodFlowDrill); }

function troubleQuestions() {
  const trouble = aulas.getProgress().trouble;
  const pool = new Map();
  for (const question of [...SLIDE_QUESTIONS, ...territoryQuestions, ...branchingQuestions,
    ...(bloodFlowDrill?.questions || []), ...aulaSequences.flatMap(sequence => sequence.questions || []),
    ...AULAS.flatMap(block => block.questions || [])]) pool.set(String(question.id), question);
  return Object.keys(trouble).map(id => pool.get(id)).filter(Boolean);
}

function troubleBlock() {
  const questions = troubleQuestions();
  if (!questions.length) return null;
  const title = aulaText('Trouble spots', 'Pontos fracos');
  return {
    id: 'drill-trouble', title, unit: 'heart', questions, cards: [{
      id: 'trouble-intro', title, ref: '', focus: [],
      facts: [aulaText(`${questions.length} questions you missed or needed help with, from every lesson and drill.`, `${questions.length} questões que você errou ou em que precisou de ajuda, de todas as aulas e treinos.`),
        aulaText('Each one leaves this list after 2 right answers in a row without help.', 'Cada uma sai desta lista após 2 acertos seguidos sem ajuda.')],
    }],
  };
}

function startTrouble() {
  const block = troubleBlock();
  if (block) startAula(block);
}

const territoryChoices = () => [
  ['all', aulaText('Both directions', 'Os dois sentidos')],
  ['standard', aulaText('Territory to artery', 'Do território à artéria')],
  ['reverse', aulaText('Artery to territory', 'Da artéria ao território')],
];

function territoryBlock(mode) {
  const choice = territoryChoices().find(([id]) => id === mode);
  if (!choice) return null;
  const title = aulaText('Coronary territories', 'Territórios coronários');
  const cards = AULAS.find(block => block.id === 'coronary')?.cards.slice(0, 4) || [];
  return {
    id: `drill-territory-${mode}`, title: `${title} · ${choice[1]}`, unit: 'heart',
    cards, questions: territoryQuestions.filter(question => mode === 'all' || question.mode === mode),
  };
}

function startTerritories() {
  const title = aulaText('Coronary territories', 'Territórios coronários');
  openAulasCatalog(title, [{ entries: territoryChoices().map(([mode, label]) => ({
    label, open: () => startAula(territoryBlock(mode)),
  })) }], 'territories');
}

const branchingChoices = () => [['all', aulaText('Entire tree', 'Árvore completa')],
  ...Object.entries(BRANCH_GROUPS).map(([id, group]) => [id, group.label])];

function branchingBlock(group) {
  const choice = branchingChoices().find(([id]) => id === group);
  if (!choice) return null;
  const title = aulaText('Artery branching', 'Ramificação das artérias');
  return {
    id: `drill-branch-${group}`, title: `${title} · ${choice[1]}`, unit: 'arteries',
    cards: arteryTree.filter(card => group === 'all' || card.group === group),
    questions: branchingQuestions.filter(question => group === 'all' || question.group === group),
  };
}

function startBranching() {
  const title = aulaText('Artery branching', 'Ramificação das artérias');
  openAulasCatalog(title, [{ entries: branchingChoices().map(([group, label]) => ({
    label, open: () => startAula(branchingBlock(group)),
  })) }], 'branching');
}


function startSupply() {
  const title = aulaText('Supply guide', 'Guia de vascularização');
  openAulasCatalog(title, Object.entries(SLIDE_UNITS).map(([unit, info]) => ({
    label: info.label,
    entries: SUPPLY_BLOCKS.filter(block => block.unit === unit).map(block => ({
      label: block.title, open: () => startAula({ ...block, id: `drill-supply-${block.id}` }),
    })),
  })).filter(section => section.entries.length), 'supply');
}

function startSlides() {
  const title = aulaText("Professor's slides", 'Slides do professor');
  openAulasCatalog(title, Object.entries(SLIDE_UNITS).map(([unit, info]) => ({
    label: info.label,
    entries: AULAS.filter(block => (block.unit || 'heart') === unit).map(block => ({
      label: block.title, detail: aulaText(`${slidesMastered(aulaItems(block))} mastered`, `${slidesMastered(aulaItems(block))} dominadas`),
      open: () => startAula({ ...block, id: `drill-slides-${block.id}` }),
    })),
  })), 'slides');
}

function resolveAulaBlock(blockId) {
  if (!blockId) return null;
  const direct = AULAS.find(block => block.id === blockId) || aulaSequences.find(block => block.id === blockId);
  if (direct) return direct;
  if (bloodFlowDrill?.id === blockId) return bloodFlowDrill;
  if (blockId === 'drill-trouble') return troubleBlock();
  if (blockId.startsWith('drill-territory-')) return territoryBlock(blockId.slice('drill-territory-'.length));
  if (blockId.startsWith('drill-branch-')) return branchingBlock(blockId.slice('drill-branch-'.length));
  if (blockId.startsWith('drill-supply-')) {
    const base = AULAS.find(block => block.id === blockId.slice('drill-supply-'.length));
    return base ? { ...base, id: blockId } : null;
  }
  if (blockId.startsWith('drill-slides-')) {
    const base = AULAS.find(block => block.id === blockId.slice('drill-slides-'.length));
    return base ? { ...base, id: blockId } : null;
  }
  return null;
}

function openAulasCatalog(title, sections, catalogKind = null) {
  launch('aulasCatalog', { title, sections, catalogKind });
}

function renderAulasCatalog() {
  const { title, sections } = activity;
  const entriesMarkup = entries => `<ul class="aulas-blocks">${entries.map(entry => `<li>${button(
    `<span>${escape(entry.label)}</span>${entry.detail ? `<small>${escape(entry.detail)}</small>` : ''}`, entry.open,
    { class: 'aulas-block' })}</li>`).join('')}</ul>`;
  return `<div class="screen aulas-screen" translate="no">
    <h1>${escape(title)}</h1>
    <div class="aulas-map">${sections.map(({ label, entries }, i) => label
      ? `<details ${i === 0 ? 'open' : ''}><summary>${escape(label)}</summary>${entriesMarkup(entries)}</details>` : entriesMarkup(entries)).join('')}</div>
    <div class="actions">${button(aulaText('Back to map', 'Voltar ao mapa'), () => setPage('map'), { icon: 'arrow-left' })}</div>
  </div>`;
}

function quizMarkup(question, state) {
  const answered = state.answer !== undefined;
  return `<div class="quiz"><p class="question">${escape(question.q)}</p>
    <div class="options">${question.options.map((option, index) => {
      const tone = answered ? index === question.answer ? 'option-correct' : index === state.answer ? 'option-wrong' : '' : '';
      return button(`<span class="option-letter">${String.fromCharCode(65 + index)}</span>${escape(option)}`, () => {
        state.answer = index;
        render();
        document.querySelector('.prompt .primary')?.focus({ preventScroll: true });
      }, { class: `option ${tone}`, disabled: answered });
    }).join('')}</div>
    ${answered ? `<p class="feedback verdict ${state.answer === question.answer ? 'good' : 'bad'}" role="status">
      <strong class="verdict-tag">${state.answer === question.answer ? `${icon('check', 15)}Correct` : `${icon('x', 15)}Answer: ${escape(question.options[question.answer])}`}</strong> ${escape(question.why)}</p>` : ''}
  </div>`;
}

function renderQuiz() {
  const state = activity;
  const { index, questions, title, label } = state;
  const entry = questions[index];
  function next() {
    const correct = state.answer === entry.question.answer;
    state.correct += Number(correct);
    if (entry.id) {
      gradeCard(progress, entry.id, correct ? 2 : 0);
      saveProgress(progress);
    }
    if (index + 1 === questions.length) {
      recordActivity();
      activity = { type: 'complete', title: `${title} complete`, label,
        description: `${state.correct} of ${questions.length} correct.`, level: state.level, topic: state.topic };
    } else {
      state.index++;
      delete state.answer;
    }
    render({ top: true, activate: true });
  }
  return `<div class="screen prompt"><div class="eyebrow">${escape(label)}</div><h1>${escape(title)}</h1>
    ${entry ? `<p class="eyebrow">Question ${index + 1} of ${questions.length}</p>${quizMarkup(entry.question, state)}`
      : '<p>No questions are available for this topic yet.</p>'}
    <div class="actions">${!entry ? button('Go back', () => state.topic ? openTopic(state.topic) : setPage('map'), { icon: 'arrow-left' })
      : state.answer !== undefined ? button(index + 1 === questions.length ? 'See results' : 'Next question', next, { class: 'primary', key: 'Enter' }) : ''}</div></div>`;
}

const plainText = value => String(value || '').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\s+/g, ' ').trim();

// Subjects without hand-written oral cards still get an Oral exam mode: the
// topographical lesson fields become the model-answer checklist.
function derivedOral(id) {
  if (!pack.deriveOralFromLessons) return {};
  const lesson = LESSONS[id];
  if (!lesson) return {};
  const oral = {};
  if (lesson.lead) oral.definition = [plainText(lesson.lead)];
  if (lesson.where) oral.location = [plainText(lesson.where)];
  if (lesson.relations) oral.relations = [plainText(lesson.relations)];
  if (lesson.function) oral.function = [plainText(lesson.function)];
  if (lesson.origin) oral.origin = [plainText(lesson.origin)];
  if (lesson.insertion) oral.insertion = [plainText(lesson.insertion)];
  if (lesson.nerve) oral.nerve = [plainText(lesson.nerve)];
  return oral;
}

function oralSections(id) {
  const oral = CONTENT[id]?.oral || derivedOral(id);
  return Object.entries(sectionTitles).flatMap(([key, heading]) =>
    Array.isArray(oral?.[key]) && oral[key].length ? [{ key, heading, values: oral[key] }] : []);
}

const oralChecklist = values => `<ul class="oral-checklist">${values.map(value =>
    `<li><label><input type="checkbox"><span>${escape(value)}</span></label></li>`).join('')}</ul>`;

function oralGradeForm(sections, answerMarkup = oralChecklist) {
  return `<form id="oral-grades">${sections.map(section => `<fieldset><legend>${section.heading}</legend>${answerMarkup(section.values)}
        <div class="grades">${[0, 1, 2, 3].map(value => `<label><input type="radio" name="${section.key}" value="${value}" required><span>${value}</span></label>`).join('')}</div>
      </fieldset>`).join('')}</form>`;
}

function startOral(level) {
  launch('oral', { level, ids: level.ids.filter(id => oralSections(id).length), index: 0, revealed: false });
}

function renderOral() {
  const { level, ids, index, revealed } = activity;
  const id = ids[index];
  if (!id) return `<div class="screen prompt"><h1>Oral exam</h1><p>No model answers are available for this level yet.</p>
    <div class="actions">${button('Back to level', () => setPage('map'), { icon: 'arrow-left' })}</div></div>`;
  const card = CONTENT[id] || {};
  const sections = oralSections(id);
  const last = index + 1 === ids.length;
  function saveGrades() {
    const form = $('oral-grades');
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const average = sections.reduce((sum, section) => sum + Number(values.get(section.key)), 0) / sections.length;
    gradeCard(progress, id, Math.round(average));
    saveProgress(progress);
    if (last) {
      recordActivity();
      activity = { type: 'complete', title: 'Oral exam complete', label: level.title,
        description: `Self-grades saved for ${ids.length} structures.`, level };
    } else Object.assign(activity, { index: index + 1, revealed: false });
    render({ top: true, activate: true });
  }
  return `<div class="screen prompt"><div class="eyebrow">Oral exam / ${index + 1} of ${ids.length}</div>
    <h1>${escape(card.prompt || `Describe the ${ITEMS[id].pt.toLowerCase()}.`)}</h1>
    ${revealed ? `<p>Score each section: 0 missed, 1 partial, 2 mostly right, 3 complete.</p>
      ${oralGradeForm(sections)}
      ${card.followups?.length ? `<h2>Examiner follow-ups</h2>${card.followups.map(entry =>
        `<details><summary>${escape(entry.q)}</summary><p>${escape(entry.a)}</p></details>`).join('')}` : ''}
      <div class="actions">${button(last ? 'Save grades and finish' : 'Save grades and continue', saveGrades, { class: 'primary' })}</div>`
      : `<p>Answer aloud, then check your answer section by section.</p>
        <div class="actions">${button('Reveal model answer', () => {
          activity.revealed = true;
          render({ activate: true });
        }, { class: 'primary', key: 'Enter' })}</div>`}
  </div>`;
}

function startMock() {
  // Cardio keeps its original eligible set; a subject without authored cards
  // can still run the mock from its topographical lessons.
  const eligible = IDS.filter(id => CONTENT[id]
    ? Boolean(CONTENT[id].prompt && CONTENT[id].followups?.length)
    : pack.deriveOralFromLessons && oralSections(id).length > 0);
  if (!eligible.length) return;
  const studied = new Set(LEVELS.filter(level => {
    const saved = savedLevel(level.id);
    return saved.lesson || saved.clearedOn || saved.passed;
  }).flatMap(level => level.ids));
  const structures = [];
  for (let index = 0; index < 2; index++) {
    const preferred = eligible.filter(id => studied.has(id) || progress.cards[id]);
    const pool = preferred.length ? preferred : eligible;
    const weighted = pool.flatMap(id => Array(6 - (progress.cards[id]?.box || 0)).fill(id));
    const id = weighted[Math.floor(Math.random() * weighted.length)];
    structures.push(id);
    eligible.splice(eligible.indexOf(id), 1);
  }
  const [theory] = shuffle(THEORY.flatMap(topic => topic.oral || []));
  const questions = structures.map(id => ({
    id,
    prompt: CONTENT[id]?.prompt || `Describe the ${ITEMS[id].pt.toLowerCase()}.`,
    sections: oralSections(id),
    followup: CONTENT[id]?.followups?.length ? shuffle(CONTENT[id].followups)[0] : null,
    grades: [],
  }));
  if (theory) questions.push({ prompt: theory.q, answer: theory.a, grades: [] });
  launch('mock', { questions, index: 0, revealed: false, followup: false, deadline: Date.now() + 180000 });
}

function updateMockTimer() {
  const timer = $('mock-timer');
  if (!timer) return;
  const remaining = activity.deadline - Date.now();
  const overtime = remaining < 0;
  const seconds = overtime ? Math.floor(-remaining / 1000) : Math.ceil(remaining / 1000);
  timer.textContent = `${overtime ? 'Overtime +' : ''}${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
  timer.classList.toggle('overtime', overtime);
}

function renderMock() {
  const state = activity;
  const { questions, index, revealed, followup } = state;
  const question = questions[index];
  const sections = followup && question.followup
    ? [{ key: 'followup', heading: 'Examiner follow-up', values: [question.followup.a] }]
    : question.sections || [{ key: 'theory', heading: 'Theory answer', values: question.answer }];
  function advance() {
    if (!revealed) state.revealed = true;
    else {
      const form = $('oral-grades');
      if (!form.reportValidity()) return;
      const values = new FormData(form);
      question.grades.push(...sections.map(({ key, heading }) => ({ heading, grade: Number(values.get(key)) })));
      state.revealed = false;
      if (question.id && !followup && question.followup) state.followup = true;
      else {
        if (question.id) {
          gradeCard(progress, question.id, Math.round(averageGrade(question.grades.slice(0, -1))));
          saveProgress(progress);
        }
        Object.assign(state, { index: index + 1, followup: false, deadline: Date.now() + 180000 });
        if (state.index === questions.length) {
          const grades = questions.flatMap(entry => entry.grades);
          const pct = averageGrade(grades) / 3;
          const score = Math.min(30, Math.round(pct >= .5 ? 18 + 12 * pct : 36 * pct));
          const lode = grades.every(entry => entry.grade === 3);
          progress.mocks.push({ date: day(), score, lode });
          recordActivity();
          stopTimers();
          activity = { type: 'mockResults', questions, score, lode };
        }
      }
    }
    render({ top: true, activate: true });
  }
  const label = !revealed ? 'Reveal' : question.id && !followup && question.followup ? 'Examiner follow-up'
    : index + 1 === questions.length ? 'See results' : 'Next question';
  return `<div class="screen prompt">
    <div class="mock-header"><div class="eyebrow">Mock exam / ${index + 1} of ${questions.length}${followup ? ' / Follow-up' : ''}</div>
      <span id="mock-timer" class="mock-timer" role="timer"></span></div>
    <h1>${escape(followup ? question.followup.q : question.prompt)}</h1>
    ${revealed ? `<p>Score each section: 0 missed, 1 partial, 2 mostly right, 3 complete.</p>
      ${oralGradeForm(sections, question.id && !followup ? oralChecklist : list)}` : '<p>Answer aloud before revealing the model answer.</p>'}
    <div class="actions">${button(label, advance, { class: 'primary', key: 'Enter' })}</div>
  </div>`;
}

function averageGrade(grades) {
  return grades.reduce((total, entry) => total + entry.grade, 0) / grades.length;
}

function mockScore({ score, lode }) {
  return lode ? '30 e lode' : `${score}/30`;
}

function renderMockResults() {
  const { questions } = activity;
  const sections = questions.flatMap(question => question.grades.map(entry => ({ ...entry, prompt: question.prompt })));
  const weakest = Math.min(...sections.map(entry => entry.grade));
  const drillIds = questions.filter(question => question.id)
    .sort((a, b) => averageGrade(a.grades) - averageGrade(b.grades)).map(question => question.id);
  return `<div class="screen prompt"><div class="eyebrow">Mock exam results</div><h1>${mockScore(activity)}</h1>
    <h2>Question breakdown</h2>
    ${questions.map(question => `<details><summary>${escape(question.prompt)}
      <span class="muted">${averageGrade(question.grades).toFixed(1)}/3</span></summary>
      ${list(question.grades.map(({ heading, grade }) => `${heading} · ${grade}/3`))}</details>`).join('')}
    <div class="theory-section"><h2>Weakest sections</h2>${weakest === 3 ? '<p>Every section earned 3/3.</p>'
      : list(sections.filter(entry => entry.grade === weakest).map(({ prompt, heading, grade }) => `${heading} · ${grade}/3 — ${prompt}`))}</div>
    <div class="actions">${button('Drill these structures', () => beginRecall(drillIds, 'weak'), { class: 'primary' })}
      ${button('Back', () => setPage(page), { icon: 'arrow-left' })}</div>
  </div>`;
}

function renderTheory() {
  return `<div class="screen"><div class="page-head"><h1>Theory cards</h1><p>Review concepts and practise explaining them aloud.</p></div>
    ${THEORY.length ? THEORY.map(topic => {
      const linked = regions[topic.level?.split(':')[1]];
      return `<div class="study-row"><div><h2>${escape(topic.title)}</h2>
        ${linked ? `<p>Pairs with ${escape(linked.title.toLowerCase())}</p>` : ''}</div>
        ${button('Open topic', () => openTopic(topic))}</div>`;
    }).join('') : '<p>Theory cards are unavailable.</p>'}</div>`;
}

function openTopic(topic) { launch('topic', { topic }); }

function renderTopic() {
  const { topic } = activity;
  const questions = (topic.mcq || []).filter(validQuestion).map(question => ({ question }));
  return `<div class="screen prompt"><div class="eyebrow">Theory</div><h1>${escape(topic.title)}</h1>
    ${(topic.sections || []).map(section => `<div class="theory-section"><h2>${escape(section.h)}</h2>${richList(section.bullets || [], { link3d: false })}</div>`).join('')}
    ${topic.oral?.length ? `<h2>Oral questions</h2>${topic.oral.map(entry =>
      `<details><summary>${escape(entry.q)}</summary>${richList(entry.a || [], { link3d: false })}</details>`).join('')}` : ''}
    <div class="actions">${questions.length ? button('Take the quiz', () => launch('quiz', {
      topic, questions, index: 0, correct: 0, title: 'Theory quiz', label: topic.title,
    }), { class: 'primary' }) : ''}${button('Back to theory cards', () => setPage('theory'), { icon: 'arrow-left' })}</div></div>`;
}

function renderComplete() {
  const { title, label, description, level, topic } = activity;
  return `<div class="screen result"><div class="eyebrow">${escape(label)}</div><h1>${escape(title)}</h1>
    <p>${escape(description)}</p><div class="actions">
    ${button(topic ? 'Back to topic' : 'Back to level', () => topic ? openTopic(topic) : setPage('map'), { class: 'primary', key: 'Enter', icon: 'arrow-left' })}
    ${level ? modeButtons(level) : ''}</div></div>`;
}

function weakestIds() {
  // A mastered card is not a weak card.
  return IDS.filter(id => progress.cards[id] && (progress.cards[id].box || 0) < 5).sort((left, right) => {
    const a = progress.cards[left];
    const b = progress.cards[right];
    return (a?.box || 0) - (b?.box || 0) || (b?.lapses || 0) - (a?.lapses || 0)
      || (a?.due || '').localeCompare(b?.due || '');
  }).slice(0, 6);
}

function renderProgress() {
  const today = day();
  const pathLevels = requiredLevels();
  const totalStars = pathLevels.reduce((total, level) => total + stars(level.id).filter(Boolean).length, 0);
  const seconds = Object.values(progress.activity).reduce((sum, duration) => sum + (Number(duration) || 0), 0);
  const weakest = weakestIds();
  return `<div class="screen progress">
    <div class="page-head"><h1>Progress</h1></div>
    <div class="metrics"><div><b>${totalStars}</b><span>of ${pathLevels.length * 3} stars</span></div>
      <div><b>${streak(progress)}</b><span>day streak</span></div><div><b>${seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m`}</b><span>study time</span></div></div>
    <div class="study-row"><div><h2>Weakest structures</h2><p>${weakest.length ? weakest.map(id => escape(ITEMS[id].pt)).join(' · ') : Object.keys(progress.cards).length ? 'Every studied structure is mastered.' : 'Finish a recall round to start tracking.'}</p></div>
      ${weakest.length ? button('Drill weakest', () => beginRecall(weakest, 'weak'), { class: 'primary' }) : ''}</div>
    <div class="study-row">
      ${progress.mocks.length ? `<div><h2 translate="no">${aulaText('Recent mock exams', 'Simulados recentes')}</h2>
        ${list(progress.mocks.slice(-5).reverse().map(entry => `${entry.date} · ${mockScore(entry)}`))}</div>` : ''}
      ${button(`<span translate="no">${aulaText('Start mock oral exam', 'Começar simulado oral')}</span>`, startMock)}</div>
    <h2>Mastery by region</h2>
    ${REGIONS.map(region => `<details><summary>${escape(region.title)} <span class="muted">${region.ids.filter(id => progress.cards[id]?.box === 5).length}/${region.ids.length} mastered</span></summary>
      <div class="progress-levels">${region.levels.map(level => `<div><span>${escape(level.title)}${level.bonus ? ' <span class="bonus-tag">Bonus</span>' : ''}</span>${starsHTML(level.id)}</div>`).join('')}</div>
      <div class="mastery">${region.ids.map(id => {
        const card = progress.cards[id];
        const value = (card?.box || 0) * 20;
        return `<div><span>${escape(ITEMS[id].pt)}</span><meter max="100" value="${value}" aria-label="${escape(ITEMS[id].pt)} mastery"></meter>
          <span>${value}%</span><span class="muted">${card ? card.due <= today ? 'Due' : shortDate(card.due) : 'Unstudied'}</span></div>`;
      }).join('')}</div></details>`).join('')}
  </div>`;
}

function atlasSearchText(id) {
  return ATLAS_SEARCH_TEXT.get(id) || '';
}

function atlasActiveId() {
  return atlas.focus.includes(atlas.active) ? atlas.active : atlas.focus[atlas.focus.length - 1] || null;
}

function atlasDetailBody() {
  const total = ATLAS_IDS.length;
  const shown = total - atlas.hidden.size;
  const focus = atlas.focus.filter(id => ITEMS[id]);
  const active = atlasActiveId();
  if (!shown) {
    return `<p class="eyebrow">Atlas</p><h2>Nothing shown</h2>
      <p>All structures are hidden. Use Show all, or tick a single structure in the list.</p>`;
  }
  if (!focus.length) {
    return `<p class="eyebrow">Atlas · ${shown} of ${total} shown</p><h2>Explore the whole model</h2>
      <p>Click a structure in the list or on the model to focus it. ⌘/Ctrl-click or Shift-click adds another structure to the selection.</p>`;
  }
  const item = ITEMS[active] || ITEMS[focus[0]];
  const cue = material.LESSON_CUES?.[item.id] || item.dica || '';
  const others = focus.filter(id => id !== item.id).map(id => ITEMS[id]?.pt).filter(Boolean);
  return `<p class="eyebrow">${focus.length > 1 ? `${focus.length} structures selected` : 'Selected structure'}</p>
    <h2>${escape(item.pt)}</h2>
    <p class="atlas-where">${escape(ATLAS_REGION[item.id] || item.deck.titulo)}</p>
    ${meaningMarkup(item.id, true)}
    <p>${escape(cue)}</p>
    ${slotsMarkup(item.id)}
    ${others.length ? `<p class="atlas-also">Also selected: ${others.map(escape).join(' · ')}</p>` : ''}
    <div class="actions"><button type="button" class="button" data-atlas-action="clear">${icon('x', 16)}Clear selection</button></div>`;
}

function atlasDetailMarkup() {
  return `<div class="atlas-detail" id="atlas-detail" role="status" aria-live="polite">${atlasDetailBody()}</div>`;
}

function atlasRenderDetail() {
  const host = $('atlas-detail');
  if (host) host.innerHTML = atlasDetailBody();
  const clear = $('atlas-clear');
  if (clear) clear.hidden = !atlas.focus.length;
}

function atlasRows(query) {
  const focusSet = new Set(atlas.focus);
  return ATLAS_GROUPS.map(group => {
    let shown = 0;
    let matched = 0;
    const rows = group.ids.map(id => {
      const item = ITEMS[id];
      if (!item) return '';
      const hidden = atlas.hidden.has(id);
      if (!hidden) shown++;
      const filtered = query ? !atlasSearchText(id).includes(query) : false;
      if (!filtered) matched++;
      const selected = focusSet.has(id);
      return `<div class="atlas-item" data-atlas-item ${filtered ? 'hidden' : ''}>
        <label class="atlas-visibility"><input type="checkbox" data-atlas-toggle="${id}" ${hidden ? '' : 'checked'} aria-label="Show ${escape(item.pt)}"></label>
        <button type="button" class="atlas-name${selected ? ' chosen' : ''}" data-atlas-id="${id}" aria-pressed="${selected}">${escape(item.pt)}</button>
      </div>`;
    }).join('');
    return `<section class="atlas-group" ${query && !matched ? 'hidden' : ''}>
      <label class="atlas-group-head">
        <input type="checkbox" data-atlas-region="${group.id}" ${shown === group.ids.length ? 'checked' : ''} aria-label="Show all structures in ${escape(group.title)}">
        <span>${escape(group.title)}</span><small>${shown}/${group.ids.length}</small>
      </label>
      <div class="atlas-items">${rows}</div>
    </section>`;
  }).join('');
}

function renderAtlas() {
  atlas.focus = atlas.focus.filter(id => ITEMS[id] && !atlas.hidden.has(id));
  if (atlas.active && !atlas.focus.includes(atlas.active)) atlas.active = atlas.focus[atlas.focus.length - 1] || null;
  const query = fold(atlas.query.trim());
  const visible = ATLAS_IDS.filter(id => !atlas.hidden.has(id));
  const focus = atlas.focus;
  const active = atlasActiveId();
  const title = active
    ? focus.length > 1 ? `${focus.length} structures selected` : ITEMS[active].pt
    : `Atlas · ${visible.length} structures`;
  setModel(visible, {
    title, controls: true, explore: true, atlas: true, layout: 'atlas-layout', view: atlas.view,
    focus, frameFocus: focus.length > 0, preserveCamera: focus.length > 0, markerLabels: true,
  });
  const anyMatch = ATLAS_GROUPS.some(group => group.ids.some(id => !query || atlasSearchText(id).includes(query)));
  queueMicrotask(syncAtlasGroups);
  return `<div class="atlas-content">
    <div class="page-head"><h1>Atlas</h1><p>Show or hide parts, then click a name or the model to focus it. ${escape(pack.atlasNote || '')}</p></div>
    ${pack.id === 'cardio' ? lobeLegendMarkup() : ''}
    <button type="button" class="button atlas-drawer-toggle" id="atlas-drawer-toggle" data-atlas-drawer="open" aria-controls="atlas-panel" aria-expanded="false">${icon('layers', 16)}Structures <b id="atlas-drawer-count">${visible.length}</b></button>
    ${atlasDetailMarkup()}
    <aside class="atlas-panel" id="atlas-panel" aria-labelledby="atlas-panel-title"${atlasNarrow.matches ? ' inert' : ''}>
      <div class="atlas-panel-head"><h2 id="atlas-panel-title">Structures</h2><span id="atlas-visible-count">${visible.length} of ${ATLAS_IDS.length} shown</span>
        <button type="button" class="atlas-close" data-atlas-drawer="close" aria-label="Close structure list" title="Close structure list">${icon('x', 20)}</button></div>
      <div class="atlas-search-field"><input id="atlas-search" type="search" value="${escape(atlas.query)}" placeholder="Search by name or region" aria-label="Search structures" autocomplete="off">
        <button type="button" class="atlas-search-clear" id="atlas-search-clear" data-atlas-search-clear aria-label="Clear search" title="Clear search"${atlas.query ? '' : ' hidden'}>${icon('x', 16)}</button></div>
      <div class="atlas-tools">
        <button type="button" class="button" data-atlas-action="show">${icon('eye', 16)}Show all</button>
        <button type="button" class="button" data-atlas-action="hide">${icon('eye-off', 16)}Hide all</button>
        <button type="button" class="button" id="atlas-clear" data-atlas-action="clear" ${focus.length ? '' : 'hidden'}>${icon('x', 16)}Clear selection</button>
      </div>
      <div class="atlas-list" id="atlas-list">${atlasRows(query)}</div>
      <p class="atlas-empty" id="atlas-empty" ${anyMatch ? 'hidden' : ''}>No structures match “${escape(atlas.query)}”.</p>
    </aside>
    <div class="atlas-backdrop" id="atlas-backdrop" data-atlas-drawer="close" hidden></div>
  </div>`;
}

let atlasDom = null;
function getAtlasDom() {
  const listEl = $('atlas-list');
  if (!listEl) { atlasDom = null; return null; }
  if (atlasDom && atlasDom.list === listEl) return atlasDom;
  const groups = [];
  const rows = [];
  const groupById = new Map(ATLAS_GROUPS.map(g => [g.id, g]));
  for (const section of listEl.querySelectorAll('.atlas-group')) {
    const checkbox = section.querySelector('[data-atlas-region]');
    const label = section.querySelector('.atlas-group-head small');
    const groupData = groupById.get(checkbox?.dataset.atlasRegion);
    const groupIndex = groups.length;
    groups.push({ el: section, checkbox, label, ids: groupData?.ids || [] });
    for (const row of section.querySelectorAll('[data-atlas-item]')) {
      const box = row.querySelector('[data-atlas-toggle]');
      const button = row.querySelector('.atlas-name[data-atlas-id]');
      const id = box?.dataset.atlasToggle;
      if (id) rows.push({ row, box, button, id, search: atlasSearchText(id), groupIndex });
    }
  }
  atlasDom = { list: listEl, groups, rows, groupMatches: new Int32Array(groups.length) };
  return atlasDom;
}

function syncAtlasChecks() {
  const dom = getAtlasDom();
  if (!dom) return;
  for (let i = 0; i < dom.rows.length; i++) {
    const entry = dom.rows[i];
    entry.box.checked = !atlas.hidden.has(entry.id);
  }
}

function syncAtlasSelection() {
  const dom = getAtlasDom();
  if (!dom) return;
  const focusSet = new Set(atlas.focus);
  for (let i = 0; i < dom.rows.length; i++) {
    const entry = dom.rows[i];
    const on = focusSet.has(entry.id);
    entry.button.classList.toggle('chosen', on);
    entry.button.setAttribute('aria-pressed', String(on));
  }
}

function syncAtlasGroups() {
  syncAtlasChecks();
  syncAtlasSelection();
  const total = ATLAS_IDS.length;
  const shown = total - atlas.hidden.size;
  const showAll = document.querySelector('[data-atlas-action="show"]');
  const hideAll = document.querySelector('[data-atlas-action="hide"]');
  if (showAll) showAll.disabled = shown === total;
  if (hideAll) hideAll.disabled = shown === 0;
  const count = $('atlas-visible-count');
  if (count) count.textContent = `${shown} of ${total} shown`;
  const drawer = $('atlas-drawer-count');
  if (drawer) drawer.textContent = shown;
  const dom = getAtlasDom();
  if (!dom) return;
  for (let i = 0; i < dom.groups.length; i++) {
    const group = dom.groups[i];
    if (!group.checkbox) continue;
    let visible = 0;
    for (let j = 0; j < group.ids.length; j++) {
      if (!atlas.hidden.has(group.ids[j])) visible++;
    }
    group.checkbox.checked = visible === group.ids.length;
    group.checkbox.indeterminate = visible > 0 && visible < group.ids.length;
    if (group.label) group.label.textContent = `${visible}/${group.ids.length}`;
  }
}

function atlasApply({ preserve = true, frame = false } = {}) {
  atlas.focus = atlas.focus.filter(id => ITEMS[id] && !atlas.hidden.has(id));
  if (atlas.active && !atlas.focus.includes(atlas.active)) atlas.active = atlas.focus[atlas.focus.length - 1] || null;
  const visible = ATLAS_IDS.filter(id => !atlas.hidden.has(id));
  const active = atlasActiveId();
  const title = active
    ? atlas.focus.length > 1 ? `${atlas.focus.length} structures selected` : ITEMS[active].pt
    : `Atlas · ${visible.length} structures`;
  setModel(visible, {
    title, controls: true, explore: true, atlas: true, layout: 'atlas-layout', view: atlas.view,
    focus: atlas.focus, frameFocus: frame && atlas.focus.length > 0, preserveCamera: preserve, markerLabels: true,
  });
  updateModel();
  atlasRenderDetail();
  syncAtlasGroups();
}

function atlasFocus(id, additive = false) {
  if (!ATLAS_SET.has(id)) return;
  const fromDrawer = atlas.open;
  if (fromDrawer) setAtlasDrawer(false, { restoreFocus: false });
  atlas.hidden.delete(id);
  let focus = atlas.focus.filter(entry => ITEMS[entry] && !atlas.hidden.has(entry));
  if (additive) focus = focus.includes(id) ? focus.filter(entry => entry !== id) : [...focus, id];
  else if (focus.length === 1 && focus[0] === id) focus = [];
  else focus = [id];
  atlas.focus = focus;
  atlas.active = focus.includes(id) ? id : focus[focus.length - 1] || null;
  // Focus sets the preferred direction once; later visibility toggles keep it.
  if (focus.length === 1) atlas.view = focusedStructureView(focus, atlas.view);
  atlasApply({ preserve: focus.length > 0, frame: focus.length > 0 });
  if (fromDrawer) {
    const shell = document.querySelector('.model-shell');
    shell.focus({ preventScroll: true });
    scrollBelowHeader(shell);
  }
}

function atlasClearFocus() {
  atlas.focus = [];
  atlas.active = null;
  atlasApply({ preserve: false, frame: false });
}

function atlasSetVisible(ids, show) {
  for (const id of ids) {
    if (!ATLAS_SET.has(id)) continue;
    if (show) atlas.hidden.delete(id);
    else atlas.hidden.add(id);
  }
  if (!show) atlas.focus = atlas.focus.filter(id => !ids.includes(id));
  if (atlas.active && !atlas.focus.includes(atlas.active)) atlas.active = atlas.focus[atlas.focus.length - 1] || null;
  atlasApply({ preserve: true, frame: false });
}

function atlasSetAll(show) {
  atlas.hidden = show ? new Set() : new Set(ATLAS_IDS);
  if (!show) {
    atlas.focus = [];
    atlas.active = null;
  }
  atlasApply({ preserve: true, frame: false });
}

function filterAtlas(value) {
  atlas.query = value;
  const query = fold(value.trim());
  const dom = getAtlasDom();
  let matches = 0;
  if (dom) {
    const { rows, groups, groupMatches } = dom;
    groupMatches.fill(0);
    for (let i = 0; i < rows.length; i++) {
      const entry = rows[i];
      const show = !query || entry.search.includes(query);
      if (entry.row.hidden !== !show) entry.row.hidden = !show;
      if (show) {
        matches++;
        groupMatches[entry.groupIndex]++;
      }
    }
    for (let i = 0; i < groups.length; i++) {
      const hideGroup = groupMatches[i] === 0;
      if (groups[i].el.hidden !== hideGroup) groups[i].el.hidden = hideGroup;
    }
  }
  const empty = $('atlas-empty');
  if (empty) {
    empty.hidden = matches > 0;
    empty.textContent = `No structures match “${value.trim()}”.`;
  }
  const clear = $('atlas-search-clear');
  if (clear) clear.hidden = !value.trim();
}

const atlasNarrow = matchMedia('(max-width: 900px)');

function setAtlasDrawer(open, { restoreFocus = true } = {}) {
  if (open && !atlasNarrow.matches) return;
  atlas.open = open;
  const panel = $('atlas-panel');
  panel.classList.toggle('open', open);
  panel.inert = !open && atlasNarrow.matches;
  if (open) {
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
  } else {
    panel.removeAttribute('role');
    panel.removeAttribute('aria-modal');
  }
  for (const element of document.querySelectorAll('.skip, .app-header, .model-shell, .atlas-content > .page-head, .atlas-detail, .atlas-drawer-toggle, .credits')) {
    element.inert = open;
  }
  const backdrop = $('atlas-backdrop');
  if (backdrop) backdrop.hidden = !open;
  document.body.classList.toggle('atlas-drawer-open', open);
  $('atlas-drawer-toggle')?.setAttribute('aria-expanded', String(open));
  if (open) $('atlas-search')?.focus({ preventScroll: true });
  else if (restoreFocus) $('atlas-drawer-toggle')?.focus({ preventScroll: true });
}

atlasNarrow.addEventListener('change', () => {
  if (page === 'atlas') setAtlasDrawer(false, { restoreFocus: atlasNarrow.matches && $('atlas-panel').contains(document.activeElement) });
});

function handleExplore(id, event) {
  if (page === 'atlas') atlasFocus(id, Boolean(event?.metaKey || event?.ctrlKey || event?.shiftKey));
  else focusStructure(id);
}

document.addEventListener('click', event => {
  if (page !== 'atlas') return;
  const drawer = event.target.closest('[data-atlas-drawer]');
  if (drawer) {
    event.preventDefault();
    setAtlasDrawer(drawer.dataset.atlasDrawer === 'open');
    return;
  }
  if (event.target.closest('[data-atlas-search-clear]')) {
    event.preventDefault();
    const search = $('atlas-search');
    if (search) { search.value = ''; search.focus({ preventScroll: true }); }
    filterAtlas('');
    return;
  }
  const action = event.target.closest('[data-atlas-action]');
  if (action) {
    event.preventDefault();
    if (action.dataset.atlasAction === 'show') atlasSetAll(true);
    else if (action.dataset.atlasAction === 'hide') atlasSetAll(false);
    else if (action.dataset.atlasAction === 'clear') atlasClearFocus();
    else if (action.dataset.atlasAction === 'meaning') {
      meaningHints = !meaningHints;
      try { localStorage.setItem('meaning_hints', meaningHints ? '1' : '0'); } catch (_) { /* session only */ }
      atlasRenderDetail();
    }
    return;
  }
  const name = event.target.closest('[data-atlas-id]');
  if (name) {
    event.preventDefault();
    atlasFocus(name.dataset.atlasId, event.metaKey || event.ctrlKey || event.shiftKey);
  }
});

document.addEventListener('change', event => {
  if (page !== 'atlas') return;
  const toggle = event.target.closest('[data-atlas-toggle]');
  if (toggle) {
    atlasSetVisible([toggle.dataset.atlasToggle], toggle.checked);
    return;
  }
  const group = event.target.closest('[data-atlas-region]');
  if (group) {
    const entry = ATLAS_GROUPS.find(item => item.id === group.dataset.atlasRegion);
    if (entry) atlasSetVisible(entry.ids, group.checked);
  }
});

document.addEventListener('input', event => {
  if (page === 'atlas' && event.target.id === 'atlas-search') filterAtlas(event.target.value);
});

document.addEventListener('click', event => {
  const nav = event.target.closest('[data-nav]');
  if (nav) return leaveGuard() && setPage(nav.dataset.nav);
  const control = event.target.closest('[data-action]');
  if (control && !control.disabled) actions[Number(control.dataset.action)]?.();
});

document.addEventListener('keydown', event => {
  if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
  const { key, target } = event;
  if (target.closest?.('.app-header, .skip, .credits')) return;
  if (atlas.open && key === 'Tab') {
    const controls = [...$('atlas-panel').querySelectorAll('button, input')].filter(el => !el.disabled && el.getClientRects().length);
    if (target === controls[event.shiftKey ? 0 : controls.length - 1]) {
      event.preventDefault();
      controls[event.shiftKey ? controls.length - 1 : 0]?.focus();
    }
    return;
  }
  const input = $('typer');
  const control = target.closest?.('button, summary, select, a, textarea, input');
  if (key === 'Escape' && page === 'atlas') {
    if (atlas.open) {
      event.preventDefault();
      setAtlasDrawer(false);
      return;
    }
    if (atlas.query) {
      event.preventDefault();
      atlas.query = '';
      const search = $('atlas-search');
      if (search) search.value = '';
      filterAtlas('');
      return;
    }
    if (atlas.focus.length) {
      event.preventDefault();
      atlasClearFocus();
      return;
    }
  }
  if (key === 'Escape' && model?.clickedFocus) {
    event.preventDefault();
    if (!event.repeat) restoreStepView();
    return;
  }
  if (activity?.type === 'mock') {
    const form = $('oral-grades');
    if (key === 'Enter' && shortcuts.has(key) && !target.closest?.('[data-nav]')) {
      event.preventDefault();
      if (!event.repeat) shortcuts.get(key)();
      return;
    }
    if (form && /^[0-3]$/.test(key)) {
      const fieldsets = [...form.querySelectorAll('fieldset')];
      const fieldset = fieldsets.find(section => section.contains(target))
        || fieldsets.find(section => !section.querySelector('input[type="radio"]:checked'));
      const grade = fieldset?.querySelector(`input[type="radio"][value="${key}"]`);
      if (grade) {
        event.preventDefault();
        if (!event.repeat) grade.checked = true;
      }
      return;
    }
  }
  const quiz = ['lesson', 'quiz', 'aulas'].includes(activity?.type) && document.querySelector('.quiz');
  if (quiz && !target.closest?.('input, textarea, select, [contenteditable]')) {
    const letter = key.toLowerCase();
    const choices = 'abcd';
    const numbers = '1234';
    const index = key.length === 1 ? Math.max(choices.indexOf(letter), numbers.indexOf(key)) : -1;
    const option = quiz.querySelectorAll('.option')[index];
    const action = key === 'Enter' && (activity.answer !== undefined || activity.feedback) && (!control || control.matches('.prompt .primary'))
      ? shortcuts.get('Enter') : null;
    if ((option && !option.disabled) || action) {
      event.preventDefault();
      if (!event.repeat) {
        if (action) action();
        else option.click();
      }
      return;
    }
  }
  if ((activity?.type === 'find' || (activity?.type === 'lesson' && activity.stage === 'find'))
    && viewer && model?.pick && (!control || target === $('pick-center')) && key.startsWith('Arrow')) {
    const yaw = key === 'ArrowLeft' ? .15 : key === 'ArrowRight' ? -.15 : 0;
    const pitch = key === 'ArrowUp' ? .12 : key === 'ArrowDown' ? -.12 : 0;
    event.preventDefault();
    viewer.aim(yaw, pitch);
    return;
  }
  if (activity?.type === 'recall' && viewerStatus === 'ready' && (!control || target === input)) {
    if (key === 'Enter') {
      event.preventDefault();
      if (!event.repeat) checkRecall();
    } else if (key.length === 1 && target !== input) {
      event.preventDefault();
      focusTyper();
      typeText(key);
    }
  } else if (!control && shortcuts.has(key) && !event.repeat) {
    event.preventDefault();
    shortcuts.get(key)();
  }
});

$('typer').addEventListener('input', onInput);
$('typer').addEventListener('compositionend', onInput);
$('view-direction').addEventListener('change', event => {
  const direction = event.target.value;
  $('model-angle').textContent = views[direction];
  if (model) model.view = direction;
  const orientHint = $('model-orient-hint');
  if (orientHint && model) {
    const showHint = Boolean(model.orientHint) && (!model.orientHintForView || direction === model.orientHintForView);
    orientHint.hidden = !showHint;
    orientHint.textContent = showHint ? model.orientHint : '';
  }
  const banner = document.querySelector('.view-banner');
  if (banner) banner.textContent = `${views[direction]} view`;
  if (activity?.type === 'find') activity.direction = direction;
  if (activity?.type === 'lesson' && activity.stage === 'find') activity.findView = direction;
  if (page === 'atlas') atlas.view = direction;
  viewer?.view(direction);
});
const THEMES = new Set(['light', 'dark', 'system']);
const ACCENTS = new Set(['violet', 'blue', 'teal', 'amber', 'rose', 'slate']);
const THEME_LABELS = { light: 'Light', dark: 'Dark', system: 'System' };
const themeQuery = matchMedia('(prefers-color-scheme: light)');

function resolvedMode() {
  const setting = document.documentElement.dataset.theme;
  if (setting === 'light' || setting === 'dark') return setting;
  return themeQuery.matches ? 'light' : 'dark';
}

function syncThemeChrome() {
  const root = document.documentElement;
  const setting = THEMES.has(root.dataset.theme) ? root.dataset.theme : 'dark';
  const accent = ACCENTS.has(root.dataset.accent) ? root.dataset.accent : 'violet';
  root.dataset.theme = setting;
  root.dataset.accent = accent;
  const toggle = $('theme-toggle');
  const label = language === 'pt-BR' ? { light: 'Claro', dark: 'Escuro', system: 'Sistema' }[setting] : THEME_LABELS[setting];
  toggle.setAttribute('aria-label', `Theme settings (${label})`);
  toggle.title = `Theme: ${label}`;
  for (const input of document.querySelectorAll('input[name="theme-choice"]')) {
    input.checked = input.value === setting;
  }
  for (const swatch of document.querySelectorAll('[data-accent-choice]')) {
    swatch.setAttribute('aria-pressed', String(swatch.dataset.accentChoice === accent));
  }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    const computed = getComputedStyle(root).getPropertyValue('--bg').trim();
    meta.setAttribute('content', computed || (resolvedMode() === 'light' ? '#f6f7fb' : '#08090b'));
  }
}

function setTheme(value) {
  if (!THEMES.has(value)) return;
  document.documentElement.dataset.theme = value;
  try { localStorage.setItem('sc2_theme', value); } catch { /* storage unavailable */ }
  syncThemeChrome();
  viewer?.refreshTheme?.();
}

function setAccent(value) {
  if (!ACCENTS.has(value)) return;
  document.documentElement.dataset.accent = value;
  try { localStorage.setItem('sc2_accent', value); } catch { /* storage unavailable */ }
  syncThemeChrome();
  viewer?.refreshTheme?.();
}

const themeToggle = $('theme-toggle');
const themePopover = $('theme-popover');

function openThemePopover() {
  themePopover.hidden = false;
  themeToggle.setAttribute('aria-expanded', 'true');
  const checked = themePopover.querySelector('input[name="theme-choice"]:checked')
    || themePopover.querySelector('input[name="theme-choice"]');
  checked?.focus();
}

function closeThemePopover(returnFocus = true) {
  if (themePopover.hidden) return;
  themePopover.hidden = true;
  themeToggle.setAttribute('aria-expanded', 'false');
  if (returnFocus) themeToggle.focus();
}

themeToggle.addEventListener('click', () => {
  if (themePopover.hidden) {
    closeSubjectMenu(false);
    openThemePopover();
  } else closeThemePopover();
});
themePopover.addEventListener('change', event => {
  const input = event.target.closest?.('input[name="theme-choice"]');
  if (input) setTheme(input.value);
});
themePopover.addEventListener('click', event => {
  const swatch = event.target.closest?.('[data-accent-choice]');
  if (swatch) setAccent(swatch.dataset.accentChoice);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !themePopover.hidden) {
    event.preventDefault();
    event.stopPropagation();
    closeThemePopover();
  }
}, true);
document.addEventListener('pointerdown', event => {
  if (themePopover.hidden) return;
  if (themePopover.contains(event.target) || themeToggle.contains(event.target)) return;
  closeThemePopover(false);
});
themeQuery.addEventListener('change', () => {
  if ((document.documentElement.dataset.theme || 'dark') !== 'system') return;
  syncThemeChrome();
  viewer?.refreshTheme?.();
});
syncThemeChrome();

// Subject switcher: populated from the registry so a new subject is one entry.
const brandMenu = $('brand-menu');
const subjectMenu = $('subject-menu');
function syncSubjectChrome() {
  if (new URL(location.href).searchParams.get('s') !== pack.id) {
    history.replaceState(null, '', subjectUrl(pack.id));
  }
  document.title = `${pack.name} · ${pack.tagline}`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', pack.description || `${pack.tagline} with 3D anatomy and recall drills.`);
  document.querySelector('.brand-name')?.replaceChildren(document.createTextNode(pack.name));
  brandMenu?.setAttribute('aria-label', `${pack.name} subject menu`);
  if (!THEORY.length) document.querySelector('nav [data-nav="theory"]')?.setAttribute('hidden', '');
}
function renderSubjectMenu() {
  if (!subjectMenu) return;
  subjectMenu.innerHTML = SUBJECTS.map(entry => `<button type="button" class="subject-item" role="menuitem"
    data-subject-id="${escape(entry.id)}" aria-current="${entry.id === pack.id}">
    <span class="subject-name">${escape(entry.name)}</span>
    <span class="subject-tagline">${escape(entry.tagline)}</span></button>`).join('');
}
function subjectItems() { return [...(subjectMenu?.querySelectorAll('[data-subject-id]') || [])]; }
function openSubjectMenu(focus = 'current') {
  if (!brandMenu || !subjectMenu) return;
  subjectMenu.hidden = false;
  brandMenu.setAttribute('aria-expanded', 'true');
  if (focus) {
    const items = subjectItems();
    const current = items.find(item => item.dataset.subjectId === pack.id);
    (focus === 'last' ? items.at(-1) : focus === 'first' ? items[0] : current || items[0])?.focus();
  }
}
function closeSubjectMenu(returnFocus = true) {
  if (!brandMenu || !subjectMenu || subjectMenu.hidden) return;
  subjectMenu.hidden = true;
  brandMenu.setAttribute('aria-expanded', 'false');
  if (returnFocus) brandMenu.focus();
}
syncSubjectChrome();
renderSubjectMenu();
brandMenu?.addEventListener('click', () => {
  if (subjectMenu.hidden) {
    closeThemePopover(false);
    openSubjectMenu();
  } else closeSubjectMenu();
});
brandMenu?.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    closeThemePopover(false);
    openSubjectMenu(event.key === 'ArrowDown' ? 'first' : 'last');
  }
});
subjectMenu?.addEventListener('click', event => {
  const item = event.target.closest?.('[data-subject-id]');
  if (!item) return;
  if (item.dataset.subjectId === pack.id) return closeSubjectMenu(true);
  if (leaveGuard()) location.assign(subjectUrl(item.dataset.subjectId));
});
subjectMenu?.addEventListener('keydown', event => {
  const items = subjectItems();
  const index = items.indexOf(document.activeElement);
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const step = event.key === 'ArrowDown' ? 1 : -1;
    items[(index + step + items.length) % items.length]?.focus();
  } else if (event.key === 'Home' || event.key === 'End') {
    event.preventDefault();
    (event.key === 'Home' ? items[0] : items[items.length - 1])?.focus();
  } else if (event.key === 'Escape') {
    event.preventDefault();
    event.stopPropagation();
    closeSubjectMenu();
  } else if (event.key === 'Tab') {
    closeSubjectMenu();
  }
});
document.addEventListener('focusin', event => {
  if (!subjectMenu.contains(event.target) && !brandMenu.contains(event.target)) closeSubjectMenu(false);
  if (!themePopover.contains(event.target) && !themeToggle.contains(event.target)) closeThemePopover(false);
});
document.addEventListener('pointerdown', event => {
  if (!subjectMenu || subjectMenu.hidden) return;
  if (subjectMenu.contains(event.target) || brandMenu?.contains(event.target)) return;
  closeSubjectMenu(false);
});
function syncSoundToggle() {
  const toggle = $('sound-toggle');
  const off = isMuted();
  toggle.setAttribute('aria-pressed', String(off));
  toggle.setAttribute('aria-label', off ? 'Turn sounds on' : 'Mute sounds');
  toggle.title = off ? 'Turn sounds on' : 'Mute sounds';
  toggle.querySelector('use').setAttribute('href', off ? '#i-volume-x' : '#i-volume');
}
$('sound-toggle').addEventListener('click', () => { setMuted(!isMuted()); syncSoundToggle(); });
syncSoundToggle();
$('pick-center').addEventListener('click', () => viewer?.pickCenter());
$('view-zoom-in').addEventListener('click', () => viewer?.zoom(.8));
$('view-zoom-out').addEventListener('click', () => viewer?.zoom(1.25));
$('view-reset').addEventListener('click', () => {
  if (model?.clickedFocus && model.step) restoreStepView();
  else viewer?.resetView();
});
$('view-back').addEventListener('click', restoreStepView);
$('view-isolate').addEventListener('click', event => {
  const control = event.currentTarget;
  const on = control.getAttribute('aria-pressed') !== 'true';
  control.setAttribute('aria-pressed', String(on));
  viewer?.setIsolate(on);
});
$('view-ghost').addEventListener('input', event => viewer?.setGhost(Number(event.target.value) / 100));
$('view-rotate').addEventListener('click', event => {
  const control = event.currentTarget;
  const on = control.getAttribute('aria-pressed') !== 'true';
  const applied = viewer?.setAutoRotate(on) ?? false;
  control.setAttribute('aria-pressed', String(applied));
});

function showViewFallback() {
  viewer = undefined;
  viewerStatus = 'failed';
  $('model-status').hidden = true;
  $('view-fallback').hidden = false;
  if (activity?.type === 'recall') {
    stopTimers();
    render({ activate: true });
  } else if (activity?.type === 'find' || activity?.type === 'lesson') render();
  else updateModel();
}

let initialFit = true;
async function loadViewer() {
  viewerStatus = 'loading';
  initialFit = true;
  $('model-status').hidden = false;
  $('view-fallback').hidden = true;
  if (activity?.type === 'recall') render();
  try {
    const modPromise = viewerModulePromise || import(`./viewer.js${V}`);
    viewerModulePromise = null;
    const preload = modelPreload;
    modelPreload = null;
    const { createViewer } = await modPromise;
    viewer = await createViewer($('view'), findPick, showViewFallback, handleExplore, { ...pack, ...pack.model, preload });
    viewer.onReady(() => {
      syncModelStatus();
      if (activity?.type === 'recall') render();
      else if (activity?.type === 'find') render();
      else if (activity?.type === 'lesson' && activity.stage === 'find') render();
      else if (!activity && initialFit && modelLoaded()) {
        // Region packs can finish after the first fit; recentre once.
        initialFit = false;
        viewer.resetView();
      }
    });
    viewerStatus = 'ready';
    if ($('view-isolate').getAttribute('aria-pressed') === 'true') viewer.setIsolate(true);
    const ghost = Number($('view-ghost').value) / 100;
    if (ghost !== 1) viewer.setGhost(ghost);
    const rotate = $('view-rotate');
    if (rotate.getAttribute('aria-pressed') === 'true') {
      rotate.setAttribute('aria-pressed', String(viewer.setAutoRotate(true)));
    }
    syncModelStatus();
    if (activity?.type === 'recall') {
      render();
      if (activity.run.feedback) showRecallFeedback();
    } else if (activity?.type === 'find' || activity?.type === 'lesson') render();
    else updateModel();
  } catch {
    showViewFallback();
  }
}

$('view-retry')?.addEventListener('click', () => {
  if (viewerStatus !== 'loading') void loadViewer();
});

new ResizeObserver(() => {
  document.documentElement.style.setProperty('--header-height', `${appHeader.offsetHeight}px`);
}).observe(appHeader);

const STATE_KEY = `sc2_state_${pack.id}`;

function serializeActivity() {
  if (!activity) return null;
  const { type } = activity;
  if (type === 'aulas' && activity.block?.id) {
    return { type, blockId: activity.block.id, stage: activity.stage, cardIndex: activity.cardIndex || 0 };
  }
  if (type === 'aulasCatalog' && activity.catalogKind) {
    return { type, catalogKind: activity.catalogKind };
  }
  if (type === 'lesson' && activity.level?.id) {
    return {
      type,
      levelId: activity.level.id,
      mode: activity.mode,
      stage: activity.stage,
      index: activity.index || 0,
      found: activity.found || [],
      revealed: Boolean(activity.revealed),
      answer: activity.answer,
      check: activity.check || null,
    };
  }
  if (type === 'quiz') {
    return {
      type,
      levelId: activity.level?.id || null,
      topicTitle: activity.topic?.title || null,
      title: activity.title,
      label: activity.label,
      questions: activity.questions,
      index: activity.index || 0,
      correct: activity.correct || 0,
      answer: activity.answer,
    };
  }
  if (type === 'find' && activity.level?.id) {
    return {
      type,
      levelId: activity.level.id,
      ids: activity.ids,
      index: activity.index || 0,
      tries: activity.tries || 0,
      feedback: activity.feedback || '',
      correct: activity.correct || 0,
      done: Boolean(activity.done),
    };
  }
  if (type === 'oral' && activity.level?.id) {
    return {
      type,
      levelId: activity.level.id,
      ids: activity.ids,
      index: activity.index || 0,
      revealed: Boolean(activity.revealed),
    };
  }
  if (type === 'topic' && activity.topic?.title) {
    return { type, topicTitle: activity.topic.title };
  }
  if (type === 'recall' && activity.run) {
    return {
      type,
      levelId: activity.level?.id || null,
      recallTitle: activity.recallTitle || null,
      challengeDate: activity.challengeDate || null,
      fromId: activity.from?.id || null,
      run: activity.run.toJSON(),
    };
  }
  return null;
}

function saveAppState() {
  try {
    const payload = {
      page,
      selectedRegion,
      selectedLevel,
      mapTab,
      activity: serializeActivity(),
    };
    localStorage.setItem(STATE_KEY, JSON.stringify(payload));
  } catch { /* storage unavailable */ }
}

function restoreAppState() {
  let saved;
  try {
    saved = JSON.parse(localStorage.getItem(STATE_KEY) || 'null');
  } catch { return; }
  if (!saved || typeof saved !== 'object') return;
  if (['map', 'atlas', 'daily', 'theory', 'progress'].includes(saved.page)) page = saved.page;
  if (saved.selectedRegion) selectedRegion = saved.selectedRegion;
  if (saved.selectedLevel) selectedLevel = saved.selectedLevel;
  if (['aulas', 'regions', 'practice'].includes(saved.mapTab)) mapTab = saved.mapTab;
  const act = saved.activity;
  if (!act || typeof act !== 'object') return;
  if (act.type === 'aulas') {
    const block = resolveAulaBlock(act.blockId);
    if (!block?.cards?.length) return;
    if (act.stage === 'practice' || act.stage === 'test') {
      const questions = aulaItems(block);
      if (!questions.length) return;
      const previousSlides = act.stage === 'practice' ? slidesStats() : {};
      const weakIds = new Set(questions.filter(question => previousSlides[question.id] === 0).map(question => question.id));
      const session = aulas.createSession({ mode: act.stage, blockId: block.id, questions, weakIds });
      activity = { type: 'aulas', block, stage: act.stage, cardIndex: act.cardIndex || 0, session };
    } else {
      activity = {
        type: 'aulas',
        block,
        stage: 'study',
        cardIndex: Math.min(Math.max(Number(act.cardIndex) || 0, 0), Math.max(block.cards.length - 1, 0)),
      };
    }
    return;
  }
  if (act.type === 'aulasCatalog') {
    if (act.catalogKind === 'territories') startTerritories();
    else if (act.catalogKind === 'branching') startBranching();
    else if (act.catalogKind === 'slides') startSlides();
    else if (act.catalogKind === 'supply') startSupply();
    return;
  }
  if (act.type === 'lesson') {
    const level = LEVELS.find(entry => entry.id === act.levelId);
    if (!level) return;
    activity = {
      type: 'lesson',
      level,
      mode: act.mode || 'memorize',
      stage: act.stage || 'structure',
      index: Number(act.index) || 0,
      found: Array.isArray(act.found) ? act.found : [],
      revealed: Boolean(act.revealed),
      answer: act.answer,
      check: act.check || undefined,
    };
    return;
  }
  if (act.type === 'quiz' && Array.isArray(act.questions) && act.questions.length) {
    const level = act.levelId ? LEVELS.find(entry => entry.id === act.levelId) : undefined;
    const topic = act.topicTitle ? THEORY.find(entry => entry.title === act.topicTitle) : undefined;
    activity = {
      type: 'quiz',
      level,
      topic,
      title: act.title || 'Quiz',
      label: act.label || '',
      questions: act.questions,
      index: Math.min(Math.max(Number(act.index) || 0, 0), act.questions.length - 1),
      correct: Number(act.correct) || 0,
      answer: act.answer,
    };
    return;
  }
  if (act.type === 'find') {
    const level = LEVELS.find(entry => entry.id === act.levelId);
    if (!level || !Array.isArray(act.ids)) return;
    activity = {
      type: 'find',
      level,
      ids: act.ids.filter(id => ITEMS[id]),
      index: Number(act.index) || 0,
      tries: Number(act.tries) || 0,
      feedback: act.feedback || '',
      correct: Number(act.correct) || 0,
      done: Boolean(act.done),
    };
    return;
  }
  if (act.type === 'oral') {
    const level = LEVELS.find(entry => entry.id === act.levelId);
    if (!level || !Array.isArray(act.ids)) return;
    activity = {
      type: 'oral',
      level,
      ids: act.ids.filter(id => ITEMS[id]),
      index: Number(act.index) || 0,
      revealed: Boolean(act.revealed),
    };
    return;
  }
  if (act.type === 'topic') {
    const topic = THEORY.find(entry => entry.title === act.topicTitle);
    if (topic) activity = { type: 'topic', topic };
    return;
  }
  if (act.type === 'recall' && act.run) {
    const run = Recall.fromJSON(act.run);
    if (!run) return;
    const level = act.levelId ? LEVELS.find(entry => entry.id === act.levelId) : undefined;
    const from = act.fromId ? regions[act.fromId] : undefined;
    activity = {
      type: 'recall',
      level,
      from,
      recallTitle: act.recallTitle || undefined,
      challengeDate: act.challengeDate || undefined,
      run,
    };
  }
}

restoreAppState();
render();
void loadViewer();
