// SolutionsShowcase.tsx — solution names as a side stack, detail panel on the right
import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { GradientDefs } from "@/components/common/GradientDefs";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { IconCircle } from "@/components/common/IconCircle";
import { fadeUp, staggerContainer } from "@/constants/motion";
import { INDUSTRIES } from "@/constants/industries";
import type { SolutionMeta } from "@/types";
import { cn } from "@/utils/cn";
import styles from "./SolutionsShowcase.module.css";

const INDUSTRY_BY_LABEL = new Map(
  INDUSTRIES.map((industry) => [industry.label, industry]),
);

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface SolutionsShowcaseProps {
  solutions: SolutionMeta[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Animations                                                          */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.05);

const itemVariants = fadeUp(16, 0.3);

const AUTO_ADVANCE_MS = 4500;

/* ------------------------------------------------------------------ */
/* Detail panel — rendered below the tabs once a solution is selected  */
/* ------------------------------------------------------------------ */

function SolutionPanel({
  solution,
  index,
  count,
}: {
  solution: SolutionMeta;
  index: number;
  count: number;
}) {
  const Icon = solution.icon;

  return (
    <motion.div
      key={solution.slug}
      className={cn(styles.panel, styles[`accent-${solution.accent}`])}
      initial={{ opacity: 0, y: 26, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.99 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className={styles.panelGlow} aria-hidden="true" />

      <div className={styles.panelHeader}>
        <div className={styles.logoChip}>
          <IconCircle size="lg" rounded="sm" variant="gradient">
            <Icon size={24} stroke={`url(#grad-${solution.accent})`} aria-hidden="true" />
          </IconCircle>
        </div>
        <div className={styles.panelHeading}>
          <h2 className={styles.panelName}>{solution.name}</h2>
          <span className={styles.panelTagline}>{solution.tagline}</span>
        </div>
      </div>

      <p className={styles.panelDesc}>{solution.description}</p>

      {/* Key results */}
      <div className={styles.statsRow}>
        {solution.stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className={styles.statBlock}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.12 + i * 0.07,
              ease: "easeOut",
            }}
          >
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </motion.div>
        ))}
      </div>

      {/* What you get */}
      <div className={styles.blockWrap}>
        <span className={styles.blockLabel}>
          <CheckCircle2 size={14} aria-hidden="true" />
          What you get
        </span>
        <ul className={styles.pointList}>
          {solution.points.map((point, i) => (
            <motion.li
              key={point}
              className={styles.pointItem}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: 0.28 + i * 0.05,
                ease: "easeOut",
              }}
            >
              <span className={styles.pointDot} aria-hidden="true" />
              <span className={styles.pointText}>{point}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Built with */}
      <div className={styles.blockWrap}>
        <span className={styles.blockLabel}>Built with</span>
        <ul className={styles.techList}>
          {solution.techStack.map((tech, i) => (
            <motion.li
              key={tech}
              className={styles.techChip}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                delay: 0.42 + i * 0.05,
                ease: "easeOut",
              }}
            >
              {tech}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Industries served */}
      <div className={styles.blockWrap}>
        <span className={styles.blockLabel}>Industries Served</span>
        <ul className={styles.industryList}>
          {solution.industries.map((industry, i) => {
            const industryItem = INDUSTRY_BY_LABEL.get(industry);
            return (
              <motion.li
                key={industry}
                className={styles.industryChip}
                initial={{ opacity: 0, y: 8, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.5 + i * 0.05,
                  ease: "easeOut",
                }}
              >
                {industryItem?.icon && (
                  <industryItem.icon size={12} aria-hidden="true" />
                )}
                <span>{industry}</span>
              </motion.li>
            );
          })}
        </ul>
      </div>

      <div className={styles.panelFooter}>
        <span className={styles.panelMeta}>
          <span className={styles.panelMetaDot} aria-hidden="true" />
          Part of our core stack
        </span>
        <span className={styles.panelIndex}>
          {String(index + 1).padStart(2, "0")}
          <span className={styles.panelIndexTotal}>
            {" "}
            / {String(count).padStart(2, "0")}
          </span>
        </span>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function SolutionsShowcase({
  solutions,
  eyebrow = "Our Solutions",
  title = (
    <>
      Solutions That{" "}
      <GradientText>Transform Business</GradientText>
    </>
  ),
  subtitle = "From ideation to scale — a complete suite of digital solutions engineered to solve real-world challenges.",
  className,
}: SolutionsShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rootRef, { once: false, amount: 0.1 });
  const [selected, setSelected] = useState(0);
  const pausedRef = useRef(false);

  const solution = solutions[selected];
  const count = solutions.length;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      setSelected((current) => (current + 1) % count);
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(id);
  }, [count]);

  return (
    <section className={cn(styles.root, className)}>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={rootRef}>
        {/* ---------- Header ---------- */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            {eyebrow}
          </motion.span>
          <motion.h1 className={styles.title} variants={itemVariants}>
            {title}
          </motion.h1>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Layout: solution names on the left, detail panel on the right ---------- */}
        <div
          className={styles.layout}
          onMouseEnter={() => (pausedRef.current = true)}
          onMouseLeave={() => (pausedRef.current = false)}
        >
          <motion.ul
            className={styles.tabList}
            role="tablist"
            aria-label="Solution navigation"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {solutions.map((s, i) => {
              const TabIcon = s.icon;
              const active = i === selected;
              return (
                <motion.li key={s.slug} variants={itemVariants}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={cn(
                      styles.tab,
                      active && styles.tabActive,
                      styles[`tabAccent-${s.accent}`],
                    )}
                    onClick={() => setSelected(i)}
                  >
                    <span className={styles.tabIconWrap}>
                      <TabIcon size={15} aria-hidden="true" />
                    </span>
                    <span className={styles.tabLabel}>{s.name}</span>
                    {active && <span className={styles.tabDot} aria-hidden="true" />}
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.div
            className={styles.panelStage}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              <SolutionPanel
                key={solution.slug}
                solution={solution}
                index={selected}
                count={count}
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default SolutionsShowcase;
