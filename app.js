import { correctSound, isMuted, keySound, setMuted, wrongKeySound } from './sound.js?v=90';
import { SUBJECTS, subjectFromUrl, subjectUrl } from './subjects/registry.js?v=90';
import {
  IDS, ITEMS, LEVELS, REGIONS, REGION_CONTEXT, ROUND_NAMES, Recall, day, fold, gradeCard, initStudy, matchDaily,
  readProgress, recordLaterRecall, saveProgress as writeProgress, shuffle, streak,
} from './study.js?v=90';

// Boot the selected subject before any UI state is derived. Start fetching the
// viewer module and model assets in parallel so the 3D scene doesn't wait on
// the subject pack waterfall.
const V = '?v=90';
const subjectId = subjectFromUrl();
const subject = SUBJECTS.find(entry => entry.id === subjectId) || SUBJECTS[0];
let viewerModulePromise = import(`./viewer.js${V}`);
const preloadManifestUrl = subject.id === 'msk' ? './msk/models.json' : './models.json';
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
const localization = language === 'pt-BR' ? await import('./translations/localize.js?v=90') : null;
const pack = localization ? localization.localizePack(sourcePack) : sourcePack;
document.documentElement.lang = language;
initStudy(pack);
if (localization) localization.installInterfaceTranslation();
document.documentElement.dataset.subject = pack.id;

const material = pack.content;
const TERRITORIES = pack.territories || [];
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
const dateSeries = (count, offset = 0) => Array.from({ length: count }, (_, index) => day(index - count + 1 + offset));
const progress = readProgress();
const regions = Object.fromEntries(REGIONS.map(region => [region.id, region]));
const orientation = { id: 'orientation', title: 'Orientation' };
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
let activity;
let viewer;
let viewerStatus = 'loading';
let model;
let advanceTimer;
let wrongTimer;
let mockTimer;
let shortcuts = new Map();
let actions = [];
let started = performance.now();

function button(label, run, options = {}) {
  const index = actions.push(run) - 1;
  if (options.key) shortcuts.set(options.key, run);
  const start = options.icon ? icon(options.icon, 16) : '';
  const end = options.iconEnd ? icon(options.iconEnd, 16) : '';
  return `<button type="button" class="button ${options.class || ''}" data-action="${index}" ${options.disabled ? 'disabled' : ''}>${start}${label}${end}${options.key === 'Enter' ? `<kbd aria-hidden="true">${icon('enter', 12)}</kbd>` : ''}</button>`;
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
  const headerHeight = document.querySelector('.app-header').offsetHeight;
  window.scrollBy({
    top: element.getBoundingClientRect().top - headerHeight - 8,
    behavior: reducedMotion.matches ? 'auto' : 'smooth',
  });
}

function stopTimers() {
  clearTimeout(advanceTimer);
  clearTimeout(wrongTimer);
  clearInterval(mockTimer);
  mockTimer = undefined;
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
      territories: renderTerritories, territoriesResults: renderTerritoryResults,
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
  viewer?.paint({ ...config, markerIds }, model.preserveCamera && !refocus);
  viewer?.focusAxis(activity?.type === 'orientation' && activity.index === 0);
}

function syncModelStatus() {
  $('model-status').hidden = viewerStatus === 'failed' || modelLoaded();
}

function stepSnapshot() {
  return { focus: [...model.focus], close: model.close, title: model.title, view: model.view };
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
  model = { ...model, focus: [id], close: true, clickedFocus: true, title: ITEMS[id].pt, view: focusedStructureView([id], model.view), step };
  updateModel();
}
function restoreStepView() {
  if (!model?.step) return;
  const { focus, close, title, view } = model.step;
  model = { ...model, focus, close, title, view, clickedFocus: false };
  delete model.step;
  updateModel();
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
  if (level.region === 'veias' || level.id === 'mediastino-1') return 'post';
  if (level.id === 'mediastino-2') return 'inf';
  return 'ant';
}
function findTargets(level) {
  const targets = level.ids.filter(id => id !== 'paredev');
  return targets.length ? targets : [...level.ids];
}
// Distinct, high-contrast hues; each lesson structure keeps one for the whole lesson.
const LESSON_PALETTE = ['#ffd84a', '#4dd0e1', '#ff7ab6', '#8bd450', '#b18cff', '#ff9f43',
  '#5b9dff', '#2ee6a6', '#f25f5c', '#e8e3d0', '#c0ca33', '#ff6bd6'];
function levelPalette(level) {
  return Object.fromEntries(level.ids.map((id, index) => [id, LESSON_PALETTE[index % LESSON_PALETTE.length]]));
}
const swatch = (level, id) => `<i class="swatch" style="--swatch:${levelPalette(level)[id] || 'var(--mute)'}" aria-hidden="true"></i>`;
function levelContext(level) {
  const markerOnly = level.ids.every(id => pack.markers?.[id]);
  const regionMeshes = markerOnly
    ? regions[level.region]?.ids.filter(id => !pack.markers?.[id] && !level.ids.includes(id)) || []
    : [];
  const context = markerOnly
    ? [...new Set([...(ITEMS[level.ids[0]]?.deck.ctx || []), ...regionMeshes])]
    : REGION_CONTEXT[level.region] || ITEMS[level.ids[0]]?.deck.ctx || [];
  return {
    context,
    ...(markerOnly ? { contextOpacity: .42, padding: 1.08 } : {}),
  };
}
function levelModel(level, options = {}) {
  const base = levelContext(level);
  setModel(level.ids, {
    palette: levelPalette(level),
    title: level.title,
    ...base,
    faint: REGION_CONTEXT[level.region] ? SKELETON_IDS : undefined,
    padding: base.padding || (level.region === 'mediastino' ? 1.32 : 1.26),
    ...options,
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
  const chip = (key, chosen, run) => button(`${swatch(level, key)}${escape(ITEMS[key].pt)}`, run, { class: `chip-swatch ${chosen ? 'chosen' : ''}` });
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

  if (stage === 'structure') {
    const index = Math.min(Math.max(Number(activity.index) || 0, 0), Math.max(total - 1, 0));
    activity.index = index;
    const id = level.ids[index];
    const item = ITEMS[id];
    levelModel(level, { view: teachingView(id), controls: true, explore: true, focus: [id], close: true, markerLabels: true });
    const last = index + 1 === total;
    const clinical = LESSONS[id]?.clinical || detailFor(id).clinical;
    return `<div class="prompt lesson-structure">${top}
      <div class="eyebrow">${memorize ? 'Memorize' : 'Learn'} · ${escape(level.title)} · ${index + 1} of ${total}</div>
      <h1>${swatch(level, id)}${escape(item.pt)} ${item.tag ? `<small>${escape(item.tag)}</small>` : ''}</h1>
      ${memorize ? `<p class="lesson-body">${markdown(detailFor(id).text)}</p>` : lessonBlocks(id)}
      ${clinical && !memorize ? `<aside class="clinical-note"><span class="clinical-label">Clinical note</span><p>${escape(clinical)}</p></aside>` : ''}
      ${level.region === 'mediastino' ? '<p class="support">Small vessel? Use Isolate to show only the highlighted structure.</p>' : ''}
      <div class="chips">${level.ids.map((key, position) => chip(key, key === id, () => key === id ? focusStructure(key) : jump(position))).join('')}</div>
      <div class="actions">
        ${button('Previous', () => index ? jump(index - 1) : goStage('overview'), { icon: 'arrow-left', disabled: memorize && !index })}
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
      <p class="support">${!ready ? 'Loading the 3D region…' : allFound ? completion : 'Rotate or zoom if it is hidden. Wrong clicks tell you what you touched.'}</p>
      <div class="find-meter" role="progressbar" aria-valuemin="0" aria-valuemax="${order.length}" aria-valuenow="${found.length}" aria-label="Structures found"><span class="find-bar" style="width:${Math.round(found.length / order.length * 100)}%"></span></div>
      <p id="find-feedback" class="feedback ${feedback?.tone || ''}" role="status">${feedback ? escape(feedback.text) : ''}</p>
      <ul class="find-list" aria-label="Structures to find">${order.map(id => {
        const done = found.includes(id);
        return `<li class="find-chip${done ? ' found' : ''}${id === target ? ' current' : ''}">${done ? swatch(level, id) : '<i class="swatch empty" aria-hidden="true"></i>'}<span>${escape(ITEMS[id].pt)}</span></li>`;
      }).join('')}</ul>
      ${order.length < total ? '<p class="support">The ventricular wall wraps the others, so it is not part of this task.</p>' : ''}
      ${viewerStatus !== 'ready' ? `<p class="support" role="status">${viewerStatus === 'loading' ? 'Waiting for the 3D model…' : 'The 3D model is required to find structures.'}</p>` : ''}
      ${viewerStatus === 'ready' && !ready ? '<p class="support" role="status">Loading the 3D region…</p>' : ''}
      <div class="actions">
        ${button('Previous', () => jump(total - 1), { icon: 'arrow-left' })}
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

  levelModel(level, { view: lessonView(level), controls: true, explore: true, paletteAll: true, markerLabels: true });
  return `<div class="prompt lesson-overview">${top}
    <div class="eyebrow">${escape(regions[level.region]?.title || '')} · Learn</div>
    <h1>${escape(level.title)}</h1>
    <p class="lesson-body">${escape(overviewFor(level))}</p>
    <h2 class="legend-title">${plural(total, 'structure')} in this level</h2>
    <div class="chips legend">${level.ids.map(id => chip(id, false, () => focusStructure(id))).join('')}</div>
    <p class="support">Each colour stays with its structure for the whole lesson. Click a name to light it alone.</p>
    <div class="actions">${button('Learn the structures', () => jump(0), { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}</div>
  </div>`;
}

function renderMap() {
  const region = regions[selectedRegion];
  const next = nextLevel();
  const level = region?.levels.find(item => item.id === selectedLevel) || region?.levels[0];
  const levels = [...(ORIENTATION.length ? [orientation] : []), ...requiredLevels()];
  const done = levels.filter(passedLevel).length;
  const map = [...(ORIENTATION.length ? [{ id: 'orientation', title: 'Orientation' }] : []), ...REGIONS];
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
      if (box.top > window.innerHeight * .6 || box.top < document.querySelector('.app-header').offsetHeight) scrollBelowHeader(heading);
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
  const pct = Math.round(done / levels.length * 100);
  const nextLabel = next?.id === 'orientation' ? 'Start' : 'Continue';
  const mode = (iconName, title, text, action) => `<article class="mode-card">
      <div class="mode-icon">${icon(iconName, 18)}</div>
      <div class="mode-text"><h2>${title}</h2><p>${text}</p></div>${action}</article>`;
  return `<div class="map-content">
    <div class="page-head map-head"><h1>${escape(pack.mapHeading || `${pack.name} map`)}</h1>
      <div class="progress-line"><span style="--pct:${pct}%"></span></div>
      <p>${done} of ${levels.length} levels passed · Pass by recalling every structure in Rounds 2 and 3.</p></div>
    <div class="modes" aria-label="Study modes">
      ${mode('arrow-right', next ? escape(next.title) : LEVELS.some(level => level.bonus) ? 'Required levels passed' : 'All levels passed', next?.id === 'orientation' ? 'Start here: directions and landmarks.' : 'Your next level on the path.',
        next ? button(nextLabel, () => next.id === 'orientation' ? startOrientation() : openLevel(next), { class: 'primary', iconEnd: 'arrow-right' }) : button('Open Daily', () => setPage('daily'), { class: 'primary' }))}
      ${TERRITORIES.length ? mode('crosshair', 'Coronary territories', 'Match each wall to its artery.', button('Practice', startTerritories)) : ''}
      ${mode('calendar', 'Structure of the day', 'One structure from memory.', button('Recall', () => startDailyStructure()))}
      ${mode('rotate-cw', 'All structures', `${IDS.length} structures · one continuous recall, including unstudied material.`, button('Recall all', () => startFullRecall()))}
    </div>
    <h2 class="section-title">Regions</h2>
    <div class="path" aria-label="Curriculum regions">${map.map((entry, index) => {
      const required = entry.levels?.filter(item => !item.bonus) || [];
      const count = required.filter(passedLevel).length;
      const status = entry.levels ? `${count}/${required.length}` : savedLevel(entry.id).passed ? icon('check', 14) : '';
      return button(`<span class="path-num">${String(index + 1).padStart(2, '0')}</span><span class="path-body"><b>${escape(entry.title)}</b><small>${escape(REGION_PURPOSES[entry.id])}</small></span><span class="path-count">${status}</span>`,
        () => chooseRegion(entry.id), { class: `path-stop ${entry.id === selectedRegion ? 'chosen' : ''}` });
    }).join('')}</div>
    <h2 class="section-title level-list-title" id="level-list-title" tabindex="-1">${escape(region?.title || 'Orientation')} · levels</h2>
    ${region ? `<div class="study-row"><div><h2>Recall all of ${escape(region.title)}</h2><p>${regionRecallIds(region).length} structures · one continuous recall, including unstudied material.</p></div>
      ${button('Recall region', () => startFullRecall(region))}</div>` : ''}
    <div class="level-list">
      ${!region ? `<div class="level-item"><div class="level-heading"><h2>Orientation tour</h2></div><p>Learn the heart’s surfaces, borders and axis on the 3D model.</p>
        <div class="actions">${button(savedLevel('orientation').passed ? 'Redo orientation' : 'Start orientation', startOrientation, { class: 'primary' })}</div></div>`
        : region.levels.map(entry => renderLevelRow(entry, level)).join('')}
    </div>
  </div>`;
}

function renderLevelRow(level, selected) {
  const open = unlocked(level);
  const label = level === selected ? 'selected' : '';
  return `<div class="level-item ${label}">
    <div class="level-heading"><h2>${escape(level.title)}${level.bonus ? ' <span class="bonus-tag">Bonus</span>' : ''}</h2>${starsHTML(level.id)}</div>
    <p>${level.ids.length} structures · ${!open ? (previousRequired(level) ? `Pass ${escape(previousRequired(level).title)} to ${level.bonus ? 'open this bonus' : 'unlock'}` : level.bonus ? 'Pass the previous level to open the bonus' : 'Pass the previous level to unlock') : passedLevel(level) ? 'Passed' : savedLevel(level.id).clearedOn ? 'Replay the recall rounds to pass' : level.bonus ? 'Optional · not required to progress' : 'Ready'}</p>
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
  return `<div class="recall">
    <div class="recall-top">
      <div><h1>${escape(title)}</h1><span class="eyebrow">${label}</span></div>
      <div class="stats" aria-label="Round statistics"><span id="wpm-stat" hidden><b id="wpm"></b> wpm</span>
        <span><b id="accuracy">${run.accuracy}</b>%</span><span><b id="round-done">${run.results[round].correct.size}</b> / ${run.ids.length} recalled</span><span id="review-count"></span></div>
    </div>
    <p class="view-banner">${escape(views[view])} view</p><div class="answer-area">
      <label for="typer" id="word" class="word" aria-hidden="true"></label>
      <p id="typing-warning" class="typing-warning" role="status" hidden></p>
      ${item.tag && round === 1 ? `<span class="segment-tag">${escape(item.tag)} · segment code</span>` : ''}
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

function showRecallFeedback() {
  const { run } = activity;
  const { feedback, item, round } = run;
  if (!feedback) return;
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
  const intro = language === 'pt-BR'
    ? feedback.near ? `Quase! O nome é ${item.typing}.`
      : feedback.confusion ? `Você respondeu ${feedback.confusion.pt}. Esta estrutura é ${item.pt}.`
      : feedback.reveal ? `Esta estrutura é ${item.pt}.` : `Você digitou “${feedback.guess}”. Esta estrutura é ${item.pt}.`
    : feedback.near ? `So close. It’s spelled ${item.typing}.`
      : feedback.confusion ? `You named ${feedback.confusion.pt}. This is ${item.pt}.`
      : feedback.reveal ? `This is ${item.pt}.` : `You typed “${feedback.guess}”. This is ${item.pt}.`;
  const clue = lessonCue(item.id).trimEnd();
  const punctuation = /[.!?…]$/.test(clue) ? '' : '.';
  line.className = 'feedback bad verdict';
  line.innerHTML = `<strong class="verdict-tag">${icon('x', 15)}${feedback.reveal ? 'Revealed' : 'Not quite'}</strong> <span>${escape(`${intro} ${clue}${punctuation}${feedback.requeued ? language === 'pt-BR' ? ' Ela aparecerá novamente.' : ' It will come up again.' : ''}`)}</span>`;
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
    ${level && passedLevel(level) ? `<div class="actions">${modeButtons(level)}</div>` : ''}
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

function startTerritories() {
  launch('territories', { questions: shuffle(TERRITORIES), index: 0, correct: 0, log: [] });
}

function renderTerritories() {
  const state = activity;
  const { questions, index } = state;
  const question = questions[index];
  const answered = state.answer !== undefined;
  setModel(['ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'tp', 'vcs', 'vci'], {
    title: 'Coronary territories', context: ['aoasc', 'arco', 'tp', 'vcs', 'vci'],
    focus: question.focus, view: question.view, controls: true, padding: 1.22,
    frameFocus: !answered, preserveCamera: answered,
  });
  function next() {
    const correct = state.answer === question.answer;
    if (correct) state.correct++;
    state.log.push({ label: question.label, correct, answer: question.options[question.answer], why: question.why });
    if (index + 1 === questions.length) {
      recordActivity();
      activity = { type: 'territoriesResults', correct: state.correct, total: questions.length, log: state.log };
    } else {
      state.index++;
      delete state.answer;
    }
    render({ top: true, activate: true });
  }
  return `<div class="screen prompt"><div class="eyebrow">Coronary territories · ${index + 1} of ${questions.length}</div>
    <h1>${escape(question.label)}</h1>
    ${quizMarkup({ ...question, q: question.prompt }, state)}
    <div class="actions">${answered ? button(index + 1 === questions.length ? 'See results' : 'Next case', next, { class: 'primary', key: 'Enter' }) : ''}</div></div>`;
}

function renderTerritoryResults() {
  const { correct, total, log = [] } = activity;
  return `<div class="screen result"><div class="eyebrow">Coronary territories</div>
    <h1>${correct} of ${total}</h1>
    <p>${correct === total ? 'Every territory matched its usual arterial supply.'
      : 'Review the explanations, then run the cases again. Dominance changes the inferior and septal answers.'}</p>
    <div class="actions">${button('Play again', startTerritories, { class: 'primary', key: 'Enter' })}
      ${button('Back to map', () => setPage('map'), { icon: 'arrow-left' })}</div>
    <h2>Case review</h2>
    <div class="detail-list">${log.map(entry => `<div><strong>${escape(entry.label)}</strong>
      <p>${escape(entry.answer)}. ${escape(entry.why)}</p>
      <span class="${entry.correct ? 'good' : 'bad'}">${entry.correct ? 'Correct' : 'Review'}</span></div>`).join('')}</div></div>`;
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
    ${(topic.sections || []).map(section => `<div class="theory-section"><h2>${escape(section.h)}</h2>${list(section.bullets || [])}</div>`).join('')}
    ${topic.oral?.length ? `<h2>Oral questions</h2>${topic.oral.map(entry =>
      `<details><summary>${escape(entry.q)}</summary>${list(entry.a || [])}</details>`).join('')}` : ''}
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
    <div class="study-row"><div><h2>Mock oral exam</h2>
      ${progress.mocks.length ? list(progress.mocks.slice(-5).reverse().map(entry => `${entry.date} · ${mockScore(entry)}`))
        : '<p>Completed exams will appear here.</p>'}</div>
      ${button('Mock exam', startMock)}</div>
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
    <p>${escape(cue)}</p>
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
    <div class="page-head"><h1>Atlas</h1><p>All ${ATLAS_IDS.length} structures on one model. Show or hide parts, then click a name or the model to focus it. ${escape(pack.atlasNote || '')}</p></div>
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

const atlasNarrow = matchMedia('(max-width: 770px)');

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
  const quiz = (activity?.type === 'lesson' || activity?.type === 'quiz' || activity?.type === 'territories') && document.querySelector('.quiz');
  if (quiz && !target.closest?.('input, textarea, select, [contenteditable]')) {
    const letter = key.toLowerCase();
    const choices = 'abcd';
    const numbers = '1234';
    const index = key.length === 1 ? Math.max(choices.indexOf(letter), numbers.indexOf(key)) : -1;
    const option = quiz.querySelectorAll('.option')[index];
    const action = key === 'Enter' && activity.answer !== undefined && (!control || control.matches('.prompt .primary'))
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

render();
void loadViewer();
