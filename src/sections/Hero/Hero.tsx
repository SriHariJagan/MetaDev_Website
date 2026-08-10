import { motion, useReducedMotion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BrainCircuit,
  Briefcase,
  CalendarDays,
  Cloud,
  LayoutGrid,
  Monitor,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { IconCircle } from '@/components/common/IconCircle';
import { Badge } from '@/components/common/Badge';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { fadeUp, staggerContainer } from '@/constants/motion';
import { DigitalGlobe } from './DigitalGlobe';
import styles from './Hero.module.css';

const containerVariants: Variants = staggerContainer(0.08, 0.05);

const itemVariants: Variants = fadeUp(24, 0.4);

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.1 },
  },
};

interface Stat {
  icon: typeof Briefcase;
  value: string;
  label: string;
}

const STATS: Stat[] = [
  { icon: Briefcase, value: '50+', label: 'Projects Delivered' },
  { icon: Users, value: '100+', label: 'Happy Clients' },
  { icon: TrendingUp, value: '500K+', label: 'Users Impacted' },
  { icon: ShieldCheck, value: '99%', label: 'Client Satisfaction' },
];

interface FloatingCard {
  icon: typeof Cloud;
  label: string;
  accent: 'cyan' | 'violet' | 'indigo' | 'sky' | 'blue';
  position: string;
  delay: number;
}

const FLOATING_CARDS: FloatingCard[] = [
  { icon: Cloud, label: 'Cloud Solutions', accent: 'sky', position: styles.cardCloud, delay: 0 },
  { icon: BrainCircuit, label: 'AI & Analytics', accent: 'violet', position: styles.cardAi, delay: 0.4 },
  { icon: LayoutGrid, label: 'Enterprise Apps', accent: 'indigo', position: styles.cardEnterprise, delay: 0.8 },
  { icon: Monitor, label: 'Digital Platforms', accent: 'cyan', position: styles.cardDigital, delay: 1.2 },
  { icon: ShieldCheck, label: 'Secure & Scalable', accent: 'blue', position: styles.cardSecure, delay: 1.6 },
];

function HeroBackground() {
  return (
    <BackgroundDecor>
      <div className={styles.grid} />
      <div className={styles.glowTop} />
      <div className={styles.glowBottom} />
    </BackgroundDecor>
  );
}

function DeviceStack() {
  return (
    <div className={styles.deviceStack}>
      <div className={styles.platformGlow} />

      <div className={`${styles.phone} ${styles.phoneLeft}`}>
        <div className={styles.phoneBar} />
        <div className={styles.phoneRow} />
        <div className={styles.phoneRow} />
        <svg className={styles.phoneChart} viewBox="0 0 60 28" preserveAspectRatio="none">
          <polyline
            points="0,22 10,16 20,19 30,10 40,13 50,4 60,8"
            fill="none"
            stroke="var(--navbar-accent)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={styles.laptop}>
        <div className={styles.laptopScreen}>
          <div className={styles.laptopTopBar}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.laptopBody}>
            <div className={styles.laptopSidebar}>
              <span />
              <span />
              <span />
              <span />
            </div>
            <div className={styles.laptopMain}>
              <svg className={styles.barChart} viewBox="0 0 100 50" preserveAspectRatio="none">
                <rect x="2" y="30" width="10" height="20" rx="2" fill="var(--navbar-accent-start)" />
                <rect x="16" y="20" width="10" height="30" rx="2" fill="var(--navbar-accent)" />
                <rect x="30" y="10" width="10" height="40" rx="2" fill="var(--navbar-accent-end)" />
                <rect x="44" y="24" width="10" height="26" rx="2" fill="var(--navbar-accent)" />
                <rect x="58" y="6" width="10" height="44" rx="2" fill="var(--navbar-accent-start)" />
              </svg>
              <svg className={styles.ringChart} viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="var(--ring-track)" strokeWidth="3" />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="var(--navbar-accent)"
                  strokeWidth="3"
                  strokeDasharray="70 100"
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.laptopBase} />
      </div>

      <div className={`${styles.phone} ${styles.phoneRight}`}>
        <div className={styles.phoneBar} />
        <svg className={styles.phoneChart} viewBox="0 0 60 28" preserveAspectRatio="none">
          <rect x="2" y="10" width="6" height="16" rx="1.5" fill="var(--navbar-accent-start)" />
          <rect x="12" y="4" width="6" height="22" rx="1.5" fill="var(--navbar-accent)" />
          <rect x="22" y="14" width="6" height="12" rx="1.5" fill="var(--navbar-accent-end)" />
          <rect x="32" y="8" width="6" height="18" rx="1.5" fill="var(--navbar-accent)" />
          <rect x="42" y="16" width="6" height="10" rx="1.5" fill="var(--navbar-accent-start)" />
        </svg>
        <div className={styles.phoneRow} />
      </div>
    </div>
  );
}

function HeroVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={styles.visual}
      variants={visualVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={styles.stageGlow} aria-hidden="true" />

      <div className={styles.globeWrap}>
        <div className={styles.orbitRing} aria-hidden="true">
          <span className={styles.orbitSatA} />
        </div>
        <div className={styles.orbitRingReverse} aria-hidden="true">
          <span className={styles.orbitSatB} />
        </div>
        <DigitalGlobe />
      </div>

      <img
        src="/logo-noBg.png"
        alt="metadev logo"
        className={`${styles.heroLogo} ${styles.heroLogoDark}`}
        draggable={false}
      />

      <img
        src="/logo-lightmode.png"
        alt="metadev logo"
        className={`${styles.heroLogo} ${styles.heroLogoLight}`}
        draggable={false}
      />

      {FLOATING_CARDS.map((card) => (
        <motion.div
          key={card.label}
          className={`${styles.floatingCard} ${card.position}`}
          animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: card.delay }}
          whileHover={reduceMotion ? undefined : { scale: 1.06, y: 0 }}
        >
          <span className={`${styles.floatingIcon} ${styles[`accent-${card.accent}`]}`}>
            <card.icon size={18} aria-hidden="true" />
          </span>
          {card.label}
        </motion.div>
      ))}

      <DeviceStack />
    </motion.div>
  );
}

export function Hero() {
  return (
    <Section size="md" className={styles.hero}>
      <HeroBackground />

      <Container className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={itemVariants}>
            <Badge variant="outline">
              <Rocket size={16} aria-hidden="true" />
              Empowering the Future. Enriching Lives.
            </Badge>
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            <span className={styles.titleLine}>Building the Future of</span>
            <GradientText>Digital Transformation</GradientText>
          </motion.h1>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Metadev delivers innovative, secure and scalable technology solutions that drive
            growth, enhance experiences and transform the way the world works.
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Button to="/solutions" size="md" variant="gradient">
              Explore Solutions
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/contact" size="md" variant="outline">
              Schedule a Demo
              <CalendarDays size={16} aria-hidden="true" />
            </Button>
          </motion.div>

          <motion.dl className={styles.stats} variants={itemVariants}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <IconCircle size="sm" variant="accent">
                  <stat.icon size={15} aria-hidden="true" />
                </IconCircle>
                <div className={styles.statText}>
                  <dt className={styles.statValue}>{stat.value}</dt>
                  <dd className={styles.statLabel}>{stat.label}</dd>
                </div>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        <HeroVisual />
      </Container>
    </Section>
  );
}