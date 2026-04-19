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
      <div className = 'container'>
        <nav className={styles.nav}>
          <Logo />
      <ul className={styles.list}>
          <li className={styles.item}>
          <Link
            href="/"
            className={clsx(styles.link, pathname === '/' && styles.active)}
          >
            Home
          </Link></li>
<li className={styles.item}>
          <Link
            href="/catalog"
            className={clsx(
              styles.link,
              pathname.startsWith('/catalog') && styles.active
            )}
          >
            Catalog
          </Link></li></ul>
        </nav>
      </div>
    </header>
  );
}