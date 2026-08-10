import { Construction } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './PagePlaceholder.module.css';

export interface PageAction {
  label: string;
  to: string;
}

interface PagePlaceholderProps {
  title: string;
  description: string;
  action?: PageAction;
}

export function PagePlaceholder({ title, description, action }: PagePlaceholderProps) {
  return (
    <section className={styles.placeholder}>
      <span className={styles.icon} aria-hidden="true">
        <Construction size={28} />
      </span>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{description}</p>
      {action && (
        <Link to={action.to} className={styles.action}>
          {action.label}
        </Link>
      )}
    </section>
  );
}
