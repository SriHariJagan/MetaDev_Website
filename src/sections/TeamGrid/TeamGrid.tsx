// TeamGrid.tsx — founder profile cards
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Rocket, Shield, Sparkles, Target, UserCheck, Users } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './TeamGrid.module.css';

const containerVariants = staggerContainer(0.1);

const itemVariants = blurUp(20, 0.55, 8);

interface Highlight {
  icon: typeof Rocket;
  label: string;
  description: string;
}

interface Founder {
  photo: string;
  initials: string;
  name: string;
  role: string;
  focus: string;
  bio: string;
  highlights: Highlight[];
  accent: string;
}

const FOUNDERS: Founder[] = [
  {
    photo: '/team/kishore-kodali.jpg',
    initials: 'KK',
    name: 'Kishore Kodali',
    role: 'Founder & CEO',
    focus: 'Product vision, growth strategy & partnerships',
    bio: "Kishore founded MetaDev to replace fragmented tools with one connected business platform. He sets product vision, growth strategy, and partnerships so companies can launch a website, admin, payments, and operations without rebuilding from scratch. His focus is simple: clear outcomes for every business that works with MetaDev.",
    highlights: [
      {
        icon: Rocket,
        label: 'Product Vision',
        description: 'Defines roadmap & category strategy',
      },
      {
        icon: Target,
        label: 'Growth Strategy',
        description: 'Scales from 0 → $10M+ ARR',
      },
      {
        icon: UserCheck,
        label: 'Partnerships',
        description: 'Builds ecosystem alliances',
      },
    ],
    accent: 'accent-blue',
  },
  {
    photo: '/team/satya-kavipurapu.jpg',
    initials: 'SK',
    name: 'Satya Kavipurapu',
    role: 'COO',
    focus: 'Operations, customer success & reliability',
    bio: "Satya runs MetaDev's day-to-day operations—delivery, support systems, and process quality. He keeps onboarding, module activation, and customer success moving in sync so teams can scale without losing reliability. Customers feel that discipline as faster launches and smoother handoffs.",
    highlights: [
      {
        icon: Shield,
        label: 'Operations',
        description: 'Delivery, support & process quality',
      },
      {
        icon: Users,
        label: 'Customer Success',
        description: 'Onboarding & activation at scale',
      },
      {
        icon: Sparkles,
        label: 'Reliability',
        description: 'Systems that scale without breaking',
      },
    ],
    accent: 'accent-violet',
  },
];

export function TeamGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <Section className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glow} />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={sectionRef}>
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {FOUNDERS.map((founder) => (
            <motion.article
              key={founder.name}
              className={cn(styles.card, styles[founder.accent])}
              variants={itemVariants}
            >
              <div className={styles.top}>
                <div className={styles.portrait}>
                  <img
                    className={styles.photo}
                    src={founder.photo}
                    alt={`Portrait of ${founder.name}`}
                    width={600}
                    height={800}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className={styles.photoMonogram} aria-hidden="true">
                    {founder.initials}
                  </span>
                </div>

                <div className={styles.heading}>
                  <h2 className={styles.name}>{founder.name}</h2>
                  <p className={styles.role}>{founder.role}</p>
                  <p className={styles.focus}>{founder.focus}</p>
                </div>
              </div>

              <p className={styles.bio}>{founder.bio}</p>

              <div className={styles.highlights}>
                {founder.highlights.map((highlight) => (
                  <div key={highlight.label} className={styles.highlight}>
                    <span className={styles.highlightIcon}>
                      <highlight.icon size={14} aria-hidden="true" />
                    </span>
                    <span className={styles.highlightCopy}>
                      <span className={styles.highlightLabel}>{highlight.label}</span>
                      <span className={styles.highlightDescription}>
                        {highlight.description}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

export default TeamGrid;
