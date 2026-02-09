# r/ClaudeCode: "Two weeks ago, someone here asked if any Claude agents are actually useful..."

**Source:** https://www.reddit.com/r/ClaudeCode/comments/1qag5bu/two_weeks_ago_someone_here_asked_if_any_claude/
**Author:** u/ZachEGlass | **Score:** 346
**GitHub Repo:** https://github.com/ZacheryGlass/.claude

---

## Post Content

> I've been writing GPU drivers firmware for 10 years. This is the Claude Code configuration that I use everyday (including the agents).
>
> https://github.com/ZacheryGlass/.claude
>
> The best one for me has been these two:
>
> 1. After every change or feature implementation, I run the `/arewedone` command to trigger my `structural-completeness-reviewer` agent. This is the single biggest impact on my overall project code quality.
>
> 2. After getting the initial prototype working for a new project, I use `/arch-review` the command to trigger my `architecture-reviewer` agent to review the project and recommend a scalable architecture that will be suitable for further feature development.
>
> Let me know what your favorite agents are!

---

## Key Agents and Commands (from ZacheryGlass/.claude repo)

### Agents (10 total)

| Agent | Purpose |
|-------|---------|
| `architecture-reviewer` | Senior architect review for structural integrity, scalability, maintainability |
| `structural-completeness-reviewer` | Post-change review for dead code, technical debt, incomplete changes |
| `bug-finder` | Bug detection |
| `doc-implementer` | Documentation implementation |
| `doc-reviewer` | Documentation review |
| `git-cherry-pick-orchestrator` | Git cherry-pick workflow orchestration |
| `github-issue-creator` | GitHub issue creation |
| `performance-profiler` | Performance profiling |
| `test-runner` | Test execution |
| `ui-ux-consultant` | UI/UX consultation |

### Commands (11 total)

| Command | Purpose |
|---------|---------|
| `/arewedone` | Run structural completeness review (triggers structural-completeness-reviewer agent) |
| `/arch-review` | Architecture review of specified paths or git changes |
| `/bugs` | Bug finding |
| `/cc` | Unknown (likely conventional commits) |
| `/commit` | Commit workflow |
| `/docs` | Documentation workflow |
| `/perf-check` | Performance check |
| `/rebase` | Rebase workflow |
| `/review-all` | Run all reviews |
| `/ui-review` | UI review |
| `/worktree` | Git worktree management |

---

## Structural Completeness Reviewer (Full Agent Definition)

**Model:** sonnet
**Tools:** Read, Glob, Grep, Bash

Role: "Meticulous Technical Lead specializing in structural code review and codebase hygiene."

### Review Scope (structural only -- explicitly NOT reviewing):
- Functional correctness
- Test quality or coverage
- Documentation quality
- Code style or formatting

### Review Methodology:

1. **Dead Code Detection**
   - Unused functions, classes, or modules that should have been deleted
   - Old implementations left alongside new ones
   - Orphaned imports or dependencies
   - Obsolete configuration entries

2. **Change Completeness Audit**
   - If a feature touches multiple layers (API, UI, database), confirm all are included
   - Check that related configuration files are updated (build scripts, deployment configs, environment variables)
   - Verify that dependency lists reflect additions and removals
   - Ensure database migrations or schema changes are included if needed

3. **Development Artifact Scan**
   - Commented-out code blocks (unless with clear justification)
   - TODO, FIXME, or HACK comments without tickets/tracking
   - Debug logging or test data left in production code
   - Temporary workarounds that should be proper implementations
   - Console.log statements or debug breakpoints

4. **Dependency Hygiene**
   - New dependencies are actually used and necessary
   - Removed features have their dependencies removed
   - No duplicate or conflicting dependencies introduced
   - Lock files are updated consistently

5. **Configuration Consistency**
   - Build configurations reflect any new compilation requirements
   - CI/CD pipelines are updated for new dependencies or build steps
   - Environment-specific configs are updated consistently across all environments
   - Feature flags or toggles are properly configured if used

### Output Format:
```
- Clean Removals: [State if old code is completely removed or list what remains]
- Complete Changes: [Confirm all required parts are present or list what's missing]
- No Dev Artifacts: [Confirm clean or list artifacts found]
- Dependencies Clean: [Confirm or list issues]
- Configs Updated: [Confirm or list missing updates]

Critical Issues (if any):
- [List any findings that will cause immediate problems]

Technical Debt Risks (if any):
- [List any findings that will cause future maintenance issues]
```

---

## Architecture Reviewer (Full Agent Definition)

**Model:** default (opus)
**Tools:** Read, Glob, Grep, Bash

Role: "Principal Software Architect" focused on foundational structure and design patterns for long-term project success.

### Review Process:
1. Gain High-Level Context -- use `ls -R`, `glob`, `grep` to identify main components, directories, entry points
2. Analyze Against Core Principles
3. Synthesize and Report

### Architectural Review Checklist:

#### 1. Separation of Concerns & Modularity
- Clear boundaries between Presentation, Business Logic, and Data Access
- Leaking abstractions (e.g., service functions taking `req, res`)
- Module cohesion -- single well-defined purpose
- Coupling -- how many modules break when one changes

#### 2. SOLID Principles
- Single Responsibility
- Open/Closed (extensibility vs modification)
- Dependency Inversion (abstractions vs concrete implementations)

#### 3. Scalability and Resilience
- Asynchronous operations for long-running tasks
- Database interaction (N+1 queries, etc.)
- Stateless services
- Robust error handling

#### 4. Maintainability and Testability
- DRY principle
- Dependency injection
- Configuration management (no hardcoded secrets)

### Report Format:
- Executive Summary
- Architectural Strengths
- Critical Architectural Risks (MUST-FIX)
- Areas for Improvement

---

## /arewedone Command Definition

```markdown
# 1. Structural Completeness Review
Use the structural-completeness-reviewer agent to check if recent changes
are fully integrated and no technical debt was introduced.

# 2. Address Review Comments
After the agent returns its review results, you should immediately make
the recommended updates.

# 3. Commit the changes
Use the committer agent to create a conventional commit for all the
completed changes.
```

Key pattern: The command chains multiple agents together -- first review, then auto-fix, then commit.

---

## /arch-review Command Definition

```markdown
Use the architecture-reviewer subagent to conduct a thorough architectural review.

Analysis target rules:
1. If file or directory paths are provided as arguments, focus exclusively on them
2. If no arguments provided, focus on recent git changes (prioritize staged, then unstaged)

Includes git diff context automatically via:
  !git diff --staged
  !git diff HEAD
```

Key pattern: The command accepts optional path arguments or defaults to analyzing git changes, making it flexible for both targeted and general reviews.

---

## Comments (sorted by score, 21 total)

### Top-Level Comments

**u/fredagainbutagain** (score: 40)
> sharing how people are using claude to me is super useful, thanks buddy

**u/makinggrace** (score: 21)
> /arewedone is the right way to name a command. Well played.

**u/Traditional_Cress329** (score: 9)
> Love posts like this. Saved this to run through tomorrow

**u/MagicaNexus9** (score: 3)
> Nice ! Thank you for sharing, is it something you use when you start a new project ?

**u/ZachEGlass** (reply, score: 3)
> You definitely want to run the architecture review early on when building something new. If you already have a large codebase, it's probably too late to rebuild the architecture without major effort. However, `/arewedone` can be run anytime.

**u/nulseq** (score: 3)
> Invoking an agent from a command is a cool technique thank you.

**u/Original-Group2642** (score: 3)
> https://code.claude.com/docs/en/settings#attribution-settings

**u/ZachEGlass** (reply, score: 3)
> Worth it. The codebase would become shit and impossible to continue building on if you don't maintain good code quality

**u/Kind-Bottle-7712** (score: 2)
> But dont 1 and 2 consume a lot of tokens?

**u/mufasis** (score: 2)
> This is awesome, but I feel like it might break projects that weren't started with these processes.

**u/Altruistic_Dot6053** (score: 2)
> Thank you, this is really invaluable. It shows me that I need to really upscale on my AI agent usage. Claude's love of hidden fallbacks has really become a problem, despite putting this requirement in the rules with an instruction to fail loudly. I'm going to spend time carefully going though this.

**u/flawlesscowboy0** (score: 2)
> Haha I did something similar! https://github.com/ntanner-ctrl/claude-code-kits
> Basically the same idea, though I have far less time on the clock than you! Can't wait to see how your kit enhances my workflow.

**u/mufasis** (reply, score: 1)
> Could you put together a video walk through of your workflow, I think it would do well on youtube.

**u/corneliusdav** (score: 1)
> I just learned about subagents! Cool, thanks!

**u/titpetric** (score: 1)
> I suppose the yaml frontmatter syntax errors are just normal, right?

**u/Pretty-Spend-2550** (score: 1)
> Zach, do you use any specific agent for planning and architecture definitions?? BTW, Are we done is a really cool insight! Congrats!

**u/OldPreparation4398** (score: 1)
> Have you tried /arewedone in a Ralph loop?

**u/filipbalada** (score: 1)
> I'd like to share Claude Code plugins for structured critical thinking. I originally had these frameworks in my "second brain" notes, but now I use them as skills with Claude Code. I've been sharing these with my colleagues, so I extracted them to the plugin marketplace for easy installation. Give it a try: https://github.com/flpbalada/thinking-toolkit

---

## Extracted Tips and Insights

### Workflow Patterns

1. **Post-change structural review** -- Run `/arewedone` after every change or feature implementation to catch dead code, incomplete changes, orphaned imports, and development artifacts before they accumulate. This was cited as "the single biggest impact on overall project code quality."

2. **Early architecture review** -- Run `/arch-review` after getting an initial prototype working for a new project, but before building out features. The author explicitly states: "If you already have a large codebase, it's probably too late to rebuild the architecture without major effort."

3. **Agent chaining via commands** -- Commands can invoke subagents and chain multiple steps. The `/arewedone` command: (1) runs structural review, (2) auto-fixes issues found, (3) commits the changes. This creates an automated quality pipeline.

4. **Scoped agent responsibilities** -- Each agent has a tightly scoped role with explicit exclusions. The structural-completeness-reviewer explicitly does NOT review functional correctness, test quality, documentation quality, or code style. This prevents scope creep and keeps reviews focused.

5. **Model selection per agent** -- The structural-completeness-reviewer uses `model: sonnet` (cheaper/faster) while the architecture-reviewer uses the default model (opus). Match model capability to task complexity.

6. **Git-aware commands** -- The `/arch-review` command automatically includes `git diff --staged` and `git diff HEAD` context when no explicit path arguments are given, making it seamlessly integrate with the git workflow.

### Tools and Resources Mentioned

| Resource | Link | Description |
|----------|------|-------------|
| ZacheryGlass/.claude | https://github.com/ZacheryGlass/.claude | Full Claude Code config with 10 agents and 11 commands |
| claude-code-kits | https://github.com/ntanner-ctrl/claude-code-kits | Similar agent/command kit by u/flawlesscowboy0 |
| thinking-toolkit | https://github.com/flpbalada/thinking-toolkit | Claude Code plugins for structured critical thinking frameworks |
| Attribution settings | https://code.claude.com/docs/en/settings#attribution-settings | Claude Code attribution settings documentation |

### Key Takeaways

- **Code quality maintenance is worth the token cost.** When asked about token consumption, the author responded: "The codebase would become shit and impossible to continue building on if you don't maintain good code quality."

- **Agents work best with tightly defined scopes.** The structural reviewer has a precise methodology with 5 specific review categories and explicit exclusions. The architecture reviewer has a 4-pillar checklist. Vague agents produce vague results.

- **Commands as orchestration layers.** Commands serve as the user-facing interface that orchestrates agent invocations, creating multi-step workflows (review -> fix -> commit) from a single slash command.

- **The "hidden fallback" problem.** u/Altruistic_Dot6053 mentioned "Claude's love of hidden fallbacks" as a recurring issue, noting they added rules to "fail loudly" but the problem persists. This is a known behavioral pattern worth guarding against in agent instructions.

- **Run completeness checks anytime, architecture reviews early.** The structural review is universally applicable to any codebase at any time. Architecture review is most valuable early in a project when the foundation can still be shaped.
