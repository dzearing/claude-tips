import type { SlideData } from "../types";

export const parallelWorkflows: SlideData = {
  id: "parallel-workflows",
  headline: "Run Five Sessions, Not One",
  subheadline: "The Claude Code creator runs 5-10 simultaneous sessions. This is the real multiplier.",
  section: "core",
  blocks: [
    {
      type: "table",
      headers: ["Strategy", "Best For", "Why"],
      rows: [
        ["Terminal tabs", "Independent tasks", "Cheapest isolation. Each tab is a fresh context."],
        ["Git worktrees", "Feature branches", "Same repo, different branches, no stashing. Claude can build/test in isolation."],
        ["Subagents (Task tool)", "Read-heavy research", "Spawns within a session. Great for codebase search, doc reading. Protects parent context."],
        ["Separate clones", "Max isolation", "When worktrees aren't enough. Completely independent filesystems."],
      ],
    },
    {
      type: "takeaway",
      icon: "\u{1F3AF}",
      text: "Expect 10-20% of parallel sessions to be abandoned. That is normal. The overall throughput still far exceeds sequential work. Treat sessions as cheap and disposable -- the cost is tokens, not your time.",
    },
    {
      type: "callout",
      text: "Subagents are not free: an Explore agent can burn 100k-300k tokens per research pass, and that cost is hidden from your main session. Use them for read-heavy work (searching, reading docs), not as a default for every subtask.",
      variant: "warning",
    },
  ],
};
