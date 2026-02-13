import type { SlideData, DetailSlide } from "../types";

export const attentionBottleneck: SlideData = {
  id: "attention-bottleneck",
  headline: "What If You Never Touched a Merge Conflict Again?",
  subheadline: "Your attention is irreplaceable for three things: architecture decisions, domain correctness, and code review. Everything else is delegation.",
  section: "foundation",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F3AF}",
      text: "Every minute spent on a merge conflict is a minute not spent on whether the feature is actually right. Claude handles the mechanical work end-to-end -- merge conflicts, commit messages, dependency updates, PR mechanics. You focus on what actually requires your judgment.",
    },
  ],
};

export const attentionBottleneckDetails: DetailSlide[] = [
  {
    id: "attention-bottleneck-d1",
    headline: "What You Can Delegate Today",
    block: {
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
  },
  {
    id: "attention-bottleneck-d2",
    headline: "Train Claude to Stop Asking Permission",
    block: {
      type: "callout",
      text: "Claude defaults to handing control back to you. It says \"you can now restart the server\" instead of just doing it. Push tasks back: \"Don't tell me to restart -- restart it yourself and verify it works.\" Train this behavior into your CLAUDE.md so it persists across sessions.",
      variant: "tip",
    },
  },
  {
    id: "attention-bottleneck-d3",
    headline: "The Veteran Perspective",
    block: {
      type: "quote",
      text: "I haven't written code in the traditional sense in about a quarter. This is not a fad. Embrace it and be the person who moves your workflows into skills. Resistance is career limiting.",
      attribution: "25-year veteran developer, r/ClaudeCode",
    },
  },
];
