import { useRef, useMemo } from "react";
import { panels } from "./data/slides";
import { Deck } from "./components/Deck/Deck";
import { Hero } from "./components/Hero/Hero";
import { Slide } from "./components/Slide/Slide";
import { SectionDivider } from "./components/SectionDivider/SectionDivider";
import { SectionNav } from "./components/Navigation/SectionNav";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { useActiveSlide } from "./hooks/useActiveSlide";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useKeyboardNav } from "./hooks/useKeyboardNav";
import styles from "./App.module.css";

export function App() {
  const deckRef = useRef<HTMLDivElement>(null);

  const slideIds = useMemo(() => panels.map((p) => p.id), []);

  const activeIndex = useActiveSlide(slideIds);
  const progress = useScrollProgress(deckRef);

  useKeyboardNav(slideIds, deckRef);

  return (
    <div className={styles.app}>
      <ProgressBar progress={progress} />
      <SectionNav panels={panels} activeIndex={activeIndex} />
      <Deck ref={deckRef}>
        {panels.map((panel, index) => {
          const isVisible = Math.abs(index - activeIndex) <= 1;

          if ("type" in panel && panel.type === "hero") {
            return <Hero key={panel.id} isVisible={isVisible} />;
          }

          if ("type" in panel && panel.type === "section-divider") {
            return (
              <SectionDivider
                key={panel.id}
                data={panel}
                isVisible={isVisible}
              />
            );
          }

          return (
            <Slide
              key={panel.id}
              data={panel}
              isVisible={isVisible}
            />
          );
        })}
      </Deck>
    </div>
  );
}
