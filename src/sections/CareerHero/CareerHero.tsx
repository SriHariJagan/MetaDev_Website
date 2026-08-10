// CareerHero.tsx — careers page hero with an ascending "growth staircase" visual
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Compass,
  GraduationCap,
  Hammer,
  HeartPulse,
  Plane,
  Rocket,
  Sprout,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './CareerHero.module.css';

const containerVariants: Variants = staggerContainer(0.08, 0.05);

const itemVariants: Variants = blurUp(24, 0.5, 8);

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.94, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.15 },
  },
};

type StepAccent = 'blue' | 'violet' | 'amber' | 'green';

interface Step {
  icon: LucideIcon;
  title: string;
  accent: StepAccent;
  position: string;
  delay: number;
}

const STEPS: Step[] = [
  { icon: Sprout, title: 'Learn', accent: 'green', position: styles.stepOne, delay: 0 },
  { icon: Hammer, title: 'Build', accent: 'blue', position: styles.stepTwo, delay: 0.3 },
  { icon: Compass, title: 'Lead', accent: 'violet', position: styles.stepThree, delay: 0.6 },
  { icon: Rocket, title: 'Launch', accent: 'amber', position: styles.stepFour, delay: 0.9 },
];

interface Chip {
  icon: LucideIcon;
  label: string;
  accent: string;
  position: string;
  delay: number;
}

const CHIPS: Chip[] = [
  { icon: Plane, label: 'Global Team', accent: 'chip-blue', position: styles.chipTopLeft, delay: 0 },
  { icon: HeartPulse, label: 'Full Wellness', accent: 'chip-rose', position: styles.chipTopRight, delay: 0.5 },
  { icon: GraduationCap, label: 'Learning Budget', accent: 'chip-violet', position: styles.chipBottomRight, delay: 1 },
];

const STATS = [
  { value: '20+', label: 'Team Members' },
  { value: '6', label: 'Countries' },
  { value: '96%', label: 'Retention Rate' },
];

export function CareerHero() {
  return (
    <Section size="md" className={styles.hero}>
      <BackgroundDecor>
        <div className={styles.grid} />
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
        <CornerDots corner="left" />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container className={styles.container}>
        {/* ---------- Left: intro ---------- */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            Careers at MetaDev
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Grow further than
            <br />
            you <GradientText>thought possible</GradientText>.
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Join a senior, remote-first team that ships real products, owns outcomes and
            treats your growth as its own KPI.
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Button to="/careers#open-roles" variant="gradient" size="md">
              View Open Roles
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/careers#life-at-metadev" variant="outline" size="md">
              <HeartPulse size={16} aria-hidden="true" />
              Life at MetaDev
            </Button>
          </motion.div>

          <motion.dl className={styles.stats} variants={itemVariants}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Right: growth staircase ---------- */}
        <motion.div
          className={styles.visual}
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.stageGlow} aria-hidden="true" />
          <div className={styles.ascentLine} aria-hidden="true" />

          {STEPS.map((step, index) => (
            <motion.div
              key={step.title}
              className={cn(styles.step, step.position)}
              initial={{ opacity: 0, scale: 0.7, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.4, ease: 'easeOut', delay: step.delay },
                scale: { duration: 0.4, ease: 'easeOut', delay: step.delay },
                y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: step.delay },
              }}
              whileHover={{ scale: 1.06, y: -2 }}
            >
              <span className={`${styles.stepIcon} ${styles[`step-${step.accent}`]}`}>
                <step.icon size={18} aria-hidden="true" />
              </span>
              <span className={styles.stepText}>
                <span className={styles.stepNum}>0{index + 1}</span>
                <span className={styles.stepTitle}>{step.title}</span>
              </span>
            </motion.div>
          ))}

          {CHIPS.map((chip) => (
            <motion.div
              key={chip.label}
              className={`${styles.chip} ${chip.position}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
            >
              <span className={`${styles.chipIcon} ${styles[chip.accent]}`}>
                <chip.icon size={15} aria-hidden="true" />
              </span>
              {chip.label}
            </motion.div>
          ))}

          <div className={styles.ctaCard}>
            <span className={styles.ctaCardDot} />
            Currently hiring · 8 open roles
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default CareerHero;
