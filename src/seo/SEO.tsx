/**
 * SEO.tsx — reusable head manager for SPA.
 * No external dependency (react-helmet). Uses DOM APIs directly.
 * Handles title, meta description, canonical, OG, Twitter, robots, and JSON-LD.
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  DEFAULT_OG_IMAGE,
  PRODUCT_PAGES,
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
    } else if (robots.includes("noindex")) {
      // Never advertise structured data for private or error pages.
      removeJsonLd("seo-jsonld");
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

  const organizationRef = { "@id": `${SITE_URL}/#organization` };
  const websiteRef = { "@id": `${SITE_URL}/#website` };
  const pageImage = { "@type": "ImageObject", url: DEFAULT_OG_IMAGE };

  // Homepage: WebPage referencing the static Organization/WebSite nodes in
  // index.html. Keeping one canonical entity avoids contradictory duplicates.
  if (clean === "/") {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: seo.canonical,
      name: seo.title,
      description: seo.description,
      isPartOf: websiteRef,
      about: organizationRef,
      primaryImageOfPage: pageImage,
      inLanguage: "en-IN",
    };
  }

  // Auth / dashboard: no structured data
  if (
    clean.startsWith("/login") ||
    clean.startsWith("/forgot-password") ||
    clean.startsWith("/dashboard")
  ) {
    return null;
  }

  // Products index: CollectionPage + ItemList of every product page. This is
  // the strongest explicit signal that these URLs are the site's key sections.
  if (clean === "/products") {
    const itemListId = `${SITE_URL}/products#itemlist`;
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/products#webpage`,
          url: seo.canonical,
          name: seo.title,
          description: seo.description,
          isPartOf: websiteRef,
          about: organizationRef,
          mainEntity: { "@id": itemListId },
          primaryImageOfPage: pageImage,
          inLanguage: "en-IN",
        },
        {
          "@type": "ItemList",
          "@id": itemListId,
          name: "MetaDev product platforms",
          numberOfItems: Object.keys(PRODUCT_PAGES).length,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          itemListElement: Object.values(PRODUCT_PAGES).map(
            (product, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: product.name,
              url: product.url,
              item: {
                "@type": "SoftwareApplication",
                "@id": `${product.url}#software`,
                name: product.name,
                ...(product.alternateName
                  ? { alternateName: product.alternateName }
                  : {}),
                applicationCategory: "BusinessApplication",
                applicationSubCategory: product.subtitle,
                operatingSystem: "Web",
                url: product.url,
                description: product.description,
                publisher: organizationRef,
              },
            }),
          ),
        },
      ],
    };
  }

  // Individual product page: SoftwareApplication + WebPage.
  if (clean.startsWith("/products/")) {
    const slug = clean.replace("/products/", "");
    const product = PRODUCT_PAGES[slug];

    if (product) {
      const appId = `${product.url}#software`;
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "SoftwareApplication",
            "@id": appId,
            name: product.name,
            ...(product.alternateName
              ? { alternateName: product.alternateName }
              : {}),
            applicationCategory: "BusinessApplication",
            applicationSubCategory: product.subtitle,
            operatingSystem: "Web",
            url: product.url,
            description: product.description,
            image: DEFAULT_OG_IMAGE,
            brand: { "@type": "Brand", name: product.name },
            publisher: organizationRef,
          },
          {
            "@type": "WebPage",
            "@id": `${product.url}#webpage`,
            url: product.url,
            name: seo.title,
            description: seo.description,
            isPartOf: websiteRef,
            about: { "@id": appId },
            primaryImageOfPage: pageImage,
            inLanguage: "en-IN",
          },
        ],
      };
    }

    // Unknown product slug — keep a minimal, truthful node until the 404 SEO
    // (noindex) takes over.
    const fallbackName =
      seo.title.split("—")[0].split("|")[0].trim() || slug || "Product";
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: seo.title,
      description: seo.description,
      url: seo.canonical,
      isPartOf: websiteRef,
      about: { "@type": "Brand", name: fallbackName },
      inLanguage: "en-IN",
    };
  }

  if (clean.startsWith("/solutions/")) {
    const solName = seo.title.split("|")[0].trim();
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: solName,
      description: seo.description,
      provider: organizationRef,
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
    isPartOf: websiteRef,
    about: organizationRef,
    primaryImageOfPage: pageImage,
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
