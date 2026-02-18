import type { SlideData, DetailSlide } from "../types";

export const automationDevops: SlideData = {
  id: "automation-devops",
  tip: "Tip 13: One task = one commit",
  headline: "Atomic Commits Give You Free Bisect",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F3AF}",
      text: "Each session produces one focused commit. When something breaks, git bisect finds the exact cause in seconds.",
    },
  ],
};

export const automationDevopsDetails: DetailSlide[] = [
  {
    id: "automation-devops-d1",
    headline: "The Atomic Workflow",
    block: {
      type: "table",
      headers: ["Step", "What Happens", "Why It Matters"],
      rows: [
        ["1. Plan", "Agree on scope in plan mode", "Prevents scope creep into unrelated changes"],
        ["2. Implement", "Claude executes the plan", "One concern, one set of files"],
        ["3. Test", "Hooks run tests before commit", "Catches regressions before they land"],
        ["4. Commit", "Single commit with clear message", "git bisect, blame, and revert all just work"],
      ],
    },
  },
  {
    id: "automation-devops-d2",
    headline: "Mixed Commits Are Debugging Debt",
    block: {
      type: "comparison",
      before: {
        label: "Mixed Commit",
        items: [
          "\"Fix auth bug + update styles + refactor utils\"",
          "git bisect lands on this commit -- which change broke it?",
          "Reverting rolls back three unrelated changes",
          "Code review is a wall of unrelated diffs",
        ],
      },
      after: {
        label: "Atomic Commit",
        items: [
          "\"Fix auth token refresh on 401 response\"",
          "git bisect points directly at the cause",
          "Reverting is safe and surgical",
          "Code review tells a clear story",
        ],
      },
    },
  },
];
