import type { SlideData, ContentBlock } from "../../data/types";
import { Takeaway } from "../SlideContent/Takeaway";
import { CodeSnippet } from "../SlideContent/CodeSnippet";
import { QuoteBlock } from "../SlideContent/QuoteBlock";
import { ComparisonTable } from "../SlideContent/ComparisonTable";
import { StatBlock } from "../SlideContent/StatBlock";
import { Callout } from "../SlideContent/Callout";
import { DataTable } from "../SlideContent/DataTable";
import styles from "./Slide.module.css";

interface SlideProps {
  data: SlideData;
  isVisible: boolean;
}

function renderBlock(block: ContentBlock, index: number, isVisible: boolean) {
  const className = `animate-on-enter${isVisible ? " visible" : ""}`;

  switch (block.type) {
    case "takeaway":
      return (
        <div key={index} className={className}>
          <Takeaway icon={block.icon} text={block.text} />
        </div>
      );
    case "code":
      return (
        <div key={index} className={className}>
          <CodeSnippet code={block.code} caption={block.caption} />
        </div>
      );
    case "quote":
      return (
        <div key={index} className={className}>
          <QuoteBlock text={block.text} attribution={block.attribution} />
        </div>
      );
    case "comparison":
      return (
        <div key={index} className={className}>
          <ComparisonTable before={block.before} after={block.after} />
        </div>
      );
    case "table":
      return (
        <div key={index} className={className}>
          <DataTable headers={block.headers} rows={block.rows} />
        </div>
      );
    case "stat":
      return (
        <div key={index} className={className}>
          <StatBlock value={block.value} label={block.label} detail={block.detail} />
        </div>
      );
    case "callout":
      return (
        <div key={index} className={className}>
          <Callout text={block.text} variant={block.variant} />
        </div>
      );
  }
}

export function Slide({ data, isVisible }: SlideProps) {
  return (
    <section className={styles.slide} id={data.id}>
      <div className={styles.inner}>
        <div className={`animate-on-enter${isVisible ? " visible" : ""}`}>
          <h2 className={styles.headline}>{data.headline}</h2>
          {data.subheadline && (
            <p className={styles.subheadline}>{data.subheadline}</p>
          )}
        </div>
        <div className={styles.blocks}>
          {data.blocks.map((block, index) => renderBlock(block, index, isVisible))}
        </div>
      </div>
    </section>
  );
}
