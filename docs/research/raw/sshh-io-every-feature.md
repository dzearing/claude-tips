# How I Use Every Claude Code Feature

**Source:** https://blog.sshh.io/p/how-i-use-every-claude-code-feature
**Author:** Shrivu Shankar (@shrivu) - Works on AI-IDE rules and tooling for an engineering team consuming several billion tokens per month for codegen. Also uses Claude Code as a hobbyist.
**Date Extracted:** 2026-02-09

---

## CLAUDE.md - Token Budget Curation

For professional monorepos, maintain strict curation of CLAUDE.md at approximately 13-25KB. Treat token allocation like "selling ad space" to teams -- each tool or API documented must justify its inclusion. Only document tools/APIs used by 30% or more of engineers. Tools must demonstrate sufficient maturity before earning a place in the file. If the documentation for a tool cannot be made concise, that is a signal the tool itself is not ready.

For hobby projects, the file can be more flexible and less strictly curated.

**Example structure:**
```
# Monorepo

## Python
- Always ...
- Test with <command>
... 10 more ...

## <Internal CLI Tool>
... 10 bullets, focused on 80% use cases ...
- <usage example>
- Always ...
- Never <x>, prefer <Y>

For <complex usage> or <error> see path/to/<tool>_docs.md
```

**Category:** `CLAUDE.md`, `configuration`, `context-management`

---

## CLAUDE.md - Avoid @-Mention Bloat

Do not use `@`-file references to embed entire documentation files into CLAUDE.md. This bloats the context window by embedding the full content on every single run. Instead, pitch the agent on *why* and *when* to read supporting documentation files. Example: "For complex usage or if you encounter a FooBarError, see path/to/docs.md"

This way the agent only reads the referenced file when it is actually relevant, preserving context window capacity.

**Category:** `CLAUDE.md`, `context-management`, `anti-pattern`

---

## CLAUDE.md - Avoid Negative-Only Constraints

Avoid stating rules like "Never use the --foo-bar flag" without providing an alternative. Negative-only constraints confuse agents. Always pair a prohibition with a preferred alternative: "Never use X, prefer Y instead."

**Category:** `CLAUDE.md`, `prompt-engineering`, `anti-pattern`

---

## CLAUDE.md - Use It as a Forcing Function for Tool Simplicity

If you find yourself writing paragraphs in CLAUDE.md to explain a complex CLI tool, that is a signal that the tool itself needs simplification. Use the CLAUDE.md file as a "forcing function" to simplify internal tooling rather than documenting around complexity.

**Category:** `CLAUDE.md`, `tooling`, `best-practice`

---

## CLAUDE.md - Maintain AGENTS.md in Parallel

Maintain an `AGENTS.md` file alongside `CLAUDE.md` for compatibility with other AI IDEs (Cursor, Codex, etc.). This ensures your agent guidance works across tooling ecosystems.

**Category:** `CLAUDE.md`, `configuration`, `cross-tool-compatibility`

---

## Context Window - Use /context to Diagnose Token Usage

Run the `/context` command mid-session to visualize token allocation. A fresh monorepo session typically consumes approximately 20k tokens (10% of the 200k window) as baseline, leaving roughly 180k tokens for actual work. This diagnostic helps you understand where tokens are being spent.

Even with extended context windows (e.g., Sonnet-1M), do not trust that the full context window is actually used effectively.

**Command:** `/context`

**Category:** `context-management`, `commands`, `diagnostics`

---

## Context Window - Do Not Trust Auto-Compaction

The `/compact` command is described as "opaque, error-prone, and not well-optimized." Avoid relying on automatic compaction to manage context. Instead, use explicit context management strategies.

**Command:** `/compact` (avoid)

**Category:** `context-management`, `anti-pattern`

---

## Context Window - Simple Restart with /clear + /catchup

For simple context resets, use `/clear` followed by a custom `/catchup` command. The `/catchup` command prompts Claude to read all changed files in the current git branch, quickly re-establishing relevant context after a clear.

**Commands:**
- `/clear` - Resets conversation state
- `/catchup` - Custom command: reads all changed files in current git branch

**Category:** `context-management`, `commands`, `workflow`

---

## Context Window - Document and Clear for Complex Tasks

For large, complex tasks, use a "Document & Clear" workflow: Have Claude export its current progress and findings to a `.md` file, then clear the context, then restart with the documented context as input. This preserves key information while reclaiming the full context window.

**Workflow:**
1. Ask Claude to export progress to a markdown file
2. Run `/clear`
3. Restart with the documented context

**Category:** `context-management`, `workflow`, `large-tasks`

---

## Slash Commands - Keep Them Minimal

Think of slash commands as "simple shortcuts for frequently used prompts, nothing more." Avoid building extensive custom command lists. The moment you force engineers to learn a new, documented-somewhere list of essential magic commands just to get work done, you have failed.

**Recommended minimal set:**
- `/catchup` - Read all changed files in current git branch
- `/pr` - Clean code, stage it, prepare pull request

**Category:** `commands`, `slash-commands`, `best-practice`

---

## Custom Subagents - Prefer Built-in Task() Over Custom Agents

Custom subagents have a theoretical advantage: specialized agents handle (X + Y) * N tokens of context and input work, returning only Z token answers to keep the main context clean. However, in practice they have significant problems:

1. **Context Gatekeeping:** Hidden testing context prevents the main agent from reasoning holistically about changes
2. **Rigid Workflows:** Forces predetermined delegation patterns rather than letting the agent decide dynamically

Instead, use Claude's built-in `Task(...)` feature to spawn general agent clones. Put key context in `CLAUDE.md` and allow the main agent to self-manage delegation.

**Category:** `subagents`, `architecture`, `best-practice`

---

## Hooks - Block at Commit, Not at Write

There are two types of hooks:

1. **Block-at-Submit Hooks (recommended):** Wrap `Bash(git commit)` commands with validation. Block commits if tests have not passed, forcing test-and-fix loops until the build succeeds.

2. **Hint Hooks (non-blocking):** Provide fire-and-forget feedback for suboptimal actions.

The critical principle: Do NOT use block-at-write hooks. Blocking an agent mid-plan confuses or even "frustrates" it. Let agents finish their work, then check the final, completed result at the commit stage.

**Pre-commit hook pattern:**
- Wrap `Bash(git commit)` with a PreToolUse hook
- Check for the existence of `/tmp/agent-pre-commit-pass` file
- This file is only created after all tests pass
- If the file is missing, block the commit and force the agent into a test-and-fix loop
- The agent must keep iterating until tests pass before it can commit

**Category:** `hooks`, `testing`, `CI`, `best-practice`

---

## Planning Mode - Align Before Execution

For hobby projects, use the built-in planning mode exclusively to align with Claude before execution. Define both the build approach and inspection checkpoints before the agent starts working.

For enterprise use, roll out custom planning tools built on the Claude Code SDK, prompted to align with existing technical design formats while enforcing internal best practices (code structure, data privacy, security).

**Category:** `planning`, `workflow`, `enterprise`

---

## Skills - Potentially Bigger Than MCP

Skills are described as potentially a "bigger deal than MCP" because they formalize the "scripting"-based agent model. The evolution of agent autonomy follows three stages:

1. **Single Prompt:** All context in one massive prompt (brittle, does not scale)
2. **Tool Calling:** Hand-crafted tools abstract reality for agent (better, but creates bottlenecks)
3. **Scripting:** Agent accesses raw environment (binaries, scripts, docs) and writes code on-the-fly

Skills productize the scripting layer. `SKILL.md` organizes CLIs and scripts in a discoverable format that is more robust than rigid API-like MCP tools. The key insight is that skills let the agent discover and use tools naturally rather than requiring pre-built integrations.

**Category:** `skills`, `architecture`, `agent-autonomy`

---

## MCP - Use as Secure Gateway, Not API Mirror

Post-Skills, MCP should function as a "secure gateway" providing high-level tools rather than mirroring REST APIs one-to-one. MCP's role is to manage auth, networking, and security boundaries and then get out of the way.

**Recommended MCP tool patterns:**
- `download_raw_data(filters...)` - High-level data access
- `take_sensitive_gated_action(args...)` - Controlled sensitive operations
- `execute_code_in_environment_with_state(code...)` - Stateful execution

**What to keep as MCP:** Stateful, complex environments like Playwright.

**What to migrate away from MCP:** Stateless tools (Jira, AWS, GitHub) should become simple CLIs instead.

**Category:** `MCP`, `architecture`, `security`, `best-practice`

---

## Claude Code SDK - Three Primary Uses

The Claude Code SDK is positioned as the default agent framework over tools like LangChain/CrewAI for most new hobby projects. Three primary uses:

### 1. Massive Parallel Scripting
For large refactors or migrations, execute bash scripts calling `claude -p` in parallel. This is more scalable than interactive chat delegation because it prevents agents from overwriting concurrent edits.

**Command pattern:**
```bash
claude -p "in /pathA change all refs from foo to bar"
```
Run multiple instances in parallel via bash scripts for batch processing.

### 2. Internal Chat Tools
Wrap complex processes in simple interfaces for non-technical users. Examples include installers with error fallback and in-house design tools.

### 3. Rapid Agent Prototyping
Quick test-before-deploy for novel agentic tasks before committing to full deployed scaffolding. Use the SDK to validate an approach before investing in production infrastructure.

**Category:** `SDK`, `automation`, `parallel-processing`, `tooling`

---

## GitHub Action - Full Container Control and Log-Driven Improvement

Claude Code GitHub Action (GHA) offers advantages over alternatives (Cursor background agents, Codex managed UI):
- Full container and environment control
- Stronger sandboxing and audit controls
- Supports advanced features: Hooks and MCP

**Operational pattern:** Trigger PR generation from Slack, Jira, or CloudWatch alerts. The GHA fixes bugs or adds features and returns a tested PR.

**Data-driven improvement loop:** Full agent logs enable company-level ops review processes for identifying common mistakes, bash errors, and unaligned practices:

```bash
query-claude-gha-logs --since 5d | claude -p "see what the other claudes were getting stuck on and fix it, then put up a PR"
```

This creates a continuous improvement cycle: GHA logs reveal common failures, which inform CLAUDE.md and CLI improvements, which produce better agent performance.

**Category:** `GitHub-Actions`, `CI-CD`, `enterprise`, `observability`

---

## settings.json - Network Debugging with Proxy Settings

Use `HTTPS_PROXY` and `HTTP_PROXY` settings to inspect raw traffic. This enables fine-grained network sandboxing for background agents, allowing you to monitor and control what the agent accesses.

**Settings:**
```json
{
  "HTTPS_PROXY": "<proxy-url>",
  "HTTP_PROXY": "<proxy-url>"
}
```

**Category:** `configuration`, `settings`, `security`, `debugging`

---

## settings.json - Timeout Adjustments

Increase `MCP_TOOL_TIMEOUT` and `BASH_MAX_TIMEOUT_MS` from their defaults for complex commands that may take longer to execute. This may be less necessary with the introduction of bash background tasks.

**Settings:**
```json
{
  "MCP_TOOL_TIMEOUT": <milliseconds>,
  "BASH_MAX_TIMEOUT_MS": <milliseconds>
}
```

**Category:** `configuration`, `settings`, `performance`

---

## settings.json - Enterprise API Key Management

Use `ANTHROPIC_API_KEY` with enterprise keys via `apiKeyHelper` for usage-based pricing. This accounts for the 1:100x variance in developer usage across a team, ensuring costs are tracked and managed appropriately.

**Settings:**
```json
{
  "ANTHROPIC_API_KEY": "<key>",
  "apiKeyHelper": "<helper-command>"
}
```

**Category:** `configuration`, `settings`, `enterprise`, `cost-management`

---

## settings.json - Permissions Self-Audit

Periodically self-audit the `"permissions"` configuration to review which commands are allowed to auto-run. This prevents permission creep and maintains security hygiene.

**Settings key:** `"permissions"` in settings.json

**Category:** `configuration`, `settings`, `security`

---

## Philosophy - Judge by Final PR Quality

Evaluate tools and workflows by the "final PR and not how it gets there" rather than output style or UI sycophancy. The quality of the end result matters more than the aesthetics of the process.

**Key quote:** "the 'you're absolutely right!' sycophancy isn't a notable bug; it's a signal that you're too in-the-loop"

**Category:** `philosophy`, `evaluation`, `workflow`

---

## Philosophy - Shoot and Forget Delegation

Aim for a "shoot and forget" approach to agent delegation. Set the context, delegate the work, and let the agent execute autonomously. The less you need to intervene mid-task, the better your setup is working.

All key context belongs in `CLAUDE.md` to enable agent self-directed orchestration rather than rigid human-predetermined workflows.

**Category:** `philosophy`, `delegation`, `autonomy`

---

## Workflow - PR Generation from External Triggers

Build systems where PR generation can be triggered from multiple platforms: Slack, Jira, CloudWatch alerts. The agent auto-generates tested, production-ready PRs in response to these triggers, creating a seamless pipeline from issue identification to code delivery.

**Category:** `workflow`, `automation`, `enterprise`, `CI-CD`

---

## Workflow - Code Migration at Scale

For large-scale code migrations, use parallel bash script execution with `claude -p` commands. This approach prevents agents from overwriting each other's concurrent edits, which is a problem with interactive chat-based delegation for large-scale changes.

**Pattern:**
```bash
# Run multiple claude instances in parallel
claude -p "in /pathA change all refs from foo to bar" &
claude -p "in /pathB change all refs from foo to bar" &
claude -p "in /pathC change all refs from foo to bar" &
wait
```

**Category:** `workflow`, `migration`, `parallel-processing`, `automation`

---

## Workflow - Continuous Improvement via Log Analysis

Create a continuous improvement loop by analyzing GHA agent logs to identify common mistakes and failures:

1. Collect GHA agent logs over a time period
2. Feed logs to Claude to identify patterns of failure
3. Update CLAUDE.md and CLI tooling based on findings
4. Observe improved agent performance

**Command:**
```bash
query-claude-gha-logs --since 5d | claude -p "see what the other claudes were getting stuck on and fix it, then put up a PR"
```

**Category:** `workflow`, `observability`, `continuous-improvement`, `enterprise`

---

## Competing Tools Mentioned

The article references several competing tools for context:
- **Gemini CLI** - Alternative agent CLI
- **Cursor** - AI IDE with background agents
- **Codex CLI** - OpenAI's agent CLI
- **LangChain/CrewAI** - Agent frameworks (Claude Code SDK preferred over these)

The author suggests Claude Code GHA offers stronger sandboxing, audit controls, and feature support (hooks, MCP) compared to Cursor background agents and Codex managed UI.

**Category:** `comparison`, `tooling`, `landscape`

---

## Related Resources Referenced

- Anthropic Claude Code best practices documentation
- "AI Can't Read Your Docs" (author's previous post)
- "AI-powered Software Engineering" (author's previous post)
- "How Cursor (AI IDE) Works" (author's previous post)
- "Everything Wrong with MCP" (author's previous post)
- "Building Multi-Agent Systems (Part 2)" (author's previous post)

**Category:** `resources`, `further-reading`
