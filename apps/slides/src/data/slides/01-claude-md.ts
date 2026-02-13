import type { SlideData, DetailSlide } from "../types";

export const claudeMd: SlideData = {
  id: "claude-md",
  headline: "It's a Training File, Not Documentation",
  subheadline: "Without CLAUDE.md, Claude asks permission, hands control back, and repeats mistakes. With it, Claude just works.",
  section: "foundation",
  blocks: [
    {
      type: "comparison",
      before: {
        label: "Without CLAUDE.md",
        items: [
          "\"Should I run the tests?\"",
          "\"You can restart the server now\"",
          "Uses npm when your project uses bun",
          "Adds !important to fix a CSS issue",
        ],
      },
      after: {
        label: "With CLAUDE.md",
        items: [
          "Runs tests automatically after changes",
          "Restarts the server and verifies output",
          "Checks for bun.lock, uses bun",
          "Fixes specificity instead of !important",
        ],
      },
    },
  ],
};

export const claudeMdDetails: DetailSlide[] = [
  {
    id: "claude-md-d1",
    headline: "What Goes in a CLAUDE.md",
    block: {
      type: "code",
      language: "markdown",
      code: `# CLAUDE.md
# Rules at top of file carry highest weight.

- Use bun, not npm. Check for bun.lock before running commands.
- NEVER add !important to CSS - fix specificity instead
- Run \`bun test\` after every change. Fix failures before proceeding.
- Do not tell me to restart, test, or verify -- do it yourself.
- Do not commit without explicit instruction to do so.
- Prefer functions + object maps over classes + enums
- File limit: 300 lines max. Split when approaching.`,
      caption: "Each rule removes one more interruption. The goal: Claude works autonomously and only stops for decisions that require your judgment.",
    },
  },
  {
    id: "claude-md-d2",
    headline: "Three-Tier Hierarchy",
    block: {
      type: "takeaway",
      icon: "\u{1F3E0}",
      text: "Three tiers load automatically: ~/.claude/CLAUDE.md (global, every session), ./CLAUDE.md (project, this repo), and subdirectory CLAUDE.md files (on demand). Put personal preferences in global, project conventions in project-level.",
    },
  },
  {
    id: "claude-md-d3",
    headline: "Advisory, Not Binding",
    block: {
      type: "callout",
      text: "CLAUDE.md is advisory, not binding -- ~80% compliance even with ALL CAPS. For rules that must be enforced 100% of the time (formatting, test gates), pair them with hooks. CLAUDE.md sets intent; hooks enforce it.",
      variant: "warning",
    },
  },
];
