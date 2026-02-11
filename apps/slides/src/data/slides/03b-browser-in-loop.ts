import type { SlideData } from "../types";

export const browserInLoop: SlideData = {
  id: "browser-in-loop",
  headline: "Browser-in-the-Loop Development",
  subheadline: "Chrome DevTools and Playwright MCP turn Claude into a full-stack debugging partner.",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F50E}",
      text: "The debugging loop: you see a bug in the browser \u2192 tell Claude \u2192 it reads console errors via DevTools MCP \u2192 inspects network requests \u2192 reads the DOM \u2192 identifies the root cause \u2192 fixes the code \u2192 takes a screenshot to verify. One prompt, full cycle.",
    },
    {
      type: "comparison",
      before: {
        label: "Chrome DevTools MCP",
        items: [
          "Debug against a running app",
          "Read console logs and errors",
          "Inspect network requests/responses",
          "Take DOM snapshots, run JS",
        ],
      },
      after: {
        label: "Playwright MCP",
        items: [
          "Automate browser interactions",
          "Fill forms, click through flows",
          "Generate E2E test scripts",
          "Screenshot comparison for visual regression",
        ],
      },
    },
    {
      type: "code",
      language: "text",
      code: `You: "After login the dashboard shows a blank white screen."

Claude: *reads console via DevTools* \u2192 finds 403 on /api/user
        *inspects network request* \u2192 auth header is missing
        *reads auth middleware* \u2192 token refresh logic skips new route
        *fixes the middleware, adds the route*
        *navigates to login via Playwright, verifies dashboard loads*
        "Fixed. The /api/user endpoint wasn't in the authenticated routes list."`,
      caption: "Real workflow: bug report to verified fix in a single session, no manual browser switching.",
    },
    {
      type: "callout",
      text: "Browser MCPs are the heaviest context consumers (~30% of window for tool schemas). Enable lazy-loading (ENABLE_TOOL_SEARCH=true) so tools only appear when Claude needs them, or only enable these MCPs when doing frontend work.",
      variant: "warning",
    },
  ],
};
