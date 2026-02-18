import type { SlideData, DetailSlide } from "../types";

export const parallelIsolation: SlideData = {
  id: "parallel-isolation",
  tip: "Tip 3: Parallelize what doesn't collide",
  headline: "Three Windows. Three Concerns. One Repo.",
  section: "foundation",
  blocks: [
    {
      type: "comparison",
      before: {
        label: "Collides",
        items: [
          "Bug fix A + bug fix B in the same component",
          "Two sessions editing shared state",
          "Build errors and merge contention",
        ],
      },
      after: {
        label: "Parallel-safe",
        items: [
          "Fix the bug, update tests, write docs",
          "Each concern touches different files",
          "Three Claude windows, three results",
        ],
      },
    },
  ],
};

export const parallelIsolationDetails: DetailSlide[] = [
  {
    id: "parallel-isolation-d1",
    headline: "Before You Open a Second Window",
    block: {
      type: "table",
      headers: ["Check", "Yes", "No"],
      rows: [
        ["Do both tasks edit the same files?", "Separate branches or worktrees", "Parallel windows are safe"],
        ["Does task B depend on task A's output?", "Run sequentially in one window", "Run in parallel"],
        ["Will both tasks run tests?", "Stagger or use different test suites", "No conflict"],
      ],
    },
  },
  {
    id: "parallel-isolation-d2",
    headline: "The Quick Test",
    block: {
      type: "callout",
      text: "Will these two tasks edit the same files? No \u2192 parallel windows. Yes \u2192 separate branches.",
      variant: "tip",
    },
  },
];
