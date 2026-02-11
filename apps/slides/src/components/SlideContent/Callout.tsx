import styles from "./SlideContent.module.css";

interface CalloutProps {
  text: string;
  variant?: "tip" | "warning" | "insight";
}

export function Callout({ text, variant = "insight" }: CalloutProps) {
  return (
    <div className={styles.callout} data-variant={variant}>
      {text}
    </div>
  );
}
