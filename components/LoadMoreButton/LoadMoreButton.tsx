import styles from './LoadMoreButton.module.css';

type LoadMoreButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function LoadMoreButton({
  onClick,
  disabled = false,
  loading = false,
}: LoadMoreButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? 'Loading...' : 'Load more'}
    </button>
  );
}
