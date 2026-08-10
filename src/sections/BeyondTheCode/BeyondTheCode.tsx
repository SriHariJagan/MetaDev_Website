// BeyondTheCode.tsx — studio culture sticker wall + interests marquee for the About Us page
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen,
  Cloud,
  Code2,
  Coffee,
  Compass,
  Gamepad2,
  LayoutGrid,
  Mic,
  Monitor,
  Mountain,
  Palette,
  Piano,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { GradientDefs } from '@/components/common/GradientDefs';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { InfiniteMarquee, type MarqueeItem } from '@/components/common/InfiniteMarquee';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './BeyondTheCode.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

interface Hobby {
  icon: LucideIcon;
  title: string;
  note: string;
  accent: string;
  tilt: string;
}

const HOBBIES: Hobby[] = [
  {
    icon: Code2,
    title: 'Hackathons',
    note: '48-hour build sprints',
    accent: 'accent-violet',
    tilt: styles.tiltLeft,
  },
  {
    icon: Mountain,
    title: 'Team Retreats',
    note: 'Offsites & mountain air',
    accent: 'accent-green',
    tilt: styles.tiltRight,
  },
  {
    icon: Monitor,
    title: 'Friday Demos',
    note: 'Ship-it celebrations',
    accent: 'accent-blue',
    tilt: styles.tiltLeft,
  },
  {
    icon: Gamepad2,
    title: 'Game Nights',
    note: 'Friendly rivalry',
    accent: 'accent-rose',
    tilt: styles.tiltRight,
  },
  {
    icon: Coffee,
    title: 'Coffee & Collabs',
    note: 'The idea corner',
    accent: 'accent-amber',
    tilt: styles.tiltLeft,
  },
  {
    icon: BookOpen,
    title: 'Learning Sprints',
    note: 'Weekly growth time',
    accent: 'accent-cyan',
    tilt: styles.tiltRight,
  },
];

const INTERESTS: MarqueeItem[] = [
  { id: 'open-source', label: 'Open Source', icon: Code2, accent: 'green' },
  { id: 'ai-research', label: 'AI Research', icon: Sparkles, accent: 'violet' },
  { id: 'design-systems', label: 'Design Systems', icon: LayoutGrid, accent: 'indigo' },
  { id: 'cloud-eng', label: 'Cloud Engineering', icon: Cloud, accent: 'blue' },
  { id: 'third-wave', label: 'Third-Wave Coffee', icon: Coffee, accent: 'amber' },
  { id: 'pixel-art', label: 'Pixel Art', icon: Palette, accent: 'rose' },
  { id: 'new-frameworks', label: 'New Frameworks', icon: Compass, accent: 'orange' },
  { id: 'tech-podcasts', label: 'Tech Podcasts', icon: Mic, accent: 'cyan' },
  { id: 'synths', label: 'Old Synths', icon: Piano, accent: 'pink' },
];

export interface BeyondTheCodeProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function BeyondTheCode({
  eyebrow = 'Life at Metadev',
  title = 'Beyond the Code',
  subtitle = 'The culture behind the products — how our team stays curious, connected and energized.',
}: BeyondTheCodeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <Section className={styles.root}>
      <GradientDefs />
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
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            {eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            {title} <GradientText>→ Life at the Studio</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Sticker wall ---------- */}
        <motion.ul
          className={styles.wall}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {HOBBIES.map((hobby) => {
            const Icon = hobby.icon;
            return (
              <motion.li
                key={hobby.title}
                className={cn(styles.stickerWrap, hobby.tilt, styles[hobby.accent])}
                variants={itemVariants}
              >
                <article className={styles.sticker}>
                  <span className={styles.stickerIcon}>
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <h3 className={styles.stickerTitle}>{hobby.title}</h3>
                  <p className={styles.stickerNote}>{hobby.note}</p>
                  <span className={styles.stickerDots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </article>
              </motion.li>
            );
          })}
        </motion.ul>

        {/* ---------- Interests marquee ---------- */}
        <motion.div
          className={styles.marqueeBlock}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <div className={styles.marqueeHeader}>
            <span className={styles.marqueeLine} aria-hidden="true" />
            <span className={styles.marqueePill}>
              <span className={styles.marqueePillDot} aria-hidden="true" />
              Also into
            </span>
            <span className={styles.marqueeLine} aria-hidden="true" />
          </div>
          <InfiniteMarquee items={INTERESTS} speed={32} itemWidth={230} gap={14} />
        </motion.div>
      </Container>
    </Section>
  );
}

export default BeyondTheCode;
