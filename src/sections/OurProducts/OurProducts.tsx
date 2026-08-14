// OurProducts.tsx
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
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
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { CornerDots } from "@/components/common/CornerDots";
import { Button } from "@/components/common/Button";
import { fadeUp, staggerContainer } from "@/constants/motion";
import { ProductMockup } from "./ProductMockup";
import styles from "./OurProducts.module.css";

import metaAddsImage from "@/assets/images/ourProducts/metaAdds.png";
import metaHireImage from "@/assets/images/ourProducts/metaHire.png";

type Accent = "teal" | "blue" | "violet" | "amber";

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
    id: "metahealth",
    icon: HeartPulse,
    accent: "teal",
    name: "MetaHealth",
    subtitle: "Healthcare Platform",
    badge: "Healthcare",
    features: [
      "Hospital Management System",
      "Electronic Health Records",
      "Telemedicine & ePharmacy",
      "AI Diagnostics & Insights",
      "Ambulance Tracking with AI",
      "Patient Engagement Apps",
    ],
    stats: [
      { icon: Layers, value: "15+", label: "Modules" },
      { icon: Share2, value: "50+", label: "Integrations" },
      { icon: Users, value: "1M+", label: "Patients Served" },
    ],
    ctaLabel: "Explore MetaHealth",
    href: "/products/metahealth",
  },
  {
    id: "abhyasa",
    icon: BookOpen,
    accent: "blue",
    name: "Abhyasa",
    subtitle: "Education Platform",
    badge: "Education",
    features: [
      "Learning Management System",
      "Student Information System",
      "Virtual Classrooms",
      "Assessments & Analytics",
      "Attendance & Smart Tracking",
      "Parent & Teacher Portal",
    ],
    stats: [
      { icon: Layers, value: "12+", label: "Modules" },
      { icon: Share2, value: "30+", label: "Integrations" },
      { icon: Users, value: "2M+", label: "Students Impacted" },
    ],
    ctaLabel: "Explore Abhyasa",
    href: "/products/abhyasa",
  },
  {
    id: "metaflow",
    icon: Boxes,
    accent: "violet",
    name: "MetaFlow",
    subtitle: "Enterprise Platform",
    badge: "Enterprise",
    features: [
      "Workflow Automation",
      "CRM & HRMS",
      "Finance & Accounting",
      "Project Management",
      "Document Management",
      "Business Intelligence",
    ],
    stats: [
      { icon: Layers, value: "20+", label: "Modules" },
      { icon: Share2, value: "60+", label: "Integrations" },
      { icon: Building2, value: "100K+", label: "Businesses" },
    ],
    ctaLabel: "Explore MetaFlow",
    href: "/products/metaflow",
  },
  {
    id: "metasecure",
    icon: ShieldCheck,
    accent: "amber",
    name: "MetaSecure",
    subtitle: "Security & Compliance",
    badge: "Security",
    features: [
      "Identity & Access Management",
      "Threat Detection",
      "Audit & Compliance Logs",
      "Data Encryption",
      "Role-Based Access Control",
      "Security Dashboards",
    ],
    stats: [
      { icon: Layers, value: "10+", label: "Modules" },
      { icon: Share2, value: "25+", label: "Integrations" },
      { icon: Building2, value: "5K+", label: "Enterprises" },
    ],
    ctaLabel: "Explore MetaSecure",
    href: "/products/metasecure",
  },
  {
    id: "metahire",
    icon: UserPlus,
    accent: "blue",
    name: "MetaHire",
    subtitle: "Hiring & Talent Platform",
    badge: "HR & Recruitment",
    features: [
      "AI Resume Screening & Matching",
      "Job Posting & Distribution",
      "Interview Scheduling & Video Interviews",
      "Candidate Tracking System",
      "Offer Management & Onboarding",
      "Workforce & Hiring Analytics",
    ],
    stats: [
      { icon: Layers, value: "18+", label: "Modules" },
      { icon: Share2, value: "45+", label: "Integrations" },
      { icon: Users, value: "500K+", label: "Candidates Hired" },
    ],
    ctaLabel: "Explore MetaHire",
    href: "/products/metahire",
    screenshotUrl: metaHireImage,
  },
  {
    id: "metacheck",
    icon: BadgeCheck,
    accent: "amber",
    name: "MetaCheck",
    subtitle: "Verification & Compliance",
    badge: "Verification",
    features: [
      "Identity & Document Verification",
      "Background Screening",
      "AI Fraud Detection",
      "KYC / KYB Compliance",
      "Real-Time Status Tracking",
      "Compliance Reports & Audit Logs",
    ],
    stats: [
      { icon: Layers, value: "12+", label: "Modules" },
      { icon: Share2, value: "35+", label: "Integrations" },
      { icon: Building2, value: "10K+", label: "Enterprises" },
    ],
    ctaLabel: "Explore MetaCheck",
    href: "/products/metacheck",
  },
  {
    id: "metaadds",
    icon: Megaphone,
    accent: "violet",
    name: "MetaAdds",
    subtitle: "AdTech & Marketing Platform",
    badge: "AdTech",
    features: [
      "Multi-Channel Ad Campaigns",
      "AI Audience Targeting",
      "Creative Studio & Ad Builder",
      "Real-Time Bidding & Optimization",
      "Attribution & ROAS Analytics",
      "Publisher & Inventory Management",
    ],
    stats: [
      { icon: Layers, value: "15+", label: "Modules" },
      { icon: Share2, value: "40+", label: "Integrations" },
      { icon: Users, value: "2M+", label: "Audiences Reached" },
    ],
    ctaLabel: "Explore MetaAdds",
    href: "/products/metaadds",
    screenshotUrl: metaAddsImage,
  },
  {
    id: "metagreen",
    icon: Leaf,
    accent: "teal",
    name: "MetaGreen",
    subtitle: "Sustainability Platform",
    badge: "Green Tech",
    features: [
      "Carbon Footprint Tracking",
      "ESG Reporting & Compliance",
      "Renewable Energy Management",
      "Waste & Resource Optimization",
      "Green Supply Chain Insights",
      "Sustainability Analytics",
    ],
    stats: [
      { icon: Layers, value: "10+", label: "Modules" },
      { icon: Share2, value: "28+", label: "Integrations" },
      { icon: Building2, value: "5K+", label: "Organizations" },
    ],
    ctaLabel: "Explore MetaGreen",
    href: "/products/metagreen",
  },
  {
    id: "metaedu",
    icon: GraduationCap,
    accent: "blue",
    name: "MetaEdu",
    subtitle: "EdTech Platform",
    badge: "Education",
    features: [
      "Learning Management System",
      "Virtual Classrooms & Live Sessions",
      "Student & Parent Portals",
      "Exams, Grading & Assessments",
      "AI-Powered Adaptive Learning",
      "Institutional Analytics",
    ],
    stats: [
      { icon: Layers, value: "14+", label: "Modules" },
      { icon: Share2, value: "32+", label: "Integrations" },
      { icon: Users, value: "1M+", label: "Students Impacted" },
    ],
    ctaLabel: "Explore MetaEdu",
    href: "/products/metaedu",
  },
];

interface HeroStat {
  icon: LucideIcon;
  value?: string;
  label: string;
  accent?: Accent;
}

const HERO_STATS: HeroStat[] = [
  { icon: Boxes, value: "8+", label: "SaaS Products", accent: "violet" },
  { icon: Layers, value: "25+", label: "Modules", accent: "blue" },
  { icon: Workflow, value: "500+", label: "Integrations", accent: "amber" },
  { icon: Globe2, value: "100%", label: "Global Ready", accent: "teal" },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.07);

const itemVariants = fadeUp(20, 0.35);

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export function OurProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProductId, setActiveProductId] = useState(PRODUCTS[0].id);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const activeProduct =
    PRODUCTS.find((product) => product.id === activeProductId) ?? PRODUCTS[0];

  return (
    <Section bordered>
      <BackgroundDecor>
        <div className={styles.glow} />
        <CornerDots corner="right" />
      </BackgroundDecor>

      <Container ref={containerRef}>
        <motion.div
          className={styles.intro}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Our Product <GradientText variant="violet">Ecosystem</GradientText>
          </motion.h2>

          <motion.p className={styles.subtitle} variants={itemVariants}>
            Powerful, scalable and AI-driven platforms built to transform
            industries and empower billions of lives.
          </motion.p>

          <motion.div className={styles.heroStats} variants={itemVariants}>
            {HERO_STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`${styles.heroStat} ${styles[`accent-${stat.accent}`]}`}
              >
                <motion.span
                  className={styles.heroStatIconWrap}
                  animate={isInView ? { y: [0, -5, 0] } : { y: 0 }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15,
                  }}
                >
                  <stat.icon
                    size={20}
                    className={styles.heroStatIcon}
                    aria-hidden="true"
                  />
                </motion.span>
                {stat.value && (
                  <span className={styles.heroStatValue}>{stat.value}</span>
                )}
                <span className={styles.heroStatLabel}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      <Container maxWidth="wide">
        <div className={styles.explorer}>
          <div className={styles.explorerTabs} role="tablist">
            {PRODUCTS.map((product) => {
              const isActive = product.id === activeProductId;
              return (
                <button
                  key={product.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`${styles.explorerTab} ${styles[`accent-${product.accent}`]} ${
                    isActive ? styles.explorerTabActive : ""
                  }`}
                  onClick={() => setActiveProductId(product.id)}
                >
                  <product.icon size={14} aria-hidden="true" />
                  {product.name}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.id}
              className={`${styles.explorerPanel} ${styles[`accent-${activeProduct.accent}`]}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className={styles.explorerImage}>
                <ProductMockup
                  id={activeProduct.id}
                  name={activeProduct.name}
                  icon={activeProduct.icon}
                  screenshotUrl={activeProduct.screenshotUrl}
                />
              </div>

              <div className={styles.explorerContent}>
                <span className={styles.explorerBadge}>
                  {activeProduct.badge}
                </span>
                <h3 className={styles.explorerTitle}>{activeProduct.name}</h3>
                <p className={styles.explorerSubtitle}>
                  {activeProduct.subtitle}
                </p>

                <ul className={styles.explorerFeatures}>
                  {activeProduct.features.map((feature) => (
                    <li key={feature} className={styles.explorerFeatureItem}>
                      <CheckCircle2
                        size={16}
                        className={styles.explorerFeatureCheck}
                        aria-hidden="true"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={styles.explorerStats}>
                  {activeProduct.stats.map((stat, statIndex) => (
                    <div key={stat.label} className={styles.explorerStat}>
                      <motion.span
                        className={styles.explorerStatIconWrap}
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 2.8,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: statIndex * 0.15,
                        }}
                      >
                        <stat.icon
                          size={22}
                          className={styles.explorerStatIcon}
                          aria-hidden="true"
                        />
                      </motion.span>
                      <span className={styles.explorerStatValue}>
                        {stat.value}
                      </span>
                      <span className={styles.explorerStatLabel}>
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <Button to={activeProduct.href} variant="outline" size="sm">
                  {activeProduct.ctaLabel}
                  <ArrowRight size={14} aria-hidden="true" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>

      <div className={styles.ctaRow}>
        <Button to="/products" variant="outline" size="md">
          View All Products
          <ArrowRight size={16} aria-hidden="true" />
        </Button>
      </div>
    </Section>
  );
}
