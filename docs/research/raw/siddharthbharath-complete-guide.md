# Siddharth Bharath - Claude Code: The Complete Guide

Source: https://sidbharath.com/claude-code-the-complete-guide/

---

## Installation and Initial Setup

Install Claude Code globally via the official install script. Once installed, it is accessible from any directory on your system.

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

To initialize a new project, create a directory and launch Claude within it:

```bash
mkdir finance-tracker
cd finance-tracker
claude
```

Authentication tip: Use your existing Claude account ($20/month plan) rather than the API to avoid usage overages. The first-time setup includes a guided configuration walkthrough.

**Category:** `setup`, `installation`

---

## Chat Mode: Default Mode

In Default Mode, Claude suggests changes and waits for your permission before executing them. This is the safest mode for learning or sensitive codebases.

Use `/output-style` to request that Claude explain its reasoning for each change it proposes.

**Category:** `modes`, `workflow`

---

## Chat Mode: Auto Mode

In Auto Mode, Claude edits files without waiting for permission. It still requests permission for bash commands as a security protection. Press `Esc` to stop a process if needed.

Switch between modes by pressing `Shift+Tab` to cycle through Default, Auto, and Plan modes.

**Category:** `modes`, `workflow`, `productivity`

---

## Chat Mode: Plan Mode

Plan Mode engages extended thinking for comprehensive strategy development. Best used for:

- New features
- Complex challenges
- Refactors
- Entire projects

In Plan Mode, Claude asks clarifying questions before planning and saves the plan to a `Plan.md` file automatically. Allow iteration on the plan before execution begins.

**Category:** `modes`, `planning`, `workflow`

---

## Permissions Management

Use the `/permissions` command to manage what Claude can do without asking.

```bash
/permissions
```

Add wildcard patterns for flexibility:
- `Bash(npm *)` - allows any npm command
- `Bash(* install)` - allows any install command

To skip all permissions (not recommended for production work):

```bash
claude --dangerously-skip-permissions
```

**Category:** `permissions`, `security`, `configuration`

---

## Project Memory with CLAUDE.md

Initialize project memory by running:

```bash
/init
```

This creates a `CLAUDE.md` file that stores:
- Architecture decisions
- Database schemas
- Code conventions
- Project patterns
- Technology stack details

You can update documentation during a chat session by adding guidance directly:

```
# Add guidance to Claude.md
# Always use error boundaries around components that make API calls
```

Commit `CLAUDE.md` files to your repository so the entire team shares consistent workflows and conventions.

**Category:** `memory`, `documentation`, `project-setup`

---

## Hierarchical CLAUDE.md Structure

CLAUDE.md files can be organized hierarchically. More specific files override general ones, and all context combines automatically.

```
~/.claude/CLAUDE.md                    # Global user preferences
~/projects/
  CLAUDE.md                            # Organization/team standards
  finance-tracker-pro/
    CLAUDE.md                          # Project-specific knowledge
    backend/
      CLAUDE.md                        # Backend-specific patterns
    frontend/
      CLAUDE.md                        # Frontend-specific patterns
    docs/
      CLAUDE.md                        # Documentation guidelines
```

**Priority rule:** More specific (deeper nested) files take precedence over general ones when there is a conflict.

**Category:** `memory`, `documentation`, `team-workflow`, `configuration`

---

## Context Window Management

A notification appears when the context window is running low. Best practices to manage context:

- Scope each chat session to a single project or feature for relevance.
- Use `/clear` when a feature is complete.
- Use `/resume` to return to previous conversations later.
- Break large projects into `Plan.md` files, then tackle sections sequentially.

**Category:** `context-management`, `productivity`, `workflow`

---

## Compacting Context

When context is getting large, use `/compact` with specific instructions about what to preserve:

```bash
/compact Focus on preserving our current authentication implementation and the database schema decisions we've made.
```

This condenses the conversation while retaining the most important context you specify.

**Category:** `context-management`, `productivity`

---

## Session Management Commands

Manage sessions for long-running or multi-day work:

```bash
/resume <name>           # Resume a session by name
/rename                  # Give the current session a memorable name
/stats                   # View usage graphs and session history
```

Name sessions for easy identification and resumption later.

**Category:** `session-management`, `productivity`, `workflow`

---

## Sub-agents for Specialized Work

Sub-agents manage context by routing specialized tasks to dedicated AI assistants. A typical structure:

```
Main Claude (coordinator)
  Code Reviewer (quality specialist)
  Test Engineer (testing specialist)
  Documentation Writer (technical writing specialist)
```

Set up sub-agents with:

```bash
/agents
```

Sub-agent definition file structure:

```markdown
---
name: code-reviewer
description: Comprehensive code quality and maintainability analysis
tools: read, grep, diff, lint_runner
---

You are an expert code reviewer:

## Review Priorities (in order):
1. Logic errors and bugs
2. Security vulnerabilities
3. Performance problems
4. Maintainability issues
5. Code style and consistency
```

**Category:** `sub-agents`, `architecture`, `code-quality`

---

## Async Sub-agents for Parallel Work

While a sub-agent is working, press `Ctrl+B` to move it to the background. The sub-agent continues independently and notifies you when complete. This enables true parallel development with multiple agents working simultaneously.

**Category:** `sub-agents`, `parallelism`, `productivity`

---

## Git Branching Workflow with Claude

Recommended process for each feature:

1. Ask Claude to create a new branch.
2. Have Claude build the feature on the isolated branch.
3. Test the app thoroughly yourself.
4. Have Claude test the app using `/test` or custom testing.
5. Update documentation if needed.
6. Have Claude commit changes.
7. For multi-part features, repeat steps 2-6.
8. When satisfied, merge to the main branch.

The benefit: failed experiments do not affect the main codebase. You can simply delete problematic branches.

**Category:** `git`, `version-control`, `workflow`

---

## Git Worktrees for Parallel Development

Use Git worktrees to run multiple Claude instances on independent branches simultaneously without merge conflicts.

Worktree structure:

```
~/finance-tracker/          # Main repository
  .git/                     # Shared Git database
  src/
  CLAUDE.md
  package.json

~/finance-tracker-budgets/  # Worktree for budget features
~/finance-tracker-reports/  # Worktree for reporting features
```

Setup commands:

```bash
cd finance-tracker

# Create worktree for budget features
git worktree add ../finance-tracker-budgets -b feature/budget-system

# Create worktree for reporting
git worktree add ../finance-tracker-reports -b feature/reporting-dashboard

# List all worktrees
git worktree list
```

Run multiple Claude instances in separate terminals:

```bash
# Terminal 1: Budget features
cd ../finance-tracker-budgets
claude --dangerously-skip-permissions

# Terminal 2: Reporting features (new terminal window)
cd ../finance-tracker-reports
claude --dangerously-skip-permissions

# Terminal 3: Main development
cd finance-tracker
claude
```

Each instance maintains independent context. No merge conflicts from parallel work on different files.

**Category:** `git`, `worktrees`, `parallelism`, `advanced-workflow`

---

## Checkpoint Recovery with /rewind

If Claude makes unwanted changes, use:

```bash
/rewind
```

Select the message sent before Claude made the unwanted changes to restore the project state instantly.

**Category:** `git`, `recovery`, `safety`

---

## Custom Slash Commands

Create reusable commands by adding markdown files to the `.claude/commands/` directory.

Setup:

```bash
mkdir -p .claude/commands
```

Example command file (`.claude/commands/review.md`):

```markdown
Perform a comprehensive code review of recent changes:
1. Check code follows our TypeScript and React conventions
2. Verify proper error handling and loading states
3. Ensure accessibility standards are met
4. Review test coverage for new functionality
5. Check for security vulnerabilities
6. Validate performance implications
7. Confirm documentation is updated

Use our established code quality checklist and update CLAUDE.md with any new patterns discovered.
```

Usage:

```bash
/review
```

Commands in `.claude/commands/` auto-share with the team when the repository is cloned.

**Category:** `custom-commands`, `automation`, `team-workflow`

---

## Model Context Protocol (MCP) Servers

MCP servers connect Claude Code to external tools and data sources such as Jira, GitHub, APIs, and databases.

Add an MCP server:

```bash
claude mcp add brave-search -s project -- npx @modelcontextprotocol/server-brave-search
```

Check MCP status:

```bash
/mcp
```

Usage example in conversation:

```
Search for best practices for financial data security and implement appropriate measures in our API.
```

Common MCP servers:
- Web search (Brave Search)
- GitHub integration
- Supabase database access
- Puppeteer (website automation)

Check Anthropic's documentation for verified servers.

**Category:** `mcp`, `integrations`, `external-tools`

---

## Claude Skills

Skills are instruction sets and/or code that Claude executes on-demand repeatedly.

Advantages over MCP:
- Does not consume context window on startup.
- Can be automatically triggered by relevant events (e.g., automatic Slack notification on code push).

Use case: Package routine processes like CI/CD notifications, code review checklists, deployment confirmations.

**Category:** `skills`, `automation`, `advanced`

---

## Plugin System and Marketplace

Access and manage plugins:

```bash
/plugins
/plugins install typescript-lsp
/plugins list
/plugins update
```

Plugins bundle custom commands, specialized agents, hooks, and MCP servers together.

Notable plugins:
- Frontend design plugin (used for designing blog layouts)
- Type checking and code intelligence tools
- Deployment helpers
- GitHub and service integrations

Community marketplaces are emerging beyond the official Anthropic marketplace.

Special plugin - **ralph-wiggum**: Enables autonomous long-running loops where Claude works through task lists overnight, committing after each feature.

**Category:** `plugins`, `marketplace`, `extensibility`

---

## Hooks for Deterministic Automation

Hooks allow you to run deterministic scripts at specific lifecycle points in Claude's execution.

Setup:

```bash
/hooks
```

Lifecycle triggers:
- **PreToolUse:** Before any tool execution
- **PostToolUse:** After successful tool completion
- **Notification:** When Claude sends notifications
- **Stop:** When Claude finishes a task
- **Sub-agent Stop:** When a sub-agent finishes a task

Use case example: A post-tool hook that automatically updates documentation after file modifications.

**Category:** `hooks`, `automation`, `lifecycle`

---

## Browser Control with Chrome Integration

Enable Chrome integration:

```bash
/chrome
```

Or start Claude with the Chrome flag:

```bash
claude --chrome
```

Capabilities:
- Navigate pages, click buttons, fill forms directly
- Read console logs and monitor network requests
- Test the app without switching between terminal and browser
- Debug in real-time with immediate feedback loop

Workflow: Write code, test in browser, see errors, iterate -- all in one continuous flow without context switching.

**Category:** `chrome`, `browser`, `debugging`, `testing`

---

## Comprehensive Testing Strategy

When setting up testing, provide Claude with a detailed prompt covering all testing layers. Example prompt:

```
I want bulletproof testing for our finance tracker. Here's what I'm thinking:

- Unit tests for all utility functions (currency formatting, date calculations, validation)
- Component tests using React Testing Library for every UI component
- Integration tests for our API endpoints with proper database setup/teardown
- End-to-end tests for critical user flows like adding transactions and viewing reports
- Performance tests to ensure the app stays fast as data grows

Set up the testing infrastructure with proper configuration, then write comprehensive tests for our existing features. I want to be confident that changes won't break anything.
```

Claude will:
- Analyze the codebase to understand testing needs
- Install and configure appropriate testing packages
- Create testing utilities specific to the application domain
- Write tests reflecting actual business logic and edge cases

**Category:** `testing`, `quality`, `ci-cd`

---

## Production-Ready CI/CD Pipeline Setup

Provide Claude with a detailed CI/CD specification. Example prompt:

```
I need a rock-solid CI/CD pipeline for our finance tracker. Here's what I want:

For every pull request:
- Run the full test suite (unit, integration, E2E)
- Check TypeScript compilation
- Verify code formatting with Prettier
- Run ESLint for code quality issues
- Build the production bundle successfully
- Run security audits on dependencies
- Check for any breaking changes

For main branch merges:
- Everything from PR checks
- Deploy to a staging environment automatically
- Run smoke tests against staging
- Send a Slack notification about deployment status

For tagged releases:
- Deploy to production with zero downtime
- Run post-deployment health checks
- Update monitoring dashboards

Make this bulletproof - I never want broken code to reach production.
```

Claude creates:
- GitHub Actions workflow tailored to the application
- Referenced npm scripts
- Environment-specific configurations
- Deployment scripts for the hosting platform (Vercel, AWS, etc.)

Tell Claude your specific hosting service or requirements and the pipeline adapts accordingly.

**Category:** `ci-cd`, `devops`, `automation`, `deployment`

---

## Performance Optimization Workflow

Provide Claude with specific performance problems and metrics. Example prompt:

```
Our finance tracker is getting slower as users add more transactions. I'm seeing these specific issues:

- Dashboard takes 3+ seconds to load when users have 1000+ transactions
- The transaction list scrolling feels janky
- Our bundle size has grown to over 1MB
- API responses for transaction queries are taking 400ms+

I want to optimize this systematically. Start with a performance audit - analyze our bundle, identify database query bottlenecks, and find frontend performance issues. Then implement the highest-impact optimizations first.

I want to see before/after metrics for everything we change.
```

Claude's approach:
- Creates a performance audit identifying bottlenecks
- Breaks optimization into prioritized steps
- Implements changes iteratively
- Provides before/after metrics proving improvements

**Category:** `performance`, `optimization`, `debugging`

---

## Cloud-Based Claude Code

Access the web version by clicking the `</>` icon in the claude.ai sidebar. Connect your GitHub account for repository integration.

Key features:
- Autonomous coding without active involvement
- Clones Git repo into a virtual sandbox
- Runs independently until the task is complete
- Creates a Pull Request for review
- Works on web, mobile, and desktop apps

Use cases: Bug fixes, documentation updates, minor website tweaks, overnight coding tasks.

**Category:** `cloud`, `autonomous`, `remote`

---

## Teleporting Between Local and Cloud

Send tasks to the cloud by prefixing a message with `&`:

```bash
& Refactor the authentication module
& Fix the flaky test in auth.spec.ts
& Update the API documentation
```

Each prefixed message creates an independent web session that runs in the cloud while you continue working locally.

Pull cloud sessions back to your terminal:

```bash
claude --teleport session_abc123
```

Or use `/tasks` to view running sessions and press `t` to teleport into one.

Workflow: Kick off a large refactor in the cloud, go for coffee, pull it back locally when done, review and finish.

Limitations:
- One-directional teleport (cloud to local only)
- Web version only works with GitHub-hosted repositories
- Requires GitHub app installation

**Category:** `cloud`, `teleport`, `parallelism`, `remote`

---

## Advanced Development Cycle Summary

A complete development cycle combining all techniques:

1. Create a feature branch via Claude.
2. Work in Plan Mode for complex features.
3. Leverage sub-agents for parallel code review and testing.
4. Use MCP servers for external integrations.
5. Deploy hooks for deterministic automation.
6. Test via Chrome integration.
7. Run custom `/review` command before merge.
8. Use `/clear` and `/resume` for context management.
9. Commit to the branch with git integration.
10. Create PR via web interface.
11. Review and merge to main.

**Category:** `workflow`, `advanced`, `best-practices`

---

## Context Preservation Best Practices

- Update `CLAUDE.md` continuously throughout development.
- Maintain hierarchical documentation across the project.
- Use `/compact` when approaching context limits, specifying what to preserve.
- Name sessions with `/rename` for easy resumption via `/resume`.
- Keep project memory accurate and current.

**Category:** `context-management`, `memory`, `best-practices`

---

## Key Reference Notes

- The context window supports up to 1 million tokens (equivalent to the entire works of Shakespeare).
- Claude Code is described as "a really well-designed general purpose agent that happens to be good at following a plan and coding."
- Testing coverage should remain comprehensive through a systematic strategy covering unit, component, integration, E2E, and performance tests.
- Performance metrics should always be tracked with before/after comparisons.
- CI/CD should enforce zero downtime deployments.
