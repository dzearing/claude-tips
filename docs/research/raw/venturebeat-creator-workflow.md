# Boris Cherny's Claude Code Workflow: Complete Extracted Tips

Source: [VentureBeat - The creator of Claude Code just revealed his workflow](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are)

Additional sources for full detail:
- [InfoQ - Inside the Development Workflow of Claude Code's Creator](https://www.infoq.com/news/2026/01/claude-code-creator-workflow/)
- [How Boris Uses Claude Code (comprehensive reference)](https://howborisusesclaudecode.com/)
- [Paddo.dev - How Boris Uses Claude Code](https://paddo.dev/blog/how-boris-uses-claude-code/)
- [Boris Cherny's original thread](https://twitter-thread.com/t/2007179832300581177)

---

## Run Multiple Claude Sessions in Parallel (Terminal)

Run 5 Claude Code instances simultaneously in separate terminal tabs, numbered 1-5. Each tab operates on a separate `git checkout` (or git worktree) of the same repo to avoid conflicts. Configure iTerm2 (or your terminal) notifications to alert when Claude needs input so you can context-switch efficiently.

Boris describes the experience as feeling "more like Starcraft" than traditional coding -- shifting from writing syntax to directing autonomous units.

Accept that 10-20% of sessions get abandoned due to unexpected scenarios. This is normal and expected.

**Commands/Config:**
- Number terminal tabs 1-5 for quick identification
- Use separate git checkouts per tab to avoid conflicts
- Enable terminal notifications for Claude input requests

**Category:** `parallelization`, `session-management`, `productivity`

---

## Run Parallel Web and Mobile Sessions

Run 5-10 additional sessions on claude.ai/code alongside terminal instances. Use the `&` command to background sessions from the CLI. Use `--teleport` to move sessions between local terminal and web interface. Launch sessions from the Claude iOS app in the morning and resume on desktop later.

Total concurrent capacity: 10-15 sessions across terminal, web, and mobile.

**Commands/Config:**
- `&` -- background a local session
- `--teleport` -- transfer work between local terminal and web interface
- Claude iOS app for initiating sessions on the go

**Category:** `parallelization`, `session-management`, `mobile-workflow`

---

## Use Git Worktrees Instead of Separate Checkouts

Spin up 3-5 git worktrees simultaneously, each with its own Claude session. The Claude Code team prefers worktrees over separate checkouts. Create shell aliases for single-keystroke switching between worktrees.

Maintain a dedicated "analysis" worktree used only for reading logs and running BigQuery analysis (never for code changes).

Boris ranked this as his single biggest productivity unlock.

**Commands/Config:**
```bash
git worktree add .claude/worktrees/my-worktree origin/main
```
- Create shell aliases (e.g., `za`, `zb`, `zc`) for single-keystroke worktree switching

**Category:** `parallelization`, `git`, `productivity`

---

## Use Opus 4.5 with Thinking for Everything

Boris exclusively uses Opus 4.5 with thinking mode enabled for all coding work. Despite being larger and slower than Sonnet, it requires less steering and is better at tool use, making it ultimately faster in practice.

**Quote:** "It's the best coding model I've ever used, and even though it's bigger & slower than Sonnet, since you have to steer it less and it's better at tool use, it is almost always faster than using a smaller model in the end."

**Commands/Config:**
- Set model to Opus 4.5 with thinking enabled in Claude Code settings

**Category:** `model-selection`, `configuration`

---

## Maintain a Shared CLAUDE.md Documentation File

Each team maintains a single `CLAUDE.md` file checked into their git repository. The entire team contributes to it multiple times per week. Anytime Claude does something incorrectly, they add the correction to CLAUDE.md so Claude knows not to repeat the mistake.

Content includes:
- Mistakes to prevent recurrence
- Best practices, style conventions, design guidelines
- PR templates and patterns
- Preferred tools (e.g., prefer `bun` over `npm`)
- Command workflows
- Linting standards

The Claude Code team's CLAUDE.md is approximately 2,500 tokens.

**Quote:** "Anytime we see Claude do something incorrectly we add it to the CLAUDE.md, so Claude knows not to do it next time."

**Commands/Config:**
- File location: `CLAUDE.md` in repository root
- Check into git for team sharing and version control

**Category:** `knowledge-management`, `team-workflow`, `documentation`

---

## Invest Heavily in CLAUDE.md Over Time

End every correction session with: "Update your CLAUDE.md so you don't make that mistake again." Ruthlessly edit the file over time to measurably drop the mistake rate.

Create a notes directory for every task/project that gets updated after each PR. Point CLAUDE.md at the notes directory for reference.

**Quote:** Claude is "eerily good at writing rules for itself."

**Commands/Config:**
- Maintain a notes directory per task/project
- Reference notes directory from CLAUDE.md

**Category:** `knowledge-management`, `continuous-improvement`

---

## Use @.claude in Code Reviews

Tag `@.claude` on coworkers' pull requests to add learnings to CLAUDE.md during code review. This uses the Claude Code GitHub Action.

Install the GitHub Action via `/install-github-action` in Claude Code.

This approach is inspired by Dan Shipper's concept of "Compounding Engineering" -- code review becomes meta-work that improves the process that produces code.

**Example PR comment:** "nit: use a string literal, not ts enum @claude add to CLAUDE.md"

**Commands/Config:**
- `/install-github-action` -- install the Claude Code GitHub Action
- `@.claude` tag in PR review comments

**Category:** `code-review`, `knowledge-management`, `team-workflow`, `github-action`

---

## Start Every Complex Task in Plan Mode

Use Shift+Tab twice to enter Plan mode before beginning any non-trivial task. Iterate back-and-forth with Claude until you are satisfied with the plan quality. Only then switch to auto-accept edits mode and let Claude one-shot the implementation.

**Quote:** "A good plan is really important to avoid issues down the line."

**Advanced patterns:**
- Pattern 1: One Claude session writes the plan, a second Claude session reviews it as a "staff engineer"
- Pattern 2: When things go sideways mid-implementation, switch back to plan mode and re-plan
- Use plan mode explicitly for verification steps, not just builds

**Commands/Config:**
- `Shift+Tab` twice -- enter Plan mode
- Plan -> Refine -> Auto-accept -> Claude one-shots implementation

**Category:** `planning`, `workflow`, `quality`

---

## Create Slash Commands for Inner Loop Workflows

Create custom slash commands for every workflow you repeat many times daily. This saves from repeated prompting and enables Claude to use these workflows too. Commands are checked into git and stored in `.claude/commands/` for team sharing.

The key power feature: commands can use inline Bash to pre-compute information (like git status, diff output, etc.) which reduces unnecessary back-and-forth with the model.

**Commands/Config:**
- Store commands in `.claude/commands/` directory
- Check into git for team sharing
- `/commit-push-pr` -- used dozens of times daily
- Use inline bash in commands to pre-compute context

**Category:** `automation`, `slash-commands`, `team-workflow`

---

## Create Custom Skills for Reusable Workflows

Build custom skills and commit them to git for reuse across projects. If you do something more than once daily, turn it into a skill or command.

**Examples:**
- `/techdebt` slash command to find and kill duplicated code at the end of a session
- Sync 7 days of Slack, Google Drive, Asana, GitHub into a context dump
- Analytics-engineer agents that write dbt models, review code, and test in dev

**Commands/Config:**
- Store skills in `.claude/skills/` directory
- Check into git for cross-project reuse

**Category:** `automation`, `skills`, `reuse`

---

## Deploy Subagents for Specialized Tasks

Use subagents as modular, specialized AI personas to handle specific phases of the development lifecycle. Reliability comes from specialization plus constraint. Subagents keep the main context focused while offloading individual tasks.

**Known subagent examples from Boris's setup:**
- `code-simplifier` -- cleans up and simplifies architecture after main work is done
- `verify-app` -- runs detailed end-to-end testing instructions
- `build-validator` -- validates builds
- `code-architect` -- architectural decisions
- `oncall-guide` -- on-call workflow assistance

**Advanced usage:**
- Append "use subagents" to requests for more compute on problem-solving
- Route permission requests to Opus 4.5 via hook for attack scanning and auto-approval
- Launch 5 explore agents in parallel via: "use 5 subagents to explore the codebase"

**Commands/Config:**
- Subagent definitions stored in `.claude/commands/` or `.claude/skills/`

**Category:** `subagents`, `automation`, `specialization`

---

## Use PostToolUse Hooks for Auto-Formatting

Implement a PostToolUse hook that automatically formats Claude's code after every write or edit operation. Claude's output is "usually" well-formatted, but the hook catches the remaining ~10% of formatting issues to prevent CI failures.

**Commands/Config:**
```json
{
  "PostToolUse": [{
    "matcher": "Write|Edit",
    "hooks": [{
      "type": "command",
      "command": "bun run format || true"
    }]
  }]
}
```

**Category:** `hooks`, `code-quality`, `ci`, `formatting`

---

## Manage Permissions Carefully with /permissions

Almost never use `--dangerously-skip-permissions`. Instead, use the `/permissions` command to pre-allow common safe commands. Store permissions in `.claude/settings.json` for team sharing.

Only use `--dangerously-skip-permissions` for long-running sandbox tasks where Claude would repeatedly stop for approvals, or use `--permission-mode=dontAsk` in sandboxed environments.

**Commands/Config:**
- `/permissions` -- manage allowed commands
- Allowed command examples:
  - `Bash(bq query:*)`
  - `Bash(bun run build:*)`
  - `Bash(bun run test:*)`
  - `Bash(bun run lint:file:*)`
  - `Bash(bun run typecheck:*)`
  - `Bash(cc:*)`
- Settings file: `.claude/settings.json`
- `--dangerously-skip-permissions` -- only for sandboxed environments
- `--permission-mode=dontAsk` -- alternative for sandboxed environments

**Category:** `permissions`, `security`, `configuration`, `team-workflow`

---

## Integrate MCP Tools (Slack, BigQuery, Sentry)

Claude Code autonomously uses integrated tools when configured. Set up MCP server integrations to eliminate context switching.

**Integrations mentioned:**
- **Slack MCP** -- search and post messages, paste bug threads and say "fix"
- **BigQuery CLI** -- run queries with `bq` command for on-the-fly analysis
- **Sentry** -- grab error logs directly

**Commands/Config:**
- MCP configuration stored in `.mcp.json`
- Share `.mcp.json` with team for consistent tool access
- On-demand tool loading prevents context bloat

**Category:** `mcp`, `tool-integration`, `slack`, `bigquery`, `sentry`

---

## Use Claude for Data and Analytics

Use `bq` CLI to pull and analyze metrics on the fly. The team maintains a BigQuery skill in the codebase for shared use. This works with any database that has a CLI, MCP, or API.

**Quote:** "Personally, I haven't written a line of SQL in 6+ months."

**Commands/Config:**
- `bq` CLI for BigQuery queries
- Maintain shared analytics skills in codebase

**Category:** `analytics`, `data`, `bigquery`, `productivity`

---

## Handle Long-Running Tasks Properly

Three approaches for managing extended operations:

1. **Background agent verification** -- Prompt Claude to verify its work with a background agent when done
2. **Agent Stop hook** -- Use deterministic verification checks at agent completion
3. **Ralph Wiggum plugin** -- Community-created plugin for autonomous loops (credited to @GeoffreyHuntley)

For sandboxed environments, use `--permission-mode=dontAsk` or `--dangerously-skip-permissions` to prevent blocking on permissions during long runs.

**Commands/Config:**
- `--permission-mode=dontAsk` -- for sandboxed long-running tasks
- `--dangerously-skip-permissions` -- last resort for sandboxed environments

**Category:** `long-running-tasks`, `automation`, `sandboxing`

---

## Provide Verification Feedback Loops (Most Important Tip)

Boris's number one tip: give Claude a way to verify its own work. If Claude has a feedback loop, it will 2-3x the quality of the final result.

**Quote:** "Probably the most important thing to get great results out of Claude Code: give Claude a way to verify its work. If Claude has that feedback loop, it will 2-3x the quality of the final result."

**Verification methods by complexity:**
- **Simple:** Bash command execution (run the code, check output)
- **Moderate:** Running test suites
- **Complex:** Browser testing via Chrome extension, phone simulator testing

**Real-world example:** Claude tests every change to claude.ai/code using the Claude Chrome extension. It opens a browser, tests the UI, and iterates until the code works and the UX feels good.

**Category:** `verification`, `quality`, `testing`, `feedback-loops`

---

## Let Claude Fix Bugs Autonomously

Enable Slack MCP integration, paste a Slack bug thread, and just say "fix." Point Claude at failing CI tests and say "Go fix the failing CI tests" without micromanaging. Point Claude at docker logs for distributed system troubleshooting. This approach requires zero context switching.

**Category:** `bug-fixing`, `automation`, `slack`, `ci`

---

## Level Up Your Prompting Techniques

Push Claude harder with specific prompting patterns:

- **Challenge Claude:** "Grill me on these changes and don't make a PR until I pass your test"
- **Make Claude your reviewer:** "Prove to me this works"
- **Push for elegance:** After a mediocre fix, say "Knowing everything you know now, scrap this and implement the elegant solution"
- **Write detailed specs** that reduce ambiguity before starting work
- **Key insight:** Do not accept the first solution. Push Claude to do better.

**Category:** `prompting`, `quality`, `workflow`

---

## Optimize Your Terminal and Environment

**Terminal choice:** The Claude Code team uses Ghostty for synchronized rendering, 24-bit color, and proper Unicode support.

**Statusline:** Use `/statusline` to show context usage and current git branch at all times.

**Tab management:**
- Color-code and name terminal tabs by task/worktree
- Use tmux for tab organization (one tab per task)

**Voice dictation:** Use voice input to speak prompts 3x faster than typing. On macOS, press `fn` twice to activate dictation. Particularly useful for writing more detailed prompts when typing would feel tedious.

**Commands/Config:**
- `/statusline` -- enable statusline showing context usage and git branch
- `fn` + `fn` on macOS -- activate voice dictation
- Ghostty terminal emulator

**Category:** `environment`, `terminal`, `productivity`, `voice-input`

---

## Use Claude as a Learning Tool

Enable "Explanatory" or "Learning" output style in `/config` to understand the reasoning behind changes.

**Learning techniques:**
- Generate visual HTML presentations explaining unfamiliar code
- Have Claude draw ASCII diagrams of protocols and codebases
- Build a spaced-repetition learning skill: explain your understanding, Claude asks follow-ups, stores results for future review

**Commands/Config:**
- `/config` -- set output style to "Explanatory" or "Learning"

**Category:** `learning`, `onboarding`, `configuration`

---

## Team Impact and Philosophy

Boris's workflow allows his team to "focus on code review and steering." By the time an engineer reviews a PR, the code is already in good shape.

The overall approach is described as "surprisingly vanilla" -- Claude Code works well out of the box. No exotic customization is required. Disciplined fundamentals applied consistently produce outsized results.

**Key philosophy points:**
- "There is no one correct way to use Claude Code"
- Multiple simple sessions outperform a single complex session
- Shared configuration standardizes team workflow
- Verification infrastructure delivers consistent multiplier effects
- CLAUDE.md compounds value over time, especially at team scale
- Plan mode is foundational, not optional

**Category:** `philosophy`, `team-workflow`, `strategy`

---

## Quick Reference: Boris's Install Skill

One-line global install to get Boris's tips as a Claude Code skill:

```bash
mkdir -p ~/.claude/skills/boris && curl -L -o ~/.claude/skills/boris/SKILL.md https://howborisusesclaudecode.com/api/install
```

For project-specific install, use `.claude/skills/` instead of `~/.claude/skills/`.

Usage: Type `/boris` in Claude Code sessions or ask about workflows directly.

**Category:** `installation`, `skills`
