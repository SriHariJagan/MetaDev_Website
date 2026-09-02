// MetaAdds.tsx — custom landing page for MetaAdds (AdTech & Marketing Platform)
// Concept: a live creative A/B testing wall with campaign switcher.
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Award,
  BarChart3,
  CheckCircle2,
  CircleDollarSign,
  Crosshair,
  Gauge,
  Layers,
  Megaphone,
  PieChart,
  Sparkles,
  Target,
  TrendingUp,
  Tv,
  Users,
  Zap,
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
import styles from './MetaAdds.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['violet', 'pink', 'amber', 'teal', 'blue', 'green'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — creative A/B testing wall                             */
/* ------------------------------------------------------------------ */

const CAMPAIGNS = [
  {
    short: 'Launch',
    name: 'Product Launch 360',
    color: '#60a5fa',
    confidence: 94,
    spend: 71,
    budget: 7100,
    creatives: [
      { headline: 'Meet the new flagship', cta: 'Shop now', ctr: 4.1, winner: true },
      { headline: 'Upgrade your setup', cta: 'Learn more', ctr: 2.8, winner: false },
      { headline: 'Launch week offer', cta: 'Claim deal', ctr: 3.5, winner: false },
      { headline: 'See it in action', cta: 'Watch film', ctr: 1.9, winner: false },
    ],
  },
  {
    short: 'Flash',
    name: 'Flash Sale Weekend',
    color: '#f472b6',
    confidence: 88,
    spend: 58,
    budget: 4200,
    creatives: [
      { headline: '48 hours only', cta: 'Shop deals', ctr: 5.2, winner: true },
      { headline: 'Up to 40% off', cta: 'Browse sale', ctr: 3.6, winner: false },
      { headline: 'Members save more', cta: 'Join free', ctr: 2.9, winner: false },
      { headline: 'Last chance today', cta: 'Shop now', ctr: 4.4, winner: false },
    ],
  },
  {
    short: 'Loyalty',
    name: 'Loyalty Rewards',
    color: '#f59e0b',
    confidence: 91,
    spend: 44,
    budget: 3800,
    creatives: [
      { headline: 'Earn on every order', cta: 'Join loyalty', ctr: 3.1, winner: true },
      { headline: 'Double points week', cta: 'Start earning', ctr: 2.4, winner: false },
      { headline: 'Unlock VIP perks', cta: 'See perks', ctr: 2.7, winner: false },
      { headline: 'Your points await', cta: 'Check balance', ctr: 1.8, winner: false },
    ],
  },
  {
    short: 'Audience',
    name: 'Lookalike Prospecting',
    color: '#22d3ee',
    confidence: 86,
    spend: 66,
    budget: 5400,
    creatives: [
      { headline: 'Built for people like you', cta: 'Explore', ctr: 3.9, winner: true },
      { headline: 'New arrivals are here', cta: 'Shop new', ctr: 2.6, winner: false },
      { headline: 'Trusted by 40k teams', cta: 'Learn more', ctr: 3.2, winner: false },
      { headline: 'Your next favourite', cta: 'Discover', ctr: 2.1, winner: false },
    ],
  },
] as const;

function CreativeVisual() {
  const [campIndex, setCampIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCampIndex((c) => (c + 1) % CAMPAIGNS.length), 3800);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable module constant
  }, [CAMPAIGNS.length]);

  const current = CAMPAIGNS[campIndex];
  const spent = Math.round((current.budget * current.spend) / 100);

  return (
    <div className={styles.labVisual} aria-hidden="true">
      <div className={styles.labGlow} />
      <div className={styles.labGrid} />
      <div className={styles.labOrbit} />

      <div className={styles.labCard}>
        <div className={styles.labHeader}>
          <span className={styles.labHeaderTitle}>
            <Megaphone size={14} aria-hidden="true" />
            Creative Lab
          </span>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            Live · {current.name}
          </span>
        </div>

        <div className={styles.campaignRow}>
          {CAMPAIGNS.map((c, i) => (
            <button
              key={c.name}
              type="button"
              className={cn(styles.campaignChip, campIndex === i && styles.campaignChipActive)}
              style={
                campIndex === i
                  ? {
                      borderColor: c.color,
                      background: c.color,
                      color: '#fff',
                      boxShadow: `0 4px 14px -4px ${c.color}99`,
                    }
                  : undefined
              }
              onClick={() => setCampIndex(i)}
              aria-label={`View ${c.name}`}
            >
              <span
                className={styles.campaignDot}
                style={{ background: c.color }}
              />
              {c.short}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={campIndex}
            className={styles.testBody}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className={styles.testRow}>
              <span className={styles.testLabel}>
                <Sparkles size={12} aria-hidden="true" />
                Testing {current.creatives.length} creatives
              </span>
              <span className={styles.testTrack}>
                <motion.span
                  className={styles.testFill}
                  initial={{ width: '0%' }}
                  animate={{ width: `${current.confidence}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </span>
              <span className={styles.testValue}>{current.confidence}% confidence</span>
            </div>

            <div className={styles.creativeGrid}>
              {current.creatives.map((cr) => (
                <div
                  key={cr.headline}
                  className={cn(styles.creativeTile, cr.winner && styles.creativeTileWinner)}
                >
                  <span
                    className={styles.creativeThumb}
                    style={{
                      background: `linear-gradient(135deg, ${current.color}55, ${current.color}1f)`,
                      borderColor: `${current.color}44`,
                    }}
                  >
                    {cr.winner && (
                      <span className={styles.creativeWinner}>
                        <Award size={10} aria-hidden="true" /> Winner
                      </span>
                    )}
                    <span className={styles.creativeCta}>{cr.cta}</span>
                  </span>
                  <span className={styles.creativeHeadline}>{cr.headline}</span>
                  <span className={styles.creativeMetric}>
                    <span>CTR</span>
                    <span className={styles.creativeValue}>{cr.ctr}%</span>
                  </span>
                  <span className={styles.creativeBar}>
                    <motion.span
                      className={styles.creativeBarFill}
                      initial={{ width: '0%' }}
                      animate={{ width: `${cr.ctr * 18}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                    />
                  </span>
                </div>
              ))}
            </div>

            <div className={styles.spendRow}>
              <span className={styles.spendLabel}>
                <CircleDollarSign size={12} aria-hidden="true" /> Daily budget
              </span>
              <span className={styles.spendTrack}>
                <motion.span
                  className={styles.spendFill}
                  initial={{ width: '0%' }}
                  animate={{ width: `${current.spend}%` }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                />
              </span>
              <span className={styles.spendValue}>
                ${spent.toLocaleString()} / ${current.budget.toLocaleString()}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Crosshair size={13} aria-hidden="true" />
        CTR 3.8%
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Target size={13} aria-hidden="true" />
        CPA −28%
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <Zap size={13} aria-hidden="true" />
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
    <>
      <SEO />
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
              <CreativeVisual />
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
    </>
  );
}

export default MetaAddsPage;
