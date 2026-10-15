import { useSyncExternalStore } from 'react';

export type Theme = 'light' | 'dark';

/**
 * The reader's explicit choice lives in localStorage and is mirrored onto
 * <html data-theme> (an inline script in index.html applies it before first
 * paint). Without a choice the attribute is absent and CSS follows the OS
 * through prefers-color-scheme.
 */
const STORAGE_KEY = 'theme';
const CHANGE_EVENT = 'themechange';
const DARK_QUERY = '(prefers-color-scheme: dark)';

export const THEME_COLORS: Record<Theme, string> = {
  light: '#ffffff',
  dark: '#111110',
};

function getTheme(): Theme {
  const explicit = document.documentElement.dataset.theme;
  if (explicit === 'light' || explicit === 'dark') return explicit;
  return window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';
}

function subscribe(onChange: () => void) {
  const media = window.matchMedia(DARK_QUERY);
  media.addEventListener('change', onChange);
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => {
    media.removeEventListener('change', onChange);
    window.removeEventListener(CHANGE_EVENT, onChange);
  };
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((meta) => meta.setAttribute('content', THEME_COLORS[theme]));

  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked (private mode); the choice then lasts for this page.
  }

  window.dispatchEvent(new Event(CHANGE_EVENT));
}

/** The resolved theme. Prerendered HTML is built as light, so that is the server snapshot. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => 'light');
}
