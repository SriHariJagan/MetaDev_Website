import {
  useCallback,
  useDeferredValue,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Theme } from '@/types';
import { storage } from '@/utils/storage';
import { THEME_STORAGE_KEY, ThemeContext } from './ThemeContext';

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

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  // Apply the theme before the browser paints so switching is instant and
  // never forces hundreds of CSS transitions across the whole document.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
    storage.set(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => (previous === 'dark' ? 'light' : 'dark'));
  }, []);

  // CSS switches instantly via the data-theme attribute. Deferring the value
  // React consumers see lets the browser paint the new theme first, then
  // re-render heavier JS-driven visuals (logo swaps, SVG palettes) at a lower
  // priority — so a theme change never feels blocked.
  const deferredTheme = useDeferredValue(theme);

  const value = useMemo(
    () => ({ theme: deferredTheme, setTheme, toggleTheme }),
    [deferredTheme, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
