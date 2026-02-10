# Git and Code Review

## Purpose

Claude Code integrates deeply with Git and the GitHub CLI (`gh`), enabling you to delegate version control operations, automate PR workflows, and conduct interactive code reviews. Treating Claude as a Git-fluent collaborator eliminates context switching between terminal, browser, and IDE for most version control tasks.

## How It Helps

- Delegates routine Git operations (commits, branching, pushing) so you stay focused on code
- Draft PRs enable low-risk review before marking ready for team
- Interactive code review with Claude catches logic errors and security issues human reviewers may miss
- GitHub CLI integration enables powerful operations like GraphQL queries without leaving the terminal
- Automated PR reviews via the GitHub App provide continuous quality checks

## What You Can Do

### Delegate Git Operations

Let Claude handle branching, committing, and pushing:

```
Create a new branch called feature/user-notifications
```

```
Commit the current changes with a descriptive message
```

```
Push the branch and create a draft PR
```

**Permission tip:** Allow pulls automatically but restrict pushes. Use `/permissions` to configure:

```bash
/permissions
```

Add wildcard patterns for common safe operations:
- `Bash(git pull *)` -- allow any pull
- `Bash(git checkout *)` -- allow branch switching
- `Bash(npm run build *)` -- allow build commands

### Recommended Feature Branch Workflow

1. Ask Claude to create a new branch
2. Have Claude build the feature on the isolated branch
3. Test the app yourself
4. Have Claude run tests using `/test` or custom testing
5. Update documentation if needed
6. Have Claude commit changes
7. For multi-part features, repeat steps 2-6
8. When satisfied, merge to the main branch

Failed experiments do not affect the main codebase. Delete problematic branches.

### Git Worktrees for Parallel Agent Work

Use Git worktrees to run multiple Claude Code agents in parallel on the same repository without file conflicts. Each agent gets its own working directory pointing to a separate branch:

```bash
git worktree add ../feature-auth feature/auth
git worktree add ../feature-notifications feature/notifications
```

Each worktree is an independent checkout, so agents can edit files simultaneously without overwriting each other. Tools like **Subtask** (github.com/zippoxer/subtask) automate this pattern: Claude creates tasks, spawns subagents in worktrees, and tracks progress through a TUI. The author reports ~60 tasks merged in a single week using this workflow.

**Lead agent + subagent pattern:** Use one Claude Code session as the "lead" that creates tasks and delegates implementation to subagents running in separate worktrees. The lead can interrupt and communicate with subagents, and gets notified when they complete.

**Alternatives to worktrees:**
- **jj (Jujutsu VCS) with workspaces** -- similar isolation model with a different VCS
- **Separate clones** -- simpler but uses more disk space
- **Conductor** -- a UI that creates worktree-equivalent workspaces for parallel agents

**Resource consideration:** Running multiple parallel agents consumes API quota fast. Community members report needing to limit to 3-4 concurrent agents to stay within weekly limits.

### Large-Scale Legacy Refactoring Strategy

Refactoring large legacy codebases (50k+ lines) requires a disciplined phased approach. One developer refactored a 50k-line legacy monolith in 3 weeks -- an effort estimated at 2-3 months without Claude Code -- but the speed came from keeping the refactoring on rails, not from letting Claude run wild.

**Phase 1 -- Characterization tests first.** Before Claude writes any refactored code, lock down existing behavior with tests that capture current outputs given realistic inputs. Prompt: "Generate minimal characterization tests for [module]. Focus on capturing current outputs given realistic inputs. No behavior changes, just document what this code does right now." Expect to spend several days on this before any refactoring begins. These tests become the safety net for every subsequent change.

**Phase 2 -- CLAUDE.md with hard boundaries.** Legacy codebases have "load-bearing walls" -- code that looks ugly but handles critical edge cases nobody fully understands. Use CLAUDE.md to explicitly declare which modules are off-limits unless specifically requested, and enforce rules like "always run relevant tests after any code changes" and "prefer incremental changes over large rewrites." Use hierarchical CLAUDE.md files (e.g., `apps/billing/CLAUDE.md`) to add module-specific context.

**Phase 3 -- Incremental refactoring with continuous verification.** Break refactoring into small, specific tasks with one prompt per task. After each change, Claude runs the characterization tests. If they pass, commit and move on. If they fail, debug before touching anything else. Prompt: "Implement this refactoring step: [specific task]. After making changes, run the relevant tests and confirm all pass. If any fail, debug and fix before reporting completion."

**Phase 4 -- Code review on every PR.** Even with passing tests, review for security issues, performance antipatterns, and subtle logic errors that tests may not cover.

**Spec-driven decomposition for large refactors.** A commenter who refactored 20k+ lines recommended generating specs for existing code, breaking the work into tickets where each ticket is a small self-contained task. Claude refers back to the specs at every step, which prevents context from fading after 4-5 prompts. This approach mirrors the spec-driven workflow described in [14-creator-workflow.md](./14-creator-workflow.md).

**Where it breaks down:** Context limits are real -- keep sessions under 25-30k tokens. Use handoff documents (markdown files summarizing progress, decisions, and next steps) to start fresh sessions without losing context. Hallucinated APIs still happen, and complex architectural decisions remain human work.

### Commit Before Big Changes

Before any significant refactor, create a checkpoint commit:

```bash
git add -A && git commit -m "checkpoint before refactor"
```

One author's lesson: "Lost 3 hours of work to a botched migration that touched every model file." Now commits before every major change. If it goes wrong: one `git reset` away from safety.

### Use Draft PRs for Low-Risk Reviews

Create draft PRs to review changes in the GitHub interface before marking them ready:

```
Create a draft PR for this branch with a summary of the changes
```

Draft PRs let you:
- Review diffs in a familiar web interface
- Get early feedback from teammates without triggering CI
- Iterate before the formal review process begins

### Interactive Code Review with gh

Conduct conversational code reviews using the GitHub CLI:

```
Review PR #123 -- focus on security vulnerabilities and logic errors. Pull the PR details using gh.
```

Claude can:
- Retrieve PR information with `gh pr view`
- Read diff contents with `gh pr diff`
- Check review comments with `gh api repos/owner/repo/pulls/123/comments`
- Post review comments
- Conduct iterative reviews at variable detail levels

### Install the GitHub App for Automatic Reviews

```
/install-github-app
```

Once installed, Claude automatically reviews PRs and can identify logic errors and security issues. Customize the review behavior with a `claude-code-review.yml` configuration file:

```yaml
direct_prompt: |
  Review for bugs and security issues only. Be concise.
```

This prevents verbose comments on minor style details and focuses on substantive issues.

### Disable Attribution

If you prefer not to have Claude Code attribution in commits and PRs, configure this in settings. Access via the settings menu.

### Review Git Diffs for Semantic Correctness

Beyond checking for functional bugs, review diffs for subtle semantic errors that pass tests but are logically wrong. Agents can make substitutions like using `created_at` as a fallback for `birth_date`, or silently swapping a UUID lookup for a name-based one. These changes look correct at first glance and pass basic functional tests but produce wrong results in production.

When diffs start getting noisy with unrelated changes, that is a signal your codebase foundation is drifting. Clean early architecture keeps diffs small and reviewable.

### Review Before Approving

Before accepting large changes:

1. Run `git diff` to see everything that changed
2. Check for hardcoded values, missing error handling, security issues
3. Run the full test suite
4. Build the project to catch type errors

"Trust but verify. Claude Code handles 90% of the work. Your job is catching the 10% it misses."

## Details

### Verification Methods for Code Review

Multiple verification approaches for different scenarios:

| Method | Best For |
|--------|----------|
| Write and run tests | Functional correctness |
| Review in Claude UI | Quick inline checks |
| Visual Git client (GitHub Desktop) | Diff visualization |
| Draft PRs | Team review, web-based diff |
| Self-verify tables | "Double check every claim and make a table" |
| `/rewind` | Rolling back unwanted changes |
| Automated multi-layer review | Security, style, logic checks via separate agents |

### Using /rewind for Checkpoint Recovery

If Claude makes unwanted changes:

```bash
/rewind
```

Options:
- **Conversation only:** Trims chat history but keeps code changes
- **Code only:** Reverts files but retains chat context
- **Both:** Full rollback for clean retries

Also accessible by pressing `Esc` twice.

**Limitations:** Cannot undo external actions (git push, database changes, manual edits outside Claude).

### Policy-Based Code Review

Use Claude as an objective enforcer of coding policies:

**DRY policy:**
```
Analyze src/utils/ for code duplication. Flag functions with >70% similarity,
duplicated logic blocks >5 lines, and repeated validation rules.
```

**Performance policy:**
```
Review this module for O(n^2) algorithms, N+1 queries, missing indexes,
unnecessary re-renders, and sync operations that should be async.
```

**Pre-merge quality gate:**
```
Before merging PR #123, verify: all functions have JSDoc, no console.log
statements, no functions >50 lines, test coverage >80%, no security
vulnerabilities. If any fail, provide remediation.
```

### Multi-Layer Automated Code Review

Set up multiple automated review passes with different focus areas rather than relying on a single all-purpose review. One community member running a giant monorepo uses three different automated code reviews triggered on each PR, plus daily automated reviews via Claude. Each review focuses on a different aspect (security, code style, logic correctness).

This layered approach catches more edge cases than a single agent reviewing everything. Expect security problems regardless -- automated security-focused reviews are not optional, they are critical.

### GitHub Actions Integration

Claude Code Action runs on GitHub Actions with Skills support:

1. Create Skills in `.claude/skills/` directory
2. Add `--allowed-tools Skill` to `claude_args` in your GitHub Actions workflow
3. Use `/install-github-app` for `CLAUDE_CODE_OAUTH_TOKEN` configuration

Trigger PR generation from Slack, Jira, or CloudWatch alerts. The action fixes bugs or adds features and returns a tested PR.

## Sources

- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://www.builder.io/blog/claude-code
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://sidbharath.com/claude-code-the-complete-guide/
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qhzagf/subtask_claude_code_creates_tasks_and_spawns/ (Subtask: worktree-based parallel agents)
- https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/ive_used_ai_to_write_100_of_my_code_for_1_year_as/ (13 lessons: git diff review, parallel agents)
- https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/ (Opus tips: session discipline, subagent workflows)
- https://www.reddit.com/r/ClaudeCode/comments/1qobg1g/how_to_refactor_50k_lines_of_legacy_code_without/ (50k-line legacy refactoring strategy)
