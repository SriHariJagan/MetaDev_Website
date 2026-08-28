import { ShieldCheck, Lock, Eye, Bug, KeyRound, Server } from "lucide-react";
import { LegalLayout, type TocItem } from "./LegalLayout";
import styles from "./Legal.module.css";

const TOC: TocItem[] = [
  { id: "posture", label: "1. Security posture" },
  { id: "architecture", label: "2. Architecture & encryption" },
  { id: "identity", label: "3. Identity & access" },
  { id: "sdlc", label: "4. Secure SDLC" },
  { id: "detection", label: "5. Detection & response" },
  { id: "vuln", label: "6. Vulnerability management" },
  { id: "data", label: "7. Data protection" },
  { id: "continuity", label: "8. Continuity & backups" },
  { id: "report", label: "9. Report an issue" },
];

export function SecurityPage() {
  return (
    <LegalLayout
      icon={ShieldCheck}
      eyebrow="Trust — Security"
      title="Security"
      description="How MetaDev builds, operates, and assures products that handle sensitive data — from health and finance to identity and education. Secure by design, verified by practice."
      updatedAt="28 August 2026"
      toc={TOC}
    >
      <div className={styles.badgeRow}>
        <span className={styles.badge}><Server size={12} /> TLS 1.2+ everywhere</span>
        <span className={styles.badge}><Lock size={12} /> AES-256 at rest</span>
        <span className={styles.badge}><KeyRound size={12} /> MFA & RBAC</span>
        <span className={styles.badge}><Eye size={12} /> 24×7 detection</span>
        <span className={styles.badge}><Bug size={12} /> Coordinated disclosure</span>
      </div>

      <h2 id="posture">1. Security posture</h2>
      <p>Security is a product requirement — not an afterthought. Our controls map to <strong>ISO 27001:2022</strong>, <strong>SOC 2 (Security, Availability, Confidentiality)</strong>, and the <strong>OWASP ASVS</strong>, with additional overlays where a product demands it (e.g., HIPAA safeguards for MetaHealth, PCI DSS for MetaCard/MetaLedger flows).</p>
      <p>We operate on the principle of <strong>least privilege, defence in depth, and continuous verification</strong>: every layer is independently hardened and monitored.</p>

      <h2 id="architecture">2. Architecture & encryption</h2>
      <ul>
        <li><strong>In transit:</strong> TLS 1.2+ with HSTS and certificate transparency; internal service-to-service mTLS where applicable.</li>
        <li><strong>At rest:</strong> AES-256 encryption for databases, object storage, and backups; per-environment keys in a managed KMS with rotation and separation of duties.</li>
        <li><strong>Network:</strong> VPC isolation, private subnets, WAF, DDoS mitigation, and egress filtering. No direct public access to data stores.</li>
        <li><strong>Secrets:</strong> Centralised secrets manager; no secrets in code or images. Short-lived, scoped tokens.</li>
      </ul>

      <h2 id="identity">3. Identity & access</h2>
      <ul>
        <li><strong>Customer auth:</strong> Email + strong password (argon2/bcrypt hashing), optional MFA, session hardening (httpOnly, Secure, SameSite, short-lived access tokens + refresh rotation).</li>
        <li><strong>Workforce:</strong> SSO + MFA enforced, RBAC/ABAC with quarterly access reviews, just-in-time privilege elevation, and immediate de-provisioning on role change.</li>
        <li><strong>Logging:</strong> Centralised, tamper-evident audit logs for auth, admin, and data-access events (retained per <a href="/legal/compliance">Compliance</a> schedule).</li>
      </ul>

      <h2 id="sdlc">4. Secure SDLC</h2>
      <ul>
        <li>Threat modelling for high-risk features and every new product integration.</li>
        <li>SAST, dependency scanning, container scanning, and secret scanning in CI — builds fail on high-severity findings.</li>
        <li>DAST and authenticated penetration testing before major releases and at least annually by an independent firm.</li>
        <li>Signed builds, reproducible pipelines, and environment promotion via code (no manual prod changes).</li>
        <li>Third-party libraries vetted for maintenance, licence, and vulnerability posture.</li>
      </ul>

      <h2 id="detection">5. Detection & response</h2>
      <ul>
        <li><strong>Monitoring:</strong> Centralised SIEM, anomaly detection, and uptime/integrity probes across products.</li>
        <li><strong>Response:</strong> Documented incident response plan with defined severity levels, on-call rotation, and customer notification paths. For personal-data incidents we notify the DPO and affected customers without undue delay and, where required, the Data Protection Board of India.</li>
        <li><strong>Lessons:</strong> Every S1/S2 incident yields a post-mortem, tracked remediations, and a control improvement.</li>
      </ul>

      <h2 id="vuln">6. Vulnerability management</h2>
      <p>We patch by risk: critical production fixes within <strong>24–72 hours</strong>, high within <strong>14 days</strong>, with compensating controls if a direct patch is not yet available. Customers are notified of material, customer-actionable vulnerabilities via security advisories.</p>
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><Bug size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Independent testing</p>
          <p className={styles.calloutText}>We commission annual external pentests and ad-hoc assessments for major launches. Summary attestations are available under NDA via <a href="mailto:tech@metadev.in">tech@metadev.in</a>.</p>
        </div>
      </div>

      <h2 id="data">7. Data protection</h2>
      <ul>
        <li><strong>Isolation:</strong> Logical tenant isolation with row-level checks and automated isolation tests.</li>
        <li><strong>Minimisation:</strong> Products collect only the fields required for the stated purpose.</li>
        <li><strong>Residency:</strong> Primary data residency in India; any cross-border processing uses approved transfer mechanisms per our <a href="/legal/privacy-policy">Privacy Policy</a>.</li>
        <li><strong>Retention & deletion:</strong> Per product DPA — with soft-delete, purge, and crypto-shredding where applicable.</li>
      </ul>

      <h2 id="continuity">8. Continuity & backups</h2>
      <ul>
        <li>Daily encrypted backups with point-in-time recovery and quarterly restore drills.</li>
        <li>Multi-AZ deployment for critical services; defined RPO/RTO per product and published in SLAs.</li>
        <li>Business continuity and disaster-recovery plans tested at least annually.</li>
      </ul>

      <h2 id="report">9. Report a security issue</h2>
      <p>We appreciate responsible disclosure. Please do not access, modify, or exfiltrate data beyond what is necessary to demonstrate the issue.</p>
      <ul>
        <li>Email: <a href="mailto:tech@metadev.in">tech@metadev.in</a> (PGP available on request)</li>
        <li>Include: product/URL, steps to reproduce, impact, and your contact for follow-up.</li>
        <li>We acknowledge within <strong>2 business days</strong>, provide a triage timeline, and keep you updated. We commit not to pursue legal action for good-faith research that follows these guidelines.</li>
      </ul>
      <p>For abuse or fraud involving a MetaDev product, write to <a href="mailto:support@metadev.in">support@metadev.in</a>.</p>
      <p className={styles.sitemapNote}>This page describes our approach at a high level. Customer contracts, DPAs, and product security addenda contain binding commitments.</p>
    </LegalLayout>
  );
}
