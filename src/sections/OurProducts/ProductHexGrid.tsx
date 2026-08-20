// ProductHexGrid.tsx — honeycomb-flower feature layout (hub + 6 petals)
import type { LucideIcon } from "lucide-react";
import styles from "./ProductHexGrid.module.css";

interface Petal {
  x: number;
  y: number;
}

const CX = 50;
const CY = 50;
const PETAL_R = 30;

// Flat-top hexes: 6 petals around the hub at 60° increments, starting from
// straight up, so the flower reads as a honeycomb rather than a loose ring.
const PETALS: Petal[] = Array.from({ length: 6 }, (_, i) => {
  const deg = -90 + i * 60;
  const rad = (deg * Math.PI) / 180;
  return { x: CX + PETAL_R * Math.cos(rad), y: CY + PETAL_R * Math.sin(rad) };
});

interface ProductHexGridProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

export function ProductHexGrid({ icon: Icon, name, features }: ProductHexGridProps) {
  const petals = features.slice(0, 6);

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <div className={styles.hexHub}>
          <span className={styles.hubIcon}>
            <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <span className={styles.hubName}>{name}</span>
        </div>

        {petals.map((feature, i) => (
          <div
            key={feature}
            className={styles.hexPetal}
            style={{
              left: `${PETALS[i].x}%`,
              top: `${PETALS[i].y}%`,
              animationDelay: `${i * 0.08}s`,
            }}
          >
            <span className={styles.petalText}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}