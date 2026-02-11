import { useEffect, useCallback, type RefObject } from "react";

const SCROLL_THRESHOLD = 10;

function getSlideElement(slideIds: string[], index: number): HTMLElement | null {
  const id = slideIds[index];

  return id ? document.getElementById(id) : null;
}

function getCurrentSlideIndex(deck: HTMLElement, slideIds: string[]): number {
  const scrollMid = deck.scrollTop + deck.clientHeight / 2;

  for (let i = slideIds.length - 1; i >= 0; i--) {
    const el = getSlideElement(slideIds, i);

    if (el && el.offsetTop <= scrollMid) {
      return i;
    }
  }

  return 0;
}

export function useKeyboardNav(
  slideIds: string[],
  deckRef: RefObject<HTMLDivElement | null>,
): void {
  const navigateDown = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const viewportHeight = deck.clientHeight;
    const currentIndex = getCurrentSlideIndex(deck, slideIds);
    const currentSlide = getSlideElement(slideIds, currentIndex);

    if (!currentSlide) return;

    const slideBottom = currentSlide.offsetTop + currentSlide.offsetHeight;
    const viewportBottom = deck.scrollTop + viewportHeight;

    if (slideBottom - viewportBottom > SCROLL_THRESHOLD) {
      // More content below in this slide -- page down within it
      const targetScroll = Math.min(
        deck.scrollTop + viewportHeight,
        slideBottom - viewportHeight,
      );

      deck.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      // At bottom of slide -- go to next slide
      const nextIndex = Math.min(currentIndex + 1, slideIds.length - 1);
      const nextSlide = getSlideElement(slideIds, nextIndex);

      if (nextSlide) {
        deck.scrollTo({ top: nextSlide.offsetTop, behavior: "smooth" });
      }
    }
  }, [slideIds, deckRef]);

  const navigateUp = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const viewportHeight = deck.clientHeight;
    const currentIndex = getCurrentSlideIndex(deck, slideIds);
    const currentSlide = getSlideElement(slideIds, currentIndex);

    if (!currentSlide) return;

    const slideTop = currentSlide.offsetTop;

    if (deck.scrollTop - slideTop > SCROLL_THRESHOLD) {
      // Not at top of slide -- page up within it
      const targetScroll = Math.max(
        deck.scrollTop - viewportHeight,
        slideTop,
      );

      deck.scrollTo({ top: targetScroll, behavior: "smooth" });
    } else {
      // At top of slide -- go to previous slide, showing its bottom
      const prevIndex = Math.max(currentIndex - 1, 0);
      const prevSlide = getSlideElement(slideIds, prevIndex);

      if (prevSlide) {
        const prevSlideBottom = prevSlide.offsetTop + prevSlide.offsetHeight;
        const targetScroll = Math.max(
          prevSlideBottom - viewportHeight,
          prevSlide.offsetTop,
        );

        deck.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    }
  }, [slideIds, deckRef]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const deck = deckRef.current;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          navigateDown();
          break;

        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          navigateUp();
          break;

        case "Home":
          event.preventDefault();
          if (deck) {
            deck.scrollTo({ top: 0, behavior: "smooth" });
          }
          break;

        case "End":
          event.preventDefault();
          if (deck) {
            deck.scrollTo({ top: deck.scrollHeight, behavior: "smooth" });
          }
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigateDown, navigateUp, deckRef]);
}
