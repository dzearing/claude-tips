import { useState, useEffect, useRef } from "react";

export function useActiveSlide(slideIds: string[]): number {
  const [activeIndex, setActiveIndex] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = slideIds.indexOf(entry.target.id);

            if (index !== -1) {
              setActiveIndex(index);
              history.replaceState(null, "", `#${entry.target.id}`);
            }
          }
        }
      },
      { threshold: 0.5 },
    );

    observerRef.current = observer;

    for (const id of slideIds) {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    }

    return () => observer.disconnect();
  }, [slideIds]);

  return activeIndex;
}
