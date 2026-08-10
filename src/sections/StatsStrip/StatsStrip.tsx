// StatsStrip.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import {
  Users,
  Landmark,
  Users2,
  Globe2,
  Handshake,
  ShieldCheck,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { CountUp } from "@/components/common/CountUp";
import { IconButton } from "@/components/common/IconButton";
import styles from "./StatsStrip.module.css";

/* ------------------------------------------------------------------ */
/* Stats data                                                          */
/* ------------------------------------------------------------------ */

interface StatItem {
  id: string;
  icon: LucideIcon;
  value: number | string;
  suffix?: string;
  label: string;
  tone: "blue" | "teal" | "purple" | "orange" | "green" | "red" | "cyan";
}

const STATS: StatItem[] = [
  {
    id: "s1",
    icon: Users,
    value: 200,
    suffix: "+",
    label: "Organizations",
    tone: "blue",
  },
  {
    id: "s2",
    icon: Landmark,
    value: 50,
    suffix: "+",
    label: "Governance Clients",
    tone: "teal",
  },
  {
    id: "s3",
    icon: Users2,
    value: 1,
    suffix: "M+",
    label: "Lives Impacted",
    tone: "purple",
  },
  {
    id: "s4",
    icon: Globe2,
    value: 25,
    suffix: "+",
    label: "States & UTs",
    tone: "orange",
  },
  {
    id: "s5",
    icon: Handshake,
    value: 100,
    suffix: "+",
    label: "Technology Partners",
    tone: "green",
  },
  {
    id: "s6",
    icon: ShieldCheck,
    value: "99.99%",
    label: "Data Security & Compliance",
    tone: "red",
  },
  {
    id: "s7",
    icon: GraduationCap,
    value: "3500+",
    label: "Educational Institutions Empowered",
    tone: "cyan",
  },
];

const AUTOPLAY_MS = 3000;
const SLIDE_MS = 550;

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export function StatsStrip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const paused = useRef(false);
  const direction = useRef<1 | -1>(1);
  const x = useMotionValue(0);
  const [unit, setUnit] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const cell = track?.firstElementChild;
      if (!track || !(cell instanceof HTMLElement)) return;
      const gap = parseFloat(getComputedStyle(track).columnGap || "16px") || 16;
      setUnit(cell.getBoundingClientRect().width + gap);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (unit <= 0) return;
    const controls = animate(x, -(index * unit), {
      duration: SLIDE_MS / 1000,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [index, unit, x]);

  const advance = useCallback(
    (current: number, dir: 1 | -1): number => {
      const next = current + dir;
      if (next > STATS.length) {
        x.jump(0);
        return 0;
      }
      if (next < 0) {
        x.jump(-STATS.length * unit);
        return STATS.length;
      }
      return next;
    },
    [x, unit],
  );

  useEffect(() => {
    if (unit <= 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setInterval(() => {
      if (paused.current) return;
      setIndex((current) => advance(current, direction.current));
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [unit, x, advance]);

  const goTo = (dir: 1 | -1) => {
    direction.current = dir;
    setIndex((current) => advance(current, dir));
  };

  const doubled = [...STATS, ...STATS];

  return (
    <Section size="md" className={styles.strip} aria-label="Metadev by the numbers">
      <Container>
        <div className={styles.carousel}>
          <IconButton
            label="Previous stat"
            className={styles.navButton}
            onClick={() => goTo(-1)}
          >
            <ChevronLeft size={16} />
          </IconButton>

          <div
            ref={containerRef}
            className={styles.viewport}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
          >
            <motion.ul ref={trackRef} className={styles.track} style={{ x }}>
              {doubled.map((stat, i) => (
                <li
                  key={`${stat.id}-${i}`}
                  className={`${styles.cell} ${styles[`tone-${stat.tone}`]}`}
                >
                  <span className={styles.statIcon}>
                    <stat.icon size={16} aria-hidden="true" />
                  </span>
                  <span className={styles.statBody}>
                    <CountUp
                      value={stat.value}
                      suffix={stat.suffix}
                      duration={0.9}
                      className={styles.statValue}
                    />
                    <span className={styles.statLabel}>{stat.label}</span>
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>

          <IconButton
            label="Next stat"
            className={styles.navButton}
            onClick={() => goTo(1)}
          >
            <ChevronRight size={16} />
          </IconButton>
        </div>
      </Container>
    </Section>
  );
}
