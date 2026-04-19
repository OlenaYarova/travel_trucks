import styles from './Loader.module.css';

type LoaderProps = {
  label?: string;
};

export default function Loader({
  label = 'Завантаження...',
}: LoaderProps) {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
