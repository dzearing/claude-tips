# Before you complain about Opus 4.5 being nerfed, please PLEASE read this

- **Source:** https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/
- **Author:** u/creegs
- **Score:** 351
- **Subreddit:** r/ClaudeCode
- **Comments extracted:** 147

---

## Original Post

NOTE: this is longer than I thought it would be, but it was not written with the assistance of Artificial (or Real) Intelligence.

First of all - I'm not saying Opus 4.5 performance hasn't degraded over the last few weeks. I'm not saying it has either, I'm just not making a claim either way.

But...

There are a bunch of common mistakes/suboptimal practices I see people discuss in the same threads where they, or others, are complaining about said nerfdom. So, I thought I'd share some tips that I, and others, have shared in those threads. If you're already doing this stuff - awesome. If you're already doing this stuff and still see degradation, then that sucks.

So - at the core of all this is one inescapable truth - by their very nature, LLMs are unpredictable. No matter how good a model is, and how well it responds to you today, it will likely behave differently tomorrow. Or in 5 minutes. I've spent many hours now designing tools and workflows to mitigate this. So have others. Before you rage-post about Opus, or cancel your subscription, please take a minute to work out whether maybe there's something you can do first to improve your experience. Here are some suggestions:

### Limit highly interactive "pair programming" sessions with Claude.

You know the ones where you free-flow like Claude's your best buddy. If you are feeling some kind of camaraderie with Claude, then you're probably falling into this trap. If you're sick of being *absolutely right* - this one is for you.

Why? Everything in this mode is completely unpredictable. Your inputs, the current state of the context window, the state of the code, your progress in our task, and of course, our friend Opus might be having a bad night too.

You are piling entropy onto the shaky foundation of nondeterminism. Don't be surprised if a slight wobble from Opus brings your house of cards falling down.

So, what's the alternative? We'll get to that in a minute.

### Configure your CC status line to show % context consumed

I did this ages ago with [ccstatusline](https://github.com/sirmalloc/ccstatusline) - I have no idea if there's a cooler way of doing it now. But it's critical for everything below.

### DO NOT go above 40-50% of your context window and expect to have a good time.

Your entire context window gets sent to the LLM with every message you send. All of it. And it has to process all of it to understand how to respond.

You should think of everything in there as either signal or noise. LLMs do best when the context window is densely packed with signal. And to make things worse - what was signal 5 prompts ago, is now noise. If your chat your way to 50% context window usage, I'd bet money that only a small amount of context is useful. And the models won't do a good job of understanding what's signal and what's noise. Hence they forget stuff suddenly, even with 50% left. In short Context Rot happens sooner than you think.

That's why I wince whenever I read about people disabling auto-compact and pushing all the way to 100%. You're basically force feeding your agent Mountain Dew and expecting it to piss champagne.

### Use subagents.

The immaculately mustached Dexter Horthy once said "subagents are not for playing House.md". Or something like that. And as he often is, he was right. In short, subagents use their own context window and do not pollute your main agent's. Just tell claude to "use multiple subagents to do X,Y,Z". Note: I have seen that backgrounding multiple subagents fills up the parent's context window - so be careful of that. Also - they're context efficient but token inefficient (at least in the short term) - so know your limits.

### Practice good hygiene

Keep your CLAUDE.md (including those in parent directories) tight. Use Rules/Skills. Clean up MCPs (less relevant with [Tool Search](https://x.com/trq212/status/2011523109871108570) though). All in the name of keeping that sweet sweet signal/noise ratio in a good place.

### One Claude Session == One Task. Simple.

Break up big tasks. This is software engineering 101. I don't have a mathematical formula for this, but I get concerned what I see tasks that I think could be more than ~1 days work for a human engineer. That's kind of size that can get done by Claude in ~15-20 mins. If there is a lot of risks/unknowns, I go smaller, because I'm likely to end up iterating some.

To do this effectively, you need to externalize where you keep your tasks/issues, There are a bunch of ways to do this. I'll mention three...

1. **.md files** littered across your computer and (perhaps worse) your codebase. If this is your thing, go for it. A naive approach: you can fire up a new claude instance and ask it to read a markdown file and start working on it. Update it with your learnings, decisions and progress as you go along. Once you hit ~40% context window usage, `/clear` and ask Claude to read it again. If you've been updating it, that .md file will be full of really dense signal and you'll be in a great place to continue again. Once you're done, commit, push, drink, smoke, whatever - BUT CLOSE YOUR SESSION (or `/clear` again) and move on with your life (to the next .md file).

2. **[Steve Yegge's Beads](https://github.com/steveyegge/beads).** I don't know how this man woke up one day and pooped these beads out of you know where, but yet, here we are. People love Steve Yegge's Beads. It's basically a much more capable and elegant way of doing the markdown craziness, backed by JSONL and SQLite, soon to be something else. Work on a task, land the plane, rinse and repeat. But watch that context window. Oh, actually Claude now has the whole Task Manager thing - so maybe use that instead. It's very similar. But less beady. And, for the love of all things holy don't go down the Steve Yegge's Gas Town rabbit hole. (Actually maybe you should).

3. **Use an issue tracker.** Revolutionary I know. For years we've all used issue trackers, but along come agents and we forget all about them - fleeing under the cover of dark mode to the warm coziness of a luxury markdown comforter. Just install your issue tracker's CLI or MCP and add a note your claude.md to use it. Then say "start issue 5" or whatever. Update it with progress, and as always, DO NOT USE MORE THAN ~40-50% context window. Just /clear and ask the agent to read the issue/PR again. This is great for humans working with other humans as well as robots. But it's slower and not as slick as Steve Yegge's Beads.

### Use a predictable workflow

Keep things predictable - use the same set of prompts to guide you through a consistent flow for each thing you work on. You only really change the inputs into the flow. I recommend a "research, plan, implement, review, drink" process. Subagents for each step. Persisting your progress each step of the way in some external source (see above). Reading the plans yourself. Fixing misalignment quickly. Don't get all buddy buddy with Claude. Claude ain't your friend. Be flexible, but cold and transactional.

There are a bunch of tools out there that facilitate some form of this. There's [superpowers](https://github.com/obra/superpowers), [GSD](https://github.com/glittercowboy/get-shit-done), and [one that OP wrote](https://iloom.ai/). Also: [Spec-Kitty](https://github.com/Priivacy-ai/spec-kitty), [OpenSpec](https://github.com/Fission-AI/OpenSpec), [Spec-Kit](https://github.com/github/spec-kit).

Also, and this is important: when things go wrong, reflect on what you could have changed. Code is cheap - throw it away, tweak your prompts or inputs and just start again.

Bonus: `:q` quits Claude Code (like vim muscle memory, faster than `/q`).

---

## Top Comments (sorted by score)

### Score 46 | u/HeavyDluxe

> This is a breath of fresh air in a world of increasing whargarbl.

---

### Score 32 | u/gripntear

> All these optimization projects/frameworks for Claude Code can turn into a huge rabbit hole. Everyone has their own flow with these goddamn tools. Do what works for you. If I follow all best practices or download all the super-duper-optimized libraries out there in Github, I would've failed to get shit done.

---

### Score 13 | u/SinisterMrBlisters

> Many of these posts confuse me. Even if i suck at how i use it, how i prompt, or when i use this or that feature of it. i sucked the same last week; so i should get the same type of results. consistency. the degradation "Feel" cant be because of how i'm doing things or it would have "felt" degraded the week before too.

---

### Score 10 | u/Select-Spirit-6726

> Good hygiene tips regardless of whether the model changed or not.
>
> The context window point is underrated. I started treating sessions as disposable -- do one thing, capture what matters externally, start fresh. Stopped fighting context rot entirely.
>
> The irony is that building systems to work around LLM limitations (session capture, external task tracking, keeping context lean) ends up being useful even when the model is performing well. You just get more predictable results either way.
>
> Whether it's the model drifting or user workflows accumulating entropy -- the fix is the same: tighter scope, externalized state, less reliance on the LLM to remember things it shouldn't have to.

---

### Score 10 | u/warturtle_

> I love how CC and similar tools are democratizing development. But that's sort of the double edge sword - you are describing how a mid level engineer works on a daily basis to a population of users that includes a large chunk of people who can't follow your instructions.
>
> If you don't know what you would have done manually without CC, you can't plan and implement it incrementally with CC.
>
> In its current state it's sort of an automation tool for ok+ devs. Which is hugely valuable to me and my team.
>
> But the "magic" of the December window is in some small part the fact that I had PMs on my team doing long form "pair programming" style and producing PRs that were not total garbage. That's now regressed.

---

### Score 9 | u/StretchyPear

> I agree it's good to keep things tight and deterministic however Claude Code has issues following basic instructions and is no longer good at even basic implementations, so I'm not sure what that changes - maybe it helps limit the scope of damage?
>
> The real issue is that the product doesn't have a consistent user experience. If I had two drills, one old and one new, with the new one drilling holes faster and through more material but didn't work the same each time I used it, I'd use the old predictable one because I need consistency.
>
> We shouldn't have loyalty to these companies, we should be loyal to the tools that help us do what we have to do without becoming a problem on their own.

---

### Score 8 | u/Houdinii1984 (reply)

> Variation, like you mentioned, is a natural byproduct of LLMs in general. The incorrect answer will always be a valid possible answer. This chance for an incorrect result is why we see so much perplexity and unique combinations from the models, and is more a feature than a bug.
>
> Granted, we're coders and we're seeking deterministic solutions, but the underlying tech makes that impossible, so the next best thing is minimizing the situation the best way possible.
>
> It's also necessary to acknowledge that the tools aren't production ready. We're all out here using pre-alpha software of a tech that isn't even mature.

---

### Score 7 | u/WholeEntertainment94

> I stopped at the first three lines of your message. My workflow is far from the vibe and equally far from standard programming. I use a structured flow that consists of ALWAYS iterating the SAME prompts, only varying one spec file within a single codebase that grows by about 1% with each successful iteration. Opus went, in the space of a few days (and dramatically in the last few hours), from one-shotting the interaction, to having to repeat it dozens of times, and ultimately, to not understanding the prompt (always the same) and having to correct it dozens of times. Sonnet, despite the slightly lower quality of the code produced, still manages to complete the task after 3-5 iterations.
>
> Edit: I've finished reading, and I'm already following all your instructions (which are excellent) by default.

---

### Score 6 | u/who_am_i_to_say_so

> At least you're acknowledging something is up. I don't think it is nerfed bc that would mean it is unusable, but that's not the case.
>
> Claude is suddenly much less forgiving overnight, though. One sentence inputs would lead to a planning phase, which then after it would setup tasks. And it doesn't do that anymore. Sad.
>
> I'm in agreement that keeping the scope small is best. And perhaps that's probably why some people haven't noticed a difference - because they work that way anyway.

---

### Score 5 | u/theeternalpanda

> These are all things i was doing to manage the output to begin with. The current problem is a MASSIVE backslide. Massive.
>
> I made a single plan to update some code after adding an MCP server to access apple dev documentation since it had some issues and i noticed it was trying to reinvent a wheel instead of just using apple recs.
>
> I spent all morning researching and building a little plan. I show it the plan, put it in plan mode and ask it to help me audit and make a refactoring plan. I'm satisfied with it. I let it run.
>
> It clears the context, opens the plan, and IMMEDIATELY overrules all the work, saying its properly implemented already. :(

---

### Score 4 | u/ProfitNowThinkLater

> Nice post, great practical tips, regardless of whether the model is getting "stupider". FWIW, I work at one of the big labs and I promise we don't intentionally make our products worse. However there absolutely is an iterative process of trying to improve the product and sometimes that does result in regressions. All of the major AI products from the big labs have parameters and harnesses they are tweaking to drive to deliver the most value to customers. However it's very difficult to tune general purpose models that work for all scenarios so sometimes we observe regressions in one area as we try to optimize another.
>
> All that's to say - folks should be trying to learn what these tools are good at rather than judging a fish by its ability to climb a tree. For example, no one should expect "consistency" from probabilistic models. Claude code is NOT AGI but it is a very, very powerful tool when used appropriately.

---

### Score 4 | u/thisguyfightsyourmom (reply)

> Yeah, these posts always end up being someone saying use less context. I already cut off sessions at 40-50%, and have been for a long time. The degradation we see in Claude is not imagined or due to misuse in all cases.

---

### Score 3 | u/WolfeheartGames (reply)

> They mentioned it in a blog post around the time the lobotomy started. They have been testing using it for safety. When Claude thinks it's doing something unsafe it will self sabotage, they've measured this in the lab. By steering it to be more on edge, they induce a sand bagging behavior.

---

### Score 2 | u/theeternalpanda

> As far as prompting, it seems like the CLAUDE.md file has some principles:
>
> What actually happens:
> - Instructions at the very top get highest priority
> - Instructions that are specific, actionable, and repeated work better than general principles
> - Instructions that say "DO NOT do X" work better than "prefer Y"
> - Instructions buried in the middle of long documents get deprioritized
>
> So if you want me to actually follow something:
> 1. Put it at the top
> 2. Make it imperative ("Use MCP first" not "It's best to use MCP")
> 3. Make it specific ("Search Apple docs for [topic] before coding" not "research thoroughly")
> 4. Repeat critical rules in multiple places

---

### Score 2 | u/theeternalpanda

> I did some research based on a compilation of specific failures.
>
> Timeline Analysis:
> - 2.1.0-2.1.9 (Jan 7-15): Initial release with new architecture - likely unstable
> - 2.1.10-2.1.14 (Jan 17-20): Memory and context fixes - addressing mid-January issues
> - 2.1.20+ (Jan 27+): Further stability improvements
>
> The 2.1.x series introduced significant architectural changes starting Jan 7 that caused memory leaks, context management issues, and API errors. These were progressively fixed through mid-to-late January. By staying on 2.0.76 (Dec 22), you're avoiding all these issues.

---

### Score 2 | u/TheOriginalAcidtech

> There are two groups. Ones that think Opus got dumb and ones complaining about usage limits. And these groups overlap. Unfortunately for the usage limits people, properly using Opus (subagents for example) EATS TOKENS. So smart Opus or lower token burn. YOU pick.

---

### Score 2 | u/Zealousideal-Pilot25 (reply)

> I can't say enough about implementing state as an .md file for implementing a new objective. Worked great with codex, will be getting it to work with Opus 4.5 in Claude Code soon. Opus 4.5 did a pretty good job reviewing my codebase today, implementing a CLAUDE.md file based on my codebase and existing agents.md, planning improvements and even implementing quick win style improvements and a security fix.

---

### Score 2 | u/creegs (reply, on clearing context without losing tasks)

> The "old/common way" - tell claude to write your plan and progress (and insights and lessons learned) to a tmp .md file, copy that file path to the clipboard, then /clear, then tell claude to read that file and reconstruct your task list.
>
> The new way: start claude like this: `CLAUDE_CODE_TASK_LIST_ID=my-project-name claude`
>
> When you do that, the tasks get stored in an external task list that is not scoped by session ID. So when you do a clear, which changes the session ID, it still knows where to find the old tasks.

---

### Score 2 | u/meowterspace (reply)

> why rely on its memory.. create a minimum viable context system so it gets exactly what you want it to remember every time you start a new feature..

---

### Score 1 | u/Western_Objective209 (reply)

> I think a lot of people start using it, get in a good flow, then they get some bad context rot and don't understand why it's not working well. You can go through several compactions in the same conversation and it will work well, and then you suddenly got something that is just confused and barely working.
>
> When that happens, just start a new session. I don't think you need to obsess over context length the way OP is suggesting, just be mindful that sometimes it starts performing poorly when the context is kind of confused, so try starting a clean session instead of just hopping on reddit and complaining I guess is a good strategy.

---

### Score 1 | u/Kasempiternal

> I actually also realised the subagents keeping the main context clean, so i created a command/skill just to deploy sub agents to scout, then main agent plans the development also for parallel subagents, and it develops with subagents, having the main context clean and not filling up as fast.

---

### Score 1 | u/Fantastic_Trouble461

> Thank you so much for writing this. this is pretty much what all my workflow is, and I never, ever, had the problems people lament with Opus or sonnet in Claude Code at least. I do not implement ALL your suggestions, but there are two things that, in my opinion, are much more important than anything else: one session -> one task; and also: keep your codebase structured and modular. with these two things, even compacts don't give me much problems, as, while it loses some nuance, with an easy to read codebase it's pretty easy for it to find it's way back to where it was.
>
> Also, two things I'm loving so far: spec driven development with roadmaps, feature requirements, and ADRs.

---

### Score 1 | u/CarlGarside (condensed TLDR)

> 1. Add a visible context meter
> 2. Hard rule: reset at ~40-50% context
> 3. One session = one task
> 4. Externalize your state (biggest win) -- SPEC.md / PLAN.md with goals, constraints, decisions, progress, next steps
> 5. Use a repeatable workflow every time: Research -> Plan -> Implement -> Review/Test
> 6. Be "cold and transactional" -- reduce banter, keep prompts crisp and bounded
> 7. Subagents for exploration; main agent for execution
> 8. Hygiene pass -- trim CLAUDE.md and parent-directory rules, remove stale instructions
> 9. When it gets "weird" -- restart fast, don't argue with a confused session
> 10. Commit / backup more often than you think

---

### Score 1 | u/creegs (reply to CarlGarside)

> I'd say 4+5 is the biggest win. If I had to pick one, I'd say 5.
>
> 7) Use subagents for EVERYTHING - not just exploration. The alternative is to use a different claude instantiation for every single step within one task's workflow, which is basically what Gas Town does.
>
> 10) I actually don't do this - the code is cheap - if stuff goes wrong, I just throw it away and start again. My units of work are never big enough to worry about starting over again - usually it's the research and planning that's the important stuff, not the code.

---

### Score 1 | u/bittabet

> I just find it a bit frustrating how it can come up with these very good planning documents and fix some very complex problems but at the same time it's constantly making simple type errors like having the frontend submit strings when the backend is expecting a boolean/integer/etc. Not just doing it once in a while either. No human programmer with even a little bit of experience would repeatedly make this same error over and over on the most basic project. It's like simultaneously a complete genius but also programming like a newbie which is so bizarre.

---

### Score 1 | u/theeternalpanda (reply)

> I spent the night going through the versions. so far, 2.0.76 is very suddenly much faster and cleaner and I don't even mention the MCP server list in the prompt but it automatically accesses it (claude.md working again)

---

### Score 0 | u/montdawgg

> It's the harness and the fact that Claude is being served on different platforms with different hardware configurations. I find the Claude being served to Cursor FAR superior to using the official app -- either the desktop app or Claude Code does MUCH worse than what I achieve on cursor. Cursor has a great agentic setup now and an excellent RAG system with better context management but what I'm speaking to right now goes beyond that. The model on Cursor is VASTLY less censored than even on the API which is supposedly the raw model without an Anthropic approved system prompt.

---

## Extracted Tips Summary

### Context Window Management
- **Never exceed 40-50% context window.** Performance degrades well before 100%. Everything in the context is either signal or noise, and old signal becomes noise over time ("Context Rot").
- **Monitor context usage.** Use tools like `ccstatusline` to display % context consumed in the status bar.
- **Disabling auto-compact and pushing to 100% is counterproductive.** The model cannot distinguish signal from noise in a bloated context.
- **When you hit ~40% context, /clear and reload from externalized state.** Do not try to push through context rot.

### Session and Task Discipline
- **One session = one task.** If the task would take more than ~1 day for a human engineer (~15-20 min for Claude), break it down.
- **Treat sessions as disposable.** Do one thing, capture what matters externally, start fresh.
- **Do not do long "pair programming" sessions.** Chatty, free-flowing sessions pile entropy onto nondeterminism.
- **Be cold and transactional.** Don't get buddy-buddy with Claude. Keep prompts crisp and bounded.

### Externalizing State
- **Keep progress in external .md files, issue trackers, or tools like Beads.** Don't let the chat history be the sole memory.
- **Update your external state file as you go.** When you /clear and reload, the file is full of dense signal.
- **Use `CLAUDE_CODE_TASK_LIST_ID=my-project-name claude`** to persist tasks across /clear operations (tasks survive session ID changes).
- **Tools for structured workflow:** Steve Yegge's Beads (JSONL/SQLite-backed), superpowers, GSD, iloom, Spec-Kitty, OpenSpec, Spec-Kit.

### Workflow Structure
- **Use a predictable, repeatable workflow:** Research -> Plan -> Implement -> Review.
- **Use subagents for each step.** They get their own context window and don't pollute the main agent's context.
- **Use subagents for EVERYTHING, not just exploration.** Alternatively, use a different claude instantiation per workflow step.
- **Read the plans yourself.** Fix misalignment quickly before implementation.
- **When things go wrong, reflect and restart.** Code is cheap. Tweak prompts/inputs and start over rather than fighting a confused session.

### CLAUDE.md and Prompt Optimization
- **Keep CLAUDE.md tight.** Remove stale instructions. Keep only rules you truly want applied every time.
- **Instructions at the very top get highest priority.**
- **Specific, actionable, repeated instructions work better than general principles.**
- **Negative instructions ("DO NOT do X") work better than soft preferences ("prefer Y").**
- **Instructions buried in the middle of long documents get deprioritized.**
- **Make rules imperative** ("Use MCP first" not "It's best to use MCP").
- **Make rules specific** ("Search Apple docs for [topic] before coding" not "research thoroughly").
- **Repeat critical rules in multiple places.**

### Subagents
- Subagents use their own context window and do not pollute the main agent's context.
- Backgrounding multiple subagents can fill up the parent's context window -- be careful.
- Subagents are context-efficient but token-inefficient (short term).
- Create skills/commands to deploy subagents for scouting, then let the main agent plan and delegate implementation to parallel subagents.

### Version and Harness Considerations
- CC 2.1.x series (Jan 7+) introduced architectural changes that caused memory leaks and context management issues.
- CC 2.0.76 (Dec 22) reported as more stable by some users.
- The harness (Claude Code version) can impact behavior independently of model changes.
- Different platforms (Cursor, API, Claude Code, Desktop) may serve the model with different configurations.

### General Model Behavior Observations
- LLMs are inherently nondeterministic. Even identical prompts can produce different results.
- The model can simultaneously handle complex planning while making basic type errors (strings vs booleans) -- it's a known pattern.
- "No one should expect consistency from probabilistic models" -- use workflow discipline to compensate.
- Model tuning for safety ("residual steering") may induce sandbagging behavior when the model perceives unsafe operations.
- Labs iterate on model parameters and harnesses; regressions in one area can occur while optimizing another.
