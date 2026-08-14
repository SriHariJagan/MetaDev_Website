// JourneyTimeline.tsx — company journey timeline for the About Us page
import { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  type Variants,
} from 'framer-motion';
import {
  BrainCircuit,
  Code2,
  Globe,
  Layers,
  Rocket,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './JourneyTimeline.module.css';

const MOBILE_BREAKPOINT_PX = 1024;

const containerVariants = staggerContainer(0.1);

/* Header items blur-to-sharp in */
const headerItemVariants = blurUp(20, 0.5, 8);

/* Item reveals its children in sequence: marker pops, then card slides in */
const itemVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/* Marker pops with a spring */
const markerDotVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 18 },
  },
};

/* One expanding ping ring after the marker lands */
const markerPingVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0.8 },
  visible: {
    scale: 2,
    opacity: 0,
    transition: { duration: 1.1, ease: 'easeOut', delay: 0.15 },
  },
};

/* Card slides in from its own side of the timeline */
const cardVariants: Variants = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: custom % 2 === 0 ? -36 : 36,
    y: 10,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { type: 'spring', stiffness: 95, damping: 18 },
  },
};

/* Connector line extends from the marker toward the card */
const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.2 },
  },
};

/* Corner glow fades/scales in behind the card (its blur is CSS-only,
   so animating opacity/scale here won't fight the static filter). */
const glowVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
};

interface Milestone {
  year: string;
  icon: LucideIcon;
  title: string;
  description: string;
  status: string;
  accent: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2018',
    icon: Code2,
    title: 'The Spark',
    description:
      'Metadev was founded with a simple belief — great software changes businesses. Three engineers, one shared vision.',
    status: 'Studio founded',
    accent: 'accent-blue',
  },
  {
    year: '2019',
    icon: Rocket,
    title: 'First Enterprise Clients',
    description:
      'Our first partnerships with growing businesses — and the trust that has shaped everything since.',
    status: 'First clients onboarded',
    accent: 'accent-cyan',
  },
  {
    year: '2020',
    icon: Globe,
    title: 'Going Global',
    description:
      'Expanded across borders and began shipping products for clients around the world.',
    status: 'International reach',
    accent: 'accent-green',
  },
  {
    year: '2021',
    icon: Workflow,
    title: 'MetaFlow Launches',
    description:
      'Released MetaFlow, our first enterprise platform, built to handle real-world complexity at scale.',
    status: 'Platform launched',
    accent: 'accent-violet',
  },
  {
    year: '2022',
    icon: BrainCircuit,
    title: 'AI Practice Founded',
    description:
      'Launched our AI and data practice — bringing intelligence into every product we ship.',
    status: 'AI practice live',
    accent: 'accent-amber',
  },
  {
    year: '2023',
    icon: Layers,
    title: 'A Family of Products',
    description:
      'MetaHire, MetaCheck, MetaAdds, MetaGreen and more — one studio, a growing portfolio solving real problems.',
    status: 'Portfolio expanded',
    accent: 'accent-indigo',
  },
  {
    year: '2024',
    icon: TrendingUp,
    title: '100+ Clients & Counting',
    description:
      'Today Metadev is trusted by over 100 clients across industries — and we are just getting started.',
    status: '100+ clients milestone',
    accent: 'accent-rose',
  },
];

export interface JourneyTimelineProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function JourneyTimeline({
  eyebrow = 'Our Journey',
  title = 'The Road So Far',
  subtitle = 'From a small team with big ambitions to a studio trusted by businesses worldwide.',
}: JourneyTimelineProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const timelineRef = useRef<HTMLOListElement>(null);
  const markerRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [curvePath, setCurvePath] = useState('');
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const thresholdsRef = useRef<number[]>([]);
  const [litCount, setLitCount] = useState(0);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

  useMotionValueEvent(lineProgress, 'change', (latest) => {
    const thresholds = thresholdsRef.current;
    let count = 0;
    for (let i = 0; i < thresholds.length; i += 1) {
      if (latest >= thresholds[i]) count += 1;
    }
    setLitCount((prev) => (prev === count ? prev : count));
  });

  useLayoutEffect(() => {
    const container = timelineRef.current;
    if (!container) return;

    const measure = () => {
      const containerRect = container.getBoundingClientRect();
      const points = markerRefs.current
        .filter((el): el is HTMLSpanElement => Boolean(el))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            x: rect.left + rect.width / 2 - containerRect.left,
            y: rect.top + rect.height / 2 - containerRect.top,
          };
        });

      if (points.length < 2) return;

      const isMobile = window.innerWidth <= MOBILE_BREAKPOINT_PX;
      const amplitude = isMobile ? 0 : Math.min(containerRect.width * 0.14, 84);

      let d = `M ${points[0].x} ${points[0].y}`;
      const segmentLengths: number[] = [0];
      for (let i = 1; i < points.length; i += 1) {
        const prev = points[i - 1];
        const point = points[i];
        const direction = i % 2 === 1 ? 1 : -1;
        const bendX = prev.x + direction * amplitude;
        const midY1 = prev.y + (point.y - prev.y) * 0.35;
        const midY2 = prev.y + (point.y - prev.y) * 0.65;
        d += ` C ${bendX} ${midY1}, ${bendX} ${midY2}, ${point.x} ${point.y}`;

        const chord = Math.hypot(point.x - prev.x, point.y - prev.y);
        segmentLengths.push(segmentLengths[i - 1] + chord);
      }

      const total = segmentLengths[segmentLengths.length - 1] || 1;
      // Marker lights up slightly before the drawing line visually reaches it.
      thresholdsRef.current = segmentLengths.map((len) => Math.max(0, len / total - 0.02));

      setCurvePath(d);
      setSvgSize({ width: containerRect.width, height: containerRect.height });
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(container);
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
      window.removeEventListener('load', measure);
    };
  }, []);

  return (
    <Section className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={sectionRef}>
        {/* ---------- Header ---------- */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.eyebrowLabel} variants={headerItemVariants}>
            {eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={headerItemVariants}>
            {title} <GradientText>→ Now</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={headerItemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Timeline ---------- */}
        <motion.ol
          ref={timelineRef}
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {curvePath && (
            <svg
              className={styles.curveSvg}
              width={svgSize.width}
              height={svgSize.height}
              viewBox={`0 0 ${svgSize.width} ${svgSize.height}`}
              aria-hidden="true"
            >
              <path d={curvePath} className={styles.curvePathBg} />
              <motion.path
                d={curvePath}
                className={styles.curvePathFg}
                style={{ pathLength: lineProgress }}
              />
            </svg>
          )}

          {MILESTONES.map((milestone, i) => {
            const Icon = milestone.icon;
            return (
              <motion.li
                key={milestone.year}
                className={cn(styles.item, styles[milestone.accent])}
                variants={itemVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <div className={styles.marker}>
                  <motion.span className={styles.markerPing} variants={markerPingVariants} aria-hidden="true" />
                  <motion.span
                    ref={(el) => {
                      markerRefs.current[i] = el;
                    }}
                    className={cn(styles.markerIcon, i < litCount && styles.markerLit)}
                    variants={markerDotVariants}
                  >
                    <Icon size={20} aria-hidden="true" />
                  </motion.span>
                  <motion.span className={styles.connector} variants={connectorVariants} custom={i} aria-hidden="true" />
                </div>

                <motion.div className={styles.card} variants={cardVariants} custom={i}>
                  <motion.span className={styles.cardGlow} variants={glowVariants} aria-hidden="true" />
                  <span className={styles.yearPill}>{milestone.year}</span>
                  <h3 className={styles.cardTitle}>{milestone.title}</h3>
                  <p className={styles.cardDesc}>{milestone.description}</p>
                  <span className={styles.statusPill}>{milestone.status}</span>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>
      </Container>
    </Section>
  );
}

export default JourneyTimeline;
