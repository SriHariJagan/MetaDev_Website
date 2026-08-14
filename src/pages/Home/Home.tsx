import type { ReactNode } from "react";
import {
  Activity,
  Award,
  BadgeDollarSign,
  BarChart3,
  BrainCircuit,
  CalendarCheck,
  Cloud,
  Code2,
  Globe2,
  GraduationCap,
  Headphones,
  Landmark,
  Languages,
  Lightbulb,
  Palette,
  Plug,
  Rocket,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";
import { Hero } from "@/sections/Hero";
import { TrustedBy } from "@/sections/TrustedBy";
import { WhyMetaNext } from "@/sections/WhyMetaNext";
import { WhatMatters } from "@/sections/WhatMatters";
import { StatsStrip } from "@/sections/StatsStrip";
import { OurProducts } from "@/sections/OurProducts";
import {
  OurSolutions,
  type Solution,
  type HeroStat,
} from "@/sections/OurSolutions";
import {
  EnterpriseCapabilities,
  type Capability,
} from "@/sections/EnterpriseCapabilities";
import { StickyFeatureShowcase } from "@/sections/StickyFeatureShowcase";
import { ProvenProcess } from "@/sections/ProvenProcess";
import { TechStackNew } from "@/sections/TechStackNew";
import { SecurityCompliance } from "@/sections/SecurityCompliance";
import { GradientText } from "@/components/common/GradientText";
import styles from "./Home.module.css";

const WHY_TITLE: ReactNode = (
  <>
    Why Organizations{" "}
    <GradientText>Choose MetaDev</GradientText>
  </>
);

const WHY_CARDS: Solution[] = [
  {
    id: "ai-driven-innovation",
    number: "01",
    icon: BrainCircuit,
    accent: "blue",
    name: "AI-Driven Innovation",
    description: "Leverage the power of AI, automation and analytics to stay ahead.",
  },
  {
    id: "cloud-native-architecture",
    number: "02",
    icon: Cloud,
    accent: "cyan",
    name: "Cloud Native Architecture",
    description: "Scalable, flexible and high-performance cloud solutions.",
  },
  {
    id: "enterprise-grade-security",
    number: "03",
    icon: ShieldCheck,
    accent: "violet",
    name: "Enterprise-Grade Security",
    description: "End-to-end security with encryption, compliance and data privacy.",
  },
  {
    id: "scalable-future-ready",
    number: "04",
    icon: TrendingUp,
    accent: "green",
    name: "Scalable & Future Ready",
    description: "Built to scale with your business and adapt to future needs.",
  },
  {
    id: "seamless-integrations",
    number: "05",
    icon: Plug,
    accent: "orange",
    name: "Seamless Integrations",
    description: "Easy integration with existing systems and third-party platforms.",
  },
  {
    id: "user-centric-design",
    number: "06",
    icon: Palette,
    accent: "pink",
    name: "User-Centric Design",
    description: "Intuitive, accessible and engaging experiences for every user.",
  },
  {
    id: "government-compliant",
    number: "07",
    icon: Landmark,
    accent: "amber",
    name: "Government Compliant",
    description: "Built in compliance with national and international standards.",
  },
  {
    id: "api-first-approach",
    number: "08",
    icon: Code2,
    accent: "indigo",
    name: "API-First Approach",
    description: "Well-documented APIs for rapid development and integration.",
  },
  {
    id: "multi-language-localized",
    number: "09",
    icon: Languages,
    accent: "teal",
    name: "Multi-Language & Localized",
    description: "Support for multiple languages and regional customizations.",
  },
  {
    id: "mobile-first-solutions",
    number: "10",
    icon: Smartphone,
    accent: "red",
    name: "Mobile-First Solutions",
    description: "Responsive, cross-platform solutions for modern workforces.",
  },
  {
    id: "data-driven-decisions",
    number: "11",
    icon: BarChart3,
    accent: "blue",
    name: "Data-Driven Decisions",
    description: "Real-time dashboards and analytics for smarter decision making.",
  },
  {
    id: "24x7-expert-support",
    number: "12",
    icon: Headphones,
    accent: "cyan",
    name: "24x7 Expert Support",
    description: "Dedicated support team ensuring uninterrupted business operations.",
  },
];

const WHY_STATS: HeroStat[] = [
  { icon: ShieldCheck, value: "100%", label: "Secure & Compliant", accent: "green" },
  { icon: Activity, value: "99.9%", label: "System Uptime", accent: "cyan" },
  { icon: Users, value: "500K+", label: "Happy Users", accent: "pink" },
  { icon: Award, value: "50+", label: "Industry Awards", accent: "amber" },
  { icon: Globe2, value: "20+", label: "Countries Served", accent: "blue" },
  { icon: Rocket, value: "100+", label: "Projects Delivered", accent: "violet" },
];

const WHY_CAPABILITIES: Capability[] = [
  {
    icon: Zap,
    title: "Fast Time-to-Market",
    description: "Agile sprints and streamlined delivery get you live faster.",
    accent: "orange",
  },
  {
    icon: BadgeDollarSign,
    title: "Transparent Pricing",
    description: "Flexible engagement models with no hidden costs.",
    accent: "green",
  },
  {
    icon: UserCheck,
    title: "Dedicated Expert Team",
    description: "Senior engineers focused on your business goals.",
    accent: "blue",
  },
  {
    icon: CalendarCheck,
    title: "On-Time Delivery",
    description: "Milestone-based delivery with predictable timelines.",
    accent: "violet",
  },
  {
    icon: Lightbulb,
    title: "Continuous Innovation",
    description: "Regular upgrades keep your platform ahead of the curve.",
    accent: "pink",
  },
  {
    icon: GraduationCap,
    title: "Training & Enablement",
    description: "Hands-on onboarding and knowledge transfer for your team.",
    accent: "teal",
  },
];

export function HomePage() {
  return (
    <div className={styles.home}>
      <Hero />
      <TrustedBy />
      <WhyMetaNext />
      <WhatMatters />
      <StatsStrip />
      <OurProducts />
      <OurSolutions
        eyebrow="Why Choose MetaDev"
        title={WHY_TITLE}
        subtitle="We combine innovation, security, and scalability to deliver digital solutions that create measurable impact and long-term value."
        pillLabel="12 Reasons to Choose MetaDev"
        columns={6}
        solutions={WHY_CARDS}
        stats={WHY_STATS}
        showDescriptions={false}
      />
      <EnterpriseCapabilities items={WHY_CAPABILITIES} />
      <StickyFeatureShowcase />
      <ProvenProcess />
      <TechStackNew />
    </div>
  );
}
