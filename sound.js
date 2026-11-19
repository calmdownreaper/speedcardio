// Tiny synthesized feedback sounds (no audio files).
let ctx;
let last = 0;

function audio() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, start, length, gain, type = 'sine') {
  const a = audio();
  if (!a) return;
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
