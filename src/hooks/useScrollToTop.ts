import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHash } from '@/utils/scrollToHash';

export function useScrollToTop(): void {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Hash navigation (e.g. /careers#open-roles): scroll to the target element.
    if (hash) {
      scrollToHash(hash.slice(1));
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);
}
