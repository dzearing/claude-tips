import type { SlideData, DetailSlide } from "../types";

export const contextManagement: SlideData = {
  id: "context-management",
  headline: "Two Scarce Resources: Context and Attention",
  section: "foundation",
  blocks: [
    {
      type: "stat",
      value: "40%",
      label: "Maximum context usage before quality drops",
      detail: "Past this threshold, Claude loses track of constraints, forgets earlier decisions, and starts contradicting itself. /clear beats /compact every time.",
    },
  ],
};

export const contextManagementDetails: DetailSlide[] = [
  {
    id: "context-management-d1",
    headline: "Where Your 200k Tokens Actually Go",
    block: {
      type: "table",
      headers: ["Component", "Tokens", "% of 200k"],
      rows: [
        ["System prompt + CLAUDE.md", "~18k", "9%"],
        ["MCP tool schemas", "16k-60k", "8-30%"],
        ["Auto-compact buffer", "~32k", "16%"],
        ["Available for your actual work", "95k-140k", "47-70%"],
      ],
    },
  },
  {
    id: "context-management-d2",
    headline: "/clear > /compact",
    block: {
      type: "takeaway",
      icon: "\u{1F9F9}",
      text: "/clear is your most powerful tool. Compacted context retains noise as summaries-of-summaries. A fresh session loaded from a handoff doc preserves full fidelity. Treat sessions as disposable -- one task, one session, /clear between.",
    },
  },
  {
    id: "context-management-d3",
    headline: "Signal-to-Noise Ratio",
    block: {
      type: "callout",
      text: "Context noise hurts Claude. Attention noise hurts you. Both are solved the same way: keep the signal-to-noise ratio high. Don't let yesterday's debugging context pollute today's feature work. Don't let Claude's mechanical updates steal your focus from the decisions that matter.",
      variant: "insight",
    },
  },
];
