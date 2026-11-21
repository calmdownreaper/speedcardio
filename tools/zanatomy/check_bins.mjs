// Sanity-check the packed region bins: offsets, index width, index range,
// finite quantised positions, and that every part in models.json decodes.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const manifest = JSON.parse(await readFile(path.join(root, 'msk/models.json'), 'utf8'));
const problems = [];
let total = 0;
for (const [region, info] of Object.entries(manifest.regions)) {
  const bytes = await readFile(path.join(root, 'msk', info.file));
  if (info.bytes !== bytes.byteLength) problems.push(`${region}: bytes mismatch ${info.bytes} != ${bytes.byteLength}`);
  total += bytes.byteLength;
  const Type = info.indexBytes === 2 ? Uint16Array : Uint32Array;
  if (info.indexBytes !== 2 && info.indexBytes !== 4) problems.push(`${region}: bad index width`);
  if (bytes.byteOffset % 2) problems.push(`${region}: buffer misaligned`);
  for (const [id, part] of Object.entries(info.parts)) {
    const [pOffset, pLength] = part.p;
    const [iOffset, iLength] = part.i;
    if (pOffset % 2 || pOffset + pLength * 2 > bytes.byteLength) problems.push(`${region}/${id}: bad position range`);
    if (iOffset % Type.BYTES_PER_ELEMENT || iOffset + iLength * Type.BYTES_PER_ELEMENT > bytes.byteLength) {
      problems.push(`${region}/${id}: bad index range`);
      continue;
    }
    const vertices = pLength / 3;
    if (!Number.isInteger(vertices) || vertices < 3) problems.push(`${region}/${id}: ${vertices} vertices`);
    const indices = new Type(bytes.buffer, bytes.byteOffset + iOffset, iLength);
    if (indices.length % 3) problems.push(`${region}/${id}: index count not a triangle multiple`);
    let max = 0;
    for (const value of indices) if (value > max) max = value;
    if (max >= vertices) problems.push(`${region}/${id}: index ${max} >= ${vertices} vertices`);
    const positions = new Int16Array(bytes.buffer, bytes.byteOffset + pOffset, pLength);
    if (positions.length !== pLength) problems.push(`${region}/${id}: short position read`);
  }
  const parts = Object.keys(info.parts).length;
  console.log(`${region.padEnd(8)} ${parts} parts ${(bytes.byteLength / 1048576).toFixed(2)} MB`);
}
console.log(`total ${(total / 1048576).toFixed(2)} MB, ${Object.values(manifest.regions).reduce((n, r) => n + Object.keys(r.parts).length, 0)} parts`);
if (problems.length) {
  console.error(`FAIL ${problems.length}`);
  for (const problem of problems) console.error(' -', problem);
  process.exitCode = 1;
} else console.log('OK');
