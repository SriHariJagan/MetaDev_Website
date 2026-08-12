// TeamHero.tsx — hero for the Team page
import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Cloud,
  Database,
  Gauge,
  Globe,
  Palette,
  Users,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './TeamHero.module.css';

const containerVariants: Variants = staggerContainer(0.08, 0.05);
const itemVariants: Variants = blurUp(24, 0.5, 8);

const STATS = [
  { value: '20+', label: 'Team Members' },
  { value: '6', label: 'Countries' },
  { value: '12+', label: 'Avg Years of Experience' },
];

interface Squad {
  icon: typeof Palette;
  name: string;
  members: string[];
  fill: number;
  accent: string;
}

const SQUADS: Squad[] = [
  {
    icon: Palette,
    name: 'Design',
    members: ['AO', 'DR'],
    fill: 86,
    accent: 'squad-blue',
  },
  {
    icon: Briefcase,
    name: 'Engineering',
    members: ['SL', 'KW', 'PS'],
    fill: 100,
    accent: 'squad-violet',
  },
  {
    icon: Database,
    name: 'AI & Data',
    members: ['MK', 'JT'],
    fill: 74,
    accent: 'squad-cyan',
  },
  {
    icon: Cloud,
    name: 'Cloud & DevOps',
    members: ['RN'],
    fill: 62,
    accent: 'squad-amber',
  },
];

const REGIONS = ['India', 'UAE', 'USA', 'United Kingdom', 'Poland', 'Canada'];

export interface TeamHeroProps {
  eyebrow?: string;
  subtitle?: string;
}

export function TeamHero({
  eyebrow = 'The Metadev Team',
  subtitle = 'A distributed team of engineers, designers and AI specialists who chose craftsmanship over shortcuts — and ship together from six countries.',
}: TeamHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  return (
    <Section size="md" className={styles.hero}>
      <BackgroundDecor>
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
      </BackgroundDecor>

      <Container className={styles.container} ref={sectionRef}>
        {/* ---------- Left: intro ---------- */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
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

        {/* ---------- Right: team pulse dashboard ---------- */}
        <motion.div
          className={styles.dashboardWrap}
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : undefined}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
        >
          <div className={styles.dashboard}>
            <div className={styles.dashHeader}>
              <span className={styles.pulseDot} />
              <span className={styles.dashTitle}>Team Pulse</span>
              <span className={styles.dashLive}>Live</span>
            </div>

            <div className={styles.dashBody}>
              <div className={styles.dashIntro}>
                <span className={styles.dashIcon}>
                  <Users size={15} aria-hidden="true" />
                </span>
                <div>
                  <span className={styles.dashIntroTitle}>20+ specialists</span>
                  <span className={styles.dashIntroSub}>
                    4 squads · 1 shared standard
                  </span>
                </div>
              </div>

              <ul className={styles.squadList}>
                {SQUADS.map((squad, index) => (
                  <li
                    key={squad.name}
                    className={cn(styles.squad, styles[squad.accent])}
                  >
                    <span className={styles.squadIcon}>
                      <squad.icon size={14} aria-hidden="true" />
                    </span>
                    <div className={styles.squadInfo}>
                      <div className={styles.squadTop}>
                        <span className={styles.squadName}>{squad.name}</span>
                        <span className={styles.squadStack}>
                          {squad.members.map((member) => (
                            <span
                              key={member}
                              className={styles.squadAvatar}
                            >
                              {member}
                            </span>
                          ))}
                        </span>
                      </div>
                      <div className={styles.squadTrack}>
                        <motion.span
                          className={styles.squadFill}
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${squad.fill}%` } : { width: 0 }
                          }
                          transition={{
                            duration: 0.8,
                            ease: 'easeOut',
                            delay: 0.3 + index * 0.1,
                          }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className={styles.dashDivider} />

              <div className={styles.regionRow}>
                <span className={styles.regionLabel}>
                  <Globe size={12} aria-hidden="true" />
                  Across 6 countries
                </span>
                <ul className={styles.regionList}>
                  {REGIONS.map((region) => (
                    <li key={region} className={styles.regionChip}>
                      {region}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.dashFooter}>
                <Gauge size={13} aria-hidden="true" />
                Async-first · 4 hours of overlap daily
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

export default TeamHero;