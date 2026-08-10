// InfiniteMarquee.tsx — reusable auto-scrolling strip with optional controls
import { useMemo, useRef } from 'react';
import { animate, motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { IconButton } from '@/components/common/IconButton';
import { cn } from '@/utils/cn';
import styles from './InfiniteMarquee.module.css';

export interface MarqueeItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  accent?: string;
}

export interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  speed?: number;
  itemWidth?: number;
  gap?: number;
  showControls?: boolean;
  showIndex?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

export function InfiniteMarquee({
  items,
  speed = 40,
  itemWidth = 220,
  gap = 16,
  showControls = false,
  showIndex = false,
  pauseOnHover = true,
  className,
}: InfiniteMarqueeProps) {
  const x = useMotionValue(0);
  const paused = useRef(false);
  const step = itemWidth + gap;
  const loopWidth = step * items.length;

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    let next = x.get() - (speed * delta) / 1000;
    if (next <= -loopWidth) next += loopWidth;
    x.set(next);
  });

  const nudge = (direction: 1 | -1) => {
    const target = x.get() - direction * step;
    animate(x, target, { duration: 0.45, ease: 'easeInOut' });
  };

  const doubled = useMemo(() => [...items, ...items], [items]);

  return (
    <div className={cn(styles.marquee, className)}>
      {showControls && (
        <IconButton label="Scroll left" onClick={() => nudge(-1)}>
          <ChevronLeft size={18} />
        </IconButton>
      )}

      <div
        className={styles.viewport}
        onMouseEnter={() => pauseOnHover && (paused.current = true)}
        onMouseLeave={() => pauseOnHover && (paused.current = false)}
      >
        <motion.ul
          className={styles.track}
          style={{ x, gap }}
        >
          {doubled.map((item, i) => (
            <li
              key={`${item.id}-${i}`}
              className={cn(styles.item, item.accent && styles[`accent-${item.accent}`])}
              style={{ width: itemWidth }}
            >
              {showIndex && (
                <span className={styles.itemIndex}>
                  {String((i % items.length) + 1).padStart(2, "0")}
                </span>
              )}
              {item.icon && (
                <item.icon
                  size={18}
                  className={styles.itemIcon}
                  stroke={
                    item.accent ? `url(#grad-${item.accent})` : undefined
                  }
                  aria-hidden="true"
                />
              )}
              <span className={styles.itemLabel}>{item.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>

      {showControls && (
        <IconButton label="Scroll right" onClick={() => nudge(1)}>
          <ChevronRight size={18} />
        </IconButton>
      )}
    </div>
  );
}

export default InfiniteMarquee;
