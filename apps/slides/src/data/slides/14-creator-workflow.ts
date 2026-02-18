import type { SlideData, DetailSlide } from "../types";

export const creatorWorkflow: SlideData = {
  id: "creator-workflow",
  tip: "Tip 15: Adopt the single-shot workflow",
  headline: "Plan Until It's Right, Then Execute in One Pass",
  section: "beyond",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F9E0}",
      text: "Speed comes from getting it right the first time, not from faster output.",
    },
  ],
};

export const creatorWorkflowDetails: DetailSlide[] = [
  {
    id: "creator-workflow-d1",
    headline: "Plan-First, Auto-Accept, Single-Shot",
    block: {
      type: "table",
      headers: ["Phase", "What You Do", "What Claude Does"],
      rows: [
        ["Plan mode", "Challenge assumptions, ask \"what about X?\"", "Explores codebase, proposes approach, iterates"],
        ["Review plan", "Read the plan. Push back on anything unclear.", "Revises until you approve"],
        ["Auto-accept", "Switch to auto-accept, walk away", "Executes the full plan in one uninterrupted pass"],
        ["Verify", "Review the diff, run tests", "One commit, one PR, done"],
      ],
    },
  },
  {
    id: "creator-workflow-d2",
    headline: "Types-First Decomposition",
    block: {
      type: "callout",
      text: "Decompose features in this order: data model (types) first, then pure logic, edge-case handling, UI, integration. Each layer has clear inputs and outputs. Claude implements typed pure functions with near-zero iteration because there's no ambiguity to resolve.",
      variant: "tip",
    },
  },
];
