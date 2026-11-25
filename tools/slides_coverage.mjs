// Slide coverage: which content slides have no question yet.
// node site/tools/slides_coverage.mjs   (run from the project root)
import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const DECKS = [
  ['heart', 'heart.js', 'H'], ['aorta', 'arteries.js', 'A'], ['veins', 'veins.js', 'V'], ['lymph', 'lymph.js', 'L'],
  ['cardiogenesis', 'cardiogenesis.js', 'C'], ['resp1', 'airways_upper.js', 'R1-'], ['resp2', 'airways_lower.js', 'R2-'],
];
const SKIP = JSON.parse(fs.existsSync(path.join(ROOT, 'research/prof_slides/cobertura/skip.json')) ? fs.readFileSync(path.join(ROOT, 'research/prof_slides/cobertura/skip.json'), 'utf8') : '{}');
let rowsOut = [];
for (const [deck, file, prefix] of DECKS) {
  const total = fs.readdirSync(path.join(ROOT, 'research/prof_slides', deck)).filter(f => /^p\d+\.jpg$/.test(f)).length;
  const bank = path.join(ROOT, 'site/subjects/cardio/slides', file);
  if (!fs.existsSync(bank)) { rowsOut.push(`| ${deck} | ${total} | — | missing bank |`); continue; }
  const rows = (await import(pathToFileURL(bank).href)).default;
  const refs = new Set(rows.flatMap(r => { const [a, b] = String(r.ref).replace(prefix, '').split('–').map(Number); return b ? Array.from({ length: b - a + 1 }, (_, k) => a + k) : [a]; }));
  const skip = new Set(SKIP[deck] || [1]);
  const missing = [];
  for (let n = 1; n <= total; n++) if (!refs.has(n) && !skip.has(n)) missing.push(prefix + n);
  const content = total - skip.size;
  rowsOut.push(`| ${deck} | ${total} | ${content - missing.length}/${content} | ${rows.length} | ${missing.join(' ') || '—'} |`);
}
console.log('| Deck | Slides | Content slides covered | Questions | Uncovered |\n|---|---|---|---|---|\n' + rowsOut.join('\n'));
