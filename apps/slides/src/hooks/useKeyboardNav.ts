import { useEffect, useCallback, type RefObject } from "react";
import type { SlideRow } from "../data/types";
import type { ActivePosition } from "./useActivePosition";

export function useKeyboardNav(
  rows: SlideRow[],
  position: ActivePosition,
  deckRef: RefObject<HTMLDivElement | null>,
  hScrollRefs: RefObject<Map<number, HTMLDivElement>>,
): void {
  const navigateDown = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const { rowIndex, hIndex } = position;

    // Smooth horizontal return + vertical nav happen simultaneously = diagonal
    if (hIndex > 0) {
      const hContainer = hScrollRefs.current?.get(rowIndex);
      if (hContainer) {
        hContainer.scrollTo({ left: 0, behavior: "smooth" });
      }
    }

    // Go to next row
    const nextIndex = Math.min(rowIndex + 1, rows.length - 1);
    if (nextIndex === rowIndex) return;

    const nextRow = rows[nextIndex];
    if (!nextRow) return;
    const nextId = nextRow.gist.id;
    const nextEl = document.querySelector(`[data-row-id="${nextId}"]`);
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth" });
    }
  }, [rows, position, deckRef, hScrollRefs]);

  const navigateUp = useCallback(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const { rowIndex, hIndex } = position;

    // Smooth horizontal return + vertical nav happen simultaneously = diagonal
    if (hIndex > 0) {
      const hContainer = hScrollRefs.current?.get(rowIndex);
      if (hContainer) {
        hContainer.scrollTo({ left: 0, behavior: "smooth" });
      }
    }

    // Go to previous row
    const prevIndex = Math.max(rowIndex - 1, 0);
    if (prevIndex === rowIndex) return;

    const prevRow = rows[prevIndex];
    if (!prevRow) return;
    const prevId = prevRow.gist.id;
    const prevEl = document.querySelector(`[data-row-id="${prevId}"]`);
    if (prevEl) {
      prevEl.scrollIntoView({ behavior: "smooth" });
    }
  }, [rows, position, deckRef, hScrollRefs]);

  const navigateRight = useCallback(() => {
    const { rowIndex, hIndex } = position;
    const row = rows[rowIndex];
    if (!row || row.details.length === 0) return;

    const maxH = row.details.length; // gist=0, details=1..N
    const nextH = Math.min(hIndex + 1, maxH);
    if (nextH === hIndex) return;

    const hContainer = hScrollRefs.current?.get(rowIndex);
    if (hContainer) {
      hContainer.scrollTo({
        left: nextH * hContainer.clientWidth,
        behavior: "smooth",
      });
    }
  }, [rows, position, hScrollRefs]);

  const navigateLeft = useCallback(() => {
    const { rowIndex, hIndex } = position;
    if (hIndex === 0) return;

    const nextH = hIndex - 1;
    const hContainer = hScrollRefs.current?.get(rowIndex);
    if (hContainer) {
      hContainer.scrollTo({
        left: nextH * hContainer.clientWidth,
        behavior: "smooth",
      });
    }
  }, [position, hScrollRefs]);

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

        case "ArrowRight":
          event.preventDefault();
          navigateRight();
          break;

        case "ArrowLeft":
          event.preventDefault();
          navigateLeft();
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
  }, [navigateDown, navigateUp, navigateRight, navigateLeft, deckRef]);
}
