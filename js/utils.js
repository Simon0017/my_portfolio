/**
 * UTILS.JS — Shared helper functions
 */

export const qs    = (sel, root = document) => root.querySelector(sel);
export const qsAll = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export function el(tag, props = {}, ...children) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class')     e.className = v;
    else if (k === 'html') e.innerHTML = v;
    else if (k.startsWith('data-')) e.setAttribute(k, v);
    else e[k] = v;
  }
  children.forEach(c => c && e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
  return e;
}

export const debounce = (fn, ms) => {
  let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
};

export const throttle = (fn, ms) => {
  let last = 0;
  return (...a) => { const now = Date.now(); if (now - last >= ms) { last = now; fn(...a); } };
};

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const mapRange = (v, inLo, inHi, outLo, outHi) =>
  outLo + ((v - inLo) / (inHi - inLo)) * (outHi - outLo);
export const randBetween = (lo, hi) => lo + Math.random() * (hi - lo);

export const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch { return false; }
};

export const isMobile = (bp = 768) => window.innerWidth < bp;

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const currentYear = () => new Date().getFullYear();

/** Animate a number from start→end, calling onUpdate each frame. */
export function animateValue(start, end, duration, onUpdate, ease = t => 1 - Math.pow(1 - t, 3)) {
  const t0 = performance.now();
  let raf;
  function tick(now) {
    const p = Math.min((now - t0) / duration, 1);
    onUpdate(start + (end - start) * ease(p));
    if (p < 1) raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
