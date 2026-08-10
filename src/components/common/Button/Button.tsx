import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';
import { scrollToHash } from '@/utils/scrollToHash';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gradient' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  to?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  children,
  to,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...rest
}: ButtonProps) {
  const classes = cn(
    styles.button,
    styles[variant],
    styles[size],
    fullWidth && styles.fullWidth,
    className,
  );

  if (to) {
    // Same-page anchor: scroll directly on every click, even if the
    // URL hash is already set (no navigation event would fire otherwise).
    const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>) => {
      const hashIndex = to.indexOf('#');
      const path = hashIndex === -1 ? '' : to.slice(0, hashIndex);
      const hash = hashIndex === -1 ? '' : to.slice(hashIndex + 1);
      const currentPath = window.location.pathname.replace(/\/+$/, '');
      const targetPath = path.replace(/\/+$/, '');

      if (hash && currentPath === targetPath) {
        event.preventDefault();
        scrollToHash(hash);
      }
    };

    if (to.startsWith('#')) {
      return (
        <a
          href={to}
          className={classes}
          onClick={(event) => {
            event.preventDefault();
            scrollToHash(to.slice(1));
          }}
        >
          {children}
        </a>
      );
    }

    return (
      <Link to={to} className={classes} onClick={handleAnchorClick}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
