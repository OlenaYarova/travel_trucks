import Image from 'next/image';
import Link from 'next/link';
import { CiMap } from 'react-icons/ci';
import { FaCar } from 'react-icons/fa';
import { RiGasStationLine } from 'react-icons/ri';
import { TbAutomaticGearbox } from 'react-icons/tb';

import { StarRating } from '@/components/StarRating/StarRating';
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
            <StarRating rating={1} max={1} />
            {camper.rating.toFixed(1)}({camper.totalReviews ?? 0} Reviews)
          </span>
          <span className={styles.metaItem}>
            <CiMap className={styles.metaIcon} />
            {camper.location}
          </span>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <ul className={styles.tags}>
          <li className={styles.tag}>
            <RiGasStationLine className={styles.tagIcon} />
            {camper.engine}
          </li>
          <li className={styles.tag}>
            <TbAutomaticGearbox className={styles.tagIcon} />
            {camper.transmission}
          </li>
          <li className={styles.tag}>
            <FaCar className={styles.tagIcon} />
            {formLabels[camper.form] ?? camper.form}
          </li>
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
