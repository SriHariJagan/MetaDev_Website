import { createElement } from 'react';
import type { ElementType, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './GlassCard.module.css';

export interface GlassCardProps {
  as?: ElementType;
  glow?: boolean;
  clip?: boolean;
  hover?: 'sm' | 'lg' | 'lgSoft';
  className?: string;
  children: ReactNode;
  [key: string]: unknown;
}

export function GlassCard({
  as = 'div',
  glow = false,
  clip = true,
  hover,
  className,
  children,
  ...rest
}: GlassCardProps) {
  return createElement(
    as,
    {
      className: cn(
        styles.card,
        glow && styles.glow,
        !clip && styles.noClip,
        hover && styles[`hover-${hover}`],
        className,
      ),
      ...rest,
    },
    children,
  );
}
