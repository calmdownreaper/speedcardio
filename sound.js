// Tiny synthesized feedback sounds (no audio files).
let ctx;
let last = 0;
let muted = false;
try { muted = localStorage.getItem('sc2_muted') === '1'; } catch { /* storage unavailable */ }

export function isMuted() { return muted; }
export function setMuted(value) {
  muted = Boolean(value);
  try { localStorage.setItem('sc2_muted', muted ? '1' : '0'); } catch { /* storage unavailable */ }
}

function audio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!ctx || ctx.state === 'closed') {
    try { ctx = new AC(); } catch { return null; }
  }
  return ctx;
}

function wake(event) {
  if (!event.isTrusted) return;
  const context = audio();
  if (!context || context.state === 'running') return;
  // Both calls must happen synchronously inside the gesture on iOS Safari.
  // Retry on every gesture: a prior resume promise may never settle.
  try {
    const source = context.createBufferSource();
    source.buffer = context.createBuffer(1, 1, context.sampleRate);
    source.connect(context.destination);
    source.start(0);
  } catch { /* Resume may still succeed even if the silent buffer fails. */ }
  try { void context.resume().catch(() => {}); } catch { /* Retry on the next gesture. */ }
}

for (const type of ['pointerdown', 'pointerup', 'keydown', 'touchstart', 'touchend', 'click']) {
  addEventListener(type, wake, { capture: true, passive: true });
}

function tone(freq, start, length, gain, type = 'sine') {
  if (muted) return;
  const a = audio();
  if (!a) return;
  if (a.state !== 'running') {
    return;
  }
  const t = a.currentTime + start;
  const osc = a.createOscillator();
  const amp = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  amp.gain.setValueAtTime(0.0001, t);
  amp.gain.exponentialRampToValueAtTime(gain, t + 0.004);
  amp.gain.exponentialRampToValueAtTime(0.0001, t + length);
  osc.connect(amp).connect(a.destination);
  osc.start(t);
  osc.stop(t + length + 0.02);
}

// Soft key tick, slightly varied so fast typing does not sound mechanical.
export function keySound() {
  const now = performance.now();
  if (now - last < 18) return;
  last = now;
  // Low, soft 'thock' (not a beep), so it never competes with the click and reward sounds.
  tone(310 + Math.random() * 40, 0, 0.03, 0.022, 'sine');
  tone(1400 + Math.random() * 200, 0, 0.012, 0.006, 'triangle');
}

export function wrongKeySound() {
  tone(180, 0, 0.08, 0.06, 'square');
}

// Two-note rising chime for a correct name.
export function correctSound() {
  tone(880, 0, 0.16, 0.09);
  tone(1318.5, 0.08, 0.24, 0.08);
}

// ---- Reward sounds (typing drills with deck.rewards) ----
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24, 26, 28, 31];
const hz = semi => 523.25 * Math.pow(2, semi / 12); // C5 = 0
// Each hit in a streak climbs one step of a pentatonic scale.
export function streakSound(n) {
  const s = PENTA[Math.min(Math.max(n, 1) - 1, PENTA.length - 1)];
  tone(hz(s), 0, 0.5, 0.09, 'triangle');
  tone(hz(s + 12), 0.004, 0.25, 0.025);
}
export function missSound() { tone(233, 0, 0.3, 0.1, 'triangle'); tone(220, 0.09, 0.34, 0.09, 'triangle'); }
// Going forward: two soft notes climbing. Going back: the same, lower and falling.
export function clickSound() { tone(1180, 0, 0.035, 0.012, 'triangle'); tone(1570, 0.03, 0.045, 0.011, 'triangle'); }
export function backSound() { tone(880, 0, 0.04, 0.013, 'triangle'); tone(660, 0.035, 0.055, 0.012, 'triangle'); }
const isBack = el => /^\s*←/.test(el.textContent || '') || /\b(back|voltar)\b/i.test(`${el.getAttribute('aria-label') || ''} ${el.className || ''}`);


export function milestoneSound() { [0, 4, 7, 12, 16].forEach((s, i) => tone(hz(s), i * 0.07, 0.7, 0.06, 'triangle')); }
export function litSound() { tone(hz(24), 0, 0.9, 0.06); tone(hz(31), 0.09, 1.1, 0.05); }

// Every text field answers typing with the soft key sound (throttled, so pages that also call keySound never double it).
addEventListener('input', e => {
  const t = e.target;
  if (t instanceof HTMLTextAreaElement || (t instanceof HTMLInputElement && /^(text|search|)$/.test(t.type))) keySound();
}, { capture: true, passive: true });
