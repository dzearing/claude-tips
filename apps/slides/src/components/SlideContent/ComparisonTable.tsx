import styles from "./SlideContent.module.css";

interface ComparisonTableProps {
  before: { label: string; items: string[] };
  after: { label: string; items: string[] };
}

export function ComparisonTable({ before, after }: ComparisonTableProps) {
  return (
    <div className={styles.comparison}>
      <div className={styles.comparisonColumn} data-side="before">
        <div className={styles.comparisonLabel}>{before.label}</div>
        <ul className={styles.comparisonList}>
          {before.items.map((item, index) => (
            <li key={index} className={styles.comparisonItem}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.comparisonColumn} data-side="after">
        <div className={styles.comparisonLabel}>{after.label}</div>
        <ul className={styles.comparisonList}>
          {after.items.map((item, index) => (
            <li key={index} className={styles.comparisonItem}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
