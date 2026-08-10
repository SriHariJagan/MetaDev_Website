// OurSolutions.tsx
import { memo, useCallback, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, LayoutGroup, useReducedMotion, type Variants } from "framer-motion";
import {
  ArrowRight,
  Rocket,
  Clock,
  Globe2,
  ShieldCheck,
  Headset,
  Users,
  Award,
  Users2,
  Package,
  Factory,
  ShoppingCart,
  Truck,
  Building2,
  Sprout,
  Home,
  Hotel,
  Utensils,
  Workflow,
  Share2,
  BrainCircuit,
  Cloud,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { GlassCard } from "@/components/common/GlassCard";
import { IconCircle } from "@/components/common/IconCircle";
import { GradientDefs } from "@/components/common/GradientDefs";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { Button } from "@/components/common/Button";
import { fadeUp, staggerContainer } from "@/constants/motion";
import { cn } from "@/utils/cn";
import styles from "./OurSolutions.module.css";

type Accent = "orange" | "violet" | "blue" | "pink" | "teal" | "green" | "cyan" | "indigo" | "red" | "amber";

/* ------------------------------------------------------------------ */
/* Data (dummy — matches structure/colors of the reference screenshot) */
/* ------------------------------------------------------------------ */

interface Solution {
  id: string;
  number: string;
  icon: LucideIcon;
  accent: Accent;
  name: string;
  description: string;
  features: string[];
  href: string;
}

const SOLUTIONS: Solution[] = [
  {
    id: "crm",
    number: "05",
    icon: Users2,
    accent: "orange",
    name: "CRM ERP",
    description: "Build stronger relationships and close more deals.",
    features: [
      "Lead & Opportunity Management",
      "Sales Automation",
      "Customer Support",
      "Marketing Automation",
      "360° Customer View",
    ],
    href: "/solutions/crm-erp",
  },
  {
    id: "inventory",
    number: "06",
    icon: Package,
    accent: "violet",
    name: "Inventory ERP",
    description: "Real-time inventory visibility and control.",
    features: [
      "Stock Management",
      "Warehouse Management",
      "Barcode / RFID",
      "Multi-Location Tracking",
      "Stock Analytics & Forecasting",
    ],
    href: "/solutions/inventory-erp",
  },
  {
    id: "manufacturing",
    number: "07",
    icon: Factory,
    accent: "blue",
    name: "Manufacturing ERP",
    description: "Optimize production and improve efficiency.",
    features: [
      "Production Planning",
      "Material Management",
      "Quality Control",
      "Maintenance Management",
      "Production Analytics",
    ],
    href: "/solutions/manufacturing-erp",
  },
  {
    id: "retail",
    number: "08",
    icon: ShoppingCart,
    accent: "pink",
    name: "Retail ERP",
    description: "Power your retail operations and grow your business.",
    features: [
      "POS & Billing",
      "Multi-Store Management",
      "Inventory & Stock",
      "Loyalty & Promotions",
      "Retail Analytics",
    ],
    href: "/solutions/retail-erp",
  },
  {
    id: "logistics",
    number: "09",
    icon: Truck,
    accent: "teal",
    name: "Logistics ERP",
    description: "Streamline logistics and deliver on time.",
    features: [
      "Fleet Management",
      "GPS Tracking",
      "Route Optimization",
      "Dispatch Management",
      "Logistics Analytics",
    ],
    href: "/solutions/logistics-erp",
  },
  {
    id: "construction",
    number: "10",
    icon: Building2,
    accent: "green",
    name: "Construction ERP",
    description: "Manage projects, resources and timelines effectively.",
    features: [
      "Project Management",
      "Budget & Estimation",
      "Resource Management",
      "Site Tracking",
      "Progress Reports",
    ],
    href: "/solutions/construction-erp",
  },
  {
    id: "agriculture",
    number: "11",
    icon: Sprout,
    accent: "cyan",
    name: "Agriculture ERP",
    description: "Empowering agriculture with smart solutions.",
    features: [
      "Farm Management",
      "Crop Management",
      "Inventory & Supply",
      "Farmer Management",
      "Agriculture Analytics",
    ],
    href: "/solutions/agriculture-erp",
  },
  {
    id: "realestate",
    number: "12",
    icon: Home,
    accent: "indigo",
    name: "Real Estate ERP",
    description: "Manage properties and clients seamlessly.",
    features: [
      "Property Management",
      "Booking Management",
      "Lease & Rent Management",
      "Payment Management",
      "Real Estate Analytics",
    ],
    href: "/solutions/real-estate-erp",
  },
  {
    id: "hotel",
    number: "13",
    icon: Hotel,
    accent: "red",
    name: "Hotel ERP",
    description: "Deliver memorable guest experiences.",
    features: [
      "Front Office Management",
      "Room Management",
      "Reservation Management",
      "Housekeeping Management",
      "Hotel Analytics",
    ],
    href: "/solutions/hotel-erp",
  },
  {
    id: "restaurant",
    number: "14",
    icon: Utensils,
    accent: "amber",
    name: "Restaurant ERP",
    description: "Simplify restaurant operations and increase profit.",
    features: [
      "POS & Billing",
      "Menu Management",
      "Kitchen Management",
      "Inventory Management",
      "Sales Analytics",
    ],
    href: "/solutions/restaurant-erp",
  },
];

interface HeroStat {
  icon: LucideIcon;
  value: string;
  label: string;
}

const HERO_STATS: HeroStat[] = [
  { icon: Rocket, value: "10+", label: "Flagship Solutions" },
  { icon: Clock, value: "99.9%", label: "System Uptime" },
  { icon: Globe2, value: "25+", label: "Industries Served" },
  { icon: Globe2, value: "50+", label: "Countries Reached" },
  { icon: ShieldCheck, value: "1000+", label: "Successful Deployments" },
  { icon: Headset, value: "24/7", label: "Support & Maintenance" },
  { icon: Users, value: "2M+", label: "Users Empowered" },
  { icon: Award, value: "ISO 27001", label: "Certified Security" },
];

interface Capability {
  icon: LucideIcon;
  title: string;
  description: string;
}

const CAPABILITIES: Capability[] = [
  {
    icon: Workflow,
    title: "Integrated Ecosystem",
    description: "All solutions work seamlessly together",
  },
  {
    icon: Share2,
    title: "Scalable & Flexible",
    description: "Grows with your business needs",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    description: "Enterprise-grade security and compliance",
  },
  {
    icon: BrainCircuit,
    title: "AI Powered Insights",
    description: "Smarter decisions with real-time analytics",
  },
  {
    icon: Cloud,
    title: "Cloud Ready",
    description: "Available on cloud or on-premise",
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description: "Access anywhere, anytime",
  },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(18, 0.32);

/* Premium hover interaction: spring lift + traveling shared highlight */

const cardHoverVariants: Variants = {
  rest: { y: 0, scale: 1, zIndex: 0 },
  hover: { y: -6, scale: 1.015, zIndex: 1 },
};

const cardSpring = { type: "spring", stiffness: 350, damping: 30, mass: 0.8 } as const;

const highlightSpring = { type: "spring", stiffness: 320, damping: 30, mass: 0.9 } as const;

/* ------------------------------------------------------------------ */
/* Solution card                                                       */
/* ------------------------------------------------------------------ */

interface SolutionCardProps {
  solution: Solution;
  active: boolean;
  highlighted: boolean;
  onHoverStart: (id: string) => void;
  onHoverEnd: () => void;
  onFocusStart: (id: string) => void;
  onFocusEnd: () => void;
}

const SolutionCard = memo(function SolutionCard({
  solution,
  active,
  highlighted,
  onHoverStart,
  onHoverEnd,
  onFocusStart,
  onFocusEnd,
}: SolutionCardProps) {
  const Icon = solution.icon;
  const reducedMotion = useReducedMotion();

  const highlightTransition = reducedMotion
    ? { duration: 0 }
    : { layout: highlightSpring, opacity: { duration: 0.22, ease: "easeOut" as const } };

  return (
    <motion.li
      className={`${styles.card} ${styles[`accent-${solution.accent}`]}`}
      variants={itemVariants}
      onMouseEnter={() => onHoverStart(solution.id)}
      onMouseLeave={onHoverEnd}
      onFocus={() => onFocusStart(solution.id)}
      onBlur={onFocusEnd}
    >
      <motion.div
        className={styles.cardHover}
        variants={cardHoverVariants}
        initial="rest"
        animate={active ? "hover" : "rest"}
        transition={reducedMotion ? { duration: 0 } : cardSpring}
        style={{ willChange: active ? "transform" : "auto" }}
      >
        <GlassCard
          as="div"
          className={cn(styles.cardInner, active && styles.cardInnerActive)}
        >
          {highlighted && (
            <motion.div
              layoutId="solution-hover-highlight"
              className={styles.cardHighlight}
              aria-hidden="true"
              animate={{ opacity: active ? 1 : 0 }}
              transition={highlightTransition}
            />
          )}
          <div className={styles.cardContent}>
            <div className={styles.cardTop}>
              <span className={cn(styles.cardNumber, active && styles.cardNumberActive)}>
                {solution.number}
              </span>
              <motion.div
                className={styles.iconWrapper}
                animate={active ? { scale: 1.08 } : { scale: 1 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 400, damping: 25 }
                }
              >
                <IconCircle size="xs" rounded="sm" variant="gradient">
                  <Icon size={16} stroke={`url(#grad-${solution.accent})`} aria-hidden="true" />
                </IconCircle>
              </motion.div>
            </div>

            <motion.h3
              className={styles.cardName}
              animate={active ? { color: "rgb(var(--accent))" } : { color: "var(--color-text)" }}
              transition={{ duration: reducedMotion ? 0 : 0.25, ease: "easeOut" }}
            >
              {solution.name}
            </motion.h3>
            <p className={styles.cardDesc}>{solution.description}</p>

            <Link
              to={solution.href}
              className={cn(styles.cardLink, active && styles.cardLinkActive)}
            >
              Learn More
              <ArrowRight
                size={11}
                className={styles.cardLinkArrow}
                aria-hidden="true"
              />
            </Link>
          </div>
        </GlassCard>
      </motion.div>
    </motion.li>
  );
});

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export function OurSolutions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [lastActiveId, setLastActiveId] = useState<string | null>(null);

  const activeId = hoveredId ?? focusedId;
  const highlightId = activeId ?? lastActiveId;

  const handleHoverStart = useCallback((id: string) => {
    setHoveredId(id);
    setLastActiveId(id);
  }, []);

  const handleHoverEnd = useCallback(() => setHoveredId(null), []);

  const handleFocusStart = useCallback((id: string) => {
    setFocusedId(id);
    setLastActiveId(id);
  }, []);

  const handleFocusEnd = useCallback(() => setFocusedId(null), []);

  return (
    <Section bordered>
      <GradientDefs />
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container
        maxWidth="wide"
        className={styles.container}
        ref={containerRef}
      >
        <div className={styles.leftColumn}>
          {/* ---------- Left: intro ---------- */}
          <motion.div
            className={styles.intro}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.span
              className={styles.eyebrowLabel}
              variants={itemVariants}
            >
              Our Solutions
            </motion.span>

            <motion.h2 className={styles.title} variants={itemVariants}>
              Complete Digital Solutions
              <br />
              <GradientText>Built for Impact.</GradientText>
            </motion.h2>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              MetaDev offers a comprehensive suite of enterprise-grade solutions
              that empower organizations to streamline operations, enhance
              productivity, and deliver exceptional experiences.
            </motion.p>
          </motion.div>

          {/* ---------- Stats glass card ---------- */}
          <motion.div
            className={styles.statsPanel}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className={styles.statsGrid}>
              {HERO_STATS.map((stat) => (
                <motion.div
                  key={stat.label}
                  className={styles.statItem}
                  variants={itemVariants}
                >
                  <IconCircle size="lg" variant="accent">
                    <stat.icon size={16} aria-hidden="true" />
                  </IconCircle>
                  <div className={styles.statText}>
                    <GradientText className={styles.statValue}>
                      {stat.value}
                    </GradientText>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ---------- Right: solutions grid ---------- */}
        <div className={styles.showcase}>
          <motion.div
            className={styles.headerRow}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : undefined}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className={styles.headerLine} />
            <span className={styles.headerPill}>Our Solutions (05 – 10)</span>
            <span className={styles.headerLine} />
          </motion.div>

          <LayoutGroup>
            <motion.ul
              className={styles.grid}
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              role="list"
              aria-label="Enterprise solutions"
              onMouseLeave={handleHoverEnd}
              onBlur={handleFocusEnd}
            >
              {SOLUTIONS.map((solution) => (
                <SolutionCard
                  key={solution.id}
                  solution={solution}
                  active={activeId === solution.id}
                  highlighted={highlightId === solution.id}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                  onFocusStart={handleFocusStart}
                  onFocusEnd={handleFocusEnd}
                />
              ))}
            </motion.ul>
          </LayoutGroup>
        </div>
      </Container>

      <Container maxWidth="wide" className={styles.capabilityRow}>
        <motion.div
          className={styles.capabilityHeader}
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className={styles.capabilityHeaderLine} />
          <span className={styles.capabilityHeaderPill}>
            <Sparkles size={13} aria-hidden="true" />
            Built for the Modern Enterprise
          </span>
          <span className={styles.capabilityHeaderLine} />
        </motion.div>

        <motion.ul
          className={styles.capabilityStrip}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {CAPABILITIES.map((cap) => (
            <motion.li
              key={cap.title}
              className={styles.capabilityItem}
              variants={itemVariants}
            >
              <span className={styles.capabilityIcon}>
                <cap.icon size={16} aria-hidden="true" />
              </span>
              <div className={styles.capabilityText}>
                <span className={styles.capabilityTitle}>{cap.title}</span>
                <span className={styles.capabilityDesc}>{cap.description}</span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      <div className={styles.ctaRow}>
        <Button to="/solutions" variant="gradient" size="md">
          View All Solutions
        </Button>
      </div>
    </Section>
  );
}
