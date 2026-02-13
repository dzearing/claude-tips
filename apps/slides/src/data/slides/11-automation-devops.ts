import type { SlideData, DetailSlide } from "../types";

export const automationDevops: SlideData = {
  id: "automation-devops",
  headline: "Hooks Enforce What CLAUDE.md Can Only Suggest",
  subheadline: "Auto-format on every edit. Block commits unless tests pass. Zero context cost.",
  section: "advanced",
  blocks: [
    {
      type: "takeaway",
      icon: "\u{1F517}",
      text: "Hooks run externally with zero context cost -- they don't consume tokens or pollute the conversation. This is why they enforce better than CLAUDE.md: your CLAUDE.md says \"run tests after changes\" (advisory), your hook actually runs them (enforced).",
    },
  ],
};

export const automationDevopsDetails: DetailSlide[] = [
  {
    id: "automation-devops-d1",
    headline: "Hooks Configuration",
    block: {
      type: "code",
      language: "json",
      code: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "prettier --write $FILE_PATH || true"
      }]
    }],
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "echo $TOOL_INPUT | grep -q 'git commit' && bun test || true"
      }]
    }]
  }
}`,
      caption: "Two hooks that pay for themselves immediately: auto-format every file write, and run tests before every commit.",
    },
  },
  {
    id: "automation-devops-d2",
    headline: "Block at Commit, Not at Write",
    block: {
      type: "takeaway",
      icon: "\u{1F6A7}",
      text: "Block at commit, not at write. Blocking mid-plan confuses the agent -- it doesn't know whether the write failed or the hook rejected it. Let Claude finish its work, then validate at the commit stage where a failure is unambiguous.",
    },
  },
  {
    id: "automation-devops-d3",
    headline: "One Task = One Commit",
    block: {
      type: "callout",
      text: "Each task = one commit. This gives you git bisect for free -- when something breaks, bisect finds the exact commit. Atomic commits make rollback trivial and keep your git history useful.",
      variant: "tip",
    },
  },
];
