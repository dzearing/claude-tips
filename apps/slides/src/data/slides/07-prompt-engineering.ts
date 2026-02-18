import type { SlideData, DetailSlide } from "../types";

export const promptEngineering: SlideData = {
  id: "prompt-engineering",
  tip: "Tip 10: Front-load your planning",
  headline: "A Good Plan = A Complete PR in One Shot",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F5FA}\u{FE0F}",
      text: "Iterate the plan, not the code. Shift+Tab, challenge assumptions, then auto-accept.",
    },
  ],
};

export const promptEngineeringDetails: DetailSlide[] = [
  {
    id: "prompt-engineering-d1",
    headline: "Tell Claude What, Not How",
    block: {
      type: "takeaway",
      icon: "\u{1F3AF}",
      text: "Tell Claude what and why, not how. \"Add rate limiting to the API because we're getting hammered by bots\" gives Claude enough context to make good architectural decisions. \"Add a counter variable that increments\" is micromanagement.",
    },
  },
  {
    id: "prompt-engineering-d2",
    headline: "Plan-First Discipline",
    block: {
      type: "quote",
      text: "I never let Claude just start coding. Every feature started with: 'Here's what I want. Here's my approach. Do you agree?' Only after we agreed on a plan did I say 'implement it.'",
      attribution: "Game developer who shipped a full product",
    },
  },
  {
    id: "prompt-engineering-d3",
    headline: "Batch Your Instructions",
    block: {
      type: "callout",
      text: "Batched instructions save tokens and improve quality. \"Fix the login bug, update the tests, and run the linter\" in one message is cheaper and more coherent than 3 separate exchanges. Every message replays the full context.",
      variant: "tip",
    },
  },
];
