// TeamGrid.tsx — team member cards grid
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AtSign, Code2, Globe, type LucideIcon } from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './TeamGrid.module.css';

const containerVariants = staggerContainer(0.07);

const itemVariants = blurUp(20, 0.5, 8);

interface Social {
  icon: LucideIcon;
  label: string;
}

interface Member {
  initials: string;
  name: string;
  role: string;
  tagline: string;
  accent: string;
  socials: Social[];
}

const MEMBERS: Member[] = [
  {
    initials: 'AO',
    name: 'Amara Okafor',
    role: 'Co-Founder & CEO',
    tagline: 'Sets the vision, keeps us honest, and still reviews every product before it ships.',
    accent: 'accent-blue',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: Code2, label: 'GitHub' },
    ],
  },
  {
    initials: 'DR',
    name: 'Daniel Reyes',
    role: 'Co-Founder & CTO',
    tagline: 'Architects the platforms our clients scale on for years, not months.',
    accent: 'accent-violet',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: Code2, label: 'GitHub' },
    ],
  },
  {
    initials: 'SL',
    name: 'Sofia Lindqvist',
    role: 'Chief Product Officer',
    tagline: 'Turns messy problems into products people actually love to use.',
    accent: 'accent-rose',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: AtSign, label: 'Email' },
    ],
  },
  {
    initials: 'KW',
    name: 'Kenji Watanabe',
    role: 'AI & Machine Learning Lead',
    tagline: 'Builds the intelligent layers — search, agents, and automation.',
    accent: 'accent-green',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: Code2, label: 'GitHub' },
    ],
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Head of Design',
    tagline: 'Owns the pixels. Every interface starts as a paper sketch.',
    accent: 'accent-amber',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: AtSign, label: 'Email' },
    ],
  },
  {
    initials: 'MC',
    name: 'Marcus Chen',
    role: 'Cloud & DevOps Lead',
    tagline: 'Keeps everything up, fast, and secure — at any scale.',
    accent: 'accent-cyan',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: Code2, label: 'GitHub' },
    ],
  },
  {
    initials: 'LF',
    name: 'Lena Fischer',
    role: 'Frontend Lead',
    tagline: 'Loves the details — motion, animation, and those perfect 60fps.',
    accent: 'accent-teal',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: Code2, label: 'GitHub' },
    ],
  },
  {
    initials: 'TB',
    name: 'Tom Bradley',
    role: 'Backend Lead',
    tagline: 'Designs APIs so clean they barely need documentation.',
    accent: 'accent-indigo',
    socials: [
      { icon: Globe, label: 'LinkedIn' },
      { icon: Code2, label: 'GitHub' },
    ],
  },
];

export interface TeamGridProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function TeamGrid({
  eyebrow = 'Who We Are',
  title = 'The people, not the pixels',
  subtitle = 'A senior team that owns outcomes end to end — no hand-offs, no middlemen, no mystery. Meet the people your product will actually work with.',
}: TeamGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <Section className={styles.root}>
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
            {eyebrow}
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            {title} <GradientText>→ Meet Them</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Member grid ---------- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {MEMBERS.map((member) => (
            <motion.article
              key={member.name}
              className={cn(styles.card, styles[member.accent])}
              variants={itemVariants}
            >
              <div className={styles.cardTop}>
                <span className={styles.avatar}>{member.initials}</span>
                <div className={styles.meta}>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.role}>{member.role}</p>
                </div>
              </div>
              <p className={styles.tagline}>{member.tagline}</p>
              <div className={styles.socials}>
                {member.socials.map((social) => (
                  <span key={social.label} className={styles.social} title={social.label}>
                    <social.icon size={15} aria-hidden="true" />
                  </span>
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
