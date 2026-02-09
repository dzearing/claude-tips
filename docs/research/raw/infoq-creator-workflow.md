# Claude Code Creator Workflow - Raw Extracted Tips

Source: https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
Author context: Boris Cherny, creator of Claude Code at Anthropic
Extracted: 2026-02-09

---

## Run Multiple Parallel Sessions

Run multiple Claude Code instances simultaneously to maximize productivity. Boris Cherny operates five sessions locally in his MacBook's terminal and 5-10 on Anthropic's website. Each local session uses its own `git checkout` rather than branches or worktrees to avoid conflicts between parallel sessions.

Expect that 10-20% of parallel sessions will be abandoned due to unexpected scenarios -- this is a normal part of the workflow and factored into the approach.

**Key numbers:**
- 5 local terminal sessions
- 5-10 remote sessions on Anthropic's website
- 10-20% abandonment rate is normal

**Category tags:** `#parallel-sessions` `#productivity` `#git-workflow`

---

## Use Opus 4.5 with Thinking Mode for All Coding

Use Opus 4.5 with thinking mode enabled for all coding tasks. Despite slower token generation speed, it delivers superior quality and reliability compared to Sonnet, excels at tool use, and ultimately proves faster overall because higher quality means fewer iterations and corrections.

**Category tags:** `#model-selection` `#quality` `#thinking-mode`

---

## Maintain a CLAUDE.md Knowledge File

Maintain a `CLAUDE.md` file in your git repository documenting mistakes and best practices. The file should include:

- Mistakes Claude commonly makes (so it can learn to avoid them)
- Best practices for the codebase
- Style conventions
- Design guidelines
- PR templates

Cherny's team maintains a 2.5k-token documentation file. Use the `@claude` tag on colleagues' pull requests to preserve learnings from code review into the CLAUDE.md file, ensuring knowledge accumulates over time.

**Category tags:** `#claude-md` `#documentation` `#team-workflow` `#knowledge-management`

---

## Plan Before Executing

Start with Plan mode and iterate with the AI until the strategy is refined before writing any code. Cherny describes his approach:

> "If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan. From there, I switch into auto-accept edits mode."

A good plan is critical. Quality plans often result in single-shot successful implementations, meaning Claude can produce a complete working PR without further back-and-forth.

**Workflow steps:**
1. Enter Plan mode
2. Iterate back and forth with Claude until the plan is satisfactory
3. Switch to auto-accept edits mode
4. Let Claude execute the plan in one shot

**Category tags:** `#planning` `#workflow` `#plan-mode` `#auto-accept`

---

## Create Slash Commands for Repeated Workflows

Store daily workflow commands in `.claude/commands/` directory to reduce explicit prompting overhead. These act as reusable sub-agents with custom logic.

Example: A `/commit-push-pr` command used dozens of times daily. The command includes inline bash that pre-computes git status and other metadata, providing additional context to minimize model back-and-forth during execution.

**Configuration location:** `.claude/commands/`

**Category tags:** `#slash-commands` `#automation` `#developer-experience` `#workflow`

---

## Configure PostToolUse Hooks for Automatic Code Formatting

Configure PostToolUse hooks to automatically format code after every write or edit operation. This prevents CI failures caused by formatting inconsistencies.

```json
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
```

The `|| true` suffix ensures the hook does not block Claude's workflow if the formatter encounters an issue.

**Category tags:** `#hooks` `#formatting` `#ci` `#automation` `#code-quality`

---

## Manage Permissions Strategically

Enable commonly-used safe bash commands via `/permissions` instead of using `--dangerously-skip-permissions`. This eliminates unnecessary permission prompts while maintaining security.

**Safe command patterns to enable:**
- `bun run build:*`
- `bun run test:*`
- `cc:*`

Reserve `--dangerously-skip-permissions` only for long-running tasks in sandboxed environments where repeated Claude interruptions for permission would be impractical.

**Command:** `/permissions` to configure allowed commands

**Category tags:** `#permissions` `#security` `#developer-experience`

---

## Build Verification and Feedback Loops

Implement continuous verification through feedback loops -- bash commands, test suites, browser testing, or simulators. Cherny notes this improves final result quality by a factor of 2-3.

> "Give Claude a way to verify its work through feedback loops...can improve quality by factor of 2-3"

**Verification methods used at Anthropic:**
- Running test suites after changes
- Using the Claude Chrome extension to test UI
- Opening a browser and iterating until the UI functions properly and the UX feels appropriate
- Running bash commands to validate state

The key insight is that giving Claude the ability to check its own work and iterate creates a dramatically better outcome than one-shot generation without verification.

**Category tags:** `#verification` `#feedback-loops` `#testing` `#quality` `#browser-testing`

---

## Use Remote Sessions with Teleport

Start remote sessions with `&` from the CLI to run them in the background. Use `--teleport` to move sessions between local and remote environments seamlessly.

**Commands:**
- Start background session: append `&` when launching from CLI
- Move session: use `--teleport` flag

**Category tags:** `#remote-sessions` `#teleport` `#session-management`

---

## Use Separate Git Checkouts for Parallel Work

Instead of using git branches or worktrees for parallel Claude sessions, use separate `git checkout` directories. This avoids conflicts that can arise when multiple sessions try to operate on the same working tree or branch simultaneously.

**Category tags:** `#git-workflow` `#parallel-sessions` `#isolation`

---

## Do Not Over-Customize Claude Code

Cherny explicitly states he "does not customize Claude Code, as he finds it works great out-of-the-box." The customizations he does use (CLAUDE.md, slash commands, hooks, permissions) are lightweight and focused on reducing friction rather than fundamentally changing behavior.

**Category tags:** `#philosophy` `#customization` `#defaults`

---

## Teams Should Focus on Review and Steering

The workflow enables teams to "focus on code review and steering" rather than implementation details. PRs arrive in polished condition from Claude, shifting the human role toward architectural decisions, code review quality, and directional guidance rather than line-by-line implementation.

**Category tags:** `#team-workflow` `#code-review` `#role-shift` `#philosophy`
