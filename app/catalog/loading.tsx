import Loader from '@/components/Loader/Loader';

import styles from './Catalog.module.css';

export default function CatalogLoading() {
  return (
    <main className={styles.main}>
      <div className={`container ${styles.layout}`}>
        <section className={styles.content}>
          <Loader label="Loading campers..." />
        </section>
      </div>
    </main>
  );
}
