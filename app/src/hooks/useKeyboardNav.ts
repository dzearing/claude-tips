import { useEffect } from "react";
import { scrollToSlide } from "../utils/scrollTo";

export function useKeyboardNav(slideIds: string[], activeIndex: number): void {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        const nextIndex = Math.min(activeIndex + 1, slideIds.length - 1);
        const nextId = slideIds[nextIndex];

        if (nextId) {
          scrollToSlide(nextId);
        }
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        const prevIndex = Math.max(activeIndex - 1, 0);
        const prevId = slideIds[prevIndex];

        if (prevId) {
          scrollToSlide(prevId);
        }
      }

      if (event.key === "Home") {
        event.preventDefault();
        const firstId = slideIds[0];

        if (firstId) {
          scrollToSlide(firstId);
        }
      }

      if (event.key === "End") {
        event.preventDefault();
        const lastId = slideIds[slideIds.length - 1];

        if (lastId) {
          scrollToSlide(lastId);
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [slideIds, activeIndex]);
}
