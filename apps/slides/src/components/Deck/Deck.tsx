import { forwardRef, type ReactNode } from "react";
import styles from "./Deck.module.css";

interface DeckProps {
  children: ReactNode;
}

export const Deck = forwardRef<HTMLDivElement, DeckProps>(
  function Deck({ children }, ref) {
    return (
      <div className={styles.deck} ref={ref}>
        {children}
      </div>
    );
  },
);
