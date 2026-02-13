import type { SlideData, DetailSlide } from "../types";

export const testingVerification: SlideData = {
  id: "testing-verification",
  headline: "Without Tests, Claude Guesses. With Them, It Self-Corrects.",
  subheadline: "The test runner is the feedback loop. Without it, Claude writes plausible code. With it, Claude writes working code.",
  section: "core",
  blocks: [
    {
      type: "comparison",
      before: {
        label: "Without Verification",
        items: [
          "~40% test coverage",
          "Bugs found in production",
          "Manual debugging cycles",
          "False confidence in output",
        ],
      },
      after: {
        label: "With TDD + Feedback Loops",
        items: [
          "~90% test coverage achievable",
          "70% fewer production bugs",
          "5x faster debug cycles",
          "Code actually works",
        ],
      },
    },
  ],
};

export const testingVerificationDetails: DetailSlide[] = [
  {
    id: "testing-verification-d1",
    headline: "The CLAUDE.md Test Rule",
    block: {
      type: "takeaway",
      icon: "\u{1F4CF}",
      text: "Put \"Run bun test after every change\" in your CLAUDE.md. When Claude can see test output, it self-corrects. Without test output, it guesses whether the code works. The test runner is the feedback loop.",
    },
  },
  {
    id: "testing-verification-d2",
    headline: "File Size Limits",
    block: {
      type: "takeaway",
      icon: "\u{2702}\u{FE0F}",
      text: "Keep files under 500 lines (sweet spot: 300-400). Above 3,000 lines, Claude struggles to make reliable edits -- it loses track of what's above and below the edit point. Small files are an architectural choice that directly improves AI-assisted development.",
    },
  },
  {
    id: "testing-verification-d3",
    headline: "The 1-Shot Diagnostic",
    block: {
      type: "callout",
      text: "The 1-shot test: if a task cannot complete in one prompt, either the codebase is too tangled, the requirements are unclear, or the task needs decomposition. Use this as a diagnostic.",
      variant: "tip",
    },
  },
];
