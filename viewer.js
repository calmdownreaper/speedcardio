import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ITEMS } from './study.js?v=60';

export const VIEWS = {
  ant: [0, -1, .15],
  post: [0, 1, .15],
  dir: [-1, 0, .1],
  esq: [1, 0, .1],
  sup: [0, -.25, 1],
  inf: [0, -.25, -1],
};

const VERSION = '?v=60';
const GHOST_ORDER = 1;
const GHOST_DEFAULT = 40;

function fetchJSON(url) {
  return fetch(url, { cache: 'force-cache' }).then(response => {
    if (!response.ok) throw new Error('Model index unavailable');
    return response.json();
  });
}

export async function createViewer(host, onPick, onUnavailable, onExplore, source = {}) {
  const baseColor = source.baseColor || (id => source.colors?.[id] || source.defaultColor || '#d9b38c');
  const markerSource = source.markers || {};
  const regionMode = source.kind === 'regions';
  const markerPoints = new Map();
  // Landmark spots: the active landmark is painted onto the bone surface as a
  // glowing disc with a rim, so a foramen or joint reads on the bone itself
  // instead of as a floating dot.
  const MAX_SPOTS = 8;
  const spotUniforms = {
    uSpots: { value: Array.from({ length: MAX_SPOTS }, () => new THREE.Vector4()) },
    uSpotCount: { value: 0 },
    uSpotColor: { value: new THREE.Color() },
  };
  function addSpots(material) {
    material.onBeforeCompile = shader => {
      Object.assign(shader.uniforms, spotUniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', '#include <common>\nvarying vec3 vSpotWorld;')
        .replace('#include <project_vertex>', '#include <project_vertex>\nvSpotWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;');
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', `#include <common>
varying vec3 vSpotWorld;
uniform vec4 uSpots[${MAX_SPOTS}];
uniform int uSpotCount;
uniform vec3 uSpotColor;`)
        .replace('#include <opaque_fragment>', `#include <opaque_fragment>
float spot = 0.0;
float shade = 0.0;
for (int i = 0; i < ${MAX_SPOTS}; i++) {
  if (i >= uSpotCount) break;
  float r = uSpots[i].w;
  // Measure across the line of sight so a joint buried between two bones
  // still lights the bone surface that covers it; fade with depth offset.
  vec3 toFrag = vSpotWorld - uSpots[i].xyz;
  vec3 sight = normalize(uSpots[i].xyz - cameraPosition);
  float along = dot(toFrag, sight);
  float d = length(toFrag - along * sight);
  float reach = 1.0 - smoothstep(r * 4.0, r * 7.0, abs(along));
  float fill = 1.0 - smoothstep(r * 0.7, r * 0.85, d);
  float rim = 1.0 - smoothstep(0.0, r * 0.1, abs(d - r * 0.92));
  // A dark band just outside the rim separates the spot from pale bone.
  float edge = 1.0 - smoothstep(0.0, r * 0.18, abs(d - r * 1.12));
  float here = max(fill * 0.85, rim) * reach;
  spot = max(spot, here);
  shade = max(shade, edge * reach * (1.0 - spot));
}
gl_FragColor.rgb = mix(gl_FragColor.rgb, uSpotColor, spot);
gl_FragColor.rgb *= 1.0 - 0.55 * shade;
gl_FragColor.a = max(gl_FragColor.a, max(spot, shade * 0.7));`);
    };
    material.customProgramCacheKey = () => 'spots';
  }
  let packs = new Map();
  let manifest = null;
  let meta;
  let buffer;
  let IndexArray;
  if (regionMode) {
    manifest = await fetchJSON(`${source.manifest}${VERSION}`);
    meta = { center: manifest.center, scale: manifest.scale, parts: {} };
    for (const [region, info] of Object.entries(manifest.regions)) {
      for (const id of Object.keys(info.parts)) meta.parts[id] = { region };
    }
    for (const [id, points] of Object.entries(markerSource)) markerPoints.set(id, points);
  } else {
    [meta, buffer] = await Promise.all([
      fetchJSON(`${source.manifest || './models.json'}${VERSION}`),
      fetch(`${source.parts || './models.bin'}${VERSION}`).then(response => {
        if (!response.ok) throw new Error('Model geometry unavailable');
        return response.arrayBuffer();
      }),
    ]);
    IndexArray = meta.indexBytes === 2 ? Uint16Array : Uint32Array;
    const bytes = meta.bytes ?? Math.max(...Object.values(meta.parts).map(part => part.i[0] + part.i[1] * IndexArray.BYTES_PER_ELEMENT));
    if (buffer.byteLength !== bytes) throw new Error('Model geometry does not match its index');
    for (const [id, points] of Object.entries(markerSource)) markerPoints.set(id, points);
  }
  function readTone() {
    const css = getComputedStyle(document.documentElement);
    const token = (name, fallback) => css.getPropertyValue(name).trim() || css.getPropertyValue(fallback).trim();
    const theme = document.documentElement.dataset.theme;
    const light = theme === 'light' || (theme === 'system' && matchMedia('(prefers-color-scheme: light)').matches);
    return {
      select: token('--model-select', '--accent'),
      selectDeep: token('--model-select-deep', '--accent-soft'),
      accent: token('--accent', '--model-select'),
      accentGlow: light ? .06 : .14,
      ghostColor: light ? 0x55514b : 0x9a9690,
      ghostMax: light ? .25 : .22,
      tint: token('--model-tint', '--soft'),
      axis: token('--model-axis', '--accent-2'),
      labelBg: token('--model-label-bg', '--model'),
      labelInk: token('--model-label-ink', '--accent-2'),
      sky: token('--model-light-sky', '--ink'),
      ground: token('--model-light-ground', '--model'),
      key: token('--model-light-key', '--ink'),
      rim: token('--model-light-rim', '--accent-2'),
    };
  }
  let tone = readTone();

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.setAttribute('aria-label', 'Rotatable anatomical model');
  if (regionMode) {
    // Three.js still depth-sorts transparent objects with equal renderOrder.
    // Keep interlocking ghosts in a fixed order and preserve overlay sorting.
    renderer.setTransparentSort((a, b) =>
      a.groupOrder - b.groupOrder || a.renderOrder - b.renderOrder
      || (a.renderOrder === GHOST_ORDER ? 0 : b.z - a.z) || a.id - b.id);
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .01, 50);
  camera.up.set(0, 0, 1);
  camera.position.set(0, -3, .5);
  const hemi = new THREE.HemisphereLight(tone.sky, tone.ground, 1.25);
  scene.add(hemi);
  const light = new THREE.DirectionalLight(tone.key, 2.1);
  camera.add(light);
  light.position.set(-2, 3, 4);
  const rim = new THREE.DirectionalLight(tone.rim, 1.1);
  rim.position.set(3, 1, 2);
  scene.add(camera, rim);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.enablePan = false;
  controls.enableZoom = true;
  controls.zoomSpeed = .9;
  controls.rotateSpeed = .8;
  controls.minDistance = .05;
  controls.maxDistance = 8;
  controls.zoomToCursor = true;

  const meshes = new Map();
  let pickable = [];

  const loadingPacks = new Map();
  function loadPack(region) {
    if (packs.has(region)) return Promise.resolve(packs.get(region));
    if (loadingPacks.has(region)) return loadingPacks.get(region);
    const info = manifest.regions[region];
    const url = new URL(info.file, new URL(source.manifest, location.href)).href;
    const request = fetch(`${url}${VERSION}`).then(response => {
      if (!response.ok) throw new Error('Model geometry unavailable');
      return response.arrayBuffer();
    }).then(bytes => {
      const Type = info.indexBytes === 2 ? Uint16Array : Uint32Array;
      if (info.bytes && bytes.byteLength !== info.bytes) throw new Error('Model geometry does not match its index');
      const pack = { meta: info, buffer: bytes, IndexArray: Type };
      packs.set(region, pack);
      loadingPacks.delete(region);
      return pack;
    }).catch(error => {
      loadingPacks.delete(region);
      throw error;
    });
    loadingPacks.set(region, request);
    return request;
  }

  function ensurePacks(ids) {
    if (!regionMode) return null;
    const regions = new Set();
    for (const id of ids) {
      const region = meta.parts[id]?.region;
      if (region && !packs.has(region)) regions.add(region);
    }
    if (!regions.size) return null;
    return Promise.all([...regions].map(loadPack));
  }

  function loadedFor(ids) {
    if (!regionMode) return ids.every(id => markerPoints.has(id) || Object.hasOwn(meta.parts, id));
    return ids.every(id => markerPoints.has(id) || packs.has(meta.parts[id]?.region));
  }

  function meshFor(id) {
    if (meshes.has(id)) return meshes.get(id);
    if (!Object.hasOwn(meta.parts, id)) return;
    let part;
    let partBuffer;
    let PartIndex;
    if (regionMode) {
      const region = meta.parts[id].region;
      const pack = packs.get(region);
      if (!pack) return;
      part = pack.meta.parts[id];
      partBuffer = pack.buffer;
      PartIndex = pack.IndexArray;
    } else {
      part = meta.parts[id];
      partBuffer = buffer;
      PartIndex = IndexArray;
    }
    if (!part) return;
    const packed = new Int16Array(partBuffer, part.p[0], part.p[1]);
    const positions = Float32Array.from(packed, value => value / 32767);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(new PartIndex(partBuffer, part.i[0], part.i[1]), 1));
    geometry.computeVertexNormals();
    geometry.computeBoundingBox();
    const material = new THREE.MeshStandardMaterial({
      color: baseColor(id), roughness: .52, side: THREE.DoubleSide,
      transparent: !regionMode, forceSinglePass: true,
    });
    if (regionMode) addSpots(material);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData.id = id;
    mesh.visible = false;
    meshes.set(id, mesh);
    scene.add(mesh);
    return mesh;
  }

  // Point markers stand in for structures that have no mesh (foramina, joint
  // spaces, ligaments). They live in the same normalized frame as vertices.
  const markerMeshes = new Map();
  let markerGeometry;
  const markerSize = source.markerSize || .018;
  function haloTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext('2d');
    // A faint glow with one fine ring just outside the marker rim: the focus
    // reads on both pale bone and the dark model background without bloom.
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(255,255,255,.24)');
    gradient.addColorStop(.45, 'rgba(255,255,255,.17)');
    gradient.addColorStop(.66, 'rgba(255,255,255,.05)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
    ctx.beginPath();
    ctx.arc(64, 64, 41, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,.95)';
    ctx.lineWidth = 4;
    ctx.stroke();
    return new THREE.CanvasTexture(canvas);
  }
  let haloMaterial;
  function markerPosition(raw) {
    const point = new THREE.Vector3(raw[0], raw[1], raw[2]);
    if (source.markerSpace === 'world' && meta.center && meta.scale) {
      point.set((raw[0] - meta.center[0]) / meta.scale,
        (raw[1] - meta.center[1]) / meta.scale,
        (raw[2] - meta.center[2]) / meta.scale);
    }
    return point;
  }
  function createMarkers(id) {
    markerGeometry ??= new THREE.SphereGeometry(1, 14, 10);
    if (!haloMaterial) {
      haloMaterial = new THREE.SpriteMaterial({
        map: haloTexture(), color: tone.axis, transparent: true, opacity: .68,
        depthTest: false, depthWrite: false, toneMapped: false,
      });
    }
    const points = markerPoints.get(id);
    const list = (Array.isArray(points[0]) ? points : [points]).map(raw => {
      const material = new THREE.MeshBasicMaterial({
        color: '#24262c', transparent: true, opacity: .9, depthTest: false,
        depthWrite: false, toneMapped: false,
      });
      const marker = new THREE.Mesh(markerGeometry, material);
      const fill = new THREE.Mesh(markerGeometry, material.clone());
      fill.scale.setScalar(.82);
      fill.renderOrder = 1002;
      marker.add(fill);
      marker.userData.fill = fill.material;
      const halo = new THREE.Sprite(haloMaterial);
      halo.scale.set(4.6, 4.6, 1);
      halo.renderOrder = 1000;
      halo.visible = false;
      marker.add(halo);
      marker.userData.halo = halo;
      marker.position.copy(markerPosition(raw));
      marker.scale.setScalar(markerSize);
      marker.userData.id = id;
      marker.userData.marker = true;
      marker.renderOrder = 1001;
      marker.visible = false;
      scene.add(marker);
      return marker;
    });
    markerMeshes.set(id, list);
    return list;
  }

  function removeMarkers(id, list) {
    for (const marker of list) {
      scene.remove(marker);
      marker.material.dispose();
      marker.userData.fill.dispose();
    }
    markerMeshes.delete(id);
  }

  // Labels are DOM pins: the text stays crisp at every zoom and follows the
  // theme tokens without repainting a texture.
  const annotationLayer = document.createElement('div');
  annotationLayer.className = 'view-annotations';
  annotationLayer.hidden = true;
  annotationLayer.setAttribute('aria-hidden', 'true');
  host.append(annotationLayer);
  const labelPins = new Map();
  function labelPin(id) {
    let pin = labelPins.get(id);
    if (pin) return pin;
    const line = document.createElement('span');
    line.className = 'marker-leader';
    line.hidden = true;
    const tag = document.createElement('span');
    tag.className = 'marker-tag';
    tag.hidden = true;
    annotationLayer.append(line, tag);
    pin = { id, line, tag, text: '' };
    labelPins.set(id, pin);
    return pin;
  }
  function hidePin(pin) {
    pin.line.hidden = true;
    pin.tag.hidden = true;
  }
  const labelPoint = new THREE.Vector3();
  function placeLabel(pin, marker, width, height) {
    if (!current.markerLabels || !current.focus?.includes(pin.id)) return hidePin(pin);
    labelPoint.copy(marker.position).project(camera);
    if (labelPoint.z < -1 || labelPoint.z > 1) return hidePin(pin);
    const x = (labelPoint.x * .5 + .5) * width;
    const y = (-labelPoint.y * .5 + .5) * height;
    if (x < -20 || x > width + 20 || y < -20 || y > height + 20) return hidePin(pin);
    const name = ITEMS[pin.id]?.pt;
    if (!name) return hidePin(pin);
    if (pin.text !== name) {
      pin.tag.textContent = name;
      pin.text = name;
    }
    pin.tag.hidden = false;
    const tagWidth = pin.tag.offsetWidth;
    const tagHeight = pin.tag.offsetHeight;
    // Short views (phone atlas, lesson stages) need the label closer so it can
    // sit between the focused structure's markers instead of across them.
    const compact = height < 260;
    const liftGap = compact ? 18 : 40;
    const sideGap = compact ? 18 : 26;
    const minSide = compact ? 48 : 64;
    const toLeft = x > width * .58;
    const lift = y < tagHeight + liftGap + 18 ? 1 : -1;
    const tagX = THREE.MathUtils.clamp(
      x + (toLeft ? -1 : 1) * Math.max(minSide, tagWidth * .5 + sideGap),
      tagWidth * .5 + 10,
      Math.max(tagWidth * .5 + 10, width - tagWidth * .5 - 10),
    );
    const tagY = THREE.MathUtils.clamp(
      y + lift * (tagHeight * .5 + liftGap),
      tagHeight * .5 + 10,
      Math.max(tagHeight * .5 + 10, height - tagHeight * .5 - 10),
    );
    pin.tag.style.left = `${tagX}px`;
    pin.tag.style.top = `${tagY}px`;
    const dx = tagX - x;
    const dy = tagY - y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    // Start at the rim of the 10 px marker instead of its centre.
    const gap = 9;
    pin.line.hidden = length - gap < 8;
    if (pin.line.hidden) return;
    pin.line.style.left = `${x + Math.cos(angle) * gap}px`;
    pin.line.style.top = `${y + Math.sin(angle) * gap}px`;
    pin.line.style.width = `${length - gap}px`;
    pin.line.style.transform = `rotate(${angle}rad)`;
  }
  let labeledIds = [];
  let hasFocusedMarker = false;
  function updateLabels() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    for (const id of labeledIds) {
      const list = markerMeshes.get(id);
      const pin = labelPin(id);
      let nearest = list[0];
      let best = Infinity;
      for (const marker of list) {
        const distance = marker.position.distanceToSquared(camera.position);
        if (distance < best) {
          best = distance;
          nearest = marker;
        }
      }
      placeLabel(pin, nearest, width, height);
    }
  }

  // Focus annotations belong to the focus API, independent of model geometry.
  const axis = new THREE.Group();
  let axisTube;
  function paintLabel(canvas, text) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = tone.labelBg; ctx.fillRect(0, 0, 256, 96);
    ctx.font = 'bold 48px sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = tone.labelInk; ctx.fillText(text, 128, 65);
  }
  function endpointLabel(text, point, scale) {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 96;
    paintLabel(canvas, text);
    const texture = new THREE.CanvasTexture(canvas);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, depthWrite: false, toneMapped: false }));
    label.userData.label = { canvas, text };
    label.position.copy(point); label.position.x += scale * .12;
    label.scale.set(scale * .25, scale * .094, 1);
    label.renderOrder = 1000;
    return label;
  }
  function focus(ids, options = {}) {
    paint({ ...current, ...options, focus: ids, close: options.close ?? true, subtleFocus: false });
  }
  function focusAxis(enabled) {
    if (!enabled) { scene.remove(axis); if (axisTube) scene.remove(axisTube); schedule(); return; }
    if (!axis.children.length) {
      scene.updateMatrixWorld(true);
      const atrium = meshFor('ae');
      const ventricle = meshFor('ve');
      if (!atrium || !ventricle) return;
      const base = atrium.localToWorld(atrium.geometry.boundingBox.getCenter(new THREE.Vector3()));
      const vertices = ventricle.geometry.attributes.position;
      const bounds = ventricle.geometry.boundingBox;
      const size = bounds.getSize(new THREE.Vector3());
      const apex = new THREE.Vector3();
      let best = Infinity;
      // +X is the patient's left; favour inferior vertices nearest the left lateral border.
      for (let i = 0; i < vertices.count; i++) {
        const score = (vertices.getZ(i) - bounds.min.z) / size.z
          + .15 * (bounds.max.x - vertices.getX(i)) / size.x;
        if (score < best) { best = score; apex.fromBufferAttribute(vertices, i); }
      }
      ventricle.localToWorld(apex);
      const modelBounds = new THREE.Box3();
      for (const id of current.ids) {
        const mesh = meshFor(id);
        if (mesh) modelBounds.union(new THREE.Box3().setFromObject(mesh));
      }
      const modelSize = modelBounds.getSize(new THREE.Vector3());
      const radius = Math.max(modelSize.x, modelSize.y, modelSize.z) * .015;
      const length = base.distanceTo(apex);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 20),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(tone.axis), depthTest: false, transparent: true, opacity: 1, depthWrite: false, toneMapped: false }));
      tube.position.copy(base).add(apex).multiplyScalar(.5);
      tube.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), apex.clone().sub(base).normalize());
      tube.renderOrder = 999;
      axisTube = tube;
      axis.add(endpointLabel('Base', base, length), endpointLabel('Apex', apex, length));
    }
    scene.add(axis, axisTube);
    schedule();
  }

  let current = { ids: [] };
  let animation;
  let scheduled = false;
  let unavailable = false;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const markerOffset = new THREE.Vector3();
  const cameraDirection = new THREE.Vector3();

  function schedule() {
    if (scheduled || unavailable) return;
    scheduled = true;
    requestAnimationFrame(draw);
  }

  function draw(now) {
    scheduled = false;
    if (unavailable || !host.clientWidth) return;
    if (animation) {
      const fraction = Math.min(1, (now - animation.start) / 350);
      const ease = 1 - (1 - fraction) ** 3;
      camera.position.lerpVectors(animation.from, animation.to, ease);
      controls.target.lerpVectors(animation.origin, animation.center, ease);
      if (fraction === 1) animation = null;
      else schedule();
    }
    controls.update();
    if (regionMode && markerMeshes.size) {
      camera.getWorldDirection(cameraDirection);
      const pixelScale = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) / oldHeight;
      const pulseOn = !reduced.matches;
      for (const [id, list] of markerMeshes) {
        const active = current.focus?.includes(id);
        const wave = active && pulseOn ? Math.sin((now || 0) / 300) : 0;
        for (const marker of list) {
          const depth = Math.max(0, markerOffset.copy(marker.position).sub(camera.position).dot(cameraDirection));
          // Markers keep a readable screen size instead of ballooning when the
          // camera moves in close on a small foramen.
          const pixels = (active ? (regionMode ? 4 : 10) : current.pick ? 7 : 5) * (pulseOn ? 1 + .16 * wave : 1);
          marker.scale.setScalar(Math.max(.0004, pixels * depth * pixelScale));
          marker.userData.halo.visible = active && !regionMode;
          marker.userData.halo.material.opacity = .68 + .1 * wave;
        }
      }
      // Keep each surface spot at least ~9 px wide on screen, so it still
      // reads when the whole region is in view; close up it stays anatomical.
      for (let i = 0; i < spotUniforms.uSpotCount.value; i++) {
        const spot = spotUniforms.uSpots.value[i];
        const depth = Math.max(0, markerOffset.set(spot.x, spot.y, spot.z).sub(camera.position).dot(cameraDirection));
        spot.w = Math.min(markerSize * 2, Math.max(markerSize * .85, 9 * depth * pixelScale));
      }
      if (labeledIds.length) updateLabels();
      if (pulseOn && hasFocusedMarker) schedule();
    }
    try {
      renderer.render(scene, camera);
    } catch {
      fail();
    }
    if (controls.autoRotate) schedule();
  }

  function boxOf(ids) {
    const box = new THREE.Box3();
    for (const id of ids) {
      const mesh = meshFor(id);
      if (mesh) box.union(mesh.geometry.boundingBox);
      for (const marker of markerMeshes.get(id) || []) box.expandByPoint(marker.position);
    }
    return box;
  }

  function frame(direction = current.view, immediate = false) {
    const { ids, focus = [], anchors = [], close, neutral } = current;
    const group = boxOf(regionMode && current.context?.length ? [...new Set([...ids, ...current.context])] : ids);
    const markerFocus = focus.some(id => markerPoints.has(id));
    const support = [...new Set([...focus, ...(markerFocus ? anchors : [])])];
    const markerBox = markerFocus ? boxOf(focus.filter(id => markerPoints.has(id))) : null;
    // A point marker is smaller than any bone. Centre the frame on the marker
    // and keep enough of the anchor bones in view to give it context, instead
    // of shrinking a whole femur or vertebral column into the frame.
    let target = boxOf(support);
    if (markerBox && !markerBox.isEmpty()) {
      target = markerBox.clone().expandByScalar(
        Math.max(.06, Math.min(.09, Math.max(...markerBox.getSize(new THREE.Vector3()).toArray()) * .35)),
      );
      const meshBox = boxOf(focus.filter(id => !markerPoints.has(id)));
      if (!meshBox.isEmpty()) target.union(meshBox);
    }
    // Focused steps frame the focused meshes themselves; a point marker is
    // centred with enough surrounding body to read it against its anchor bones.
    // A tiny marker with no anchors keeps the regional context in frame instead.
    const targetExtent = target.isEmpty() ? 0 : Math.max(...target.getSize(new THREE.Vector3()).toArray());
    const tightMarker = markerFocus && anchors.length > 0 && !target.isEmpty();
    const focused = !target.isEmpty() && (close || tightMarker)
      && (!regionMode || current.atlas || tightMarker || targetExtent >= .08);
    const box = focused ? target : group;
    if (box.isEmpty()) return;
    const extent = box.getSize(new THREE.Vector3());
    if (regionMode && Math.max(extent.x, extent.y, extent.z) < .05) box.expandByScalar(.06);
    const center = box.getCenter(new THREE.Vector3());
    const normal = new THREE.Vector3(...(VIEWS[direction] || VIEWS.ant));
    if (!focused && !direction && !neutral && focus.length === 1 && !target.isEmpty()) {
      const offset = target.getCenter(new THREE.Vector3()).sub(center);
      offset.z *= .3;
      if (offset.lengthSq() > .00001) {
        normal.add(offset.normalize().multiplyScalar(.65));
        center.lerp(target.getCenter(new THREE.Vector3()), .30);
      }
    }
    normal.normalize();
    const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
    const tanV = Math.tan(vertical);
    const tanH = tanV * camera.aspect;
    // Fit the projected box, not its circumsphere: sparse 3D parts (lung trees,
    // great vessels) otherwise sit small in a mostly empty frame.
    const viewDir = normal;
    const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 0, 1), viewDir);
    if (right.lengthSq() < 1e-8) right.set(1, 0, 0); else right.normalize();
    const up = new THREE.Vector3().crossVectors(viewDir, right).normalize();
    let required = 0;
    for (let xi = 0; xi < 2; xi++) {
      for (let yi = 0; yi < 2; yi++) {
        for (let zi = 0; zi < 2; zi++) {
          const corner = new THREE.Vector3(
            xi ? box.max.x : box.min.x,
            yi ? box.max.y : box.min.y,
            zi ? box.max.z : box.min.z,
          ).sub(center);
          const depth = corner.dot(viewDir);
          required = Math.max(required,
            Math.abs(corner.dot(right)) / tanH + depth,
            Math.abs(corner.dot(up)) / tanV + depth);
        }
      }
    }
    const fit = Math.max(1.08, current.padding || (current.atlas && close ? 1.33 : 1.13));
    const distance = THREE.MathUtils.clamp(required * fit, controls.minDistance, controls.maxDistance);
    const position = center.clone().add(viewDir.multiplyScalar(distance));
    if (immediate || reduced.matches) {
      animation = null;
      camera.position.copy(position);
      controls.target.copy(center);
    } else {
      animation = { start: performance.now(), from: camera.position.clone(), origin: controls.target.clone(), to: position, center };
    }
    schedule();
  }

  let onModelReady;
  function paint(config, preserveCamera = false) {
    current = config;
    hideTip();
    applyStyles();
    const wanted = [...new Set([...(config.ids || []), ...(config.context || []),
      ...(config.focus || []), ...(config.pickIds || []), ...(config.anchors || [])])];
    const pending = ensurePacks(wanted);
    if (preserveCamera) schedule();
    else frame(config.view);
    if (pending) {
      pending.then(() => {
        if (unavailable || current !== config) return;
        applyStyles();
        if (!preserveCamera) frame(config.view);
        else schedule();
        onModelReady?.();
      }).catch(() => {
        if (current === config) fail();
      });
    }
  }

  const display = { isolate: false, ghost: regionMode ? GHOST_DEFAULT / 100 : 1 };
  if (regionMode) {
    const ghostSlider = host.parentElement?.querySelector('#view-ghost');
    if (ghostSlider) ghostSlider.defaultValue = ghostSlider.value = GHOST_DEFAULT;
  }
  const tint = new THREE.Color(tone.tint);
  const select = new THREE.Color(tone.select);
  const selectDeep = new THREE.Color(tone.selectDeep);
  const off = new THREE.Color(0, 0, 0);

  function refreshTheme() {
    tone = readTone();
    hemi.color.set(tone.sky);
    hemi.groundColor.set(tone.ground);
    light.color.set(tone.key);
    rim.color.set(tone.rim);
    select.set(tone.select);
    selectDeep.set(tone.selectDeep);
    tint.set(tone.tint);
    haloMaterial.color.set(tone.axis);
    axisTube?.material.color.set(tone.axis);
    for (const child of axis.children) {
      const label = child.userData.label;
      if (!label) continue;
      paintLabel(label.canvas, label.text);
      if (child.material?.map) child.material.map.needsUpdate = true;
    }
    applyStyles();
    schedule();
  }

  function applyStyles() {
    const primary = new Set(current.ids || []);
    const context = new Set(current.context || []);
    const highlight = new Set(current.focus || []);
    const faint = new Set(current.faint || []);
    const anchors = new Set(current.anchors || []);
    const anchorFocus = anchors.size > 0 && highlight.size > 0;
    const isolate = display.isolate && highlight.size > 0;
    const visible = isolate
      ? new Set([...highlight, ...(anchorFocus ? anchors : [])])
      : new Set([...primary, ...context, ...highlight, ...(anchorFocus ? anchors : [])]);
    const pickOnly = current.pickIds ? new Set(current.pickIds) : null;
    for (const [id, mesh] of meshes) {
      if (!visible.has(id)) mesh.visible = false;
    }
    pickable = [];
    for (const id of visible) {
      const mesh = meshFor(id);
      if (!mesh) continue;
      const active = highlight.has(id);
      const anchor = anchorFocus && !active && anchors.has(id);
      const material = mesh.material;
      if (anchor) {
        // Anchor bones support the focused marker: readable, never louder.
        material.color.set(baseColor(id));
        material.emissive.copy(tint).multiplyScalar(.22);
        material.emissiveIntensity = 1;
        material.opacity = Math.max(.5, Math.min(.68, current.contextOpacity ?? .58));
      } else if (anchorFocus && !active) {
        // Everything that is not an anchor drops to a faint ghost.
        material.color.set(baseColor(id));
        material.emissive.copy(off);
        material.emissiveIntensity = 0;
        material.opacity = (primary.has(id) && !context.has(id) ? .10 : .045) * display.ghost;
      } else if (current.atlas) {
        // Atlas shows every checked part; only a selection is emphasised.
        material.color.set(active ? select : baseColor(id));
        material.emissive.copy(active ? selectDeep : off);
        material.emissiveIntensity = active ? 1 : 0;
        material.opacity = active ? 1 : (highlight.size ? display.ghost : 1);
      } else if (current.subtleFocus) {
        // Orientation steps keep the whole specimen visible with a light tint.
        material.color.set(baseColor(id));
        if (active) material.color.lerp(tint, .15);
        material.emissive.copy(off);
        material.emissiveIntensity = 0;
        material.opacity = active || !highlight.size ? 1 : display.ghost;
      } else {
        // Lessons give every structure of the level its own colour (matching its chip).
        const own = current.palette?.[id];
        const coloured = own && (active || current.paletteAll);
        material.color.set(coloured ? own : active ? select : baseColor(id));
        if (coloured) material.emissive.set(own).multiplyScalar(active ? .32 : .12);
        else material.emissive.copy(active ? selectDeep : off);
        material.emissiveIntensity = active || coloured ? 1 : 0;
        material.opacity = active ? 1 : primary.has(id)
          ? (current.pick ? (id === 'paredev' ? .2 : .88) : highlight.size ? .18 : id === 'paredev' ? (current.paletteAll ? .16 : .28) : 1)
          : faint.has(id) ? .04 : (current.contextOpacity ?? .10);
        if (!active && highlight.size) material.opacity *= display.ghost;
      }
      if (regionMode) {
        const ghost = !active && !anchor && (
          current.atlas || current.subtleFocus ? highlight.size > 0
            : !primary.has(id) || (highlight.size > 0 && (!current.pick || anchorFocus))
        );
        if (ghost) {
          material.color.set(tone.ghostColor);
          material.emissiveIntensity = 0;
          material.opacity = display.ghost * tone.ghostMax * (faint.has(id) ? .45 : 1);
        } else {
          material.opacity = 1;
          if (active) {
            material.emissive.set(tone.accent);
            material.emissiveIntensity = tone.accentGlow;
          } else if (anchor) {
            material.color.multiplyScalar(.7);
            material.emissiveIntensity = .35;
          }
        }
        if (material.transparent !== ghost) {
          material.transparent = ghost;
          material.needsUpdate = true;
        }
        material.depthWrite = !ghost;
        mesh.renderOrder = ghost ? GHOST_ORDER : 0;
      } else {
        material.depthWrite = material.opacity >= .8;
        mesh.renderOrder = active ? 2 : material.depthWrite ? 0 : 1;
      }
      mesh.visible = material.opacity > 0;
      if (mesh.visible && (!pickOnly || pickOnly.has(id))) pickable.push(mesh);
    }
    let spotCount = 0;
    spotUniforms.uSpotColor.value.set(tone.axis);
    {
      // Pale accents vanish on white bone: push the spot to a saturated,
      // mid-light version of the accent so it reads on any bone shade.
      const hsl = {};
      spotUniforms.uSpotColor.value.getHSL(hsl);
      spotUniforms.uSpotColor.value.setHSL(hsl.h, Math.max(hsl.s, .85), .48);
    }
    const shownMarkers = new Set();
    hasFocusedMarker = false;
    for (const id of current.markerIds || []) {
      if (!markerPoints.has(id) || (isolate && !highlight.has(id))) continue;
      const active = highlight.has(id);
      const opacity = active ? 1 : (anchorFocus ? .16 : .78) * (highlight.size ? display.ghost : 1);
      if (opacity <= 0) continue;
      shownMarkers.add(id);
      if (active) hasFocusedMarker = true;
      const list = markerMeshes.get(id) || createMarkers(id);
      for (const marker of list) {
        marker.visible = true;
        marker.userData.fill.color.set(active ? tone.axis : (current.palette?.[id] || baseColor(id)));
        marker.userData.fill.opacity = opacity;
        marker.material.color.set(tone.labelBg);
        marker.material.opacity = opacity;
        marker.userData.halo.visible = active;
        marker.scale.setScalar(markerSize * (active && regionMode ? .8 : active ? 1.75 : 1));
        if (regionMode && active && spotCount < MAX_SPOTS) {
          marker.userData.halo.visible = false;
          spotUniforms.uSpots.value[spotCount++].set(marker.position.x, marker.position.y, marker.position.z, markerSize * 0.85);
        }
        if (marker.visible && (!pickOnly || pickOnly.has(id))) pickable.push(marker);
      }
    }
    spotUniforms.uSpotCount.value = spotCount;
    for (const [id, list] of markerMeshes) {
      if (!shownMarkers.has(id)) removeMarkers(id, list);
    }
    labeledIds = regionMode && current.markerLabels
      ? [...highlight].filter(id => shownMarkers.has(id)).slice(0, 6)
      : [];
    annotationLayer.hidden = !labeledIds.length;
    for (const [id, pin] of labelPins) {
      if (labeledIds.includes(id)) continue;
      pin.line.remove();
      pin.tag.remove();
      labelPins.delete(id);
    }
  }

  function zoom(scale) {
    animation = null;
    const offset = camera.position.clone().sub(controls.target);
    const factor = Number.isFinite(scale) && scale > 0 ? scale : 1;
    if (!Number.isFinite(offset.lengthSq()) || offset.lengthSq() < 1e-12) {
      offset.set(...(VIEWS[current.view] || VIEWS.ant));
    }
    const distance = THREE.MathUtils.clamp(offset.length() * factor, controls.minDistance, controls.maxDistance);
    if (!Number.isFinite(distance)) return;
    camera.position.copy(controls.target).add(offset.setLength(distance));
    controls.update();
    schedule();
  }

  function resetView() {
    animation = null;
    // Return to the active step's current view, focus and close framing.
    frame(current.view);
  }

  let oldWidth = 0;
  let oldHeight = 0;
  function resize() {
    const { clientWidth: width, clientHeight: height } = host;
    if (!width || !height || (width === oldWidth && height === oldHeight)) return;
    oldWidth = width;
    oldHeight = height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    frame(current.view, true);
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  resize();

  function fail() {
    if (unavailable) return;
    unavailable = true;
    queueMicrotask(() => {
      observer.disconnect();
      controls.dispose();
      for (const mesh of meshes.values()) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
      axisTube?.geometry.dispose();
      axisTube?.material.dispose();
      markerGeometry?.dispose();
      haloMaterial?.map.dispose();
      haloMaterial?.dispose();
      annotationLayer.remove();
      for (const [id, list] of markerMeshes) removeMarkers(id, list);
      for (const label of axis.children) {
        label.material.map?.dispose();
        label.material.dispose();
      }
      renderer.dispose();
      renderer.domElement.remove();
      tip.remove();
      onUnavailable();
    });
  }

  renderer.debug.onShaderError = fail;
  renderer.domElement.addEventListener('webglcontextlost', fail);
  controls.addEventListener('change', schedule);
  controls.addEventListener('start', () => { animation = null; });

  const ray = new THREE.Raycaster();
  const projectedMarker = new THREE.Vector3();
  function pickId(x, y) {
    scene.updateMatrixWorld(true);
    ray.setFromCamera({ x, y }, camera);
    const meshesHere = pickable.filter(entry => !entry.userData.marker);
    const meshHits = ray.intersectObjects(meshesHere, false);
    // The translucent ventricular wall surrounds the two ventricle meshes.
    const meshHit = meshHits.find(entry => entry.object.userData.id !== 'paredev') || meshHits[0];
    // Markers are small, depth-independent points, so a direct hit wins over
    // the bone behind it; otherwise a surface marker could never be clicked.
    const markerHits = ray.intersectObjects(pickable.filter(entry => entry.userData.marker), false);
    let nearestMarker;
    let nearestDistance = Infinity;
    for (const { object } of markerHits) {
      const center = projectedMarker.copy(object.position).project(camera);
      const distance = ((center.x - x) * camera.aspect) ** 2 + (center.y - y) ** 2;
      if (distance < nearestDistance) {
        nearestMarker = object;
        nearestDistance = distance;
      }
    }
    if (nearestMarker) return nearestMarker.userData.id;
    return meshHit?.object.userData.id;
  }
  function pick(x, y) {
    if (!current.pick) return;
    onPick(pickId(x, y));
  }

  const tip = document.createElement('div');
  tip.className = 'view-tip';
  tip.hidden = true;
  host.append(tip);
  function hideTip() {
    if (tip.hidden) return;
    tip.hidden = true;
    tip.textContent = '';
  }
  function showTip(id, x, y, width, height) {
    const name = ITEMS[id]?.pt;
    if (!name) return;
    tip.textContent = name;
    tip.hidden = false;
    const left = THREE.MathUtils.clamp(x - tip.offsetWidth / 2, 4, width - tip.offsetWidth - 4);
    const top = y - tip.offsetHeight - 8;
    tip.style.left = `${left}px`;
    tip.style.top = `${top >= 4 ? top : Math.min(y + 12, height - tip.offsetHeight - 4)}px`;
  }

  let pointer;
  let lastHover = 0;
  renderer.domElement.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    hideTip();
    if (pointer) pointer.dragged = true;
    else pointer = { id: event.pointerId, x: event.clientX, y: event.clientY };
  });
  const clearPointer = event => {
    if (pointer?.id === event.pointerId) pointer = null;
  };
  renderer.domElement.addEventListener('pointercancel', clearPointer);
  renderer.domElement.addEventListener('lostpointercapture', clearPointer);
  renderer.domElement.addEventListener('pointerleave', hideTip);
  renderer.domElement.addEventListener('pointermove', event => {
    if (pointer?.id === event.pointerId &&
        Math.hypot(event.clientX - pointer.x, event.clientY - pointer.y) > 5) pointer.dragged = true;
    if (!current.explore || current.pick || pointer) { hideTip(); return; }
    const now = performance.now();
    if (now - lastHover < 60) return;
    lastHover = now;
    const rect = renderer.domElement.getBoundingClientRect();
    const id = pickId((event.clientX - rect.left) / rect.width * 2 - 1, 1 - (event.clientY - rect.top) / rect.height * 2);
    if (id) showTip(id, event.clientX - rect.left, event.clientY - rect.top, rect.width, rect.height);
    else hideTip();
  });
  renderer.domElement.addEventListener('pointerup', event => {
    if (!pointer || pointer.id !== event.pointerId) return;
    const start = pointer;
    pointer = null;
    hideTip();
    if (start.dragged || Math.hypot(event.clientX - start.x, event.clientY - start.y) > 5) return;
    const rect = renderer.domElement.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 2 - 1;
    const y = 1 - (event.clientY - rect.top) / rect.height * 2;
    if (current.pick) pick(x, y);
    else if (current.explore) {
      const id = pickId(x, y);
      if (id) onExplore?.(id, event);
    }
  });

  host.prepend(renderer.domElement);
  return {
    paint,
    focus,
    focusAxis,
    refreshTheme,
    view(direction) { current.view = direction; frame(direction); },
    zoom,
    resetView,
    setIsolate(on) { display.isolate = Boolean(on); applyStyles(); schedule(); },
    setGhost(value) {
      display.ghost = THREE.MathUtils.clamp(Number(value) || 0, 0, 1);
      applyStyles();
      schedule();
    },
    setAutoRotate(on) {
      controls.autoRotate = Boolean(on) && !reduced.matches;
      if (controls.autoRotate) schedule();
      return controls.autoRotate;
    },
    pickCenter() { pick(0, 0); },
    aim(yaw, pitch) {
      animation = null;
      const offset = camera.position.clone().sub(controls.target);
      offset.applyAxisAngle(new THREE.Vector3(0, 0, 1), yaw);
      const horizontal = new THREE.Vector3(-offset.y, offset.x, 0).normalize();
      const proposed = offset.clone().applyAxisAngle(horizontal, pitch);
      if (Math.abs(proposed.z / proposed.length()) < .98) offset.copy(proposed);
      camera.position.copy(controls.target).add(offset);
      controls.update();
      schedule();
    },
    has(id) { return Object.hasOwn(meta.parts, id) || markerPoints.has(id); },
    loadedFor,
    onReady(fn) { onModelReady = fn; },
    pendingFor(ids) { return !loadedFor(ids); },
  };
}
