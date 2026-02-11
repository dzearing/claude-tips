import styles from "./SlideContent.module.css";

interface StatBlockProps {
  value: string;
  label: string;
  detail?: string;
}

export function StatBlock({ value, label, detail }: StatBlockProps) {
  return (
    <div className={styles.stat}>
      <span className={styles.statValue}>{value}</span>
      <span className={styles.statLabel}>{label}</span>
      {detail && <span className={styles.statDetail}>{detail}</span>}
    </div>
  );
}
