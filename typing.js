// Generic typing-drill engine (Learn / Test / Explore), modelled on samplesize1.
//
// API
//   import { mountTyping, normalize, judge, tolerance } from './typing.js';
//   mountTyping(rootElement, { subject: 'gastro', decks: [deck, ...], lang: 'en' | 'pt-BR', onExit })
//
// Deck format
//   {
//     id: 'stomach',
//     title: ['Stomach', 'Estômago'],
//     stop: ['plexus'],                 // optional extra words ignored when grading
//     sets: [{
//       id: 'parts', title: ['Parts', 'Partes'],
//       items: [{
//         id: 'cardia',
//         q: ['Region next to the oesophageal opening?', 'Região junto ao óstio esofágico?'],
//         a: [['cardia', 'cárdia']],       // one entry per required answer: [en, pt, ...aliases]
//       }],                                 // an item with 3 entries needs all 3, in any order
//     }],
//   }
// Answers are accepted in either language. Progress is stored per subject, deck and language.
import { correctSound } from './sound.js?v=148';
import { mountRewards } from './rewards.js?v=149';

const BASE_STOP = ['artery', 'arteries', 'arterial', 'a', 'vein', 'veins', 'venous', 'v', 'nerve', 'nerves', 'n',
  'muscle', 'muscles', 'm', 'the', 'of', 'and', 'arteria', 'arterias', 'veia', 'veias', 'nervo', 'nervos',
  'musculo', 'musculos', 'de', 'do', 'da', 'dos', 'das', 'e', 'o', 'os', 'as'];

export function normalize(text, stop = new Set(BASE_STOP)) {
  return String(text ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/['’`]/g, '').split(/[^a-z0-9]+/).filter(word => word && !stop.has(word)).join('')
    // An answer made only of stop words ("V" = segment V, "A", "E"…) keeps its words instead of vanishing.
    || (stop.size ? normalize(text, new Set()) : '');
}

// Optimal string alignment distance: insertions, deletions, substitutions, and swapped neighbours count 1.
export function distance(a, b) {
  const rows = a.length + 1, cols = b.length + 1;
  const d = Array.from({ length: rows }, (_, i) => { const row = new Array(cols).fill(0); row[0] = i; return row; });
  for (let j = 0; j < cols; j++) d[0][j] = j;
  for (let i = 1; i < rows; i++) for (let j = 1; j < cols; j++) {
    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[rows - 1][cols - 1];
}

export const tolerance = length => length < 5 ? 0 : length <= 8 ? 1 : length <= 14 ? 2 : 3;

// candidates: [{ slot, keys: [normalized] }]; universe: every normalized answer key in the deck.
// Accepts when the closest candidate is within tolerance and no other structure is as close.
export function judge(input, candidates, universe, stop) {
  const x = normalize(input, stop);
  if (!x) return { ok: false, empty: true };
  let best = null;
  for (const c of candidates) for (const key of c.keys) {
    const d = distance(x, key);
    if (!best || d < best.d) best = { slot: c.slot, key, d };
  }
  if (!best || best.d > tolerance(best.key.length)) return { ok: false };
  const own = new Set(candidates.find(c => c.slot === best.slot).keys);
  for (const key of universe) if (!own.has(key) && distance(x, key) <= best.d) return { ok: false, ambiguous: true };
  return { ok: true, slot: best.slot, exact: best.d === 0 };
}

const HINT_FULL = 0, HINT_FIRST = 1, HINT_LENGTH = 2, HINT_NONE = 3;
const NEW_GAP_ACTIVE = 5; // how many items may be "in flight" before a new one is introduced
const AIDED_GAP = 3, RELEARN_GAP = 8;

const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const shuffle = list => { const a = [...list]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
// Progress keys of a set, reverse cards included.
const setKeys = s => s.items.flatMap(it => it.rev ? [`${s.id}:${it.id}`, `${s.id}:${it.id}~r`] : [`${s.id}:${it.id}`]);
// Keeps a card and its reverse from landing next to each other.
const pairOf = (a, b) => a && b && (a.revOf === b.key || b.revOf === a.key);
function spreadPairs(list) {
  for (let pass = 0; pass < 3; pass++) for (let i = 1; i < list.length; i++) {
    if (!pairOf(list[i - 1], list[i])) continue;
    const j = list.findIndex((x, k) => Math.abs(k - i) > 1 && !pairOf(list[k - 1], list[i]) && !pairOf(list[i], list[k + 1]) && !pairOf(list[i - 1], x) && !pairOf(x, list[i + 1]));
    if (j >= 0) [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
}
const clock = secs => `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, '0')}`;

function template(answer, level) {
  if (level === HINT_FULL) return answer;
  if (level === HINT_NONE) return '';
  let first = level === HINT_FIRST;
  return [...answer].map(ch => {
    if (!/[\p{L}\p{N}]/u.test(ch)) return ch;
    if (first) { first = false; return ch; }
    return '_';
  }).join('');
}

export function mountTyping(root, { subject, decks, lang = 'en', onExit, onItem } = {}) {
  const pt = lang === 'pt-BR';
  const T = (en, ptText) => pt ? ptText : en;
  const L = pair => Array.isArray(pair) ? (pt ? pair[1] ?? pair[0] : pair[0]) : pair;
  let timer = null, previewTimer = null, lastPreviewAt = 0;
  let deck = null, prepared = null, rw = null;

  function prepare(d) {
    const stop = new Set([...BASE_STOP, ...(d.stop || []).map(w => normalize(w, new Set()))]);
    const items = [];
    const mk = (item, set) => ({
      ...item, key: `${set.id}:${item.id}`, set,
      slots: item.a.map((names, slot) => ({ slot, label: pt ? names[1] ?? names[0] : names[0], keys: [...new Set(names.map(n => normalize(n, stop)).filter(Boolean))] })),
    });
    // `rev: { q, a, info? }` adds the reverse card (answer → question) as an item of its own.
    // In learn it unlocks only once the forward card is learned; in test both are shuffled apart.
    d.sets.forEach(set => set.items.forEach(item => {
      const fwd = mk(item, set); delete fwd.rev; items.push(fwd);
      if (item.rev) items.push({ ...mk({ ...item, ...item.rev, id: `${item.id}~r`, rev: undefined }, set), revOf: fwd.key });
    }));
    const universe = new Set(items.flatMap(item => item.slots.flatMap(s => s.keys)));
    return { stop, items, universe };
  }

  const storeKeyFor = d => `typing1:${subject}:${d.id}:${lang}`;
  const storeKey = () => storeKeyFor(deck);
  function loadFor(d) { try { return JSON.parse(localStorage.getItem(storeKeyFor(d))) || {}; } catch { return {}; } }
  function load() { return loadFor(deck); }
  function save(data) { try { localStorage.setItem(storeKey(), JSON.stringify(data)); } catch { /* session only */ } }
  const learnedMap = () => load().learned || {};

  function stopTimer() { rw?.destroy(); rw = null; if (timer) clearInterval(timer); timer = null; if (previewTimer) clearTimeout(previewTimer); previewTimer = null; }
  function schedulePreview(fn) {
    if (previewTimer) clearTimeout(previewTimer);
    const wait = 100 - (Date.now() - lastPreviewAt);
    if (wait <= 0) { lastPreviewAt = Date.now(); previewTimer = null; fn(); return; }
    previewTimer = setTimeout(() => { lastPreviewAt = Date.now(); previewTimer = null; fn(); }, wait);
  }

  // ---------- deck list / deck home ----------
  function showDecks() {
    stopTimer();
    onItem?.(null, { mode: 'idle' });
    if (decks.length === 1) return showDeck(decks[0]);
    const deckCards = decks.map((d, i) => {
      const learned = loadFor(d).learned || {};
      const keys = d.sets.flatMap(setKeys);
      const done = keys.filter(k => learned[k]).length;
      const isDone = keys.length > 0 && done === keys.length;
      return `<li><button class="ty-deck${isDone ? ' is-done' : ''}" data-deck="${i}"><span class="ty-deck-title">${esc(L(d.title))}</span><span class="ty-deck-meta">${done}/${keys.length}</span></button></li>`;
    }).join('');
    root.innerHTML = `<div class="ty-wrap"><header class="ty-head">${onExit ? `<button class="ty-back" data-act="exit">← ${T('Back', 'Voltar')}</button>` : ''}<h1>${T('Typing drills', 'Treino de digitação')}</h1></header>
      <ul class="ty-decks">${deckCards}</ul></div>`;
    root.querySelector('[data-act="exit"]')?.addEventListener('click', onExit);
    root.querySelectorAll('[data-deck]').forEach(b => {
      const d = decks[+b.dataset.deck];
      const previewDeck = () => schedulePreview(() => onItem?.(null, { mode: 'preview', deck: d, label: L(d.title) }));
      b.addEventListener('click', () => showDeck(d));
      b.addEventListener('mouseenter', previewDeck);
      b.addEventListener('focus', previewDeck);
    });
  }

  function showDeck(d, chosen) {
    stopTimer();
    deck = d; prepared = prepare(d);
    onItem?.(null, { mode: 'idle', deck: d });
    const learned = learnedMap();
    const data = load();
    const selected = chosen || new Set(d.sets.map(s => s.id));
    const setRow = set => {
      const sk = setKeys(set), total = sk.length, done = sk.filter(k => learned[k]).length;
      return `<li class="ty-set ${done === total ? 'is-done' : ''}"><label><input type="checkbox" data-set="${esc(set.id)}" ${selected.has(set.id) ? 'checked' : ''}>
        <span class="ty-set-name">${esc(L(set.title))}</span><span class="ty-set-count">${done}/${total}</span></label></li>`;
    };
    const allLearned = prepared.items.filter(item => learned[item.key]).length;
    const progress = prepared.items.length ? allLearned / prepared.items.length : 0;
    const best = data.best?.[[...selected].sort().join(',')];
    root.innerHTML = `<div class="ty-wrap">
      <header class="ty-head">${onExit || decks.length > 1 ? `<button class="ty-back" data-act="back">← ${T('Back', 'Voltar')}</button>` : ''}
        <h1>${esc(L(d.title))}</h1>
        <div class="ty-progress-wrap"><div class="ty-progress"><div class="ty-progress-fill" style="--progress:${progress}"></div></div><span class="ty-progress-label">${allLearned}/${prepared.items.length} ${T('learned', 'aprendidos')}</span></div></header>
      <ul class="ty-sets">${d.sets.map(setRow).join('')}</ul>
      <div class="ty-actions">
        <button class="ty-btn primary" data-act="learn">${T('Start learning', 'Começar a aprender')}</button>
        <button class="ty-btn" data-act="test">${T('Take test', 'Fazer teste')}</button>
        <button class="ty-btn" data-act="explore">${T('Browse terms', 'Ver termos')}</button>
      </div>
      ${best ? `<p class="ty-best">${T('Best test for this selection', 'Melhor teste nesta seleção')}: ${best.pct}% · ${clock(best.secs)}${best.pct >= 90 ? ` · ${T('passed (≥ 90%)', 'aprovado (≥ 90%)')}` : ''}</p>` : ''}
      <button class="ty-link" data-act="reset">${T('Reset progress for this deck', 'Zerar progresso deste deck')}</button>
    </div>`;
    const pick = () => new Set([...root.querySelectorAll('[data-set]:checked')].map(i => i.dataset.set));
    root.querySelectorAll('[data-set]').forEach(i => i.addEventListener('change', () => showDeck(d, pick())));
    root.querySelectorAll('.ty-set').forEach((li, idx) => {
      const set = d.sets[idx];
      const previewSet = () => schedulePreview(() => {
        const focus = [...new Set(set.items.flatMap(it => it.d3?.focus || []))];
        onItem?.(focus.length ? { set, d3: { focus, frame: set.d3frame } } : { set }, { mode: 'preview', deck: d, reveal: true, label: L(set.title) });
      });
      li.addEventListener('mouseenter', previewSet);
      li.addEventListener('focusin', previewSet);
    });
    root.querySelector('[data-act="back"]')?.addEventListener('click', () => decks.length > 1 ? showDecks() : onExit());
    const scope = () => { const s = pick(); return s.size ? s : new Set(d.sets.map(x => x.id)); };
    root.querySelector('[data-act="learn"]').addEventListener('click', () => startLearn(scope()));
    root.querySelector('[data-act="test"]').addEventListener('click', () => startTest(scope()));
    root.querySelector('[data-act="explore"]').addEventListener('click', () => showExplore(scope()));
    root.querySelector('[data-act="reset"]').addEventListener('click', () => {
      if (confirm(T('Erase learned items and best scores for this deck?', 'Apagar itens aprendidos e melhores notas deste deck?'))) { save({}); showDeck(d, selected); }
    });
  }

  // ---------- shared question view ----------
  // Logic line ("rule"): item.rule is an id into deck.rules or an [en, pt] pair; item.note or set.rule also work.
  // Shown on the Learn intro screen, on new or missed items, and after the answer.
  const ruleText = r => !r ? '' : typeof r === 'string' ? (deck.rules?.[r] ? L(deck.rules[r]) : r) : L(r);
  const ruleOf = item => ruleText(item.rule || item.note || item.set.rule);
  const infoOf = item => (item.info ? L(item.info) : '');
  // item.extra: true marks content beyond what was taught in class (still worth knowing).
  // item.warn: [en, pt] flags where the class material disagrees with the reference texts; it is shown with the answer.
  const showInfo = (el, item, on) => {
    const t = infoOf(item); el.textContent = t; el.hidden = !t || !on;
    const box = el.parentElement, tag = box.querySelector('[data-q="tag"]'), warn = box.querySelector('[data-q="warn"]');
    if (tag) tag.hidden = !item.extra;
    if (warn) { const w = item.warn ? L(item.warn) : ''; warn.querySelector('span').textContent = w; warn.hidden = !w || !on; }
  };
  const ruleKey = item => { const r = item.rule || item.note || item.set.rule; return !r ? '' : typeof r === 'string' ? r : r[0]; };
  const isHtml = item => Boolean(item.html ?? item.set.html ?? deck.html);
  const setPrompt = (el, item) => { if (isHtml(item)) el.innerHTML = L(item.q); else el.textContent = L(item.q); };
  const plainPrompt = item => { const t = L(item.q); return isHtml(item) ? t.replace(/<[^>]*>/g, '') : t; };
  // Weak points: missed items, cleared after 2 help-free right answers.
  function markWeak(key) { const d = load(); d.weak ||= {}; d.weak[key] = { ok: 0 }; save(d); }
  function creditWeak(key) { const d = load(); if (d.weak?.[key]) { if (++d.weak[key].ok >= 2) delete d.weak[key]; save(d); } }
  // Learn order: weak points first, then grouped by rule (in order of first appearance), then authored order.
  function learnOrder(items) {
    const weak = load().weak || {};
    const ruleOrder = new Map();
    Object.keys(deck.rules || {}).forEach((r, i) => ruleOrder.set(r, i));
    items.forEach(item => { const k = ruleKey(item); if (!ruleOrder.has(k)) ruleOrder.set(k, ruleOrder.size); });
    return items.map((item, i) => ({ item, i })).sort((a, b) =>
      (weak[b.item.key] ? 1 : 0) - (weak[a.item.key] ? 1 : 0)
      || ruleOrder.get(ruleKey(a.item)) - ruleOrder.get(ruleKey(b.item))
      || a.i - b.i).map(x => x.item);
  }
  function renderSlots(el, item, filled, revealMissed = false) {
    const slots = item.slots;
    if (slots.length <= 1) { el.innerHTML = ''; return; }
    const filledItems = [...filled.keys()].map(slotIdx => slots.find(s => s.slot === slotIdx)).filter(Boolean);
    const rest = slots.filter(s => !filled.has(s.slot));
    el.innerHTML = [
      ...filledItems.map(s => `<li class="is-filled">${esc(s.label)}</li>`),
      ...rest.map(s => revealMissed ? `<li class="is-missed">${esc(s.label)}</li>` : '<li>?</li>'),
    ].join('');
  }
  function questionShell({ mode, scope }) {
    root.innerHTML = `<div class="ty-wrap ty-run">
      <header class="ty-bar">
        <button class="ty-back" data-act="quit">← ${esc(L(deck.title))}</button>
        <div class="ty-stats"><span data-stat="acc">–</span><span data-stat="time">0:00</span><span data-stat="streak">0</span></div>
      </header>
      <div class="ty-progress-wrap"><div class="ty-progress"><div class="ty-progress-fill" data-stat="fill"></div></div><span class="ty-progress-label" data-stat="count"></span></div>
      <section class="ty-card" aria-live="polite">
        <h2 class="ty-q" data-q="text"></h2>
        <span class="ty-tag" data-q="tag" hidden title="${T('Beyond what was taught in class, but standard anatomy worth knowing', 'Além do que foi dado em aula, mas anatomia padrão que vale saber')}">${T('Extra', 'Extra')}</span>
        <p class="ty-warn" data-q="warn" role="note" hidden><b>⚠</b> <span></span></p>
        <p class="ty-rule" data-q="rule" hidden></p>
        <p class="ty-info" data-q="info" hidden></p>
        <ul class="ty-slots" data-q="slots"></ul>
        <div class="ty-field">
          <div class="ty-ghost" data-q="ghost" aria-hidden="true"></div>
          <input class="ty-input" data-q="input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" enterkeyhint="go" aria-label="${T('Answer', 'Resposta')}">
        </div>
        <p class="ty-feedback" data-q="fb"></p>
        <p class="ty-weak" data-q="weak"></p>
        <div class="ty-row">
          ${mode === 'learn' ? `<button class="ty-btn small" data-act="clue">${T('Clue', 'Dica')}</button>` : `<button class="ty-btn small" data-act="skip">${T('Skip', 'Pular')}</button>`}
          <button class="ty-btn small primary ty-next" data-act="next" hidden>${T('Next', 'Próxima')}</button>
          <span class="ty-keys" data-q="keys"><kbd>Enter</kbd> ${T('to submit', 'para enviar')}</span>
        </div>
      </section>
    </div>`;
    root.querySelector('[data-act="quit"]').addEventListener('click', () => showDeck(deck, scope));
    const q = name => root.querySelector(`[data-q="${name}"]`);
    const stat = name => root.querySelector(`[data-stat="${name}"]`);
    // Answer stays on screen until the user presses Enter or clicks Next.
    let pending = null;
    const nextBtn = () => root.querySelector('[data-act="next"]'); // live: the card can be re-rendered
    const go = () => { if (!pending) return; const fn = pending; pending = null; nextBtn().hidden = true; root.querySelector('.ty-field')?.classList.remove('is-locked', 'is-shown'); { const i = q('input'); if (i?.readOnly) { i.readOnly = false; i.value = ''; } } q('keys').innerHTML = `<kbd>Enter</kbd> ${T('to submit', 'para enviar')}`; fn(); };
    root.addEventListener('click', e => { if (e.target.closest('[data-act="next"]')) go(); });
    const waitNext = (fn, shown) => { pending = fn; nextBtn().hidden = false; q('keys').innerHTML = `<kbd>Enter</kbd> ${T('for next', 'para a próxima')}`;
      const field = root.querySelector('.ty-field'), i = q('input');
      if (rw && shown != null && i) { i.value = shown; i.readOnly = true; q('ghost').textContent = ''; field?.classList.add('is-shown'); i.focus({ preventScroll: true }); }
      else { field?.classList.add('is-locked'); nextBtn().focus({ preventScroll: true }); } };
    const takeEnter = () => { if (!pending) return false; go(); return true; };
    root.addEventListener('keydown', e => { if (e.key === 'Enter' && pending && e.target !== q('input')) { e.preventDefault(); go(); } });
    return { q, stat, waitNext, takeEnter };
  }

  // ---------- Learn ----------
  function startLearn(scope) {
    stopTimer();
    const pool = prepared.items.filter(item => scope.has(item.set.id));
    const data = load();
    data.learned ||= {};
    // Reverse cards wait until their forward card is learned, then drop into the queue at a random spot.
    const lockedRev = pool.filter(item => item.revOf && !data.learned[item.key] && !data.learned[item.revOf]);
    const unseen = learnOrder(pool.filter(item => !data.learned[item.key] && !item.revOf));
    const dropIn = item => { const lo = Math.min(2, unseen.length); unseen.splice(lo + Math.floor(Math.random() * (unseen.length - lo + 1)), 0, item); };
    pool.filter(item => item.revOf && !data.learned[item.key] && data.learned[item.revOf]).forEach(dropIn);
    const state = new Map(); // key -> { hint, need }
    let schedule = []; // { item, due }
    let n = 0, answered = 0, firstTry = 0, streak = 0;
    const started = Date.now();
    const { q, stat, waitNext, takeEnter } = questionShell({ mode: 'learn', scope });
    let input = q('input');
    let cur = null; // { item, filled:Set, aided, missed }
    if (deck.rewards) rw = mountRewards({ deck, items: pool, learned: () => data.learned, lang });

    const learnedCount = () => pool.filter(item => data.learned[item.key]).length;
    function updateStats() {
      stat('acc').textContent = `${T('accuracy', 'acerto')} ${answered ? `${Math.round(100 * firstTry / answered)}%` : '–'}`;
      stat('streak').textContent = `${T('streak', 'sequência')} ${streak}`;
      const done = learnedCount();
      stat('fill').style.setProperty('--progress', pool.length ? done / pool.length : 0);
      stat('count').textContent = `${done}/${pool.length} ${T('learned', 'aprendidos')}`;
    }
    timer = setInterval(() => { stat('time').textContent = clock((Date.now() - started) / 1000); }, 1000);

    function next() {
      n++;
      schedule.sort((a, b) => a.due - b.due);
      let pick = schedule.find(s => s.due <= n);
      if (!pick && schedule.length < NEW_GAP_ACTIVE && unseen.length) {
        const item = unseen.shift();
        state.set(item.key, { hint: HINT_FULL, need: 1, isNew: true });
        pick = { item, due: n };
        schedule.push(pick);
      }
      if (!pick && schedule.length) pick = schedule[0];
      if (!pick && unseen.length) {
        const item = unseen.shift();
        state.set(item.key, { hint: HINT_FULL, need: 1, isNew: true });
        pick = { item, due: n }; schedule.push(pick);
      }
      if (!pick) return finish();
      schedule = schedule.filter(s => s !== pick);
      const st = state.get(pick.item.key);
      q('fb').textContent = ''; q('fb').className = 'ty-feedback';
      cur = { item: pick.item, filled: new Map(), aided: st.hint < HINT_NONE, missed: false, isNew: st.isNew };
      st.isNew = false;
      paint();
    }

    function remaining() { return cur.item.slots.filter(s => !cur.filled.has(s.slot)); }
    function paint() {
      const st = state.get(cur.item.key);
      { const rule = ruleOf(cur.item), el = q('rule'); el.textContent = rule; el.hidden = !rule || !(cur.isNew || cur.missed); }
      showInfo(q('info'), cur.item, cur.isNew || cur.missed);
      setPrompt(q('text'), cur.item);
      onItem?.(cur.item, { mode: 'learn', reveal: Boolean(cur.isNew || cur.missed) });
      const slots = cur.item.slots;
      renderSlots(q('slots'), cur.item, cur.filled);
      const weakKeys = Object.keys(load().weak || {}).filter(k => pool.some(item => item.key === k));
      q('weak').textContent = weakKeys.length ? `${T('Weak points', 'Pontos fracos')}: ${weakKeys.length}` : '';
      rw?.current(cur.item, st.hint);
      const target = remaining()[0];
      const tpl = target ? template(target.label, st.hint) : '';
      input.dataset.tpl = tpl;
      input.style.width = `${Math.max(14, tpl.length + 2, (input.value || '').length + 2)}ch`;
      paintGhost();
      updateStats();
      input.focus();
    }
    function paintGhost() {
      const tpl = input.dataset.tpl || '';
      q('ghost').textContent = ' '.repeat(Math.min(input.value.length, tpl.length)) + tpl.slice(input.value.length);
    }
    function submit() {
      if (!cur) return;
      const typed = input.value.trim();
      if (!typed) return;
      const st = state.get(cur.item.key);
      const already = judge(typed, cur.item.slots.filter(s => cur.filled.has(s.slot)), prepared.universe, prepared.stop);
      const res = judge(typed, remaining(), prepared.universe, prepared.stop);
      if (!res.ok && already.ok) { feedback(T(`Already have '${typed}'.`, `Já tem '${typed}'.`), ''); input.value = ''; paintGhost(); return; }
      if (!res.ok) {
        rw?.miss();
        if (!cur.missed) markWeak(cur.item.key);
        cur.missed = true; cur.aided = true; streak = 0;
        st.need = 2;
        st.hint = Math.max(HINT_FULL, st.hint - 1);
        feedback(T(`Not “${typed}”. Try again.`, `Não é “${typed}”. Tente de novo.`), 'bad');
        input.value = '';
        paint();
        return;
      }
      cur.filled.set(res.slot, true);
      input.value = '';
      if (remaining().length) { correctSound(); rw?.part(); feedback('', ''); paint(); return; }
      if (!rw) correctSound();
      renderSlots(q('slots'), cur.item, cur.filled);
      paintGhost();
      answered++; if (!cur.missed) { firstTry++; streak++; }
      rw?.hit(streak);
      { const rule = ruleOf(cur.item), el = q('rule'); el.textContent = rule; el.hidden = !rule; }
      showInfo(q('info'), cur.item, true);
      onItem?.(cur.item, { mode: 'learn', reveal: true });
      if (cur.aided) {
        st.hint = Math.min(HINT_NONE, st.hint + 1);
        if (cur.missed) st.hint = Math.min(st.hint, HINT_LENGTH);
        schedule.push({ item: cur.item, due: n + AIDED_GAP });
        feedback('', '');
      } else {
        creditWeak(cur.item.key);
        st.need -= 1;
        if (st.need <= 0) {
          data.learned[cur.item.key] = 1; save({ ...load(), learned: data.learned });
          rw?.learned(cur.item);
          for (let k = lockedRev.length - 1; k >= 0; k--) if (lockedRev[k].revOf === cur.item.key) dropIn(lockedRev.splice(k, 1)[0]);
          feedback(T('Marked as learned.', 'Marcado como aprendido.'), 'good');
        } else {
          schedule.push({ item: cur.item, due: n + RELEARN_GAP });
          feedback('', '');
        }
      }
      const shown = cur.item.slots.map(s => s.label).join(' · ');
      cur = null;
      updateStats();
      waitNext(next, shown);
    }
    function feedback(text, cls) { q('fb').textContent = text; q('fb').className = `ty-feedback ${cls}`; }
    function rebind() {
      input = q('input');
      input.addEventListener('input', () => { q('fb').textContent = ''; q('fb').className = 'ty-feedback'; paintGhost(); });
      input.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); if (!takeEnter()) submit(); } });
      root.querySelector('[data-act="clue"]').addEventListener('click', () => {
        if (!cur) return;
        const st = state.get(cur.item.key);
        st.hint = Math.max(HINT_FULL, st.hint - 1);
        cur.aided = true;
        paint();
      });
    }
    rebind();
    function finish() {
      stopTimer();
      root.querySelector('.ty-card').innerHTML = `<h2 class="ty-q">${T('Selection complete.', 'Seleção concluída.')}</h2>
        <p class="ty-sub">${T('Accuracy', 'Acerto')} ${answered ? Math.round(100 * firstTry / answered) : 100}% · ${clock((Date.now() - started) / 1000)}</p>
        <div class="ty-actions"><button class="ty-btn primary" data-act="t">${T('Take test', 'Fazer teste')}</button><button class="ty-btn" data-act="h">${T('Back to deck', 'Voltar ao deck')}</button></div>`;
      root.querySelector('[data-act="t"]').addEventListener('click', () => startTest(scope));
      root.querySelector('[data-act="h"]').addEventListener('click', () => showDeck(deck, scope));
      updateStats();
    }
    updateStats();
    const rules = [...new Set(unseen.map(item => ruleText(item.set.rule) || ruleOf(item)).filter(Boolean))]; // intro: one summary per set
    if (!rules.length) return next();
    const card = root.querySelector('.ty-card'), saved = card.innerHTML;
    card.innerHTML = `<h2 class="ty-intro-title">${T('Rules for this selection', 'Regras desta seleção')}</h2>${rules.map(r => `<p class="ty-rule">${esc(r)}</p>`).join('')}
      <div class="ty-actions"><button class="ty-btn primary" data-act="go">${T('Start typing', 'Começar a digitar')}</button></div>`;
    const go = () => { document.removeEventListener('keydown', onKey); card.innerHTML = saved; rebind(); next(); };
    const onKey = e => { if (e.key === 'Enter') { e.preventDefault(); go(); } };
    card.querySelector('[data-act="go"]').addEventListener('click', go);
    setTimeout(() => document.addEventListener('keydown', onKey), 0);
  }

  // ---------- Test ----------
  function startTest(scope) {
    stopTimer();
    const order = spreadPairs(shuffle(prepared.items.filter(item => scope.has(item.set.id))));
    const results = [];
    let i = -1, streak = 0, cur = null, locked = false;
    const started = Date.now();
    const { q, stat, waitNext, takeEnter } = questionShell({ mode: 'test', scope });
    const input = q('input');
    q('ghost').textContent = '';
    if (deck.rewards) rw = mountRewards({ deck, items: order, learned: learnedMap, lang });
    timer = setInterval(() => { stat('time').textContent = clock((Date.now() - started) / 1000); }, 1000);
    const remaining = () => cur.item.slots.filter(s => !cur.filled.has(s.slot));
    function stats() {
      const right = results.filter(r => r.ok).length;
      stat('acc').textContent = `${T('accuracy', 'acerto')} ${results.length ? `${Math.round(100 * right / results.length)}%` : '–'}`;
      stat('streak').textContent = `${T('streak', 'sequência')} ${streak}`;
      stat('fill').style.setProperty('--progress', results.length / order.length);
      stat('count').textContent = `${results.length}/${order.length}`;
    }
    function next() {
      i++; locked = false;
      if (i >= order.length) return finish();
      cur = { item: order[i], filled: new Map() };
      paint();
    }
    function paint() {
      setPrompt(q('text'), cur.item);
      showInfo(q('info'), cur.item, false);
      q('rule').hidden = true;
      onItem?.(cur.item, { mode: 'test', reveal: false });
      rw?.current(cur.item);
      renderSlots(q('slots'), cur.item, cur.filled);
      stats(); input.focus();
    }
    function fail(typed) {
      rw?.miss(); streak = 0; locked = true;
      markWeak(cur.item.key);
      results.push({ item: cur.item, ok: false, typed, partial: cur.filled.size > 0 });
      renderSlots(q('slots'), cur.item, cur.filled, true);
      q('fb').className = 'ty-feedback bad';
      q('fb').textContent = typed ? T(`Not “${typed}”. Answer: `, `Não é “${typed}”. Resposta: `) + cur.item.slots.map(s => s.label).join(' · ') : T('Answer: ', 'Resposta: ') + cur.item.slots.map(s => s.label).join(' · ');
      input.value = '';
      showInfo(q('info'), cur.item, true);
      { const rule = ruleOf(cur.item), el = q('rule'); el.textContent = rule; el.hidden = !rule; }
      onItem?.(cur.item, { mode: 'test', reveal: true });
      stats();
      waitNext(() => { q('fb').textContent = ''; next(); }, cur.item.slots.map(s => s.label).join(' · '));
    }
    input.addEventListener('keydown', e => {
      if (e.key !== 'Enter') return;
      e.preventDefault();
      if (takeEnter() || locked || !cur) return;
      const typed = input.value.trim();
      if (!typed) return;
      const res = judge(typed, remaining(), prepared.universe, prepared.stop);
      if (!res.ok) return fail(typed);
      cur.filled.set(res.slot, true); input.value = '';
      if (remaining().length) { correctSound(); rw?.part(); paint(); return; }
      streak++; if (rw) rw.hit(streak); else correctSound();
      renderSlots(q('slots'), cur.item, cur.filled);
      results.push({ item: cur.item, ok: true });
      q('fb').textContent = '';
      locked = true; stats();
      showInfo(q('info'), cur.item, true);
      { const rule = ruleOf(cur.item), el = q('rule'); el.textContent = rule; el.hidden = !rule; }
      onItem?.(cur.item, { mode: 'test', reveal: true });
      waitNext(() => { q('fb').textContent = ''; next(); }, cur.item.slots.map(s => s.label).join(' · '));
    });
    root.querySelector('[data-act="skip"]').addEventListener('click', () => { if (!locked && cur) fail(''); });
    function finish() {
      stopTimer();
      const secs = (Date.now() - started) / 1000;
      const right = results.filter(r => r.ok).length;
      const pct = order.length ? Math.round(100 * right / order.length) : 0;
      const data = load(); data.best ||= {};
      const k = [...scope].sort().join(',');
      const prev = data.best[k];
      const isBest = !prev || pct > prev.pct || (pct === prev.pct && secs < prev.secs);
      if (isBest) { data.best[k] = { pct, secs: Math.round(secs) }; save(data); }
      const missed = results.filter(r => !r.ok);
      // 3D recap: back to the front view, every structure of the test coloured by result (right / wrong / partly right).
      onItem?.(null, { mode: 'summary', deck, results: results.map(r => ({ item: r.item, state: r.ok ? 'ok' : r.partial ? 'part' : 'bad' })) });
      root.querySelector('.ty-card').innerHTML = `<h2 class="ty-q">${pct}% · ${clock(secs)}${isBest ? ` · ${T('new best', 'novo recorde')}` : ''}${pct >= 90 ? ` · ✓ ${T('passed', 'aprovado')}` : ''}</h2>
        <p class="ty-sub">${right}/${order.length} ${T('correct', 'certas')}${prev && !isBest ? ` · ${T('best', 'recorde')} ${prev.pct}% · ${clock(prev.secs)}` : ''}</p>
        ${missed.length ? `<ul class="ty-missed">${missed.map(r => `<li><span>${esc(plainPrompt(r.item))}</span><strong>${esc(r.item.slots.map(s => s.label).join(' · '))}</strong></li>`).join('')}</ul>` : ''}
        <div class="ty-actions"><button class="ty-btn primary" data-act="again">${T('Test again', 'Testar de novo')}</button><button class="ty-btn" data-act="h">${T('Back to deck', 'Voltar ao deck')}</button></div>`;
      root.querySelector('[data-act="again"]').addEventListener('click', () => startTest(scope));
      root.querySelector('[data-act="h"]').addEventListener('click', () => showDeck(deck, scope));
    }
    next();
  }

  // ---------- Explore ----------
  function showExplore(scope) {
    stopTimer();
    const learned = learnedMap();
    root.innerHTML = `<div class="ty-wrap">
      <header class="ty-head"><button class="ty-back" data-act="back">← ${esc(L(deck.title))}</button><h1>${T('Browse terms', 'Termos deste deck')}</h1>
      <input class="ty-filter" type="search" placeholder="${T('Filter…', 'Filtrar…')}" aria-label="${T('Filter', 'Filtrar')}"></header>
      ${deck.sets.filter(s => scope.has(s.id)).map(set => `<section class="ty-explore"><h2>${esc(L(set.title))}</h2>${set.rule ? `<p class="ty-rule">${esc(L(set.rule))}</p>` : ''}<ul>${set.items.map(item => {
        const answers = item.a.map(n => pt ? n[1] ?? n[0] : n[0]);
        const full = prepared.items.find(x => x.key === `${set.id}:${item.id}`);
        const rule = ruleOf(full);
        const info = infoOf(full);
        return `<li data-key="${esc(full.key)}" tabindex="0" data-text="${esc(normalize(plainPrompt(full) + ' ' + item.a.flat().join(' ') + ' ' + rule + ' ' + info))}" class="${learned[full.key] ? 'is-learned' : ''}"><span>${esc(plainPrompt(full))}${full.extra ? ` <small class="ty-tag">${T('Extra', 'Extra')}</small>` : ''}${rule ? `<small class="ty-rule-inline">${esc(rule)}</small>` : ''}${info ? `<small class="ty-info-inline">${esc(info)}</small>` : ''}${full.warn ? `<small class="ty-info-inline">⚠ ${esc(L(full.warn))}</small>` : ''}</span><strong>${esc(answers.join(' · '))}</strong></li>`;
      }).join('')}</ul></section>`).join('')}
    </div>`;
    root.querySelector('[data-act="back"]').addEventListener('click', () => showDeck(deck, scope));
    const pick = li => { const it = prepared.items.find(x => x.key === li.dataset.key); if (!it) return; root.querySelectorAll('.ty-explore li.is-active').forEach(x => x.classList.remove('is-active')); li.classList.add('is-active'); onItem?.(it, { mode: 'explore', reveal: true }); };
    root.querySelectorAll('.ty-explore li[data-key]').forEach(li => { li.addEventListener('click', () => pick(li)); li.addEventListener('keydown', e => { if (e.key === 'Enter') pick(li); }); });
    const filter = root.querySelector('.ty-filter');
    filter.addEventListener('input', () => {
      const f = normalize(filter.value);
      root.querySelectorAll('.ty-explore li').forEach(li => { li.hidden = f && !li.dataset.text.includes(f); });
    });
  }

  showDecks();
  return { destroy: () => { stopTimer(); root.innerHTML = ''; } };
}
