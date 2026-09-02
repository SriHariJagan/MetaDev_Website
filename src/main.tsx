import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { initGA } from '@/seo/analytics';
import '@/styles/tailwind.css';
import '@/styles/index.css';

// Initialize Google Analytics 4 exactly once, before React mounts.
// Injects gtag.js async and prevents duplicate initialization.
initGA();

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
    <StrictMode>
      <AuthProvider>
        <ThemeProvider>
          <MotionConfig reducedMotion="user">
            <App />
          </MotionConfig>
        </ThemeProvider>
      </AuthProvider>
    </StrictMode>,
);
