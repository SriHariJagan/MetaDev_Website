// MetaHealth.tsx — custom landing page for MetaHealth (Healthcare Platform)
// Concept: a live patient vitals monitor with an ECG trace.
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  Brain,
  CheckCircle2,
  ClipboardList,
  HeartPulse,
  MessageSquareHeart,
  MonitorSmartphone,
  Pill,
  ShieldCheck,
  Stethoscope,
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
import styles from './MetaHealth.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['teal', 'cyan', 'blue', 'green', 'violet', 'pink'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — vitals monitor with ECG trace                         */
/* ------------------------------------------------------------------ */

const ECG_PATH =
  'M0,60 L20,60 L30,60 L38,60 L44,20 L50,92 L56,44 L62,60 L80,60 L88,60 L94,60 L100,16 L108,94 L114,48 L120,60 L140,60 L148,60 L154,60 L160,26 L166,88 L172,52 L178,60 L196,60';

function VitalsVisual() {
  return (
    <div className={styles.vitalsVisual} aria-hidden="true">
      <div className={styles.vitalsGlow} />

      <div className={styles.monitorCard}>
        <div className={styles.monitorHeader}>
          <span className={styles.monitorHeaderTitle}>
            <HeartPulse size={14} /> Patient monitor
          </span>
          <span className={styles.monitorHeaderPill}>Live</span>
        </div>

        <div className={styles.ecgWrap}>
          <svg viewBox="0 0 200 120" className={styles.ecgSvg} preserveAspectRatio="none">
            <path
              d={ECG_PATH}
              fill="none"
              stroke="url(#grad-teal)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.ecgTrace}
            />
          </svg>
        </div>

        <div className={styles.vitalsGrid}>
          <div className={styles.vitalBox}>
            <span className={styles.vitalLabel}>Heart rate</span>
            <span className={styles.vitalValue}>72 bpm</span>
          </div>
          <div className={styles.vitalBox}>
            <span className={styles.vitalLabel}>SpO2</span>
            <span className={styles.vitalValue}>98%</span>
          </div>
          <div className={styles.vitalBox}>
            <span className={styles.vitalLabel}>Blood pressure</span>
            <span className={styles.vitalValue}>118/76</span>
          </div>
        </div>

        <div className={styles.monitorFooter}>
          <span className={styles.monitorFooterItem}>
            <ShieldCheck size={12} /> HIPAA-ready
          </span>
          <span className={styles.monitorFooterItem}>
            <Activity size={12} /> 4,208 patients
          </span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Video size={13} />
        Virtual visit · 0m wait
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Brain size={13} />
        AI note · auto-written
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <MessageSquareHeart size={13} />
        Follow-up scheduled
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const HEALTH_STATS = [
  {
    value: 568,
    suffix: 'B',
    label: 'USD — the global healthcare IT market in 2026, heading to $1.14T by 2031',
    source: 'MarketsandMarkets · Healthcare IT, 2026',
  },
  {
    value: 15,
    suffix: '%',
    label: 'CAGR driven by AI, cloud adoption and value-based care',
    source: 'MarketsandMarkets · Healthcare IT, 2026',
  },
  {
    value: 96,
    suffix: '%',
    label: 'of US non-federal acute care hospitals have adopted certified EHRs',
    source: 'ONC / AHA · EHR adoption',
  },
  {
    value: 42,
    suffix: '%',
    label: 'reduction in diagnostic errors reported by AI-supported hospitals',
    source: 'InsightMark Research · AI diagnostics',
  },
] as const;

const MODULE_STATUS = ['Ambient', 'Live', '24/7', 'FHIR-native', 'Connected', 'Secure'] as const;

const CARE_MODULES = [
  {
    icon: Stethoscope,
    title: 'AI Clinical Documentation',
    description:
      'Ambient scribes capture the conversation and write the note — cutting documentation time by 16 minutes per encounter and burnout by up to 25%.',
  },
  {
    icon: Video,
    title: 'Telehealth & Virtual Care',
    description:
      'Virtual visits, virtual command centers and hospital-at-home — 87% of US hospitals now offer telemedicine, and MetaHealth makes it seamless.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Remote Patient Monitoring',
    description:
      'Continuous vitals monitoring with smart escalation — chronic care managed at home with the same clinical rigour as the ward.',
  },
  {
    icon: ClipboardList,
    title: 'EHR & Interoperability',
    description:
      'FHIR-native integration with every major EHR — 81% of hospitals already expose patient data via API, MetaHealth plugs straight in.',
  },
  {
    icon: Pill,
    title: 'Care Coordination',
    description:
      'Care-gap closure, referral orchestration and medication workflows that keep the whole care team on one page.',
  },
  {
    icon: Users,
    title: 'Patient Engagement',
    description:
      'Portals, messaging and self-scheduling that patients actually use — engagement is the fastest-growing segment at a 14.9% CAGR.',
  },
] as const;

const IMPACT_PAIRS = [
  {
    value: 13.4,
    suffix: ' min',
    label: 'of total EHR time saved per encounter with ambient AI scribes',
    source: 'JAMA · Ambient documentation study',
  },
  {
    value: 51.9,
    suffix: ' to 38.8%',
    label: 'clinician burnout rate before, falling after AI documentation tools',
    source: 'Short-term clinical studies',
  },
  {
    value: 66,
    suffix: '%',
    label: 'of US physicians now use AI tools — up from 38% in 2023',
    source: 'AMA · AI adoption, 2026',
  },
  {
    value: 74,
    suffix: '%',
    label: 'of US hospitals use AI-powered diagnostic tools in radiology',
    source: 'AMA · AI in practice',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaHealthPage() {
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
                  <HeartPulse size={14} aria-hidden="true" />
                  Healthcare Platform
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Care that's always</GradientText>
                <br />
                on the monitor
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaHealth is a healthcare platform that unifies clinical documentation, virtual
                care, remote monitoring and patient engagement — giving clinicians back their
                time and patients a line straight to their care team.
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
                {['FHIR-native', 'HIPAA-ready', 'AI documentation'].map((item) => (
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
              <VitalsVisual />
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
            {HEALTH_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.vitalDot} aria-hidden="true" />
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.ecgLine} aria-hidden="true">
                    <svg viewBox="0 0 200 30" preserveAspectRatio="none">
                      <polyline
                        points="0,17 40,17 52,11 62,24 76,8 90,21 104,17 150,17 160,11 172,23 200,17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- AI impact pairs ---------------- */}
      <Section size="md" bordered>
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>AI in practice</span>}
            title={
              <>
                AI is already <GradientText>changing outcomes</GradientText>
              </>
            }
            subtitle="The most adopted AI in healthcare today is the kind that gives clinicians time back. Here is what that is worth."
          />

          <motion.div
            className={styles.pairGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {IMPACT_PAIRS.map((pair, index) => (
              <motion.div key={pair.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.pairCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.pairValue}>
                    <CountUp value={pair.value} suffix={pair.suffix} />
                  </span>
                  <p className={styles.pairLabel}>{pair.label}</p>
                  <span className={styles.pairSource}>{pair.source}</span>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Care modules ---------------- */}
      <Section size="lg" bordered id="modules">
        <div className={styles.modulesGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>Capabilities</span>}
            title={
              <>
                Six modules, one <GradientText>continuum of care</GradientText>
              </>
            }
            subtitle="From the consult room to the living room — every touchpoint connected, every clinician unburdened."
          />

          <motion.div
            className={styles.moduleGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {CARE_MODULES.map((mod, index) => (
              <motion.div key={mod.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.moduleCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <mod.icon size={20} stroke={`url(#grad-teal)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.description}</p>
                  <span className={styles.moduleStatus}>{MODULE_STATUS[index]}</span>
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
                  <span className={styles.ctaEyebrow}>MetaHealth</span>
                  <h2 className={styles.ctaTitle}>
                    Give clinicians their <GradientText>time back</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaHealth cuts documentation time by 16 minutes per encounter.
                    Book a live walkthrough with our clinical team.
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
                <div className={styles.ctaVitals} aria-hidden="true">
                  <div className={styles.ctaVitalsCard}>
                    <span className={styles.ctaVitalsLabel}>Patients cared for today</span>
                    <span className={styles.ctaVitalsValue}>1,284</span>
                    <svg viewBox="0 0 200 80" className={styles.ctaEcgSvg} preserveAspectRatio="none">
                      <path
                        d={ECG_PATH}
                        fill="none"
                        stroke="url(#grad-teal)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={styles.ctaEcgTrace}
                      />
                    </svg>
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

export default MetaHealthPage;
