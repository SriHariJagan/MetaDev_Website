// ProductShowcase.tsx
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { IconButton } from '@/components/common/IconButton';
import { GradientDefs } from '@/components/common/GradientDefs';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { Button } from '@/components/common/Button';
import { fadeUp, staggerContainer } from '@/constants/motion';
import type { ProductAccent } from '@/constants/products';
import { cn } from '@/utils/cn';
import styles from './ProductShowcase.module.css';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface ShowcaseStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

export interface ShowcaseProduct {
  id: string;
  name: string;
  icon: LucideIcon;
  accent: ProductAccent;
  tagline: string;
  description: string;
  features: string[];
  stats: ShowcaseStat[];
  href: string;
}

export interface ProductShowcaseProps {
  products: ShowcaseProduct[];
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  autoplayMs?: number;
  showHeader?: boolean;
  fullscreen?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */
/* Animations                                                          */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(16, 0.3);

/* ------------------------------------------------------------------ */
/* Slide — left: key features + stats · right: identity panel          */
/* ------------------------------------------------------------------ */

interface SlideProps {
  product: ShowcaseProduct;
}

function Slide({ product }: SlideProps) {
  const Icon = product.icon;
  const accent = product.accent;

  return (
    <div className={cn(styles.slide, styles[`accent-${accent}`])}>
      {/* ---------- Left: key features ---------- */}
      <div className={styles.featuresSide}>
        <span className={styles.eyebrowLabel}>Key Features</span>

        <h3 className={styles.featuresHeading}>
          Capabilities That
          <br />
          <GradientText>Drive Impact</GradientText>
        </h3>

        <ul className={styles.featureGrid}>
          {product.features.slice(0, 4).map((feature) => (
            <li key={feature} className={styles.featureCard}>
              <span className={styles.featureIcon}>
                <CheckCircle2 size={16} aria-hidden="true" />
              </span>
              <span className={styles.featureText}>{feature}</span>
            </li>
          ))}
        </ul>

        <div className={styles.statsRow}>
          {product.stats.map((stat) => (
            <div key={stat.label} className={styles.statItem}>
              <stat.icon size={16} className={styles.statIcon} aria-hidden="true" />
              <span className={styles.statValue}>
                <GradientText>{stat.value}</GradientText>
              </span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- Right: identity panel ---------- */}
      <div className={styles.identitySide}>
        <div className={styles.identityPanel}>
          <div className={styles.logoChip}>
            <Icon size={38} stroke={`url(#grad-${accent})`} aria-hidden="true" />
          </div>

          <h3 className={styles.productName}>
            <GradientText>{product.name}</GradientText>
          </h3>
          <span className={styles.productTagline}>{product.tagline}</span>

          <p className={styles.productDesc}>{product.description}</p>

          <Button to={product.href} variant="gradient" size="sm">
            Explore {product.name}
            <ArrowRight size={14} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

export function ProductShowcase({
  products,
  eyebrow = 'Our Products',
  title = (
    <>
      A Glimpse Into Our
      <br />
      <GradientText>Product Ecosystem</GradientText>
    </>
  ),
  subtitle = 'Powerful, scalable and AI-driven platforms engineered to transform industries and empower millions of lives.',
  autoplayMs = 5000,
  showHeader = true,
  fullscreen = false,
  className,
}: ProductShowcaseProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(stageRef, { once: false, amount: 0.1 });
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const paused = useRef(false);
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const product = products[index];
  const count = products.length;

  const goTo = useCallback(
    (target: number) => {
      const next = ((target % count) + count) % count;
      setDirection(next > index || (next === 0 && index === count - 1) ? 1 : -1);
      setIndex(next);
    },
    [count, index],
  );

  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  useEffect(() => {
    if (reduceMotion.current) return;
    if (count <= 1) return;

    const id = window.setInterval(() => {
      if (paused.current) return;
      setDirection(1);
      setIndex((current) => (current + 1) % count);
    }, autoplayMs);

    return () => window.clearInterval(id);
  }, [count, autoplayMs]);

  return (
    <Section className={cn(styles.root, fullscreen && styles.fullscreen, className)}>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container}>
        {/* ---------- Header ---------- */}
        {showHeader && (
          <motion.div
            className={styles.header}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
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
        )}
      </Container>

      {/* ---------- Glass stage (full width) ---------- */}
      <motion.div
        ref={stageRef}
        className={styles.stage}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
          <motion.div className={styles.frame} variants={itemVariants}>
            <IconButton
              label="Previous product"
              className={styles.navButtonLeft}
              onClick={prev}
            >
              <ChevronLeft size={18} />
            </IconButton>

            <div className={styles.viewport}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={product.id}
                  className={styles.slideWrap}
                  initial={{ opacity: 0, x: direction * 44 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -44 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                >
                  <Slide product={product} />
                </motion.div>
              </AnimatePresence>
            </div>

            <IconButton
              label="Next product"
              className={styles.navButtonRight}
              onClick={next}
            >
              <ChevronRight size={18} />
            </IconButton>

            {/* Footer: counter + dots */}
            <div className={styles.frameFooter}>
              <span className={styles.counter}>
                {String(index + 1).padStart(2, '0')}
                <span className={styles.counterTotal}>
                  {' '}
                  / {String(count).padStart(2, '0')}
                </span>
              </span>

              <div className={styles.dots}>
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-label={`Show ${p.name}`}
                    aria-current={i === index}
                    className={cn(styles.dot, i === index && styles.dotActive)}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <span className={styles.counter} aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>
    </Section>
  );
}

export default ProductShowcase;
