import type { SlideData, DetailSlide } from "../types";

export const stayingEffective: SlideData = {
  id: "staying-effective",
  tip: "Tip 13: One task per session",
  headline: "One Task Per Session. Every Time.",
  section: "advanced",
  blocks: [
    {
      type: "callout",
      text: "Context pollution is real. /clear between tasks, load from handoff docs.",
      variant: "warning",
    },
  ],
};

export const stayingEffectiveDetails: DetailSlide[] = [
  {
    id: "staying-effective-d1",
    headline: "Situation Guide",
    block: {
      type: "table",
      headers: ["Situation", "Do This", "Not This"],
      rows: [
        ["Switching tasks", "/clear + handoff doc", "/compact (loses nuance)"],
        ["Need codebase research", "Spawn a subagent (Task tool)", "Read 20 files in main session"],
        ["Two independent features", "Two terminal tabs", "Both in one session"],
        ["Picking up yesterday's work", "Read the handoff doc", "Scroll up and hope context is intact"],
        ["Long session getting sluggish", "/clear, reload from doc", "Keep pushing past the quality cliff"],
      ],
    },
  },
  {
    id: "staying-effective-d2",
    headline: "The Cost of One Extra Message",
    block: {
      type: "stat",
      value: "100k",
      label: "input tokens burned by a 'thanks' in a long session",
      detail: "Every message -- even one word -- replays the entire conversation. A long session with throwaway messages compounds fast.",
    },
  },
  {
    id: "staying-effective-d3",
    headline: "The Compaction Trap",
    block: {
      type: "callout",
      text: "The /compact trap: compaction produces summaries of summaries. Each round loses nuance. After 2-3 compactions, Claude is working from a lossy sketch of your original intent. /clear + handoff doc preserves the actual decisions.",
      variant: "insight",
    },
  },
];
