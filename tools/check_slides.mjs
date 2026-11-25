// Validate a professor-slides question bank: node site/tools/check_slides.mjs site/subjects/cardio/slides/heart.js
import { DECKS } from '../subjects/cardio/data.js';
import path from 'path';
import { pathToFileURL } from 'url';
const ids = new Set(DECKS.flatMap(d => d.itens.map(i => i.id)));
const VIEWS = new Set(['ant', 'post', 'sup', 'inf', 'dir', 'esq']);
let bad = 0;
for (const file of process.argv.slice(2)) {
  const rows = (await import(pathToFileURL(path.resolve(file)).href + '?t=' + Date.now())).default;
  const seen = new Set();
  const err = (i, m) => { bad++; console.log(`${path.basename(file)} #${i} [${rows[i]?.ref}] ${m}`); };
  if (!Array.isArray(rows)) { console.log(file, 'default export is not an array'); bad++; continue; }
  rows.forEach((r, i) => {
    for (const k of ['ref', 'topic', 'q', 'correct', 'why']) if (typeof r[k] !== 'string' || !r[k].trim()) err(i, `missing ${k}`);
    if (!/^(H|A|V|L|C|R1-|R2-)\d+(–\d+)?$/.test(r.ref || '')) err(i, `bad ref "${r.ref}" (use H12, A7, V3, L5, C20, R1-24, R2-31)`);
    if (!Array.isArray(r.wrong) || r.wrong.length !== 3) err(i, 'wrong must have exactly 3 options');
    const opts = [r.correct, ...(r.wrong || [])].map(s => String(s).trim().toLowerCase());
    if (new Set(opts).size !== opts.length) err(i, 'duplicate option (or correct repeated in wrong)');
    if ((r.q || '').length > 200) err(i, `q too long (${r.q.length} > 200)`);
    [r.correct, ...(r.wrong || [])].forEach(o => { if (String(o).length > 90) err(i, `option too long: ${o}`); });
    if ((r.why || '').length > 300) err(i, `why too long (${r.why.length} > 300)`);
    for (const f of r.focus || []) if (!ids.has(f)) err(i, `unknown focus id "${f}"`);
    if (r.view && !VIEWS.has(r.view)) err(i, `bad view "${r.view}"`);
    const key = (r.q || '').trim().toLowerCase();
    if (seen.has(key)) err(i, 'duplicate question'); seen.add(key);
  });
  const longest = rows.filter(r => [r.correct, ...(r.wrong || [])].every(o => String(r.correct).length >= String(o).length)).length;
  if (rows.length >= 10 && longest / rows.length > 0.4) { bad++; console.log(`${path.basename(file)}: correct option is the longest in ${longest}/${rows.length} rows (>40%) — shorten correct answers or lengthen distractors`); }
  console.log(`${path.basename(file)}: ${rows.length} questions, refs ${new Set(rows.map(r => r.ref)).size}`);
}
console.log(bad ? `${bad} problem(s)` : 'OK');
process.exit(bad ? 1 : 0);
