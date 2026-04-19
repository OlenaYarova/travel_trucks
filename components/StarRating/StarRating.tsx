import styles from './StarRating.module.css';

type StarRatingProps = {
  rating: number;
  max?: number;
};

export function StarRating({ rating, max = 5 }: StarRatingProps) {
  const filledStars = Math.round(rating);

  return (
    <span className={styles.stars} aria-label={`Rating ${rating} out of ${max}`}>
      {Array.from({ length: max }, (_, index) => (
        <span
          key={index}
          className={index < filledStars ? styles.filled : styles.empty}
        >
          ★
        </span>
      ))}
    </span>
  );
}
