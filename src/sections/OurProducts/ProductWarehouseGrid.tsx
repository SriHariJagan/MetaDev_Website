// ProductWarehouseGrid.tsx — isometric warehouse grid for MetaIM (Inventory Management)
import type { LucideIcon } from "lucide-react";
import { Box, Package, Truck, AlertTriangle, CheckCircle, TrendingUp, RotateCw, Search } from "lucide-react";
import styles from "./ProductWarehouseGrid.module.css";

interface ProductWarehouseGridProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const WAREHOUSE_ZONES = [
  { id: "receiving", label: "Receiving", x: 2, y: 2, w: 3, h: 2, color: "rgb(59, 130, 246)", icon: Truck, count: 12, status: "active" },
  { id: "storage-a", label: "Zone A - Bulk", x: 6, y: 1, w: 4, h: 3, color: "rgb(16, 185, 129)", icon: Box, count: 45, status: "active" },
  { id: "storage-b", label: "Zone B - Racking", x: 11, y: 1, w: 4, h: 3, color: "rgb(34, 197, 94)", icon: Package, count: 38, status: "active" },
  { id: "storage-c", label: "Zone C - Cold", x: 16, y: 1, w: 3, h: 3, color: "rgb(6, 182, 212)", icon: Box, count: 18, status: "warning" },
  { id: "picking", label: "Pick/Pack", x: 2, y: 5, w: 5, h: 3, color: "rgb(139, 92, 246)", icon: Search, count: 28, status: "active" },
  { id: "shipping", label: "Shipping", x: 8, y: 5, w: 5, h: 3, color: "rgb(236, 72, 153)", icon: Truck, count: 22, status: "active" },
  { id: "returns", label: "Returns/QC", x: 14, y: 5, w: 5, h: 3, color: "rgb(245, 158, 11)", icon: AlertTriangle, count: 8, status: "active" },
];

const KPIS = [
  { label: "Total SKUs", value: "10M+", icon: Package, color: "rgb(139, 92, 246)", trend: "+12%" },
  { label: "Accuracy", value: "99.7%", icon: CheckCircle, color: "rgb(16, 185, 129)", trend: "+0.3%" },
  { label: "Turnover", value: "8.4x", icon: TrendingUp, color: "rgb(245, 158, 11)", trend: "+0.8x" },
  { label: "Fill Rate", value: "98.2%", icon: TrendingUp, color: "rgb(59, 130, 246)", trend: "+1.1%" },
];

const ALERTS = [
  { zone: "Zone C", type: "Temp Alert", msg: "Cold storage at 8°C (target 4°C)", severity: "critical", time: "2 min" },
  { zone: "Zone A", type: "Low Stock", msg: "SKU-7842 below reorder point", severity: "warning", time: "15 min" },
  { zone: "Shipping", type: "Carrier Delay", msg: "FedEx pickup delayed 2hrs", severity: "info", time: "1 hr" },
];

const INVENTORY_FLOW = [
  { stage: "Received", count: 1250, icon: Truck, color: "rgb(59, 130, 246)" },
  { stage: "Put Away", count: 1180, icon: Box, color: "rgb(16, 185, 129)" },
  { stage: "Picked", count: 980, icon: Search, color: "rgb(139, 92, 246)" },
  { stage: "Packed", count: 950, icon: Package, color: "rgb(236, 72, 153)" },
  { stage: "Shipped", count: 920, icon: Truck, color: "rgb(16, 185, 129)" },
];

export function ProductWarehouseGrid({ icon: Icon, name, features }: ProductWarehouseGridProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className={styles.headerText}>
          <span className={styles.headerLabel}>{name} Warehouse Grid</span>
          <span className={styles.headerSubtitle}>Real-Time Inventory Intelligence</span>
        </div>
        <button className={styles.refreshBtn} title="Refresh">
          <RotateCw size={18} strokeWidth={2} />
        </button>
      </div>

      <div className={styles.kpiBar}>
        {KPIS.map((kpi, i) => (
          <div
            key={kpi.label}
            className={styles.kpiCard}
            style={{
              animationDelay: `${i * 0.06}s`,
              background: `linear-gradient(150deg, color-mix(in srgb, var(--color-surface) 94%, ${kpi.color} 6%), var(--color-surface))`,
              borderColor: `rgba(15, 15, 32, 0.15)`,
            }}
          >
            <span
              className={styles.kpiIcon}
              style={{
                background: `linear-gradient(135deg, ${kpi.color}, color-mix(in srgb, ${kpi.color} 70%, transparent))`,
              }}
            >
              <kpi.icon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className={styles.kpiContent}>
              <span className={styles.kpiValue}>{kpi.value}</span>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </div>
            <span className={styles.kpiTrend}>{kpi.trend}</span>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Warehouse Map */}
        <div className={styles.mapPanel}>
          <div className={styles.panelHeader}>
            <span className={styles.panelTitle}>Warehouse Layout</span>
            <div className={styles.mapLegend}>
              <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "rgb(59, 130, 246)" }} /> Receiving</span>
              <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "rgb(16, 185, 129)" }} /> Storage</span>
              <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "rgb(139, 92, 246)" }} /> Pick/Pack</span>
              <span className={styles.legendItem}><span className={styles.legendDot} style={{ background: "rgb(236, 72, 153)" }} /> Shipping</span>
            </div>
          </div>
          <div className={styles.warehouseMap}>
            <div className={styles.mapGrid} />
            <div className={styles.gridLines} />
            {WAREHOUSE_ZONES.map((zone, i) => (
              <div
                key={zone.id}
                className={styles.zone}
                style={{
                  gridColumn: `${zone.x} / span ${zone.w}`,
                  gridRow: `${zone.y} / span ${zone.h}`,
                  animationDelay: `${i * 0.08}s`,
                  "--zone-color": zone.color,
                } as React.CSSProperties}
              >
                <div className={styles.zoneHeader}>
                  <span className={styles.zoneIcon}>
                    <zone.icon size={14} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span className={styles.zoneLabel}>{zone.label}</span>
                  <span className={styles.zoneBadge} data-status={zone.status}>
                    {zone.count} SKUs
                  </span>
                </div>
                <div className={styles.zoneDetails}>
                  <div className={styles.zoneMetric}>
                    <span className={styles.metricLabel}>Utilization</span>
                    <div className={styles.utilBar}>
                      <span className={styles.utilFill} style={{ width: `${60 + Math.random() * 35}%`, background: zone.color }} />
                    </div>
                    <span className={styles.metricValue}>{Math.floor(60 + Math.random() * 35)}%</span>
                  </div>
                  <div className={styles.zoneMetric}>
                    <span className={styles.metricLabel}>Throughput</span>
                    <div className={styles.utilBar}>
                      <span className={styles.utilFill} style={{ width: `${50 + Math.random() * 40}%`, background: zone.color }} />
                    </div>
                    <span className={styles.metricValue}>{Math.floor(50 + Math.random() * 40)}%</span>
                  </div>
                </div>
                {zone.status === "warning" && (
                  <div className={styles.zoneAlert}>
                    <AlertTriangle size={10} strokeWidth={2} />
                    <span>Attention needed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          {/* Inventory Flow */}
          <div className={styles.flowPanel}>
            <span className={styles.panelTitle}>Inventory Flow (24h)</span>
            <div className={styles.flowSteps}>
              {INVENTORY_FLOW.map((step, i) => (
                <div
                  key={step.stage}
                  className={styles.flowStep}
                  style={{
                    animationDelay: `${i * 0.08}s`,
                    background: `linear-gradient(150deg, color-mix(in srgb, var(--color-surface) 92%, ${step.color} 8%), transparent)`,
                    borderColor: `${step.color} / 0.2`,
                  }}
                >
                  <span
                    className={styles.flowIcon}
                    style={{
                      background: `${step.color} / 0.2`,
                      color: step.color,
                    }}
                  >
                    <step.icon size={16} strokeWidth={2} aria-hidden="true" />
                  </span>
                  <div className={styles.flowInfo}>
                    <span className={styles.flowLabel}>{step.stage}</span>
                    <span className={styles.flowCount}>{step.count.toLocaleString()} units</span>
                  </div>
                  <div className={styles.flowBar}>
                    <span className={styles.flowFill} style={{ width: `${(step.count / 1250) * 100}%`, background: step.color }} />
                  </div>
                  {i < INVENTORY_FLOW.length - 1 && (
                    <div className={styles.flowConnector} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className={styles.alertsPanel}>
            <span className={styles.panelTitle}>Live Alerts</span>
            <div className={styles.alertsList}>
              {ALERTS.map((alert, i) => {
                const alertColor = alert.severity === "critical" ? "rgb(239, 68, 68)" : alert.severity === "warning" ? "rgb(245, 158, 11)" : "rgb(59, 130, 246)";
                return (
                <div
                  key={`${alert.zone}-${alert.type}`}
                  className={styles.alertItem}
                  style={{
                    animationDelay: `${i * 0.06}s`,
                    borderColor: `${alertColor} / 0.2`,
                  }}
                >
                  <div className={styles.alertHeader}>
                    <span
                      className={styles.alertBadge}
                      style={{
                        color: alertColor,
                        background: `color-mix(in srgb, ${alertColor} 15%, transparent)`,
                      }}
                    >{alert.type}</span>
                    <span className={styles.alertZone}>{alert.zone}</span>
                    <span className={styles.alertTime}>{alert.time} ago</span>
                  </div>
<span className={styles.alertMessage}>{alert.msg}</span>
                </div>
              );
            })}
          </div>
          </div>

          {/* Quick Stats */}
          <div className={styles.quickStats}>
            <span className={styles.quickTitle}>Quick Actions</span>
            <div className={styles.actionGrid}>
              <button className={styles.actionBtn}><Search size={18} strokeWidth={2} /><span>Find SKU</span></button>
              <button className={styles.actionBtn}><RotateCw size={18} strokeWidth={2} /><span>Cycle Count</span></button>
              <button className={styles.actionBtn}><Truck size={18} strokeWidth={2} /><span>Create PO</span></button>
              <button className={styles.actionBtn}><AlertTriangle size={18} strokeWidth={2} /><span>Resolve Alerts</span></button>
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