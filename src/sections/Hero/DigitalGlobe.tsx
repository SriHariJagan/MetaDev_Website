// DigitalGlobe.tsx — polished digital network sphere behind the hero logo
import styles from './Hero.module.css';

const NODES: Array<{ x: number; y: number }> = [
  { x: 200, y: 62 },
  { x: 296, y: 118 },
  { x: 322, y: 240 },
  { x: 242, y: 318 },
  { x: 120, y: 330 },
  { x: 62, y: 246 },
  { x: 76, y: 138 },
  { x: 150, y: 96 },
];

const ARCS: string[] = [
  'M200,62 Q268,112 296,118',
  'M296,118 Q330,182 322,240',
  'M322,240 Q286,298 242,318',
  'M242,318 Q182,330 120,330',
  'M120,330 Q78,298 62,246',
  'M62,246 Q52,192 76,138',
  'M76,138 Q112,98 150,96',
  'M150,96 Q176,76 200,62',
];

const PARTICLES: Array<{ x: number; y: number; delay: number }> = [
  { x: 56, y: 172, delay: 0 },
  { x: 96, y: 86, delay: 1.2 },
  { x: 190, y: 46, delay: 2.1 },
  { x: 330, y: 122, delay: 0.6 },
  { x: 354, y: 262, delay: 1.8 },
  { x: 288, y: 352, delay: 2.7 },
  { x: 150, y: 368, delay: 0.9 },
  { x: 44, y: 318, delay: 1.5 },
  { x: 226, y: 92, delay: 2.4 },
  { x: 322, y: 192, delay: 3.0 },
];

export function DigitalGlobe() {
  return (
    <div className={styles.digitalGlobe} aria-hidden="true">
      <div className={styles.globeSpin}>
        <svg className={styles.globeSvg} viewBox="0 0 400 400">
          <defs>
            <radialGradient id="dgSphere" cx="32%" cy="26%" r="85%">
              <stop offset="0%" stopColor="var(--globe-lit)" />
              <stop offset="30%" stopColor="var(--globe-bright)" />
              <stop offset="62%" stopColor="var(--globe-mid)" />
              <stop offset="100%" stopColor="var(--globe-deep)" />
            </radialGradient>
            <linearGradient id="dgArc" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--globe-arc-a)" />
              <stop offset="100%" stopColor="var(--globe-arc-b)" />
            </linearGradient>
            <linearGradient id="dgRim" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--globe-arc-a)" />
              <stop offset="50%" stopColor="var(--globe-lit)" />
              <stop offset="100%" stopColor="var(--globe-arc-b)" />
            </linearGradient>
            <radialGradient id="dgSpecular" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="url(#dgRim)"
            strokeWidth="2"
            className={styles.atmosphere}
          />

          <circle
            cx="200"
            cy="200"
            r="172"
            fill="url(#dgSphere)"
            stroke="var(--globe-line)"
            strokeWidth="1"
          />

          <ellipse
            cx="148"
            cy="128"
            rx="80"
            ry="56"
            fill="url(#dgSpecular)"
            className={styles.specular}
          />

          <g className={styles.graticule}>
            {[46, 92, 140, 172].map((r) => (
              <circle
                key={r}
                cx="200"
                cy="200"
                r={r}
                fill="none"
                stroke="var(--globe-line)"
              />
            ))}
            {[52, 106, 150].map((rx) => (
              <ellipse
                key={rx}
                cx="200"
                cy="200"
                rx={rx}
                ry="172"
                fill="none"
                stroke="var(--globe-line)"
              />
            ))}
            {[64, 122, 160].map((ry) => (
              <ellipse
                key={ry}
                cx="200"
                cy="200"
                rx="172"
                ry={ry}
                fill="none"
                stroke="var(--globe-line)"
              />
            ))}
          </g>

          <g>
            {ARCS.map((d, index) => (
              <path
                key={index}
                d={d}
                fill="none"
                stroke="url(#dgArc)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeDasharray="4 7"
                opacity="0.65"
                className={styles.arcFlow}
              />
            ))}
          </g>

          <g>
            {NODES.map((node, index) => (
              <g key={index}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="10"
                  fill="none"
                  stroke="var(--globe-dot)"
                  strokeWidth="1"
                  opacity="0.3"
                  className={styles.nodeRing}
                  style={{ animationDelay: `${index * 0.35}s` }}
                />
                <circle cx={node.x} cy={node.y} r="3.2" fill="var(--globe-dot)" className={styles.nodeDot} />
              </g>
            ))}
          </g>

          {PARTICLES.map((particle, index) => (
            <circle
              key={index}
              cx={particle.x}
              cy={particle.y}
              r="1.6"
              fill="var(--globe-dot)"
              className={styles.particle}
              style={{ animationDelay: `${particle.delay}s` }}
            />
          ))}

          <circle cx="200" cy="200" r="172" fill="none" stroke="var(--globe-edge)" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  );
}
