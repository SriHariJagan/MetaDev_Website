// SecurityCompliance.tsx — security/trust section: left copy + feature grid, right orbiting shield visual
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Eye,
  Fingerprint,
  Globe2,
  KeyRound,
  Lock,
  RefreshCw,
  Server,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { Button } from "@/components/common/Button";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { fadeUp, staggerContainer } from "@/constants/motion";
import securityImage from "@/assets/images/security.png";
import styles from "./SecurityCompliance.module.css";

const containerVariants = staggerContainer(0.08);
const itemVariants = fadeUp(20, 0.4);

type Accent = "blue" | "violet" | "green" | "cyan";

interface SecurityFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: Accent;
}

const FEATURES: SecurityFeature[] = [
  {
    icon: Globe2,
    title: "Global Standards",
    description:
      "Built around internationally recognized security frameworks and best practices.",
    accent: "blue",
  },
  {
    icon: RefreshCw,
    title: "Continuous Monitoring",
    description:
      "Regular audits and real-time monitoring keep protection active around the clock.",
    accent: "violet",
  },
  {
    icon: Lock,
    title: "Data Privacy First",
    description:
      "Privacy by design, with robust controls protecting data at every layer.",
    accent: "green",
  },
  {
    icon: ClipboardCheck,
    title: "Audit Ready",
    description:
      "Documented processes and full traceability, ready for review at any time.",
    accent: "cyan",
  },
];

type NodeAccent = "blue" | "violet" | "green" | "cyan" | "amber" | "rose";

function SecurityOrbit({ inView }: { inView: boolean }) {
  const nodes: Array<{
    icon: LucideIcon;
    accent: NodeAccent;
    className: string;
    delay: number;
  }> = [
    { icon: KeyRound, accent: "amber", className: styles.nodeTop, delay: 0 },
    { icon: Fingerprint, accent: "violet", className: styles.nodeUpperLeft, delay: 0.08 },
    { icon: ShieldCheck, accent: "green", className: styles.nodeUpperRight, delay: 0.16 },
    { icon: Server, accent: "blue", className: styles.nodeLeft, delay: 0.24 },
    { icon: Eye, accent: "cyan", className: styles.nodeRight, delay: 0.32 },
    { icon: Lock, accent: "rose", className: styles.nodeBottom, delay: 0.4 },
  ];

  return (
    <motion.div
      className={styles.orbit}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className={styles.orbitCenterGlow} />
      <div className={styles.orbitRingOuter} aria-hidden="true" />
      <div className={styles.orbitRingInner} aria-hidden="true" />

      <motion.img
        src={securityImage}
        alt=""
        className={styles.shieldImage}
        draggable={false}
        aria-hidden="true"
        animate={inView ? { y: [0, -10, 0] } : { y: 0 }}
        transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
      />

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
            <Icon size={19} aria-hidden="true" />
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}

export function SecurityCompliance() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <Section bordered>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container ref={containerRef}>
        <div className={styles.layout}>
          {/* ---------- Left: copy + feature grid ---------- */}
          <motion.div
            className={styles.left}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span className={styles.eyebrow} variants={itemVariants}>
              <span className={styles.eyebrowIcon}>
                <ShieldCheck size={14} aria-hidden="true" />
              </span>
              Security &amp; Trust
            </motion.span>

            <motion.h2 className={styles.title} variants={itemVariants}>
              Built on Trust.{" "}
              <GradientText variant="violet">Secured Everywhere.</GradientText>
            </motion.h2>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              We follow industry-leading security practices and privacy
              principles to keep your platform, data, and users protected at
              every level.
            </motion.p>

            <motion.ul className={styles.features} variants={containerVariants}>
              {FEATURES.map((feature) => (
                <motion.li
                  key={feature.title}
                  className={`${styles.featureItem} ${styles[`accent-${feature.accent}`]}`}
                  variants={itemVariants}
                >
                  <span className={styles.featureIcon}>
                    <feature.icon size={24} aria-hidden="true" />
                  </span>
                  <span className={styles.featureText}>
                    <h3 className={styles.featureTitle}>{feature.title}</h3>
                    <p className={styles.featureDesc}>{feature.description}</p>
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={itemVariants}>
              <Button to="/contact" variant="gradient" size="md">
                Talk to Our Security Team
                <ArrowRight size={16} aria-hidden="true" />
              </Button>
            </motion.div>
          </motion.div>

          {/* ---------- Right: orbiting shield visual ---------- */}
          <div className={styles.right}>
            <SecurityOrbit inView={isInView} />
          </div>
        </div>
      </Container>
    </Section>
  );
}

export default SecurityCompliance;
