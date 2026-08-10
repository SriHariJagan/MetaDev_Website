import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './IconCircle.module.css';

export interface IconCircleProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md';
  variant?: 'accent' | 'tint' | 'tintStrong' | 'tintBare' | 'gradient';
  className?: string;
  children: ReactNode;
}

export function IconCircle({
  size = 'md',
  rounded = 'md',
  variant = 'accent',
  className,
  children,
}: IconCircleProps) {
  return (
    <span
      className={cn(
        styles.circle,
        styles[`size-${size}`],
        styles[`rounded-${rounded}`],
        styles[`variant-${variant}`],
        className,
      )}
    >
      {children}
    </span>
  );
}
