// TechStackNew.tsx
import { useRef, type CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  AppWindow,
  Server,
  Database,
  Cloud,
  CloudSun,
  BrainCircuit,
  Code2,
  Check,
  Bot,
  type LucideIcon,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiAngular,
  SiNextdotjs,
  SiTypescript,
  SiPython,
  SiNodedotjs,
  SiDotnet,
  SiOpenjdk,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiKubernetes,
  SiLangchain,
  SiTensorflow,
  SiGithubactions,
} from 'react-icons/si';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { fadeUp, staggerContainer } from '@/constants/motion';
import styles from './TechStackNew.module.css';
import { GradientText } from '@/components/common/GradientText';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type TechIcon = IconType | LucideIcon;

interface TechItem {
  icon: TechIcon;
  label: string;
  color: string;
}

interface Category {
  id: string;
  icon: LucideIcon;
  title: string;
  items: TechItem[];
}

const CATEGORIES: Category[] = [
  {
    id: 'frontend',
    icon: AppWindow,
    title: 'Frontend',
    items: [
      { icon: SiReact, label: 'React', color: '#149ECA' },
      { icon: SiAngular, label: 'Angular', color: '#DD0031' },
      { icon: SiNextdotjs, label: 'Next.js', color: '#000000' },
      { icon: SiTypescript, label: 'TypeScript', color: '#3178C6' },
    ],
  },
  {
    id: 'backend',
    icon: Server,
    title: 'Backend',
    items: [
      { icon: SiPython, label: 'Python', color: '#3776AB' },
      { icon: SiNodedotjs, label: 'Node.js', color: '#5FA04E' },
      { icon: SiDotnet, label: '.NET', color: '#512BD4' },
      { icon: SiOpenjdk, label: 'Java', color: '#EA7E20' },
    ],
  },
  {
    id: 'data',
    icon: Database,
    title: 'Data',
    items: [
      { icon: SiPostgresql, label: 'PostgreSQL', color: '#336791' },
      { icon: SiMysql, label: 'MySQL', color: '#4479A1' },
      { icon: SiMongodb, label: 'MongoDB', color: '#47A248' },
      { icon: SiRedis, label: 'Redis', color: '#DC382D' },
    ],
  },
  {
    id: 'cloud',
    icon: Cloud,
    title: 'Cloud & DevOps',
    items: [
      { icon: Cloud, label: 'AWS', color: '#FF9900' },
      { icon: CloudSun, label: 'Microsoft Azure', color: '#0078D4' },
      { icon: SiDocker, label: 'Docker', color: '#2496ED' },
      { icon: SiKubernetes, label: 'Kubernetes', color: '#326CE5' },
    ],
  },
  {
    id: 'ai',
    icon: BrainCircuit,
    title: 'AI & Automation',
    items: [
      { icon: Bot, label: 'OpenAI', color: '#000000' },
      { icon: SiLangchain, label: 'LangChain', color: '#1C3C3C' },
      { icon: SiTensorflow, label: 'TensorFlow', color: '#FF6F00' },
      { icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF' },
    ],
  },
];

interface ChecklistItem {
  label: string;
  variant: 'filled' | 'outlineBlue' | 'outlineTeal';
}

const CHECKLIST: ChecklistItem[] = [
  { label: 'Secure by design', variant: 'filled' },
  { label: 'Built to scale', variant: 'outlineBlue' },
  { label: 'Integration ready', variant: 'outlineTeal' },
];

interface OrbitItem {
  icon: TechIcon;
  color: string;
  angle: number;
}

const OUTER_ORBIT: OrbitItem[] = [
  { icon: SiReact, color: '#149ECA', angle: 0 },
  { icon: SiTypescript, color: '#3178C6', angle: 60 },
  { icon: SiDocker, color: '#2496ED', angle: 120 },
  { icon: SiMongodb, color: '#47A248', angle: 180 },
  { icon: SiPython, color: '#3776AB', angle: 240 },
  { icon: SiPostgresql, color: '#336791', angle: 300 },
];

const INNER_ORBIT: OrbitItem[] = [
  { icon: SiGithubactions, color: '#2088FF', angle: 45 },
  { icon: SiKubernetes, color: '#326CE5', angle: 135 },
  { icon: SiRedis, color: '#DC382D', angle: 225 },
  { icon: SiTensorflow, color: '#FF6F00', angle: 315 },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.05);
const itemVariants = fadeUp(16, 0.35);

/* ------------------------------------------------------------------ */
/* Main section                                                       */
/* ------------------------------------------------------------------ */

export function TechStackNew() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <Section bordered>
      <BackgroundDecor>
        <div className={styles.glow} />
      </BackgroundDecor>

      <Container maxWidth="wide" ref={containerRef}>
        <motion.div
          className={styles.headerWrap}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.eyebrow} variants={itemVariants}>
            Technology Stack
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Built on Modern <GradientText>Technologies</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            We use proven frameworks, cloud platforms, and intelligent tools
            to build secure, scalable, and future-ready digital products.
          </motion.p>
        </motion.div>

        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className={styles.hubStage} aria-hidden="true">
            <span className={styles.hubGlow} />

            <div
              className={styles.orbitRing}
              style={{ '--dur': '26s' } as CSSProperties}
            >
              {OUTER_ORBIT.map((item) => (
                <span
                  key={item.angle}
                  className={styles.orbitItem}
                  style={
                    {
                      '--a': `${item.angle}deg`,
                      '--r': '64px',
                    } as CSSProperties
                  }
                >
                  <span className={styles.orbitIcon} style={{ color: item.color }}>
                    <item.icon size={16} aria-hidden="true" /> 
                  </span>
                </span>
              ))}
            </div>

            <div
              className={`${styles.orbitRing} ${styles.orbitRingInner}`}
              style={{ '--dur': '19s' } as CSSProperties}
            >
              {INNER_ORBIT.map((item) => (
                <span
                  key={item.angle}
                  className={styles.orbitItem}
                  style={
                    {
                      '--a': `${item.angle}deg`,
                      '--r': '38px',
                    } as CSSProperties
                  }
                >
                  <span className={styles.orbitIcon} style={{ color: item.color }}>
                    <item.icon size={12} aria-hidden="true" />
                  </span>
                </span>
              ))}
            </div>

            <span className={styles.hub}>
              <Code2 size={18} strokeWidth={2} aria-hidden="true" /> 
            </span>
          </div>

          <motion.ul
            className={styles.categoryGrid}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {CATEGORIES.map((category) => (
              <motion.li
                key={category.id}
                className={styles.categoryCard}
                variants={itemVariants}
              >
                <span className={styles.categoryIcon}>
                  <category.icon size={26} strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>

                <ul className={styles.techList}>
                  {category.items.map((item) => (
                    <li key={item.label} className={styles.techItem}>
                      <span className={styles.techIcon} style={{ color: item.color }}>
                        <item.icon size={16} aria-hidden="true" />
                      </span>
                      <span className={styles.techLabel}>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </motion.ul>

          <motion.ul
            className={styles.checklist}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {CHECKLIST.map((item) => (
              <motion.li key={item.label} className={styles.checklistItem} variants={itemVariants}>
                <span className={`${styles.checkIcon} ${styles[item.variant]}`}>
                  <Check size={13} strokeWidth={3} aria-hidden="true" />
                </span>
                {item.label}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </Container>
    </Section>
  );
}