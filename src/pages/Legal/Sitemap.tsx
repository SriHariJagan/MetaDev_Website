import { Link } from "react-router-dom";
import { Map, Building2, Package, Layers, Users, Briefcase, Mail, ShieldCheck, FileText, Award, Network } from "lucide-react";
import { LegalLayout } from "./LegalLayout";
import { SEO } from '@/seo/SEO';
import styles from './Legal.module.css';

const GROUPS = [
  {
    title: "Company",
    desc: "Who we are and why we exist.",
    icon: Building2,
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Team", to: "/team" },
      { label: "Careers", to: "/careers" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Solutions",
    desc: "Outcomes for health, education, gov-tech, and enterprise.",
    icon: Layers,
    links: [
      { label: "All Solutions", to: "/solutions" },
      { label: "Digital Health", to: "/solutions/digital-health" },
      { label: "Education", to: "/solutions/education" },
      { label: "Government", to: "/solutions/government" },
      { label: "Enterprise", to: "/solutions/enterprise" },
      { label: "FinTech", to: "/solutions/fintech" },
      { label: "AI & Automation", to: "/solutions/ai-automation" },
    ],
  },
  {
    title: "Products",
    desc: "The MetaDev product family.",
    icon: Package,
    links: [
      { label: "All Products", to: "/products" },
      { label: "MetaHealth — Care Platform", to: "/products/metahealth" },
      { label: "MetaEdu — Learning OS", to: "/products/metaedu" },
      { label: "MetaGreen — Sustainability", to: "/products/metagreen" },
      { label: "MetaFlow — Workflow", to: "/products/metaflow" },
      { label: "MetaHire — Talent", to: "/products/metahire" },
      { label: "MetaCheck — Verification", to: "/products/metacheck" },
      { label: "MetaAds — Growth", to: "/products/metaadds" },
      { label: "MetaNav — Navigation", to: "/products/metanav" },
      { label: "MetaLedger — Finance", to: "/products/metaledger" },
      { label: "MetaCard — Payments", to: "/products/metacard" },
      { label: "MetaIM — Messaging", to: "/products/metaim" },
    ],
  },
  {
    title: "Resources",
    desc: "People, stories, and ways to collaborate.",
    icon: Users,
    links: [
      { label: "Careers — Open roles", to: "/careers" },
      { label: "Our Team", to: "/team" },
      { label: "Contact — Sales & Support", to: "/contact" },
    ],
  },
  {
    title: "Legal & Trust",
    desc: "Policies and assurance.",
    icon: ShieldCheck,
    links: [
      { label: "Privacy Policy", to: "/legal/privacy-policy" },
      { label: "Terms of Service", to: "/legal/terms-of-service" },
      { label: "Cancellation & Refunds", to: "/legal/cancellation" },
      { label: "Security", to: "/legal/security" },
      { label: "Compliance", to: "/legal/compliance" },
      { label: "Sitemap (this page)", to: "/sitemap" },
    ],
  },
  {
    title: "Platform",
    desc: "Account and product workspaces.",
    icon: Network,
    links: [
      { label: "Sign in", to: "/login" },
      { label: "Forgot password", to: "/forgot-password" },
      { label: "Dashboard", to: "/dashboard" },
    ],
  },
];

export function SitemapPage() {
  return (
    <>
      <SEO />
      <LegalLayout
      icon={Map}
      eyebrow="Navigate — Sitemap"
      title="Sitemap"
      description="Every public page on metadev.in — products, solutions, company, and legal — in one place. For crawlers, see sitemap.xml and robots.txt."
      updatedAt="28 August 2026"
      toc={[
        { id: "explore", label: "Explore" },
        { id: "for-crawlers", label: "For crawlers & SEO" },
        { id: "need-help", label: "Need help?" },
      ]}
    >
      <h2 id="explore">Explore</h2>
      <div className={styles.sitemapGrid}>
        {GROUPS.map((g) => (
          <div key={g.title} className={styles.sitemapCard}>
            <div className={styles.sitemapCardHead}>
              <span className={styles.sitemapIcon}><g.icon size={18} /></span>
              <h3 className={styles.sitemapCardTitle}>{g.title}</h3>
            </div>
            <p className={styles.sitemapCardDesc}>{g.desc}</p>
            <ul className={styles.sitemapLinks}>
              {g.links.map((l) => (
                <li key={l.to + l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2 id="for-crawlers">For crawlers & SEO</h2>
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><FileText size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Machine-readable sitemaps</p>
          <p className={styles.calloutText}><code>/sitemap.xml</code> — canonical URL list &nbsp;·&nbsp; <code>/robots.txt</code> — crawl rules and sitemap pointer. Both are auto-generated on deploy.</p>
        </div>
      </div>
      <p>We follow semantic HTML, canonical URLs, and structured data (Organization, Product, BreadcrumbList) to help search engines and assistive tech understand our content. If you spot a broken link, please report it to <a href="mailto:support@metadev.in">support@metadev.in</a>.</p>

      <h2 id="need-help">Need help finding something?</h2>
      <p>Try search (⌘K) or write to us:</p>
      <ul>
        <li><Mail size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /><a href="mailto:support@metadev.in">support@metadev.in</a> — general & support</li>
        <li><Briefcase size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /><a href="mailto:partnership@metadev.in">partnership@metadev.in</a> — partnerships & sales</li>
        <li><Award size={14} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} /><a href="mailto:info@metadev.in">info@metadev.in</a> — legal & compliance</li>
      </ul>
      <p className={styles.sitemapNote}>Last audited 28 August 2026. New products and solutions are added here on launch.</p>
    </LegalLayout>
    </>
  );
}
