import type { SlideData, DetailSlide } from "../types";

export const skillsExtension: SlideData = {
  id: "skills-extension",
  tip: "Tip 6: Build slash commands (skills) for everything repeatable",
  headline: "Zero Context Cost Until They Fire",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F9E9}",
      text: "A slash command is a markdown file in .claude/commands/. It loads on trigger, runs its workflow, and disappears. Zero context overhead until you invoke it.",
    },
  ],
};

export const skillsExtensionDetails: DetailSlide[] = [
  {
    id: "skills-extension-d1",
    headline: "Create a Skill in 60 Seconds",
    block: {
      type: "code",
      language: "text",
      code: `You: "Create a /review-pr slash command that reads
       every changed file, checks for security issues
       and style violations, and posts a summary comment."

Claude: *creates .claude/commands/review-pr.md*
        *adds $ARGUMENTS placeholder for the PR number*
        "Done. Try it: /review-pr 142"`,
      caption: "Just describe what you want the skill to do. Claude writes the markdown file and wires it up.",
    },
  },
  {
    id: "skills-extension-d2",
    headline: "When to Use What",
    block: {
      type: "table",
      headers: ["Mechanism", "When"],
      rows: [
        ["CLAUDE.md", "Conventions that apply to every session"],
        ["Slash command", "Repeatable workflows you trigger with /name"],
        ["Hook", "Enforcement that runs automatically, every time"],
      ],
    },
  },
  {
    id: "skills-extension-d3",
    headline: "Skill Packs Worth Knowing",
    block: {
      type: "table",
      headers: ["Pack", "What It Does"],
      rows: [
        ["Superpowers", "Brainstorming, TDD, debugging, code review, parallel agents"],
        ["GSD", "Phase planning, wave-based parallel execution, verification"],
        ["Your own", "Anything repeatable: /deploy, /research, /review-pr"],
      ],
    },
  },
];
