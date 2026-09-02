/**
 * SEO.tsx — reusable head manager for SPA.
 * No external dependency (react-helmet). Uses DOM APIs directly.
 * Handles title, meta description, canonical, OG, Twitter, robots, and JSON-LD.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  getBreadcrumbs,
  getSeoForPath,
} from "./config";

export interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  robots?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noindex?: boolean;
  breadcrumbs?: boolean;
}

// Helpers to upsert meta/link tags

function upsertMetaByName(name: string, content: string) {
  let el = document.querySelector(
    `meta[name="${name}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let el = document.querySelector(
    `meta[property="${property}"]`,
  ) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(
    `link[rel="${rel}"]`,
  ) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function SEO(props: SeoProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // Resolve defaults from config if props not provided
  const fallback = getSeoForPath(pathname);

  const title =
    props.title ??
    fallback?.title ??
    `${SITE_NAME} | Digital Transformation Leaders`;
  const description =
    props.description ??
    fallback?.description ??
    "MetaDev builds secure, scalable digital platforms for businesses and institutions.";
  const canonical =
    props.canonical ?? fallback?.canonical ?? `${SITE_URL}${pathname}`;
  const robots =
    props.robots ??
    fallback?.robots ??
    (props.noindex || fallback?.noindex
      ? "noindex, nofollow"
      : "index, follow");
  const ogType = props.ogType ?? fallback?.ogType ?? "website";
  const ogImage = props.ogImage ?? fallback?.ogImage ?? DEFAULT_OG_IMAGE;
  const ogTitle = props.ogTitle ?? title;
  const ogDescription = props.ogDescription ?? description;
  const ogUrl = props.ogUrl ?? canonical;
  const twitterCard = props.twitterCard ?? "summary_large_image";
  const twitterTitle = props.twitterTitle ?? title;
  const twitterDescription = props.twitterDescription ?? description;
  const twitterImage = props.twitterImage ?? ogImage;

  const wantBreadcrumbs =
    props.breadcrumbs ?? (pathname !== "/" && !robots.includes("noindex"));

  useEffect(() => {
    // Title
    document.title = title;

    // Standard meta
    upsertMetaByName("description", description);
    upsertMetaByName("robots", robots);

    // Canonical
    upsertLink("canonical", canonical);

    // Open Graph
    upsertMetaByProperty("og:title", ogTitle);
    upsertMetaByProperty("og:description", ogDescription);
    upsertMetaByProperty("og:url", ogUrl);
    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:image", ogImage);
    upsertMetaByProperty("og:site_name", SITE_NAME);
    // Image dimensions hint (optional but good)
    upsertMetaByProperty("og:image:width", "1200");
    upsertMetaByProperty("og:image:height", "630");

    // Twitter
    upsertMetaByName("twitter:card", twitterCard);
    upsertMetaByName("twitter:title", twitterTitle);
    upsertMetaByName("twitter:description", twitterDescription);
    upsertMetaByName("twitter:image", twitterImage);

    // JSON-LD: if explicit jsonLd prop provided, use it. Otherwise auto-generate safe defaults.
    if (props.jsonLd) {
      setJsonLd("seo-jsonld", props.jsonLd);
    } else {
      // Auto-generate minimal structured data
      const jsonLdData = buildAutoJsonLd(pathname, {
        title,
        description,
        canonical,
      });
      if (jsonLdData) {
        setJsonLd("seo-jsonld", jsonLdData);
      } else {
        removeJsonLd("seo-jsonld");
      }
    }

    // BreadcrumbList JSON-LD (separate script)
    if (wantBreadcrumbs) {
      const crumbs = getBreadcrumbs(pathname);
      if (crumbs.length > 1) {
        const breadcrumbLd = {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: c.url,
          })),
        };
        setJsonLd("seo-breadcrumb-jsonld", breadcrumbLd);
      } else {
        removeJsonLd("seo-breadcrumb-jsonld");
      }
    } else {
      removeJsonLd("seo-breadcrumb-jsonld");
    }

    // Cleanup not needed — we keep tags for SPA navigation efficiency.
  }, [
    title,
    description,
    canonical,
    robots,
    ogTitle,
    ogDescription,
    ogUrl,
    ogType,
    ogImage,
    twitterCard,
    twitterTitle,
    twitterDescription,
    twitterImage,
    pathname,
    wantBreadcrumbs,
    props.jsonLd,
  ]);

  return null;
}

function buildAutoJsonLd(
  pathname: string,
  seo: { title: string; description: string; canonical: string },
): Record<string, unknown> | Record<string, unknown>[] | null {
  const clean = pathname.replace(/\/$/, "") || "/";

  // Homepage: Organization + WebSite
  if (clean === "/") {
    return [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "MetaDev Innovations Private Limited",
        alternateName: "MetaDev",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-noBg.png`,
        description: seo.description,
        email: "partnership@metadev.in",
        sameAs: [
          "https://www.linkedin.com/company/metadev-innovations-privated-limited/",
          "https://x.com/metadev_pvt_ltd",
          "https://www.youtube.com/channel/UCpowzU8EBeOHiaoMnokOjNg",
          "https://www.facebook.com/people/Metadev-Innovations/61587397852801/",
          "https://www.instagram.com/metadev_pvt_ltd",
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: SITE_URL,
        description: seo.description,
        inLanguage: "en-IN",
        publisher: {
          "@type": "Organization",
          name: SITE_NAME,
          logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-noBg.png` },
        },
      },
    ];
  }

  // Auth / dashboard: no structured data
  if (
    clean.startsWith("/login") ||
    clean.startsWith("/forgot-password") ||
    clean.startsWith("/dashboard")
  ) {
    return null;
  }

  // Generic WebPage for internal pages
  // For products, emit Product schema partially (without fake ratings)
  if (clean.startsWith("/products/")) {
    const productName =
      seo.title.split("—")[0].split("|")[0].trim() ||
      clean.split("/").pop() ||
      "Product";
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: productName,
      description: seo.description,
      brand: { "@type": "Brand", name: SITE_NAME },
      url: seo.canonical,
      image: DEFAULT_OG_IMAGE,
    };
  }

  if (clean.startsWith("/solutions/")) {
    const solName = seo.title.split("|")[0].trim();
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: solName,
      description: seo.description,
      provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
      url: seo.canonical,
      serviceType: solName,
    };
  }

  // Default WebPage
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    inLanguage: "en-IN",
  };
}

/**
 * Helper hook for pages that want to set SEO without rendering <SEO /> explicitly
 * (not used by default — prefer <SEO /> component inside page).
 */
export function useSEO(props: SeoProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const fallback = getSeoForPath(pathname);
  const title = props.title ?? fallback?.title ?? `${SITE_NAME}`;
  const description = props.description ?? fallback?.description ?? "";
  const canonical =
    props.canonical ?? fallback?.canonical ?? `${SITE_URL}${pathname}`;
  const robots = props.robots ?? fallback?.robots ?? "index, follow";
  const ogType = props.ogType ?? fallback?.ogType ?? "website";
  const ogImage = props.ogImage ?? DEFAULT_OG_IMAGE;

  useEffect(() => {
    document.title = title;
    upsertMetaByName("description", description);
    upsertMetaByName("robots", robots);
    upsertLink("canonical", canonical);
    upsertMetaByProperty("og:title", props.ogTitle ?? title);
    upsertMetaByProperty("og:description", props.ogDescription ?? description);
    upsertMetaByProperty("og:url", props.ogUrl ?? canonical);
    upsertMetaByProperty("og:type", ogType);
    upsertMetaByProperty("og:image", props.ogImage ?? ogImage);
    upsertMetaByProperty("og:site_name", SITE_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, canonical, robots, ogType, ogImage, pathname]);
}
