// SpeedMSK typing drills (shared engine: site/typing.js). All regions.
// d3.focus: mesh ids from msk/models.json (muscles) or marker ids (foramina, from regions/skull.js).
import shoulder from './shoulder.js?v=131';
import arm from './arm.js?v=156';
import forearm from './forearm.js?v=157';
import hip from './hip.js?v=157';
import thigh from './thigh.js?v=157';
import leg from './leg.js?v=157';
import trunk from './trunk.js?v=157';
import headneck from './headneck.js?v=157';
import cranium from './cranium.js?v=150';
import { markers } from '../regions/skull.js?v=121';

const FORAMINA = ['foramen_magnum', 'foramen_ovale', 'foramen_rotundum', 'foramen_spinosum', 'jugular_foramen', 'superior_orbital_fissure', 'optic_canal', 'mental_foramen', 'infraorbital_foramen'];
const BONE = { foramen_magnum: 'occipital', jugular_foramen: 'occipital', foramen_ovale: 'sphenoid', foramen_rotundum: 'sphenoid', foramen_spinosum: 'sphenoid', superior_orbital_fissure: 'sphenoid', optic_canal: 'sphenoid', mental_foramen: 'mandible', infraorbital_foramen: 'maxilla' };
const RADIUS = { foramen_magnum: 16, foramen_ovale: 5, foramen_rotundum: 4, foramen_spinosum: 3, jugular_foramen: 6, superior_orbital_fissure: 7, optic_canal: 4, mental_foramen: 3, infraorbital_foramen: 3 };
// Canal direction (world mm: -y = anterior, +z = up); x is mirrored per side.
const pts = id => Array.isArray(markers[id][0]) ? markers[id] : [markers[id]]; // one point or one per side
const DIR = { foramen_magnum: [0, 0, 1], jugular_foramen: [-.2, .3, 1], foramen_ovale: [0, -.2, 1], foramen_spinosum: [0, 0, 1],
  foramen_rotundum: [0, -1, .1], superior_orbital_fissure: [.35, -1, .15], optic_canal: [.3, -1, 0], mental_foramen: [.35, -1, .45], infraorbital_foramen: [0, -1, -.4] }; // mental canal opens up, back and out
const route = (pt, [dx, dy, dz]) => {
  const sx = Math.sign(pt[0]) || 1, n = Math.hypot(dx, dy, dz), d = [dx * sx / n, dy / n, dz / n];
  return [-16, -8, 0, 8, 16].map(t => pt.map((v, k) => +(v - d[k] * t).toFixed(1)));
};
const patch = (pts, r) => p => Math.max(...pts.map(c => Math.exp(-((p[0] - c[0]) ** 2 + (p[1] - c[1]) ** 2 + (p[2] - c[2]) ** 2) / (2 * r * r))));
export const title = ['SpeedMSK · Typing drills', 'SpeedMSK · Treino de digitação'];
export const decks = [shoulder, arm, forearm, hip, thigh, leg, trunk, headneck, cranium];
export const model3d = {
  // <id>_path: the route through the opening, one short glowing line per side (inside the skull → out).
  landmarks: Object.fromEntries(FORAMINA.filter(id => markers[id]).map(id => [`${id}_path`, pts(id).map(pt => route(pt, DIR[id]))])),
  // The bone around each opening also glows (soft patch on both sides).
  areas: Object.fromEntries(FORAMINA.filter(id => markers[id]).map(id => [id, { mesh: BONE[id], both: true, gain: .55, weight: patch(pts(id), (RADIUS[id] || 6) * .6) }])),
  frame: ['scapula', 'humerus'],
  themeGlow: true,
};
