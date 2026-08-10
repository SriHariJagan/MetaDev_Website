// TeamHero.tsx — hero for the Team page
import { motion, type Variants } from 'framer-motion';
import { ArrowRight, Briefcase, Cloud, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import styles from './TeamHero.module.css';

const containerVariants: Variants = staggerContainer(0.08, 0.05);
const itemVariants: Variants = blurUp(24, 0.5, 8);

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.15 },
  },
};

interface FloatingChip {
  icon: typeof Globe;
  label: string;
  accent: 'cyan' | 'violet' | 'amber' | 'blue';
  position: string;
  delay: number;
}

const FLOATING_CHIPS: FloatingChip[] = [
  { icon: Globe, label: 'Global Team', accent: 'cyan', position: styles.chipTopLeft, delay: 0 },
  { icon: Sparkles, label: 'Async by Default', accent: 'violet', position: styles.chipTopRight, delay: 0.4 },
  { icon: Cloud, label: '6 Countries', accent: 'blue', position: styles.chipBottomLeft, delay: 0.8 },
  { icon: Briefcase, label: 'Small Squads', accent: 'amber', position: styles.chipBottomRight, delay: 1.2 },
];

const STATS = [
  { value: '20+', label: 'Team Members' },
  { value: '6', label: 'Countries' },
  { value: '12+', label: 'Avg Years of Experience' },
];

const AVATAR_STACK = [
  { initials: 'AO', accent: 'accent-blue' },
  { initials: 'DR', accent: 'accent-violet' },
  { initials: 'SL', accent: 'accent-rose' },
  { initials: 'KW', accent: 'accent-green' },
  { initials: 'PS', accent: 'accent-amber' },
];

export interface TeamHeroProps {
  eyebrow?: string;
  subtitle?: string;
}

export function TeamHero({
  eyebrow = 'The Metadev Team',
  subtitle = 'A distributed team of engineers, designers and AI specialists who chose craftsmanship over shortcuts — and ship together from six countries.',
}: TeamHeroProps) {
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
            {eyebrow}
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            Meet the people behind
            <br />
            the <GradientText>products</GradientText>.
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Button to="/team#open-roles" variant="gradient" size="md">
              See Open Roles
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/contact" variant="outline" size="md">
              <Briefcase size={16} aria-hidden="true" />
              Work With Us
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

        {/* ---------- Right: avatar stack visual ---------- */}
        <motion.div
          className={styles.visual}
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.avatarGlow} />
          <div className={styles.avatarRing} />

          <div className={styles.avatarStack}>
            {AVATAR_STACK.map((member) => (
              <span key={member.initials} className={`${styles.avatar} ${styles[member.accent]}`}>
                {member.initials}
              </span>
            ))}
            <span className={styles.avatarPlus}>+15</span>
          </div>

          <div className={styles.avatarBadge}>
            <span className={styles.avatarBadgeDot} />
            Hiring · 4 Open Roles
          </div>

          {FLOATING_CHIPS.map((chip) => (
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
        </motion.div>
      </Container>
    </Section>
  );
}

export default TeamHero;
