import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './GradientText.module.css';

export interface GradientTextProps {
  variant?: 'primary' | 'violet';
  className?: string;
  children: ReactNode;
}

export function GradientText({ variant = 'primary', className, children }: GradientTextProps) {
  return (
    <span className={cn(styles.text, styles[variant], className)}>{children}</span>
  );
}
