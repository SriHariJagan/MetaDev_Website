// Footer.tsx
import { useRef, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  ShieldCheck,
  Headset,
  Globe2,
  Link2,
  AtSign,
  Video,
  Camera,
  MessageCircle,
  BadgeCheck,
  Lock,
  FileCheck2,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import styles from "./Footer.module.css";

/* ==================================================================== */
/* Shared animation variants                                            */
/* ==================================================================== */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ==================================================================== */
/* Function 1: LetsBuildFuture — the CTA banner above the footer        */
/* ==================================================================== */

type FeatureAccent = "blue" | "green" | "violet" | "orange";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: FeatureAccent;
}

const FEATURES: Feature[] = [
  {
    icon: Rocket,
    title: "Innovation First",
    description: "AI-powered solutions built for tomorrow.",
    accent: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Enterprise Ready",
    description: "Secure, scalable & compliant by design.",
    accent: "green",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    description: "Round-the-clock support from our expert team.",
    accent: "violet",
  },
  {
    icon: Globe2,
    title: "Global Impact",
    description: "Delivering solutions that create real impact.",
    accent: "orange",
  },
];

export function LetsBuildFuture() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  return (
    <section className={styles.ctaSection}>
      <motion.div
        className={styles.ctaCard}
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* <div className={styles.arcGlow} aria-hidden="true" /> */}
        <div className={styles.stars}></div>
        

        <div className={styles.ctaTop}>
          <div className={styles.ctaLeft}>
            <motion.h2 className={styles.ctaTitle} variants={itemVariants}>
              Let&rsquo;s Build the Next
              <br />
              Digital Ecosystem{" "}
              <span className={styles.ctaTitleAccent}>Together</span>
            </motion.h2>

            <motion.p className={styles.ctaSubtitle} variants={itemVariants}>
              Have an idea? Let&rsquo;s turn it into a powerful digital platform
              that drives impact and creates value.
            </motion.p>
          </div>

          <motion.ul className={styles.ctaFeatures} variants={containerVariants}>
            {FEATURES.map(({ icon: Icon, title, description, accent }) => (
              <motion.li
                key={title}
                className={styles.ctaFeature}
                variants={itemVariants}
              >
                <span
                  className={`${styles.ctaFeatureIcon} ${styles[`feature-${accent}`]}`}
                >
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h3 className={styles.ctaFeatureTitle}>{title}</h3>
                <p className={styles.ctaFeatureDesc}>{description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div className={styles.ctaActions} variants={itemVariants}>
          <Button
            to="/contact?intent=sales"
            variant="gradient"
            size="md"
            className={styles.primaryBtn}
          >
            Talk to Sales
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
          <Link to="/solutions" className={styles.tertiaryLink}>
            Explore Solutions
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ==================================================================== */
/* Function 2: Footer — logo/social, link columns, newsletter, bottom  */
/* ==================================================================== */

type SocialAccent = "linkedin" | "x" | "youtube" | "github" | "instagram";

const SOCIAL_LINKS: { icon: LucideIcon; label: string; href: string; accent: SocialAccent }[] = [
  { icon: Link2, label: "LinkedIn", href: "https://linkedin.com", accent: "linkedin" },
  { icon: AtSign, label: "X / Twitter", href: "https://x.com", accent: "x" },
  { icon: Video, label: "YouTube", href: "https://youtube.com", accent: "youtube" },
  { icon: MessageCircle, label: "GitHub", href: "https://github.com", accent: "github" },
  { icon: Camera, label: "Instagram", href: "https://instagram.com", accent: "instagram" },
];

interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Products",
    links: [
      { label: "MetaHealth", href: "/products/metahealth" },
      { label: "Abhyasa", href: "/products/abhyasa" },
      { label: "Metaflow", href: "/products/metaflow" },
      { label: "Developer Platform", href: "/products/developer-platform" },
      { label: "MetaAI Studio", href: "/products/metaai-studio" },
      { label: "Communication Suite", href: "/products/communication-suite" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Digital Health", href: "/solutions/digital-health" },
      { label: "Education", href: "/solutions/education" },
      { label: "Government", href: "/solutions/government" },
      { label: "Enterprise", href: "/solutions/enterprise" },
      { label: "FinTech", href: "/solutions/fintech" },
      { label: "AI Automation", href: "/solutions/ai-automation" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { label: "Healthcare", href: "/industries/healthcare" },
      { label: "Education", href: "/industries/education" },
      { label: "Government", href: "/industries/government" },
      { label: "Retail", href: "/industries/retail" },
      { label: "Manufacturing", href: "/industries/manufacturing" },
      { label: "NGO & NPO", href: "/industries/ngo-npo" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Documentation", href: "/resources/documentation" },
      { label: "Blogs", href: "/resources/blogs" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "Whitepapers", href: "/resources/whitepapers" },
      { label: "Webinars", href: "/resources/webinars" },
      { label: "Help Center", href: "/resources/help-center" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "API Reference", href: "/developers/api-reference" },
      { label: "SDKs & Libraries", href: "/developers/sdks" },
      { label: "Changelog", href: "/developers/changelog" },
      { label: "Status", href: "/developers/status" },
      { label: "Community", href: "/developers/community" },
      { label: "Developer Console", href: "/developers/console" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/company/about" },
      { label: "Careers", href: "/company/careers" },
      { label: "Partners", href: "/company/partners" },
      { label: "Newsroom", href: "/company/newsroom" },
      { label: "Investors", href: "/company/investors" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Service", href: "/legal/terms-of-service" },
  { label: "Security", href: "/legal/security" },
  { label: "Compliance", href: "/legal/compliance" },
  { label: "Sitemap", href: "/sitemap" },
];

type BadgeAccent = "iso" | "soc2" | "hipaa" | "gdpr";

const COMPLIANCE_BADGES: { icon: LucideIcon; label: string; accent: BadgeAccent }[] = [
  { icon: ShieldCheck, label: "ISO 27001", accent: "iso" },
  { icon: BadgeCheck, label: "SOC 2", accent: "soc2" },
  { icon: FileCheck2, label: "HIPAA", accent: "hipaa" },
  { icon: Lock, label: "GDPR", accent: "gdpr" },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [email, setEmail] = useState("");

  const handleSubscribe = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.mainInner}>
          <div className={styles.brandCol}>
            <Link to="/" className={styles.brand}>
              <img
                src="/logo-noBg.png"
                alt="metadev"
                className={`${styles.brandLogo} ${styles.brandLogoDark}`}
                draggable={false}
              />
              <img
                src="/logo-lightmode.png"
                alt="metadev"
                className={`${styles.brandLogo} ${styles.brandLogoLight}`}
                draggable={false}
              />
            </Link>
            <p className={styles.tagline}>
              Building intelligent digital ecosystems that empower businesses,
              institutions and communities for a better tomorrow.
            </p>
            <ul className={styles.socialList}>
              {SOCIAL_LINKS.map(({ icon: Icon, label, href, accent }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className={`${styles.socialLink} ${styles[`social-${accent}`]}`}
                  >
                    <Icon size={15} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className={styles.linkCol}>
              <h3 className={styles.colHeading}>{column.heading}</h3>
              <ul className={styles.linkList}>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className={styles.link}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.newsletterCol}>
            <div className={styles.newsletterCard}>
              <h3 className={styles.newsletterHeading}>Stay Updated</h3>
              <p className={styles.newsletterDesc}>
                Subscribe to our newsletter for the latest updates.
              </p>
              <form
                className={styles.newsletterForm}
                onSubmit={handleSubscribe}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  aria-label="Email address"
                  className={styles.newsletterInput}
                />
                <button
                  type="submit"
                  className={styles.newsletterSubmit}
                  aria-label="Subscribe"
                >
                  <Rocket size={15} aria-hidden="true" />
                </button>
              </form>
              <span className={styles.newsletterNote}>
                We respect your privacy.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {year} MetaDev. All rights reserved.
          </p>

          <ul className={styles.legalList}>
            {LEGAL_LINKS.map((link) => (
              <li key={link.label}>
                <Link to={link.href} className={styles.legalLink}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className={styles.badgeList}>
            {COMPLIANCE_BADGES.map(({ icon: Icon, label, accent }) => (
              <li key={label} className={`${styles.badge} ${styles[`badge-${accent}`]}`}>
                <Icon size={14} aria-hidden="true" />
                <span>{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}