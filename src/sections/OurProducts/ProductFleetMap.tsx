// ProductFleetMap.tsx — real-time fleet map visualization for MetaNav
import type { LucideIcon } from "lucide-react";
import { MapPin, Truck, Navigation, CheckCircle, AlertTriangle, Activity } from "lucide-react";
import styles from "./ProductFleetMap.module.css";

interface ProductFleetMapProps {
  icon: LucideIcon;
  name: string;
  features?: string[];
}

const VEHICLES = [
  { id: "MH-001", lat: 28.6, lng: 77.2, status: "active", driver: "R. Sharma", route: "Delhi → Mumbai", eta: "4h 22m", speed: 72 },
  { id: "MH-002", lat: 19.1, lng: 72.9, status: "active", driver: "A. Patel", route: "Mumbai → Pune", eta: "1h 15m", speed: 65 },
  { id: "MH-003", lat: 13.0, lng: 80.2, status: "idle", driver: "K. Reddy", route: "Chennai Depot", eta: "—", speed: 0 },
  { id: "MH-004", lat: 22.6, lng: 88.4, status: "warning", driver: "S. Das", route: "Kolkata → Bhubaneswar", eta: "5h 40m", speed: 58 },
  { id: "MH-005", lat: 17.4, lng: 78.5, status: "active", driver: "V. Kumar", route: "Hyderabad → Bangalore", eta: "6h 10m", speed: 68 },
  { id: "MH-006", lat: 23.0, lng: 72.6, status: "active", driver: "M. Shah", route: "Ahmedabad → Surat", eta: "2h 30m", speed: 70 },
];

const FLEET_STATS = [
  { label: "Active Vehicles", value: "47", icon: Truck, color: "rgb(6, 182, 212)" },
  { label: "Total Distance", value: "1.2M km", icon: Navigation, color: "rgb(16, 185, 129)" },
  { label: "Avg Fuel Eff.", value: "4.8 km/L", icon: Activity, color: "rgb(245, 158, 11)" },
  { label: "On-Time Rate", value: "94%", icon: CheckCircle, color: "rgb(99, 102, 241)" },
];

const ALERTS = [
  { type: "speed", vehicle: "MH-004", message: "Speed limit exceeded: 85 km/h", time: "2 min ago", severity: "warning" },
  { type: "geofence", vehicle: "MH-012", message: "Entered restricted zone", time: "15 min ago", severity: "critical" },
  { type: "maintenance", vehicle: "MH-008", message: "Service due in 500 km", time: "1h ago", severity: "info" },
];

export function ProductFleetMap({ icon: Icon, name }: ProductFleetMapProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Fleet Command</span>
        <div className={styles.liveIndicator}>
          <span className={styles.liveDot} />
          <span>LIVE</span>
        </div>
      </div>

      <div className={styles.mapContainer}>
        <div className={styles.mapBg} />
        <svg className={styles.mapSvg} viewBox="0 0 400 300" preserveAspectRatio="none">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Route lines */}
          <path
            d="M 80,180 Q 160,140 280,100"
            className={styles.routeLine}
            stroke="rgb(var(--grad-1) / 0.3)"
          />
          <path
            d="M 320,120 Q 350,160 360,200"
            className={styles.routeLine}
            stroke="rgb(var(--grad-2) / 0.3)"
          />
          <path
            d="M 120,240 Q 180,220 240,180"
            className={styles.routeLine}
            stroke="rgb(var(--grad-1) / 0.2)"
          />
          {/* Vehicle markers */}
          {VEHICLES.map((vehicle, i) => {
            const x = 50 + (vehicle.lng - 68) * 3.5;
            const y = 250 - (vehicle.lat - 8) * 2.5;
            const statusColors = {
              active: "rgb(16, 185, 129)",
              idle: "rgb(245, 158, 11)",
              warning: "rgb(239, 68, 68)",
            } as const;
            const color = statusColors[vehicle.status as keyof typeof statusColors];
            return (
              <g
                key={vehicle.id}
                className={styles.vehicleMarker}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <circle
                  r="14"
                  className={styles.markerPulse}
                  style={{ fill: color, filter: "url(#glow)" }}
                />
                <circle r="8" className={styles.markerCore} style={{ fill: color }} />
                <text
                  x="0"
                  y="28"
                  className={styles.markerLabel}
                  textAnchor="middle"
                >
                  {vehicle.id}
                </text>
                <text
                  x="0"
                  y="42"
                  className={styles.markerSpeed}
                  textAnchor="middle"
                >
                  {vehicle.speed} km/h
                </text>
              </g>
            );
          })}
          {/* City labels */}
          <text x="80" y="190" className={styles.cityLabel} textAnchor="middle">Delhi</text>
          <text x="320" y="110" className={styles.cityLabel} textAnchor="middle">Mumbai</text>
          <text x="120" y="250" className={styles.cityLabel} textAnchor="middle">Jaipur</text>
          <text x="200" y="260" className={styles.cityLabel} textAnchor="middle">Ahmedabad</text>
          <text x="360" y="210" className={styles.cityLabel} textAnchor="middle">Pune</text>
          <text x="80" y="100" className={styles.cityLabel} textAnchor="middle">Chandigarh</text>
        </svg>

        {/* Vehicle cards panel */}
        <div className={styles.vehiclePanel}>
          <div className={styles.panelHeader}>
            <span>Active Fleet</span>
            <span className={styles.panelCount}>{VEHICLES.filter(v => v.status === "active").length} / {VEHICLES.length}</span>
          </div>
          <div className={styles.vehicleList}>
            {VEHICLES.map((vehicle, i) => (
              <div
                key={vehicle.id}
                className={styles.vehicleCard}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className={styles.vehicleTop}>
                  <span className={styles.vehicleId}>{vehicle.id}</span>
                  <span className={styles.vehicleStatus} data-status={vehicle.status}>
                    <span className={styles.statusDot} />
                    {vehicle.status.charAt(0).toUpperCase() + vehicle.status.slice(1)}
                  </span>
                </div>
                <div className={styles.vehicleDetails}>
                  <span className={styles.vehicleDriver}>{vehicle.driver}</span>
                  <span className={styles.vehicleRoute}>{vehicle.route}</span>
                </div>
                <div className={styles.vehicleMeta}>
                  <span className={styles.metaItem}>
                    <Activity size={10} strokeWidth={2} aria-hidden="true" />
                    {vehicle.speed} km/h
                  </span>
                  <span className={styles.metaItem}>
                    <MapPin size={10} strokeWidth={2} aria-hidden="true" />
                    {vehicle.eta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statsBar}>
        {FLEET_STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={styles.statCard}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className={styles.statIcon} style={{ background: `linear-gradient(135deg, ${stat.color}, color-mix(in srgb, ${stat.color} 70%, transparent))` }}>
              <stat.icon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.alertsPanel}>
        <div className={styles.alertsHeader}>
          <AlertTriangle size={14} strokeWidth={2} aria-hidden="true" />
          <span>Live Alerts</span>
        </div>
        <div className={styles.alertsList}>
          {ALERTS.map((alert, i) => {
            const alertColor = alert.severity === "critical" ? "rgb(239, 68, 68)" : alert.severity === "warning" ? "rgb(245, 158, 11)" : "rgb(6, 182, 212)";
            return (
            <div
              key={`${alert.type}-${alert.vehicle}`}
              className={styles.alertItem}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <span className={styles.alertBadge} style={{ color: alertColor, background: `color-mix(in srgb, ${alertColor} 15%, transparent)` }}>{alert.type.toUpperCase()}</span>
              <div className={styles.alertContent}>
                <span className={styles.alertVehicle}>{alert.vehicle}</span>
                <span className={styles.alertMessage}>{alert.message}</span>
              </div>
              <span className={styles.alertTime}>{alert.time}</span>
            </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}