// supportTickets.ts — contact-form inquiries (sample data until the API is wired)
import {
  BookOpen,
  Building2,
  GraduationCap,
  HeartPulse,
  Megaphone,
  ShieldCheck,
  UserPlus,
  Wallet,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export type TicketStatus = 'new' | 'open' | 'resolved';

export type ProductKey =
  | 'metadev'
  | 'metahealth'
  | 'metahire'
  | 'metacheck'
  | 'metaledger'
  | 'metape'
  | 'metaads'
  | 'metaedu'
  | 'metaflow';

export const PRODUCT_META: Record<
  ProductKey,
  { label: string; color: string; icon: LucideIcon }
> = {
  metadev: { label: 'MetaDev', color: '#6366f1', icon: Building2 },
  metahealth: { label: 'MetaHealth', color: '#10b981', icon: HeartPulse },
  metahire: { label: 'MetaHire', color: '#38bdf8', icon: UserPlus },
  metacheck: { label: 'MetaCheck', color: '#06b6d4', icon: ShieldCheck },
  metaledger: { label: 'MetaLedger', color: '#ef4444', icon: Wallet },
  metape: { label: 'MetaPE', color: '#ec4899', icon: BookOpen },
  metaads: { label: 'MetaAds', color: '#f59e0b', icon: Megaphone },
  metaedu: { label: 'MetaEdu', color: '#8b5cf6', icon: GraduationCap },
  metaflow: { label: 'MetaFlow', color: '#a855f7', icon: Workflow },
};

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  phone: string;
  product: ProductKey;
  subject: string;
  message: string;
  receivedAt: string;
  status: TicketStatus;
  read: boolean;
}

export const SAMPLE_TICKETS: SupportTicket[] = [
  {
    id: 'TKT-1041',
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@sunrisehospital.in',
    phone: '+91 98450 22110',
    product: 'metahealth',
    subject: 'Hospital management demo for 3 branches',
    message:
      'We run a 120-bed multi-speciality hospital in Bengaluru with three branches. We are evaluating MetaHealth for OPD/IPD management, lab integration and telemedicine. Please schedule a demo this week with pricing for a 3-year term.',
    receivedAt: '2026-08-25T09:12:00',
    status: 'new',
    read: false,
  },
  {
    id: 'TKT-1040',
    name: 'Priya Sharma',
    email: 'priya@brightmindacademy.edu.in',
    phone: '+91 99870 41235',
    product: 'metaedu',
    subject: 'MetaEdu pricing for 2,000 students',
    message:
      'Our academy is moving to hybrid learning and we need the LMS with virtual classrooms and the parent portal. Kindly share a quote for 2,000 students and onboarding support details.',
    receivedAt: '2026-08-25T07:48:00',
    status: 'new',
    read: false,
  },
  {
    id: 'TKT-1039',
    name: 'Amit Verma',
    email: 'amit.verma@vermaholdings.com',
    phone: '+91 98200 55410',
    product: 'metaflow',
    subject: 'ERP consultation for manufacturing unit',
    message:
      'Looking for workflow automation across procurement, HR and finance for our Pune plant. Interested in the MetaFlow enterprise plan. What does implementation timelines look like for a 400-employee setup?',
    receivedAt: '2026-08-24T18:05:00',
    status: 'new',
    read: false,
  },
  {
    id: 'TKT-1038',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@finserveconsult.in',
    phone: '+91 90040 78122',
    product: 'metacheck',
    subject: 'Bulk background verification API',
    message:
      'We process ~5,000 candidate verifications monthly. Can MetaCheck expose bulk APIs for identity and employment checks? Also need the SOC 2 report and data-residency details before we shortlist.',
    receivedAt: '2026-08-24T11:22:00',
    status: 'open',
    read: false,
  },
  {
    id: 'TKT-1037',
    name: 'Mohammed Faisal',
    email: 'faisal@citymart.co.in',
    phone: '+91 96560 30987',
    product: 'metaledger',
    subject: 'GST invoicing migration from Zoho',
    message:
      'We currently invoice through Zoho and want to move to MetaLedger before the next filing cycle. Is there a migration path for existing customers and outstanding invoices?',
    receivedAt: '2026-08-23T16:45:00',
    status: 'open',
    read: true,
  },
  {
    id: 'TKT-1036',
    name: 'Kavya Reddy',
    email: 'kavya@adspheremedia.in',
    phone: '+91 91230 66548',
    product: 'metaads',
    subject: 'AdTech platform — agency plan enquiry',
    message:
      'We manage ₹40L+ monthly ad spend for 25+ clients. Need multi-channel campaign management with white-label client reporting. Do you offer an agency tier for MetaAds?',
    receivedAt: '2026-08-22T10:30:00',
    status: 'open',
    read: true,
  },
  {
    id: 'TKT-1035',
    name: 'Rahul Nair',
    email: 'rahul.nair@ecofirstngo.org',
    phone: '+91 98950 11247',
    product: 'metadev',
    subject: 'NGO partnership — digital ecosystem',
    message:
      'We are an environmental NGO exploring a long-term tech partner for member management, donations and impact reporting. Would love to discuss a custom MetaDev engagement with NGO pricing.',
    receivedAt: '2026-08-21T14:02:00',
    status: 'resolved',
    read: true,
  },
  {
    id: 'TKT-1034',
    name: 'Ananya Gupta',
    email: 'ananya@talenthivehr.com',
    phone: '+91 97110 88234',
    product: 'metahire',
    subject: 'MetaHire trial extension for recruiting team',
    message:
      'Our 15-day trial expires tomorrow. The team loves the AI resume screening — we would like a 30-day extension to finish pilot hiring for two roles before committing to the annual plan.',
    receivedAt: '2026-08-19T09:25:00',
    status: 'resolved',
    read: true,
  },
  {
    id: 'TKT-1033',
    name: 'Vikram Desai',
    email: 'vikram@peersurve.com',
    phone: '+91 99300 45678',
    product: 'metape',
    subject: 'MetaPE onboarding for P2P lending',
    message:
      'We are launching a P2P lending marketplace and need KYC integration, e-mandates and investor dashboards. Share the MetaPE module list and compliance certifications please.',
    receivedAt: '2026-08-15T12:10:00',
    status: 'resolved',
    read: true,
  },
  {
    id: 'TKT-1032',
    name: 'Meera Joshi',
    email: 'meera.joshi@urbanclinic.co',
    phone: '+91 90280 33419',
    product: 'metahealth',
    subject: 'Telemedicine add-on availability',
    message:
      'Is the telemedicine module included in the standard MetaHealth plan or is it an add-on? We need video consultations with prescription printing for a single-location clinic.',
    receivedAt: '2026-08-10T17:35:00',
    status: 'resolved',
    read: true,
  },
];

export function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
