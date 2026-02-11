import type { SlideData } from "../types";

export const stayingEffective: SlideData = {
  id: "staying-effective",
  headline: "Stay in the Flow State",
  subheadline: "Session discipline is the difference between burning tokens and shipping features.",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F3CB}\u{FE0F}",
      text: "One task per session. Context pollution is real -- debugging auth then building a dashboard in the same session means dashboard work is degraded by auth context noise. /clear between unrelated tasks, every time.",
    },
    {
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
    {
      type: "stat",
      value: "100k",
      label: "input tokens burned by a 'thanks' in a long session",
      detail: "Every message -- even one word -- replays the entire conversation. A long session with throwaway messages compounds fast.",
    },
    {
      type: "callout",
      text: "The /compact trap: compaction produces summaries of summaries. Each round loses nuance. After 2-3 compactions, Claude is working from a lossy sketch of your original intent. /clear + handoff doc preserves the actual decisions.",
      variant: "insight",
    },
  ],
};
