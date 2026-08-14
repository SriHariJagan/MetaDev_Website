// TeamGrid.tsx — team member cards grid
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './TeamGrid.module.css';

const containerVariants = staggerContainer(0.07);

const itemVariants = blurUp(20, 0.5, 8);

interface Member {
  initials: string;
  name: string;
  role: string;
  accent: string;
}

const MEMBERS: Member[] = [
  {
    initials: 'AO',
    name: 'Amara Okafor',
    role: 'Co-Founder & CEO',
    accent: 'accent-blue',
  },
  {
    initials: 'DR',
    name: 'Daniel Reyes',
    role: 'Co-Founder & CTO',
    accent: 'accent-violet',
  },
  {
    initials: 'SL',
    name: 'Sofia Lindqvist',
    role: 'Chief Product Officer',
    accent: 'accent-rose',
  },
  {
    initials: 'PS',
    name: 'Priya Sharma',
    role: 'Head of Design',
    accent: 'accent-amber',
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
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  return (
    <Section className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glow} />
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
              <div className={styles.avatarWrap}>
                <span className={styles.avatarRing} />
                <span className={styles.avatar}>
                  {member.initials}
                </span>
                <span className={styles.avatarDot} />
              </div>

              <div className={styles.info}>
                <h3 className={styles.name}>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
              </div>

              <div className={styles.footer}>
                <a
                  href="#"
                  className={styles.linkedin}
                  aria-label={`${member.name} on LinkedIn`}
                  title="LinkedIn"
                >
                  <FaLinkedinIn size={15} aria-hidden="true" />
                </a>
                <a href="#" className={styles.profile}>
                  View Profile
                  <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}

export default TeamGrid;