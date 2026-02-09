# 24 Claude Code Tips (ClaudeCodeAdventCalendar)

Source: https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
Author: @oikon48
Extracted: 2026-02-09

---

## Day 1: Opus 4.5 Migration Guide

Anthropic provides an official Skills plugin for migrating to Opus 4.5, which exhibits specific behavioral tendencies that require mitigation.

**Known Issues with Opus 4.5:**

- Excessive tool invocations when unnecessary
- Over-engineering solutions
- Insufficient code exploration
- Frontend design quality variations
- Over-reaction to "think" keywords

**Plugin Location:**

```
anthropics/claude-code/tree/main/plugins/claude-opus-4-5-migration
```

The plugin helps address these behavioral patterns by providing migration-specific guidance.

**Category Tags:** `#model-selection` `#opus-4.5` `#plugins` `#migration`

---

## Day 2: Claude Code Statusline

Display useful information below the chat input area, including model name, Git branch, and custom metrics.

**Configuration (settings.json):**

```json
{
  "statusLine": {
    "type": "command",
    "command": "bun x ccusage statusline"
  }
}
```

**Usage:**

- Use the `/statusline <content>` command to set custom status content
- Configure via `settings.json` for persistent display
- Shows real-time information about current session context

**Category Tags:** `#ui` `#configuration` `#statusline` `#settings`

---

## Day 3: Send Tasks to Web with &

Prefix prompts with `&` (available since v2.0.45+) to send tasks to Claude Code on the Web for remote sandbox execution.

**Features:**

- Tasks execute in a remote sandbox environment
- Transfer tasks back to CLI using the "Open from CLI" button in the web interface
- Model specification carries over to the Web session
- Enables offloading long-running tasks while continuing local work

**Usage:**

```
& <your prompt here>
```

**Category Tags:** `#workflow` `#web` `#remote-execution` `#async`

---

## Day 4: Thinking Keywords

Only the `ultrathink` keyword triggers extended thinking mode. Previous thinking keywords were disabled in v2.0.0.

**What works:**

- `ultrathink` -- triggers extended thinking mode

**What does NOT work (as of v2.0.0+):**

- `think`
- `think hard`
- `think deeply`
- Translated equivalents of any of the above

**Toggle:** Press the `Tab` key to toggle extended thinking on/off in the interface.

**Documentation updated:** December 13, 2025.

**Category Tags:** `#thinking` `#extended-thinking` `#ultrathink` `#keyboard-shortcuts`

---

## Day 5: AGENTS.md Support

Claude Code does not officially support AGENTS.md (open GitHub issue #6235 since August). There are two workarounds available.

**Workaround 1 -- Import within CLAUDE.md:**

Use `@AGENTS.md` syntax inside your CLAUDE.md file to import the content. Verify the import is working with the `/memory` command.

**Workaround 2 -- Symbolic link:**

```bash
ln -s AGENTS.md CLAUDE.md
```

This creates a symlink so Claude Code reads AGENTS.md as if it were CLAUDE.md.

**Verification:**

```
/memory
```

**Category Tags:** `#agents-md` `#claude-md` `#workaround` `#configuration`

---

## Day 6: Claude Code on the Web Setup

The remote Web environment requires separate setup configuration. Local configuration does not transfer automatically.

**Key Details:**

- The environment variable `CLAUDE_CODE_REMOTE` is set when running in a remote Web environment
- Create a `SessionStart` Hook to detect remote execution and run setup scripts accordingly
- Only run web-specific setup when `CLAUDE_CODE_REMOTE` is detected

**Documentation:** `code.claude.com/docs/en/claude-code-on-the-web`

**Category Tags:** `#web` `#remote` `#hooks` `#session-start` `#environment-variables`

---

## Day 7: MCP Tool Context Consumption

MCP tools consume 8-30% of the context window space simply by being available, even when they are never used during a session.

**Key Points:**

- Tool descriptions are loaded into the agent's context automatically when tools are registered
- Use the `/context` command to measure how much overhead tools are adding
- Browser automation MCP tools tend to consume the most context
- Skills do not eliminate this overhead -- only removing tools or replacing them with scripts reduces consumption

**Command:**

```
/context
```

**Actionable Advice:**

- Audit your MCP tool registrations regularly
- Remove tools you rarely use
- Consider replacing heavy MCP tools with lightweight scripts where possible

**Category Tags:** `#mcp` `#context-window` `#performance` `#optimization`

---

## Day 8: Skill Creator

A meta-skill that generates new Skills automatically. It produces functional starting points but output may not follow all best practices.

**Installation:**

```
/plugin marketplace add anthropics/skills
/plugin install example-skills@anthropic-agent-skills
```

**Usage:**

After restarting Claude Code, request:

> "Create a skill for [your use case]"

**Availability:** Since October 2025.

**Caveat:** Generated skills provide a starting point but should be reviewed and refined before production use.

**Category Tags:** `#skills` `#plugins` `#automation` `#meta-skill`

---

## Day 9: Skills + Subagents

Combine Skills with Subagents using YAML frontmatter for specialized workflows. Skills automatically load into the Subagent context when invoked.

**Subagent Configuration with Skills (YAML frontmatter):**

```yaml
---
skills:
  - frontend-design-system
  - testing-patterns
---
# Fullstack Developer Subagent
```

**Documentation:** `code.claude.com/docs/en/sub-agents#file-format`

**How it works:**

- Define skills in the YAML frontmatter of a Subagent definition file
- When the Subagent is invoked, the referenced Skills are automatically loaded into its context
- Enables composable, specialized workflows

**Category Tags:** `#skills` `#subagents` `#yaml` `#workflow-composition`

---

## Day 10: Project Rules

An alternative to CLAUDE.md for organizing project instructions. Store topic-specific rules in `.claude/rules/` as Markdown files (available since v2.0.64+).

**Directory Structure:**

```
.claude/
  rules/
    code-style.md
    testing-conventions.md
    security-requirements.md
    api-development.md
```

**Conditional Application with glob patterns (YAML frontmatter):**

```yaml
---
paths: src/api/**/*.ts
---
# API Development Rules

- All API endpoints must validate input parameters
- Use consistent error response format
- Include request logging middleware
```

**Benefits:**

- Rules load dynamically only when operating on files matching the glob pattern
- Better organization than a single monolithic CLAUDE.md
- Can mix global rules (no paths frontmatter) with conditional rules

**Category Tags:** `#project-rules` `#configuration` `#claude-md` `#organization`

---

## Day 11: CLAUDE.md Loading Order

Claude Code loads project CLAUDE.md files from two startup locations, plus nested directories when operating in subdirectories.

**Startup Load Locations:**

1. `./CLAUDE.md` (project root)
2. `./.claude/CLAUDE.md` (inside .claude directory)

**Nested Directory Loading:**

- CLAUDE.md files in subdirectories are NOT loaded at startup
- They are loaded dynamically when Claude Code operates on files in those directories
- This enables directory-specific context without polluting the global context

**Strategy:**

- Use nested CLAUDE.md files for directory-specific instructions
- Use Project Rules (`.claude/rules/`) for cross-cutting concerns that apply across directories

**Category Tags:** `#claude-md` `#loading-order` `#project-structure` `#configuration`

---

## Day 12: Preventing rm -rf Disasters

Configure safety guards in settings.json to block dangerous commands from being executed.

**Configuration (~/.claude/settings.json):**

```json
{
  "permissions": {
    "deny": ["rm", "DROP TABLE", "DELETE FROM"]
  }
}
```

**Permission Levels:**

- `permissions.deny` -- blocks commands entirely, cannot be overridden
- `permissions.ask` -- requires user confirmation before execution

**Important:** Settings-level deny rules take precedence over the `--dangerously-skip-permissions` CLI flag. Even with that flag, denied commands will not execute.

**Context:** Inspired by a Reddit incident where a user accidentally deleted their entire home directory.

**Category Tags:** `#safety` `#permissions` `#settings` `#destructive-commands`

---

## Day 13: Sandbox for File System Protection

The `/sandbox` command restricts file system and network access to the working directory only.

**Command:**

```
/sandbox
```

**Restrictions when active:**

- Cannot execute Edit, Read, or Bash commands on paths outside the sandbox
- Network access is restricted
- Explicit permission is required for additional paths beyond the working directory

**Strategy:** Layer sandbox mode with Day 12 permission deny-lists and Hooks (Day 14/15) for comprehensive protection.

**Category Tags:** `#safety` `#sandbox` `#file-system` `#permissions`

---

## Day 14: Hooks for Sensitive Data Filtering

Use `UserPromptSubmit` and `PreToolUse` hooks to filter sensitive information before it reaches the AI model for processing.

**Hook Types:**

- `UserPromptSubmit` -- intercepts user prompts before submission; can also append additional context to prompts
- `PreToolUse` -- intercepts tool calls before execution

**Implementation Approach:**

- Scan prompts and tool arguments for API keys, credentials, and sensitive patterns
- Block execution when sensitive data is detected
- Log or alert on attempted sensitive data exposure

**Use Cases:**

- Preventing accidental inclusion of API keys in prompts
- Blocking file reads of credential files
- Filtering environment variables containing secrets

**Category Tags:** `#hooks` `#security` `#sensitive-data` `#filtering`

---

## Day 15: Hooks for Code Formatting

Run code formatters automatically after Claude Code edits files using `PostToolUse` hooks.

**Configuration (settings.json):**

```json
{
  "hooks": {
    "PostToolUse": {
      "command": "prettier --write $CLAUDE_FILE_PATH"
    }
  }
}
```

**Environment Variable:**

- `$CLAUDE_FILE_PATH` -- the path of the file that was just edited

**Advantages:**

- Deterministic formatting behavior outside Claude's context (no token cost)
- Works with any formatter: Prettier, ESLint, Black, rustfmt, etc.
- Can also run linters and type checkers post-edit
- Ensures consistent code style regardless of model output

**Category Tags:** `#hooks` `#formatting` `#automation` `#code-quality`

---

## Day 16: External Editor with Ctrl+G

Press `Ctrl+G` to open prompts or Plan documents in your preferred external editor for more comfortable editing.

**Configuration (shell profile):**

```bash
export VISUAL="vim"
# or
export VISUAL="emacs"
# or
export VISUAL="code --wait"
# or
export VISUAL="cursor --wait"
```

**Priority Order:**

1. Checks `VISUAL` environment variable first
2. Falls back to `EDITOR` environment variable

**Note:** The `--wait` flag is important for GUI editors (VS Code, Cursor) so the terminal waits for the editor to close before continuing.

**Category Tags:** `#editor` `#keyboard-shortcuts` `#workflow` `#external-tools`

---

## Day 17: Plan Mode

Press `Shift+Tab` to enter Plan mode, which allows reviewing and editing execution plans before Claude Code acts on them.

**Keyboard Shortcut:** `Shift+Tab`

**Details:**

- Plans are saved to `~/.claude/plans/` (available since v2.0.34+)
- There is no way to specify a custom save path (feature request: GitHub issue #12619)
- Combine with `Ctrl+G` to edit plans in an external editor for more complex planning

**Workflow:**

1. Enter Plan mode with `Shift+Tab`
2. Claude generates an execution plan
3. Review the plan, optionally edit with `Ctrl+G`
4. Approve or modify before execution

**Category Tags:** `#planning` `#keyboard-shortcuts` `#workflow` `#review`

---

## Day 18: GIF Creation with Chrome Integration

Version v2.0.72 introduced Chrome integration with GIF recording capability for capturing browser automation sessions.

**Setup Command:**

```
/chrome
```

**Features:**

- Captures browser automation sessions as animated GIFs
- Exports recordings for tutorials and documentation
- Leverages browser user profile for authenticated interactions (logged-in sessions)
- Direct Chrome control via MCP tools

**Category Tags:** `#chrome` `#gif` `#browser-automation` `#documentation`

---

## Day 19: Agent Skills Best Practices

Skills are an open standard supported across Claude Code, Cursor, GitHub Copilot, and other AI assistants.

**Best Practices for Writing Skills:**

1. Keep SKILL.md under 500 lines
2. Include specific, concrete examples (not vague descriptions)
3. Limit file references to one directory level deep
4. Use progressive disclosure for complex information
5. Define clear workflow steps
6. Leverage scripts for deterministic operations (don't leave deterministic tasks to the model)
7. Avoid Windows-style paths (use forward slashes)
8. Build verification and feedback loops into skill workflows
9. Include at least three evaluation scenarios for testing
10. Test skills across multiple models to ensure compatibility

**Resources:**

- Best practices docs: `platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices`
- Skills registry: `agentskills.io/home`

**Category Tags:** `#skills` `#best-practices` `#standards` `#cross-platform`

---

## Day 20: Auto-compact Buffer Size

Auto-compact reserves a buffer for conversation compression based on output token settings. Understanding this trade-off helps optimize context usage.

**Default Behavior:**

- Default buffer: 32k tokens (22.5% of the 200k context window)
- This buffer is reserved for the compaction summary

**With Maximum Output Tokens:**

- Setting `CLAUDE_CODE_MAX_OUTPUT_TOKENS` to 64k increases the buffer to approximately 40% of available context
- This leaves significantly less space for actual conversation content

**Environment Variable:**

```bash
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=64000
```

**Actionable Advice:**

- Revisit your configuration if you have `CLAUDE_CODE_MAX_OUTPUT_TOKENS` set to maximum
- The trade-off is: larger output capacity vs. more available context for conversation history
- Default 32k is a reasonable balance for most workflows

**Category Tags:** `#context-window` `#auto-compact` `#configuration` `#performance`

---

## Day 21: Async Subagents

Subagents can execute asynchronously in the background while the main agent continues working. The main agent receives notifications when background subagents complete.

**Available since:** v2.0.60+

**Applications:**

- Parallel codebase exploration (search multiple areas simultaneously)
- Concurrent code reviews (review multiple files at once)
- Simultaneous search operations across different parts of the project

**Future:** Anthropic is planning enhanced "Swarming" capabilities for 2026, building on async subagent foundations.

**Category Tags:** `#subagents` `#async` `#parallelism` `#performance`

---

## Day 22: Claude Code Action + Agent Skills

Claude Code Action runs on GitHub Actions with Skills support, enabling CI/CD integration with specialized skill contexts.

**Setup Steps:**

1. Create Skills in `.claude/skills/` directory
2. Add "Skill" to `claude_args: --allowed-tools` in your GitHub Actions workflow
3. Use `/install-github-app` for `CLAUDE_CODE_OAUTH_TOKEN` configuration

**Commands:**

```
/install-github-app
```

**GitHub Actions Configuration:**

- Add `--allowed-tools Skill` to the `claude_args` parameter

**Context:** GitHub Actions pricing changes are reducing runner costs, making this more practical.

**Category Tags:** `#github-actions` `#ci-cd` `#skills` `#automation`

---

## Day 23: Parallel Execution Strategies

Two approaches enable concurrent Claude Code execution for faster workflows.

**Approach 1 -- Same-Branch Parallelism (Subagents):**

- Use Subagents for concurrent tasks on the same branch
- Most effective for read-only operations and tasks with clear component boundaries
- Invoke multiple Subagents from Skills for orchestrated parallel work

**Approach 2 -- Different-Branch Parallelism (git worktree):**

```bash
git worktree add ../feature-branch-workdir feature-branch
```

- Use `git worktree` to create separate working directories for different branches
- Run independent Claude Code instances in each worktree
- Combine with `tmux` for orchestrating multiple terminal sessions

**Tooling:**

- `git worktree` -- creates linked working directories from a single repo
- `tmux` -- terminal multiplexer for managing multiple sessions

**Future:** Anthropic has confirmed Swarming as a focus area for 2026 (discussed at Claude Code Meetup in Tokyo).

**Category Tags:** `#parallelism` `#git-worktree` `#subagents` `#tmux` `#workflow`

---

## Day 24: Claude Code Ecosystem Overview

The Claude Code platform expanded significantly from its February 24, 2025 launch through ten months of development into a comprehensive ecosystem.

**Current Ecosystem Components:**

- **CLI** -- Command-line interface, the original and primary interface
- **SDK** -- Programmatic integration for building on top of Claude Code
- **IDE Extensions** -- VS Code, JetBrains, and VS Code fork support
- **Claude Code on the Web** -- Remote sandbox execution environment
- **Mobile App** -- Mobile access to Claude Code capabilities
- **Desktop App** -- Native desktop experience
- **Slack Integration** -- Team collaboration through Slack
- **Chrome Extension** -- Browser automation and control
- **GitHub Actions** -- CI/CD integration (Claude Code Action)

**Workflow Continuity:**

Tasks can flow between components seamlessly across devices and platforms, enabling workflows that start on CLI, continue on Web, and complete through GitHub Actions.

**Category Tags:** `#ecosystem` `#overview` `#platform` `#integrations`
