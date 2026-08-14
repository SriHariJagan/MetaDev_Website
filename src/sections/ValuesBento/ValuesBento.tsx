// ValuesBento.tsx — values & principles bento grid for the About Me page
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Feather,
  Gem,
  HeartHandshake,
  Heart,
  ShieldCheck,
  Sparkles,
  Sprout,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './ValuesBento.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  featured?: boolean;
}

const VALUES: Value[] = [
  {
    icon: Gem,
    title: 'Craft Over Shortcuts',
    description:
      'Every pixel and every line of code gets the attention it deserves — quality is the fastest way to build trust.',
    accent: 'accent-blue',
  },
  {
    icon: Sparkles,
    title: 'The Non-Negotiables',
    description:
      'Ship with honesty, build with care, stay endlessly curious. Great products are built on small, deliberate choices made every single day.',
    accent: 'accent-violet',
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: 'Honesty First',
    description:
      'Straight answers, realistic timelines and no surprises — even when the truth is inconvenient.',
    accent: 'accent-green',
  },
  {
    icon: Heart,
    title: 'Client Obsession',
    description:
      'Every product is built around the people who use it — empathy drives every design decision.',
    accent: 'accent-amber',
  },
  {
    icon: Feather,
    title: 'Simple Over Clever',
    description:
      'The best code is the code nobody has to explain. We optimize for readability and maintainability.',
    accent: 'accent-cyan',
  },
  {
    icon: Zap,
    title: 'Learn Fast, Ship Faster',
    description:
      'New tools, new patterns, new ideas — we experiment constantly and bring what works into production.',
    accent: 'accent-indigo',
  },
  {
    icon: Sprout,
    title: 'Long-Term Thinking',
    description:
      'Decisions made today should still look smart in five years — for the code and for the partnership.',
    accent: 'accent-rose',
  },
  {
    icon: HeartHandshake,
    title: 'People First',
    description:
      'Great work comes from happy teams — we protect focus, balance and wellbeing across the studio.',
    accent: 'accent-teal',
  },
];

export interface ValuesBentoProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function ValuesBento({
  eyebrow = 'Our Values',
  title = 'How We Work',
  subtitle = 'The principles behind every project we touch — the things we will never compromise on.',
}: ValuesBentoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

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
            {title} <GradientText>→ Principles</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Bento grid ---------- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {VALUES.map((value, i) => {
            const Icon = value.icon;
            if (value.featured) {
              return (
                <motion.article
                  key={value.title}
                  className={cn(styles.card, styles.featured, styles[value.accent])}
                  variants={itemVariants}
                >
                  <span className={styles.featuredQuote} aria-hidden="true">
                    &ldquo;
                  </span>
                  <span className={styles.featuredIcon}>
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <span className={styles.featuredLabel}>The Non-Negotiables</span>
                  <p className={styles.featuredQuoteText}>{value.description}</p>
                  <span className={styles.featuredSign}>— The Metadev Team</span>
                </motion.article>
              );
            }
            return (
              <motion.article
                key={value.title}
                className={cn(styles.card, styles[value.accent])}
                variants={itemVariants}
              >
                <span className={styles.cardNumber} aria-hidden="true">
                  {String(i).padStart(2, '0')}
                </span>
                <span className={styles.cardIcon}>
                  <Icon size={16} aria-hidden="true" />
                </span>
                <h3 className={styles.cardTitle}>{value.title}</h3>
                <p className={styles.cardDesc}>{value.description}</p>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

export default ValuesBento;
