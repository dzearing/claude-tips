import type { SlideData, DetailSlide } from "../types";

export const extendYourReach: SlideData = {
  id: "extend-your-reach",
  tip: "Tip 14: Think beyond code",
  headline: "Stop Thinking of It as a Coding Tool",
  section: "beyond",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F6E0}\u{FE0F}",
      text: "Anything you can do in a terminal, Claude can do -- and chain together. Documentation, analysis, migrations, and ops tasks all benefit from the same plan-then-execute workflow.",
    },
  ],
};

export const extendYourReachDetails: DetailSlide[] = [
  {
    id: "extend-your-reach-d1",
    headline: "Example: Release Notes in One Prompt",
    block: {
      type: "code",
      language: "text",
      code: `> "Write release notes for v2.3 from the git history.
>  Group by feature, fix, and chore. Link PRs."

Claude runs:
  git log v2.2..v2.3 --oneline --merges
  gh pr list --state merged --search "milestone:v2.3"
  # reads each PR body for context

Output: grouped changelog with PR links, contributor mentions,
and breaking-change callouts -- ready to paste into GitHub Releases.`,
      caption: "One prompt replaces 20 minutes of git log archaeology. The same pattern works for API docs, migration scripts, and dependency audits.",
    },
  },
  {
    id: "extend-your-reach-d2",
    headline: "Non-Code Tasks Worth Delegating",
    block: {
      type: "table",
      headers: ["Task", "Prompt Pattern", "What Claude Actually Does"],
      rows: [
        ["API docs", "\"Generate OpenAPI spec from our Express routes\"", "Reads route files, extracts endpoints + types, writes spec"],
        ["Bundle analysis", "\"Find our heaviest imports and suggest splits\"", "Runs build with stats, identifies heavy chunks, proposes code-splitting"],
        ["Migration scripts", "\"Generate a migration for the schema diff in this PR\"", "Diffs ORM models, writes up/down migration, verifies against DB"],
        ["Dependency audit", "\"Which deps are outdated, deprecated, or have CVEs?\"", "Runs npm audit, checks changelogs, flags breaking upgrades"],
      ],
    },
  },
];
