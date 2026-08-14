// CareerJourney.tsx — hiring process timeline: a clear and human journey
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Rocket, Sparkles, Users, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './CareerJourney.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

type StepAccent = 'blue' | 'violet' | 'amber' | 'green';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: StepAccent;
}

const STEPS: Step[] = [
  {
    icon: FileText,
    title: 'Choose a role',
    description: 'Choose a role and share your profile.',
    accent: 'blue',
  },
  {
    icon: Sparkles,
    title: 'Show your skills',
    description: 'A short conversation with our talent.',
    accent: 'violet',
  },
  {
    icon: Users,
    title: 'Meet the team',
    description: 'Meet the team and discuss real work.',
    accent: 'amber',
  },
  {
    icon: Rocket,
    title: 'Join MetaDev',
    description: 'Receive your offer and start your journey.',
    accent: 'green',
  },
];

export function CareerJourney() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  return (
    <Section className={styles.root} id="your-journey">
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
            Your Journey
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            A clear and <GradientText>human hiring process</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            We keep every step focused, respectful and transparent.
          </motion.p>
        </motion.div>

        {/* ---------- Steps ---------- */}
        <motion.ol
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {STEPS.map((step, index) => (
            <motion.li key={step.title} className={styles.stepWrap} variants={itemVariants}>
              <div className={cn(styles.step, styles[`step-${step.accent}`])}>
                <span className={styles.stepNum}>0{index + 1}</span>
                <span className={styles.stepIcon}>
                  <step.icon size={20} aria-hidden="true" />
                </span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </Container>
    </Section>
  );
}

export default CareerJourney;
