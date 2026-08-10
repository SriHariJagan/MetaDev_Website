// JoinUs.tsx — hiring CTA redirecting to the careers page
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import styles from './JoinUs.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

export interface JoinUsProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function JoinUs({
  eyebrow = 'Careers',
  title = 'Come build with us',
  subtitle = 'We hire senior people and give them real ownership. If you care about craft, this is the place.',
}: JoinUsProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <Section className={styles.root} id="open-roles">
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container className={styles.container} ref={sectionRef}>
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
            {title} <GradientText>→ Grow With Us</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Redirect card ---------- */}
        <motion.div
          className={styles.redirect}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <span className={styles.redirectBadge}>
            <span className={styles.redirectDot} />
            8 open roles
          </span>
          <h3 className={styles.redirectTitle}>Ready to find your lane?</h3>
          <p className={styles.redirectDesc}>
            All open roles live on our dedicated careers page — with search and filters by
            department and location.
          </p>
          <Button to="/careers#open-roles" variant="gradient" size="md">
            View Open Roles
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
        </motion.div>

        {/* ---------- CTA ---------- */}
        <motion.div
          className={styles.cta}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Button to="/contact" variant="outline" size="md">
            <Rocket size={16} aria-hidden="true" />
            Join the Team
          </Button>
          <p className={styles.ctaNote}>
            Don&apos;t see your role? Email{' '}
            <a href="mailto:careers@metadev.com" className={styles.ctaLink}>
              careers@metadev.com
            </a>{' '}
            — we always read.
          </p>
        </motion.div>
      </Container>
    </Section>
  );
}

export default JoinUs;
