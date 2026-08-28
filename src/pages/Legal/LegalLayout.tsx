import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { Clock3, ShieldCheck, ArrowLeft } from "lucide-react";
import styles from "./Legal.module.css";

export interface TocItem { id: string; label: string }

interface Props {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  toc: TocItem[];
  children: React.ReactNode;
}

export function LegalLayout({ icon: Icon, eyebrow, title, description, updatedAt, toc, children }: Props) {
  const [active, setActive] = useState(toc[0]?.id ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [toc]);

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero} aria-label={title}>
        <span className={styles.heroBlob1} aria-hidden="true" />
        <span className={styles.heroBlob2} aria-hidden="true" />
        <span className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroInner}>
          <Link to="/" className={styles.backLink}>
            <ArrowLeft size={14} /> Back to home
          </Link>
          <span className={styles.heroIconRing} aria-hidden="true">
            <Icon size={30} strokeWidth={1.7} />
          </span>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.heroTitle}>{title}</h1>
          <p className={styles.heroSubtitle}>{description}</p>
          <span className={styles.updated}>
            <Clock3 size={13} /> Last updated — {updatedAt}
            <span className={styles.dot} aria-hidden="true" />
            <ShieldCheck size={13} /> MetaDev Innovations Pvt. Ltd.
          </span>
        </div>
      </section>

      {/* Body */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>
          {/* TOC — desktop sticky */}
          <aside className={styles.toc} aria-label="On this page">
            <p className={styles.tocTitle}>On this page</p>
            <nav>
              <ul className={styles.tocList}>
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className={`${styles.tocLink} ${active === t.id ? styles.tocActive : ""}`}>
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className={styles.tocCard}>
              <p className={styles.tocCardTitle}>Need help?</p>
              <p className={styles.tocCardText}>Questions about these terms? Our support team replies within 24 hours.</p>
              <a href="mailto:info@metadev.in" className={styles.tocCardLink}>info@metadev.in →</a>
              <a href="mailto:contact@metadev.in" className={styles.tocCardLinkMuted}>contact@metadev.in (privacy)</a>
            </div>
          </aside>

          {/* Article */}
          <article className={styles.article}>{children}</article>
        </div>
      </div>
    </div>
  );
}
