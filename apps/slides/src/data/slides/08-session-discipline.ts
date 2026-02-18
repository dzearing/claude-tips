import type { SlideData, DetailSlide } from "../types";

export const sessionDiscipline: SlideData = {
  id: "session-discipline",
  tip: "Tip 11: One task, one session, one handoff",
  headline: "The First 30 Seconds Determine the Session",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F4C4}",
      text: "Handoff doc before /clear. Point at it next session. You control what transfers.",
    },
  ],
};

export const sessionDisciplineDetails: DetailSlide[] = [
  {
    id: "session-discipline-d1",
    headline: "Anti-Patterns vs High-Signal Starts",
    block: {
      type: "comparison",
      before: {
        label: "Session Anti-Patterns",
        items: [
          "\"Hey Claude, I want to work on auth today\"",
          "Doing 3 unrelated tasks in one session",
          "Relying on /compact for task switches",
          "Starting with questions instead of tasks",
        ],
      },
      after: {
        label: "High-Signal Starts",
        items: [
          "\"Read HANDOFF.md and continue from step 3\"",
          "One task per session, /clear between",
          "Fresh context loaded from handoff doc",
          "\"Fix the race condition in useAuth.ts:47\"",
        ],
      },
    },
  },
  {
    id: "session-discipline-d2",
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
    id: "session-discipline-d3",
    headline: "The Compaction Trap",
    block: {
      type: "callout",
      text: "The /compact trap: compaction produces summaries of summaries. Each round loses nuance. After 2-3 compactions, Claude is working from a lossy sketch of your original intent. /clear + handoff doc preserves the actual decisions. And skip pleasantries -- every message (even \"thanks\") replays the full context.",
      variant: "warning",
    },
  },
];
