# Context Management

## Purpose

Context is Claude Code's most precious resource. The model has a 200k token window, but effective capacity is typically only 50-60% of that due to system prompts, tool definitions, and compaction buffers. Performance degrades with token length, not task difficulty -- even simple tasks can fail late in a long conversation. Managing context well is the difference between consistent quality and frustrating drift.

As one widely-shared community post puts it: "You should think of everything in your context as either signal or noise. LLMs do best when the context window is densely packed with signal. And what was signal 5 prompts ago is now noise." (r/ClaudeCode, score 351)

## How It Helps

- Prevents quality degradation caused by long, unfocused conversations
- Reduces token costs by 30-50% through strategic compaction and clearing
- Maintains model focus on the current task rather than irrelevant history
- Enables multi-day and multi-session workflows through handoff documents
- Prevents "lost-in-the-middle" issues where the model loses track of earlier instructions

## What You Can Do

### Start Fresh for Each Task

The single most important habit: one task per session. Do not batch unrelated tasks. Complete one task, then `/compact` or `/clear` before starting the next. Each task gets focused context.

```
/clear
```

Use `/clear` when:
- Switching to unrelated projects
- Significant context pollution has occurred
- You need a fresh design without prior bias
- After completing a feature

### Compact Strategically

```
/compact Focus on preserving our current authentication implementation and the database schema decisions we've made.
```

Use `/compact` when:
- Transitioning between major tasks
- After long debugging sessions
- Before adding large files to make room in context
- Responses slow down or accuracy decreases
- Token usage exceeds 50K

**Compact with specifics:** Tell `/compact` what to preserve. Without guidance, it decides what matters, which may not match your priorities.

**Rule of thumb:** Compact after every major task completion.

### Monitor Context Usage

```
/context
```

Use the `/context` command to visualize token allocation mid-session. A fresh monorepo session typically consumes ~20k tokens (10% of the 200k window) as baseline, leaving roughly 180k for actual work. Start compaction or a new session when reaching 60% capacity on complex builds.

**Community recommendation: set a hard 40-50% context ceiling.** A highly-upvoted guide (score 351) recommends never exceeding 40-50% of your context window and expecting good results. Beyond this point, context rot becomes significant -- the model struggles to distinguish relevant from irrelevant history. Users who disabled auto-compact and pushed to 100% report severe quality degradation. One commenter describes the practice as "force feeding your agent Mountain Dew and expecting it to piss champagne."

**Visual context monitoring tools** like `ccstatusline` display the current context percentage in your terminal status bar. Some users build custom indicators with color coding (green at low usage, gray at 75k, red with a warning at 66% capacity). Being intentional about context usage directly correlates with output quality.

### Create Handoff Documents

Before starting a fresh conversation on an ongoing project, create a handoff document that preserves critical context:

1. Ask Claude to export current progress and findings to a markdown file
2. Run `/clear`
3. Restart with the documented context as input

Create a `/handoff` custom command to standardize this process. The handoff document should include:
- Work completed so far
- Key decisions made and their rationale
- What succeeded and what failed
- Next steps and remaining work

**Community-tested variant using task lists:** Start Claude with `CLAUDE_CODE_TASK_LIST_ID=my-project-name claude` to persist tasks in an external task list that is not scoped by session ID. When you `/clear` (which changes the session ID), Claude still knows where to find the old tasks. This eliminates the manual step of copying task state to a file before clearing. (r/ClaudeCode, u/creegs)

**The .md-based handoff (classic approach):** Tell Claude to write your plan, progress, insights, and lessons learned to a temporary .md file. Copy the file path to your clipboard, `/clear`, then tell Claude to read that file and reconstruct the task list. If you have been updating the file throughout the session, it will be full of dense signal and you will be in a strong position to continue. (r/ClaudeCode, score 351)

### The Checkpoint Pattern

For extended work sessions:

1. Work for 30-60 minutes
2. Run `/compact`
3. Copy the summary to project documentation
4. Continue working

### Fork and Clone Conversations

- `/fork` -- Create an in-session fork to explore different approaches
- `--fork-session` with `--resume` or `--continue` -- Fork from the CLI
- **Half-clone:** Keep only recent context when forking, discarding older history

Shell alias for easier forking:
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

### Session Management

```bash
/resume <name>           # Resume a session by name
/rename                  # Give the current session a memorable name
/stats                   # View usage graphs and session history
```

Name sessions for easy identification and resumption later. Use `/resume` to return to previous conversations.

### The /clear + /catchup Pattern

For simple context resets when you want to keep awareness of recent work:

1. `/clear` -- Reset conversation state
2. `/catchup` -- A custom command that reads all changed files in the current git branch, quickly re-establishing relevant context

### Avoid Wasting Tokens on Throwaway Messages

A viral post titled "Went from 0% to 7% usage by saying thanks" (score 278) highlights a fundamental aspect of how context works that many users miss:

**Every message resends the entire conversation context.** When you type a single word in a long conversation, the entire accumulated context (potentially 180k+ tokens) is resent as input tokens. The cost is not the word you typed -- it is the entire conversation being reprocessed. A 1-word message in a 100k-token conversation costs ~100k input tokens, not 1 token.

Practical implications:

- **Never send standalone "thanks" or "ok" messages.** If you want to acknowledge and move on, combine it with your next instruction: "Thanks! Now let's move to X..." This amortizes the per-message cost across useful work.
- **Reduce unnecessary back-and-forth.** Batch instructions into fewer, more substantive messages rather than having a chatty exchange.
- **"Cold start" / "startup tax" is real.** The first message of any session triggers loading of system prompts, CLAUDE.md, MCP server headers, skills, and other bootstrapping context. This alone can consume 2-10% of your session quota before you ask a real question.
- **Cache expiration matters.** Anthropic caches input tokens, but the cache expires after roughly 5 minutes of inactivity. If you step away and come back, all input tokens are treated as fresh, costing more. On the API, cached reads cost 1/10th the price of uncached.
- **MCP servers silently inflate starting context.** Each installed MCP server loads header data into context at session start. Use `/context` to audit what is loaded and trim MCP servers you do not actively need.

### Opus 4.6: Context Management Considerations

Opus 4.6 introduced improvements in orchestration and agent capabilities, but also brought new context management challenges that the community is actively navigating:

- **Higher token consumption per request.** Extended thinking and agent orchestration cause Opus 4.6 to burn through quotas faster than 4.5. Users report a single complex plan-mode request consuming 10-15% of Pro plan quota, and agent teams consuming 20% of Max 5x quota for a single analysis task.
- **Agent teams vs. subagents (critical distinction).** Agent teams burn tokens fast due to context duplication (6 agents = 6x burn + supervisor overhead). Subagents are significantly more token-efficient for most tasks. One user launched 5 agent-team members for a planning task and consumed 20% of their Max 5x quota in 5 minutes -- Opus 4.6 itself advised switching to subagents instead.
- **The Opus-plans-Sonnet-executes pattern.** The dominant token-saving strategy: use Opus 4.6 in `/plan` mode for reasoning and architecture, then switch to `/model sonnet` (or even Haiku) for implementation. With well-specified plans and atomic tasks, Haiku can handle execution -- a "seriously slept on token economy hack."
- **Without a plan, reasoning tokens spiral.** Users report that Opus 4.6 without a plan fills up context with circular reasoning tokens far more than 4.5 did. Always plan first, then execute.
- **Compaction timeouts on long sessions.** Some users report hitting compaction timeouts 2-3 times per hour on extended coding sessions, which breaks flow. Frequent proactive clearing is the mitigation.

## Details

### Why Context Degrades

LLMs are stateless. Both tool calls and their outputs are added to the context because there is no persistent memory between turns. The model has a limited "attention budget" that makes modeling distant token relationships harder as context grows. This is not about task difficulty -- it is about token distance.

**Warning signs you need /compact:** Responses take >10 seconds, Claude repeating itself, token usage >50K.

**Warning signs you need /clear:** References to outdated decisions, conflicting advice, switching projects.

### Auto-Compact Buffer Sizes

Auto-compact reserves a buffer for conversation compression:
- Default buffer: 32k tokens (22.5% of the 200k context window)
- With `CLAUDE_CODE_MAX_OUTPUT_TOKENS` set to 64k: buffer increases to ~40% of available context

Be aware: setting maximum output tokens reduces available conversation space significantly. The default 32k is a reasonable balance for most workflows.

```bash
# Only set this if you specifically need longer outputs
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=64000
```

### The Skeptical View on Auto-Compaction

One enterprise author describes `/compact` as "opaque, error-prone, and not well-optimized." The recommendation: use explicit context management (handoff documents, `/clear` + `/catchup`) rather than relying on automatic compaction for critical work. Manual control over what gets preserved produces more reliable results.

### Subagents as a Context Management Strategy

Subagents are not just a parallelism tool -- they are a context hygiene tool. Each subagent gets its own context window and does not pollute the main agent's context. This keeps your primary session clean for high-level direction while offloading detail-heavy work.

Community-tested patterns:

- **Use subagents for EVERYTHING, not just exploration.** Implementation, testing, code review -- all can be delegated to subagents to keep the main context focused on coordination. (r/ClaudeCode, u/creegs)
- **Create a skill to deploy scout subagents.** One user created a custom command that launches subagents to investigate code, then reports back to the main agent for planning. The main context stays clean and fills up slowly. (r/ClaudeCode, u/Kasempiternal)
- **Be careful with backgrounding multiple subagents.** While subagents are context-efficient, backgrounding many of them can fill up the parent's context window with their output. Monitor your main session usage.
- **Subagents are context-efficient but token-inefficient (short term).** Each subagent rebuilds its own context from scratch, which costs tokens upfront but saves the main session from degradation.

### Compaction vs. Context Rot

A counter-argument worth noting: one user who runs single sessions for 12-16 hours daily claims "context rot doesn't exist" and that the real issue is ill-timed compaction, not context length per se. While this is a minority position, it suggests that compaction artifacts may sometimes be confused with inherent context degradation. The practical takeaway: when sessions degrade, try starting fresh before assuming the model is at fault. (r/ClaudeCode, u/OkLettuce338)

### System Reminders Combat Drift

System reminders are recurring prompts automatically injected into the conversation to combat context degradation. They re-inject objectives into the recent attention span, avoiding "lost-in-the-middle" issues where the model loses track of earlier instructions.

### The Todo List Pattern

For long-running tasks, create and continuously update a `todo.md` file. By constantly rewriting the todo list, objectives are placed at the end of the context window where they receive the strongest attention. This serves dual purposes: preserving state and maintaining model focus.

### Context Budget at a Glance

| Component | Approximate Tokens | % of 200k |
|-----------|-------------------|-----------|
| System prompt (default) | ~18,000 | 9% |
| System prompt (optimized) | ~10,000 | 5% |
| Auto-compact buffer | ~32,000 | 16% |
| CLAUDE.md + rules | 2,000-5,000 | 1-2.5% |
| MCP tool definitions | 16,000-60,000 | 8-30% |
| **Available for work** | **~95,000-140,000** | **47-70%** |

### Conversation History Search

Past conversations are stored locally in `~/.claude/projects/` as `.jsonl` files. Folder names are based on the project path with slashes replaced by dashes.

```bash
# Search for a keyword across all conversations
grep -l -i "keyword" ~/.claude/projects/-Users-yk-Desktop-projects-*/*.jsonl

# Extract user messages from a conversation
cat conversation.jsonl | jq -r 'select(.type=="user") | .message.content'
```

## Sources

- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://sidbharath.com/claude-code-the-complete-guide/
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://www.builder.io/blog/claude-code
- [r/ClaudeCode - "Before you complain about Opus 4.5 being nerfed"](https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/) (score 351)
- [r/ClaudeCode - "Went from 0% to 7% usage by saying thanks"](https://www.reddit.com/r/ClaudeCode/comments/1q9jzvd/went_from_0_to_7_usage_by_saying_thanks/) (score 278)
- [r/ClaudeCode - "Opus 4.6 is" (experience thread)](https://www.reddit.com/r/ClaudeCode/comments/1qx76jb/opus_46_is/) (score 245)
- [r/ClaudeCode - "My personal CC setup"](https://www.reddit.com/r/ClaudeCode/comments/1qwcg0g/my_personal_cc_setup_not_a_joke/) (score 422)
- [r/ClaudeCode - "13 no-bs lessons from 1+ year of 100% AI code"](https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/ive_used_ai_to_write_100_of_my_code_for_1_year_as/) (score 670)
