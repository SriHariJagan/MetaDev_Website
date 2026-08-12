// TechStack.tsx — technology stack grouped by category (brand-icon mosaic)
import { useRef, type CSSProperties } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Boxes,
  ChartPie,
  Cloud,
  CloudCog,
  CloudSun,
  Database,
  Eye,
  Languages,
  type LucideIcon,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import {
  SiApacheairflow,
  SiApachekafka,
  SiApachespark,
  SiArduino,
  SiBurpsuite,
  SiCypress,
  SiDocker,
  SiDotnet,
  SiEspressif,
  SiEthereum,
  SiExpo,
  SiFigma,
  SiFlutter,
  SiFramer,
  SiGo,
  SiGithubactions,
  SiGooglecloud,
  SiIpfs,
  SiJest,
  SiK6,
  SiKotlin,
  SiKubernetes,
  SiLangchain,
  SiMarvelapp,
  SiMiro,
  SiMongodb,
  SiMqtt,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiOwasp,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPytorch,
  SiPython,
  SiRaspberrypi,
  SiReact,
  SiRedis,
  SiRedux,
  SiSelenium,
  SiSketch,
  SiSnyk,
  SiSolidity,
  SiSplunk,
  SiSwift,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVuedotjs,
  SiWeb3Dotjs,
  SiZap,
} from 'react-icons/si';
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

/* ------------------------------------------------------------------ */
/* Brand icons — react-icons/si where available, lucide fallbacks      */
/* ------------------------------------------------------------------ */

type TechIcon = IconType | LucideIcon;

const TECH_ICONS: Record<string, TechIcon> = {
  React: SiReact,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
  'Vue.js': SiVuedotjs,
  'Tailwind CSS': SiTailwindcss,
  Redux: SiRedux,
  'React Native': SiReact,
  Flutter: SiFlutter,
  Swift: SiSwift,
  Kotlin: SiKotlin,
  Expo: SiExpo,
  'Node.js': SiNodedotjs,
  Python: SiPython,
  Java: SiOpenjdk,
  Go: SiGo,
  '.NET': SiDotnet,
  PHP: SiPhp,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  DynamoDB: Database,
  AWS: Cloud,
  Azure: CloudSun,
  'Google Cloud': SiGooglecloud,
  Docker: SiDocker,
  Kubernetes: SiKubernetes,
  'GitHub Actions': SiGithubactions,
  TensorFlow: SiTensorflow,
  PyTorch: SiPytorch,
  OpenAI: Bot,
  LangChain: SiLangchain,
  'Computer Vision': Eye,
  NLP: Languages,
  Ethereum: SiEthereum,
  Solidity: SiSolidity,
  Hyperledger: Boxes,
  'Web3.js': SiWeb3Dotjs,
  IPFS: SiIpfs,
  'Apache Spark': SiApachespark,
  Kafka: SiApachekafka,
  Airflow: SiApacheairflow,
  'Power BI': BarChart3,
  Tableau: ChartPie,
  Arduino: SiArduino,
  'Raspberry Pi': SiRaspberrypi,
  MQTT: SiMqtt,
  'AWS IoT': CloudCog,
  ESP32: SiEspressif,
  Jest: SiJest,
  Cypress: SiCypress,
  Selenium: SiSelenium,
  Postman: SiPostman,
  K6: SiK6,
  OWASP: SiOwasp,
  'Burp Suite': SiBurpsuite,
  Splunk: SiSplunk,
  Snyk: SiSnyk,
  'ZAP Proxy': SiZap,
  Figma: SiFigma,
  Framer: SiFramer,
  Sketch: SiSketch,
  Miro: SiMiro,
  Marvel: SiMarvelapp,
};

export interface TechStackProps {
  className?: string;
}

export function TechStack({ className }: TechStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const totalTechs = TECH_STACK.reduce((sum, group) => sum + group.techs.length, 0);

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
            From web and mobile to AI, blockchain, IoT and data — every
            MetaDev solution runs on proven, enterprise-grade technologies.
          </motion.p>
          <motion.div className={styles.countRow} variants={itemVariants}>
            <span className={styles.countPill}>
              <span className={styles.countValue}>{TECH_STACK.length}</span>
              Categories
            </span>
            <span className={styles.countDot} aria-hidden="true" />
            <span className={styles.countPill}>
              <span className={styles.countValue}>{totalTechs}+</span>
              Technologies
            </span>
          </motion.div>
        </motion.div>

        {/* ---------- Groups ---------- */}
        <motion.ul
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {TECH_STACK.map((group, groupIndex) => {
            const GroupIcon = group.icon;
            return (
              <motion.li
                key={group.id}
                className={cn(styles.groupCard, styles[`accent-${group.accent}`])}
                variants={itemVariants}
              >
                <div className={styles.groupHeader}>
                  <span className={styles.groupIndex}>
                    {String(groupIndex + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.groupIcon}>
                    <GroupIcon
                      size={17}
                      stroke={`url(#grad-${group.accent})`}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className={styles.groupTitle}>{group.category}</h3>
                </div>

                <ul className={styles.techMosaic}>
                  {group.techs.map((tech) => {
                    const TechIcon = TECH_ICONS[tech];
                    const techColor = TECH_COLORS[tech] ?? '148 163 184';
                    return (
                      <li
                        key={tech}
                        className={styles.techTile}
                        style={{ '--tech': techColor } as CSSProperties}
                      >
                        <span
                          className={styles.tileIcon}
                          style={{
                            color: `rgb(${techColor})`,
                            backgroundColor: `rgba(${techColor}, 0.14)`,
                          }}
                        >
                          {TechIcon ? (
                            <TechIcon size={15} aria-hidden="true" />
                          ) : (
                            <span className={styles.tileFallback} aria-hidden="true">
                              {tech.charAt(0)}
                            </span>
                          )}
                        </span>
                        <span className={styles.tileLabel}>{tech}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className={styles.cardFooter}>
                  <div
                    className={styles.meter}
                    role="img"
                    aria-label={`${group.techs.length} technologies in this category`}
                  >
                    {group.techs.map((tech, i) => (
                      <span
                        key={tech}
                        className={styles.meterSeg}
                        style={{ '--i': i } as CSSProperties}
                      />
                    ))}
                  </div>
                  <div className={styles.footerMeta}>
                    <span className={styles.footerLabel}>In our stack</span>
                    <span className={styles.footerCount}>
                      {String(group.techs.length).padStart(2, '0')} techs
                    </span>
                  </div>
                </div>

                <GroupIcon className={styles.groupWatermark} size={96} aria-hidden="true" />
              </motion.li>
            );
          })}
        </motion.ul>
      </Container>
    </Section>
  );
}

export default TechStack;
