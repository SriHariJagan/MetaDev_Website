import { ShieldCheck, Info, Lock } from "lucide-react";
import { LegalLayout, type TocItem } from "./LegalLayout";
import { SEO } from '@/seo/SEO';
import styles from './Legal.module.css';

const TOC: TocItem[] = [
  { id: "overview", label: "1. Overview" },
  { id: "controller", label: "2. Data controller" },
  { id: "collect", label: "3. What we collect" },
  { id: "use", label: "4. How we use data" },
  { id: "legal-basis", label: "5. Legal bases" },
  { id: "sharing", label: "6. Sharing & processors" },
  { id: "retention", label: "7. Retention" },
  { id: "security", label: "8. Security" },
  { id: "rights", label: "9. Your rights" },
  { id: "cookies", label: "10. Cookies" },
  { id: "children", label: "11. Children" },
  { id: "transfers", label: "12. International transfers" },
  { id: "changes", label: "13. Changes & contact" },
];

export function PrivacyPolicyPage() {
  return (
    <>
      <SEO />
      <LegalLayout
      icon={Lock}
      eyebrow="Legal — Privacy"
      title="Privacy Policy"
      description="How MetaDev Innovations collects, uses, and protects personal data across metadev.in and our product family — built for India's DPDP Act, 2023 and aligned with GDPR."
      updatedAt="28 August 2026"
      toc={TOC}
    >
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><Info size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Plain-language summary</p>
          <p className={styles.calloutText}>We collect only what we need to run our services, secure your account, and answer your enquiries. We never sell your data. You can access, correct, or delete your data at any time by writing to <a href="mailto:contact@metadev.in">contact@metadev.in</a>.</p>
        </div>
      </div>

      <h2 id="overview">1. Overview</h2>
      <p>This Privacy Policy describes how <strong>MetaDev Innovations Private Limited</strong> (“MetaDev”, “we”, “us”) processes personal data when you visit <code>metadev.in</code>, use our products (MetaHealth, MetaEdu, MetaGreen, MetaFlow, MetaHire, MetaCheck, MetaAds, MetaNav, MetaLedger, MetaCard, MetaIM), contact us, or apply for a role.</p>
      <p>We comply with the <strong>Digital Personal Data Protection Act, 2023 (India)</strong>, the <strong>Information Technology Act, 2000</strong> and its SPDI Rules, and where applicable the <strong>EU GDPR</strong> / <strong>UK GDPR</strong>. Where local law is stricter, we apply the stricter standard.</p>

      <h2 id="controller">2. Data controller & contact</h2>
      <p><strong>Data Fiduciary:</strong> MetaDev Innovations Private Limited, Hyderabad, Telangana, India.</p>
      <p><strong>Privacy / Grievance Contact:</strong> <a href="mailto:contact@metadev.in">contact@metadev.in</a> · <a href="mailto:info@metadev.in">info@metadev.in</a> — we reply within 24 hours; grievance redressal per IT Rules within 15 days.</p>
      <p>For product-specific processing (e.g., MetaHealth patient data, MetaCheck verification data), the relevant product terms identify whether MetaDev acts as Data Fiduciary or Data Processor.</p>

      <h2 id="collect">3. What we collect</h2>
      <div className={styles.tableWrap}>
        <table>
          <thead><tr><th>Category</th><th>Examples</th><th>Source</th></tr></thead>
          <tbody>
            <tr><td><strong>Contact & enquiry</strong></td><td>Name, email, phone, organisation, message, product interest</td><td>You (forms, email)</td></tr>
            <tr><td><strong>Account</strong></td><td>Login email, hashed password, role, organisation</td><td>You / your admin</td></tr>
            <tr><td><strong>Usage</strong></td><td>Pages viewed, clicks, device, browser, IP, timestamps</td><td>Cookies / logs</td></tr>
            <tr><td><strong>Application (Careers)</strong></td><td>CV, cover letter, portfolio links</td><td>You</td></tr>
            <tr><td><strong>Product data</strong></td><td>Depends on product — governed by product-specific DPA</td><td>You / your users</td></tr>
          </tbody>
        </table>
      </div>
      <p>We do not intentionally collect sensitive personal data via the marketing site. If you submit it voluntarily, we treat it as sensitive personal data and restrict access.</p>

      <h2 id="use">4. How we use data</h2>
      <ul>
        <li>Respond to enquiries and provide requested demos, trials, or support.</li>
        <li>Operate, secure, and improve our sites and products (analytics, debugging, abuse prevention).</li>
        <li>Manage accounts, authentication, and entitlements.</li>
        <li>Send product, security, or administrative notices — and, with consent, marketing you can opt out of.</li>
        <li>Recruit and evaluate candidates.</li>
        <li>Comply with law, enforce terms, and protect rights, safety, and property.</li>
      </ul>
      <p>We use <strong>data minimisation</strong> — every collection field is reviewed for necessity.</p>

      <h2 id="legal-basis">5. Legal bases (DPDP Act & GDPR)</h2>
      <p>We process data only where we have a lawful basis: <strong>consent</strong> (including deemed consent under DPDP where you voluntarily provide data for a specified purpose), <strong>legitimate use</strong>, <strong>contract</strong> (to provide a service you requested), <strong>legal obligation</strong>, or <strong>legitimate interests</strong> (e.g., securing our services) balanced against your rights. You may withdraw consent at any time without affecting prior lawful processing.</p>

      <h2 id="sharing">6. Sharing & processors</h2>
      <p>We do not sell personal data. We share it only with:</p>
      <ul>
        <li><strong>Service providers / processors</strong> under DPAs — e.g., cloud hosting (Supabase / AWS), email, analytics, error monitoring — with least-privilege access.</li>
        <li><strong>Group products</strong> where you requested a cross-product enquiry (e.g., MetaHire → MetaCheck).</li>
        <li><strong>Authorities</strong> where required by Indian law, court order, or to prevent harm/fraud.</li>
        <li><strong>Business transfers</strong> — with prior notice and the same protections.</li>
      </ul>
      <p>A current sub-processor list is available on request from <a href="mailto:contact@metadev.in">contact@metadev.in</a>.</p>

      <h2 id="retention">7. Retention</h2>
      <ul>
        <li>Enquiries: <strong>24 months</strong> after last interaction, then anonymised or deleted.</li>
        <li>Account data: for the life of the account + <strong>12 months</strong> for audit / legal holds.</li>
        <li>Logs & analytics: <strong>13 months</strong> (IP truncated where possible).</li>
        <li>Careers applications: <strong>12 months</strong> unless you request earlier deletion.</li>
      </ul>
      <p>Product-specific retention is defined in the relevant product DPA and takes precedence.</p>

      <h2 id="security">8. Security</h2>
      <p>We apply proportionate technical and organisational measures — encryption in transit (TLS 1.2+) and at rest (AES-256), network isolation, RBAC/ABAC, MFA for staff, secrets management, audit logging, and regular external assessments. See our <a href="/legal/security">Security</a> page for detail. No system is 100% secure; we maintain an incident response plan and will notify you and the Data Protection Board of India without undue delay where required.</p>

      <h2 id="rights">9. Your rights</h2>
      <p>Under the DPDP Act and where applicable GDPR, you have the right to:</p>
      <ul>
        <li>Access, correct, update, or erase your personal data;</li>
        <li>Withdraw consent and restrict or object to certain processing;</li>
        <li>Nominate another person to exercise rights on your behalf or in case of incapacity;</li>
        <li>Lodge a grievance with our DPO and, if unresolved, with the Data Protection Board of India or your supervisory authority.</li>
      </ul>
      <p>To exercise rights, write to <a href="mailto:contact@metadev.in">contact@metadev.in</a> from your registered email with subject “Data Request — [Right]”. We verify identity and respond within 30 days (DPDP) / 1 month (GDPR), extendable by law.</p>

      <div className={styles.callout}>
        <span className={styles.calloutIcon}><ShieldCheck size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Automated decisions</p>
          <p className={styles.calloutText}>We do not make solely automated decisions producing legal or similarly significant effects without human review. Where a product does (e.g., risk scoring), it is disclosed in product terms with an appeal path.</p>
        </div>
      </div>

      <h2 id="cookies">10. Cookies & similar tech</h2>
      <p>We use (a) strictly necessary cookies for security and load balancing, (b) preference cookies (e.g., theme), and (c) with your consent, analytics cookies to understand feature use. You can control cookies via your browser and, where presented, our consent banner. Blocking necessary cookies may break sign-in.</p>

      <h2 id="children">11. Children</h2>
      <p>Our marketing site is not directed to children under 18. We do not knowingly collect children’s data without verifiable parental consent. If you believe a child has provided data, contact us for prompt deletion.</p>

      <h2 id="transfers">12. International transfers</h2>
      <p>Data is primarily processed in India. Where we transfer data outside India (e.g., to a sub-processor region), we use approved safeguards — adequacy, Standard Contractual Clauses, and supplementary measures — and comply with Government-notified transfer restrictions under the DPDP Act.</p>

      <h2 id="changes">13. Changes & contact</h2>
      <p>We will post material changes here and update the “Last updated” date. For material changes we will provide additional notice (banner or email). Questions or grievances:</p>
      <p><strong>Email:</strong> <a href="mailto:info@metadev.in">info@metadev.in</a> · <a href="mailto:contact@metadev.in">contact@metadev.in</a> · <strong>Post:</strong> MetaDev Innovations Pvt. Ltd., Hyderabad, Telangana, India.</p>
      <p className={styles.sitemapNote}>This policy is for transparency and does not create rights beyond applicable law. Product-specific DPAs and customer contracts prevail in case of conflict.</p>
    </LegalLayout>
    </>
  );
}
