/**
 * THEME.JS — Light / dark mode management
 */

import { qs } from '../utils.js';

const KEY   = 'ep-theme';
const DARK  = 'dark';
const LIGHT = 'light';

const getSystem = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;

const getSaved  = () => localStorage.getItem(KEY);
const save      = (t) => localStorage.setItem(KEY, t);

function apply(theme) {
  if (theme === LIGHT) {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function syncButton(theme) {
  const btn = qs('#theme-toggle');
  if (!btn) return;
  const icon = btn.querySelector('i');
  if (icon) icon.className = theme === DARK ? 'fas fa-sun' : 'fas fa-moon';
  btn.setAttribute('title', theme === DARK ? 'Light mode' : 'Dark mode');
}

export function getTheme() {
  return document.documentElement.getAttribute('data-theme') === 'light' ? LIGHT : DARK;
}

export function setTheme(t) {
  apply(t);
  save(t);
  syncButton(t);
}

export function toggleTheme() {
  setTheme(getTheme() === DARK ? LIGHT : DARK);
}

export function initTheme() {
  const initial = getSaved() ?? getSystem();
  apply(initial);

  const btn = qs('#theme-toggle');
  syncButton(initial);
  btn?.addEventListener('click', toggleTheme);

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!getSaved()) setTheme(e.matches ? DARK : LIGHT);
  });
}
