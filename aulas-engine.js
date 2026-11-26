/** Session and progress logic for the Aulas study, practice and test flow.
 * Question ids and block ids must remain stable across translations of a pack.
 */
export function createEngine({ packId, storage, now = () => Date.now() } = {}) {
  if (!packId) throw new Error('A packId is required');
  const key = `aulas:${packId}:v1`;
  const empty = () => ({ version: 1, blocks: {}, trouble: {}, questions: {}, sessions: {} });
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
        progress = {
          version: 1,
          blocks: asRecord(saved.blocks),
          trouble: asRecord(saved.trouble),
          questions: asRecord(saved.questions),
          sessions: asRecord(saved.sessions),
        };
      }
    } catch (_) { /* Keep the current record when storage is unavailable or corrupt. */ }
  }
  progress.blocks = asRecord(progress.blocks);
  progress.trouble = asRecord(progress.trouble);
  progress.questions = asRecord(progress.questions);
  progress.sessions = asRecord(progress.sessions);
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
  const sessionKey = (blockId, mode) => `${blockId}:${mode}`;
  const saveSession = session => {
    if (!session || session.mode === 'study') return;
    load();
    const sKey = sessionKey(session.blockId, session.mode);
    if (session.finished) {
      delete progress.sessions[sKey];
      save();
      return;
    }
    progress.sessions[sKey] = {
      mode: session.mode,
      blockId: session.blockId,
      queueIds: session.queue.map(questionId),
      index: session.index,
      answers: session.answers,
      total: session.total,
      startedAt: session.startedAt,
      deadline: session.deadline,
      hintLevel: session.hintLevel,
      updatedAt: now(),
    };
    save();
  };
  const restoreSession = ({ mode, blockId, questions }) => {
    load();
    const sKey = sessionKey(blockId, mode);
    const saved = progress.sessions[sKey];
    if (!saved || typeof saved !== 'object' || !Array.isArray(saved.queueIds)) return null;
    if (mode === 'test' && saved.deadline != null && now() >= saved.deadline) {
      delete progress.sessions[sKey];
      save();
      return null;
    }
    const byId = new Map(questions.map(question => [questionId(question), question]));
    const queue = saved.queueIds.map(id => byId.get(String(id))).filter(Boolean);
    if (!queue.length) return null;
    const seenIds = new Set(saved.queueIds.map(String));
    const added = questions.filter(question => !seenIds.has(questionId(question)));
    queue.push(...added);
    const index = Math.min(Math.max(Number(saved.index) || 0, 0), queue.length);
    const answers = Array.isArray(saved.answers) ? copy(saved.answers) : [];
    const total = Math.max(Number(saved.total) || 0, questions.length);
    return sync({
      mode,
      blockId,
      queue,
      index,
      current: null,
      finished: false,
      answers,
      total,
      startedAt: Number(saved.startedAt) || now(),
      deadline: saved.deadline ?? null,
      hintLevel: Math.min(3, Math.max(0, Number(saved.hintLevel) || 0)),
      result: null,
    });
  };
  const recordQuestion = (id, correct, assisted) => {
    load();
    const prev = asRecord(progress.questions[id]);
    progress.questions[id] = {
      attempts: (Number(prev.attempts) || 0) + 1,
      correctCount: (Number(prev.correctCount) || 0) + (correct && !assisted ? 1 : 0),
      lastCorrect: Boolean(correct && !assisted),
      assisted: Boolean(assisted),
      lastAnsweredAt: now(),
    };
    save();
  };
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
    if (session.mode !== 'study') {
      load();
      delete progress.sessions[sessionKey(session.blockId, session.mode)];
      save();
    }
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
    hasSavedSession(blockId, mode) {
      load();
      const saved = progress.sessions[sessionKey(blockId, mode)];
      if (!saved || !Array.isArray(saved.queueIds) || !saved.queueIds.length) return false;
      if (mode === 'test' && saved.deadline != null && now() >= saved.deadline) return false;
      return saved.index < saved.queueIds.length;
    },
    completeStudy(blockId) { load(); block(blockId).studied = true; save(); return copy(progress.blocks[blockId]); },
    isUnlocked(blockId, orderedBlockIds) {
      load();
      const index = orderedBlockIds.indexOf(blockId);
      return index === 0 || (index > 0 && Boolean(progress.blocks[orderedBlockIds[index - 1]]?.passed));
    },
    createSession({ mode, blockId, questions, durationMs, weakIds, fresh = false } = {}) {
      if (!['study', 'practice', 'test'].includes(mode)) throw new Error('Invalid session mode');
      if (blockId == null || !Array.isArray(questions)) throw new Error('A blockId and questions are required');
      if (questions.some(question => !question || question.id == null)) throw new Error('Every question needs an id');
      if (!fresh && mode !== 'study') {
        const restored = restoreSession({ mode, blockId, questions });
        if (restored) return restored;
      }
      load();
      const queue = questions.slice();
      if (mode === 'practice') {
        const rank = question => progress.trouble[questionId(question)] ? 2 : Number(Boolean(weakIds?.has(questionId(question))));
        queue.sort((a, b) => rank(b) - rank(a));
      }
      const startedAt = now();
      const session = sync({ mode, blockId, queue, index: 0, current: null, finished: false, answers: [], total: queue.length, startedAt,
        deadline: mode === 'test' && Number.isFinite(durationMs) && durationMs > 0 ? startedAt + durationMs : null,
        hintLevel: 0, result: null });
      if (mode !== 'study') saveSession(session);
      return session;
    },
    useHint(session) {
      if (session.finished || session.mode === 'test') return session.hintLevel;
      session.hintLevel = Math.min(3, session.hintLevel + 1);
      saveSession(session);
      return session.hintLevel;
    },
    answer(session, { correct, assisted = false } = {}) {
      if (session.finished || !session.current) return session;
      if (session.deadline != null && now() >= session.deadline) return finish(session);
      const question = session.current;
      const helped = session.mode !== 'test' && (Boolean(assisted) || session.hintLevel > 0);
      const right = Boolean(correct);
      const qId = questionId(question);
      session.answers.push({ id: qId, correct: right, assisted: helped, hintLevel: session.hintLevel });
      recordQuestion(qId, right, helped);
      if (session.mode !== 'study') updateTrouble(qId, right && !helped);
      if (session.mode === 'practice' && (!right || helped)) {
        // Place the retry after three intervening questions, or at the tail.
        session.queue.splice(Math.min(session.index + 4, session.queue.length), 0, question);
      }
      session.index += 1;
      session.hintLevel = 0;
      const updated = sync(session);
      saveSession(updated);
      return updated;
    },
  };
}
