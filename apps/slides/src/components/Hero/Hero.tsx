import styles from "./Hero.module.css";

interface HeroProps {
  isVisible: boolean;
}

export function Hero({ isVisible }: HeroProps) {
  return (
    <section className={styles.hero} id="hero">
      <div className={`${styles.content} animate-on-enter${isVisible ? " visible" : ""}`}>
        <span className={styles.badge}>Research Compendium</span>
        <h1 className={styles.title}>
          Claude Code <span className={styles.titleAccent}>Tips</span>
        </h1>
        <p className={styles.subtitle}>
          The most impactful techniques from 30+ community sources, distilled
          into slides you can read in minutes.
        </p>
        <p className={styles.hint}>
          Scroll or use arrow keys to navigate
          <span className={styles.arrow} aria-hidden="true">{"\u2193"}</span>
        </p>
      </div>
    </section>
  );
}
