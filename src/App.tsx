import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { PageLoader } from '@/components/ui/PageLoader';
import { router } from '@/router';

function App() {
  // Keep the initial loader up until the routed page has actually rendered
  // content, then fade it away. The inline loader has its own 1.45s hard stop,
  // so a slow network can never hold the site hostage.
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    let finished = false;

    const hideLoader = () => {
      if (finished) return;
      finished = true;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => window.__hideMetaDevLoader?.());
      });
    };

    const hasPageContent = () => {
      const main = root.querySelector('main');
      return Boolean(main && main.childElementCount > 0);
    };

    if (hasPageContent()) {
      hideLoader();
      return;
    }

    const observer = new MutationObserver(() => {
      if (!hasPageContent()) return;
      observer.disconnect();
      hideLoader();
    });

    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
