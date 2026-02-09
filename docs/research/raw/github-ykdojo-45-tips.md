# Source: GitHub ykdojo/claude-code-tips (45 Tips)
**URL:** https://github.com/ykdojo/claude-code-tips
**Scraped:** 2026-02-09

## Tip 0: Customize Your Status Line
Create a custom status bar displaying model, directory, git branch, uncommitted files, sync status, and token usage. Includes a custom status line script with 10 color theme options.
**Category:** Setup, UI Customization

## Tip 1: Learn Essential Slash Commands
Master built-in commands: `/usage` (rate limits), `/chrome` (browser integration toggle), `/mcp` (manage MCP servers), `/stats` (usage statistics with activity graph), `/clear` (start fresh).
**Category:** Core Commands

## Tip 2: Talk to Claude Code with Your Voice
Use local voice transcription systems like superwhisper, MacWhisper, or Super Voice Assistant for faster communication. Works even with transcription errors due to Claude's contextual understanding.
**Category:** Input Methods, Productivity

## Tip 3: Break Down Large Problems into Smaller Ones
Decompose complex tasks into incremental steps rather than attempting one-shot solutions. Essential software engineering principle applied to AI-assisted development.
**Category:** Workflow, Problem Solving

## Tip 4: Using Git and GitHub CLI Like a Pro
Delegate Git operations (commits, branching, pushing) to Claude Code. Use draft PRs for low-risk reviews. Leverage `gh` for powerful tasks like GraphQL queries. Disable commit/PR attribution via settings.
**Category:** Git, Version Control

## Tip 5: AI Context is Like Milk; It's Best Served Fresh and Condensed
Start new conversations for each topic to maintain optimal performance. Longer conversations experience performance degradation.
**Category:** Context Management

## Tip 6: Getting Output Out of Your Terminal
Use `/copy` command for markdown export. Write to files and open in VS Code. Direct clipboard output with `pbcopy`. Open URLs and repositories in browsers or GitHub Desktop for easier content examination.
**Category:** Output, Terminal

## Tip 7: Set Up Terminal Aliases for Quick Access
Create shortcuts like `c='claude'`, `ch='claude --chrome'`, `gb='github'`, `co='code'` for rapid access. Combine with flags (`c -c` for continue, `c -r` for resume).
**Category:** Setup, Terminal

## Tip 8: Proactively Compact Your Context
Create handoff documents before starting fresh conversations. Use `/plan` mode for comprehensive context transfer. Manually manage compaction for better control over available context space.
**Category:** Context Management

## Tip 9: Complete the Write-Test Cycle for Autonomous Tasks
Enable autonomous execution by providing verification methods. Use tmux for interactive testing. Implement creative testing strategies (Playwright for web apps, accessibility tree refs instead of coordinates).
**Category:** Testing, Automation

## Tip 10: Cmd+A and Ctrl+A Are Your Friends
Select all and copy to paste content directly into Claude Code when URLs aren't accessible. Works for terminal output, web pages, and complex interfaces. Use Print All preview for threaded conversations like Gmail.
**Category:** Input Methods, Workarounds

## Tip 11: Use Gemini CLI as Fallback for Blocked Sites
Create skills using tmux to leverage Gemini's web access for sites Claude Code can't reach (like Reddit). Skills load only when needed, improving token efficiency.
**Category:** Integration, Workarounds

## Tip 12: Invest in Your Own Workflow
Personalize your setup with custom tools, streamlined CLAUDE.md, and tailored workflows. Small investments in productivity tools compound over time.
**Category:** Workflow, Productivity

## Tip 13: Search Through Your Conversation History
Conversations stored locally in `~/.claude/projects/` as `.jsonl` files. Search with grep, extract messages with jq, or ask Claude Code directly to find past discussions.
**Category:** History, Data

## Tip 14: Multitasking with Terminal Tabs
Open multiple Claude Code sessions in different terminal tabs to work on parallel tasks simultaneously without context interference.
**Category:** Parallelism, Productivity

## Tip 15: Slim Down the System Prompt
Default system prompt consumes ~18k tokens (9% of 200k context). Patching can reduce to ~10k tokens, saving ~7,300 tokens (41% of static overhead). Disable auto-updates and enable lazy-load MCP tools.
**Category:** Optimization, Tokens

## Tip 16: Git Worktrees for Parallel Branch Work
Use `git worktree` to maintain multiple branches simultaneously in different directories, enabling parallel development without constant branch switching.
**Category:** Git, Parallelism

## Tip 17: Manual Exponential Backoff for Long-Running Jobs
Implement retry logic with exponential backoff for operations that may timeout or fail intermittently. For GitHub CI: `gh run view <run-id> | grep <job-name>` is more token-efficient than `gh run watch`.
**Category:** Automation, CI/CD

## Tip 18: Claude Code as a Writing Assistant
Leverage Claude Code's capabilities for editing, refining, and structuring written content beyond coding tasks.
**Category:** Non-Code Uses

## Tip 19: Markdown is the Best Format
Most efficient format for new documents compared to Google Docs or Notion. Claude Code works well with markdown.
**Category:** Formats, Documentation

## Tip 20: Use Notion to Preserve Links When Pasting
Leverage Notion's formatting to maintain hyperlinks and rich formatting when copying and pasting content.
**Category:** Workarounds, Integration

## Tip 21: Containers for Long-Running Risky Tasks
Run potentially dangerous or long-running operations inside Docker containers with `--dangerously-skip-permissions`. Have local Claude Code control containerized instance via tmux. Multi-model setup possible.
**Category:** Containers, Advanced, Safety

## Tip 22: The Best Way to Get Better Is by Using It
Consistent practice and experimentation improve proficiency. Like "10,000 hour rule" but for tokens.
**Category:** Learning

## Tip 23: Clone/Fork and Half-Clone Conversations
Duplicate conversations with new UUIDs. Use `/fork` for in-session forking, `--fork-session` with `--resume`/`--continue`. Half-clone keeps only recent context.
**Category:** Context Management, Advanced

## Tip 24: Use Realpath to Get Absolute Paths
Use `realpath` command to convert relative paths to absolute paths for reliable file operations.
**Category:** Terminal, Utilities

## Tip 25: Understanding CLAUDE.md vs Skills vs Slash Commands vs Plugins
CLAUDE.md (always loaded, least token-efficient), Skills (load-on-demand, auto/manual), Slash Commands (user-initiated), Plugins (bundle of all).
**Category:** Architecture, Configuration

## Tip 26: Interactive PR Reviews
Conduct code reviews collaboratively with Claude Code using `gh` for iterative feedback.
**Category:** Code Review, Git

## Tip 27: Claude Code as a Research Tool
Superior to Google for GitHub Actions failures, sentiment/market analysis, codebase exploration, public information discovery.
**Category:** Research, Non-Code Uses

## Tip 28: Mastering Different Ways of Verifying Output
Multiple verification: write tests, review in UI, visual Git client, draft PRs, self-verify tables.
**Category:** Verification, Quality

## Tip 29: Claude Code as a DevOps Engineer
Give Claude GitHub Actions CI failures to debug. Create draft PRs with fixes.
**Category:** DevOps, CI/CD

## Tip 30: Keep CLAUDE.md Simple and Review Periodically
Start with no CLAUDE.md. Add only when repeating instructions. Let Claude edit based on your guidance.
**Category:** Configuration, Best Practices

## Tip 31: Claude Code as the Universal Interface
Claude is the universal interface to your computer. Video editing (ffmpeg), transcription (Whisper), data analysis, internet access.
**Category:** Non-Code Uses, Integration

## Tip 32: Choosing the Right Level of Abstraction
Balance between "vibe coding" (high-level) and deep inspection. Not binary - varies by project criticality.
**Category:** Workflow, Strategy

## Tip 33: Audit Your Approved Commands
Review pre-approved commands for execution to maintain security and control.
**Category:** Security, Configuration

## Tip 34: Write Lots of Tests (and Use TDD)
Implement comprehensive test suites. Apply Test-Driven Development principles.
**Category:** Testing, Best Practices

## Tip 35: Be Braver in the Unknown; Iterative Problem Solving
Embrace exploratory approaches when uncertain. Iterate based on feedback.
**Category:** Mindset, Problem Solving

## Tip 36: Running Bash Commands and Subagents in the Background
Execute long-running operations asynchronously to maintain responsiveness.
**Category:** Parallelism, Advanced

## Tip 37: The Era of Personalized Software Is Here
Customize tools extensively to match individual workflows.
**Category:** Philosophy, Workflow

## Tip 38: Navigating and Editing Your Input Box
Master keyboard shortcuts for efficient input editing.
**Category:** UI, Productivity

## Tip 39: Spend Some Time Planning, But Also Prototype Quickly
Balance planning with rapid prototyping.
**Category:** Strategy, Workflow

## Tip 40: Simplify Overcomplicated Code
Ask Claude to refactor complex code into cleaner solutions.
**Category:** Code Quality, Refactoring

## Tip 41: Automation of Automation
Create systems that automate repetitive automation tasks.
**Category:** Advanced, Automation

## Tip 42: Share Your Knowledge
Document learnings, share tools, contribute to community.
**Category:** Community

## Tip 43: Keep Learning
Stay current with updates, new features, and emerging techniques.
**Category:** Learning

## Tip 44: Install the dx Plugin
Enhanced functionality and streamlined workflows plugin.
**Category:** Plugins, Setup

## Tip 45: Quick Setup Script
Automates initial Claude Code configuration and environment setup.
**Category:** Setup, Automation
