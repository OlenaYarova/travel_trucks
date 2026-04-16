import Link from 'next/link';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link href="/" className={styles.logo}>
      <svg
        width="136"
        height="16"
        aria-label="TravelTrucks"
        className={styles.logo}
      >
        <use href="/logo/logo.svg" />
      </svg>
    </Link>
  );
}