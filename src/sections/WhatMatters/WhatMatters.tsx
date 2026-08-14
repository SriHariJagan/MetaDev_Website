import { useRef } from "react";
import type { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GradientText } from "@/components/common/GradientText";
import { BackgroundDecor } from "@/components/common/BackgroundDecor";
import { fadeUp, staggerContainer } from "@/constants/motion";
import styles from "./WhatMatters.module.css";

import speedImage from "@/assets/images/whyMatters/speed.png";
import scaleImage from "@/assets/images/whyMatters/scale.png";
import complianceImage from "@/assets/images/whyMatters/compliance.png";
import futureImage from "@/assets/images/whyMatters/future.png";

type Accent = "blue" | "cyan" | "violet" | "orange";

const containerVariants = staggerContainer(0.08);
const itemVariants = fadeUp(20, 0.4);

interface Pillar {
  image: string;
  accent: Accent;
  title: string;
  description: ReactNode;
}

const PILLARS: Pillar[] = [
  {
    image: speedImage,
    accent: "blue",
    title: "Speed",
    description: (
      <>
        Moving from months of custom build to weeks of configuration{" "}
        <strong>cuts time-to-market by over 60%</strong>.
      </>
    ),
  },
  {
    image: scaleImage,
    accent: "cyan",
    title: "Scale",
    description: (
      <>
        Add a new module, region, or integration{" "}
        <strong>without touching your core platform</strong>; MetaDev
        evolves, the APIs stay stable.
      </>
    ),
  },
  {
    image: complianceImage,
    accent: "violet",
    title: "Compliance",
    description: (
      <>
        Security, data residency, and regulatory rules are encoded once,{" "}
        <strong>reducing human error</strong> across every deployment.
      </>
    ),
  },
  {
    image: futureImage,
    accent: "orange",
    title: "Future-Proofing",
    description: (
      <>
        The same modular architecture lets MetaDev{" "}
        <strong>roll out new features</strong> — AI-driven insights, new
        integrations, added modules — <strong>without partner rework</strong>.
      </>
    ),
  },
];

export function WhatMatters() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  return (
    <Section>
      <BackgroundDecor>
        <div className={styles.glow} />
      </BackgroundDecor>

      <Container ref={containerRef}>
        <SectionHeader
          align="center"
          variants={containerVariants}
          itemVariants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          title={
            <>
              What <GradientText variant="violet">Matters</GradientText>
            </>
          }
          titleClassName={styles.title}
          subtitle="The principles behind every platform we build."
          subtitleClassName={styles.subtitle}
        />

        <motion.ul
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PILLARS.map((pillar) => (
            <motion.li
              key={pillar.title}
              className={`${styles.card} ${styles[`accent-${pillar.accent}`]}`}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 28, mass: 0.8 }}
            >
              <span className={styles.cardIcon}>
                <img
                  src={pillar.image}
                  alt=""
                  className={styles.cardIconImage}
                  draggable={false}
                  aria-hidden="true"
                />
              </span>
              <h3 className={styles.cardTitle}>{pillar.title}</h3>
              <p className={styles.cardText}>{pillar.description}</p>
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </Section>
  );
}
