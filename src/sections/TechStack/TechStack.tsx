// TechStack.tsx — technology stack grouped by category
import { useRef, type CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/common/Container';
import { GradientText } from '@/components/common/GradientText';
import { GradientDefs } from '@/components/common/GradientDefs';
import { Section } from '@/components/common/Section';
import { fadeUp, staggerContainer } from '@/constants/motion';
import { TECH_COLORS, TECH_STACK } from '@/constants/industries';
import { cn } from '@/utils/cn';
import styles from './TechStack.module.css';

const containerVariants = staggerContainer(0.05);

const itemVariants = fadeUp(16, 0.3);

export interface TechStackProps {
  className?: string;
}

export function TechStack({ className }: TechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <Section bordered className={cn(styles.root, className)}>
      <GradientDefs />
      <Container maxWidth="wide" className={styles.container} ref={containerRef}>
        {/* ---------- Header ---------- */}
        <motion.div
          className={styles.header}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.eyebrowLabel} variants={itemVariants}>
            Technology Stack
          </motion.span>
          <motion.h2 className={styles.title} variants={itemVariants}>
            Built on <GradientText>Modern Technologies</GradientText>
          </motion.h2>
          <motion.p className={styles.subtitle} variants={itemVariants}>
            We choose proven, battle-tested technologies — so your product is
            fast, secure, and future-proof.
          </motion.p>
        </motion.div>

        {/* ---------- Groups ---------- */}
        <motion.ul
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {TECH_STACK.map((group) => {
            const GroupIcon = group.icon;
            return (
              <motion.li
                key={group.id}
                className={cn(styles.groupCard, styles[`accent-${group.accent}`])}
                variants={itemVariants}
              >
                <div className={styles.groupHeader}>
                  <span className={styles.groupIcon}>
                    <GroupIcon
                      size={17}
                      stroke={`url(#grad-${group.accent})`}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className={styles.groupTitle}>{group.category}</h3>
                </div>

                <ul className={styles.techList}>
                  {group.techs.map((tech) => {
                    const techColor = TECH_COLORS[tech] ?? '148 163 184';
                    return (
                      <li
                        key={tech}
                        className={styles.techChip}
                        style={{ '--tech': techColor } as CSSProperties}
                      >
                        <span
                          className={styles.techIcon}
                          style={{
                            color: `rgb(${techColor})`,
                            backgroundColor: `rgba(${techColor}, 0.15)`,
                          }}
                        >
                          <CheckCircle2 size={11} aria-hidden="true" />
                        </span>
                        <span
                          className={styles.techLabel}
                          style={{ color: `rgb(${techColor})` }}
                        >
                          {tech}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}

export default TechStack;
