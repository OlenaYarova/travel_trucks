import Link from 'next/link';
import styles from './Logo.module.css';
import Image from 'next/image';
export default function Logo() {
  return (
    <Link href="/" className={styles.link}>
      {/* <svg
        width="136"
        height="16"
        aria-label="TravelTrucks"
              className={styles.logo}
              aria-hidden="true"
      >
        <use href="/logo/logo.svg" />
      </svg> */}
      <Image
        src="/logo/Logo.svg"
        alt="TravelTrucks logo"
        width={136}
        height={16}
        priority
      />
    </Link>
  );
}
