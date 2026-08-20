// MetaFlow.tsx — custom landing page for MetaFlow (Enterprise Platform)
// Concept: automation control center with live flow pipeline.
import { Fragment, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Boxes,
  Check,
  CheckCircle2,
  FileCheck2,
  GitBranch,
  GitMerge,
  Network,
  Play,
  Plug,
  Repeat,
  ShieldCheck,
  Timer,
  Workflow,
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
import styles from './MetaFlow.module.css';

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['violet', 'blue', 'cyan', 'pink', 'amber', 'green'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — automation control center                             */
/* ------------------------------------------------------------------ */

const FLOW_RUNS = [
  {
    name: 'Invoice Approval',
    domain: 'Finance · 4 regions',
    color: '#a78bfa',
    runs: '1,204',
    success: '98.6%',
    cycle: '2h 40m',
    steps: ['Received', 'Validated', 'Approved', 'ERP sync', 'Notify'],
  },
  {
    name: 'Employee Onboarding',
    domain: 'HR · 12 departments',
    color: '#22d3ee',
    runs: '812',
    success: '99.1%',
    cycle: '1h 05m',
    steps: ['Request', 'Accounts', 'IT setup', 'Welcome'],
  },
  {
    name: 'Vendor Sync',
    domain: 'Procurement · 3 ERP',
    color: '#f472b6',
    runs: '963',
    success: '97.9%',
    cycle: '38m',
    steps: ['Invoice', 'Match', 'Approve', 'Pay'],
  },
  {
    name: 'Support Triage',
    domain: 'Ops · 24/7',
    color: '#fbbf24',
    runs: '2,417',
    success: '99.4%',
    cycle: '12m',
    steps: ['Triage', 'Assign', 'Resolve', 'Close'],
  },
] as const;

function GraphVisual() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setFlowIndex((f) => (f + 1) % FLOW_RUNS.length), 3200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable module constant
  }, [FLOW_RUNS.length]);

  useEffect(() => {
    const t = setInterval(
      () => setStepIndex((s) => (s + 1) % (FLOW_RUNS[flowIndex].steps.length + 1)),
      900,
    );
    return () => clearInterval(t);
  }, [flowIndex]);

  const current = FLOW_RUNS[flowIndex];

  return (
    <div className={styles.graphVisual} aria-hidden="true">
      <div className={styles.graphGlow} />
      <div className={styles.graphGrid} />
      <div className={styles.graphOrbit} />

      <div className={styles.consoleCard}>
        <div className={styles.consoleHeader}>
          <span className={styles.consoleHeaderTitle}>
            <Workflow size={14} aria-hidden="true" />
            Flow Control Center
          </span>
          <span className={styles.liveBadge}>
            <span className={styles.liveDot} />
            Live
          </span>
        </div>

        <div className={styles.flowTabs}>
          {FLOW_RUNS.map((f, i) => (
            <button
              key={f.name}
              type="button"
              className={cn(styles.flowTab, flowIndex === i && styles.flowTabActive)}
              onClick={() => setFlowIndex(i)}
              aria-label={`View ${f.name}`}
            >
              <span className={styles.flowTabDot} style={{ background: f.color }} />
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={flowIndex}
            className={styles.consoleBody}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <div className={styles.flowHeader}>
              <div>
                <span className={styles.flowName}>{current.name}</span>
                <span className={styles.flowDomain}>{current.domain}</span>
              </div>
              <span
                className={styles.flowStatus}
                style={{
                  color: current.color,
                  borderColor: `${current.color}55`,
                  background: `${current.color}14`,
                }}
              >
                <span className={styles.flowStatusDot} style={{ background: current.color }} />
                Running
              </span>
            </div>

            <div className={styles.pipeline}>
              {current.steps.map((step, i) => (
                <Fragment key={step}>
                  {i > 0 && (
                    <span
                      className={cn(styles.pipeLink, i <= stepIndex && styles.pipeLinkActive)}
                    />
                  )}
                  <span
                    className={cn(
                      styles.pipeStep,
                      i < stepIndex && styles.pipeStepDone,
                      i === stepIndex && styles.pipeStepActive,
                    )}
                  >
                    <span className={styles.pipeStepDot}>
                      {i < stepIndex ? <Check size={10} aria-hidden="true" /> : null}
                    </span>
                    <span className={styles.pipeStepLabel}>{step}</span>
                  </span>
                </Fragment>
              ))}
            </div>

            <div className={styles.kpiRow}>
              <div className={styles.kpiCell}>
                <Zap size={13} aria-hidden="true" />
                <div>
                  <span className={styles.kpiLabel}>Runs today</span>
                  <span className={styles.kpiValue}>{current.runs}</span>
                </div>
              </div>
              <div className={styles.kpiCell}>
                <CheckCircle2 size={13} aria-hidden="true" />
                <div>
                  <span className={styles.kpiLabel}>Success</span>
                  <span className={styles.kpiValue}>{current.success}</span>
                </div>
              </div>
              <div className={styles.kpiCell}>
                <Timer size={13} aria-hidden="true" />
                <div>
                  <span className={styles.kpiLabel}>Cycle time</span>
                  <span className={styles.kpiValue}>{current.cycle}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={styles.consoleFooter}>
          <span className={styles.consoleFooterItem}>
            <ShieldCheck size={12} aria-hidden="true" /> SLA enforced
          </span>
          <span className={styles.consoleFooterItem}>
            <FileCheck2 size={12} aria-hidden="true" /> Audit trail
          </span>
          <span className={styles.consoleFooterItem}>
            <Plug size={12} aria-hidden="true" /> 45+ connectors
          </span>
        </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Play size={13} aria-hidden="true" />
        1,204 runs
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <GitMerge size={13} aria-hidden="true" />
        Approval · 2m
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <Repeat size={13} aria-hidden="true" />
        Re-running
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const FLOW_STATS = [
  {
    value: 66,
    suffix: '%',
    label: 'of organisations have adopted automation in at least one business function',
    source: 'McKinsey · Automation Survey, 2026',
  },
  {
    value: 25,
    suffix: '%',
    label: 'of the average work week is still lost to manual, repetitive tasks',
    source: 'Smartsheet · Work Management Study',
  },
  {
    value: 248,
    suffix: '%',
    label: 'three-year ROI documented for enterprise workflow automation platforms',
    source: 'Forrester · Total Economic Impact',
  },
  {
    value: 26,
    suffix: 'B',
    label: 'USD — the global workflow automation market in 2026, heading to $40.77B by 2031',
    source: 'Mordor Intelligence · Workflow Automation, 2026',
  },
] as const;

const FLOW_MODULES = [
  {
    icon: Workflow,
    title: 'Visual Workflow Builder',
    description:
      'Drag, connect, deploy. Low-code flow design with branching, parallel paths and error handling — live in hours, not sprints.',
  },
  {
    icon: GitBranch,
    title: 'Approvals & Escalations',
    description:
      'Multi-step approval chains with automatic escalations, SLAs and audit trails — no more approvals sitting in inboxes for two days.',
  },
  {
    icon: Plug,
    title: 'Enterprise Integrations',
    description:
      '45+ native connectors and a REST API for everything else — ERP, CRM, HRIS and legacy cores orchestrated in one flow.',
  },
  {
    icon: Boxes,
    title: 'RPA & Task Automation',
    description:
      'Attended and unattended bots for legacy screen work — cutting cycle times by up to 70% with error rates below manual norms.',
  },
  {
    icon: ShieldCheck,
    title: 'Governance & Security',
    description:
      'Role-based access, policy-based routing and immutable audit logs — built for regulated industries and data-sovereignty rules.',
  },
  {
    icon: Network,
    title: 'Process Intelligence',
    description:
      'Process mining and live dashboards expose bottlenecks and rework so you automate what actually matters first.',
  },
] as const;

const PROCESS_FLOW = [
  {
    step: '01',
    title: 'Map',
    description:
      'Process mining and workshops identify the highest-ROI flows — the ones with waiting, handoffs and rework.',
  },
  {
    step: '02',
    title: 'Build',
    description:
      'Design the flow visually with pre-built connectors and RPA steps. Test on real data, deploy without downtime.',
  },
  {
    step: '03',
    title: 'Run',
    description:
      'Execute at scale with automated error handling, escalations and full audit trails on every run.',
  },
  {
    step: '04',
    title: 'Improve',
    description:
      'Watch cycle time, touches and rework shrink in the intelligence dashboard — then automate the next 30%.',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaFlowPage() {
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
                  <Workflow size={14} aria-hidden="true" />
                  Enterprise Platform
                </Badge>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Automate the flow,</GradientText>
                <br />
                not just the task
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaFlow is an enterprise workflow automation platform that connects your systems,
                automates the handoffs and keeps humans in the decisions that matter — with full
                governance on every run.
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
                {['45+ integrations', 'Low-code', 'Audit-ready'].map((item) => (
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
              <GraphVisual />
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* ---------------- ROI stats ---------------- */}
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
                The case for <GradientText>automation is hard to ignore</GradientText>
              </>
            }
            subtitle="Workflow automation is no longer a pilot project — it is a board-level mandate."
          />
          <motion.div
            className={styles.statsGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {FLOW_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.termBar} aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
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
      <Section size="lg" bordered id="modules">
        <div className={styles.modulesGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            spacing="md"
            className={styles.sectionHeader}
            eyebrow={<span className={styles.eyebrow}>Capabilities</span>}
            title={
              <>
                From first click to <GradientText>full orchestration</GradientText>
              </>
            }
            subtitle="Six modules that take a process from a stuck spreadsheet to a governed, self-healing pipeline."
          />

          <motion.div
            className={styles.moduleGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {FLOW_MODULES.map((mod, index) => (
              <motion.div key={mod.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.moduleCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <mod.icon size={20} stroke={`url(#grad-violet)`} aria-hidden="true" />
                  </IconCircle>
                  <span className={styles.moduleNode} aria-hidden="true" />
                  <h3 className={styles.moduleTitle}>{mod.title}</h3>
                  <p className={styles.moduleDesc}>{mod.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Process (vertical with rail) ---------------- */}
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
                A process that <GradientText>keeps improving itself</GradientText>
              </>
            }
            subtitle="Start with the flows that cost the most — the ones with waiting, handoffs and rework — and let the intelligence show you what is next."
          />

          <motion.div
            className={styles.processList}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {PROCESS_FLOW.map((step, index) => (
              <motion.div key={step.step} variants={defaultItemVariants} className={styles.processRow}>
                <div className={styles.processRail}>
                  <span className={styles.processBadge}>{step.step}</span>
                  {index < PROCESS_FLOW.length - 1 && <span className={styles.processLine} />}
                </div>
                <GlassCard className={styles.processCard}>
                  <h3 className={styles.processTitle}>{step.title}</h3>
                  <p className={styles.processDesc}>{step.description}</p>
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
                  <span className={styles.ctaEyebrow}>MetaFlow</span>
                  <h2 className={styles.ctaTitle}>
                    Get your <GradientText>work week back</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    A quarter of every work week disappears into manual work. See how MetaFlow
                    automates the top two flows in your organisation. Book a live walkthrough.
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
                <div className={styles.ctaFlow} aria-hidden="true">
                  <div className={styles.ctaFlowCard}>
                    <span className={styles.ctaFlowNode}>Request</span>
                    <span className={styles.ctaFlowArrow}>→</span>
                    <span className={styles.ctaFlowNode}>Validate</span>
                    <span className={styles.ctaFlowArrow}>→</span>
                    <span className={cn(styles.ctaFlowNode, styles.ctaFlowNodeDone)}>
                      <CheckCircle2 size={12} /> Approved
                    </span>
                  </div>
                  <span className={styles.ctaFlowMeta}>
                    <Timer size={12} /> Cycle time 4 days → 2 hours
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </Container>
      </Section>
    </div>
  );
}

export default MetaFlowPage;
