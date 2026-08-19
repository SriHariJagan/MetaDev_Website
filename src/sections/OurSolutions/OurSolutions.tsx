// OurSolutions.tsx
import { memo, useCallback, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useInView, LayoutGroup, useReducedMotion, type Variants } from "framer-motion";
import {
  Rocket,
  Clock,
  Globe2,
  ShieldCheck,
  Headset,
  Users,
  Award,
  BrainCircuit,
  Smartphone,
  Code,
  PenTool,
  Blocks,
  Cpu,
  Database,
  Boxes,
  ReceiptText,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { GlassCard } from "@/components/common/GlassCard";
import { IconCircle } from "@/components/common/IconCircle";
import { GradientDefs } from "@/components/common/GradientDefs";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { fadeUp, staggerContainer } from "@/constants/motion";
import { cn } from "@/utils/cn";
import styles from "./OurSolutions.module.css";

export type Accent = "orange" | "violet" | "blue" | "pink" | "teal" | "green" | "cyan" | "indigo" | "red" | "amber";

/* ------------------------------------------------------------------ */
/* Data (dummy — matches structure/colors of the reference screenshot) */
/* ------------------------------------------------------------------ */

export interface Solution {
  id: string;
  number: string;
  icon: LucideIcon;
  accent: Accent;
  name: string;
  description: string;
  features?: string[];
}

const SOLUTIONS: Solution[] = [
  {
    id: "web-development",
    number: "01",
    icon: Code,
    accent: "blue",
    name: "Web Development",
    description:
      "Modern, scalable web applications built with React, TypeScript and best-in-class tooling — engineered for speed, security and growth.",
    features: [
      "React & Next.js builds",
      "Scalable architecture",
      "SEO & performance",
      "CMS & commerce integration",
      "API-first development",
    ],
},
  {
    id: "mobile-development",
    number: "02",
    icon: Smartphone,
    accent: "cyan",
    name: "Mobile Development",
    description:
      "Cross-platform mobile apps with smooth, native-feeling interactions and reliable offline support — from MVP to global scale.",
    features: [
      "iOS & Android apps",
      "React Native & Flutter",
      "Offline-first experiences",
      "Push notifications & analytics",
      "Biometric authentication",
    ],
},
  {
    id: "ui-ux-design",
    number: "03",
    icon: PenTool,
    accent: "pink",
    name: "UI/UX Design",
    description:
      "Research-driven product design, design systems and accessible interfaces that convert — clarity in every pixel and interaction.",
    features: [
      "User research & personas",
      "Design systems",
      "Prototyping & testing",
      "Accessibility & usability",
      "Motion & interaction design",
    ],
},
  {
    id: "ai-machine-learning",
    number: "04",
    icon: BrainCircuit,
    accent: "violet",
    name: "AI & Machine Learning",
    description:
      "Custom AI models, LLM-powered products and intelligent automation that turn your data into decisions — responsibly and at scale.",
    features: [
      "Custom AI model training",
      "NLP & computer vision",
      "Predictive analytics",
      "LLM-powered applications",
      "MLOps & model monitoring",
    ],
},
  {
    id: "blockchain-development",
    number: "05",
    icon: Blocks,
    accent: "orange",
    name: "Blockchain Development",
    description:
      "Smart contracts, dApps and Web3 infrastructure engineered for security, transparency and scale — built on battle-tested chains.",
    features: [
      "Smart contract development",
      "dApps & Web3 integration",
      "Tokenization & DeFi",
      "NFT platforms & wallets",
      "Cross-chain bridges",
    ],
},
  {
    id: "cybersecurity",
    number: "06",
    icon: ShieldCheck,
    accent: "red",
    name: "Cybersecurity",
    description:
      "Security audits, threat monitoring and compliance frameworks that protect your business end to end — proactive, not reactive.",
    features: [
      "Security audits & pentesting",
      "Threat monitoring",
      "Compliance & governance",
      "Incident response",
      "Zero-trust architecture",
    ],
},
  {
    id: "iot-solutions",
    number: "07",
    icon: Cpu,
    accent: "green",
    name: "IoT Solutions",
    description:
      "End-to-end IoT platforms — from device firmware and connectivity to real-time dashboards and edge analytics.",
    features: [
      "Device & sensor integration",
      "Real-time dashboards",
      "Edge computing",
      "Remote monitoring",
      "OTA firmware updates",
    ],
},
  {
    id: "data-engineering",
    number: "08",
    icon: Database,
    accent: "indigo",
    name: "Data Engineering",
    description:
      "Robust pipelines, warehouses and analytics platforms that transform raw data into actionable intelligence — trusted by the numbers.",
    features: [
      "Data pipelines & ETL",
      "Data warehousing",
      "Real-time streaming",
      "Analytics dashboards",
      "ML feature stores",
    ],
},
  {
    id: "custom-software",
    number: "09",
    icon: Boxes,
    accent: "amber",
    name: "Custom Software",
    description:
      "Bespoke platforms, enterprise integrations and legacy modernization tailored to your workflows — software that fits.",
    features: [
      "Bespoke platform builds",
      "Enterprise integrations",
      "Legacy modernization",
      "Cloud migration",
      "API gateway & microservices",
    ],
},
  {
    id: "pos-applications",
    number: "10",
    icon: ReceiptText,
    accent: "teal",
    name: "POS Applications",
    description:
      "Modern point-of-sale systems with inventory, billing and analytics — online and offline, anywhere, without missing a sale.",
    features: [
      "Billing & invoicing",
      "Inventory management",
      "Multi-outlet support",
      "Offline & cloud sync",
      "Customer loyalty & CRM",
    ],
},
];

export interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
  accent?: Accent;
}

const HERO_STATS: HeroStat[] = [
  { icon: Rocket, value: "10+", label: "Flagship Solutions" },
  { icon: Clock, value: "99.9%", label: "System Uptime" },
  { icon: Globe2, value: "25+", label: "Industries Served" },
  { icon: Globe2, value: "50+", label: "Countries Reached" },
  { icon: ShieldCheck, value: "1000+", label: "Successful Deployments" },
  { icon: Headset, value: "24/7", label: "Support & Maintenance" },
  { icon: Users, value: "2M+", label: "Users Empowered" },
  { icon: Award, value: "ISO 27001", label: "Certified Security" },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(18, 0.32);

/* Premium hover interaction: spring lift + traveling shared highlight */

const cardHoverVariants: Variants = {
  rest: { y: 0, scale: 1, zIndex: 0 },
  hover: { y: -6, scale: 1.015, zIndex: 1 },
};

const cardSpring = { type: "spring", stiffness: 350, damping: 30, mass: 0.8 } as const;

const highlightSpring = { type: "spring", stiffness: 320, damping: 30, mass: 0.9 } as const;

/* ------------------------------------------------------------------ */
/* Solution card                                                       */
/* ------------------------------------------------------------------ */

interface SolutionCardProps {
  solution: Solution;
  active: boolean;
  highlighted: boolean;
  showDescription: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onFocusStart: (id: string) => void;
  onFocusEnd: () => void;
}

const SolutionCard = memo(function SolutionCard({
  solution,
  active,
  highlighted,
  showDescription,
  onHoverStart,
  onHoverEnd,
  onFocusStart,
  onFocusEnd,
}: SolutionCardProps) {
  const Icon = solution.icon;
  const reducedMotion = useReducedMotion();

  const highlightTransition = reducedMotion
    ? { duration: 0 }
    : { layout: highlightSpring, opacity: { duration: 0.22, ease: "easeOut" as const } };

  return (
    <motion.li
      className={`${styles.card} ${styles[`accent-${solution.accent}`]}`}
      variants={itemVariants}
      onMouseEnter={() => onHoverStart(solution.id)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onFocusStart(solution.id)}
      onBlur={onFocusEnd}
    >
      <motion.div
        className={styles.cardHover}
        variants={cardHoverVariants}
        initial="rest"
        animate={active ? "hover" : "rest"}
        transition={reducedMotion ? { duration: 0 } : cardSpring}
        style={{ willChange: active ? "transform" : "auto" }}
      >
        <GlassCard
          as="div"
          className={cn(styles.cardInner, active && styles.cardInnerActive)}
        >
          {highlighted && (
            <motion.div
              layoutId="solution-hover-highlight"
              className={styles.cardHighlight}
              aria-hidden="true"
              animate={{ opacity: active ? 1 : 0 }}
              transition={highlightTransition}
            />
          )}
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={cn(styles.cardNumber, active && styles.cardNumberActive)}>
                {solution.number}
              </span>
              <motion.div
                className={styles.iconWrapper}
                animate={active ? { scale: 1.08 } : { scale: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 25 }
                }
              >
                <IconCircle size="xl" rounded="sm" variant="gradient">
                  <Icon size={22} stroke={`url(#grad-${solution.accent})`} aria-hidden="true" />
                </IconCircle>
              </motion.div>
            </div>

            <motion.h3
              className={styles.cardName}
              animate={active ? { color: "rgb(var(--accent))" } : { color: "var(--color-text)" }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
            >
              {solution.name}
            </motion.h3>
            {showDescription && (
              <>
                <p className={styles.cardDesc}>{solution.description}</p>
                {solution.features && solution.features.length > 0 && (
                  <ul className={styles.featureList}>
                    {solution.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </motion.li>
  );
});

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

interface OurSolutionsProps {
  eyebrow?: string;
  title?: ReactNode;
  titleClassName?: string;
  subtitle?: string;
  pillLabel?: string;
  columns?: 5 | 6;
  solutions?: Solution[];
  stats?: HeroStat[];
  showDescriptions?: boolean;
}

const DEFAULT_TITLE: ReactNode = (
  <>
    Complete Digital Solutions
    <br />
    <GradientText>Built for Impact.</GradientText>
  </>
);

export function OurSolutions({
  eyebrow = "Our Solutions",
  title = DEFAULT_TITLE,
  titleClassName,
  subtitle = "MetaDev offers a comprehensive suite of enterprise-grade solutions that empower organizations to streamline operations, enhance productivity, and deliver exceptional experiences.",
  pillLabel = "Our Solutions (01 – 10)",
  columns = 5,
  solutions = SOLUTIONS,
  stats = HERO_STATS,
  showDescriptions = true,
}: OurSolutionsProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [lastActiveId, setLastActiveId] = useState<string | null>(null);

  const activeId = hoveredId ?? focusedId;
  const highlightId = activeId ?? lastActiveId;

  const handleHoverStart = useCallback((id: string) => {
    setHoveredId(id);
    setLastActiveId(id);
  }, []);

  const handleHoverEnd = useCallback(() => setHoveredId(null), []);

  const handleFocusStart = useCallback((id: string) => {
    setFocusedId(id);
    setLastActiveId(id);
  }, []);

  const handleFocusEnd = useCallback(() => setFocusedId(null), []);

  return (
    <Section bordered>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container
        maxWidth="wide"
        className={styles.container}
        ref={containerRef}
      >
        <div className={styles.leftColumn}>
          {/* ---------- Left: intro ---------- */}
          <motion.div
            className={styles.intro}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              className={styles.eyebrowLabel}
              variants={itemVariants}
            >
              {eyebrow}
            </motion.span>

            <motion.h2 className={cn(styles.title, titleClassName)} variants={itemVariants}>
              {title}
            </motion.h2>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              {subtitle}
            </motion.p>
          </motion.div>

          {/* ---------- Stats glass card ---------- */}
          <motion.div
            className={styles.statsPanel}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={cn(
                    styles.statItem,
                    stat.accent && styles[`accent-${stat.accent}`]
                  )}
                  variants={itemVariants}
                >
                  <IconCircle size="lg" variant="gradient">
                    <stat.icon size={16} aria-hidden="true" />
                  </IconCircle>
                  <div className={styles.statText}>
                    <GradientText className={styles.statValue}>
                      {stat.value}
                    </GradientText>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Right: solutions grid ---------- */}
        <div className={styles.showcase}>
          <motion.div
            className={styles.headerRow}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className={styles.headerLine} />
            <span className={styles.headerPill}>{pillLabel}</span>
            <span className={styles.headerLine} />
          </motion.div>

          <LayoutGroup>
            <motion.ul
              className={`${styles.grid} ${columns === 6 ? styles.gridSix : ""}`}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              role="list"
              aria-label="Enterprise solutions"
              onMouseLeave={handleHoverEnd}
              onBlur={handleFocusEnd}
            >
              {solutions.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  active={activeId === solution.id}
                  highlighted={highlightId === solution.id}
                  showDescription={showDescriptions}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onFocusStart={handleFocusStart}
                  onFocusEnd={handleFocusEnd}
                />
              ))}
            </motion.ul>
          </LayoutGroup>
        </div>
      </Container>
    </Section>
  );
}
