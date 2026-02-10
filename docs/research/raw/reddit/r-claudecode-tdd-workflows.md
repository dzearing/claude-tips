# TDD workflows with Claude Code - what's actually working after months of iteration (Staff eng, w/ 14 yrs exp)
**Score:** 185 | **Comments:** 106 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qd64xx/tdd_workflows_with_claude_code_whats_actually/
**Author:** u/No_Paramedic_4881

## Post Content

Over the past two years I've spent a lot of time dialing in how I work with Claude Code and other agentic coding tools (in the pre claude code era). Agentic coding is here now, not "coming soon," so I've been trying to figure out what actually works vs. what just sounds good in theory. Here's where I've landed:

**Planning is the actual secret weapon**

This has been the biggest change from my pre-AI work experience. I spend way more time planning than executing now, and the results are noticeably better. I have a dedicated planning skill that hands off to an execution skill once the plan is solid.

Before Claude Code, architecture always felt rushed. We wanted to get coding so plans were half-baked. Now I actually have time to plan properly because execution is so much faster. A side effect of Claude is that I've become a much better architect.

**Testing philosophy matters more than ever**

I follow the testing trophy philosophy. Heavy on integration tests, light on unit tests. I don't really care if a function returns an expected output. I care if the system works. I want tests that can survive a refactor without having to also refactor 300 unit tests.

I codified this into a testing skill that defines exactly what kinds of tests I want. Strict coverage thresholds that fail pre-commit if not met. This matters more with agentic coding because Claude will write whatever tests you let it write. If you don't have strong opinions baked in, you end up with unit tests that test implementation details instead of actual behavior, or worse: tests that validate mock behavior over app behavior.

**The CPU problem is real (and I built something for it)**

TDD with Claude creates heavy load. Especially when you're running multiple sub-agents or multiple git worktrees with agents executing in each, your laptop performance becomes the bottleneck. Tests kicked off from multiple sub agents run at the same time, the entire system slows down, agents wait around, I've found that heavy parallelization can end up taking longer than serial tasks.

I ended up building a CLI ("rr") that load balances test execution across a cluster of mac minis I have. Agents aren't bottlenecked by tests anymore, and reliability improved because test suites aren't accidentally running concurrently on the same machine. Happy to share more about the setup if anyone's hitting similar scaling issues.

**Review phase built into the execution plan**

When an orchestration agent thinks it's done, part of the execution plan spins up a review agent who checks the work and gives feedback to the orchestrator, who then addresses it. Catches a lot of stuff that would otherwise slip through, but it is token heavy. Patterns like this quickly require the Max plan.

**Custom skills over generic marketplace plugins**

Community plugins never fully fit my opinionated standards, so I maintain my own set of skills and commands. I maintain a generic marketplace plugin I use across projects, plus repo-specific plugins in `.claude/*` that layer on local repo context. High-level standards stay consistent, but each repo can tailor how they're applied. Think: an in-repo skill referencing a generic skill, and applying context.

**Product thinking for side projects**

For personal projects, I keep a product/ folder with goals, vision, and docs that would normally come from a PM. Technical feature planning can reference the broader product vision, which leads to more cohesive features instead of random stuff stitched together.

I've learned some of my daily patterns from this subreddit, some of them I've discovered via my own trial and error.

---

## Top Comments

### u/basecase_ (Score: N/A)
There's no surprise that following the SDLC is the most effective way to use these coding agents. Following a good SDLC and investing in the overhead to do so will reap the same rewards they do when a team of humans do it.

Without it, you will just accelerate yourself into a corner with tech debt until you you drown in it, the same way a team of humans would.

I do agree though that AI Agents have made it easier to implement and maintain the overhead of SDLC.

### u/ggone20 (Score: N/A)
Nice write up! Planning is indeed the secret weapon. With a well-written spec, AI can build full features of insane complexity (distributed HA systems). I'll never understand the complaints I see on Reddit about any model at this point. I'm definitely in the camp that literally anything you can imagine at this point can be created and also believe in the 100% AI written code philosophy.

### u/32777694511961311492 (Score: N/A)
So I have been working on my own little Claude code framework. It's tied heavily into GitHub, specifically GitHub issues. The work flow is something like get-issue # -> review-issue (add more detail) -> plan -> audit-plan -> write-tests -> execute (multi one context phases) -> check-tests -> review-items-of-concern (if any add new issues) -> close issue and commit. Next issue, repeat. This process has been great for legacy apps for me. Sometimes I will review complex issues multiple times before I go to the next step. But this process almost always comes up with better plans and then the second check of auditing the plan is nice too. The key is just nice small and clear bug fixes and new features.

### u/vigorthroughrigor (Score: N/A)
noice work on https://github.com/rileyhilliard/rr

### u/MainFunctions (Score: N/A)
Would you be willing to share your planning and execution skills?

### u/-MiddleOut- (Score: N/A)
There is a lot of value in your Testing Philosophy section alone. Used it as a prompt in reviewing my own test suites.

### u/Historical-Lie9697 (Score: N/A)
That's pretty much exactly how I was doing it but switched to beads (https://github.com/steveyegge/beads) instead of github issues

### u/Optimal-Builder-2816 (Score: N/A)
I'm curious to try out your CE plugin. I'm about to embark on a new project with Claude code and I too am looking for plan heavy workflows from my past experiences as a staff eng.

### u/No_Paramedic_4881 (OP Reply) (Score: N/A)
Exactly. Starting a project with low (or no) development philosophy feels like a trap: you can get a prototype working amazingly fast, but it quickly begins to unravel as things become more and more complex. If you straight 'vibe code,' it rarely comes out good in the long run in my experience. The sweet spot is AI-assisted coding x a development process like SDLC, where you still understand the code behind every feature and know when it's time to refactor. I've found that the time saved on typing gives me more room for planning and refactoring, which keeps the codebase in a good, maintainable state.
