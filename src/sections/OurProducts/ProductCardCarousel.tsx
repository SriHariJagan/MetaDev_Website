// ProductCardCarousel.tsx — circular 3D card carousel for MetaCard (Digital ID)
import type { LucideIcon } from "lucide-react";
import { CreditCard, User, Shield, Zap, Globe, Fingerprint, RotateCcw, Sparkles } from "lucide-react";
import styles from "./ProductCardCarousel.module.css";

interface ProductCardCarouselProps {
  icon: LucideIcon;
  name: string;
  features: string[];
}

const CARD_TYPES = [
  { id: "employee", label: "Employee ID", icon: User, gradient: "from-violet-500 to-purple-600", features: ["Photo ID", "Department", "Access Level", "Expiry"], stats: "2.1M issued" },
  { id: "visitor", label: "Visitor Pass", icon: Sparkles, gradient: "from-pink-500 to-rose-500", features: ["Temp Access", "QR Check-in", "Time Limited", "Host Notify"], stats: "45K/month" },
  { id: "contractor", label: "Contractor Badge", icon: Shield, gradient: "from-amber-500 to-orange-500", features: ["Project Access", "Safety Cert", "Auto Expire", "Compliance"], stats: "89K active" },
  { id: "student", label: "Student Card", icon: Sparkles, gradient: "from-blue-500 to-cyan-500", features: ["Campus Access", "Library", "Meals", "Transit"], stats: "1.2M students" },
  { id: "patient", label: "Patient ID", icon: User, gradient: "from-green-500 to-emerald-500", features: ["Medical Record", "Insurance", "Allergies", "Emergency"], stats: "340K patients" },
  { id: "loyalty", label: "Loyalty Card", icon: Sparkles, gradient: "from-yellow-500 to-amber-500", features: ["Points", "Rewards", "Tier Status", "Offers"], stats: "5.4M users" },
  { id: "access", label: "Access Control", icon: Fingerprint, gradient: "from-indigo-500 to-violet-500", features: ["Biometric", "Multi-Factor", "Zone Based", "Audit Trail"], stats: "12K doors" },
  { id: "payment", label: "Payment Card", icon: CreditCard, gradient: "from-slate-500 to-gray-600", features: ["NFC Pay", "Virtual Card", "Spend Control", "Instant Freeze"], stats: "890K cards" },
];

const KEY_FEATURES = [
  { label: "Instant Issuance", icon: Zap, desc: "Cards ready in seconds, not days" },
  { label: "NFC + QR", icon: Globe, desc: "Dual-mode for any reader" },
  { label: "Biometric Link", icon: Fingerprint, desc: "Face/Fingerprint bound" },
  { label: "Auto Revoke", icon: Shield, desc: "Instant deactivation on breach" },
];

export function ProductCardCarousel({ icon: Icon, name, features }: ProductCardCarouselProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>
          <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
        </span>
        <div className={styles.headerText}>
          <span className={styles.headerLabel}>{name} Card Carousel</span>
          <span className={styles.headerSubtitle}>360° Digital Identity Cards</span>
        </div>
        <div className={styles.headerAction}>
          <button className={styles.rotateBtn} title="Rotate">
            <RotateCcw size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className={styles.carouselContainer}>
        <div className={styles.carouselStage}>
          {/* Background orbit rings */}
          <div className={styles.orbitRing} style={{ width: "280px", height: "280px", animationDelay: "0s" }} />
          <div className={styles.orbitRing} style={{ width: "340px", height: "340px", animationDelay: "-4s" }} />
          <div className={styles.orbitRing} style={{ width: "400px", height: "400px", animationDelay: "-8s" }} />

          {/* Cards orbiting */}
          <div className={styles.cardOrbit}>
            {CARD_TYPES.map((card, i) => (
              <div
                key={card.id}
                className={styles.orbitCard}
                style={{
                  "--angle": `${i * 45}deg`,
                  "--delay": `${i * 0.1}s`,
                  "--gradient": `linear-gradient(135deg, ${card.gradient})`,
                } as React.CSSProperties}
              >
                <div className={styles.card}>
                  <div className={styles.cardFront}>
                    <div className={styles.cardChip} />
                    <div className={styles.cardHeader}>
                      <span className={styles.cardIcon}>
                        <card.icon size={18} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <span className={styles.cardType}>{card.label}</span>
                    </div>
                    <div className={styles.cardFeatures}>
                      {card.features.map((f, idx) => (
                        <span key={idx} className={styles.featureTag}>{f}</span>
                      ))}
                    </div>
                    <div className={styles.cardStats}>
                      <span className={styles.statValue}>{card.stats}</span>
                    </div>
                  </div>
                  <div className={styles.cardBack}>
                    <div className={styles.magneticStripe} />
                    <div className={styles.cardSignature}>
                      <span className={styles.sigLabel}>AUTHORIZED SIGNATURE</span>
                      <div className={styles.sigLine} />
                    </div>
                    <div className={styles.cardSecurity}>
                      <Shield size={14} strokeWidth={2} />
                      <span>SECURED</span>
                      <Fingerprint size={14} strokeWidth={2} />
                    </div>
                    <div className={styles.cardFooter}>
                      <span>meta.card/metadev.io</span>
                      <span>Valid: 12/2028</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center hub */}
          <div className={styles.centerHub}>
            <div className={styles.hubCore}>
              <Icon size={36} strokeWidth={1.75} className={styles.hubIcon} aria-hidden="true" />
            </div>
            <div className={styles.hubPulse} />
            <div className={styles.hubPulse} style={{ animationDelay: "1s" }} />
            <div className={styles.hubPulse} style={{ animationDelay: "2s" }} />
            <span className={styles.hubLabel}>{name}</span>
            <span className={styles.hubSubtitle}>Digital Identity Platform</span>
          </div>
        </div>

        {/* Card detail panel - shows on hover/click */}
        <div className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <span className={styles.detailTitle}>Card Capabilities</span>
            <span className={styles.detailSubtitle}>Core platform features</span>
          </div>
          <div className={styles.detailGrid}>
            {KEY_FEATURES.map((feat, i) => (
              <div
                key={feat.label}
                className={styles.detailCard}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className={styles.detailIcon}>
                  <feat.icon size={18} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className={styles.detailLabel}>{feat.label}</span>
                <span className={styles.detailDesc}>{feat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.statsBar}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>8</span>
          <span className={styles.statLabel}>Card Types</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>3M+</span>
          <span className={styles.statLabel}>Cards Issued</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>500+</span>
          <span className={styles.statLabel}>Organizations</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statNumber}>99.99%</span>
          <span className={styles.statLabel}>Uptime</span>
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

