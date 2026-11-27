// SpeedMSK · Bone atlas.
// Reuses the site viewer (viewer.js), the study pack + global item registry
// (study.js) and the answer matcher from the typing engine (typing.js).
// Practice modes mirror the curriculum: Find it, Name it and Type it.

import { createViewer } from './viewer.js?v=115';
import { ITEMS, initStudy, fold, shuffle } from './study.js?v=115';
import { judge, normalize } from './typing.js?v=149';
import { correctSound, isMuted, keySound, setMuted, wrongKeySound } from './sound.js?v=148';
import { BONE_ALL, BONE_AREAS, BONE_IMPORTANT, BONE_MEMBER_NAMES, BONE_PROFESSOR } from './subjects/msk/bone-atlas.js?v=3';

const params = new URLSearchParams(location.search);
let lang = params.get('lang');
if (!['en', 'pt-BR'].includes(lang)) {
  try { lang = localStorage.getItem('anatomy_language') === 'pt-BR' ? 'pt-BR' : 'en'; } catch { lang = 'en'; }
}
document.documentElement.lang = lang;

const T = (en, pt) => lang === 'pt-BR' ? pt : en;
const L = pair => Array.isArray(pair) ? (lang === 'pt-BR' ? pair[1] ?? pair[0] : pair[0]) : pair;
const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[char]);

const VIEWS = {
  ant: ['Anterior', 'Anterior'],
  post: ['Posterior', 'Posterior'],
  dir: ['Right lateral', 'Lateral direita'],
  esq: ['Left lateral', 'Lateral esquerda'],
  sup: ['Superior', 'Superior'],
  inf: ['Inferior', 'Inferior'],
};
const MODES = [
  { id: 'explore', name: ['Explore', 'Explorar'],
    note: ['Click a bone to read its name. Pick entries from the list.', 'Clique em um osso para ler o nome. Escolha entradas na lista.'] },
  { id: 'find', name: ['Find it', 'Encontrar'],
    note: ['A name is shown; select that bone on the model.', 'Um nome aparece; selecione esse osso no modelo.'] },
  { id: 'name', name: ['Name it', 'Nomear'],
    note: ['A bone is highlighted; type its anatomical name.', 'Um osso é destacado; digite o nome anatômico.'] },
  { id: 'type', name: ['Type it', 'Digitar'],
    note: ['Type the name letter by letter over the hint.', 'Digite o nome letra por letra sobre a dica.'] },
];
const LISTS = [
  { id: 'all', name: ['All bones', 'Todos os ossos'],
    note: ['Every individual mesh: left and right, and each finger, toe, rib and vertebra separately.', 'Cada malha individual: lados e cada dedo, artelho, costela e vértebra separadamente.'] },
  { id: 'essential', name: ['Essentials', 'Essenciais'],
    note: ['One entry per bone type; sides and numbered copies merged.', 'Uma entrada por tipo de osso; lados e cópias numeradas reunidos.'] },
  { id: 'professor', name: ['Professor’s', 'Da professora'],
    note: ['Only bone types covered in the professor’s material.', 'Apenas tipos de ossos abordados no material da professora.'] },
];
const STOP = new Set(['bone', 'bones', 'osso', 'ossos', 'the', 'of', 'de', 'do', 'da', 'dos', 'das', 'and', 'e']);
const coarsePointer = matchMedia('(pointer: coarse)');

const sourcePack = (await import('./subjects/msk/index.js?v=122')).default;
const localization = lang === 'pt-BR' ? await import('./translations/localize.js?v=159') : null;
const pack = localization ? localization.localizePack(sourcePack) : sourcePack;
const structureNames = Object.fromEntries(Object.entries(BONE_MEMBER_NAMES).map(([id, names]) =>
  [id, lang === 'pt-BR' ? names[1] ?? names[0] : names[0]]));
initStudy(pack, { structureNames });
if (localization) localization.installInterfaceTranslation();
const manifestPromise = fetch('./msk/models.json?v=2', { cache: 'no-store' })
  .then(response => response.ok ? response.json() : null)
  .catch(() => null);

const AREA_BY_ID = Object.fromEntries(BONE_AREAS.map(entry => [entry.id, entry]));
const listAliases = { important: 'essential', general: 'all' };
const requestedList = listAliases[params.get('list')] || params.get('list');
const state = {
  area: BONE_AREAS.some(entry => entry.id === params.get('area')) ? params.get('area') : 'all',
  mode: MODES.some(entry => entry.id === params.get('mode')) ? params.get('mode') : 'explore',
  list: LISTS.some(entry => entry.id === requestedList) ? requestedList : 'professor',
  selected: null,
  selectedMember: null,
  find: null,
  name: null,
  type: null,
};
let viewDir = 'ant';
let viewer = null;
let rotateOn = false;
let isolateOn = false;
let actions = [];

const area = () => AREA_BY_ID[state.area] || BONE_AREAS[0];
const listMeta = () => LISTS.find(entry => entry.id === state.list) || LISTS[LISTS.length - 1];
const entryList = () => state.list === 'all' ? BONE_ALL : state.list === 'professor' ? BONE_PROFESSOR : BONE_IMPORTANT;
const entriesInArea = areaId => {
  const target = AREA_BY_ID[areaId];
  if (!target) return [];
  const allowed = new Set(target.ids);
  return entryList().filter(entry => entry.ids.every(id => allowed.has(id)));
};
const activeIdsFor = areaId => [...new Set(entriesInArea(areaId).flatMap(entry => entry.ids))];
const activeIds = () => activeIdsFor(state.area);
const boneName = id => {
  const names = BONE_MEMBER_NAMES[id];
  return names ? L(names) : (ITEMS[id]?.pt || id);
};

function visibleEntries() {
  return entriesInArea(state.area);
}

function ensureArea() {
  if (entriesInArea(state.area).length) return false;
  const fallback = BONE_AREAS.find(item => entriesInArea(item.id).length);
  if (fallback) {
    state.area = fallback.id;
    viewDir = area().view || 'ant';
    return true;
  }
  return false;
}

function selectedEntry() {
  if (!state.selected) return null;
  return entryList().find(entry => entry.key === state.selected) || null;
}

function currentEntry() {
  const session = state[state.mode];
  return session ? session.order[session.index] || null : null;
}

function highlightIds() {
  if (state.mode === 'explore') {
    const entry = selectedEntry();
    if (!entry) return [];
    return state.selectedMember && entry.ids.includes(state.selectedMember) ? [state.selectedMember] : entry.ids;
  }
  if (state.mode === 'find') return state.find?.done ? currentEntry()?.ids || [] : [];
  return currentEntry()?.ids || [];
}

function action(fn) {
  const index = actions.push(fn) - 1;
  return `data-at-action="${index}"`;
}

function button(label, fn, options = {}) {
  return `<button type="button" class="button ${options.class || ''}${options.primary ? ' primary' : ''}" ${action(fn)}${options.attrs ? ` ${options.attrs}` : ''}${options.disabled ? ' disabled' : ''}>${label}</button>`;
}

function matcherFor(entries) {
  const keysOf = entry => [...new Set(entry.keys.map(key => normalize(key, STOP)).filter(Boolean))];
  const candidates = entries.map((entry, slot) => ({ slot, keys: keysOf(entry) }));
  return { candidates, universe: new Set(candidates.flatMap(candidate => candidate.keys)) };
}

function startSession() {
  const entries = visibleEntries();
  if (state.mode === 'find') {
    state.find = { order: shuffle(entries), index: 0, tries: 0, done: false, hit: false, feedback: '', correct: 0, finished: false };
  } else if (state.mode === 'name') {
    state.name = { order: shuffle(entries), index: 0, value: '', feedback: null, correct: 0, finished: false, matcher: matcherFor(entries) };
  } else if (state.mode === 'type') {
    state.type = { order: shuffle(entries), index: 0, position: 0, wrong: false, feedback: null, correct: 0, finished: false };
  }
}

function setArea(id) {
  if (state.area === id || !entriesInArea(id).length) return;
  state.area = id;
  viewDir = area().view || 'ant';
  state.selected = null;
  state.selectedMember = null;
  startSession();
  render({ preserveCamera: false });
}

function setMode(id) {
  if (state.mode === id) return;
  state.mode = id;
  state.selected = null;
  state.selectedMember = null;
  startSession();
  render();
}

function setList(id) {
  if (state.list === id) return;
  state.list = id;
  state.selected = null;
  state.selectedMember = null;
  ensureArea();
  startSession();
  // The visible set changes with the list; re-frame so bilateral areas (hands,
  // feet) are centred on both sides instead of keeping an old zoom.
  render({ preserveCamera: false });
}

function selectEntry(entry) {
  state.selected = entry.key;
  state.selectedMember = null;
  state.mode = 'explore';
  render();
}

function render({ preserveCamera = true } = {}) {
  actions = [];
  renderAreas();
  renderModes();
  renderSets();
  renderList();
  renderPrompt();
  syncToolbar();
  document.getElementById('at-model-label').textContent = L(area().name);
  document.getElementById('at-angle').textContent = `${L(VIEWS[viewDir])} · ${T('L/R = patient’s', 'L/D = do paciente')}`;
  const directions = document.getElementById('at-direction');
  if (directions.value !== viewDir) directions.value = viewDir;
  paint({ preserveCamera });
}

function renderAreas() {
  const host = document.getElementById('at-areas');
  const emptyNames = [];
  host.innerHTML = BONE_AREAS.map(entry => {
    const count = entriesInArea(entry.id).length;
    const empty = count === 0;
    if (empty) emptyNames.push(L(entry.name));
    const pressed = entry.id === state.area;
    return `<button type="button" class="at-chip" aria-pressed="${pressed}"${empty ? ' disabled aria-disabled="true"' : ''}${empty ? '' : ` ${action(() => setArea(entry.id))}`} title="${empty ? T('No entries in this list', 'Sem entradas nesta lista') : ''}">${escape(L(entry.name))}${empty ? ' <small>0</small>' : ''}</button>`;
  }).join('');
  document.getElementById('at-area-count').textContent = `${activeIds().length} ${T('meshes', 'malhas')}`;
  const note = document.getElementById('at-area-note');
  if (note) {
    note.hidden = !emptyNames.length;
    note.textContent = emptyNames.length
      ? `${emptyNames.join(' · ')} — ${T('no entries in this list', 'sem entradas nesta lista')}` : '';
  }
}

function renderModes() {
  const host = document.getElementById('at-modes');
  host.innerHTML = MODES.map(entry =>
    `<button type="button" aria-pressed="${entry.id === state.mode}" ${action(() => setMode(entry.id))}>${escape(L(entry.name))}</button>`,
  ).join('');
  document.getElementById('at-mode-note').textContent = L(MODES.find(entry => entry.id === state.mode)?.note || ['', '']);
}

function renderSets() {
  const host = document.getElementById('at-sets');
  host.innerHTML = LISTS.map(entry =>
    `<button type="button" aria-pressed="${entry.id === state.list}" ${action(() => setList(entry.id))}>${escape(L(entry.name))}</button>`,
  ).join('');
  const note = document.getElementById('at-list-note');
  if (note) note.textContent = L(listMeta().note);
}

function renderList() {
  const entries = visibleEntries();
  document.getElementById('at-count').textContent = `${entries.length}`;
  const host = document.getElementById('at-list');
  host.innerHTML = entries.length ? entries.map(entry => {
    const chosen = state.selected === entry.key;
    return `<button type="button" class="at-row${chosen ? ' chosen' : ''}" ${chosen ? 'aria-current="true"' : ''} ${action(() => selectEntry(entry))}>
      <span>${escape(L(entry.name))}</span>${entry.ids.length > 1 ? `<small>${entry.ids.length}</small>` : ''}
    </button>`;
  }).join('') : `<p class="at-empty">${T('No entries in this list for this area. Choose another area.', 'Sem entradas nesta lista para esta área. Escolha outra área.')}</p>`;
}

function renderPrompt() {
  const html = state.mode === 'explore' ? explorePrompt()
    : state.mode === 'find' ? findPrompt()
      : state.mode === 'name' ? namePrompt()
        : typePrompt();
  document.getElementById('at-prompt').innerHTML = html;
  if (!coarsePointer.matches) requestAnimationFrame(focusPrompt);
}

function explorePrompt() {
  const entry = selectedEntry();
  const count = activeIds().length;
  if (!entry) {
    return `<div class="at-prompt-head">
        <div><div class="eyebrow">${escape(L(listMeta().name))}</div><h1>${escape(L(area().name))}</h1></div>
        <span class="at-badge accent">${count} ${T('meshes', 'malhas')}</span>
      </div>
      <p>${escape(L(area().note))}</p>
      <p class="at-note">${count} ${T('of', 'de')} ${area().ids.length} ${T('meshes shown for this list.', 'malhas mostradas nesta lista.')}</p>
      <p class="at-note">${T('Click any bone on the model, or pick an entry from the list. Drag to rotate, scroll to zoom.',
        'Clique em qualquer osso no modelo ou escolha uma entrada na lista. Arraste para girar, role para ampliar.')}</p>
      <div class="at-actions">${button(T('Find it', 'Encontrar'), () => setMode('find'))}${button(T('Name it', 'Nomear'), () => setMode('name'))}${button(T('Type it', 'Digitar'), () => setMode('type'))}</div>`;
  }
  const member = state.selectedMember && entry.ids.includes(state.selectedMember) ? state.selectedMember : null;
  const title = member ? boneName(member) : L(entry.name);
  const eyebrow = member ? T('Selected bone', 'Osso selecionado') : T('Selected structure', 'Estrutura selecionada');
  const meta = member
    ? `${T('Part of', 'Parte de')} ${escape(L(entry.name))} · ${entry.ids.length} ${T('meshes', 'malhas')}`
    : `${entry.ids.length} ${T(entry.ids.length === 1 ? 'mesh' : 'meshes', entry.ids.length === 1 ? 'malha' : 'malhas')}`;
  return `<div class="at-prompt-head">
      <div><div class="eyebrow">${eyebrow}</div><h1>${escape(title)}</h1></div>
      <span class="at-badge accent">${escape(L(AREA_BY_ID[entry.area]?.name || ['', '']))}</span>
    </div>
    <p>${escape(L(entry.cue))}</p>
    <p class="at-meta"><span>${meta}</span></p>
    <div class="at-actions">${button(T('Clear selection', 'Limpar seleção'), () => { state.selected = null; state.selectedMember = null; render(); })}</div>`;
}

function findPrompt() {
  const session = state.find;
  if (!session) return '';
  if (session.finished) return resultPrompt(session, 'find');
  const entry = session.order[session.index];
  if (!entry) return '';
  const done = session.done;
  return `<div class="at-prompt-head">
      <div><div class="eyebrow">${T('Find it', 'Encontrar')} · ${session.index + 1} / ${session.order.length}</div><h1>${escape(L(entry.name))}</h1></div>
      <span class="at-badge">${session.correct} ${T('correct', 'certas')}</span>
    </div>
    <p>${done ? escape(L(entry.cue)) : T('Select this structure on the model. Drag to rotate.', 'Selecione esta estrutura no modelo. Arraste para girar.')}</p>
    <p class="at-feedback${done ? (session.hit ? ' good' : ' bad') : ''}" role="status">${escape(session.feedback)}</p>
    <div class="at-actions">
      ${done
        ? button(T('Next structure', 'Próxima estrutura'), nextFind, { primary: true, attrs: 'id="at-next"' })
        : button(T('Reveal on model', 'Mostrar no modelo'), revealFind)}
    </div>`;
}

function namePrompt() {
  const session = state.name;
  if (!session) return '';
  if (session.finished) return resultPrompt(session, 'name');
  const entry = session.order[session.index];
  if (!entry) return '';
  const feedback = session.feedback;
  return `<div class="at-prompt-head">
      <div><div class="eyebrow">${T('Name it', 'Nomear')} · ${session.index + 1} / ${session.order.length}</div><h1>${T('Name the highlighted structure', 'Nomeie a estrutura destacada')}</h1></div>
      <span class="at-badge">${session.correct} ${T('correct', 'certas')}</span>
    </div>
    <input id="at-answer" class="at-input" type="text" autocomplete="off" autocorrect="off" autocapitalize="sentences" spellcheck="false" enterkeyhint="done" aria-label="${T('Your answer', 'Sua resposta')}" placeholder="${T('Type the name', 'Digite o nome')}" value="${escape(session.value)}"${feedback ? ' disabled' : ''}>
    <p class="at-feedback${feedback ? (feedback.good ? ' good' : ' bad') : ''}" role="status">${feedback ? escape(feedback.text) : ''}</p>
    <div class="at-actions">
      ${feedback
        ? button(T('Next', 'Próxima'), () => nextPrompt('name'), { primary: true, attrs: 'id="at-next"' })
        : button(T('Check answer', 'Conferir'), checkName, { primary: true, attrs: 'id="at-check"' })}
    </div>
    ${feedback ? `<p class="at-note">${escape(L(entry.cue))}</p>` : ''}`;
}

function typePrompt() {
  const session = state.type;
  if (!session) return '';
  if (session.finished) return resultPrompt(session, 'type');
  const entry = session.order[session.index];
  if (!entry) return '';
  const label = L(entry.say);
  const complete = Boolean(session.feedback);
  const word = [...label].map((char, index) => {
    if (complete) return `<span class="ink">${escape(char)}</span>`;
    const className = `${index < session.position ? 'ink' : 'ghost'}${index === session.position ? ' caret' : ''}${session.wrong && index === session.position ? ' wrong' : ''}`;
    return `<span class="${className}">${escape(char)}</span>`;
  }).join('') + (!complete && session.position >= label.length ? '<span class="caret"></span>' : '');
  const size = label.length > 17 ? ' long' : label.length > 11 ? ' medium' : '';
  return `<div class="at-prompt-head">
      <div><div class="eyebrow">${T('Type it', 'Digitar')} · ${session.index + 1} / ${session.order.length}</div><h1>${T('Type the highlighted name', 'Digite o nome destacado')}</h1></div>
      <span class="at-badge">${session.correct} ${T('correct', 'certas')}</span>
    </div>
    <div class="word at-word${size}${complete ? (session.feedback.good ? ' solved' : ' revealed') : ''}" id="at-word" data-at-focus-typer role="textbox" tabindex="0" aria-label="${T('Type the name letter by letter', 'Digite o nome letra por letra')}">${word}</div>
    <input id="at-typer" class="at-typer" type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="done" aria-label="${T('Typed answer', 'Resposta digitada')}">
    <p class="at-feedback${complete ? (session.feedback.good ? ' good' : ' bad') : ''}" role="status">${complete ? escape(session.feedback.text) : ''}</p>
    <div class="at-actions">
      ${complete
        ? button(T('Next', 'Próxima'), () => nextPrompt('type'), { primary: true, attrs: 'id="at-next"' })
        : `${button(T('Type answer', 'Digitar resposta'), focusTyper, { class: 'type-button' })}${button(T('Show answer', 'Mostrar resposta'), revealType)}`}
    </div>
    ${complete ? `<p class="at-note">${escape(L(entry.cue))}</p>` : ''}`;
}

function resultPrompt(session, kind) {
  const title = kind === 'find' ? T('Find it complete', 'Encontrar concluído')
    : kind === 'name' ? T('Name it complete', 'Nomear concluído') : T('Type it complete', 'Digitar concluído');
  return `<div class="at-prompt-head">
      <div><div class="eyebrow">${title}</div><h1>${session.correct} / ${session.order.length}</h1></div>
      <span class="at-badge accent">${escape(L(area().name))}</span>
    </div>
    <p>${session.correct} ${T('of', 'de')} ${session.order.length} ${kind === 'find' ? T('located', 'localizados') : T('correct', 'corretos')}.</p>
    <div class="at-actions">
      ${button(T('Practise again', 'Praticar de novo'), () => { startSession(); render(); }, { primary: true })}
      ${button(T('Back to explore', 'Voltar a explorar'), () => setMode('explore'))}
    </div>`;
}

function handlePick(id) {
  const session = state.find;
  if (state.mode !== 'find' || !session || session.done || session.finished) return;
  const entry = session.order[session.index];
  if (!entry) return;
  if (!id) {
    session.feedback = T('No structure at that point. Rotate the model and try again.', 'Nenhuma estrutura nesse ponto. Gire o modelo e tente de novo.');
    render();
    return;
  }
  session.tries += 1;
  const hit = entry.ids.includes(id);
  session.hit = hit;
  session.done = hit || session.tries >= 2;
  if (hit) {
    session.correct += 1;
    correctSound();
  } else {
    wrongKeySound();
  }
  session.feedback = hit
    ? T(`Correct. ${L(entry.cue)}`, `Correto. ${L(entry.cue)}`)
    : session.done
      ? T(`Highlighted: ${L(entry.name)}. ${L(entry.cue)}`, `Destacado: ${L(entry.name)}. ${L(entry.cue)}`)
      : T(`That is ${boneName(id)}. One try left.`, `Esse é ${boneName(id)}. Resta uma tentativa.`);
  render();
}

function handleExplore(id) {
  if (state.mode !== 'explore' || !id) return;
  const entry = visibleEntries().find(item => item.ids.includes(id));
  if (!entry) return;
  state.selected = entry.key;
  state.selectedMember = id;
  render();
}

function revealFind() {
  const session = state.find;
  if (!session || session.done) return;
  const entry = session.order[session.index];
  session.done = true;
  session.hit = false;
  session.tries = 2;
  session.feedback = T(`Highlighted: ${L(entry.name)}. ${L(entry.cue)}`, `Destacado: ${L(entry.name)}. ${L(entry.cue)}`);
  render();
}

function nextFind() {
  const session = state.find;
  if (!session) return;
  if (session.index + 1 >= session.order.length) {
    session.finished = true;
    render();
    return;
  }
  session.index += 1;
  session.tries = 0;
  session.done = false;
  session.hit = false;
  session.feedback = '';
  render();
}

function checkName() {
  const session = state.name;
  if (!session || session.feedback || session.finished) return;
  const input = document.getElementById('at-answer');
  if (input) session.value = input.value;
  if (!session.value.trim()) {
    input?.focus();
    return;
  }
  const entry = session.order[session.index];
  const result = judge(session.value, session.matcher.candidates, session.matcher.universe, STOP);
  if (result.ok) {
    session.correct += 1;
    correctSound();
  } else {
    wrongKeySound();
  }
  session.feedback = {
    good: Boolean(result.ok),
    text: result.ok ? T('Correct.', 'Correto.')
      : result.ambiguous ? T('That name is shared by more than one entry. Be more specific.', 'Esse nome é compartilhado por mais de uma entrada. Seja mais específico.')
        : T(`Not quite. This is ${L(entry.name)}.`, `Quase. Esta estrutura é ${L(entry.name)}.`),
  };
  render();
}

function nextPrompt(kind) {
  const session = state[kind];
  if (!session) return;
  if (session.index + 1 >= session.order.length) {
    session.finished = true;
    render();
    return;
  }
  session.index += 1;
  if (kind === 'name') {
    session.value = '';
    session.feedback = null;
  } else {
    session.position = 0;
    session.wrong = false;
    session.feedback = null;
  }
  render();
}

function focusTyper() {
  document.getElementById('at-typer')?.focus({ preventScroll: true });
}

function drawTypeWord(wrong) {
  const session = state.type;
  if (!session) return;
  const host = document.getElementById('at-word');
  const entry = session.order[session.index];
  if (!host || !entry) return;
  const label = L(entry.say);
  host.innerHTML = [...label].map((char, index) =>
    `<span class="${index < session.position ? 'ink' : 'ghost'}${index === session.position ? ' caret' : ''}${wrong && index === session.position ? ' wrong' : ''}">${escape(char)}</span>`,
  ).join('') + (session.position >= label.length ? '<span class="caret"></span>' : '');
}

function typeInput(input) {
  const session = state.type;
  if (!session || session.feedback || session.finished) {
    input.value = '';
    return;
  }
  const entry = session.order[session.index];
  if (!entry) {
    input.value = '';
    return;
  }
  const label = L(entry.say);
  let wrong = false;
  for (const char of input.value) {
    const expected = label[session.position];
    if (expected === undefined) break;
    if (expected === ' ') {
      if (!char.trim()) session.position += 1; else wrong = true;
    } else if (!char.trim()) {
      continue;
    } else if (fold(char) === fold(expected)) {
      session.position += 1;
    } else {
      wrong = true;
    }
  }
  input.value = '';
  if (session.position >= label.length) {
    session.feedback = { good: true, text: T('Correct.', 'Correto.') };
    session.correct += 1;
    correctSound();
    render();
    return;
  }
  session.wrong = wrong;
  drawTypeWord(wrong);
  if (wrong) wrongKeySound(); else keySound();
}

function revealType() {
  const session = state.type;
  if (!session || session.feedback) return;
  const entry = session.order[session.index];
  if (!entry) return;
  session.position = [...L(entry.say)].length;
  session.feedback = { good: false, text: T(`This is ${L(entry.say)}.`, `Este é ${L(entry.say)}.`) };
  render();
}

function focusPrompt() {
  if (state.mode === 'name') {
    if (!state.name || state.name.finished) return;
    if (state.name.feedback) {
      document.getElementById('at-next')?.focus({ preventScroll: true });
      return;
    }
    const input = document.getElementById('at-answer');
    if (input) {
      input.focus({ preventScroll: true });
      input.setSelectionRange(input.value.length, input.value.length);
    }
  } else if (state.mode === 'type') {
    if (!state.type || state.type.finished) return;
    if (state.type.feedback) {
      document.getElementById('at-next')?.focus({ preventScroll: true });
      return;
    }
    focusTyper();
  }
}

function syncToolbar() {
  const isolate = document.getElementById('at-isolate');
  const hasFocus = highlightIds().length > 0;
  isolate.disabled = !hasFocus;
  if (!hasFocus && isolateOn) {
    isolateOn = false;
    viewer?.setIsolate(false);
  }
  isolate.setAttribute('aria-pressed', String(isolateOn));
  document.getElementById('at-rotate').setAttribute('aria-pressed', String(rotateOn));
}

function paint({ preserveCamera = true } = {}) {
  if (!viewer) return;
  const active = area();
  const ids = activeIds();
  const picking = state.mode === 'find' && Boolean(state.find) && !state.find.done && !state.find.finished;
  viewer.paint({
    ids,
    context: [],
    focus: highlightIds(),
    frameIds: ids,
    markerIds: [],
    atlas: true,
    view: viewDir,
    padding: active.padding || 1.12,
    explore: state.mode === 'explore',
    pick: Boolean(picking),
    pickIds: picking ? ids : undefined,
  }, preserveCamera);
}

function handleUnavailable() {
  const status = document.getElementById('model-status');
  status.hidden = false;
  status.textContent = T('3D view unavailable. Reload the page or check WebGL.', 'Visualização 3D indisponível. Recarregue a página ou verifique o WebGL.');
}

async function bootViewer() {
  const status = document.getElementById('model-status');
  try {
    viewer = await createViewer(document.getElementById('view'), handlePick, handleUnavailable, handleExplore, {
      ...pack, ...pack.model, preload: { manifest: manifestPromise }, markerSpace: 'world', markerSize: .008,
    });
    viewer.onReady(() => { status.hidden = true; });
    viewer.setGhost(.55);
    render({ preserveCamera: false });
  } catch (error) {
    console.error(error);
    handleUnavailable();
  }
}

function localizeStatic() {
  document.title = T('Bone atlas · SpeedMSK', 'Atlas dos ossos · SpeedMSK');
  const text = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  text('at-skip', T('Skip to the bone atlas', 'Ir para o atlas dos ossos'));
  text('at-nav-map', T('Map', 'Mapa'));
  text('at-nav-bone', T('Bone atlas', 'Atlas dos ossos'));
  text('at-nav-typing', T('Typing drills', 'Treino de digitação'));
  text('at-area-title', T('Area of study', 'Área de estudo'));
  text('at-mode-title', T('Mode', 'Modo'));
  text('at-list-title', T('Bones', 'Ossos'));
  text('at-reset-label', T('Reset view', 'Restaurar vista'));
  text('at-isolate-label', T('Isolate', 'Isolar'));
  text('at-rotate-label', T('Rotate', 'Girar'));
  document.getElementById('at-brand').setAttribute('aria-label', T('SpeedMSK home', 'Início do SpeedMSK'));
  document.querySelector('.at-nav').setAttribute('aria-label', T('Study pages', 'Páginas de estudo'));
  document.querySelector('.at-toolbar').setAttribute('aria-label', T('Model view', 'Vista do modelo'));
  document.getElementById('at-prompt').setAttribute('aria-label', T('Atlas prompt', 'Tarefa do atlas'));
  document.getElementById('view').setAttribute('aria-label', T('Rotatable 3D bones', 'Ossos 3D giráveis'));
  const zoomIn = document.getElementById('at-zoom-in');
  const zoomOut = document.getElementById('at-zoom-out');
  zoomIn.title = T('Zoom in', 'Aproximar');
  zoomIn.setAttribute('aria-label', zoomIn.title);
  zoomOut.title = T('Zoom out', 'Afastar');
  zoomOut.setAttribute('aria-label', zoomOut.title);
  const reset = document.getElementById('at-reset');
  reset.title = T('Reset view', 'Restaurar vista');
  reset.setAttribute('aria-label', reset.title);
  const isolate = document.getElementById('at-isolate');
  isolate.title = T('Show only the highlighted bone', 'Mostrar apenas o osso destacado');
  const rotate = document.getElementById('at-rotate');
  rotate.title = T('Auto-rotate the model', 'Girar o modelo automaticamente');
  document.querySelector('.at-side').setAttribute('aria-label', T('Atlas controls', 'Controles do atlas'));

  const mapUrl = new URL('./index.html', location.href);
  mapUrl.searchParams.set('s', 'msk');
  const typingUrl = new URL('./typing.html', location.href);
  typingUrl.searchParams.set('s', 'msk');
  const boneUrl = new URL('./atlas-bone.html', location.href);
  boneUrl.searchParams.set('s', 'msk');
  if (lang === 'pt-BR') {
    mapUrl.searchParams.set('lang', 'pt-BR');
    typingUrl.searchParams.set('lang', 'pt-BR');
    boneUrl.searchParams.set('lang', 'pt-BR');
  }
  document.getElementById('at-brand').href = mapUrl.href;
  document.getElementById('at-nav-map').href = mapUrl.href;
  document.getElementById('at-nav-typing').href = typingUrl.href;
  document.getElementById('at-nav-bone').href = boneUrl.href;
}

function renderDirections() {
  const select = document.getElementById('at-direction');
  select.innerHTML = Object.entries(VIEWS).map(([id, label]) =>
    `<option value="${id}">${escape(L(label))}</option>`).join('');
  select.value = viewDir;
}

const THEMES = ['dark', 'light', 'system'];
let theme = 'dark';
try {
  const saved = localStorage.getItem('sc2_theme');
  if (THEMES.includes(saved)) theme = saved;
} catch { /* storage unavailable */ }
const themeButton = document.getElementById('at-theme');
const themeLabel = value => value === 'light' ? T('Light theme', 'Tema claro')
  : value === 'system' ? T('System theme', 'Tema do sistema') : T('Dark theme', 'Tema escuro');

function applyTheme(next) {
  theme = THEMES.includes(next) ? next : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('sc2_theme', theme); } catch { /* session only */ }
  const light = theme === 'light' || (theme === 'system' && matchMedia('(prefers-color-scheme: light)').matches);
  document.querySelector('meta[name="theme-color"]').setAttribute('content', light ? '#f6f7fb' : '#08090b');
  themeButton.querySelector('use').setAttribute('href', theme === 'light' ? '#i-sun' : theme === 'dark' ? '#i-moon' : '#i-monitor');
  themeButton.setAttribute('aria-label', themeLabel(theme));
  themeButton.title = themeLabel(theme);
  viewer?.refreshTheme();
}

const soundButton = document.getElementById('at-sound');
function syncSound() {
  const muted = isMuted();
  soundButton.setAttribute('aria-pressed', String(muted));
  const label = muted ? T('Turn sounds on', 'Ativar sons') : T('Mute sounds', 'Silenciar sons');
  soundButton.setAttribute('aria-label', label);
  soundButton.title = label;
  soundButton.querySelector('use').setAttribute('href', muted ? '#i-volume-x' : '#i-volume');
}

const languageSelect = document.getElementById('at-language');
languageSelect.value = lang;
languageSelect.addEventListener('change', () => {
  try { localStorage.setItem('anatomy_language', languageSelect.value); } catch { /* URL keeps it */ }
  const url = new URL(location.href);
  url.searchParams.set('lang', languageSelect.value);
  location.assign(url.href);
});

themeButton.addEventListener('click', () => {
  applyTheme(THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length]);
});

soundButton.addEventListener('click', () => {
  setMuted(!isMuted());
  syncSound();
  if (!isMuted()) correctSound();
});

document.getElementById('at-direction').addEventListener('change', event => {
  viewDir = event.target.value;
  document.getElementById('at-angle').textContent = `${L(VIEWS[viewDir])} · ${T('L/R = patient’s', 'L/D = do paciente')}`;
  viewer?.view(viewDir);
});

document.getElementById('at-zoom-in').addEventListener('click', () => viewer?.zoom(.8));
document.getElementById('at-zoom-out').addEventListener('click', () => viewer?.zoom(1.25));
document.getElementById('at-reset').addEventListener('click', () => viewer?.resetView());

document.getElementById('at-rotate').addEventListener('click', () => {
  if (!viewer) return;
  rotateOn = !rotateOn;
  rotateOn = viewer.setAutoRotate(rotateOn);
  document.getElementById('at-rotate').setAttribute('aria-pressed', String(rotateOn));
});

document.getElementById('at-isolate').addEventListener('click', () => {
  if (!viewer || !highlightIds().length) return;
  isolateOn = !isolateOn;
  viewer.setIsolate(isolateOn);
  document.getElementById('at-isolate').setAttribute('aria-pressed', String(isolateOn));
});

document.addEventListener('click', event => {
  const typerTarget = event.target.closest('[data-at-focus-typer]');
  if (typerTarget) {
    focusTyper();
    return;
  }
  const target = event.target.closest('[data-at-action]');
  if (!target) return;
  actions[Number(target.dataset.atAction)]?.();
});

document.addEventListener('input', event => {
  if (event.target.id === 'at-answer' && state.name) state.name.value = event.target.value;
  else if (event.target.id === 'at-typer') typeInput(event.target);
});

document.addEventListener('keydown', event => {
  if (event.target.id === 'at-answer' && event.key === 'Enter') {
    event.preventDefault();
    checkName();
  } else if (event.target.id === 'at-typer' && event.key === 'Enter') {
    event.preventDefault();
    if (state.type?.feedback) nextPrompt('type');
  } else if (event.target.id === 'at-word' && event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
    event.preventDefault();
    focusTyper();
    typeInput({ value: event.key });
  }
});

localizeStatic();
renderDirections();
applyTheme(theme);
syncSound();
ensureArea();
viewDir = area().view || 'ant';
startSession();
render({ preserveCamera: false });
bootViewer();
