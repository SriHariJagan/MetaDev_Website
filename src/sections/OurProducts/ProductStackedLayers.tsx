// ProductStackedLayers.tsx — stacked architecture-layer feature list
import type { LucideIcon } from "lucide-react";
import styles from "./ProductStackedLayers.module.css";

interface ProductStackedLayersProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

export function ProductStackedLayers({ icon: Icon, name, features }: ProductStackedLayersProps) {
  const layers = features.slice(0, 6);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Stack</span>
      </div>

      <div className={styles.spine} aria-hidden="true" />

      <ul className={styles.layers}>
        {layers.map((feature, i) => (
          <li
            key={feature}
            className={styles.layer}
            style={{ animationDelay: `${i * 0.07}s`, width: `calc(100% - ${i * 1.6}%)` }}
          >
            <span className={styles.layerDot} aria-hidden="true" />
            <span className={styles.layerIndex}>{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.layerText}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}