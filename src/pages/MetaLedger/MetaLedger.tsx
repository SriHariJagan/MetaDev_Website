// MetaLedger.tsx — custom landing page for MetaLedger (Billing & Invoicing)
// Concept: a live invoice document with payment status.
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Banknote,
  BellRing,
  Calculator,
  CheckCircle2,
  CreditCard,
  FileText,
  HandCoins,
  Landmark,
  Receipt,
  RefreshCcw,
  Star,
  Wallet,
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
import styles from './MetaLedger.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['green', 'emerald', 'teal', 'cyan', 'amber', 'orange'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — live invoice document                                 */
/* ------------------------------------------------------------------ */

const INVOICE_LINES = [
  { item: 'Cloud hosting · 12 mo', amount: '$1,440' },
  { item: 'Premium support SLA', amount: '$480' },
  { item: 'Onboarding services', amount: '$900' },
] as const;

function PaperVisual() {
  return (
    <motion.div
      className={styles.paperVisual}
      aria-hidden="true"
      whileHover={{ rotateY: -6, rotateX: 4, scale: 1.015 }}
      style={{ transformPerspective: 1400 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <div className={styles.paperGlow} />
      <div className={styles.paperStack}>
        <div className={styles.paperSheetBack} />
        <div className={styles.paperSheet}>
          <div className={styles.paperTop}>
            <span className={styles.paperLogo}>
              <Receipt size={15} /> METALEDGER
            </span>
            <span className={styles.paperNum}>INV-2026-0417</span>
          </div>

          <div className={styles.paperMeta}>
            <span className={styles.paperMetaCol}>
              <strong>Billed to</strong>
              Nova Works Pvt Ltd
            </span>
            <span className={styles.paperMetaCol}>
              <strong>Due date</strong>
              Aug 28, 2026
            </span>
          </div>

          <div className={styles.paperLines}>
            {INVOICE_LINES.map((line) => (
              <div key={line.item} className={styles.paperLine}>
                <span>{line.item}</span>
                <span>{line.amount}</span>
              </div>
            ))}
          </div>

          <div className={styles.paperTotal}>
            <span>Total due</span>
            <strong>$2,820</strong>
          </div>

          <div className={styles.paperPay}>
            <Wallet size={13} />
            Visa •• 4021 · Aug 12 · 09:41
          </div>

          <span className={styles.paperStamp}>
            <CheckCircle2 size={16} /> Paid
          </span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Banknote size={13} />
        Auto-collected
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <BellRing size={13} />
        Dunning · 0 overdue
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <FileText size={13} />
        GST invoice · ready
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const LEDGER_STATS = [
  {
    value: 33,
    suffix: 'B',
    label: 'USD — the global e-invoicing market in 2026, compounding at 22% CAGR',
    source: 'Grand View Research · E-invoicing, 2026',
  },
  {
    value: 97,
    suffix: '%',
    label: 'of businesses now require or prefer electronic billing from vendors',
    source: 'Bill.com · AP automation survey',
  },
  {
    value: 60,
    suffix: '%',
    label: 'faster payment cycles for firms that automate invoicing and follow-up',
    source: 'PYMNTS · B2B payment benchmarks',
  },
  {
    value: 68,
    suffix: '%',
    label: 'of invoices are paid late when sent on paper — vs 4% with automated dunning',
    source: 'Atradius · Payment practices, 2026',
  },
] as const;

const LEDGER_FEATURES = [
  {
    icon: FileText,
    title: 'Invoicing & Recurring Billing',
    description:
      'Beautiful, on-brand invoices generated in seconds — with recurring billing, auto-renewals and proration that handle subscriptions without any manual work.',
  },
  {
    icon: CreditCard,
    title: 'Payments & Online Links',
    description:
      'Pay-by-link, card, UPI and bank transfer built into every invoice — customers pay in one tap and money lands in your account in real time.',
  },
  {
    icon: Landmark,
    title: 'GST & Tax Compliance',
    description:
      'GST-ready invoices with automatic tax rates, e-invoice and e-way bill support, and reports that keep every return audit-clean.',
  },
  {
    icon: BellRing,
    title: 'Receivables & Dunning',
    description:
      'Automated reminders escalate gently from invoice day to final notice — chasing late payers without chasing away customers.',
  },
  {
    icon: Calculator,
    title: 'Ledger & Accounting Sync',
    description:
      'Double-entry accuracy with one-click sync to your accounting system — every invoice posted, every payment reconciled, no re-keying.',
  },
  {
    icon: RefreshCcw,
    title: 'Subscriptions & MRR',
    description:
      'Plans, add-ons, upgrades and downgrades tracked in real time with MRR, churn and revenue analytics your finance team will love.',
  },
] as const;

const LEDGER_FLOW = [
  {
    icon: FileText,
    step: '01',
    title: 'Create',
    description: 'An invoice is generated in seconds — branded, compliant, ready.',
    stat: 'Invoices in <10s',
  },
  {
    icon: HandCoins,
    step: '02',
    title: 'Send',
    description: 'Delivered by email or a pay-by-link that works on any device.',
    stat: '98% open rate',
  },
  {
    icon: CreditCard,
    step: '03',
    title: 'Collect',
    description: 'Online payments land instantly with automatic reconciliation.',
    stat: 'Paid in 1 tap',
  },
  {
    icon: BellRing,
    step: '04',
    title: 'Follow up',
    description: 'Smart dunning nudges only the invoices that actually need it.',
    stat: '−68% late payments',
  },
  {
    icon: Calculator,
    step: '05',
    title: 'Report',
    description: 'MRR, receivables and tax reports update themselves in real time.',
    stat: 'Always audit-ready',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaLedgerPage() {
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
                  Live billing · 98% paid on time
                </span>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Invoices that</GradientText>
                <br />
                pay themselves
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaLedger is a billing and invoicing platform that turns revenue into a straight
                line — professional invoices, recurring billing, online payments and GST-ready
                ledger accuracy, all without the follow-up grind.
              </motion.p>

              <motion.div className={styles.heroMetrics} variants={defaultItemVariants}>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <Receipt size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="2.4" suffix="k" /> <span className={styles.heroMetricUnit}>invoices</span>
                    </span>
                    <span className={styles.heroMetricLabel}>Sent this month</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <Wallet size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      $<CountUp value="1.2" suffix="M" /> <span className={styles.heroMetricUnit}>collected</span>
                    </span>
                    <span className={styles.heroMetricLabel}>Auto-reconciled today</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <HandCoins size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="1.2" suffix="d" />
                    </span>
                    <span className={styles.heroMetricLabel}>Avg. days to payment</span>
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
                  {['NT', 'PV', 'RK', 'AS'].map((initials, index) => (
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
                  <strong>4.9/5</strong> from 1,800+ finance teams
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={defaultItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <PaperVisual />
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
            {LEDGER_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.statStamp} aria-hidden="true">
                    <span />
                  </span>
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
                Billing that runs <GradientText>on autopilot</GradientText>
              </>
            }
            subtitle="Six tightly integrated modules that cover the entire money lifecycle — from invoice to bank balance."
          />

          <motion.div
            className={styles.featureGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {LEDGER_FEATURES.map((feature, index) => (
              <motion.div key={feature.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.featureCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <feature.icon size={20} stroke={`url(#grad-green)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Money flow ---------------- */}
      <Section size="lg" bordered className={styles.flowSection}>
        <div className={styles.flowGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                From invoice to <GradientText>bank balance</GradientText>
              </>
            }
            subtitle="Five stages, one connected loop — every invoice flows straight through to cash."
          />

          <motion.div
            className={styles.flow}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {LEDGER_FLOW.map((stage, index) => (
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
                  <span className={styles.ctaEyebrow}>MetaLedger</span>
                  <h2 className={styles.ctaTitle}>
                    Get paid <GradientText>faster, always</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaLedger cuts late payments by 68% and gets money into your account
                    in days, not months. Book a live walkthrough.
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
                <div className={styles.ctaLedger} aria-hidden="true">
                  <div className={styles.ctaLedgerTop}>
                    <span className={styles.ctaLedgerIcon}>
                      <Receipt size={18} />
                    </span>
                    <div className={styles.ctaLedgerInfo}>
                      <span className={styles.ctaLedgerId}>INV-2026-0417</span>
                      <span className={styles.ctaLedgerRoute}>Nova Works Pvt Ltd</span>
                    </div>
                    <span className={styles.ctaLedgerPaid}>Paid</span>
                  </div>
                  <div className={styles.ctaLedgerKpis}>
                    <span className={styles.ctaLedgerKpi}>
                      <strong>$2,820</strong> collected
                    </span>
                    <span className={styles.ctaLedgerKpi}>
                      <strong>1.2 days</strong> to payment
                    </span>
                    <span className={styles.ctaLedgerKpi}>
                      <strong>0</strong> late fees
                    </span>
                  </div>
                  <div className={styles.ctaLedgerMeta}>
                    <span className={styles.ctaLedgerAuto}>Auto-reconciled with ledger</span>
                    <span className={styles.ctaLedgerGst}>GST e-invoice ready</span>
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

export default MetaLedgerPage;