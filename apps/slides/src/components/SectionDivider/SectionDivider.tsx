import type { SectionDividerData } from "../../data/types";
import { sections } from "../../data/sections";
import styles from "./SectionDivider.module.css";

interface SectionDividerProps {
  data: SectionDividerData;
  isVisible: boolean;
}

export function SectionDivider({ data, isVisible }: SectionDividerProps) {
  const sectionMeta = sections.find((s) => s.id === data.section);
  const color = sectionMeta?.color ?? "var(--color-accent)";

  return (
    <section
      className={styles.divider}
      id={data.id}
      style={{
        "--section-color": color,
        "--glow-color": color,
      } as React.CSSProperties}
    >
      <div className={`${styles.content} animate-on-enter${isVisible ? " visible" : ""}`}>
        <p className={styles.label}>{sectionMeta?.label}</p>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
      </div>
    </section>
  );
}
