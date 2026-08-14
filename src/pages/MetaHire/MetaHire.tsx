// MetaHire.tsx — custom landing page for MetaHire (Hiring & Talent Platform)
// Concept: a live recruiting kanban board.
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  FileSearch,
  HeartHandshake,
  KanbanSquare,
  Megaphone,
  Rocket,
  Search,
  Sparkles,
  UserCheck,
  UserPlus,
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
import styles from './MetaHire.module.css';

const VIEWPORT = { once: true, amount: 0.2 } as const;
const HUES = ['blue', 'violet', 'pink', 'amber', 'teal', 'green'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — live recruiting kanban                                */
/* ------------------------------------------------------------------ */

type CandidateCard = {
  name: string;
  role: string;
  match: string;
  hot?: boolean;
  accepted?: boolean;
};

const BOARD_COLUMNS: { title: string; count: number; cards: CandidateCard[] }[] = [
  {
    title: 'Applied',
    count: 128,
    cards: [
      { name: 'A. Patel', role: 'Frontend', match: '84%' },
      { name: 'M. Rossi', role: 'Product', match: '79%' },
    ],
  },
  {
    title: 'Screened',
    count: 32,
    cards: [
      { name: 'S. Kim', role: 'Frontend', match: '96%', hot: true },
      { name: 'J. Doe', role: 'Design', match: '91%' },
    ],
  },
  {
    title: 'Interview',
    count: 9,
    cards: [
      { name: 'L. Chen', role: 'Backend', match: '94%' },
      { name: 'N. Ali', role: 'PM', match: '88%' },
    ],
  },
  {
    title: 'Offer',
    count: 3,
    cards: [{ name: 'R. Silva', role: 'Fullstack', match: '98%', accepted: true }],
  },
];

function KanbanVisual() {
  return (
    <div className={styles.kanbanVisual} aria-hidden="true">
      <div className={styles.kanbanGlow} />
      <div className={styles.kanbanBoard}>
        {BOARD_COLUMNS.map((column) => (
          <div key={column.title} className={styles.kanbanColumn}>
            <div className={styles.kanbanColumnHeader}>
              <span className={styles.kanbanColumnTitle}>{column.title}</span>
              <span className={styles.kanbanColumnCount}>{column.count}</span>
            </div>
            <div className={styles.kanbanColumnBody}>
              {column.cards.map((card) => (
                <div
                  key={card.name}
                  className={cn(
                    styles.candidateCard,
                    card.hot && styles.candidateCardHot,
                    card.accepted && styles.candidateCardAccepted,
                  )}
                >
                  <span className={styles.candidateAvatar}>
                    {card.name.charAt(0)}
                  </span>
                  <span className={styles.candidateInfo}>
                    <span className={styles.candidateName}>{card.name}</span>
                    <span className={styles.candidateRole}>{card.role}</span>
                  </span>
                  <span className={styles.candidateMatch}>
                    {card.accepted ? (
                      <CheckCircle2 size={13} />
                    ) : (
                      <>
                        {card.match}
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`${styles.chip} ${styles.chip1}`}>
        <Sparkles size={13} />
        AI Match · 96%
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <CalendarDays size={13} />
        Interview · 24h
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <Rocket size={13} />
        Offer accepted
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const FUNNEL_STATS = [
  {
    value: 98,
    suffix: '%',
    label: 'of Fortune 500 companies use an ATS with AI-assisted filtering',
    source: 'Jobscan · ATS data, 2025',
  },
  {
    value: 75,
    suffix: '%',
    label: 'of resumes are rejected by automated screening before a human reads them',
    source: 'ResumeGo · Screening study',
  },
  {
    value: 23,
    suffix: ' hrs',
    label: 'is what a recruiter spends screening resumes for a single hire — AI cuts this by up to 75%',
    source: 'Glassdoor · Recruiter workload',
  },
  {
    value: 33,
    suffix: '%',
    label: 'average reduction in time-to-hire for teams running AI across the full funnel',
    source: 'DemandSage · AI in recruiting, 2026',
  },
] as const;

const BOARD_FEATURES = [
  {
    icon: FileSearch,
    title: 'AI Resume Screening & Matching',
    description:
      'Semantic AI parses and scores every application against the role — processing 250 resumes in the time a human reviews one, with skills-based matching instead of keyword guessing.',
  },
  {
    icon: Megaphone,
    title: 'Job Posting & Distribution',
    description:
      'Publish once, reach everywhere. Distribute openings across boards, social and referral networks, with AI-optimised job descriptions that attract more qualified applicants.',
  },
  {
    icon: CalendarDays,
    title: 'Interview Scheduling & Video',
    description:
      'One-click interview booking across calendars and time zones, with structured one-way and live video interviews built in — 88% of interviews booked within 24 hours.',
  },
  {
    icon: KanbanSquare,
    title: 'Candidate Tracking Board',
    description:
      'A visual pipeline from apply to offer with drag-and-drop stages, interviewer scorecards and a single source of truth for every requisition and stakeholder.',
  },
  {
    icon: UserCheck,
    title: 'Offer Management & Onboarding',
    description:
      'Automated offer letters, approval flows and e-signatures, plus a guided onboarding checklist that turns accepted offers into productive employees.',
  },
  {
    icon: BarChart3,
    title: 'Workforce & Hiring Analytics',
    description:
      'Real-time dashboards for time-to-hire, cost-per-hire, source quality and diversity — the board-level analytics that turn recruiting into a measurable advantage.',
  },
] as const;

const PIPELINE_STAGES = [
  {
    icon: Search,
    step: '01',
    title: 'Source',
    description: 'AI sourcing surfaces qualified and passive candidates in days, not weeks.',
    stat: '48 hr first shortlist',
  },
  {
    icon: FileSearch,
    step: '02',
    title: 'Screen',
    description: 'Automated screening scores every applicant and flags top matches instantly.',
    stat: '−75% screen time',
  },
  {
    icon: CalendarDays,
    step: '03',
    title: 'Interview',
    description: 'Self-scheduling and structured video interviews compress the loop.',
    stat: '88% booked in 24h',
  },
  {
    icon: Rocket,
    step: '04',
    title: 'Offer',
    description: 'Standardised offers with automated approvals and e-signatures.',
    stat: '$850–1,400 saved / hire',
  },
  {
    icon: HeartHandshake,
    step: '05',
    title: 'Onboard',
    description: 'Guided checklists and document collection for productive day-one starts.',
    stat: 'Productive from day one',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaHirePage() {
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
                  <UserPlus size={14} aria-hidden="true" />
                  Hiring & Talent Platform
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Move talent</GradientText>
                <br />
                down the board, fast
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaHire is an AI-powered hiring platform that sources, screens, schedules and
                onboard with machine speed — so your recruiters spend their time with people,
                not paperwork. Built for high-volume and enterprise teams that need quality
                hires without the grind.
              </motion.p>

              <motion.div className={styles.heroActions} variants={defaultItemVariants}>
                <Button to="/contact" variant="gradient">
                  Book a demo
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button to="#features" variant="outline">
                  Explore features
                </Button>
              </motion.div>

              <motion.div className={styles.heroTrust} variants={defaultItemVariants}>
                {['AI-powered', 'Enterprise-grade', 'GDPR-ready'].map((item) => (
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
              <KanbanVisual />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Funnel stats ---------------- */}
      <Section size="md" bordered className={styles.funnelSection}>
        <div className={styles.funnelGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <motion.div
            className={styles.funnelGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {FUNNEL_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.funnelCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.funnelValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.funnelLabel}>{stat.label}</p>
                  <span className={styles.funnelSource}>{stat.source}</span>
                  <span className={styles.funnelBars} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Features (ledger rows) ---------------- */}
      <Section size="lg" bordered id="features">
        <div className={styles.featuresGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>Capabilities</span>}
            title={
              <>
                Everything you need to <GradientText>hire smarter</GradientText>
              </>
            }
            subtitle="Six tightly integrated modules that cover the entire hiring lifecycle — from first click to first day."
          />

          <motion.div
            className={styles.ledger}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {BOARD_FEATURES.map((feature, index) => (
              <motion.div key={feature.title} variants={defaultItemVariants}>
                <GlassCard className={styles.ledgerRow}>
                  <span className={styles.ledgerIndex}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <IconCircle size="lg" variant="gradient">
                    <feature.icon size={20} stroke={`url(#grad-blue)`} aria-hidden="true" />
                  </IconCircle>
                  <div className={styles.ledgerBody}>
                    <h3 className={styles.ledgerTitle}>{feature.title}</h3>
                    <p className={styles.ledgerDesc}>{feature.description}</p>
                  </div>
                  <span className={styles.ledgerArrow}>
                    <ArrowRight size={18} aria-hidden="true" />
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Pipeline swimlane ---------------- */}
      <Section size="lg" bordered className={styles.pipelineSection}>
        <div className={styles.pipelineGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                A hiring pipeline that runs <GradientText>like a board</GradientText>
              </>
            }
            subtitle="Five stages, each with its own mini-board — drag candidates forward, watch the machine do the rest."
          />

          <motion.div
            className={styles.pipeline}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {PIPELINE_STAGES.map((stage, index) => (
              <motion.div key={stage.step} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.pipelineCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <div className={styles.pipelineTop}>
                    <span className={styles.pipelineBadge}>
                      <stage.icon size={18} aria-hidden="true" />
                    </span>
                    <span className={styles.pipelineNum}>{stage.step}</span>
                  </div>
                  <h3 className={styles.pipelineTitle}>{stage.title}</h3>
                  <p className={styles.pipelineDesc}>{stage.description}</p>
                  <div className={styles.pipelineMiniCards}>
                    <span className={styles.pipelineMiniCard} />
                    <span className={styles.pipelineMiniCard} />
                    <span className={styles.pipelineMiniCard} />
                  </div>
                  <span className={styles.pipelineStat}>{stage.stat}</span>
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
                  <span className={styles.ctaEyebrow}>MetaHire</span>
                  <h2 className={styles.ctaTitle}>
                    Ready to hire at <GradientText>machine speed?</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaHire can cut your time-to-hire and cost-per-hire. Book a
                    30-minute live walkthrough with our team.
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
                <div className={styles.ctaCandidate} aria-hidden="true">
                  <div className={styles.ctaCandidateTop}>
                    <span className={styles.ctaCandidateAvatar}>AK</span>
                    <div className={styles.ctaCandidateInfo}>
                      <span className={styles.ctaCandidateName}>Amara Kessler</span>
                      <span className={styles.ctaCandidateRole}>Senior Frontend Engineer</span>
                    </div>
                    <CheckCircle2 size={18} className={styles.ctaCandidateTick} />
                  </div>
                  <div className={styles.ctaCandidateTrack}>
                    <span className={styles.ctaStageDone}>Applied</span>
                    <span className={styles.ctaStageDone}>Screened</span>
                    <span className={styles.ctaStageDone}>Interview</span>
                    <span className={styles.ctaStageActive}>
                      <span className={styles.ctaStageDot} />
                      Offer
                    </span>
                  </div>
                  <div className={styles.ctaCandidateMeta}>
                    <span className={styles.ctaCandidateTime}>Hired in 12.4 days</span>
                    <span className={styles.ctaCandidateOffer}>Offer accepted</span>
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

export default MetaHirePage;
