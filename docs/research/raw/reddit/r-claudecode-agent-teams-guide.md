# How to Set Up Claude Code Agent Teams (Full Walkthrough + What Actually Changed)

**Source:** https://www.reddit.com/r/ClaudeCode/comments/1qz8tyy/how_to_set_up_claude_code_agent_teams_full/
**Author:** u/Silent_Employment966 | **Score:** 373
**Subreddit:** r/ClaudeCode

---

## Post Content

Claude Code just shipped Agent Teams, and it's not just "sub-agents with a nicer name." It's a completely different execution model where 3-5 independent Claude Code instances can actually collaborate on the same project, share context, exchange messages, and coordinate through a shared task system.

I spent way too long digging through logs and filesystem changes to understand how this actually works under the hood. Turns out it's pretty different from the old task tool, and there are specific situations where Agent Teams are legitimately better than spinning up regular sub-agents.

### The Big Difference

**Old sub-agent model:** Main agent calls task tool, sub-agent spins up, works in isolation, session terminates, only a summary comes back.

**New Agent Teams model:** Shared task lists, direct messaging between agents, explicit lifecycle control (startup, shutdown). Agents can coordinate, debate, and update each other in real time instead of just working in silos.

### How It Actually Works

Behind the scenes, Agent Teams use five new internal tools:

- **TeamCreate** - Sets up the team scaffolding (creates a folder under `.claude/teams/`)
- **TaskCreate** - Adds tasks as JSON files with status tracking, dependencies, and ownership (this is different from the old Task tool, it's specifically for creating todos)
- **Task tool (upgraded)** - Still spins up agents, but now supports `name` and `team_name` params to activate team mode instead of simple sub-agent mode
- **taskUpdate** - Agents use this to claim tasks, update status, mark things done
- **sendMessage** - The real unlock. Supports direct messages (agent to agent) and broadcasts (agent to all teammates). Messages get written to `.claude/teams/<team_id>/inbox/` and injected into each agent's conversation history as `<teammate-message teammate_id="...">`.

Team-lead can send a `shutdown_request`, teammates confirm with `shutdown_response`, and sessions terminate cleanly.

### When Agent Teams Are Actually Worth It

The best use case so far: deep debugging with multiple hypotheses.

Example from the official docs: users report the app exits after one message instead of staying connected. Spawn five agent teammates to investigate different theories. Have them talk to each other, try to disprove each other's ideas like a scientific debate, and update a findings doc with whatever consensus emerges.

That kind of collaborative, multi-angle investigation is way harder to pull off with isolated sub-agents that only report back summaries.

### How to Set Up Agent Teams

**Step 1:** Update Claude Code to latest version

**Step 2:** Enable the experimental flag

Open your settings file:

```
code ~/.claude/settings.json
```

Add this to the global settings:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Save the file and restart your terminal.

**Step 3:** Start a new Claude Code session

Agent Teams activate when your prompt explicitly asks Claude Code to create a team. For example:

> "I'm designing a CLI tool that helps developers track TODO comments across their codebase. Create an agent team to explore this from different angles: one teammate on UX, one on technical architecture, one playing devil's advocate."

### Pro tip: Use tmux or iTerm2 for the best experience

Agent Teams shine when you can see every agent working in parallel.

**For iTerm2 (macOS):**

1. Install iTerm2
2. Go to Settings > General > Magic
3. Enable Python API
4. Restart iTerm2
5. Launch Claude Code with: `claude --teammate-mode tmux`

This opens one pane for the team lead and separate panes for each agent teammate. You can click into any pane, watch what the agent is doing live, and even send direct messages to individual agents.

---

## Top Comments (sorted by score, 42 total)

### u/j00cifer (score: 28)

> Here's the comparison I want to see, in fact I may do this:
>
> Option 1) no subagents at all, straight narrative with one claude instance set on dangerously skip permissions
>
> 2) try existing sub-agent model
>
> 3) try agent teams.
>
> Judge results based on: a) speed, b) completeness/accuracy, c) TOKEN COST.
>
> The naysayers are out there naysaying that agent teams is just a way for users to use more tokens faster

### u/Silent_Employment966 (score: 15, reply)

> My guess is Agent Teams burns more tokens on messaging overhead, but for deep debugging where you'd otherwise be stuck in manual loops, it might actually save time and money overall. Definitely run it and share the results, would help everyone figure out when this is worth using vs just expensive

### u/Deep_Structure2023 (score: 9)

> Just when I was thinking one ai agent session wasn't enough, thanks a lot, hope this will reduce time in managing frontend, backend and database switching

### u/CyberiaCalling (score: 9)

> Every time I come up with an idea that improves Claude code for my use case and implement it in a janky way Claude Code then gets updates implementing the idea but it a way better fashion. I love this update.

### u/thurn2 (score: 7, reply)

> When I tried this stuff out yesterday on a bunch of tasks I really didn't feel like there was *that* much communication, it mostly did feel like subagents with extra steps. It's hard to really accomplish a lot of useful "discussion" before everyone hits the context window limit.

### u/Projected_Sigs (score: 3, in-depth reply on multi-agent engineering feasibility study)

> Last fall I tried it and had a team of six subagents do a "feasibility study" for building a high speed computer board design. Essentially, it's a complex system design with multiple subsystems that had competing requirements. Could they work together, reason with each other toward a common goal, yet make trade-offs when required? I was blown away by how well it worked with so few instructions.
>
> A simple orchestrator agent (project manager) managed them, gave them their individual assignments. The tasking was broken up like it would really be broken up on an engineering team. They were trying to meet high level system specs, which had flowdown requirements for individual subsystems assigned to an agent (high speed signaling/communications, memory design, power delivery, board stack up, mechanical/thermal, etc). They each picked subcomponents by themselves with no guidance and used combined spec sheets of many parts to determine subsystem performance.
>
> I used a simple shared message board - a file - that they all wrote to. PM sent coordination messages as group broadcasts. Subsystem agents could broadcast or address individual subagents with questions in TO: FROM: format.
>
> [...] What's so intriguing is that I don't recall giving them detailed instructions on how to coordinate. I gave some generic instructions to the PM and PM set the ground rules for everyone. I just gave them the ability to message, and that's what they actually did. Anyone in engineering would recognize the type of back and forth communication instantly.
>
> Seeing how they respond to failure is interesting. They hit a couple of design points that were too aggressive. Subsystems couldn't hit their target or even make trade offs to hit their target. The project manager just chimed in after a struggle and made an executive decision to downscope some requirements, but still met most of their requirement. That wasn't an instruction I gave. They just took initiative.

### u/ultrathink-art (score: 2)

> One tip for agent teams: make sure your orchestrator logic handles task dependencies properly. We've seen issues where agents claim tasks before their prerequisites complete, leading to failed runs.
>
> The key is having a clear state machine (pending -> ready -> claimed -> in_progress -> complete) and only marking tasks as 'ready' once all blockers are resolved. Also recommend heartbeat/timeout monitoring to catch stuck agents.

### u/Glittering-Lie-1340 (score: 2, reply)

> Download the sdk, have cc read it, tell cc what you want the team to be able to do, let cc build it.
>
> I prefer having a hub and spoke with 1 leader/decision maker, the leader only delegates and does not write code. Also add a coach that evaluates feedback from other agents to improve them after project completion.

### u/tristanryan (score: 2, reply)

> Just give CC the link to official CC documentation about agent teams, then tell it what you want to do, and have CC draft comprehensive prompt, and give that prompt to a new session.
>
> If I don't like prompt, I give feedback and sometimes tell it to do web searches to learn more up to date prompting best practices.

### u/AtomikPi (score: 2, reply)

> I would think of this more as a way to handle very complicated, context-intensive tasks rather than faster. Subtasks already allows for speed benefits from parallelism, but this allows for communication and coordination at the cost of complexity and token consumption.

### u/rjyo (score: 1, detailed tmux/remote access tip)

> Thing worth adding for people using tmux with agent teams: set up mosh instead of plain SSH for remote access. Regular SSH drops your session the second your network hiccups, which is painful when you have 3-5 agents running in parallel and one of them needs your approval to proceed.
>
> Also for anyone setting this up, make sure your CLAUDE.md is solid before spawning a team. Each teammate reads it independently, so any vague instructions get amplified across multiple agents. I found that being extremely specific about file conventions and test commands saves a ton of back and forth between teammates.

### u/LeyLineDisturbances (score: 1)

> As someone who's been testing this out extensively, I recommend you to have claude opus 4.6 create a plan for each agent. Make sure it specifies the model for each agent, because for some models, using sonnet will be more than enough.

### u/kepners (score: 1)

> I have set this up using my agents. God Damn its so good. You chat with agents, tell them they are wrong, repeat the idea, watch them argue solutions. Very impressed!

### u/LargeDan (score: 1)

> I'm finding this doesn't work well in headless mode. Seems to crash or hang 50% of the time.

### u/Let047 (score: 1, reply on token cost)

> I did to audit a code base and check it against doc, it worked, was fast and awesome... But it burnt 367k token in the process instead of 30k for a more sequential task.

### u/GreenLitPros (score: 1)

> It's much always worth it for me on my projects. I've already assigned permanent personalities via a hybrid openclaw/marvin style approach (totally custom though) and reward systems. They all have their domains that they know well with ongoing lessons, they can be initiated either directly MARVIN Style or be brought in as a team.

### u/klumpp (score: 1)

> Does anyone have some actual prompts they used that they felt were worth it? So far I've just seen the documentation's vague examples. Not looking for a copy/paste. A summary is fine.

### u/throwaway490215 (score: 1, contrarian/alternative approach)

> There is no value in anthropomorphizing 'teams', and 'members' and 'messages', or any long-running task.
>
> My pi (team) lead knows how to read the same tmux pane I'd read as a user of a single Claude. It automates how *I* use Claude. i.e. it has access to coding agents. It freely spawns agents to write investigations, implementation, reviews, kills them, starts up the next one with the right references by using a tmux type function. All in tmux panes I control. No message system beyond that.
>
> I can instantly tweak the scaffolding with the phrase "next time do X". It can automate the repetitive tasks I do while using claude (plan, refine, impl, review)

---

## Extracted Actionable Tips and Insights

### Setup and Configuration

1. **Enable Agent Teams** by adding `"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"` to `env` in `~/.claude/settings.json`
2. **Use tmux or iTerm2** to visually monitor all agents working in parallel. Launch with `claude --teammate-mode tmux`
3. **iTerm2 setup requires enabling Python API** under Settings > General > Magic
4. **Ghostty does not work** with agent teams on feature release; use iTerm2 or tmux directly
5. **Use mosh instead of SSH** for remote access to avoid dropped sessions when agents need approval

### CLAUDE.md and Prompt Strategy

6. **Make CLAUDE.md extremely specific** before spawning a team - each teammate reads it independently, so vague instructions get amplified across multiple agents
7. **Be specific about file conventions and test commands** in CLAUDE.md to reduce back-and-forth between teammates
8. **Have Claude draft the team prompt** - give CC the official documentation link, tell it what you want, have it draft a comprehensive prompt, then give that prompt to a new session
9. **Specify models per agent** - not every agent needs Opus; Sonnet may be sufficient for some roles, saving tokens

### Architecture Patterns

10. **Hub and spoke pattern** - 1 leader/decision maker that only delegates and does not write code. Add a "coach" agent that evaluates feedback to improve other agents after project completion
11. **Task dependency management** - use a clear state machine (pending -> ready -> claimed -> in_progress -> complete) and only mark tasks as 'ready' once all blockers are resolved
12. **Heartbeat/timeout monitoring** - recommended to catch stuck agents
13. **Shared message board pattern** (pre-teams approach) - a simple shared file where agents write TO:/FROM: messages, managed by a PM agent doing group broadcasts

### Best Use Cases

14. **Deep debugging with multiple hypotheses** - spawn agents to investigate different theories, have them debate and disprove each other's ideas
15. **Complex system design with competing requirements** - subsystem agents negotiate trade-offs (demonstrated with hardware design feasibility study)
16. **Code auditing against documentation** - fast and effective, but very token-heavy (367k tokens vs 30k sequential)
17. **Multi-domain switching** - frontend, backend, database work can be parallelized

### Caveats and Warnings

18. **Token consumption is significantly higher** - messaging overhead between agents is substantial; one user reported 12x token usage (367k vs 30k)
19. **Context window limits are a real constraint** - hard to accomplish much "discussion" before agents hit context limits
20. **Headless mode is unreliable** - reported to crash or hang ~50% of the time
21. **May feel like "subagents with extra steps"** for simpler tasks - the real value is in complex coordination scenarios
22. **Not necessarily faster** - the value proposition is about handling complex, context-intensive tasks rather than raw speed
23. **Watch for scope creep** - agent teams may expand dev scope with unrequested features, potentially negating time savings

### Alternative Approaches Mentioned

24. **Beads** - agent orchestration framework (more DIY)
25. **Gas Town** - more full-featured with specialized roles, watchers, merge queue, ephemeral workers
26. **DIY tmux-based orchestration** - using a lead agent that spawns/kills coding agents and reads tmux panes directly, with a simple folder-based task tracking system (draft, wip, done)
