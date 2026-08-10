// JoinUs.tsx — hiring CTA and open roles
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, MapPin, Rocket } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './JoinUs.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

interface Role {
  title: string;
  team: string;
  location: string;
  accent: string;
}

const ROLES: Role[] = [
  { title: 'Senior Frontend Engineer', team: 'Product', location: 'Remote', accent: 'accent-blue' },
  { title: 'AI / ML Engineer', team: 'Platform', location: 'Remote', accent: 'accent-violet' },
  { title: 'Product Designer', team: 'Design', location: 'Remote', accent: 'accent-rose' },
  { title: 'DevOps Engineer', team: 'Platform', location: 'Remote', accent: 'accent-cyan' },
];

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

        {/* ---------- Open roles ---------- */}
        <motion.div
          className={styles.roles}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {ROLES.map((role) => (
            <motion.a
              key={role.title}
              href="mailto:careers@metadev.com?subject=Application:"
              className={cn(styles.role, styles[role.accent])}
              variants={itemVariants}
            >
              <div className={styles.roleInfo}>
                <span className={styles.roleTitle}>{role.title}</span>
                <span className={styles.roleMeta}>
                  <span className={styles.roleTag}>{role.team}</span>
                  <span className={styles.roleLocation}>
                    <MapPin size={12} aria-hidden="true" />
                    {role.location}
                  </span>
                </span>
              </div>
              <span className={styles.roleArrow}>
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* ---------- CTA ---------- */}
        <motion.div
          className={styles.cta}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <Button to="/contact" variant="gradient" size="lg">
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
