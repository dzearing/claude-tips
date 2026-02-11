import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className={styles.bar} role="progressbar" aria-valuenow={Math.round(progress * 100)}>
      <div
        className={styles.fill}
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
