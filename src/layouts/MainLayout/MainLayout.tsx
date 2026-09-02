import { Outlet } from 'react-router-dom';
import { Footer, LetsBuildFuture } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { SecurityCompliance } from '@/sections/SecurityCompliance';
import { useScrollToTop } from '@/hooks';
import { usePageTracking } from '@/seo/usePageTracking';
import { SEO } from '@/seo/SEO';
import styles from './MainLayout.module.css';

export function MainLayout() {
  useScrollToTop();
  usePageTracking();

  return (
    <div className={styles.layout}>
      {/* Fallback SEO for routes that don't render their own <SEO /> — ensures title/canonical/OG always set */}
      <SEO />
      <a href="#main-content" className="skip-link" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}>
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <SecurityCompliance />
      <LetsBuildFuture />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
