'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';
import clsx from 'clsx';
import Logo from '../Logo/Logo';

export default function HeaderClient() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        
        <nav className={styles.nav}>
          <Logo />
          <Link
            href="/"
            className={clsx(styles.link, pathname === '/' && styles.active)}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={clsx(
              styles.link,
              pathname.startsWith('/catalog') && styles.active
            )}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}