import Image from 'next/image';
import Link from 'next/link';
import { FiDroplet, FiMapPin, FiSettings, FiStar, FiTruck } from 'react-icons/fi';

import type { Camper } from '@/types/camper';

import styles from './CamperCard.module.css';

type CamperCardProps = {
  camper: Camper;
};

const formLabels: Record<string, string> = {
  alcove: 'Alcove',
  panel_van: 'Panel Van',
  integrated: 'Integrated',
  semi_integrated: 'Semi Integrated',
};

export function CamperCard({ camper }: CamperCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <Image
          className={styles.image}
          src={camper.coverImage ?? camper.gallery[0]?.thumb ?? '/image/hero_2.jpg'}
          alt={camper.name}
          fill
          sizes="292px"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.heading}>
          <h2 className={styles.title}>{camper.name}</h2>
          <p className={styles.price}>EUR {camper.price.toFixed(2)}</p>
        </div>

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <FiStar className={styles.metaIcon} />
            {camper.rating.toFixed(1)}({camper.totalReviews ?? 0} Reviews)
          </span>
          <span className={styles.metaItem}>
            <FiMapPin className={styles.metaIcon} />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.tags}>
          <li className={styles.tag}>
            <FiTruck className={styles.tagIcon} />
            {formLabels[camper.form] ?? camper.form}
          </li>
          <li className={styles.tag}>
            <FiDroplet className={styles.tagIcon} />
            {camper.engine}
          </li>
          <li className={styles.tag}>
            <FiSettings className={styles.tagIcon} />
            {camper.transmission}
          </li>
          <li className={styles.tag}>
            <FiDroplet className={styles.tagIcon} />
            {camper.consumption}
          </li>
          {camper.amenities.slice(0, 2).map((amenity) => (
            <li key={amenity} className={styles.tag}>
              {amenity}
            </li>
          ))}
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
