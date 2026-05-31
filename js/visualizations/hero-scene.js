/**
 * HERO-SCENE.JS — Three.js particle neural network for hero background
 */

import { supportsWebGL, isMobile, prefersReducedMotion, randBetween } from '../utils.js';

let renderer, scene, camera, particles, lines, raf;
let mouseX = 0, mouseY = 0;

// ============================================================
// NODE DATA
// ============================================================

function generateNodes(count) {
  const nodes = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: randBetween(-4, 4),
      y: randBetween(-2.5, 2.5),
      z: randBetween(-2, 0.5),
      vx: randBetween(-0.003, 0.003),
      vy: randBetween(-0.002, 0.002),
      vz: randBetween(-0.001, 0.001),
      size: randBetween(0.008, 0.025),
    });
  }
  return nodes;
}

// ============================================================
// INIT
// ============================================================

export function initHeroScene(containerId) {
  if (!supportsWebGL() || prefersReducedMotion()) return null;
  if (typeof THREE === 'undefined') return null;

  const container = document.getElementById(containerId);
  if (!container) return null;

  const W = container.clientWidth;
  const H = container.clientHeight;
  const mobile = isMobile();
  const nodeCount = mobile ? 40 : 90;
  const nodes = generateNodes(nodeCount);

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 50);
  camera.position.z = 4;

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);
  container.appendChild(renderer.domElement);

  // ── Particles (nodes) ──
  const geo   = new THREE.BufferGeometry();
  const pos   = new Float32Array(nodeCount * 3);
  const sizes = new Float32Array(nodeCount);
  const colors = new Float32Array(nodeCount * 3);

  nodes.forEach((n, i) => {
    pos[i * 3]     = n.x;
    pos[i * 3 + 1] = n.y;
    pos[i * 3 + 2] = n.z;
    sizes[i] = n.size;
    // Cyan-to-amber colour variation
    const t = Math.random();
    colors[i * 3]     = t > 0.8 ? 0.94 : 0.0;
    colors[i * 3 + 1] = t > 0.8 ? 0.66 : 0.78;
    colors[i * 3 + 2] = t > 0.8 ? 0.12 : 1.0;
  });

  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));
  geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    size: 0.04,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // ── Connection lines ──
  buildLines(nodes);

  // ── Ambient light ──
  scene.add(new THREE.AmbientLight(0x00c8ff, 0.3));

  // ── Resize ──
  const ro = new ResizeObserver(() => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
  ro.observe(container);

  // ── Mouse ──
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  // ── Loop ──
  let t = 0;
  function tick() {
    raf = requestAnimationFrame(tick);
    t += 0.005;

    // Drift nodes
    const posAttr = geo.attributes.position;
    nodes.forEach((n, i) => {
      n.x += n.vx + Math.sin(t + i) * 0.0008;
      n.y += n.vy + Math.cos(t + i * 0.7) * 0.0006;
      n.z += n.vz;

      // Soft bounce
      if (Math.abs(n.x) > 4.5) n.vx *= -1;
      if (Math.abs(n.y) > 2.8) n.vy *= -1;
      if (n.z > 0.8 || n.z < -2.2) n.vz *= -1;

      posAttr.array[i * 3]     = n.x;
      posAttr.array[i * 3 + 1] = n.y;
      posAttr.array[i * 3 + 2] = n.z;
    });
    posAttr.needsUpdate = true;

    // Rebuild lines every few frames for performance
    if (Math.round(t * 20) % 4 === 0) {
      scene.remove(lines);
      buildLines(nodes);
    }

    // Gentle camera drift toward mouse
    camera.position.x += (mouseX * 0.25 - camera.position.x) * 0.02;
    camera.position.y += (-mouseY * 0.15 - camera.position.y) * 0.02;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  tick();

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    geo.dispose();
    mat.dispose();
    renderer.dispose();
    renderer.domElement?.parentNode?.removeChild(renderer.domElement);
  };
}

// ============================================================
// LINE BUILDER
// ============================================================

function buildLines(nodes) {
  const MAX_DIST = 1.6;
  const pts = [];
  const cols = [];

  for (let a = 0; a < nodes.length; a++) {
    for (let b = a + 1; b < nodes.length; b++) {
      const dx = nodes[a].x - nodes[b].x;
      const dy = nodes[a].y - nodes[b].y;
      const dz = nodes[a].z - nodes[b].z;
      const d  = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if (d < MAX_DIST) {
        const alpha = 1 - d / MAX_DIST;
        pts.push(nodes[a].x, nodes[a].y, nodes[a].z);
        pts.push(nodes[b].x, nodes[b].y, nodes[b].z);
        // Cyan tint for lines
        cols.push(0, 0.78 * alpha, alpha, 0, 0.78 * alpha, alpha);
      }
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(pts), 3));
  geo.setAttribute('color',    new THREE.BufferAttribute(new Float32Array(cols), 3));

  const mat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.25,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  lines = new THREE.LineSegments(geo, mat);
  scene.add(lines);
}
