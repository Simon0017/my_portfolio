/**
 * DOSSIER.JS — Immersive project dossier modal
 * Opens as a full-screen classified-file experience.
 */

import { qs, el } from '../utils.js';
import { drawArchDiagram } from '../visualizations/arch-diagram.js';

let backdrop, dossier, activeItem;

// ============================================================
// OPEN
// ============================================================

export function openDossier(item) {
  activeItem = item;
  ensureDOM();
  populate(item);
  backdrop.classList.add('open');
  dossier.classList.add('open');
  document.body.style.overflow = 'hidden';
  document.addEventListener('keydown', onKeyDown);
}

// ============================================================
// CLOSE
// ============================================================

export function closeDossier() {
  backdrop?.classList.remove('open');
  dossier?.classList.remove('open');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', onKeyDown);
}

function onKeyDown(e) {
  if (e.key === 'Escape') closeDossier();
}

// ============================================================
// BUILD DOM (once)
// ============================================================

function ensureDOM() {
  if (qs('#dossier')) return;

  backdrop = el('div', { class: 'dossier-backdrop', id: 'dossier-backdrop' });
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeDossier();
  });

  dossier = el('div', { class: 'dossier', id: 'dossier', role: 'dialog', 'aria-modal': 'true' });

  const topbar = el('div', { class: 'dossier__topbar' });
  const idLabel = el('div', { class: 'dossier__topbar-id', id: 'dossier-id' }, 'PROJECT DOSSIER');
  const closeBtn = el('button', { class: 'dossier__close', 'aria-label': 'Close dossier' }, '✕');
  closeBtn.addEventListener('click', closeDossier);
  topbar.appendChild(idLabel);
  topbar.appendChild(closeBtn);

  const body     = el('div', { class: 'dossier__body' });
  const main     = el('div', { class: 'dossier__main',    id: 'dossier-main' });
  const sidebar  = el('div', { class: 'dossier__sidebar', id: 'dossier-sidebar' });
  body.appendChild(main);
  body.appendChild(sidebar);

  dossier.appendChild(topbar);
  dossier.appendChild(body);
  document.body.appendChild(backdrop);
  document.body.appendChild(dossier);
}

// ============================================================
// POPULATE
// ============================================================

function populate(item) {
  const idLabel = qs('#dossier-id');
  const main    = qs('#dossier-main');
  const sidebar = qs('#dossier-sidebar');
  if (!main || !sidebar) return;

  if (idLabel) idLabel.textContent = `${item.id} // ${item.subtitle?.toUpperCase()}`;

  // ── MAIN ──
  main.innerHTML = `
    <h2 class="dossier__title">${item.title}</h2>
    <div class="dossier__subtitle">${item.subtitle}</div>
    <div class="dossier__section-title">SYSTEM OVERVIEW</div>
    <p class="dossier__desc">${item.detail?.overview || item.desc}</p>
    <div class="dossier__section-title">ARCHITECTURE</div>
    <div class="dossier__arch" id="dossier-arch">
      <canvas id="arch-canvas" style="width:100%;height:100%;"></canvas>
    </div>
    <div class="dossier__section-title">METRICS</div>
    <div class="dossier__metrics" id="dossier-metrics"></div>
    <div class="dossier__section-title">ENGINEERING CHALLENGES</div>
    <div class="dossier__challenges" id="dossier-challenges"></div>
  `;

  // Architecture canvas
  requestAnimationFrame(() => {
    const canvas = qs('#arch-canvas');
    if (canvas) drawArchDiagram(canvas, item.archType || 'inference');
  });

  // Metrics
  const metricsEl = qs('#dossier-metrics');
  if (metricsEl && item.metrics) {
    metricsEl.innerHTML = item.metrics.map(m => `
      <div class="dossier__metric">
        <div class="dossier__metric-label">${m.label}</div>
        <div class="dossier__metric-value">${m.value}</div>
      </div>
    `).join('');
  } else if (metricsEl && item.detail?.outcomes) {
    metricsEl.innerHTML = item.detail.outcomes.map(o => `
      <div class="dossier__metric" style="grid-column:1/-1;">
        <div class="dossier__metric-label">OUTCOME</div>
        <div class="dossier__metric-value" style="font-size:var(--text-md)">${o}</div>
      </div>
    `).join('');
  }

  // Challenges
  const challengesEl = qs('#dossier-challenges');
  const challenges = item.challenges || item.detail?.challenges || [];
  if (challengesEl) {
    challengesEl.innerHTML = challenges.map(c => `
      <div class="dossier__challenge">
        <span class="dossier__challenge-icon">⚡</span>
        <p class="dossier__challenge-text">${c}</p>
      </div>
    `).join('');
  }

  // ── SIDEBAR ──
  const stack = item.stack || item.detail?.stack || [];
  const pipeline = item.pipeline || item.detail?.pipeline || [];

  sidebar.innerHTML = `
    <div class="dossier__section-title">TECH STACK</div>
    <div class="dossier__stack-items">
      ${stack.map(s => `
        <div class="dossier__stack-item">
          <span class="dossier__stack-name">${s.name}</span>
          <span class="dossier__stack-role">${s.role}</span>
        </div>
      `).join('')}
    </div>
    <div class="dossier__section-title">DEPLOYMENT PIPELINE</div>
    <div class="dossier__pipeline">
      ${pipeline.map((step, i) => `
        <div style="display:flex;flex-direction:column;">
          <div class="dossier__pipeline-step">
            <span class="dossier__pipeline-dot"></span>
            ${step}
          </div>
          ${i < pipeline.length - 1 ? '<div class="dossier__pipeline-line" style="margin-left:3px;"></div>' : ''}
        </div>
      `).join('')}
    </div>
  `;
}
