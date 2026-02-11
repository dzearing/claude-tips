import type { SlideData } from "../types";

export const attentionBottleneck: SlideData = {
  id: "attention-bottleneck",
  headline: "Your Attention Is the Bottleneck",
  subheadline: "Claude can do far more than it tells you. The skill is knowing what to delegate and where your eyes actually need to be.",
  section: "foundation",
  blocks: [
    {
      type: "table",
      headers: ["You're Still Doing This Manually", "Claude Handles It End-to-End"],
      rows: [
        ["Resolving merge conflicts", "Pulls main, resolves conflicts, runs tests to verify the merge"],
        ["Responding to PR review comments", "Reads comments, makes fixes, pushes, responds to reviewers"],
        ["Restarting dev server after changes", "Restarts the server, checks output, continues working"],
        ["Rebasing feature branches", "Rebases on main, resolves conflicts, force-pushes the branch"],
        ["Writing commit messages", "Reads the diff, writes a message that reflects the actual change"],
        ["Manually running linters and formatters", "Runs them automatically via hooks on every file write"],
      ],
    },
    {
      type: "callout",
      text: "Claude defaults to handing control back to you. It says \"you can now restart the server\" instead of just doing it. Push tasks back: \"Don't tell me to restart -- restart it yourself and verify it works.\" Train this behavior into your CLAUDE.md so it persists across sessions.",
      variant: "tip",
    },
    {
      type: "takeaway",
      icon: "\u{1F3AF}",
      text: "Your attention is irreplaceable for three things: architecture decisions, domain correctness, and code review. Everything else -- merge conflicts, commit messages, dependency updates, PR mechanics -- is delegation. Every minute spent on a merge conflict is a minute not spent on whether the feature is actually right.",
    },
    {
      type: "quote",
      text: "I haven't written code in the traditional sense in about a quarter. This is not a fad. Embrace it and be the person who moves your workflows into skills. Resistance is career limiting.",
      attribution: "25-year veteran developer, r/ClaudeCode",
    },
  ],
};
