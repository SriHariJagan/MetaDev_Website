import type { LucideIcon } from 'lucide-react';
import type { ProductAccent } from '@/constants/products';

export type Theme = 'light' | 'dark';

export interface NavItem {
  label: string;
  path: string;
}

export interface SolutionStat {
  value: string;
  label: string;
}

export interface SolutionMeta {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  accent: ProductAccent;
  points: string[];
  stats: SolutionStat[];
  techStack: string[];
}
