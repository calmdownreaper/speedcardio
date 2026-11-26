// SpeedGastro aulas: one module per professor deck (Prof. Fiume). Each module
// exports { unit, blocks, pt }. Blocks carry raw question rows; this file turns
// them into SLIDE_QUESTIONS with the same stable id/answer formula as cardio.
import * as oral from './oral.js?v=115';
import * as salivary from './salivary.js?v=115';
import * as pharynx from './pharynx.js?v=115';
import * as oesophagus from './oesophagus.js?v=115';
import * as peritoneum from './peritoneum.js?v=115';
import * as stomach from './stomach.js?v=115';
import * as liver from './liver.js?v=115';
import * as duodenum from './duodenum.js?v=115';
import * as jejunoileum from './jejunoileum.js?v=115';
import * as largeint from './largeint.js?v=115';
import * as rectum from './rectum.js?v=115';
import * as pancreas from './pancreas.js?v=115';
import * as gbspleen from './gbspleen.js?v=115';

const DECKS = [oral, salivary, pharynx, oesophagus, peritoneum, stomach, liver, duodenum, jejunoileum, largeint, rectum, pancreas, gbspleen];

export const SLIDE_UNITS = Object.fromEntries(DECKS.map(({ unit }) =>
  [unit.id, { label: unit.label, visible: unit.visible, ghost: unit.ghost, view: unit.view }]));

export const SLIDE_QUESTIONS = DECKS.flatMap(({ unit, blocks }) => blocks.flatMap(block => block.questions).map((row, index) => {
  const choices = [row.correct, ...row.wrong];
  const answer = (index * 3 + unit.id.length) % choices.length;
  const { pt, ...plain } = row;
  return {
    ...plain, unit: unit.id, id: `${unit.id}:${row.ref}:${row.q}`, answer, highlight: false,
    options: choices.map((_, position) => choices[(position - answer + choices.length) % choices.length]),
  };
}));

export const AULAS = DECKS.flatMap(({ unit, blocks }) => blocks.map(({ questions, ...block }) => ({
  ...block, unit: unit.id, questionIds: questions.map(row => `${unit.id}:${row.ref}:${row.q}`),
})));

// Question rows may carry pt: { q, correct, wrong: [3], why } for the pt-BR pairs.
const rowPairs = row => {
  if (!row.pt) return [];
  const en = [row.q, row.correct, ...row.wrong, row.why];
  const pt = [row.pt.q, row.pt.correct, ...(row.pt.wrong || []), row.pt.why];
  return en.map((text, i) => [text, pt[i]]).filter(([, value]) => value);
};

export const AULAS_PT = Object.assign({}, ...DECKS.map(deck => deck.pt),
  Object.fromEntries(DECKS.flatMap(({ blocks }) => blocks.flatMap(block => block.questions.flatMap(rowPairs)))));
