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

// Safari parks the context in 'suspended' or its own 'interrupted' state after
// sleep, a tab switch, another tab playing media or an output change (AirPods),
// and sometimes never lets that context run again. So: resume on any state but
// 'running', wait for it before scheduling, and replace a context that stays
// stuck. Resuming only works inside a user gesture, hence the listeners below.
let stuckSince = 0;
function audio() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (ctx && ctx.state !== 'running' && stuckSince && performance.now() - stuckSince > 1500) {
    ctx.close?.().catch(() => {});
    ctx = null;
  }
  if (!ctx || ctx.state === 'closed') { ctx = new AC(); stuckSince = 0; }
  if (ctx.state !== 'running') {
    stuckSince ||= performance.now();
    ctx.resume?.().then(() => { if (ctx?.state === 'running') stuckSince = 0; }).catch(() => {});
  } else {
    stuckSince = 0;
  }
  return ctx;
}

function wake() { if (ctx && ctx.state !== 'running') audio(); }
for (const type of ['pointerdown', 'keydown', 'touchend']) addEventListener(type, wake, { capture: true, passive: true });
document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
addEventListener('pageshow', wake);

function tone(freq, start, length, gain, type = 'sine') {
  if (muted) return;
  const a = audio();
  if (!a) return;
  if (a.state !== 'running') {
    // Play once the resume lands rather than scheduling into a frozen clock.
    const play = () => { if (a.state === 'running') tone(freq, start, length, gain, type); };
    a.resume?.().then(play).catch(() => {});
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
  tone(1800 + Math.random() * 500, 0, 0.035, 0.05, 'triangle');
}

export function wrongKeySound() {
  tone(180, 0, 0.08, 0.06, 'square');
}

// Two-note rising chime for a correct name.
export function correctSound() {
  tone(880, 0, 0.16, 0.09);
  tone(1318.5, 0.08, 0.24, 0.08);
}
