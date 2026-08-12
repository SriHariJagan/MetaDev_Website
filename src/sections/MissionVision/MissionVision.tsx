import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Compass,
  Eye,
  Gem,
  Handshake,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './MissionVision.module.css';

const containerVariants = staggerContainer(0.12);

const itemVariants = blurUp(20, 0.5, 8);

interface Pillar {
  icon: LucideIcon;
  label: string;
  accent: string;
}

const MISSION_PILLARS: Pillar[] = [
  { icon: Gem, label: 'Quality First', accent: 'accent-blue' },
  { icon: Sparkles, label: 'Relentless Innovation', accent: 'accent-violet' },
  { icon: ShieldCheck, label: 'Security by Default', accent: 'accent-cyan' },
  { icon: Handshake, label: 'True Partnership', accent: 'accent-amber' },
];

interface Milestone {
  year: string;
  title: string;
  desc: string;
}

const VISION_MILESTONES: Milestone[] = [
  {
    year: 'Today',
    title: 'Foundation',
    desc: 'Design, engineering and AI under one roof.',
  },
  {
    year: '2028',
    title: 'Scale',
    desc: '100+ products shipped for teams worldwide.',
  },
  {
    year: '2030',
    title: 'North Star',
    desc: 'A global, AI-first software studio.',
  },
];

export interface MissionVisionProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function MissionVision({
  eyebrow = 'Why We Exist',
  title = 'Our Mission &',
  subtitle = 'Two promises shape everything we build — why we exist today, and where we are headed tomorrow.',
}: MissionVisionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <Section className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glowLeft} />
        <div className={styles.glowRight} />
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
            {title} <GradientText>Our Vision.</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Mission | Vision ---------- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Mission — orbit / target design */}
          <motion.article
            className={cn(styles.card, styles.missionCard)}
            variants={itemVariants}
          >
            <div className={styles.missionOrbit}>
              <motion.span
                className={styles.orbitRing}
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              />
              <span className={styles.orbitRingInner} />
              <span className={styles.missionIcon}>
                <Target size={22} aria-hidden="true" />
              </span>
            </div>

            <span className={styles.cardTag}>The Mission</span>
            <h3 className={styles.cardTitle}>Why we go to work</h3>
            <p className={styles.statement}>
              To design and build software that genuinely moves businesses
              forward — accessible, secure and engineered to last. We treat
              every project like our own, from the first sketch to decades
              after launch.
            </p>

            <ul className={styles.pillarRow}>
              {MISSION_PILLARS.map((pillar) => (
                <li
                  key={pillar.label}
                  className={cn(
                    styles.pillar,
                    styles[`pillar-${pillar.accent}`],
                  )}
                >
                  <pillar.icon size={13} aria-hidden="true" />
                  {pillar.label}
                </li>
              ))}
            </ul>

            <div className={styles.missionFooter}>
              <Compass size={14} aria-hidden="true" />
              Grounded in outcomes, not hours.
            </div>
          </motion.article>

          {/* Vision — horizon / ascent design */}
          <motion.article
            className={cn(styles.card, styles.visionCard)}
            variants={itemVariants}
          >
            <span className={styles.visionHalo} />
            <span className={styles.visionGrid} />

            <div className={styles.visionHead}>
              <span className={styles.visionIcon}>
                <Eye size={20} aria-hidden="true" />
              </span>
              <div>
                <span className={styles.cardTag}>The Vision</span>
                <h3 className={styles.cardTitle}>Where we are headed</h3>
              </div>
            </div>

            <p className={styles.statement}>
              A world where every ambitious team — from garages to enterprises
              — has a technology partner that feels like their own engineering
              department. One that ships faster, thinks bigger and cares as
              much as they do.
            </p>

            <div className={styles.horizon}>
              <span className={styles.horizonLine} />
              <motion.span
                className={styles.horizonDot}
                animate={{ opacity: [0.4, 1, 0.4], left: ['0%', '100%'] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <ol className={styles.milestoneRow}>
                {VISION_MILESTONES.map((milestone, index) => (
                  <li
                    key={milestone.year}
                    className={styles.milestone}
                    style={{ '--rise': `${index * 14}px` } as React.CSSProperties}
                  >
                    <span className={styles.milestoneDot} />
                    <span className={styles.milestoneYear}>{milestone.year}</span>
                    <span className={styles.milestoneTitle}>{milestone.title}</span>
                    <span className={styles.milestoneDesc}>{milestone.desc}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.visionFooter}>
              <Rocket size={14} aria-hidden="true" />
              Built for the next decade.
            </div>
          </motion.article>
        </motion.div>
      </Container>
    </Section>
  );
}

export default MissionVision;