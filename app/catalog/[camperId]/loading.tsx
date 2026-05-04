import Loader from '@/components/Loader/Loader';

import styles from './page.module.css';

export default function CamperDetailsLoading() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.shell}`}>
        <Loader label="Loading camper details..." />
      </div>
    </main>
  );
}
