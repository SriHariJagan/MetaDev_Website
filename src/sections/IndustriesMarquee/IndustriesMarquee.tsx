// IndustriesMarquee.tsx — full-width scrolling industries banner
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2 } from "lucide-react";
import { Section } from "@/components/common/Section";
import { Container } from "@/components/common/Container";
import { GradientText } from "@/components/common/GradientText";
import { GradientDefs } from "@/components/common/GradientDefs";
import { InfiniteMarquee } from "@/components/common/InfiniteMarquee";
import { fadeUp, staggerContainer } from "@/constants/motion";
import { INDUSTRIES } from "@/constants/industries";
import { cn } from "@/utils/cn";
import styles from "./IndustriesMarquee.module.css";

const containerVariants = staggerContainer(0.06);

const itemVariants = fadeUp(16, 0.3);

export interface IndustriesMarqueeProps {
  items?: typeof INDUSTRIES;
  className?: string;
}

export function IndustriesMarquee({
  items = INDUSTRIES,
  className,
}: IndustriesMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <Section bordered className={cn(styles.root, className)}>
      <GradientDefs />
      <Container className={styles.container} ref={containerRef}>
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            <Building2 size={13} aria-hidden="true" />
            Industries We Serve
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Powering Every Industry
            <br />
            with <GradientText>Intelligent Solutions</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            From healthcare to energy — we build digital solutions for the
            sectors that move the world.
          </motion.p>
        </motion.div>
      </Container>

      <motion.div
        className={styles.banner}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className={styles.bannerHeader}>
          <span className={styles.bannerLine} aria-hidden="true" />
          <span className={styles.bannerPill}>
            <span className={styles.bannerPillDot} aria-hidden="true" />
            Trusted across {items.length}+ industries
          </span>
          <span className={styles.bannerLine} aria-hidden="true" />
        </div>

        <InfiniteMarquee
          items={items}
          speed={34}
          itemWidth={300}
          gap={14}
          showIndex
        />
      </motion.div>
    </Section>
  );
}

export default IndustriesMarquee;
