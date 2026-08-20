// ProductNeuralNetwork.tsx — per-product feature graph (replaces the static image mockup)
import type { LucideIcon } from "lucide-react";
import styles from "./ProductNeuralNetwork.module.css";

interface Point {
  x: number;
  y: number;
}

const HUB: Point = { x: 16, y: 50 };

const NODE_POSITIONS: Point[] = [
  { x: 55, y: 12 },
  { x: 90, y: 27 },
  { x: 55, y: 50 },
  { x: 90, y: 50 },
  { x: 55, y: 88 },
  { x: 90, y: 73 },
];

function curvePath(from: Point, to: Point): string {
  const midX = (from.x + to.x) / 2;
  return `M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`;
}

interface ProductNeuralNetworkProps {
  id: string;
  icon: LucideIcon;
  name: string;
  features: string[];
}

export function ProductNeuralNetwork({ icon: Icon, name, features }: ProductNeuralNetworkProps) {
  const nodes = features.slice(0, 6);

  return (
    <div className={styles.wrap}>
      <div className={styles.gridTexture} aria-hidden="true" />

      <svg className={styles.svg} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {nodes.map((feature, i) => (
          <path key={feature} d={curvePath(HUB, NODE_POSITIONS[i])} className={styles.link} />
        ))}
      </svg>

      <div className={styles.hubHalo} aria-hidden="true" />
      <div className={styles.hub}>
        <Icon size={24} strokeWidth={1.75} aria-hidden="true" />
        <span>{name}</span>
      </div>

      {nodes.map((feature, i) => (
        <div
          key={feature}
          className={styles.node}
          style={{
            left: `${NODE_POSITIONS[i].x}%`,
            top: `${NODE_POSITIONS[i].y}%`,
            animationDelay: `${i * 0.06}s`,
          }}
        >
          {feature}
        </div>
      ))}
    </div>
  );
}