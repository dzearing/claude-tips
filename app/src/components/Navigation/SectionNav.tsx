import type { PanelData } from "../../data/types";
import { sections } from "../../data/sections";
import { scrollToSlide } from "../../utils/scrollTo";
import styles from "./SectionNav.module.css";

interface SectionNavProps {
  panels: PanelData[];
  activeIndex: number;
}

function getPanelLabel(panel: PanelData): string {
  if ("type" in panel && panel.type === "section-divider") {
    return panel.title;
  }

  if ("type" in panel && panel.type === "hero") {
    return "Welcome";
  }

  if ("headline" in panel) {
    return panel.headline;
  }

  return "";
}

function getPanelColor(panel: PanelData): string {
  if ("type" in panel && panel.type === "hero") {
    return "var(--color-accent)";
  }

  const sectionId = "section" in panel ? panel.section : undefined;
  const meta = sections.find((s) => s.id === sectionId);

  return meta?.color ?? "var(--color-accent)";
}

function isDivider(panel: PanelData): boolean {
  return "type" in panel && panel.type === "section-divider";
}

export function SectionNav({ panels, activeIndex }: SectionNavProps) {
  return (
    <nav className={styles.nav} aria-label="Slide navigation">
      {panels.map((panel, index) => {
        const isActive = index === activeIndex;
        const color = getPanelColor(panel);
        const label = getPanelLabel(panel);

        if (isDivider(panel)) {
          return (
            <div key={panel.id} className={styles.dotWrapper}>
              <button
                className={styles.dividerDot}
                data-active={isActive}
                style={{ background: isActive ? color : undefined }}
                onClick={() => scrollToSlide(panel.id)}
                aria-label={label}
              />
              <span className={styles.tooltip}>{label}</span>
            </div>
          );
        }

        return (
          <div key={panel.id} className={styles.dotWrapper}>
            <button
              className={styles.dot}
              data-active={isActive}
              style={{ color, background: isActive ? color : undefined }}
              onClick={() => scrollToSlide(panel.id)}
              aria-label={label}
            />
            <span className={styles.tooltip}>{label}</span>
          </div>
        );
      })}
    </nav>
  );
}
