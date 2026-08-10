import { motion } from 'framer-motion';
import type { Target, VariantLabels, Variants } from 'framer-motion';
import type { ReactNode } from 'react';
import { defaultContainerVariants, defaultItemVariants } from '@/constants/motion';
import { cn } from '@/utils/cn';
import styles from './SectionHeader.module.css';

export interface SectionHeaderProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center';
  spacing?: 'sm' | 'md' | 'lg';
  flatten?: boolean;
  variants?: Variants;
  itemVariants?: Variants;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | Target | VariantLabels;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  spacing = 'sm',
  flatten = false,
  variants,
  itemVariants = defaultItemVariants,
  initial,
  animate,
  className,
  titleClassName,
  subtitleClassName,
}: SectionHeaderProps) {
  const content = (
    <>
      {eyebrow && <motion.div variants={itemVariants}>{eyebrow}</motion.div>}
      <motion.div variants={itemVariants}>
        <h2 className={cn(styles.title, titleClassName)}>{title}</h2>
      </motion.div>
      {subtitle && (
        <motion.div variants={itemVariants}>
          <p className={cn(styles.subtitle, subtitleClassName)}>{subtitle}</p>
        </motion.div>
      )}
    </>
  );

  if (flatten) return content;

  return (
    <motion.div
      className={cn(
        styles.header,
        align === 'center' && styles.alignCenter,
        spacing !== 'sm' && styles[`spacing-${spacing}`],
        className,
      )}
      variants={variants ?? defaultContainerVariants}
      {...(initial !== undefined && { initial })}
      {...(animate !== undefined && { animate })}
    >
      {content}
    </motion.div>
  );
}
