// TrustedBy.tsx
import { useMemo, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  animate,
} from "framer-motion";
import { Users2, ChevronLeft, ChevronRight } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Badge } from "@/components/common/Badge";
import { GradientText } from "@/components/common/GradientText";
import { IconButton } from "@/components/common/IconButton";
import { fadeUp, staggerContainer } from "@/constants/motion";
import styles from "./TrustedBy.module.css";

import metaHireLogo from "@/assets/images/trustedBy/metaHire.png";
import metaFlowLogo from "@/assets/images/trustedBy/metaFlow.png";
import metaCheckLogo from "@/assets/images/trustedBy/metaCheck.png";
import metaAdsLogo from "@/assets/images/trustedBy/metaAds.png";
import metaGreenLogo from "@/assets/images/trustedBy/metaGreen.png";
import metaEduLogo from "@/assets/images/trustedBy/metaEdu.png";
import worktaxLogo from "@/assets/images/trustedBy/worktax.png";
import solarHutLogo from "@/assets/images/trustedBy/solarHut.png";
import theClearHireLogo from "@/assets/images/trustedBy/theclearhire.png";
import gameatLogo from "@/assets/images/trustedBy/gameat.png";
import metaPeLogo from "@/assets/images/trustedBy/metape.png";

/* ------------------------------------------------------------------ */
/* Real partner logos                                                  */
/* ------------------------------------------------------------------ */

interface PartnerLogo {
  id: string;
  name: string;
  src: string;
}

const PARTNER_LOGOS: PartnerLogo[] = [
  { id: "metahire", name: "MetaHire", src: metaHireLogo },
  { id: "metaflow", name: "MetaFlow", src: metaFlowLogo },
  { id: "metacheck", name: "MetaCheck", src: metaCheckLogo },
  { id: "metaads", name: "MetaAds", src: metaAdsLogo },
  { id: "metagreen", name: "MetaGreen", src: metaGreenLogo },
  { id: "metaedu", name: "MetaEdu", src: metaEduLogo },
  { id: "worktax", name: "WorkTax", src: worktaxLogo },
  { id: "solarhut", name: "SolarHut", src: solarHutLogo },
  { id: "theclearhire", name: "The Clear Hire", src: theClearHireLogo },
  { id: "gameat", name: "Gameat", src: gameatLogo },
  { id: "metape", name: "MetaPe", src: metaPeLogo },
];

/* ------------------------------------------------------------------ */
/* Animation variants                                                  */
/* ------------------------------------------------------------------ */

const containerVariants = staggerContainer(0.07);

const itemVariants = fadeUp(18, 0.35);

/* ------------------------------------------------------------------ */
/* Count-up number (shared CountUp)                                    */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Infinite marquee logo row                                           */
/* ------------------------------------------------------------------ */

const CARD_WIDTH = 201; // logo width + gap, keep in sync with CSS
const SPEED = 40; // px per second

/* ------------------------------------------------------------------ */
/* Logo card — white monochrome mark on the unique banner, so every   */
/* logo reads perfectly in both dark and light themes.                */
/* ------------------------------------------------------------------ */

function LogoCard({ logo }: { logo: PartnerLogo }) {
  return (
    <li className={styles.logoBannerItem}>
      <img
        src={logo.src}
        alt={logo.name}
        className={styles.logoImage}
        loading="lazy"
        decoding="async"
      />
    </li>
  );
}

function LogoMarquee() {
  const x = useMotionValue(0);
  const paused = useRef(false);
  const loopWidth = CARD_WIDTH * PARTNER_LOGOS.length;

  useAnimationFrame((_, delta) => {
    if (paused.current) return;
    let next = x.get() - (SPEED * delta) / 1000;
    if (next <= -loopWidth) next += loopWidth;
    x.set(next);
  });

  const nudge = (direction: 1 | -1) => {
    const target = x.get() - direction * CARD_WIDTH;
    animate(x, target, { duration: 0.45, ease: "easeInOut" });
  };

  const doubled = useMemo(
    () => [...PARTNER_LOGOS, ...PARTNER_LOGOS],
    [],
  );

  return (
    <div className={styles.marqueeWrapper}>
      <div className={styles.logoBanner}>
        <IconButton
          label="Scroll logos left"
          className={styles.navButtonLeft}
          onClick={() => nudge(-1)}
        >
          <ChevronLeft size={18} />
        </IconButton>

        <div
          className={styles.marqueeViewport}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <motion.ul className={styles.marqueeTrack} style={{ x }}>
            {doubled.map((logo, i) => (
              <LogoCard key={`${logo.id}-${i}`} logo={logo} />
            ))}
          </motion.ul>
        </div>

        <IconButton
          label="Scroll logos right"
          className={styles.navButtonRight}
          onClick={() => nudge(1)}
        >
          <ChevronRight size={18} />
        </IconButton>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main section                                                        */
/* ------------------------------------------------------------------ */

export function TrustedBy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <Section
      size="md"
      className={styles.trustedBy}
      aria-label="Trusted by governments and institutions"
    >
      <Container>
        <motion.div
          ref={containerRef}
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <SectionHeader
            flatten
            itemVariants={itemVariants}
            eyebrow={
              <Badge variant="glass">
                <Users2 size={14} aria-hidden="true" />
                <span>Trusted By</span>
              </Badge>
            }
            title={
              <>
                Trusted by Governments, Enterprises
                <br />
                and Institutions <GradientText>Across India</GradientText>
              </>
            }
            titleClassName={styles.heading}
            subtitle="Metadev is powering digital transformation for organizations that
              serve millions of people every day."
            subtitleClassName={styles.subtitle}
          />
        </motion.div>
      </Container>

      <div className={styles.marqueeSection}>
        <LogoMarquee />
      </div>
    </Section>
  );
}
