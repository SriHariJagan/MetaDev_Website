import { FileCheck2, Scale, AlertTriangle } from "lucide-react";
import { LegalLayout, type TocItem } from "./LegalLayout";
import { SEO } from '@/seo/SEO';
import styles from './Legal.module.css';

const TOC: TocItem[] = [
  { id: "acceptance", label: "1. Acceptance" },
  { id: "who-we-are", label: "2. Who we are" },
  { id: "services", label: "3. Services & products" },
  { id: "accounts", label: "4. Accounts & eligibility" },
  { id: "acceptable-use", label: "5. Acceptable use" },
  { id: "ip", label: "6. IP & feedback" },
  { id: "fees", label: "7. Fees & taxes" },
  { id: "privacy", label: "8. Privacy" },
  { id: "warranties", label: "9. Warranties & disclaimer" },
  { id: "liability", label: "10. Liability" },
  { id: "suspension", label: "11. Suspension & termination" },
  { id: "law", label: "12. Governing law & disputes" },
  { id: "changes", label: "13. Changes & contact" },
];

export function TermsOfServicePage() {
  return (
    <>
      <SEO />
      <LegalLayout
      icon={FileCheck2}
      eyebrow="Legal — Terms"
      title="Terms of Service"
      description="The rules for using metadev.in and engaging MetaDev to design, build, and operate digital products — fair, plain-language, and enforceable under Indian law."
      updatedAt="28 August 2026"
      toc={TOC}
    >
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><Scale size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>In short</p>
          <p className={styles.calloutText}>Use our site and services lawfully, respect IP and other users, and honour the contracts you sign for paid products. We, in turn, commit to professional standards, data protection, and transparent communication.</p>
        </div>
      </div>

      <h2 id="acceptance">1. Acceptance</h2>
      <p>By accessing <code>metadev.in</code>, any sub-domain, or our web/mobile products, or by engaging us for services, you agree to these Terms and our <a href="/legal/privacy-policy">Privacy Policy</a>. If you act on behalf of an organisation, you represent you have authority to bind it. If you do not agree, do not use the services.</p>
      <p>Enterprise, product, or statement-of-work (SoW) contracts supplement — and where there is conflict, prevail over — these site terms.</p>

      <h2 id="who-we-are">2. Who we are</h2>
      <p><strong>MetaDev Innovations Private Limited</strong>, incorporated in India, with its registered office in Hyderabad, Telangana. Contact: <a href="mailto:info@metadev.in">info@metadev.in</a> · <a href="mailto:support@metadev.in">support@metadev.in</a> · +91 95595 59143.</p>

      <h2 id="services">3. Services & products</h2>
      <p>MetaDev provides digital consulting, design, engineering, and managed products including:</p>
      <p className={styles.sitemapNote}>MetaHealth · MetaEdu · MetaGreen · MetaFlow · MetaHire · MetaCheck · MetaAds · MetaNav · MetaLedger · MetaCard · MetaIM — plus custom solutions for health, education, gov-tech, fintech, and enterprise.</p>
      <p>Descriptions on the site are informational and not binding offers. Features, pricing, and availability may change; paid access is governed by an order form or subscription agreement.</p>

      <h2 id="accounts">4. Accounts & eligibility</h2>
      <ul>
        <li>You must be at least 18 and capable of entering a binding contract.</li>
        <li>Keep credentials confidential; you are responsible for activity under your account.</li>
        <li>Provide accurate information and promptly update it.</li>
        <li>We may require verification (e.g., email, phone, KYC via MetaCheck where applicable) before activating services.</li>
      </ul>
      <p>We may suspend or require re-verification if we detect misuse, fraud, or risk to others.</p>

      <h2 id="acceptable-use">5. Acceptable use</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Break the law, infringe IP or privacy, or facilitate harm, harassment, or discrimination.</li>
        <li>Reverse-engineer, scrape at scale, bypass access controls, or inject malicious code.</li>
        <li>Overload, probe, or disrupt our infrastructure (including via automated bots without permission).</li>
        <li>Upload unlawful, deceptive, or confidential data you are not entitled to share.</li>
        <li>Use MetaDev products to make regulated decisions (e.g., credit, employment, healthcare) without required disclosures, consent, and human oversight.</li>
      </ul>
      <p>We may investigate, filter, rate-limit, or remove content that violates these rules or the law.</p>

      <h2 id="ip">6. Intellectual property & feedback</h2>
      <p>The site, designs, code, trademarks “MetaDev” and product marks, and documentation are owned by MetaDev or its licensors and protected by Indian and international IP law. No rights are granted except as expressly stated.</p>
      <p>Customer deliverables are licensed or assigned as set out in the applicable SoW. Pre-existing IP, tools, and reusable components remain ours, licensed to you for the project purpose. If you send feedback or ideas, you grant us a non-exclusive, royalty-free, perpetual licence to use them without obligation.</p>

      <h2 id="fees">7. Fees, taxes & payment</h2>
      <ul>
        <li>Paid products and services are billed as per the order form / SoW. Fees are exclusive of GST and other applicable taxes, which you bear.</li>
        <li>Invoices are payable within the stated term; late amounts may incur interest at 1.5% per month or the maximum lawful rate.</li>
        <li>Subscriptions auto-renew unless cancelled per the product terms. Refunds, if any, are per the product policy or negotiated terms.</li>
      </ul>

      <h2 id="privacy">8. Privacy & data protection</h2>
      <p>How we handle personal data is described in our <a href="/legal/privacy-policy">Privacy Policy</a> and, for products, in the relevant Data Processing Agreement. Where you provide personal data of others (e.g., candidates via MetaHire, payees via MetaLedger), you warrant you have a lawful basis and required notices/consents.</p>

      <h2 id="warranties">9. Warranties & disclaimer</h2>
      <p>We perform services with professional skill and care consistent with industry standards. Except as expressly warranted in a signed contract, services are provided <strong>“as is” and “as available”</strong>. To the fullest extent permitted by law, we disclaim implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant uninterrupted or error-free operation; beta or labs features may change or be withdrawn.</p>

      <div className={styles.callout}>
        <span className={styles.calloutIcon}><AlertTriangle size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>No legal / regulated advice</p>
          <p className={styles.calloutText}>Content on the site is general information, not legal, financial, medical, or compliance advice. For regulated use-cases (e.g., health records, financial reporting, background verification), obtain independent professional advice and follow applicable law.</p>
        </div>
      </div>

      <h2 id="liability">10. Limitation of liability</h2>
      <p>To the maximum extent permitted by law: (a) neither party is liable for indirect, incidental, special, consequential, or punitive damages, or for loss of profits, revenue, data, or goodwill; (b) our aggregate liability arising from the site or services is capped at the amount you paid to MetaDev in the <strong>3 months</strong> preceding the claim (or ₹50,000 if no paid services). These limits do not apply to liability that cannot be limited by law (e.g., fraud, wilful misconduct, or where prohibited).</p>

      <h2 id="suspension">11. Suspension & termination</h2>
      <p>We may suspend or terminate access where needed to comply with law, protect security, prevent abuse, or where you materially breach these Terms and fail to cure within 15 days of notice. You may stop using the site at any time; subscriptions terminate per their terms. Sections that should survive (IP, fees, liability, governing law) do.</p>

      <h2 id="law">12. Governing law & disputes</h2>
      <p>These Terms are governed by the <strong>laws of India</strong>. Courts at <strong>Hyderabad, Telangana</strong> have exclusive jurisdiction. Before litigation, parties will attempt good-faith negotiation for 30 days, then mediation under the Arbitration and Conciliation Act, 1996 (seat: Hyderabad, language: English) if agreed in the contract; otherwise the courts decide. Nothing limits urgent injunctive relief.</p>

      <h2 id="changes">13. Changes & contact</h2>
      <p>We may update these Terms to reflect legal, technical, or business changes. Material changes will be posted here with a new “Last updated” date; for registered users we may also email. Continued use after the effective date constitutes acceptance.</p>
      <p>Questions: <a href="mailto:info@metadev.in">info@metadev.in</a> · Grievance Officer (IT Rules): <a href="mailto:contact@metadev.in">contact@metadev.in</a> — 15-day redressal. Postal: MetaDev Innovations Pvt. Ltd., Hyderabad, Telangana, India.</p>
    </LegalLayout>
    </>
  );
}
