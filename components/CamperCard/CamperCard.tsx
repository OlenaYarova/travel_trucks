import Link from 'next/link';

import type { Camper } from '@/types/camper';

import styles from './CamperCard.module.css';

type CamperCardProps = {
  camper: Camper;
};

export function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={camper.gallery[0] ?? '/image/hero_2.jpg'}
          alt={camper.name}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{camper.name}</h2>
          <p className={styles.price}>EUR {camper.price.toFixed(2)}</p>
        </div>

        <div className={styles.meta}>
          <span>Rating {camper.rating}</span>
          <span>{camper.location}</span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.tags}>
          <li className={styles.tag}>{camper.form}</li>
          <li className={styles.tag}>{camper.engine}</li>
          <li className={styles.tag}>{camper.transmission}</li>
          <li className={styles.tag}>{camper.consumption}</li>
        </ul>

        <Link
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noreferrer"
          className={styles.button}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
