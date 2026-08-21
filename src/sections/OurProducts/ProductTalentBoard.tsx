// ProductTalentBoard.tsx — talent board/kanban visual for MetaHire
import type { LucideIcon } from "lucide-react";
import { User, CheckCircle, Clock, TrendingUp, Award, Zap } from "lucide-react";
import styles from "./ProductTalentBoard.module.css";

interface ProductTalentBoardProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

function FeatureChip({ feature, delay }: { feature: string; delay: number }) {
  return (
    <div
      className={styles.featureChip}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className={styles.chipDot} />
      <span>{feature}</span>
    </div>
  );
}

const BOARD_COLUMNS = [
  { id: "applied", label: "Applied", color: "rgb(59, 130, 246)", count: "2.8K", icon: User },
  { id: "screened", label: "Screened", color: "rgb(29, 78, 216)", count: "1.2K", icon: CheckCircle },
  { id: "interview", label: "Interview", color: "#f59e0b", count: "380", icon: Clock },
  { id: "offer", label: "Offer", color: "#10b981", count: "67", icon: TrendingUp },
  { id: "hired", label: "Hired", color: "#3b82f6", count: "52", icon: Award },
];

const TOP_CANDIDATES = [
  { name: "S. Chen", role: "Senior Frontend", match: 98, stage: "offer", avatar: "SC" },
  { name: "M. Rodriguez", role: "Backend Engineer", match: 94, stage: "interview", avatar: "MR" },
  { name: "A. Kim", role: "DevOps Lead", match: 91, stage: "screened", avatar: "AK" },
  { name: "J. Patel", role: "ML Engineer", match: 89, stage: "applied", avatar: "JP" },
];

const KEY_METRICS = [
  { label: "Time to Hire", value: "14 days", icon: Clock, trend: "-32%" },
  { label: "Offer Acceptance", value: "94%", icon: CheckCircle, trend: "+8%" },
  { label: "Source Quality", value: "4.8/5", icon: Award, trend: "+12%" },
  { label: "AI Match Accuracy", value: "96%", icon: Zap, trend: "+5%" },
];

export function ProductTalentBoard({ icon: Icon, name, features }: ProductTalentBoardProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Talent Board</span>
      </div>

      <div className={styles.board}>
        {BOARD_COLUMNS.map((col, i) => (
          <div
            key={col.id}
            className={styles.column}
            style={{
              animationDelay: `${i * 0.07}s`,
              "--col-color": col.color,
            } as React.CSSProperties}
          >
            <div className={styles.columnHeader}>
              <span className={styles.colIcon}>
                <col.icon size={14} strokeWidth={2} aria-hidden="true" />
              </span>
              <span className={styles.colLabel}>{col.label}</span>
              <span className={styles.colCount}>{col.count}</span>
            </div>
            <div className={styles.columnCards}>
              {[0, 1, 2].map((cardIdx) => (
                <div
                  key={`${col.id}-${cardIdx}`}
                  className={styles.candidateCard}
                  style={{ animationDelay: `${i * 0.07 + cardIdx * 0.04}s` }}
                >
                  <span className={styles.candidateAvatar}>
                    {TOP_CANDIDATES[cardIdx % TOP_CANDIDATES.length].avatar}
                  </span>
                  <div className={styles.candidateInfo}>
                    <span className={styles.candidateName}>
                      {TOP_CANDIDATES[cardIdx % TOP_CANDIDATES.length].name}
                    </span>
                    <span className={styles.candidateRole}>
                      {TOP_CANDIDATES[cardIdx % TOP_CANDIDATES.length].role}
                    </span>
                  </div>
                  <span className={styles.matchBadge}>
                    {TOP_CANDIDATES[cardIdx % TOP_CANDIDATES.length].match}%
                  </span>
                </div>
              ))}
              <div className={styles.addCard}>
                <span className={styles.plusIcon}>+</span>
                <span>+ more</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.metricsStrip}>
        {KEY_METRICS.map((metric, i) => (
          <div
            key={metric.label}
            className={styles.metricCard}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className={styles.metricIcon}>
              <metric.icon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className={styles.metricContent}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
            <span className={styles.metricTrend}>{metric.trend}</span>
          </div>
        ))}
      </div>

      <div className={styles.featuresStrip}>
        {features.slice(0, 6).map((feature, i) => (
          <FeatureChip key={feature} feature={feature} delay={i * 0.05} />
        ))}
      </div>
    </div>
  );
}