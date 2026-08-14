// CareerPerks.tsx — Life at MetaDev: values & culture cards
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Award,
  Clock,
  HeartPulse,
  Rocket,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './CareerPerks.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

type PerkAccent = 'blue' | 'violet' | 'amber' | 'green' | 'rose' | 'cyan';

interface Perk {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: PerkAccent;
}

const PERKS: Perk[] = [
  {
    icon: TrendingUp,
    title: 'Career growth',
    description: 'Clear learning paths, mentorship and opportunities to lead.',
    accent: 'blue',
  },
  {
    icon: Clock,
    title: 'Flexible work',
    description: 'A thoughtful mix of office, hybrid and remote opportunities.',
    accent: 'violet',
  },
  {
    icon: HeartPulse,
    title: 'Health & wellbeing',
    description: 'Health support and policies designed around real life.',
    accent: 'rose',
  },
  {
    icon: Rocket,
    title: 'Meaningful products',
    description: 'Work on technology that improves organisations and communities.',
    accent: 'amber',
  },
  {
    icon: Users,
    title: 'Inclusive culture',
    description: 'Different experiences and ideas are welcomed and respected.',
    accent: 'green',
  },
  {
    icon: Award,
    title: 'Recognition',
    description: 'Great work is seen, celebrated and rewarded consistently.',
    accent: 'cyan',
  },
];

export function CareerPerks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <Section className={styles.root} id="life-at-metadev">
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={sectionRef}>
        <motion.div
          className={styles.split}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* ---------- Left: text + quote ---------- */}
          <motion.div className={styles.textCol} variants={containerVariants}>
            <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
              Life at MetaDev
            </motion.span>
            <motion.h2 className={styles.title} variants={itemVariants}>
              Do your best work — and <GradientText>enjoy the journey</GradientText>
            </motion.h2>
            <motion.p className={styles.subtitle} variants={itemVariants}>
              We create the support, trust and opportunities people need to thrive professionally
              and personally.
            </motion.p>

            <motion.figure className={styles.quote} variants={itemVariants}>
              <blockquote className={styles.quoteText}>
                At MetaDev, your ideas are heard and you are trusted to turn them into something
                meaningful.
              </blockquote>
              <figcaption className={styles.quoteAuthor}>The MetaDev People Team</figcaption>
            </motion.figure>
          </motion.div>

          {/* ---------- Right: value cards ---------- */}
          <motion.div className={styles.grid} variants={containerVariants}>
            {PERKS.map((perk, index) => (
              <motion.article
                key={perk.title}
                className={cn(styles.card, styles[`perk-${perk.accent}`])}
                variants={itemVariants}
              >
                <span className={styles.cardNum} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className={styles.cardIcon}>
                  <perk.icon size={20} aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{perk.title}</h3>
                <p className={styles.cardDesc}>{perk.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default CareerPerks;
