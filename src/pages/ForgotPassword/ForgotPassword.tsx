// ForgotPassword.tsx — reset password request page (super-admin only)
import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, KeyRound, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BrandPanel } from '../Login/Login';
import loginStyles from '../Login/Login.module.css';
import styles from './ForgotPassword.module.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={loginStyles.page}>
      <BrandPanel />

      <div className={loginStyles.rightPanel}>
        <div className={loginStyles.card}>
          <div className={loginStyles.cardHeader}>
            <span className={loginStyles.portalIcon}>
              <KeyRound size={22} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h2 className={loginStyles.portalTitle}>Reset Password</h2>
          </div>

          <h1 className={loginStyles.formTitle}>Forgot your password?</h1>
          <p className={loginStyles.formSub}>
            Enter your work email and we&apos;ll send you a secure link to reset it.
          </p>

          <motion.form
            className={loginStyles.form}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className={loginStyles.field}>
              <label htmlFor="reset-email" className={loginStyles.fieldLabel}>
                Work email
              </label>
              <div className={loginStyles.inputWrap}>
                <Mail size={17} strokeWidth={1.75} className={loginStyles.inputIcon} aria-hidden="true" />
                <input
                  id="reset-email"
                  type="email"
                  required
                  placeholder="you@metadev.in"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  className={loginStyles.input}
                />
              </div>
            </div>

            <button type="submit" className={loginStyles.submit}>
              Send reset link
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <p className={styles.note}>The link expires in 30 minutes.</p>
          </motion.form>

          <Link to="/login" className={styles.back}>
            <ArrowLeft size={14} aria-hidden="true" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
