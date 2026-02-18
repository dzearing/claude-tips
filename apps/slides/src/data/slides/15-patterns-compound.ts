import type { SlideData, DetailSlide } from "../types";

export const patternsCompound: SlideData = {
  id: "patterns-compound",
  tip: "Tip 16: Stack the patterns",
  headline: "Any Single Tip Saves Minutes. Stacked, They Transform.",
  section: "beyond",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F4A1}",
      text: "Types-first + plan mode + fresh context + skills + hooks + browser verification. Each layer amplifies the next.",
    },
  ],
};

export const patternsCompoundDetails: DetailSlide[] = [
  {
    id: "patterns-compound-d1",
    headline: "Alone vs Stacked",
    block: {
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
  },
  {
    id: "patterns-compound-d2",
    headline: "The New Senior Skill",
    block: {
      type: "quote",
      text: "The new senior skill is deciding what NOT to build, when to stop, and when 'good enough' creates more value than 'perfect'.",
      attribution: "r/ClaudeCode, on the post-AI skill shift",
    },
  },
  {
    id: "patterns-compound-d3",
    headline: "Domain Expertise Is Your Moat",
    block: {
      type: "callout",
      text: "Domain expertise is your moat. AI makes domain-knowledge bugs regularly -- surface-level correctness does not equal actual correctness. The quality of your guidance determines the quality of the output. The model amplifies your expertise, it doesn't replace it.",
      variant: "insight",
    },
  },
];
