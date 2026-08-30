import { RefreshCcw, Info, AlertTriangle, Receipt, Clock, ShieldCheck } from "lucide-react";
import { LegalLayout, type TocItem } from "./LegalLayout";
import styles from "./Legal.module.css";

const TOC: TocItem[] = [
  { id: "overview", label: "1. Overview" },
  { id: "scope", label: "2. Scope & what it covers" },
  { id: "subscriptions", label: "3. Subscription cancellation" },
  { id: "services", label: "4. Professional services & SOW" },
  { id: "refunds", label: "5. Refunds" },
  { id: "non-refundable", label: "6. Non-refundable items" },
  { id: "effect", label: "7. What happens after cancellation" },
  { id: "how-to", label: "8. How to request" },
  { id: "rights", label: "9. Consumer rights & exceptions" },
  { id: "changes", label: "10. Changes & contact" },
];

export function CancellationPage() {
  return (
    <LegalLayout
      icon={RefreshCcw}
      eyebrow="Legal — Cancellation & Refunds"
      title="Cancellation & Refund Policy"
      description="How cancellation, renewal, and refunds work for MetaDev subscriptions and services — transparent timelines, pro-rata rules, and exactly how to request a change."
      updatedAt="28 August 2026"
      toc={TOC}
    >
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><Info size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Plain-language summary</p>
          <p className={styles.calloutText}>You can cancel any renewing subscription before the next billing date from your account or by email — no questions asked. Paid periods already started are generally non-refundable except where law requires or where we state otherwise below. For custom services (SOW), cancellation follows the notice and milestone terms in your order form.</p>
        </div>
      </div>

      <div className={styles.badgeRow}>
        <span className={styles.badge}><Clock size={12} /> Cancel anytime before renewal</span>
        <span className={styles.badge}><Receipt size={12} /> Refund in 7–10 business days</span>
        <span className={styles.badge}><ShieldCheck size={12} /> India Consumer Protection Act aligned</span>
      </div>

      <h2 id="overview">1. Overview</h2>
      <p>This Cancellation & Refund Policy (“Policy”) applies to purchases made via <code>metadev.in</code> and our products — <strong>MetaHealth, MetaEdu, MetaGreen, MetaFlow, MetaHire, MetaCheck, MetaAds, MetaNav, MetaLedger, MetaCard, MetaIM</strong> — and to custom design / engineering services contracted under a Statement of Work (SoW) or order form.</p>
      <p>It supplements our <a href="/legal/terms-of-service">Terms of Service</a> and product-specific order forms. Where there is a conflict, the <strong>order form / SOW prevails</strong>, then this Policy, then the site Terms.</p>
      <p><strong>Who this is for:</strong> any customer who pays MetaDev directly — self-serve SaaS subscriptions and invoiced enterprise agreements. If you purchased via a marketplace or reseller, their cancellation terms also apply — contact them and us via <a href="mailto:support@metadev.in">support@metadev.in</a> so we can coordinate.</p>

      <h2 id="scope">2. Scope & what it covers</h2>
      <div className={styles.tableWrap}>
        <table>
          <thead><tr><th>Type</th><th>Examples</th><th>Governed by</th></tr></thead>
          <tbody>
            <tr><td><strong>Auto-renewing subscriptions</strong></td><td>Monthly / annual SaaS plans for any MetaDev product, add-ons, seat packs</td><td>This Policy §3 + order form</td></tr>
            <tr><td><strong>Prepaid / fixed-term licences</strong></td><td>Annual prepaid, multi-year commits</td><td>This Policy §3 + §5 — generally non-refundable mid-term</td></tr>
            <tr><td><strong>Professional services</strong></td><td>Discovery, design, build, integration, migration delivered under a SOW</td><td>SOW + this Policy §4</td></tr>
            <tr><td><strong>Verification / consumption</strong></td><td>Per-check (MetaCheck), per-message (MetaIM), ad spend (MetaAds)</td><td>Usage billed as consumed — see §6</td></tr>
          </tbody>
        </table>
      </div>
      <p>Free trials, betas, and freemium tiers have no charge to cancel — just stop use or delete the workspace before the trial converts.</p>

      <h2 id="subscriptions">3. Subscription cancellation</h2>
      <p><strong>Cancel anytime.</strong> You may cancel a renewing subscription at any time and retain access through the end of the current billing period. There is no cancellation fee.</p>
      <ul>
        <li><strong>Self-serve:</strong> Dashboard → Billing → Manage plan → Cancel (requires Owner / Billing Admin). You receive an email confirmation immediately.</li>
        <li><strong>By email:</strong> Write to <a href="mailto:support@metadev.in">support@metadev.in</a> from your registered billing email with subject “Cancellation — [Product] — [Workspace/Org name]”. We confirm within <strong>1 business day</strong>.</li>
        <li><strong>Effective date:</strong> Cancellation stops the <em>next</em> renewal. The current paid period runs to its end; no pro-rata refund for partial use unless §5 applies.</li>
        <li><strong>Notice for invoiced/enterprise:</strong> Cancel with at least <strong>30 days’ written notice</strong> before renewal, or as stated in your order form (some multi-year deals require 60–90 days).</li>
        <li><strong>Auto-renewal reminder:</strong> For non-enterprise renewals we send a reminder at least <strong>7 days</strong> before charging the next period.</li>
      </ul>
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><Clock size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Need to avoid the next charge? Timing matters</p>
          <p className={styles.calloutText}>Cancel at least <strong>24 hours before renewal</strong> for card-billed self-serve plans. Email requests are timestamped on receipt; we honour the time received, not the time processed.</p>
        </div>
      </div>
      <p><strong>Windows-policy:</strong> If you cancel within <strong>48 hours after a renewal charge</strong> and have not used the new period (no logins, no API calls, no new records), write to <a href="mailto:support@metadev.in">support@metadev.in</a> — we will refund the renewal in full as a one-time courtesy per account.</p>
      <p><strong>Downgrades vs cancellation:</strong> Reducing seats or switching to a lower plan takes effect at the next renewal; the current period stays at the higher tier with no mid-cycle refund.</p>

      <h2 id="services">4. Professional services & SOW</h2>
      <p>Custom services are scheduled and staffed on commitment. Cancellation and rescheduling:</p>
      <ul>
        <li>You may terminate a SOW for convenience with written notice as stated in the SOW (default: <strong>15 days</strong>). Fees for work performed, milestones accepted, and non-cancellable third-party costs incurred up to the effective date remain payable.</li>
        <li>Prepaid retainers / deposits are applied to delivered work. Unapplied retainer for undelivered, un-started phases is refundable within <strong>10 business days</strong> of termination, less any cancellation window costs in the SOW.</li>
        <li>On termination we deliver all completed, paid-for deliverables and a handover pack within <strong>10 business days</strong>.</li>
      </ul>
      <p>Milestone acceptance delays do not extend payment terms unless mutually agreed in writing.</p>

      <h2 id="refunds">5. Refunds</h2>
      <p>We aim to be fair and fast. Refund eligibility:</p>
      <div className={styles.tableWrap}>
        <table>
          <thead><tr><th>Situation</th><th>Eligibility</th><th>Timeline</th></tr></thead>
          <tbody>
            <tr><td>Duplicate / erroneous charge</td><td>Full refund</td><td>Issued within 3 business days of confirmation</td></tr>
            <tr><td>Renewal charged — no use in new period & request within 48 hours</td><td>Full refund (one-time courtesy per account)</td><td>7–10 business days to original method</td></tr>
            <tr><td>Annual plan — unused, requested within 7 days of initial purchase & no material use</td><td>Full refund minus payment-gateway fees / taxes if law permits</td><td>7–10 business days</td></tr>
            <tr><td>Service not delivered as described / defect we cannot cure within SLA</td><td>Pro-rata refund for unused period or re-performance, at your option</td><td>Case-by-case, within 10 business days</td></tr>
            <tr><td>Statutory right (Consumer Protection Act, 2019 or other applicable law)</td><td>As required by law</td><td>Per statutory timeline</td></tr>
          </tbody>
        </table>
      </div>
      <ul>
        <li>Refunds go to the <strong>original payment method</strong>. If that is not possible (e.g., closed account), we issue via bank transfer after verification.</li>
        <li>GST / taxes already remitted to authorities are refunded only where we can lawfully reclaim them; otherwise a credit note is issued.</li>
        <li>Currency: refunds are in <strong>INR</strong> unless the order form states another currency. FX differences are borne per the payment provider’s rate.</li>
      </ul>

      <h2 id="non-refundable">6. Non-refundable items</h2>
      <p>Unless law requires otherwise or we explicitly agree in writing:</p>
      <ul>
        <li>Fees for a billing period already started and used (logins, API calls, records created) are non-refundable.</li>
        <li>Consumption-based charges — per-verification (MetaCheck), per-message, ad spend, SMS/WhatsApp, KYC / bureau fees, card-issuance, and other pass-through third-party fees — once successfully processed.</li>
        <li>Setup, onboarding, training, data-migration, and other one-time services once delivered or attended.</li>
        <li>Discounts forfeited on early termination of a committed term — the remaining term is cancelled, not credited.</li>
      </ul>
      <div className={styles.callout}>
        <span className={styles.calloutIcon}><AlertTriangle size={18} /></span>
        <div className={styles.calloutBody}>
          <p className={styles.calloutTitle}>Chargebacks — talk to us first</p>
          <p className={styles.calloutText}>If a charge looks wrong, contact <a href="mailto:support@metadev.in">support@metadev.in</a> before filing a dispute. Chargebacks while a refund review is open delay resolution. We provide transaction evidence to your bank within 2 business days and still honour any refund you are due.</p>
        </div>
      </div>

      <h2 id="effect">7. What happens after cancellation</h2>
      <ul>
        <li><strong>Access:</strong> You retain full access until the end of the paid period (subscriptions) or until the SOW termination date (services). After that, the workspace moves to a read-only grace period of <strong>7 days</strong> (subscriptions) so you can export data.</li>
        <li><strong>Data & export:</strong> Export via Dashboard or request an export from <a href="mailto:support@metadev.in">support@metadev.in</a> during the grace period. Afterward, data is retained per your DPA / our <a href="/legal/privacy-policy">Privacy Policy</a> and then deleted or anonymised. Deletion of personal data on written request per DPDP Act is available at any time.</li>
        <li><strong>Reactivation:</strong> You may reactivate within <strong>30 days</strong> without data loss in most cases; beyond that, restoration is on a best-effort basis.</li>
        <li><strong>Third-party services:</strong> Domain, SMS sender-ID, payment-gateway, or bureau connections that you authorised remain yours to disconnect; we revoke our app-level access on termination.</li>
      </ul>

      <h2 id="how-to">8. How to request cancellation or a refund</h2>
      <ol>
        <li><strong>From your account (fastest):</strong> Billing owner → Dashboard → Billing → “Cancel / Manage plan”. For refunds, use “Report a billing issue” on the same page.</li>
        <li><strong>By email:</strong> <a href="mailto:support@metadev.in">support@metadev.in</a> with subject <code>Cancellation — [Product] — [Org]</code> or <code>Refund — [Invoice ID]</code>. Include org/workspace name, product, invoice/transaction ID, and reason.</li>
        <li><strong>Business / enterprise:</strong> Also CC <a href="mailto:business@metadev.in">business@metadev.in</a> or your account manager for faster routing.</li>
        <li><strong>Acknowledgement:</strong> We acknowledge within <strong>1 business day</strong> and give a decision within <strong>5 business days</strong> (sooner for duplicate-charge cases).</li>
      </ol>
      <p>We may ask for verification (e.g., confirmation from the billing email) to prevent unauthorised cancellations. Once approved, refunds are processed in <strong>7–10 business days</strong>; your bank may take an additional 3–7 days to post.</p>
      <p>Not satisfied? Escalate to <a href="mailto:info@metadev.in">info@metadev.in</a> (Grievance Officer, IT Rules, 15-day redressal) or raise a ticket via <a href="/contact">Contact</a>.</p>

      <h2 id="rights">9. Consumer rights & exceptions</h2>
      <p>Nothing in this Policy limits rights you have under the <strong>Consumer Protection Act, 2019</strong>, the <strong>Indian Contract Act, 1872</strong>, or other applicable law — including rights relating to deficient services or unfair contracts. Where law grants a cooling-off or withdrawal right, we honour it.</p>
      <ul>
        <li>If we materially increase renewal pricing, we notify at least <strong>30 days</strong> in advance; you may cancel before the new price takes effect and retain the old price through the current period.</li>
        <li>If we discontinue a product or feature you prepaid for, we refund the unused prepaid portion on a pro-rata basis.</li>
        <li>Fraud, chargeback abuse, or use in breach of our <a href="/legal/terms-of-service">Terms</a> may result in suspension and forfeiture of any promotional credits.</li>
      </ul>

      <h2 id="changes">10. Changes & contact</h2>
      <p>We may update this Policy to reflect changes in products, pricing, or law. Material changes are posted here with a new “Last updated” date; for paid customers we also provide email notice at least <strong>15 days</strong> before they take effect. Continued use after the effective date constitutes acceptance; if you disagree, cancel before renewal.</p>
      <p><strong>Support & billing:</strong> <a href="mailto:support@metadev.in">support@metadev.in</a> · <strong>Business:</strong> <a href="mailto:business@metadev.in">business@metadev.in</a> · <strong>Grievance / Privacy:</strong> <a href="mailto:contact@metadev.in">contact@metadev.in</a> · <strong>General:</strong> <a href="mailto:info@metadev.in">info@metadev.in</a> · Phone: +91 95595 59143</p>
      <p><strong>Postal:</strong> MetaDev Innovations Pvt. Ltd., Hyderabad, Telangana, India.</p>
      <p className={styles.sitemapNote}>Disputes are governed by the laws of India with exclusive jurisdiction of courts at Hyderabad, Telangana, per our Terms — we encourage good-faith resolution first. This Policy does not create rights beyond applicable law; product DPAs and signed order forms prevail in case of conflict.</p>
    </LegalLayout>
  );
}
