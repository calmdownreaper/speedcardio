import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ITEMS } from './study.js?v=49';

export const VIEWS = {
  ant: [0, -1, .15],
  post: [0, 1, .15],
  dir: [-1, 0, .1],
  esq: [1, 0, .1],
  sup: [0, -.25, 1],
  inf: [0, -.25, -1],
};

const VERSION = '?v=49';

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
    return {
      select: token('--model-select', '--accent'),
      selectDeep: token('--model-select-deep', '--accent-soft'),
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
    return ids.every(id => markerPoints.has(id) || meshes.has(id));
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
      transparent: true, forceSinglePass: true,
    });
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
  const markerGeometry = new THREE.SphereGeometry(1, 14, 10);
  const markerSize = source.markerSize || .018;
  function markerPosition(raw) {
    const point = new THREE.Vector3(raw[0], raw[1], raw[2]);
    if (source.markerSpace === 'world' && meta.center && meta.scale) {
      point.set((raw[0] - meta.center[0]) / meta.scale,
        (raw[1] - meta.center[1]) / meta.scale,
        (raw[2] - meta.center[2]) / meta.scale);
    }
    return point;
  }
  for (const [id, points] of markerPoints) {
    const list = (Array.isArray(points[0]) ? points : [points]).map(raw => {
      const material = new THREE.MeshBasicMaterial({
        color: tone.select, transparent: true, opacity: .9, depthTest: false,
        depthWrite: false, toneMapped: false,
      });
      const marker = new THREE.Mesh(markerGeometry, material);
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
    const { ids, focus = [], close, neutral } = current;
    const group = boxOf(regionMode && current.context?.length ? [...new Set([...ids, ...current.context])] : ids);
    const target = boxOf(focus);
    // Focused steps frame the focused meshes themselves; a tiny target in a
    // point-marker level keeps the regional context in frame instead.
    const targetExtent = target.isEmpty() ? 0 : Math.max(...target.getSize(new THREE.Vector3()).toArray());
    const focused = close && !target.isEmpty() && (!regionMode || targetExtent >= .08);
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
    const fit = current.padding || (current.atlas && close ? 1.33 : 1.13);
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
      ...(config.focus || []), ...(config.pickIds || [])])];
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
      }).catch(() => fail());
    }
  }

  const display = { isolate: false, ghost: 1 };
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
    axisTube?.material.color.set(tone.axis);
    for (const list of markerMeshes.values()) {
      for (const marker of list) {
        marker.material.color.set((current.focus || []).includes(marker.userData.id)
          ? tone.axis : (current.palette?.[marker.userData.id] || baseColor(marker.userData.id)));
      }
    }
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
    const isolate = display.isolate && highlight.size > 0;
    const visible = isolate ? highlight : new Set([...primary, ...context, ...highlight]);
    const pickOnly = current.pickIds ? new Set(current.pickIds) : null;
    for (const [id, mesh] of meshes) {
      if (!visible.has(id)) mesh.visible = false;
    }
    pickable = [];
    for (const id of visible) {
      const mesh = meshFor(id);
      if (!mesh) continue;
      const active = highlight.has(id);
      const material = mesh.material;
      if (current.atlas) {
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
      material.depthWrite = material.opacity >= .8;
      mesh.renderOrder = active ? 2 : material.depthWrite ? 0 : 1;
      mesh.visible = material.opacity > 0;
      if (mesh.visible && (!pickOnly || pickOnly.has(id))) pickable.push(mesh);
    }
    for (const [id, list] of markerMeshes) {
      const on = visible.has(id);
      const active = highlight.has(id);
      for (const marker of list) {
        marker.visible = on;
        marker.material.color.set(active ? tone.axis : (current.palette?.[id] || baseColor(id)));
        marker.material.opacity = active ? 1 : on ? .78 : 0;
        marker.scale.setScalar(markerSize * (active ? 1.35 : 1));
        if (on && (!pickOnly || pickOnly.has(id))) pickable.push(marker);
      }
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
      markerGeometry.dispose();
      for (const list of markerMeshes.values()) {
        for (const marker of list) marker.material.dispose();
      }
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
    if (markerHits.length) return markerHits[0].object.userData.id;
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
  function showTip(id, x, y, width) {
    const name = ITEMS[id]?.pt;
    if (!name) return;
    tip.textContent = name;
    tip.style.left = `${THREE.MathUtils.clamp(x, 8, width - 8)}px`;
    tip.style.top = `${Math.max(8, y)}px`;
    tip.hidden = false;
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
    if (id) showTip(id, event.clientX - rect.left, event.clientY - rect.top, rect.width);
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
