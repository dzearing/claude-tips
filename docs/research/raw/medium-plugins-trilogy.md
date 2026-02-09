# What I Learned While Building a Trilogy of Claude Code Plugins

**Source:** [Pierce Lamb - Medium (Feb 2026)](https://pierce-lamb.medium.com/what-i-learned-while-building-a-trilogy-of-claude-code-plugins-72121823172b)

**Related articles:**
- [The Deep Trilogy: Claude Code Plugins for Writing Good Software, Fast](https://pierce-lamb.medium.com/the-deep-trilogy-claude-code-plugins-for-writing-good-software-fast-33b76f2a022d)
- [Building /deep-plan: A Claude Code Plugin for Comprehensive Planning](https://pierce-lamb.medium.com/building-deep-plan-a-claude-code-plugin-for-comprehensive-planning-30e0921eb841)

**GitHub:** [piercelamb/deep-plan](https://github.com/piercelamb/deep-plan)

---

## The Core Principle: Respect the Boundary Between Code and Claude

The recurring theme across everything learned is: respect the boundary between what should be code and what should be Claude. Deterministic tasks belong in tested scripts. State management belongs in files. Recovery logic belongs in setup sessions. What's left for Claude is exactly what it's built for -- making intelligent decisions and coordinating the pieces.

A Claude Code plugin should have deterministic state management and recovery mechanisms that bulletproof it against indeterministic behavior. Do not try to make Claude do what code should do, and do not try to make code do what Claude should do.

**Category tags:** `plugin-architecture`, `design-philosophy`, `separation-of-concerns`

---

## Validate Early with Session Setup Scripts

In all plugins, a "setup session" script that Claude calls validates the user's environment, giving the best chance at guaranteeing that the ensuing plugin use will not fail. Validate as much as you can early, using code files, before proceeding. This keeps the user from getting all the way to Step 11 and finding out that their Gemini Application Default Credentials are stale.

The rationale is that in a fresh Claude Code session you have a unit of intelligence you can use for a certain amount of context. As context increases, intelligence goes down, so you do not want problems that could have been validated at the very beginning to surface later when context is already consumed.

**Category tags:** `validation`, `session-setup`, `error-prevention`, `context-management`

---

## Context Window Management is Critical

In a fresh Claude Code session you have a unit of intelligence you can use for a certain amount of context. As context increases, intelligence goes down. This means you do not want problems validated at the very beginning to surface later, and you do not want unnecessary content consuming limited context.

At key points in workflows, have Claude call AskUserQuestion and recommend that users `/clear` and restart the plugin. With solid recovery features, this lets plugin authors manage the finite context window at key moments instead of auto-compaction happening in the middle of something important.

**Category tags:** `context-management`, `auto-compaction`, `AskUserQuestion`, `clear-command`

---

## Manage State via the File System

The de facto way to manage state across Claude Code sessions is writing files to the file system. Any plugin should outline a set of files it is going to write at key points during execution that can be used for recovery.

In case the user randomly exits or compaction occurs, your plugin should be able to recover up to the point it was at. If Claude compacts and planning steps are lost, it is a poor experience. Plugins must use state management -- utilizing the file system and the Tasks system.

**Category tags:** `state-management`, `file-system`, `recovery`, `resilience`

---

## Generate Task Lists Deterministically in Code

The TODO/Task list is generated deterministically in code to ensure Claude stays on track during execution. A correctly reconciled task list is so important to these plugins functioning that Lamb would rather be responsible for keeping the coupling updated than have the plugins hallucinate the tasks they need to accomplish occasionally.

After witnessing significant tool-calling complexity that exposed plugins to hallucination risk, the solution was to have session setup scripts write the Task files directly to the correct `tasks/session-id` folder and Claude would issue a single `TaskList`. This worked flawlessly at getting Claude into the right point in the set of Tasks it needed to perform whether it was a new or recovering session.

Values are prepended to the task list that Claude will need to reference throughout execution, keeping those values fresh in Claude's context window so it does not have to go searching for them (e.g., `planning_dir=path/to/planning_dir` at the top of the task list).

**Category tags:** `task-management`, `deterministic-generation`, `hallucination-prevention`, `TaskList`

---

## Use the SessionStart Hook for Recovery and State Initialization

SessionStart fires the moment Claude Code either starts up or returns from a `/clear`, and one of its inputs is the session-id. When Claude Code starts up, SessionStart can write ephemeral env vars to `CLAUDE_ENV_FILE` that any script can read in.

The SessionStart hook can output a JSON structured with the session-id that was passed to it, which Claude can then pass into the session setup script(s). SessionStart hooks can reference plugin scripts with: `bash ${CLAUDE_PLUGIN_ROOT}/scripts/load-context.sh`.

The initial implementation wrote `DEEP_SESSION_ID` to `CLAUDE_ENV_FILE` and session setup scripts would read `DEEP_SESSION_ID` to know where to write tasks.

**Important caveat:** `CLAUDE_ENV_FILE` is not available after a `/clear`, only at startup. This means `DEEP_SESSION_ID` became stale after the user ran `/clear`. This was a critical discovery about the hook's lifecycle behavior.

The SessionStart Hook was introduced to enable writing the reconciled task list to the correct `/tasks/session-id` directory, firing when Claude Code starts up or returns from a `/clear` command.

**Category tags:** `hooks`, `SessionStart`, `CLAUDE_ENV_FILE`, `session-management`, `recovery`

---

## Use SubagentStop Hook with Matchers for Targeted Processing

SubagentStop is a hook that fires when any subagent returns, and you can provide a matcher on its definition (e.g., `"matcher": "deep-plan:section-writer"`) so it fires only when that specific subagent returns.

SubagentStop does not get the subagent's output as an input, but it does get the path to the `.jsonl` file that captures all of the interactions the subagent had. This means the script the hook calls could read in this `.jsonl` file, extract the subagent's output, and write it to the correct directory.

This approach does create coupling to Claude Code's `.jsonl` file schema, which is a concern worth noting.

**Category tags:** `hooks`, `SubagentStop`, `subagents`, `matcher`, `jsonl`

---

## Structure SKILL.md Files to Manage Context

When a given step in a SKILL.md exceeds a paragraph in size, move its description into its own `.md` file in a `references/` directory. The first directive in that step should tell Claude to read that file with a summarized description of what is in it.

The SKILL.md becomes a high-level series of steps Claude needs to orchestrate. For any step, either the step is very simple and described in the SKILL.md itself, or it links to a reference file. This means that in the main SKILL.md no one step dominates the content and when Claude first reads it, it does not overwhelm the context window.

**Plugin directory structure:**
- `.claude-plugin/plugin.json` -- metadata
- `commands/` -- slash commands
- `agents/` -- specialized agents
- `skills/` -- Agent Skills (containing SKILL.md files)
- `hooks/` -- event handlers
- `scripts/` -- code scripts (deterministic logic)
- `references/` -- detailed step descriptions
- `.mcp.json` -- external tool configuration

**Category tags:** `SKILL-md`, `context-management`, `plugin-structure`, `references-directory`

---

## Leverage AskUserQuestion for User Interaction and Pause Points

Asking the user questions is a great way to pause execution and get some feedback. The Claude Code team made the experience very slick by having single select/multi-select out of the box and having Claude auto-generate possible answers. Lean on this tool when you need this type of experience.

AskUserQuestion also serves as a strategic context management tool. At key points in the workflow, Claude calls AskUserQuestion and recommends that the user `/clear` and restart the plugin, giving the plugin author control over when context resets happen rather than auto-compaction firing at an unpredictable time.

**Category tags:** `user-interaction`, `AskUserQuestion`, `context-management`, `pause-points`

---

## Use Subagents for Parallel Work

The plugins use subagents for parallel execution. For example, `/deep-plan` uses subagents to write an unknown number of section files in parallel; `/deep-implement` uses subagents to perform code review.

Each section file is self-contained, and multiple engineers (or Claude sessions) can work in parallel on different sections.

**Category tags:** `subagents`, `parallel-execution`, `section-splitting`

---

## Implement Adversarial Self-Review via Subagents

Claude reviews its own diff via a subagent with instructions to be adversarial -- finding edge cases, security issues, and logic errors. The user then picks which findings to address. Fixes get applied, tests run again, and only then does it commit.

Each section becomes an atomic, reviewed commit and the section `.md` file becomes like documentation for the implemented code, making it easy to trace git history to documentation.

**Category tags:** `code-review`, `adversarial-review`, `subagents`, `quality-assurance`, `git-workflow`

---

## Handle Pre-Commit Hooks Gracefully

The plugins handle annoying edge cases: pre-commit hooks that modify files (like Black or isort) get detected and retried automatically.

The guidance in the SKILL states: "If the commit fails due to pre-commit hook changes, retry the commit ONCE to include these automated changes." This handles the common case where pre-commit hooks automatically format code or fix linting issues. Without this guidance, Claude might get stuck in a loop or give up entirely when the commit fails the first time.

If hooks fail for real reasons, users get options to fix, skip, or stop.

**Category tags:** `pre-commit-hooks`, `git-workflow`, `error-handling`, `retry-logic`

---

## Use External LLM Review for Planning Blind Spots

External LLM Review sends the synthesized plan to Gemini and/or ChatGPT for independent analysis. Different context windows hit different blind spots. Claude then integrates their feedback, explaining what it accepted and rejected.

The external LLM review consistently catches blind spots, and Lamb has never seen a plan go through this process without at least one meaningful improvement from external review.

`/deep-plan` can take at least one external LLM API key (`GEMINI_API_KEY` or `OPENAI_API_KEY`) for the review phase.

**Category tags:** `multi-LLM`, `external-review`, `Gemini`, `ChatGPT`, `planning`, `blind-spots`

---

## Enforce TDD in Implementation

Test-driven development (TDD) is one of the best ways to implement something in a more bullet-proof manner from the beginning. Claude should take a TDD approach to everything it implements since time-spent-implementing is no longer a concern.

`/deep-implement` implements code one section at a time with TDD, code review at each step, and atomic commits. Claude then updates the section document used to implement the code so it is up-to-date and makes a commit based on that section, making it easy to trace git history to documentation.

**Category tags:** `TDD`, `test-driven-development`, `implementation`, `quality`

---

## Make Everything Resumable

The whole process is resumable. If context explodes mid-session, users can re-run `/deep-implement @sections` and it picks up from the first section without a valid commit hash.

All three plugins (the Deep Trilogy) can resume from interruption, with state managed through the filesystem and Claude's Task system, ensuring no progress is lost.

**Category tags:** `resumability`, `recovery`, `state-management`, `interruption-handling`

---

## Section Splitting for Manageable Implementation Units

Section Splitting breaks the final plan into self-contained implementation units. Each section file has enough context that an engineer (or Claude) can pick it up cold and implement it independently, keeping context windows manageable and enabling parallel work.

**Category tags:** `section-splitting`, `implementation-planning`, `context-management`, `parallel-work`

---

## Persist Environment Variables Carefully

SessionStart can write ephemeral environment variables to `CLAUDE_ENV_FILE` that any script can read in. However, `CLAUDE_ENV_FILE` is not available after a `/clear`, only at startup. This is a critical lifecycle detail.

Hooks can persist environment variables using `$CLAUDE_ENV_FILE`, and SessionStart hooks can reference special scripts with: `bash ${CLAUDE_PLUGIN_ROOT}/scripts/load-context.sh`.

For state that needs to survive `/clear`, write it to the file system instead of relying on `CLAUDE_ENV_FILE`.

**Category tags:** `environment-variables`, `CLAUDE_ENV_FILE`, `hooks`, `state-persistence`

---

## Coupling Considerations with Claude Code Internals

The approach of coupling plugins to the current Task schema (writing Task files directly to `tasks/session-id`) is acknowledged as likely not Anthropic's preferred approach. However, the trade-off is deemed worthwhile: a correctly reconciled task list is so important that being responsible for keeping the coupling updated is preferred over having plugins hallucinate the tasks.

Similarly, using SubagentStop to read `.jsonl` files creates coupling to Claude Code's internal file schema. These are conscious trade-offs between reliability and API stability.

**Category tags:** `coupling`, `trade-offs`, `Task-schema`, `architecture-decisions`

---

## The Three Plugins Overview (The Deep Trilogy)

1. **`/deep-project`** -- Transforms vague software ideas into individual, ready-to-be-planned components. Decomposes high-level concepts into discrete, implementable units.

2. **`/deep-plan`** -- Transforms ready-to-be-planned components into detailed implementation plans via research, interviews, and multi-LLM review. Uses subagents to write section files in parallel.

3. **`/deep-implement`** -- Implements code from `/deep-plan` sections with TDD, code review via adversarial subagent, and git workflow. Each section becomes an atomic, reviewed commit.

The flow is: vague idea -> `/deep-project` -> components -> `/deep-plan` -> detailed sections -> `/deep-implement` -> working, tested, reviewed code with clean git history.

**Category tags:** `deep-trilogy`, `workflow`, `plugin-overview`

---

## Summary of Architectural Patterns

| Pattern | Where It Belongs | Why |
|---|---|---|
| Deterministic tasks | Tested scripts | Reliability, testability |
| State management | File system | Survives `/clear`, compaction, exits |
| Recovery logic | Setup sessions | Enables resumability |
| Task generation | Code (not Claude) | Prevents hallucination |
| Intelligent decisions | Claude | What LLMs are built for |
| Coordination | Claude | Complex orchestration |
| User interaction | AskUserQuestion | Pause, feedback, context management |
| Long descriptions | `references/` directory | Keeps SKILL.md lean |
| Code review | Adversarial subagent | Quality without bias |
| Environment validation | Session setup scripts | Fail fast, fail early |
