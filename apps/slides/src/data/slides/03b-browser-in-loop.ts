import type { SlideData, DetailSlide } from "../types";

export const browserInLoop: SlideData = {
  id: "browser-in-loop",
  tip: "Tip 7: Let Claude see the results for more accuracy",
  headline: "One Prompt: Bug Report to Verified Fix",
  section: "core",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F50E}",
      text: "Chrome DevTools MCP lets Claude read console errors, inspect network requests, and see the DOM. It debugs what you're looking at.",
    },
  ],
};

export const browserInLoopDetails: DetailSlide[] = [
  {
    id: "browser-in-loop-d1",
    headline: "Getting DevTools Running",
    block: {
      type: "code",
      language: "text",
      code: `You: "Install the Chrome DevTools MCP and get it working."

Claude: *runs claude mcp add chrome-devtools*
        *launches Chrome with remote debugging enabled*
        *verifies connection to the running browser*
        "Ready. Open your app and I can see the console, network, and DOM."`,
      caption: "Setup has nuances (Chrome flags, port conflicts). Let Claude handle it. Once connected, Claude sees everything you see.",
    },
  },
  {
    id: "browser-in-loop-d2",
    headline: "The Full Workflow",
    block: {
      type: "code",
      language: "text",
      code: `You: "After login the dashboard shows a blank white screen.
       Use devtools to validate."

Claude: *reads console via DevTools* \u2192 finds 403 on /api/user
        *inspects network request* \u2192 auth header is missing
        *reads auth middleware* \u2192 token refresh logic skips new route
        *fixes the middleware, adds the route*
        *takes a screenshot* \u2192 dashboard loads
        "Fixed. The /api/user endpoint wasn't in the authenticated routes list."`,
      caption: "Bug report to verified fix in one prompt.",
    },
  },
  {
    id: "browser-in-loop-d3",
    headline: "Playwright: For E2E Test Generation",
    block: {
      type: "callout",
      text: "Playwright MCP drives a headless browser -- clicks, form fills, full flows. Its killer use: ask Claude to write E2E tests by actually walking through your app. DevTools observes; Playwright acts.",
      variant: "tip",
    },
  },
];
