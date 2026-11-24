// Subject-agnostic study engine. A subject pack is loaded lazily by
// subjects/registry.js, then initStudy() fills the shared bindings below.
// Nothing here may import subject data directly.

const SHORT_NAMES = {
  pap_vd_ant: 'Anterior RV papillary muscle',
  pap_vd_post: 'Posterior RV papillary muscle',
  pap_vd_sep: 'Septal RV papillary muscle',
  vent_ant_d_dae: 'Right anterior branches of LAD',
  vent_ant_acd: 'Anterior ventricular branch of RCA',
  vent_post_acd: 'Posterior ventricular branch of RCA',
  sd_lat: 'Lateral middle lobe segment',
  sd_med: 'Medial middle lobe segment',
};

export let ITEMS = {};
export let IDS = [];
export let REGIONS = [];
export let LEVELS = [];
export let REGION_CONTEXT = {};
export let storagePrefix = 'sc2_';
export let subjectId = 'cardio';

export function initStudy(pack, { structureNames = {} } = {}) {
  subjectId = pack.id;
  storagePrefix = pack.storagePrefix || 'sc2_';
  ITEMS = Object.fromEntries(pack.decks.flatMap(deck => deck.itens.map(item => {
    const name = structureNames[item.id] || item.pt;
    return [item.id, { ...item, deck,
      pt: name.replace(/\s*\([^)]*\)/g, '').trim(),
      tag: name.match(/\([^)]*\)\s*$/)?.[0] || '',
      typing: name.replace(/\s*\([^)]*\)/g, '').trim(),
      alt: structureNames[item.id] ? [...(item.alt || []), item.pt] : item.alt,
    }];
  })));
  IDS = Object.keys(ITEMS);
  REGIONS = pack.regions;
  LEVELS = REGIONS.flatMap(region => region.levels);
  REGION_CONTEXT = pack.regionContext || {};
  return { ITEMS, IDS, REGIONS, LEVELS, REGION_CONTEXT };
}

export function shuffle(values) {
  const result = [...values];
  for (let index = result.length - 1; index > 0; index--) {
    const other = Math.floor(Math.random() * (index + 1));
    [result[index], result[other]] = [result[other], result[index]];
  }
  return result;
}

export function fold(value) {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()
    .replace(/[’‘]/g, "'").replace(/ß/g, 'ss');
}

function answerKey(value) {
  return fold(value).replace(/[–—-]/g, ' ').replace(/\s+/g, '').trim();
}

function sameKeyChar(left, right) {
  return fold(left).replace(/[–—-]/g, '-') === fold(right).replace(/[–—-]/g, '-');
}

export function answers(id) {
  const { pt, en, typing, alt } = ITEMS[id];
  return [...new Set([pt, en, typing, pt.replace(/\s*\([^)]*\)/g, ''), ...(alt || [])].map(answerKey))];
}

function distance(left, right) {
  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let row = 1; row <= left.length; row++) {
    const next = [row];
    for (let col = 1; col <= right.length; col++) {
      next[col] = Math.min(previous[col] + 1, next[col - 1] + 1, previous[col - 1] + Number(left[row - 1] !== right[col - 1]));
    }
    previous = next;
  }
  return previous[right.length];
}

export const ROUND_NAMES = ['Type it', 'First letter + clue', 'From memory'];

export class Recall {
  constructor(ids, kind = 'level') {
    this.ids = [...new Set(ids)];
    this.kind = kind;
    this.keys = 0;
    this.good = 0;
    this.chars = 0;
    this.active = 0;
    this.last = null;
    this.results = {};
    this.startRound(kind === 'level' ? 1 : 3);
  }

  startRound(round) {
    this.round = round;
    this.queue = round === 1 ? [...this.ids] : round === 3 && this.kind === 'level'
      ? [...this.ids.filter((_, i) => i % 2), ...this.ids.filter((_, i) => i % 2 === 0).reverse()]
      : shuffle(this.ids);
    this.results[round] = { correct: new Set(), missed: new Set(), hinted: new Set(), retries: {} };
    this.index = 0;
    this.last = null;
    this.resetPrompt();
  }

  resetPrompt() {
    this.typed = '';
    this.position = 0;
    this.hint = false;
    this.feedback = null;
  }

  get id() { return this.queue[this.index]; }
  get item() { return ITEMS[this.id]; }
  get accuracy() { return this.keys ? Math.round(this.good / this.keys * 100) : 100; }
  get wpm() { return this.active > 2500 ? Math.round(this.chars * 12000 / this.active) : 0; }

  stamp(now) {
    if (this.last !== null && now - this.last < 3000) this.active += now - this.last;
    this.last = now;
  }

  type(char, now) {
    if (this.feedback || !this.item) return;
    if (this.round === 1) {
      const expected = this.item.typing[this.position];
      if (!char.trim() && expected !== ' ') return;
      this.stamp(now);
      this.keys++;
      if (expected === ' ' ? char.trim() : !sameKeyChar(char, expected)) return 'wrong-key';
      this.good++;
      this.chars++;
      this.position++;
      if (this.position === this.item.typing.length) this.submit();
      return;
    }
    this.stamp(now);
    if (this.typed.length < 100 && (char !== ' ' || (this.typed && !this.typed.endsWith(' ')))) this.typed += char;
  }

  submit(reveal = false) {
    if (this.feedback || !this.item) return;
    const result = this.results[this.round];
    if (this.round === 1) {
      if (this.position < this.item.typing.length) return;
      result.correct.add(this.id);
      this.feedback = { correct: true };
      return;
    }

    const guess = answerKey(this.typed);
    if (!guess && !reveal) return;
    const names = answers(this.id);
    // For a hinted from-memory prompt the first letter is shown, so accept the rest.
    const partial = (this.round === 2 || this.hint) && names.some(name => name.slice(1) === guess);
    const correct = !reveal && (names.includes(guess) || partial);
    this.keys++;
    if (correct) {
      this.good++;
      this.chars += this.item.typing.length;
      result.correct.add(this.id);
      if (this.hint) result.hinted.add(this.id);
      this.feedback = { correct, hint: this.hint };
      return;
    }

    result.missed.add(this.id);
    const retries = result.retries[this.id] || 0;
    const requeued = this.kind !== 'day' && retries < 2;
    if (requeued) {
      this.queue.splice(Math.min(this.queue.length, this.index + 3), 0, this.id);
      result.retries[this.id] = retries + 1;
    }
    const near = !reveal && names.some(name => name.length > 2 && distance(name, guess) <= 2);
    const confusion = !reveal && !near && this.item.deck.itens.find(other =>
      other.id !== this.id && answers(other.id).includes(guess));
    this.feedback = { correct, near, confusion, requeued, reveal, guess: this.typed.trim() };
  }

  advance() {
    if (!this.feedback) return false;
    this.index++;
    this.resetPrompt();
    return true;
  }
}

const INTERVALS = [1, 1, 3, 7, 16, 35];

export function day(offset = 0, now = new Date()) {
  const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
  return [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(part => String(part).padStart(2, '0')).join('-');
}

function emptyProgress() {
  return { levels: {}, cards: {}, activity: {}, daily: {}, mocks: [] };
}

export function readProgress() {
  const progress = emptyProgress();
  try {
    const data = JSON.parse(localStorage.getItem(`${storagePrefix}progress`));
    const isRecord = value => value && typeof value === 'object' && !Array.isArray(value);
    if (!isRecord(data)) return progress;
    const entries = value => isRecord(value) ? Object.entries(value) : [];
    const isDay = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value);
    const count = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;
    const today = day();

    for (const [id, level] of entries(data.levels)) {
      if (!isRecord(level) || (id !== 'orientation' && !LEVELS.some(entry => entry.id === id))) continue;
      progress.levels[id] = {
        lesson: level.lesson === true,
        passed: level.passed === true,
        clearedOn: isDay(level.clearedOn) ? level.clearedOn : undefined,
        stars: [0, 1, 2].map(index => Array.isArray(level.stars) && level.stars[index] === true),
        retrievedOn: Object.fromEntries(entries(level.retrievedOn).filter(([key, date]) => Object.hasOwn(ITEMS, key) && isDay(date))),
      };
    }
    for (const [id, card] of entries(data.cards)) {
      if (!Object.hasOwn(ITEMS, id) || !isRecord(card)) continue;
      progress.cards[id] = {
        box: Math.min(count(card.box), INTERVALS.length - 1),
        due: isDay(card.due) ? card.due : today,
        last: isDay(card.last) ? card.last : undefined,
        promoted: isDay(card.promoted) ? card.promoted : undefined,
        attempts: count(card.attempts),
        lapses: count(card.lapses),
      };
    }
    progress.activity = Object.fromEntries(entries(data.activity).filter(([date, seconds]) => isDay(date) && count(seconds) > 0));
    progress.daily = Object.fromEntries(entries(data.daily).filter(([date, result]) => isDay(date) && ['correct', 'hint', 'missed'].includes(result)));
    if (Array.isArray(data.mocks)) {
      progress.mocks = data.mocks.filter(mock => isRecord(mock) && isDay(mock.date) && Number.isInteger(mock.score)
        && mock.score >= 0 && mock.score <= 30).map(({ date, score, lode }) => ({ date, score, lode: lode === true }));
    }
  } catch { /* Invalid JSON or storage unavailable. */ }
  return progress;
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(`${storagePrefix}progress`, JSON.stringify(progress));
    return true;
  } catch {
    return false;
  }
}

export function recordLaterRecall(progress, result, today) {
  const recalled = new Set([...result.correct].filter(id => !result.missed.has(id) && !result.hinted.has(id)));
  for (const level of LEVELS) {
    const saved = progress.levels[level.id];
    if (!saved?.clearedOn || saved.clearedOn >= today || saved.stars?.[2]) continue;
    saved.retrievedOn ??= {};
    for (const id of level.ids) {
      if (recalled.has(id)) saved.retrievedOn[id] = today;
    }
    if (level.ids.every(id => saved.retrievedOn[id] > saved.clearedOn)) {
      saved.stars = [true, saved.stars?.[1] === true, true];
      delete saved.retrievedOn;
    }
  }
}

export function gradeCard(progress, id, grade, now = new Date()) {
  const today = day(0, now);
  const prior = progress.cards[id];
  let box = prior?.box || 0;
  let promoted = prior?.promoted;
  if (grade === 0) box = 0;
  else if (!prior || box === 0) {
    box = 1;
    promoted = today;
  } else if (grade === 1) box = Math.max(1, box - 1);
  else if (grade === 3 && promoted !== today) {
    box = Math.min(5, box + 1);
    promoted = today;
  }
  progress.cards[id] = {
    box, promoted, due: day(INTERVALS[box], now),
    last: today, attempts: (prior?.attempts || 0) + 1,
    lapses: (prior?.lapses || 0) + Number(grade <= 1),
  };
}

export function streak(progress, now = new Date()) {
  let offset = progress.activity[day(0, now)] ? 0 : -1;
  let count = 0;
  while (progress.activity[day(offset, now)]) {
    offset--;
    count++;
  }
  return count;
}

export function matchDaily(now = new Date()) {
  const parts = day(0, now).split('-').map(Number);
  const serial = Math.floor(Date.UTC(parts[0], parts[1] - 1, parts[2]) / 86400000);
  const dailyIds = [...new Set(LEVELS.flatMap(level => level.ids))];
  if (!dailyIds.length) return undefined;
  return dailyIds[(serial % dailyIds.length + dailyIds.length) % dailyIds.length];
}
