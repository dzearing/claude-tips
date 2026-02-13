import { useState, useEffect, useRef, useCallback } from "react";

export interface ActivePosition {
  rowIndex: number;
  hIndex: number;
}

export function useActivePosition(
  gistIds: string[],
  hScrollRefs: React.RefObject<Map<number, HTMLDivElement>>,
): ActivePosition {
  const [rowIndex, setRowIndex] = useState(0);
  const [hIndex, setHIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Track vertical position via IntersectionObserver on row containers
  useEffect(() => {
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const rowId = entry.target.getAttribute("data-row-id");
            if (rowId) {
              const idx = gistIds.indexOf(rowId);
              if (idx !== -1) {
                setRowIndex(idx);
                history.replaceState(null, "", `#${rowId}`);
              }
            }
          }
        }
      },
      { threshold: 0.5 },
    );

    observerRef.current = observer;

    // Observe all row containers (they have data-row-id)
    for (const id of gistIds) {
      const el = document.querySelector(`[data-row-id="${id}"]`);
      if (el) {
        observer.observe(el);
      }
    }

    return () => observer.disconnect();
  }, [gistIds]);

  // Track horizontal position via scroll listener on active row's hScroll container
  const updateHIndex = useCallback(() => {
    const container = hScrollRefs.current?.get(rowIndex);
    if (!container || container.scrollWidth <= container.clientWidth) {
      setHIndex(0);
      return;
    }
    const panelWidth = container.clientWidth;
    if (panelWidth === 0) return;
    const idx = Math.round(container.scrollLeft / panelWidth);
    setHIndex(idx);
  }, [rowIndex, hScrollRefs]);

  useEffect(() => {
    const container = hScrollRefs.current?.get(rowIndex);
    if (!container) {
      setHIndex(0);
      return;
    }

    // Reset on row change
    updateHIndex();

    container.addEventListener("scroll", updateHIndex, { passive: true });
    return () => container.removeEventListener("scroll", updateHIndex);
  }, [rowIndex, updateHIndex, hScrollRefs]);

  return { rowIndex, hIndex };
}
