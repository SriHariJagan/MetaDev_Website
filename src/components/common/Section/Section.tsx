import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Section.module.css';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  size?: 'md' | 'lg';
  bordered?: boolean;
}

export function Section({
  children,
  className,
  size = 'lg',
  bordered = false,
  ...rest
}: SectionProps) {
  return (
    <section
      className={cn(
        styles.section,
        size === 'md' ? styles.sectionMd : styles.sectionLg,
        bordered && styles.bordered,
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}
