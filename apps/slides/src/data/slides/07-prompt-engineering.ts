import type { SlideData } from "../types";

export const promptEngineering: SlideData = {
  id: "prompt-engineering",
  headline: "Plan Before You Build",
  subheadline: "Quality plans produce single-shot PRs. Vague prompts produce iteration debt.",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F5FA}\u{FE0F}",
      text: "Use Plan Mode (Shift+Tab) to iterate on approach before execution. Challenge assumptions, ask \"what about X?\", push back on the plan. Once the plan is solid, switch to auto-accept and let Claude execute in one pass. A good plan = a complete PR with zero back-and-forth.",
    },
    {
      type: "takeaway",
      icon: "\u{1F3AF}",
      text: "Tell Claude what and why, not how. \"Add rate limiting to the API because we're getting hammered by bots\" gives Claude enough context to make good architectural decisions. \"Add a counter variable that increments\" is micromanagement.",
    },
    {
      type: "quote",
      text: "I never let Claude just start coding. Every feature started with: 'Here's what I want. Here's my approach. Do you agree?' Only after we agreed on a plan did I say 'implement it.'",
      attribution: "Game developer who shipped a full product",
    },
    {
      type: "callout",
      text: "Batched instructions save tokens and improve quality. \"Fix the login bug, update the tests, and run the linter\" in one message is cheaper and more coherent than 3 separate exchanges. Every message replays the full context.",
      variant: "tip",
    },
  ],
};
