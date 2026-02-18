import type { SlideData, DetailSlide } from "../types";

export const guardrails: SlideData = {
  id: "guardrails",
  tip: "Tip 5: Put Claude on rails",
  headline: "CLAUDE.md Is Layer One. You Need Five.",
  section: "guardrails",
  blocks: [
    {
      type: "table",
      headers: ["Layer", "What It Enforces", "Compliance"],
      rows: [
        ["CLAUDE.md", "Conventions, preferences, workflow rules", "~80% (advisory)"],
        ["Linters + Formatters", "Style, imports, naming, formatting", "100% (hooks)"],
        ["Type System", "Valid values, API shapes, impossible states", "100% (compiler)"],
        ["Structured Docs", "Architecture context, package boundaries", "Passive (Claude reads first)"],
        ["Test Gates", "Correctness at commit time", "100% (hooks block landing)"],
      ],
    },
  ],
};

export const guardrailsDetails: DetailSlide[] = [
  {
    id: "guardrails-d1",
    headline: "CLAUDE.md: Small, Sharp, and Not Enough",
    block: {
      type: "comparison",
      before: {
        label: "Heavy Config",
        items: [
          "25k tokens (~9% of context window)",
          "Rules buried deep in the file",
          "Compliance drops as file grows",
          "Claude skims past long instructions",
        ],
      },
      after: {
        label: "Light Config",
        items: [
          "~2.5k tokens (minimal overhead)",
          "Critical rules at top of file",
          "Three tiers: global, project, subdirectory",
          "Stickier -- Claude follows short, direct rules",
        ],
      },
    },
    caption:
      "Keep each CLAUDE.md tier small. Rules at the top carry the most weight. ~80% compliance means you need the next four layers.",
  },
  {
    id: "guardrails-d2",
    headline: "Linters: 100% Compliance at Zero Context Cost",
    block: {
      type: "code",
      language: "json",
      code: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "prettier --write $FILE_PATH && eslint --fix $FILE_PATH || true"
      }]
    }]
  }
}`,
      caption:
        "Hooks enforce what CLAUDE.md suggests. Formatting, imports, and naming are guaranteed externally -- zero tokens consumed, 100% compliance.",
    },
  },
  {
    id: "guardrails-d3",
    headline: "Encode Rules in Types, Not Markdown",
    block: {
      type: "code",
      language: "typescript",
      code: `// Instead of CLAUDE.md: "only use sm, md, lg for sizes"
// Encode it in the type system:

type Size = "sm" | "md" | "lg";

interface ButtonProps {
  size: Size;        // Compiler rejects "extra-large"
  variant: "primary" | "secondary" | "ghost";
  disabled?: boolean;
}

// Pure function: name + input type + output type = complete spec
function getButtonClass(props: ButtonProps): string { ... }`,
      caption:
        "Types-first decomposition: the compiler rejects invalid values before Claude even runs. Pure functions with typed signatures achieve near-zero iteration.",
    },
  },
  {
    id: "guardrails-d4",
    headline: "Structured Docs That Claude Can Find",
    block: {
      type: "table",
      headers: ["Practice", "What It Does"],
      rows: [
        ["README per package", "Claude reads it first -- orients before coding"],
        ["ARCHITECTURE.md at repo root", "System-level context: boundaries, data flow, invariants"],
        ["500-line file limit", "Small files = reliable edits. Above 3k lines, Claude loses track."],
        ["Require doc updates with features", "Add to CLAUDE.md: 'update relevant docs when changing features'"],
        ["Periodic doc defrag", "Remove stale docs so Claude doesn't learn outdated patterns"],
      ],
    },
    caption:
      "The goal: Claude finds concise, current docs instead of inventing its own mental model. Applies at both repo and package level.",
  },
  {
    id: "guardrails-d5",
    headline: "Tests Gate the Exit, Not Just the Code",
    block: {
      type: "takeaway",
      icon: "\u{1F6A7}",
      text: 'Two kinds of test gates: (1) unit tests via CLAUDE.md "run npm test after every change" for in-flight self-correction, and (2) integration/E2E tests as commit hooks that block landing. Together they catch errors early and prevent them from landing.',
    },
    caption:
      "Block at commit, not at write. Let Claude finish its work, then validate. A commit-time failure is unambiguous; a mid-write failure confuses the agent.",
  },
];
