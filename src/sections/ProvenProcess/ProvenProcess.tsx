// ProvenProcess.tsx
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Search,
  ClipboardList,
  PenTool,
  Code2,
  ShieldCheck,
  Rocket,
  Headphones,
  CheckCircle2,
  Sparkles,
  Users,
  Calendar,
  BadgeCheck,
  Clock,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { Badge } from '@/components/common/Badge';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { fadeUp, staggerContainer } from '@/constants/motion';
import styles from './ProvenProcess.module.css';

type Accent = 'violet' | 'blue' | 'cyan' | 'green' | 'amber' | 'orange' | 'pink';

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
}

const STEPS: Step[] = [
  {
    id: 'discover',
    number: '01',
    icon: Search,
    accent: 'violet',
    title: 'Discover',
    description: 'We understand your business, goals, and challenges in depth.',
  },
  {
    id: 'plan',
    number: '02',
    icon: ClipboardList,
    accent: 'blue',
    title: 'Plan',
    description: 'We define the strategy, architecture, and execution plan.',
  },
  {
    id: 'design',
    number: '03',
    icon: PenTool,
    accent: 'cyan',
    title: 'Design',
    description: 'We craft intuitive UI/UX and seamless product experiences.',
  },
  {
    id: 'develop',
    number: '04',
    icon: Code2,
    accent: 'green',
    title: 'Develop',
    description: 'We build scalable, secure and future-ready solutions.',
  },
  {
    id: 'test',
    number: '05',
    icon: ShieldCheck,
    accent: 'amber',
    title: 'Test',
    description: 'We ensure quality, security and performance at every step.',
  },
  {
    id: 'deploy',
    number: '06',
    icon: Rocket,
    accent: 'orange',
    title: 'Deploy',
    description: 'We deploy with precision and ensure smooth launch.',
  },
  {
    id: 'support',
    number: '07',
    icon: Headphones,
    accent: 'pink',
    title: 'Support',
    description: 'We provide continuous support and drive long-term success.',
  },
];

const VALUES: { icon: LucideIcon; accent: Accent; label: string }[] = [
  { icon: CheckCircle2, accent: 'violet', label: 'Customer Centric Approach' },
  { icon: CheckCircle2, accent: 'blue', label: 'Agile & Iterative Delivery' },
  { icon: CheckCircle2, accent: 'cyan', label: 'Transparent Communication' },
  { icon: CheckCircle2, accent: 'green', label: 'Quality & Security First' },
  { icon: CheckCircle2, accent: 'blue', label: 'On-Time, Every Time' },
];

interface StatItem {
  icon: LucideIcon;
  accent: Accent;
  value: string;
  label: string;
}

const STATS: StatItem[] = [
  { icon: Users, accent: 'violet', value: '98%', label: 'Client Satisfaction' },
  { icon: Calendar, accent: 'blue', value: 'On-Time', label: 'Delivery Rate' },
  { icon: BadgeCheck, accent: 'cyan', value: '250+', label: 'Projects Delivered' },
  { icon: Clock, accent: 'green', value: '99.9%', label: 'Uptime Delivered' },
  { icon: Headphones, accent: 'amber', value: '24/7', label: 'Support Available' },
  { icon: ShieldCheck, accent: 'pink', value: '100%', label: 'Quality Assured' },
  { icon: BarChart3, accent: 'violet', value: '5M+', label: 'Users Impacted' },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.05);

const itemVariants = fadeUp(18, 0.35);

/* ------------------------------------------------------------------ */
/* Main section                                                       */
/* ------------------------------------------------------------------ */

export function ProvenProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  return (
    <Section bordered>
      <BackgroundDecor>
        <div className={styles.glow} />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={containerRef}>
        <div className={styles.layout}>
          {/* ---------- Sidebar ---------- */}
          <motion.div
            className={styles.sidebar}
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Badge variant="solid">
              <Sparkles size={14} aria-hidden="true" />
              <span>Our Process</span>
            </Badge>

            <h2 className={styles.title}>
              Our Proven Process.
              <br />
              Built for <GradientText>Success.</GradientText>
            </h2>

            <p className={styles.subtitle}>
              A structured, transparent and agile approach that ensures we deliver
              high-quality digital solutions that drive real impact.
            </p>

            <motion.ul
              className={styles.valueList}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {VALUES.map((value) => (
                <motion.li
                  key={value.label}
                  className={`${styles.valueItem} ${styles[`accent-${value.accent}`]}`}
                  variants={itemVariants}
                >
                  <value.icon size={12} className={styles.valueIcon} aria-hidden="true" />
                  <span>{value.label}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* ---------- Timeline ---------- */}
          <div className={styles.processArea}>
            <motion.ul
              className={styles.stepGrid}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {STEPS.map((step) => (
                <motion.li
                  key={step.id}
                  className={`${styles.stepCard} ${styles[`accent-${step.accent}`]}`}
                  variants={itemVariants}
                >
                  <span className={styles.stepIcon}>
                    <step.icon size={16} aria-hidden="true" />
                  </span>

                  <span className={styles.stepNum}>{step.number}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.description}</p>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* ---------- Stats bar ---------- */}
        <motion.ul
          className={styles.statsBar}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {STATS.map((stat) => (
            <motion.li
              key={stat.label}
              className={`${styles.statItem} ${styles[`accent-${stat.accent}`]}`}
              variants={itemVariants}
            >
              <span className={styles.statIcon}>
                <stat.icon size={14} aria-hidden="true" />
              </span>
              <span className={styles.statText}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}