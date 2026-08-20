// Login.tsx — MetaDev admin portal sign in page
import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  Brain,
  CloudUpload,
  Code2,
  Database,
  Eye,
  EyeOff,
  GraduationCap,
  Handshake,
  HeartPulse,
  Lock,
  Mail,
  Settings,
  ShieldCheck,
  ShieldUser,
  Users,
  Wind,
} from 'lucide-react';
import styles from './Login.module.css';

const SCATTER_ICONS = [
  { icon: CloudUpload, className: styles.icon1 },
  { icon: Users, className: styles.icon2 },
  { icon: ShieldCheck, className: styles.icon3 },
  { icon: BarChart3, className: styles.icon4 },
  { icon: Brain, className: styles.icon5 },
  { icon: HeartPulse, className: styles.icon6 },
  { icon: Lock, className: styles.icon7 },
  { icon: Settings, className: styles.icon8 },
  { icon: Code2, className: styles.icon9 },
  { icon: Database, className: styles.icon10 },
  { icon: Handshake, className: styles.icon11 },
  { icon: Wind, className: styles.icon12 },
  { icon: GraduationCap, className: styles.icon13 },
];

const BUILDINGS = [38, 58, 44, 72, 50, 90, 60, 100, 68, 84, 52, 96, 46, 66, 40, 56, 76, 48];

const RAYS = [
  { x: 40, color: 'var(--navbar-accent-start)' },
  { x: 130, color: 'var(--navbar-accent-end)' },
  { x: 230, color: '#c084fc' },
  { x: 300, color: 'var(--navbar-accent-start)' },
  { x: 370, color: '#f472b6' },
  { x: 470, color: 'var(--navbar-accent-end)' },
  { x: 560, color: 'var(--navbar-accent-start)' },
];

function Skyline() {
  return (
    <div className={styles.skyline} aria-hidden="true">
      <svg className={styles.skylineSvg} viewBox="0 0 600 170" preserveAspectRatio="none">
        <defs>
          {RAYS.map((ray, i) => (
            <linearGradient key={i} id={`ray-${i}`} x1={ray.x} y1="170" x2="300" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor={ray.color} stopOpacity="0.65" />
              <stop offset="100%" stopColor={ray.color} stopOpacity="0" />
            </linearGradient>
          ))}
          <pattern id="windows" width="6" height="7" patternUnits="userSpaceOnUse">
            <rect x="0.5" y="0.5" width="2.4" height="3" className={styles.window} />
          </pattern>
        </defs>

        {RAYS.map((ray, i) => (
          <line key={i} x1={ray.x} y1="170" x2="300" y2="55" stroke={`url(#ray-${i})`} strokeWidth="1.6" />
        ))}

        {BUILDINGS.map((h, i) => {
          const w = 600 / BUILDINGS.length;
          const x = i * w;
          const top = 100 - h;
          return (
            <g key={i}>
              <rect x={x + 1} y={top} width={w - 2} height={h} className={styles.building} />
              <rect x={x + 1} y={top} width={w - 2} height={h} fill="url(#windows)" />
            </g>
          );
        })}

        <rect x="0" y="98" width="600" height="2" className={styles.groundLine} />
      </svg>
    </div>
  );
}

const ORBIT_NODES = [
  { angle: -30, ring: 1 },
  { angle: 70, ring: 1 },
  { angle: 160, ring: 1 },
  { angle: 210, ring: 1 },
  { angle: 20, ring: 2 },
  { angle: 110, ring: 2 },
  { angle: 250, ring: 2 },
  { angle: 320, ring: 2 },
];

const STARS = [
  { x: 60, y: 90, delay: 0 },
  { x: 340, y: 70, delay: 0.6 },
  { x: 370, y: 240, delay: 1.2 },
  { x: 50, y: 300, delay: 1.8 },
  { x: 150, y: 40, delay: 2.4 },
  { x: 290, y: 360, delay: 0.3 },
  { x: 30, y: 200, delay: 1.5 },
  { x: 380, y: 150, delay: 2.1 },
];

function BrandOrbit() {
  const cx = 210;
  const cy = 210;
  const radii = [80, 140, 195];

  return (
    <svg className={styles.orbitGraphic} viewBox="0 0 420 420" aria-hidden="true">
      <defs>
        <pattern id="orbitDots" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" className={styles.mapDot} />
        </pattern>
        <radialGradient id="orbitFade" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="72%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="orbitMask">
          <circle cx={cx} cy={cy} r={radii[2]} fill="url(#orbitFade)" />
        </mask>
        <linearGradient id="orbitRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4bf" />
          <stop offset="50%" stopColor="var(--navbar-accent-end)" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--navbar-accent-start)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--navbar-accent-start)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx={cx} cy={cy} r={radii[2] + 4} className={styles.orbitDotField} fill="url(#orbitDots)" mask="url(#orbitMask)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r="2"
          className={styles.orbitStar}
          style={{ animationDelay: `${s.delay}s` }}
        />
      ))}

      <g className={styles.orbitRings}>
        {radii.map((r) => (
          <circle key={r} cx={cx} cy={cy} r={r} />
        ))}
      </g>

      <g className={styles.orbitCross}>
        <line x1={cx} y1={cy - radii[2]} x2={cx} y2={cy + radii[2]} />
        <line x1={cx - radii[2]} y1={cy} x2={cx + radii[2]} y2={cy} />
      </g>

      <g className={styles.orbitSpinA} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {ORBIT_NODES.filter((n) => n.ring === 1).map(({ angle }, i) => {
          const r = radii[1];
          const rad = (angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r={3.5} className={styles.orbitNode} />;
        })}
        <circle cx={cx + radii[1]} cy={cy} r="5" className={styles.orbitComet} />
        <path
          d={`M ${cx + radii[1]} ${cy} A ${radii[1]} ${radii[1]} 0 0 0 ${cx + radii[1] * Math.cos(Math.PI / 3)} ${cy - radii[1] * Math.sin(Math.PI / 3)}`}
          className={styles.orbitTrail}
        />
      </g>

      <g className={styles.orbitSpinB} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {ORBIT_NODES.filter((n) => n.ring === 2).map(({ angle }, i) => {
          const r = radii[2];
          const rad = (angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cy + r * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r={3} className={styles.orbitNode} />;
        })}
        <circle cx={cx} cy={cy - radii[2]} r="4.5" className={styles.orbitComet} />
      </g>

      <circle cx={cx} cy={cy} r="34" className={styles.orbitCoreGlow} />

      <circle cx={cx} cy={cy} r="8" className={styles.orbitCore} />
    </svg>
  );
}

/* logo-lightmode.png is 571x437; these boxes isolate the hex mark and the
   "MD" letters from the raster asset so they can sit beside live HTML text. */
const LOGO_SRC = '/logo-lightmode.png';
const LOGO_W = 571;
const LOGO_H = 437;

function CroppedLogo({
  box: [x0, y0, x1, y1],
  height,
  className,
}: {
  box: [number, number, number, number];
  height: number;
  className?: string;
}) {
  const scale = height / (y1 - y0);
  const width = (x1 - x0) * scale;
  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        position: 'relative',
        width,
        height,
        overflow: 'hidden',
      }}
    >
      <img
        src={LOGO_SRC}
        alt=""
        draggable={false}
        style={{
          position: 'absolute',
          top: -y0 * scale,
          left: -x0 * scale,
          width: LOGO_W * scale,
          height: LOGO_H * scale,
          maxWidth: 'none',
        }}
      />
    </span>
  );
}

export function BrandPanel() {
  return (
    <aside className={styles.leftPanel}>
      <div className={styles.orbitGlow} aria-hidden="true" />
      <BrandOrbit />

      <div className={styles.iconField} aria-hidden="true">
        {SCATTER_ICONS.map(({ icon: Icon, className }, i) => (
          <span key={i} className={`${styles.floatIcon} ${className}`}>
            <Icon size={28} strokeWidth={1.5} />
          </span>
        ))}
      </div>

      <div className={styles.leftContent}>
        <div className={styles.lockup}>
          <CroppedLogo box={[0, 25, 195, 412]} height={92} className={styles.lockupHex} />
          <CroppedLogo box={[195, 118, 512, 295]} height={64} className={styles.lockupLetters} />
          <span className={styles.lockupDivider} aria-hidden="true" />
          <span className={styles.lockupWord}>
            metadev
            <small>Building Digital Bharat</small>
          </span>
        </div>

        <h1 className={styles.leftTitle}>Powering Digital Transformation</h1>
        <p className={styles.leftSub}>
          Enabling innovation, empowering businesses, and building a smarter, connected Bharat.
        </p>
      </div>

      <Skyline />
    </aside>
  );
}

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <div className={styles.page}>
      <BrandPanel />

      <div className={styles.rightPanel}>
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.portalIcon}>
              <ShieldUser size={24} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className={styles.portalTitle}>Admin Portal</h2>
          </div>

          <h1 className={styles.formTitle}>Welcome back</h1>
          <p className={styles.formSub}>Sign in to manage your MetaDev ecosystem</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email" className={styles.fieldLabel}>
                Email address
              </label>
              <div className={styles.inputWrap}>
                <Mail size={17} strokeWidth={1.75} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@metadev.in"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="password" className={styles.fieldLabel}>
                Password
              </label>
              <div className={styles.inputWrap}>
                <Lock size={17} strokeWidth={1.75} className={styles.inputIcon} aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.toggleBtn}
                  onClick={() => setShowPassword((show) => !show)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>
            </div>

            <div className={styles.formRow}>
              <label className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgot}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.submit} disabled={isLoading}>
              {isLoading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p className={styles.cardFooter}>© {new Date().getFullYear()} MetaDev. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
