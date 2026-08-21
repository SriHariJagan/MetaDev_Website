// ProductIdentityTree.tsx — radial identity tree for MetaCard (Digital ID)
import type { LucideIcon } from "lucide-react";
import { CreditCard, User, Shield, Zap, Globe, Link, Key, Fingerprint } from "lucide-react";
import styles from "./ProductIdentityTree.module.css";

interface ProductIdentityTreeProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const IDENTITY_NODES = [
  { id: "core", label: "Digital Identity", icon: User, color: "rgb(139, 92, 246)", level: 0, angle: 0, radius: 0 },
  { id: "badge", label: "Smart Badges", icon: CreditCard, color: "rgb(168, 85, 247)", level: 1, angle: -90, radius: 120 },
  { id: "access", label: "Access Control", icon: Shield, color: "rgb(236, 72, 153)", level: 1, angle: -30, radius: 120 },
  { id: "nfc", label: "NFC/QR Tech", icon: Zap, color: "rgb(245, 158, 11)", level: 1, angle: 30, radius: 120 },
  { id: "global", label: "Global Roaming", icon: Globe, color: "rgb(6, 182, 212)", level: 1, angle: 90, radius: 120 },
  { id: "link", label: "Linked Credentials", icon: Link, color: "rgb(34, 197, 94)", level: 1, angle: 150, radius: 120 },
  { id: "crypto", label: "Crypto Keys", icon: Key, color: "rgb(168, 85, 247)", level: 1, angle: 210, radius: 120 },
  { id: "bio", label: "Biometric", icon: Fingerprint, color: "rgb(236, 72, 153)", level: 1, angle: 270, radius: 120 },
];

const CHILD_NODES = [
  { parent: "badge", label: "Employee ID", icon: User, angle: -120, radius: 60 },
  { parent: "badge", label: "Visitor Pass", icon: User, angle: -60, radius: 60 },
  { parent: "access", label: "Door Entry", icon: Shield, angle: -10, radius: 60 },
  { parent: "access", label: "Zone Control", icon: Shield, angle: 50, radius: 60 },
  { parent: "nfc", label: "Tap-to-Pay", icon: Zap, angle: 10, radius: 60 },
  { parent: "nfc", label: "QR Check-in", icon: Zap, angle: 70, radius: 60 },
  { parent: "global", label: "Multi-Country", icon: Globe, angle: 80, radius: 60 },
  { parent: "global", label: "Compliance", icon: Globe, angle: 100, radius: 60 },
  { parent: "link", label: "SSO Integration", icon: Link, angle: 140, radius: 60 },
  { parent: "link", label: "Verifiable Creds", icon: Link, angle: 160, radius: 60 },
  { parent: "crypto", label: "Encryption", icon: Key, angle: 200, radius: 60 },
  { parent: "crypto", label: "Signing", icon: Key, angle: 220, radius: 60 },
  { parent: "bio", label: "Fingerprint", icon: Fingerprint, angle: 240, radius: 60 },
  { parent: "bio", label: "Face ID", icon: Fingerprint, angle: 300, radius: 60 },
];

const STATS = [
  { label: "Cards Issued", value: "3M+", icon: CreditCard },
  { label: "Organizations", value: "500+", icon: Globe },
  { label: "Daily Scans", value: "1.2M", icon: Zap },
  { label: "Uptime", value: "99.99%", icon: Shield },
];

export function ProductIdentityTree({ icon: Icon, name, features }: ProductIdentityTreeProps) {
  const CX = 200;
  const CY = 150;

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span className={styles.headerLabel}>{name} Identity Tree</span>
      </div>

      <div className={styles.statsBar}>
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={styles.statCard}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <span className={styles.statIcon}>
              <stat.icon size={14} strokeWidth={2} aria-hidden="true" />
            </span>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.treeContainer}>
        <svg className={styles.treeSvg} viewBox={`0 0 400 300`} preserveAspectRatio="none">
          <defs>
            <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(139, 92, 246)" />
              <stop offset="100%" stopColor="rgb(168, 85, 247)" />
            </linearGradient>
          </defs>

          {/* Connections - Level 1 */}
          {IDENTITY_NODES.filter(n => n.level === 1).map((node) => {
            const x = CX + node.radius * Math.cos(node.angle * Math.PI / 180);
            const y = CY + node.radius * Math.sin(node.angle * Math.PI / 180);
            return (
              <line
                key={node.id}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                className={styles.branch}
                style={{ stroke: node.color, animationDelay: `${node.angle * 0.001}s` }}
              />
            );
          })}

          {/* Connections - Level 2 */}
          {CHILD_NODES.map((child) => {
            const parent = IDENTITY_NODES.find(n => n.id === child.parent);
            if (!parent) return null;
            const px = CX + parent.radius * Math.cos(parent.angle * Math.PI / 180);
            const py = CY + parent.radius * Math.sin(parent.angle * Math.PI / 180);
            const cx = px + child.radius * Math.cos(child.angle * Math.PI / 180);
            const cy = py + child.radius * Math.sin(child.angle * Math.PI / 180);
            const parentColor = IDENTITY_NODES.find(n => n.id === child.parent)?.color || "rgb(139, 92, 246)";
            return (
              <line
                key={child.label}
                x1={px}
                y1={py}
                x2={cx}
                y2={cy}
                className={styles.twig}
                style={{ stroke: parentColor }}
              />
            );
          })}

          {/* Level 1 Nodes */}
          {IDENTITY_NODES.filter(n => n.level === 1).map((node, i) => {
            const x = CX + node.radius * Math.cos(node.angle * Math.PI / 180);
            const y = CY + node.radius * Math.sin(node.angle * Math.PI / 180);
            return (
              <g
                key={node.id}
                className={styles.node}
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                <circle
                  r="28"
                  className={styles.nodeCircle}
                  style={{ fill: node.color, filter: "url(#nodeGlow)" }}
                />
                <circle r="18" className={styles.nodeInner} style={{ fill: node.color }} />
                <node.icon size={18} strokeWidth={2} className={styles.nodeIcon} aria-hidden="true" />
                <text x="0" y="48" className={styles.nodeLabel} textAnchor="middle">{node.label}</text>
              </g>
            );
          })}

          {/* Level 2 Nodes */}
          {CHILD_NODES.map((child, i) => {
            const parent = IDENTITY_NODES.find(n => n.id === child.parent);
            if (!parent) return null;
            const px = CX + parent.radius * Math.cos(parent.angle * Math.PI / 180);
            const py = CY + parent.radius * Math.sin(parent.angle * Math.PI / 180);
            const cx = px + child.radius * Math.cos(child.angle * Math.PI / 180);
            const cy = py + child.radius * Math.sin(child.angle * Math.PI / 180);
            const parentColor = IDENTITY_NODES.find(n => n.id === child.parent)?.color || "rgb(139, 92, 246)";
            return (
              <g
                key={child.label}
                className={styles.childNode}
                style={{
                  transform: `translate(${cx}px, ${cy}px)`,
                  animationDelay: `${i * 0.04 + 0.4}s`,
                }}
              >
                <circle
                  r="16"
                  className={styles.childCircle}
                  style={{ fill: parentColor }}
                />
                <child.icon size={12} strokeWidth={2} className={styles.childIcon} aria-hidden="true" />
                <text x="0" y="28" className={styles.childLabel} textAnchor="middle">{child.label}</text>
              </g>
            );
          })}

          {/* Core Node */}
          <g className={styles.coreNode} style={{ transform: `translate(${CX}px, ${CY}px)` }}>
            <circle r="40" className={styles.coreCircle} style={{ fill: "url(#coreGradient)" }} />
            <circle r="30" className={styles.coreInner} />
            <Icon size={32} strokeWidth={2} className={styles.coreIcon} aria-hidden="true" />
            <text x="0" y="55" className={styles.coreLabel} textAnchor="middle">{name}</text>
            <text x="0" y="70" className={styles.coreSubtitle} textAnchor="middle">Central Identity Hub</text>
          </g>
        </svg>
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