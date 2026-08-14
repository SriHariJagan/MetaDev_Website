// AboutHero.tsx — company hero for the About Us page
import { motion, type Variants } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  Database,
  Monitor,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { blurUp, staggerContainer } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './AboutHero.module.css';

const containerVariants: Variants = staggerContainer(0.08, 0.05);
const itemVariants: Variants = blurUp(24, 0.5, 8);

const visualVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.15 },
  },
};

const STATS = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '100+', label: 'Clients Worldwide' },
  { value: '99%', label: 'Client Satisfaction' },
];

/* ---------- Constellation diagram: MetaDev Core + satellite disciplines ---------- */

// Evenly spaced 3-column / 5-row grid — margins leave room for node rings + labels so nothing clips.
const COLS = { left: 18, center: 50, right: 82 };
const ROWS = { r0: 10, r1: 30, r2: 50, r3: 70, r4: 87 };

interface Satellite {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  accent: string;
  x: number;
  y: number;
}

const HUB = { x: COLS.center, y: ROWS.r2 };

const SATELLITES: Satellite[] = [
  { id: 'customers', title: 'Customers', subtitle: 'Users · Clients', icon: Users, accent: 'violet', x: COLS.center, y: ROWS.r0 },
  { id: 'automation', title: 'Automation', subtitle: 'Intelligent', icon: Sparkles, accent: 'rose', x: COLS.left, y: ROWS.r1 },
  { id: 'frontend', title: 'Frontend', subtitle: 'React UI', icon: Monitor, accent: 'blue', x: COLS.center, y: ROWS.r1 },
  { id: 'marketing', title: 'Marketing', subtitle: 'Campaigns', icon: Target, accent: 'green', x: COLS.right, y: ROWS.r1 },
  { id: 'database', title: 'Database', subtitle: 'Persistence', icon: Database, accent: 'rose', x: COLS.left, y: ROWS.r2 },
  { id: 'api', title: 'API', subtitle: 'REST / GraphQL', icon: Network, accent: 'cyan', x: COLS.right, y: ROWS.r2 },
  { id: 'analytics', title: 'Analytics', subtitle: 'Insights', icon: BarChart3, accent: 'indigo', x: COLS.left, y: ROWS.r3 },
  { id: 'backend', title: 'Backend', subtitle: 'Business logic', icon: Server, accent: 'amber', x: COLS.center, y: ROWS.r3 },
  { id: 'operations', title: 'Operations', subtitle: 'Workflows', icon: Zap, accent: 'green', x: COLS.right, y: ROWS.r3 },
  { id: 'growth', title: 'Growth', subtitle: 'Scale', icon: TrendingUp, accent: 'amber', x: COLS.center, y: ROWS.r4 },
];

function ConstellationDiagram() {
  return (
    <div className={styles.constellation}>
      <div className={styles.avatarBadge}>
        <span className={styles.avatarBadgeDot} />
        Trusted by 100+ Clients
      </div>

      <svg
        className={styles.constellationSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {SATELLITES.map((node) => {
          const pathId = `flow-path-${node.id}`;
          const pathD = `M ${HUB.x} ${HUB.y} L ${node.x} ${node.y}`;
          return (
            <g key={node.id} className={styles[`accent-${node.accent}`]}>
              {/* pathLength normalizes every line (regardless of its real length,
                  e.g. diagonal vs. straight) to the same dash parametrization, so
                  every line always ends on a visible dash right at the node —
                  never a gap that makes it look like it stops short. */}
              <path
                id={pathId}
                d={pathD}
                pathLength={95}
                className={styles.constellationLine}
              />
              {/* Soft outer glow trailing the core spark — same eased motion,
                  larger and dimmer, so the flow reads as a glowing pulse
                  rather than a flat dot. */}
              <circle r="2.2" className={styles.flowGlow}>
                <animateMotion
                  dur="4.4s"
                  repeatCount="indefinite"
                  begin="0s"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.45 0 0.55 1"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.5;0.5;0"
                  keyTimes="0;0.18;0.8;1"
                  dur="4.4s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
              <circle r="0.85" className={styles.flowDot}>
                <animateMotion
                  dur="4.4s"
                  repeatCount="indefinite"
                  begin="0s"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.45 0 0.55 1"
                >
                  <mpath href={`#${pathId}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.12;0.85;1"
                  dur="4.4s"
                  repeatCount="indefinite"
                  begin="0s"
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Plain, un-animated positioning shell — keeps the CSS translate(-50%,-50%)
          centering intact. Framer would otherwise overwrite that transform the
          moment it animates scale/y on the same element. */}
      <div className={styles.hubNode} style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}>
        <motion.div
          className={styles.hubInner}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className={styles.hubRing} aria-hidden="true" />
          <span className={styles.hubIcon}>
            <ShieldCheck size={26} aria-hidden="true" />
          </span>
          <span className={styles.hubTitle}>MetaDev</span>
          <span className={styles.hubTag}>CORE</span>
        </motion.div>
      </div>

      {SATELLITES.map((node, index) => {
        const Icon = node.icon;
        return (
          <div
            key={node.id}
            className={styles.satelliteWrap}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
          >
            {/* Icon sits exactly on the connecting line — centered by the plain
                wrap above; only this inner element animates, so nothing clobbers
                the centering transform. */}
            <motion.span
              className={cn(styles.satelliteNode, styles[`accent-${node.accent}`])}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }}
              whileHover={{ scale: 1.15 }}
              transition={{
                opacity: { duration: 0.45, ease: 'easeOut', delay: 0.3 + index * 0.06 },
                scale: { duration: 0.45, ease: 'easeOut', delay: 0.3 + index * 0.06 },
                y: {
                  duration: 3.4 + (index % 3) * 0.3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.8 + index * 0.15,
                },
              }}
            >
              <Icon size={18} aria-hidden="true" />
            </motion.span>
            <motion.span
              className={styles.satelliteLabel}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.35 + index * 0.06 }}
            >
              <span className={styles.satelliteTitle}>{node.title}</span>
              <span className={styles.satelliteSubtitle}>{node.subtitle}</span>
            </motion.span>
          </div>
        );
      })}
    </div>
  );
}

export interface AboutHeroProps {
  eyebrow?: string;
  greeting?: string;
  name?: string;
  role?: string;
  bio?: string;
}

export function AboutHero({
  eyebrow = 'About Us',
  greeting = 'We are',
  name = 'Metadev',
  role = 'Software Studio',
  bio = 'Metadev designs, builds and scales premium digital products — from enterprise platforms to AI-powered tools. One accountable partner, one vision, from first sprint to scale.',
}: AboutHeroProps) {
  return (
    <Section size="md" className={styles.hero}>
      <BackgroundDecor>
        <div className={styles.glowTop} />
        <div className={styles.glowBottom} />
      </BackgroundDecor>

      <Container className={styles.container}>
        {/* ---------- Left: intro ---------- */}
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            {eyebrow}
          </motion.span>

          <motion.h1 className={styles.title} variants={itemVariants}>
            <span className={styles.titleLine}>{greeting}</span>
            <GradientText>{name}.</GradientText>
          </motion.h1>

          <motion.p className={styles.roleLine} variants={itemVariants}>
            <span className={styles.roleMain}>{role}</span>
            <span className={styles.roleDot} />
            <span className={styles.roleCyan}>AI Product House</span>
            <span className={styles.roleDot} />
            <span className={styles.roleAmber}>Cloud Specialists</span>
          </motion.p>

          <motion.p className={styles.bio} variants={itemVariants}>
            {bio}
          </motion.p>

          <motion.div className={styles.actions} variants={itemVariants}>
            <Button to="/solutions" variant="gradient" size="md">
              Explore Solutions
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button to="/products" variant="outline" size="md">
              <Briefcase size={16} aria-hidden="true" />
              See Our Products
            </Button>
          </motion.div>

          <motion.dl className={styles.stats} variants={itemVariants}>
            {STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* ---------- Right: constellation visual ---------- */}
        <motion.div
          className={styles.visual}
          variants={visualVariants}
          initial="hidden"
          animate="visible"
        >
          <ConstellationDiagram />
        </motion.div>
      </Container>
    </Section>
  );
}

export default AboutHero;
