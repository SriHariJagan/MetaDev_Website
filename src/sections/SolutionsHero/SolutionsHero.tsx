// SolutionsHero.tsx — intro hero for the Solutions page: left copy + right floating card collage
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Cloud,
  Code,
  Code2,
  Globe2,
  PenTool,
  ShieldCheck,
  Smartphone,
} from "lucide-react";
import { Container } from "@/components/common/Container";
import { Button } from "@/components/common/Button";
import { fadeUp, staggerContainer } from "@/constants/motion";
import styles from "./SolutionsHero.module.css";

const containerVariants = staggerContainer(0.1);
const itemVariants = fadeUp(20, 0.45);

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 16 },
  },
};

const SOLUTION_ROWS = [
  { icon: Code, label: "Web" },
  { icon: Smartphone, label: "Mobile" },
  { icon: BrainCircuit, label: "AI / ML" },
  { icon: Cloud, label: "Cloud" },
  { icon: ShieldCheck, label: "Security" },
];

const CODE_LINES: Array<{ key: string; value: string }> = [
  { key: "project", value: '"metadev-platform"' },
  { key: "client", value: '"acme-corp"' },
  { key: "stack", value: '["react","node","aws"]' },
  { key: "status", value: '"in_production"' },
  { key: "region", value: '"eu-west-1"' },
  { key: "team_size", value: "12" },
  { key: "uptime", value: '"99.9%"' },
];

function ConnectorTop() {
  return (
    <svg
      className={styles.connectorTop}
      viewBox="0 0 140 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 86C40 70 70 40 132 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <circle cx="134" cy="6" r="4" fill="currentColor" />
    </svg>
  );
}

function ConnectorBottom() {
  return (
    <svg
      className={styles.connectorBottom}
      viewBox="0 0 140 90"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 8C40 24 70 54 132 82"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <circle cx="134" cy="84" r="4" fill="currentColor" />
    </svg>
  );
}

export function SolutionsHero() {
  return (
    <section className={styles.root}>
      <Container maxWidth="wide" className={styles.container}>
        <div className={styles.layout}>
          {/* ---------- Left: copy ---------- */}
          <motion.div
            className={styles.left}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className={styles.eyebrow} variants={itemVariants}>
              End-to-end delivery
            </motion.span>

            <motion.h1 className={styles.title} variants={itemVariants}>
              One team. Every solution, delivered.
            </motion.h1>

            <motion.p className={styles.subtitle} variants={itemVariants}>
              From strategy to launch, we deliver the full stack — design,
              engineering, AI, and cloud infrastructure — backed by one
              accountable team.
            </motion.p>

            <motion.div className={styles.ctaRow} variants={itemVariants}>
              <Button to="/contact" variant="gradient" size="md">
                Get in Touch
                <span aria-hidden="true">&rarr;</span>
              </Button>
              <Button to="/products" variant="outline" size="md">
                Explore Our Work
                <span aria-hidden="true">&rarr;</span>
              </Button>
            </motion.div>
          </motion.div>

          {/* ---------- Right: floating card collage ---------- */}
          <motion.div
            className={styles.right}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.collage}>
              <ConnectorTop />
              <ConnectorBottom />

              <motion.div
                className={`${styles.card} ${styles.statCard}`}
                variants={cardVariants}
              >
                <span className={styles.statHead}>
                  <Globe2 size={13} aria-hidden="true" />
                  Global Delivery
                </span>
                <span className={styles.statValue}>20+</span>
                <span className={styles.statCaption}>countries served</span>
              </motion.div>

              <motion.div
                className={`${styles.card} ${styles.codeCard}`}
                variants={cardVariants}
              >
                <div className={styles.codeDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <pre className={styles.codeBody} aria-hidden="true">
                  {"{\n"}
                  {CODE_LINES.map((line) => (
                    <span key={line.key} className={styles.codeLine}>
                      {"  "}
                      <span className={styles.codeKey}>&quot;{line.key}&quot;</span>
                      <span className={styles.codePunct}>: </span>
                      <span className={styles.codeValue}>{line.value}</span>
                      <span className={styles.codePunct}>,</span>
                      {"\n"}
                    </span>
                  ))}
                  {"}"}
                </pre>
              </motion.div>

              <motion.div
                className={`${styles.card} ${styles.darkCard}`}
                variants={cardVariants}
              >
                <span className={styles.darkCardTitle}>Full Stack</span>
                <span className={styles.darkCardRow}>
                  <PenTool size={13} aria-hidden="true" />
                  Design
                </span>
                <span className={styles.darkCardRow}>
                  <Code2 size={13} aria-hidden="true" />
                  Engineering
                </span>
              </motion.div>

              <motion.div
                className={`${styles.card} ${styles.listCard}`}
                variants={cardVariants}
              >
                <span className={styles.listCardTitle}>Every Solution</span>
                <ul className={styles.listCardRows}>
                  {SOLUTION_ROWS.map((row) => (
                    <li key={row.label} className={styles.listCardRow}>
                      <row.icon size={13} aria-hidden="true" />
                      {row.label}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default SolutionsHero;
