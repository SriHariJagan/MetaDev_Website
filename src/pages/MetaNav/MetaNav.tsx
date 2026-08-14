// MetaNav.tsx — custom landing page for MetaNav (Fleet & Logistics Management)
// Concept: a fleet operations control center with fuel analytics,
// a maintenance board and a driver leaderboard.
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Cog,
  Fuel,
  Gauge,
  Map,
  Navigation,
  Radar,
  Route,
  Satellite,
  Star,
  TrendingDown,
  Truck,
  Wrench,
} from 'lucide-react';
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
import styles from './MetaNav.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['orange', 'amber', 'red', 'teal', 'green', 'cyan'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — fleet tracking HUD                                    */
/* ------------------------------------------------------------------ */

const HUD_BLIPS = [
  { left: '63%', top: '30%', delay: '0s' },
  { left: '34%', top: '56%', delay: '0.7s' },
  { left: '58%', top: '70%', delay: '1.4s' },
  { left: '27%', top: '25%', delay: '2.1s' },
] as const;

const HUD_READOUTS = [
  { icon: Truck, label: 'Vehicles live', value: '128' },
  { icon: Gauge, label: 'Cost / km', value: '₹23.4' },
  { icon: Activity, label: 'Fleet uptime', value: '98.2%' },
] as const;

function HudVisual() {
  return (
    <motion.div
      className={styles.hudVisual}
      aria-hidden="true"
      whileHover={{ rotateY: -6, rotateX: 4, scale: 1.015 }}
      style={{ transformPerspective: 1400 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <div className={styles.hudGlow} />
      <div className={styles.hudHud}>
        <span className={styles.hudCorner} aria-hidden="true" />
        <span className={styles.hudCorner} aria-hidden="true" />
        <span className={styles.hudCorner} aria-hidden="true" />
        <span className={styles.hudCorner} aria-hidden="true" />

        <div className={styles.hudRadar}>
          <div className={styles.hudRings} />
          <div className={styles.hudSweep} />
          <div className={styles.hudCross} />
          {HUD_BLIPS.map((blip, index) => (
            <span
              key={index}
              className={styles.hudBlip}
              style={{ left: blip.left, top: blip.top, animationDelay: blip.delay }}
            >
              <span className={styles.hudPing} />
            </span>
          ))}
          <span className={styles.hudCenter}>
            <Navigation size={20} />
          </span>
        </div>

        <div className={styles.hudRoute}>
          <span className={styles.hudRouteLine} />
          <span className={styles.hudRouteDot} />
          <span className={styles.hudRouteMeta}>KTM → BLR · ETA 2h 14m</span>
        </div>

        <div className={styles.hudReadouts}>
          {HUD_READOUTS.map((readout) => (
            <div key={readout.label} className={styles.hudReadout}>
              <readout.icon size={14} />
              <span className={styles.hudReadoutBody}>
                <strong>{readout.value}</strong>
                <em>{readout.label}</em>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Gauge size={13} />
        Cost/km · −8.2%
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Activity size={13} />
        Utilization · 91%
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <CheckCircle2 size={13} />
        Trip completed
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const FLEET_STATS = [
  {
    value: 31,
    suffix: 'B',
    label: 'USD — the global fleet management market, growing at 20.4% CAGR toward $130B by 2031',
    source: 'Grand View Research · Fleet telematics, 2026',
  },
  {
    value: 93,
    suffix: '%',
    label: 'of fleet operators see measurable ROI from GPS tracking within the first year',
    source: 'Telematics Benchmark Report · ROI study',
  },
  {
    value: 20,
    suffix: '%',
    label: 'average fuel savings from route optimization and driver behaviour coaching',
    source: 'Fleetio / TCO studies · Fuel intelligence',
  },
  {
    value: 9,
    suffix: 'x',
    label: 'reduction in accident risk reported by fleets with active driver monitoring',
    source: 'National Safety Council · Driver safety',
  },
] as const;

const FLEET_FEATURES = [
  {
    icon: Satellite,
    title: 'Live GPS Tracking',
    description:
      'Every vehicle on a real-time map with second-by-second positions, history replay and geofence alerts — know where your fleet is at all times.',
  },
  {
    icon: Route,
    title: 'AI Route Optimization',
    description:
      'Multi-stop routing that cuts mileage and drive time, rerouting around traffic and delays automatically — 20% fewer kilometres per delivery.',
  },
  {
    icon: Gauge,
    title: 'Driver Behaviour & Safety',
    description:
      'Scorecards for speed, harsh braking and idling with real-time coaching alerts — safer roads, lower insurance, longer vehicle life.',
  },
  {
    icon: Fuel,
    title: 'Fuel & Expense Control',
    description:
      'Fuel monitoring, card integration and trip-level cost tracking that expose waste and clamp down on fuel theft.',
  },
  {
    icon: Wrench,
    title: 'Maintenance Scheduling',
    description:
      'Service reminders based on odometer, engine hours and usage patterns — predictive alerts that keep vehicles on the road, not in the shop.',
  },
  {
    icon: Radar,
    title: 'Fleet Intelligence',
    description:
      'Dispatch dashboards, utilization heatmaps and KPIs for cost per kilometre, on-time delivery and fleet health — decisions backed by data.',
  },
] as const;

const FLEET_FLOW = [
  {
    icon: Map,
    step: '01',
    title: 'Track',
    description: 'Live positions and trip history stream in from every vehicle.',
    stat: '128 vehicles · live',
  },
  {
    icon: Navigation,
    step: '02',
    title: 'Dispatch',
    description: 'Smart assignment matches the nearest, best-suited vehicle.',
    stat: '−40% dispatch time',
  },
  {
    icon: Route,
    step: '03',
    title: 'Optimize',
    description: 'Routes recalculate with live traffic and delivery windows.',
    stat: '20% fewer km',
  },
  {
    icon: Wrench,
    step: '04',
    title: 'Maintain',
    description: 'Predictive maintenance flags issues before they strand a truck.',
    stat: '38% less downtime',
  },
  {
    icon: Radar,
    step: '05',
    title: 'Report',
    description: 'Board-ready analytics on cost, safety and utilization.',
    stat: 'Real-time KPIs',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaNavPage() {
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
                <span className={styles.heroBadge}>
                  <span className={styles.heroBadgeDot} aria-hidden="true" />
                  Live fleet ops · 128 vehicles online
                </span>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Your fleet's numbers,</GradientText>
                <br />
                under control
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaNav is a fleet management platform that runs on operations, not guesswork —
                live GPS, AI route optimization, driver safety, fuel intelligence and predictive
                maintenance, all measured against cost per kilometre.
              </motion.p>

              <motion.div className={styles.heroMetrics} variants={defaultItemVariants}>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <Truck size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="128" /> <span className={styles.heroMetricUnit}>vehicles</span>
                    </span>
                    <span className={styles.heroMetricLabel}>Online now</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <Gauge size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      ₹<CountUp value="23.4" /> <span className={styles.heroMetricUnit}>/ km</span>
                    </span>
                    <span className={styles.heroMetricLabel}>Cost per km</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <Activity size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="98.2" suffix="%" />
                    </span>
                    <span className={styles.heroMetricLabel}>Fleet uptime</span>
                  </span>
                </div>
              </motion.div>

              <motion.div className={styles.heroActions} variants={defaultItemVariants}>
                <Button to="/contact" variant="gradient">
                  Book a demo
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button to="#features" variant="outline">
                  Explore features
                </Button>
              </motion.div>

              <motion.div className={styles.heroProof} variants={defaultItemVariants}>
                <span className={styles.avatarStack} aria-hidden="true">
                  {['RK', 'SM', 'AD', 'VP'].map((initials, index) => (
                    <span key={initials} className={cn(styles.avatar, styles[`avatar-${index + 1}`])}>
                      {initials}
                    </span>
                  ))}
                </span>
                <span className={styles.proofStars} aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} size={13} fill="currentColor" />
                  ))}
                </span>
                <span className={styles.proofText}>
                  <strong>4.9/5</strong> from 2,400+ fleet operators
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={defaultItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <HudVisual />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Fleet market stats ---------------- */}
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
            {FLEET_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.statPulse} aria-hidden="true" />
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Features ---------------- */}
      <Section size="lg" bordered id="features">
        <div className={styles.featuresGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>Capabilities</span>}
            title={
              <>
                One command center for your <GradientText>whole fleet</GradientText>
              </>
            }
            subtitle="Six tightly integrated modules that cover the entire fleet lifecycle — from ignition to invoice."
          />

          <motion.div
            className={styles.featureGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {FLEET_FEATURES.map((feature, index) => (
              <motion.div key={feature.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.featureCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <feature.icon size={20} stroke={`url(#grad-orange)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Fleet flow ---------------- */}
      <Section size="lg" bordered className={styles.flowSection}>
        <div className={styles.flowGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                From ignition to <GradientText>insight</GradientText>
              </>
            }
            subtitle="Five stages, one connected loop — every trip makes the next one smarter."
          />

          <motion.div
            className={styles.flow}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {FLEET_FLOW.map((stage, index) => (
              <motion.div key={stage.step} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.flowCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <div className={styles.flowTop}>
                    <span className={styles.flowBadge}>
                      <stage.icon size={18} aria-hidden="true" />
                    </span>
                    <span className={styles.flowNum}>{stage.step}</span>
                  </div>
                  <h3 className={styles.flowTitle}>{stage.title}</h3>
                  <p className={styles.flowDesc}>{stage.description}</p>
                  <span className={styles.flowStat}>{stage.stat}</span>
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
                  <span className={styles.ctaEyebrow}>MetaNav</span>
                  <h2 className={styles.ctaTitle}>
                    Run your fleet on <GradientText>operations, not guesswork</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaNav cuts fuel spend by 20% and downtime by 38%. Book a live
                    walkthrough with our logistics team.
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
                <div className={styles.ctaOps} aria-hidden="true">
                  <div className={styles.ctaOpsTop}>
                    <span className={styles.ctaOpsIcon}>
                      <Cog size={18} />
                    </span>
                    <div className={styles.ctaOpsInfo}>
                      <span className={styles.ctaOpsId}>Operations · this quarter</span>
                      <span className={styles.ctaOpsRoute}>128 vehicles · 4 depots</span>
                    </div>
                    <span className={styles.ctaOpsLive} />
                  </div>
                  <div className={styles.ctaOpsTrack}>
                    <span className={styles.ctaOpsKpi}>
                      <strong>₹21.8</strong> cost/km avg
                    </span>
                    <span className={styles.ctaOpsKpi}>
                      <strong>−12%</strong> fuel vs last qtr
                    </span>
                    <span className={styles.ctaOpsKpi}>
                      <strong>91%</strong> utilization
                    </span>
                  </div>
                  <div className={styles.ctaOpsMeta}>
                    <span className={styles.ctaOpsTrip}>
                      <TrendingDown size={12} /> Downtime −38%
                    </span>
                    <span className={styles.ctaOpsSafe}>ROI · 4.1 months</span>
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

export default MetaNavPage;