import styles from './PageLoader.module.css';

export function PageLoader() {
  return (
    <div className={styles.loader} role="status" aria-label="Loading">
      <span className={styles.spinner} />
    </div>
  );
}
