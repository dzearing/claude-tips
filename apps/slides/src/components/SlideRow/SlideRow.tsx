import { forwardRef, useCallback, useRef } from "react";
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
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scrollToPanel = useCallback((panelIndex: number) => {
      const el = scrollRef.current;
      if (el) {
        el.scrollTo({ left: el.clientWidth * panelIndex, behavior: "smooth" });
      }
    }, []);

    const scrollToFirstDetail = useCallback(() => {
      scrollToPanel(1);
    }, [scrollToPanel]);

    // Combine forwarded ref with local ref
    const setRef = useCallback(
      (el: HTMLDivElement | null) => {
        scrollRef.current = el;
        if (typeof ref === "function") {
          ref(el);
        } else if (ref) {
          ref.current = el;
        }
      },
      [ref],
    );

    // Hero and section dividers: no horizontal scroll
    if (isHero(gist)) {
      return (
        <div className={styles.row} ref={setRef} data-row-id={gist.id}>
          <Hero isVisible={isVisible} />
        </div>
      );
    }

    if (isDivider(gist)) {
      return (
        <div className={styles.row} ref={setRef} data-row-id={gist.id}>
          <SectionDivider data={gist} isVisible={isVisible} />
        </div>
      );
    }

    // Content slides: horizontal scroll with gist + details
    if (!hasDetails) {
      return (
        <div className={styles.row} ref={setRef} data-row-id={gist.id}>
          <Slide data={gist} isVisible={isVisible} />
        </div>
      );
    }

    return (
      <div
        className={styles.hScroll}
        ref={setRef}
        data-row-id={gist.id}
      >
        <div className={styles.gistPanel}>
          <Slide data={gist} isVisible={isVisible} />
          <DetailHint count={details.length} onClick={scrollToFirstDetail} />
        </div>
        {details.map((detail, i) => (
          <DetailPanel
            key={detail.id}
            detail={detail}
            index={i}
            total={details.length}
            isVisible={isVisible}
            onPrev={() => scrollToPanel(i)}
            onNext={i < details.length - 1 ? () => scrollToPanel(i + 2) : undefined}
          />
        ))}
      </div>
    );
  },
);
