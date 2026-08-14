import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  Settings,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { fadeUp, staggerContainer } from "@/constants/motion";
import { cn } from "@/utils/cn";
import styles from "./BusinessImpactPanel.module.css";

type Accent = "blue" | "cyan" | "violet" | "orange";
type NodeAccent = "cyan" | "green" | "violet" | "amber" | "blue" | "rose" | "indigo";

const containerVariants = staggerContainer(0.06);
const itemVariants = fadeUp(18, 0.32);

export interface ProgressItem {
  icon: LucideIcon;
  accent: Accent;
  label: string;
  value: number;
}

const DEFAULT_PROGRESS: ProgressItem[] = [
  { icon: Zap, accent: "blue", label: "Faster implementation", value: 90 },
  { icon: Settings, accent: "cyan", label: "Less manual work", value: 78 },
  { icon: Database, accent: "violet", label: "Unified business data", value: 86 },
  { icon: BarChart3, accent: "orange", label: "Better decisions", value: 68 },
];

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

export interface BusinessImpactPanelProps {
  title?: string;
  badgeLabel?: string;
  items?: ProgressItem[];
  className?: string;
}

export function BusinessImpactPanel({
  title = "Business Impact",
  badgeLabel = "Built to scale",
  items = DEFAULT_PROGRESS,
  className,
}: BusinessImpactPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      className={cn(styles.impactPanel, className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className={styles.impactHead}>
        <h3 className={styles.impactTitle}>{title}</h3>
        <span className={styles.builtBadge}>{badgeLabel}</span>
      </div>

      <ul className={styles.progressList}>
        {items.map((item) => (
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
                animate={isInView ? { width: `${item.value}%` } : { width: 0 }}
                transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </motion.li>
        ))}
      </ul>

      <OrbitGraphic inView={isInView} />
    </motion.div>
  );
}
