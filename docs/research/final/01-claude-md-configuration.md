# CLAUDE.md Configuration

## Purpose

CLAUDE.md is the single highest-impact configuration you can set up for Claude Code. It acts as persistent project memory that loads automatically at the start of every session, eliminating the need to re-explain your stack, patterns, and rules. Without it, each session starts from zero. One author estimates "10 minutes to write. Hours saved in every subsequent session."

## How It Helps

- Eliminates repeated explanations of tech stack, conventions, and architecture across sessions
- Enables team-wide consistency when committed to the repository
- Reduces rework caused by Claude not knowing your project's patterns
- Reported 40% faster code review cycles and faster developer onboarding
- Functions as iterative training -- every time Claude repeats a mistake, you add a rule to prevent it

## What You Can Do

### Quick Start

Run `/init` in Claude Code to auto-generate a CLAUDE.md by analyzing your codebase.

### File Locations and Loading Behavior

CLAUDE.md files form a hierarchy that merges from global to project to directory-specific:

```
~/.claude/CLAUDE.md                    # Global user preferences (personal coding style, conventions)
~/projects/
  CLAUDE.md                            # Project root (or .claude/CLAUDE.md)
  src/
    components/
      CLAUDE.md                        # Component-specific patterns (loaded on-demand)
    pages/
      CLAUDE.md                        # Routing-specific patterns (loaded on-demand)
    db/
      CLAUDE.md                        # Database-specific patterns (loaded on-demand)
  tests/
    CLAUDE.md                          # Testing conventions (loaded on-demand)
```

**Startup load locations:**

1. `./CLAUDE.md` (project root)
2. `./.claude/CLAUDE.md` (inside .claude directory)

**Nested CLAUDE.md files** in subdirectories are NOT loaded at startup. They load dynamically when Claude operates on files in those directories. This keeps root-level context lean while enabling directory-specific instructions.

**Priority rule:** More specific (deeper nested) files take precedence over general ones when there is a conflict.

### Template Structure

```markdown
# CLAUDE.md

## Project Overview
Finance Tracker Pro - Full-stack web application for personal finance management

## Tech Stack
- Next.js 15 (App Router)
- Supabase (auth + database)
- Stripe (payments)
- Tailwind CSS v4
- TypeScript strict mode

## Architecture
- /src/app -- pages and API routes
- /src/lib -- shared utilities and services
- /src/components -- React components (use shadcn/ui)
- /src/types -- TypeScript type definitions

## Rules
- Use server components by default, client components only when needed
- All API routes validate input parameters
- Error handling: use Result pattern, no thrown exceptions in business logic
- Tests: Vitest for unit, Playwright for E2E

## Commands
- Dev: pnpm dev
- Test: pnpm vitest run
- Build: pnpm build
- Lint: pnpm lint
```

### User-Level vs. Project-Level

Maintain two separate files:

- **User-level** (`~/.claude/CLAUDE.md`): Personal coding guidelines, conventions, and task preferences that apply across all projects
- **Project-level** (`./CLAUDE.md`): Project-specific structure, tech stack, and logic committed to the repository

### Conditional Rules with .claude/rules/

For domain-specific rules that should only load in certain contexts, use `.claude/rules/` (available since v2.0.64+):

```
.claude/rules/
  code-style.md         # Global rules (no paths frontmatter)
  api-routes.md         # API-specific rules
  testing.md            # Testing conventions
  components.md         # Component patterns
```

Rules can use glob patterns in YAML frontmatter for conditional application:

```yaml
---
paths: src/api/**/*.ts
---
# API Development Rules

- All API endpoints must validate input parameters
- Use consistent error response format
- Include request logging middleware
```

## Details

### Keep It Concise

For professional monorepos, maintain strict curation at approximately 13-25KB. One enterprise author describes token allocation like "selling ad space" -- each tool or API documented must justify its inclusion. Only document tools/APIs used by 30% or more of engineers. If the documentation for a tool cannot be made concise, that is a signal the tool itself needs simplification.

For hobby projects, the file can be more flexible and less strictly curated.

One community member notes that a bloated CLAUDE.md adds a recurring "tax" on every single message -- since it is injected into every request, the cost compounds across an entire session. Periodic pruning is not optional; it is an ongoing maintenance task. Another suggests using YAML instead of markdown for AI-facing instruction files (not CLAUDE.md itself, which must be markdown) to save tokens when humans do not need to read the file. (r/ClaudeCode)

### Team Rollout: Standardizing CLAUDE.md Across a Company

For company-wide Claude adoption, the biggest challenge is everyone configuring CLAUDE.md differently -- different rules, different workflows, different coding conventions. Practical approaches from teams that have done this:

- Standardize a shared repo-level CLAUDE.md with project conventions, then let individuals maintain personal preferences in `~/.claude/CLAUDE.md`.
- Build custom skills and commands that auto-load based on your tech stack so everyone gets the same workflow (e.g., `/catchup` to start a session, `/wrapup` to end it).
- Use automated code reviews (3+ automated review passes per PR recommended by one monorepo user) to enforce what CLAUDE.md cannot guarantee.
- Expect that rules will not be followed consistently -- automated enforcement via hooks, CI, and linting is essential as a safety net.

(Sources: r/ClaudeCode threads on company adoption and monorepo management)

### Living Document: Update on Repeated Mistakes

CLAUDE.md is not set-it-and-forget-it. Actively update when Claude makes repeated mistakes. Real examples:

- Claude used default timeouts for large downloads, causing failures. Fix: add a guideline to always use higher timeouts for long-running operations.
- Claude uncommented test blocks on its own. Fix: explicitly write that it must never uncomment tests unless instructed.
- Claude created redundant DAO functions instead of reusing existing ones. Fix: add guidelines with good and bad examples.

Community members report losing count of how many times they have tweaked their CLAUDE.md -- this is normal and part of iterative optimization. One user has both Claude and Codex help tweak the files for them. Another describes waiting for Claude to repeat the same mistake multiple times before codifying the rule, which helps avoid over-specifying the file with one-off cases.

### Codify Failures, Not Just Patterns

One experienced multi-agent user shares an approach worth highlighting: document what went wrong, not just what should happen. Every time an agent makes a mistake that wastes time, add a specific negative rule to prevent it. Example from a design workflow: "NEVER use threshold-based black removal -- destroys internal outlines." These negative rules are often more valuable than positive ones because they prevent the exact class of mistake that LLMs tend to repeat. (r/ClaudeCode, score 3)

### Start Simple, Grow Organically

Start with no CLAUDE.md. Add rules only when you find yourself repeating instructions. Let Claude help edit the file based on your guidance. Review periodically to remove outdated rules.

### CLAUDE.md Instruction Priority and Phrasing

How you phrase rules matters significantly for compliance. Community experience suggests the following ordering principles:

1. **Instructions at the very top get highest priority.** Put your most critical rules first.
2. **Specific, actionable, repeated instructions work better than general principles.** "Search Apple docs for [topic] before coding" outperforms "research thoroughly."
3. **Imperative phrasing outperforms suggestive phrasing.** "Use MCP first" works better than "It's best to use MCP."
4. **Negative instructions ("DO NOT do X") work better than soft preferences ("prefer Y")** for behavior you truly need to prevent.
5. **Instructions buried in the middle of long documents get deprioritized.** Structure matters.
6. **Repeat critical rules in multiple places** if your CLAUDE.md is long -- redundancy improves compliance for essential rules.

(Source: r/ClaudeCode, community-tested observations across multiple threads)

### The Post-Mistake Prompt Pattern

When Claude does something wrong, use this prompt pattern to turn the failure into a durable rule:

> "You just did X. We don't want that, we want Y. Why did you do that and how can we make sure it's done correctly going forward?"

Claude will figure out where to store the corrective logic and sometimes identify conflicts in existing config that led to the incorrect behavior. This becomes more important as your configuration grows in complexity. (r/ClaudeCode, u/elcapitansammy)

### Let Claude Maintain Its Own Config

Several experienced users recommend telling Claude to update CLAUDE.md itself when repo-wide issues surface (e.g., linting conventions, test generation patterns, file organization). Tell Claude what to change and have it write the rule. If the issue is specific to you personally rather than the project, direct it to update the user-level file at `~/.claude/CLAUDE.md` instead. The key insight: maintaining CLAUDE.md should not be a purely manual process -- let Claude help keep its own instructions current. (r/ClaudeCode, u/elcapitansammy)

### Guard Against Conflicting Rules

As your CLAUDE.md, skills, and rules accumulate, logic conflicts can cause non-deterministic behavior -- Claude will pick one interpretation based on statistical probability. Periodically ask Claude to review its own config files for contradictions. Make sure the repo CLAUDE.md and skills do not disagree with your personal-level file. If they must conflict, explicitly mark which one takes precedence using strong language ("it is very important to always..."). (r/ClaudeCode, u/elcapitansammy)

### Avoid These Anti-Patterns

- **@-mention bloat:** Do not use `@`-file references to embed entire documentation files. This loads the full content on every run. Instead, tell Claude when and why to read supporting files: "For complex usage or if you encounter a FooBarError, see path/to/docs.md"
- **Negative-only constraints:** Avoid "Never use the --foo-bar flag" without providing an alternative. Always pair prohibitions with preferred alternatives: "Never use X, prefer Y instead."
- **One-off tasks:** CLAUDE.md is for universal project rules, not specific use cases. Use slash commands or skills for task-specific workflows.
- **No enforcement mechanism:** CLAUDE.md instructions are advisory -- Claude decides whether to follow them. For critical behavior, reinforce through hooks, slash commands, or skills.

### Per-Feature Documentation Files

An advanced pattern from a developer shipping 100% AI-generated code for over a year: maintain a single doc file per feature (e.g., `docs/rate-limiting.md`) that contains everything the agent needs to know. When starting work on that feature, explicitly tell Claude to read the file first -- do not trust it to check on its own, even when referenced in CLAUDE.md.

As the feature progresses, trim the doc by summarizing completed phases and removing code snippets that are no longer relevant. The goal is to keep the file as a dense context payload that you can use to cold-start any new session: "docs/rate-limiting.md read the entire doc, then do X." This approach enables clean session boundaries -- you can `/clear` at any time and reload from the doc without losing critical context. (r/ClaudeCode, u/helk1d, score 5)

### Enforcement Beyond CLAUDE.md

Community experience converges on the idea that CLAUDE.md alone is insufficient for critical rules. Effective enforcement strategies include:

- **Code coverage thresholds at 90%+** with mutation score tracking, enforced via CI -- not just suggested in CLAUDE.md.
- **Strict TSC + lint with no warnings allowed**, max lines of code per file, enforced JSDoc, and cyclomatic complexity of 1-10 as a hard gate.
- **Git hooks and CI/CD with "no skips allowed"** documented in both CLAUDE.md and agents.md.
- **Multiple automated code review passes per PR** (one user runs 3 different automated reviews on each PR plus daily automated reviews via Claude).

The pattern: CLAUDE.md sets intentions, but hooks, CI, and automated reviews enforce them. (r/ClaudeCode, multiple contributors)

### Context Drift Warning

In long sessions, the model can gradually deprioritize earlier system-level instructions (including CLAUDE.md content) in favor of recent conversation history. Be aware that CLAUDE.md rules may lose influence in extended conversations. Use `/compact` or `/clear` to reset.

### Instruction Adherence: The 80% Problem

A recurring community frustration: CLAUDE.md rules are ignored a significant percentage of the time, even when phrased in strong language (ALL CAPS, "MUST", "PROACTIVELY"). In one widely-discussed case (score 197), explicit routing instructions were ignored because the model "rationalized it as just a quick lookup" and took a shortcut. The community consensus is that **CLAUDE.md instructions are advisory, not binding** -- the model can and will deprioritize them when it judges a simpler path is available.

Workarounds the community has found effective:

- **Hooks as enforcement.** Pre-tool hooks that block disallowed actions and return corrective messages are the most reliable enforcement mechanism. Unlike CLAUDE.md rules, hooks are programmatic and cannot be rationalized away. However, some users report that the model may attempt to circumvent hooks by using alternative tools or writing scripts to accomplish the blocked action.
- **Phrasing matters.** Frame rules as positive directives ("always do Y") rather than prohibitions ("never do X"). Providing the reason ("because Z") improves compliance. One user recommends: "Give Claude context and empower Claude rather than focusing on restricting and controlling."
- **Redundant placement.** Repeat critical rules in multiple locations -- CLAUDE.md, skills, and inline prompts. A rule stated once in the middle of a long file has low adherence; the same rule stated at the top, restated in a skill, and reinforced by a hook has high adherence.
- **Aggressive stacking.** Some users report success with restating the same instruction in multiple phrasings spread throughout CLAUDE.md -- "belligerently stacking" the instruction rather than stating it once politely.
- **Accept partial compliance.** For non-critical preferences, expect that compliance will drift over long sessions. For critical behavior, always back up CLAUDE.md with hooks or CI enforcement.

(r/ClaudeCode, score 197)

### Auto-Memory: Claude's Self-Maintained Notes (v2.1.32+)

Starting with v2.1.32, Claude Code includes an auto-memory feature that writes to a local `MEMORY.md` file (stored in `~/.claude/projects/.../memory/`). This complements manual CLAUDE.md maintenance by letting Claude proactively record operational knowledge it discovers during sessions.

| Aspect | CLAUDE.md | Auto-Memory (MEMORY.md) |
|--------|-----------|------------------------|
| Who writes it | You (or Claude when asked) | Claude, proactively |
| In source control | Yes | No (local only) |
| Purpose | Project truth and instructions | Operational "gotchas" and lessons learned |
| Example | "Run tests with pytest tests/" | "Logic check A must happen before B or Test X fails" |

Key considerations:

- **Inspect periodically.** Conflicting or stale entries can accumulate in auto-memory, especially after context collapses (running out of context mid-operation). Review the file regularly.
- **200-line limit per project.** Auto-memory is capped, which forces conciseness but can also mean useful entries get displaced.
- **Disable if needed.** Set `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` to turn it off.
- **Community extensions.** Some users restructure MEMORY.md with sections like "Top of Mind" (five most salient observations) and "Critical Patterns" (patterns not yet promoted to rules), keeping the file organized rather than letting it grow as an append-only log.
- **Not a replacement for CLAUDE.md.** Auto-memory captures operational knowledge; CLAUDE.md remains the source of truth for project conventions and team-shared rules. They serve different purposes.

(r/ClaudeCode, score 140)

### AGENTS.md Compatibility

Claude Code does not officially support AGENTS.md. Two workarounds:

1. Import within CLAUDE.md using `@AGENTS.md` syntax, then verify with `/memory`
2. Create a symbolic link: `ln -s AGENTS.md CLAUDE.md`

Maintaining an AGENTS.md alongside CLAUDE.md ensures compatibility with other AI IDEs (Cursor, Codex).

### Verification

Use `/memory` to verify what Claude has loaded from your CLAUDE.md files.

## Sources

- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://medium.com/@shivang.tripathii/how-i-use-claude-code-to-maximize-productivity-c853104804d6
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://sidbharath.com/claude-code-the-complete-guide/
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://www.oreateai.com/blog/claudemd-best-practices-reddit/3a29cdd605ebb2025681e71218021b5e
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- [r/ClaudeCode - "13 no-bs lessons from 1+ year of 100% AI code"](https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/ive_used_ai_to_write_100_of_my_code_for_1_year_as/) (score 670)
- [r/ClaudeCode - "Before you complain about Opus 4.5 being nerfed"](https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/) (score 351)
- [r/ClaudeCode - "Did my whole company just move to Claude?"](https://www.reddit.com/r/ClaudeCode/comments/1qpbdao/did_my_whole_company_just_move_to_claude/) (score 515)
- [r/ClaudeCode - "CLAUDE.md says 'MUST use agent' - Claude ignores it 80% of the time"](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/) (score 197)
- [r/ClaudeCode - "How Claude Code Auto-Memory works (v2.1.32)"](https://www.reddit.com/r/ClaudeCode/comments/1qzmofn/how_claude_code_automemory_works_official_feature/) (score 140)
