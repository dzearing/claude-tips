import type { SlideData, DetailSlide } from "../types";

export const sessionDiscipline: SlideData = {
  id: "session-discipline",
  headline: "The First 30 Seconds Determine the Session",
  subheadline: "Start right or burn tokens. The handoff doc pattern beats compaction every time.",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F4C4}",
      text: "The handoff doc pattern: before /clear or ending a session, ask Claude to write a markdown doc capturing progress, decisions made, next steps, and open questions. Start the next session by pointing at it. This beats compaction every time because you control what transfers.",
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
    headline: "Repo Catchup After Time Away",
    block: {
      type: "takeaway",
      icon: "\u{1F504}",
      text: "Repo catchup after time away: \"Read the last 10 commits and summarize what changed. What PRs were merged since Monday? Any breaking changes I should know about?\" Claude runs git log, reads diffs, and gives you a briefing in 30 seconds.",
    },
  },
  {
    id: "session-discipline-d3",
    headline: "Skip the Pleasantries",
    block: {
      type: "callout",
      text: "Skip pleasantries. \"Hello\", \"thanks\", and \"I want to...\" preambles each replay the full context. Every message before the real task is wasted tokens. Just give the task.",
      variant: "tip",
    },
  },
];
