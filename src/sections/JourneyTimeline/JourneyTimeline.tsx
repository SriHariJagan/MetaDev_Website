// JourneyTimeline.tsx — company journey timeline for the About Us page
import { useRef } from 'react';
import {
  motion,
  useInView,
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

const containerVariants = staggerContainer(0.1);

/* Header items blur-to-sharp in */
const headerItemVariants = blurUp(20, 0.5, 8);

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
    transition: { type: 'spring', stiffness: 320, damping: 18 },
  },
};

/* One expanding ping ring after the dot lands */
const markerPingVariants: Variants = {
  hidden: { scale: 0.5, opacity: 0.8 },
  visible: {
    scale: 2.4,
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

/* Connector line extends from the dot toward the card */
const connectorVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.2 },
  },
};

/* Ghost year blurs in softly behind the card */
const ghostVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 },
  },
};

interface Milestone {
  year: string;
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const MILESTONES: Milestone[] = [
  {
    year: '2018',
    icon: Code2,
    title: 'The Spark',
    description:
      'Metadev was founded with a simple belief — great software changes businesses. Three engineers, one shared vision.',
    accent: 'accent-blue',
  },
  {
    year: '2019',
    icon: Rocket,
    title: 'First Enterprise Clients',
    description:
      'Our first partnerships with growing businesses — and the trust that has shaped everything since.',
    accent: 'accent-cyan',
  },
  {
    year: '2020',
    icon: Globe,
    title: 'Going Global',
    description:
      'Expanded across borders and began shipping products for clients around the world.',
    accent: 'accent-green',
  },
  {
    year: '2021',
    icon: Workflow,
    title: 'MetaFlow Launches',
    description:
      'Released MetaFlow, our first enterprise platform, built to handle real-world complexity at scale.',
    accent: 'accent-violet',
  },
  {
    year: '2022',
    icon: BrainCircuit,
    title: 'AI Practice Founded',
    description:
      'Launched our AI and data practice — bringing intelligence into every product we ship.',
    accent: 'accent-amber',
  },
  {
    year: '2023',
    icon: Layers,
    title: 'A Family of Products',
    description:
      'MetaHire, MetaCheck, MetaAdds, MetaGreen and more — one studio, a growing portfolio solving real problems.',
    accent: 'accent-indigo',
  },
  {
    year: '2024',
    icon: TrendingUp,
    title: '100+ Clients & Counting',
    description:
      'Today Metadev is trusted by over 100 clients across industries — and we are just getting started.',
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
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  });

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
          <div className={styles.line} aria-hidden="true">
            <motion.span className={styles.lineProgress} style={{ scaleY: lineScale }} />
          </div>

          {MILESTONES.map((milestone, i) => {
            const Icon = milestone.icon;
            return (
              <motion.li
                key={milestone.year}
                className={cn(styles.item, styles[milestone.accent])}
                variants={itemVariants}
                custom={i}
              >
                <div className={styles.marker} aria-hidden="true">
                  <motion.span className={styles.markerPing} variants={markerPingVariants} />
                  <motion.span className={styles.markerDot} variants={markerDotVariants} />
                  <motion.span className={styles.connector} variants={connectorVariants} custom={i} />
                </div>

                <motion.div className={styles.card} variants={cardVariants} custom={i}>
                  <motion.span className={styles.cardYearWrap} variants={ghostVariants} aria-hidden="true">
                    <span className={styles.cardYear}>{milestone.year}</span>
                  </motion.span>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardIcon}>
                      <Icon size={16} aria-hidden="true" />
                    </span>
                    <span className={styles.yearPill}>{milestone.year}</span>
                  </div>
                  <h3 className={styles.cardTitle}>{milestone.title}</h3>
                  <p className={styles.cardDesc}>{milestone.description}</p>
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
