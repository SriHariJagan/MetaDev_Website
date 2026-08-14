// EnterpriseCapabilities.tsx — alternating left/right timeline of platform capabilities
import { useRef, useState } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Share2,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { staggerContainer } from "@/constants/motion";
import { cn } from "@/utils/cn";
import type { Accent } from "@/sections/OurSolutions";
import styles from "./EnterpriseCapabilities.module.css";

const containerVariants = staggerContainer(0.1);

const headerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

/* Item reveals its children in sequence: dot pops, then card slides in */
const itemVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* Marker dot pops with a spring */
const markerDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 320, damping: 18 },
  },
};

/* One expanding ping ring after the dot lands */
const markerPingVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0.8 },
  visible: {
    scale: 2.4,
    opacity: 0,
    transition: { duration: 1.1, ease: "easeOut", delay: 0.15 },
  },
};

/* Card slides, scales and sharpens in from its own side of the timeline */
const cardVariants: Variants = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: custom % 2 === 0 ? -48 : 48,
    y: 18,
    scale: 0.94,
    filter: "blur(8px)",
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      x: { type: "spring", stiffness: 90, damping: 16, mass: 0.9 },
      y: { type: "spring", stiffness: 90, damping: 16, mass: 0.9 },
      scale: { type: "spring", stiffness: 120, damping: 18 },
      opacity: { duration: 0.5, ease: "easeOut" },
      filter: { duration: 0.6, ease: "easeOut" },
    },
  },
};

/* Connector line extends from the dot toward the card */
const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.2 },
  },
};

/* Ghost index number blurs in softly behind the card */
const ghostVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "easeOut", delay: 0.3 },
  },
};

export interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}

const DEFAULT_CAPABILITIES: Capability[] = [
  {
    icon: Workflow,
    title: "Integrated Ecosystem",
    description: "All solutions work seamlessly together.",
    accent: "violet",
  },
  {
    icon: Share2,
    title: "Scalable & Flexible",
    description: "Grows with your business needs.",
    accent: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description: "Enterprise-grade security and compliance.",
    accent: "green",
  },
  {
    icon: BrainCircuit,
    title: "AI Powered Insights",
    description: "Smarter decisions with real-time analytics.",
    accent: "pink",
  },
  {
    icon: Cloud,
    title: "Cloud Ready",
    description: "Available on cloud or on-premise.",
    accent: "cyan",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access anywhere, anytime.",
    accent: "orange",
  },
];

export interface EnterpriseCapabilitiesProps {
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: string;
  items?: Capability[];
}

export function EnterpriseCapabilities({
  eyebrow = "Built for the Modern Enterprise",
  title = "Everything You Need to Move Fast",
  subtitle = "The operating advantages that come standard with every MetaDev engagement.",
  items = DEFAULT_CAPABILITIES,
}: EnterpriseCapabilitiesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const timelineRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 55%"],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });
  const travelProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.4,
  });
  const travelTop = useTransform(travelProgress, [0, 1], ["0%", "100%"]);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [flashIndex, setFlashIndex] = useState(-1);
  useMotionValueEvent(travelProgress, "change", (value) => {
    const nextIndex = Math.round(value * (items.length - 1));
    setActiveIndex((current) => {
      if (nextIndex !== current) setFlashIndex(nextIndex);
      return nextIndex;
    });
  });

  return (
    <Section bordered className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={sectionRef}>
        {/* ---------- Header ---------- */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div className={styles.eyebrowRow} variants={headerItemVariants}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowPill}>
              <Sparkles size={13} aria-hidden="true" />
              {eyebrow}
            </span>
            <span className={styles.eyebrowLine} />
          </motion.div>
          <motion.h2 className={styles.title} variants={headerItemVariants}>
            {title}
          </motion.h2>
          <motion.p className={styles.subtitle} variants={headerItemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Timeline ---------- */}
        <ol ref={timelineRef} className={styles.timeline}>
          <div className={styles.line} aria-hidden="true">
            <motion.span className={styles.lineProgress} style={{ scaleY: lineScale }} />
            <motion.span className={styles.travelDot} style={{ top: travelTop }} />
          </div>

          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                className={cn(styles.item, styles[`accent-${item.accent}`])}
                variants={itemVariants}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.45, margin: "-10% 0px -10% 0px" }}
              >
                <div className={styles.marker} aria-hidden="true">
                  <motion.span className={styles.markerPing} variants={markerPingVariants} />
                  <motion.span
                    className={cn(
                      styles.markerDot,
                      index <= activeIndex && styles.markerDotLit,
                      index === flashIndex && styles.markerDotFlash,
                    )}
                    variants={markerDotVariants}
                  />
                  <motion.span className={styles.connector} variants={connectorVariants} custom={index} />
                </div>

                <motion.div className={styles.card} variants={cardVariants} custom={index}>
                  <motion.span className={styles.cardNumWrap} variants={ghostVariants} aria-hidden="true">
                    <span className={styles.cardNum}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.span>
                  <span className={styles.cardIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardDesc}>{item.description}</p>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

export default EnterpriseCapabilities;
