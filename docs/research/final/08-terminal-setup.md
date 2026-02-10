# Terminal Setup

## Purpose

Small terminal customizations compound into significant time savings. Aliases shave seconds off every command, a custom status line keeps critical info visible at all times, keyboard shortcuts prevent common mistakes, and voice input can replace typing entirely. The initial setup takes an afternoon; the savings accumulate every day.

## How It Helps

- Terminal aliases reduce keystrokes for the most frequent commands
- Status line displays model, branch, tokens, and cost without running commands
- Proper terminal setup enables multiline input (broken by default)
- Voice input enables hands-free operation for reviewing and steering
- Keyboard shortcuts prevent common destructive mistakes (Ctrl+C vs Escape)

## What You Can Do

### Terminal Aliases

Add to your shell profile (`~/.bashrc` or `~/.zshrc`):

```bash
alias c='claude'
alias ch='claude --chrome'
alias gb='github'
alias co='code'
alias q='cd ~/Desktop/projects'
```

Combine with flags:
- `c -c` -- continue last session
- `c -r` -- resume a named session

### Run /terminal-setup First

Shift+Enter does not work by default for multiline input. Fix this:

```
/terminal-setup
```

This configures your terminal so multiline input works correctly.

### Custom Status Line

Display model name, directory, git branch, uncommitted files, sync status, and token usage below the chat input area.

**Configuration** (`.claude/settings.json`):

```json
{
  "statusLine": {
    "type": "command",
    "command": "bun x ccusage statusline"
  }
}
```

Custom status line scripts support 10+ color theme options and can show:
- Current model
- Git branch and uncommitted file count
- Token usage progress bar
- Cost tracking
- Last message preview

**Community statusline examples:** The statusline is highly customizable, and community members have built elaborate configurations that go well beyond basic model/branch display:

- **Usage API integration:** Scripts that call the Anthropic usage API to display session and weekly rate limits, reset times, and remaining quota directly in the statusline
- **Context usage tracking:** Display approximate context window utilization as a percentage or progress bar. Note that accuracy can vary -- the values may not perfectly align with the "remaining x%" messages Claude displays
- **Platform support:** On Windows, use a PowerShell script (`.ps1`) referenced from `settings.json`; on Linux/macOS, use bash or Node.js scripts. The configuration format is the same across platforms:

```json
{
  "statusLine": {
    "type": "command",
    "command": "powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\<username>\\.claude\\statusline.ps1"
  }
}
```

- **Quick start:** Ask Claude Code itself to build a statusline script based on a screenshot of a configuration you like -- this is a common and effective bootstrap approach

**GSD Statusline Integration:** The Get Shit Done (GSD) framework community has built a statusline integration that displays GSD project metrics (current phase, plan progress, milestone status) directly in the Claude Code statusline. Setup via `/gsd:setup-statusline`, which injects the integration into `.clauderc` and tracks metrics in a `metrics.json` file. Supports customizable display styles including progress bars, minimal text, and other visual themes.

### Hooks: Event-Driven Workflow Automation

Hooks let you run your own code at specific points in Claude Code's workflow. They are event-driven triggers that intercept and control Claude's actions -- blocking, allowing, or modifying behavior before or after it happens. This is distinct from skills (reusable prompts invoked manually) and subagents (parallel workers for isolated tasks).

**13 hook events** are available, including:
- **PreToolUse** -- runs before Claude executes a tool (Bash, Read, Write, etc.). Can block, allow, or modify the action
- **PostToolUse** -- runs after a tool completes. Can add context or trigger follow-up actions
- **Notification** -- triggered when Claude sends a notification (e.g., needs input)
- **Stop** -- triggered when Claude finishes a response
- **SessionEnd** -- triggered when a session closes (used for logging, analytics, receipts)

**Data flow:** Hook scripts receive JSON on stdin, run your logic, and return JSON on stdout. Exit codes control behavior: exit 0 allows the action, exit 2 blocks it with a message back to Claude.

**Language choice:** Node.js is recommended for high-frequency events (PreToolUse fires often) due to faster startup time compared to Python.

**Common safety hooks used in practice:**
- Block dangerous commands (`rm -rf ~/`, force push to main, fork bombs)
- Protect secrets (`.env` files, SSH keys, AWS credentials)
- Send Slack notifications when Claude needs input (useful for long-running sessions)
- Circuit breaker patterns that block Claude from making unbounded changes (e.g., `github.com/kylesnowschwartz/claude-bumper-lanes`)

**Mental model for when to use what:**
- **Hooks:** Event-driven automation (before/after actions, notifications, safety gates)
- **Skills:** Reusable prompts/workflows you invoke manually, with optional context branching
- **Subagents:** Parallel workers for isolated tasks with independent context
- **Plugins:** Persistent extensions with their own tools, distributed via marketplace

For hook configuration details and examples, see [11-automation-devops.md](./11-automation-devops.md).

### Essential Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Escape` | Stop current Claude operation (do NOT use `Ctrl+C`) |
| `Ctrl+C` | Exits Claude Code entirely (avoid for stopping tasks) |
| `Shift+Tab` | Cycle between Default, Auto, and Plan modes |
| `Tab` | Toggle extended thinking on/off |
| `Up Arrow` | Access previous chat sessions |
| `Escape` (twice) | Display message history / trigger `/rewind` |
| `Ctrl+G` | Open prompt in external editor |
| `Ctrl+R` | Search through prompt history across projects |
| `Ctrl+B` | Send subagent to background |
| `Control+V` | Paste images from clipboard (not `Cmd+V` on Mac) |
| `Shift+?` | Display available shortcuts |
| `!` | Quick actions shortcut |
| `Shift + drag` | Reference a file in the prompt (standard drag opens in new tab) |

### External Editor Integration

Press `Ctrl+G` to open prompts or Plan documents in your preferred editor:

```bash
# Add to shell profile
export VISUAL="vim"
# or
export VISUAL="code --wait"
# or
export VISUAL="cursor --wait"
```

Priority: checks `VISUAL` first, falls back to `EDITOR`. The `--wait` flag is important for GUI editors so the terminal waits for the editor to close.

### Voice Input

Use local voice transcription for faster communication:

- **SuperWhisper** -- Local voice transcription
- **MacWhisper** -- macOS voice transcription
- **Wispr Flow** -- Voice commands for terminal

One community member built a full multi-tool setup combining Obsidian (knowledge base), Claude Code, and Whispr Flow (voice input) into an open-source project called **VoiceTree** (`github.com/voicetreelab/voicetree`), using voice-driven prompting alongside a graph-based visualization for task decomposition and knowledge gardening. The author also uses a walking pad during sessions for physical movement.

Claude handles transcription errors intelligently due to contextual understanding. One author's complete workflow:

1. Open 2-3 Claude Code sessions
2. Voice-assign each session a task via Wispr Flow
3. Switch between sessions reviewing output
4. Approve or reject by voice
5. Commit and move on

### Vim Mode

Claude Code supports an optional Vim mode for terminal input, available in settings.

### SessionEnd Hook for Physical Session Receipts

Use Claude Code's `SessionEnd` hook to trigger post-session actions. A popular community project prints a physical receipt after every session showing per-model cost breakdown and token counts:

- **claude-receipts** (npm package + GitHub: `chrishutchinson/claude-receipts`) uses `ccusage` to pull session cost/token data, formats it as a receipt, and sends it to an ESC/POS thermal printer (e.g., Epson TM-T88V) or renders in a browser as fallback
- The session ID can be encoded into a barcode or QR code on the receipt. Since `claude --resume <session-id>` is supported, scanning a receipt barcode can directly resume a prior session
- The thermal printer sound itself serves as a passive audible notification that a long-running session has completed -- useful when working in another room

This pattern generalizes beyond receipts: any `SessionEnd` hook can drive post-session logging, notifications, analytics, or physical output.

### Getting Output Out of the Terminal

| Method | Command |
|--------|---------|
| Copy last response as markdown | `/copy` |
| Direct clipboard | `pbcopy` (macOS) |
| Write to file | Ask Claude to write output to a file |
| Open in VS Code | `code filename.md` |
| Open URL in browser | `/chrome` |
| Open in GitHub Desktop | Reference repo path |

## Details

### Navigate Previous Sessions

Press the `Up` arrow key to access previous chat sessions. Press `Escape` twice to view a list of past messages for navigation.

Search across all conversations with `Ctrl+R`. Repeated `Ctrl+R` cycles through search results.

### Prompt Stashing

"Prompt Stashing" lets you save your current context and quickly switch to execute a different prompt without losing your place. Useful for handling interruptions mid-workflow.

### Syntax Highlighting

Version 2.0.71+ includes syntax highlighting for in-CLI code review, reducing the need to open external editors.

### Fuzzy File Search

Version 2.0.72+ fuzzy file search is 3x faster than previous versions. Supports pattern matching for quick file location.

### Use realpath for Absolute Paths

When working across directories, use `realpath` to convert relative paths to absolute paths for reliable file operations:

```bash
realpath some/relative/path
```

### Cmd+A and Ctrl+A as Input Helpers

When URLs are not accessible, select all content from a page (`Cmd+A`), copy, and paste directly into Claude Code. Works for terminal output, web pages, and private content. Use Print All preview for threaded conversations like Gmail.

## Sources

- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://www.builder.io/blog/claude-code
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://sidbharath.com/claude-code-the-complete-guide/
- https://www.reddit.com/r/ClaudeCode/comments/1qxu7qp/ (receipt printer SessionEnd hook)
- https://www.reddit.com/r/ClaudeCode/comments/1qwcg0g/ (VoiceTree + Obsidian + Whispr Flow setup)
- https://www.reddit.com/r/ClaudeCode/comments/1qf6vcc/ (GSD statusline integration)
- https://www.reddit.com/r/ClaudeCode/comments/1qlzzzf/claude_codes_most_underrated_feature_hooks_wrote/ (Comprehensive hooks guide)
- https://www.reddit.com/r/ClaudeCode/comments/1qycvdu/show_me_your_statusline/ (Community statusline configuration examples)
