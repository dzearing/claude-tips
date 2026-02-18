import type { DetailSlide } from "../../data/types";
import { renderBlock } from "../SlideContent/renderBlock";
import styles from "./DetailPanel.module.css";

interface DetailPanelProps {
  detail: DetailSlide;
  index: number;
  total: number;
  isVisible: boolean;
  onPrev?: () => void;
  onNext?: () => void;
}

export function DetailPanel({ detail, index, total, isVisible, onPrev, onNext }: DetailPanelProps) {
  const animClass = `animate-on-enter-h${isVisible ? " visible" : ""}`;

  return (
    <div className={styles.panel} id={detail.id}>
      <div className={styles.inner}>
        <div className={animClass}>
          <h3 className={styles.headline}>{detail.headline}</h3>
        </div>
        <div className={styles.block}>
          {renderBlock(detail.block, 0, animClass)}
        </div>
        {detail.caption && (
          <p className={`${styles.caption} ${animClass}`}>{detail.caption}</p>
        )}
      </div>
      <div className={styles.paging}>
        <button
          className={styles.paddle}
          onClick={onPrev}
          aria-label="Previous"
        >
          &#8249;
        </button>
        <span className={styles.position}>
          {index + 1} / {total}
        </span>
        <button
          className={`${styles.paddle}${!onNext ? ` ${styles.hidden}` : ""}`}
          onClick={onNext}
          aria-label="Next"
        >
          &#8250;
        </button>
      </div>
    </div>
  );
}
