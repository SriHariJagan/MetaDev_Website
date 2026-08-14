// MetaCard.tsx — custom landing page for MetaCard (Digital ID Cards)
// Concept: a live digital ID card with QR verification.
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  Fingerprint,
  IdCard,
  QrCode,
  RefreshCcw,
  ScanLine,
  ShieldCheck,
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
import styles from './MetaCard.module.css';

const VIEWPORT = { once: true, amount: 0.2 } as const;
const HUES = ['indigo', 'violet', 'blue', 'purple', 'pink', 'cyan'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — digital ID card                                       */
/* ------------------------------------------------------------------ */

function CardVisual() {
  return (
    <motion.div
      className={styles.cardVisual}
      aria-hidden="true"
      whileHover={{ rotateY: -6, rotateX: 4, scale: 1.015 }}
      style={{ transformPerspective: 1400 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <div className={styles.cardGlow} />
      <div className={styles.cardStack}>
        <div className={`${styles.stackCard} ${styles.stackCard1}`} />
        <div className={`${styles.stackCard} ${styles.stackCard2}`} />
      <div className={styles.idCard}>
        <div className={styles.idCardHolo} />
        <div className={styles.idCardShine} />
        <div className={styles.idCardHeader}>
          <span className={styles.idCardBrand}>
            <IdCard size={14} /> METACARD
          </span>
          <span className={styles.idCardChip}>
            <CreditCard size={16} />
          </span>
        </div>
        <div className={styles.idCardBody}>
          <div className={styles.idCardAvatar}>AK</div>
          <div className={styles.idCardInfo}>
            <span className={styles.idCardName}>Amara Kessler</span>
            <span className={styles.idCardRole}>Senior Product Designer</span>
            <span className={styles.idCardOrg}>MetaDev Technologies</span>
          </div>
        </div>
        <div className={styles.idCardFooter}>
          <div className={styles.idCardMeta}>
            <span className={styles.idCardMetaItem}>
              <BadgeCheck size={11} /> EMP-2041
            </span>
            <span className={styles.idCardMetaItem}>
              <ShieldCheck size={11} /> Level 3 access
            </span>
            <span className={styles.idCardMetaItem}>
              <Fingerprint size={11} /> Biometric enabled
            </span>
          </div>
          <div className={styles.idCardQr}>
            <svg viewBox="0 0 32 32" className={styles.qrSvg}>
              <rect x="2" y="2" width="9" height="9" rx="1.5" fill="currentColor" />
              <rect x="4" y="4" width="5" height="5" fill="#0f172a" />
              <rect x="21" y="2" width="9" height="9" rx="1.5" fill="currentColor" />
              <rect x="23" y="4" width="5" height="5" fill="#0f172a" />
              <rect x="2" y="21" width="9" height="9" rx="1.5" fill="currentColor" />
              <rect x="4" y="23" width="5" height="5" fill="#0f172a" />
              <rect x="15" y="2" width="4" height="4" fill="currentColor" />
              <rect x="21" y="12" width="4" height="4" fill="currentColor" />
              <rect x="27" y="18" width="3" height="3" fill="currentColor" />
              <rect x="2" y="14" width="3" height="3" fill="currentColor" />
              <rect x="8" y="12" width="3" height="3" fill="currentColor" />
              <rect x="14" y="10" width="3" height="3" fill="currentColor" />
              <rect x="12" y="16" width="4" height="4" fill="currentColor" />
              <rect x="18" y="16" width="3" height="3" fill="currentColor" />
              <rect x="14" y="22" width="3" height="3" fill="currentColor" />
              <rect x="19" y="22" width="3" height="3" fill="currentColor" />
              <rect x="24" y="24" width="3" height="3" fill="currentColor" />
              <rect x="2" y="28" width="3" height="3" fill="currentColor" />
              <rect x="8" y="27" width="3" height="3" fill="currentColor" />
              <rect x="16" y="28" width="3" height="3" fill="currentColor" />
              <rect x="28" y="12" width="3" height="3" fill="currentColor" />
            </svg>
          </div>
        </div>
      </div>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <QrCode size={13} />
        Scanned · verified
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Wallet size={13} />
        In Apple & Google Wallet
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <ScanLine size={13} />
        Gate 2 access granted
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const CARD_STATS = [
  {
    value: 12,
    suffix: 'B',
    label: 'USD — the global digital identity market, growing at 14%+ CAGR toward $48B by 2031',
    source: 'Grand View Research · Digital identity, 2026',
  },
  {
    value: 74,
    suffix: '%',
    label: 'of organizations plan to move to digital ID cards within two years',
    source: 'Gemalto / IDC · Digital ID adoption',
  },
  {
    value: 70,
    suffix: '%',
    label: 'faster entry and check-in with QR-based digital badges vs printed cards',
    source: 'HID Global · Access experience study',
  },
  {
    value: 9,
    suffix: 'x',
    label: 'lower card management cost per employee with instant digital issuance',
    source: 'Mercer · HR digitalization benchmarks',
  },
] as const;

const CARD_FEATURES = [
  {
    icon: QrCode,
    title: 'Card Design Studio',
    description:
      'A drag-and-drop designer with brand kits, templates and dynamic fields — issue cards that look like they were designed by an agency.',
  },
  {
    icon: ScanLine,
    title: 'QR & NFC Smart Badges',
    description:
      'Every card carries a secure QR code and optional NFC chip for instant identity verification, check-in and contactless access.',
  },
  {
    icon: RefreshCcw,
    title: 'Instant Issuance & Revocation',
    description:
      'Issue to thousands in one click, update roles in real time and revoke access the moment someone leaves — no reprinting, ever.',
  },
  {
    icon: ShieldCheck,
    title: 'Access & Attendance Control',
    description:
      'Gateways, doors and turnstiles integrate with card verification — attendance and access logs reconcile themselves automatically.',
  },
  {
    icon: Fingerprint,
    title: 'Verification & Anti-Fraud',
    description:
      'Tamper-proof credentials with photo match, biometric binding and expiry rules that make fake or cloned cards useless.',
  },
  {
    icon: Wallet,
    title: 'Mobile Wallet & Lifecycle',
    description:
      'Cards live in Apple Wallet, Google Wallet and the MetaCard app — with renewals, expiry alerts and full lifecycle management.',
  },
] as const;

const CARD_FLOW = [
  {
    icon: IdCard,
    step: '01',
    title: 'Design',
    description: 'Branded templates with dynamic fields, roles and access levels.',
    stat: 'Templates in minutes',
  },
  {
    icon: RefreshCcw,
    step: '02',
    title: 'Issue',
    description: 'Bulk issuance to employees, students or members — instantly.',
    stat: '1,000 cards · 1 click',
  },
  {
    icon: ScanLine,
    step: '03',
    title: 'Verify',
    description: 'QR or NFC tap confirms identity and access in under a second.',
    stat: '0.8s verification',
  },
  {
    icon: ShieldCheck,
    step: '04',
    title: 'Protect',
    description: 'Biometrics, expiry rules and instant revocation keep cards safe.',
    stat: 'Zero reprints',
  },
  {
    icon: BadgeCheck,
    step: '05',
    title: 'Audit',
    description: 'Every scan logged — attendance, access and compliance in one report.',
    stat: 'Fully traceable',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaCardPage() {
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
                  Live verification · 0.8s avg scan
                </span>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Identity,</GradientText>
                <br />
                beautifully issued
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaCard is a digital identity platform that issues beautiful, verifiable ID
                cards — employee badges, student IDs, membership cards and visitor passes with
                QR & NFC security, issued in seconds and gone when they should be.
              </motion.p>

              <motion.div className={styles.heroMetrics} variants={defaultItemVariants}>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <IdCard size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="4.8" suffix="k" /> <span className={styles.heroMetricUnit}>cards</span>
                    </span>
                    <span className={styles.heroMetricLabel}>Issued this month</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <ScanLine size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="0.8" suffix="s" />
                    </span>
                    <span className={styles.heroMetricLabel}>Avg. verify time</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <ShieldCheck size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="99.9" suffix="%" />
                    </span>
                    <span className={styles.heroMetricLabel}>Access uptime</span>
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
                  {['JR', 'MN', 'SK', 'TA'].map((initials, index) => (
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
                  <strong>4.9/5</strong> from 900+ HR & security teams
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={defaultItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <CardVisual />
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
            {CARD_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.statScan} aria-hidden="true">
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
                One platform for every <GradientText>card in your org</GradientText>
              </>
            }
            subtitle="Six tightly integrated modules that cover the entire credential lifecycle — from design to the door."
          />

          <motion.div
            className={styles.featureGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {CARD_FEATURES.map((feature, index) => (
              <motion.div key={feature.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.featureCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <feature.icon size={20} stroke={`url(#grad-indigo)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Card lifecycle ---------------- */}
      <Section size="lg" bordered className={styles.flowSection}>
        <div className={styles.flowGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                From template to <GradientText>turnstile</GradientText>
              </>
            }
            subtitle="Five stages, one secure loop — every card verified, every scan logged."
          />

          <motion.div
            className={styles.flow}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {CARD_FLOW.map((stage, index) => (
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
                  <span className={styles.ctaEyebrow}>MetaCard</span>
                  <h2 className={styles.ctaTitle}>
                    Issue identity in <GradientText>seconds, not weeks</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaCard replaces printed badges with a verifiable digital credential
                    in under a week. Book a live walkthrough.
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
                <div className={styles.ctaCardMini} aria-hidden="true">
                  <div className={styles.ctaCardMiniHeader}>
                    <span className={styles.ctaCardMiniBrand}>
                      <IdCard size={15} /> METACARD
                    </span>
                    <span className={styles.ctaCardMiniChip}>
                      <CreditCard size={15} />
                    </span>
                  </div>
                  <div className={styles.ctaCardMiniBody}>
                    <span className={styles.ctaCardMiniAvatar}>AK</span>
                    <span className={styles.ctaCardMiniName}>Amara Kessler</span>
                    <span className={styles.ctaCardMiniRole}>Senior Product Designer</span>
                  </div>
                  <div className={styles.ctaCardMiniFooter}>
                    <span className={styles.ctaCardMiniVerified}>Verified · 0.8s</span>
                    <span className={styles.ctaCardMiniQr} />
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

export default MetaCardPage;