# Source: Agentic Coding Substack - 32 Claude Code Tips
**URL:** https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
**Scraped:** 2026-02-09

## Tip 0: Customize Your Status Line
Create a custom status line displaying model, directory, git branch, uncommitted files, sync status, and token usage progress bar, plus last message preview.
**Category:** Setup, UI

## Tip 1: Talk to Claude Code With Your Voice
Use local voice transcription systems (SuperWhisper, MacWhisper, Super Voice Assistant) for faster communication. Claude handles transcription errors intelligently.
**Category:** Input Methods, Productivity

## Tip 2: Break Down Large Problems Into Smaller Ones
Decompose complex tasks into manageable sub-problems. Progress from A to B via intermediate steps A1, A2, A3.
**Example:** Building a voice transcription system involved separate executables for downloading models, recording, transcribing, then combining.
**Category:** Workflow, Strategy

## Tip 3: Using Git and GitHub CLI Like a Pro
Delegate Git operations to Claude. Use draft PRs before marking ready. Allow pulls automatically but restrict pushes.
**Category:** Git, Version Control

## Tip 4: AI Context Is Like Milk - Best Served Fresh and Condensed
Performance degrades as context lengthens. Start new conversations for different topics.
**Category:** Context Management

## Tip 5: Getting Output Out of Your Terminal
- `/copy` command copies last response as markdown
- `pbcopy` for direct clipboard access
- Write to files, open in VS Code
- `/chrome` to open URLs in browser
- Open repos in GitHub Desktop
**Category:** Output, Terminal

## Tip 6: Set Up Terminal Aliases for Quick Access
```bash
alias c='claude'
alias ch='claude --chrome'
alias gb='github'
alias co='code'
alias q='cd ~/Desktop/projects'
```
Combine with flags: `c -c` (continue), `c -r` (resume).
**Category:** Setup, Terminal

## Tip 7: Proactively Compact Your Context
Use `/compact` to manually summarize conversations. Disable auto-compact via `/config` for more control. Create handoff documents summarizing work done, successes, failures, and next steps.
**Category:** Context Management

## Tip 8: Complete the Write-Test Cycle for Autonomous Tasks
Use tmux for interactive testing: start session, send commands, capture output. Use Playwright MCP or Chrome DevTools MCP for web app testing. Playwright generally better for non-visual tasks.
**Category:** Testing, Automation

## Tip 9: Cmd+A and Ctrl+A Are Your Friends
Select all content, copy, and paste into Claude when URL access fails. Works for terminal output, web pages, private content.
**Category:** Input, Workarounds

## Tip 10: Use Gemini CLI as Fallback for Blocked Sites
Create a skill in `~/.claude/skills/reddit-fetch/SKILL.md` that tells Claude to use Gemini CLI via tmux for sites WebFetch can't access. Token-efficient (loads only when needed).
**Category:** Integration, Workarounds

## Tip 11: Invest in Your Own Workflow
Customize daily tools. Maintain concise CLAUDE.md. Create personal scripts. Small investments compound.
**Category:** Workflow, Productivity

## Tip 12: Search Through Your Conversation History
Conversations stored in `~/.claude/projects/` as `.jsonl` files. Folder names based on project path (slashes become dashes).
```bash
grep -l -i "keyword" ~/.claude/projects/-Users-yk-Desktop-projects-*/*.jsonl
cat conversation.jsonl | jq -r 'select(.type=="user") | .message.content'
```
**Category:** History, Data Management

## Tip 13: Multitasking With Terminal Tabs
3-4 concurrent tasks using "cascade" approach - open new tabs right, sweep left to right. Keep persistent tabs for ongoing work.
**Category:** Parallelism, Productivity

## Tip 14: Slim Down the System Prompt
Default: ~18k tokens (9% of 200k). Patched: ~10k tokens (5%), saving ~7,300 tokens (41% overhead reduction).
```json
{ "env": { "DISABLE_AUTOUPDATER": "1" } }
{ "env": { "ENABLE_TOOL_SEARCH": "true" } }
```
**Category:** Optimization, Tokens

## Tip 15: Git Worktrees for Parallel Branch Work
Create git worktrees to work on multiple branches simultaneously without conflicts. Each worktree = branch + directory.
**Category:** Git, Parallelism

## Tip 16: Manual Exponential Backoff for Long-Running Jobs
Check status with increasing sleep intervals: 1min, 2min, 4min. For CI: `gh run view <run-id> | grep <job-name>` is more token-efficient.
**Category:** Automation, CI/CD

## Tip 17: Claude Code as a Writing Assistant
Provide context and detailed voice instructions for first draft. Collaborate line-by-line on phrasing.
**Category:** Non-Code Uses

## Tip 18: Markdown Is the Best Choice
Most efficient format. Claude Code excels with markdown. For platforms that don't accept markdown, paste into Notion first.
**Category:** Formats, Documentation

## Tip 19: Use Notion to Preserve Links When Pasting
When text with links doesn't preserve formatting, route through Notion first.
**Category:** Workarounds

## Tip 20: Containers for Long-Running Risky Tasks
Use Docker with `--dangerously-skip-permissions` for unsupervised work. Local Claude controls containerized Claude via tmux `send-keys` and `capture-pane`. Multi-model orchestration possible.
**Category:** Containers, Advanced

## Tip 21: The Best Way to Get Better Is by Using It
Experience is the primary teacher. Practice extensively. Use Opus 4.5 for best results.
**Category:** Learning

## Tip 22: Clone Conversations to Branch Off
- `/fork` for in-session forking
- `--fork-session` with `--resume` or `--continue`
- Half-clone: keep only recent context
```bash
claude() {
  local args=()
  for arg in "$@"; do
    if [[ "$arg" == "--fs" ]]; then args+=("--fork-session")
    else args+=("$arg"); fi
  done
  command claude "${args[@]}"
}
```
**Category:** Context Management, Advanced

## Tip 23: Use Realpath to Get Absolute Paths
`realpath some/relative/path` for reliable file operations across directories.
**Category:** Terminal, Utilities

## Tip 24: Understanding CLAUDE.md vs Skills vs Slash Commands vs Plugins
- **CLAUDE.md:** Always loaded. Least token-efficient. Good for project context.
- **Skills:** Load on demand. Auto or manual invocation. More token-efficient.
- **Slash Commands:** User-initiated at specific times.
- **Plugins:** Bundle skills, commands, agents, hooks, MCP servers together.
**Category:** Architecture, Configuration

## Tip 25: Interactive PR Reviews
Use `gh` to retrieve PR info, conduct conversational reviews with variable detail levels.
**Category:** Code Review

## Tip 26: Claude Code as a Research Tool
Superior to Google for: GitHub Actions failures, sentiment analysis, codebase exploration, public info. Key: provide right information access methods.
**Category:** Research

## Tip 27: Mastering Different Ways of Verifying Output
- Write and run tests
- Review in Claude UI
- Visual Git client (GitHub Desktop)
- Draft PRs for review
- Self-verify: "Double check every claim and make a table"
**Category:** Verification, Quality

## Tip 28: Claude Code as a DevOps Engineer
Debug CI failures by giving Claude the logs. Ask questions to identify root cause (commit, PR, flakiness).
**Category:** DevOps, CI/CD

## Tip 29: Keep CLAUDE.md Simple and Concise
Start with nothing. Add only when you find yourself repeating instructions. Let Claude edit the file.
**Category:** Configuration

## Tip 30: Claude Code as the Universal Interface
Universal computer interface: video editing (ffmpeg), transcription (Whisper), data analysis, internet access. Like text interface + AI.
**Category:** Philosophy, Integration

## Tip 31: Choosing the Right Level of Abstraction
Spectrum from "vibe coding" to deep inspection. Not binary. Choose based on project criticality.
**Category:** Strategy, Workflow

## Key Configuration Reference
- Chrome flag: `claude --chrome`
- Opus 4.5 context: 200k total, ~45k reserved for compaction, ~10% for system/tools/memory
- Global config: `~/.claude/CLAUDE.md`
- Project config: `./CLAUDE.md`
- Settings: `~/.claude/settings.json`
- Skills: `~/.claude/skills/`
- Commands: `~/.claude/commands/`
**Category:** Reference
