import { forwardRef } from "react";
import type { SlideRow as SlideRowData, HeroData, SectionDividerData } from "../../data/types";
import { Hero } from "../Hero/Hero";
import { Slide } from "../Slide/Slide";
import { SectionDivider } from "../SectionDivider/SectionDivider";
import { DetailPanel } from "../DetailPanel/DetailPanel";
import { DetailHint } from "../DetailHint/DetailHint";
import styles from "./SlideRow.module.css";

interface SlideRowProps {
  row: SlideRowData;
  isVisible: boolean;
}

function isHero(panel: SlideRowData["gist"]): panel is HeroData {
  return "type" in panel && panel.type === "hero";
}

function isDivider(panel: SlideRowData["gist"]): panel is SectionDividerData {
  return "type" in panel && panel.type === "section-divider";
}

export const SlideRow = forwardRef<HTMLDivElement, SlideRowProps>(
  function SlideRow({ row, isVisible }, ref) {
    const { gist, details } = row;
    const hasDetails = details.length > 0;

    // Hero and section dividers: no horizontal scroll
    if (isHero(gist)) {
      return (
        <div className={styles.row} ref={ref} data-row-id={gist.id}>
          <Hero isVisible={isVisible} />
        </div>
      );
    }

    if (isDivider(gist)) {
      return (
        <div className={styles.row} ref={ref} data-row-id={gist.id}>
          <SectionDivider data={gist} isVisible={isVisible} />
        </div>
      );
    }

    // Content slides: horizontal scroll with gist + details
    if (!hasDetails) {
      return (
        <div className={styles.row} ref={ref} data-row-id={gist.id}>
          <Slide data={gist} isVisible={isVisible} />
        </div>
      );
    }

    return (
      <div
        className={styles.hScroll}
        ref={ref}
        data-row-id={gist.id}
      >
        <div className={styles.gistPanel}>
          <Slide data={gist} isVisible={isVisible} />
          <DetailHint count={details.length} />
        </div>
        {details.map((detail, i) => (
          <DetailPanel
            key={detail.id}
            detail={detail}
            index={i}
            total={details.length}
            isVisible={isVisible}
          />
        ))}
      </div>
    );
  },
);
