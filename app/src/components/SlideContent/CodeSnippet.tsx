import styles from "./SlideContent.module.css";

interface CodeSnippetProps {
  code: string;
  caption?: string;
}

export function CodeSnippet({ code, caption }: CodeSnippetProps) {
  return (
    <div className={styles.codeWrapper}>
      <pre className={styles.codeBlock}>
        <code>{code}</code>
      </pre>
      {caption && <div className={styles.codeCaption}>{caption}</div>}
    </div>
  );
}
