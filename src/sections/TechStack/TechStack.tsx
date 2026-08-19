// TechStack.tsx — technology stack explorer: category tabs + animated icon showcase
import { useRef, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useInView, type Variants } from 'framer-motion';
import {
  BarChart3,
  Bot,
  Boxes,
  ChartPie,
  CloudCog,
  CloudSun,
  Database,
  Eye,
  Languages,
  type LucideIcon,
} from 'lucide-react';
import type { IconType } from 'react-icons';
import { FaAws } from 'react-icons/fa';
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

const tabListVariants = staggerContainer(0.04);

const iconGridVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
};

const iconTileVariants: Variants = {
  hidden: { opacity: 0, y: 14, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

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
  AWS: FaAws,
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
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });

  const [activeId, setActiveId] = useState(TECH_STACK[0].id);
  const activeIndex = TECH_STACK.findIndex((group) => group.id === activeId);
  const activeGroup = TECH_STACK[activeIndex] ?? TECH_STACK[0];
  const ActiveIcon = activeGroup.icon;

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

        {/* ---------- Explorer: category tabs + animated icon showcase ---------- */}
        <div className={styles.explorer}>
          <motion.ul
            className={styles.tabList}
            role="tablist"
            aria-label="Technology categories"
            variants={tabListVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {TECH_STACK.map((group) => {
              const GroupIcon = group.icon;
              const isActive = group.id === activeId;
              return (
                <motion.li key={group.id} variants={itemVariants}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={cn(
                      styles.tab,
                      styles[`accent-${group.accent}`],
                      isActive && styles.tabActive,
                    )}
                    onClick={() => setActiveId(group.id)}
                  >
                    <span className={styles.tabIconWrap}>
                      <GroupIcon
                        size={26}
                        stroke={`url(#grad-${group.accent})`}
                        aria-hidden="true"
                      />
                    </span>
                    <span className={styles.tabName}>{group.category}</span>
                    <span className={styles.tabCount}>{group.techs.length}</span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.id}
              className={cn(styles.panel, styles[`accent-${activeGroup.accent}`])}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.32, ease: 'easeOut' }}
            >
              <div className={styles.panelHead}>
                <span className={styles.panelIcon}>
                  <ActiveIcon
                    size={26}
                    stroke={`url(#grad-${activeGroup.accent})`}
                    aria-hidden="true"
                  />
                </span>
                <div>
                  <h3 className={styles.panelTitle}>{activeGroup.category}</h3>
                  <p className={styles.panelMeta}>
                    {String(activeGroup.techs.length).padStart(2, '0')} technologies in
                    our stack
                  </p>
                </div>
              </div>

              <motion.ul
                className={styles.iconGrid}
                variants={iconGridVariants}
                initial="hidden"
                animate="visible"
              >
                {activeGroup.techs.map((tech) => {
                  const TechIcon = TECH_ICONS[tech];
                  const techColor = TECH_COLORS[tech] ?? '148 163 184';
                  return (
                    <motion.li
                      key={tech}
                      className={styles.iconTile}
                      variants={iconTileVariants}
                      style={{ '--tech': techColor } as CSSProperties}
                      whileHover={{ y: -5 }}
                    >
                      <span className={styles.tileGlyph}>
                        {TechIcon ? (
                          <TechIcon size={26} aria-hidden="true" />
                        ) : (
                          <span className={styles.tileFallback} aria-hidden="true">
                            {tech.charAt(0)}
                          </span>
                        )}
                      </span>
                      <span className={styles.tileName}>{tech}</span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Container>
    </Section>
  );
}

export default TechStack;
