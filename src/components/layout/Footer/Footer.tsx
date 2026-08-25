// Footer.tsx
import { useRef, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, type Variants } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Rocket,
  ShieldCheck,
  Headset,
  Globe2,
  BadgeCheck,
  Lock,
  FileCheck2,
  CreditCard,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { cn } from "@/utils/cn";
import styles from "./Footer.module.css";

/* ==================================================================== */
/* Brand icons — inline SVGs (lucide-react no longer ships brand marks) */
/* ==================================================================== */

interface BrandIconProps {
  size?: number;
}

const svgProps = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": true,
} as const);

function LinkedInIcon({ size = 16 }: BrandIconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  );
}

function XIcon({ size = 16 }: BrandIconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ size = 16 }: BrandIconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: BrandIconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: BrandIconProps) {
  return (
    <svg {...svgProps(size)}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

type BrandIcon = (props: BrandIconProps) => ReactElement;

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

/* Footer-only timing — whole entrance completes in under 1 second */
const footerContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

const footerItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
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
        <div className={styles.stars} aria-hidden="true" />

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
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ==================================================================== */
/* Function 2: Footer — logo/social, link columns, newsletter, bottom  */
/* ==================================================================== */

type SocialAccent = "linkedin" | "x" | "youtube" | "facebook" | "instagram";

const SOCIAL_LINKS: { icon: BrandIcon; label: string; href: string; accent: SocialAccent }[] = [
  { icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com", accent: "linkedin" },
  { icon: XIcon, label: "X / Twitter", href: "https://x.com", accent: "x" },
  { icon: YouTubeIcon, label: "YouTube", href: "https://youtube.com", accent: "youtube" },
  { icon: FacebookIcon, label: "Facebook", href: "https://facebook.com", accent: "facebook" },
  { icon: InstagramIcon, label: "Instagram", href: "https://instagram.com", accent: "instagram" },
];

interface FooterSection {
  heading: string;
  links: { label: string; href: string; disabled?: boolean }[];
}

const FOOTER_SECTIONS: FooterSection[] = [
  {
    heading: "Products",
    links: [
      { label: "MetaHealth", href: "/products/metahealth" },
      { label: "MetaEdu", href: "/products/metaedu" },
      { label: "MetaGreen", href: "/products/metagreen" },
      { label: "MetaFlow", href: "/products/metaflow" },
      { label: "MetaHire", href: "/products/metahire" },
      { label: "MetaCheck", href: "/products/metacheck" },
      { label: "MetaAdds", href: "/products/metaadds" },
      { label: "MetaNav", href: "/products/metanav" },
      { label: "MetaLedger", href: "/products/metaledger" },
      { label: "MetaCard", href: "/products/metacard" },
      { label: "MetaIM", href: "/products/metaim" },
    ],
  },
  {
    heading: "Solutions",
    links: [
      { label: "Digital Health", href: "/solutions/digital-health", disabled: true },
      { label: "Education", href: "/solutions/education", disabled: true },
      { label: "Government", href: "/solutions/government", disabled: true },
      { label: "Enterprise", href: "/solutions/enterprise", disabled: true },
      { label: "FinTech", href: "/solutions/fintech", disabled: true },
      { label: "AI Automation", href: "/solutions/ai-automation", disabled: true },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
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

type BadgeAccent = "iso" | "soc2" | "hipaa" | "gdpr" | "iso9001" | "iso42001" | "pci";

const COMPLIANCE_BADGES: { icon: LucideIcon; label: string; accent: BadgeAccent }[] = [
  { icon: ShieldCheck, label: "ISO 27001", accent: "iso" },
  { icon: ShieldCheck, label: "ISO 9001", accent: "iso9001" },
  { icon: ShieldCheck, label: "ISO 42001", accent: "iso42001" },
  { icon: BadgeCheck, label: "SOC 2", accent: "soc2" },
  { icon: FileCheck2, label: "HIPAA", accent: "hipaa" },
  { icon: Lock, label: "GDPR", accent: "gdpr" },
  { icon: CreditCard, label: "PCI DSS", accent: "pci" },
];

function FooterLinkSection({ section }: { section: FooterSection }) {
  return (
    <motion.div className={styles.linkRow} variants={footerItemVariants}>
      <h3 className={styles.colHeading}>{section.heading}</h3>
      <ul className={styles.linkRowList}>
        {section.links.map((link) => (
          <li key={link.label}>
            {link.disabled ? (
              <span className={cn(styles.link, styles.linkDisabled)} title="Coming soon">
                {link.label}
                <span className={styles.soonDot} aria-hidden="true" />
              </span>
            ) : (
              <Link to={link.href} className={styles.link}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const mainRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mainRef, { once: true, amount: 0.1 });

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <span className={styles.watermark} aria-hidden="true">
          MetaDev
        </span>
        <motion.div
          className={styles.mainInner}
          ref={mainRef}
          variants={footerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className={styles.linkRows}>
            {FOOTER_SECTIONS.map((section) => (
              <FooterLinkSection key={section.heading} section={section} />
            ))}
          </div>

          <div className={styles.footerBrandRow}>
            <motion.div className={styles.brandCol} variants={footerItemVariants}>
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
                      <Icon size={15} />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
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