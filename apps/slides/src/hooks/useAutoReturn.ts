import { useEffect, useRef } from "react";

/**
 * When vertical row changes and previous row's horizontal position > 0,
 * smoothly scroll that row's horizontal container back to 0.
 * This creates a diagonal motion effect when combined with the vertical scroll.
 */
export function useAutoReturn(
  rowIndex: number,
  hScrollRefs: React.RefObject<Map<number, HTMLDivElement>>,
): void {
  const prevRowRef = useRef(rowIndex);

  useEffect(() => {
    const prevRow = prevRowRef.current;
    prevRowRef.current = rowIndex;

    if (prevRow === rowIndex) return;

    // Smoothly reset horizontal scroll on the row we just left
    const container = hScrollRefs.current?.get(prevRow);
    if (container && container.scrollLeft > 0) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, [rowIndex, hScrollRefs]);
}
