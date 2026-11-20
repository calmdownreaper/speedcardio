import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { COLORS, DEFAULT_COLOR } from './data.js?v=40';
import { ITEMS } from './study.js?v=40';

export const VIEWS = {
  ant: [0, -1, .15],
  post: [0, 1, .15],
  dir: [-1, 0, .1],
  esq: [1, 0, .1],
  sup: [0, -.25, 1],
  inf: [0, -.25, -1],
};

function baseColor(id) {
  if (COLORS[id]) return COLORS[id];
  const deck = ITEMS[id]?.deck.id;
  if (deck === 'coronarias') return '#d35b54';
  if (deck === 'valvas') return id.startsWith('pap') ? '#d77a6e' : '#f0dcc4';
  if (deck === 'segd' || deck === 'sege') {
    const segment = id.slice(3);
    if (['apical', 'post', 'ant'].includes(segment)) return '#67b39b';
    if (['lat', 'med', 'lsup', 'linf'].includes(segment)) return '#d6aa6c';
    return '#759ebc';
  }
  return DEFAULT_COLOR;
}

export async function createViewer(host, onPick, onUnavailable, onExplore) {
  const [meta, buffer] = await Promise.all([
    fetch('./models.json?v=39').then(response => {
      if (!response.ok) throw new Error('Model index unavailable');
      return response.json();
    }),
    fetch('./models.bin?v=39').then(response => {
      if (!response.ok) throw new Error('Model geometry unavailable');
      return response.arrayBuffer();
    }),
  ]);
  const IndexArray = meta.indexBytes === 2 ? Uint16Array : Uint32Array;
  const bytes = meta.bytes ?? Math.max(...Object.values(meta.parts).map(part => part.i[0] + part.i[1] * IndexArray.BYTES_PER_ELEMENT));
  if (buffer.byteLength !== bytes) throw new Error('Model geometry does not match its index');
  const css = getComputedStyle(document.documentElement);
  const token = (name, fallback) => css.getPropertyValue(name).trim() || css.getPropertyValue(fallback).trim();
  const tone = {
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

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.domElement.setAttribute('aria-label', 'Rotatable anatomical model');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .01, 50);
  camera.up.set(0, 0, 1);
  camera.position.set(0, -3, .5);
  scene.add(new THREE.HemisphereLight(tone.sky, tone.ground, 1.25));
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
  function meshFor(id) {
    if (meshes.has(id)) return meshes.get(id);
    if (!Object.hasOwn(meta.parts, id)) return;
    const part = meta.parts[id];
    const packed = new Int16Array(buffer, part.p[0], part.p[1]);
    const positions = Float32Array.from(packed, value => value / 32767);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setIndex(new THREE.BufferAttribute(new IndexArray(buffer, part.i[0], part.i[1]), 1));
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

  // Focus annotations belong to the focus API, independent of model geometry.
  const axis = new THREE.Group();
  let axisTube;
  function endpointLabel(text, point, scale) {
    const canvas = document.createElement('canvas');
    canvas.width = 256; canvas.height = 96;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = tone.labelBg; ctx.fillRect(0, 0, 256, 96);
    ctx.font = 'bold 48px sans-serif'; ctx.textAlign = 'center';
    ctx.fillStyle = tone.labelInk; ctx.fillText(text, 128, 65);
    const texture = new THREE.CanvasTexture(canvas);
    const label = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false, depthWrite: false, toneMapped: false }));
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
    }
    return box;
  }

  function frame(direction = current.view, immediate = false) {
    const { ids, focus = [], close, neutral } = current;
    const group = boxOf(ids);
    const target = boxOf(focus);
    // Focused steps frame the focused meshes themselves; otherwise frame the whole group.
    const focused = close && !target.isEmpty();
    const box = focused ? target : group;
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    // Clamp the sphere so tiny branches cannot pull the camera inside their geometry.
    const radius = Math.max(.03, box.getBoundingSphere(new THREE.Sphere()).radius);
    const normal = new THREE.Vector3(...(VIEWS[direction] || VIEWS.ant));
    if (!focused && !direction && !neutral && focus.length === 1 && !target.isEmpty()) {
      const offset = target.getCenter(new THREE.Vector3()).sub(center);
      offset.z *= .3;
      if (offset.lengthSq() > .00001) {
        normal.add(offset.normalize().multiplyScalar(.65));
        center.lerp(target.getCenter(new THREE.Vector3()), .30);
      }
    }
    const vertical = THREE.MathUtils.degToRad(camera.fov / 2);
    const halfFov = Math.min(vertical, Math.atan(Math.tan(vertical) * camera.aspect));
    const fit = current.padding || (current.atlas && close ? 1.33 : 1.13);
    const distance = THREE.MathUtils.clamp(radius / Math.sin(halfFov) * fit, controls.minDistance, controls.maxDistance);
    const position = center.clone().add(normal.normalize().multiplyScalar(distance));
    if (immediate || reduced.matches) {
      animation = null;
      camera.position.copy(position);
      controls.target.copy(center);
    } else {
      animation = { start: performance.now(), from: camera.position.clone(), origin: controls.target.clone(), to: position, center };
    }
    schedule();
  }

  function paint(config, preserveCamera = false) {
    current = config;
    hideTip();
    applyStyles();
    if (preserveCamera) schedule();
    else frame(config.view);
  }

  const display = { isolate: false, ghost: 1 };
  const tint = new THREE.Color(tone.tint);
  const select = new THREE.Color(tone.select);
  const selectDeep = new THREE.Color(tone.selectDeep);
  const off = new THREE.Color(0, 0, 0);

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
        material.color.set(active ? select : baseColor(id));
        material.emissive.copy(active ? selectDeep : off);
        material.emissiveIntensity = active ? 1 : 0;
        material.opacity = active ? 1 : primary.has(id)
          ? (highlight.size ? .18 : id === 'paredev' ? .28 : current.pick ? .88 : 1)
          : faint.has(id) ? .04 : .10;
        if (!active && highlight.size) material.opacity *= display.ghost;
      }
      material.depthWrite = material.opacity >= .8;
      mesh.renderOrder = active ? 2 : material.depthWrite ? 0 : 1;
      mesh.visible = material.opacity > 0;
      if (mesh.visible && (!pickOnly || pickOnly.has(id))) pickable.push(mesh);
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
    const hits = ray.intersectObjects(pickable, false);
    // The translucent ventricular wall surrounds the two ventricle meshes.
    const hit = hits.find(entry => entry.object.userData.id !== 'paredev') || hits[0];
    return hit?.object.userData.id;
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
    has(id) { return Object.hasOwn(meta.parts, id); },
  };
}
