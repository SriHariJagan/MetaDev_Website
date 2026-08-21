// ProductHiringFunnel.tsx — hiring funnel/kanban visual for MetaHire
import type { LucideIcon } from "lucide-react";
import { UserPlus, UserCheck, Clock, TrendingUp } from "lucide-react";
import styles from "./ProductHiringFunnel.module.css";

interface ProductHiringFunnelProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const FUNNEL_STAGES = [
  { key: "sourced", label: "Sourced", icon: UserPlus, color: "var(--grad-1)", count: "2,840" },
  { key: "screened", label: "Screened", icon: UserCheck, color: "var(--grad-2)", count: "1,200" },
  { key: "interviewed", label: "Interviewed", icon: Clock, color: "#f59e0b", count: "380" },
  { key: "offers", label: "Offers", icon: TrendingUp, color: "#10b981", count: "67" },
  { key: "hired", label: "Hired", icon: UserCheck, color: "#3b82f6", count: "52" },
];

export function ProductHiringFunnel({ icon: Icon, name, features }: ProductHiringFunnelProps) {
  const steps = features.slice(0, 6);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Pipeline</span>
      </div>

      <div className={styles.funnel}>
        {FUNNEL_STAGES.map((stage, i) => (
          <div
            key={stage.key}
            className={styles.funnelStage}
            style={{
              animationDelay: `${i * 0.08}s`,
              "--stage-color": stage.color,
            } as React.CSSProperties}
          >
            <div className={styles.funnelTop}>
              <span className={styles.stageIcon}>
                <stage.icon size={16} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className={styles.stageLabel}>{stage.label}</span>
            </div>
            <div className={styles.funnelBody}>
              <span className={styles.stageCount}>{stage.count}</span>
              <div className={styles.funnelBar}>
                <span className={styles.barFill} style={{ width: `${Math.max(15, 95 - i * 18)}%` }} />
              </div>
            </div>
            <div className={styles.funnelBottom}>
              <span className={styles.conversionRate}>
                {i === 0 ? "—" : `${Math.round(100 - i * 18)}%`}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.metrics}>
        {steps.map((feature, i) => (
          <div
            key={feature}
            className={styles.metricCard}
            style={{ animationDelay: `${i * 0.06 + 0.4}s` }}
          >
            <span className={styles.metricDot} />
            <span className={styles.metricText}>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}