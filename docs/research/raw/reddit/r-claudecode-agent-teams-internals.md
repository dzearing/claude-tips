# I reverse engineered how Agent Teams works under the hood.
**Score:** 187 | **Comments:** 40 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qyj35i/i_reverse_engineered_how_agent_teams_works_under/
**Author:** u/vicdotso

## Post Content

After Agent Teams shipped, I kept wondering how Claude Code coordinates multiple agents. After some back and forth with Claude and a little reverse engineering, the answer is quite simple.

One of the runtimes Claude Code uses is tmux. Each teammate is a separate claude CLI process in a tmux split, spawned with undocumented flags (--agent-id, --agent-name, --team-name, --agent-color). Messages are JSON files in ~/.claude/teams/<team>/inboxes/ guarded by fcntl locks. Tasks are numbered JSON files in ~/.claude/tasks/<team>/. No database, no daemon, no network layer. Just the filesystem.

The coordination is quite clever: task dependencies with cycle detection, atomic config writes, and a structured protocol for shutdown requests and plan approvals. A lot of good design in a minimal stack.

I reimplemented the full protocol, to the best of my knowledge, as a standalone MCP server, so any MCP client can run agent teams, not just Claude Code. Tested it with OpenCode (demo in the video).

Repo: https://github.com/cs50victor/claude-code-teams-mcp

Curious if anyone else has been poking around in here.

---

## Top Comments

### u/rjyo (Score: 27)
Nice work digging into this. From what I can tell the messaging between teammates goes through a shared task directory at ~/.claude/tasks/{team-name}/ and each agent gets notified via the SendMessage tool which gets injected into their conversation as a new turn. So its basically prompt injection in the sense that messages appear as if they were user messages to the receiving agent.

The shared task list is the main coordination mechanism. Agents claim tasks, mark them done, and check for new work. The team config at ~/.claude/teams/{team-name}/config.json has the member registry so agents can discover each other by name.

I have been running agent teams from my phone via Moshi (its a mobile terminal with mosh protocol) and the coolest part is you can SSH in, kick off a team, close the app, and come back later to check progress since mosh survives network switches. The agents just keep working.

### u/zokoCSGO (Score: 9)
I been using codex and this has been somewhat of a pain point. You are a legend.

### u/ultrathink-art (Score: 6)
This is a really solid reverse engineering job. The filesystem-based coordination is interesting -- we built something similar for a multi-agent system (work queue with JSON state files, fcntl-style claim semantics) and hit a few non-obvious gotchas worth sharing:

Cycle detection matters more than you'd think. With 3+ agents, circular task dependencies are surprisingly easy to create accidentally. We ended up implementing a topological sort check on task creation, not just execution -- catching cycles early saves debugging time when agents are spawning autonomously.

The fcntl lock approach has an edge case with crash recovery. If an agent process dies mid-task (OOM, API timeout, etc.), the lock releases but the task file is left in an inconsistent state. We added a "claim expiry" pattern -- tasks claimed for longer than N minutes without a heartbeat get automatically reset to the ready state. Without this, orphaned tasks silently block the queue.

Message ordering across filesystem inboxes is tricky. File creation timestamps have limited resolution on some filesystems (HFS+ is 1-second granularity). If two agents write messages within the same second, ordering is non-deterministic. Numbered filenames (like you mentioned) solve this but you need a global counter or UUID-sorted names to avoid collisions.

The MCP server extraction is clever -- decoupling the coordination protocol from Claude Code specifically means any MCP-compatible client gets agent teams for free. Curious if you've tested with agents running on different models (e.g., one Opus agent coordinating with a Codex agent via MCP)?

### u/vicdotso (Score: 5)
Thanks. Yh i currently have to switch between opencode and claude code to use codex and claude. Working hard to narrow down to just opencode with claude agents.

### u/emprezario (Score: 3)
Nice work man! I'll be trying this out.

### u/chillebekk (Score: 3)
You can run it without tmux. The important stuff happens under the hood, iTerm/tmux is just an interface.

### u/vicdotso (Score: 3)
Nice setup. There might be a mix of user message prompt injection and inbox polling by each agent

### u/xmnstr (Score: 4)
Because you can't use the claude sub auth inside opencode.

### u/vicdotso (Score: 1)
also the fact that the claude code cli has undocumented args is telling, and likely a precursor to further feature lockdowns

### u/permanonnnnn (Score: 1)
I'm using ccs to do this and it's working great - essentially gives you everything looking like Claude
