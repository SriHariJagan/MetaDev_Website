import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  AppWindow,
  ArrowUpRight,
  BrainCircuit,
  Boxes,
  CheckCircle2,
  Cloud,
  Globe,
  Handshake,
  Headphones,
  Landmark,
  Lightbulb,
  Network,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradientText } from "@/components/common/GradientText";
import { CountUp } from "@/components/common/CountUp";
import { Badge } from "@/components/common/Badge";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { fadeUp, staggerContainer } from "@/constants/motion";
import styles from "./WhyMetaNext.module.css";

type Accent =
  | "blue"
  | "cyan"
  | "violet"
  | "green"
  | "orange"
  | "rose"
  | "amber"
  | "indigo"
  | "teal"
  | "pink";

const containerVariants = staggerContainer(0.06);
const itemVariants = fadeUp(18, 0.32);

/* ---------- Data ---------- */

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
  accent: Accent;
}

const STATS: Stat[] = [
  { icon: AppWindow, value: "8+", label: "SaaS", accent: "blue" },
  { icon: Puzzle, value: "50+", label: "Business Modules", accent: "cyan" },
  { icon: Cloud, value: "99.9%", label: "Cloud Availability", accent: "violet" },
  { icon: Headphones, value: "24/7", label: "Support", accent: "green" },
];

interface Differentiator {
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
}

const DIFFERENTIATORS_LEFT: Differentiator[] = [
  {
    icon: Landmark,
    accent: "blue",
    title: "Industry Expertise",
    description:
      "Purpose-built solutions shaped around real operational needs.",
  },
  {
    icon: Network,
    accent: "cyan",
    title: "One Connected Ecosystem",
    description:
      "Unified products, teams, workflows, and data on one platform.",
  },
  {
    icon: BrainCircuit,
    accent: "violet",
    title: "AI-Driven Insights",
    description: "Actionable recommendations that help teams decide faster.",
  },
  {
    icon: ShieldCheck,
    accent: "green",
    title: "Security First",
    description: "Enterprise-grade protection across every application layer.",
  },
  {
    icon: Boxes,
    accent: "orange",
    title: "Flexible & Scalable",
    description:
      "Modular architecture that evolves as your organization grows.",
  },
];

const DIFFERENTIATORS_RIGHT: Differentiator[] = [
  {
    icon: Handshake,
    accent: "rose",
    title: "Partnership Beyond Launch",
    description: "Continuous optimization, support, and product innovation.",
  },
  {
    icon: Rocket,
    accent: "teal",
    title: "Rapid Deployment",
    description:
      "Proven playbooks and reusable modules that shorten go-live time.",
  },
  {
    icon: Globe,
    accent: "indigo",
    title: "Global Compliance",
    description:
      "International standards and regulatory best practices built in.",
  },
  {
    icon: Headphones,
    accent: "amber",
    title: "Dedicated Support",
    description:
      "Around-the-clock care from a team that knows your platform.",
  },
  {
    icon: Lightbulb,
    accent: "pink",
    title: "Continuous Innovation",
    description:
      "A steady cadence of enhancements keeps your platform ahead of the curve.",
  },
];

interface ChecklistItem {
  accent: Accent;
  label: string;
}

const CHECKLIST: ChecklistItem[] = [
  { accent: "blue", label: "Secure by design" },
  { accent: "cyan", label: "Cloud ready" },
  { accent: "violet", label: "Integration first" },
  { accent: "orange", label: "Dedicated support" },
];

/* ---------- Growth illustration (left panel) ---------- */

const GROWTH_POINTS = [
  { x: 20, y: 160 },
  { x: 80, y: 128 },
  { x: 140, y: 142 },
  { x: 200, y: 82 },
  { x: 260, y: 42 },
];

const GROWTH_LINE_PATH =
  "M20,160 C50,148 60,138 80,128 C110,136 120,150 140,142 C170,128 180,98 200,82 C225,68 240,54 260,42";
const GROWTH_AREA_PATH = `${GROWTH_LINE_PATH} L260,188 L20,188 Z`;

const GROWTH_DOTS = [
  { className: "growthDotOne", duration: 4, delay: 0 },
  { className: "growthDotTwo", duration: 5, delay: 0.6 },
  { className: "growthDotThree", duration: 3.6, delay: 1.1 },
];

function GrowthIllustration({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className={styles.growthArt}
      animate={inView ? { y: [0, -8, 0] } : { y: 0 }}
      transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
    >

      {GROWTH_DOTS.map((dot) => (
        <motion.span
          key={dot.className}
          className={`${styles.growthDot} ${styles[dot.className]}`}
          animate={
            inView
              ? { y: [0, -10, 0], opacity: [0.25, 0.75, 0.25] }
              : { opacity: 0 }
          }
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}

      <svg
        viewBox="0 0 280 200"
        className={styles.growthSvg}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5eb8ff" />
            <stop offset="100%" stopColor="#9b6bff" />
          </linearGradient>
          <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5eb8ff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#5eb8ff" stopOpacity="0" />
          </linearGradient>
        </defs>

        <motion.path
          d={GROWTH_AREA_PATH}
          fill="url(#growthFill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        />

        <motion.path
          d={GROWTH_LINE_PATH}
          fill="none"
          stroke="url(#growthLine)"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />

        <motion.path
          d={GROWTH_LINE_PATH}
          fill="none"
          stroke="#ffffff"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="18 480"
          className={styles.growthComet}
          initial={{ strokeDashoffset: 0, opacity: 0 }}
          animate={
            inView
              ? { strokeDashoffset: [-498, 0], opacity: [0, 0.9, 0] }
              : { opacity: 0 }
          }
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: "linear",
            delay: 1.6,
            repeatDelay: 0.6,
          }}
        />

        {GROWTH_POINTS.map((point, index) => (
          <g key={index}>
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={5}
              className={styles.growthNode}
              initial={{ scale: 0, opacity: 0 }}
              animate={
                inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
              }
              transition={{ delay: 0.3 + index * 0.18, duration: 0.3 }}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={5}
              className={styles.growthNodePing}
              initial={{ scale: 1, opacity: 0 }}
              animate={
                inView
                  ? { scale: [1, 2.6], opacity: [0.55, 0] }
                  : { scale: 1, opacity: 0 }
              }
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeOut",
                delay: 1 + index * 0.3,
              }}
            />
          </g>
        ))}
      </svg>

      <motion.span
        className={styles.growthBadge}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={
          inView
            ? { opacity: 1, scale: 1, y: [0, -6, 0] }
            : { opacity: 0, scale: 0.6, y: 0 }
        }
        transition={{
          opacity: { duration: 0.4, delay: 1.1 },
          scale: { duration: 0.4, delay: 1.1 },
          y: { duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
        }}
      >
        <ArrowUpRight size={20} aria-hidden="true" />
      </motion.span>
    </motion.div>
  );
}

/* ---------- Main section ---------- */

export function WhyMetaNext() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  return (
    <Section bordered>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
      </BackgroundDecor>

      <Container ref={containerRef}>
        <motion.div
          className={styles.headerWrap}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader
            align="center"
            variants={itemVariants}
            itemVariants={itemVariants}
            eyebrow={
              <Badge variant="solid">
                <Sparkles size={14} aria-hidden="true" />
                <span>We the MetaDev</span>
              </Badge>
            }
            title={
              <>
                Built for complexity.{" "}
                <GradientText variant="violet">Designed for growth.</GradientText>
              </>
            }
            titleClassName={styles.title}
            subtitle="We combine industry expertise, modern engineering, and long-term partnership
              to deliver digital platforms that create measurable business value."
            subtitleClassName={styles.subtitle}
          />
        </motion.div>

        <div className={styles.heroGrid}>
          {/* ---------- Left: 5 differentiators ---------- */}
          <motion.ul
            className={styles.differentiatorsGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {DIFFERENTIATORS_LEFT.map((item, index) => (
              <motion.li
                key={item.title}
                className={`${styles.diffCard} ${styles[`accent-${item.accent}`]}`}
                variants={itemVariants}
              >
                <span className={styles.diffIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.cardHead}>
                  <span className={styles.cardIcon}>
                    <item.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </span>
                <span className={styles.cardDivider} aria-hidden="true" />
                <p className={styles.cardText}>{item.description}</p>
              </motion.li>
            ))}
          </motion.ul>

          {/* ---------- Center: stats + growth spotlight ---------- */}
          <motion.div
            className={styles.spotlight}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants}>
              <GrowthIllustration inView={isInView} />
            </motion.div>
            <motion.h3 className={styles.growthTitle} variants={itemVariants}>
              Momentum That <GradientText variant="violet">Compounds</GradientText>
            </motion.h3>
            <motion.p className={styles.growthText} variants={itemVariants}>
              Every workflow, integration, and module we ship adds to a
              platform that gets faster, smarter, and easier to scale —
              quarter after quarter.
            </motion.p>

            <motion.ul
              className={styles.centerStats}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {STATS.map((stat, index) => (
                <motion.li
                  key={stat.label}
                  className={`${styles.statRow} ${styles[`accent-${stat.accent}`]}`}
                  variants={itemVariants}
                >
                  <motion.span
                    className={styles.statMarker}
                    animate={isInView ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.2,
                    }}
                  >
                    <stat.icon className={styles.statMarkerIcon} aria-hidden="true" />
                  </motion.span>
                  <span className={styles.statTextGroup}>
                    <CountUp
                      value={stat.value}
                      duration={1.4}
                      className={styles.statValue}
                    />
                    <span className={styles.statLabel}>{stat.label}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------- Right: 5 differentiators ---------- */}
          <motion.ul
            className={styles.differentiatorsGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {DIFFERENTIATORS_RIGHT.map((item, index) => (
              <motion.li
                key={item.title}
                className={`${styles.diffCard} ${styles[`accent-${item.accent}`]}`}
                variants={itemVariants}
              >
                <span className={styles.diffIndex} aria-hidden="true">
                  {String(index + 6).padStart(2, "0")}
                </span>
                <span className={styles.cardHead}>
                  <span className={styles.cardIcon}>
                    <item.icon size={24} aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                </span>
                <span className={styles.cardDivider} aria-hidden="true" />
                <p className={styles.cardText}>{item.description}</p>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.ul
          className={styles.checklist}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CHECKLIST.map((item) => (
            <motion.li
              key={item.label}
              className={styles.checklistItem}
              variants={itemVariants}
            >
              <CheckCircle2
                size={18}
                className={styles[`text-${item.accent}`]}
                aria-hidden="true"
              />
              {item.label}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
