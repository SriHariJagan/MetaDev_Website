// AIPowered.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Sparkles,
  BrainCircuit,
  TrendingUp,
  Settings2,
  Cpu,
  AudioLines,
  Bot,
  CheckCircle2,
  Layers,
  ShieldCheck,
  Lock,
  Cloud,
  LineChart,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { SectionHeader } from '@/components/common/SectionHeader';
import { GradientText } from '@/components/common/GradientText';
import { Badge } from '@/components/common/Badge';
import { GlassCard } from '@/components/common/GlassCard';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { fadeUp, staggerContainer } from '@/constants/motion';
import styles from './AIPowered.module.css';

type Accent = 'violet' | 'blue' | 'teal';

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

interface Step {
  id: string;
  number: string;
  icon: LucideIcon;
  accent: Accent;
  title: string;
  description: string;
  features: string[];
}

const STEPS: Step[] = [
  {
    id: 'ai',
    number: '01',
    icon: BrainCircuit,
    accent: 'violet',
    title: 'Artificial Intelligence',
    description: 'Intelligent systems that learn, reason and automate complex tasks with high accuracy.',
    features: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Computer Vision'],
  },
  {
    id: 'predictive',
    number: '02',
    icon: TrendingUp,
    accent: 'blue',
    title: 'Predictive Analytics',
    description: 'Forecast outcomes, identify trends and drive proactive decision-making.',
    features: ['Demand Forecasting', 'Risk Prediction', 'Trend Analysis', 'Performance Modeling'],
  },
  {
    id: 'automation',
    number: '03',
    icon: Settings2,
    accent: 'teal',
    title: 'Automation',
    description: 'Streamline operations and reduce manual effort with intelligent automation.',
    features: ['RPA & Workflow Automation', 'Process Orchestration', 'Task Automation', 'Smart Scheduling'],
  },
  {
    id: 'generative',
    number: '04',
    icon: Cpu,
    accent: 'violet',
    title: 'Generative AI',
    description: 'Create content, code and insights using advanced generative models.',
    features: ['Text Generation', 'Image Generation', 'Code Generation', 'Document Summarization'],
  },
  {
    id: 'voice',
    number: '05',
    icon: AudioLines,
    accent: 'blue',
    title: 'Voice & Speech AI',
    description: 'Enable natural interactions through voice, speech and language intelligence.',
    features: ['Speech-to-Text', 'Text-to-Speech', 'Voice Biometrics', 'Sentiment Analysis'],
  },
  {
    id: 'agentic',
    number: '06',
    icon: Bot,
    accent: 'teal',
    title: 'Agentic AI',
    description: 'Autonomous AI agents that plan, decide and act to achieve business goals.',
    features: ['Autonomous Agents', 'Decision Engines', 'Multi-Agent Systems', 'Goal Optimization'],
  },
];

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: Layers,
    title: 'Advanced AI Models',
    description: 'Built on latest LLMs & ML frameworks',
  },
  {
    icon: ShieldCheck,
    title: 'Responsible AI',
    description: 'Ethical, fair & transparent by design',
  },
  {
    icon: Lock,
    title: 'Enterprise Ready',
    description: 'Secure, scalable & compliant',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Built for performance at scale',
  },
  {
    icon: LineChart,
    title: 'Real Impact',
    description: 'Solving problems, creating value',
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(18, 0.35);

/* ------------------------------------------------------------------ */
/* Step node                                                          */
/* ------------------------------------------------------------------ */

function StepNode({ step, isLast }: { step: Step; isLast: boolean }) {
  const Icon = step.icon;

  return (
    <motion.li
      className={`${styles.step} ${styles[`accent-${step.accent}`]}`}
      variants={itemVariants}
    >
      <div className={styles.nodeRow}>
        <span className={styles.nodeCircle}>
          <Icon size={26} aria-hidden="true" />
        </span>
        {!isLast && (
          <span className={styles.connector}>
            <span className={styles.connectorDot} />
          </span>
        )}
      </div>

      <span className={`${styles.stepNumber} ${styles[`text-${step.accent}`]}`}>
        {step.number}
      </span>
      <h3 className={styles.stepTitle}>{step.title}</h3>
      <p className={styles.stepDesc}>{step.description}</p>

      <GlassCard
        as={motion.ul}
        className={`${styles.featureBox} ${styles[`accent-${step.accent}`]}`}
      >
        {step.features.map((feature) => (
          <li key={feature} className={styles.featureItem}>
            <CheckCircle2
              size={14}
              className={`${styles.featureCheck} ${styles[`text-${step.accent}`]}`}
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </GlassCard>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                       */
/* ------------------------------------------------------------------ */

export function AIPowered() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <Section bordered>
      <BackgroundDecor>
        <div className={styles.glow} />
        <div className={styles.starsField} />
      </BackgroundDecor>

      <Container className={styles.container} ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Badge variant="solid">
            <Sparkles size={14} aria-hidden="true" />
            <span>AI Innovation at Metadev</span>
          </Badge>
        </motion.div>

        <SectionHeader
          align="center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          title={
            <>
              AI-Powered Innovation{' '}
              <GradientText>for a Smarter Future</GradientText>
            </>
          }
          titleClassName={styles.title}
          subtitle="Metadev leverages cutting-edge AI technologies to automate processes, extract
            insights, and create intelligent solutions that drive real-world impact."
          subtitleClassName={styles.subtitle}
        />

        <motion.ul
          className={styles.timeline}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {STEPS.map((step, index) => (
            <StepNode
              key={step.id}
              step={step}
              isLast={index === STEPS.length - 1}
            />
          ))}
        </motion.ul>

        <motion.ul
          className={styles.capabilityStrip}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {CAPABILITIES.map((cap) => (
            <motion.li key={cap.title} className={styles.capabilityItem} variants={itemVariants}>
              <span className={styles.capabilityIcon}>
                <cap.icon size={18} aria-hidden="true" />
              </span>
              <div className={styles.capabilityText}>
                <span className={styles.capabilityTitle}>{cap.title}</span>
                <span className={styles.capabilityDesc}>{cap.description}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
