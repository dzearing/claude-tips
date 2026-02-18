import type { SlideData } from "../../data/types";
import { renderBlock } from "../SlideContent/renderBlock";
import styles from "./Slide.module.css";

interface SlideProps {
  data: SlideData;
  isVisible: boolean;
}

export function Slide({ data, isVisible }: SlideProps) {
  const animClass = `animate-on-enter${isVisible ? " visible" : ""}`;

  return (
    <section className={styles.slide} id={data.id}>
      <div className={styles.inner}>
        <div className={animClass}>
          {data.tip && <h1 className={styles.tip}>{data.tip}</h1>}
          <h2 className={styles.headline}>{data.headline}</h2>
          {data.subheadline && (
            <p className={styles.subheadline}>{data.subheadline}</p>
          )}
        </div>
        <div className={styles.blocks}>
          {data.blocks.map((block, index) => renderBlock(block, index, animClass))}
        </div>
      </div>
    </section>
  );
}
