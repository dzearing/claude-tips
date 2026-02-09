# Claude Code Customization Guide - Raw Extracted Tips

**Source:** https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/
**Extracted:** 2026-02-09

---

## CLAUDE.md as Always-On Project Memory

CLAUDE.md acts as persistent, always-loaded project memory. Place it at the project root as `CLAUDE.md` or `.claude/CLAUDE.md`. It is auto-loaded at conversation start and shared with the team via git. Use it for short, always-true project conventions and standards that should apply to every conversation.

**File locations:**
- `CLAUDE.md` (project root)
- `.claude/CLAUDE.md` (alternative root location)
- `tests/CLAUDE.md` (nested, test-specific)
- `src/db/CLAUDE.md` (nested, domain-specific)
- `src/components/CLAUDE.md` (nested, component-specific)

**Example content:**
```markdown
# CLAUDE.md

## Database

We use Dexie.js for IndexedDB. Before implementing any database code:

1. Fetch the docs index from https://dexie.org/llms.txt
2. Use `liveQuery()` for reactive data binding
3. Follow the repository pattern in `src/db/`
4. Always handle `ConstraintError` for duplicate keys
```

**Tags:** `#claude-md` `#configuration` `#project-memory` `#auto-loaded`

---

## Nested CLAUDE.md Files Load On-Demand

Nested CLAUDE.md files (e.g., `tests/CLAUDE.md`, `src/db/CLAUDE.md`) are only loaded when Claude actually accesses files in that directory. This means directory-specific rules are contextually applied rather than always present. Use this to keep root-level CLAUDE.md lean and push domain-specific instructions closer to the relevant code.

**Tags:** `#claude-md` `#file-organization` `#context-management`

---

## Context Drift Warning for CLAUDE.md

In long sessions, the model can gradually deprioritize earlier system-level instructions (including CLAUDE.md content) in favor of the most recent conversation history. This is called "context drift." Be aware that CLAUDE.md rules may lose influence over time in extended conversations.

**Tags:** `#claude-md` `#caveat` `#context-management` `#long-sessions`

---

## CLAUDE.md Has No Enforcement Mechanism

CLAUDE.md instructions are advisory -- Claude decides whether to follow them. There is no hard enforcement. If critical behavior is needed, consider reinforcing instructions through other mechanisms (slash commands, skills) or repeating key rules in conversation.

**Tags:** `#claude-md` `#caveat` `#limitation`

---

## Slash Commands for On-Demand Workflows

Slash commands are single-file entries in `.claude/commands/` that are discoverable in the terminal via `/`. They provide explicit, repeatable entry points for specific workflows and can accept arguments via `$ARGUMENTS`.

**Directory:** `.claude/commands/`

**File format (YAML frontmatter + prompt body):**
```yaml
---
description: [What this command does]
allowed-tools: [Tool1, Tool2, WebFetch, etc.]
---

[Detailed prompt instructions using $ARGUMENTS]
```

**Usage example:** `/dexie-help how do I create a compound index?`

**Tags:** `#slash-commands` `#workflows` `#manual-invocation`

---

## Slash Command Example: Documentation Fetcher

A practical slash command that fetches live documentation before answering questions, solving the stale training data problem.

**File:** `.claude/commands/dexie-help.md`
```yaml
---
description: Get Dexie.js guidance with current documentation
allowed-tools: Read, Grep, Glob, WebFetch
---

First, fetch the documentation index from https://dexie.org/llms.txt

Then, based on the user's question, fetch the relevant documentation pages.

Finally, answer the following question using the current documentation:

$ARGUMENTS
```

**Tags:** `#slash-commands` `#documentation` `#example` `#webfetch`

---

## Slash Command: Multi-Subagent Research Orchestration

An advanced slash command pattern that spawns multiple subagents in parallel to research a problem from different angles (web docs, Stack Overflow, codebase), then synthesizes findings into a structured research document.

**File:** `.claude/commands/research.md`
```yaml
---
description: Research a problem using web search, documentation, and codebase
allowed-tools: Task, WebSearch, WebFetch, Grep, Glob, Read, Write, Bash
---

## Research: $ARGUMENTS

### Step 1: Launch Parallel Research Agents

Use the Task tool to spawn these subagents **in parallel**:

1. **Web Documentation Agent** (subagent_type: general-purpose)
   - Search official documentation for the topic
   - Find best practices and recommended patterns
   - Locate relevant GitHub issues

2. **Stack Overflow Agent** (subagent_type: general-purpose)
   - Search Stack Overflow for similar problems
   - Find highly-voted and accepted answers
   - Note common pitfalls

3. **Codebase Explorer Agent** (subagent_type: Explore)
   - Search the codebase for related patterns
   - Find existing solutions to similar problems
   - Identify relevant files and functions

### Step 2: Create Research Document

After all agents complete, create a file at `docs/research/<topic-slug>.md`.

Generate filename from research topic:
- Convert to lowercase
- Replace spaces with hyphens
- Remove special characters
- Add date prefix: `YYYY-MM-DD-<topic-slug>.md`

Example: "Vue 3 Suspense" -> `docs/research/2024-12-06-vue-3-suspense.md`

First create the folder:
```bash
mkdir -p docs/research
```

### Step 3: Write Research Document Structure

```markdown
# Research: <Topic>

**Date:** <YYYY-MM-DD>
**Status:** Complete

## Problem Statement

<Describe the problem and why it matters>

## Key Findings

<Summarize the most relevant solutions and approaches>

## Codebase Patterns

<Document how the current codebase handles similar cases>

## Recommended Approach

<Provide your recommendation based on all research>

## Sources

- [Source Title](URL) - Brief description
```

### Guidelines

- Prioritize official documentation over blog posts
- Prefer solutions matching existing codebase patterns
- Note version-specific considerations
- Flag conflicting information across sources
- Write concise, actionable content
- Use active voice
```

**Tags:** `#slash-commands` `#subagents` `#research` `#parallel-execution` `#advanced`

---

## Subagents as Isolated Specialists

Subagents are specialized AI personas with their own isolated context windows. Claude delegates entire tasks to a subagent and gets results back as a summary. The key benefit is that subagents keep your main context clean -- especially valuable for research-heavy or read-intensive tasks.

**Directory:** `.claude/agents/`

**File format:**
```yaml
---
name: [agent-name]
description: [When and why to use this agent - include concrete examples]
model: [opus, sonnet, etc.]
color: [optional visual indicator]
---

[System instructions and expertise description]
```

**Key characteristics:**
- Automatically delegated when task matches the `description`
- Runs in a separate, isolated context window
- Results return as a summary, not live interaction
- Can use different models (e.g., opus for complex tasks, sonnet for simpler ones)
- Can restrict allowed tools for security

**Tags:** `#subagents` `#context-isolation` `#delegation` `#architecture`

---

## Subagent Description Should Include Concrete Examples

The subagent `description` field in the YAML frontmatter should include concrete examples of when the agent should be used. This helps Claude accurately match tasks to the right agent. Use the `<example>` / `<commentary>` XML pattern to show example user messages and explain why the agent should be triggered.

**Example pattern:**
```yaml
description: Use this agent when the task involves Dexie.js or IndexedDB in any way...

Examples:

<example>
Context: User asks about improving their Dexie.js code.
user: "What can I improve on this codebase when it comes to Dexie?"
assistant: "I'll use the dexie-db-specialist agent to review your Dexie.js implementation against current best practices."
<commentary>
Since the user is asking about Dexie.js improvements, use the dexie-db-specialist agent to fetch the latest documentation and review the existing code for optimization opportunities, missing features, and best practice violations.
</commentary>
</example>
```

**Tags:** `#subagents` `#description` `#best-practice` `#examples`

---

## Subagent "Critical First Step" Pattern

Include a "Critical First Step" section in subagent instructions that forces the agent to fetch live documentation before answering any questions or writing any code. Mark it as "non-negotiable" to emphasize importance.

```yaml
## Critical First Step

**Before answering ANY Dexie.js question or implementing ANY Dexie-related code, you MUST:**

1. Fetch the documentation index from `https://dexie.org/llms.txt`
2. Based on the task at hand, fetch the relevant documentation pages
3. Only then proceed with implementation or answering questions

This is non-negotiable.
```

**Tags:** `#subagents` `#documentation` `#pattern` `#best-practice`

---

## Subagent Documentation Fetching Strategy

When a subagent needs to consult external documentation, define a fetching strategy that parses a sitemap/index first, then fetches only relevant pages. This avoids over-fetching and keeps context focused.

```markdown
## Documentation Fetching Strategy

When fetching from `https://dexie.org/llms.txt`:
1. Parse the sitemap to identify relevant documentation pages
2. Fetch specific pages based on the task
3. Cross-reference multiple pages when dealing with complex topics

Common documentation sections:
- `/docs/Table/Table` - Core table operations
- `/docs/WhereClause/WhereClause` - Query building
- `/docs/Collection/Collection` - Result set operations
- `/docs/liveQuery()` - Reactive queries
- `/docs/Dexie/Dexie` - Database instance configuration
- `/docs/Version/Version` - Schema migrations
```

**Tags:** `#subagents` `#documentation` `#fetching-strategy` `#pattern`

---

## Subagent Response Format Guidelines

Define explicit response format requirements for subagents to ensure consistent, high-quality output.

```markdown
## Response Format

When providing implementations:
1. **Cite the documentation** you consulted
2. **Explain the approach** before showing code
3. **Provide TypeScript code** following project conventions
4. **Include error handling** appropriate to the operation
5. **Note any caveats** or version-specific behaviors
```

**Tags:** `#subagents` `#response-format` `#quality` `#best-practice`

---

## Subagent Quality Assurance Rules

Include QA rules in subagent instructions to prevent hallucinated API details or unverified suggestions.

```markdown
## Quality Assurance

- Always verify suggestions against the fetched documentation
- If documentation is unclear, explicitly state this and provide best guidance with caveats
- When multiple approaches exist, explain trade-offs
- Consider IndexedDB limitations (no full-text search, storage limits, etc.)
```

**Tags:** `#subagents` `#quality-assurance` `#anti-hallucination` `#best-practice`

---

## Background Processing with Ctrl+B

When a subagent is running, you can send it to the background with `Ctrl + B` and continue typing in your main session. The agent will come back with its updates when it finishes. This enables async workflows where you keep working while research or heavy tasks process in parallel.

**Tags:** `#subagents` `#async` `#background-processing` `#productivity`

---

## Skills as Rich Auto-Discovered Capabilities

Skills are structured capabilities in `.claude/skills/` that Claude auto-discovers based on the `description` field in `SKILL.md`. Unlike slash commands, skills are not manually invocable via `/` -- Claude decides when to apply them. Skills can include supporting reference files and scripts alongside the main SKILL.md.

**Directory structure:**
```
.claude/skills/dexie-expert/
  SKILL.md
  PATTERNS.md
  MIGRATIONS.md
  scripts/
    validate-schema.ts
```

**SKILL.md format:**
```yaml
---
name: dexie-expert
description: Dexie.js database guidance. Use when working with IndexedDB, schemas, queries, liveQuery, or database migrations.
allowed-tools: Read, Grep, Glob, WebFetch
---

# Dexie.js Expert

When the user needs help with Dexie.js or IndexedDB:

1. Fetch https://dexie.org/llms.txt
2. Fetch only the relevant pages for the task
3. Apply the guidance to this repo's patterns
```

**Key characteristics:**
- Auto-discovered based on `description`
- Runs in main conversation (live iteration possible)
- Claude decides when to trigger (may not fire)
- More setup than slash commands
- Can include supporting reference files and scripts

**Tags:** `#skills` `#auto-discovery` `#configuration` `#architecture`

---

## Skills vs Slash Commands: Key Differences

Skills run in the main conversation and are auto-triggered. Slash commands are manually invoked via `/` in the terminal. Skills can include supporting files (patterns, migrations, scripts). Slash commands are single-file. Choose slash commands when you need an explicit, repeatable terminal entry point. Choose skills when you want Claude to auto-apply a richer workflow.

**Tags:** `#skills` `#slash-commands` `#comparison` `#decision-making`

---

## Smoke Test Skill for Verifying Subagent Functionality

A minimal skill designed to verify that subagent spawning works correctly in your repository. Useful as a diagnostic tool.

**File:** `.claude/skills/subagent-smoke-test/SKILL.md`
```yaml
---
name: subagent-smoke-test
description: Smoke test for Claude Code subagents. Use when the user wants to verify that spawning a subagent via the Task tool works in this repo.
---

# Subagent Smoke Test

This skill exists purely to verify that subagents work end-to-end.

## What to do

1. Spin up a subagent using the **Task** tool.
   - Use `subagent_type: general-purpose`.
   - Give it a simple, read-only task:
     - Read `package.json` and summarize the key scripts.
     - Read `astro.config.ts` and summarize major integrations.
     - Use Glob to list the top-level folders.

2. Wait for the subagent to finish.

3. Return a short report:
   - `Subagent status: success` (or `failed`)
   - A 3-6 bullet summary of what it found
   - If it failed, include the most likely fix

## Suggested Task prompt

"You are a helper subagent. Do a quick, read-only scan of this repo.
  - Read `package.json` and summarize the main scripts.
  - Read `astro.config.ts` and summarize key integrations.
  - Glob the repo root and list the top-level folders.
Return a concise report."
```

**Tags:** `#skills` `#smoke-test` `#subagents` `#diagnostics`

---

## Decision Matrix: Choosing the Right Mechanism

| Choose | When | Why |
|--------|------|-----|
| **CLAUDE.md** | Project rules needed at startup | Auto-loaded; git-shareable |
| **Slash command** | One-shot manual workflows | Discoverable `/...` terminal trigger |
| **Subagent** | Research-heavy, read-intensive tasks | Isolated context; distilled results |
| **Skill** | Rich auto-applied workflows | Structured capability with supporting files |

**Tags:** `#decision-matrix` `#architecture` `#choosing`

---

## Feature Capability Matrix

| Mechanism | Main Conversation | Separate Context | Spawn Subagents | Use Skills | Manual `/...` |
|-----------|------------------|-----------------|-----------------|-----------|---------------|
| CLAUDE.md | Yes | No | No | No | No |
| Slash command | Yes | No | Yes (via Task) | Yes (indirectly) | Yes |
| Skill | Yes | No | Yes (if Task allowed) | Yes | No |
| Subagent | No | Yes | Depends on tools | Yes | Usually delegated |

**Tags:** `#decision-matrix` `#capabilities` `#comparison`

---

## Subagents Keep Main Context Clean

Even when the task is just exploration, subagents are a strong default because they let Claude do extensive reading and searching without dumping everything into your main thread. In plan mode, Claude Code typically delegates repository scanning to an Explore-style subagent, returning only a distilled map of relevant files and patterns rather than flooding the main conversation with raw exploration output.

**Tags:** `#subagents` `#context-management` `#plan-mode` `#best-practice`

---

## For Doc-Fetching, Subagents Win

The article's key conclusion for documentation-fetching use cases: subagents are the best mechanism because they keep your main context clean. The fetched documentation fills the subagent's context window instead of yours, and you get back only the distilled, relevant answer.

**Tags:** `#subagents` `#documentation` `#recommendation` `#context-management`

---

## Tool Restriction Patterns

Different mechanisms support different tool sets. Restrict tools to the minimum necessary for security and focus.

**Documentation lookup (read-only):**
```yaml
allowed-tools: Read, Grep, Glob, WebFetch
```

**Research with writing (full workflow):**
```yaml
allowed-tools: Task, WebSearch, WebFetch, Grep, Glob, Read, Write, Bash
```

**Tags:** `#tools` `#security` `#allowed-tools` `#configuration`

---

## Subagent Model Selection

Subagents can use different models. Use `opus` for complex, nuanced tasks. Use `sonnet` for simpler, faster tasks. Specify in the YAML frontmatter.

```yaml
model: opus
```

**Tags:** `#subagents` `#model-selection` `#configuration`

---

## llms.txt Convention for Documentation

The article references `llms.txt` as a convention for LLM-friendly documentation indexes. Libraries can publish a `llms.txt` file (e.g., `https://dexie.org/llms.txt`) that acts as a sitemap for AI agents to discover and fetch relevant documentation pages. This is the recommended entry point for documentation-fetching workflows.

**Tags:** `#documentation` `#llms-txt` `#convention` `#external-docs`

---

## Research Document Naming Convention

When generating research documents from slash commands or skills, use a consistent naming pattern:
- Convert topic to lowercase
- Replace spaces with hyphens
- Remove special characters
- Add date prefix: `YYYY-MM-DD-<topic-slug>.md`
- Store in `docs/research/`

**Example:** "Vue 3 Suspense" becomes `docs/research/2024-12-06-vue-3-suspense.md`

**Tags:** `#naming-conventions` `#file-organization` `#research`

---

## Complete Directory Structure Convention

The recommended directory layout for all Claude Code customization files:

```
project-root/
  CLAUDE.md                      # or .claude/CLAUDE.md
  .claude/
    commands/                    # Slash commands
      dexie-help.md
      research.md
    agents/                      # Subagents
      dexie-specialist.md
    skills/                      # Skills (each is a subdirectory)
      dexie-expert/
        SKILL.md
        PATTERNS.md
        MIGRATIONS.md
        scripts/
          validate-schema.ts
      subagent-smoke-test/
        SKILL.md
  tests/CLAUDE.md                # Nested context (test-specific)
  src/db/CLAUDE.md               # Nested context (database-specific)
  src/components/CLAUDE.md       # Nested context (component-specific)
```

**Tags:** `#directory-structure` `#file-organization` `#convention`

---

## Skills Run in Main Conversation, Subagents Don't

A critical architectural distinction: skills execute in the main conversation context, allowing live iteration and follow-up questions. Subagents run in isolated context windows and return only summarized results. This means skills "compete with your conversation" for main context space, while subagents preserve it.

**Tags:** `#skills` `#subagents` `#architecture` `#context-management`

---

## Async Agent Workflows

Claude Code supports async agents: fire one off, let it work while you keep working, then it comes back with updates when done. Combined with `Ctrl + B` for background processing, this enables parallel human-AI workflows where neither blocks the other.

**Tags:** `#async` `#background-processing` `#productivity` `#workflow`

---

## Plan Mode Delegates to Explore Subagents

In plan mode, Claude Code typically kicks off an Explore-style subagent to scan the repository and return a distilled map of relevant files and patterns. This keeps the main conversation thread focused on planning rather than raw exploration output.

**Tags:** `#plan-mode` `#subagents` `#explore` `#context-management`

---

## Anti-Pattern: Using CLAUDE.md for One-Off Tasks

CLAUDE.md is not suitable for one-off tasks or specific use cases. It is best reserved for universal project rules that should always apply. For task-specific workflows, use slash commands, skills, or subagents instead.

**Tags:** `#claude-md` `#anti-pattern` `#when-not-to-use`

---

## Anti-Pattern: Using Skills When You Need Terminal Discoverability

Skills are not manually invokable via `/` in the terminal. If you need a command that developers can explicitly discover and trigger from the terminal, use slash commands instead. Skills depend on Claude's automatic matching, which may not always fire.

**Tags:** `#skills` `#anti-pattern` `#when-not-to-use`

---

## Anti-Pattern: Using Subagents for Simple Inline Tasks

Subagents introduce overhead (separate context window, summarized results). For simple tasks that don't require heavy research or extensive file reading, keep the work in the main conversation. Subagents are best for research-heavy, read-intensive work.

**Tags:** `#subagents` `#anti-pattern` `#when-not-to-use`

---

## Slash Commands Can Spawn Subagents via Task Tool

Slash commands can explicitly launch multiple subagents in parallel using the `Task` tool. This creates a powerful orchestration pattern where a single `/research` command fans out to web docs, Stack Overflow, and codebase exploration simultaneously.

**Tags:** `#slash-commands` `#subagents` `#task-tool` `#orchestration`

---

## Prerequisite: Stale Training Data Problem

Claude Code doesn't have up-to-date training data for every library. It can't reliably know what a docs site says today. This is the core problem that CLAUDE.md instructions, doc-fetching slash commands, subagents with live documentation, and skills all aim to solve -- bridging the gap between Claude's training cutoff and current library APIs.

**Tags:** `#motivation` `#stale-data` `#problem-statement`

---

## Subagent Color Configuration

Subagents support an optional `color` field in YAML frontmatter for visual identification in the terminal. This helps distinguish between different specialist agents.

```yaml
color: orange
```

**Tags:** `#subagents` `#configuration` `#visual`
