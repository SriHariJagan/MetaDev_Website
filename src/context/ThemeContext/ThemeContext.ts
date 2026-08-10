import { createContext } from 'react';
import type { Theme } from '@/types';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const THEME_STORAGE_KEY = 'theme';

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);
