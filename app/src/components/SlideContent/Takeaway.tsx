import styles from "./SlideContent.module.css";

interface TakeawayProps {
  icon: string;
  text: string;
}

export function Takeaway({ icon, text }: TakeawayProps) {
  return (
    <div className={styles.takeaway}>
      <span className={styles.takeawayIcon} aria-hidden="true">{icon}</span>
      <p className={styles.takeawayText}>{text}</p>
    </div>
  );
}
