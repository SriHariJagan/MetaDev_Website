// ProductOrbitRings.tsx — concentric-ring feature layout
import type { LucideIcon } from "lucide-react";
import styles from "./ProductOrbitRings.module.css";

interface RingNode {
  x: number;
  y: number;
  labelX: number;
  labelY: number;
  align: "left" | "right";
}

const CX = 50;
const CY = 50;
// Marker radius vs. label radius are kept deliberately small relative to the
// 0-100 box (max reach ~36) so a label's own half-width never crosses the
// panel edge and gets clipped, regardless of which angle it lands on.
const RING_1 = 18;
const RING_2 = 26;
const LABEL_R1 = 32;
const LABEL_R2 = 42;

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function ringNode(r: number, labelR: number, deg: number): RingNode {
  const p = polar(CX, CY, r, deg);
  const l = polar(CX, CY, labelR, deg);
  return { x: p.x, y: p.y, labelX: l.x, labelY: l.y, align: Math.cos((deg * Math.PI) / 180) >= 0 ? "left" : "right" };
}

const RING1_ANGLES = [-90, 30, 150];
const RING2_ANGLES = [-30, 90, 210];

interface ProductOrbitRingsProps {
  id: string;
  icon: LucideIcon;
  name: string;
  features: string[];
}

export function ProductOrbitRings({ id, icon: Icon, name, features }: ProductOrbitRingsProps) {
  const nodes = features.slice(0, 6).map((feature, i) => {
    const onRing1 = i % 2 === 0;
    const angles = onRing1 ? RING1_ANGLES : RING2_ANGLES;
    const angle = angles[Math.floor(i / 2) % angles.length];
    const r = onRing1 ? RING_1 : RING_2;
    const labelR = onRing1 ? LABEL_R1 : LABEL_R2;
    return { feature, ...ringNode(r, labelR, angle) };
  });

  const glowId = `or-hub-glow-${id}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        <svg className={styles.svg} viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CY} r={RING_2 + 10} fill={`url(#${glowId})`} className={styles.hubGlow} />

          <g className={styles.ringSpinSlow}>
            <circle cx={CX} cy={CY} r={RING_1} className={styles.ring} />
          </g>
          <g className={styles.ringSpinSlower}>
            <circle cx={CX} cy={CY} r={RING_2} className={styles.ring} />
          </g>

          {nodes.map((n, i) => (
            <line key={i} x1={CX} y1={CY} x2={n.x} y2={n.y} className={styles.spoke} />
          ))}

          {nodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="2" className={styles.marker} />
          ))}
        </svg>

        <div className={styles.hub}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </div>
        <span className={styles.hubLabel}>{name}</span>

        {nodes.map((n, i) => (
          <div
            key={n.feature}
            className={`${styles.label} ${styles[n.align]}`}
            style={{ left: `${n.labelX}%`, top: `${n.labelY}%`, animationDelay: `${i * 0.07}s` }}
          >
            {n.feature}
          </div>
        ))}
      </div>
    </div>
  );
}