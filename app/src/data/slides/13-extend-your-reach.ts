import type { SlideData } from "../types";

export const extendYourReach: SlideData = {
  id: "extend-your-reach",
  headline: "Extend Your Reach",
  subheadline: "Claude has access to every CLI tool on your machine. Use that for more than just code edits.",
  section: "beyond",
  blocks: [
    {
      type: "table",
      headers: ["Task", "What You Say", "What Claude Does"],
      rows: [
        ["API docs from code", "\"Generate API docs from our Express routes\"", "Reads route files, extracts endpoints/params/types, writes OpenAPI spec or markdown"],
        ["Release notes", "\"Write release notes for v2.3 from the git history\"", "Runs git log between tags, groups by type, writes human-readable changelog"],
        ["Bundle analysis", "\"Analyze our bundle size and suggest code-splitting\"", "Runs build with stats, reads webpack/vite output, identifies heavy imports"],
        ["Migration scripts", "\"Generate a migration for the schema changes in this PR\"", "Diffs ORM models, writes up/down migration, verifies against DB schema"],
        ["Library comparison", "\"Compare date-fns vs dayjs vs temporal for our use case\"", "Checks bundle size, API surface, tree-shaking support, maintenance activity"],
      ],
    },
    {
      type: "takeaway",
      icon: "\u{270D}\u{FE0F}",
      text: "Voice memo to article pipeline: record thoughts during walks with SuperWhisper/Wispr Flow, Claude transcribes and generates full articles matching your voice. Writing becomes editing. One developer produces all their blog content this way.",
    },
    {
      type: "callout",
      text: "Stop thinking of Claude Code as a coding tool. Think of it as an intelligent agent with access to your local machine and all its command-line tools. If you can do it in a terminal, Claude can do it -- often faster.",
      variant: "insight",
    },
  ],
};
