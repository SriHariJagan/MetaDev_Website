import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';
import styles from './Container.module.css';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  maxWidth?: 'default' | 'wide' | 'xwide';
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  function Container({ children, className, maxWidth = 'default', ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          styles.container,
          maxWidth === 'wide'
            ? styles.widthWide
            : maxWidth === 'xwide'
              ? styles.widthXwide
              : styles.widthDefault,
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);
