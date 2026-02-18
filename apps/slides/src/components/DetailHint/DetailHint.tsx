import styles from "./DetailHint.module.css";

interface DetailHintProps {
  count: number;
  onClick?: () => void;
}

export function DetailHint({ count, onClick }: DetailHintProps) {
  if (count === 0) return null;

  return (
    <div className={styles.hint} aria-label={`${count} detail slides available`}>
      <button className={styles.pill} onClick={(e) => { e.currentTarget.blur(); onClick?.(); }} type="button" tabIndex={-1}>
        <span className={styles.label}>
          {count} detail{count > 1 ? "s" : ""}
        </span>
        <span className={styles.arrow} aria-hidden="true">&rarr;</span>
      </button>
      <span className={styles.swipeText}>Swipe or press &rarr;</span>
    </div>
  );
}
