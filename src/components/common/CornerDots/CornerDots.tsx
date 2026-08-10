import { cn } from '@/utils/cn';
import styles from './CornerDots.module.css';

export interface CornerDotsProps {
  corner?: 'left' | 'right';
}

export function CornerDots({ corner = 'right' }: CornerDotsProps) {
  return <div className={cn(styles.dots, styles[corner === 'left' ? 'cornerLeft' : 'cornerRight'])} />;
}
