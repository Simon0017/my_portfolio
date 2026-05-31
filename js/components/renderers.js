/**
 * RENDERERS.JS — Renders dynamic sections from config data
 */

import { PROFILE, DOMAINS, PROJECTS } from '../config.js';
import { qs, el } from '../utils.js';
import { openDossier } from './dossier.js';

// ============================================================
// ABOUT / HERO STATS
// ============================================================

export function renderHeroPanel() {
  const panel = qs('#hero-stats-panel');
  if (!panel || !PROFILE.stats) return;

  panel.innerHTML = PROFILE.stats.map(s => `
    <div class="hero__stat">
      <span class="hero__stat-label">${s.label}</span>
      <span class="hero__stat-value hero__stat-value${s.color ? '--' + s.color : ''}">${s.value}</span>
    </div>
  `).join('');
}

export function renderAboutSpecs() {
  const list = qs('#about-specs');
  if (!list) return;

  list.innerHTML = PROFILE.specs.map(s => `
    <div class="about__spec" data-reveal="slide-up">
      <span class="about__spec-key">${s.key}</span>
      <span class="about__spec-val">${s.val}</span>
    </div>
  `).join('');
}

// ============================================================
// DOMAINS
// ============================================================

export function renderDomains() {
  const grid = qs('#domains-grid');
  if (!grid) return;

  grid.innerHTML = DOMAINS.map((d, i) => `
    <div class="domain-card"
         style="--card-accent:${d.accent}"
         data-reveal="scale"
         data-delay="${i + 1}">
      <div class="domain-card__icon"><i class="${d.icon}"></i></div>
      <h3 class="domain-card__title">${d.title}</h3>
      <p class="domain-card__desc">${d.desc}</p>
      <div class="domain-card__tags">
        ${d.tags.map(t => `<span class="tag-hud">${t}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// ============================================================
// PROJECTS
// ============================================================

export function renderProjects() {
  const grid = qs('#projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  PROJECTS.forEach((p, i) => {
    const card = el('div', {
      class: 'project-card',
      style: `--project-accent-bg:${p.accentBg};--project-accent:${p.accent}`,
      'data-reveal': 'scale',
      'data-delay': `${(i % 2) + 1}`,
    });

    card.innerHTML = `
      <div class="project-card__header">
        <div class="project-card__header-bg"></div>
        <div class="project-card__id">${p.id}</div>
        <h3 class="project-card__title">${p.title}</h3>
        <div class="project-card__subtitle">${p.subtitle}</div>
      </div>
      <div class="project-card__body">
        <p class="project-card__desc">${p.desc}</p>
        <div class="project-card__meta">
          <div class="project-card__tags">
            ${p.tags.slice(0, 4).map(t => `<span class="tag-hud">${t}</span>`).join('')}
          </div>
          <span class="project-card__open">Open dossier →</span>
        </div>
      </div>
    `;

    card.addEventListener('click', () => openDossier(p));
    grid.appendChild(card);
  });
}

// ============================================================
// CONTACT
// ============================================================

export function renderContact() {
  const list = qs('#contact-list');
  if (!list) return;

  const items = [
    { icon: '✉', label: 'Email',    value: PROFILE.contact.email,    href: `mailto:${PROFILE.contact.email}` },
    { icon: '⬡', label: 'GitHub',   value: PROFILE.contact.github,   href: `https://${PROFILE.contact.github}` },
    { icon: '◈', label: 'LinkedIn', value: PROFILE.contact.linkedin, href: `https://${PROFILE.contact.linkedin}` },
    { icon: '◉', label: 'X',  value: PROFILE.contact.twitter,  href: `https://x.com/${PROFILE.contact.twitter.slice(1)}` },
  ];

  list.innerHTML = items.map((item, i) => `
    <a href="${item.href}" target="_blank" rel="noopener"
       class="contact__item"
       data-reveal="slide-left"
       data-delay="${i + 1}">
      <div class="contact__item-icon">${item.icon}</div>
      <div>
        <div class="contact__item-label">${item.label}</div>
        <div class="contact__item-value">${item.value}</div>
      </div>
    </a>
  `).join('');
}
