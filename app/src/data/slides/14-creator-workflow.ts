import type { SlideData } from "../types";

export const creatorWorkflow: SlideData = {
  id: "creator-workflow",
  headline: "How the Creator Works",
  subheadline: "The Claude Code creator's approach: minimal config, plan-first, accept 10-20% abandonment.",
  section: "beyond",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F9E0}",
      text: "Opus with thinking mode for all tasks. Slower token generation but higher quality means fewer iterations overall. Speed comes from getting it right the first time, not from faster output.",
    },
    {
      type: "takeaway",
      icon: "\u{1F4CB}",
      text: "Plan-first, auto-accept, single-shot. Iterate the plan in Plan mode until satisfied, then switch to auto-accept and let Claude execute in one pass. The plan is the work -- execution is mechanical.",
    },
    {
      type: "comparison",
      before: {
        label: "Heavy Config",
        items: [
          "Large CLAUDE.md (25k+ tokens)",
          "Many MCP servers loaded",
          "Complex plugin chains",
          "High startup token cost",
        ],
      },
      after: {
        label: "Creator's Approach",
        items: [
          "Light CLAUDE.md (~2.5k tokens)",
          "Minimal MCP registrations",
          "Slash commands + hooks",
          "Low overhead, high signal",
        ],
      },
    },
    {
      type: "callout",
      text: "Types-first decomposition: data model (types) first, then pure logic, edge logic, UI, integration. A pure function is perfectly described by name + input type + output type. Claude implements these with near-zero iteration because there's no ambiguity.",
      variant: "tip",
    },
  ],
};
