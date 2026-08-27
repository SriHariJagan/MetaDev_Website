/**
 * Contact.tsx — MetaDev Contact Page
 * ───────────────────────────────
 * All sub-components live here, each independently reusable:
 *
 *   ContactHero          – gradient hero with icon + headline
 *   ContactInfoStrip     – 4-card info grid (Visit / Call / Email / Hours)
 *   ContactForm          – controlled form with loading + success states
 *   DepartmentSidebar    – department cards + urgent-help CTA panel
 *   ContactFormSection   – ContactForm + DepartmentSidebar in a grid
 *   MapSection           – Google Maps embed + address bar
 *
 * Styles: contact.module.css (companion file)
 */
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HeadphonesIcon, Building2, ArrowRight, CheckCircle, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import type { ReactNode, ElementType, FormEvent, ChangeEvent } from "react";
import { contactApi } from "../../services/api";
import styles from "./contact.module.css";

/* ============================================================
   SCROLL REVEAL HOOK
   ============================================================ */
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => {
      const obs = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            el.classList.add(styles.visible);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(el);
      return () => obs.disconnect();
    }, delay);
    return () => clearTimeout(t);
  }, [delay]);

  return ref;
}

/* ============================================================
   ANIMATED WRAPPER
   ============================================================ */
interface AnimProps {
  children: ReactNode;
  dir?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}
function Anim({ children, dir = "up", delay = 0, className = "" }: AnimProps) {
  const ref = useReveal(delay);
  const d =
    dir === "left"
      ? styles.revealLeft
      : dir === "right"
        ? styles.revealRight
        : styles.revealUp;
  return (
    <div ref={ref} className={`${d} ${className}`}>
      {children}
    </div>
  );
}

/* ============================================================
   TYPES
   ============================================================ */
interface InfoItem {
  icon: ElementType;
  title: string;
  details: string[];
}
interface DeptItem {
  icon: ElementType;
  name: string;
  email: string;
}
interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/* ============================================================
   1. CONTACT HERO
   ============================================================ */
interface ContactHeroProps {
  title?: string;
  subtitle?: string;
  icon?: ElementType;
}

export function ContactHero({
  title = "Get In Touch",
  subtitle = "Have questions about our solutions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
  icon: Icon = MessageSquare,
}: ContactHeroProps) {
  return (
    <section className={styles.hero} aria-label="Contact hero">
      {/* Ambient blobs */}
      <span className={styles.heroBlob1} aria-hidden="true" />
      <span className={styles.heroBlob2} aria-hidden="true" />
      {/* Grid overlay */}
      <span className={styles.heroGrid} aria-hidden="true" />

      <div className={styles.heroInner}>
        <div className={styles.heroIconRing}>
          <Icon size={38} strokeWidth={1.6} aria-hidden="true" />
        </div>

        <h1 className={styles.heroTitle}>{title}</h1>
        <p className={styles.heroSubtitle}>{subtitle}</p>
      </div>
    </section>
  );
}

/* ============================================================
   2. CONTACT INFO CARD  (single card, composable)
   ============================================================ */
interface InfoCardProps {
  item: InfoItem;
  index?: number;
}

export function ContactInfoCard({ item, index = 0 }: InfoCardProps) {
  const ref = useReveal(index * 85);
  return (
    <div ref={ref} className={`${styles.infoCard} ${styles.revealUp}`}>
      <span className={styles.infoNumber} aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className={styles.infoIconWrap}>
        <item.icon size={26} strokeWidth={1.6} aria-hidden="true" />
      </div>
      <h3 className={styles.infoTitle}>{item.title}</h3>
      <div className={styles.infoDetails}>
        {item.details.map((line, i) => (
          <p
            key={i}
            className={`${styles.infoLine} ${i === 0 ? styles.infoLinePrimary : ""}`}
          >
            {line}
          </p>
        ))}
      </div>
      <span className={styles.infoBar} aria-hidden="true" />
    </div>
  );
}

/* ============================================================
   3. CONTACT INFO STRIP  (4-card grid)
   ============================================================ */
const INFO_ITEMS: InfoItem[] = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Hyderabad, Telangana", "Amaravathi, Andhra Pradesh", "Bangalore, Karnataka"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 95595 59143", "Mon–Sat: 9AM – 6PM"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: [
      "info@metadev.in",
      "contact@metadev.in",
      "We reply within 24 hours",
    ],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: [
      "Monday – Friday: 9AM – 6PM",
      "Saturday: 10AM – 4PM",
      "Sunday: Closed",
    ],
  },
];

export function ContactInfoStrip() {
  return (
    <section className={styles.infoStrip} aria-label="Contact information">
      <div className={styles.container}>
        <div className={styles.infoHeader}>
          <span className={styles.infoHeaderLine} aria-hidden="true" />
          <span className={styles.infoHeaderPill}>Contact Information</span>
          <span className={styles.infoHeaderLine} aria-hidden="true" />
        </div>
        <div className={styles.infoGrid}>
          {INFO_ITEMS.map((item, i) => (
            <ContactInfoCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   4. FORM FIELD  (label + input / textarea / select)
   ============================================================ */
interface FieldProps {
  id: string;
  label: string;
  required?: boolean;
  children: ReactNode;
  delay?: number;
}

function FormField({ id, label, required, children, delay = 0 }: FieldProps) {
  const ref = useReveal(delay);
  return (
    <div ref={ref} className={`${styles.field} ${styles.revealUp}`}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
        {required && (
          <span className={styles.fieldRequired} aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

/* ============================================================
   5. CONTACT FORM
   ============================================================ */
export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErrorMsg("");

    try {
      await contactApi.submit({
        name: form.name,
        email: form.email,
        phone: form.phone || undefined,
        subject: form.subject,
        message: form.message,
        product: "metadev",
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err: unknown) {
      setStatus("error");
      const axiosError = err as { response?: { data?: { error?: { message?: string } } } };
      setErrorMsg(axiosError.response?.data?.error?.message || "Failed to send message. Please try again.");
      setTimeout(() => setStatus("error"), 5000);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.formWrap}>
      {/* Header */}
      <Anim dir="up">
        <div className={styles.formHeader}>
          <span className={styles.formEyebrow}>Send a Message</span>
          <h2 className={styles.formTitle}>We'd Love to Hear From You</h2>
          <p className={styles.formSubtitle}>
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>
      </Anim>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        {/* Row 1 */}
        <div className={styles.formRow}>
          <FormField id="name" label="Full Name" required delay={80}>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className={styles.input}
            />
          </FormField>
          <FormField id="email" label="Email Address" required delay={140}>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className={styles.input}
            />
          </FormField>
        </div>

        {/* Row 2 */}
        <div className={styles.formRow}>
          <FormField id="phone" label="Phone Number" required delay={200}>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 95595 59143"
              required
              className={styles.input}
            />
          </FormField>
          <FormField id="subject" label="Subject" required delay={260}>
            <div className={styles.selectWrap}>
              <select
                id="subject"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className={styles.select}
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="business">Business Partnership</option>
                <option value="registration">Registration Help</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
              <ChevronDown
                size={16}
                className={styles.selectChevron}
                aria-hidden="true"
              />
            </div>
          </FormField>
        </div>

        {/* Message */}
        <FormField id="message" label="Message" required delay={320}>
          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us how we can help you…"
            rows={3}
            required
            className={`${styles.input} ${styles.textarea}`}
          />
        </FormField>

        {/* Success Banner */}
        {status === "success" && (
          <div className={styles.successBanner} role="status">
            <CheckCircle size={20} strokeWidth={2} aria-hidden="true" />
            Thank you! We'll get back to you soon.
          </div>
        )}

        {/* Error Banner */}
        {status === "error" && errorMsg && (
          <div className={styles.errorBanner} role="alert">
            <CheckCircle size={20} strokeWidth={2} aria-hidden="true" />
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <Anim dir="up" delay={380}>
          <button
            type="submit"
            disabled={busy}
            className={`${styles.submitBtn} ${busy ? styles.submitBusy : ""}`}
            aria-busy={busy}
          >
            {busy ? (
              <>
                <span className={styles.spinner} aria-hidden="true" />
                Sending…
              </>
            ) : (
              <>
                <Send size={17} strokeWidth={2} aria-hidden="true" />
                Send Message
              </>
            )}
          </button>
        </Anim>
      </form>
    </div>
  );
}

/* ============================================================
   6. DEPARTMENT CARD  (single, reusable)
   ============================================================ */
interface DeptCardProps {
  dept: DeptItem;
  index?: number;
}

export function DepartmentCard({ dept, index = 0 }: DeptCardProps) {
  const ref = useReveal(index * 90);
  return (
    <div ref={ref} className={`${styles.deptCard} ${styles.revealRight}`}>
      <div className={styles.deptIconWrap}>
        <dept.icon size={22} strokeWidth={1.8} aria-hidden="true" />
      </div>
      <div className={styles.deptBody}>
        <h4 className={styles.deptName}>{dept.name}</h4>
        <a href={`mailto:${dept.email}`} className={styles.deptEmail}>
          {dept.email}
        </a>
      </div>
      <span className={styles.deptArrow} aria-hidden="true">
        ›
      </span>
    </div>
  );
}

/* ============================================================
   7. URGENT HELP PANEL
   ============================================================ */
interface UrgentPanelProps {
  phone?: string;
}

export function UrgentHelpPanel({
  phone = "+91 95595 59143",
}: UrgentPanelProps) {
  return (
    <Anim dir="up" delay={300}>
      <div className={styles.urgentPanel}>
        {/* Decorative ring */}
        <span className={styles.urgentRing} aria-hidden="true" />
        <h3 className={styles.urgentTitle}>Need Immediate Help?</h3>
        <p className={styles.urgentText}>
          For urgent inquiries, please call our 24/7 support line.
        </p>
        <a
          href={`tel:${phone.replace(/\s/g, "")}`}
          className={styles.urgentBtn}
        >
          <Phone size={18} strokeWidth={2} aria-hidden="true" />
          {phone}
        </a>
      </div>
    </Anim>
  );
}

/* ============================================================
   8. DEPARTMENT SIDEBAR  (list + urgent panel)
   ============================================================ */
const DEPARTMENTS: DeptItem[] = [
  {
    icon: HeadphonesIcon,
    name: "General Support",
    email: "support@metadev.in",
  },
  {
    icon: Building2,
    name: "Business Inquiries",
    email: "business@metadev.in",
  },
  {
    icon: MessageSquare,
    name: "Technical Support",
    email: "tech@metadev.in",
  },
];

export function DepartmentSidebar() {
  return (
    <aside className={styles.sidebar} aria-label="Contact departments">
      <Anim dir="right">
        <h3 className={styles.sidebarTitle}>Contact Departments</h3>
      </Anim>
      <div className={styles.deptList}>
        {DEPARTMENTS.map((d, i) => (
          <DepartmentCard key={d.name} dept={d} index={i} />
        ))}
      </div>
      <UrgentHelpPanel />
    </aside>
  );
}

/* ============================================================
   9. CONTACT FORM SECTION  (form + sidebar grid)
   ============================================================ */
export function ContactFormSection() {
  return (
    <section className={styles.formSection} aria-label="Send a message">
      <div className={styles.container}>
        <div className={styles.formLayout}>
          <Anim dir="left" className={styles.formColMain}>
            <ContactForm />
          </Anim>
          <DepartmentSidebar />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   10. MAP SECTION
   ============================================================ */
interface MapSectionProps {
  src?: string;
  address?: string[];
  directionsUrl?: string;
}

export function MapSection({
  src = "https://maps.google.com/maps?q=17.4425462250727,78.39827029561334&z=15&ie=UTF8&iwloc=&output=embed",
  address = ["Hyderabad, Telangana, India"],
  directionsUrl = "https://www.google.com/maps/dir//17.4425462250727,78.39827029561334",
}: MapSectionProps) {
  return (
    <section className={styles.mapSection} aria-label="Office location">
      <div className={styles.container}>
        {/* Header */}
        <Anim dir="up">
          <div className={styles.mapHeader}>
            <div className={styles.mapDivider} />
            <h2 className={styles.mapTitle}>Find Us on Map</h2>
            <p className={styles.mapSubtitle}>
              Visit our office during business hours or schedule an appointment.
            </p>
          </div>
        </Anim>

        {/* Map embed */}
        <Anim dir="up" delay={150}>
          <div className={styles.mapFrame}>
            <iframe
              src={src}
              width="100%"
              height="460"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="MetaDev Office Location"
            />
          </div>
        </Anim>

        {/* Address bar */}
        <Anim dir="up" delay={250}>
          <div className={styles.addressBar}>
            <div className={styles.addressLeft}>
              <div className={styles.addressIconWrap}>
                <MapPin size={22} strokeWidth={1.8} aria-hidden="true" />
              </div>
              <div>
                <h3 className={styles.addressName}>MetaDev Office</h3>
                {address.map((line, i) => (
                  <p key={i} className={styles.addressLine}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.directionsBtn}
            >
              Get Directions
              <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
            </a>
          </div>
        </Anim>
      </div>
    </section>
  );
}

/* ============================================================
   PAGE EXPORT
   ============================================================ */
export function ContactPage() {
  return (
    <div className={styles.page}>
      <ContactHero />
      <ContactInfoStrip />
      <ContactFormSection />
      <MapSection />
    </div>
  );
}
