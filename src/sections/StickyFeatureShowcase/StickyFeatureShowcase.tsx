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
  Headset,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
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
    title: "Ship in weeks, not quarters.",
    description:
      "Agile sprints, senior engineers, and a proven delivery framework take your product from kickoff to production without the usual scope creep.",
    accent: "blue",
  },
  {
    icon: Users,
    title: "A dedicated team, not a ticket queue.",
    description:
      "You work with named engineers and a project lead who know your codebase inside out—not a rotating pool of contractors handed off between projects.",
    accent: "violet",
  },
  {
    icon: Sparkles,
    title: "AI-augmented engineering.",
    description:
      "Our teams use AI tooling to speed up testing, code review, and documentation, so more of every sprint goes toward the features that matter.",
    accent: "pink",
  },
  {
    icon: ShieldCheck,
    title: "Security and compliance by default.",
    description:
      "Every build follows enterprise security standards from day one, with audits, encryption, and compliance frameworks baked into the architecture.",
    accent: "green",
  },
  {
    icon: TrendingUp,
    title: "Architecture that scales with you.",
    description:
      "Cloud-native infrastructure and modular systems let your platform grow from MVP to millions of users without a costly rebuild.",
    accent: "orange",
  },
  {
    icon: Headset,
    title: "Support that doesn't end at launch.",
    description:
      "24/7 monitoring, maintenance, and a direct line to your engineering team keep your platform running long after go-live.",
    accent: "cyan",
  },
];

export interface StickyFeatureShowcaseProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  items?: FeatureRow[];
}

export function StickyFeatureShowcase({
  eyebrow = "Why MetaDev",
  title = (
    <>
      Built for teams who need to <span className={styles.titleAccent}>scale</span>, not just launch.
    </>
  ),
  subtitle = "From first sprint to global rollout, MetaDev pairs senior engineers with enterprise-grade infrastructure—so your product ships fast and holds up under real-world load.",
  items = DEFAULT_ITEMS,
}: StickyFeatureShowcaseProps) {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });

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
                  viewport={{ once: false, amount: 0.5, margin: "-15% 0px -15% 0px" }}
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
