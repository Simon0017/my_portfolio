/**
 * STACK-VIZ.JS — Interactive tech stack node graph
 * Canvas2D (no Three.js needed — saves GPU budget)
 */

import { STACK_NODES, STACK_EDGES, STACK_CATEGORIES } from '../config.js';
import { prefersReducedMotion, randBetween } from '../utils.js';

let canvas, ctx, W, H, raf;
let nodes = [];
let hoveredNode = null;
let mouse = { x: -999, y: -999 };

export function initStackViz(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;';
  container.appendChild(canvas);

  resize();
  buildNodes();

  window.addEventListener('resize', resize);
  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) * (W / r.width);
    mouse.y = (e.clientY - r.top)  * (H / r.height);
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -999; mouse.y = -999; });

  if (!prefersReducedMotion()) loop();
  else renderOnce();
}

function resize() {
  const c = canvas.parentElement;
  W = canvas.width  = c.clientWidth  * Math.min(window.devicePixelRatio, 2);
  H = canvas.height = c.clientHeight * Math.min(window.devicePixelRatio, 2);
  ctx = canvas.getContext('2d');
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  W /= window.devicePixelRatio;
  H /= window.devicePixelRatio;
  buildNodes();
}

function buildNodes() {
  nodes = STACK_NODES.map(n => {
    const cat = STACK_CATEGORIES[n.category];
    return {
      ...n,
      px:    n.x * W,
      py:    n.y * H,
      vx:    randBetween(-0.12, 0.12),
      vy:    randBetween(-0.10, 0.10),
      color: cat?.color || '#00C8FF',
      r:     22,
    };
  });
}

function loop() {
  raf = requestAnimationFrame(loop);
  update();
  draw();
}

function renderOnce() { buildNodes(); draw(); }

function update() {
  nodes.forEach(n => {
    n.px += n.vx;
    n.py += n.vy;
    // Soft boundary
    const ox = n.x * W, oy = n.y * H;
    n.vx += (ox - n.px) * 0.003;
    n.vy += (oy - n.py) * 0.003;
    n.vx *= 0.98;
    n.vy *= 0.98;
  });

  // Find hovered node
  hoveredNode = nodes.find(n => {
    const dx = mouse.x - n.px, dy = mouse.y - n.py;
    return Math.sqrt(dx*dx + dy*dy) < n.r + 8;
  }) || null;
}

function draw() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  ctx.clearRect(0, 0, W, H);

  // Background grid
  ctx.strokeStyle = isDark ? 'rgba(0,200,255,0.04)' : 'rgba(0,144,200,0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 50) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
  }
  for (let y = 0; y < H; y += 50) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
  }

  // Edges
  STACK_EDGES.forEach(([aId, bId]) => {
    const a = nodes.find(n => n.id === aId);
    const b = nodes.find(n => n.id === bId);
    if (!a || !b) return;

    const isHovered = hoveredNode && (hoveredNode.id === aId || hoveredNode.id === bId);
    const alpha = isHovered ? 0.5 : 0.15;

    const grad = ctx.createLinearGradient(a.px, a.py, b.px, b.py);
    grad.addColorStop(0, hexToRgba(a.color, alpha));
    grad.addColorStop(1, hexToRgba(b.color, alpha));

    ctx.beginPath();
    ctx.moveTo(a.px, a.py);
    ctx.lineTo(b.px, b.py);
    ctx.strokeStyle = grad;
    ctx.lineWidth = isHovered ? 1.5 : 0.8;
    ctx.stroke();
  });

  // Nodes
  nodes.forEach(n => {
    const isH = n === hoveredNode;
    const r   = isH ? n.r + 5 : n.r;

    // Glow
    const glow = ctx.createRadialGradient(n.px, n.py, 0, n.px, n.py, r * 2.5);
    glow.addColorStop(0, hexToRgba(n.color, isH ? 0.35 : 0.12));
    glow.addColorStop(1, hexToRgba(n.color, 0));
    ctx.beginPath();
    ctx.arc(n.px, n.py, r * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = glow;
    ctx.fill();

    // Circle
    ctx.beginPath();
    ctx.arc(n.px, n.py, r, 0, Math.PI * 2);
    ctx.fillStyle   = isDark ? 'rgba(20,24,32,0.85)' : 'rgba(232,236,242,0.85)';
    ctx.strokeStyle = hexToRgba(n.color, isH ? 0.9 : 0.5);
    ctx.lineWidth   = isH ? 2 : 1;
    ctx.fill();
    ctx.stroke();

    // Label
    ctx.fillStyle  = isH ? n.color : (isDark ? '#8A94A8' : '#2A3548');
    ctx.font       = `${isH ? 600 : 400} ${isH ? 11 : 10}px 'JetBrains Mono', monospace`;
    ctx.textAlign  = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(n.label, n.px, n.py);

    // Category dot
    ctx.beginPath();
    ctx.arc(n.px + r - 4, n.py - r + 4, 3, 0, Math.PI * 2);
    ctx.fillStyle = n.color;
    ctx.fill();
  });
}

function hexToRgba(hex, a) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}
