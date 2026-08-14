import {
  BadgeCheck,
  CreditCard,
  GraduationCap,
  HeartPulse,
  Leaf,
  Megaphone,
  Navigation,
  Package,
  Receipt,
  UserPlus,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

export type ProductAccent = 'blue' | 'amber' | 'violet' | 'teal' | 'orange' | 'pink' | 'green' | 'cyan' | 'indigo' | 'red';

export interface ProductMeta {
  id: string;
  name: string;
  subtitle: string;
  icon: LucideIcon;
  href: string;
  accent: ProductAccent;
}

export const PRODUCTS: ProductMeta[] = [
  {
    id: 'metahealth',
    name: 'MetaHealth',
    subtitle: 'Healthcare Platform',
    icon: HeartPulse,
    href: '/products/metahealth',
    accent: 'teal',
  },
  {
    id: 'metaedu',
    name: 'MetaEdu',
    subtitle: 'EdTech Platform',
    icon: GraduationCap,
    href: '/products/metaedu',
    accent: 'blue',
  },
  {
    id: 'metagreen',
    name: 'MetaGreen',
    subtitle: 'Sustainability Platform',
    icon: Leaf,
    href: '/products/metagreen',
    accent: 'teal',
  },
  {
    id: 'metaflow',
    name: 'MetaFlow',
    subtitle: 'Enterprise Platform',
    icon: Workflow,
    href: '/products/metaflow',
    accent: 'violet',
  },
  {
    id: 'metahire',
    name: 'MetaHire',
    subtitle: 'Hiring & Talent Platform',
    icon: UserPlus,
    href: '/products/metahire',
    accent: 'blue',
  },
  {
    id: 'metacheck',
    name: 'MetaCheck',
    subtitle: 'Verification & Compliance',
    icon: BadgeCheck,
    href: '/products/metacheck',
    accent: 'amber',
  },
  {
    id: 'metaadds',
    name: 'MetaAdds',
    subtitle: 'AdTech & Marketing Platform',
    icon: Megaphone,
    href: '/products/metaadds',
    accent: 'violet',
  },
  {
    id: 'metanav',
    name: 'MetaNav',
    subtitle: 'Fleet & Logistics Management',
    icon: Navigation,
    href: '/products/metanav',
    accent: 'orange',
  },
  {
    id: 'metaledger',
    name: 'MetaLedger',
    subtitle: 'Billing & Invoicing',
    icon: Receipt,
    href: '/products/metaledger',
    accent: 'green',
  },
  {
    id: 'metacard',
    name: 'MetaCard',
    subtitle: 'Digital ID Cards',
    icon: CreditCard,
    href: '/products/metacard',
    accent: 'indigo',
  },
  {
    id: 'metaim',
    name: 'MetaIM',
    subtitle: 'Inventory Management',
    icon: Package,
    href: '/products/metaim',
    accent: 'cyan',
  },
];
