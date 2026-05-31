/**
 * MAIN.JS — Application entry point and orchestrator
 *
 * Boot sequence:
 *  1. Theme (pre-paint, no flash)
 *  2. Preloader
 *  3. Core UI (cursor, nav, scroll reveal)
 *  4. Section renderers
 *  5. Three.js hero scene (idle-callback, non-blocking)
 *  6. Stack viz, timeline, terminal
 *  7. Audio
 */

import { initTheme }       from './components/theme.js';
import {
  initPreloader,
  initCursor,
  initNav,
  initScrollReveal,
  initAudio,
  attachSounds,
}                          from './components/core.js';
import {
  renderHeroPanel,
  renderAboutSpecs,
  renderDomains,
  renderProjects,
  renderContact,
}                          from './components/renderers.js';
import { renderTimeline }  from './timelines/timeline.js';
import { initTerminal }    from './components/terminal.js';
import { initStackViz }    from './visualizations/stack-viz.js';
import { currentYear }     from './utils.js';
import { PROFILE }         from './config.js';

// ============================================================
// HERO SCENE (lazy)
// ============================================================

async function bootHeroScene() {
  try {
    const { initHeroScene } = await import('./visualizations/hero-scene.js');
    initHeroScene('hero-canvas');
  } catch (e) {
    console.info('[main] Hero scene unavailable:', e.message);
  }
}

// ============================================================
// DYNAMIC CONTENT
// ============================================================

function setDynamicText() {
  // Year
  document.querySelectorAll('.year-dynamic').forEach(el => {
    el.textContent = currentYear();
  });

  // Name
  document.querySelectorAll('.profile-name').forEach(el => {
    el.textContent = PROFILE.name;
  });

  // Availability badge
  const badge = document.querySelector('#availability-badge');
  if (badge) {
    badge.textContent = PROFILE.available ? 'Available' : 'Not Available';
    badge.style.color = PROFILE.available
      ? 'var(--accent-green)'
      : 'var(--accent-red)';
  }
}

// ============================================================
// RADAR CANVAS (hero panel)
// ============================================================

function initRadar(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let angle = 0;
  const size = canvas.offsetWidth;
  canvas.width  = size;
  canvas.height = size;
  const cx = size / 2, cy = size / 2, r = size * 0.44;
  const isDark = () => document.documentElement.getAttribute('data-theme') !== 'light';

  function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, size, size);

    const dark = isDark();
    const cyan = dark ? '#00C8FF' : '#0090C8';

    // Rings
    for (let i = 1; i <= 4; i++) {
      ctx.beginPath();
      ctx.arc(cx, cy, r * (i / 4), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${dark ? '0,200,255' : '0,144,200'}, ${0.08 + i * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Cross hairs
    ctx.strokeStyle = dark ? 'rgba(0,200,255,0.1)' : 'rgba(0,144,200,0.1)';
    ctx.beginPath(); ctx.moveTo(cx, cy - r); ctx.lineTo(cx, cy + r); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - r, cy); ctx.lineTo(cx + r, cy); ctx.stroke();

    // Sweep
    const grad = ctx.createConicalGradient
      ? ctx.createConicalGradient(angle, cx, cy)
      : null;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);

    const sweep = ctx.createLinearGradient(0, 0, r, 0);
    sweep.addColorStop(0,   `rgba(${dark ? '0,200,255' : '0,144,200'}, 0.5)`);
    sweep.addColorStop(0.6, `rgba(${dark ? '0,200,255' : '0,144,200'}, 0.1)`);
    sweep.addColorStop(1,   'rgba(0,0,0,0)');

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, r, 0, Math.PI * 0.5);
    ctx.closePath();
    ctx.fillStyle = sweep;
    ctx.fill();
    ctx.restore();

    // Blips
    const blips = [
      { a: 0.8, d: 0.3 },
      { a: 2.1, d: 0.6 },
      { a: 3.9, d: 0.75 },
      { a: 5.2, d: 0.5 },
    ];

    blips.forEach(b => {
      const bx = cx + Math.cos(b.a) * r * b.d;
      const by = cy + Math.sin(b.a) * r * b.d;
      // Fade blip based on angle distance from sweep
      let diff = ((angle - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const alpha = diff < 0.3 ? 1 : Math.max(0, 1 - diff / (Math.PI * 1.2));
      ctx.beginPath();
      ctx.arc(bx, by, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${dark ? '0,229,160' : '0,136,96'}, ${alpha * 0.9})`;
      ctx.fill();
    });

    angle += 0.018;
  }

  draw();
}

// ============================================================
// BOOT
// ============================================================

function bootstrap() {
  // 1. Theme first — prevents flash
  initTheme();

  // 2. Preloader
  initPreloader();

  // 3. Dynamic text
  setDynamicText();

  // 4. Core UI
  initCursor();
  initNav();

  // 5. Render content from config
  renderHeroPanel();
  renderAboutSpecs();
  renderDomains();
  renderProjects();
  renderContact();
  renderTimeline();

  // 6. Scroll reveal (after content exists)
  initScrollReveal();

  // 7. Specialized widgets
  initRadar('radar-canvas');
  initTerminal('terminal-section');
  initStackViz('stack-canvas-container');

  // 8. Audio
  initAudio();
  attachSounds();

  // 9. Three.js hero — non-blocking, after idle
  if ('requestIdleCallback' in window) {
    requestIdleCallback(bootHeroScene, { timeout: 2000 });
  } else {
    setTimeout(bootHeroScene, 600);
  }
}

// ============================================================
// ENTRY
// ============================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
