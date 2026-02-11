import styles from "./SlideContent.module.css";

interface QuoteBlockProps {
  text: string;
  attribution: string;
}

export function QuoteBlock({ text, attribution }: QuoteBlockProps) {
  return (
    <blockquote className={styles.quote}>
      <p className={styles.quoteText}>{text}</p>
      <footer className={styles.quoteAttribution}>{attribution}</footer>
    </blockquote>
  );
}
