import { useState, useEffect, useCallback } from "react";

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>): number {
  const [progress, setProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;

    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;

    if (scrollHeight > 0) {
      setProgress(scrollTop / scrollHeight);
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, [containerRef, handleScroll]);

  return progress;
}
