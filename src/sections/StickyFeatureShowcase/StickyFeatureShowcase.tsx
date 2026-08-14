// StickyFeatureShowcase.tsx — left column pins in view while the right column scrolls past it
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  type Variants,
} from "framer-motion";
import {
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Unplug,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import type { Accent } from "@/sections/OurSolutions";
import styles from "./StickyFeatureShowcase.module.css";

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 40,
    y: 12,
  },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: "spring", stiffness: 95, damping: 18 },
  },
};

export interface FeatureRow {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}

const DEFAULT_ITEMS: FeatureRow[] = [
  {
    icon: Rocket,
    title: "Launch faster than WordPress or Wix.",
    description:
      "Skip theme hunting, plugin installs, and hosting setup. MetaFlow gets you from a blank canvas to a live site in hours—not weeks of configuration.",
    accent: "blue",
  },
  {
    icon: Unplug,
    title: "No plugin maze.",
    description:
      "Forms, SEO, analytics, and hosting are built in from day one. One platform, zero compatibility headaches, and nothing extra to install or maintain.",
    accent: "violet",
  },
  {
    icon: Sparkles,
    title: "AI-assisted content and layout.",
    description:
      "Generate copy, suggest sections, and refine designs with AI that understands your brand—so you spend time polishing, not starting from scratch.",
    accent: "pink",
  },
  {
    icon: ShieldCheck,
    title: "Secure hosting included.",
    description:
      "SSL, CDN, and automatic backups come standard with every plan. No separate hosting bills, no security plugins, and no surprise invoices.",
    accent: "green",
  },
  {
    icon: Users,
    title: "Team collaboration built in.",
    description:
      "Invite designers, marketers, and clients to edit together with role-based permissions. Everyone works in the same workspace, on the same pages.",
    accent: "cyan",
  },
  {
    icon: TrendingUp,
    title: "Scale from one page to a full site.",
    description:
      "Start with a landing page and grow into a multi-page site without switching platforms. MetaFlow grows with you as your needs expand.",
    accent: "orange",
  },
];

export interface StickyFeatureShowcaseProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  items?: FeatureRow[];
}

export function StickyFeatureShowcase({
  eyebrow = "Why MetaFlow",
  title = (
    <>
      Built for builders who want to <span className={styles.titleAccent}>ship</span>, not configure.
    </>
  ),
  subtitle = "Stop wrestling with plugins and hosting. MetaFlow gives you a complete website stack in one place—so you can focus on launching, not troubleshooting.",
  items = DEFAULT_ITEMS,
}: StickyFeatureShowcaseProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 55%", "end 55%"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const nextIndex = Math.min(
      items.length - 1,
      Math.max(0, Math.round(value * (items.length - 1))),
    );
    setActiveIndex(nextIndex);
  });

  return (
    <section className={styles.root}>
      <Container maxWidth="wide" className={styles.container}>
        <div className={styles.split}>
          {/* ---------- Left: pinned intro ---------- */}
          <motion.div
            ref={headerRef}
            className={styles.left}
            variants={headerItemVariants}
            initial="hidden"
            animate={isHeaderInView ? "visible" : "hidden"}
          >
            <span className={styles.eyebrow}>
              <Sparkles size={13} aria-hidden="true" />
              {eyebrow}
            </span>
            <h2 className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>

            <div className={styles.progress} aria-hidden="true">
              <span className={styles.progressCount}>
                {String(activeIndex + 1).padStart(2, "0")}
                <span className={styles.progressTotal}>
                  /{String(items.length).padStart(2, "0")}
                </span>
              </span>
              <div className={styles.progressTrack}>
                <motion.span
                  className={styles.progressFill}
                  animate={{ scaleX: (activeIndex + 1) / items.length }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          </motion.div>

          {/* ---------- Right: rows scroll with the page ---------- */}
          <ol ref={listRef} className={styles.right}>
            {items.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.li
                  key={item.title}
                  className={cn(
                    styles.row,
                    styles[`accent-${item.accent}`],
                    index === activeIndex && styles.rowActive,
                  )}
                  variants={rowVariants}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5, margin: "-15% 0px -15% 0px" }}
                >
                  <span className={styles.rowNum}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.rowIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <div className={styles.rowText}>
                    <h3 className={styles.rowTitle}>{item.title}</h3>
                    <p className={styles.rowDesc}>{item.description}</p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}

export default StickyFeatureShowcase;
