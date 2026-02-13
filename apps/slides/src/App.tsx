import { useRef, useMemo, useCallback } from "react";
import { rows, panels } from "./data/slides";
import { Deck } from "./components/Deck/Deck";
import { SlideRow } from "./components/SlideRow/SlideRow";
import { SectionNav } from "./components/Navigation/SectionNav";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { useActivePosition } from "./hooks/useActivePosition";
import { useAutoReturn } from "./hooks/useAutoReturn";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useKeyboardNav } from "./hooks/useKeyboardNav";
import styles from "./App.module.css";

export function App() {
  const deckRef = useRef<HTMLDivElement>(null);
  const hScrollRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const setHScrollRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      if (el) {
        hScrollRefs.current.set(index, el);
      } else {
        hScrollRefs.current.delete(index);
      }
    },
    [],
  );

  const gistIds = useMemo(() => rows.map((r) => r.gist.id), []);

  const position = useActivePosition(gistIds, hScrollRefs);
  const progress = useScrollProgress(deckRef);

  useAutoReturn(position.rowIndex, hScrollRefs);
  useKeyboardNav(rows, position, deckRef, hScrollRefs);

  return (
    <div className={styles.app}>
      <ProgressBar progress={progress} />
      <SectionNav
        panels={panels}
        rows={rows}
        activeIndex={position.rowIndex}
        hIndex={position.hIndex}
      />
      <Deck ref={deckRef}>
        {rows.map((row, index) => {
          const isVisible = Math.abs(index - position.rowIndex) <= 1;

          return (
            <SlideRow
              key={row.gist.id}
              ref={setHScrollRef(index)}
              row={row}
              isVisible={isVisible}
            />
          );
        })}
      </Deck>
    </div>
  );
}
