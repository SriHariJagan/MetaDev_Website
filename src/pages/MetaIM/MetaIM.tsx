// MetaIM.tsx — custom landing page for MetaIM (Inventory Management)
// Concept: a live warehouse stock board with reorder levels.
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Archive,
  ArrowRight,
  Barcode,
  Boxes,
  CheckCircle2,
  ClipboardList,
  Package,
  RefreshCcw,
  ScanLine,
  Star,
  Warehouse,
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
import styles from './MetaIM.module.css';

const VIEWPORT = { once: true, amount: 0.2 } as const;
const HUES = ['cyan', 'blue', 'teal', 'green', 'indigo', 'violet'] as const;

/* ------------------------------------------------------------------ */
/* Hero visual — live warehouse stock board                            */
/* ------------------------------------------------------------------ */

const RACK_CELLS = [
  { id: 'A-01', name: 'Wireless Router X1', level: 82, hue: 'hue-a' },
  { id: 'B-03', name: 'Smart Sensor Kit', level: 55, hue: 'hue-b' },
  { id: 'A-07', name: 'USB-C Charger 65W', level: 30, hue: 'hue-c' },
  { id: 'B-11', name: 'Smart Bulb RGB', level: 9, hue: 'hue-a' },
  { id: 'C-02', name: 'Network Switch 8P', level: 68, hue: 'hue-b' },
  { id: 'C-09', name: 'Indoor Cam 2K', level: 44, hue: 'hue-c' },
] as const;

const IM_ALERTS = ['Reorder · USB-C Charger', 'PO-1184 inbound · 2 days', 'Cycle count · 96% OK'] as const;

function RackVisual() {
  return (
    <motion.div
      className={styles.rackVisual}
      aria-hidden="true"
      whileHover={{ rotateY: -6, rotateX: 4, scale: 1.015 }}
      style={{ transformPerspective: 1400 }}
      transition={{ type: 'spring', stiffness: 160, damping: 22 }}
    >
      <div className={styles.rackGlow} />
      <div className={styles.rackUnit}>
        <div className={styles.rackHead}>
          <span className={styles.rackTitle}>
            <Warehouse size={13} /> Warehouse · Chennai Hub
          </span>
          <span className={styles.rackPill}>14,208 SKUs</span>
        </div>

        <div className={styles.rackGrid}>
          {RACK_CELLS.map((cell) => (
            <div key={cell.id} className={cn(styles.rackCell, styles[cell.hue])}>
              <span className={styles.rackCellId}>{cell.id}</span>
              <span className={styles.rackCellName}>{cell.name}</span>
              <div className={styles.rackFill}>
                <span style={{ height: `${cell.level}%` }} />
              </div>
              <span className={styles.rackCellLevel}>{cell.level}%</span>
            </div>
          ))}
        </div>

        <div className={styles.rackFooter}>
          {IM_ALERTS.map((alert) => (
            <span key={alert} className={styles.rackFooterItem}>
              <AlertTriangle size={11} />
              {alert}
            </span>
          ))}
        </div>

        <div className={styles.rackBeam} />
      </div>

      <div className={`${styles.chip} ${styles.chip1}`}>
        <Barcode size={13} />
        Barcode sync
      </div>
      <div className={`${styles.chip} ${styles.chip2}`}>
        <ScanLine size={13} />
        Scanned · in 0.4s
      </div>
      <div className={`${styles.chip} ${styles.chip3}`}>
        <CheckCircle2 size={13} />
        Stock matched
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const IM_STATS = [
  {
    value: 23,
    suffix: 'B',
    label: 'USD — the global inventory management software market in 2026, heading toward $41B',
    source: 'Grand View Research · Inventory software, 2026',
  },
  {
    value: 43,
    suffix: '%',
    label: 'of businesses have faced stockouts that forced them to cancel orders',
    source: 'Zebra Technologies · Fulfillment vision study',
  },
  {
    value: 25,
    suffix: '%',
    label: 'average reduction in inventory carrying cost with real-time tracking',
    source: 'Supply Chain Digest · Inventory optimization',
  },
  {
    value: 73,
    suffix: '%',
    label: 'of warehouses now use barcode or RFID scanning as their stock of record',
    source: 'Interact Analysis · Warehouse automation, 2026',
  },
] as const;

const IM_FEATURES = [
  {
    icon: Boxes,
    title: 'Real-Time Stock Tracking',
    description:
      'Every unit counted, located and valued in real time — with multi-location stock, batch and serial number tracking down to the shelf.',
  },
  {
    icon: Warehouse,
    title: 'Multi-Warehouse Management',
    description:
      'Run unlimited warehouses, zones and bins from one dashboard — with transfer orders, inter-warehouse stock movement and smart allocation.',
  },
  {
    icon: ScanLine,
    title: 'Barcode & QR Scanning',
    description:
      'Receiving, picking and counting at scanner speed — every scan updates stock instantly and removes manual entry errors for good.',
  },
  {
    icon: AlertTriangle,
    title: 'Low-Stock & Reorder Alerts',
    description:
      'Safety-stock rules trigger purchase orders automatically, so you restock before shelves run dry and never over-order again.',
  },
  {
    icon: RefreshCcw,
    title: 'AI Demand Forecasting',
    description:
      'Predictive models learn seasonality and sales velocity to recommend reorder quantities and timings with 90%+ accuracy.',
  },
  {
    icon: ClipboardList,
    title: 'Cycle Counts & Audit',
    description:
      'Scheduled counts, variance reports and value adjustments keep physical and digital stock perfectly in sync.',
  },
] as const;

const IM_FLOW = [
  {
    icon: Package,
    step: '01',
    title: 'Receive',
    description: 'Goods are scanned in and matched against purchase orders instantly.',
    stat: 'In 0.4s / item',
  },
  {
    icon: Archive,
    step: '02',
    title: 'Store',
    description: 'Smart bin assignment places every SKU where it moves fastest.',
    stat: '−30% pick time',
  },
  {
    icon: ScanLine,
    step: '03',
    title: 'Track',
    description: 'Every pick, pack and move updates stock in real time.',
    stat: '100% accuracy',
  },
  {
    icon: RefreshCcw,
    step: '04',
    title: 'Reorder',
    description: 'AI demand signals create POs before a stockout can happen.',
    stat: '0 stockouts',
  },
  {
    icon: ClipboardList,
    step: '05',
    title: 'Ship',
    description: 'Orders flow out with correct stock reserved at every step.',
    stat: '99.2% OTIF',
  },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function MetaIMPage() {
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
                  Live stock · 100% scan accuracy
                </span>
              </motion.div>

              <motion.h1 className={styles.heroTitle} variants={defaultItemVariants}>
                <GradientText>Stock that's always</GradientText>
                <br />
                in sync
              </motion.h1>

              <motion.p className={styles.heroText} variants={defaultItemVariants}>
                MetaIM is an inventory management platform that keeps every SKU perfectly in
                sync — real-time stock, multi-warehouse tracking, barcode scanning and AI demand
                forecasting that ends stockouts and overstock for good.
              </motion.p>

              <motion.div className={styles.heroMetrics} variants={defaultItemVariants}>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <Boxes size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="14.2" suffix="k" /> <span className={styles.heroMetricUnit}>SKUs</span>
                    </span>
                    <span className={styles.heroMetricLabel}>Tracked live</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <ScanLine size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="0.4" suffix="s" />
                    </span>
                    <span className={styles.heroMetricLabel}>Avg. scan time</span>
                  </span>
                </div>
                <div className={styles.heroMetric}>
                  <span className={styles.heroMetricIcon}>
                    <RefreshCcw size={15} aria-hidden="true" />
                  </span>
                  <span className={styles.heroMetricBody}>
                    <span className={styles.heroMetricValue}>
                      <CountUp value="100" suffix="%" />
                    </span>
                    <span className={styles.heroMetricLabel}>Stock accuracy</span>
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
                  {['SR', 'KV', 'MN', 'PL'].map((initials, index) => (
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
                  <strong>4.9/5</strong> from 1,200+ operations teams
                </span>
              </motion.div>
            </motion.div>

            <motion.div
              variants={defaultItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <RackVisual />
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
            {IM_STATS.map((stat, index) => (
              <motion.div key={stat.label} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.statCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <span className={styles.statValue}>
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </span>
                  <p className={styles.statLabel}>{stat.label}</p>
                  <span className={styles.statSource}>{stat.source}</span>
                  <span className={styles.statBar} aria-hidden="true">
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
                Every SKU, <GradientText>under control</GradientText>
              </>
            }
            subtitle="Six tightly integrated modules that cover the entire stock lifecycle — from receiving dock to shipping bay."
          />

          <motion.div
            className={styles.featureGrid}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {IM_FEATURES.map((feature, index) => (
              <motion.div key={feature.title} variants={defaultItemVariants}>
                <GlassCard
                  className={cn(styles.featureCard, styles[`hue-${HUES[index % HUES.length]}`])}
                >
                  <IconCircle size="lg" variant="gradient">
                    <feature.icon size={20} stroke={`url(#grad-cyan)`} aria-hidden="true" />
                  </IconCircle>
                  <h3 className={styles.featureTitle}>{feature.title}</h3>
                  <p className={styles.featureDesc}>{feature.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* ---------------- Stock flow ---------------- */}
      <Section size="lg" bordered className={styles.flowSection}>
        <div className={styles.flowGlow} aria-hidden="true" />
        <Container maxWidth="wide">
          <SectionHeader
            align="center"
            eyebrow={<span className={styles.eyebrow}>How it works</span>}
            title={
              <>
                From receiving dock to <GradientText>shipping bay</GradientText>
              </>
            }
            subtitle="Five stages, one continuous loop — stock moves, and the system never blinks."
          />

          <motion.div
            className={styles.flow}
            variants={defaultContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {IM_FLOW.map((stage, index) => (
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
                  <span className={styles.ctaEyebrow}>MetaIM</span>
                  <h2 className={styles.ctaTitle}>
                    Never run out. <GradientText>Never overstock.</GradientText>
                  </h2>
                  <p className={styles.ctaText}>
                    See how MetaIM cuts carrying cost by 25% and eliminates stockouts. Book a
                    live walkthrough with our supply chain team.
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
                <div className={styles.ctaStock} aria-hidden="true">
                  <div className={styles.ctaStockTop}>
                    <span className={styles.ctaStockIcon}>
                      <Warehouse size={18} />
                    </span>
                    <div className={styles.ctaStockInfo}>
                      <span className={styles.ctaStockName}>Chennai Hub · Zone A</span>
                      <span className={styles.ctaStockRoute}>14,208 SKUs · live</span>
                    </div>
                    <span className={styles.ctaStockLive} />
                  </div>
                  <div className={styles.ctaStockKpis}>
                    <span className={styles.ctaStockKpi}>
                      <strong>99.2%</strong> stock accuracy
                    </span>
                    <span className={styles.ctaStockKpi}>
                      <strong>0</strong> stockouts this month
                    </span>
                    <span className={styles.ctaStockKpi}>
                      <strong>−25%</strong> carrying cost
                    </span>
                  </div>
                  <div className={styles.ctaStockMeta}>
                    <span className={styles.ctaStockAuto}>AI reorder · 12 POs queued</span>
                    <span className={styles.ctaStockCount}>Cycle count · 96% OK</span>
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

export default MetaIMPage;