# Skills, Commands, and Plugins

## Purpose

Claude Code provides four distinct mechanisms for extending its behavior: CLAUDE.md, Skills, Slash Commands, and Plugins. Understanding when to use each one prevents context bloat, enables token-efficient workflows, and ensures the right tool is applied at the right time. Choosing incorrectly leads to wasted tokens, missed automations, or clumsy workflows.

## How It Helps

- Skills load on-demand rather than consuming tokens at startup like CLAUDE.md
- Slash commands turn repetitive multi-step workflows into one-word shortcuts
- Plugins bundle everything into distributable, team-shareable units
- Proper mechanism selection keeps context lean and behavior predictable
- Subagents provide isolated context for specialized work without polluting the main conversation

## What You Can Do

### Quick Decision Matrix

| Choose | When | Why |
|--------|------|-----|
| **CLAUDE.md** | Project rules needed at startup | Auto-loaded; git-shareable |
| **Slash Command** | One-shot manual workflows | Discoverable `/` terminal trigger |
| **Subagent** | Research-heavy, read-intensive tasks | Isolated context; distilled results |
| **Skill** | Rich auto-applied workflows | Structured capability with supporting files |
| **Plugin** | Team standardization | Distributable bundle of all the above |

### Slash Commands

Create markdown files in `.claude/commands/` (project-specific, shared with team) or `~/.claude/commands/` (personal, reusable across projects).

**Example command file** (`.claude/commands/new-feature.md`):

```markdown
---
description: Create a new feature following our standard pattern
argument-hint: [feature-name]
allowed-tools: Bash(mkdir:*), Read, Write
---

Create a new feature following our standard pattern:
1. Create the API route in /src/app/api/
2. Create the database migration in /supabase/migrations/
3. Create the React component in /src/components/
4. Add a Vitest test file next to each new file
5. Update the sidebar navigation if needed

Feature name: $ARGUMENTS
```

**Usage:** Type `/new-feature user-profile` to trigger the workflow.

**Key features:**
- `$ARGUMENTS` or `$1`, `$2` for parameter passing
- Reference files with `@file` syntax to inline code
- Declare `allowed-tools` for pre-execution scripts
- Use XML-tagged prompts for structured outputs

**Essential commands to create:**
- `/pr` -- Stage code, prepare pull request using team template
- `/catchup` -- Read all changed files in current git branch
- `/handoff` -- Document session progress before clearing context
- `/lint` -- Run linters and fix issues iteratively
- `/review` -- Comprehensive code review of recent changes

**Recommended directory structure:**

```
.claude/commands/
  common/        # new-component, bug-report, code-review
  frontend/      # new-page, add-route
  backend/       # api-endpoint, db-migration
  devops/        # deploy, rollback
```

### Skills

Skills are structured capabilities that Claude auto-discovers based on the `description` field. Unlike slash commands, skills are not manually invoked -- Claude decides when to apply them.

Store in `~/.claude/skills/` (personal), `.claude/skills/` (project-specific), or within plugins.

**Example skill** (`.claude/skills/dexie-expert/SKILL.md`):

```yaml
---
name: dexie-expert
description: Dexie.js database guidance. Use when working with IndexedDB, schemas, queries, liveQuery, or database migrations.
allowed-tools: Read, Grep, Glob, WebFetch
---

# Dexie.js Expert

When the user needs help with Dexie.js or IndexedDB:

1. Fetch https://dexie.org/llms.txt
2. Fetch only the relevant pages for the task
3. Apply the guidance to this repo's patterns
```

**Best practices for writing Skills:**
1. Keep SKILL.md under 500 lines
2. Include specific, concrete examples (not vague descriptions)
3. Limit file references to one directory level deep
4. Define clear workflow steps
5. Leverage scripts for deterministic operations
6. Build verification and feedback loops into skill workflows
7. Test skills across multiple models

**Skill Creator meta-skill:** Install via `/plugin marketplace add anthropics/skills` then request "Create a skill for [your use case]"

### Subagents

Subagents are specialized AI personas with isolated context windows. Place definitions in `.claude/agents/`.

**Example subagent** (`.claude/agents/security-auditor.md`):

```yaml
---
name: security-auditor
description: Analyzes code for security vulnerabilities
tools: Read, Grep, Bash
model: sonnet
color: orange
---

You are a security-focused code auditor.

Identify vulnerabilities (XSS, SQL injection, CSRF, etc.)
Check dependencies and packages
Verify auth/authorization
Review data validation

Provide severity levels: Critical, High, Medium, Low.
Focus on OWASP Top 10.
```

**Key characteristics:**
- Automatically delegated when task matches the `description`
- Run in isolated context windows (results return as summaries)
- Can use different models (`haiku` for simple, `sonnet` for complex, `opus` for nuanced)
- Send to background with `Ctrl+B` to continue working in the main session
- Async subagents available since v2.0.60+

**Combining Skills with Subagents** (YAML frontmatter):

```yaml
---
skills:
  - frontend-design-system
  - testing-patterns
---
# Fullstack Developer Subagent
```

### Plugins

Plugins bundle commands, skills, agents, hooks, and MCP servers together for distribution.

**Plugin directory structure:**

```
my-plugin/
  .claude-plugin/
    plugin.json          # Manifest: name, version, author
  commands/
    greet.md
  skills/
    my-skill/
      SKILL.md
  hooks/
    hooks.json
```

**Management commands:**

```bash
/plugins                      # Browse marketplace
/plugins install typescript-lsp
/plugins list
/plugins update
```

Installed plugins automatically merge components -- hooks combine, commands appear in autocomplete, skills activate based on context. Use namespacing to avoid conflicts (e.g., `/my-plugin:hello`).

### Community Plugins and Workflow Frameworks

The Claude Code ecosystem has developed several standout plugins and orchestration frameworks that significantly enhance autonomous productivity. These go beyond simple skill files -- they are structured workflows with multi-agent coordination, verification loops, and context management.

#### Superpowers (obra/superpowers)

The most widely recognized single plugin for Claude Code, now included in the official Anthropic plugin marketplace. Originally created by Obra, it provides a strong bundle of core competencies across the SDLC.

**Key capabilities:**
- **Subagent-driven development workflow** -- structured workflows using subagents for planning, implementation, and review steps
- **Brainstorming skill** -- start tasks with "use the brainstorming skill to ___" to get clarifying questions, design docs, plans, then implementation
- **Debugging skill** -- a dedicated debugging workflow praised by multiple users
- **Writing-plans skill** -- structured planning before implementation

**Effective usage patterns:**
- **Combine multiple skills in a single prompt:** Tell Claude to "use both superpowers writing-plans and front-end design and load them before starting." Users report this produces emergent, compounding behavior.
- **Always start non-trivial tasks with brainstorming:** Even for seemingly straightforward tasks, the brainstorming skill adds value by structuring the approach.
- **Automate the "use superpowers" reminder:** Claude tends to skip Superpowers steps (especially review steps) unless reminded. Add a `usersubmithook` to inject the reminder into every prompt automatically.
- **Prefer parallel sessions over worktree agents:** When Superpowers offers to use worktrees or agents, some users report better results choosing parallel sessions instead.
- **Use plan mode with subagents:** Some users find Claude's built-in plan mode combined with Superpowers subagents more consistent than relying on Superpowers' own subagent workflow alone.

**Known tradeoffs:** Subagent-driven work consumes tokens rapidly. On the Pro plan with Sonnet, users report hitting daily limits in ~30 minutes of continuous subagent work. The episodic memory feature is described as "hit or miss."

**Install:** `/plugins marketplace add obra/superpowers` -- or via the official Claude plugins marketplace.

#### Get Shit Done (GSD)

A multi-agent orchestration framework that emphasizes fresh context windows and wave-based parallelism. Over 15,000 installs and 3,300+ GitHub stars. Install with `npx get-shit-done-cc`.

**Core architecture:**
- **Orchestrator + fresh subagents:** The orchestrator uses ~10-15% context and never executes code itself. Subagents each get fresh 200k context, execute a plan, commit, write a summary, and terminate. Plan 5 has identical quality to Plan 1.
- **Wave-based parallelism:** Plans get pre-assigned wave numbers. Same wave = no dependencies = parallelize. Higher wave = depends on earlier = wait. A 6-plan phase runs in 3 rounds instead of 6.
- **Files as long-term memory:** PROJECT.md (vision/constraints), STATE.md (current position, decisions, blockers), PLAN.md (executable task specs), SUMMARY.md (what was built), VERIFICATION.md (proof the goal was achieved). Every workflow starts by reading STATE.md for instant context restoration.
- **Goal-backward verification:** Works backwards from the phase goal to verify artifacts exist, are wired together, and contain substantive implementations (not stubs or TODOs).
- **Atomic git history:** Each task = one commit, enabling `git bisect` and clean `git revert`.

**GSD slash commands:**
- `/gsd:new-project` -- initialize and research existing or new project
- `/gsd:map-codebase` -- spawn parallel agents to analyze your stack, architecture, conventions
- `/gsd:discuss-phase` -- feed preferences before planning (UI layout, error messages, CLI flags)
- `/gsd:execute-phase` -- run the execution wave
- `/gsd:verify-work` -- walk through testing; if something's broken, spawns debug agents automatically
- `/gsd:settings` -- configure model profile (full/balanced/budget) and toggle phases on/off
- `/gsd:update` -- update to latest version

**Budget tips:** On plans below $200/month, run `/gsd:settings` and switch to "budget" model profile. Toggle off "research before planning," "checking after planning," and "verification after executing" to conserve tokens. The orchestrator can use Haiku since complex work is handled by subagents.

**Practical note:** GSD works for both greenfield and brownfield projects. For existing projects, run `/gsd:map-codebase` first so the system understands your stack. Some experienced developers find that direct Claude Code usage with plan mode yields better control and fewer tokens for brownfield work; GSD's strength is in larger, multi-phase greenfield builds.

#### Ralph Wiggum (Autonomous Loop Pattern)

A technique for running Claude Code in a continuous loop so it keeps working autonomously instead of stopping after each task. Named after the original concept by Geoffrey Huntley.

**Plugin vs. bash loop -- the critical distinction:**
- **CC Plugin:** Runs in a single context window. Stop hook is not triggered at compaction. Context bloats over time leading to hallucinations. Multiple users recommend avoiding the plugin version.
- **Bash Loop (original):** Starts a fresh context window each iteration using the `-p` flag. Better for long-running tasks because each iteration starts clean. The agent reads plan/activity files each iteration to orient itself.

**Setup essentials before running any loop:**
1. **Sandbox your environment** -- use Docker containers (e.g., the `rize` tool). Git worktrees alone are not sufficient; a sandbox protects against system-level changes.
2. **Create plan.md and activity.md files** -- give the agent a clear, ordered task list. The agent reads and updates these files each iteration.
3. **Set max iterations** -- start with 10-20. The plugin defaults to unlimited.
4. **Provide a validation mechanism** -- use Playwright or browser tools so the agent can verify its own work via screenshots and console logs.
5. **Use git** -- commit between iterations for rollback points.
6. **Write specification files** that get read into context every loop.

**When Ralph is not the answer:** When you work on a team needing PR reviews; when tasks are complex enough that early mistakes compound; when you need interactive design decisions; or when a well-written spec + single focused session gets the job done without loop overhead.

**Community Ralph implementations:**

| Tool | Link |
|------|------|
| ralph-orchestrator | https://github.com/mikeyobrien/ralph-orchestrator |
| Ralph for Claude Code (Bash) | https://github.com/frankbria/ralph-claude-code |
| Efficient Ralph Loop (ticket-based) | https://github.com/JamesPaynter/efficient-ralph-loop |
| Zeroshot (Ralph on steroids) | https://github.com/covibes/zeroshot |
| The Ralph Playbook (comprehensive guide) | https://github.com/ClaytonFarr/ralph-playbook |

#### Community Agent Kits

Individual developers have shared purpose-built agent configurations that demonstrate effective patterns for autonomous productivity:

**ZacheryGlass/.claude** (10 agents, 11 commands for GPU driver firmware development):
- `/arewedone` -- triggers a `structural-completeness-reviewer` agent after every change. Cited as "the single biggest impact on overall project code quality." Reviews for dead code, change completeness, dev artifacts, dependency hygiene, and configuration consistency. Runs on Sonnet for cost efficiency.
- `/arch-review` -- triggers an `architecture-reviewer` agent (runs on Opus) to review structural integrity, SOLID principles, scalability, and maintainability. Best used early after a prototype is working.
- Key pattern: commands chain multiple agents together. `/arewedone` runs structural review, then auto-fixes issues, then commits -- an automated quality pipeline from a single slash command.
- Model selection per agent: structural reviewer uses Sonnet (cheaper/faster), architecture reviewer uses Opus (more nuanced). Match model capability to task complexity.

**Other notable community kits from the awesome-claude-code directory:**

| Kit | Link | Description |
|-----|------|-------------|
| Compound Engineering Plugin | https://github.com/EveryInc/compound-engineering-plugin | Agents/skills built around turning past mistakes into lessons for improvement |
| Context Engineering Kit | https://github.com/NeoLabHQ/context-engineering-kit | Advanced context engineering with minimal token footprint |
| Everything Claude Code | https://github.com/affaan-m/everything-claude-code | Broad coverage of core engineering domains |
| cc-devops-skills | https://github.com/akin-ozer/cc-devops-skills | Detailed DevOps skills with validations and generators for IaC code |
| Trail of Bits Security Skills | https://github.com/trailofbits/skills | Professional security-focused skills for code auditing with CodeQL and Semgrep |
| Fullstack Dev Skills | https://github.com/jeffallan/claude-skills | 65 specialized skills with Jira/Confluence integration |
| Thinking Toolkit | https://github.com/flpbalada/thinking-toolkit | Structured critical thinking frameworks as Claude Code plugins |
| TACHES CC Resources | https://github.com/glittercowboy/taches-cc-resources | Sub agents, skills, commands with meta-skills like "skill-auditor" |

#### Kata (GSD Fork)

A skills-based fork of GSD that drives the entire workflow with natural language. Comes as a Claude Code plugin rather than an npm package. Skills cannot be explicitly invoked but have GSD-equivalent commands that invoke them automatically. Users report that the triggers work more reliably than raw skill-based invocation.

**Link:** https://github.com/gannonh/kata

#### CASS Memory System

An alternative to Superpowers' episodic memory, mentioned by users who found Superpowers' memory inconsistent.

**Link:** https://github.com/Dicklesworthstone/cass_memory_system

## Details

### Feature Capability Matrix

| Mechanism | Main Conversation | Separate Context | Spawn Subagents | Manual `/` Trigger |
|-----------|------------------|-----------------|-----------------|-------------------|
| CLAUDE.md | Yes | No | No | No |
| Slash command | Yes | No | Yes (via Task) | Yes |
| Skill | Yes | No | Yes (if Task allowed) | No |
| Subagent | No | Yes | Depends on tools | Usually delegated |

### Skills vs. Slash Commands

- Skills run in the main conversation and are auto-triggered. They compete with your conversation for main context space.
- Slash commands are manually invoked and provide explicit, repeatable terminal entry points.
- Skills can include supporting files (patterns, migrations, scripts). Slash commands are typically single-file.
- Choose slash commands when you need discoverability. Choose skills when you want auto-application.

### Skills May Be Bigger Than MCP

One enterprise author describes Skills as potentially a "bigger deal than MCP" because they formalize the "scripting"-based agent model. The evolution: single prompt -> tool calling -> scripting. Skills productize the scripting layer, organizing CLIs and scripts in a discoverable format that is more robust than rigid API-like MCP tools.

### Subagent Best Practices

- Include concrete examples in the `description` field using `<example>` / `<commentary>` XML patterns
- Use a "Critical First Step" section to force documentation fetching before answering
- Define explicit response format requirements for consistent output
- Include QA rules to prevent hallucinated API details
- For doc-fetching use cases, subagents are the best mechanism because they keep main context clean

### Cautionary Note on Custom Subagents

One enterprise perspective: custom subagents can create "context gatekeeping" where hidden testing context prevents the main agent from reasoning holistically. They also force predetermined delegation patterns. Consider using Claude's built-in `Task(...)` feature to spawn general agent clones instead, with key context in CLAUDE.md.

### Inline Loop Prompting (No Plugin Required)

Some users achieve sustained autonomous work without any plugin by structuring prompts with explicit LOOP/EXIT/SAFETY sections and spawning subagents at different model tiers based on task difficulty:

```
Optimize this Rust codebase iteratively.

LOOP:
1. Run: find src -name "*.rs" -exec wc -l {} \; | sort -rn | head -1
2. If largest file is under 400 lines: EXIT LOOP, go to FINALIZE
3. Spawn a Sonnet agent to split that file (target 200-400 lines per new file)
4. Wait for subagent, verify cargo check passes
5. GOTO 1

FINALIZE:
1. Spawn subagent: Create ARCHITECTURE.md for final structure

SAFETY:
- Stop if same file appears twice (couldn't split it)
- Stop on any cargo check failure
```

One user reports consistently getting Claude to work on 30-minute to 4-hour prompts in "one shot" using this pattern with only out-of-the-box features. The key insight: give comprehensive, actionable tasks with success criteria -- these often complete in one iteration, making external loop tools unnecessary.

### Claude Cowork as an Orchestration Layer

Claude Cowork can serve as an autonomous supervisor that orchestrates Claude Code sessions. Non-technical users in particular report breakthrough results from this layered approach:

- Cowork researches the problem (browses the internet, reads documentation)
- Cowork writes structured prompts with exact paths, explicit constraints, clear success criteria, and "what NOT to do"
- Cowork directs Claude Code to execute with those prompts
- When Cowork and Claude Code disagree, Cowork tends to catch common-sense errors that Claude Code misses due to narrow context

This pattern is most valuable when a user cannot effectively communicate implementation details to Claude Code directly, or when Claude Code is stuck in a debugging loop. The tradeoff is doubled token consumption since two AI instances are running.

### Keep Slash Commands Minimal

One author's philosophy: "The moment you force engineers to learn a new, documented-somewhere list of essential magic commands just to get work done, you have failed." Recommended minimal set: `/catchup` (read changed files) and `/pr` (prepare pull request).

### Slash Commands Can Orchestrate Subagents

A single slash command can fan out to multiple subagents in parallel using the Task tool. Example: `/research` spawns web docs, Stack Overflow, and codebase exploration agents simultaneously, then synthesizes findings into a research document.

### Complete Directory Structure

```
project-root/
  CLAUDE.md
  .claude/
    CLAUDE.md              # Alternative root location
    settings.json          # Hooks, permissions
    commands/              # Slash commands
      pr.md
      catchup.md
      new-feature.md
    agents/                # Subagents
      security-auditor.md
      code-reviewer.md
    skills/                # Skills (each is a subdirectory)
      dexie-expert/
        SKILL.md
        PATTERNS.md
        scripts/
          validate-schema.ts
    rules/                 # Conditional rules
      api-routes.md
      testing.md
  tests/CLAUDE.md          # Nested context
  src/db/CLAUDE.md         # Nested context
```

## Sources

- https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/
- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://sidbharath.com/claude-code-the-complete-guide/
- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://medium.com/@shivang.tripathii/how-i-use-claude-code-to-maximize-productivity-c853104804d6
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://www.reddit.com/r/ClaudeCode/comments/1qgkupf/superpowers_is_now_on_the_official_claude/ (Superpowers marketplace discussion)
- https://www.reddit.com/r/ClaudeCode/comments/1qc4vg0/trust_me_bro_most_people_are_running_ralph_wiggum/ (Ralph Wiggum setup guide)
- https://www.reddit.com/r/ClaudeCode/comments/1qf6vcc/ive_massively_improved_gsd_get_shit_done/ (GSD v2 update)
- https://www.reddit.com/r/ClaudeCode/comments/1qk3f46/gsd_now_officially_supports_opencode/ (GSD OpenCode support and budget tips)
- https://www.reddit.com/r/ClaudeCode/comments/1qag5bu/two_weeks_ago_someone_here_asked_if_any_claude/ (Useful agents -- ZacheryGlass)
- https://www.reddit.com/r/ClaudeCode/comments/1qh78yf/tried_claude_cowork_last_night_and_it_was_a_top_3/ (Cowork as orchestrator)
- https://github.com/hesreallyhim/awesome-claude-code (Curated plugin/tool directory)
- https://github.com/obra/superpowers
- https://github.com/glittercowboy/get-shit-done
- https://github.com/ZacheryGlass/.claude
