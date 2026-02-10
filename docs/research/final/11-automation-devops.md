# Automation and DevOps

## Purpose

Hooks, CI/CD integration, and automation patterns turn Claude Code from a reactive chat tool into a proactive quality enforcer. Hooks run automatically at lifecycle events -- formatting code after every edit, blocking commits that fail tests, filtering sensitive data from prompts. Combined with GitHub Actions integration, these create an autonomous pipeline from issue to tested PR.

## How It Helps

- Auto-formats code after every edit, eliminating "fix the linting errors" follow-ups
- Blocks commits unless tests pass, enforcing quality gates without human intervention
- Filters sensitive data before it reaches the model
- Enables PR generation triggered from Slack, Jira, or monitoring alerts
- Creates continuous improvement loops through agent log analysis

## What You Can Do

### Hook Configuration

Define hooks in `.claude/settings.json` with event-based triggers.

**Available lifecycle events:**
- `PreToolUse` -- Before any tool execution
- `PostToolUse` -- After successful tool completion
- `UserPromptSubmit` -- Before Claude processes the user prompt
- `Notification` -- When Claude sends notifications
- `Stop` -- When Claude finishes a task
- `SubagentStop` -- When a sub-agent finishes
- `SessionStart` -- At session initialization

### Auto-Format After Every Edit

The most common and impactful hook. Auto-format every file Claude edits:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0"
          }
        ]
      }
    ]
  }
}
```

Or using Boris Cherny's pattern:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bun run format || true"
          }
        ]
      }
    ]
  }
}
```

The `|| true` or `exit 0` suffix ensures the hook does not block Claude's workflow if the formatter encounters an issue.

Works with any formatter: Prettier, ESLint, Black, rustfmt, oxlint.

### Auto-Lint After File Edits

Example with oxlint:

**Hook script** (`.claude/hooks/run-oxlint.sh`):

```bash
#!/usr/bin/env bash
file_path="$(jq -r '.tool_input.file_path // ""')"

if [[ "$file_path" =~ \.(js|jsx|ts|tsx|vue)$ ]]; then
  pnpm lint:fast
fi
```

**Configuration:**
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

### Block Commits Until Tests Pass

Use PreToolUse hooks to enforce test-passing before commits:

**Pattern:**
1. Wrap `Bash(git commit)` with a PreToolUse hook
2. Check for `/tmp/agent-pre-commit-pass` file
3. File only exists after all tests pass
4. Missing file blocks the commit, forcing a test-and-fix loop

**Critical principle:** Block at commit, not at write. Blocking mid-plan confuses the agent. Let it finish work, then validate at the commit stage.

### Filter Sensitive Data

Use `UserPromptSubmit` and `PreToolUse` hooks to filter sensitive information:

- Scan prompts and tool arguments for API keys, credentials, and sensitive patterns
- Block execution when sensitive data is detected
- Log or alert on attempted sensitive data exposure

### SessionEnd Hooks for Post-Session Automation

The `SessionEnd` lifecycle event triggers when a Claude Code session completes. This is the integration point for any post-session workflow:

- **Session receipts:** The `claude-receipts` npm package (`github.com/chrishutchinson/claude-receipts`) uses a SessionEnd hook to pull session cost/token data via `ccusage`, then renders a receipt to a thermal printer or browser. This demonstrates the general pattern of session-end data collection and output.
- **Session logging:** Write session summaries, token usage, and cost data to a log file or database after each session.
- **Physical notifications:** Use the SessionEnd hook to trigger audible alerts (e.g., a thermal printer's mechanical sound) when long-running background sessions complete.
- **Session ID barcodes:** Encode the session ID into a QR code on the receipt. Since `claude --resume <session-id>` is supported, scanning the code can directly resume a prior session, bridging physical artifacts with digital session continuity.

### Desktop Notifications

Configure hooks to send alerts when Claude finishes tasks or needs input:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
          }
        ]
      }
    ]
  }
}
```

### CI/CD Debugging with Claude

Give Claude GitHub Actions CI failures to debug:

```
Debug this CI failure. Here are the logs from the failed run.
Use gh run view <run-id> to get the details.
```

Claude can:
- Analyze CI logs to identify root cause
- Determine if the failure is from a specific commit, PR, or flaky test
- Create draft PRs with fixes

### Manual Exponential Backoff for CI

Check CI status with increasing sleep intervals to save tokens:

```bash
# More token-efficient than gh run watch
gh run view <run-id> | grep <job-name>
```

Pattern: check at 1 min, 2 min, 4 min intervals.

### GitHub Actions Integration

Claude Code Action offers:
- Full container and environment control
- Stronger sandboxing and audit controls
- Supports Hooks and MCP

**Trigger sources:** Slack, Jira, CloudWatch alerts can all trigger PR generation.

### GSD (Get Shit Done) Workflow Automation

GSD (`github.com/glittercowboy/get-shit-done`) is a community-built multi-agent orchestration framework that automates the plan-research-execute-verify cycle:

**Architecture:**
- **Orchestrator** uses ~10-15% of context. Reads plan metadata, coordinates, spawns workers, collects results. Never executes code itself.
- **Subagents** each get fresh 200k context windows. Load one plan, execute its tasks, commit, write a summary, and terminate. Plan 5 has identical quality to Plan 1 because context never degrades.
- **Wave-based parallelism:** Plans get pre-assigned wave numbers. Same wave = no dependencies = parallelize. Higher wave = may depend on earlier = wait. A 6-plan phase runs in 3 rounds instead of 6.

**Files as persistent memory across sessions:**
- `PROJECT.md` -- Vision and constraints (stable reference)
- `STATE.md` -- Current position, decisions, blockers (instant resumption after `/clear`)
- `PLAN.md` -- Executable task specs that subagents execute
- `VERIFICATION.md` -- Proof the goal was achieved

**Goal-backward verification:** Rather than checking if tasks are "done," GSD works backwards from the phase goal to verify that artifacts exist, are wired together, and contain substantive implementations (not stubs or TODOs).

**Atomic git history:** Each task = one commit. `git bisect` finds the exact failing task. `git revert` undoes one change cleanly.

Install via `npx get-shit-done-cc`. Supports model profiles (balanced/budget) via `/gsd:settings` to control token consumption.

### Ralph Wiggum Loop Patterns

The Ralph Wiggum loop runs Claude Code in a continuous autonomous loop. The community has identified two fundamentally different implementations with different trade-offs:

**CC Plugin vs Bash Loop:**
- **CC Plugin:** Runs in a single context window. The stop hook is not triggered at compaction, so context bloats over time leading to hallucinations. Not recommended for long-running tasks.
- **Bash Loop (original by Geoffrey Huntley):** Starts a fresh context window each iteration using the `-p` flag. Better for long-running tasks because each iteration gets clean context. Runs headless, so harder to monitor.

**Essential setup before running any loop:**
1. **Sandbox the environment.** Use Docker containers, not just git worktrees. A sandbox protects against unwanted system-level changes (package installs, DB mutations).
2. **Create plan.md and activity.md files.** Give the agent an ordered task list formatted based on Anthropic's "effective harnesses for long-running agents" guidance. The agent reads and updates these each iteration.
3. **Set max iterations.** Start with 10-20. The plugin defaults to unlimited.
4. **Provide a feedback mechanism.** Use Playwright or browser tools so the agent can verify its own work via screenshots and console logs.
5. **Use git.** Commit between iterations for rollback and audit.

**Advanced pattern -- inline loop prompting without plugins:**
```
Optimize this codebase iteratively.

LOOP:
1. Run: find src -name "*.rs" -exec wc -l {} \; | sort -rn | head -1
2. If largest file is under 400 lines: EXIT LOOP, go to FINALIZE
3. Spawn a Sonnet agent to split that file (target 200-400 lines)
4. Wait for subagent, verify cargo check passes
5. GOTO 1

SAFETY:
- Stop if same file appears twice (couldn't split it)
- Stop on any cargo check failure
```

**When Ralph is not the answer:** When working on a team needing PR reviews, when tasks are complex enough that early mistakes compound, when you need interactive design decisions, or when a well-written spec with a single focused session gets the job done without loop overhead.

**Community tools:** `github.com/JamesPaynter/efficient-ralph-loop` (ticket-based bash loop), `github.com/covibes/zeroshot` (enhanced Ralph), `github.com/cbuntingde/ralph-wiggum-mcp` (MCP server implementation).

### Case Study: Autonomous Content Processing System

One developer built a fully autonomous content processing pipeline using Claude Code over 57 days and 144 documented sessions -- without writing or reading a single line of code directly. The system monitors hundreds of channels in multiple languages 24/7, clusters events, and publishes content autonomously.

**Architectural patterns relevant to automation:**

- **Session logs as persistent memory.** The developer maintained `.claude/sessions/YYYY-MM-DD-topic.md` files -- 144 sessions producing 6,500+ lines of notes documenting decisions, insights, and open questions. This is the key pattern for building complex systems with an agent that does not remember between sessions.
- **Quality-driven development loops.** Every few days, Claude analyzed the last 1,000 outputs: "Are they coherent? Does the scoring make sense? What is the false negative rate?" This periodic quality assessment catches drift before it compounds -- a pattern directly applicable to any long-running automated system.
- **Embrace and document failures.** The first architecture attempt did not work. Neither did the second. Each failure was explicitly documented, which constrained the solution space for subsequent iterations. The developer noted that the rapid iteration speed -- often under an hour from bug report to fix to deployment -- is where Claude Code changes the equation for autonomous systems.
- **Architecture conversations, not implementation requests.** Rather than saying "build X," the developer had deep discussions about trade-offs: "What are the tradeoffs between X and Y?" This treats Claude as a knowledgeable colleague for system design while letting it handle implementation.
- **Tiered local/cloud processing.** The system runs 96% locally on consumer hardware, using cloud API only for the final user-facing output. This architecture keeps operational costs minimal for a system processing tens of millions of tokens daily. See [09-mcp-and-integrations.md](./09-mcp-and-integrations.md) for technical details.

### Continuous Improvement via Log Analysis

Create a feedback loop from agent logs:

```bash
query-claude-gha-logs --since 5d | claude -p "see what the other claudes were getting stuck on and fix it, then put up a PR"
```

This identifies common mistakes and bash errors, informing CLAUDE.md and CLI improvements for better agent performance.

## Details

### Hook Execution Modes

- **Command mode:** Execute shell scripts (fast, predictable, deterministic)
- **Prompt mode:** Let Claude decide via LLM (flexible, context-aware, non-deterministic)

Use command mode for formatting, linting, and other deterministic operations. Use prompt mode when the response needs to be context-aware.

### Hook Best Practices

- Match tool names precisely (`Edit|Write`)
- Test hooks with simple commands before advancing to complex logic
- Use `jq` for JSON parsing in bash hook scripts
- Available environment variables: `$CLAUDE_FILE_PATH`, `$CLAUDE_PROJECT_DIR`
- Settings-level deny rules take precedence over `--dangerously-skip-permissions`

### Post-Generation Quality Analysis (Stop Hooks)

After Claude generates a response, a Stop hook can analyze which files were edited and check for high-risk patterns (error handling, async functions). This acts as a quality reminder without blocking the workflow.

### Pre-Submission Hooks for Skill Activation

Hooks can intercept prompts before they reach Claude, analyzing input for keywords and intent patterns. Relevant contextual skills or instructions are activated automatically based on the detected topic.

### Automation of Automation

Create systems that automate repetitive automation tasks. For example, a slash command that generates new hooks and commands based on common patterns you identify in your workflow.

### CI/CD Pipeline Setup

Provide Claude with detailed specifications for pipeline creation:

```
For every PR: full test suite, TypeScript compilation, Prettier check, ESLint,
production build, security audit, breaking change detection.

For main branch merges: everything above + deploy to staging + smoke tests + Slack notification.

For tagged releases: deploy to production with zero downtime + health checks + monitoring updates.
```

Claude creates GitHub Actions workflows, npm scripts, environment configs, and deployment scripts tailored to your hosting platform.

## Sources

- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://sidbharath.com/claude-code-the-complete-guide/
- https://www.oreateai.com/blog/claudemd-best-practices-reddit/3a29cdd605ebb2025681e71218021b5e
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qxu7qp/ (receipt printer SessionEnd hook automation)
- https://www.reddit.com/r/ClaudeCode/comments/1qf6vcc/ (GSD multi-agent orchestration framework)
- https://www.reddit.com/r/ClaudeCode/comments/1qc4vg0/ (Ralph Wiggum loop patterns and best practices)
- https://github.com/glittercowboy/get-shit-done (GSD framework)
- https://github.com/chrishutchinson/claude-receipts (SessionEnd receipt printer hook)
- https://www.reddit.com/r/ClaudeCode/comments/1qv4lqw/how_i_built_an_ai_news_agency_that_runs_itself/ (autonomous content processing system case study)
- https://github.com/JamesPaynter/efficient-ralph-loop (ticket-based Ralph loop)
