import type { SlideData, DetailSlide } from "../types";

export const mcpIntegrations: SlideData = {
  id: "mcp-integrations",
  tip: "Tip 12: Pick three MCPs and stop",
  headline: "Three MCPs. The Rest Is Optional.",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F4A1}",
      text: "DevTools + Playwright + GitHub. The power is combining them in one session.",
    },
  ],
};

export const mcpIntegrationsDetails: DetailSlide[] = [
  {
    id: "mcp-integrations-d1",
    headline: "The Essential Three",
    block: {
      type: "table",
      headers: ["MCP", "What It Unlocks", "When to Reach for It"],
      rows: [
        ["Chrome DevTools", "Console, network, DOM, perf tracing on a live app", "\"Why is this page blank?\" \u2192 reads console errors, inspects failed requests"],
        ["Playwright", "Automated clicks, form fills, screenshots, E2E flows", "\"Test the signup flow\" \u2192 fills form, submits, verifies redirect"],
        ["GitHub", "PRs, issues, code search, review comments across repos", "\"Address PR feedback\" \u2192 reads comments, fixes, pushes, responds"],
      ],
    },
  },
  {
    id: "mcp-integrations-d2",
    headline: "Install Commands",
    block: {
      type: "code",
      language: "bash",
      code: `# The three that matter for web dev
claude mcp add playwright -- npx @playwright/mcp@latest
claude mcp add chrome-devtools -- npx @anthropic-ai/chrome-devtools-mcp@latest
claude mcp add github -- npx @anthropic-ai/github-mcp@latest

# Verify what's loaded and the context cost
/mcp`,
      caption: "Install all three. Then enable lazy-loading to avoid paying the context cost when you don't need them.",
    },
  },
  {
    id: "mcp-integrations-d3",
    headline: "Schema Cost Warning",
    block: {
      type: "callout",
      text: "Each MCP's tool schemas consume context just by being registered. Browser MCPs are the heaviest (~30%). Set ENABLE_TOOL_SEARCH=true in settings so tool schemas only load when Claude actually needs them. Audit with /mcp regularly.",
      variant: "warning",
    },
  },
];
