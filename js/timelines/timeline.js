/**
 * TIMELINE.JS — Career timeline renderer and scroll animations
 */

import { TIMELINE } from '../config.js';
import { qs, qsAll, el } from '../utils.js';
import { openDossier } from '../components/dossier.js';

// ============================================================
// SPINE FILL ON SCROLL
// ============================================================

export function initTimelineSpine() {
  const spine     = qs('.timeline__spine-fill');
  const section   = qs('#timeline-section');
  if (!spine || !section) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const h    = section.offsetHeight;
    const visible = Math.max(0, -rect.top);
    const pct  = Math.min(100, (visible / (h * 0.9)) * 100);
    spine.style.height = pct + '%';
  }, { passive: true });
}

// ============================================================
// NODE INTERSECTION OBSERVER
// ============================================================

function createNodeObserver() {
  return new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('active');
        e.target.closest('.timeline-item')?.classList.add('revealed');
      }
    });
  }, { threshold: 0.5 });
}

// ============================================================
// BUILD CARD
// ============================================================

function buildCard(item, index) {
  const side = index % 2 === 0 ? 'left' : 'right';

  const row = el('div', {
    class: `timeline-item timeline-item--${side}`,
    'data-reveal': 'fade',
    style: `--node-color: ${item.color}; transition-delay: ${index * 50}ms`,
  });

  const spacer   = el('div', { class: 'timeline-item__spacer' });
  const nodeCol  = el('div', { class: 'timeline-item__node-col' });
  const node     = el('div', {
    class:       'timeline-item__node',
    role:        'button',
    tabIndex:    '0',
    'aria-label': `${item.title} — expand`,
  }, el('span', { class: 'timeline-item__node-icon', html: `<i class="${item.icon}"></i>` }));

  const cardCol = el('div', { class: 'timeline-item__card-col' });

  const tags = (item.tags || [])
    .map(t => el('span', { class: 'tag-hud' }, t));

  const expand = el('span', {
    class: 'tag-hud tag-hud--cyan',
    style: 'cursor:pointer;margin-top:8px;',
  }, '↗ expand dossier');

  cardCol.innerHTML = `
    <div class="timeline-item__year">${item.year}</div>
    <h3 class="timeline-item__title">${item.title}</h3>
    <div class="timeline-item__org">${item.org}</div>
    <p class="timeline-item__desc">${item.desc}</p>
  `;

  const tagsDiv = el('div', { class: 'timeline-item__tags' }, ...tags, expand);
  cardCol.appendChild(tagsDiv);

  // Open dossier
  const openFn = () => openDossier(item);
  node.addEventListener('click', openFn);
  node.addEventListener('keydown', e => e.key === 'Enter' && openFn());
  expand.addEventListener('click', openFn);
  cardCol.querySelector('.timeline-item__title').addEventListener('click', openFn);

  nodeCol.appendChild(node);

  if (side === 'left') {
    row.appendChild(cardCol);
    row.appendChild(nodeCol);
    row.appendChild(spacer);
  } else {
    row.appendChild(spacer);
    row.appendChild(nodeCol);
    row.appendChild(cardCol);
  }

  return { row, node };
}

// ============================================================
// RENDER
// ============================================================

export function renderTimeline() {
  const container = qs('.timeline__items');
  if (!container) return;

  container.innerHTML = '';
  const observer = createNodeObserver();

  TIMELINE.forEach((item, i) => {
    const { row, node } = buildCard(item, i);
    container.appendChild(row);
    observer.observe(node);
  });

  initTimelineSpine();
}
