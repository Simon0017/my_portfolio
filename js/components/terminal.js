/**
 * TERMINAL.JS — Animated command terminal typewriter
 */

import { TERMINAL_LINES, ANIM } from '../config.js';
import { qs, prefersReducedMotion } from '../utils.js';

export function initTerminal(containerId) {
  const body = qs(`#${containerId} .terminal__body`);
  if (!body) return;

  if (prefersReducedMotion()) {
    TERMINAL_LINES.forEach(line => {
      body.appendChild(buildLine(line));
    });
    return;
  }

  let lineIdx = 0;

  function printNextLine() {
    if (lineIdx >= TERMINAL_LINES.length) {
      // Loop: clear and restart after pause
      setTimeout(() => {
        body.innerHTML = '';
        lineIdx = 0;
        printNextLine();
      }, 4000);
      return;
    }

    const line = TERMINAL_LINES[lineIdx];
    lineIdx++;

    if (line.type === 'prompt') {
      // Typewriter for prompts
      const span = buildLine(line, true);
      body.appendChild(span);
      body.scrollTop = body.scrollHeight;

      typewrite(span, '→ ' + line.text, ANIM.terminalSpeed, () => {
        setTimeout(printNextLine, ANIM.terminalDelay * 0.4);
      });
    } else {
      const span = buildLine(line);
      body.appendChild(span);
      body.scrollTop = body.scrollHeight;
      setTimeout(printNextLine, ANIM.terminalDelay * 0.6);
    }
  }

  // Start after a short delay
  setTimeout(printNextLine, 800);
}

function buildLine(line, empty = false) {
  const map = {
    prompt:  'terminal__line terminal__line--prompt',
    output:  'terminal__line terminal__line--output',
    success: 'terminal__line terminal__line--success',
    warn:    'terminal__line terminal__line--warn',
    error:   'terminal__line terminal__line--error',
    comment: 'terminal__line terminal__line--comment',
  };

  const span = document.createElement('span');
  span.className = map[line.type] || 'terminal__line';
  if (!empty) {
    span.textContent = line.type === 'prompt' ? '→ ' + line.text : line.text;
  }
  return span;
}

function typewrite(el, text, speed, onDone) {
  let i = 0;
  const tick = () => {
    el.textContent = text.slice(0, i++);
    if (i <= text.length) setTimeout(tick, speed);
    else onDone?.();
  };
  tick();
}
