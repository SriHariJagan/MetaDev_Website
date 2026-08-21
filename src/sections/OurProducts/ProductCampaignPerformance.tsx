// ProductCampaignPerformance.tsx — campaign performance dashboard for MetaAdds (AdTech)
import type { LucideIcon } from "lucide-react";
import { TrendingUp, Target, Users, DollarSign } from "lucide-react";
import styles from "./ProductCampaignPerformance.module.css";

interface ProductCampaignPerformanceProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const CAMPAIGN_METRICS = [
  { label: "Impressions", value: "2.4M", icon: Users, trend: "+18%", color: "rgb(59, 130, 246)" },
  { label: "Click-Through Rate", value: "4.2%", icon: Target, trend: "+0.8%", color: "#10b981" },
  { label: "Conversions", value: "12.8K", icon: TrendingUp, trend: "+23%", color: "#f59e0b" },
  { label: "ROAS", value: "5.8×", icon: DollarSign, trend: "+1.2×", color: "#8b5cf6" },
];

const CHANNEL_PERFORMANCE = [
  { name: "Search", spend: "$42K", revenue: "$285K", roas: "6.8×", color: "rgb(59, 130, 246)" },
  { name: "Social", spend: "$28K", revenue: "$156K", roas: "5.6×", color: "#ec4899" },
  { name: "Display", spend: "$18K", revenue: "$89K", roas: "4.9×", color: "#f59e0b" },
  { name: "Video", spend: "$12K", revenue: "$72K", roas: "6.0×", color: "#10b981" },
];

const AUDIENCE_SEGMENTS = [
  { label: "High Intent", size: "42%", color: "rgb(59, 130, 246)" },
  { label: "Lookalike", size: "28%", color: "#8b5cf6" },
  { label: "Retargeting", size: "18%", color: "#f59e0b" },
  { label: "Broad", size: "12%", color: "#64748b" },
];

export function ProductCampaignPerformance({ icon: Icon, name, features }: ProductCampaignPerformanceProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Campaign Dashboard</span>
      </div>

      <div className={styles.kpiGrid}>
        {CAMPAIGN_METRICS.map((metric, i) => (
          <div className={styles.kpiCard} style={{ animationDelay: `${i * 0.07}s` }}>
            <span className={styles.kpiIcon} style={{ background: `linear-gradient(135deg, ${metric.color}, color-mix(in srgb, ${metric.color} 70%, transparent))` }}>
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
        <div className={styles.channelChart}>
          <span className={styles.chartTitle}>Channel Performance</span>
          <div className={styles.channelBars}>
            {CHANNEL_PERFORMANCE.map((channel, i) => (
              <div
                key={channel.name}
                className={styles.channelRow}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className={styles.channelInfo}>
                  <span className={styles.channelDot} style={{ background: channel.color }} />
                  <span className={styles.channelName}>{channel.name}</span>
                </div>
                <div className={styles.channelMetrics}>
                  <span className={styles.channelSpend}>{channel.spend}</span>
                  <div className={styles.channelBar}>
                    <span
                      className={styles.channelFill}
                      style={{
                        width: `${Math.min(100, parseFloat(channel.roas) * 12)}%`,
                        background: channel.color,
                      }}
                    />
                  </div>
                  <span className={styles.channelRoas}>{channel.roas}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.audienceChart}>
          <span className={styles.chartTitle}>Audience Segments</span>
          <div className={styles.audienceRing}>
            <svg viewBox="0 0 120 120" className={styles.ringSvg}>
              <circle
                cx="60"
                cy="60"
                r="48"
                className={styles.ringTrack}
              />
              {AUDIENCE_SEGMENTS.map((segment, i) => {
                const prevSegments = AUDIENCE_SEGMENTS.slice(0, i).reduce((sum, s) => sum + parseFloat(s.size), 0);
                const startAngle = -90 + prevSegments * 3.6;
                const sweepAngle = parseFloat(segment.size) * 3.6;
                const largeArc = sweepAngle > 180 ? 1 : 0;
                const startRad = (startAngle * Math.PI) / 180;
                const endRad = ((startAngle + sweepAngle) * Math.PI) / 180;
                const x1 = 60 + 48 * Math.cos(startRad);
                const y1 = 60 + 48 * Math.sin(startRad);
                const x2 = 60 + 48 * Math.cos(endRad);
                const y2 = 60 + 48 * Math.sin(endRad);
                return (
                  <path
                    key={segment.label}
                    d={`M 60 60 L ${x1} ${y1} A 48 48 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    className={styles.ringSegment}
                    style={{
                      fill: segment.color,
                      animationDelay: `${i * 0.1}s`,
                    }}
                  />
                );
              })}
            </svg>
            <div className={styles.ringCenter}>
              <span className={styles.ringLabel}>Audience</span>
              <span className={styles.ringValue}>4 Segments</span>
            </div>
            <div className={styles.audienceLegend}>
              {AUDIENCE_SEGMENTS.map((segment, i) => (
                <div
                  key={segment.label}
                  className={styles.legendItem}
                  style={{ animationDelay: `${i * 0.05 + 0.5}s` }}
                >
                  <span className={styles.legendDot} style={{ background: segment.color }} />
                  <span className={styles.legendLabel}>{segment.label}</span>
                  <span className={styles.legendSize}>{segment.size}</span>
                </div>
              ))}
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