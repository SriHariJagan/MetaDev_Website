// HowWeWork.tsx — team image + culture values
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  GraduationCap,
  Lightbulb,
  Target,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './HowWeWork.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

interface Value {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

const VALUES: Value[] = [
  {
    icon: Lightbulb,
    title: 'Think Bold',
    description:
      'We challenge the status quo and explore bold ideas that drive meaningful impact.',
    accent: 'accent-amber',
  },
  {
    icon: Users,
    title: 'Build Together',
    description:
      'Collaboration is at our core. We win as a team and grow stronger together.',
    accent: 'accent-blue',
  },
  {
    icon: Target,
    title: 'Own The Outcome',
    description:
      'We take ownership, stay accountable and deliver results we are proud of.',
    accent: 'accent-green',
  },
  {
    icon: GraduationCap,
    title: 'Keep Learning',
    description:
      'We embrace curiosity, invest in ourselves and continuously level up.',
    accent: 'accent-violet',
  },
];

export interface HowWeWorkProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function HowWeWork({
  eyebrow = 'Our Culture',
  title = 'How We Work Together',
  subtitle = 'Four values that guide how we collaborate, build and grow — with you and with each other.',
}: HowWeWorkProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

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
            {title}
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        <div className={styles.split}>
          {/* ---------- Left: team image ---------- */}
          <motion.div
            className={styles.imageWrap}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={isInView ? { opacity: 1, scale: 1, y: 0 } : undefined}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          >
            <div className={styles.imageFrame}>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80"
                alt="The Metadev team collaborating"
                className={styles.image}
                loading="lazy"
              />
            </div>

            <div className={styles.imageBadge}>
              <span className={styles.imageBadgeDot} />
              One team · Six countries
            </div>

            <div className={styles.imageChip}>
              <span className={styles.imageChipIcon}>
                <Users size={14} aria-hidden="true" />
              </span>
              20+ specialists shipping together
            </div>
          </motion.div>

          {/* ---------- Right: values cards ---------- */}
          <motion.div
            className={styles.cards}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {VALUES.map((value) => (
              <motion.article
                key={value.title}
                className={cn(styles.card, styles[value.accent])}
                variants={itemVariants}
              >
                <span className={styles.cardIcon}>
                  <value.icon size={20} aria-hidden="true" />
                </span>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{value.title}</h3>
                  <p className={styles.cardDesc}>{value.description}</p>
                </div>
                <value.icon
                  className={styles.cardWatermark}
                  size={100}
                  aria-hidden="true"
                />
              </motion.article>
            ))}
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}

export default HowWeWork;