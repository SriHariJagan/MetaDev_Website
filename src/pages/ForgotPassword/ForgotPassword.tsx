// ForgotPassword.tsx — reset password request page (super-admin only)
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Field } from '@/pages/Login/Login';
import loginStyles from '../Login/Login.module.css';
import styles from './ForgotPassword.module.css';

export function ForgotPasswordPage() {
  return (
    <div className={loginStyles.page}>
      <div className={styles.card}>
        <div className={styles.head}>
          <h1 className={styles.title}>Forgot your password?</h1>
          <p className={styles.sub}>
            Enter your work email and we&apos;ll send you a secure link to reset your password.
          </p>
        </div>

        <motion.form
          className={styles.form}
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <Field icon={Mail} label="Work email" type="email" autoComplete="email" />
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
  );
}

export default ForgotPasswordPage;
