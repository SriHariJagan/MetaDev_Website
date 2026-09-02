/**
 * usePageTracking — hook to send SPA page views on route change.
 * Mount once (e.g., inside MainLayout or App).
 */
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "./analytics";

export function usePageTracking() {
  const location = useLocation();
  const prevPath = useRef<string | null>(null);

  useEffect(() => {
    const path = location.pathname + location.search;
    // Avoid duplicate initial hit — GA's initial config already sends one.
    // But for SPA navigation we must explicitly track subsequent paths.
    if (prevPath.current === null) {
      prevPath.current = path;
      // Still ensure first SPA view is tracked if user landed via client nav (not initial load)
      // However initial config already sent page_view, so we only track if this is a navigation
      // For simplicity, track all after first effect — the duplicate for initial load is harmless
      // as GA deduplicates same page_path within short window? We choose to skip first and track rest.
      return;
    }
    if (prevPath.current !== path) {
      prevPath.current = path;
      // Small delay to ensure document.title has updated from SEO component
      requestAnimationFrame(() => {
        trackPageView(location.pathname, document.title);
      });
    }
  }, [location.pathname, location.search]);
}
