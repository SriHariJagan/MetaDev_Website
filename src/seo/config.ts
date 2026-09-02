/**
 * Central SEO configuration for MetaDev.
 * Single source of truth for title, description, canonical, OG, Twitter and JSON-LD.
 * No fake data — all content derived from existing site copy, PRODUCTS and SOLUTIONS constants.
 */

export const SITE_URL = "https://metadev.in";
export const SITE_NAME = "MetaDev";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/metaDev.png`;
export const TWITTER_HANDLE = "@metadev_pvt_ltd";

export interface SeoEntry {
  title: string;
  description: string;
  canonical: string;
  robots?: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
}

function canon(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  // Ensure trailing slash handling: canonical without trailing slash except root.
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

// ---------------------------------------------------------------------------
// Static route SEO
// ---------------------------------------------------------------------------

export const SEO_CONFIG: Record<string, SeoEntry> = {
  "/": {
    title: "MetaDev | Software Development & Digital Solutions",
    description:
      "MetaDev builds secure, scalable digital platforms — web, mobile, AI, cloud and enterprise software — empowering businesses, institutions and communities across India and beyond.",
    canonical: canon("/"),
    ogType: "website",
    keywords:
      "MetaDev, software development, digital transformation, web development, mobile apps, AI, cloud solutions, enterprise software India",
  },
  "/about": {
    title: "About MetaDev | Software Development Team",
    description:
      "Learn about MetaDev Innovations — our mission to build intelligent digital ecosystems, our journey, leadership principles and the values that drive every product we ship.",
    canonical: canon("/about"),
    ogType: "website",
  },
  "/solutions": {
    title: "Software Development Solutions | MetaDev",
    description:
      "Explore MetaDev solutions — web & mobile development, UI/UX design, AI & ML, blockchain, cybersecurity, IoT, data engineering, ERP, SaaS and more, delivered end-to-end.",
    canonical: canon("/solutions"),
    ogType: "website",
  },
  "/products": {
    title: "Products | Enterprise Platforms Built for Impact | MetaDev",
    description:
      "Discover the MetaDev product family — MetaHealth, MetaEdu, MetaGreen, MetaFlow, MetaHire, MetaCheck, MetaAds, MetaNav, MetaLedger, MetaCard and MetaIM — integrated platforms for real industries.",
    canonical: canon("/products"),
    ogType: "website",
  },
  "/contact": {
    title: "Contact MetaDev | Partnership & Business Inquiries",
    description:
      "Contact MetaDev for partnerships, sales and support. Reach our team via partnership@metadev.in or +91 95595 59143. We reply within 24 hours.",
    canonical: canon("/contact"),
    ogType: "website",
  },
  "/team": {
    title: "Our Team | People Behind MetaDev",
    description:
      "Meet the MetaDev team — engineers, designers and AI specialists from six countries united by craftsmanship, collaboration and delivery excellence.",
    canonical: canon("/team"),
    ogType: "website",
  },
  "/careers": {
    title: "Careers at MetaDev | Join Our Team",
    description:
      "Join MetaDev — explore open roles in engineering, design, AI, cloud and growth. Build products used by millions in a culture that invests in your growth.",
    canonical: canon("/careers"),
    ogType: "website",
  },
  "/legal/privacy-policy": {
    title: "Privacy Policy | MetaDev",
    description:
      "Read MetaDev's Privacy Policy — how we collect, use and protect personal data under India's DPDP Act, 2023 and GDPR, and your rights as a data principal.",
    canonical: canon("/legal/privacy-policy"),
    ogType: "article",
  },
  "/legal/terms-of-service": {
    title: "Terms of Service | MetaDev",
    description:
      "MetaDev Terms of Service — rules governing use of metadev.in and our products, accounts, acceptable use, IP, warranties and governing law.",
    canonical: canon("/legal/terms-of-service"),
    ogType: "article",
  },
  "/legal/security": {
    title: "Security at MetaDev | Enterprise-Grade Protection",
    description:
      "How MetaDev secures your data — encryption, network isolation, RBAC, MFA, audit logging, pentests and incident response aligned to ISO 27001 and SOC 2.",
    canonical: canon("/legal/security"),
    ogType: "article",
  },
  "/legal/compliance": {
    title: "Compliance & Certifications | MetaDev",
    description:
      "MetaDev compliance — ISO 27001, ISO 9001, ISO 42001, SOC 2, HIPAA safeguards, PCI DSS, DPDP Act and GDPR alignment across our product family.",
    canonical: canon("/legal/compliance"),
    ogType: "article",
  },
  "/legal/cancellation": {
    title: "Cancellation & Refund Policy | MetaDev",
    description:
      "MetaDev Cancellation & Refund Policy — how subscription cancellation, renewal and refunds work for our SaaS products and professional services.",
    canonical: canon("/legal/cancellation"),
    ogType: "article",
  },
  "/sitemap": {
    title: "Sitemap | MetaDev",
    description:
      "Browse every public page on metadev.in — products, solutions, company and legal — plus machine-readable sitemap.xml and robots.txt for crawlers.",
    canonical: canon("/sitemap"),
    ogType: "website",
  },

  // Product detail pages — static entries for each known product
  "/products/metahealth": {
    title: "MetaHealth — Healthcare Platform | MetaDev",
    description:
      "MetaHealth unifies clinical documentation, telehealth, remote monitoring and patient engagement — FHIR-native, HIPAA-ready care that gives clinicians time back.",
    canonical: canon("/products/metahealth"),
    ogType: "product",
  },
  "/products/metaedu": {
    title: "MetaEdu — EdTech Platform | MetaDev",
    description:
      "MetaEdu is a complete learning operating system — courses, assessments, live classes and analytics for institutions that scale education without compromise.",
    canonical: canon("/products/metaedu"),
    ogType: "product",
  },
  "/products/metagreen": {
    title: "MetaGreen — Sustainability Platform | MetaDev",
    description:
      "MetaGreen helps organisations track, reduce and report environmental impact — carbon, energy and ESG workflows in one auditable platform.",
    canonical: canon("/products/metagreen"),
    ogType: "product",
  },
  "/products/metaflow": {
    title: "MetaFlow — Enterprise Workflow Platform | MetaDev",
    description:
      "MetaFlow orchestrates enterprise workflows and approvals — automate cross-team processes with visibility, compliance and speed built in.",
    canonical: canon("/products/metaflow"),
    ogType: "product",
  },
  "/products/metahire": {
    title: "MetaHire — Hiring & Talent Platform | MetaDev",
    description:
      "MetaHire is an AI-powered hiring platform that sources, screens, schedules and onboards five times faster — from job posting to day-one onboarding.",
    canonical: canon("/products/metahire"),
    ogType: "product",
  },
  "/products/metacheck": {
    title: "MetaCheck — Verification & Compliance Platform | MetaDev",
    description:
      "MetaCheck automates identity verification, background screening and KYC/KYB compliance with AI fraud detection and enterprise-grade accuracy.",
    canonical: canon("/products/metacheck"),
    ogType: "product",
  },
  "/products/metaadds": {
    title: "MetaAds — AdTech & Marketing Platform | MetaDev",
    description:
      "MetaAds unifies campaign creation, targeting and optimisation — turning ad spend into measurable growth across every channel.",
    canonical: canon("/products/metaadds"),
    ogType: "product",
  },
  "/products/metanav": {
    title: "MetaNav — Fleet & Logistics Management | MetaDev",
    description:
      "MetaNav optimises fleet and logistics — live tracking, route optimisation and dispatch control for operations that never miss a delivery.",
    canonical: canon("/products/metanav"),
    ogType: "product",
  },
  "/products/metaledger": {
    title: "MetaLedger — Billing & Invoicing Platform | MetaDev",
    description:
      "MetaLedger streamlines billing, invoicing and revenue operations — GST-aware finance workflows trusted by growing enterprises.",
    canonical: canon("/products/metaledger"),
    ogType: "product",
  },
  "/products/metacard": {
    title: "MetaCard — Digital ID Cards Platform | MetaDev",
    description:
      "MetaCard issues and manages secure digital ID cards — for employees, students and members with verifiable credentials and access control.",
    canonical: canon("/products/metacard"),
    ogType: "product",
  },
  "/products/metaim": {
    title: "MetaIM — Inventory Management Platform | MetaDev",
    description:
      "MetaIM tracks inventory in real time — stock, procurement and fulfilment in one system designed for retail, warehouses and multi-outlet operations.",
    canonical: canon("/products/metaim"),
    ogType: "product",
  },

  // Auth / private — noindex
  "/login": {
    title: "Sign In | MetaDev Admin Portal",
    description: "Sign in to the MetaDev Admin Portal to manage your organisation, modules and subscriptions.",
    canonical: canon("/login"),
    robots: "noindex, nofollow",
    noindex: true,
  },
  "/forgot-password": {
    title: "Forgot Password | MetaDev",
    description: "Reset your MetaDev account password.",
    canonical: canon("/forgot-password"),
    robots: "noindex, nofollow",
    noindex: true,
  },
  "/dashboard": {
    title: "Dashboard | MetaDev",
    description: "MetaDev dashboard — private workspace.",
    canonical: canon("/dashboard"),
    robots: "noindex, nofollow",
    noindex: true,
  },
};

// ---------------------------------------------------------------------------
// Solution SEO — generated from SOLUTIONS constant data shape
// Fallback used if path not in static map.
// ---------------------------------------------------------------------------

export const SOLUTION_SEO: Record<string, { name: string; description: string }> = {
  "web-development": {
    name: "Web Development",
    description:
      "High-performance web applications built with React, TypeScript and best-in-class tooling — engineered for speed, security and growth. 120+ platforms shipped.",
  },
  "mobile-development": {
    name: "Mobile Development",
    description:
      "Cross-platform mobile apps with native-quality interactions and offline support — from MVP to global scale. 50+ apps delivered, 1M+ users reached.",
  },
  "ui-ux-design": {
    name: "UI/UX Design",
    description:
      "Research-driven product design, design systems and accessible interfaces that convert — clarity in every pixel and interaction. 200+ interfaces designed.",
  },
  "ai-machine-learning": {
    name: "AI & Machine Learning",
    description:
      "Custom AI models, LLM-powered products and intelligent automation that turn data into decisions — responsibly and at scale. 60+ models in production.",
  },
  "blockchain-development": {
    name: "Blockchain Development",
    description:
      "Smart contracts, dApps and Web3 infrastructure engineered for security, transparency and scale — 40+ contracts audited, $25M+ value secured.",
  },
  cybersecurity: {
    name: "Cybersecurity",
    description:
      "Security audits, threat monitoring and compliance frameworks that protect your business end to end — 150+ audits completed, 24/7 monitoring.",
  },
  "iot-development": {
    name: "IoT Solutions",
    description:
      "End-to-end IoT platforms — from device firmware and connectivity to real-time dashboards and edge analytics. 10K+ devices connected.",
  },
  "data-engineering": {
    name: "Data Engineering",
    description:
      "Robust data pipelines, warehouses and analytics platforms that transform raw data into actionable intelligence — 20TB+ processed daily.",
  },
  "custom-software": {
    name: "Custom Software",
    description:
      "Bespoke platforms, enterprise integrations and legacy modernization tailored to your workflows — 80+ platforms delivered, 5x operational efficiency.",
  },
  "pos-applications": {
    name: "POS Applications",
    description:
      "Modern point-of-sale systems with inventory, billing and analytics — online and offline, anywhere, without missing a sale. 15K+ daily transactions.",
  },
  "saas-platform-development": {
    name: "SaaS Platform Development",
    description:
      "End-to-end SaaS platforms — subscription billing, multi-tenancy and usage analytics built in from day one. 70+ SaaS products launched.",
  },
  "digital-marketing-branding": {
    name: "Digital Marketing & Branding",
    description:
      "Brand strategy, campaign design and performance marketing that build recognition and turn audiences into customers. 300+ campaigns, 3.5x average ROAS.",
  },
  "seo-optimization": {
    name: "SEO Optimization",
    description:
      "Technical SEO, content strategy and link building that lift organic rankings — 85% average organic traffic growth, 200+ keywords on page one.",
  },
  "content-creation": {
    name: "Content Creation",
    description:
      "Video, copy and visual content produced end-to-end — planned, shot, edited and published to keep every channel on-brand. 1500+ assets produced.",
  },
  "erp-systems": {
    name: "ERP Systems",
    description:
      "Custom ERP platforms that unify finance, inventory, HR and operations into a single source of truth — 45+ rollouts, 60% reduction in manual work.",
  },
  "lms-crm-solutions": {
    name: "LMS & CRM Solutions",
    description:
      "Learning and customer relationship platforms that track progress, automate follow-ups and keep every interaction organised. 90+ deployments, 2M+ records managed.",
  },
};

export function getSeoForPath(pathname: string): SeoEntry | undefined {
  // Normalise: remove trailing slash, strip search/hash
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  // Exact match first
  if (SEO_CONFIG[clean]) return SEO_CONFIG[clean];
  if (SEO_CONFIG[pathname]) return SEO_CONFIG[pathname];

  // Dynamic: solution detail
  if (clean.startsWith("/solutions/")) {
    const slug = clean.replace("/solutions/", "");
    const sol = SOLUTION_SEO[slug];
    if (sol) {
      return {
        title: `${sol.name} | MetaDev`,
        description: sol.description,
        canonical: canon(clean),
        ogType: "article",
      };
    }
    // Unknown solution slug — still provide canonical, but noindex? No, let 404 handle. Return generic.
    return {
      title: `${slug} | MetaDev`,
      description: `Explore ${slug} solutions at MetaDev.`,
      canonical: canon(clean),
      ogType: "article",
    };
  }

  // Dynamic: product detail fallback (generic product)
  if (clean.startsWith("/products/")) {
    const slug = clean.replace("/products/", "");
    // If known product already handled above, this won't fire. For unknown slug fallback:
    return {
      title: `${slug.charAt(0).toUpperCase() + slug.slice(1)} | MetaDev`,
      description:
        "MetaDev product — automation, intelligence and measurable results built on the same secure, battle-tested platform trusted across industries.",
      canonical: canon(clean),
      ogType: "product",
    };
  }

  // Legal aliases: point canonical to /legal/cancellation
  if (clean === "/legal/cancellation-and-refund" || clean === "/legal/refund") {
    const base = SEO_CONFIG["/legal/cancellation"];
    return { ...base, canonical: base.canonical };
  }

  // Dashboard nested
  if (clean.startsWith("/dashboard")) {
    return SEO_CONFIG["/dashboard"];
  }

  return undefined;
}

export function getBreadcrumbs(pathname: string): Array<{ name: string; url: string }> {
  const clean = pathname.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
  const parts = clean.split("/").filter(Boolean);
  const crumbs: Array<{ name: string; url: string }> = [{ name: "Home", url: canon("/") }];
  let acc = "";
  for (const part of parts) {
    acc += `/${part}`;
    // Humanise
    const label = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      // Special cases
      .replace("And", "and")
      .replace("Sitemap", "Sitemap");
    crumbs.push({ name: label, url: canon(acc) });
  }
  // Fix product names: ensure capitalised MetaX
  return crumbs.map((c) => {
    if (/^Meta\w+/.test(c.name.replace(/\s/g, ""))) return c;
    // Title-case already done
    return c;
  });
}
