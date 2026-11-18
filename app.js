import * as material from './content.js?v=36';
import { TERRITORIES } from './territories.js?v=36';
import {
  IDS, ITEMS, LEVELS, REGIONS, REGION_CONTEXT, ROUND_NAMES, Recall, day, fold, gradeCard, matchDaily,
  readProgress, recordLaterRecall, saveProgress as writeProgress, shuffle, streak,
} from './study.js?v=36';

const REGION_PURPOSES = {
  "orientation": "Learn directions and the landmarks used throughout the path.",
  "camaras": "Locate the four chambers and their shared muscle wall.",
  "vasos": "Trace the large vessels entering and leaving the heart.",
  "valvas": "Find the one-way valve flaps and their supporting muscles.",
  "coronarias": "Follow the arteries across the heart’s surface.",
  "veias": "Trace the veins returning blood from the heart muscle.",
  "vias": "Follow the airway fork into the two lungs.",
  "segd": "Locate the segments within the three right lung lobes.",
  "sege": "Locate the segments within the two left lung lobes.",
  "mediastino": "Explore the central compartment, chest wall vessels and thoracic skeleton."
};

const CONTENT = material.CONTENT || {};
const lessonCue = id => material.LESSON_CUES?.[id] || ITEMS[id]?.dica || '';
const THEORY = material.THEORY || [];
const ORIENTATION = (material.ORIENTATION || []).filter(step => step?.title);
const $ = id => document.getElementById(id);
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);
const icon = (name, size = 18) => `<svg class="icon" width="${size}" height="${size}" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
const list = values => `<ul>${values.map(value => `<li>${escape(value)}</li>`).join('')}</ul>`;
const plural = (count, word) => `${count} ${word}${count === 1 ? '' : 's'}`;
const shortDate = iso => {
  if (!iso) return '';
  const [year, month, date] = iso.split('-').map(Number);
  return new Date(year, month - 1, date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};
const todayLabel = () => new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
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
const heartIds = ['ad', 'ae', 'vd', 've', 'paredev', 'aoasc', 'arco', 'tp', 'vcs'];
const airwayIds = ['traqueia', 'bpd', 'bpe'];
// Context bones start hidden in the Atlas so the organs stay readable.
const SKELETON_IDS = ['manubrio', 'esterno', 'xifoide', 'claviculas', 'cart_costais', 'costela_1', 'costela_2', 'costela_4', 'costela_5', 'costelas_rest', 'vertebras_toracicas'];
const ATLAS_IDS = Object.keys(CONTENT).filter(id => ITEMS[id]);
const ATLAS_GROUPS = REGIONS.map(region => ({
  id: region.id, title: region.title, ids: region.ids.filter(id => ITEMS[id]),
})).filter(group => group.ids.length);
const ATLAS_REGION = Object.fromEntries(ATLAS_GROUPS.flatMap(group => group.ids.map(id => [id, group.title])));
const ATLAS_SET = new Set(ATLAS_IDS);
const atlas = { query: '', hidden: new Set(SKELETON_IDS), focus: [], active: null, open: false, view: 'ant' };
const sectionTitles = {
  definition: 'Definition', location: 'Location and projection', relations: 'Relations',
  course: 'Origin, course and termination', branches: 'Branches and tributaries',
  supply: 'Supply and drainage', internal: 'Internal features', development: 'Development',
  clinical: 'Clinical correlations', imaging: 'Imaging',
};
const views = {
  ant: 'Anterior', post: 'Posterior', dir: 'Right lateral',
  esq: 'Left lateral', sup: 'Superior', inf: 'Inferior',
};
const coarsePointer = matchMedia('(pointer: coarse)');
const answerCharacters = /[^\p{L}\p{M}\p{N} ()+'’‘–—-]/gu;
let page = 'map';
let selectedRegion = nextLevel()?.region || 'orientation';
let selectedLevel = nextLevel()?.id;
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
  return `<button type="button" class="button ${options.class || ''}" data-action="${index}" ${options.disabled ? 'disabled' : ''}>${start}${label}${end}${options.key === 'Enter' ? `<kbd>${icon('enter', 12)}</kbd>` : ''}</button>`;
}

function setPage(next) {
  stopTimers();
  document.body.classList.remove('atlas-drawer-open');
  atlas.open = false;
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
function nextLevel() {
  if (!savedLevel('orientation').passed) return orientation;
  return LEVELS.find(level => !savedLevel(level.id).passed);
}
function unlocked(level) {
  if (level.id === 'orientation' || savedLevel(level.id).passed) return true;
  const region = REGIONS.find(r => r.levels.includes(level));
  const index = region ? region.levels.indexOf(level) : -1;
  return index <= 0 || Boolean(savedLevel(region.levels[index - 1].id).passed);
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
  input.hidden = activity?.type !== 'recall' || viewerStatus !== 'ready';
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
  model = { ...options, ids: valid(ids), focus: valid(options.focus), context: valid(options.context) };
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
  return level?.region === 'mediastino'
    ? { scope: level.ids, context: REGION_CONTEXT.mediastino, faint: SKELETON_IDS, title: 'Mediastinum & thoracic wall', padding: 1.28 } : {};
}

function updateModel() {
  if (!model) {
    viewer?.focusAxis(false);
    return;
  }
  $('model-label').textContent = model.title || 'Heart and lungs';
  $('model-angle').textContent = views[model.view] || '3D specimen';
  $('view-direction').value = model.view || 'ant';
  $('view-toolbar').hidden = !(viewer && model.controls);
  $('view-back').hidden = !(viewer && model.clickedFocus && model.step);
  $('view-isolate').disabled = !model.focus.length;
  $('view-ghost').disabled = !model.focus.length;
  $('reticle').hidden = !(viewer && model.pick);
  $('pick-center').hidden = !(viewer && model.pick);
  viewer?.paint(model, model.preserveCamera);
  viewer?.focusAxis(activity?.type === 'orientation' && activity.index === 0);
  if (model.clickedFocus && model.focus.length) viewer?.focus(model.focus, { close: Boolean(model.close) });
  else if (model.frameFocus && model.focus.length) viewer?.focus(model.focus, { close: true });
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
  model = { ...model, focus: [id], close: true, clickedFocus: true, title: ITEMS[id].pt, step };
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
    setModel([...heartIds, ...(step.focus || [])], { focus: step.focus, view: step.view, controls: true, subtleFocus: true, explore: true, title: 'Heart orientation' });
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
    <p class="support">What to notice: ${escape(step?.notice)}</p><div class="chips">${(step?.focus || []).filter(id => ITEMS[id]).map(id => `${button(escape(ITEMS[id].pt), () => focusStructure(id))}`).join('')}</div>
    ${index === 5 ? `<div class="actions" aria-label="Choose exit valve">${button('Pulmonary valve', () => focusGroup(['pulm_ant_d', 'pulm_ant_e', 'pulm_post'], 'Pulmonary valve'))}${button('Aortic valve', () => focusGroup(['ao_ant', 'ao_post_e', 'ao_post_d'], 'Aortic valve'))}</div>` : ''}
    ${index === ORIENTATION.length - 1 ? `<h2>Landmarks you learned</h2>${list(['Base: the superior-posterior part, marked by the left atrium', 'Apex: the pointed tip of the left ventricle', 'Anterior: the broad right ventricle', 'Right border: the right atrium between two large veins', 'Exit vessels and valves: pulmonary trunk and aorta', 'Posterior and surface vessels: pulmonary veins, coronary sinus, LAD and great cardiac vein'])}` : ''}
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
  if (!savedLevel(level.id).lesson) launch('lesson', { level, index: 0 });
  else beginRecall(level.ids, 'level', level);
}

function availableQuestions(id) {
  return (CONTENT[id]?.mcq || []).filter(validQuestion);
}
function validQuestion(question) {
  return Boolean(question?.q && Array.isArray(question.options) && question.options.length >= 2
    && Number.isInteger(question.answer) && question.answer >= 0 && question.answer < question.options.length);
}

function renderLesson() {
  const { level, index } = activity;
  const id = level.ids[index];
  const it = ITEMS[id];
  // Check recognition using only the landmarks displayed in this level.
  const checkId = level.ids[0];
  const checkOptions = level.ids.slice(0, 4);
  const correctPosition = level.ids.length % checkOptions.length;
  const orderedOptions = [...checkOptions.slice(correctPosition), ...checkOptions.slice(0, correctPosition)];
  const question = {
    q: `Which landmark identifies the ${ITEMS[checkId].pt}?`,
    options: orderedOptions.map(lessonCue),
    answer: orderedOptions.indexOf(checkId),
    why: lessonCue(checkId),
  };
  function start() {
    progress.levels[level.id] = { ...savedLevel(level.id), lesson: true };
    saveProgress(progress);
    beginRecall(level.ids, 'level', level);
  }
  const goto = position => { activity.index = position; render({ activate: true }); };
  const choose = position => {
    if (position === index && model?.clickedFocus) return restoreStepView();
    goto(position);
  };
  const chip = (key, position) => key === id ? focusStructure(key) : choose(position);
  if (!it) {
    return `<div class="screen prompt"><div class="eyebrow">${escape(level.title)} / Lesson check</div>
      <h1>${question ? 'Check your understanding' : 'Ready for Round 1'}</h1>
      ${question ? quizMarkup(question, activity) : '<p>You’ve seen every structure in this level.</p>'}
      <div class="actions">${button('Back to structures', () => goto(level.ids.length - 1))}
      ${!question || activity.answer !== undefined ? button('Start Round 1', start, { class: 'primary', key: 'Enter' }) : ''}</div></div>`;
  }
  showStructure(id, { controls: true, view: teachingView(id), explore: true, ...regionScope(level) });
  return `<div class="prompt">
    <div class="eyebrow">${escape(level.title)} / Lesson ${index + 1} of ${level.ids.length}</div>
    <h1>${escape(it.pt)} ${it.tag ? `<small>${escape(it.tag)}</small>` : ''}</h1>
    <p>${linkedText(material.LESSON_CUES?.[id] || it.dica, level.ids)}</p><p class="support">The view changes to show each structure best.${level.region === 'mediastino' ? ' Use Isolate for a small vessel.' : ''}</p>
    ${!material.LESSON_CUES?.[id] && it.fatos?.[0] ? `<p class="support">${escape(it.fatos[0])}</p>` : ''}
    <div class="chips">${level.ids.map((key, position) => button(escape(ITEMS[key].pt), () => chip(key, position), { class: key === id ? 'chosen' : '' })).join('')}</div>
    <div class="actions">
      ${index ? button('Previous', () => goto(index - 1), { icon: 'arrow-left' }) : ''}
      ${button(index + 1 === level.ids.length ? 'Take lesson check' : 'Next structure', () => goto(index + 1), { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })}
    </div></div>`;
}

function renderMap() {
  const region = regions[selectedRegion];
  const next = nextLevel();
  const level = region?.levels.find(item => item.id === selectedLevel) || region?.levels[0];
  const levels = [orientation, ...LEVELS];
  const done = levels.filter(passedLevel).length;
  const map = [{ id: 'orientation', title: 'Orientation' }, ...REGIONS];
  function chooseRegion(id) {
    selectedRegion = id;
    selectedLevel = regions[id]?.levels.find(item => unlocked(item) && !passedLevel(item))?.id;
    render();
  }
  const overviewIds = region?.id === 'mediastino' ? region.ids.filter(id => !SKELETON_IDS.includes(id)) : region?.ids;
  setModel(overviewIds?.length ? overviewIds : [...heartIds, ...airwayIds], {
    title: region?.title || 'Thoracic anatomy', layout: 'map-layout', view: 'ant',
    context: region ? (REGION_CONTEXT[region.id] || ITEMS[region.ids[0]].deck.ctx) : [],
  });
  const pct = Math.round(done / levels.length * 100);
  const nextLabel = next?.id === 'orientation' ? 'Start' : 'Continue';
  const mode = (iconName, title, text, action) => `<article class="mode-card">
      <div class="mode-icon">${icon(iconName, 18)}</div>
      <div class="mode-text"><h2>${title}</h2><p>${text}</p></div>${action}</article>`;
  return `<div class="map-content">
    <div class="page-head map-head"><h1>Heart &amp; lungs map</h1>
      <div class="progress-line"><span style="--pct:${pct}%"></span></div>
      <p>${done} of ${levels.length} levels passed · Pass by recalling every structure in Rounds 2 and 3.</p></div>
    <div class="modes" aria-label="Study modes">
      ${mode('arrow-right', next ? escape(next.title) : 'All levels passed', next?.id === 'orientation' ? 'Start here: directions and landmarks.' : 'Your next level on the path.',
        next ? button(nextLabel, () => next.id === 'orientation' ? startOrientation() : openLevel(next), { class: 'primary', iconEnd: 'arrow-right' }) : button('Open Daily', () => setPage('daily'), { class: 'primary' }))}
      ${mode('crosshair', 'Coronary territories', 'Match each wall to its artery.', button('Practice', startTerritories))}
      ${mode('calendar', 'Structure of the day', 'One structure from memory.', button('Recall', () => startDailyStructure()))}
    </div>
    <h2 class="section-title">Regions</h2>
    <div class="path" aria-label="Curriculum regions">${map.map((entry, index) => {
      const count = entry.levels?.filter(passedLevel).length;
      const status = entry.levels ? `${count}/${entry.levels.length}` : savedLevel(entry.id).passed ? icon('check', 14) : '';
      return button(`<span class="path-num">${String(index + 1).padStart(2, '0')}</span><span class="path-body"><b>${escape(entry.title)}</b><small>${escape(REGION_PURPOSES[entry.id])}</small></span><span class="path-count">${status}</span>`,
        () => chooseRegion(entry.id), { class: `path-stop ${entry.id === selectedRegion ? 'chosen' : ''}` });
    }).join('')}</div>
    <h2 class="section-title">${escape(region?.title || 'Orientation')} · levels</h2>
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
    <div class="level-heading"><h2>${escape(level.title)}</h2>${starsHTML(level.id)}</div>
    <p>${level.ids.length} structures · ${!open ? 'Pass the previous level to unlock' : passedLevel(level) ? 'Passed' : savedLevel(level.id).clearedOn ? 'Replay the recall rounds to pass' : 'Ready'}</p>
    ${open ? `<div class="actions">${button(passedLevel(level) ? 'Name it' : savedLevel(level.id).lesson ? 'Start rounds' : 'Start lesson',
      () => openLevel(level), { class: level === selected ? 'primary' : '' })}
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

function startDailyStructure(now = new Date()) {
  beginRecall([matchDaily(now)], 'day', undefined, day(0, now));
}

function displayWpm(run) {
  return run.round === 1 && run.active >= 3000 ? run.wpm : null;
}

// Keep hidden/posterior landmarks in their teaching view. Lateral views
// provide another useful angle for landmarks on the lateral heart/lung borders.
function teachingView(id) {
  if (/^(pulm_|ao_ant$|ao_post|tri_|mit_|pap_)/.test(id)) return 'sup';
  if (['diafragma', 'phren_inf_a_d', 'phren_inf_a_e', 'phren_inf_v', 'phren_sup_v'].includes(id)) return 'inf';
  if (['ae', 'vpsd', 'vpid', 'vpse', 'vpie', 'seio', 'dp', 'vcmedia', 'aodesc', 'esofago', 'azigo', 'hemiazigo', 'sept_dp', 'vent_post_acd', 'vpve', 'apd',
    'azigo_acs', 'eso_art', 'vertebras_toracicas', 'pica_d1', 'pica_e1', 'pica_d2', 'pica_e2', 'pica_sup_d', 'pica_sup_e'].includes(id)
      || /_(post|bpost)$/.test(id)) return 'post';
  return 'ant';
}
function memoryView(id) {
  if (['ad', 'acd', 'marg_d', 'vcparva', 'sd_lat', 'sd_blat'].includes(id)) return 'dir';
  if (['ve', 'cx', 'se_blat'].includes(id)) return 'esq';
  return teachingView(id);
}

function renderRecall() {
  const { run, level } = activity;
  const { item, round, kind } = run;
  const memory = round === 3;
  const view = memory ? memoryView(item.id) : teachingView(item.id);
  showStructure(item.id, { view, close: memory, layout: 'recall-layout', controls: true, ...regionScope(level) });
  const title = kind === 'level' ? level.title : { daily: 'Daily review', day: 'Structure of the day', weak: 'Drill weakest' }[kind];
  if (viewerStatus !== 'ready') {
    const loading = viewerStatus === 'loading';
    return `<div class="prompt"><h1>${escape(title)}</h1>
      <p role="status">${loading ? 'Waiting for the 3D model…' : 'The 3D model is required for recall.'}</p>
      <div class="actions">${loading ? '' : button('Retry 3D model', loadViewer, { class: 'primary' })}
        ${button('Back', () => setPage(page))}</div></div>`;
  }
  const label = kind === 'level' ? `Round ${round} · ${ROUND_NAMES[round - 1]}` : 'From memory';
  const clue = memory ? "Name the highlighted structure from memory." : round === 2 || run.hint ? (material.ROUND_CLUES[item.id]) : round === 1 ? 'Type over the letters. Spaces fill automatically.' : 'Name the highlighted structure.';
  const primary = round === 1 ? '' : button('Check answer', checkRecall, { class: 'primary check', icon: 'check' });
  return `<div class="recall">
    <div class="recall-top">
      <div><h1>${escape(title)}</h1><span class="eyebrow">${label}</span></div>
      <div class="stats" aria-label="Round statistics"><span id="wpm-stat" hidden><b id="wpm"></b> wpm</span>
        <span><b id="accuracy">${run.accuracy}</b>%</span><span><b id="round-done">${run.results[round].correct.size}</b> / ${run.ids.length} recalled</span><span id="review-count"></span></div>
    </div>
    <p class="view-banner">${escape(views[view])} view</p><div class="answer-area">
      <label for="typer" id="word" class="word" aria-hidden="true"></label>
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
  if (event.isComposing || activity?.type !== 'recall' || viewerStatus !== 'ready') return;
  const input = event.target;
  const { run } = activity;
  const text = input.value.normalize('NFC');
  if (run.round === 1) {
    input.value = '';
    if (text) typeText(text);
    return;
  }
  if (!run.feedback) {
    run.typed = text.replace(answerCharacters, '').replace(/ +/g, ' ').trimStart().slice(0, 100);
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
  const entered = round === 2 && typed && typed[0].toLowerCase() !== name[0].toLowerCase() ? name[0] + typed : typed;
  const shown = feedback ? name : (round === 1 || hint) ? [...name].map((letter, index) => {
    if (round === 1) return letter;
    if (entered[index]) return letter.toLowerCase() === entered[index].toLowerCase() ? letter : entered[index];
    return letter === ' ' ? ' ' : index === 0 ? letter : '·';
  }).join('') + typed.slice(name.length) : typed;
  const cursor = round === 1 ? position : round === 2 ? Math.max(1, entered.length) : typed.length;
  word.className = `word ${shown.length > 17 ? 'long' : shown.length > 11 ? 'medium' : ''} ${feedback ? feedback.correct ? 'solved' : 'revealed' : ''}`;
  if (wrong && !feedback && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
    line.className = 'feedback good';
    line.textContent = round === 1 ? 'Correct' : `${item.pt} · ${lessonCue(item.id)}`;
    if (round > 1) $('continue-actions').hidden = false;
    advanceTimer = setTimeout(advanceRecall, round === 1 ? 520 : 1100);
    return;
  }
  line.className = 'feedback bad';
  if (round === 3) $("clue").textContent = "Name the highlighted structure from memory.";
  const intro = feedback.near ? `So close. It’s spelled ${item.typing}.`
    : feedback.confusion ? `You named ${feedback.confusion.pt}. This is ${item.pt}.`
    : feedback.reveal ? `This is ${item.pt}.` : `You typed “${feedback.guess}”. This is ${item.pt}.`;
  const clue = lessonCue(item.id).trimEnd();
  const punctuation = /[.!?…]$/.test(clue) ? '' : '.';
  line.textContent = `${intro} ${clue}${punctuation}${feedback.requeued ? ' It will come up again.' : ''}`;
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
    if (run.kind === 'daily') recordLaterRecall(progress, last, today);
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
  const next = level && LEVELS[LEVELS.indexOf(level) + 1];
  const wpm = displayWpm(run);
  const nextDue = run.ids.map(id => progress.cards[id]?.due).filter(Boolean).sort()[0];
  const caption = level ? level.title : { daily: 'Daily review', day: 'Structure of the day', weak: 'Drill weakest' }[run.kind];
  const title = level ? passedLevel(level) ? 'Level passed' : 'Rounds complete' : 'Recall complete';
  const clinical = level ? run.ids.map(id => CONTENT[id]?.oral?.clinical?.[0]).find(Boolean) : null;
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
      ${level ? button('Redo the lesson', () => launch('lesson', { level, index: 0 })) : ''}
      ${button(level ? 'Back to map' : run.kind === 'weak' ? 'Back to progress' : 'Back to daily', () => setPage(level ? 'map' : run.kind === 'weak' ? 'progress' : 'daily'), { icon: 'arrow-left' })}
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
    <div class="study-row"><div><h2>Mock oral exam</h2><p>Two structures and one theory question.</p></div>
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
    title: REGION_CONTEXT[level.region] ? 'Mediastinum & thoracic wall' : ITEMS[id].deck.titulo,
    context: REGION_CONTEXT[level.region] || ITEMS[id].deck.ctx, focus: done ? [id] : [],
    view: state.direction || 'ant', controls: true, pick: Boolean(viewer && !done), preserveCamera: Boolean(tries),
  });
  function next() {
    if (index + 1 === ids.length) {
      recordActivity();
      activity = { type: 'complete', title: 'Find it complete', label: level.title, description: `${state.correct} of ${ids.length} structures located.`, level };
    } else {
      Object.assign(state, { index: index + 1, tries: 0, done: false, feedback: '', direction: 'ant' });
    }
    render({ activate: true });
  }
  return `<div class="prompt"><div class="eyebrow">Find it / ${index + 1} of ${ids.length}</div>
    <h1>${escape(ITEMS[id].pt)}</h1>
    <p>${viewer ? 'Select this structure on the model. Drag to rotate.' : 'The 3D model is required to locate this structure.'}</p>
    ${viewer && !done ? '<p class="support">Use the arrow keys to aim, then select “Pick at crosshair”.</p>' : ''}
    <p class="feedback ${done && state.hit ? 'good' : 'bad'}" role="status">${escape(feedback)}</p>
    <div class="actions">${done ? button(index + 1 === ids.length ? 'See results' : 'Next structure', next, { class: 'primary', key: 'Enter', iconEnd: 'arrow-right' })
      : viewer ? button('Reveal on model', () => findPick(undefined, true), { icon: 'eye' }) : button('Back to level', () => setPage('map'), { icon: 'arrow-left' })}</div></div>`;
}

function findPick(id, reveal = false) {
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
  const questions = shuffle(level.ids.flatMap(id => availableQuestions(id).slice(0, 1).map(question => ({ question, id }))));
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
    ${answered ? `<p class="feedback ${state.answer === question.answer ? 'good' : 'bad'}" role="status">
      <strong>${state.answer === question.answer ? 'Correct. ' : 'Answer: ' + escape(question.options[question.answer]) + '. '}</strong>${escape(question.why)}</p>` : ''}
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

function oralSections(id) {
  const oral = CONTENT[id]?.oral;
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
  const card = CONTENT[id];
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
  const eligible = IDS.filter(id => CONTENT[id]?.prompt && CONTENT[id].followups?.length && oralSections(id).length);
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
    id, prompt: CONTENT[id].prompt, sections: oralSections(id),
    followup: shuffle(CONTENT[id].followups)[0], grades: [],
  }));
  questions.push({ prompt: theory.q, answer: theory.a, grades: [] });
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
  const sections = followup
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
      if (question.id && !followup) state.followup = true;
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
  const label = !revealed ? 'Reveal' : question.id && !followup ? 'Examiner follow-up'
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
  const seen = IDS.filter(id => progress.cards[id]);
  return (seen.length ? seen : LEVELS[0].ids).slice().sort((left, right) => {
    const a = progress.cards[left];
    const b = progress.cards[right];
    return (a?.box || 0) - (b?.box || 0) || (b?.lapses || 0) - (a?.lapses || 0)
      || (a?.due || '').localeCompare(b?.due || '');
  }).slice(0, 6);
}

function renderProgress() {
  const totalStars = LEVELS.reduce((total, level) => total + stars(level.id).filter(Boolean).length, 0);
  const seconds = Object.values(progress.activity).reduce((sum, duration) => sum + (Number(duration) || 0), 0);
  const weakest = weakestIds();
  return `<div class="screen progress">
    <div class="page-head"><h1>Progress</h1></div>
    <div class="metrics"><div><b>${totalStars}</b><span>of ${LEVELS.length * 3} stars</span></div>
      <div><b>${streak(progress)}</b><span>day streak</span></div><div><b>${seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m`}</b><span>study time</span></div></div>
    <div class="study-row"><div><h2>Weakest structures</h2><p>${weakest.map(id => escape(ITEMS[id].pt)).join(' · ')}</p></div>
      ${weakest.length ? button('Drill weakest', () => beginRecall(weakest, 'weak'), { class: 'primary' }) : ''}</div>
    <div class="study-row"><div><h2>Mock oral exam</h2>
      ${progress.mocks.length ? list(progress.mocks.slice(-5).reverse().map(entry => `${entry.date} · ${mockScore(entry)}`))
        : '<p>Completed exams will appear here.</p>'}</div>
      ${button('Mock exam', startMock)}</div>
    <h2>Mastery by region</h2>
    ${REGIONS.map(region => `<details><summary>${escape(region.title)} <span class="muted">${region.ids.filter(id => progress.cards[id]?.box === 5).length}/${region.ids.length} mastered</span></summary>
      <div class="progress-levels">${region.levels.map(level => `<div><span>${escape(level.title)}</span>${starsHTML(level.id)}</div>`).join('')}</div>
      <div class="mastery">${region.ids.map(id => {
        const card = progress.cards[id];
        const value = (card?.box || 0) * 20;
        return `<div><span>${escape(ITEMS[id].pt)}</span><meter max="100" value="${value}" aria-label="${escape(ITEMS[id].pt)} mastery"></meter>
          <span>${value}%</span><span class="muted">${card ? card.due <= day() ? 'Due' : card.due : 'Unstudied'}</span></div>`;
      }).join('')}</div></details>`).join('')}
  </div>`;
}

function atlasSearchText(id) {
  const item = ITEMS[id];
  return fold(`${item.pt} ${ATLAS_REGION[id] || ''} ${item.deck.titulo}`);
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
  return ATLAS_GROUPS.map(group => {
    const shown = group.ids.filter(id => !atlas.hidden.has(id)).length;
    const rows = group.ids.map(id => {
      const item = ITEMS[id];
      if (!item) return '';
      const filtered = query ? !atlasSearchText(id).includes(query) : false;
      const selected = atlas.focus.includes(id);
      return `<div class="atlas-item" data-atlas-item ${filtered ? 'hidden' : ''}>
        <label class="atlas-visibility"><input type="checkbox" data-atlas-toggle="${id}" ${atlas.hidden.has(id) ? '' : 'checked'} aria-label="Show ${escape(item.pt)}"></label>
        <button type="button" class="atlas-name${selected ? ' chosen' : ''}" data-atlas-id="${id}" aria-pressed="${selected}">${escape(item.pt)}</button>
      </div>`;
    }).join('');
    const filteredOut = query ? !group.ids.some(id => !atlasSearchText(id).includes(query)) : false;
    return `<section class="atlas-group" ${filteredOut ? 'hidden' : ''}>
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
    focus, frameFocus: focus.length > 0, preserveCamera: focus.length > 0,
  });
  const anyMatch = ATLAS_GROUPS.some(group => group.ids.some(id => !query || atlasSearchText(id).includes(query)));
  queueMicrotask(syncAtlasGroups);
  return `<div class="atlas-content">
    <div class="page-head"><h1>Atlas</h1><p>All ${ATLAS_IDS.length} structures on one model. Show or hide parts, then click a name or the model to focus it. The thoracic skeleton starts hidden; tick it in the list to show it.</p></div>
    <button type="button" class="button atlas-drawer-toggle" id="atlas-drawer-toggle" data-atlas-drawer="open" aria-controls="atlas-panel" aria-expanded="false">${icon('layers', 16)}Structures <b id="atlas-drawer-count">${visible.length}</b></button>
    ${atlasDetailMarkup()}
    <aside class="atlas-panel" id="atlas-panel" aria-label="Atlas structures">
      <div class="atlas-panel-head"><h2>Structures</h2><span id="atlas-visible-count">${visible.length} of ${ATLAS_IDS.length} shown</span>
        <button type="button" class="atlas-close" data-atlas-drawer="close" aria-label="Close structure list" title="Close structure list">${icon('x', 20)}</button></div>
      <input id="atlas-search" type="search" value="${escape(atlas.query)}" placeholder="Search by name or region" aria-label="Search structures" autocomplete="off">
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

function syncAtlasChecks() {
  document.querySelectorAll('[data-atlas-toggle]').forEach(box => {
    box.checked = !atlas.hidden.has(box.dataset.atlasToggle);
  });
}

function syncAtlasSelection() {
  document.querySelectorAll('.atlas-name[data-atlas-id]').forEach(node => {
    const on = atlas.focus.includes(node.dataset.atlasId);
    node.classList.toggle('chosen', on);
    node.setAttribute('aria-pressed', String(on));
  });
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
  for (const group of ATLAS_GROUPS) {
    const box = document.querySelector(`[data-atlas-region="${group.id}"]`);
    if (!box) continue;
    const visible = group.ids.filter(id => !atlas.hidden.has(id)).length;
    box.checked = visible === group.ids.length;
    box.indeterminate = visible > 0 && visible < group.ids.length;
    const label = box.closest('.atlas-group-head')?.querySelector('small');
    if (label) label.textContent = `${visible}/${group.ids.length}`;
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
    focus: atlas.focus, frameFocus: frame && atlas.focus.length > 0, preserveCamera: preserve,
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
  atlasApply({ preserve: focus.length > 0, frame: focus.length > 0 });
  if (fromDrawer) document.querySelector('.model-shell')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
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
  let matches = 0;
  for (const row of document.querySelectorAll('#atlas-list [data-atlas-item]')) {
    const id = row.querySelector('[data-atlas-toggle]')?.dataset.atlasToggle;
    const show = !query || Boolean(id && atlasSearchText(id).includes(query));
    row.hidden = !show;
    if (show) matches++;
  }
  for (const group of document.querySelectorAll('#atlas-list .atlas-group')) {
    group.hidden = ![...group.querySelectorAll('[data-atlas-item]')].some(row => !row.hidden);
  }
  const empty = $('atlas-empty');
  if (empty) {
    empty.hidden = matches > 0;
    empty.textContent = `No structures match “${value.trim()}”.`;
  }
}

function setAtlasDrawer(open, { restoreFocus = true } = {}) {
  atlas.open = open;
  $('atlas-panel')?.classList.toggle('open', open);
  const backdrop = $('atlas-backdrop');
  if (backdrop) backdrop.hidden = !open;
  document.body.classList.toggle('atlas-drawer-open', open);
  $('atlas-drawer-toggle')?.setAttribute('aria-expanded', String(open));
  if (open) requestAnimationFrame(() => requestAnimationFrame(() => $('atlas-search')?.focus({ preventScroll: true })));
  else if (restoreFocus) $('atlas-drawer-toggle')?.focus({ preventScroll: true });
}

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
  if (nav) return setPage(nav.dataset.nav);
  const control = event.target.closest('[data-action]');
  if (control && !control.disabled) actions[Number(control.dataset.action)]?.();
});

document.addEventListener('keydown', event => {
  if (event.isComposing || event.ctrlKey || event.metaKey || event.altKey) return;
  const { key, target } = event;
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
  if (activity?.type === 'find' && viewer && model?.pick && (!control || target === $('pick-center')) && key.startsWith('Arrow')) {
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
  if (page === 'atlas') atlas.view = direction;
  viewer?.view(direction);
});
$('pick-center').addEventListener('click', () => viewer?.pickCenter());
$('view-zoom-in').addEventListener('click', () => viewer?.zoom(.8));
$('view-zoom-out').addEventListener('click', () => viewer?.zoom(1.25));
$('view-reset').addEventListener('click', () => viewer?.resetView());
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
  } else if (activity?.type === 'find') render();
  else updateModel();
}

async function loadViewer() {
  viewerStatus = 'loading';
  $('model-status').hidden = false;
  $('view-fallback').hidden = true;
  if (activity?.type === 'recall') render();
  try {
    const { createViewer } = await import('./viewer.js?v=36');
    viewer = await createViewer($('view'), findPick, showViewFallback, handleExplore);
    viewerStatus = 'ready';
    if ($('view-isolate').getAttribute('aria-pressed') === 'true') viewer.setIsolate(true);
    const ghost = Number($('view-ghost').value) / 100;
    if (ghost !== 1) viewer.setGhost(ghost);
    const rotate = $('view-rotate');
    if (rotate.getAttribute('aria-pressed') === 'true') {
      rotate.setAttribute('aria-pressed', String(viewer.setAutoRotate(true)));
    }
    $('model-status').hidden = true;
    if (activity?.type === 'recall') {
      render();
      if (activity.run.feedback) showRecallFeedback();
    } else if (activity?.type === 'find') render();
    else updateModel();
  } catch {
    showViewFallback();
  }
}

render();
void loadViewer();
