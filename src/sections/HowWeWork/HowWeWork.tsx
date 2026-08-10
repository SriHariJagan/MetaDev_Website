// HowWeWork.tsx — how the team works, four culture cards
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  MoonStar,
  Rocket,
  Users,
  Globe2,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './HowWeWork.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

interface Principle {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  stat: string;
  statLabel: string;
}

const PRINCIPLES: Principle[] = [
  {
    icon: Globe2,
    title: 'Global Team',
    description:
      'Six countries, one standard. We hire the best person for the work, wherever they are.',
    accent: 'accent-blue',
    stat: '6',
    statLabel: 'Countries',
  },
  {
    icon: MoonStar,
    title: 'Async by Default',
    description:
      'Deep work beats busy chat. Decisions are written down, documented and easy to catch up on.',
    accent: 'accent-violet',
    stat: '24h',
    statLabel: 'Max response time',
  },
  {
    icon: Users,
    title: 'Small Squads',
    description:
      'Every client works with a focused 2-5 person squad — not a rotating cast of strangers.',
    accent: 'accent-teal',
    stat: '2-5',
    statLabel: 'People per project',
  },
  {
    icon: Rocket,
    title: 'Ship Weekly',
    description:
      'Demo every Friday. Ship every week. Momentum is the metric that matters most.',
    accent: 'accent-amber',
    stat: '52',
    statLabel: 'Demos a year',
  },
];

export interface HowWeWorkProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function HowWeWork({
  eyebrow = 'How We Work',
  title = 'Built for deep work',
  subtitle = 'Four rules we refuse to bend — they are why our team stays sharp and our clients stay happy.',
}: HowWeWorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <Section className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
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
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            {eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            {title} <GradientText>→ No Rules Off</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Principle cards ---------- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {PRINCIPLES.map((principle) => {
            const Icon = principle.icon;
            return (
              <motion.article
                key={principle.title}
                className={cn(styles.card, styles[principle.accent])}
                variants={itemVariants}
              >
                <div className={styles.cardHead}>
                  <span className={styles.cardIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span className={styles.cardStat}>
                    <strong className={styles.cardStatValue}>{principle.stat}</strong>
                    <span className={styles.cardStatLabel}>{principle.statLabel}</span>
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{principle.title}</h3>
                <p className={styles.cardDesc}>{principle.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

export default HowWeWork;
