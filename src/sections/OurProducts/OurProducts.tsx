// OurProducts.tsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, animate, useMotionValue, type Variants } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  HeartPulse,
  BookOpen,
  Boxes,
  ShieldCheck,
  Layers,
  Share2,
  Users,
  Building2,
  Globe2,
  Workflow,
  UserPlus,
  BadgeCheck,
  Megaphone,
  Leaf,
  GraduationCap,
  type LucideIcon,
} from 'lucide-react';
import { Section } from '@/components/common/Section';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { GlassCard } from '@/components/common/GlassCard';
import { IconCircle } from '@/components/common/IconCircle';
import { IconButton } from '@/components/common/IconButton';
import { GradientDefs } from '@/components/common/GradientDefs';
import { BackgroundDecor } from '@/components/common/BackgroundDecor';
import { CornerDots } from '@/components/common/CornerDots';
import { Button } from '@/components/common/Button';
import { fadeUp, staggerContainer } from '@/constants/motion';
import { ProductMockup } from './ProductMockup';
import styles from './OurProducts.module.css';

type Accent = 'teal' | 'blue' | 'violet' | 'amber';

/* ------------------------------------------------------------------ */
/* Data (dummy — swap screenshotUrl / copy later)                      */
/* ------------------------------------------------------------------ */

interface MiniStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface Product {
  id: string;
  icon: LucideIcon;
  accent: Accent;
  name: string;
  subtitle: string;
  badge: string;
  features: string[];
  stats: [MiniStat, MiniStat, MiniStat];
  ctaLabel: string;
  href: string;
  screenshotUrl?: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'metahealth',
    icon: HeartPulse,
    accent: 'teal',
    name: 'MetaHealth',
    subtitle: 'Healthcare Platform',
    badge: 'Healthcare',
    features: [
      'Hospital Management System',
      'Electronic Health Records',
      'Telemedicine & ePharmacy',
      'AI Diagnostics & Insights',
      'Ambulance Tracking with AI',
      'Patient Engagement Apps',
    ],
    stats: [
      { icon: Layers, value: '15+', label: 'Modules' },
      { icon: Share2, value: '50+', label: 'Integrations' },
      { icon: Users, value: '1M+', label: 'Patients Served' },
    ],
    ctaLabel: 'Explore MetaHealth',
    href: '/products/metahealth',
  },
  {
    id: 'abhyasa',
    icon: BookOpen,
    accent: 'blue',
    name: 'Abhyasa',
    subtitle: 'Education Platform',
    badge: 'Education',
    features: [
      'Learning Management System',
      'Student Information System',
      'Virtual Classrooms',
      'Assessments & Analytics',
      'Attendance & Smart Tracking',
      'Parent & Teacher Portal',
    ],
    stats: [
      { icon: Layers, value: '12+', label: 'Modules' },
      { icon: Share2, value: '30+', label: 'Integrations' },
      { icon: Users, value: '2M+', label: 'Students Impacted' },
    ],
    ctaLabel: 'Explore Abhyasa',
    href: '/products/abhyasa',
  },
  {
    id: 'metaflow',
    icon: Boxes,
    accent: 'violet',
    name: 'MetaFlow',
    subtitle: 'Enterprise Platform',
    badge: 'Enterprise',
    features: [
      'Workflow Automation',
      'CRM & HRMS',
      'Finance & Accounting',
      'Project Management',
      'Document Management',
      'Business Intelligence',
    ],
    stats: [
      { icon: Layers, value: '20+', label: 'Modules' },
      { icon: Share2, value: '60+', label: 'Integrations' },
      { icon: Building2, value: '100K+', label: 'Businesses' },
    ],
    ctaLabel: 'Explore MetaFlow',
    href: '/products/metaflow',
  },
  {
    id: 'metasecure',
    icon: ShieldCheck,
    accent: 'amber',
    name: 'MetaSecure',
    subtitle: 'Security & Compliance',
    badge: 'Security',
    features: [
      'Identity & Access Management',
      'Threat Detection',
      'Audit & Compliance Logs',
      'Data Encryption',
      'Role-Based Access Control',
      'Security Dashboards',
    ],
    stats: [
      { icon: Layers, value: '10+', label: 'Modules' },
      { icon: Share2, value: '25+', label: 'Integrations' },
      { icon: Building2, value: '5K+', label: 'Enterprises' },
    ],
    ctaLabel: 'Explore MetaSecure',
    href: '/products/metasecure',
  },
  {
    id: 'metahire',
    icon: UserPlus,
    accent: 'blue',
    name: 'MetaHire',
    subtitle: 'Hiring & Talent Platform',
    badge: 'HR & Recruitment',
    features: [
      'AI Resume Screening & Matching',
      'Job Posting & Distribution',
      'Interview Scheduling & Video Interviews',
      'Candidate Tracking System',
      'Offer Management & Onboarding',
      'Workforce & Hiring Analytics',
    ],
    stats: [
      { icon: Layers, value: '18+', label: 'Modules' },
      { icon: Share2, value: '45+', label: 'Integrations' },
      { icon: Users, value: '500K+', label: 'Candidates Hired' },
    ],
    ctaLabel: 'Explore MetaHire',
    href: '/products/metahire',
  },
  {
    id: 'metacheck',
    icon: BadgeCheck,
    accent: 'amber',
    name: 'MetaCheck',
    subtitle: 'Verification & Compliance',
    badge: 'Verification',
    features: [
      'Identity & Document Verification',
      'Background Screening',
      'AI Fraud Detection',
      'KYC / KYB Compliance',
      'Real-Time Status Tracking',
      'Compliance Reports & Audit Logs',
    ],
    stats: [
      { icon: Layers, value: '12+', label: 'Modules' },
      { icon: Share2, value: '35+', label: 'Integrations' },
      { icon: Building2, value: '10K+', label: 'Enterprises' },
    ],
    ctaLabel: 'Explore MetaCheck',
    href: '/products/metacheck',
  },
  {
    id: 'metaadds',
    icon: Megaphone,
    accent: 'violet',
    name: 'MetaAdds',
    subtitle: 'AdTech & Marketing Platform',
    badge: 'AdTech',
    features: [
      'Multi-Channel Ad Campaigns',
      'AI Audience Targeting',
      'Creative Studio & Ad Builder',
      'Real-Time Bidding & Optimization',
      'Attribution & ROAS Analytics',
      'Publisher & Inventory Management',
    ],
    stats: [
      { icon: Layers, value: '15+', label: 'Modules' },
      { icon: Share2, value: '40+', label: 'Integrations' },
      { icon: Users, value: '2M+', label: 'Audiences Reached' },
    ],
    ctaLabel: 'Explore MetaAdds',
    href: '/products/metaadds',
  },
  {
    id: 'metagreen',
    icon: Leaf,
    accent: 'teal',
    name: 'MetaGreen',
    subtitle: 'Sustainability Platform',
    badge: 'Green Tech',
    features: [
      'Carbon Footprint Tracking',
      'ESG Reporting & Compliance',
      'Renewable Energy Management',
      'Waste & Resource Optimization',
      'Green Supply Chain Insights',
      'Sustainability Analytics',
    ],
    stats: [
      { icon: Layers, value: '10+', label: 'Modules' },
      { icon: Share2, value: '28+', label: 'Integrations' },
      { icon: Building2, value: '5K+', label: 'Organizations' },
    ],
    ctaLabel: 'Explore MetaGreen',
    href: '/products/metagreen',
  },
  {
    id: 'metaedu',
    icon: GraduationCap,
    accent: 'blue',
    name: 'MetaEdu',
    subtitle: 'EdTech Platform',
    badge: 'Education',
    features: [
      'Learning Management System',
      'Virtual Classrooms & Live Sessions',
      'Student & Parent Portals',
      'Exams, Grading & Assessments',
      'AI-Powered Adaptive Learning',
      'Institutional Analytics',
    ],
    stats: [
      { icon: Layers, value: '14+', label: 'Modules' },
      { icon: Share2, value: '32+', label: 'Integrations' },
      { icon: Users, value: '1M+', label: 'Students Impacted' },
    ],
    ctaLabel: 'Explore MetaEdu',
    href: '/products/metaedu',
  },
];

interface HeroStat {
  icon: LucideIcon;
  value?: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { icon: Boxes, value: '3+', label: 'Core Platforms' },
  { icon: Layers, value: '25+', label: 'Modules' },
  { icon: Workflow, value: '500+', label: 'Integrations' },
  { icon: Globe2, label: 'Global Ready' },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.07);

const itemVariants = fadeUp(20, 0.35);

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const AUTOPLAY_MS = 3000;
const SLIDE_MS = 550;

/* ------------------------------------------------------------------ */
/* Product card                                                        */
/* ------------------------------------------------------------------ */

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;

  return (
    <GlassCard
      as={motion.li}
      hover="lgSoft"
      className={`${styles.card} ${styles[`accent-${product.accent}`]}`}
      variants={cardVariants}
    >
      <Link to={product.href} className={styles.cardLinkWrap}>
        <div className={styles.cardHeader}>
          <IconCircle size="xl" variant="gradient">
            <Icon size={22} stroke={`url(#grad-${product.accent})`} aria-hidden="true" />
          </IconCircle>
          <div className={styles.cardHeading}>
            <h3 className={styles.cardName}>{product.name}</h3>
            <span className={styles.cardSubtitle}>{product.subtitle}</span>
          </div>
          <span className={styles.cardBadge}>{product.badge}</span>
        </div>

        <ProductMockup
          id={product.id}
          name={product.name}
          icon={product.icon}
          screenshotUrl={product.screenshotUrl}
        />

        <ul className={styles.featureList}>
          {product.features.map((feature) => (
            <li key={feature} className={styles.featureItem}>
              <CheckCircle2 size={15} className={styles.featureCheck} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className={styles.miniStats}>
          {product.stats.map((stat) => (
            <div key={stat.label} className={styles.miniStat}>
              <stat.icon size={16} className={styles.miniStatIcon} aria-hidden="true" />
              <span className={styles.miniStatValue}>{stat.value}</span>
              <span className={styles.miniStatLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <span className={styles.cardLink}>
          {product.ctaLabel}
          <ArrowRight size={14} className={styles.cardLinkArrow} aria-hidden="true" />
        </span>
      </Link>
    </GlassCard>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export function OurProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const direction = useRef<1 | -1>(1);
  const wheelLock = useRef(0);
  const x = useMotionValue(0);
  const [unit, setUnit] = useState(0);
  const [index, setIndex] = useState(0);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const card = track?.firstElementChild;
      if (!track || !(card instanceof HTMLElement)) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || '16px') || 16;
      setUnit(card.getBoundingClientRect().width + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (unit <= 0) return;
    const controls = animate(x, -(index * unit), {
      duration: SLIDE_MS / 1000,
      ease: 'easeInOut',
    });
    return () => controls.stop();
  }, [index, unit, x]);

  const advance = useCallback(
    (current: number, dir: 1 | -1): number => {
      const next = current + dir;
      if (next > PRODUCTS.length) {
        x.jump(0);
        return 0;
      }
      if (next < 0) {
        x.jump(-PRODUCTS.length * unit);
        return PRODUCTS.length;
      }
      return next;
    },
    [x, unit],
  );

  useEffect(() => {
    if (unit <= 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const id = window.setInterval(() => {
      if (paused.current) return;
      setIndex((current) => advance(current, direction.current));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [unit, x, advance]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 5) return;
      const now = performance.now();
      if (now - wheelLock.current < 180) return;
      wheelLock.current = now;
      direction.current = delta > 0 ? 1 : -1;
      setIndex((current) => advance(current, direction.current));
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [advance]);

  const goTo = (dir: 1 | -1) => {
    direction.current = dir;
    setIndex((current) => advance(current, dir));
  };

  const doubled = [...PRODUCTS, ...PRODUCTS];

  return (
    <Section bordered>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container maxWidth="wide" className={styles.container} ref={containerRef}>
        {/* ---------- Left: intro ---------- */}
        <motion.div
          className={styles.intro}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Our Product
            <br />
            <GradientText variant="violet">Ecosystem</GradientText>
          </motion.h2>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Powerful, scalable and AI-driven platforms built to transform
            industries and empower billions of lives.
          </motion.p>

          <motion.div className={styles.heroStats} variants={itemVariants}>
            {HERO_STATS.map((stat) => (
              <div key={stat.label} className={styles.heroStat}>
                <stat.icon size={22} className={styles.heroStatIcon} aria-hidden="true" />
                {stat.value && <span className={styles.heroStatValue}>{stat.value}</span>}
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div className={styles.btnWrap} variants={itemVariants}>
            <Button to="/products" variant="outline" size="md" className={styles.exploreAllBtn}>
              Explore All Products
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.div>

        {/* ---------- Right: product carousel ---------- */}
        <div className={styles.showcase}>
          <IconButton
            label="Previous products"
            className={styles.navButton}
            onClick={() => goTo(-1)}
          >
            <ChevronLeft size={16} />
          </IconButton>

          <div
            ref={viewportRef}
            className={styles.viewport}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
          >
            <motion.ul
              ref={trackRef}
              className={styles.track}
              style={{ x }}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              {doubled.map((product, i) => (
                <ProductCard key={`${product.id}-${i}`} product={product} />
              ))}
            </motion.ul>
          </div>

          <IconButton
            label="Next products"
            className={styles.navButton}
            onClick={() => goTo(1)}
          >
            <ChevronRight size={16} />
          </IconButton>
        </div>
      </Container>
    </Section>
  );
}
