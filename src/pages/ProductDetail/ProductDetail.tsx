// ProductDetail.tsx — full product landing page
//
// Template-driven: every product gets a complete page (hero, impact
// stats, feature modules, workflow pipeline, CTA). Products with rich
// content in PRODUCT_PAGE_CONTENT get researched, real-world data;
// the rest fall back to professional generic copy derived from
// the shared PRODUCTS constant.
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  FileSearch,
  HeartHandshake,
  KanbanSquare,
  Megaphone,
  Rocket,
  Search,
  Sparkles,
  TrendingUp,
  UserCheck,
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
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
import { PRODUCTS, type ProductMeta } from '@/constants/products';
import { NotFoundPage } from '@/pages/NotFound';
import styles from './ProductDetail.module.css';

/* ------------------------------------------------------------------ */
/* Content model                                                       */
/* ------------------------------------------------------------------ */

interface ProductStat {
  value: number;
  suffix: string;
  label: string;
  source: string;
}

interface ProductFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PipelineStage {
  icon: LucideIcon;
  step: string;
  title: string;
  description: string;
  stat: string;
}

interface ProductPageContent {
  tagline: string;
  description: string;
  stats: ProductStat[];
  features: ProductFeature[];
  pipeline: PipelineStage[];
  ctaTitle: string;
  ctaText: string;
}

/* ------------------------------------------------------------------ */
/* Content — MetaHire (researched industry data, 2025–2026)            */
/* ------------------------------------------------------------------ */

const METAHIRE_CONTENT: ProductPageContent = {
  tagline: 'Hire better talent, five times faster',
  description:
    'MetaHire is an AI-powered hiring and talent platform that sources, screens, schedules and onboard with machine speed — so your recruiters spend their time with people, not paperwork. Built for high-volume and enterprise teams that need quality hires without the grind.',
  stats: [
    {
      value: 98,
      suffix: '%',
      label: 'of Fortune 500 companies use an ATS with AI-assisted filtering',
      source: 'Jobscan · ATS data, 2025',
    },
    {
      value: 75,
      suffix: '%',
      label: 'of resumes are rejected by automated screening before a human ever reads them',
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
      label: 'average reduction in time-to-hire for teams running AI across the full hiring funnel',
      source: 'DemandSage · AI in recruiting, 2026',
    },
  ],
  features: [
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
      icon: CalendarClock,
      title: 'Interview Scheduling & Video',
      description:
        'One-click interview booking across calendars and time zones, with structured one-way and live video interviews built in — 88% of interviews booked within 24 hours.',
    },
    {
      icon: KanbanSquare,
      title: 'Candidate Tracking System',
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
  ],
  pipeline: [
    {
      icon: Search,
      step: '01 · Source',
      title: 'Source',
      description:
        'AI sourcing surfaces qualified and passive candidates in days, not weeks — with a first shortlist ready within 48 hours of intake.',
      stat: '48 hr first shortlist',
    },
    {
      icon: FileSearch,
      step: '02 · Screen',
      title: 'Screen',
      description:
        'Automated screening scores every applicant on skills fit and flags top matches, removing up to 75% of manual screening time.',
      stat: '−75% screen time',
    },
    {
      icon: CalendarDays,
      step: '03 · Interview',
      title: 'Interview',
      description:
        'Self-scheduling and structured video interviews compress the loop — 88% of interviews booked within 24 hours of request.',
      stat: '88% booked in 24h',
    },
    {
      icon: Rocket,
      step: '04 · Offer',
      title: 'Offer',
      description:
        'Standardised offers with automated approvals and e-signatures — saving an estimated $850–$1,400 in cost per hire.',
      stat: '$850–1,400 saved / hire',
    },
    {
      icon: HeartHandshake,
      step: '05 · Onboard',
      title: 'Onboard',
      description:
        'Guided onboarding, task checklists and document collection turn day-one hires into productive team members.',
      stat: 'Productive from day one',
    },
  ],
  ctaTitle: 'Ready to hire at machine speed?',
  ctaText:
    'See how MetaHire can cut your time-to-hire and cost-per-hire. Book a 30-minute live walkthrough with our team.',
};

/* ------------------------------------------------------------------ */
/* Fallback content — keeps every product page complete                */
/* ------------------------------------------------------------------ */

const FALLBACK_FEATURES: ProductFeature[] = [
  {
    icon: Sparkles,
    title: 'AI-Powered Core',
    description:
      'Intelligence embedded across every workflow — automation, recommendations and predictive insight out of the box.',
  },
  {
    icon: KanbanSquare,
    title: 'Unified Workspace',
    description:
      'Every module, team and metric in one consistent, real-time workspace designed for the way your teams work.',
  },
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description:
      'Live dashboards that connect operational activity to business outcomes — from day one.',
  },
  {
    icon: HeartHandshake,
    title: 'Enterprise-Grade Security',
    description:
      'Role-based access, encryption and full audit trails, built to meet enterprise compliance standards.',
  },
  {
    icon: CalendarDays,
    title: 'Seamless Integrations',
    description:
      'Connect the tools you already use — 45+ ready integrations with REST APIs and webhooks for the rest.',
  },
  {
    icon: UserCheck,
    title: 'Dedicated Success',
    description:
      'Implementation, migration and training support from a dedicated success team that knows your goals.',
  },
];

function buildFallbackContent(product: ProductMeta): ProductPageContent {
  return {
    tagline: `Scale ${product.name} across your organisation`,
    description: `${product.name} is Metadev's ${product.subtitle.toLowerCase()}. It brings automation, intelligence and measurable results to every workflow it powers — built on the same secure, battle-tested platform trusted across industries.`,
    stats: [
      {
        value: 18,
        suffix: '+',
        label: 'integrated modules, from core operations to advanced analytics',
        source: 'Metadev platform',
      },
      {
        value: 45,
        suffix: '+',
        label: 'ready-made integrations with the tools your teams already use',
        source: 'Metadev platform',
      },
      {
        value: 500,
        suffix: 'K+',
        label: 'professionals using Metadev products to run their work',
        source: 'Metadev platform',
      },
      {
        value: 24,
        suffix: '/7',
        label: 'monitoring and support, with 99.9% uptime SLA',
        source: 'Metadev platform',
      },
    ],
    features: FALLBACK_FEATURES,
    pipeline: [
      {
        icon: Search,
        step: '01 · Assess',
        title: 'Assess',
        description: 'Workshop your workflows, data and goals with our team to define the right configuration.',
        stat: 'Discovery week',
      },
      {
        icon: Rocket,
        step: '02 · Migrate',
        title: 'Migrate',
        description: 'Guided migration and integration with your existing stack — securely and without downtime.',
        stat: 'Zero-downtime cutover',
      },
      {
        icon: CalendarDays,
        step: '03 · Configure',
        title: 'Configure',
        description: 'Tailored modules, roles and automations are set up to match how your teams actually work.',
        stat: 'Configured to fit',
      },
      {
        icon: HeartHandshake,
        step: '04 · Adopt',
        title: 'Adopt',
        description: 'Team training, onboarding and enablement get users productive fast.',
        stat: 'Train the team',
      },
      {
        icon: BarChart3,
        step: '05 · Optimise',
        title: 'Optimise',
        description: 'Continuous analytics, quarterly business reviews and roadmap alignment keep you improving.',
        stat: 'Improve every quarter',
      },
    ],
    ctaTitle: `Take ${product.name} for a spin`,
    ctaText:
      'Talk to our team and get a tailored walkthrough of how this product fits your organisation.',
  };
}

/* ------------------------------------------------------------------ */
/* Hero visual — colourful hiring-intelligence composition             */
/* ------------------------------------------------------------------ */

const HUES = ['blue', 'violet', 'pink', 'amber', 'teal', 'green'] as const;

function HiringVisual({ product }: { product: ProductMeta }) {
  return (
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.orbit} />
      <div className={styles.orbitRing} />
      <div className={styles.ring} />
      <div className={styles.coreHalo} />
      <div className={styles.core}>
        <span className={styles.coreIcon}>
          <product.icon size={28} strokeWidth={2} />
        </span>
        <span className={styles.coreLabel}>Talent Intelligence</span>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <FileSearch size={14} aria-hidden="true" />
        AI Match · 96%
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <CalendarDays size={14} aria-hidden="true" />
        Interview · 24h
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <UserCheck size={14} aria-hidden="true" />
        Offer accepted
      </div>

      <div className={`${styles.floatCard} ${styles.floatCard1}`}>
        <span className={styles.floatCardLabel}>
          <TrendingUp size={14} aria-hidden="true" />
          Time-to-hire
        </span>
        <span className={styles.floatCardValue}>−33%</span>
      </div>
      <div className={`${styles.floatCard} ${styles.floatCard2}`}>
        <span className={styles.floatCardLabel}>
          <Sparkles size={14} aria-hidden="true" />
          Resumes screened
        </span>
        <span className={styles.floatCardValue}>250× faster</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const VIEWPORT = { once: true, amount: 0.2 } as const;

export function ProductDetailPage() {
  const { productSlug } = useParams<{ productSlug: string }>();
  const product = PRODUCTS.find((item) => item.id === productSlug);

  if (!product) {
    return <NotFoundPage />;
  }

  const content =
    product.id === 'metahire' ? METAHIRE_CONTENT : buildFallbackContent(product);
  const accentClass = styles[`accent-${product.accent}`];

  return (
    <div className={`${styles.page} ${accentClass}`}>
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
                <Link to="/products" className={styles.breadcrumb}>
                  <ArrowLeft size={16} className={styles.breadcrumbIcon} aria-hidden="true" />
                  All products
                </Link>
              </motion.div>

              <motion.div variants={defaultItemVariants}>
                <Badge variant="glass">
                  <product.icon size={14} aria-hidden="true" />
                  {product.subtitle}
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>{product.name}</GradientText>
                <br />
                {content.tagline}
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                {content.description}
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
              <HiringVisual product={product} />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Impact stats ---------------- */}
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
            {content.stats.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={`${styles.statCard} ${styles[`hue-${HUES[index % HUES.length]}`]}`}
                >
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Feature modules ---------------- */}
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
            className={styles.featureGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {content.features.map((feature, index) => (
              <motion.div key={feature.title} variants={defaultItemVariants}>
                <GlassCard
                  className={`${styles.featureCard} ${styles[`hue-${HUES[index % HUES.length]}`]}`}
                >
                  <IconCircle size="lg" variant="gradient">
                    <feature.icon size={20} stroke={`url(#grad-${product.accent})`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Workflow pipeline ---------------- */}
      <Section size="lg" bordered className={styles.pipelineSection}>
        <div className={styles.pipelineGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                From intake to <GradientText>day one</GradientText> in five steps
              </>
            }
            subtitle="A hiring pipeline that automates the repetitive work and keeps humans in the decisions that matter."
          />

          <motion.div
            className={styles.pipeline}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {content.pipeline.map((stage, index) => (
              <motion.div key={stage.step} variants={defaultItemVariants}>
                <GlassCard
                  className={`${styles.pipelineStep} ${styles[`hue-${HUES[index % HUES.length]}`]}`}
                >
                  <span className={styles.stepBadge}>
                    <stage.icon size={20} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className={styles.stepNumber}>{stage.step}</span>
                  <h3 className={styles.stepTitle}>{stage.title}</h3>
                  <p className={styles.stepDesc}>{stage.description}</p>
                  <span className={styles.stepStat}>{stage.stat}</span>
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
              <div className={styles.ctaArc} aria-hidden="true" />
              <div className={styles.ctaDots} aria-hidden="true" />
              <div className={styles.ctaPing} aria-hidden="true" />
              <div className={`${styles.ctaPing} ${styles.ctaPing2}`} aria-hidden="true" />

              <div className={`${styles.ctaChip} ${styles.ctaChip1}`} aria-hidden="true">
                <FileSearch size={13} />
                AI Match · 96%
              </div>
              <div className={`${styles.ctaChip} ${styles.ctaChip2}`} aria-hidden="true">
                <Rocket size={13} />
                Offer sent
              </div>

              <span className={styles.ctaEyebrow}>{product.name}</span>
              <h2 className={styles.ctaTitle}>{content.ctaTitle}</h2>
              <p className={styles.ctaText}>{content.ctaText}</p>
              <div className={styles.ctaActions}>
                <Button to="/contact" variant="gradient">
                  Book a demo
                </Button>
                <Button to="/products" variant="outline">
                  Back to all products
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}
