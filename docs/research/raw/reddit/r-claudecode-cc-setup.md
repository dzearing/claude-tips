# My personal CC setup [not a joke]

**Source:** https://www.reddit.com/r/ClaudeCode/comments/1qwcg0g/my_personal_cc_setup_not_a_joke/
**Author:** u/manummasson | **Score:** 422
**Subreddit:** r/ClaudeCode

---

## Post Content

What happens when you combine Obsidian + Claude Code + Gas Town + Whispr Flow? It's open source @ [github.com/voicetreelab/voicetree](http://github.com/voicetreelab/voicetree)

I have a guide up for agentic engineering at https://www.reddit.com/r/ClaudeCode/comments/1qthtij/18_months_990k_loc_later_heres_my_agentic/

Genuinely think this tool is revolutionary and want to share my creation and have people benefit from it.

---

## Tools Referenced

- **Obsidian** - Knowledge base / note-taking
- **Claude Code** - AI coding agent
- **Gas Town** - Part of the VoiceTree system
- **Whispr Flow** - Voice input integration
- **VoiceTree** - Open source project combining the above (github.com/voicetreelab/voicetree)

---

## Top Comments (sorted by score)

### Score 63 | u/CreamNegative2414
> You need at least 5 more monitors bro

---

### Score 35 | u/Normal_Capital_234
> I struggle to see how something like this would someone more productive or improve code quality. You'd be much better off just using a single Claude code instance with a well written claude.md.
> This just seems like complexity for the sake of it.

---

### Score 13 | u/manummasson (OP reply on mindmaps and multi-session workflow)
> Mindmaps are a great cognitive tool. Most hard problems are still solved on whiteboards. There's a lot of research on this topic, my tldr understanding is that mindmaps can visually represent abstractions closely to how you understand them in your brain, as concepts and connections.
>
> I use this for two things:
>
> 1. Organising and interacting with my long term knowledge base:
>    - Automatic knowledge gardening
>    - Brainstorming within the graph of my own notes, adding new connections
>
> 2. Solving problems, software engineering:
>    - Getting claude to decompose its plans into a tree of small focussed subtasks which claude will perform better on (avoids context rot)
>    - Get claude to orchestrate transparent subagents to each take on one of these subtasks. If any of the subagents need help they'll stay open as terminals so you can redirect it.

---

### Score 11 | u/zbignew (on context management with parent/child sessions)
> Doesn't the mommy session still get her context super clobbered by looking after the babies?
>
> Like, if she's generating enough detail for the baby, she's chewing up a ton of her context, and if she doesn't generate enough detail for the baby, the baby comes back to her for feedback and chews up all her context.

---

### Score 9 | u/oojacoboo
> I still don't understand the benefit of that matrix graph

---

### Score 9 | u/TeamBunty
> I liked the part in the video where you said, "minininini bipipbpibpib minibipbipi" to explain how it all works. Also, sweet treadmill, bro.

---

### Score 8 | u/manummasson (OP reply on context rot)
> A single claude instance is great, but it doesn't scale and has a major limitation:
>
> You get context rot if you rely too much into one session. You get better performance with multiple smaller sessions that have more focussed tasks.
>
> Managing many smaller sessions is a pain though, hence this whole setup.

---

### Score 8 | u/Suspicious-Edge877
> Sometimes I believe ppl build ai Setups to only look good

---

### Score 6 | u/Ben_B_Allen
> I stopped using multiple claude code sessions, my brain can't keep up.

---

### Score 5 | u/manummasson (OP on complexity)
> The complexity and messiness of problems won't go away. We will just be able to tackle harder problems with humans at higher levels of abstraction.
>
> This aims to model that messiness as a graph so you can understand it better

---

### Score 5 | u/Top-Chain001
> Can this handle multiple of workers because then it would be very overpowered!!

---

### Score 5 | u/hey_i_have_questions
> Could you have CODEX, Claude Code, and a local LLM collaborating on development using this just out of the box?

---

### Score 4 | u/manummasson (OP reply on multi-agent support)
> Yes they work out of the box if you have them already setup on your computer!
> You can add any CLI command as an "agent"

---

### Score 4 | u/tdi (on cognitive load)
> I think we should start talking about cognitive load of coordinating all those things at once. We moved development from thinking with deep brain to reptilian reactive one. It is a straight road towards health issues.

---

### Score 4 | u/alphaQ314
> Honestly, I've never seen any of the obsidian/todo-list fanatics do anything of significance other than make content about these tools.

---

### Score 3 | u/OkQuality668 (architect agent pattern)
> My quick solution for that is to use one instance as architect agent and I tell it something like "don't implement this yourself, make a good prompt that I can give to a coding agent who will work on your plan. Construct the prompt so that the coding agent's context window will have optimally relevant input it needs".
>
> Then have one or more coding agents for each individual task.

---

### Score 3 | u/manummasson (OP on subagent spawning)
> Yes! Claude itself can spawn its own workers (subagents) as native terminals within the graph

---

### Score 3 | u/manummasson (OP on single-tasking discipline)
> Absolutely. Our brains are not built to multi-task.
>
> It drains me switching between multiple agent threads, so I now force myself to do only one feature at a time, only allowing parallelisation within a task.

---

### Score 3 | u/tazdraperm
> I genuinely hope that's not the future of programming. Wasn't AI supposed to simplify things, not make them messier?

---

### Score 3 | u/UhhYeahMightBeWrong (on trying VoiceTree on a real repo)
> I noted just how descriptive each node is, I could see how this would be very useful to explore a new codebase or understand and troubleshoot an existing one.
>
> I note that generating this from a small codebase still consumed a fair amount of tokens: ~750k. I would be somewhat wary of throwing this at a more complex codebase in terms of token efficiency.

---

### Score 2 | u/subfloorthrowaway (on multi-instance workflow)
> I don't take it this far, but I do multibox Claude at work with multiple git work trees when I'm working on multiple tickets. I've been a dev for 15 years so I can think about the problems very fast and then it can take a lot of time spinning or building so I work on another ticket for efficiency.
>
> I sometimes will get 3 going even depending.

---

### Score 2 | u/manummasson (OP on subagent review)
> So the parent agent will review the subagents work, and if completely satisfied, closes them. If there is any possible issue, tech debt, etc. it leaves them open and you can click to navigate to the subagent and see what progress nodes it made and how you might need to redirect it.

---

### Score 2 | u/Independent_Map2091 (constructive criticism)
> People come on here all the time with their agent orchestration projects. The only thing that matters with these frameworks is results. You need to code a project that's not just a one shot small webapp and say "Look at what I've built with this." and let the results speak for themselves.
>
> How does it handle complexity? How do all these documents stay updated when specs change? How are problems broken down? How are mid-implementation discoveries surfaced?
>
> If you really want your framework to take off, build something impressive with it and post it.
>
> In this agentic coding space there is just too much talk and ideals and so little work is shown to back it up. Unless you work at a huge company who is bankrolling your token usage and you can throw 12 agents in a ralph wiggum loop for a week, you need to tackle tough problems (Surprise, it's all context management!)

---

### Score 2 | u/peenismane (on multi-agent validation)
> What I don't understand is how you're managing all these nodes going off on the same problem and how you validate that everyone is doing what they should be doing. I find with even just one session it can get off track and needs guidance back to the right path.

---

### Score 2 | u/mrhuman-
> I find this very interesting. Gets my org-mode/logseq/obsidian PKM brain going. Will probably take it for a whirl when I get some free time.

---

### Score 1 | u/OkLettuce338 (counter-argument on context rot)
> I use the same instance for days on days working for 12-16 hours a day. Context rot doesn't exist. Compaction does. Ill timed compaction can cause problems, but all the sub agents are subject to compaction.

---

### Score 1 | u/teratron27
> Sub agents in Claude Code don't share their parents context, they get a fresh one and prompt.

---

### Score 1 | u/Purple-Test-7139
> I think the major challenge is not running multiple Claude - but to make the final result more valuable.

---

## Extracted Tips and Patterns

### 1. Context Rot Mitigation via Task Decomposition
- OP's core thesis: long single sessions degrade in quality ("context rot")
- Solution: decompose work into a tree of small, focused subtasks
- Each subtask gets its own fresh Claude Code session with a targeted prompt
- Parent agent reviews child agent work and closes satisfied sessions

### 2. Architect Agent Pattern (from u/OkQuality668)
- Use one Claude instance purely as an architect/planner
- Prompt: "Don't implement this yourself, make a good prompt that I can give to a coding agent who will work on your plan. Construct the prompt so that the coding agent's context window will have optimally relevant input it needs."
- Separate coding agents handle individual implementation tasks

### 3. Multi-Instance Workflow with Git Worktrees (from u/subfloorthrowaway)
- Run multiple Claude Code sessions simultaneously on different git worktrees
- Each worktree handles a different ticket/feature
- Works well for experienced devs who can context-switch on the thinking while agents handle the slow build/spin cycles

### 4. Single-Task Discipline with Sub-Parallelism (from OP)
- Do only one feature at a time as a human
- Allow parallelisation only within that single task (sub-agents)
- Human brains are not built to multi-task across features

### 5. Mindmaps as Cognitive Scaffolding (from OP)
- Use graph/mindmap visualizations to represent abstractions
- Two uses: (a) knowledge base organization and (b) problem decomposition for engineering
- Visual representation matches how the brain models concepts and connections

### 6. Compaction vs Context Rot (from u/OkLettuce338)
- Counter-argument: "context rot" may actually be compaction artifacts
- Claims to use single sessions for 12-16 hour days without issues
- Ill-timed compaction (not context length per se) may cause the real problems

### 7. Token Cost Awareness
- Generating a mindmap/graph from even a small codebase consumed ~750k tokens
- Multiple sub-agents each consume their own context windows
- Cost scales significantly with the number of parallel agents

### 8. Tool Stack
- **Obsidian**: Long-term knowledge base, automatic knowledge gardening
- **Whispr Flow**: Voice-to-text input for prompting
- **VoiceTree/Gas Town**: Graph-based orchestration layer connecting it all
- **Walking pad/treadmill**: Physical movement during coding sessions (actflame from Amazon)

### 9. Key Criticism to Consider (from u/Independent_Map2091)
- Orchestration frameworks need to demonstrate results on real, complex projects
- Core unsolved problem is context management at scale
- Need to show: how specs stay updated, how mid-implementation discoveries surface, how complexity is handled
