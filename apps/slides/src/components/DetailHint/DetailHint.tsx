import styles from "./DetailHint.module.css";

interface DetailHintProps {
  count: number;
}

export function DetailHint({ count }: DetailHintProps) {
  if (count === 0) return null;

  return (
    <div className={styles.hint} aria-label={`${count} detail slides available`}>
      <div className={styles.pill}>
        <span className={styles.label}>
          {count} detail{count > 1 ? "s" : ""}
        </span>
        <span className={styles.arrow} aria-hidden="true">&rarr;</span>
      </div>
      <span className={styles.swipeText}>Swipe or press &rarr;</span>
    </div>
  );
}
