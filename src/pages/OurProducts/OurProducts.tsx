import { memo, useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  LayoutGroup,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  ArrowRight,
  Rocket,
  Clock,
  ShieldCheck,
  Headset,
  Users,
  Sparkles,
  Workflow,
  Share2,
  BrainCircuit,
  Cloud,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { GlassCard } from '@/components/common/GlassCard';
import { IconCircle } from '@/components/common/IconCircle';
import { GradientDefs } from '@/components/common/GradientDefs';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { Button } from '@/components/common/Button';
import { ProductShowcase } from '@/components/common/ProductShowcase';
import { fadeUp, staggerContainer } from '@/constants/motion';
import { PRODUCTS, type ProductAccent, type ProductMeta } from '@/constants/products';
import { cn } from '@/utils/cn';
import { SHOWCASE_PRODUCTS } from './showcaseData';
import styles from './OurProducts.module.css';

/* ------------------------------------------------------------------ */
/* Hero stats + capabilities                                           */
/* ------------------------------------------------------------------ */

interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { icon: Rocket, value: '11', label: 'Flagship Products' },
  { icon: Clock, value: '99.9%', label: 'System Uptime' },
  { icon: Users, value: '5M+', label: 'Users Empowered' },
  { icon: ShieldCheck, value: '100%', label: 'Cloud Ready' },
  { icon: Headset, value: '24/7', label: 'Support & Maintenance' },
  { icon: Cloud, value: '15+', label: 'Industries Served' },
];

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: Workflow,
    title: 'Integrated Ecosystem',
    description: 'All products work seamlessly together',
  },
  {
    icon: Share2,
    title: 'Scalable & Flexible',
    description: 'Grows with your business needs',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by Design',
    description: 'Enterprise-grade security and compliance',
  },
  {
    icon: BrainCircuit,
    title: 'AI Powered Insights',
    description: 'Smarter decisions with real-time analytics',
  },
  {
    icon: Cloud,
    title: 'Cloud Ready',
    description: 'Available on cloud or on-premise',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access anywhere, anytime',
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(18, 0.32);

const cardHoverVariants: Variants = {
  rest: { y: 0, scale: 1, zIndex: 0 },
  hover: { y: -6, scale: 1.015, zIndex: 1 },
};

const cardSpring = { type: 'spring', stiffness: 350, damping: 30, mass: 0.8 } as const;

const highlightSpring = { type: 'spring', stiffness: 320, damping: 30, mass: 0.9 } as const;

/* ------------------------------------------------------------------ */
/* Product card                                                        */
/* ------------------------------------------------------------------ */

interface ProductCardProps {
  product: ProductMeta;
  index: number;
  active: boolean;
  highlighted: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onFocusStart: (id: string) => void;
  onFocusEnd: () => void;
}

const ProductCard = memo(function ProductCard({
  product,
  index,
  active,
  highlighted,
  onHoverStart,
  onHoverEnd,
  onFocusStart,
  onFocusEnd,
}: ProductCardProps) {
  const Icon = product.icon;
  const accent = product.accent as ProductAccent;
  const reducedMotion = useReducedMotion();

  const highlightTransition = reducedMotion
    ? { duration: 0 }
    : { layout: highlightSpring, opacity: { duration: 0.22, ease: 'easeOut' as const } };

  return (
    <motion.li
      className={cn(styles.card, styles[`accent-${accent}`])}
      variants={itemVariants}
      onMouseEnter={() => onHoverStart(product.id)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onFocusStart(product.id)}
      onBlur={onFocusEnd}
    >
      <motion.div
        className={styles.cardHover}
        variants={cardHoverVariants}
        initial="rest"
        animate={active ? 'hover' : 'rest'}
        transition={reducedMotion ? { duration: 0 } : cardSpring}
        style={{ willChange: active ? 'transform' : 'auto' }}
      >
        <GlassCard
          as="div"
          className={cn(styles.cardInner, active && styles.cardInnerActive)}
        >
          {highlighted && (
            <motion.div
              layoutId="products-hover-highlight"
              className={styles.cardHighlight}
              aria-hidden="true"
              animate={{ opacity: active ? 1 : 0 }}
              transition={highlightTransition}
            />
          )}
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={cn(styles.cardNumber, active && styles.cardNumberActive)}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <motion.div
                className={styles.iconWrapper}
                animate={active ? { scale: 1.08 } : { scale: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 400, damping: 25 }
                }
              >
                <IconCircle size="xs" rounded="sm" variant="gradient">
                  <Icon size={16} stroke={`url(#grad-${accent})`} aria-hidden="true" />
                </IconCircle>
              </motion.div>
            </div>

            <motion.h3
              className={styles.cardName}
              animate={active ? { color: 'rgb(var(--accent))' } : { color: 'var(--color-text)' }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: 'easeOut' }}
            >
              {product.name}
            </motion.h3>
            <p className={styles.cardDesc}>{product.subtitle}</p>

            <Link
              to={product.href}
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

/* ------------------------------------------------------------------ */
/* Product grid section (existing content below the showcase)          */
/* ------------------------------------------------------------------ */

function ProductGridSection() {
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
    <Section bordered className={styles.page}>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={containerRef}>
        <div className={styles.leftColumn}>
          {/* ---------- Left: intro ---------- */}
          <motion.div
            className={styles.intro}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
              Our Products
            </motion.span>

            <motion.h1 className={styles.title} variants={itemVariants}>
              Complete Digital Products
              <br />
              <GradientText>Built for Impact.</GradientText>
            </motion.h1>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              MetaDev offers a suite of flagship enterprise products that
              empower organizations to streamline operations, enhance
              productivity, and deliver exceptional experiences.
            </motion.p>
          </motion.div>

          {/* ---------- Stats glass card ---------- */}
          <motion.div
            className={styles.statsPanel}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <div className={styles.statsGrid}>
              {HERO_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={styles.statItem}
                  variants={itemVariants}
                >
                  <IconCircle size="lg" variant="accent">
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

        {/* ---------- Right: products grid ---------- */}
        <div className={styles.showcase}>
          <motion.div
            className={styles.headerRow}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <span className={styles.headerLine} />
            <span className={styles.headerPill}>Our Products (01 – 11)</span>
            <span className={styles.headerLine} />
          </motion.div>

          <LayoutGroup>
            <motion.ul
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              role="list"
              aria-label="MetaDev products"
              onMouseLeave={handleHoverEnd}
              onBlur={handleFocusEnd}
            >
              {PRODUCTS.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  active={activeId === product.id}
                  highlighted={highlightId === product.id}
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

      <Container maxWidth="wide" className={styles.capabilityRow}>
        <motion.div
          className={styles.capabilityHeader}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.capabilityHeaderLine} />
          <span className={styles.capabilityHeaderPill}>
            <Sparkles size={13} aria-hidden="true" />
            Built for the Modern Enterprise
          </span>
          <span className={styles.capabilityHeaderLine} />
        </motion.div>

        <motion.ul
          className={styles.capabilityStrip}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {CAPABILITIES.map((cap) => (
            <motion.li
              key={cap.title}
              className={styles.capabilityItem}
              variants={itemVariants}
            >
              <span className={styles.capabilityIcon}>
                <cap.icon size={16} aria-hidden="true" />
              </span>
              <div className={styles.capabilityText}>
                <span className={styles.capabilityTitle}>{cap.title}</span>
                <span className={styles.capabilityDesc}>{cap.description}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      <div className={styles.ctaRow}>
        <Button to="/contact" variant="gradient" size="md">
          Talk to Our Team
        </Button>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function OurProductsPage() {
  return (
    <>
      <ProductShowcase products={SHOWCASE_PRODUCTS} showHeader={false} fullscreen />
      <ProductGridSection />
    </>
  );
}
