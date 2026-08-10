// SkillsShowcase.tsx — skills grid for the About Me page
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Atom,
  Boxes,
  BrainCircuit,
  Braces,
  Cloud,
  Container as ContainerIcon,
  Database,
  FileCode2,
  Gauge,
  GitBranch,
  Layers,
  LayoutTemplate,
  Monitor,
  Palette,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Wand2,
  Webhook,
  Workflow,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './SkillsShowcase.module.css';

const containerVariants = staggerContainer(0.08);

const itemVariants = blurUp(20, 0.5, 8);

interface Skill {
  icon: LucideIcon;
  name: string;
  level: number;
}

interface SkillCategory {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
  skills: Skill[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: Monitor,
    title: 'Frontend',
    description: 'Pixel-perfect, fast and accessible interfaces people love to use.',
    accent: 'accent-blue',
    skills: [
      { icon: Atom, name: 'React & Next.js', level: 95 },
      { icon: Braces, name: 'TypeScript', level: 92 },
      { icon: Palette, name: 'Tailwind CSS', level: 90 },
      { icon: Wand2, name: 'UI Animation', level: 86 },
      { icon: LayoutTemplate, name: 'Responsive & Accessible UI', level: 93 },
    ],
  },
  {
    icon: Server,
    title: 'Backend',
    description: 'Robust APIs and systems engineered for scale and security.',
    accent: 'accent-green',
    skills: [
      { icon: Server, name: 'Node.js & NestJS', level: 90 },
      { icon: Webhook, name: 'REST & GraphQL APIs', level: 92 },
      { icon: Database, name: 'PostgreSQL & Redis', level: 88 },
      { icon: ShieldCheck, name: 'Auth & Security', level: 86 },
      { icon: Boxes, name: 'Microservices', level: 80 },
    ],
  },
  {
    icon: BrainCircuit,
    title: 'AI & Data',
    description: 'Practical AI that ships — from prompts to production pipelines.',
    accent: 'accent-violet',
    skills: [
      { icon: BrainCircuit, name: 'LLM Integration', level: 85 },
      { icon: Workflow, name: 'RAG Pipelines', level: 82 },
      { icon: FileCode2, name: 'Python & Data Pipelines', level: 84 },
      { icon: Layers, name: 'Vector Databases', level: 78 },
      { icon: Sparkles, name: 'Prompt Engineering', level: 88 },
    ],
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    description: 'Everything running smoothly — deployed, monitored, automated.',
    accent: 'accent-cyan',
    skills: [
      { icon: Cloud, name: 'AWS & GCP', level: 85 },
      { icon: ContainerIcon, name: 'Docker & Kubernetes', level: 86 },
      { icon: GitBranch, name: 'CI/CD Pipelines', level: 88 },
      { icon: Terminal, name: 'Infrastructure as Code', level: 78 },
      { icon: Gauge, name: 'Monitoring & Observability', level: 82 },
    ],
  },
];

export interface SkillsShowcaseProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function SkillsShowcase({
  eyebrow = 'Our Expertise',
  title = 'What We Do Best',
  subtitle = 'A full-stack studio — design, engineering, AI and cloud under one roof, proven across real projects.',
}: SkillsShowcaseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <Section className={styles.root}>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="left" />
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
            {title} <GradientText>→ Expertise</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            {subtitle}
          </motion.p>
        </motion.div>

        {/* ---------- Category cards ---------- */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {SKILL_CATEGORIES.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <motion.article
                key={category.title}
                className={cn(styles.card, styles[category.accent])}
                variants={itemVariants}
              >
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon}>
                    <CategoryIcon size={18} aria-hidden="true" />
                  </span>
                  <div className={styles.cardHeaderText}>
                    <h3 className={styles.cardTitle}>{category.title}</h3>
                    <p className={styles.cardDesc}>{category.description}</p>
                  </div>
                </div>

                <ul className={styles.skillList}>
                  {category.skills.map((skill, skillIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <li key={skill.name} className={styles.skill}>
                        <div className={styles.skillTop}>
                          <span className={styles.skillIcon}>
                            <SkillIcon size={14} aria-hidden="true" />
                          </span>
                          <span className={styles.skillName}>{skill.name}</span>
                          <span className={styles.skillLevel}>{skill.level}%</span>
                        </div>
                        <div className={styles.skillTrack}>
                          <motion.span
                            className={styles.skillFill}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{
                              duration: 0.9,
                              ease: 'easeOut',
                              delay: 0.15 + skillIndex * 0.08,
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </motion.article>
            );
          })}
        </motion.div>
      </Container>
    </Section>
  );
}

export default SkillsShowcase;
