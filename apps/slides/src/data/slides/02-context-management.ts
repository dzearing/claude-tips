import type { SlideData, DetailSlide } from "../types";

export const contextManagement: SlideData = {
  id: "context-management",
  tip: "Tip 2: Guard your context window",
  headline: "Two Scarce Resources: Context and Attention",
  section: "foundation",
  blocks: [
    {
      type: "code",
      language: "text",
      code: `> /context
  Context Usage          claude-opus-4-6 · 51k/200k tokens (26%)

  ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 26%
  ╎                                ╎
  you are here               quality cliff (40%)

  Estimated usage by category
    System prompt:      17.5k tokens  (8.8%)
    System tools:       15.7k tokens  (7.9%)
    Custom agents:         623 tokens (0.3%)
    Memory files:         15k tokens  (7.5%)
    Skills:              2.2k tokens  (1.1%)
    Messages:              8 tokens   (0.0%)
    Free space:          116k         (58.0%)
    Autocompact buffer:   33k tokens  (16.5%)`,
      caption: "You start a fresh session already at 26%. Quality degrades past 40%. That leaves ~28k tokens of real work before the cliff.",
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
    headline: "New Window > /clear > /compact",
    block: {
      type: "table",
      headers: ["Action", "When", "Why"],
      rows: [
        ["New window", "New concern", "Fresh 200k context, full isolation"],
        ["/clear", "Switching tasks in same window", "Resets context, keeps session open"],
        ["/compact", "Avoid", "Lossy summaries-of-summaries"],
      ],
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
