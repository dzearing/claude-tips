import type { SlideData, DetailSlide } from "../types";

export const skillsExtension: SlideData = {
  id: "skills-extension",
  headline: "Zero Context Cost Until They Fire",
  subheadline: "Skills are prompt+tool orchestration that load only when triggered. Unlike CLAUDE.md or MCP schemas, they add zero overhead until they activate.",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F9E9}",
      text: "Skills are the most context-efficient extension point. They fire on context or manual trigger, run their workflow, and disappear. This makes them ideal for multi-step processes you'd otherwise repeat manually every time.",
    },
  ],
};

export const skillsExtensionDetails: DetailSlide[] = [
  {
    id: "skills-extension-d1",
    headline: "Skill Packs Worth Knowing",
    block: {
      type: "table",
      headers: ["Skill Pack", "What It Does", "Key Skills"],
      rows: [
        ["Superpowers", "Structured dev workflows", "Brainstorming, TDD, debugging, code review, parallel agents"],
        ["GSD", "Project orchestration", "Phase planning, wave-based parallel execution, verification"],
        ["Kata", "Natural language triggers", "GSD fork with conversational skill activation"],
        ["Your own", "Anything repeatable", "/commit, /review-pr, /research, /deploy"],
      ],
    },
  },
  {
    id: "skills-extension-d2",
    headline: "When to Use What",
    block: {
      type: "callout",
      text: "When to use what: CLAUDE.md for conventions that apply everywhere. Slash commands for one-off tasks you trigger manually. Skills for multi-step workflows that benefit from structured prompts. Hooks for enforcement that must happen every time.",
      variant: "tip",
    },
  },
  {
    id: "skills-extension-d3",
    headline: "Discovery and Composition",
    block: {
      type: "takeaway",
      icon: "\u{1F50D}",
      text: "Discovery: browse skills at the Anthropic marketplace, search community repos, or ask Claude \"find a skill for X\" if you have a find-skills skill installed. Skills compose -- a brainstorming skill can chain into a planning skill, which chains into parallel execution.",
    },
  },
];
