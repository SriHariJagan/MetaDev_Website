// AboutHero.tsx — company hero for the About Us page
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Cloud,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import aboutUsImage from '@/assets/images/aboutUs.png';
import styles from './AboutHero.module.css';

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
  icon: typeof BrainCircuit;
  label: string;
  accent: 'cyan' | 'violet' | 'amber' | 'blue';
  position: string;
  delay: number;
}

const FLOATING_CHIPS: FloatingChip[] = [
  { icon: BrainCircuit, label: 'AI-Powered', accent: 'violet', position: styles.chipTopLeft, delay: 0 },
  { icon: Cloud, label: 'Cloud Native', accent: 'blue', position: styles.chipTopRight, delay: 0.4 },
  { icon: ShieldCheck, label: 'Secure & Scalable', accent: 'cyan', position: styles.chipBottomLeft, delay: 0.8 },
  { icon: Globe, label: 'Global Team', accent: 'amber', position: styles.chipBottomRight, delay: 1.2 },
];

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '100+', label: 'Clients Worldwide' },
  { value: '99%', label: 'Client Satisfaction' },
];

export interface AboutHeroProps {
  eyebrow?: string;
  greeting?: string;
  name?: string;
  role?: string;
  bio?: string;
}

export function AboutHero({
  eyebrow = 'About Us',
  greeting = 'We are',
  name = 'Metadev',
  role = 'Software Studio',
  bio = 'Metadev designs, builds and scales premium digital products — from enterprise platforms to AI-powered tools. One accountable partner, one vision, from first sprint to scale.',
}: AboutHeroProps) {
  return (
    <Section size="md" className={styles.hero}>
      <BackgroundDecor>
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
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
            <span className={styles.titleLine}>{greeting}</span>
            <GradientText>{name}.</GradientText>
          </motion.h1>

          <motion.p className={styles.roleLine} variants={itemVariants}>
            <span className={styles.roleMain}>{role}</span>
            <span className={styles.roleDot} />
            <span className={styles.roleCyan}>AI Product House</span>
            <span className={styles.roleDot} />
            <span className={styles.roleAmber}>Cloud Specialists</span>
          </motion.p>

          <motion.p className={styles.bio} variants={itemVariants}>
            {bio}
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Button to="/solutions" variant="gradient" size="md">
              Explore Solutions
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/products" variant="outline" size="md">
              <Briefcase size={16} aria-hidden="true" />
              See Our Products
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

        {/* ---------- Right: image visual ---------- */}
        <motion.div
          className={styles.visual}
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.imageFrame}>
            <img
              src={aboutUsImage}
              alt="Metadev team"
              className={styles.image}
            />
          </div>

          <div className={styles.avatarBadge}>
            <span className={styles.avatarBadgeDot} />
            Trusted by 100+ Clients
          </div>

          {FLOATING_CHIPS.map((chip) => (
            <motion.div
              key={chip.label}
              className={`${styles.chip} ${chip.position}`}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: chip.delay }}
            >
              <span className={`${styles.chipIcon} ${styles[`accent-${chip.accent}`]}`}>
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

export default AboutHero;
