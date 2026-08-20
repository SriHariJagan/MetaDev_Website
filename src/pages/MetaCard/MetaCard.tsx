// MetaCard.tsx — custom landing page for MetaCard (Digital ID Cards)
// Concept: a 3D card flipper showing a MetaCard, an Aadhaar-style ID and a PAN-style ID.
import { useEffect, useState } from 'react';
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
  Wifi,
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

const VIEWPORT = { once: false, amount: 0.2 } as const;
const HUES = ['indigo', 'violet', 'blue', 'purple', 'pink', 'cyan'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — 3D card flipper                                       */
/* ------------------------------------------------------------------ */

const WALLET_CARDS = [
  {
    id: 'meta',
    label: 'MetaCard',
    tag: 'MetaCard · Infinite',
    name: 'ARJUN MEHTA',
    number: '5399 4821 7745 4213',
    valid: '09/29',
    grad: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    accent: '#a5b4fc',
    chip: true,
  },
  {
    id: 'aadhaar',
    label: 'Aadhaar',
    tag: 'Government ID · Verified',
    name: 'ARJUN MEHTA',
    number: 'XXXX XXXX 4567',
    valid: 'UIDAI',
    grad: 'linear-gradient(135deg, #0f766e, #134e4a)',
    accent: '#99f6e4',
    chip: false,
  },
  {
    id: 'pan',
    label: 'PAN',
    tag: 'Income Tax · E-KYC',
    name: 'ARJUN MEHTA',
    number: 'ABCPM1234F',
    valid: 'Permanent',
    grad: 'linear-gradient(135deg, #6d28d9, #4c1d95)',
    accent: '#ddd6fe',
    chip: false,
  },
] as const;

function CardVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % WALLET_CARDS.length), 2200);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable module constant
  }, [WALLET_CARDS.length]);

  return (
    <div className={styles.cardVisual} aria-hidden="true">
      <div className={styles.cardGlow} />
      <div className={styles.cardGrid} />
      <div className={styles.cardOrbit} />

      <div className={styles.walletHeader}>
        <span className={styles.walletHeaderTitle}>
          <Wallet size={14} aria-hidden="true" />
          Digital Wallet
        </span>
        <span className={styles.liveBadge}>
          <span className={styles.liveDot} />
          Live · {WALLET_CARDS.length} cards
        </span>
      </div>

      <div className={styles.flipStage}>
        {WALLET_CARDS.map((card, i) => {
          const isActive = i === active;
          return (
            <motion.div
              key={card.id}
              className={styles.flipWrap}
              style={{ zIndex: isActive ? 30 : 10 }}
              initial={
                isActive
                  ? { x: 0, y: 0, scale: 1, opacity: 1 }
                  : { x: 14, y: 18, scale: 0.9, opacity: 0.9 }
              }
              animate={
                isActive
                  ? { x: 0, y: 0, scale: 1, opacity: 1 }
                  : { x: 14, y: 18, scale: 0.9, opacity: 0.9 }
              }
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            >
              <div className={styles.flipFace} style={{ background: card.grad }}>
                <div className={styles.flipTop}>
                  {card.chip ? (
                    <span className={styles.flipChip}>
                      <CreditCard size={12} aria-hidden="true" />
                      <Wifi size={9} aria-hidden="true" />
                    </span>
                  ) : (
                    <span className={styles.flipGov} style={{ color: card.accent }}>
                      {card.id === 'aadhaar' ? 'भारत सरकार' : 'GOVT. OF INDIA'}
                    </span>
                  )}
                  <span className={styles.flipBrand} style={{ color: card.accent }}>
                    {card.label}
                  </span>
                </div>
                <span className={styles.flipNumber}>{card.number}</span>
                <div className={styles.flipBottom}>
                  <span className={styles.flipName}>{card.name}</span>
                  <span className={styles.flipValid}>{card.valid}</span>
                </div>
                <span className={styles.flipTag}>{card.tag}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className={styles.walletMeta}>
        <span className={styles.walletMetaItem}>
          <ShieldCheck size={12} aria-hidden="true" /> KYC verified
        </span>
        <span className={styles.walletMetaItem}>
          <Fingerprint size={12} aria-hidden="true" /> Biometric linked
        </span>
        <span className={styles.walletMetaItem}>
          <QrCode size={12} aria-hidden="true" /> Scan to verify
        </span>
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <QrCode size={13} aria-hidden="true" />
        Scanned · verified
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <Wallet size={13} aria-hidden="true" />
        In Apple & Google Wallet
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <ScanLine size={13} aria-hidden="true" />
        Gate 2 access granted
      </div>
    </div>
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