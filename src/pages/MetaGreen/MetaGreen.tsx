// MetaGreen.tsx — custom landing page for MetaGreen (Sustainability Platform)
// Concept: concentric emissions rings with scope coverage gauges.
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  CloudSun,
  Factory,
  FileCheck2,
  Leaf,
  LineChart,
  Recycle,
  Scale,
  Sprout,
  TrendingUp,
  Users,
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
import styles from './MetaGreen.module.css';

const VIEWPORT = { once: true, amount: 0.2 } as const;
const HUES = ['teal', 'green', 'blue', 'amber', 'violet', 'cyan'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — emission scope rings                                  */
/* ------------------------------------------------------------------ */

const SCOPES = [
  { name: 'Scope 1', value: 74, detail: 'Direct emissions' },
  { name: 'Scope 2', value: 73, detail: 'Purchased energy' },
  { name: 'Scope 3', value: 48, detail: 'Value chain' },
] as const;

function RingVisual() {
  return (
    <div className={styles.ringVisual} aria-hidden="true">
      <div className={styles.ringGlow} />
      <div className={styles.ringOrbit} />
      <div className={styles.ringOuter} />
      <div className={styles.ringCore}>
        <span className={styles.ringCoreIcon}>
          <Leaf size={30} />
        </span>
        <span className={styles.ringCoreValue}>−42%</span>
        <span className={styles.ringCoreLabel}>t CO₂e tracked</span>
      </div>

      {SCOPES.map((scope, index) => (
        <div
          key={scope.name}
          className={cn(styles.scopeCard, styles[`scopeCard${index + 1}`])}
        >
          <span className={styles.scopeValue}>{scope.value}%</span>
          <span className={styles.scopeName}>{scope.name}</span>
          <span className={styles.scopeDetail}>{scope.detail}</span>
        </div>
      ))}

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Factory size={13} />
        CSRD ready
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Recycle size={13} />
        Audit trail
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const METER_WIDTHS = ['82%', '64%', '51%', '90%'] as const;

const ESG_STATS = [  {
    value: 4.78,
    suffix: 'B',
    label: 'USD — the ESG software market in 2026, heading to $10.31B by 2031',
    source: 'Mordor Intelligence · ESG Software Market, 2026',
  },
  {
    value: 16.62,
    suffix: '%',
    label: 'CAGR as mandatory disclosure turns sustainability into infrastructure',
    source: 'Mordor Intelligence · ESG Software Market, 2026',
  },
  {
    value: 50,
    suffix: 'K+',
    label: 'companies now in scope of the EU CSRD directive alone',
    source: 'European Commission · CSRD',
  },
  {
    value: 60,
    suffix: '%',
    label: 'of data preparation time consumed by fragmented legacy data — the #1 market challenge',
    source: 'Technavio · ESG Reporting Software, 2026',
  },
] as const;

const GREEN_MODULES = [
  {
    icon: CloudSun,
    title: 'Carbon Accounting',
    description:
      'Automated Scope 1, 2 and 3 accounting with emissions-factor databases and spend-based estimation — cutting data-collection hours by up to 70%.',
  },
  {
    icon: Factory,
    title: 'Supply Chain Tracking',
    description:
      'Supplier engagement and tracing for purchased goods and services — the Scope 3 categories that matter most and get reported least.',
  },
  {
    icon: FileCheck2,
    title: 'Regulatory Reporting',
    description:
      'Pre-mapped disclosure templates for CSRD, GRI, TCFD, ISSB and SEC climate rules — with audit-ready evidence repositories.',
  },
  {
    icon: LineChart,
    title: 'Scenario Analysis',
    description:
      'Climate pathway, policy-shock and price-on-carbon modelling — the fastest-growing ESG capability at a 24.3% CAGR.',
  },
  {
    icon: Users,
    title: 'Social & Governance Metrics',
    description:
      'Workforce, diversity, safety and governance data alongside environmental metrics — one platform, every disclosure.',
  },
  {
    icon: Scale,
    title: 'Assurance & Audit Trails',
    description:
      'Immutable evidence chains and version control that satisfy external assurance — now present in 71% of S&P 500 disclosures.',
  },
] as const;

const FRAMEWORKS = ['CSRD', 'ESRS', 'GRI', 'TCFD', 'ISSB', 'SEC', 'GHG Protocol', 'SFDR', 'SASB'] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaGreenPage() {
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
                  <Leaf size={14} aria-hidden="true" />
                  Sustainability Platform
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Measure what matters.</GradientText>
                <br />
                Report what’s real.
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaGreen is an ESG data and reporting platform that turns fragmented spreadsheets
                into investor-grade disclosure — carbon accounting, supply chain tracking and
                regulatory reporting across every major framework.
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
                {['CSRD-ready', 'Audit trails', 'AI data validation'].map((item) => (
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
              <RingVisual />
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
            {ESG_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.statMeter} aria-hidden="true">
                    <span className={styles.statMeterFill} style={{ width: METER_WIDTHS[index] }} />
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Scope disclosure gap ---------------- */}
      <Section size="lg" bordered className={styles.gapSection}>
        <div className={styles.gapGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>The disclosure gap</span>}
            title={
              <>
                Scope 3 is where <GradientText>trust breaks</GradientText>
              </>
            }
            subtitle="S&P 500 disclosure of Scopes 1 and 2 sits around 74%, while meaningful Scope 3 reporting trails at 48% — and 38% of companies disclose no Scope 3 categories at all."
          />

          <motion.div
            className={styles.scopeGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {SCOPES.map((scope, index) => (
              <motion.div key={scope.name} variants={defaultItemVariants}>
                <GlassCard className={styles.scopePanel}>
                  <div className={styles.scopeGauge}>
                    <svg viewBox="0 0 120 120" className={styles.scopeSvg} aria-hidden="true">
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke="rgba(var(--color-text), 0.1)"
                        strokeWidth="10"
                      />
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={`url(#grad-teal)`}
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="314"
                        initial={{ strokeDashoffset: 314 }}
                        whileInView={{ strokeDashoffset: 314 * (1 - scope.value / 100) }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 + index * 0.15 }}
                        transform="rotate(-90 60 60)"
                      />
                    </svg>
                    <span className={styles.scopeGaugeValue}>{scope.value}%</span>
                  </div>
                  <h3 className={styles.scopePanelTitle}>{scope.name}</h3>
                  <p className={styles.scopePanelDetail}>{scope.detail}</p>
                </GlassCard>
              </motion.div>
            ))}

            <motion.div variants={defaultItemVariants}>
              <GlassCard className={styles.scopeCallout}>
                <span className={styles.scopeCalloutIcon}>
                  <TrendingUp size={18} aria-hidden="true" />
                </span>
                <p className={styles.scopeCalloutText}>
                  <strong>38% of companies</strong> disclose no Scope 3 data for any of the 15
                  categories — the gap MetaGreen exists to close.
                </p>
              </GlassCard>
            </motion.div>
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
                One platform for every <GradientText>sustainability metric</GradientText>
              </>
            }
            subtitle="Environmental, social and governance data in a single source of truth — collected, validated and audit-ready."
          />

          <motion.div
            className={styles.moduleGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {GREEN_MODULES.map((mod, index) => (
              <motion.div key={mod.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.moduleCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <mod.icon size={20} stroke={`url(#grad-teal)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.description}</p>
                  <span className={styles.moduleFoot}>
                    <FileCheck2 size={12} aria-hidden="true" />
                    Audit-ready
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Frameworks strip ---------------- */}
      <Section className={styles.frameworksSection}>
        <Container maxWidth="wide">
          <p className={styles.frameworksLabel}>Every framework, pre-mapped</p>
          <div className={styles.frameworksRow}>
            {FRAMEWORKS.map((framework) => (
              <span key={framework} className={styles.frameworkChip}>
                <CheckCircle2 size={13} aria-hidden="true" />
                {framework}
              </span>
            ))}
          </div>
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
                  <span className={styles.ctaEyebrow}>MetaGreen</span>
                  <h2 className={styles.ctaTitle}>
                    Your next report, <GradientText>audit-ready</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaGreen collects, validates and reports your ESG data in hours, not
                    quarters. Book a live walkthrough with our team.
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
                <div className={styles.ctaCounter} aria-hidden="true">
                  <div className={styles.ctaCounterCard}>
                    <span className={styles.ctaCounterLabel}>Carbon tracked this quarter</span>
                    <span className={styles.ctaCounterValue}>−12,480 t</span>
                    <span className={styles.ctaCounterTrack}>
                      <motion.span
                        className={styles.ctaCounterFill}
                        initial={{ width: '20%' }}
                        whileInView={{ width: '78%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                      />
                    </span>
                    <span className={styles.ctaCounterMeta}>
                      <Sprout size={12} /> On track for net-zero 2030
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

export default MetaGreenPage;
