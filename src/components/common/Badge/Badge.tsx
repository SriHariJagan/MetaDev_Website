import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'outline' | 'glass' | 'solid';
  className?: string;
  children: ReactNode;
}

export function Badge({ variant = 'outline', className, children }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[`variant-${variant}`], className)}>
      {children}
    </span>
  );
}
