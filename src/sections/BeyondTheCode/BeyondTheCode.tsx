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
}

const HOBBIES: Hobby[] = [
  {
    icon: Code2,
    title: 'Hackathons',
    note: '48-hour build sprints',
    accent: 'accent-violet',
  },
  {
    icon: Mountain,
    title: 'Team Retreats',
    note: 'Offsites & mountain air',
    accent: 'accent-green',
  },
  {
    icon: Monitor,
    title: 'Friday Demos',
    note: 'Ship-it celebrations',
    accent: 'accent-blue',
  },
  {
    icon: Gamepad2,
    title: 'Game Nights',
    note: 'Friendly rivalry',
    accent: 'accent-rose',
  },
  {
    icon: Coffee,
    title: 'Coffee & Collabs',
    note: 'The idea corner',
    accent: 'accent-amber',
  },
  {
    icon: BookOpen,
    title: 'Learning Sprints',
    note: 'Weekly growth time',
    accent: 'accent-cyan',
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
        {/* ---------- Left copy | Right showcase ---------- */}
        <div className={styles.layout}>
          <motion.div
            className={styles.left}
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
            <motion.span className={styles.leftAccentLine} variants={itemVariants} aria-hidden="true" />
          </motion.div>

          <motion.ul
            className={styles.showcase}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <span className={styles.showcaseGlow} aria-hidden="true" />
            {HOBBIES.map((hobby, index) => {
              const Icon = hobby.icon;
              return (
                <motion.li
                  key={hobby.title}
                  className={cn(
                    styles.showcaseItem,
                    styles[hobby.accent],
                    index % 2 === 1 && styles.showcaseItemOffset,
                  )}
                  variants={itemVariants}
                >
                  <motion.div
                    className={styles.showcaseChip}
                    animate={{ y: [0, -7, 0] }}
                    transition={{
                      duration: 3.2 + index * 0.18,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.15,
                    }}
                  >
                    <span className={styles.showcaseIcon}>
                      <Icon size={19} aria-hidden="true" />
                    </span>
                    <span className={styles.showcaseText}>
                      <span className={styles.showcaseTitle}>{hobby.title}</span>
                      <span className={styles.showcaseNote}>{hobby.note}</span>
                    </span>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

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
