/**
 * CORE.JS — Cursor, preloader, nav, scroll reveal, progress bar
 */

import { qs, qsAll, throttle, prefersReducedMotion } from '../utils.js';
import { ANIM } from '../config.js';

// ============================================================
// CUSTOM CURSOR
// ============================================================

export function initCursor() {
  if (prefersReducedMotion() || window.matchMedia('(pointer: coarse)').matches) return;

  const ring = qs('.cursor__ring');
  const dot  = qs('.cursor__dot');
  if (!ring || !dot) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  let raf;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function tick() {
    rx = rx + (mx - rx) * 0.18;
    ry = ry + (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px)`;
    dot.style.transform  = `translate(${mx}px, ${my}px)`;
    raf = requestAnimationFrame(tick);
  }
  raf = requestAnimationFrame(tick);

  // Hover state
  document.addEventListener('mouseover', e => {
    const t = e.target.closest('a, button, [data-hover], .nav__link, .project-card, .domain-card, .timeline-item__node');
    if (t) { ring.parentElement.classList.add('cursor--hover'); }
  });

  document.addEventListener('mouseout', e => {
    const t = e.target.closest('a, button, [data-hover], .nav__link, .project-card, .domain-card, .timeline-item__node');
    if (t) { ring.parentElement.classList.remove('cursor--hover'); }
  });

  document.addEventListener('mousedown', () => ring.parentElement.classList.add('cursor--click'));
  document.addEventListener('mouseup',   () => ring.parentElement.classList.remove('cursor--click'));
}

// ============================================================
// PRELOADER
// ============================================================

export function initPreloader() {
  const loader  = qs('#preloader');
  const fill    = qs('.preloader__fill');
  const status  = qs('.preloader__status');
  if (!loader) return;

  const steps = [
    'Initializing systems...',
    'Loading kernel modules...',
    'Mounting asset layer...',
    'Compiling shaders...',
    'Booting interface...',
    'Ready.',
  ];

  let pct = 0;
  let stepIdx = 0;

  const interval = setInterval(() => {
    pct += Math.random() * 22 + 8;
    if (pct > 100) pct = 100;

    fill.style.width = pct + '%';

    const si = Math.floor((pct / 100) * (steps.length - 1));
    if (si !== stepIdx) {
      stepIdx = si;
      if (status) status.textContent = steps[stepIdx];
    }

    if (pct >= 100) {
      clearInterval(interval);
      if (status) status.textContent = steps[steps.length - 1];
      setTimeout(() => {
        loader.classList.add('fade-out');
        setTimeout(() => { loader.style.display = 'none'; }, 600);
      }, 400);
    }
  }, 120);
}

// ============================================================
// NAVIGATION
// ============================================================

export function initNav() {
  const nav      = qs('#nav');
  const links    = qsAll('.nav__link');
  const sections = qsAll('section[id]');
  const hamburger = qs('#hamburger');
  const mobileNav = qs('.mobile-nav');

  // Scroll → scrolled class
  window.addEventListener('scroll', throttle(() => {
    nav?.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveLink();
    updateProgressBar();
    updateSideHud();
  }, 16), { passive: true });

  // Active link tracker
  function updateActiveLink() {
    let current = '';
    const mid = window.scrollY + window.innerHeight * 0.4;
    sections.forEach(s => { if (s.offsetTop <= mid) current = s.id; });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${current}`));
    qsAll('.side-hud__dot').forEach((d, i) => d.classList.toggle('active', sections[i]?.id === current));
  }

  // Side HUD dots
  qsAll('.side-hud__dot').forEach((dot, i) => {
    dot.addEventListener('click', () => sections[i]?.scrollIntoView({ behavior: 'smooth' }));
    dot.setAttribute('title', sections[i]?.id || '');
  });

  // Hamburger
  hamburger?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });

  qsAll('.mobile-nav__link').forEach(l => {
    l.addEventListener('click', () => mobileNav?.classList.remove('open'));
  });

  // Smooth scroll for anchor links
  qsAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.getElementById(a.getAttribute('href').slice(1));
      if (!t) return;
      e.preventDefault();
      t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================================
// PROGRESS BAR
// ============================================================

function updateProgressBar() {
  const bar = qs('#progress-bar');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
}

// ============================================================
// SIDE HUD
// ============================================================

function updateSideHud() {
  // handled inside updateActiveLink via nav init
}

// ============================================================
// SCROLL REVEAL
// ============================================================

export function initScrollReveal() {
  const targets = qsAll('[data-reveal]');
  if (!targets.length) return;

  if (prefersReducedMotion()) {
    targets.forEach(t => t.classList.add('revealed'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: ANIM.revealThreshold, rootMargin: ANIM.revealRootMargin });

  targets.forEach(t => obs.observe(t));
}

// ============================================================
// AUDIO (Web Audio API minimal)
// ============================================================

let audioCtx = null;
let muted = false;

export function initAudio() {
  const muteBtn = qs('#mute-toggle');
  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      muted = !muted;
      const icon = muteBtn.querySelector('i');
      if (icon) icon.className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-low';
    });
  }
}

/** Plays a short synthetic click / hover tone. */
export function playTone(freq = 880, duration = 0.06, vol = 0.04) {
  if (muted || prefersReducedMotion()) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc  = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch {}
}

// Attach hover/click sounds to interactive elements
export function attachSounds() {
  document.addEventListener('mouseover', e => {
    if (e.target.closest('button, .nav__link, .project-card, .domain-card')) {
      playTone(1200, 0.04, 0.02);
    }
  });

  document.addEventListener('click', e => {
    if (e.target.closest('button, .btn-hud')) {
      playTone(660, 0.08, 0.05);
    }
  });
}
