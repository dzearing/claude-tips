# Claude Code Full Stack Guide - Extracted Tips & Best Practices

Source: https://alexop.dev/posts/understanding-claude-code-full-stack/

---

## Project Memory via CLAUDE.md Hierarchy

Create hierarchical CLAUDE.md files that merge from enterprise to user (`~/.claude/CLAUDE.md`) to project (`./CLAUDE.md`) to directory-specific levels. When referencing `@components/Button.vue`, Claude automatically loads context from the component's directory and parent directories.

**Directory structure example:**

```
my-vue-app/
├── CLAUDE.md (project conventions, tech stack, build commands)
├── src/
│   ├── components/
│   │   ├── CLAUDE.md (component patterns, naming, prop types)
│   │   ├── Button.vue
│   │   └── Card.vue
│   └── pages/
│       ├── CLAUDE.md (routing patterns, page structure)
│       ├── Home.vue
│       └── About.vue
```

Keep CLAUDE.md concise -- function as a reference guide rather than comprehensive documentation. Include common commands, coding standards, and architectural patterns. The file should capture repeating conventions Claude will encounter throughout the project.

**Example CLAUDE.md content:**

```markdown
# CLAUDE.md

## Project Overview
[Project description, tech stack details]

## Development Commands
npm run dev              # Build + dev server
npm run build            # Production build
npm run lint             # Code linting
```

**Category:** `configuration`, `project-setup`, `context-management`

---

## Slash Commands for Repeatable Workflows

Store commands in `.claude/commands/` as markdown files. Trigger with `/name [args]`.

**Key features:**
- Use `$ARGUMENTS` or `$1`, `$2` for parameter passing
- Reference files with `@file` syntax to inline code
- Declare `allowed-tools: Bash(...)` for pre-execution scripts
- Employ XML-tagged prompts for structured, reliable outputs

**Example command file (`.claude/commands/create-command.md`):**

```markdown
---
description: Create new slash commands
argument-hint: [name] [purpose]
allowed-tools: Bash(mkdir:*), Bash(tee:*)
---

# /create-command

Generate slash command files with proper structure.

**Inputs:** $1 = name, $2 = purpose
**Outputs:** STATUS=WROTE PATH=.claude/commands/{name}.md

[... detailed instructions ...]
```

Deploy for repeatable workflows you trigger manually -- code reviews, commit message generation, scaffolding. Ideal for deterministic, user-initiated processes.

**Category:** `commands`, `automation`, `workflow`

---

## Subagents for Parallel Specialized Work

Place subagent definitions in `.claude/agents/` with frontmatter specifying name, description, allowed tools, and optional model preference.

**Example subagent file (`.claude/agents/security-auditor.md`):**

```markdown
---
name: security-auditor
description: Analyzes code for security vulnerabilities
tools: Read, Grep, Bash
model: sonnet
---

You are a security-focused code auditor.

Identify vulnerabilities (XSS, SQL injection, CSRF, etc.)
Check dependencies and packages
Verify auth/authorization
Review data validation

Provide severity levels: Critical, High, Medium, Low.
Focus on OWASP Top 10.
```

**Key principles:**
- Assign one expertise area per subagent
- Grant minimal necessary tool access
- Use `haiku` model for simple tasks, `sonnet` for complex analysis
- Execute independent work in parallel to enhance throughput
- Subagents operate in isolated context windows, preventing "context poisoning" from detailed implementation work

Use subagents to prevent context clutter during specialized work like security audits, test generation, or refactoring. Each agent maintains its own context window independently.

**Category:** `subagents`, `parallelism`, `context-management`, `architecture`

---

## Hooks for Automatic Quality Enforcement

Define hooks in `.claude/settings.json` with event-based triggers and either command or prompt execution modes.

**Available lifecycle events:**
- `PreToolUse`
- `PostToolUse`
- `UserPromptSubmit`
- `Notification`
- `Stop`
- `SubagentStop`
- `SessionStart`

**Example: Auto-linting after file edits (`.claude/settings.json`):**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "\"$CLAUDE_PROJECT_DIR\"/.claude/hooks/run-oxlint.sh"
          }
        ]
      }
    ]
  }
}
```

**Hook script example (`.claude/hooks/run-oxlint.sh`):**

```bash
#!/usr/bin/env bash
file_path="$(jq -r '.tool_input.file_path // ""')"

if [[ "$file_path" =~ \.(js|jsx|ts|tsx|vue)$ ]]; then
  pnpm lint:fast
fi
```

**Execution modes:**
- **Command mode:** Execute shell scripts (fast, predictable)
- **Prompt mode:** Let Claude decide via LLM (flexible, context-aware)

**Common applications:** Auto-format after file edits, require approval for bash commands, validate write operations, initialize sessions, trigger desktop notifications.

**Category:** `hooks`, `automation`, `quality`, `linting`

---

## Plugins for Team Standardization

**Directory structure:**

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json (manifest: name, version, author)
├── commands/
│   └── greet.md
├── skills/
│   └── my-skill/
│       └── SKILL.md
└── hooks/
    └── hooks.json
```

Package team configurations, domain-specific workflows, or community tooling for sharing across projects or teams. Use plugins to establish opinionated patterns and standards.

Installed plugins automatically merge components -- hooks combine, commands appear in autocomplete, skills activate based on context.

**Category:** `plugins`, `team-workflow`, `distribution`

---

## MCP (Model Context Protocol) for External Integrations

**Connection and usage:**

```bash
# Install server
claude mcp add playwright npx @playwright/mcp@latest

# Use exposed tools as slash commands
/mcp__playwright__create-test [args]
```

Monitor context window usage with `/context` and remove unused servers to prevent token bloat. Each MCP server consumes context.

MCP servers expose their own tools -- they do not inherit Claude's Read, Write, or Bash capabilities unless explicitly provided by the server.

Integrate Playwright MCP to test web applications like a real user, run automated QA on pull requests, and generate detailed bug reports.

**Category:** `mcp`, `integrations`, `external-tools`, `testing`

---

## Skills for Context-Triggered Expertise

Store skills in `~/.claude/skills/` (personal), `.claude/skills/` (project-specific), or within plugins. Include `SKILL.md` with frontmatter (`name`, `description`) and optional helper scripts.

Claude reviews available skill descriptions when you give a task. If a skill's `description` field matches task context, Claude automatically loads full instructions and applies them -- no manual invocation needed.

**Example skill file (`.claude/skills/update-docs/SKILL.md`):**

```markdown
---
name: update-documentation
description: Updates docs after code implementations
allowed-tools: Read, Write, Bash
---

# Update Documentation

When code is implemented, update relevant documentation files...
```

**Decision: Skill vs. Slash Command:**
- Make it a skill if you want Claude to automatically apply it whenever relevant
- Make it a command if you prefer explicit manual control (`/git-worktree feature-branch`)

Skills function as modular expertise chunks. Instead of Claude reviewing massive documents every interaction, skills activate only when context-appropriate, improving efficiency while maintaining automatic behavior.

**Category:** `skills`, `automation`, `context-management`, `modularity`

---

## Context Efficiency Strategies

Monitor context consumption regularly. Remove unused MCP servers. Use subagents for isolated deep work to prevent main conversation pollution. Leverage skills' modular approach over monolithic CLAUDE.md files.

**Context-aware task distribution:**
- Main agent handles planning and coordination
- Implementation subagents execute detailed work
- Skills automatically provide specialized knowledge
- Hooks enforce standards without conversation overhead

**Example multi-phase workflow:**

**Phase 1 (Planning Chat):** Main agent plans bug fix, outputs detailed task specification.

**Phase 2 (Implementation Chat):** Use `/load-context` command, feed in plan from Phase 1, run implementation subagent, let `update-documentation` skill handle docs automatically, run `/resolve-task` to mark complete.

**Category:** `context-management`, `workflow`, `efficiency`, `tokens`

---

## Hook Configuration Best Practices

- Match tool names precisely (`Edit|Write`)
- Test hooks with simple commands before advancing to complex logic
- Use `jq` for JSON parsing in bash hook scripts
- Use command mode for fast, predictable operations
- Use prompt mode when you need LLM-level flexibility and context awareness

**Category:** `hooks`, `configuration`, `best-practices`

---

## Subagent Specialization Best Practices

- Define narrow expertise areas for each subagent
- Avoid overlapping responsibilities between subagents
- Grant tool access that matches expertise scope
- Choose models appropriately for task complexity (`haiku` for simple, `sonnet` for complex)
- Deploy multiple subagents simultaneously for independent analysis (security audit + test generation + performance review)
- Each maintains separate context; synthesis step combines findings afterward

**Category:** `subagents`, `best-practices`, `architecture`

---

## Skill Documentation Best Practices

- Write clear, specific descriptions -- Claude uses these to decide when skills apply
- Include examples in the skill definition
- Document allowed tools explicitly in the frontmatter

**Category:** `skills`, `best-practices`, `documentation`

---

## Plugin Publishing Best Practices

- Validate all components before distribution
- Include comprehensive README
- Version consistently
- Document breaking changes

**Category:** `plugins`, `best-practices`, `distribution`

---

## MCP Server Management

- Use `/context` command to monitor consumption
- Remove underutilized servers
- Plan context allocation upfront
- Each MCP server consumes context window tokens

**Category:** `mcp`, `context-management`, `resource-management`

---

## Desktop Notifications via Hooks

Configure hooks to send alerts when Claude finishes tasks, needs input, or requests permission. This eliminates the need to constantly watch the terminal.

**Category:** `hooks`, `notifications`, `developer-experience`

---

## Terminal Status Line Customization

Display model name, context usage, and cost directly in the terminal status line using custom scripts.

**Category:** `developer-experience`, `customization`

---

## Obra Superpowers Skills Library

A rigorous, spec-driven skills library implementing disciplined development practices:

- RED-GREEN-REFACTOR TDD workflow
- Systematic four-phase debugging
- Evidence-based verification before completion claims
- Git worktree management for parallel development
- Structured brainstorming frameworks

Use when production code requires disciplined practices, or when you want Claude enforcing verification-based development instead of assumed correctness.

**Category:** `skills`, `tdd`, `debugging`, `community-tools`, `quality`

---

## Workflow Decision Guide

| Use Case | Tool | Reason |
|----------|------|--------|
| Static project knowledge | CLAUDE.md | Persistent, always-available context |
| Manual repeatable workflows | Slash Commands | Explicit user control, deterministic output |
| Parallel specialized work | Subagents | Isolated context, prevents pollution |
| Automatic quality enforcement | Hooks | Event-driven, requires no manual invocation |
| Team standardization | Plugins | Distributable, mergeable across projects |
| External system integration | MCP | Universal protocol, native command exposure |
| Context-triggered expertise | Skills | Automatic activation, modular knowledge |

**Category:** `decision-guide`, `architecture`, `workflow`

---

## Multi-Phase Development Workflow Pattern

Separate planning conversations from implementation. Planning phase produces detailed task specifications. Implementation phase consumes specifications in fresh context with specialized subagent. Skills handle documentation automatically. This pattern maintains focus while preventing context bloat.

**Category:** `workflow`, `patterns`, `context-management`

---

## Core Philosophy

Claude Code is fundamentally a tool for general computer automation. Anything achievable by typing commands becomes automatable. The feature stack -- from external connections (MCP) through explicit workflows (commands) to automatic behaviors (skills) -- transforms it from a coding assistant into a customizable agent framework.

**Category:** `philosophy`, `architecture`

---

## Community Resources

- **Claude Code Driver Repository:** Community collection of examples, templates, and patterns based on established practices
- **Awesome Claude Code Cheat Sheet:** Comprehensive visual guide to all Claude Code features
- **Anthropic Official Skills Repository:** Ready-to-use skill examples from the creators
- **Obra Superpowers Library:** Rigorous, spec-driven skills for TDD workflows, systematic debugging, code review processes

**Category:** `resources`, `community`, `learning`
