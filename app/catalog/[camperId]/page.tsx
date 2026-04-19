import {
  FiMapPin,
  FiStar,
} from 'react-icons/fi';
import { notFound } from 'next/navigation';

import { BookingForm } from '@/components/BookingForm/BookingForm';
import { CamperGallery } from '@/components/CamperGallery/CamperGallery';
import { ReviewsList } from '@/components/ReviewsList/ReviewsList';
import { StarRating } from '@/components/StarRating/StarRating';
import { getCamperById, getReviewsByCamperId } from '@/lib/api/clientApi';

import styles from './page.module.css';

type CamperDetailsPageProps = {
  params: Promise<{
    camperId: string;
  }>;
};

const formLabels: Record<string, string> = {
  alcove: 'Alcove',
  panel_van: 'Panel truck',
  integrated: 'Integrated',
  semi_integrated: 'Semi integrated',
};

const featureLabels: Record<string, string> = {
  ac: 'AC',
  bathroom: 'Bathroom',
  kitchen: 'Kitchen',
  tv: 'TV',
  radio: 'Radio',
  refrigerator: 'Refrigerator',
  microwave: 'Microwave',
  gas: 'Gas',
  water: 'Water',
};

export default async function CamperDetailsPage({
  params,
}: CamperDetailsPageProps) {
  const { camperId } = await params;
  const [camper, reviews] = await Promise.all([
    getCamperById(camperId).catch(() => null),
    getReviewsByCamperId(camperId).catch(() => []),
  ]);

  if (!camper) {
    notFound();
  }

  const features = camper.amenities
    .filter((amenity) => amenity in featureLabels)
    .map((amenity) => [amenity, featureLabels[amenity]] as const);

  return (
    <main className={styles.page}>
      <div className={`container ${styles.shell}`}>
        <section className={styles.topSection}>
          <CamperGallery images={camper.gallery} title={camper.name} />
        </section>

        <section className={styles.summaryCard}>
          <div className={styles.topMeta}>
            <div>
              <h1 className={styles.title}>{camper.name}</h1>

              <div className={styles.inlineMeta}>
                <span className={styles.inlineMetaItem}>
                  <span className={styles.ratingWrap}>
                    <FiStar className={styles.metaIcon} />
                    <StarRating rating={camper.rating} />
                  </span>
                  <span>{camper.rating.toFixed(1)}({camper.totalReviews ?? 0} Reviews)</span>
                </span>
                <span className={styles.inlineMetaItem}>
                  <FiMapPin className={styles.metaIcon} />
                  <span>{camper.location}</span>
                </span>
              </div>
            </div>

            <p className={styles.price}>EUR {camper.price.toFixed(2)}</p>
          </div>

          <p className={styles.description}>{camper.description}</p>

          <div className={styles.specCard}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}> {camper.transmission} </li>
              {features.slice(0, 5).map(([featureKey, label]) => (
                <li key={featureKey} className={styles.featureItem}>
                  {label}
                </li>
              ))}
              <li className={styles.featureItem}> {formLabels[camper.form] ?? camper.form} </li>
            </ul>

            <dl className={styles.specList}>
              <div>
                <dt>Form</dt>
                <dd>{formLabels[camper.form] ?? camper.form}</dd>
              </div>
              <div>
                <dt>Length</dt>
                <dd>{camper.length}</dd>
              </div>
              <div>
                <dt>Width</dt>
                <dd>{camper.width}</dd>
              </div>
              <div>
                <dt>Height</dt>
                <dd>{camper.height}</dd>
              </div>
              <div>
                <dt>Tank</dt>
                <dd>{camper.tank}</dd>
              </div>
              <div>
                <dt>Consumption</dt>
                <dd>{camper.consumption}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className={styles.bottomSection}>
          <div className={styles.reviewsPane}>
            <ReviewsList reviews={reviews} />
          </div>
          <div className={styles.bookingPane}>
            <BookingForm camperName={camper.name} />
          </div>
        </section>
      </div>
    </main>
  );
}
