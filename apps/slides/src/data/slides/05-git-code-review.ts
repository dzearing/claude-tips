import type { SlideData, DetailSlide } from "../types";

export const gitCodeReview: SlideData = {
  id: "git-code-review",
  tip: "Tip 8: Automate the PR feedback loop",
  headline: "Full PR Feedback Loop in One Prompt",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F504}",
      text: "Read comments, make fixes, push, respond -- without leaving the terminal.",
    },
  ],
};

export const gitCodeReviewDetails: DetailSlide[] = [
  {
    id: "git-code-review-d1",
    headline: "The Full PR Cycle",
    block: {
      type: "code",
      language: "text",
      code: `You: "Check PR #142 for review comments and address them."

Claude: *runs gh pr view 142* \u2192 reads 3 review comments
        *reads the flagged files*
        *makes the requested changes*
        *commits referencing the feedback*
        *pushes to the branch*
        "Addressed all 3 comments."`,
      caption: "One prompt: read comments, fix code, push, respond. No context switching.",
    },
  },
  {
    id: "git-code-review-d2",
    headline: "Build a /review-pr Skill",
    block: {
      type: "code",
      language: "text",
      code: `/review-pr 142
  \u2192 reads every changed file in the diff
  \u2192 checks for security issues, bugs, style violations
  \u2192 verifies test coverage for new code paths
  \u2192 posts a summary comment with findings`,
      caption: "Automate your review checklist into a slash command. Run it on every PR.",
    },
  },
  {
    id: "git-code-review-d3",
    headline: "Semantic Correctness Warning",
    block: {
      type: "callout",
      text: "Review diffs for semantic correctness. Claude may substitute similar-sounding field names (created_at for birth_date) or silently rename variables. The code compiles but the meaning is wrong.",
      variant: "warning",
    },
  },
];
