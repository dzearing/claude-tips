import type { DetailSlide } from "../../data/types";
import { renderBlock } from "../SlideContent/renderBlock";
import styles from "./DetailPanel.module.css";

interface DetailPanelProps {
  detail: DetailSlide;
  index: number;
  total: number;
  isVisible: boolean;
}

export function DetailPanel({ detail, index, total, isVisible }: DetailPanelProps) {
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
        <div className={styles.position}>
          {index + 1} / {total}
        </div>
      </div>
    </div>
  );
}
