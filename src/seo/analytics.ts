/**
 * analytics.ts — Google Analytics 4 integration (G-BBE49ZZTRT)
 * Isolated, maintainable, SPA-aware. No PII is sent.
 */

export const GA_MEASUREMENT_ID = "G-BBE49ZZTRT";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
    __GA_INITIALIZED__?: boolean;
  }
}

/**
 * Safe gtag wrapper — pushes to dataLayer even if analytics script not yet loaded.
 */
export function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Use function form as per GA docs
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments as unknown as unknown);
  // Also call window.gtag if available (defined after script loads)
  if (typeof window.gtag === "function" && window.gtag !== gtag) {
    try {
      (window.gtag as (...a: unknown[]) => void)(...args);
    } catch {
      // ignore
    }
  }
}

/**
 * Initialize GA4 — idempotent. Injects gtag.js script once.
 * Call this once at app startup (e.g., in main.tsx or App.tsx).
 */
export function initGA(): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__GA_INITIALIZED__) return;
  window.__GA_INITIALIZED__ = true;

  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer.push(args);
    } as unknown as (...args: unknown[]) => void;
  }

  // Inject gtag.js script — async, once
  const existing = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}"]`);
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  }

  // Initial config — per GA docs
  gtag("js", new Date() as unknown);
  gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: true,
    anonymize_ip: true,
  });

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] GA4 initialized: ${GA_MEASUREMENT_ID}`);
  }
}

/**
 * Track SPA page view on route change.
 * Uses gtag('config', ...) with page_path + page_title to avoid duplicate automatic hits.
 * Call on every pathname change after initGA.
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === "undefined") return;
  if (!window.__GA_INITIALIZED__) return;
  // Do not send search params that might contain PII — only pathname
  const cleanPath = path.split("?")[0].split("#")[0] || "/";
  try {
    gtag("event", "page_view", {
      page_path: cleanPath,
      page_title: title ?? document.title,
      page_location: `${window.location.origin}${cleanPath}`,
    });
  } catch {
    // ignore analytics errors — never break app
  }
}

/**
 * Generic conversion / CTA event. Ensures no PII in params.
 * Allowed params are intentionally restricted — caller must not pass email/phone/message.
 */
export interface AnalyticsEventParams {
  category?: string;
  label?: string;
  value?: number;
  // Allow only safe custom keys; no email/phone/token
  [key: string]: string | number | boolean | undefined;
}

const SENSITIVE_KEYS = ["email", "phone", "password", "token", "message", "name", "subject", "content"];

function stripSensitive(params: AnalyticsEventParams): AnalyticsEventParams {
  const clean: AnalyticsEventParams = {};
  for (const [k, v] of Object.entries(params)) {
    if (SENSITIVE_KEYS.includes(k.toLowerCase())) continue;
    if (typeof v === "string" && (v.includes("@") || /^\d{10,}$/.test(v.replace(/\s/g, "")))) continue;
    clean[k] = v;
  }
  return clean;
}

export function trackEvent(eventName: string, params: AnalyticsEventParams = {}): void {
  if (typeof window === "undefined") return;
  if (!window.__GA_INITIALIZED__) return;
  if (!eventName) return;
  // Normalize event name: GA4 requires lowercase with underscores, max 40 chars
  const normalized = eventName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "_")
    .slice(0, 40);
  try {
    gtag("event", normalized, stripSensitive(params));
  } catch {
    // ignore
  }
}

// Convenience helpers for meaningful conversions — no PII
export function trackCtaClick(label: string, destination?: string) {
  trackEvent("cta_click", { category: "engagement", label, destination });
}

export function trackContactSubmit() {
  trackEvent("contact_submit", { category: "conversion", label: "contact_form" });
}

export function trackPartnershipSubmit() {
  trackEvent("partnership_inquiry", { category: "conversion", label: "partnership_form" });
}

export function trackNewsletterSubscribe() {
  trackEvent("newsletter_subscribe", { category: "conversion", label: "newsletter" });
}
