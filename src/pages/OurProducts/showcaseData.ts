import {
  BadgeCheck,
  GraduationCap,
  HeartPulse,
  Leaf,
  Megaphone,
  UserPlus,
  Workflow,
  Users,
  Layers,
  Share2,
  Building2,
  Truck,
  Receipt,
  CreditCard,
  Package,
  Navigation,
  HandCoins,
  QrCode,
  Boxes,
} from 'lucide-react';
import type { ShowcaseProduct } from '@/components/common/ProductShowcase';
import metaHireLogo from '@/assets/images/ourProducts/metaHire.png';
import metaHireLogoDark from '@/assets/images/ourProducts/metahire-dark.png';
import metaCheckLogo from '@/assets/images/ourProducts/metaCheck.png';
import metaCheckLogoDark from '@/assets/images/ourProducts/metacheck-dark.png';
import metaAdsLogo from '@/assets/images/ourProducts/metaAds.png';
import metaAdsLogoDark from '@/assets/images/ourProducts/metaAds-dark.png';
import metaGreenLogo from '@/assets/images/ourProducts/metaGreen.png';
import metaGreenLogoDark from '@/assets/images/ourProducts/metagreen-dark.png';
import metaFlowLogo from '@/assets/images/ourProducts/metaFlow.png';
import metaEduLogo from '@/assets/images/ourProducts/metaEdu.png';
import metaEduLogoDark from '@/assets/images/ourProducts/metaedu-dark.png';
import metaHealthLogo from '@/assets/images/ourProducts/metaHealth.png';
import metaNavLogo from '@/assets/images/ourProducts/MetaNav.png';
import metaLedgerLogo from '@/assets/images/ourProducts/MetaLedger.png';
import metaLedgerLogoDark from '@/assets/images/ourProducts/MetaLedger-dark.png';
import metaCardLogo from '@/assets/images/ourProducts/metaCard.png';
import metaCardLogoDark from '@/assets/images/ourProducts/metaCard_dark.png';
import metaImLogo from '@/assets/images/ourProducts/metaIm.png';
import metaImLogoDark from '@/assets/images/ourProducts/metaIm-dark.png';

export const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: 'metahire',
    name: 'MetaHire',
    icon: UserPlus,
    accent: 'blue',
    logo: metaHireLogo,
    logoDark: metaHireLogoDark,
    tagline: 'Hiring & Talent Platform',
    description:
      'An end-to-end hiring platform that helps recruiters source, screen, and hire top talent with AI-powered precision — from job posting to seamless onboarding.',
    features: [
      'AI Resume Screening & Matching',
      'Job Posting & Distribution',
      'Interview Scheduling & Video Interviews',
      'Candidate Tracking System',
    ],
    stats: [
      { icon: Layers, value: '18+', label: 'Modules' },
      { icon: Share2, value: '45+', label: 'Integrations' },
      { icon: Users, value: '500K+', label: 'Candidates Hired' },
    ],
    href: '/products/metahire',
  },
  {
    id: 'metacheck',
    name: 'MetaCheck',
    icon: BadgeCheck,
    accent: 'amber',
    logo: metaCheckLogo,
    logoDark: metaCheckLogoDark,
    tagline: 'Verification & Compliance',
    description:
      'A verification and compliance platform that automates identity checks, background screening, and KYC workflows with enterprise-grade accuracy.',
    features: [
      'Identity & Document Verification',
      'Background Screening',
      'AI Fraud Detection',
      'KYC / KYB Compliance',
    ],
    stats: [
      { icon: Layers, value: '12+', label: 'Modules' },
      { icon: Share2, value: '35+', label: 'Integrations' },
      { icon: Building2, value: '10K+', label: 'Enterprises' },
    ],
    href: '/products/metacheck',
  },
  {
    id: 'metaadds',
    name: 'MetaAdds',
    icon: Megaphone,
    accent: 'violet',
    logo: metaAdsLogo,
    logoDark: metaAdsLogoDark,
    tagline: 'AdTech & Marketing Platform',
    description:
      'An AdTech and marketing platform that unifies campaign creation, targeting, and optimization — turning every rupee of spend into measurable impact.',
    features: [
      'Multi-Channel Ad Campaigns',
      'AI Audience Targeting',
      'Creative Studio & Ad Builder',
      'Real-Time Bidding & Optimization',
    ],
    stats: [
      { icon: Layers, value: '15+', label: 'Modules' },
      { icon: Share2, value: '40+', label: 'Integrations' },
      { icon: Users, value: '2M+', label: 'Audiences Reached' },
    ],
    href: '/products/metaadds',
  },
  {
    id: 'metagreen',
    name: 'MetaGreen',
    icon: Leaf,
    accent: 'teal',
    logo: metaGreenLogo,
    logoDark: metaGreenLogoDark,
    tagline: 'Sustainability Platform',
    description:
      'A sustainability platform that helps organizations track emissions, manage ESG compliance, and drive measurable green impact across operations.',
    features: [
      'Carbon Footprint Tracking',
      'ESG Reporting & Compliance',
      'Renewable Energy Management',
      'Waste & Resource Optimization',
    ],
    stats: [
      { icon: Layers, value: '10+', label: 'Modules' },
      { icon: Share2, value: '28+', label: 'Integrations' },
      { icon: Building2, value: '5K+', label: 'Organizations' },
    ],
    href: '/products/metagreen',
  },
  {
    id: 'metaflow',
    name: 'MetaFlow',
    icon: Workflow,
    accent: 'violet',
    logo: metaFlowLogo,    tagline: 'Enterprise Platform',
    description:
      'An enterprise platform that unifies workflows, people, finance, and projects into a single intelligent operating system for modern organizations.',
    features: [
      'Workflow Automation',
      'CRM & HRMS',
      'Finance & Accounting',
      'Project Management',
    ],
    stats: [
      { icon: Layers, value: '20+', label: 'Modules' },
      { icon: Share2, value: '60+', label: 'Integrations' },
      { icon: Building2, value: '100K+', label: 'Businesses' },
    ],
    href: '/products/metaflow',
  },
  {
    id: 'metahealth',
    name: 'MetaHealth',
    icon: HeartPulse,
    accent: 'teal',
    logo: metaHealthLogo,
    tagline: 'Healthcare Platform',
    description:
      'A healthcare platform that connects hospitals, clinics, and patients — from electronic records and telemedicine to AI-powered diagnostics.',
    features: [
      'Hospital Management System',
      'Electronic Health Records',
      'Telemedicine & ePharmacy',
      'AI Diagnostics & Insights',
    ],
    stats: [
      { icon: Layers, value: '15+', label: 'Modules' },
      { icon: Share2, value: '50+', label: 'Integrations' },
      { icon: Users, value: '1M+', label: 'Patients Served' },
    ],
    href: '/products/metahealth',
  },
  {
    id: 'metaedu',
    name: 'MetaEdu',
    icon: GraduationCap,
    accent: 'blue',
    logo: metaEduLogo,
    logoDark: metaEduLogoDark,
    tagline: 'EdTech Platform',
    description:
      'An EdTech platform that makes modern classrooms effortless — with live learning, assessments, and AI-powered adaptive learning for every student.',
    features: [
      'Learning Management System',
      'Virtual Classrooms & Live Sessions',
      'Student & Parent Portals',
      'AI-Powered Adaptive Learning',
    ],
    stats: [
      { icon: Layers, value: '14+', label: 'Modules' },
      { icon: Share2, value: '32+', label: 'Integrations' },
      { icon: Users, value: '1M+', label: 'Students Impacted' },
    ],
    href: '/products/metaedu',
  },
  {
    id: 'metanav',
    name: 'MetaNav',
    icon: Navigation,
    accent: 'orange',
    logo: metaNavLogo,
    tagline: 'Fleet & Logistics Management',
    description:
      'A fleet management platform that tracks every vehicle in real time — live GPS, route optimization, driver safety and fuel intelligence across your entire fleet.',
    features: [
      'Live GPS Vehicle Tracking',
      'AI Route Optimization',
      'Driver Behaviour & Safety',
      'Fuel & Maintenance Management',
    ],
    stats: [
      { icon: Layers, value: '16+', label: 'Modules' },
      { icon: Share2, value: '40+', label: 'Integrations' },
      { icon: Truck, value: '50K+', label: 'Vehicles Tracked' },
    ],
    href: '/products/metanav',
  },
  {
    id: 'metaledger',
    name: 'MetaLedger',
    icon: Receipt,
    accent: 'green',
    logo: metaLedgerLogo,
    logoDark: metaLedgerLogoDark,
    tagline: 'Billing & Invoicing',
    description:
      'A billing and invoicing platform that turns revenue into a straight line — professional invoices, recurring billing, online payments and GST-ready ledger accuracy.',
    features: [
      'Invoicing & Recurring Billing',
      'Online Payments & Links',
      'GST / Tax Compliance',
      'Receivables & Dunning',
    ],
    stats: [
      { icon: Layers, value: '14+', label: 'Modules' },
      { icon: Share2, value: '30+', label: 'Integrations' },
      { icon: HandCoins, value: '$2B+', label: 'Invoiced Annually' },
    ],
    href: '/products/metaledger',
  },
  {
    id: 'metacard',
    name: 'MetaCard',
    icon: CreditCard,
    accent: 'indigo',
    logo: metaCardLogo,
    logoDark: metaCardLogoDark,
    tagline: 'Digital ID Cards',
    description:
      'A digital identity platform that issues beautiful, verifiable ID cards — employee badges, student IDs, membership cards and visitor passes with QR & NFC security.',
    features: [
      'Card Design Studio',
      'QR & NFC Smart Badges',
      'Instant Issuance & Revocation',
      'Access & Attendance Control',
    ],
    stats: [
      { icon: Layers, value: '12+', label: 'Modules' },
      { icon: Share2, value: '25+', label: 'Integrations' },
      { icon: QrCode, value: '3M+', label: 'Cards Issued' },
    ],
    href: '/products/metacard',
  },
  {
    id: 'metaim',
    name: 'MetaIM',
    icon: Package,
    accent: 'cyan',
    logo: metaImLogo,
    logoDark: metaImLogoDark,
    tagline: 'Inventory Management',
    description:
      'An inventory management platform that keeps every SKU perfectly in sync — real-time stock, multi-warehouse tracking, barcode scanning and AI demand forecasting.',
    features: [
      'Real-Time Stock Tracking',
      'Multi-Warehouse Management',
      'Barcode & QR Scanning',
      'AI Demand Forecasting',
    ],
    stats: [
      { icon: Layers, value: '18+', label: 'Modules' },
      { icon: Share2, value: '35+', label: 'Integrations' },
      { icon: Boxes, value: '10M+', label: 'SKUs Managed' },
    ],
    href: '/products/metaim',
  },
];
