import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Box,
  Boxes,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Globe,
  Handshake,
  Headphones,
  Landmark,
  Layers,
  Network,
  Rocket,
  Settings,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradientText } from "@/components/common/GradientText";
import { CountUp } from "@/components/common/CountUp";
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
  | "teal";

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
  { icon: Box, value: "8+", label: "Digital Platforms", accent: "blue" },
  { icon: Layers, value: "50+", label: "Business Modules", accent: "cyan" },
  { icon: Cloud, value: "99.9%", label: "Cloud Availability", accent: "violet" },
  { icon: Headphones, value: "24/7", label: "Support", accent: "green" },
];

interface Differentiator {
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
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
];

interface ProgressItem {
  icon: LucideIcon;
  accent: Accent;
  label: string;
  value: number;
}

const PROGRESS: ProgressItem[] = [
  { icon: Zap, accent: "blue", label: "Faster implementation", value: 90 },
  { icon: Settings, accent: "cyan", label: "Less manual work", value: 78 },
  {
    icon: Database,
    accent: "violet",
    label: "Unified business data",
    value: 86,
  },
  { icon: BarChart3, accent: "orange", label: "Better decisions", value: 68 },
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

/* ---------- Orbit graphic (original WhyMeta left design) ---------- */

type NodeAccent = "cyan" | "green" | "violet" | "amber" | "blue" | "rose" | "indigo";

function OrbitGraphic({ inView }: { inView: boolean }) {
  const nodes: Array<{
    icon: LucideIcon;
    accent: NodeAccent;
    className: string;
    delay: number;
  }> = [
    { icon: Cloud, accent: "cyan", className: styles.nodeTop, delay: 0 },
    { icon: Users, accent: "green", className: styles.nodeUpperLeft, delay: 0.08 },
    { icon: Code2, accent: "violet", className: styles.nodeUpperRight, delay: 0.16 },
    { icon: BarChart3, accent: "amber", className: styles.nodeLeft, delay: 0.24 },
    { icon: ShieldCheck, accent: "blue", className: styles.nodeRight, delay: 0.32 },
    { icon: Database, accent: "rose", className: styles.nodeLowerLeft, delay: 0.4 },
    { icon: BrainCircuit, accent: "indigo", className: styles.nodeLowerRight, delay: 0.48 },
  ];

  return (
    <motion.div
      className={styles.orbit}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className={styles.orbitRing} />
      <div className={styles.orbitRingGlow} />
      <div className={styles.pedestalRingOuter} />
      <div className={styles.pedestalRingInner} />
      <div className={styles.pedestalGlow} />
      <div className={styles.orbitCenterGlow} />

      <div className={styles.cube}>
        <img
          src="/logo-noBg.png"
          alt="metadev logo"
          className={styles.cubeLogo}
          draggable={false}
        />
      </div>

      {nodes.map(({ icon: Icon, accent, className, delay }, index) => (
        <div key={index} className={`${styles.node} ${className}`}>
          <motion.span
            className={`${styles.nodeIcon} ${styles[`node-${accent}`]}`}
            initial={{ opacity: 0, scale: 0.4, y: 0 }}
            animate={
              inView
                ? { opacity: 1, scale: 1, y: [0, -6, 0] }
                : { opacity: 0, scale: 0.4, y: 0 }
            }
            whileHover={{ scale: 1.12 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
              delay: index * 0.06,
              y: { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay },
              scale: { duration: 0.2 },
            }}
          >
            <Icon size={15} aria-hidden="true" />
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

/* ---------- Main section ---------- */

export function WhyMetaNext() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

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
          {/* <motion.span className={styles.eyebrow} variants={itemVariants}>
            Why MetaDev?
          </motion.span> */}
          <SectionHeader
            align="center"
            variants={itemVariants}
            itemVariants={itemVariants}
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

        <motion.ul
          className={styles.statsRow}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map((stat) => (
            <motion.li
              key={stat.label}
              className={`${styles.statCard} ${styles[`accent-${stat.accent}`]}`}
              variants={itemVariants}
            >
              <span className={styles.statTop}>
                <span className={styles.statIcon}>
                  <stat.icon size={18} aria-hidden="true" />
                </span>
                <CountUp
                  value={stat.value}
                  duration={1.4}
                  className={styles.statValue}
                />
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </motion.li>
          ))}
        </motion.ul>

        <div className={styles.layout}>
          {/* ---------- Left: stats with percents + orbit design below ---------- */}
          <motion.div
            className={styles.impactPanel}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className={styles.impactHead}>
              <h3 className={styles.impactTitle}>Business Impact</h3>
              <span className={styles.builtBadge}>Built to scale</span>
            </div>

            <ul className={styles.progressList}>
              {PROGRESS.map((item) => (
                <motion.li
                  key={item.label}
                  className={styles.progressItem}
                  variants={itemVariants}
                >
                  <span className={styles.progressHead}>
                    <span
                      className={`${styles.progressIcon} ${styles[`accent-${item.accent}`]}`}
                    >
                      <item.icon size={14} aria-hidden="true" />
                    </span>
                    <span className={styles.progressLabel}>{item.label}</span>
                    <span className={styles.progressValue}>{item.value}%</span>
                  </span>
                  <div className={styles.progressTrack}>
                    <motion.span
                      className={`${styles.progressFill} ${styles[`fill-${item.accent}`]}`}
                      initial={{ width: 0 }}
                      animate={
                        isInView ? { width: `${item.value}%` } : { width: 0 }
                      }
                      transition={{
                        duration: 1.1,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    />
                  </div>
                </motion.li>
              ))}
            </ul>

            <OrbitGraphic inView={isInView} />
          </motion.div>

          {/* ---------- Right: differentiator cards (3 x 3) ---------- */}
          <motion.ul
            className={styles.cardsGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            transition={{ delayChildren: 0.1, staggerChildren: 0.06 }}
          >
            {DIFFERENTIATORS.map((item) => (
              <motion.li
                key={item.title}
                className={`${styles.card} ${styles[`accent-${item.accent}`]}`}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }}
              >
                <span className={styles.cardIcon}>
                  <item.icon size={20} aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
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
