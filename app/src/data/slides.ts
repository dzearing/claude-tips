import type { PanelData } from "./types";

export const panels: PanelData[] = [
  // ─── Hero ───
  {
    id: "hero",
    type: "hero",
  },

  // ═══════════════════════════════════════════
  //  SECTION 1: Foundation
  // ═══════════════════════════════════════════
  {
    id: "section-foundation",
    type: "section-divider",
    title: "Foundation",
    subtitle: "The mental model shift and configuration that changes everything else.",
    section: "foundation",
  },

  // 00 - Mindset Shift
  {
    id: "mindset-shift",
    headline: "You Are the Director Now",
    subheadline: "Stop executing. Start describing, reviewing, and directing.",
    section: "foundation",
    blocks: [
      {
        type: "comparison",
        before: {
          label: "Old Model",
          items: [
            "Look up docs manually",
            "Memorize CLI syntax",
            "Write every line yourself",
            "Context-switch between tools",
          ],
        },
        after: {
          label: "New Model",
          items: [
            "Describe intent, review output",
            "Delegate commands to Claude",
            "Direct architecture, verify results",
            "Stay in one flow, delegate tasks",
          ],
        },
      },
      {
        type: "quote",
        text: "I haven't written code in the traditional sense in about a quarter. This is not a fad. Embrace it and be the person who moves your workflows into skills. Resistance is career limiting.",
        attribution: "25-year veteran developer, r/ClaudeCode",
      },
      {
        type: "callout",
        text: "The bottleneck has moved from code execution to knowing what to build and why. Your domain expertise is the moat, not typing speed.",
        variant: "insight",
      },
    ],
  },

  // 01 - CLAUDE.md Configuration
  {
    id: "claude-md",
    headline: "CLAUDE.md is Your Persistent Memory",
    subheadline: "10 minutes to write. Hours saved in every session after.",
    section: "foundation",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F3E0}",
        text: "Global rules at ~/.claude/CLAUDE.md load into every session. Project rules at ./CLAUDE.md load for that repo. Directory-specific files load on demand.",
      },
      {
        type: "takeaway",
        icon: "\u{1F4DD}",
        text: "Codify failures, not just patterns. Negative rules (\"NEVER use X\") prevent the exact class of mistakes LLMs tend to repeat.",
      },
      {
        type: "code",
        language: "markdown",
        code: `# CLAUDE.md
- Use bun, not npm
- NEVER add !important to CSS
- Run \`bun test\` after every change
- Prefer functions over classes
- File limit: 300 lines max`,
        caption: "Actionable rules ranked by priority. Top of file = highest weight.",
      },
      {
        type: "callout",
        text: "Instructions are advisory, not binding. Even ALL CAPS / MUST only achieves ~80% compliance. Pair CLAUDE.md with hooks for enforcement.",
        variant: "warning",
      },
    ],
  },

  // 02 - Context Management
  {
    id: "context-management",
    headline: "Context Is Your Scarcest Resource",
    subheadline: "Only 50-60% of the 200k window is usable. Manage it or quality degrades.",
    section: "foundation",
    blocks: [
      {
        type: "stat",
        value: "40%",
        label: "Maximum context before quality drops",
        detail: "Everything in context resends with every message. What was signal 5 prompts ago becomes noise.",
      },
      {
        type: "table",
        headers: ["Component", "Tokens", "% of 200k"],
        rows: [
          ["System prompt", "~18k", "9%"],
          ["MCP tool schemas", "16k-60k", "8-30%"],
          ["Auto-compact buffer", "~32k", "16%"],
          ["Available for work", "95k-140k", "47-70%"],
        ],
      },
      {
        type: "takeaway",
        icon: "\u{1F9F9}",
        text: "Use /clear and reload from a handoff doc (markdown with progress, decisions, next steps) rather than relying on /compact for task switches.",
      },
      {
        type: "quote",
        text: "You should think of everything in your context as either signal or noise. What was signal 5 prompts ago is now noise.",
        attribution: "r/ClaudeCode, 351 upvotes",
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  SECTION 2: Core Workflows
  // ═══════════════════════════════════════════
  {
    id: "section-core",
    type: "section-divider",
    title: "Core Workflows",
    subtitle: "The techniques that multiply your output day-to-day.",
    section: "core",
  },

  // 03a - Skills & Commands (Extension Points)
  {
    id: "skills-extension",
    headline: "Four Extension Points",
    subheadline: "CLAUDE.md, Skills, Slash Commands, and Hooks -- choose correctly to avoid context bloat.",
    section: "core",
    blocks: [
      {
        type: "table",
        headers: ["Mechanism", "When", "Context Cost"],
        rows: [
          ["CLAUDE.md", "Always-on conventions", "Loaded at startup"],
          ["Slash Commands", "One-shot manual tasks", "Loaded on invoke"],
          ["Skills", "Rich auto-applied logic", "On demand"],
          ["Hooks", "Event-driven automation", "Zero (runs external)"],
        ],
      },
      {
        type: "callout",
        text: "Skills might be a bigger deal than MCP. They formalize reusable prompt workflows that load only when needed, keeping your context clean.",
        variant: "insight",
      },
      {
        type: "takeaway",
        icon: "\u{1F50C}",
        text: "Community plugins (Superpowers, GSD, Kata) add orchestration layers. GSD has 15k+ installs. Evaluate whether the token overhead fits your workflow.",
      },
    ],
  },

  // 03b - Skills (Agent Teams)
  {
    id: "skills-agents",
    headline: "Multi-Agent Coordination",
    subheadline: "From subagents to full agent teams -- scale up when single sessions hit limits.",
    section: "core",
    blocks: [
      {
        type: "comparison",
        before: {
          label: "Single Agent",
          items: [
            "One context window",
            "Sequential execution",
            "Context fills up fast",
            "Good for focused tasks",
          ],
        },
        after: {
          label: "Agent Teams",
          items: [
            "3-5 agents with messaging",
            "Parallel execution",
            "Fresh context per agent",
            "Good for complex coordination",
          ],
        },
      },
      {
        type: "callout",
        text: "Agent Teams used 367k tokens for a task that takes 30k sequentially (12x overhead). Use them for genuinely complex coordination, not as a default.",
        variant: "warning",
      },
    ],
  },

  // 04 - Parallel Workflows
  {
    id: "parallel-workflows",
    headline: "Run Five Sessions, Not One",
    subheadline: "The Claude Code creator runs 5-10 simultaneous sessions. This is the multiplier.",
    section: "core",
    blocks: [
      {
        type: "table",
        headers: ["Strategy", "Best For", "Isolation"],
        rows: [
          ["Terminal tabs", "Independent tasks", "Session only"],
          ["Git worktrees", "Feature branches", "Branch + directory"],
          ["Separate clones", "Max isolation", "Full filesystem"],
          ["Subagents", "Read-heavy, same branch", "Context window"],
        ],
      },
      {
        type: "stat",
        value: "99%",
        label: "GCC test pass rate",
        detail: "C compiler built with 16 parallel agents, 2,000+ sessions, 100k lines of Rust output.",
      },
      {
        type: "takeaway",
        icon: "\u{1F3AF}",
        text: "Expect 10-20% of parallel sessions to be abandoned. That is normal and factored into the workflow. The overall throughput still far exceeds sequential work.",
      },
    ],
  },

  // 05 - Git and Code Review
  {
    id: "git-code-review",
    headline: "Delegate Git, Review Diffs",
    subheadline: "Let Claude handle commits, branches, and PR creation. Your job is the code review.",
    section: "core",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F4E6}",
        text: "Draft PRs let you review in GitHub's interface before marking ready. Use gh pr view and gh pr diff for interactive review from the terminal.",
      },
      {
        type: "takeaway",
        icon: "\u{1F6D1}",
        text: "Commit before any large refactor as a checkpoint. One developer lost 3 hours of work to a botched migration that touched every model file.",
      },
      {
        type: "quote",
        text: "Trust but verify. Claude handles 90% of the work. Your job is catching the 10% it misses.",
        attribution: "Community developer, r/ClaudeCode",
      },
      {
        type: "callout",
        text: "Review diffs for semantic correctness, not just functional bugs. Claude may substitute similar-sounding field names (e.g. created_at for birth_date).",
        variant: "warning",
      },
    ],
  },

  // 06 - Testing and Verification
  {
    id: "testing-verification",
    headline: "Verification Is the Whole Game",
    subheadline: "Without feedback loops, Claude writes plausible code. With them, it writes working code.",
    section: "core",
    blocks: [
      {
        type: "comparison",
        before: {
          label: "Without Verification",
          items: [
            "~40% test coverage",
            "Bugs found in production",
            "Manual debugging cycles",
            "False confidence in output",
          ],
        },
        after: {
          label: "With TDD + Feedback Loops",
          items: [
            "~90% test coverage achievable",
            "70% fewer production bugs",
            "5x faster debug cycles",
            "Code actually works",
          ],
        },
      },
      {
        type: "takeaway",
        icon: "\u{1F4CF}",
        text: "Keep files under 500 lines (sweet spot: 300-400). Above 3,000 lines, Claude struggles to make reliable edits.",
      },
      {
        type: "callout",
        text: "The 1-shot test: if a task cannot complete in one prompt, your codebase is messy, requirements are unclear, or decomposition is needed.",
        variant: "tip",
      },
    ],
  },

  // 07 - Prompt Engineering
  {
    id: "prompt-engineering",
    headline: "Plan Before You Build",
    subheadline: "Quality plans produce single-shot PRs. Vague prompts produce iteration debt.",
    section: "core",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F5FA}\u{FE0F}",
        text: "Use Plan Mode (Shift+Tab) to iterate on approach before execution. A good plan often results in a complete working PR without further back-and-forth.",
      },
      {
        type: "takeaway",
        icon: "\u{1F3AF}",
        text: "Tell Claude what and why, not how. Give room for architectural decisions. Surgical scoping (specific files, clear constraints) reduces token consumption dramatically.",
      },
      {
        type: "quote",
        text: "I never let Claude just start coding. Every feature started with: 'Here's what I want. Here's my approach. Do you agree?' Only after we agreed on a plan did I say 'implement it.'",
        attribution: "Game developer who shipped a full product",
      },
      {
        type: "callout",
        text: "Batched instructions save tokens: 15 micro-iterations cost more than 1-2 well-scoped combined exchanges.",
        variant: "tip",
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  SECTION 3: Advanced
  // ═══════════════════════════════════════════
  {
    id: "section-advanced",
    type: "section-divider",
    title: "Advanced",
    subtitle: "Terminal power-ups, integrations, cost control, and safety.",
    section: "advanced",
  },

  // 08 - Terminal Setup
  {
    id: "terminal-setup",
    headline: "Small Setup, Daily Compound",
    subheadline: "Aliases, status lines, and keyboard shortcuts that save seconds every invocation.",
    section: "advanced",
    blocks: [
      {
        type: "code",
        language: "bash",
        code: `alias c='claude'
alias ch='claude --chrome'
alias cc='claude --continue'
alias cm='claude --model opus'`,
        caption: "Terminal aliases. One afternoon of setup, daily compound returns.",
      },
      {
        type: "takeaway",
        icon: "\u{2328}\u{FE0F}",
        text: "Escape stops the current task (safe). Ctrl+C exits Claude entirely (dangerous). Shift+Tab toggles Plan mode. These three shortcuts prevent the most common mistakes.",
      },
      {
        type: "takeaway",
        icon: "\u{1F399}\u{FE0F}",
        text: "Voice input (SuperWhisper, Wispr Flow) enables hands-free prompting. One developer's workflow: open sessions, voice-assign tasks, switch between, approve by voice.",
      },
      {
        type: "quote",
        text: "After 30 years of IDEs, I find using the CLI Claude faster to work with.",
        attribution: "30-year veteran developer",
      },
    ],
  },

  // 09 - MCP and Integrations
  {
    id: "mcp-integrations",
    headline: "MCP Connects the World",
    subheadline: "Browser automation, external APIs, and local models -- but watch the context cost.",
    section: "advanced",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F30D}",
        text: "MCP tool schemas consume 8-30% of your context window upfront. Audit registrations with /mcp and lazy-load where possible.",
      },
      {
        type: "code",
        language: "bash",
        code: `# Add Playwright browser automation
claude mcp add playwright \\
  npx @playwright/mcp@latest

# Check registered tools
/mcp`,
        caption: "MCP servers install with one command. Playwright enables full browser testing.",
      },
      {
        type: "takeaway",
        icon: "\u{1F4B0}",
        text: "Smart model routing saves 50-60% on monthly bills. Route boilerplate to cheaper models (~70% of tasks), reserve Opus for architecture and debugging (~30%).",
      },
      {
        type: "stat",
        value: "40M",
        label: "tokens/day processed locally",
        detail: "One developer runs 96% of processing on consumer GPUs (RTX 3090 + 4060 Ti).",
      },
    ],
  },

  // 10 - Token Optimization
  {
    id: "token-optimization",
    headline: "Every Message Costs Full Context",
    subheadline: "A 1-word reply in a 100k-token conversation costs ~100k input tokens. Not 1.",
    section: "advanced",
    blocks: [
      {
        type: "stat",
        value: "41%",
        label: "system overhead reduction possible",
        detail: "Disable auto-updater + enable lazy-load MCP tools. System prompt drops from ~18k to ~10k tokens.",
      },
      {
        type: "code",
        language: "json",
        code: `{
  "env": {
    "DISABLE_AUTOUPDATER": "1",
    "ENABLE_TOOL_SEARCH": "true"
  }
}`,
        caption: "Settings to reduce startup token overhead.",
      },
      {
        type: "takeaway",
        icon: "\u{26A0}\u{FE0F}",
        text: "Subagent token waste is hidden. Explore agents can burn 100k-300k tokens per research pass. Plan mode double-bills when compaction triggers a fresh planning context.",
      },
      {
        type: "callout",
        text: "A \"thanks\" message in a long session consumes 5-7% of your quota. Every throwaway message re-reads the entire conversation.",
        variant: "warning",
      },
    ],
  },

  // 11 - Automation and DevOps
  {
    id: "automation-devops",
    headline: "Hooks Turn Chat Into Pipeline",
    subheadline: "Auto-format on every edit. Block commits unless tests pass. Zero manual intervention.",
    section: "advanced",
    blocks: [
      {
        type: "code",
        language: "json",
        code: `{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "bun run format || true"
      }]
    }]
  }
}`,
        caption: "Auto-format hook. Runs after every file write or edit.",
      },
      {
        type: "takeaway",
        icon: "\u{1F6A7}",
        text: "Block at commit, not at write. Blocking mid-plan confuses the agent. Let it finish work, validate at the commit stage.",
      },
      {
        type: "takeaway",
        icon: "\u{1F504}",
        text: "GSD (Get Shit Done) spawns fresh subagents with 200k context each. Wave-based parallelism runs 6 plans in 3 rounds. Each agent starts clean.",
      },
      {
        type: "callout",
        text: "Each task = one commit. git bisect finds the exact failing task. Atomic commits make rollback trivial.",
        variant: "tip",
      },
    ],
  },

  // 12 - Containers and Safety
  {
    id: "containers-safety",
    headline: "Defense in Depth",
    subheadline: "Docker containers, permission deny-lists, and hooks create layered security for autonomous work.",
    section: "advanced",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F6E1}\u{FE0F}",
        text: "The lethal trifecta: never give agents simultaneous access to (1) private data, (2) untrusted content, and (3) external communication. All three together = data breach vector.",
      },
      {
        type: "table",
        headers: ["Level", "Mode", "Risk"],
        rows: [
          ["1", "Default (ask permission)", "Lowest"],
          ["2", "Auto (files only)", "Low"],
          ["3", "Selective permissions", "Medium"],
          ["4", "Sandbox (working dir only)", "Medium"],
          ["5", "--dangerously-skip-permissions", "High"],
          ["6", "Skip + Docker container", "Contained"],
        ],
      },
      {
        type: "quote",
        text: "Design systems under the assumption that prompt injection will succeed. Build external controls that limit damage regardless of what the LLM decides to do.",
        attribution: "Security engineering principle",
      },
    ],
  },

  // ═══════════════════════════════════════════
  //  SECTION 4: Beyond Code
  // ═══════════════════════════════════════════
  {
    id: "section-beyond",
    type: "section-divider",
    title: "Beyond Code",
    subtitle: "Claude Code as a universal computer interface, creator workflows, and what comes next.",
    section: "beyond",
  },

  // 13 - Non-Code Uses
  {
    id: "non-code-uses",
    headline: "Not Just a Coding Tool",
    subheadline: "Research, writing, data analysis, media editing -- anything a terminal can do.",
    section: "beyond",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F3AE}",
        text: "A non-programmer shipped a full retro game (120 files, 3 platforms), 2 trilingual websites, and all marketing materials in 360 hours using only Claude Code.",
      },
      {
        type: "takeaway",
        icon: "\u{270D}\u{FE0F}",
        text: "Voice memo to article pipeline: record during walks, Claude generates full articles matching your voice, auto-creates LinkedIn versions. Writing becomes editing.",
      },
      {
        type: "takeaway",
        icon: "\u{1F9EC}",
        text: "One user fed raw ancestry DNA data into Claude. It parsed genetic markers, identified health-related genes, and produced a readable report. General-purpose analysis on demand.",
      },
      {
        type: "callout",
        text: "Stop thinking of Claude Code as a coding tool. Think of it as an intelligent agent with access to your local machine and all its command-line tools.",
        variant: "insight",
      },
    ],
  },

  // 14 - Creator Workflow
  {
    id: "creator-workflow",
    headline: "How the Creator Works",
    subheadline: "The Claude Code creator's approach: minimal config, plan-first, accept 10-20% abandonment.",
    section: "beyond",
    blocks: [
      {
        type: "takeaway",
        icon: "\u{1F9E0}",
        text: "Opus with thinking mode for all tasks. Slower token generation but higher quality means fewer iterations overall. Speed comes from getting it right the first time.",
      },
      {
        type: "takeaway",
        icon: "\u{1F4CB}",
        text: "Plan-first, auto-accept, single-shot. Iterate the plan in Plan mode until satisfied, then switch to auto-accept and let Claude execute in one pass.",
      },
      {
        type: "comparison",
        before: {
          label: "Heavy Config",
          items: [
            "Large CLAUDE.md (25k+ tokens)",
            "Many MCP servers loaded",
            "Complex plugin chains",
            "High startup token cost",
          ],
        },
        after: {
          label: "Creator's Approach",
          items: [
            "Light CLAUDE.md (~2.5k tokens)",
            "Minimal MCP registrations",
            "Slash commands + hooks",
            "Low overhead, high signal",
          ],
        },
      },
      {
        type: "callout",
        text: "Types-first decomposition for agentic engineering: data model (types) first, then pure logic, edge logic, UI, integration. Types give agents a perfect description of function signatures.",
        variant: "tip",
      },
    ],
  },

  // 15 - Learning and Community
  {
    id: "learning-community",
    headline: "The Compound Effect",
    subheadline: "Any single tip saves a few minutes. Combined, they transform the entire workflow.",
    section: "beyond",
    blocks: [
      {
        type: "stat",
        value: "5-10x",
        label: "faster feature shipping",
        detail: "With optimized CLAUDE.md, commands, hooks, and proper prompting. Voice + parallel sessions = \"completely different scale.\"",
      },
      {
        type: "table",
        headers: ["Week", "Focus"],
        rows: [
          ["1", "Install, /init, learn /clear and /compact"],
          ["2", "Create CLAUDE.md, try Plan mode, git workflows"],
          ["3", "Build 2-3 slash commands, terminal aliases"],
          ["4", "Configure hooks, explore MCP servers"],
          ["Ongoing", "Add skills, parallel sessions, refine"],
        ],
      },
      {
        type: "quote",
        text: "The new senior skill is deciding what NOT to build, when to stop, and when 'good enough' creates more value than 'perfect'.",
        attribution: "r/ClaudeCode, on the post-AI skill shift",
      },
      {
        type: "callout",
        text: "Domain expertise is your moat. AI makes domain-knowledge bugs regularly. Surface-level correctness does not equal actual correctness. Your expertise determines the quality of guidance you can give the model.",
        variant: "insight",
      },
    ],
  },
];
