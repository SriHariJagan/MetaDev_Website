import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { Theme } from '@/types';
import { storage } from '@/utils/storage';
import { THEME_STORAGE_KEY, ThemeContext } from './ThemeContext';

const TRANSITION_DURATION = 150;

function getInitialTheme(): Theme {
  const stored = storage.get(THEME_STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }

  const attribute = document.documentElement.getAttribute('data-theme');
  if (attribute === 'dark' || attribute === 'light') {
    return attribute;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function enableThemeTransition(): void {
  const root = document.documentElement;
  root.classList.add('theme-transition');
  window.setTimeout(() => root.classList.remove('theme-transition'), TRANSITION_DURATION);
}

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    enableThemeTransition();
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    storage.set(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
