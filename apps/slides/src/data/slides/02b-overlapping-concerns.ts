import type { SlideData, DetailSlide } from "../types";

export const overlappingConcerns: SlideData = {
  id: "overlapping-concerns",
  tip: "Tip 4: Separate what collides",
  headline: "Branches, Worktrees, Codespaces",
  section: "foundation",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F333}",
      text: "When two tasks touch the same files, give each its own repo. Worktrees are the lightweight way -- like multiple clones sharing the same .git history, but each with its own working directory.",
    },
  ],
};

export const overlappingConcernsDetails: DetailSlide[] = [
  {
    id: "overlapping-concerns-d1",
    headline: "Make a /wt Skill",
    block: {
      type: "code",
      language: "text",
      code: `/wt Add pagination to the search results page
  → creates worktree ../myapp-add-pagination, opens VS Code

/wt https://github.com/you/repo/issues/332
  → reads the issue, derives branch name, creates worktree

/wt Fix the auth redirect loop
  → creates worktree ../myapp-fix-auth-redirect, opens VS Code`,
      caption: "One skill that names the worktree, creates it, and opens your editor. Every new task starts isolated in seconds.",
    },
  },
  {
    id: "overlapping-concerns-d2",
    headline: "Isolation Strategies",
    block: {
      type: "table",
      headers: ["Strategy", "When to Use"],
      rows: [
        ["Worktree", "Default. Shares .git history, own working directory."],
        ["Codespace / clone", "Very large repos where worktrees are still slow."],
      ],
    },
  },
  {
    id: "overlapping-concerns-d3",
    headline: "Let Claude Do the Dissection",
    block: {
      type: "code",
      language: "text",
      code: `You: "I've been mixing auth and perf fixes in one branch.
       Separate the perf changes into a new worktree."

Claude: *reads git diff, identifies perf-related changes*
        *creates worktree, cherry-picks the relevant commits*
        *verifies both worktrees build independently*
        "Done. Auth stays here, perf is in ../myapp-perf."`,
      caption: "You don't have to do the dissection yourself.",
    },
  },
];
