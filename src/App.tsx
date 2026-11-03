import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';

function App() {
  // Keep the inline first-paint loader up until the routed page has actually
  // rendered content, then fade it away. It is the only loader on the page and
  // has its own hard stop, so a slow network can never hold the site hostage.
  useEffect(() => {
    const root = document.getElementById('root');
    if (!root) return;

    let finished = false;

    const hideLoader = () => {
      if (finished) return;
      finished = true;

      // The route chunk mounts the whole page in one commit, so a plain
      // double-rAF hand-off can still fire before the hero has painted: its
      // entrance starts at opacity 0 and the main thread is still busy with
      // the mount. Wait until the page's primary heading is actually visible
      // (bounded, so a broken animation can never trap the loader).
      const heading = root.querySelector<HTMLElement>('main h1, h1');

      const isHeadingVisible = () => {
        if (!heading || !heading.isConnected) return true;

        const style = window.getComputedStyle(heading);
        return Number(style.opacity) > 0.01 && heading.getBoundingClientRect().height > 0;
      };

      const reveal = () => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => window.__hideMetaDevLoader?.());
        });
      };

      const startedAt = performance.now();
      const MAX_WAIT = 1200;

      const waitForEntrance = () => {
        if (isHeadingVisible() || performance.now() - startedAt >= MAX_WAIT) {
          reveal();
          return;
        }
        requestAnimationFrame(waitForEntrance);
      };

      requestAnimationFrame(waitForEntrance);
    };

    const hasPageContent = () => {
      const main = root.querySelector('main');
      // Routes that render inside MainLayout only count once the routed page
      // itself has mounted, otherwise the layout alone would reveal a blank
      // content area. Standalone routes (login, dashboard error pages) have no
      // <main>, so fall back to the root being populated.
      if (main) return main.childElementCount > 0;
      return root.childElementCount > 0;
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
    <Suspense fallback={null}>
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
