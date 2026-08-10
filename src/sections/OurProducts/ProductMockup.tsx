// ProductMockup.tsx — product-specific dashboard preview images (inline SVG)
//
// Theme handling: the palette is chosen in React from the active theme and
// applied to every paint as an inline style. There are NO theme CSS selectors
// and NO var() in presentation attributes, so the mockups always match the
// surrounding background (dark glass / light airy), tinted with each card's
// own blue-green brand gradient, in every browser.
import { useId } from 'react';
import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import styles from './OurProducts.module.css';

/* ------------------------------------------------------------------ */
/* Palette — one explicit color set per theme                          */
/* ------------------------------------------------------------------ */

interface Palette {
  window: string; // main window fill
  panel: string; // inner panels + sidebar
  stroke: string; // borders
  text: string; // big numbers
  text2: string; // small labels
  row: string; // subtle tiles / track fills
  green: string; // positive trend text
  greenBg: string; // positive trend chip background
  shadow: string; // soft drop shadow behind panels
  bars: string; // secondary (non-highlighted) bars
  track: string; // chart track rings + progress tracks
  spark: string; // sparkline area fill
  wash: string; // panel inner tint gradient
  halo: number; // glow opacity multiplier behind accents
}

const PALETTES: Record<'dark' | 'light', Palette> = {
  dark: {
    window:
      'linear-gradient(165deg, rgba(var(--grad-1, 94 184 255), 0.22), rgba(8, 14, 34, 0.96) 45%, rgba(8, 14, 34, 0.96) 60%, rgba(var(--grad-2, 94 184 255), 0.22))',
    panel: 'rgba(15, 25, 56, 0.92)',
    stroke: 'rgba(var(--grad-1, 94 184 255), 0.24)',
    text: 'rgba(226, 240, 255, 0.94)',
    text2: 'rgba(148, 197, 255, 0.55)',
    row: 'rgba(var(--grad-1, 94 184 255), 0.14)',
    green: '#34d399',
    greenBg: 'rgba(52, 211, 153, 0.16)',
    shadow: 'rgba(2, 6, 23, 0.4)',
    bars: 'rgba(var(--accent), 0.3)',
    track: 'rgba(var(--accent), 0.12)',
    spark: 'rgba(var(--accent), 0.18)',
    wash: 'linear-gradient(rgba(var(--accent), 0.18) 0%, rgba(var(--accent), 0.03) 55%, rgba(var(--accent), 0.1) 100%)',
    halo: 0.2,
  },
  light: {
    window:
      'linear-gradient(165deg, rgba(var(--grad-1, 94 184 255), 0.38), rgba(229, 236, 249, 0.96) 45%, rgba(229, 236, 249, 0.96) 60%, rgba(var(--grad-2, 94 184 255), 0.34))',
    panel: 'rgba(255, 255, 255, 0.96)',
    stroke: 'rgba(30, 58, 102, 0.16)',
    text: 'rgba(8, 20, 48, 0.95)',
    text2: 'rgba(30, 58, 102, 0.72)',
    row: 'rgba(var(--grad-1, 94 184 255), 0.24)',
    green: '#047857',
    greenBg: 'rgba(4, 120, 87, 0.14)',
    shadow: 'rgba(15, 40, 80, 0.3)',
    bars: 'rgba(var(--accent), 0.55)',
    track: 'rgba(var(--accent), 0.2)',
    spark: 'rgba(var(--accent), 0.28)',
    wash: 'linear-gradient(rgba(var(--accent), 0.22) 0%, rgba(var(--accent), 0.05) 55%, rgba(var(--accent), 0.13) 100%)',
    halo: 0.3,
  },
};

/* Accent helper — theme-neutral card accent color */
const accent = (opacity: number) => `rgba(var(--accent), ${opacity})`;

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

interface PrimProps {
  x: number;
  y: number;
  w: number;
  h: number;
  p: Palette;
  g: string;
}

/** Glass panel with gradient wash, drop shadow and inner depth */
function Panel({ x, y, w, h, p, g, children }: PrimProps & { children: ReactNode }) {
  return (
    <g>
      <rect x={x + 2} y={y + 6} width={w} height={h} rx={14} style={{ fill: p.shadow }} filter={`url(#${g}s)`} />
      <rect x={x} y={y} width={w} height={h} rx={14} style={{ fill: p.panel, stroke: p.stroke }} strokeWidth={1} />
      <rect x={x} y={y} width={w} height={h} rx={14} style={{ fill: p.wash }} />
      <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={26} rx={12.5} fill="url(#gloss)" opacity={0.4} />
      {children}
    </g>
  );
}

/** Floating accent chip (depth layer) */
function Chip({ x, y, label, g }: { x: number; y: number; label: string; g: string }) {
  const tw = label.length * 4.2 + 18;
  return (
    <g>
      <rect x={x} y={y} width={tw} height={18} rx={9} fill={`url(#${g})`} stroke="rgba(255,255,255,0.28)" strokeWidth={0.8} />
      <text x={x + tw / 2} y={y + 12.5} textAnchor="middle" fontSize={7.4} fontWeight={800} fill="#fff">
        {label}
      </text>
    </g>
  );
}

/** Vertical bars with a highlighted gradient last bar */
function Bars({
  x,
  y,
  w,
  h,
  heights,
  last = -1,
  p,
  g,
  blurId,
}: PrimProps & { heights: number[]; last?: number; blurId?: string }) {
  const n = heights.length;
  const bw = w / n - 3;
  return (
    <g>
      {heights.map((hv, i) => (
        <rect
          key={i}
          x={x + i * (w / n) + 1.5}
          y={y + h - (h * hv) / 100}
          width={bw}
          height={(h * hv) / 100}
          rx={3}
          style={{ fill: i === last ? `url(#${g})` : p.bars }}
        />
      ))}
      {blurId && (
        <rect
          x={x + (n - 1) * (w / n) + 1.5}
          y={y + h - (h * heights[n - 1]) / 100}
          width={bw}
          height={(h * heights[n - 1]) / 100}
          rx={3}
          style={{ fill: accent(1) }}
          opacity={0.4}
          filter={`url(#${blurId})`}
        />
      )}
    </g>
  );
}

/** Sparkline with gradient stroke + glowing end dot */
function Spark({ x, y, w, h, d, g, p }: PrimProps & { d: string }) {
  return (
    <g>
      <path d={`${d} L ${x + w} ${y + h} L ${x} ${y + h} Z`} style={{ fill: p.spark }} />
      <path d={d} fill="none" stroke={`url(#${g})`} strokeWidth={2.6} strokeLinecap="round" />
      <circle cx={x + w} cy={y + 4} r={3} style={{ fill: accent(1) }} />
      <circle cx={x + w} cy={y + 4} r={7} style={{ fill: accent(1) }} opacity={p.halo} />
    </g>
  );
}

/** Donut chart */
function Donut({
  x,
  y,
  r = 30,
  pct = 82,
  p,
  g,
  label,
}: {
  x: number;
  y: number;
  r?: number;
  pct?: number;
  p: Palette;
  g: string;
  label: string;
}) {
  const c = 2 * Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <g>
      <circle cx={x} cy={y} r={r + 10} style={{ fill: accent(1) }} opacity={p.halo} filter={`url(#${g}s)`} />
      <circle cx={x} cy={y} r={r} fill="none" style={{ stroke: p.track }} strokeWidth={9} />
      <circle
        cx={x}
        cy={y}
        r={r}
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth={9}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform={`rotate(-90 ${x} ${y})`}
      />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={13} fontWeight={900} style={{ fill: p.text }}>
        {pct}%
      </text>
      <text x={x} y={y + r + 11} textAnchor="middle" fontSize={6.2} fontWeight={700} letterSpacing={0.8} style={{ fill: p.text2 }}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/** Semicircular gauge */
function Gauge({
  x,
  y,
  r = 30,
  pct = 68,
  p,
  g,
  label,
}: {
  x: number;
  y: number;
  r?: number;
  pct?: number;
  p: Palette;
  g: string;
  label: string;
}) {
  const c = Math.PI * r;
  const off = c * (1 - pct / 100);
  return (
    <g>
      <circle cx={x} cy={y} r={r + 8} style={{ fill: accent(1) }} opacity={p.halo} filter={`url(#${g}s)`} />
      <path d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`} fill="none" style={{ stroke: p.track }} strokeWidth={10} strokeLinecap="round" />
      <path
        d={`M ${x - r} ${y} A ${r} ${r} 0 0 1 ${x + r} ${y}`}
        fill="none"
        stroke={`url(#${g})`}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
      />
      <text x={x} y={y + 5} textAnchor="middle" fontSize={14} fontWeight={900} style={{ fill: p.text }}>
        {pct}
      </text>
      <text x={x} y={y + r + 11} textAnchor="middle" fontSize={6.2} fontWeight={700} letterSpacing={0.8} style={{ fill: p.text2 }}>
        {label.toUpperCase()}
      </text>
    </g>
  );
}

/** Compact stat card with icon dot + gradient progress bar */
function StatCard({ x, y, w = 104, h = 70, label, value, p, g }: { x: number; y: number; w?: number; h?: number; label: string; value: string; p: Palette; g: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={12} style={{ fill: p.row, stroke: p.stroke }} strokeWidth={0.75} />
      <rect x={x + 1.5} y={y + 1.5} width={w - 3} height={20} rx={10.5} fill="url(#gloss)" opacity={0.3} />
      <circle cx={x + 17} cy={y + 17} r={7.5} fill={`url(#${g})`} />
      <circle cx={x + 17} cy={y + 17} r={11} style={{ fill: accent(1) }} opacity={p.halo} />
      <text x={x + 30} y={y + 20.5} fontSize={6.2} fontWeight={700} letterSpacing={0.6} style={{ fill: p.text2 }}>
        {label.toUpperCase()}
      </text>
      <text x={x + 14} y={y + 50} fontSize={19} fontWeight={900} letterSpacing={-0.6} style={{ fill: p.text }}>
        {value}
      </text>
      <rect x={x + 14} y={y + 58} width={w - 28} height={3.5} rx={1.75} style={{ fill: p.track }} />
      <rect x={x + 14} y={y + 58} width={(w - 28) * 0.72} height={3.5} rx={1.75} fill={`url(#${g})`} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Per-product scenes (viewBox 360×190)                                */
/* ------------------------------------------------------------------ */

interface SceneProps {
  g: string;
  p: Palette;
  blurId?: string;
  Icon?: LucideIcon;
}

function HireScene({ g, p, blurId }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <text x={62} y={68} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          NEW APPLICATIONS
        </text>
        <text x={62} y={106} fontSize={32} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          1,284
        </text>
        <rect x={62} y={116} width={46} height={16} rx={8} style={{ fill: p.greenBg }} />
        <text x={85} y={127} textAnchor="middle" fontSize={8} fontWeight={800} style={{ fill: p.green }}>
          +18%
        </text>
        <Bars x={62} y={132} w={150} h={34} heights={[100, 82, 64, 40]} last={3} p={p} g={g} blurId={blurId} />
      </Panel>
      <Chip x={212} y={52} label="Hiring pipeline" g={g} />
      <StatCard x={248} y={36} label="Interviews" value="312" p={p} g={g} />
      <StatCard x={248} y={116} label="Offers" value="42" p={p} g={g} />
    </g>
  );
}

function EduScene({ g, p }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <text x={62} y={62} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          ATTENDANCE
        </text>
        <Donut x={140} y={116} r={28} pct={82} p={p} g={g} label="This week" />
      </Panel>
      <Chip x={206} y={52} label="Live classrooms" g={g} />
      <StatCard x={248} y={36} label="Students" value="8,540" p={p} g={g} />
      <StatCard x={248} y={116} label="Avg Grade" value="A+" p={p} g={g} />
    </g>
  );
}

function FlowScene({ g, p }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <text x={62} y={64} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          ACTIVE WORKFLOWS
        </text>
        <text x={62} y={102} fontSize={32} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          1.2K
        </text>
        {[62, 106, 150].map((cx, i) => (
          <g key={cx}>
            <rect x={cx} y={116} width={36} height={46} rx={8} style={{ fill: i === 1 ? `url(#${g})` : p.row }} />
            <circle cx={cx + 9} cy={128} r={3.5} style={{ fill: i === 1 ? '#fff' : accent(0.45) }} />
            <rect x={cx + 6} y={136} width={24} height={5} rx={2.5} style={{ fill: i === 1 ? 'rgba(255,255,255,0.6)' : accent(0.3) }} />
            <rect x={cx + 6} y={146} width={17} height={5} rx={2.5} style={{ fill: i === 1 ? 'rgba(255,255,255,0.4)' : accent(0.12) }} />
          </g>
        ))}
        <path d="M100,139 l6,4 l-6,4 Z" style={{ fill: accent(0.45) }} />
        <path d="M144,139 l6,4 l-6,4 Z" style={{ fill: accent(0.45) }} />
      </Panel>
      <Chip x={206} y={52} label="Automations live" g={g} />
      <StatCard x={248} y={36} label="Modules" value="20+" p={p} g={g} />
      <StatCard x={248} y={116} label="Uptime" value="99.9%" p={p} g={g} />
    </g>
  );
}

function SecureScene({ g, p, Icon }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <rect x={62} y={60} width={52} height={52} rx={14} fill={`url(#${g})`} />
        <circle cx={88} cy={86} r={26} style={{ fill: accent(1) }} opacity={p.halo} filter={`url(#${g}s)`} />
        <svg x={72} y={70} width={32} height={32} viewBox="0 0 24 24">
          {Icon && <Icon size={32} stroke="#fff" strokeWidth={1.7} aria-hidden="true" />}
        </svg>
        <text x={128} y={76} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          ACTIVE THREATS
        </text>
        <text x={128} y={104} fontSize={30} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          0
        </text>
        <rect x={128} y={112} width={66} height={16} rx={8} style={{ fill: p.greenBg }} />
        <text x={161} y={123} textAnchor="middle" fontSize={7.6} fontWeight={800} style={{ fill: p.green }}>
          Protected
        </text>
        <rect x={62} y={134} width={160} height={8} rx={4} style={{ fill: p.track }} />
        <rect x={62} y={134} width={125} height={8} rx={4} fill={`url(#${g})`} />
        <text x={62} y={160} fontSize={6} fontWeight={700} letterSpacing={0.6} style={{ fill: p.text2 }}>
          SCANNING · 78%
        </text>
      </Panel>
      <Chip x={210} y={52} label="Threat feed" g={g} />
      <StatCard x={248} y={36} label="Compliance" value="100%" p={p} g={g} />
      <StatCard x={248} y={116} label="Monitoring" value="24/7" p={p} g={g} />
    </g>
  );
}

function CheckScene({ g, p }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <circle cx={132} cy={110} r={34} fill={`url(#${g})`} />
        <circle cx={132} cy={110} r={46} style={{ fill: accent(1) }} opacity={p.halo} filter={`url(#${g}s)`} />
        <path d="M112,110 l14,14 l26,-28" stroke="#fff" strokeWidth={7} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x={132} y={170} textAnchor="middle" fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          VERIFIED THIS WEEK
        </text>
      </Panel>
      <Chip x={206} y={52} label="100% pass rate" g={g} />
      <StatCard x={248} y={36} label="Verified" value="5,200" p={p} g={g} />
      <StatCard x={248} y={116} label="Avg Time" value="4.8s" p={p} g={g} />
    </g>
  );
}

function AddsScene({ g, p, blurId }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <text x={62} y={66} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          ROAS
        </text>
        <text x={62} y={102} fontSize={32} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          4.2×
        </text>
        <rect x={62} y={112} width={52} height={16} rx={8} style={{ fill: p.greenBg }} />
        <text x={88} y={123} textAnchor="middle" fontSize={8} fontWeight={800} style={{ fill: p.green }}>
          +28%
        </text>
        <Bars x={62} y={130} w={100} h={34} heights={[35, 55, 70, 85, 95]} last={4} p={p} g={g} blurId={blurId} />
        <Spark x={176} y={138} w={52} h={26} d="M176,158 L186,150 L196,154 L208,144 L220,148 L228,140" p={p} g={g} />
      </Panel>
      <Chip x={206} y={52} label="Live campaigns" g={g} />
      <StatCard x={248} y={36} label="Ad Spend" value="$82K" p={p} g={g} />
      <StatCard x={248} y={116} label="CTR" value="6.8%" p={p} g={g} />
    </g>
  );
}

function GreenScene({ g, p, Icon }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <Gauge x={126} y={116} r={28} pct={68} p={p} g={g} label="Carbon index" />
        <rect x={62} y={64} width={20} height={20} rx={6} fill={`url(#${g})`} />
        <svg x={67} y={69} width={10} height={10} viewBox="0 0 24 24">
          {Icon && <Icon size={10} stroke="#fff" strokeWidth={2} aria-hidden="true" />}
        </svg>
        <text x={92} y={72} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          CARBON FOOTPRINT
        </text>
        <text x={92} y={98} fontSize={28} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          −42%
        </text>
        <rect x={92} y={108} width={64} height={16} rx={8} style={{ fill: p.greenBg }} />
        <text x={124} y={119} textAnchor="middle" fontSize={7.6} fontWeight={800} style={{ fill: p.green }}>
          YoY
        </text>
      </Panel>
      <Chip x={206} y={52} label="ESG rating A" g={g} />
      <StatCard x={248} y={36} label="ESG Score" value="68" p={p} g={g} />
      <StatCard x={248} y={116} label="Target" value="Net 0" p={p} g={g} />
    </g>
  );
}

function HealthScene({ g, p }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <text x={62} y={64} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          PATIENTS SERVED
        </text>
        <text x={62} y={102} fontSize={32} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          1M+
        </text>
        <rect x={62} y={112} width={46} height={16} rx={8} style={{ fill: p.track }} />
        <text x={85} y={123} textAnchor="middle" fontSize={8} fontWeight={800} style={{ fill: accent(1) }}>
          All-time
        </text>
        <Spark x={62} y={132} w={160} h={34} d="M62,160 L80,152 L100,158 L116,142 L132,160 L148,146 L164,156 L182,148 L198,158 L214,150 L222,154" p={p} g={g} />
      </Panel>
      <Chip x={206} y={52} label="Live monitor" g={g} />
      <StatCard x={248} y={36} label="Bed Fill" value="92%" p={p} g={g} />
      <StatCard x={248} y={116} label="Avg Wait" value="4.2m" p={p} g={g} />
    </g>
  );
}

function Edu2Scene({ g, p, blurId }: SceneProps) {
  return (
    <g>
      <Panel x={46} y={36} w={192} h={148} p={p} g={g}>
        <text x={62} y={64} fontSize={6.5} fontWeight={700} letterSpacing={1} style={{ fill: p.text2 }}>
          STUDENTS IMPACTED
        </text>
        <text x={62} y={102} fontSize={32} fontWeight={900} letterSpacing={-1} style={{ fill: p.text }}>
          2M+
        </text>
        <rect x={62} y={112} width={46} height={16} rx={8} style={{ fill: p.greenBg }} />
        <text x={85} y={123} textAnchor="middle" fontSize={8} fontWeight={800} style={{ fill: p.green }}>
          +10%
        </text>
        <Bars x={62} y={130} w={94} h={34} heights={[50, 70, 85, 60, 92]} last={4} p={p} g={g} blurId={blurId} />
        <Donut x={204} y={146} r={22} pct={78} p={p} g={g} label="Pass" />
      </Panel>
      <Chip x={206} y={52} label="Semester live" g={g} />
      <StatCard x={248} y={36} label="Pass Rate" value="91%" p={p} g={g} />
      <StatCard x={248} y={116} label="Hours" value="1.4M" p={p} g={g} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Main component                                                      */
/* ------------------------------------------------------------------ */

const SCENES: Record<string, (props: SceneProps) => ReactNode> = {
  metahire: (props) => <HireScene {...props} />,
  abhyasa: (props) => <EduScene {...props} />,
  metaflow: (props) => <FlowScene {...props} />,
  metasecure: (props) => <SecureScene {...props} />,
  metacheck: (props) => <CheckScene {...props} />,
  metaadds: (props) => <AddsScene {...props} />,
  metagreen: (props) => <GreenScene {...props} />,
  metahealth: (props) => <HealthScene {...props} />,
  metaedu: (props) => <Edu2Scene {...props} />,
};

const DefaultScene = (props: SceneProps) => <HireScene {...props} />;

interface ProductMockupProps {
  id: string;
  name: string;
  icon: LucideIcon;
  screenshotUrl?: string;
}

export function ProductMockup({ id, name, icon: Icon, screenshotUrl }: ProductMockupProps) {
  const gid = useId();
  const grad = gid.replace(/[^a-zA-Z0-9]/g, '');
  const { theme } = useTheme();
  const p = PALETTES[theme];

  if (screenshotUrl) {
    return (
      <div className={styles.mockupWrap}>
        <img src={screenshotUrl} alt="" className={styles.mockupImage} />
      </div>
    );
  }

  const Scene = SCENES[id] ?? DefaultScene;

  return (
    <div className={styles.mockupWrap} aria-hidden="true">
      <svg className={styles.mockupImage} viewBox="0 0 360 190" role="img" aria-label={`${name} dashboard preview`}>
        <defs>
          <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: 'rgb(var(--grad-1))' }} />
            <stop offset="100%" style={{ stopColor: 'rgb(var(--grad-2))' }} />
          </linearGradient>
          <linearGradient id="gloss" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.14)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </linearGradient>
          <filter id={`${grad}s`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        {/* Window */}
        <rect x="0" y="0" width="360" height="190" rx="14" style={{ fill: p.window, stroke: p.stroke }} strokeWidth="1" />

        {/* Chrome bar */}
        <circle cx="19" cy="14" r="4" fill="#fb7185" />
        <circle cx="36" cy="14" r="4" fill="#fbbf24" />
        <circle cx="53" cy="14" r="4" fill="#34d399" />
        <rect x="70" y="7" width="196" height="18" rx="9" style={{ fill: p.row }} />
        <rect x="82" y="12.5" width="6" height="4.4" rx="1.2" style={{ fill: p.text2 }} />
        <path d="M84,12.5 V10.8 a2,2 0 0 1 4,0 V12.5" style={{ stroke: p.text2 }} strokeWidth="1.2" fill="none" />
        <text x="93" y="19.5" fontSize="7.6" fontWeight={600} style={{ fill: p.text2 }}>
          app.{name.toLowerCase()}.metadev.io
        </text>
        <circle cx="318" cy="14" r="3.4" style={{ fill: p.text2 }} />
        <circle cx="338" cy="18" r="10" fill={`url(#${grad})`} />
        <text x="338" y="21.5" textAnchor="middle" fontSize="6.8" fontWeight={800} fill="#fff">
          {name.slice(0, 1)}
        </text>

        {/* Sidebar */}
        <rect x="0" y="30" width="38" height="160" style={{ fill: p.panel }} />
        <rect x="37" y="30" width="1" height="160" style={{ fill: p.stroke }} opacity={0.6} />
        {[48, 72, 96, 120, 144].map((ty, i) => (
          <g key={ty}>
            <rect x="11" y={ty} width="16" height="16" rx="5" style={{ fill: i === 0 ? `url(#${grad})` : p.row }} />
            <circle cx="19" cy={ty + 8} r="2.8" style={{ fill: i === 0 ? '#fff' : accent(0.45) }} />
          </g>
        ))}
        <rect x="0" y="46" width="3.5" height="16" rx="1.75" fill={`url(#${grad})`} />
        <circle cx="19" cy="176" r="4" style={{ fill: p.row }} />

        {/* Scene */}
        <Scene g={grad} p={p} blurId={`${grad}s`} Icon={Icon} />
      </svg>
    </div>
  );
}
