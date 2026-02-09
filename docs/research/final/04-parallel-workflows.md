# Parallel Workflows

## Purpose

Running multiple Claude Code instances simultaneously is how power users scale from "10x developer" to "operating at a completely different scale." Boris Cherny, the creator of Claude Code, routinely runs 5 local sessions and 5-10 remote sessions. The key is proper isolation between sessions to prevent conflicts and context pollution.

## How It Helps

- Multiplies throughput by working on several tasks concurrently
- Eliminates waiting -- start the next task while Claude finishes the current one
- Enables a "manager" workflow where you review and steer rather than implement
- Different isolation strategies (worktrees, clones, subagents) suit different scenarios
- Background tasks and async subagents keep the main session responsive

## What You Can Do

### Terminal Tabs for Simple Parallelism

Open multiple Claude Code sessions in different terminal tabs. Each operates independently with its own context. Use a "cascade" approach: open new tabs to the right, sweep left to right reviewing output.

Practical limit: 3-4 concurrent tasks before review becomes difficult.

### Git Worktrees for Branch Parallelism

Use `git worktree` to maintain multiple branches simultaneously in different directories:

```bash
cd finance-tracker

# Create worktrees for parallel features
git worktree add ../finance-tracker-budgets -b feature/budget-system
git worktree add ../finance-tracker-reports -b feature/reporting-dashboard

# List all worktrees
git worktree list
```

Run independent Claude Code instances in each:

```bash
# Terminal 1
cd ../finance-tracker-budgets && claude

# Terminal 2
cd ../finance-tracker-reports && claude

# Terminal 3 (main development)
cd finance-tracker && claude
```

Each instance maintains independent context. No merge conflicts from parallel work on different files. Combine with `tmux` for managing multiple terminal sessions.

### Separate Git Clones for Full Isolation

Boris Cherny's approach: use separate `git checkout` directories rather than worktrees or branches. This provides complete filesystem isolation between sessions.

Another author echoes this preference: "Use two separate clones instead of git worktrees for isolation -- simpler to manage, avoids the cognitive overhead of worktree configs."

```bash
# Clone the repo multiple times
git clone repo-url project-clone-1
git clone repo-url project-clone-2

# Run Claude in each
cd project-clone-1 && claude
cd project-clone-2 && claude
```

Expect 10-20% of parallel sessions to be abandoned due to unexpected scenarios -- this is normal and factored into the approach.

### Subagents for Same-Branch Parallelism

Use subagents for concurrent tasks on the same branch, particularly effective for read-only operations and tasks with clear component boundaries:

```bash
/agents
```

- Launch multiple subagents from Skills for orchestrated parallel work
- Send subagents to background with `Ctrl+B` to continue main session work
- Async subagents (v2.0.60+) execute in the background and notify on completion
- Invoke multiple subagents simultaneously for independent analysis (security audit + test generation + performance review)

### Subtask: Worktree-Based Parallel Agents with TUI

Subtask is a dedicated CLI + Skill that gives Claude Code the ability to create tasks, spawn subagents in isolated git worktrees, track progress, review diffs, and request changes -- all managed through a terminal UI.

**Install:** https://github.com/zippoxer/subtask

**How it works:**
1. Talk with Claude about what you want done, ask it to load the Subtask skill
2. Claude creates tasks and spawns subagents, each in its own git worktree
3. Subagents run as background commands (Claude Code supports this natively) -- Claude gets notified when they finish and can react without human involvement
4. Claude can interrupt and communicate with subagents mid-task
5. Run `subtask` in another terminal to open the TUI showing progress, diffs, and conversations

**Key design choices:**
- **Codex vs Claude Code subagents:** The author prefers Codex subagents for implementation because "they're more reliable for long or complex tasks, and more likely to do what you asked rather than inventing creative shortcuts." Claude Code works as subagents too.
- **VS Code limitation:** Claude Code in VS Code does not yet have background terminals, so subagents block sequentially. The terminal CLI is recommended for parallel execution.
- **No init required:** Works in any git repo, even from subdirectories.

**Throughput:** The author reports ~60 tasks merged in a single week using this workflow, building Subtask itself with Subtask.

**Token considerations:** One user reported burning 10% of their weekly Max5 quota during a testing session. Running multiple parallel agents consumes quota rapidly.

### Agent Teams (Experimental Feature)

Agent Teams is a first-party Claude Code feature (experimental) that goes beyond simple subagents. It enables 3-5 independent Claude Code instances to collaborate on the same project with shared context, direct messaging, and coordinated task management.

**Enable Agent Teams:**

```json
// ~/.claude/settings.json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

**How it differs from regular subagents:**

| Aspect | Old Subagent Model | Agent Teams |
|--------|-------------------|-------------|
| Communication | Summary returned on completion | Direct messages and broadcasts between agents in real time |
| Context sharing | Isolated; only summary comes back | Shared task lists, inbox messages injected into conversation |
| Lifecycle | Spins up, works, terminates | Explicit startup, shutdown, and coordination phases |
| Coordination | None | Agents claim tasks, update status, debate approaches |

**Internal tools used by Agent Teams:**
- **TeamCreate** -- sets up team scaffolding under `.claude/teams/`
- **TaskCreate** -- adds tasks as JSON files with status tracking and dependencies
- **taskUpdate** -- agents claim tasks, update status, mark done
- **sendMessage** -- direct messages (agent to agent) or broadcasts (agent to all); messages written to `.claude/teams/<team_id>/inbox/`

**Best use cases:**
- **Deep debugging with multiple hypotheses** -- spawn agents to investigate different theories, have them debate and disprove each other
- **Complex system design with competing requirements** -- subsystem agents negotiate trade-offs autonomously (demonstrated in a hardware feasibility study where agents designed power delivery, signaling, memory, and thermal subsystems, then negotiated conflicting requirements)
- **Code auditing against documentation** -- fast and effective, but token-heavy

**Setup for best experience:**
- Use tmux or iTerm2 to see all agents working in parallel: `claude --teammate-mode tmux`
- For iTerm2: enable Python API under Settings > General > Magic
- Use mosh instead of SSH for remote access to avoid dropped sessions
- Make CLAUDE.md extremely specific before spawning a team -- each teammate reads it independently, so vague instructions get amplified

**Architecture patterns from the community:**
- **Hub and spoke:** 1 leader/decision maker that only delegates and does not write code. Add a "coach" agent that evaluates feedback to improve other agents after project completion.
- **Task dependency state machine:** pending -> ready -> claimed -> in_progress -> complete. Only mark tasks as "ready" once all blockers are resolved. Add heartbeat/timeout monitoring to catch stuck agents.
- **Specify models per agent:** Not every agent needs Opus; Sonnet is sufficient for many roles, saving significant tokens.

**Caveats:**
- Token consumption is significantly higher -- one user reported 367k tokens for a task that would take 30k sequentially (12x overhead)
- Context window limits constrain how much "discussion" agents can have before hitting limits
- Headless mode is reported to crash or hang ~50% of the time
- For simpler tasks, may feel like "subagents with extra steps" -- the real value is in complex coordination scenarios

### Background Tasks

Execute long-running operations asynchronously:

- Use the `run_in_background` parameter for long-running tasks, debugging, or log monitoring
- Prefix prompts with `&` to send tasks to Claude Code on the Web for remote sandbox execution (v2.0.45+)
- Use `--teleport` to move sessions between local and remote environments

```bash
# Send task to web for remote execution
& Refactor the authentication module

# Teleport a remote session back to local
claude --teleport session_abc123

# View running sessions
/tasks    # then press 't' to teleport into one
```

### Parallel Scripting with the SDK

For large-scale batch operations (refactors, migrations), use `claude -p` in parallel bash scripts:

```bash
# Run multiple claude instances in parallel
claude -p "in /pathA change all refs from foo to bar" &
claude -p "in /pathB change all refs from foo to bar" &
claude -p "in /pathC change all refs from foo to bar" &
wait
```

This is more scalable than interactive chat delegation because it prevents agents from overwriting concurrent edits.

### VS Code Extension as Parallel Launcher

Install the Claude Code extension for VS Code (also works in Cursor and Windsurf). Use it as a launcher for running multiple Claude Code instances in parallel across different sections of your codebase.

## Details

### Which Isolation Strategy to Choose

| Strategy | Best For | Isolation Level | Setup Effort |
|----------|----------|----------------|-------------|
| Terminal tabs | Independent tasks, same repo | Session only | None |
| Git worktrees | Feature branches, parallel development | Branch + directory | Low |
| Separate clones | Maximum isolation, complex repos | Full filesystem | Medium |
| Subagents | Read-heavy tasks, same branch | Context window | None |
| Subtask | Multi-task parallel dev with TUI monitoring | Worktree per task | Low |
| Agent Teams | Complex coordination requiring debate/messaging | Shared context + messaging | Medium |
| Web sessions (`&`) | Long-running tasks, offloading | Full remote sandbox | None |
| SDK (`claude -p`) | Batch operations, migrations | Process-level | Low |
| GSD wave execution | Multi-phase projects with dependencies | Fresh subagent per plan | Low |

### Parallel Session Workflow (Practical Example)

1. Open 2-3 Claude Code sessions in separate terminals
2. Voice-assign each session a task (using tools like Wispr Flow)
3. Switch between sessions reviewing output
4. Approve or reject by voice
5. Commit and move on

One author reports: "My hands are for code review. That's it." Writing 10-20 lines of code per day by hand while Claude writes thousands.

### Async Subagent Caveats

- Running many parallel sub-agents (10+) causes a "Claude Code flickering bug" in the terminal
- Limit parallel spawning or accept visual glitches
- Subagents return summarized results, not full context -- have the main agent read relevant files directly when deep reasoning is needed

### Wave-Based Parallelism (GSD Pattern)

GSD implements a wave-based parallel execution pattern worth understanding even outside the GSD framework:

- During planning, tasks are pre-assigned wave numbers based on dependencies
- Wave 1: [plan-01, plan-02, plan-03] -- 3 agents in parallel
- Wave 2: [plan-04, plan-05] -- 2 agents in parallel (waits for wave 1)
- Wave 3: [plan-06] -- 1 agent
- A 6-plan phase runs in 3 rounds instead of 6
- Each subagent gets a fresh 200k context window, keeping quality consistent across all plans
- The orchestrator stays at ~10-15% context usage and never executes code itself

This pattern can be replicated manually by structuring your own task lists with dependency annotations and spawning subagents accordingly.

### Case Study: 16 Parallel Agents Building a C Compiler

Anthropic published an engineering blog post describing an experiment where 16 Opus 4.6 instances worked in parallel for two weeks to build a Rust-based C compiler that can compile the Linux kernel. Key architectural insights for parallel workflows:

**Infinite loop agent spawning:** A bash loop continuously spawns new Claude Code sessions in fresh containers. Each session clones the repo, performs a task, and pushes changes. This avoids context window exhaustion and enables indefinite autonomous operation.

**File-based task locking:** Agents claim tasks by writing text files to a `current_tasks/` directory in git. Git's synchronization naturally prevents duplicate work -- when two agents try to claim the same task, the second push fails and the agent selects a different task. This is a lightweight coordination mechanism requiring no external tooling.

**Oracle-based parallel decomposition:** When all 16 agents converged on the same monolithic bug (compiling the Linux kernel), the solution was to use GCC as a known-good "oracle" to randomly compile subsets of files, isolating failures to specific files. Each agent could then work on different failing files in parallel.

**Role specialization:** Not all agents worked on the primary task. Some handled code deduplication, performance optimization, design critique, code quality review, and documentation maintenance.

**Environmental design for agents:**
- Extensive README files so agents can orient themselves in new sessions
- Minimized terminal output noise to avoid polluting context windows
- Pre-computed summary statistics rather than having agents recompute them
- `--fast` test options that sample subsets, with randomization ensuring coverage across multiple agents

**Scale:** ~2,000 Claude Code sessions, 2 billion input tokens, 140 million output tokens, ~$20,000 in API costs, 100,000 lines of Rust output, 99% pass rate on GCC torture test suite.

### Multi-Agent Orchestration Tooling

Several community tools facilitate managing multiple parallel Claude Code instances:

| Tool | Description | Link |
|------|-------------|------|
| **Claude Squad** | Terminal app managing multiple Claude Code/Codex agents in separate workspaces | https://github.com/smtg-ai/claude-squad |
| **Claude Swarm** | Launch a Claude Code session connected to a swarm of Claude Code agents | https://github.com/parruda/claude-swarm |
| **Happy Coder** | Spawn and control multiple Claude Codes in parallel from phone or desktop, with push notifications | https://github.com/slopus/happy |
| **Crystal** | Desktop app for orchestrating, monitoring, and interacting with Claude Code agents | https://github.com/stravu/crystal |
| **TSK** | Rust CLI delegating tasks to AI agents in sandboxed Docker environments, returning git branches | https://github.com/dtormoen/tsk |
| **viwo-cli** | Run Claude Code in Docker with git worktrees as volume mounts for safe parallel one-shotting | https://github.com/OverseedAI/viwo |
| **Container Use** | Dev environments for coding agents enabling multiple agents to work safely and independently | https://github.com/dagger/container-use |

### Cowork + Claude Code: Two-Agent Supervisory Pattern

An alternative parallel pattern uses Claude Cowork as a supervisory layer over Claude Code. Rather than parallelizing implementation, this parallelizes the research/planning and execution concerns:

- Cowork browses the internet, researches the problem, and writes structured prompts with exact paths, explicit constraints, and clear success criteria
- Claude Code executes those prompts in the terminal
- When the two agents disagree, users report Cowork catches common-sense errors that Claude Code misses due to narrow context focus

This pattern doubles token consumption but can break through blockers where a single Claude Code session gets stuck in a debugging loop. It is particularly effective for non-technical users who struggle to articulate implementation details directly.

### Swarming (Coming in 2026)

Anthropic has confirmed enhanced "Swarming" capabilities as a focus area for 2026, building on async subagent foundations. Discussed at the Claude Code Meetup in Tokyo.

## Sources

- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://medium.com/@shivang.tripathii/how-i-use-claude-code-to-maximize-productivity-c853104804d6
- https://sidbharath.com/claude-code-the-complete-guide/
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://www.builder.io/blog/claude-code
- https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qhzagf/subtask_claude_code_creates_tasks_and_spawns/ (Subtask worktree-based parallel agents)
- https://www.reddit.com/r/ClaudeCode/comments/1qz8tyy/how_to_set_up_claude_code_agent_teams_full/ (Agent Teams walkthrough)
- https://www.reddit.com/r/ClaudeCode/comments/1qwuqk9/we_tasked_opus_46_using_agent_teams_to_build_a_c/ (C compiler with 16 parallel agents)
- https://www.anthropic.com/engineering/building-c-compiler (Anthropic engineering blog -- C compiler)
- https://www.reddit.com/r/ClaudeCode/comments/1qh78yf/tried_claude_cowork_last_night_and_it_was_a_top_3/ (Cowork multi-agent experience)
- https://www.reddit.com/r/ClaudeCode/comments/1qf6vcc/ive_massively_improved_gsd_get_shit_done/ (GSD wave-based parallelism)
- https://github.com/zippoxer/subtask
- https://github.com/hesreallyhim/awesome-claude-code (Curated tool directory including orchestrators)
