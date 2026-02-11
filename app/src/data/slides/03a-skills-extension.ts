import type { SlideData } from "../types";

export const skillsExtension: SlideData = {
  id: "skills-extension",
  headline: "Skills Change the Game",
  subheadline: "Reusable prompt workflows that load only when triggered. Zero context cost until invoked.",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F9E9}",
      text: "Skills are prompt+tool orchestration that fire on context or manual trigger. Unlike CLAUDE.md (always loaded) or MCP (schemas always in context), skills add zero overhead until they activate. This makes them the most context-efficient extension point.",
    },
    {
      type: "table",
      headers: ["Skill Pack", "What It Does", "Key Skills"],
      rows: [
        ["Superpowers", "Structured dev workflows", "Brainstorming, TDD, debugging, code review, parallel agents"],
        ["GSD", "Project orchestration", "Phase planning, wave-based parallel execution, verification"],
        ["Kata", "Natural language triggers", "GSD fork with conversational skill activation"],
        ["Your own", "Anything repeatable", "/commit, /review-pr, /research, /deploy"],
      ],
    },
    {
      type: "callout",
      text: "When to use what: CLAUDE.md for conventions that apply everywhere. Slash commands for one-off tasks you trigger manually. Skills for multi-step workflows that benefit from structured prompts. Hooks for enforcement that must happen every time.",
      variant: "tip",
    },
    {
      type: "takeaway",
      icon: "\u{1F50D}",
      text: "Discovery: browse skills at the Anthropic marketplace, search community repos, or ask Claude \"find a skill for X\" if you have a find-skills skill installed. Skills compose -- a brainstorming skill can chain into a planning skill, which chains into parallel execution.",
    },
  ],
};
