import type { SlideData } from "../types";

export const patternsCompound: SlideData = {
  id: "patterns-compound",
  headline: "Patterns That Compound",
  subheadline: "Any single tip saves minutes. Stacked together, they create a fundamentally different way of working.",
  section: "beyond",
  blocks: [
    {
      type: "table",
      headers: ["Pattern", "Alone", "Stacked"],
      rows: [
        ["Types-first decomposition", "Clearer code", "Claude implements entire modules from type signatures with near-zero iteration"],
        ["Plan mode \u2192 auto-accept", "Better plans", "Single-shot PRs. Plan is the work, execution is mechanical."],
        ["/clear between tasks", "Fresher context", "Every task gets full 200k window. Quality never degrades across a workday."],
        ["Skills that auto-trigger", "Less manual invocation", "Brainstorming fires before features, code review fires after. Workflow enforces itself."],
        ["Hooks that enforce", "Consistent formatting", "Tests gate commits, formatters run on every write. CLAUDE.md advice becomes guaranteed behavior."],
      ],
    },
    {
      type: "takeaway",
      icon: "\u{1F4A1}",
      text: "The full stack: types-first + plan mode + fresh context per task + auto-triggered skills + enforcement hooks + browser-in-the-loop verification. Each layer makes the next more effective. This is what 5-10x looks like.",
    },
    {
      type: "quote",
      text: "The new senior skill is deciding what NOT to build, when to stop, and when 'good enough' creates more value than 'perfect'.",
      attribution: "r/ClaudeCode, on the post-AI skill shift",
    },
    {
      type: "callout",
      text: "Domain expertise is your moat. AI makes domain-knowledge bugs regularly -- surface-level correctness does not equal actual correctness. The quality of your guidance determines the quality of the output. The model amplifies your expertise, it doesn't replace it.",
      variant: "insight",
    },
  ],
};
