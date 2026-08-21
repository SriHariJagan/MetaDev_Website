// ProductEcoImpact.tsx — eco impact dashboard for MetaGreen (Sustainability)
import type { LucideIcon } from "lucide-react";
import { TrendingDown, Recycle, TreePine, Sun } from "lucide-react";
import styles from "./ProductEcoImpact.module.css";

interface ProductEcoImpactProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const IMPACT_METRICS = [
  { label: "Carbon Reduced", value: "42%", icon: TrendingDown, trend: "YoY", color: "#10b981" },
  { label: "Renewable Energy", value: "68%", icon: Sun, trend: "+12%", color: "#f59e0b" },
  { label: "Waste Diverted", value: "89%", icon: Recycle, trend: "+5%", color: "#8b5cf6" },
  { label: "Trees Planted", value: "12.4K", icon: TreePine, trend: "This yr", color: "#16a34a" },
];

const ENERGY_MIX = [
  { label: "Solar", value: 35, color: "#f59e0b" },
  { label: "Wind", value: 28, color: "#3b82f6" },
  { label: "Hydro", value: 22, color: "#06b6d4" },
  { label: "Other", value: 15, color: "#94a3b8" },
];

const MONTHLY_DATA = [
  { month: "Jan", carbon: 82, target: 75 },
  { month: "Feb", carbon: 78, target: 72 },
  { month: "Mar", carbon: 71, target: 68 },
  { month: "Apr", carbon: 65, target: 65 },
  { month: "May", carbon: 58, target: 62 },
  { month: "Jun", carbon: 52, target: 60 },
];

export function ProductEcoImpact({ icon: Icon, name, features }: ProductEcoImpactProps) {
  const maxCarbon = Math.max(...MONTHLY_DATA.map(d => d.carbon));

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Eco Impact</span>
      </div>

      <div className={styles.kpiGrid}>
        {IMPACT_METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className={styles.kpiCard}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            <span
              className={styles.kpiIcon}
              style={{
                background: `linear-gradient(135deg, ${metric.color}, color-mix(in srgb, ${metric.color} 70%, transparent))`,
              }}
            >
              <metric.icon size={16} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{metric.value}</span>
              <span className={styles.kpiLabel}>{metric.label}</span>
            </div>
            <span className={styles.kpiTrend}>{metric.trend}</span>
          </div>
        ))}
      </div>

      <div className={styles.chartsRow}>
        <div className={styles.energyChart}>
          <span className={styles.chartTitle}>Energy Mix</span>
          <div className={styles.energyRing}>
            <svg viewBox="0 0 140 140" className={styles.ringSvg}>
              <circle cx="70" cy="70" r="54" className={styles.ringTrack} />
              {ENERGY_MIX.map((source, i) => {
                const prevValue = ENERGY_MIX.slice(0, i).reduce((sum, s) => sum + s.value, 0);
                const startAngle = -90 + prevValue * 3.6;
                const sweepAngle = source.value * 3.6;
                const largeArc = sweepAngle > 180 ? 1 : 0;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = ((startAngle + sweepAngle) * Math.PI) / 180;
                const x1 = 70 + 54 * Math.cos(startRad);
                const y1 = 70 + 54 * Math.sin(startRad);
                const x2 = 70 + 54 * Math.cos(endRad);
                const y2 = 70 + 54 * Math.sin(endRad);
                return (
                  <path
                    key={source.label}
                    d={`M 70 70 L ${x1} ${y1} A 54 54 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    className={styles.ringSegment}
                    style={{
                      fill: source.color,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                );
              })}
            </svg>
            <div className={styles.ringCenter}>
              <span className={styles.ringLabel}>Renewable</span>
              <span className={styles.ringValue}>85%</span>
            </div>
            <div className={styles.energyLegend}>
              {ENERGY_MIX.map((source, i) => (
                <div
                  key={source.label}
                  className={styles.legendItem}
                  style={{ animationDelay: `${i * 0.05 + 0.5}s` }}
                >
                  <span className={styles.legendDot} style={{ background: source.color }} />
                  <span className={styles.legendLabel}>{source.label}</span>
                  <span className={styles.legendValue}>{source.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.carbonChart}>
          <span className={styles.chartTitle}>Carbon Footprint Trend</span>
          <div className={styles.carbonArea}>
            <svg viewBox="0 0 280 120" className={styles.areaSvg}>
              <defs>
                <linearGradient id="carbon-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(var(--grad-1))" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="rgb(var(--grad-1))" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="target-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Target area */}
              <path
                d={MONTHLY_DATA.map((d, i) => {
                  const x = 20 + i * 52;
                  const y = 90 - (d.target / maxCarbon) * 70;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' L 300 120 L 20 120 Z'}
                className={styles.targetArea}
              />
              {/* Actual carbon area */}
              <path
                d={MONTHLY_DATA.map((d, i) => {
                  const x = 20 + i * 52;
                  const y = 90 - (d.carbon / maxCarbon) * 70;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ') + ' L 300 120 L 20 120 Z'}
                className={styles.carbonArea}
              />
              {/* Carbon line */}
              <path
                d={MONTHLY_DATA.map((d, i) => {
                  const x = 20 + i * 52;
                  const y = 90 - (d.carbon / maxCarbon) * 70;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                className={styles.carbonLine}
              />
              {/* Target line */}
              <path
                d={MONTHLY_DATA.map((d, i) => {
                  const x = 20 + i * 52;
                  const y = 90 - (d.target / maxCarbon) * 70;
                  return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                }).join(' ')}
                className={styles.targetLine}
              />
              {/* Data points */}
              {MONTHLY_DATA.map((d, i) => (
                <g key={d.month}>
                  <circle
                    cx={20 + i * 52}
                    cy={90 - (d.carbon / maxCarbon) * 70}
                    r="5"
                    className={styles.dataPoint}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                  <text
                    x={20 + i * 52}
                    y={110}
                    className={styles.monthLabel}
                    textAnchor="middle"
                  >
                    {d.month}
                  </text>
                </g>
              ))}
            </svg>
            <div className={styles.chartLegend}>
              <div className={styles.legendRow}>
                <span className={styles.legendDot} style={{ background: "rgb(var(--grad-1))" }} />
                <span>Actual</span>
              </div>
              <div className={styles.legendRow}>
                <span className={styles.legendDot} style={{ background: "#10b981" }} />
                <span>Target</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.featuresStrip}>
        {features.slice(0, 5).map((feature, i) => (
          <div
            key={feature}
            className={styles.featureChip}
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <span className={styles.chipDot} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}