import type { Variants } from 'framer-motion';

export const staggerContainer = (staggerChildren = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

export const fadeUp = (y = 18, duration = 0.35): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: 'easeOut' },
  },
});

/* Blur-to-sharp view reveal — smooth, one-shot, low blur cost */
export const blurUp = (y = 24, duration = 0.55, blur = 8): Variants => ({
  hidden: { opacity: 0, y, filter: `blur(${blur}px)` },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration, ease: 'easeOut' },
  },
});

export const defaultContainerVariants: Variants = staggerContainer();
export const defaultItemVariants: Variants = fadeUp();
