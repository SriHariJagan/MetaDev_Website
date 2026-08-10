// MetaAdds.tsx — custom landing page for MetaAdds (AdTech & Marketing Platform)
// Concept: a live campaign dashboard with channel growth.
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Crosshair,
  Eye,
  Gauge,
  Layers,
  Megaphone,
  MousePointerClick,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  Tv,
  Users,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
import styles from './MetaAdds.module.css';

const VIEWPORT = { once: true, amount: 0.2 } as const;
const HUES = ['violet', 'pink', 'amber', 'teal', 'blue', 'green'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — campaign dashboard                                    */
/* ------------------------------------------------------------------ */

const CHANNEL_BARS = [
  { label: 'Social', value: 82, growth: '+14.6%' },
  { label: 'CTV', value: 68, growth: '+13.8%' },
  { label: 'Commerce', value: 54, growth: '+12.1%' },
  { label: 'Search', value: 73, growth: '+9.5%' },
  { label: 'Audio', value: 38, growth: '+8.2%' },
] as const;

function DashboardVisual() {
  return (
    <div className={styles.dashVisual} aria-hidden="true">
      <div className={styles.dashGlow} />

      <div className={styles.dashCard}>
        <div className={styles.dashHeader}>
          <span className={styles.dashHeaderTitle}>Campaign Performance</span>
          <span className={styles.dashHeaderPill}>Live</span>
        </div>

        <div className={styles.dashKpis}>
          <div className={styles.dashKpi}>
            <span className={styles.dashKpiLabel}>
              <Eye size={12} /> Impressions
            </span>
            <span className={styles.dashKpiValue}>4.2M</span>
          </div>
          <div className={styles.dashKpi}>
            <span className={styles.dashKpiLabel}>
              <MousePointerClick size={12} /> CTR
            </span>
            <span className={styles.dashKpiValue}>3.8%</span>
          </div>
          <div className={styles.dashKpi}>
            <span className={styles.dashKpiLabel}>
              <CircleDollarSign size={12} /> ROAS
            </span>
            <span className={styles.dashKpiValue}>5.6×</span>
          </div>
        </div>

        <div className={styles.dashBars}>
          {CHANNEL_BARS.map((bar, index) => (
            <div key={bar.label} className={styles.dashBarRow}>
              <span className={styles.dashBarLabel}>{bar.label}</span>
              <span className={styles.dashBarTrack}>
                <motion.span
                  className={styles.dashBarFill}
                  initial={{ width: '12%' }}
                  animate={{ width: `${bar.value}%` }}
                  transition={{ duration: 1.1, ease: 'easeOut', delay: 0.25 + index * 0.12 }}
                />
              </span>
              <span className={styles.dashBarValue}>{bar.growth}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Target size={13} />
        CPA −28%
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Tv size={13} />
        CTV · 26% of budget
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <Zap size={13} />
        AI-optimised
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const GROWTH_STATS = [
  {
    value: 200,
    suffix: 'B+',
    label: 'US programmatic ad spending in 2026 — surpassing $200 billion',
    source: 'eMarketer · Programmatic Forecast, 2026',
  },
  {
    value: 9.5,
    suffix: '%',
    label: 'projected US ad spend growth in 2026, up from +5.7% in 2025',
    source: 'IAB Outlook Study, 2026',
  },
  {
    value: 14.6,
    suffix: '%',
    label: 'growth in social media ad spend — the fastest digital channel',
    source: 'IAB Outlook Study, 2026',
  },
  {
    value: 58,
    suffix: '%',
    label: 'of media buyers expect their programmatic investment to grow in 2026',
    source: 'Comscore · State of Programmatic, 2026',
  },
] as const;

const AD_MODULES = [
  {
    icon: Megaphone,
    title: 'Cross-Channel Campaigns',
    description:
      'One campaign engine for social, search, CTV, commerce and audio — with unified budgets and frequency capping across every screen.',
    stat: '6 channels, one console',
  },
  {
    icon: Target,
    title: 'AI Audience Targeting',
    description:
      'Agentic AI builds lookalike and intent audiences in real time, balancing signal, scale and privacy as cookies fade for good.',
    stat: '−28% CPA',
  },
  {
    icon: PieChart,
    title: 'Creative Optimisation',
    description:
      'Dynamic creative testing across formats and placements, with AI picking winning variants while a campaign is still live.',
    stat: 'Test in-flight',
  },
  {
    icon: BarChart3,
    title: 'Unified Measurement',
    description:
      'Cross-channel performance metrics in one place — 87% of buyers say they are critical for smarter allocation decisions.',
    stat: 'One source of truth',
  },
  {
    icon: Gauge,
    title: 'Real-Time Bidding & PMPs',
    description:
      'Programmatic direct and private marketplaces with quality inventory, full transparency and fraud protection built in.',
    stat: 'PMP-first',
  },
  {
    icon: Sparkles,
    title: 'Agentic AI Buying',
    description:
      'Autonomous campaigns that plan, buy and optimise themselves — the biggest story in ad tech this year, done right.',
    stat: 'Set-and-forget',
  },
] as const;

const MEDIA_MIX = [
  { channel: 'Social', share: 26, icon: Users },
  { channel: 'CTV', share: 24, icon: Tv },
  { channel: 'Search', share: 22, icon: Crosshair },
  { channel: 'Commerce', share: 15, icon: CircleDollarSign },
  { channel: 'Audio', share: 8, icon: TrendingUp },
  { channel: 'Display', share: 5, icon: Layers },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaAddsPage() {
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
                <Link to="/products" className={styles.breadcrumb}>
                  <ArrowLeft size={16} className={styles.breadcrumbIcon} aria-hidden="true" />
                  All products
                </Link>
              </motion.div>

              <motion.div variants={defaultItemVariants}>
                <Badge variant="glass">
                  <Megaphone size={14} aria-hidden="true" />
                  AdTech & Marketing Platform
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Every channel.</GradientText>
                <br />
                One dashboard.
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaAdds is an AI-first advertising and marketing platform that plans, buys and
                optimises campaigns across social, CTV, search, commerce and audio — with
                unified measurement your CFO will actually understand.
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
                {['6 channels', 'Agentic AI', 'Privacy-first'].map((item) => (
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
              <DashboardVisual />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Growth stats ---------------- */}
      <Section size="md" bordered className={styles.growthSection}>
        <div className={styles.growthGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <motion.div
            className={styles.growthGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {GROWTH_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.growthCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.growthValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.growthLabel}>{stat.label}</p>
                  <span className={styles.growthSource}>{stat.source}</span>
                  <span className={styles.sparkBars} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Media mix bars ---------------- */}
      <Section size="md" bordered>
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>Where budgets go</span>}
            title={
              <>
                The media mix is <GradientText>shifting to video</GradientText>
              </>
            }
            subtitle="CTV now captures 26% of media budgets on average — and 45% of marketers are funding it straight from linear TV."
          />

          <motion.div
            className={styles.mixGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {MEDIA_MIX.map((item, index) => (
              <motion.div key={item.channel} variants={defaultItemVariants}>
                <GlassCard className={styles.mixCard}>
                  <span className={styles.mixIcon}>
                    <item.icon size={16} aria-hidden="true" />
                  </span>
                  <div className={styles.mixRow}>
                    <span className={styles.mixName}>{item.channel}</span>
                    <span className={styles.mixShare}>{item.share}%</span>
                  </div>
                  <span className={styles.mixTrack}>
                    <motion.span
                      className={styles.mixFill}
                      initial={{ width: '10%' }}
                      animate={{ width: `${item.share * 3.4}%` }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.2 + index * 0.08 }}
                    />
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
                Built for the <GradientText>agentic era</GradientText> of advertising
              </>
            }
            subtitle="AI moved from enablement to execution — MetaAdds puts it to work on your campaigns, with governance intact."
          />

          <motion.div
            className={styles.moduleGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {AD_MODULES.map((mod, index) => (
              <motion.div key={mod.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.moduleCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <mod.icon size={20} stroke={`url(#grad-violet)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.description}</p>
                  <span className={styles.moduleStat}>{mod.stat}</span>
                  <span className={styles.moduleNum}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
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
                  <span className={styles.ctaEyebrow}>MetaAdds</span>
                  <h2 className={styles.ctaTitle}>
                    Spend smarter in the <GradientText>agentic era</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaAdds unifies your channels and lets AI do the optimisation.
                    Book a live walkthrough with our team.
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
                <div className={styles.ctaDonut} aria-hidden="true">
                  <div className={styles.ctaDonutRing}>
                    <span className={styles.ctaDonutCore}>
                      <span className={styles.ctaDonutValue}>5.6×</span>
                      <span className={styles.ctaDonutLabel}>ROAS</span>
                    </span>
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

export default MetaAddsPage;
