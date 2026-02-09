# Sankalp's Guide to Claude Code 2.0 and Coding Agents

> Source: https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
> Author: Sankalp
> Published: December 27, 2025
> Extracted: 2026-02-09

---

## Use Claude Code as the Main Driver in a Multi-Model Workflow

Use Claude Code as the primary tool with secondary reviewers for different strengths. The recommended setup is: "Claude Code as the main driver, Codex for review and difficult tasks, and Cursor for reading code and manual edits." This leverages Claude Opus 4.5's superior communication and collaboration abilities while using GPT-5.2-Codex for its strength in code review (finding subtle bugs with severity ratings like P1, P2, and fewer false positives).

**Category:** `workflow`, `multi-model`

---

## Monitor Context Usage and Compact at 60%

Monitor context usage via the `/context` command. Start compaction or a new session when reaching 60% capacity on complex builds. Effective context windows are typically only 50-60% of the stated maximum. Don't start complicated tasks mid-conversation -- use compaction or start fresh.

**Command:** `/context`
**Command:** `/compact`

**Category:** `context-management`, `workflow`

---

## Create a /handoff Custom Command for Session Transitions

Create a `/handoff` custom command to document session progress before starting fresh conversations, preserving important context. This ensures continuity between sessions when context needs to be cleared or when handing off to a new conversation.

**Command:** `/handoff`

**Category:** `custom-commands`, `workflow`

---

## Use GPT-5.2-Codex for Code Review

Leverage GPT-5.2-Codex for code review using the `/review` command. The model excels at finding bugs with severity ratings (P1, P2) and reports fewer false positives than Claude. It surpasses Opus 4.5 specifically in code review tasks.

**Command:** `/review`

**Category:** `code-review`, `multi-model`

---

## Use the First-Draft Throwaway Approach for Complex Features

For complex features: create a new branch, let Claude write the full feature end-to-end while observing. Compare the output against requirements to identify divergences and error patterns. Use these insights for sharper second iteration prompts. The first draft is intentionally disposable -- it serves as a learning tool for refining your prompts.

**Category:** `prompting`, `workflow`, `complex-features`

---

## Use /clear and /compact for Context Management

- `/clear` -- Start a completely new conversation, clearing all context
- `/compact` -- Faster context compression than `/clear`, preserves key information in a compressed form

Use these to manage context window limits during long coding sessions.

**Commands:** `/clear`, `/compact`

**Category:** `context-management`, `commands`

---

## Use /resume and /rewind for Checkpointing

- `/resume` -- Restart conversation from a checkpoint
- `/rewind` or `Esc+Esc` -- Return to a specific checkpoint in the conversation, rewinding both code and conversation history

Frequently use `Esc+Esc` or `/rewind` to return to known-good checkpoints. This is useful for catching divergences from requirements and rolling back to a good state.

**Commands:** `/resume`, `/rewind`, `Esc+Esc`

**Category:** `checkpointing`, `commands`, `debugging`

---

## Enable Extended Thinking Mode

Set `"thinking": true` in `settings.json` for always-on extended thinking. `Alt/Option+Tab` toggles extended thinking on/off (note: reported as buggy on Mac at time of writing).

Use `/ultrathink` liberally for: hard tasks, rigorous explanations, and self-review of changes. Extended thinking mode ensures thorough reasoning.

**Config:**
```json
{
  "thinking": true
}
```

**Commands:** `/ultrathink`, `Alt+Tab` (toggle)

**Category:** `thinking`, `configuration`, `quality`

---

## Master Keyboard Shortcuts

- `Ctrl+R` -- Search through prompt history across projects
- Repeated `Ctrl+R` -- Cycle through search results
- Up/Down arrows at prompt boundaries -- Cycle through prompts
- `Shift+?` -- Display available shortcuts
- `!` -- Quick actions shortcut

**Category:** `shortcuts`, `productivity`

---

## Use Syntax Highlighting for In-CLI Review

Syntax highlighting was added in version 2.0.71. It enables in-CLI code review without needing to open external editors. This speeds up the review cycle during interactive sessions.

**Category:** `code-review`, `quality-of-life`

---

## Create Custom Commands at Project or Global Level

Create project-level commands at `.claude/commands/` or global commands at `~/.claude/commands`. You can tell Claude "make a custom command" and it will search documentation and build it for you.

When entering a command with `/`, the associated prompt appends to the current conversation context and the agent begins the task.

**Paths:**
- Project-level: `.claude/commands/`
- Global: `~/.claude/commands`

**Category:** `custom-commands`, `configuration`

---

## Use the Explore Sub-Agent for Codebase Search

The Explore agent is a specialized read-only file search agent. Use it for: "quickly find files by patterns (e.g., `src/components/**/*.tsx`), search code for keywords (e.g., 'API endpoints'), or answer questions about the codebase."

Specify thoroughness levels:
- `"quick"` -- basic searches
- `"medium"` -- moderate exploration
- `"very thorough"` -- comprehensive analysis

The Explore agent starts with a fresh context (unlike general-purpose and plan agents which inherit full context), making it appropriate for independent search tasks.

**Category:** `sub-agents`, `codebase-navigation`

---

## Have the Main Agent Read Files Directly, Not Just Summaries

"It's important that the model goes through each of the relevant files itself so that all that ingested context can attend to each other." Avoid relying solely on Explore agent summaries -- have the main agent read relevant files directly for better reasoning. This ensures all the ingested context can cross-reference properly within the model's attention mechanism.

**Category:** `sub-agents`, `context-management`, `prompting`

---

## Override Sub-Agent Model Selection

Tell Claude "Launch explore agent with Sonnet 4.5" to override the default Haiku model. The main agent detects intent and includes the `model` parameter in the tool call. Available model options: `"sonnet"`, `"opus"`, `"haiku"`.

**Category:** `sub-agents`, `configuration`

---

## Use Background Agents for Long-Running Tasks

Use the `run_in_background` parameter for long-running tasks, debugging, or log monitoring. This is particularly helpful for Python scripts requiring observation, or any process where you need to maintain visibility into process health during extended operations.

**Parameter:** `run_in_background: true`

**Category:** `sub-agents`, `background-tasks`, `debugging`

---

## Create Custom Sub-Agents

Create custom sub-agents at `.claude/agents/your-agent-name.md` with name, instructions, and allowed tools. An easier approach: use the `/agents` command to manage and create agents automatically.

**Path:** `.claude/agents/your-agent-name.md`
**Command:** `/agents`

**Category:** `sub-agents`, `custom-commands`, `configuration`

---

## Follow Best Practices When Launching Sub-Agents

When launching sub-agents via the Task tool:
- Include a 3-5 word description of the task
- Provide clear, detailed prompts for autonomous work
- Launch multiple agents concurrently when possible
- Use the optional `model` parameter: `"sonnet"`, `"opus"`, or `"haiku"`
- Set `run_in_background: true` for monitoring tasks
- Use the `resume` parameter with an agent ID to continue from a previous execution

**Category:** `sub-agents`, `prompting`

---

## Know When NOT to Use the Task Tool

Don't use the Task tool for:
- Reading specific file paths (use Read/Glob instead)
- Searching for specific class definitions (use Glob instead)
- Searching within 2-3 specific files (use Read instead)
- Non-agent tasks that don't require autonomous reasoning

**Category:** `sub-agents`, `anti-patterns`

---

## Understand Token Efficiency and Context Consumption

Recognize that "both the tool call and the tool call outputs are added to the context" because LLMs are stateless. Tool results quickly consume available context. Manage this carefully with large codebases. Every tool invocation adds to the growing context, making agents expensive in terms of token usage.

**Category:** `context-management`, `cost-optimization`

---

## Use System Reminders to Combat Context Degradation

System reminders are recurring prompts automatically injected to combat context degradation. These appear in `<system-reminder>` tags throughout the conversation. They re-inject objectives into the recent attention span, avoiding "lost-in-the-middle" issues where the model loses track of earlier instructions as context grows.

**Category:** `context-management`, `prompting`

---

## Use the Todo List Pattern for Long Tasks

Create and update `todo.md` files during complex tasks. "By constantly rewriting the todo list, Manus is reciting its objectives into the end of the context." This is a deliberate manipulation of attention -- by placing objectives at the end of the context window, it reduces goal misalignment in long contexts. The todo file serves dual purposes: preserving state and maintaining model focus.

**Category:** `context-management`, `workflow`, `prompting`

---

## Understand Context Degradation

Performance degrades with token length, not task difficulty. The model has a limited "attention budget" that makes modeling distant token relationships harder as context grows. This means even simple tasks can fail if they occur late in a long conversation. Plan accordingly by starting fresh for critical work.

**Category:** `context-management`, `mental-model`

---

## Be Selective About MCP Server Connections

"Tool definitions are loaded upfront into the context window," bloating it. Multiple MCP servers compound this problem. Be selective about which MCP connections are active to avoid unnecessary context consumption from tool definitions you don't need for the current task.

**Category:** `mcp`, `context-management`, `configuration`

---

## Prefer Code APIs Over Tool Definitions in MCP

Instead of defining dozens of individual tools via MCP, expose code APIs and give Claude a sandbox environment. "Let it write code to make the tool calls" rather than loading many tool definitions into context. This reduces context bloat from tool definitions while maintaining flexibility.

**Category:** `mcp`, `context-management`, `architecture`

---

## Create Skills for On-Demand Domain Expertise

Create a folder with a `SKILL.md` file containing metadata, referenceable files, and code scripts. "Meta-data is added to system prompt. If Claude feels the skill is relevant, it will perform a tool call to read the contents."

Key guidelines:
- Keep `SKILL.md` under 500 lines per Anthropic recommendations
- Divide large instructions into separate files if needed
- Skills load on-demand when relevant, avoiding constant context bloat
- This reduces the need to include all domain expertise in the system prompt upfront

**Category:** `skills`, `configuration`, `context-management`

---

## Use Plugins to Bundle and Distribute Capabilities

Plugins bundle skills, slash commands, sub-agents, hooks, and MCP servers into distributable units. Install via `/plugins`. Use namespacing to avoid conflicts (e.g., `/my-plugin:hello`).

**Command:** `/plugins`

**Category:** `plugins`, `configuration`, `distribution`

---

## Combine Skills with Hooks for Sophisticated Automation

Use hooks to remind the model about relevant skills. A referenced Reddit post describes dividing instructions into skill files combined with hooks to reduce `CLAUDE.md` size significantly. This creates a layered system where hooks trigger skill loading at the right moments.

**Category:** `skills`, `hooks`, `automation`

---

## Use Hooks for Automation at Agent Lifecycle Points

Available hooks:
- `Stop` -- Runs after Claude finishes responding
- `UserPromptSubmit` -- Runs before Claude processes the user prompt

Hook use cases:
- Play a notification sound when Claude stops (inspired by Cursor)
- Run "Do more" prompts via the Stop hook to keep Claude running autonomously
- Combine with skills/reminders for sophisticated automation

Hook bash scripts execute before/after agent loop stages, enabling system state changes and automation triggers.

**Category:** `hooks`, `automation`, `configuration`

---

## Keep CLAUDE.md Concise, Use Skills for Depth

Store codebase instructions and user-specific guidelines globally or per-project in `CLAUDE.md`. Include high-level architecture, naming conventions, and project-specific patterns. But keep it concise -- use skills for domain expertise that goes beyond basic project context. This prevents system prompt bloat while maintaining essential project guidance.

**Category:** `claude-md`, `configuration`, `context-management`

---

## Micro-Manage During Execution After /ultrathink

After approving an `/ultrathink` plan, closely monitor changes while executing. This enables catching divergences from requirements immediately, rather than discovering problems after the entire task is complete.

**Category:** `workflow`, `debugging`, `quality`

---

## Use Prompt Suggestions for Guidance

Version 2.0.73+ provides prompt suggestions that offer decent predictions for next actions. Browse these suggestions to guide next steps naturally rather than having to formulate every prompt from scratch.

**Category:** `productivity`, `quality-of-life`

---

## Understand Ask Mode Interaction Options

When Claude asks questions, a third option allows: "Type here to tell Claude what to do differently." All ask-mode options are parsed model outputs displayed via tool call, giving you control over the direction of the conversation.

**Category:** `interaction`, `workflow`

---

## Leverage the Feedback UI

Claude Code 2.0 includes an elegant non-intrusive feedback collection system with keystroke responses:
- `1` = Bad
- `2` = Fine
- `3` = Good
- `0` = Dismiss

**Category:** `quality-of-life`, `feedback`

---

## Use Ctrl+R for Cross-Project Prompt History Search

`Ctrl+R` searches across project-wide conversations. Cycle through results with repeated keypresses for fast prompt recovery. This is invaluable for reusing effective prompts across sessions.

**Category:** `shortcuts`, `productivity`

---

## Take Advantage of Faster Fuzzy File Search

Fuzzy file search in version 2.0.72+ is 3x faster than previous versions. Supports pattern matching for quick file location.

**Category:** `quality-of-life`, `codebase-navigation`

---

## Use Spec-Based Development with Claude Interviews

Start with a minimal spec. Have Claude interview you using `AskUserQuestionTool` to clarify requirements. Then execute in a new session with the complete spec. This separates the requirements-gathering phase from the implementation phase, leading to better results.

**Category:** `workflow`, `prompting`, `requirements`

---

## Create Background Agents for Stakeholder Explanations

Create background async agents to explain changes to non-technical stakeholders. This leverages Claude's superior communication abilities for documentation and explanation tasks that don't require your direct attention.

**Category:** `sub-agents`, `communication`, `workflow`

---

## Understand Opus 4.5's Strengths

Opus 4.5 advantages:
- Faster execution with comparable code-generation to GPT-5.1-Codex
- Better communicator and pair-programmer than alternatives
- Superior intent detection and collaborative ability
- "Faster not only in terms of lesser thinking to perform task but throughput wise also, it unlocks much faster feedback loops for your tasks."
- Exhibits more personality and "soul" compared to earlier versions
- Preferred for customized prompt refinement due to writing quality

**Category:** `model-selection`, `mental-model`

---

## Be Cautious with Sonnet 4.5 Output Quality

Sonnet 4.5 can produce "haphazard changes which would lead to bugs." This requires close review and micro-management during execution. Be aware of this tendency and plan for additional review time when using Sonnet.

**Category:** `model-selection`, `anti-patterns`, `quality`

---

## Limit Parallel Sub-Agents to Avoid Flickering

Running many parallel sub-agents (e.g., 10+) causes a "Claude Code flickering bug." Limit parallel spawning or accept visual glitches. A bootstrap repo command that uses 10 parallel sub-agents demonstrates this issue.

**Category:** `sub-agents`, `anti-patterns`, `bugs`

---

## Don't Rely on Full Context Window Capacity

Don't assume full context window effectiveness. Effective context is typically 50-60% of stated maximum. Plan critical features with fresh context, not mid-conversation after 100+ messages. Context rot at scale means performance degrades regardless of task difficulty.

**Category:** `context-management`, `mental-model`, `anti-patterns`

---

## Invest in Domain Expertise for Better Prompting

"The more you know, the better you can prompt -- converting unknown unknowns to known unknowns." Domain depth enables superior task direction. Your expertise determines the quality of guidance you can give the model.

**Category:** `prompting`, `skill-building`

---

## Shift Focus to Software Engineering Practices

"Since implementation is much faster now, you can spend more time on taste refinement." With AI handling more implementation, shift focus toward: system design, planning, requirements analysis, good naming, refactoring, docs, tests, and typed annotations. These higher-level skills become more valuable as coding speed increases.

**Category:** `skill-building`, `workflow`, `philosophy`

---

## Experiment Beyond Perceived Model Limitations

Try tasks you think models can't handle. Develop intuition through repeated interaction with state-of-the-art models. "You will be surprised." The only way to calibrate your expectations is through hands-on experimentation.

**Category:** `skill-building`, `prompting`, `philosophy`

---

## Improve Writing and Communication Skills

Improving articulation via writing helps with prompting. Better communication translates directly to better prompts. Consider speech-to-text tools for faster input to reduce the friction of crafting detailed prompts.

**Category:** `skill-building`, `prompting`

---

## Stay Updated with Rapidly Evolving Tooling

Regularly use the tools and track releases. "The technology is evolving at a mindblowing pace" requiring continuous engagement. Features like syntax highlighting, fuzzy search improvements, and prompt suggestions are added frequently.

**Category:** `skill-building`, `tooling`

---

## Use Codex Configuration for Verbosity

Codex supports `.codex/config.toml` with options including verbosity levels. Set `global verbosity = high` for more detailed explanations from the model.

**Config:**
```toml
[global]
verbosity = "high"
```

**Path:** `.codex/config.toml`

**Category:** `configuration`, `multi-model`

---

## Understand the Stateless Nature of LLMs

Both the tool call and the tool call outputs are added to the context because LLMs are stateless. There is no persistent memory between turns -- everything the model "knows" must be present in the current context window. This fundamental understanding shapes how you should structure long-running tasks, manage context, and decide when to start fresh.

**Category:** `mental-model`, `context-management`

---

## Use the Resume Parameter for Sub-Agent Continuity

When working with sub-agents, use the `resume` parameter with an agent ID to continue from a previous execution. This allows picking up where a sub-agent left off rather than starting from scratch.

**Parameter:** `resume: <agent-id>`

**Category:** `sub-agents`, `workflow`

---

## Use /usage and /stats for Monitoring

- `/usage` -- Display subscription usage metrics
- `/stats` -- Show statistics about the current session

These commands help you track your consumption and session performance.

**Commands:** `/usage`, `/stats`

**Category:** `monitoring`, `commands`
