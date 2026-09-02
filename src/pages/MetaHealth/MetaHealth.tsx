// MetaHealth.tsx — premium healthcare platform landing page
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Brain,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  Clock,
  HeartPulse,
  LineChart,
  MessageSquareHeart,
  MonitorSmartphone,
  Pill,
  ReceiptText,
  ShieldCheck,
  Stethoscope,
  Syringe,
  Users,
  Video,
  Waves,
  Microscope,
  Baby,
  Bone,
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
import styles from './MetaHealth.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;

/* ------------------------------------------------------------------ */
/* 1. Hero — clinical command center visual                            */
/* ------------------------------------------------------------------ */

function ECGLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 40" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M0,20 L30,20 L45,20 L52,10 L58,30 L64,14 L70,20 L95,20 L108,20 L114,8 L120,34 L126,16 L132,20 L160,20 L170,20 L178,6 L184,28 L190,16 L200,20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.ecgPath}
      />
    </svg>
  );
}

function HeroVisual() {
  const [patient, setPatient] = useState(0);
  const PATIENTS = [
    { name: 'A. Rahman', ward: 'Cardiology · Room 412', hr: 72, spo2: 98, bp: '118/76', status: 'Stable', color: 'var(--grad-1)' },
    { name: 'S. Patel', ward: 'ICU · Bed 7', hr: 88, spo2: 96, bp: '132/84', status: 'Watch', color: 'var(--grad-2)' },
    { name: 'L. Chen', ward: 'Oncology · Suite 3', hr: 76, spo2: 99, bp: '124/78', status: 'Recovering', color: '#22c55e' },
    { name: 'M. Okafor', ward: 'ER · Bay 9', hr: 94, spo2: 97, bp: '140/90', status: 'Stable', color: '#f59e0b' },
  ];

  useEffect(() => {
    const t = setInterval(() => setPatient((p) => (p + 1) % PATIENTS.length), 3000);
    return () => clearInterval(t);
  }, [PATIENTS.length]);

  return (
    <div className={styles.heroVisual}>
      <div className={styles.heroVisualGlow} aria-hidden="true" />
      <div className={styles.heroVisualGrid} aria-hidden="true" />

      {/* Central dashboard card */}
      <div className={styles.dashboardCard}>
        <div className={styles.dashboardHeader}>
          <span className={styles.dashboardHeaderTitle}>
            <HeartPulse size={14} aria-hidden="true" />
            Clinical Command Center
          </span>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            Live · 4,208 patients
          </span>
        </div>

        {/* Patient switcher */}
        <div className={styles.patientTabs}>
          {PATIENTS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={cn(styles.patientTab, patient === i && styles.patientTabActive)}
              onClick={() => setPatient(i)}
              aria-label={`View ${p.name}`}
            >
              <span className={styles.patientTabDot} style={{ background: p.color }} />
              <span className={styles.patientTabName}>{p.name.split(' ')[1]}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={patient}
            className={styles.patientBody}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className={styles.patientHeader}>
              <div>
                <span className={styles.patientName}>{PATIENTS[patient].name}</span>
                <span className={styles.patientWard}>{PATIENTS[patient].ward}</span>
              </div>
              <span className={styles.patientStatus} style={{ color: PATIENTS[patient].color, borderColor: `${PATIENTS[patient].color}55`, background: `${PATIENTS[patient].color}14` }}>
                <span className={styles.patientStatusDot} style={{ background: PATIENTS[patient].color }} />
                {PATIENTS[patient].status}
              </span>
            </div>

            <div className={styles.ecgWrap}>
              <span className={styles.ecgLineLabel}>ECG · Lead II</span>
              <ECGLine className={styles.heroEcg} />
            </div>

            <div className={styles.vitalsRow}>
              <div className={styles.vitalCell}>
                <span className={styles.vitalCellLabel}>Heart rate</span>
                <span className={styles.vitalCellValue}>{PATIENTS[patient].hr}</span>
                <span className={styles.vitalCellUnit}>bpm</span>
              </div>
              <div className={styles.vitalCell}>
                <span className={styles.vitalCellLabel}>SpO₂</span>
                <span className={styles.vitalCellValue}>{PATIENTS[patient].spo2}</span>
                <span className={styles.vitalCellUnit}>%</span>
              </div>
              <div className={styles.vitalCell}>
                <span className={styles.vitalCellLabel}>BP</span>
                <span className={styles.vitalCellValue}>{PATIENTS[patient].bp}</span>
                <span className={styles.vitalCellUnit}>mmHg</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.dashboardFooter}>
          <span className={styles.dashboardFooterItem}>
            <ShieldCheck size={12} aria-hidden="true" /> HIPAA-ready
          </span>
          <span className={styles.dashboardFooterItem}>
            <Activity size={12} aria-hidden="true" /> FHIR-native
          </span>
          <span className={styles.dashboardFooterItem}>
            <Brain size={12} aria-hidden="true" /> AI-assisted
          </span>
        </div>
      </div>

      {/* Floating chips */}
      <div className={`${styles.floatChip} ${styles.floatChip1}`}>
        <Video size={13} aria-hidden="true" />
        Virtual visit · 0m wait
      </div>
      <div className={`${styles.floatChip} ${styles.floatChip2}`}>
        <MessageSquareHeart size={13} aria-hidden="true" />
        AI note · auto-written
      </div>
      <div className={`${styles.floatChip} ${styles.floatChip3}`}>
        <CalendarClock size={13} aria-hidden="true" />
        Follow-up scheduled
      </div>

      {/* Orbit rings */}
      <div className={styles.orbitRings} aria-hidden="true">
        <span className={styles.orbitRing1} />
        <span className={styles.orbitRing2} />
        <span className={styles.orbitRing3} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Data                                                             */
/* ------------------------------------------------------------------ */

const DOMAIN_STATS = [
  {
    icon: HeartPulse,
    value: 4.2,
    suffix: 'M+',
    label: 'patients monitored on the platform',
    sub: 'across acute, ambulatory and home care',
  },
  {
    icon: Clock,
    value: 16,
    suffix: ' min',
    label: 'of documentation time saved per encounter',
    sub: 'with ambient AI scribes (JAMA)',
  },
  {
    icon: Waves,
    value: 99.98,
    suffix: '%',
    label: 'platform uptime, monitored in real time',
    sub: 'with automatic failover across regions',
  },
  {
    icon: ShieldCheck,
    value: 3,
    suffix: 'x',
    label: 'faster incident response with AI triage',
    sub: 'Smart alerts reach the right clinician first',
  },
] as const;

const CLINICAL_MODULES = [
  {
    icon: Stethoscope,
    title: 'AI Clinical Documentation',
    desc: 'Ambient scribes listen, structure and write the note in seconds — so clinicians can focus on the patient, not the chart.',
    tags: ['Ambient scribe', 'Auto-coding', 'SOAP notes'],
    accent: 'teal',
  },
  {
    icon: Video,
    title: 'Telehealth & Virtual Care',
    desc: 'From primary consults to virtual ICU command centers — seamless video care that extends the hospital beyond its walls.',
    tags: ['Virtual visits', 'Virtual ICU', 'Hospital-at-home'],
    accent: 'cyan',
  },
  {
    icon: MonitorSmartphone,
    title: 'Remote Patient Monitoring',
    desc: 'Continuous vitals, wearable integration and smart escalation loops keep chronic patients safe between visits.',
    tags: ['Wearables', 'Smart alerts', 'Chronic care'],
    accent: 'blue',
  },
  {
    icon: ClipboardList,
    title: 'EHR & Interoperability',
    desc: 'FHIR-native connectors drop into Epic, Cerner, and 40+ EHRs — bidirectional, audited, and always in sync.',
    tags: ['FHIR R4', 'Epic & Cerner', 'HL7 v2'],
    accent: 'green',
  },
  {
    icon: Pill,
    title: 'Medication Management',
    desc: 'Digital-first prescribing, interaction checks and closed-loop administration that remove the risk from the routine.',
    tags: ['ePrescribing', 'Interaction checks', 'Closed loop'],
    accent: 'violet',
  },
  {
    icon: Users,
    title: 'Patient Engagement',
    desc: 'Portals, messaging, scheduling and education that patients actually open — engagement that compounds into outcomes.',
    tags: ['Patient portal', 'Smart scheduling', 'Care plans'],
    accent: 'pink',
  },
] as const;

const SPECIALTIES = [
  {
    icon: HeartPulse,
    label: 'Cardiology',
    desc: 'Cardiac monitoring, eReferrals and post-procedure care',
    hue: 'red',
    features: [
      '24-hour Holter & event-loop monitoring',
      'Cath-lab scheduling & eReferrals',
      'Post-MI & post-op care pathways',
      'PAC / quality improvement dashboards',
    ],
    stats: [
      { value: '2.4M', label: 'cardiac readings analyzed daily' },
      { value: '-31%', label: 'code-blue response time' },
    ],
  },
  {
    icon: Brain,
    label: 'Neurology',
    desc: 'Stroke pathways, neuro rehab and seizure monitoring',
    hue: 'violet',
    features: [
      'Stroke code & thrombolysis timelines',
      'Seizure & EEG telemetry alerts',
      'Neuro rehab care plans',
      'NIHSS scoring & longitudinal tracking',
    ],
    stats: [
      { value: '42%', label: 'faster door-to-needle time' },
      { value: '1,800+', label: 'episodes monitored monthly' },
    ],
  },
  {
    icon: Microscope,
    label: 'Oncology',
    desc: 'Tumor board coordination, infusion tracking, survivorship',
    hue: 'pink',
    features: [
      'Tumor board scheduling & case packs',
      'Infusion chair & chemo cycle tracking',
      'NCI toxicity scoring & alerts',
      'Survivorship & follow-up plans',
    ],
    stats: [
      { value: '3.1h', label: 'saved per oncology visit' },
      { value: '96%', label: 'adherence to care plans' },
    ],
  },
  {
    icon: Baby,
    label: 'Pediatrics',
    desc: 'Growth tracking, vaccination schedules, parental access',
    hue: 'amber',
    features: [
      'CDC growth charts & percentile tracking',
      'Immunization schedules & reminders',
      'Parent portal with proxy access',
      'School & camp health forms',
    ],
    stats: [
      { value: '100%', label: 'vaccination schedule coverage' },
      { value: '3x', label: 'faster well-visit check-ins' },
    ],
  },
  {
    icon: Bone,
    label: 'Orthopedics',
    desc: 'Pre-op workup, joint registry and post-op physio plans',
    hue: 'cyan',
    features: [
      'Pre-op clearance & risk workup',
      'Joint registry data capture',
      'Post-op physio & rehab protocols',
      'Implant inventory integration',
    ],
    stats: [
      { value: '28%', label: 'shorter pre-op workup time' },
      { value: '2.1k', label: 'joint cases tracked per year' },
    ],
  },
  {
    icon: Syringe,
    label: 'Primary Care',
    desc: 'Preventive screenings, chronic disease management, QI',
    hue: 'green',
    features: [
      'Preventive screening reminders',
      'Hypertension & diabetes registries',
      'Chronic care management (CCM)',
      'HEDIS / quality measure reporting',
    ],
    stats: [
      { value: '45%', label: 'higher screening completion' },
      { value: '-18%', label: 'A1c outliers after 90 days' },
    ],
  },
] as const;

const INTEGRATIONS = [
  { name: 'Epic', type: 'EHR' },
  { name: 'Cerner', type: 'EHR' },
  { name: 'athenahealth', type: 'EHR' },
  { name: 'DrChrono', type: 'EHR' },
  { name: 'Redox', type: 'iPaaS' },
  { name: 'Twilio', type: 'Comms' },
  { name: 'Stripe', type: 'Payments' },
  { name: 'Dexcom', type: 'Devices' },
  { name: 'Apple Health', type: 'Wearables' },
  { name: 'Fitbit', type: 'Wearables' },
  { name: 'Zoom', type: 'Video' },
] as const;

const PATIENT_JOURNEY = [
  {
    step: '01',
    icon: Video,
    title: 'Book & consult',
    desc: 'Self-scheduling, automated intake and a video visit that starts on time.',
  },
  {
    step: '02',
    icon: Brain,
    title: 'AI drafts the note',
    desc: 'The ambient scribe structures the visit into a coded, billable note instantly.',
  },
  {
    step: '03',
    icon: Pill,
    title: 'Prescribe digitally',
    desc: 'Medication sent to the pharmacy with interaction checks baked in.',
  },
  {
    step: '04',
    icon: MonitorSmartphone,
    title: 'Monitor remotely',
    desc: 'Wearables stream vitals; smart escalation loops flag deterioration early.',
  },
  {
    step: '05',
    icon: CalendarClock,
    title: 'Automate follow-up',
    desc: 'Outreach, reminders and re-booking run on autopilot until discharge.',
  },
] as const;

const OUTCOMES = [
  { icon: LineChart, label: 'Documentation time', value: '-65%', delta: 'down' },
  { icon: Activity, label: 'Readmission rate', value: '-38%', delta: 'down' },
  { icon: Users, label: 'Patient engagement', value: '+52%', delta: 'up' },
  { icon: ShieldCheck, label: 'Clinician burnout', value: '-25%', delta: 'down' },
] as const;

const INSIDE_FEATURES = [
  {
    icon: Brain,
    title: 'AI Clinical Copilot',
    desc: 'Ambient listening, auto-drafted notes, ICD-10 coding suggestions and voice-to-text — a copilot that works the way clinicians do.',
    features: [
      'Ambient scribe — listens & drafts',
      'Auto ICD-10 / CPT coding',
      'Voice-to-text dictation',
      'Smart summary for the next visit',
    ],
    accent: 'teal',
  },
  {
    icon: Video,
    title: 'Virtual Care Suite',
    desc: 'Complete telehealth infrastructure with virtual waiting rooms, in-visit tools and 24/7 virtual ICU command centers.',
    features: [
      'HD video visits with waitlist queue',
      'In-visit whiteboard & screen share',
      'Virtual ICU & e-consults',
      'Hospital-at-home programs',
    ],
    accent: 'cyan',
  },
  {
    icon: MonitorSmartphone,
    title: 'Remote Monitoring',
    desc: 'Wearable and device integrations stream vitals into one timeline, with smart escalation loops that never miss deterioration.',
    features: [
      '40+ wearable & device connectors',
      'Real-time vitals timeline',
      'Smart escalation & alert routing',
      'Chronic care management plans',
    ],
    accent: 'blue',
  },
  {
    icon: ClipboardList,
    title: 'EHR & Data Layer',
    desc: 'FHIR R4-native APIs and certified connectors that keep every system in sync — bidirectionally, audited, and real time.',
    features: [
      'FHIR R4 / HL7 v2 connectors',
      'Epic, Cerner & 40+ EHRs',
      'Bidirectional real-time sync',
      'Full audit trail on every record',
    ],
    accent: 'green',
  },
  {
    icon: Users,
    title: 'Patient Portal & Engagement',
    desc: 'A consumer-grade portal with smart scheduling, two-way messaging, education libraries and automated reminders.',
    features: [
      'Self-scheduling & waitlists',
      'Secure two-way messaging',
      'Personalized education content',
      'Automated appointment reminders',
    ],
    accent: 'violet',
  },
  {
    icon: ReceiptText,
    title: 'Billing & Revenue Cycle',
    desc: 'Eligibility checks, claim scrubbing and automated follow-up that close the loop from visit to payment.',
    features: [
      'Real-time eligibility checks',
      'Claim scrubbing & denial tracking',
      'Automated statement & follow-up',
      'Patient payment plans',
    ],
    accent: 'pink',
  },
  {
    icon: LineChart,
    title: 'Analytics & Population Health',
    desc: 'Clinical and operational dashboards, risk stratification and quality reporting that turn data into decisions.',
    features: [
      'Real-time operational dashboards',
      'Population risk stratification',
      'Quality & value-based reporting',
      'Custom measure builders',
    ],
    accent: 'amber',
  },
  {
    icon: ShieldCheck,
    title: 'Security & Compliance',
    desc: 'Enterprise-grade security built in from day one — certified, monitored and hardened for regulated environments.',
    features: [
      'HIPAA & SOC 2 Type II certified',
      'GDPR & ISO 27001 aligned',
      'AES-256 encryption at rest',
      'Role-based access & SSO/SAML',
    ],
    accent: 'red',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaHealthPage() {
  const [activeSpecialty, setActiveSpecialty] = useState(0);
  const [journeyStep, setJourneyStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setJourneyStep((s) => (s + 1) % PATIENT_JOURNEY.length), 4000);
    return () => clearInterval(t);
  }, []);

  const specialty = SPECIALTIES[activeSpecialty];

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
                MetaHealth unifies clinical documentation, virtual care, remote monitoring and
                patient engagement — giving clinicians back their time and patients a direct line
                to their care team.
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
              <HeroVisual />
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
                Trusted across the <GradientText>care continuum</GradientText>
              </>
            }
            subtitle="MetaHealth powers hospitals, clinics, and home care teams — with the numbers to prove it."
          />
          <motion.div
            className={styles.statsGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {DOMAIN_STATS.map((stat) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard className={styles.statCard}>
                  <div className={styles.statIconRow}>
                    <IconCircle size="md" variant="gradient">
                      <stat.icon size={16} stroke="url(#grad-teal)" aria-hidden="true" />
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

      {/* ================= CLINICAL MODULES ================= */}
      <Section size="lg" bordered id="modules">
        <div className={styles.modulesGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
align="center" spacing="md" className={styles.sectionHeader}
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
            {CLINICAL_MODULES.map((mod) => (
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
align="center" spacing="md" className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>What's inside</span>}
            title={
              <>
                Everything a modern health system <GradientText>needs in one platform</GradientText>
              </>
            }
            subtitle="Eight tightly-integrated suites — from the clinical copilot to the revenue cycle — each one production-grade on its own, transformative together."
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

      {/* ================= SPECIALTIES ================= */}
      <Section size="lg" bordered>
        <Container maxWidth="wide">
          <SectionHeader
align="center" spacing="md" className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Specialties</span>}
            title={
              <>
                Built for every <GradientText>clinical specialty</GradientText>
              </>
            }
            subtitle="Workflows tuned to how each specialty actually practices — not a generic EHR template."
          />

          <div className={styles.specialtyLayout}>
            <div className={styles.specialtyTabs}>
              {SPECIALTIES.map((sp, i) => {
                const Icon = sp.icon;
                return (
                  <button
                    key={sp.label}
                    type="button"
                    className={cn(
                      styles.specialtyTab,
                      activeSpecialty === i && styles.specialtyTabActive,
                      styles[`sp-${sp.hue}`],
                    )}
                    onClick={() => setActiveSpecialty(i)}
                  >
                    <span className={styles.specialtyTabIcon}>
                      <Icon size={17} aria-hidden="true" />
                    </span>
                    <span className={styles.specialtyTabLabel}>{sp.label}</span>
                    <ArrowRight size={14} className={styles.specialtyTabArrow} aria-hidden="true" />
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpecialty}
                className={cn(styles.specialtyPanel, styles[`sp-${specialty.hue}`])}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              >
                <div className={styles.specialtyPanelGlow} aria-hidden="true" />
                <div className={styles.specialtyPanelHeader}>
                  <div className={styles.specialtyPanelIcon}>
                    <specialty.icon size={28} stroke={`url(#grad-${specialty.hue})`} aria-hidden="true" />
                  </div>
                  <div className={styles.specialtyPanelTitleWrap}>
                    <h3 className={styles.specialtyPanelTitle}>{specialty.label}</h3>
                    <p className={styles.specialtyPanelDesc}>{specialty.desc}</p>
                  </div>
                </div>
                <ul className={styles.specialtyPanelList}>
                  {specialty.features.map((feat) => (
                    <li key={feat} className={styles.specialtyFeature}>
                      <CheckCircle2 size={15} aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <div className={styles.specialtyPanelStats}>
                  {specialty.stats.map((s) => (
                    <div key={s.label} className={styles.specialtyStat}>
                      <span className={styles.specialtyStatValue}>{s.value}</span>
                      <span className={styles.specialtyStatLabel}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </Section>

      {/* ================= PATIENT JOURNEY ================= */}
      <Section size="lg" bordered className={styles.journeySection}>
        <div className={styles.journeyGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
align="center" spacing="md" className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>The journey</span>}
            title={
              <>
                A patient journey that <GradientText>runs itself</GradientText>
              </>
            }
            subtitle="From the first booking to post-discharge follow-up — every step orchestrated, every handoff warm."
          />

          <div className={styles.journeyTrack}>
            {PATIENT_JOURNEY.map((step, i) => {
              const Icon = step.icon;
              const isActive = journeyStep === i;
              const isDone = i < journeyStep || (journeyStep === 0 && i === PATIENT_JOURNEY.length - 1);
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
align="center" spacing="md" className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Outcomes</span>}
            title={
              <>
                Outcomes your board <GradientText>will notice</GradientText>
              </>
            }
            subtitle="Real-world performance across deployments — not projections."
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
align="center" spacing="md" className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Integrations</span>}
            title={
              <>
                Plays well with your <GradientText>existing stack</GradientText>
              </>
            }
            subtitle="40+ certified connectors — EHRs, devices, payments and communication, out of the box."
          />

          <motion.div
            className={styles.integrationMarquee}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {INTEGRATIONS.map((int) => (
              <motion.div key={int.name} variants={defaultItemVariants}>
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
                    <span className={styles.ctaVitalsValue}>
                      <CountUp value={1284} />
                    </span>
                    <ECGLine className={styles.ctaEcg} />
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

export default MetaHealthPage;