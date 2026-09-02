// ForgotPassword.tsx — reset password request page (super-admin only)
import { SEO } from '@/seo/SEO';
import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, KeyRound, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '@/services/api';
import { BrandPanel } from '../Login/Login';
import loginStyles from '../Login/Login.module.css';
import styles from './ForgotPassword.module.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    try {
      await authApi.forgotPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Failed to send reset link. Try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO />
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

          {success ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-3 py-8"
            >
              <CheckCircle size={48} className="text-green-500" />
              <p className="text-sm text-[var(--color-text-secondary)] text-center">Check your email for the reset link.</p>
              <Link to="/login" className={loginStyles.submit}>
                Back to sign in
              </Link>
            </motion.div>
          ) : (
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

              {error && <p className="text-sm text-red-500 text-center">{error}</p>}

              <button type="submit" className={loginStyles.submit} disabled={isLoading}>
                {isLoading ? 'Sending…' : 'Send reset link'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>

              <p className={styles.note}>The link expires in 30 minutes.</p>
            </motion.form>
          )}

          <Link to="/login" className={styles.back}>
            <ArrowLeft size={14} aria-hidden="true" />
            Back to sign in
          </Link>
        </div>
      </div>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
