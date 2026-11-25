/** Session and progress logic for the Aulas study, practice and test flow.
 * Question ids and block ids must remain stable across translations of a pack.
 */
export function createEngine({ packId, storage, now = () => Date.now() } = {}) {
  if (!packId) throw new Error('A packId is required');
  const key = `aulas:${packId}:v1`;
  const empty = () => ({ version: 1, blocks: {}, trouble: {} });
  let progress = empty();
  let store = storage;
  if (store === undefined) {
    try { store = globalThis.localStorage; } catch (_) { store = null; }
  }
  const asRecord = value => Object.assign(Object.create(null),
    value && typeof value === 'object' && !Array.isArray(value) ? value : {});
  function load() {
    try {
      const saved = JSON.parse(store?.getItem(key) || 'null');
      if (saved && typeof saved === 'object') {
        progress = { version: 1, blocks: asRecord(saved.blocks), trouble: asRecord(saved.trouble) };
      }
    } catch (_) { /* Keep the current record when storage is unavailable or corrupt. */ }
  }
  progress.blocks = asRecord(progress.blocks);
  progress.trouble = asRecord(progress.trouble);
  load();
  function save() {
    try { store?.setItem(key, JSON.stringify(progress)); } catch (_) {
      // Subsequent changes can still use the in-memory progress for this visit.
      store = null;
    }
  }
  const copy = value => JSON.parse(JSON.stringify(value));
  const block = id => progress.blocks[id] = asRecord(progress.blocks[id]);
  const questionId = question => String(question.id);
  const updateTrouble = (id, correct) => {
    load();
    if (!correct) progress.trouble[id] = { streak: 0 };
    else if (progress.trouble[id]) {
      const streak = (Number(progress.trouble[id].streak) || 0) + 1;
      if (streak >= 2) delete progress.trouble[id];
      else progress.trouble[id] = { streak };
    }
    save();
  };
  const sync = session => {
    session.current = session.queue[session.index] || null;
    session.finished = !session.current;
    if (session.finished && !session.result) finish(session);
    return session;
  };
  const finish = session => {
    session.current = null;
    session.finished = true;
    session.endedAt = now();
    const elapsedMs = Math.max(0, session.endedAt - session.startedAt);
    const total = session.mode === 'test' ? session.total : session.answers.length;
    const correct = session.answers.filter(answer => answer.correct && !answer.assisted).length;
    const score = total ? Math.floor(correct * 100 / total) : 0;
    const passed = session.mode === 'test' && total > 0 && correct / total >= 0.9;
    session.result = { total, correct, score, passed, elapsedMs };
    if (session.mode === 'test' && total) {
      load();
      const record = block(session.blockId);
      if (record.bestScore == null || score > record.bestScore) {
        record.bestScore = score;
        record.bestElapsedMs = elapsedMs;
      }
      if (passed) record.passed = true;
      record.lastReviewedAt = session.endedAt;
      save();
    }
    return session;
  };
  return {
    getProgress() { load(); return copy(progress); },
    completeStudy(blockId) { load(); block(blockId).studied = true; save(); return copy(progress.blocks[blockId]); },
    isUnlocked(blockId, orderedBlockIds) {
      load();
      const index = orderedBlockIds.indexOf(blockId);
      return index === 0 || (index > 0 && Boolean(progress.blocks[orderedBlockIds[index - 1]]?.passed));
    },
    createSession({ mode, blockId, questions, durationMs, weakIds } = {}) {
      if (!['study', 'practice', 'test'].includes(mode)) throw new Error('Invalid session mode');
      if (blockId == null || !Array.isArray(questions)) throw new Error('A blockId and questions are required');
      if (questions.some(question => !question || question.id == null)) throw new Error('Every question needs an id');
      load();
      const queue = questions.slice();
      if (mode === 'practice') {
        const rank = question => progress.trouble[questionId(question)] ? 2 : Number(Boolean(weakIds?.has(questionId(question))));
        queue.sort((a, b) => rank(b) - rank(a));
      }
      const startedAt = now();
      return sync({ mode, blockId, queue, index: 0, current: null, finished: false, answers: [], total: queue.length, startedAt,
        deadline: mode === 'test' && Number.isFinite(durationMs) && durationMs > 0 ? startedAt + durationMs : null,
        hintLevel: 0, result: null });
    },
    useHint(session) {
      if (session.finished || session.mode === 'test') return session.hintLevel;
      session.hintLevel = Math.min(3, session.hintLevel + 1);
      return session.hintLevel;
    },
    answer(session, { correct, assisted = false } = {}) {
      if (session.finished || !session.current) return session;
      if (session.deadline != null && now() >= session.deadline) return finish(session);
      const question = session.current;
      const helped = session.mode !== 'test' && (Boolean(assisted) || session.hintLevel > 0);
      const right = Boolean(correct);
      session.answers.push({ id: questionId(question), correct: right, assisted: helped, hintLevel: session.hintLevel });
      if (session.mode !== 'study') updateTrouble(questionId(question), right && !helped);
      if (session.mode === 'practice' && (!right || helped)) {
        // Place the retry after three intervening questions, or at the tail.
        session.queue.splice(Math.min(session.index + 4, session.queue.length), 0, question);
      }
      session.index += 1;
      session.hintLevel = 0;
      return sync(session);
    },
    finish(session) { return session.finished ? session : finish(session); },
    checkTime(session) {
      if (!session.finished && session.deadline != null && now() >= session.deadline) finish(session);
      return session;
    }
  };
}
