import { Outlet } from 'react-router-dom';
import { Footer, LetsBuildFuture } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { useScrollToTop } from '@/hooks';
import styles from './MainLayout.module.css';

export function MainLayout() {
  useScrollToTop();

  return (
    <div className={styles.layout}>
      <Navbar />
      <main id="main-content" className={styles.main}>
        <Outlet />
      </main>
      <LetsBuildFuture />
      <Footer />
      <ScrollToTop />
    </div>
  );
}
