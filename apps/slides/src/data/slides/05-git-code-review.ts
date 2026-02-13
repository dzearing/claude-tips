import type { SlideData, DetailSlide } from "../types";

export const gitCodeReview: SlideData = {
  id: "git-code-review",
  headline: "Full PR Feedback Loop in One Prompt",
  subheadline: "Read comments, make fixes, push, respond to reviewers -- all without leaving the terminal.",
  section: "core",
  blocks: [
    {
      type: "code",
      language: "text",
      code: `You: "Check PR #142 for review comments and address them."

Claude: *runs gh pr view 142* \u2192 reads 3 review comments
        *reads the files reviewers flagged*
        *makes the requested changes*
        *commits with message referencing the feedback*
        *pushes to the branch*
        "Addressed all 3 comments."`,
      caption: "The full PR feedback cycle in one prompt.",
    },
  ],
};

export const gitCodeReviewDetails: DetailSlide[] = [
  {
    id: "git-code-review-d1",
    headline: "Morning Catchup Pattern",
    block: {
      type: "takeaway",
      icon: "\u{1F4CB}",
      text: "Morning catchup pattern: \"Summarize what changed in this repo since Friday. What PRs were merged? Any breaking changes?\" Claude runs git log, reads diffs, and gives you a briefing. Do this after any time away from a repo.",
    },
  },
  {
    id: "git-code-review-d2",
    headline: "Checkpoint Commits Save Hours",
    block: {
      type: "takeaway",
      icon: "\u{1F6D1}",
      text: "Commit before every large refactor as a checkpoint. If it goes sideways, git diff HEAD~1 shows exactly what changed. One developer lost 3 hours of work to a botched migration that touched every model file. Atomic commits make rollback trivial.",
    },
  },
  {
    id: "git-code-review-d3",
    headline: "Semantic Correctness Warning",
    block: {
      type: "callout",
      text: "Review diffs for semantic correctness, not just functional bugs. Claude may substitute similar-sounding field names (e.g., created_at for birth_date) or silently rename internal variables. The code compiles but the meaning is wrong.",
      variant: "warning",
    },
  },
];
