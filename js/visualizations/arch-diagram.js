/**
 * ARCH-DIAGRAM.JS — Animated architecture diagrams for project dossiers
 * Draws contextual system topology per project type (Canvas2D)
 */

import { el, prefersReducedMotion } from '../utils.js';

// ============================================================
// ENTRY POINT
// ============================================================

/**
 * Draws the appropriate architecture diagram onto a canvas element.
 * @param {HTMLCanvasElement} canvas
 * @param {'inference'|'webrtc'|'embedded'} type
 */
export function drawArchDiagram(canvas, type) {
  const ctx = canvas.getContext('2d');
  const W   = canvas.width  = canvas.offsetWidth  * Math.min(window.devicePixelRatio, 2);
  const H   = canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
  ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  const w = W / window.devicePixelRatio;
  const h = H / window.devicePixelRatio;
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

  ctx.clearRect(0, 0, w, h);

  if (type === 'inference') drawInference(ctx, w, h, isDark);
  else if (type === 'webrtc') drawWebRTC(ctx, w, h, isDark);
  else if (type === 'lms') drawLMS(ctx, w, h, isDark);
  else if (type === 'job-sys') drawJobSystem(ctx, w, h, isDark);
  else if (type === 'cyber-sec') drawCyberSec(ctx, w, h, isDark);
  else if (type === 'rust-comms') drawAetherNet(ctx, w, h, isDark);
  else if (type === 'edpal') drawEdPal(ctx, w, h, isDark);
  else if (type === 'mediasoup-sfu') drawNexStream(ctx, w, h, isDark);
  else if (type === 'quant-platform') drawNexCore(ctx, w, h, isDark);
  else drawEmbedded(ctx, w, h, isDark);
}

// ============================================================
// SHARED DRAWING HELPERS
// ============================================================

function box(ctx, x, y, w, h, label, sub, color, isDark) {
  const bg   = isDark ? 'rgba(26,32,48,0.9)' : 'rgba(208,216,232,0.9)';
  const text = isDark ? '#D8DDE8' : '#0F1420';
  const muted = isDark ? '#4A5568' : '#5A6A80';

  ctx.fillStyle = bg;
  ctx.strokeStyle = color;
  ctx.lineWidth = 1;
  roundRect(ctx, x - w/2, y - h/2, w, h, 4);
  ctx.fill();
  ctx.stroke();

  // Glow
  ctx.shadowColor = color;
  ctx.shadowBlur  = 8;
  ctx.strokeStyle = color;
  roundRect(ctx, x - w/2, y - h/2, w, h, 4);
  ctx.stroke();
  ctx.shadowBlur = 0;

  ctx.fillStyle = text;
  ctx.font = '600 11px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x, y - (sub ? 7 : 0));

  if (sub) {
    ctx.fillStyle = muted;
    ctx.font = '400 9px "JetBrains Mono", monospace';
    ctx.fillText(sub, x, y + 7);
  }
}

function arrow(ctx, x1, y1, x2, y2, color, label) {
  ctx.strokeStyle = color;
  ctx.lineWidth   = 1;
  ctx.setLineDash([4, 3]);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.setLineDash([]);

  // Arrowhead
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const hs = 6;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - hs * Math.cos(angle - 0.4), y2 - hs * Math.sin(angle - 0.4));
  ctx.lineTo(x2 - hs * Math.cos(angle + 0.4), y2 - hs * Math.sin(angle + 0.4));
  ctx.closePath();
  ctx.fill();

  if (label) {
    ctx.fillStyle = color;
    ctx.font = '400 9px "JetBrains Mono", monospace';
    ctx.textAlign = 'center';
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 - 6;
    ctx.fillText(label, mx, my);
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ============================================================
// INFERENCE DIAGRAM
// ============================================================

function drawInference(ctx, w, h, isDark) {
  const cyan  = '#00C8FF';
  const green = '#00E5A0';

  const cx = w * 0.5;
  const cy = h * 0.5;

  // Core identity node
  box(
    ctx,
    cx,
    cy,
    140,
    45,
    'S. Wekesa',
    'Engineering Profile',
    green,
    isDark
  );

  // Expanded profile nodes (still minimal)
  const nodes = [
    [cx, h * 0.18, 'Backend', 'Django / APIs'],
    [w * 0.18, cy, 'Embedded', 'ESP32 / IoT'],
    [w * 0.82, cy, 'AI/ML', 'Keras / NLP'],
    [cx, h * 0.82, 'Systems', 'Distributed Design'],
    [w * 0.35, h * 0.28, 'WebRTC', 'SFU / Mediasoup'],
    [w * 0.65, h * 0.72, 'CyberSec', 'SIEM / Wazuh']
  ];

  nodes.forEach(([x, y, title, sub]) => {
    box(ctx, x, y, 110, 34, title, sub, cyan, isDark);
    arrow(ctx, x, y, cx, cy, cyan, '');
  });

  label(
    ctx,
    cx,
    h * 0.93,
    'S. Wekesa — Full-Stack Systems, Embedded, AI & Security Engineering Profile',
    isDark
  );
}

// ============================================================
// WEBRTC SFU DIAGRAM
// ============================================================

function drawWebRTC(ctx, w, h, isDark) {
  const red  = '#FF4A6E';
  const cyan = '#00C8FF';
  const amber = '#F0A832';

  const cx  = w * 0.5;
  const cy  = h * 0.48;

  // Central SFU
  box(ctx, cx, cy, 100, 36, 'SFU Server', 'mediasoup', red, isDark);

  // Peers around
  const peers = [
    [cx, h*0.12, 'Publisher', 'OBS/Browser'],
    [w*0.15, cy, 'Subscriber A', ''],
    [w*0.85, cy, 'Subscriber B', ''],
    [w*0.25, h*0.82, 'Subscriber C', ''],
    [w*0.75, h*0.82, 'Subscriber D', ''],
  ];

  peers.forEach(([px, py, name, sub]) => {
    box(ctx, px, py, 90, 30, name, sub, cyan, isDark);
    const fromPub = name === 'Publisher';
    const ex1 = cx + (px < cx ? -50 : 50);
    const ey1 = cy + (py < cy ? -18 : 18);
    const ex2 = px + (px < cx ? 45 : -45);
    const ey2 = py + (py < cy ? 15 : -15);
    if (fromPub) {
      arrow(ctx, ex2, ey2, ex1, ey1, amber, 'SRTP');
    } else {
      arrow(ctx, ex1, ey1, ex2, ey2, red, 'fwd');
    }
  });

  label(ctx, cx, h*0.93, 'SFU-X — Selective Forwarding Architecture', isDark);
}

// ===========================================================
// LMS DIAGRAM
// ===========================================================
function drawLMS(ctx, w, h, isDark) {
  const purple = '#8B5CF6';
  const cyan   = '#00C8FF';
  const green  = '#22C55E';

  const cx = w * 0.5;
  const cy = h * 0.48;

  // Core Platform
  box(
    ctx,
    cx,
    cy,
    120,
    40,
    'CampusVibes',
    'Student Platform',
    purple,
    isDark
  );

  const modules = [
    [cx,       h * 0.12, 'Assignments', 'Create & Manage'],
    [w * 0.15, cy,       'Submissions', 'Student Work'],
    [w * 0.85, cy,       'Grading', 'Assessment'],
    [w * 0.25, h * 0.82, 'Marketplace', 'Buy & Sell'],
    [w * 0.75, h * 0.82, 'Events', 'Campus Activities'],
  ];

  modules.forEach(([px, py, title, subtitle]) => {
    box(
      ctx,
      px,
      py,
      100,
      32,
      title,
      subtitle,
      cyan,
      isDark
    );

    const ex1 = cx + (px < cx ? -60 : 60);
    const ey1 = cy + (py < cy ? -20 : 20);

    const ex2 = px + (px < cx ? 50 : -50);
    const ey2 = py + (py < cy ? 16 : -16);

    arrow(
      ctx,
      ex1,
      ey1,
      ex2,
      ey2,
      green,
      'sync'
    );
  });

  label(
    ctx,
    cx,
    h * 0.93,
    'CampusVibes — Learning, Community & Student Engagement',
    isDark
  );
}

// ============================================================
// EMBEDDED DIAGRAM
// ============================================================

function drawEmbedded(ctx, w, h, isDark) {
  const amber = '#F0A832';
  const green = '#00E5A0';
  const cyan  = '#00C8FF';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // Input Perception (left)
  box(ctx, col1, h*0.20, 90, 28, 'Face Feed', 'Camera Stream', amber, isDark);
  box(ctx, col1, h*0.45, 90, 28, 'Facial Landmarks', 'MediaPipe', amber, isDark);
  box(ctx, col1, h*0.70, 90, 28, 'Feature Signals', 'Eyes/Mouth/Head', amber, isDark);

  // Intelligence Core (center)
  box(ctx, col2, h*0.44, 110, 36, 'Drowsiness Engine', 'Keras CNN Fusion', green, isDark);

  // Actuation Layer (right)
  box(ctx, col3, h*0.18, 90, 28, 'Alert System', 'Audio Alarm', cyan, isDark);
  box(ctx, col3, h*0.40, 90, 28, 'Hazard Control', 'Vehicle Signals', cyan, isDark);
  box(ctx, col3, h*0.62, 90, 28, 'Vehicle Control', 'Deceleration Logic', cyan, isDark);
  box(ctx, col3, h*0.80, 90, 28, 'Safety Response', 'Authority Trigger', cyan, isDark);

  // Arrows: perception → engine
  arrow(ctx, col1+45, h*0.20, col2-55, h*0.41, amber, '');
  arrow(ctx, col1+45, h*0.45, col2-55, h*0.44, amber, '');
  arrow(ctx, col1+45, h*0.70, col2-55, h*0.47, amber, '');

  // Arrows: engine → actuation layers
  arrow(ctx, col2+55, h*0.42, col3-45, h*0.18, green, '');
  arrow(ctx, col2+55, h*0.44, col3-45, h*0.40, green, '');
  arrow(ctx, col2+55, h*0.46, col3-45, h*0.62, green, '');
  arrow(ctx, col2+55, h*0.48, col3-45, h*0.80, green, '');

  label(
    ctx,
    col2,
    h*0.93,
    'DDD System — Multi-Stage Driver Drowsiness Detection & Control Pipeline',
    isDark
  );
}


// JOB system

function drawJobSystem(ctx, w, h, isDark) {
  const amber = '#F0A832';
  const green = '#00E5A0';
  const cyan  = '#00C8FF';
  const purple = '#A855F7';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // Data Collection Layer (Scrapy System)
  box(ctx, col1, h*0.18, 95, 30, 'Scrapy Spiders', 'Job Boards Crawling', amber, isDark);
  box(ctx, col1, h*0.38, 95, 30, 'ItemLoaders', 'Clean & Normalize', amber, isDark);
  box(ctx, col1, h*0.58, 95, 30, 'Middleware', 'User-Agent Rotation', amber, isDark);
  box(ctx, col1, h*0.78, 95, 30, 'Job Dirs', 'Checkpointing', amber, isDark);

  // Storage + Pipeline Layer
  box(ctx, col2, h*0.35, 110, 36, 'ETL Pipeline', 'Scrapy Pipelines', green, isDark);
  box(ctx, col2, h*0.55, 110, 36, 'PostgreSQL', 'Structured Job Store', green, isDark);
  box(ctx, col2, h*0.75, 110, 36, 'Redis Cache', 'Trending Skills', green, isDark);

  // Intelligence + API Layer (Flask System)
  box(ctx, col3, h*0.18, 95, 30, 'NLP Engine', 'spaCy + SkillNer', cyan, isDark);
  box(ctx, col3, h*0.38, 95, 30, 'Embeddings', 'Sentence Transformers', cyan, isDark);
  box(ctx, col3, h*0.58, 95, 30, 'Similarity', 'RapidFuzz + Vectors', cyan, isDark);
  box(ctx, col3, h*0.78, 95, 30, 'Flask API', 'Job + Analytics Endpoints', cyan, isDark);

  // Frontend / Consumption Layer
  box(ctx, w*0.50, h*0.90, 140, 30, 'Frontend UI', 'HTML/CSS/JS Dashboard', purple, isDark);

  // Arrows: Scrapy → ETL
  arrow(ctx, col1+45, h*0.18, col2-55, h*0.33, amber, '');
  arrow(ctx, col1+45, h*0.38, col2-55, h*0.38, amber, '');
  arrow(ctx, col1+45, h*0.58, col2-55, h*0.42, amber, '');
  arrow(ctx, col1+45, h*0.78, col2-55, h*0.46, amber, '');

  // ETL → Storage
  arrow(ctx, col2+55, h*0.36, col2+55, h*0.52, green, '');
  arrow(ctx, col2+55, h*0.55, col2+55, h*0.70, green, '');

  // Storage → AI layer
  arrow(ctx, col2+55, h*0.55, col3-55, h*0.20, cyan, '');
  arrow(ctx, col2+55, h*0.55, col3-55, h*0.40, cyan, '');
  arrow(ctx, col2+55, h*0.55, col3-55, h*0.60, cyan, '');
  arrow(ctx, col2+55, h*0.70, col3-55, h*0.78, cyan, '');

  // AI → Frontend
  arrow(ctx, col3, h*0.78, w*0.55, h*0.88, purple, '');

  label(
    ctx,
    col2,
    h*0.97,
    'Job Intelligence System — Distributed Scraping to NLP Recommendation Pipeline',
    isDark
  );
}

// cyber sec project
function drawCyberSec(ctx, w, h, isDark) {
  const red   = '#FF4A6E';
  const cyan  = '#00C8FF';
  const green = '#00E5A0';
  const amber = '#F0A832';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // Attack Layer (left)
  box(ctx, col1, h*0.18, 95, 30, 'Attack VM', 'Metasploitable', red, isDark);
  box(ctx, col1, h*0.38, 95, 30, 'Brute Force', 'Password Attacks', red, isDark);
  box(ctx, col1, h*0.58, 95, 30, 'Vuln Scan', 'Exploit Tests', red, isDark);

  // Logging & Collection Layer (center-left)
  box(ctx, col2, h*0.28, 110, 36, 'Log Generation', 'System + App Logs', amber, isDark);
  box(ctx, col2, h*0.50, 110, 36, 'SIEM Collector', 'Wazuh Agent', amber, isDark);
  box(ctx, col2, h*0.72, 110, 36, 'Event Forwarding', 'Centralized Logs', amber, isDark);

  // SIEM Analysis Core (center-right)
  box(ctx, col3, h*0.28, 100, 32, 'Wazuh SIEM', 'Correlation Engine', cyan, isDark);
  box(ctx, col3, h*0.50, 100, 32, 'Alerting', 'Threat Detection', cyan, isDark);
  box(ctx, col3, h*0.72, 100, 32, 'Dashboards', 'Security Insights', cyan, isDark);

  // Security Response Layer (bottom center)
  box(ctx, w*0.50, h*0.90, 140, 30, 'Incident Response', 'Alerts & Mitigation', green, isDark);

  // Arrows: attack → logs
  arrow(ctx, col1+48, h*0.18, col2-55, h*0.28, red, '');
  arrow(ctx, col1+48, h*0.38, col2-55, h*0.50, red, '');
  arrow(ctx, col1+48, h*0.58, col2-55, h*0.72, red, '');

  // logs → SIEM
  arrow(ctx, col2+55, h*0.28, col3-50, h*0.28, amber, '');
  arrow(ctx, col2+55, h*0.50, col3-50, h*0.50, amber, '');
  arrow(ctx, col2+55, h*0.72, col3-50, h*0.72, amber, '');

  // SIEM → response
  arrow(ctx, col3, h*0.50, w*0.55, h*0.88, cyan, '');

  label(
    ctx,
    col2,
    h*0.97,
    'CyberSec Lab — Attack Simulation to SIEM Monitoring Pipeline',
    isDark
  );
}

// Aehernet
function drawAetherNet(ctx, w, h, isDark) {
  const cyan  = '#00C8FF';
  const green = '#00E5A0';
  const amber = '#F0A832';
  const red   = '#FF4A6E';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // Client Layer (left)
  box(ctx, col1, h*0.18, 95, 30, 'Client Node', 'Rust Client Module', cyan, isDark);
  box(ctx, col1, h*0.38, 95, 30, 'Session Mgmt', 'Auth + Identity', cyan, isDark);
  box(ctx, col1, h*0.58, 95, 30, 'Media Input', 'Text/Audio/Video', cyan, isDark);
  box(ctx, col1, h*0.78, 95, 30, 'Transport', 'TCP / UDP / WS', cyan, isDark);

  // Server Core (center)
  box(ctx, col2, h*0.30, 110, 36, 'AetherNet Core', 'Axum + Tokio Server', green, isDark);
  box(ctx, col2, h*0.52, 110, 36, 'Router Engine', 'Message Routing', green, isDark);
  box(ctx, col2, h*0.74, 110, 36, 'Middleware', 'CORS + Auth + Logs', green, isDark);

  // Processing Modules (right)
  box(ctx, col3, h*0.18, 95, 30, 'Text Module', 'Cleaning & Validation', amber, isDark);
  box(ctx, col3, h*0.38, 95, 30, 'Media Module', 'Images / Audio / Video', amber, isDark);
  box(ctx, col3, h*0.58, 95, 30, 'Security Layer', 'Detection & Filtering', amber, isDark);
  box(ctx, col3, h*0.78, 95, 30, 'Database', 'PostgreSQL (SeaORM)', amber, isDark);

  // Arrows: Client → Server
  arrow(ctx, col1+48, h*0.18, col2-55, h*0.30, cyan, '');
  arrow(ctx, col1+48, h*0.38, col2-55, h*0.30, cyan, '');
  arrow(ctx, col1+48, h*0.58, col2-55, h*0.30, cyan, '');
  arrow(ctx, col1+48, h*0.78, col2-55, h*0.30, cyan, '');

  // Server internal flow
  arrow(ctx, col2+55, h*0.32, col2+55, h*0.52, green, '');
  arrow(ctx, col2+55, h*0.52, col2+55, h*0.74, green, '');

  // Server → Modules
  arrow(ctx, col2+55, h*0.30, col3-50, h*0.18, amber, '');
  arrow(ctx, col2+55, h*0.40, col3-50, h*0.38, amber, '');
  arrow(ctx, col2+55, h*0.50, col3-50, h*0.58, amber, '');
  arrow(ctx, col2+55, h*0.70, col3-50, h*0.78, amber, '');

  label(
    ctx,
    col2,
    h*0.93,
    'AetherNet — Modular Rust-Based Distributed Communication System',
    isDark
  );
}

function label(ctx, x, y, text, isDark) {
  ctx.fillStyle = isDark ? '#4A5568' : '#5A6A80';
  ctx.font = '400 9px "JetBrains Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

// edpal
function drawEdPal(ctx, w, h, isDark) {
  const green = '#2ECC71';
  const blue  = '#3498DB';
  const amber = '#F39C12';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // User Layer
  box(ctx, col1, h*0.18, 95, 30, 'Learners', 'Students', blue, isDark);
  box(ctx, col1, h*0.38, 95, 30, 'Assessments', 'Academic + Psychometric', blue, isDark);
  box(ctx, col1, h*0.58, 95, 30, 'Educators', 'Assessment Authors', blue, isDark);
  box(ctx, col1, h*0.78, 95, 30, 'Institution', 'Schools', blue, isDark);

  // Core
  box(ctx, col2, h*0.28, 110, 36, 'Evaluation Engine', 'Assessment Processing', green, isDark);
  box(ctx, col2, h*0.50, 110, 36, 'Scoring Engine', 'Academic + Psychometric', green, isDark);
  box(ctx, col2, h*0.72, 110, 36, 'Recommendation Engine', 'Career Matching', green, isDark);

  // Services
  box(ctx, col3, h*0.18, 95, 30, 'Career DB', 'Career Knowledge', amber, isDark);
  box(ctx, col3, h*0.38, 95, 30, 'Analytics', 'Learner Insights', amber, isDark);
  box(ctx, col3, h*0.58, 95, 30, 'Reports', 'Recommendations', amber, isDark);
  box(ctx, col3, h*0.78, 95, 30, 'PostgreSQL', 'Persistent Storage', amber, isDark);

  // Left → Core
  arrow(ctx,col1+48,h*.18,col2-55,h*.28,blue,'');
  arrow(ctx,col1+48,h*.38,col2-55,h*.28,blue,'');
  arrow(ctx,col1+48,h*.58,col2-55,h*.50,blue,'');
  arrow(ctx,col1+48,h*.78,col2-55,h*.72,blue,'');

  // Core Flow
  arrow(ctx,col2+55,h*.30,col2+55,h*.50,green,'');
  arrow(ctx,col2+55,h*.52,col2+55,h*.72,green,'');

  // Core → Right
  arrow(ctx,col2+55,h*.28,col3-50,h*.18,amber,'');
  arrow(ctx,col2+55,h*.42,col3-50,h*.38,amber,'');
  arrow(ctx,col2+55,h*.56,col3-50,h*.58,amber,'');
  arrow(ctx,col2+55,h*.72,col3-50,h*.78,amber,'');

  label(ctx,col2,h*.93,'EdPal — Career Recommendation & Evaluation Platform',isDark);
}

// nexcore
function drawNexCore(ctx, w, h, isDark) {
  const orange = '#F39C12';
  const green  = '#2ECC71';
  const blue   = '#3498DB';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // Inputs
  box(ctx,col1,h*.18,95,30,'Market Data','Historical + Live',orange,isDark);
  box(ctx,col1,h*.38,95,30,'Strategies','Trading Logic',orange,isDark);
  box(ctx,col1,h*.58,95,30,'ML Models','Predictions',orange,isDark);
  box(ctx,col1,h*.78,95,30,'Risk Rules','Portfolio Limits',orange,isDark);

  // Core
  box(ctx,col2,h*.30,110,36,'Research Engine','Feature Pipeline',green,isDark);
  box(ctx,col2,h*.52,110,36,'Backtest Engine','NautilusTrader',green,isDark);
  box(ctx,col2,h*.74,110,36,'Execution Engine','Paper / Live',green,isDark);

  // Outputs
  box(ctx,col3,h*.18,95,30,'Performance','Analytics',blue,isDark);
  box(ctx,col3,h*.38,95,30,'PostgreSQL','Market Storage',blue,isDark);
  box(ctx,col3,h*.58,95,30,'Broker API','IBKR / Alpaca',blue,isDark);
  box(ctx,col3,h*.78,95,30,'Dashboard','Monitoring',blue,isDark);

  arrow(ctx,col1+48,h*.18,col2-55,h*.30,orange,'');
  arrow(ctx,col1+48,h*.38,col2-55,h*.52,orange,'');
  arrow(ctx,col1+48,h*.58,col2-55,h*.52,orange,'');
  arrow(ctx,col1+48,h*.78,col2-55,h*.74,orange,'');

  arrow(ctx,col2+55,h*.32,col2+55,h*.52,green,'');
  arrow(ctx,col2+55,h*.52,col2+55,h*.74,green,'');

  arrow(ctx,col2+55,h*.30,col3-50,h*.18,blue,'');
  arrow(ctx,col2+55,h*.40,col3-50,h*.38,blue,'');
  arrow(ctx,col2+55,h*.55,col3-50,h*.58,blue,'');
  arrow(ctx,col2+55,h*.74,col3-50,h*.78,blue,'');

  label(ctx,col2,h*.93,'NexCore — AI Quantitative Trading Platform',isDark);
}

// nexstream
function drawNexStream(ctx, w, h, isDark) {
  const blue   = '#3498DB';
  const green  = '#2ECC71';
  const purple = '#9B59B6';

  const col1 = w * 0.18;
  const col2 = w * 0.50;
  const col3 = w * 0.82;

  // Clients
  box(ctx,col1,h*.18,95,30,'Participants','Browser / Mobile',blue,isDark);
  box(ctx,col1,h*.38,95,30,'WebRTC','Media Streams',blue,isDark);
  box(ctx,col1,h*.58,95,30,'Socket.IO','Signalling',blue,isDark);
  box(ctx,col1,h*.78,95,30,'Authentication','JWT',blue,isDark);

  // SFU
  box(ctx,col2,h*.30,110,36,'Express API','REST + Auth',green,isDark);
  box(ctx,col2,h*.52,110,36,'Mediasoup SFU','Routers + Workers',green,isDark);
  box(ctx,col2,h*.74,110,36,'Session Manager','Rooms & Participants',green,isDark);

  // Backend
  box(ctx,col3,h*.18,95,30,'Recording','Media Storage',purple,isDark);
  box(ctx,col3,h*.38,95,30,'Redis','Session Cache',purple,isDark);
  box(ctx,col3,h*.58,95,30,'PostgreSQL','Metadata',purple,isDark);
  box(ctx,col3,h*.78,95,30,'Monitoring','Logs',purple,isDark);

  arrow(ctx,col1+48,h*.18,col2-55,h*.30,blue,'');
  arrow(ctx,col1+48,h*.38,col2-55,h*.52,blue,'');
  arrow(ctx,col1+48,h*.58,col2-55,h*.52,blue,'');
  arrow(ctx,col1+48,h*.78,col2-55,h*.30,blue,'');

  arrow(ctx,col2+55,h*.32,col2+55,h*.52,green,'');
  arrow(ctx,col2+55,h*.52,col2+55,h*.74,green,'');

  arrow(ctx,col2+55,h*.30,col3-50,h*.18,purple,'');
  arrow(ctx,col2+55,h*.40,col3-50,h*.38,purple,'');
  arrow(ctx,col2+55,h*.55,col3-50,h*.58,purple,'');
  arrow(ctx,col2+55,h*.74,col3-50,h*.78,purple,'');

  label(ctx,col2,h*.93,'NexStream — Mediasoup SFU Video Conferencing Platform',isDark);
}