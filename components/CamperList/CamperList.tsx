import type { Camper } from '@/types/camper';

import { CamperCard } from '@/components/CamperCard/CamperCard';

import styles from './CamperList.module.css';

type CamperListProps = {
  campers: Camper[];
};

export function CamperList({ campers }: CamperListProps) {
  if (campers.length === 0) {
    return <p className={styles.empty}>No campers found.</p>;
  }

  return (
    <ul className={styles.list}>
      {campers.map((camper) => (
        <li key={camper.id}>
          <CamperCard camper={camper} />
        </li>
      ))}
    </ul>
  );
}
