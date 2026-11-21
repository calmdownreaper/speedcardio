// Validate the SpeedMSK region modules without a browser.
// Usage: node tools/validate_msk.mjs
import { readdir, readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dir = path.join(root, 'subjects/msk/regions');
const files = (await readdir(dir)).filter(name => name.endsWith('.js')).sort();
const problems = [];
const notes = [];

const manifest = JSON.parse(await readFile(path.join(root, 'msk/models.json'), 'utf8'));
const meshIds = new Set(Object.values(manifest.regions).flatMap(region => Object.keys(region.parts)));

const modules = [];
for (const file of files) {
  const mod = await import(pathToFileURL(path.join(dir, file)).href);
  modules.push({ file, mod });
}

const items = new Map();
const markers = new Map();
const lessonOwner = new Map();
const cueOwner = new Map();
const clueOwner = new Map();
const colorOwner = new Map();
for (const { file, mod } of modules) {
  const region = mod.region?.id || file.replace('.js', '');
  if (!mod.deck || !Array.isArray(mod.deck.itens) || !mod.deck.itens.length) problems.push(`${file}: missing deck items`);
  if (!mod.region || !mod.region.id || !mod.region.title) problems.push(`${file}: missing region {id,title}`);
  if (!Array.isArray(mod.levels) || !mod.levels.length) problems.push(`${file}: missing levels`);
  if (!mod.lessons || !mod.lessonCues || !mod.roundClues || !mod.content) problems.push(`${file}: missing content maps`);
  for (const item of mod.deck?.itens || []) {
    if (items.has(item.id)) problems.push(`${file}: duplicate item id ${item.id} (also ${items.get(item.id).file})`);
    items.set(item.id, { ...item, file, region });
    if (!item.pt || item.pt.includes('-')) problems.push(`${file}: canonical pt has a hyphen: ${item.pt}`);
    if (/[()]/.test(item.pt)) problems.push(`${file}: canonical pt has parentheses: ${item.pt}`);
    if (!item.en || !Array.isArray(item.alt) || !item.dica || !Array.isArray(item.fatos) || !item.fatos.length) {
      problems.push(`${file}: incomplete deck item ${item.id}`);
    }
    if (!mod.colors?.[item.id]) problems.push(`${file}: no color for ${item.id}`);
    if (!mod.lessons?.[item.id]) problems.push(`${file}: no lesson for ${item.id}`);
    else if (!mod.lessons[item.id].lead || !mod.lessons[item.id].where || !mod.lessons[item.id].function) {
      problems.push(`${file}: lesson missing lead/where/function for ${item.id}`);
    }
    if (!mod.lessonCues?.[item.id]) problems.push(`${file}: no lesson cue for ${item.id}`);
    if (!mod.roundClues?.[item.id]) problems.push(`${file}: no round clue for ${item.id}`);
    for (const [map, id, owner, label] of [
      [mod.lessons, item.id, lessonOwner, 'lesson'],
      [mod.lessonCues, item.id, cueOwner, 'lesson cue'],
      [mod.roundClues, item.id, clueOwner, 'round clue'],
      [mod.colors, item.id, colorOwner, 'color'],
    ]) {
      if (!map?.[id]) continue;
      if (owner.has(id) && owner.get(id) !== file) problems.push(`${file}: duplicate ${label} for ${id} (also ${owner.get(id)})`);
      else owner.set(id, file);
    }
    const clue = `${mod.roundClues?.[item.id] || ''} ${item.dica || ''}`.toLowerCase();
    const name = item.pt.toLowerCase().replace(/[^a-z ]/g, '');
    if (name && clue.includes(name)) problems.push(`${file}: round clue leaks the name for ${item.id}`);
  }
  for (const [id, points] of Object.entries(mod.markers || {})) {
    if (markers.has(id)) problems.push(`${file}: duplicate marker id ${id}`);
    markers.set(id, points);
    if (!Array.isArray(points) || !points.length) problems.push(`${file}: bad marker coordinates for ${id}`);
  }
}

for (const { file, mod } of modules) {
  const region = mod.region?.id || file.replace('.js', '');
  if (!Array.isArray(mod.levels) || !mod.levels.length) continue;
  const levelIds = new Set(mod.levels.flatMap(level => level.ids || []));
  for (const item of mod.deck?.itens || []) {
    if (!levelIds.has(item.id)) problems.push(`${file}: deck item ${item.id} is not in any level`);
  }
  const required = mod.levels.filter(level => !level.bonus).length;
  if (mod.levels.at(-1)?.bonus !== true) problems.push(`${file}: last level is not the bonus level`);
  if (required < 1) problems.push(`${file}: no required levels`);
  mod.levels.forEach((level, index) => {
    const id = `${region}-${level.bonus ? '30l' : index + 1}`;
    if (!Array.isArray(level.ids) || !level.ids.length) problems.push(`${file}: level ${id} has no ids`);
    for (const key of level.ids || []) {
      if (!items.has(key)) problems.push(`${file}: level ${id} references unknown id ${key}`);
    }
    const content = mod.content || {};
    if (!content.LEVEL_OVERVIEW?.[id]) problems.push(`${file}: no LEVEL_OVERVIEW for ${id}`);
    const contrast = content.LEVEL_CONTRAST?.[id];
    if (!contrast) problems.push(`${file}: no LEVEL_CONTRAST for ${id}`);
    else {
      if (!level.ids.includes(contrast.a) || !level.ids.includes(contrast.b)) problems.push(`${file}: contrast ids not in ${id}`);
      if (contrast.a === contrast.b) problems.push(`${file}: contrast repeats the same id in ${id}`);
    }
    const checks = content.LEVEL_CHECK?.[id];
    if (!Array.isArray(checks) || checks.length < 3) problems.push(`${file}: fewer than 3 checks for ${id}`);
    for (const question of checks || []) {
      if (!question.q || !Array.isArray(question.options) || question.options.length !== 4) problems.push(`${file}: bad options in ${id}`);
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer > 3) problems.push(`${file}: bad answer index in ${id}`);
      if (question.exam !== true) problems.push(`${file}: check not tagged exam:true in ${id}`);
      if (!question.why) problems.push(`${file}: check has no explanation in ${id}`);
    }
  });
}

for (const [id, item] of items) {
  const hasMesh = meshIds.has(id);
  const hasMarker = markers.has(id);
  if (!hasMesh && !hasMarker) problems.push(`${item.file}: ${id} has neither mesh nor marker`);
  if (hasMesh && hasMarker) problems.push(`${item.file}: ${id} has both mesh and marker`);
}
for (const id of markers.keys()) {
  if (!items.has(id)) problems.push(`marker ${id} has no deck item`);
}
const VIEW_KEYS = new Set(['ant', 'post', 'dir', 'esq', 'sup', 'inf']);
for (const { file, mod } of modules) {
  const markerIds = new Set(Object.keys(mod.markers || {}));
  for (const id of markerIds) {
    const meta = mod.markerMeta?.[id];
    if (!meta) { problems.push(`${file}: no markerMeta for ${id}`); continue; }
    if (!VIEW_KEYS.has(meta.view)) problems.push(`${file}: bad marker view for ${id}: ${meta.view}`);
    if (!Array.isArray(meta.anchors) || !meta.anchors.length) problems.push(`${file}: no anchor bones for ${id}`);
    for (const anchor of meta.anchors || []) {
      if (!items.has(anchor)) problems.push(`${file}: anchor ${anchor} of ${id} has no deck item`);
      if (!meshIds.has(anchor)) problems.push(`${file}: anchor ${anchor} of ${id} has no mesh`);
      if (anchor === id) problems.push(`${file}: marker ${id} anchors to itself`);
    }
  }
  for (const id of Object.keys(mod.markerMeta || {})) {
    if (!markerIds.has(id)) problems.push(`${file}: markerMeta for non-marker ${id}`);
  }
}
notes.push(`${files.length} region modules, ${items.size} items, ${markers.size} markers, ${meshIds.size} mesh parts`);
for (const { filed, mod } of []) { /* noop */ }
for (const { file, mod } of modules) {
  notes.push(`${file}: ${mod.deck.itens.length} items, ${mod.levels.length} levels (${mod.levels.filter(level => level.bonus).length} bonus), ${Object.values(mod.content.LEVEL_CHECK || {}).flat().length} checks`);
}

if (problems.length) {
  console.error(`FAIL ${problems.length} problem(s)`);
  for (const problem of problems) console.error(' -', problem);
  process.exitCode = 1;
} else {
  console.log('OK');
}
for (const note of notes) console.log(note);
