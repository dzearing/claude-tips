import type { ContentBlock } from "../../data/types";
import { Takeaway } from "./Takeaway";
import { CodeSnippet } from "./CodeSnippet";
import { QuoteBlock } from "./QuoteBlock";
import { ComparisonTable } from "./ComparisonTable";
import { StatBlock } from "./StatBlock";
import { Callout } from "./Callout";
import { DataTable } from "./DataTable";

export function renderBlock(
  block: ContentBlock,
  index: number,
  className: string,
) {
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
          <StatBlock
            value={block.value}
            label={block.label}
            detail={block.detail}
          />
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
