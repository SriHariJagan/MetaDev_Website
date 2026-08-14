// MetaEdu.tsx — custom landing page for MetaEdu (EdTech Platform)
// Concept: a learning path roadmap with progress checkpoints.
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BookOpen,
  Brain,
  CheckCircle2,
  ClipboardCheck,
  GraduationCap,
  Mic,
  PlayCircle,
  Rocket,
  Trophy,
  Users,
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { CountUp } from '@/components/common/CountUp';
import { GlassCard } from '@/components/common/GlassCard';
import { GradientDefs } from '@/components/common/GradientDefs';
import { GradientText } from '@/components/common/GradientText';
import { IconCircle } from '@/components/common/IconCircle';
import { Section } from '@/components/common/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { defaultContainerVariants, defaultItemVariants } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './MetaEdu.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['blue', 'violet', 'pink', 'amber', 'teal', 'green'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — learning path roadmap                                 */
/* ------------------------------------------------------------------ */

const PATH_STOPS = [
  { icon: BookOpen, title: 'Intro', progress: '100%', done: true },
  { icon: Brain, title: 'Core', progress: '100%', done: true },
  { icon: Mic, title: 'Practice', progress: '64%', done: false },
  { icon: Rocket, title: 'Project', progress: '0%', done: false },
  { icon: Award, title: 'Certify', progress: '0%', done: false },
] as const;

function PathVisual() {
  return (
    <div className={styles.pathVisual} aria-hidden="true">
      <div className={styles.pathGlow} />
      <div className={styles.pathCard}>
        <div className={styles.pathHeader}>
          <span className={styles.pathHeaderTitle}>
            <GraduationCap size={14} /> Course: Data Foundations
          </span>
          <span className={styles.pathHeaderPill}>64%</span>
        </div>

        <div className={styles.pathRoute}>
          <div className={styles.pathRail}>
            <motion.span
              className={styles.pathRailFill}
              initial={{ height: '0%' }}
              animate={{ height: '64%' }}
              transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          {PATH_STOPS.map((stop) => (
            <div key={stop.title} className={styles.pathStop}>
              <span className={cn(styles.pathDot, stop.done && styles.pathDotDone)}>
                {stop.done ? <CheckCircle2 size={13} /> : <stop.icon size={13} />}
              </span>
              <span className={styles.pathStopInfo}>
                <span className={styles.pathStopTitle}>{stop.title}</span>
                <span className={styles.pathStopProgress}>{stop.progress}</span>
              </span>
            </div>
          ))}
        </div>

        <div className={styles.pathFooter}>
          <span className={styles.pathFooterItem}>
            <Trophy size={12} /> Top 5% of class
          </span>
          <span className={styles.pathFooterItem}>
            <Users size={12} /> 12,480 learners
          </span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <PlayCircle size={13} />
        Next lesson · 12m
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <ClipboardCheck size={13} />
        Quiz score · 94%
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const GRADE_WIDTHS = ['72%', '58%', '88%', '64%'] as const;

const EDU_STATS = [
  {
    value: 28.58,
    suffix: 'B',
    label: 'USD — the global LMS market in 2025, projected to reach $123.78B by 2033',
    source: 'Grand View Research · LMS Market',
  },
  {
    value: 20.2,
    suffix: '%',
    label: 'CAGR driven by AI personalisation, microlearning and analytics',
    source: 'Grand View Research · LMS Market',
  },
  {
    value: 60,
    suffix: '%',
    label: 'of information is retained better via online learning — up to 60% more than offline',
    source: 'IMARC Group · E-learning Market',
  },
  {
    value: 30,
    suffix: '%+',
    label: 'higher course completion rates with gamified learning experiences',
    source: 'Technavio · E-learning Market, 2026',
  },
] as const;

const EDU_MODULES = [
  {
    icon: BookOpen,
    title: 'Course Authoring & Content',
    description:
      'Build courses with rich media, quizzes and branching paths — AI assists with summaries, quiz generation and adaptive feedback.',
  },
  {
    icon: Brain,
    title: 'Adaptive Learning Paths',
    description:
      'AI personalises each learner journey in real time — universities report 15% engagement gains after adopting adaptive paths.',
  },
  {
    icon: Mic,
    title: 'Virtual Classrooms',
    description:
      'Live video classes, breakout rooms and shared whiteboards — blended learning that boosts retention by 27%.',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessments & Analytics',
    description:
      'Digital assessments with learning analytics dashboards — identify at-risk students 15% faster with predictive flags.',
  },
  {
    icon: Rocket,
    title: 'Gamified Microlearning',
    description:
      '5–15 minute modules, streaks and leaderboards that push completion rates up by 30% or more.',
  },
  {
    icon: Award,
    title: 'Credentials & Badges',
    description:
      'Digital certificates and verifiable credentials — stackable, portable and ready for the credentialing economy.',
  },
] as const;

const JOURNEY = [
  {
    step: '01',
    title: 'Assess',
    description:
      'Diagnostic tests map existing knowledge so every learner starts exactly where they should.',
  },
  {
    step: '02',
    title: 'Learn',
    description:
      'Adaptive modules, video and microlearning adapt difficulty as the learner progresses.',
  },
  {
    step: '03',
    title: 'Practise',
    description:
      'Quizzes, simulations and peer projects cement knowledge — with instant AI feedback.',
  },
  {
    step: '04',
    title: 'Certify',
    description:
      'Verified credentials and analytics that prove outcomes to employers and institutions.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaEduPage() {
  return (
    <div className={styles.page}>
      <GradientDefs />

      {/* ---------------- Hero ---------------- */}
      <Section size="lg" className={styles.hero}>
        <div className={styles.heroAurora} aria-hidden="true">
          <div className={styles.heroGridBg} />
          <div className={`${styles.heroBlob} ${styles.heroBlob1}`} />
          <div className={`${styles.heroBlob} ${styles.heroBlob2}`} />
          <div className={`${styles.heroBlob} ${styles.heroBlob3}`} />
        </div>
        <Container maxWidth="wide">
          <div className={styles.heroGrid}>
            <motion.div
              className={styles.heroCopy}
              variants={defaultContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              
              <motion.div variants={defaultItemVariants}>
                <Badge variant="glass">
                  <GraduationCap size={14} aria-hidden="true" />
                  EdTech Platform
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Every learner,</GradientText>
                <br />
                on their own path
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaEdu is an AI-powered learning platform for institutions and enterprises —
                adaptive courses, virtual classrooms, assessments and verified credentials in
                one place.
              </motion.p>

              <motion.div className={styles.heroActions} variants={defaultItemVariants}>
                <Button to="/contact" variant="gradient">
                  Book a demo
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button to="#modules" variant="outline">
                  Explore features
                </Button>
              </motion.div>

              <motion.div className={styles.heroTrust} variants={defaultItemVariants}>
                {['AI adaptive paths', 'SCORM + xAPI', 'Verified credentials'].map((item) => (
                  <span key={item} className={styles.trustItem}>
                    <CheckCircle2 size={15} className={styles.trustCheck} aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={defaultItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <PathVisual />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Market stats ---------------- */}
      <Section size="md" bordered className={styles.statsSection}>
        <div className={styles.statsGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <motion.div
            className={styles.statsGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {EDU_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.gradeBadge} aria-hidden="true">
                    <GraduationCap size={12} />
                  </span>
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.gradeBar} aria-hidden="true">
                    <i style={{ width: GRADE_WIDTHS[index] }} />
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Feature modules ---------------- */}
      <Section size="lg" bordered id="modules">
        <div className={styles.modulesGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>Capabilities</span>}
            title={
              <>
                Six modules that <GradientText>keep learners going</GradientText>
              </>
            }
            subtitle="Content, delivery, assessment and proof — the complete learning loop, powered by AI."
          />

          <motion.div
            className={styles.moduleGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {EDU_MODULES.map((mod, index) => (
              <motion.div key={mod.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.moduleCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <mod.icon size={20} stroke={`url(#grad-blue)`} aria-hidden="true" />
                  </IconCircle>
                  <span className={styles.chapterNo}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Learning journey (zigzag timeline) ---------------- */}
      <Section size="lg" bordered className={styles.journeySection}>
        <div className={styles.journeyGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>The learner journey</span>}
            title={
              <>
                Assess, learn, practise, <GradientText>prove it</GradientText>
              </>
            }
            subtitle="A four-stage loop that turns enrolments into outcomes — and outcomes into credentials."
          />

          <motion.div
            className={styles.journeyGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {JOURNEY.map((step, index) => (
              <motion.div
                key={step.step}
                variants={defaultItemVariants}
                className={index % 2 === 1 ? styles.journeyCardRaised : undefined}
              >
                <GlassCard className={styles.journeyCard}>
                  <span className={styles.journeyBadge}>{step.step}</span>
                  <h3 className={styles.journeyTitle}>{step.title}</h3>
                  <p className={styles.journeyDesc}>{step.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- CTA ---------------- */}
      <Section size="lg" className={styles.ctaSection}>
        <Container maxWidth="wide">
          <motion.div
            variants={defaultItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className={styles.ctaCard}>
              <div className={styles.ctaGlow} aria-hidden="true" />
              <div className={styles.ctaDots} aria-hidden="true" />
              <div className={styles.ctaGrid}>
                <div className={styles.ctaCopy}>
                  <span className={styles.ctaEyebrow}>MetaEdu</span>
                  <h2 className={styles.ctaTitle}>
                    Watch completion rates <GradientText>climb</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaEdu raises completion by 30% and proves learning outcomes. Book
                    a live walkthrough with our education team.
                  </p>
                  <div className={styles.ctaActions}>
                    <Button to="/contact" variant="gradient">
                      Book a demo
                      <ArrowRight size={16} aria-hidden="true" />
                    </Button>
                    <Button to="/products" variant="outline">
                      Back to all products
                    </Button>
                  </div>
                </div>
                <div className={styles.ctaPath} aria-hidden="true">
                  <div className={styles.ctaPathCard}>
                    <span className={styles.ctaPathLabel}>Cohort progress</span>
                    <span className={styles.ctaPathValue}>78% completion</span>
                    <div className={styles.ctaPathSteps}>
                      <span className={cn(styles.ctaPathStep, styles.ctaPathStepDone)}>1</span>
                      <span className={cn(styles.ctaPathStep, styles.ctaPathStepDone)}>2</span>
                      <span className={cn(styles.ctaPathStep, styles.ctaPathStepDone)}>3</span>
                      <span className={styles.ctaPathStep}>4</span>
                      <span className={styles.ctaPathStep}>5</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}

export default MetaEduPage;
