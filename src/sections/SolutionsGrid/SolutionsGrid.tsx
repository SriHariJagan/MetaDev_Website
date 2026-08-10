// SolutionsGrid.tsx — unique card grid for solutions we deliver
import { memo, useRef, useState, useCallback, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, LayoutGroup, useReducedMotion, type Variants } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
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
import type { SolutionMeta } from "@/types";
import styles from "./SolutionsGrid.module.css";

export interface SolutionsGridProps {
  solutions: SolutionMeta[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

const containerVariants = staggerContainer(0.06);
const itemVariants = fadeUp(18, 0.32);

const cardHoverVariants: Variants = {
  rest: { y: 0, scale: 1, zIndex: 0 },
  hover: { y: -8, scale: 1.02, zIndex: 1 },
};

const cardSpring = { type: "spring", stiffness: 350, damping: 30, mass: 0.8 } as const;
const highlightSpring = { type: "spring", stiffness: 320, damping: 30, mass: 0.9 } as const;

interface SolutionCardProps {
  solution: SolutionMeta;
  index: number;
  active: boolean;
  highlighted: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onFocusStart: (id: string) => void;
  onFocusEnd: () => void;
}

const SolutionCard = memo(function SolutionCard({
  solution,
  index,
  active,
  highlighted,
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
      onMouseEnter={() => onHoverStart(solution.slug)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onFocusStart(solution.slug)}
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
                {String(index + 1).padStart(2, "0")}
              </span>
              <motion.div
                className={styles.iconWrapper}
                animate={active ? { scale: 1.1 } : { scale: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 25 }
                }
              >
                <IconCircle size="xs" rounded="sm" variant="gradient">
                  <Icon size={16} stroke={`url(#grad-${solution.accent})`} aria-hidden="true" />
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
            <p className={styles.cardDesc}>{solution.tagline}</p>

            <ul className={styles.featureList}>
              {solution.points.slice(0, 4).map((point) => (
                <li key={point} className={styles.featureItem}>
                  <span className={styles.featureIcon}>
                    <CheckCircle2
                      size={14}
                      stroke={`url(#grad-${solution.accent})`}
                      aria-hidden="true"
                    />
                  </span>
                  <span className={styles.featureText}>{point}</span>
                </li>
              ))}
            </ul>

            <Link
              to={solution.slug || `/solutions/${solution.slug}`}
              className={cn(styles.cardLink, active && styles.cardLinkActive)}
            >
              Explore
              <ArrowRight
                size={11}
                className={styles.cardLinkArrow}
                aria-hidden="true"
              />
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </motion.li>
  );
});

SolutionCard.displayName = "SolutionCard";

export function SolutionsGrid({
  solutions,
  eyebrow = "Solutions We Deliver",
  title = (
    <>
      End-to-end digital solutions engineered with
      <br />
      <GradientText>modern technology</GradientText>
    </>
  ),
  subtitle = "Built to scale with your ambitions — from concept to production.",
  className,
}: SolutionsGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
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
    <Section className={cn(styles.root, className)}>
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
        {/* ---------- Header ---------- */}
        <motion.div
          className={styles.header}
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

          <motion.h2 className={styles.title} variants={itemVariants}>
            {title}
          </motion.h2>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Solutions grid ---------- */}
        <LayoutGroup>
          <motion.ul
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            role="list"
            aria-label="Digital solutions"
            onMouseLeave={handleHoverEnd}
            onBlur={handleFocusEnd}
          >
            {solutions.map((solution, index) => (
              <SolutionCard
                key={solution.slug}
                solution={solution}
                index={index}
                active={activeId === solution.slug}
                highlighted={highlightId === solution.slug}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                onFocusStart={handleFocusStart}
                onFocusEnd={handleFocusEnd}
              />
            ))}
          </motion.ul>
        </LayoutGroup>
      </Container>
    </Section>
  );
}

export default SolutionsGrid;