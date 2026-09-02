import { Award, FileCheck2, Globe2, Scale, ShieldCheck, BadgeCheck } from "lucide-react";
import { LegalLayout, type TocItem } from "./LegalLayout";
import { SEO } from '@/seo/SEO';
import styles from './Legal.module.css';

const TOC: TocItem[] = [
  { id: "approach", label: "1. Our approach" },
  { id: "certifications", label: "2. Certifications & attestations" },
  { id: "india", label: "3. India — DPDP & IT Act" },
  { id: "global", label: "4. Global privacy" },
  { id: "sector", label: "5. Sector requirements" },
  { id: "how-we-comply", label: "6. How we comply" },
  { id: "customer", label: "7. What customers can expect" },
  { id: "contact", label: "8. Contact & requests" },
];

export function CompliancePage() {
  return (
    <>
      <SEO />
      <LegalLayout
      icon={Award}
      eyebrow="Trust — Compliance"
      title="Compliance"
      description="The standards MetaDev aligns to — and how we help customers meet theirs — across data protection, security, and sector regulation in India and beyond."
      updatedAt="28 August 2026"
      toc={TOC}
    >
      <div className={styles.badgeRow}>
        <span className={styles.badge}><ShieldCheck size={12} /> ISO 27001</span>
        <span className={styles.badge}><ShieldCheck size={12} /> ISO 9001</span>
        <span className={styles.badge}><ShieldCheck size={12} /> ISO 42001</span>
        <span className={styles.badge}><BadgeCheck size={12} /> SOC 2</span>
        <span className={styles.badge}><FileCheck2 size={12} /> HIPAA safeguards</span>
        <span className={styles.badge}><BadgeCheck size={12} /> PCI DSS</span>
        <span className={styles.badge}><Globe2 size={12} /> GDPR</span>
      </div>

      <h2 id="approach">1. Our approach</h2>
      <p>Compliance at MetaDev is <strong>design-led and evidence-based</strong>. We map controls once to multiple frameworks so customers inherit coverage without duplicate work — security, privacy, and availability share the same control set, tested continuously.</p>
      <p>This page is informational; binding commitments are in your order form, DPA, and product addenda. We update our posture as laws and standards evolve and publish material changes here.</p>

      <h2 id="certifications">2. Certifications & attestations</h2>
      <div className={styles.tableWrap}>
        <table>
          <thead><tr><th>Standard</th><th>Scope</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td><strong>ISO/IEC 27001:2022</strong></td><td>Information security management — MetaDev platform & operations</td><td>Certified — statement of applicability on request</td></tr>
            <tr><td><strong>ISO 9001:2015</strong></td><td>Quality management for design, build, and support</td><td>Certified</td></tr>
            <tr><td><strong>ISO/IEC 42001:2023</strong></td><td>AI management system (MetaAds, MetaCheck, MetaHire AI features)</td><td>Certified — AI governance & risk</td></tr>
            <tr><td><strong>SOC 2 Type II</strong></td><td>Security, Availability, Confidentiality</td><td>Attested — report available under NDA</td></tr>
            <tr><td><strong>HIPAA safeguards</strong></td><td>Administrative, physical, technical safeguards for MetaHealth</td><td>Implemented — BAA available</td></tr>
            <tr><td><strong>PCI DSS v4.0</strong></td><td>Card-data flows via MetaCard / MetaLedger (service-provider scope)</td><td>Assessed — AoC on request</td></tr>
            <tr><td><strong>GDPR</strong></td><td>EU/UK personal data processed via any product</td><td>Aligned — SCCs & ROPA maintained</td></tr>
          </tbody>
        </table>
      </div>
      <p>Copies or summaries are available under NDA via <a href="mailto:partnership@metadev.in">partnership@metadev.in</a>.</p>

      <h2 id="india">3. India — DPDP Act & IT Act</h2>
      <p>As a Data Fiduciary under the <strong>Digital Personal Data Protection Act, 2023</strong> and a body corporate under the <strong>IT Act, 2000 (SPDI Rules)</strong>, we:</p>
      <ul>
        <li>Process personal data only for a specified, lawful purpose with consent / legitimate use and clear notice.</li>
        <li>Maintain reasonable security practices, breach-notification readiness, and Data Protection Officer & grievance redressal (see <a href="/legal/privacy-policy">Privacy Policy</a>).</li>
        <li>Honour data-principal rights — access, correction, erasure, grievance redressal, and nomination — within statutory timelines.</li>
        <li>Impose DPDP-aligned obligations on Data Processors via contract, with audit rights and sub-processor transparency.</li>
      </ul>
      <p>Data-retention, localisation, and transfer requirements are addressed per product DPA, consistent with Government notifications as they come into force.</p>

      <h2 id="global">4. Global privacy</h2>
      <p>For customers or data subjects in the EU/UK and other regions we apply GDPR principles: lawfulness, purpose limitation, minimisation, accuracy, storage limitation, integrity, and accountability. Transfers outside India/EU use approved mechanisms (SCCs / IDTA) with supplementary measures, and we maintain a Record of Processing Activities (ROPA).</p>

      <h2 id="sector">5. Sector requirements</h2>
      <div className={styles.tableWrap}>
        <table>
          <thead><tr><th>Product / domain</th><th>Considerations</th></tr></thead>
          <tbody>
            <tr><td><strong>MetaHealth</strong> (care)</td><td>HIPAA safeguards, consent for health data, audit trails; not a substitute for professional medical advice.</td></tr>
            <tr><td><strong>MetaEdu</strong> (learning)</td><td>FERPA-aligned access controls, child-privacy guardrails, and institution-configured retention.</td></tr>
            <tr><td><strong>MetaCheck / MetaHire</strong> (verification & hiring)</td><td>Lawful basis & candidate notice before checks; human review for adverse actions; data minimisation and purpose limitation.</td></tr>
            <tr><td><strong>MetaLedger / MetaCard / MetaAds</strong> (finance & payments)</td><td>PCI DSS for card data, GST/tax record-keeping alignment, and spend-control policies.</td></tr>
            <tr><td><strong>AI features</strong> (across suite)</td><td>ISO 42001 AI governance — risk assessment, data quality, bias testing, human oversight, and logging.</td></tr>
          </tbody>
        </table>
      </div>
      <p>Sector content does not constitute legal advice — customers remain responsible for their own regulatory obligations.</p>

      <h2 id="how-we-comply">6. How we comply, day to day</h2>
      <ul>
        <li><strong>Policies & training:</strong> Written ISMS, privacy, and AI-governance policies; annual workforce training and role-specific refreshers.</li>
        <li><strong>Risk & audit:</strong> Annual risk assessment, quarterly control testing, internal audit, and management review; external audits for ISO/SOC 2.</li>
        <li><strong>Vendor management:</strong> Due diligence, DPAs / SCCs, and annual reviews for sub-processors (list available on request).</li>
        <li><strong>Secure development:</strong> Threat modelling, SAST/DAST, dependency scanning, and independent pentests (see <a href="/legal/security">Security</a>).</li>
        <li><strong>Incident readiness:</strong> Documented response plans, tabletop exercises, and breach-notification playbooks.</li>
      </ul>

      <div className={styles.callout}>
        <span className={styles.calloutIcon}><Scale size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Shared responsibility</p>
          <p className={styles.calloutText}>We secure the platform; customers secure their use — including access provisioning, lawful basis, and end-user notices. Product docs call out customer responsibilities per feature.</p>
        </div>
      </div>

      <h2 id="customer">7. What customers can expect from us</h2>
      <ul>
        <li>A signed <strong>Data Processing Agreement</strong> (and SCCs / BAA where needed) before production processing.</li>
        <li>Transparent <strong>sub-processor</strong> and region information with change notice.</li>
        <li><strong>Audit support:</strong> Reports under NDA, questionnaire responses, and — for enterprise — on-site/virtual audit rights per contract.</li>
        <li>Timely <strong>security advisories</strong> for customer-actionable issues.</li>
      </ul>

      <h2 id="contact">8. Contact & requests</h2>
      <p><strong>Partnership / Compliance:</strong> <a href="mailto:partnership@metadev.in">partnership@metadev.in</a> · <strong>Privacy:</strong> <a href="mailto:contact@metadev.in">contact@metadev.in</a> · <strong>General:</strong> <a href="mailto:info@metadev.in">info@metadev.in</a> · <strong>Technical:</strong> <a href="mailto:tech@metadev.in">tech@metadev.in</a></p>
      <p>Postal: MetaDev Innovations Pvt. Ltd., Hyderabad, Telangana, India. We aim to respond within 2 business days and to close assurance-pack requests within 10 business days.</p>
    </LegalLayout>
    </>
  );
}
