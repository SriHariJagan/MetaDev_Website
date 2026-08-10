// SectionDivider.tsx — animated divider between About Us sections
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './SectionDivider.module.css';

export function SectionDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div className={styles.wrap} ref={ref} aria-hidden="true">
      <motion.span
        className={styles.line}
        initial={{ scaleX: 0, opacity: 0, filter: 'blur(4px)' }}
        animate={isInView ? { scaleX: 1, opacity: 1, filter: 'blur(0px)' } : { scaleX: 0, opacity: 0, filter: 'blur(4px)' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />
      <motion.span
        className={styles.diamondWrap}
        initial={{ scale: 0, opacity: 0, filter: 'blur(6px)' }}
        animate={isInView ? { scale: 1, opacity: 1, filter: 'blur(0px)' } : { scale: 0, opacity: 0, filter: 'blur(6px)' }}
        transition={{ duration: 0.4, delay: 0.35, ease: 'easeOut' }}
      >
        <span className={styles.diamond} />
      </motion.span>
    </div>
  );
}

export default SectionDivider;
