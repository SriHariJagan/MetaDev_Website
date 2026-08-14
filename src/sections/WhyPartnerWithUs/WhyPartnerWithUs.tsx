// WhyPartnerWithUs.tsx — partner benefits split layout
import { useRef, type ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Handshake,
  Headset,
  Lightbulb,
  Lock,
  Rocket,
  Timer,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { GradientDefs } from '@/components/common/GradientDefs';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { Button } from '@/components/common/Button';
import { fadeUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './WhyPartnerWithUs.module.css';

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(16, 0.3);

interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const BENEFITS: Benefit[] = [
  {
    icon: Award,
    title: 'Proven Expertise',
    description:
      'Years of experience across industries with a track record of successful, scalable deliveries.',
    accent: 'accent-blue',
  },
  {
    icon: Rocket,
    title: 'End-to-End Ownership',
    description:
      'From discovery and design to launch and maintenance — one accountable partner, one vision.',
    accent: 'accent-cyan',
  },
  {
    icon: Lightbulb,
    title: 'Innovation First',
    description:
      'AI, cloud and modern engineering baked in from day one, so your product stays ahead of the curve.',
    accent: 'accent-violet',
  },
  {
    icon: Lock,
    title: 'Security & Compliance',
    description:
      'Enterprise-grade security practices and compliance-ready development at every layer.',
    accent: 'accent-green',
  },
  {
    icon: Headset,
    title: '24/7 Dedicated Support',
    description:
      'Round-the-clock support and proactive monitoring so your systems never sleep.',
    accent: 'accent-amber',
  },
  {
    icon: Users,
    title: 'Transparent Collaboration',
    description:
      'Clear communication, regular demos and complete visibility into progress and priorities.',
    accent: 'accent-teal',
  },
  {
    icon: Timer,
    title: 'On-Time Delivery',
    description:
      'Agile execution with predictable timelines — we ship on schedule, every time.',
    accent: 'accent-indigo',
  },
  {
    icon: Handshake,
    title: 'Long-Term Partnership',
    description:
      'We grow with you — evolving your product continuously as your business scales.',
    accent: 'accent-rose',
  },
];

export interface WhyPartnerWithUsProps {
  eyebrow?: ReactNode;
  title?: ReactNode;
  subtitle?: ReactNode;
  className?: string;
}

export function WhyPartnerWithUs({
  eyebrow = 'Why Partner With Us',
  title = (
    <>
      The Partner You Can
      <br />
      <GradientText>Count On</GradientText>
    </>
  ),
  subtitle = 'We are not just a vendor — we are your technology partner, invested in your success from first sprint to scale.',
  className,
}: WhyPartnerWithUsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <Section bordered className={cn(styles.root, className)}>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={containerRef}>
        {/* ---------- Left: intro ---------- */}
        <motion.div
          className={styles.intro}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            {eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            {title}
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>

          <motion.div className={styles.introStats} variants={itemVariants}>
            <div className={styles.introStat}>
              <span className={styles.introStatValue}>
                <GradientText>100+</GradientText>
              </span>
              <span className={styles.introStatLabel}>Projects Delivered</span>
            </div>
            <div className={styles.introStat}>
              <span className={styles.introStatValue}>
                <GradientText>12+</GradientText>
              </span>
              <span className={styles.introStatLabel}>Years Combined</span>
            </div>
            <div className={styles.introStat}>
              <span className={styles.introStatValue}>
                <GradientText>98%</GradientText>
              </span>
              <span className={styles.introStatLabel}>Client Retention</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Button to="/contact" variant="gradient" size="md">
              Start Your Project
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.div>

        {/* ---------- Right: benefits grid ---------- */}
        <motion.ul
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.li
                key={benefit.title}
                className={cn(styles.benefitCard, styles[benefit.accent])}
                variants={itemVariants}
              >
                <div className={styles.benefitTop}>
                  <span className={styles.benefitIcon}>
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className={styles.benefitNumber}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className={styles.benefitTitle}>{benefit.title}</h3>
                <p className={styles.benefitDesc}>{benefit.description}</p>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}

export default WhyPartnerWithUs;
