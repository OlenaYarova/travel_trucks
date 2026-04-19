import type { Review } from '@/types/camper';

import { StarRating } from '@/components/StarRating/StarRating';

import styles from './ReviewsList.module.css';

type ReviewsListProps = {
  reviews: Review[];
};

export function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Reviews</h2>

      {reviews.length === 0 ? (
        <p className={styles.empty}>No reviews yet.</p>
      ) : (
        <ul className={styles.list}>
          {reviews.map((review, index) => (
            <li
              key={`${review.reviewer_name}-${review.comment}-${index}`}
              className={styles.card}
            >
              <div className={styles.header}>
                <div className={styles.person}>
                  <span className={styles.avatar}>
                    {review.reviewer_name.charAt(0).toUpperCase()}
                  </span>
                  <div>
                  <p className={styles.name}>{review.reviewer_name}</p>
                  <div className={styles.rating}>
                    <StarRating rating={review.reviewer_rating} />
                  </div>
                  </div>
                </div>
              </div>

              <p className={styles.comment}>{review.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
