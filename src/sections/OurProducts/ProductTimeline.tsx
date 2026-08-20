// ProductTimeline.tsx — sequential pipeline feature layout
import type { LucideIcon } from "lucide-react";
import styles from "./ProductTimeline.module.css";

interface ProductTimelineProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

export function ProductTimeline({ icon: Icon, name, features }: ProductTimelineProps) {
  const steps = features.slice(0, 6);

  return (
    <div className={styles.wrap}>
      <div className={styles.track} aria-hidden="true" />

      <div className={styles.start}>
        <span className={styles.startIcon}>
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.startLabel}>{name}</span>
      </div>

      <ol className={styles.steps}>
        {steps.map((feature, i) => (
          <li
            key={feature}
            className={`${styles.step} ${i % 2 === 0 ? styles.stepUp : styles.stepDown}`}
            style={{ animationDelay: `${i * 0.09}s` }}
          >
            <span className={styles.stepDot}>{i + 1}</span>
            <span className={styles.stepCard}>{feature}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}