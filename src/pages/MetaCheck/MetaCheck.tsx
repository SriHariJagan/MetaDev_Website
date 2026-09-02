// MetaCheck.tsx — fully custom landing page for MetaCheck (Verification & Compliance)
// Concept: verification command center with live check report.
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BellRing,
  Briefcase,
  Building2,
  Car,
  CheckCircle2,
  ClipboardCheck,
  CreditCard,
  Database,
  FileCheck2,
  FileText,
  Fingerprint,
  Globe,
  GraduationCap,
  Home,
  Landmark,
  Lock,
  Radar,
  ScanLine,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserCheck,
  Users,
  Webhook,
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Container } from '@/components/common/Container';
import { CountUp } from '@/components/common/CountUp';
import { GlassCard } from '@/components/common/GlassCard';
import { GradientDefs } from '@/components/common/GradientDefs';
import { GradientText } from '@/components/common/GradientText';
import { IconCircle } from '@/components/common/IconCircle';
import { InfiniteMarquee } from '@/components/common/InfiniteMarquee';
import { Section } from '@/components/common/Section';
import { SectionHeader } from '@/components/common/SectionHeader';
import { defaultContainerVariants, defaultItemVariants } from '@/constants/motion';
import { cn } from '@/utils/cn';
import { SEO } from '@/seo/SEO';
import styles from './MetaCheck.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['blue', 'violet', 'pink', 'teal', 'green'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — verification command center                           */
/* ------------------------------------------------------------------ */

type CheckRow = {
  icon: LucideIcon;
  label: string;
  value: string;
};

const SUBJECTS: {
  short: string;
  name: string;
  type: string;
  color: string;
  status: string;
  checks: CheckRow[];
  passed: string;
  time: string;
  confidence: string;
}[] = [
  {
    short: 'Hire',
    name: 'Sofia Lindqvist',
    type: 'Candidate · Senior Analyst',
    color: '#60a5fa',
    status: 'Verified',
    checks: [
      { icon: Fingerprint, label: 'Identity', value: '99.2% match' },
      { icon: Briefcase, label: 'Employment', value: '2/2 confirmed' },
      { icon: GraduationCap, label: 'Education', value: 'Degree verified' },
      { icon: Home, label: 'Address', value: 'Confirmed' },
      { icon: ShieldCheck, label: 'Criminal', value: 'Cleared' },
      { icon: Landmark, label: 'AML / sanctions', value: 'PEP screened' },
    ],
    passed: '6/6',
    time: '2m 14s',
    confidence: '99.2%',
  },
  {
    short: 'Vendor',
    name: 'Atlas Logistics Ltd',
    type: 'Vendor · KYB review',
    color: '#22d3ee',
    status: 'Verified',
    checks: [
      { icon: Building2, label: 'Business reg.', value: 'Verified' },
      { icon: Users, label: 'UBO ownership', value: '3 identified' },
      { icon: Landmark, label: 'AML / sanctions', value: 'PEP screened' },
      { icon: FileText, label: 'Financials', value: 'Audited' },
      { icon: CreditCard, label: 'Tax status', value: 'Compliant' },
      { icon: TrendingUp, label: 'Credit risk', value: 'B+ rated' },
    ],
    passed: '6/6',
    time: '3m 40s',
    confidence: '97.8%',
  },
  {
    short: 'Customer',
    name: 'Digital Banking KYC',
    type: 'Customer · KYC onboarding',
    color: '#a855f7',
    status: 'In review',
    checks: [
      { icon: Fingerprint, label: 'Identity', value: '98.9% match' },
      { icon: ScanLine, label: 'Liveness', value: 'Passed' },
      { icon: Radar, label: 'Sanctions', value: 'Cleared' },
      { icon: ShieldCheck, label: 'Watchlist', value: 'Cleared' },
      { icon: Landmark, label: 'PEP', value: 'Screened' },
      { icon: Lock, label: 'Device risk', value: 'Low' },
    ],
    passed: '5/6',
    time: '1m 52s',
    confidence: '98.9%',
  },
  {
    short: 'Tenant',
    name: 'Rental Application',
    type: 'Property · Tenant screening',
    color: '#34d399',
    status: 'Verified',
    checks: [
      { icon: Fingerprint, label: 'Identity', value: '96.4% match' },
      { icon: CreditCard, label: 'Income', value: '3.1x rent' },
      { icon: Briefcase, label: 'Employment', value: 'Confirmed' },
      { icon: TrendingUp, label: 'Credit', value: '720 score' },
      { icon: FileCheck2, label: 'Eviction', value: 'None found' },
      { icon: UserCheck, label: 'References', value: '2 verified' },
    ],
    passed: '6/6',
    time: '2m 01s',
    confidence: '96.4%',
  },
];

const HERO_CHECKS = [
  { icon: Fingerprint, label: 'Identity', value: '99.2% match' },
  { icon: Briefcase, label: 'Employment', value: '2/2 confirmed' },
  { icon: GraduationCap, label: 'Education', value: 'Degree verified' },
  { icon: Home, label: 'Address', value: 'Confirmed' },
  { icon: ShieldCheck, label: 'Criminal', value: 'Cleared' },
  { icon: Landmark, label: 'AML / sanctions', value: 'PEP screened' },
] as const;

function ScanVisual() {
  const [subject, setSubject] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSubject((s) => (s + 1) % SUBJECTS.length), 3200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable module constant
  }, [SUBJECTS.length]);

  const current = SUBJECTS[subject];

  return (
    <div className={styles.checkVisual} aria-hidden="true">
      <div className={styles.checkGlow} />
      <div className={styles.checkGrid} />
      <div className={styles.checkOrbit} />

      <div className={styles.consoleCard}>
        <div className={styles.consoleHeader}>
          <span className={styles.consoleHeaderTitle}>
            <BadgeCheck size={14} aria-hidden="true" />
            Verification Command Center
          </span>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            Live · 1,284 checks
          </span>
        </div>

        <div className={styles.subjectTabs}>
          {SUBJECTS.map((s, i) => (
            <button
              key={s.name}
              type="button"
              className={cn(styles.subjectTab, subject === i && styles.subjectTabActive)}
              onClick={() => setSubject(i)}
              aria-label={`View ${s.name}`}
            >
              <span className={styles.subjectTabDot} style={{ background: s.color }} />
              <span>{s.short}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={subject}
            className={styles.consoleBody}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className={styles.subjectHeader}>
              <div>
                <span className={styles.subjectName}>{current.name}</span>
                <span className={styles.subjectType}>{current.type}</span>
              </div>
              <span
                className={styles.subjectStatus}
                style={{
                  color: current.color,
                  borderColor: `${current.color}55`,
                  background: `${current.color}14`,
                }}
              >
                <span className={styles.subjectStatusDot} style={{ background: current.color }} />
                {current.status}
              </span>
            </div>

            <div className={styles.checkList}>
              {current.checks.map((check) => (
                <div key={check.label} className={styles.checkRow}>
                  <check.icon size={13} className={styles.checkIcon} aria-hidden="true" />
                  <span className={styles.checkName}>{check.label}</span>
                  <span className={styles.checkValue}>{check.value}</span>
                  <CheckCircle2 size={14} className={styles.checkDone} aria-hidden="true" />
                </div>
              ))}
            </div>

            <div className={styles.kpiRow}>
              <div className={styles.kpiCell}>
                <CheckCircle2 size={13} aria-hidden="true" />
                <div>
                  <span className={styles.kpiLabel}>Checks passed</span>
                  <span className={styles.kpiValue}>{current.passed}</span>
                </div>
              </div>
              <div className={styles.kpiCell}>
                <ScanSearch size={13} aria-hidden="true" />
                <div>
                  <span className={styles.kpiLabel}>Avg time</span>
                  <span className={styles.kpiValue}>{current.time}</span>
                </div>
              </div>
              <div className={styles.kpiCell}>
                <TrendingUp size={13} aria-hidden="true" />
                <div>
                  <span className={styles.kpiLabel}>Confidence</span>
                  <span className={styles.kpiValue}>{current.confidence}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.consoleFooter}>
          <span className={styles.consoleFooterItem}>
            <ShieldCheck size={12} aria-hidden="true" /> GDPR-ready
          </span>
          <span className={styles.consoleFooterItem}>
            <Lock size={12} aria-hidden="true" /> SOC 2 Type II
          </span>
          <span className={styles.consoleFooterItem}>
            <FileCheck2 size={12} aria-hidden="true" /> Audit trail
          </span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <CheckCircle2 size={13} aria-hidden="true" />
        Passport · Verified
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <CheckCircle2 size={13} aria-hidden="true" />
        PAN · Verified
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <ScanLine size={13} aria-hidden="true" />
        Deepfake · Cleared
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Verification modules (bento)                                        */
/* ------------------------------------------------------------------ */

interface Module {
  icon: LucideIcon;
  title: string;
  description: string;
  stats: string[];
  featured?: boolean;
}

const MODULES: Module[] = [
  {
    icon: Fingerprint,
    title: 'Identity & Document Verification',
    description:
      'AI reads, validates and cross-checks identity documents in seconds — detecting forgeries, tampering and synthetic IDs that human reviewers miss.',
    stats: ['200+ document types', '98.4% auto-approve', 'NFC + liveness'],
    featured: true,
  },
  {
    icon: Globe,
    title: 'Background Screening',
    description:
      'Criminal, employment, education and address checks across 190+ countries — with 2.5 to 13.1 checks per hire depending on industry risk profile.',
    stats: ['190+ countries', '13 checks per hire', '15–21% flag rate'],
    featured: true,
  },
  {
    icon: Radar,
    title: 'AI Fraud Detection',
    description:
      'Deepfake and liveness detection, synthetic identity modelling and device fingerprinting — catching the fraud vector that cost one firm $25M in a single call.',
    stats: ['Deepfake defence', 'Synthetic-ID models'],
  },
  {
    icon: Landmark,
    title: 'KYC / KYB Compliance',
    description:
      'Know-Your-Customer and Know-Your-Business workflows with AML, PEP and sanctions screening baked in — 53% of identity checks are now driven by KYC/AML obligations.',
    stats: ['AML · PEP · sanctions', 'KYB for vendors'],
  },
  {
    icon: Webhook,
    title: 'Real-Time API & Webhooks',
    description:
      'Submit checks, stream status updates and pull reports programmatically — verification results on your systems before your HR team finishes a coffee.',
    stats: ['REST + webhooks', 'Status streaming'],
  },
  {
    icon: BellRing,
    title: 'Continuous Monitoring',
    description:
      'Post-hire re-verification and watchlist alerts that keep records current — closing the gap where 81% of employers run no checks after day one.',
    stats: ['Re-verify on triggers', '81% gap closed'],
  },
];

/* ------------------------------------------------------------------ */
/* Verification process                                                */
/* ------------------------------------------------------------------ */

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Collect',
    description:
      'Candidates or customers submit documents through a secure intake link — with explicit consent, biometric liveness where needed, and no downloads required.',
  },
  {
    step: '02',
    title: 'Verify',
    description:
      'AI extracts and validates every field against 1,000+ source databases — government registries, employers, institutions, courts and sanctions lists.',
  },
  {
    step: '03',
    title: 'Report',
    description:
      'A compliance-ready report is generated instantly, with a full audit trail and a shareable link that your team and regulators can both trust.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Compliance badges                                                   */
/* ------------------------------------------------------------------ */

const COMPLIANCE = [
  { icon: ShieldCheck, name: 'GDPR-ready', detail: 'Data minimisation & right-to-erasure' },
  { icon: Landmark, name: 'KYC / AML', detail: 'Screening workflows out of the box' },
  { icon: Lock, name: 'SOC 2 Type II', detail: 'Independent security attestation' },
  { icon: Database, name: 'ISO 27001', detail: 'Certified information security' },
  { icon: FileCheck2, name: 'FCRA-aligned', detail: 'Fair reporting, dispute handling' },
  { icon: UserCheck, name: 'WCAG 2.2 AA', detail: 'Accessible verification flows' },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaCheckPage() {
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
                  <BadgeCheck size={14} aria-hidden="true" />
                  Verification & Compliance
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Verify people,</GradientText>
                <br />
                before you trust them
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaCheck is an AI-powered identity, background and compliance verification
                platform. One request, every check — from documents and employment history to
                AML screening and deepfake defence — in minutes, not weeks.
              </motion.p>

              <motion.div className={styles.heroActions} variants={defaultItemVariants}>
                <Button to="/contact" variant="gradient">
                  Book a demo
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button to="#modules" variant="outline">
                  Explore checks
                </Button>
              </motion.div>

              <motion.div className={styles.heroTrust} variants={defaultItemVariants}>
                {['190+ countries', 'AI + human review', 'GDPR-ready'].map((item) => (
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
              <ScanVisual />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- The verification gap ---------------- */}
      <Section size="lg" bordered className={styles.gapSection}>
        <div className={styles.gapGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <div className={styles.gapGrid}>
            <motion.div
              className={styles.gapCopy}
              variants={defaultContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <SectionHeader
                spacing="md"
                className={styles.sectionHeader}
                eyebrow={<span className={styles.eyebrow}>The verification gap</span>}
                title={
                  <>
                    Fraud is now the{' '}
                    <GradientText>default assumption</GradientText>
                  </>
                }
                subtitle="Resume fabrication, identity theft and deepfakes are surging. The checks that catch them are the ones most packages skip — and most fraud is detected too late, after interviews and offers."
              />

              <motion.div variants={defaultItemVariants}>
                <GlassCard className={styles.gapCallout}>
                  <span className={styles.gapCalloutIcon}>
                    <AlertTriangle size={20} aria-hidden="true" />
                  </span>
                  <p className={styles.gapCalloutText}>
                    <strong>$25M lost</strong> to a single deepfake video call — while{' '}
                    <strong>81% of employers</strong> still run no post-hire screening at all.
                  </p>
                </GlassCard>
              </motion.div>

              <motion.p className={styles.gapFootnote} variants={defaultItemVariants}>
                Sources: Checkr · State of Screening Compliance 2026 · Veremark Screening
                Benchmark 2026 · public fraud-loss reports
              </motion.p>
            </motion.div>

            <motion.div
              className={styles.gapStats}
              variants={defaultContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {[
                {
                  value: '58%',
                  label: 'of organisations encountered hiring fraud in the past year',
                  source: 'Checkr · 2,500 HR leaders, 2026',
                },
                {
                  value: '51.7%',
                  label: 'of CV-gap checks flag a discrepancy — but most packages never run them',
                  source: 'Veremark Screening Benchmark, 2026',
                },
                {
                  value: '42%',
                  label: 'experienced at least one screening compliance error in 12 months',
                  source: 'Checkr · State of Screening Compliance, 2026',
                },
              ].map((stat, index) => (
                <motion.div key={stat.label} variants={defaultItemVariants}>
                  <GlassCard
                    className={cn(
                      styles.gapStatCard,
                      styles[`hue-${HUES[index % HUES.length]}`],
                    )}
                  >
                    <span className={styles.gapStatIndex}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.gapStatValue}>
                      <CountUp value={stat.value} />
                    </span>
                    <p className={styles.gapStatLabel}>{stat.label}</p>
                    <span className={styles.gapStatSource}>{stat.source}</span>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Verification modules ---------------- */}
      <Section size="lg" bordered id="modules">
        <div className={styles.featuresGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>What we check</span>}
            title={
              <>
                Six layers of <GradientText>verification depth</GradientText>
              </>
            }
            subtitle="From a single identity document to continuous monitoring — each layer closes a hole that fraud actually walks through."
          />

          <motion.div
            className={styles.moduleGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {MODULES.map((mod, index) => (
              <motion.div
                key={mod.title}
                variants={defaultItemVariants}
                className={mod.featured ? styles.moduleFeatured : undefined}
              >
                <GlassCard
                  className={cn(
                    styles.moduleCard,
                    mod.featured && styles.moduleCardFeatured,
                    styles[`hue-${HUES[index % HUES.length]}`],
                  )}
                >
                  {!mod.featured && (
                    <span className={styles.moduleIndex}>
                      {String(index - 1).padStart(2, '0')}
                    </span>
                  )}
                  <div className={styles.moduleTop}>
                    <IconCircle size="lg" variant="gradient">
                      <mod.icon size={20} stroke={`url(#grad-amber)`} aria-hidden="true" />
                    </IconCircle>
                    <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  </div>
                  <p className={styles.moduleDesc}>{mod.description}</p>
                  <div className={styles.moduleStats}>
                    {mod.stats.map((stat) => (
                      <span key={stat} className={styles.moduleStat}>
                        <CheckCircle2 size={13} aria-hidden="true" />
                        {stat}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Document coverage marquee ---------------- */}
      <Section className={styles.marqueeSection}>
        <Container maxWidth="wide">
          <p className={styles.marqueeLabel}>Documents we verify — and 190+ countries of coverage</p>
        </Container>
        <InfiniteMarquee
          speed={34}
          itemWidth={200}
          gap={14}
          items={[
            { id: 'passport', label: 'Passport', icon: CreditCard, accent: 'amber' },
            { id: 'national-id', label: 'National ID', icon: Fingerprint, accent: 'blue' },
            { id: 'driving', label: 'Driving Licence', icon: Car, accent: 'teal' },
            { id: 'pan', label: 'PAN Card', icon: Landmark, accent: 'violet' },
            { id: 'degree', label: 'Degree Certificate', icon: GraduationCap, accent: 'pink' },
            { id: 'employment', label: 'Employment Letter', icon: Briefcase, accent: 'green' },
            { id: 'address', label: 'Address Proof', icon: Home, accent: 'cyan' },
            { id: 'company', label: 'Business Registration', icon: Building2, accent: 'indigo' },
            { id: 'work-permit', label: 'Work Permit / Visa', icon: Globe, accent: 'orange' },
            { id: 'generic', label: 'Tax & Financial Docs', icon: FileText, accent: 'red' },
          ]}
        />
      </Section>

      {/* ---------------- Process + live report ---------------- */}
      <Section size="lg" bordered className={styles.processSection}>
        <div className={styles.processGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                Three steps to a <GradientText>verified decision</GradientText>
              </>
            }
            subtitle="No spreadsheets, no phone-tag with registries — submit once, watch every check stream live."
          />

          <div className={styles.processGrid}>
            <motion.div
              className={styles.reportWrap}
              variants={defaultContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={defaultItemVariants}>
                <GlassCard className={styles.reportCard}>
                  <div className={styles.reportHeader}>
                    <span className={styles.reportHeaderIcon}>
                      <ClipboardCheck size={16} aria-hidden="true" />
                    </span>
                    <span className={styles.reportHeaderTitle}>Verification Report</span>
                    <span className={styles.reportHeaderPill}>Live</span>
                  </div>
                  <div className={styles.reportChecks}>
                    {HERO_CHECKS.map((check) => (
                      <div key={check.label} className={styles.reportCheckRow}>
                        <span className={styles.reportCheckName}>
                          <check.icon size={14} className={styles.reportCheckIcon} aria-hidden="true" />
                          {check.label}
                        </span>
                        <span className={styles.reportCheckValue}>{check.value}</span>
                        <CheckCircle2
                          size={16}
                          className={styles.reportCheckDone}
                          aria-hidden="true"
                        />
                      </div>
                    ))}
                  </div>
                  <div className={styles.reportFooter}>
                    <span className={styles.reportFooterMeta}>
                      Generated in 2m 14s · Audit trail attached
                    </span>
                    <span className={styles.reportFooterScore}>
                      <TrendingUp size={13} aria-hidden="true" />
                      99.2% confidence
                    </span>
                  </div>
                </GlassCard>
              </motion.div>
            </motion.div>

            <motion.div
              className={styles.processSteps}
              variants={defaultContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              {PROCESS_STEPS.map((step, index) => (
                <motion.div key={step.step} variants={defaultItemVariants} className={styles.processStep}>
                  <div className={styles.processStepRail}>
                    <span className={styles.processStepBadge}>{step.step}</span>
                    {index < PROCESS_STEPS.length - 1 && (
                      <span className={styles.processStepLine} />
                    )}
                  </div>
                  <div className={styles.processStepBody}>
                    <h3 className={styles.processStepTitle}>{step.title}</h3>
                    <p className={styles.processStepDesc}>{step.description}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div variants={defaultItemVariants}>
                <GlassCard className={styles.processCtaCard}>
                  <span className={styles.processCtaIcon}>
                    <Sparkles size={16} aria-hidden="true" />
                  </span>
                  <p className={styles.processCtaText}>
                    <strong>16.67% CAGR</strong> — identity verification for employee onboarding
                    grows from $2.78B (2026) to $6.01B by 2031. MetaCheck is built for that
                    demand.
                  </p>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- Compliance ---------------- */}
      <Section size="lg" bordered className={styles.complianceSection}>
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Compliance first</span>}
            title={
              <>
                Standards your auditors <GradientText>already trust</GradientText>
              </>
            }
            subtitle="Every check ships with the certifications and audit trails your compliance team expects."
          />

          <motion.div
            className={styles.complianceGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {COMPLIANCE.map((item) => (
              <motion.div key={item.name} variants={defaultItemVariants}>
                <GlassCard className={styles.complianceCard}>
                  <item.icon size={18} stroke={`url(#grad-amber)`} aria-hidden="true" />
                  <span className={styles.complianceName}>{item.name}</span>
                  <span className={styles.complianceDetail}>{item.detail}</span>
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

              <div className={styles.ctaGrid}>
                <div className={styles.ctaCopy}>
                  <span className={styles.ctaEyebrow}>MetaCheck</span>
                  <h2 className={styles.ctaTitle}>
                    Verify first. <GradientText>Trust with confidence.</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaCheck verifies a candidate end-to-end in under three minutes.
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

                <div className={styles.ctaGauge} aria-hidden="true">
                  <span className={styles.ctaGaugeTicks} />
                  <span className={styles.ctaGaugeRing} />
                  <span className={styles.ctaGaugeCore}>
                    <span className={styles.ctaGaugeValue}>99.2%</span>
                    <span className={styles.ctaGaugeLabel}>Verification score</span>
                    <span className={styles.ctaGaugeMeta}>6/6 checks · 2m 14s</span>
                  </span>
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

export default MetaCheckPage;
