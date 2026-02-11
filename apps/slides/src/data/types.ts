export type ContentBlock =
  | TakeawayBlock
  | CodeBlock
  | QuoteBlock
  | ComparisonBlock
  | TableBlock
  | StatBlock
  | CalloutBlock;

export interface TakeawayBlock {
  type: "takeaway";
  icon: string;
  text: string;
}

export interface CodeBlock {
  type: "code";
  language: string;
  code: string;
  caption?: string;
}

export interface QuoteBlock {
  type: "quote";
  text: string;
  attribution: string;
}

export interface ComparisonBlock {
  type: "comparison";
  before: {
    label: string;
    items: string[];
  };
  after: {
    label: string;
    items: string[];
  };
}

export interface TableBlock {
  type: "table";
  headers: string[];
  rows: string[][];
}

export interface StatBlock {
  type: "stat";
  value: string;
  label: string;
  detail?: string;
}

export interface CalloutBlock {
  type: "callout";
  text: string;
  variant?: "tip" | "warning" | "insight";
}

export interface SlideData {
  id: string;
  headline: string;
  subheadline?: string;
  blocks: ContentBlock[];
  section: SectionId;
}

export interface SectionDividerData {
  id: string;
  type: "section-divider";
  title: string;
  subtitle: string;
  section: SectionId;
}

export interface HeroData {
  id: string;
  type: "hero";
}

export type PanelData = SlideData | SectionDividerData | HeroData;

export type SectionId = "foundation" | "core" | "advanced" | "beyond";

export interface SectionMeta {
  id: SectionId;
  label: string;
  color: string;
}
