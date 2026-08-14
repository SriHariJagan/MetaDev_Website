// Login.tsx — MeteDev super-admin sign in page
import { useState } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Fingerprint,
  Globe,
  Lock,
  Mail,
  Radar,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GradientText } from '@/components/common/GradientText';
import { cn } from '@/utils/cn';
import styles from './Login.module.css';

const FLOATERS: ReadonlyArray<{ icon: LucideIcon; label: string }> = [
  { icon: ShieldCheck, label: 'Compliance' },
  { icon: Zap, label: 'Automations' },
  { icon: Lock, label: 'AES-256' },
  { icon: CheckCircle2, label: 'Verified' },
  { icon: Sparkles, label: 'AI-assisted' },
  { icon: Radar, label: 'Live scans' },
];

export interface FieldProps {
  icon: LucideIcon;
  label: string;
  type?: string;
  autoComplete?: string;
  toggle?: boolean;
}

export function Field({ icon: Icon, label, type = 'text', autoComplete, toggle }: FieldProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <div
      className={cn(
        styles.field,
        focused && styles.fieldFocused,
        value.length > 0 && styles.fieldFilled,
      )}
    >
      <span className={styles.fieldIcon}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <input
        type={toggle ? (show ? 'text' : 'password') : type}
        className={styles.fieldInput}
        placeholder=" "
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label className={styles.fieldLabel}>{label}</label>
      {toggle && (
        <button
          type="button"
          className={styles.fieldToggle}
          aria-label={show ? 'Hide password' : 'Show password'}
          onClick={() => setShow((s) => !s)}
        >
          {show ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      )}
    </div>
  );
}

function BrandCard() {
  return (
    <aside className={styles.brandCard}>
      <div className={styles.brandGlowA} aria-hidden="true" />
      <div className={styles.brandGlowB} aria-hidden="true" />
      <div className={styles.brandGrid} aria-hidden="true" />
      <div className={styles.brandDots} aria-hidden="true" />

      {FLOATERS.map(({ icon: Icon, label }, index) => (
        <span
          key={label}
          className={cn(styles.chip, styles[`chip${index + 1}`])}
          aria-hidden="true"
        >
          <span className={styles.chipIcon}>
            <Icon size={14} />
          </span>
          {label}
        </span>
      ))}
      <span className={cn(styles.bubble, styles.bubbleA)} aria-hidden="true">
        <Fingerprint size={16} />
      </span>
      <span className={cn(styles.bubble, styles.bubbleB)} aria-hidden="true">
        <Globe size={16} />
      </span>

      <div className={styles.brandTop}>
        <span className={styles.brandMark}>MD</span>
        <span className={styles.brandName}>metadev</span>
      </div>

      <div className={styles.brandBody}>
        <h2 className={styles.brandTitle}>
          One workspace for <GradientText>verification, hiring and growth.</GradientText>
        </h2>
        <p className={styles.brandCopy}>
          Sign in to manage MetaCheck, MetaHire, MetaAdds and the rest of the MeteDev suite from a
          single secure dashboard.
        </p>
      </div>

      <div className={styles.brandStats}>
        <div className={styles.brandStat}>
          <strong>99.2%</strong>
          <span>Uptime SLA</span>
        </div>
        <div className={styles.brandStat}>
          <strong>400+</strong>
          <span>Teams onboard</span>
        </div>
        <div className={styles.brandStat}>
          <strong>24/7</strong>
          <span>Global support</span>
        </div>
      </div>

      <div className={styles.brandSuite} aria-hidden="true">
        {['MetaCheck', 'MetaHire', 'MetaAdds', 'MetaFlow', 'MetaHealth', 'MetaEdu'].map((name) => (
          <span key={name} className={styles.brandSuiteItem}>
            {name}
          </span>
        ))}
      </div>
    </aside>
  );
}

export function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageGlowA} aria-hidden="true" />
      <div className={styles.pageGlowB} aria-hidden="true" />

      <div className={styles.shell}>
        <BrandCard />

        <section className={styles.formCard}>
          <div className={styles.formHead}>
            <h1 className={styles.formTitle}>Welcome back</h1>
            <p className={styles.formSub}>Sign in to your MeteDev workspace.</p>
          </div>

          <motion.form
            className={styles.form}
            onSubmit={(e) => e.preventDefault()}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Field icon={Mail} label="Work email" type="email" autoComplete="email" />
            <Field
              icon={Lock}
              label="Password"
              type="password"
              autoComplete="current-password"
              toggle
            />

            <div className={styles.formRow}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className={styles.forgot}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={styles.submit}>
              Sign in
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </motion.form>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
