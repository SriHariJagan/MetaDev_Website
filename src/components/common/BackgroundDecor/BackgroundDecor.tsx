import type { ReactNode } from 'react';
import styles from './BackgroundDecor.module.css';

export interface BackgroundDecorProps {
  children: ReactNode;
}

export function BackgroundDecor({ children }: BackgroundDecorProps) {
  return (
    <div className={styles.decor} aria-hidden="true">
      {children}
    </div>
  );
}
