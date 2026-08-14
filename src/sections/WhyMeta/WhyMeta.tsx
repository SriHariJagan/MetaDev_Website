import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Briefcase,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Globe,
  Headset,
  Infinity as InfinityIcon,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradientText } from "@/components/common/GradientText";
import { GlassCard } from "@/components/common/GlassCard";
import { IconCircle } from "@/components/common/IconCircle";
import { CountUp } from "@/components/common/CountUp";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { fadeUp, staggerContainer } from "@/constants/motion";
import styles from "./WhyMeta.module.css";

type Accent = "blue" | "violet" | "green";

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(20, 0.35);

/* ---------- Data ---------- */

interface Feature {
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: BrainCircuit,
    accent: "blue",
    title: "AI First",
    description:
      "Built with AI at the core to automate, predict and accelerate outcomes.",
  },
  {
    icon: Cloud,
    accent: "blue",
    title: "Cloud Native",
    description: "Scalable, resilient and cost-optimized cloud architectures.",
  },
  {
    icon: Code2,
    accent: "violet",
    title: "API First",
    description: "Modern APIs & SDKs to integrate, extend and innovate faster.",
  },
  {
    icon: ShieldCheck,
    accent: "green",
    title: "Enterprise Security",
    description:
      "Security by design with encryption, access control and threat protection.",
  },
  {
    icon: Rocket,
    accent: "violet",
    title: "Rapid Innovation",
    description: "Agile delivery teams focused on continuous innovation.",
  },
  {
    icon: Globe,
    accent: "blue",
    title: "Global Standards",
    description: "Built on best practices, compliance and industry standards.",
  },
];

interface Stat {
  icon: LucideIcon;
  accent: Accent;
  value: string;
  label: string;
}

const STATS: Stat[] = [
  {
    icon: Building2,
    accent: "blue",
    value: "100+",
    label: "Enterprise Clients",
  },
  {
    icon: Briefcase,
    accent: "violet",
    value: "250+",
    label: "Projects Delivered",
  },
  { icon: Users, accent: "green", value: "5M+", label: "Users Impacted" },
  { icon: ShieldCheck, accent: "blue", value: "99.9%", label: "System Uptime" },
  { icon: Headset, accent: "violet", value: "24/7", label: "Expert Support" },
  { icon: Globe, accent: "green", value: "20+", label: "Countries Served" },
];

interface Differentiator {
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    icon: Users,
    accent: "violet",
    title: "Domain Expertise",
    description:
      "Deep knowledge across healthcare, education, government, fintech and more.",
  },
  {
    icon: CheckCircle2,
    accent: "green",
    title: "End-to-End Delivery",
    description:
      "From strategy and design to development, deployment and maintenance.",
  },
  {
    icon: InfinityIcon,
    accent: "blue",
    title: "Agile & DevOps",
    description:
      "Faster releases, higher quality and continuous improvement with DevOps.",
  },
  {
    icon: BarChart3,
    accent: "violet",
    title: "Data Driven",
    description:
      "Actionable insights and analytics to help you make smarter decisions.",
  },
  {
    icon: TrendingUp,
    accent: "green",
    title: "Future Ready",
    description:
      "Emerging technologies and innovations to keep you ahead of the curve.",
  },
];

/* ---------- Orbit graphic ---------- */

type NodeAccent = 'cyan' | 'green' | 'violet' | 'amber' | 'blue' | 'rose' | 'indigo';

function OrbitGraphic({ inView }: { inView: boolean }) {
  const nodes: Array<{ icon: LucideIcon; accent: NodeAccent; className: string; delay: number }> = [
    { icon: Cloud, accent: 'cyan', className: styles.nodeTop, delay: 0 },
    { icon: Users, accent: 'green', className: styles.nodeUpperLeft, delay: 0.08 },
    { icon: Code2, accent: 'violet', className: styles.nodeUpperRight, delay: 0.16 },
    { icon: BarChart3, accent: 'amber', className: styles.nodeLeft, delay: 0.24 },
    { icon: ShieldCheck, accent: 'blue', className: styles.nodeRight, delay: 0.32 },
    { icon: Database, accent: 'rose', className: styles.nodeLowerLeft, delay: 0.4 },
    { icon: BrainCircuit, accent: 'indigo', className: styles.nodeLowerRight, delay: 0.48 },
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
          className={`${styles.cubeLogo} ${styles.cubeLogoDark}`}
          draggable={false}
        />
        <img
          src="/logo-lightmode.png"
          alt="metadev logo"
          className={`${styles.cubeLogo} ${styles.cubeLogoLight}`}
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
              ease: 'easeOut',
              delay: index * 0.06,
              y: { duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay },
              scale: { duration: 0.2 },
            }}
          >
            <Icon size={22} aria-hidden="true" />
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

/* ---------- Main section ---------- */

export function WhyMeta() {
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
          className={styles.headerGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <OrbitGraphic inView={isInView} />

          <motion.div variants={itemVariants}>
            <SectionHeader
              variants={itemVariants}
              itemVariants={itemVariants}
              title={
                <>
                  Why Meta<GradientText variant="violet">Dev</GradientText>?
                </>
              }
              titleClassName={styles.title}
              subtitle="We combine deep technology expertise with domain knowledge to
                deliver secure, scalable and intelligent digital solutions that
                drive real impact."
              subtitleClassName={styles.subtitle}
            />

            <motion.ul
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delayChildren: 0.15, staggerChildren: 0.08 }}
            >
              {FEATURES.map((feature) => (
                <GlassCard
                  key={feature.title}
                  as={motion.li}
                  hover="lg"
                  className={`${styles.card} ${styles[`accent-${feature.accent}`]}`}
                  variants={itemVariants}
                >
                  <IconCircle
                    size="lg"
                    variant="tint"
                    className={styles.icon}
                  >
                    <feature.icon size={20} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardText}>{feature.description}</p>
                  <span
                    className={`${styles.underline} ${styles[`underline-${feature.accent}`]}`}
                  />
                </GlassCard>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.statsBar}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              className={`${styles.statItem} ${styles[`accent-${stat.accent}`]}`}
              variants={itemVariants}
            >
              <IconCircle size="md" variant="tint">
                <stat.icon size={18} aria-hidden="true" />
              </IconCircle>
              <div className={styles.statText}>
                <span
                  className={`${styles.statValue} ${styles[`text-${stat.accent}`]}`}
                >
                  <CountUp value={stat.value} duration={0.8} />
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <GlassCard
          as={motion.div}
          clip={false}
          className={styles.differentiators}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {DIFFERENTIATORS.map((item) => (
            <motion.div
              key={item.title}
              className={`${styles.diffItem} ${styles[`accent-${item.accent}`]}`}
              variants={itemVariants}
            >
              <span
                className={`${styles.diffIcon} ${styles[`text-${item.accent}`]}`}
              >
                <item.icon size={20} aria-hidden="true" />
              </span>
              <h4
                className={`${styles.diffTitle} ${styles[`text-${item.accent}`]}`}
              >
                {item.title}
              </h4>
              <p className={styles.diffText}>{item.description}</p>
            </motion.div>
          ))}
        </GlassCard>
      </Container>
    </Section>
  );
}
