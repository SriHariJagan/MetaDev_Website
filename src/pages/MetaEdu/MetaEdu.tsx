// MetaEdu.tsx — premium EdTech platform landing page
// Concept: learning journey hero with lesson roadmap, course catalog,
// audience switcher and a semester journey.
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Brain,
  Building2,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Flame,
  GraduationCap,
  LineChart,
  Mic,
  PenLine,
  Presentation,
  Rocket,
  Share2,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  Video,
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
import { SEO } from '@/seo/SEO';
import styles from './MetaEdu.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;

/* ------------------------------------------------------------------ */
/* 1. Hero visual — learning studio dashboard                          */
/* ------------------------------------------------------------------ */

const LEARNERS = [
  {
    name: 'A. Silva',
    course: 'Data Science · Module 4',
    progress: 68,
    attendance: 96,
    quiz: 94,
    streak: '12d',
    status: 'On track',
    color: '#14b8a6',
  },
  {
    name: 'J. Kim',
    course: 'CS 201 · Module 2',
    progress: 41,
    attendance: 89,
    quiz: 88,
    streak: '8d',
    status: 'On track',
    color: '#8b5cf6',
  },
  {
    name: 'R. Ortiz',
    course: 'UX Design · Module 6',
    progress: 84,
    attendance: 98,
    quiz: 95,
    streak: '21d',
    status: 'Top 5%',
    color: '#10b981',
  },
  {
    name: 'M. Nair',
    course: 'Data Science · Module 1',
    progress: 22,
    attendance: 72,
    quiz: 79,
    streak: '3d',
    status: 'Watch',
    color: '#f59e0b',
  },
] as const;

const LESSONS = [
  { title: 'Intro & setup', duration: '25 min', icon: BookOpen },
  { title: 'Data wrangling', duration: '40 min', icon: LineChart },
  { title: 'Visualisation', duration: '35 min', icon: Presentation },
  { title: 'Capstone project', duration: '2 hrs', icon: PenLine },
] as const;

function LearningStudio() {
  const [learner, setLearner] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setLearner((l) => (l + 1) % LEARNERS.length), 3200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable module constant
  }, [LEARNERS.length]);

  const current = LEARNERS[learner];
  const activeStep = Math.min(LESSONS.length - 1, Math.floor(current.progress / 25));

  return (
    <div className={styles.studioVisual}>
      <div className={styles.studioGlow} aria-hidden="true" />
      <div className={styles.studioGrid} aria-hidden="true" />

      {/* Subtle orbit rings as decoration */}
      <div className={styles.studioRings} aria-hidden="true">
        <span className={styles.studioRing1} />
        <span className={styles.studioRing2} />
      </div>

      {/* Central studio card */}
      <div className={styles.studioCard}>
        <div className={styles.studioHeader}>
          <span className={styles.studioHeaderTitle}>
            <GraduationCap size={14} aria-hidden="true" />
            Learning Studio
          </span>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            Live · 2,340 enrolled
          </span>
        </div>

        {/* Learner switcher dots */}
        <div className={styles.learnerDots}>
          {LEARNERS.map((l, i) => (
            <button
              key={l.name}
              type="button"
              className={cn(styles.learnerDot, learner === i && styles.learnerDotActive)}
              onClick={() => setLearner(i)}
              aria-label={`View ${l.name}`}
              style={learner === i ? { background: l.color } : undefined}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={learner}
            className={styles.journeyBody}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Learner spotlight */}
            <div className={styles.spotlight}>
              <div className={styles.avatarWrap}>
                <span
                  className={styles.avatarDisc}
                  style={{ background: `linear-gradient(135deg, ${current.color}, #0f172a)` }}
                >
                  {current.name.charAt(0)}
                </span>
                <span className={styles.avatarRing} />
                <span className={styles.avatarPct} style={{ color: current.color }}>
                  {current.progress}%
                </span>
              </div>
              <div className={styles.spotlightInfo}>
                <span className={styles.learnerName}>{current.name}</span>
                <span className={styles.learnerCourse}>{current.course}</span>
                <span className={styles.spotlightStatus} style={{ color: current.color }}>
                  <span className={styles.spotlightDot} style={{ background: current.color }} />
                  {current.status}
                </span>
              </div>
            </div>

            {/* Lesson roadmap */}
            <div className={styles.roadmap}>
              {LESSONS.map((lesson, i) => (
                <div key={lesson.title} className={styles.roadmapRow}>
                  <div className={styles.roadmapRail}>
                    <span
                      className={cn(
                        styles.roadmapNode,
                        i < activeStep && styles.roadmapNodeDone,
                        i === activeStep && styles.roadmapNodeActive,
                      )}
                    >
                      {i < activeStep ? <Check size={10} aria-hidden="true" /> : null}
                    </span>
                    {i < LESSONS.length - 1 && (
                      <span
                        className={cn(
                          styles.roadmapLine,
                          i < activeStep && styles.roadmapLineDone,
                        )}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      styles.roadmapCard,
                      i === activeStep && styles.roadmapCardActive,
                    )}
                  >
                    <lesson.icon size={13} className={styles.roadmapIcon} aria-hidden="true" />
                    <span className={styles.roadmapTitle}>{lesson.title}</span>
                    <span className={styles.roadmapTime}>{lesson.duration}</span>
                    {i < activeStep && (
                      <CheckCircle2 size={13} className={styles.roadmapCheck} aria-hidden="true" />
                    )}
                    {i === activeStep && <span className={styles.roadmapNow}>In progress</span>}
                  </span>
                </div>
              ))}
            </div>

            {/* Journey progress */}
            <div className={styles.journeyProgress}>
              <div className={styles.progressTrack}>
                <motion.span
                  className={styles.progressFill}
                  initial={{ width: '0%' }}
                  animate={{ width: `${current.progress}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
              <div className={styles.progressMeta}>
                <span>Module {activeStep + 1} of {LESSONS.length}</span>
                <span>{current.progress}% complete</span>
              </div>
            </div>

            {/* Engagement chips */}
            <div className={styles.engagementChips}>
              <span className={styles.engagementChip}>
                <Users size={12} aria-hidden="true" /> Attendance {current.attendance}%
              </span>
              <span className={styles.engagementChip}>
                <ClipboardCheck size={12} aria-hidden="true" /> Quiz {current.quiz}%
              </span>
              <span className={styles.engagementChip}>
                <Flame size={12} aria-hidden="true" /> Streak {current.streak}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating chips */}
      <div className={`${styles.floatChip} ${styles.floatChip1}`}>
        <ClipboardCheck size={13} aria-hidden="true" />
        Quiz score · 94%
      </div>
      <div className={`${styles.floatChip} ${styles.floatChip2}`}>
        <Sparkles size={13} aria-hidden="true" />
        AI tutor · online
      </div>
      <div className={`${styles.floatChip} ${styles.floatChip3}`}>
        <Award size={13} aria-hidden="true" />
        Certificate unlocked
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Data                                                             */
/* ------------------------------------------------------------------ */

const EDU_STATS = [
  {
    icon: Users,
    value: 2.4,
    suffix: 'M+',
    label: 'learners learning on the platform',
    sub: 'across K-12, universities and enterprises',
  },
  {
    icon: Trophy,
    value: 89,
    suffix: '%',
    label: 'average course completion rate',
    sub: 'vs. the industry average of 15%',
  },
  {
    icon: Brain,
    value: 4.6,
    suffix: 'x',
    label: 'faster skill mastery with AI tutoring',
    sub: 'adaptive practice that meets each learner',
  },
  {
    icon: Building2,
    value: 120,
    suffix: '+',
    label: 'institutions running on MetaEdu',
    sub: 'from school districts to Fortune 500 academies',
  },
] as const;

const EDU_MODULES = [
  {
    icon: PenLine,
    title: 'AI Course Authoring',
    desc: 'Build media-rich courses in minutes — AI drafts outlines, generates quizzes and summarizes content automatically.',
    tags: ['Branching paths', 'AI summaries', 'Rich media'],
    accent: 'blue',
  },
  {
    icon: Brain,
    title: 'Adaptive Learning Paths',
    desc: 'Every learner gets a path tuned to their pace and gaps — difficulty adjusts in real time as they progress.',
    tags: ['Real-time pacing', 'Skill mapping', 'Personalized'],
    accent: 'violet',
  },
  {
    icon: Video,
    title: 'Virtual Classrooms',
    desc: 'Live lectures, breakout rooms, shared whiteboards and recordings — a campus that fits in a browser tab.',
    tags: ['Live sessions', 'Breakout rooms', 'Recording'],
    accent: 'pink',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessments & Proctoring',
    desc: 'Auto-graded quizzes, rubric-based essays and AI proctoring that flags suspicious behavior — fairly.',
    tags: ['Auto-grading', 'AI proctoring', 'Rubrics'],
    accent: 'amber',
  },
  {
    icon: Flame,
    title: 'Gamified Microlearning',
    desc: '5–15 minute lessons with streaks, leaderboards and XP that turn studying into a daily habit.',
    tags: ['Streaks', 'Leaderboards', 'XP & badges'],
    accent: 'teal',
  },
  {
    icon: Award,
    title: 'Credentials & Badges',
    desc: 'Blockchain-verified certificates and stackable micro-credentials learners can share anywhere.',
    tags: ['Verified', 'Stackable', 'Shareable'],
    accent: 'green',
  },
] as const;

const INSIDE_FEATURES = [
  {
    icon: Brain,
    title: 'AI Tutor',
    desc: 'A 24/7 AI tutor embedded in every course — it answers questions, gives hints and adapts explanations to each learner.',
    features: [
      'Instant Q&A on any lesson',
      'Step-by-step hints, not answers',
      'Explains in the learner’s words',
      'Summarizes last session on return',
    ],
    accent: 'blue',
  },
  {
    icon: PenLine,
    title: 'Authoring Studio',
    desc: 'A drag-and-drop studio with templates, media library and AI generation — courses ship in days, not months.',
    features: [
      'Drag-and-drop course builder',
      'AI outline & quiz generation',
      'Template & brand libraries',
      'Multi-language publishing',
    ],
    accent: 'violet',
  },
  {
    icon: Video,
    title: 'Virtual Campus',
    desc: 'Live classes, offices hours and student lounges — social learning that keeps cohorts connected and motivated.',
    features: [
      'Live classes & recordings',
      'Breakout rooms & study groups',
      'Office hours scheduling',
      'Community feeds & clubs',
    ],
    accent: 'pink',
  },
  {
    icon: ClipboardCheck,
    title: 'Assessment Engine',
    desc: 'Item banks, adaptive quizzes and AI-scored essays with detailed feedback — fair evaluation at any scale.',
    features: [
      'Adaptive & mastery quizzes',
      'AI-scored essays & feedback',
      'Anti-cheat & proctoring',
      'Outcome-based rubrics',
    ],
    accent: 'amber',
  },
  {
    icon: LineChart,
    title: 'Learning Analytics',
    desc: 'Institution-wide dashboards that surface at-risk learners early — intervention before it is too late.',
    features: [
      'At-risk learner flags',
      'Attendance & engagement heatmaps',
      'Competency-based reporting',
      'Exportable institutional insights',
    ],
    accent: 'teal',
  },
  {
    icon: Share2,
    title: 'LMS & SSO Integrations',
    desc: 'SCORM, xAPI, LTI 1.3 and SAML/SSO — MetaEdu plugs into Canvas, Moodle, Blackboard and your IdP in a day.',
    features: [
      'SCORM 1.2 / 2004 & xAPI',
      'LTI 1.3 deep linking',
      'SAML 2.0 & OIDC SSO',
      'Canvas, Moodle, Blackboard',
    ],
    accent: 'green',
  },
  {
    icon: Award,
    title: 'Credentials & Badging',
    desc: 'Verified diplomas, digital badges and a learner wallet — proof of skill that travels with the learner.',
    features: [
      'Blockchain-verified certificates',
      'Stackable micro-credentials',
      'Shareable badge links',
      'Employer verification portal',
    ],
    accent: 'cyan',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    desc: 'COPPA, FERPA and GDPR-ready infrastructure with enterprise-grade access controls and auditing.',
    features: [
      'FERPA & COPPA compliant',
      'GDPR & SOC 2 Type II',
      'Role-based access & SSO',
      'Full audit trail on activity',
    ],
    accent: 'red',
  },
] as const;

const AUDIENCES = [
  {
    icon: GraduationCap,
    label: 'For Students',
    hue: 'blue',
    desc: 'A personal learning companion — adaptive courses, an always-on AI tutor and credentials that open doors.',
    features: [
      'Personalized learning path',
      'Gamified streaks & leaderboards',
      '24/7 AI tutor in every course',
      'Portable verified certificates',
    ],
    stats: [
      { value: '+31%', label: 'average completion rate' },
      { value: '2.1x', label: 'faster mastery with AI tutor' },
    ],
  },
  {
    icon: Presentation,
    label: 'For Educators',
    hue: 'violet',
    desc: 'Author courses at the speed of thought and spend class time teaching — not grading or chasing attendance.',
    features: [
      'AI authoring & quiz generation',
      'Auto-graded assessments',
      'At-risk alerts & early warning',
      'Engagement & mastery dashboards',
    ],
    stats: [
      { value: '12h', label: 'saved per week on grading' },
      { value: '94%', label: 'educator satisfaction' },
    ],
  },
  {
    icon: Building2,
    label: 'For Institutions',
    hue: 'teal',
    desc: 'A compliant, white-label campus that scales from one classroom to an entire district or enterprise.',
    features: [
      'White-label branded campus',
      'LMS, SSO & SIS integrations',
      'FERPA / COPPA / GDPR ready',
      'ROI & outcome reporting',
    ],
    stats: [
      { value: '120+', label: 'institutions deployed' },
      { value: '99.98%', label: 'platform uptime' },
    ],
  },
] as const;

const SEMESTER = [
  {
    step: '01',
    icon: GraduationCap,
    title: 'Enroll',
    desc: 'Diagnostics map what the learner already knows and place them on the right path.',
  },
  {
    step: '02',
    icon: BookOpen,
    title: 'Learn',
    desc: 'Adaptive modules and live classes adjust to each learner’s pace and gaps.',
  },
  {
    step: '03',
    icon: Mic,
    title: 'Practice',
    desc: 'Quizzes, labs and projects cement knowledge with instant AI feedback.',
  },
  {
    step: '04',
    icon: ClipboardCheck,
    title: 'Assess',
    desc: 'Proctored exams and competency checks prove mastery against clear outcomes.',
  },
  {
    step: '05',
    icon: Rocket,
    title: 'Graduate',
    desc: 'Verified credentials are issued — and the next pathway starts automatically.',
  },
] as const;

const OUTCOMES = [
  { icon: LineChart, label: 'Course completion', value: '+31%', delta: 'up' },
  { icon: Users, label: 'Dropout rate', value: '-42%', delta: 'down' },
  { icon: Brain, label: 'Assessment scores', value: '+18%', delta: 'up' },
  { icon: Rocket, label: 'Time to proficiency', value: '-3wk', delta: 'down' },
] as const;

const INTEGRATIONS = [
  { name: 'Canvas', type: 'LMS' },
  { name: 'Moodle', type: 'LMS' },
  { name: 'Blackboard', type: 'LMS' },
  { name: 'Google Classroom', type: 'LMS' },
  { name: 'Zoom', type: 'Video' },
  { name: 'Microsoft Teams', type: 'Video' },
  { name: 'Turnitin', type: 'Plagiarism' },
  { name: 'Panopto', type: 'Video' },
  { name: 'PowerSchool', type: 'SIS' },
  { name: 'Stripe', type: 'Payments' },
  { name: 'Slack', type: 'Comms' },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaEduPage() {
  const [activeAudience, setActiveAudience] = useState(0);
  const [semesterStep, setSemesterStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSemesterStep((s) => (s + 1) % SEMESTER.length), 3800);
    return () => clearInterval(t);
  }, []);

  const audience = AUDIENCES[activeAudience];

  return (
    <>
      <SEO />
      <div className={styles.page}>
      <GradientDefs />

      {/* ================= HERO ================= */}
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
                <GradientText>Learn anything,</GradientText>
                <br />
                anywhere, together
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaEdu is the AI-powered campus for schools, universities and enterprises —
                adaptive courses, virtual classrooms, AI tutoring and verified credentials in
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
              <LearningStudio />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ================= DOMAIN STATS ================= */}
      <Section size="md" bordered className={styles.statsSection}>
        <div className={styles.statsGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>By the numbers</span>}
            title={
              <>
                A campus built for <GradientText>real outcomes</GradientText>
              </>
            }
            subtitle="MetaEdu powers schools, universities and enterprise academies — with results worth reporting."
          />
          <motion.div
            className={styles.statsGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {EDU_STATS.map((stat) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard className={styles.statCard}>
                  <div className={styles.statIconRow}>
                    <IconCircle size="md" variant="gradient">
                      <stat.icon size={16} stroke="url(#grad-blue)" aria-hidden="true" />
                    </IconCircle>
                    <span className={styles.statPulse} aria-hidden="true" />
                  </div>
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSub}>{stat.sub}</span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ================= COURSE CATALOG ================= */}
      <Section size="lg" bordered id="modules">
        <div className={styles.modulesGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
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
            {EDU_MODULES.map((mod) => (
              <motion.div key={mod.title} variants={defaultItemVariants}>
                <GlassCard className={cn(styles.moduleCard, styles[`mod-${mod.accent}`])}>
                  <div className={styles.moduleTop}>
                    <IconCircle size="lg" variant="gradient">
                      <mod.icon size={20} stroke={`url(#grad-${mod.accent})`} aria-hidden="true" />
                    </IconCircle>
                    <ArrowUpRight size={16} className={styles.moduleArrow} aria-hidden="true" />
                  </div>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.desc}</p>
                  <div className={styles.moduleTags}>
                    {mod.tags.map((tag) => (
                      <span key={tag} className={styles.moduleTag}>{tag}</span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ================= WHAT'S INSIDE ================= */}
      <Section size="lg" bordered id="inside">
        <div className={styles.insideGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>What's inside</span>}
            title={
              <>
                Everything a modern campus <GradientText>needs in one platform</GradientText>
              </>
            }
            subtitle="Eight tightly-integrated suites — from the AI tutor to the credentialing engine — each one production-grade on its own, transformative together."
          />

          <motion.div
            className={styles.insideGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {INSIDE_FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title} variants={defaultItemVariants}>
                  <GlassCard className={cn(styles.insideCard, styles[`in-${f.accent}`])}>
                    <div className={styles.insideCardHead}>
                      <IconCircle size="lg" variant="gradient">
                        <Icon size={20} stroke={`url(#grad-${f.accent})`} aria-hidden="true" />
                      </IconCircle>
                      <h3 className={styles.insideCardTitle}>{f.title}</h3>
                    </div>
                    <p className={styles.insideCardDesc}>{f.desc}</p>
                    <ul className={styles.insideCardList}>
                      {f.features.map((feat) => (
                        <li key={feat} className={styles.insideCardFeature}>
                          <CheckCircle2 size={13} aria-hidden="true" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </Section>

      {/* ================= AUDIENCES ================= */}
      <Section size="lg" bordered>
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Who it's for</span>}
            title={
              <>
                One campus, <GradientText>three perspectives</GradientText>
              </>
            }
            subtitle="MetaEdu adapts to the role — every learner, educator and institution sees the campus that fits them."
          />

          <div className={styles.audienceTabs}>
            {AUDIENCES.map((au, i) => {
              const Icon = au.icon;
              return (
                <button
                  key={au.label}
                  type="button"
                  className={cn(
                    styles.audienceTab,
                    activeAudience === i && styles.audienceTabActive,
                    styles[`au-${au.hue}`],
                  )}
                  onClick={() => setActiveAudience(i)}
                >
                  <span className={styles.audienceTabIcon}>
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <span className={styles.audienceTabLabel}>{au.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeAudience}
              className={cn(styles.audiencePanel, styles[`au-${audience.hue}`])}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className={styles.audiencePanelGlow} aria-hidden="true" />
              <div className={styles.audiencePanelHead}>
                <div className={styles.audiencePanelIcon}>
                  <audience.icon size={28} stroke={`url(#grad-${audience.hue})`} aria-hidden="true" />
                </div>
                <div>
                  <h3 className={styles.audiencePanelTitle}>{audience.label}</h3>
                  <p className={styles.audiencePanelDesc}>{audience.desc}</p>
                </div>
              </div>
              <div className={styles.audiencePanelBody}>
                <ul className={styles.audiencePanelList}>
                  {audience.features.map((feat) => (
                    <li key={feat} className={styles.audienceFeature}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className={styles.audiencePanelStats}>
                  {audience.stats.map((s) => (
                    <div key={s.label} className={styles.audienceStat}>
                      <span className={styles.audienceStatValue}>{s.value}</span>
                      <span className={styles.audienceStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </Container>
      </Section>

      {/* ================= SEMESTER JOURNEY ================= */}
      <Section size="lg" bordered className={styles.journeySection}>
        <div className={styles.journeyGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>The semester</span>}
            title={
              <>
                A learner journey that <GradientText>runs itself</GradientText>
              </>
            }
            subtitle="From enrollment to graduation — every stage orchestrated, every learner supported."
          />

          <div className={styles.journeyTrack}>
            {SEMESTER.map((step, i) => {
              const Icon = step.icon;
              const isActive = semesterStep === i;
              const isDone = i < semesterStep || (semesterStep === 0 && i === SEMESTER.length - 1);
              return (
                <motion.div
                  key={step.step}
                  className={cn(styles.journeyStep, isActive && styles.journeyStepActive)}
                  animate={{ scale: isActive ? 1.04 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <div className={cn(styles.journeyStepNode, isDone && styles.journeyStepDone)}>
                    <Icon size={18} aria-hidden="true" />
                    {isActive && <span className={styles.journeyPing} aria-hidden="true" />}
                  </div>
                  <span className={styles.journeyStepNum}>{step.step}</span>
                  <h4 className={styles.journeyStepTitle}>{step.title}</h4>
                  <p className={styles.journeyStepDesc}>{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= OUTCOMES ================= */}
      <Section size="lg" bordered>
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Outcomes</span>}
            title={
              <>
                Outcomes your board <GradientText>will notice</GradientText>
              </>
            }
            subtitle="Real-world performance across campuses and academies — not projections."
          />

          <div className={styles.outcomeGrid}>
            {OUTCOMES.map((o) => {
              const Icon = o.icon;
              return (
                <motion.div
                  key={o.label}
                  className={cn(styles.outcomeCard, o.delta === 'up' && styles.outcomeUp)}
                  variants={defaultItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  <span className={styles.outcomeArrow} aria-hidden="true">
                    {o.delta === 'up' ? '↑' : '↓'}
                  </span>
                  <div className={styles.outcomeIcon}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className={styles.outcomeValue}>{o.value}</span>
                  <span className={styles.outcomeLabel}>{o.label}</span>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* ================= INTEGRATIONS ================= */}
      <Section size="md" bordered>
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Integrations</span>}
            title={
              <>
                Plays well with your <GradientText>existing stack</GradientText>
              </>
            }
            subtitle="60+ certified connectors — LMS, video, SIS and payments, out of the box."
          />

          <motion.div
            className={styles.integrationMarquee}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {INTEGRATIONS.map((int) => (
              <motion.div key={`${int.name}-${int.type}`} variants={defaultItemVariants}>
                <div className={styles.integrationTile}>
                  <span className={styles.integrationDot} aria-hidden="true" />
                  <span className={styles.integrationName}>{int.name}</span>
                  <span className={styles.integrationType}>{int.type}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ================= CTA ================= */}
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
                    See how MetaEdu lifts completion to 89% and proves every learning outcome.
                    Book a live walkthrough with our education team.
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
                <div className={styles.ctaEnroll} aria-hidden="true">
                  <div className={styles.ctaEnrollCard}>
                    <span className={styles.ctaEnrollLabel}>Cohort completion</span>
                    <span className={styles.ctaEnrollValue}>
                      <CountUp value={87} suffix="%" />
                    </span>
                    <div className={styles.ctaEnrollTrack}>
                      <motion.span
                        className={styles.ctaEnrollFill}
                        initial={{ width: '0%' }}
                        whileInView={{ width: '87%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </div>
                    <span className={styles.ctaEnrollNote}>+31% vs. non-adaptive cohorts</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
    </>
  );
}

export default MetaEduPage;