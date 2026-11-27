// Micro-rewards for typing drills (opt-in per deck with `rewards: true`).
//   1. Every right answer: light pulse over the 3D structure, the answer lights up, a note that climbs with the streak.
//   2. Streak: tier colour (bone → blue → violet → gold) and a big ×N badge + arpeggio at 5, 10, 20, 30, 50…
//   6. Atlas: one dot per structure, grouped by set; a learned structure lights up for good, with a spark that flies there.
import { streakSound, milestoneSound } from './sound.js?v=150';

const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const reduce = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
const MILESTONES = [5, 10, 20, 30, 50];

export function mountRewards({ deck, items, learned, lang }) {
  const pt = lang === 'pt-BR';
  const T = (en, ptText) => pt ? ptText : en;
  const L = pair => Array.isArray(pair) ? (pt ? pair[1] ?? pair[0] : pair[0]) : pair;
  const root = document.documentElement;
  document.body.classList.add('ty-focus');

  // ---------- atlas ----------
  const setTitle = s => String(L(s.title) ?? s.id ?? '').split(' · ')[0];
  const sets = deck.sets.map(set => ({ set, items: items.filter(it => it.set === set) })).filter(g => g.items.length);
  const atlas = document.createElement('aside');
  atlas.className = 'rw-atlas';
  atlas.setAttribute('aria-label', T('Atlas', 'Atlas'));
  atlas.innerHTML = `${sets.map(g => `<div class="rw-row"><span class="rw-set">${esc(setTitle(g.set))}</span><span class="rw-dots">${g.items.map(it => `<i class="rw-star" data-k="${esc(it.key)}" title="${esc((it.slots || []).map(s => s.label).join(' · '))}"></i>`).join('')}</span></div>`).join('')}
    <p class="rw-cap">${T('Atlas lit', 'Atlas aceso')} <b data-rw="lit">0</b>/${items.length}</p>`;
  document.body.appendChild(atlas);
  const star = key => atlas.querySelector(`[data-k="${CSS.escape(key)}"]`);
  function paintAtlas(current) {
    let lit = 0;
    items.forEach(it => {
      const el = star(it.key); if (!el) return;
      const on = Boolean(learned()[it.key]); if (on) lit++;
      el.classList.toggle('is-lit', on);
      el.classList.toggle('is-now', it.key === current && !on);
    });
    atlas.querySelector('[data-rw="lit"]').textContent = lit;
    return lit;
  }

  // ---------- overlay pieces ----------
  const has3d = it => Boolean(it?.d3 || it?.set?.d3ctx || it?.set?.d3anchor);
  const viewBox = el => { if (!el) return null; const r = el.getBoundingClientRect(); return r.width > 0 && r.height > 0 ? r : null; };
  const viewEl = document.getElementById('view');
  const pulse = document.createElement('div'); pulse.className = 'rw-pulse'; pulse.innerHTML = '<i class="rw-flash"></i><i class="rw-ring"></i>';
  if (items.some(has3d) && viewBox(viewEl)) viewEl.appendChild(pulse);
  else { pulse.style.position = 'fixed'; document.body.appendChild(pulse); }
  const badge = document.createElement('div'); badge.className = 'rw-badge'; badge.setAttribute('aria-hidden', 'true');
  const toast = document.createElement('div'); toast.className = 'rw-toast'; toast.setAttribute('role', 'status');
  document.body.append(badge, toast);
  const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  function tier(streak) {
    const c = streak >= 20 ? 'var(--rw-gold)' : streak >= 10 ? 'var(--accent)' : streak >= 5 ? 'var(--accent-2, var(--accent))' : 'var(--rw-bone)';
    root.style.setProperty('--rw-tier', c);
  }
  tier(0);

  // The answer field is always live: typing anywhere goes into it, and it takes focus back after you drag the model.
  const input = () => document.querySelector('.ty-input');
  const refocus = () => { const i = input(); if (i && document.activeElement !== i && !window.getSelection()?.toString()) i.focus({ preventScroll: true }); };
  const onKey = e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const a = document.activeElement, i = input();
    if (!i || a === i || (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return;
    if (e.key.length === 1 || e.key === 'Backspace') i.focus({ preventScroll: true });
  };
  const onUp = e => { if (!e.target.closest?.('button, a, input, label, select')) setTimeout(refocus, 0); };
  addEventListener('keydown', onKey, true);
  addEventListener('pointerup', onUp, true);

  let toastTimer = 0, learnTimer = 0, destroyed = false;
  function say(html) { toast.innerHTML = html; toast.classList.add('on'); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove('on'), 2400); }

  function spark(item) {
    const to = star(item.key); if (!to) return Promise.resolve();
    const r = to.getBoundingClientRect();
    if (!r.width && !r.height) return Promise.resolve();
    const origin = (has3d(item) && viewBox(viewEl)) || viewBox(input()) || viewBox(document.querySelector('.ty-field')) || { left: innerWidth / 2, top: innerHeight / 2, width: 0, height: 0 };
    const sx = origin.left + origin.width / 2, sy = origin.top + origin.height / 2, tx = r.left + r.width / 2, ty = r.top + r.height / 2;
    if (reduce()) return Promise.resolve();
    const s = document.createElement('i'); s.className = 'rw-spark'; document.body.appendChild(s);
    if (typeof s.animate !== 'function') { s.remove(); return Promise.resolve(); }
    const mx = (sx + tx) / 2 + (tx > sx ? -90 : 90), my = Math.min(sy, ty) - 110;
    try {
      const anim = s.animate([
        { transform: `translate(${sx}px,${sy}px) scale(1.7)` },
        { transform: `translate(${mx}px,${my}px) scale(1)`, offset: .45 },
        { transform: `translate(${tx}px,${ty}px) scale(.5)` }], { duration: 820, easing: 'cubic-bezier(.5,0,.2,1)' });
      return anim.finished.then(() => s.remove(), () => s.remove());
    } catch { s.remove(); return Promise.resolve(); }
  }

  return {
    // Shows which structure is on screen (atlas) and how far along its help ladder it is (3 dots).
    current(item, hint) {
      paintAtlas(item?.key);
      const field = document.querySelector('.ty-field'); if (!field) return;
      let lv = field.parentElement.querySelector('.rw-level');
      if (!lv) { lv = document.createElement('div'); lv.className = 'rw-level'; lv.innerHTML = '<i></i><i></i><i></i>'; field.after(lv); }
      lv.hidden = hint == null;
      if (hint == null) return;
      [...lv.children].forEach((d, i) => { const on = i < hint; if (on && !d.classList.contains('on') && lv.dataset.k === item.key) restart(d, 'bump'); d.classList.toggle('on', on); });
      lv.dataset.k = item.key;
      lv.title = [T('Copy', 'Copiar'), T('First letter', 'Primeira letra'), T('Length only', 'Só o tamanho'), T('From memory', 'De memória')][hint] || '';
    },
    // A whole item answered right (all slots).
    hit(streak) {
      tier(streak);
      streakSound(streak);
      restart(pulse, 'go');
      const field = document.querySelector('.ty-field'); if (field) { field.classList.remove('rw-shake'); restart(field, 'rw-win'); }
      const mile = MILESTONES.includes(streak) || (streak > 50 && streak % 25 === 0);
      if (mile) {
        badge.innerHTML = `×${streak}<small>${streak >= 20 ? T('On fire', 'Em chamas') : streak >= 10 ? T('Ten in a row', 'Dez seguidas') : T('Five in a row', 'Cinco seguidas')}</small>`;
        restart(badge, 'show');
        setTimeout(milestoneSound, 180);
      }
    },
    // One slot of a multi-answer item: small tick, no streak change.
    part() { restart(pulse, 'go-soft'); },
    miss() {
      tier(0);
      const field = document.querySelector('.ty-field'); if (field) { field.classList.remove('rw-win'); restart(field, 'rw-shake'); }
    },
    // Item just marked as learned.
    learned(item) {
      learnTimer = setTimeout(() => {
        if (destroyed) return;
        spark(item).then(() => {
          if (destroyed) return;
          const n = paintAtlas();
          const el = star(item.key); if (el) restart(el, 'fresh');
          say(`<b>${esc((item.slots || []).map(s => s.label).join(' · '))}</b> ${T('lit in the atlas', 'aceso no atlas')} · ${n}/${items.length}`);
        });
      }, 200);
    },
    destroy() {
      destroyed = true;
      clearTimeout(toastTimer); clearTimeout(learnTimer);
      document.body.classList.remove('ty-focus');
      removeEventListener('keydown', onKey, true); removeEventListener('pointerup', onUp, true);
      [atlas, pulse, badge, toast].forEach(el => el.remove());
      root.style.removeProperty('--rw-tier');
    },
  };
}
