# I've Massively Improved GSD (Get Shit Done)

**Source:** <https://www.reddit.com/r/ClaudeCode/comments/1qf6vcc/ive_massively_improved_gsd_get_shit_done/>
**Author:** u/officialtaches | **Score:** 251
**Subreddit:** r/ClaudeCode

---

## Post Content

A few weeks ago I posted about **Get Shit Done** when it was at \~100 users. Since then we've gone on to hit 3,300 stars and crossed 15,000 installs. Time for an update.

[https://github.com/glittercowboy/get-shit-done](https://github.com/glittercowboy/get-shit-done)

# The Big Changes

**Multi-agent orchestration that actually works.**

When I first posted, execution was single-threaded. Now the system spawns specialized agents in parallel — 4 researchers investigating your domain simultaneously, multiple executors building different parts of your codebase at once, a dedicated verifier checking if the code actually achieves what you asked for.

The absolutely bonkers part is that your main context window stays at 30-40% even after deep research or thousands of lines of code getting written. All heavy lifting happens consistently in fresh 200k subagent contexts.

**Plans get verified before they run.**

I got tired of watching Claude write plans that missed requirements or had broken dependencies. Now there's a planner → checker → revise loop. Plans don't execute until they pass verification. If the checker finds issues, the planner fixes them automatically.

**Automatic debugging when things break.**

The new `/gsd:verify-work` command walks you through testing what got built. "Can you log in?" Yes/no. If something's broken, it spawns debug agents to find the root cause, creates fix plans, verifies those plans, and hands you a ready-to-execute solution. You don't debug — you just run `/gsd:execute-phase` again.

**The discuss-phase breakthrough.**

This is the best update I reckon. Before planning, you now feed your preferences into the system — how you want the UI laid out, what the error messages should say, how the CLI flags should work. That context flows into research (so it investigates the right patterns) and planning (so it builds what you actually want, not reasonable defaults).

# Meta Building

The system builds itself. Every GSD improvement gets planned and executed using GSD. It's the most meta thing I've ever worked on and it just keeps getting better.

# The Philosophy Hasn't Changed

I still don't want to cosplay as an enterprise team. I still just want to describe what I want and have it built correctly.

The difference now is the system is *so much smarter* about how it does that. Research before planning. Verification before execution. Debugging when things break. Fresh context for every heavy operation.

It's not magic. It's just really good context engineering wrapped in a workflow that doesn't get in your way.

    npx get-shit-done-cc

With love,

Lex

**P.S.** Once you've downloaded the newest version, you can simply run `/gsd:update` to get the latest. The update command now shows you what changed and asks before installing — no more mystery upgrades.

---

## Comments (97 total, sorted by score)

### u/officialtaches (score: 37)

Here's some extra context for those who are bound to ask "yeah but what is it?"

Claude has \~200k tokens of context. At 10% usage it's sharp. At 50%+ quality tanks—hallucinations, forgotten constraints, drift. One long conversation building a real project = inevitable degradation.

**The fix: Orchestrator + Fresh Subagents**

Instead of one conversation doing everything, GSD splits it:

\- **Orchestrator** uses \~10-15% context. Reads plan metadata, coordinates, spawns workers, collects results. Never executes code itself.

\- **Subagents** each get fresh 200k context. Load one plan, execute its tasks, commit, write summary, die. Plan 5 has identical quality to Plan 1.

**Wave-based parallelism**

Plans get pre-assigned wave numbers during planning:

Wave 1: \[plan-01, plan-02, plan-03\] → 3 agents in parallel

Wave 2: \[plan-04, plan-05\] → 2 agents in parallel (waits for wave 1)

Wave 3: \[plan-06\] → 1 agent

Same wave = no dependencies = parallelize. Higher wave = may depend on earlier = wait. A 6-plan phase runs in 3 rounds instead of 6.

**Files as long-term memory**

Claude has no memory between sessions. GSD uses disk:

\- \`PROJECT.md\` — vision/constraints (stable reference)

\- \`STATE.md\` — current position, decisions, blockers (instant resumption after /clear)

\- \`PLAN.md\` — executable task specs (not docs—actual prompts subagents execute)

\- \`SUMMARY.md\` — what was built (per plan)

\- \`VERIFICATION.md\` — proof the goal was achieved

First step of every workflow reads STATE.md. Context restored instantly.

**Goal-backward verification**

Task completion ≠ goal achievement. Tasks can be "done" but deliver stubs.

GSD works backwards from the phase goal:

1. What must be TRUE for "users can chat in real-time"?
2. What artifacts must EXIST? (Chat.tsx, /api/chat, Message schema)
3. Are they WIRED? (Component actually calls API? API actually queries DB?)
4. Are they SUBSTANTIVE? (Real code, not TODO comments or empty returns)

Catches orphaned files, missing integrations, stub implementations.

**Atomic git history**

Each task = one commit. \`git bisect\` finds the exact failing task. \`git revert\` undoes one change cleanly. Future Claude sessions read history for context.

\---

**TL;DR:** Fresh subagents prevent context rot. Parallel waves speed execution. Files on disk = persistent memory. Goal-backward verification catches "done but broken." Atomic commits make everything reversible.

---

### u/getaway-3007 (score: 20)

Hello OP, I would like to add a suggestion, could you showcase the project by building something incrementally and have that linked in GitHub.

So a project you built from scratch which had 3 features and then you iterate over it and add 2-3 new features.

I'm exploring whether to use this, [clavix](https://github.com/ClavixDev/Clavix) or the ralph wiggum method

---

### u/officialtaches (score: 16) (reply, depth 1)

Great idea! Yes I'll do that in a livestream on Monday :)

In the meantime you can see a demo here (although most of the new features I mentioned in this post were implemented in the last 24 hours).

[https://www.youtube.com/watch?v=5L3dm7KBCmY](https://www.youtube.com/watch?v=5L3dm7KBCmY)

---

### u/AsterixBT (score: 10)

I've made a run from yesterday to today and already done with milestone 1.  

It's awesome. Kudos to you!

---

### u/corpa (score: 9) (reply, depth 2)

Yeah with an existing Project you also start with the "/gsd:new-project" command and it researches your project and creates the project.md and other files. I already tried this in one of my existing projects but it wasnt a huge project.

---

### u/foobarstrap (score: 9)

Thanks for GSD. I had a go with it yesterday my time. Started with a Brown field PoC-grade eBPF Firewall which Had no UI nor API to configure it.
I generated an UI using Google aistudio, then initialized the Project, did the Research and everything. It went smoothly throghout - it was able to connect most things. Its really impressive given, that it runs mostly unattended, and that there are no stub Implementations as you see them often.
I ran with Opus throghout, and let it cook for 2-3 hours, occasionally  hitting enter / approving after the plan/requirements phase where i put more effort into building the roadmap. It churned through ~60 USD worth of API cost which seems reasonable given the background research, and everything.

Especially the planning for several milestones ahead was useful, now i got a roadmap and can continue after stabiliting the first milestone.

I noticed one Gap where I'm not sure If this is my problem or should be fixes in the system/agent prompt:

1. The plan / execution didn't produce ANY Tests - Not for the API, nor for the UI, and not for the glue between the API and the eBPF world. No integration or e2e Tests.


I implicitly assumed, that tests are part of each milestones/phase/wave andnthat there's no need to explicitly add that as a requirement.

That said, it may be worth experimenting with the verification step: e.g. asking the user If he wants to create unit/integration tests before moving on.
I feel that this is the point where one should verify that all the pieces are integrated nicely.

---

### u/Nilsolivier (score: 6)

Hi, love the work! However, im wondering about how this uses the Claude models. I have the max plan (5x) which is somewhat limiting using opus 100% of the time. How does this setup use the models? if run it with opus, does it send the subagents as opus, sonnet or haiku? Is there any point in using opus as the "Orchestrator" when it's just the messenger? (or maybe it's taking important decisions, hard to see). What do you think? How do you use it? Thanks!

---

### u/RoninNionr (score: 6)

I'm adopting GSD in the middle of an ongoing client project, not from the start. I already have a large, established [CLAUDE.md](http://CLAUDE.md) that I've been maintaining (code style, schema, architecture, common commands, project context).

Looking at GSD, it creates its own documentation in `.planning/` (PROJECT.md, STATE.md, codebase/) but doesn't seem to read or integrate with existing CLAUDE.md.

Since Claude Code loads [CLAUDE.md](http://CLAUDE.md) automatically into every session, I'm now facing:

* Potential duplication (CLAUDE.md + .planning/ docs)
* Context window waste
* Unclear what to keep where

**Questions:**

1. For those who adopted GSD mid-project: how did you handle your existing CLAUDE.md?
2. What should stay in [CLAUDE.md](http://CLAUDE.md) vs move to .planning/?
3. Would a `/gsd:import-claude-md` or similar command make sense as a feature for mid-project adoption?

---

### u/officialtaches (score: 5) (reply, depth 1)

I run Opus 4.5 all day and rarely hit limits unless going HAM. If I do - it's around 1 hour max before rest. 

No reason you couldn't make the main orchestrator use even Haiku as all the complex work is handles by subagents that could be Opus.

---

### u/GimmeThatHotGoss (score: 5)

I’ve been using GSD on all my projects for a few weeks now after joining your live stream by accident. I was skeptical at first but then after going back to speckit for a project - really felt the difference.

---

### u/astanar (score: 5)

How does this compare to superpowers? Does it replace it?

---

### u/rand0anon (score: 4) (reply, depth 1)

Can this be implemented in flight? I want to apply it to my project

---

### u/Nilsolivier (score: 4) (reply, depth 2)

Okay, it’s more the weekly limit that is a problem for me. When you say ”that could be opus”, what decides what model it’s using? :)

---

### u/Hozukr (score: 4)

The new notifications on macOS are a miss IMO. Having a pop up in the middle of the screen and having to click on a button to dismiss them is bad UX. There is a terminal-notifier lib you could use to generate native pop up notifications like all other apps.

---

### u/officialtaches (score: 4) (reply, depth 1)

Yah it sucked. I deleted it - check the latest update as it'll remove it on install. Will remove the remover after a while just wanted to make sure I cleared up the mess for anyone who installed.

Will look into terminal-notifier - cheers :)

---

### u/El_Spanberger (score: 3) (reply, depth 1)

This sounds great. Appreciate I'm late to the party on this, but only discovered about the smart/dumb zones of context this week. It explains a lot. Got a couple of things I was planning to have a go at over the weekend, so will give this a try!

---

### u/officialtaches (score: 3) (reply, depth 1)

Awesome! Glad you're enjoying it :)

I'd update if I were you though 😉

    npx get-shit-done-cc

---

### u/AsterixBT (score: 3) (reply, depth 2)

It's hard not to enjoy it as it follows my usual workflow for the last several years. Great job once again!  

I surely will update once i go through the changeset. Afterall it's in the repo's readme that one should be ready for frequent updates  :)

All that... once I get back on the computer (or should I say terminal).

---

### u/AdCommon2138 (score: 3) (reply, depth 1)

Consider buying Gemini 20$ option. You get separately: Jules, tokens for opus almost equivalent to 20 sub, and then Gemini high/low with separate limits for Gemini flash. I'm going to reduce my pro to lower tier next mong and get codex as well so that will be 40 pocketed while probably having even better results by using multi agent approach.

---

### u/Milkpowder44 (score: 3)

this is bonkers. Really like it. Only minor gripe is the new popup feature that shows when I'm able to input to Claude again

---

### u/officialtaches (score: 3) (reply, depth 1)

Update! I removed it lol.

**Edit: Actually you may need to manually delete .claude/hooks/gsd-notify.sh until I make the install script delete it.**

---

### u/Coldshalamov (score: 3)

So if I could give a suggestion for future design, I'd just like to see something implemented and maybe you'd dig where I'm coming from, maybe GSD is the right home for the feature because it's 85% of the way to what i've been working for.  
What I would like is a manager agent that just wakes up on a timer like every hour or so, watches a folder with my notes where I'd just continuously make comments about  the development of my projects in canonical notes, the manager would break those notes down by project and update spec docs in a separate folder and make todo lists, and then spawn CLIs with something like GSD in each of my affected projects, requesting that edit summaries be provided back to a folder that functions as my inbox.

There's no reason why CC couldn't manage keeping track of my notes and decomposing them into task lists, it can run terminals, the terminal CLIs can perform the edits needed, and all I'd ever have to do is see updates on the dev logs and occasionally open up my projects and make notes about what I like and what I don't like.

That's something I've been working on on my end but I'm kind of reinventing the wheel when things like GSD already exist to do most of the decomposition, so I'm thinking about making the manager layer myself on top of GSD on my machine. i'm also working on a mobile app where I can talk to my terminal from my iphone which for me would close the loop if I had all that.

---

### u/0xraghu (score: 3)

Hey u/officialtaches Thanks a lot for creating this framework.. It is helping me a lot with my workflow. I could just manual verify everything before moving to the next phase.. and it is so simple to understand too. Great work!

I had a thought that could improve user experience with Claude Code. Why not show the GSD project metrics on Claude's Statusline?

So I created a PR for the same: [https://github.com/glittercowboy/get-shit-done/pull/73](https://github.com/glittercowboy/get-shit-done/pull/73) 

**Key highlights:**

* Adds a quick setup command (/gsd:setup-statusline) that injects the integration into your .clauderc.
* Tracks metrics in a metrics.json file (auto-generated for existing projects).
* Supports customizable display styles (progress bars, minimal text, hacker vibes, etc.).

Would be great to know your thoughts, feedback or comments!

---

### u/Miserable_Review_756 (score: 3)

Just some feedback bugbot is picking up: 

 why so many bugs in the agents and the way they work? 



⏺ Good question. A few likely causes:



  1. Multi-agent coordination without automated validation



  These are markdown specification files, not code. There's no compiler catching when gsd-planner says "DISCOVERY.md" but gsd-phase-researcher writes "RESEARCH.md". Unlike code with tests, spec drift goes unnoticed until runtime.



  2. Rapid iteration



  The GSD system has many moving parts (planner, executor, researcher, synthesizer, checker, debugger, etc.) that evolved over time. New features get added to one agent without updating all the others that depend on it.



  3. Copy-paste with incomplete updates



  Most bugs followed this pattern:

  \- ${PHASE} vs ${PADDED\_PHASE} - copied code, missed variable rename

  \- XX-name placeholders - copied from template, never made concrete

  \- human-action for auth gates - reused existing type instead of defining new one



  4. No single source of truth



  File naming conventions, checkpoint types, and path patterns are defined inline in each agent rather than in a shared reference. When something changes, you have to find-and-replace across 10+ files.



  Potential improvements:

  \- Shared constants file that agents reference (file patterns, checkpoint types)

  \- Cross-agent validation script that checks producer/consumer contracts

  \- Integration tests that verify agent A's output matches agent B's expected input

---

### u/corpa (score: 3) (reply, depth 1)

Its cc only from what I know but there are some forks. At least I found one for opencode and its works there. I am thinking about getting a chatgpt subscription and use the gpt 5.2 with cc. I am already using GLM with cc to have a more cost effective model for implementation

---

### u/blackcud (score: 2) (reply, depth 2)

From the official [README.md](http://README.md) : **Already have code?** Run `/gsd:map-codebase` first. It spawns parallel agents to analyze your stack, architecture, conventions, and concerns. Then `/gsd:new-project` knows your codebase — questions focus on what you're adding, and planning automatically loads your patterns.

I am currently testing GSD on an existing project to refactor something and on a new project in a language that I don't know anything about. Can't tell yet, if it is truly working or not.

---

### u/RoninNionr (score: 2) (reply, depth 2)

I have a workaround:  
Use simple script to rename [CLAUDE.md](http://CLAUDE.md) while using GSD and rename it back when we need to use CC in the project outside GSD.  
EDIT:

Or even cleaner:   
Separate git worktree for non-GSD work with [CLAUDE.md](http://CLAUDE.md) gitignored, though that adds sync overhead.

---

### u/Coded_Kaa (score: 2)

Nice will definitely check it out today

---

### u/Practical-Bell7581 (score: 2)

Hey, I just started using your project a couple hours ago.  Can you give me any advice on this situation? I have an alpha of a project that I like, but want to rebuild it with stronger methodology. Right now I’m trying to figure out the appropriate time to inject in my personal knowledge and introduce the work I have done already, what skill would be best to do that etc. context: vibe coded in python, learned a lot of lessons, decided the project would greatly benefit from a hard typed highly opinionated language. Rebuilding in go. I have working python code but I want to make sure I don’t bake in any of the “bad” lessons from it. Anyway, the relevant code was slated by GSD for phase 1. 

Is gsd:discuss-phase 1 the right method for getting into a brainstorming session and creating strong useful documentation for the build process?

---

### u/Miserable_Review_756 (score: 2)

Does it work with codex or cc only?

---

### u/Lazy_Polluter (score: 2)

Thanks for publishing.  I used your worklow for a large monorepo and it still works fantasticly. So this  isn't just for small projevts but works for feature development in existing projects just as well

---

### u/AdCommon2138 (score: 2)

I don't know if you are using Jules but you should if you aren't. There is API endpoint so you could make it work overnight by spamming do thing.md which would iteratively work on some features you want.

---

### u/Hireswish (score: 2)

Excited for the new update. I have been using it on one of my projects to try it out since your first post about it. 

Really like the structure but it was just feeling a bit slow in some cases due to the numerous steps for each phase. If you have been able to speed it up, that sounds amazing, thank you!!

---

### u/Mulct (score: 2)

Been using this and loving it so far, would love the option to execute multiple phases one after the other so it’s kind of set and forget then come back and review once a certain checkpoint has been hit

---

### u/ripitup2004 (score: 2)

This is epic. Could this somehow be run using Google's Antigravity or is it a Claude Code only approach?

---

### u/shoe7525 (score: 2)

Yo this is... Strikingly similar to my workflow: https://github.com/benjaminshoemaker/ai_coding_project_base

Are you interested in taking contributions? It seems crazy to do this similar of work in parallel.

---

### u/milanster (score: 2)

Any plans to make it work with opencode?

---

### u/derekkddj (score: 2)

can I use it with opencode ?

---

### u/angry_cactus (score: 2)

Impressive! Damn. The productivity is off the charts. Before we know it, GSD will self improve and evolve into its own AI model.

---

### u/Miserable_Review_756 (score: 2)

How do I make it clear the context and continue going into the next phase over and over and over again until it's completed? Or does it stop every time a phase is complete?

---

### u/digitalml (score: 2) (reply, depth 1)

This!! OP. Please add a YOLO mode. It should auto continue onto everything. If selections need to be made. Select everything and push on.

---

### u/dietcheese (score: 2)

Serious question: did you vibe code this entire project?

---

### u/officialtaches (score: 2) (reply, depth 1)

Yes!

---

### u/Nice_Chicken_9927 (score: 2)

can you add one more sub command specifically for reporting issue ? something like /gsd:report-issue 'description' and github issue related to that ?

---

### u/Keblue (score: 2)

Can you make the subagents different models like sonnet or haiku?

This eats through tokens on a claude max 5x plan.

---

### u/jcheroske (score: 2)

I built a wrapper that adds multi project support for my monorepo. It's working great with the new version. Haven't tried out the new SQLite stuff yet. I love this library so much.

---

### u/junebash (score: 2)

I was super-skeptical of GSD. I have not jumped on the Ralph Wiggum bandwagon; my experience with long-running, autonomous tasks has been quite poor.

That being said, I have to admit, I've been really impressed with GSD. What I like about it is it keeps the human _very_ firmly in the loop; it does a LOT of work in a short period of time, and then checks back in to make sure it's still on track, and automatically knows to correct course if it's not. You've really cracked something awesome here. Well done!

---

### u/HardChalice (score: 2) (reply, depth 2)

Thats useful to know. I think I did most of my work with sonnet but that one command that spawns 4 research agents just _chews_ through tokens its wild.

---

### u/officialtaches (score: 2) (reply, depth 1)

Tens of thousands of people disagree

---

### u/wolverin0 (score: 1) (reply, depth 1)

https://github.com/glittercowboy/get-shit-done/issues/97#issuecomment-3761274487 or something thst does something similar! Please!!

---

### u/AsterixBT (score: 1) (reply, depth 2)

It caught my attention that after the update when calling /clear a new window shows up. Does this have something to do with "surviving clear" commands? I didn't have enough time to investigate.

EDIT: it's the check for update on new session.  
It seems like it started using a lot of web searches, and I mean ... alot :)  
Also quite bruteforcing with multiple subagents. Which makes token usage significantly higher.

---

### u/NoNoCookie (score: 1) (reply, depth 1)

Would be really nice to integrate [superpowers](https://github.com/obra/superpowers) tdd method where tests written first at the beginning of each phase before writing any implementation code.

---

### u/jcheroske (score: 1) (reply, depth 2)

Would like to see red phase green phase development too worked into gsd.

---

### u/songokussm (score: 1) (reply, depth 2)

How would you use this in Gemini or codex ?

---

### u/BassMillerTime (score: 1) (reply, depth 1)

Had this same question. Debating on slimming my Claude md down to just include command shortcuts and a few other things. Then if I ever move off gsd I can have it rebuild architecture from the gsd mds

---

### u/wakkowarner321 (score: 1) (reply, depth 1)

Before I got to the end of your message I was thinking "Yeah, and if you set it up receive text messages and shove their contents into the folder, then you can just send out an idea when it pops in your head and it might just be implemented by the time you get home!"

Doing a quick search on this showed me: [https://www.twilio.com/docs/messaging/tutorials/how-to-receive-and-reply/python](https://www.twilio.com/docs/messaging/tutorials/how-to-receive-and-reply/python)

As well as: [https://n8n.io/integrations/claude/and/sms-it/](https://n8n.io/integrations/claude/and/sms-it/)

---

### u/officialtaches (score: 1) (reply, depth 1)

Enjoy!

---

### u/wakkowarner321 (score: 1) (reply, depth 2)

How are you finding GLM? I actually bought a subscription too. I was working on a project and was wondering if GSD could help make other models "smarter" at the executing. I think it is doing so, but the experiment is still ongoing.

Basically my current experiment started with me taking my existing code and duplicating it across 3 folders. One folder for Claude Code using Claude models. A second folder for using Claude Code using GLM. A third folder as the starting point just so I can easily diff the files to see how they have changed over time (and being able to compare this side by side).

I've found that GLM is going a lot faster because I'm not running out of context window (I only have a Pro level plan for Anthropic). Not sure if GLM is smarter or dumber, but being able to just throw more tokens at it without being forced to stop is making progress a lot faster. I also find that I'm more comfortable doing more verifying and discussing via GSD for the GLM, whereas for the Claude models I have to make a judgement call to determine if it is worth the usage. I once burned through my 5 hour usage in 7 minutes on the Claude side while the GLM side just kept on running for 54 minutes until it was done (I hit 20% of my 5 hour limit in that instance, the most I've burned up at once).

---

### u/officialtaches (score: 1) (reply, depth 1)

Fucking genius!

---

### u/officialtaches (score: 1) (reply, depth 1)

Yes! Type /gsd:settings and choose the “balanced” or “budget” model profile.

---

### u/Tight_Heron1730 (score: 1)

Good work, I like that way. How do you keep your agents in track? They tend not to follow md. What did you use to keep them in line?

---

### u/Bidalos (score: 1)

Dude ! Great thanks, first time Im doing agentic coding and this is my first orchestrator I use... but damn it's good. Also using it with GLM 4.7 on CC !

---

### u/Lucky_Somewhere_9639 (score: 1)

Thank you for creating this. I love it so much!

---

### u/HzRyan (score: 1)

you got another star! Looks amazing

---

### u/dbliss (score: 1)

How does this compare something like Kiro with new context per task?

---

### u/CrypticViper_ (score: 1)

I can't speak for GSD, but I just have to say that three of your prompts alone (create-prompt, run-prompt, whats-next) have genuinely been so awesome in getting my words into action. Thanks a ton for your good work!

---

### u/nitroedge (score: 1)

Great work Taches! I'm a fan and learned so much from you from your Bitwig adventures, sweet to see you code too!

---

### u/spinozasrobot (score: 1)

This looks fantastic as I've been slowly building my own solution as I learn how it works... you are miles ahead.

Question, I prefer running CC in VSCode.  Is it possible to use GSD in VSCode?

---

### u/BuildAISkills (score: 1) (reply, depth 1)

I’m 99% sure you can. Try it.

---

### u/BrowsingCoins (score: 1)

I was playing around with your plug-in freedom system (thanks for that but the way!) and wondering if you think gsd would work well inside that framework or even if switching to gsd you think would be better? Maybe some hybrid?

---

### u/LargeDan (score: 1)

Doesn’t CC use subagents by default if you tell it to though? How is this different?

---

### u/flyryan (score: 1) (reply, depth 1)

You should spend an hour using it and you'll see why. It's a better orchestrator and gives you the tools to manage context effectively without taking up a bunch of context itself when not using it.

---

### u/TheSwissArmy (score: 1)

What plan do I need to be on to really make use of GSD? I’m only on Pro

---

### u/ImJohnGalt (score: 1)

I'm keen to try this, but now that I've installed it, I get a SessionStart:startup hook error. Any idea why? Is it conflicting with something else?

---

### u/WhySoAn0n (score: 1)

Thank you for making my entire methodology useless &lt;3.

---

### u/XenophonCydrome (score: 1)

Just wanted to say: incredible job pulling this all together in a nice self-contained package that doesn't add unnecessary complexity.

I was essentially doing almost each of these phases of work-breakdown and verification loop with local git commits a few months ago but it was nowhere near as clean and token-efficient.

One of the most unique aspects that I love is the "what should I do next" paradigm with suggestions of the next slash command and the usage of the form-style elicitation menus. It is like you are an interviewer giving Claude a toy problem and it correctly comes up with clarifying questions to understand the problem's domain constraints.

---

### u/Miserable_Review_756 (score: 1)

Have i done something wrong here? u/officialtaches 9% context left... ? 

https://preview.redd.it/wah7n9kwg1eg1.png?width=905&amp;format=png&amp;auto=webp&amp;s=5be1c57168e3d8be4786d667f38ff815f6249e07

---

### u/forchesta (score: 1) (reply, depth 1)

I have the same issue! Any advice on what to do? How to handle compacting mid GSD workflow

---

### u/HockeyDadNinja (score: 1)

How much of this has been on the head of the tree for the past week? I've been using GSD since last Sunday on a new project and it's been quite amazing and thorough.

---

### u/Maddy186 (score: 1)

I'm curious, can this be adapted to codex and or antigravity?

---

### u/HardChalice (score: 1)

Is a Claude Pro plan viable for this? I feel like I hit the limit super fast. Is everyone using this on a Max subscription or using the API? I like claude but for home ai-assisted side projects, I run into usages caps so quickly.

---

### u/MikeMilzz (score: 1) (reply, depth 1)

I have Pro and was using with Sonnet. Cranked away on some planning this morning and hit my limit in 30min or so. Changed to Haiku this afternoon and was able to get some work done and didn’t hit the limit. I thino I’m more than 50% through my weekly limit in 2 days, so it’s useful on Pro for focused work I’d say.

---

### u/Milgraph (score: 1)

Are you willing to make this work with opencode and with different models?

---

### u/sebas_deedee (score: 1)

I just started today with GSD and already love it over the alternatives. BMAD is cool but is too much. Thanks a lot!

I have a questions, or maybe a suggestion... is there a way or a plan in order to revisit/modify plans? After planning a phase I like to visit every plan and some times I have suggestions, is there an official way to do that?

Thanks again for your work! &lt;3

---

### u/Beautiful_Ad3779 (score: 1)

So as we start to use CC with this. When we do get compacting happen. Do we just continue as normal or do we have to /clear at some point?

---

### u/[deleted] (score: 1)

This is really great. I have been using it this morning, and have gotten shit done.

---

### u/DeusMachinio (score: 1)

Can I use it in VS Code with OpenAI Codex

---

### u/Maximum_Term_7602 (score: 1)

Could GSD work with multiple work trees?

---

### u/jrhabana (score: 1)

Hi u/officialtaches GSD  is awesome. Kudos to you!,   
I have some questions

\- is possible to force the research use chunkhound ?  
\- is possible to configure some skills to from the plan assign them, example: "backend-developer"

\- plugin in the conversation: I launch the plan command, and have some iterations, back-and-forth messages, how to maintain the conversation with the command-skill and not with the plain model (opus, sonnet, etc without the skills adjustments)

thanks

---

### u/Okkamagadu_ (score: 1)

This method is slow and overrated. This is like slowing down the entire thing to human level. This is a step backward and definitely doesn't work for brownfield projects.

---

### u/Okkamagadu_ (score: 1) (reply, depth 2)

I am happy it works for those 10 of thousands. I do like the  level of details it goes through, which is the right approach, but is too slow. Interviews that the agent is running works only when done via speech to text. Typing in to build those plans, not so much. This cannot scale. GSD plans should run built outside of CC and not with CC. It can be done outside via similar appraoch but more customizable with something like Langchain/graph or Crew AI with Eleven Labs.

---

### u/BigBrotherBoot (score: 1) (reply, depth 2)

I think tens of thousands of people probably see the novelty of this approach and a fraction of a fraction of them have actually built anything with your toolset. All I see is you choosing to be salty about the only constructive criticism on this thread. Makes you and this tool seem fragile.

---

### u/Paddington_the_Bear (score: 1) (reply, depth 1)

Tried it today on a relatively simple "brownfield" project that I had already been having great success building piece meal with built in Claude Plan mode. Was initially impressed with GSD asking some thoughtful questions and generating some nice docs, but after a couple hours I decided to give up on it and revert back to before using it. It's extremely slow for the level of code it's generating that regular Claude would have completed in 1/10th of the time.

Maybe a greenfield project it is alright, or for junior devs that don't know what they want to do.

---

### u/technology_rules (score: 1)

so im running CC on warp. Is there a way to get notified on my phone when it's waiting for my input? like when a planning phase is finished?

---

### u/corpa (score: 1)

Thanks for your work! Cant wait to try this out. I already did quite a bit with gsd and I enjoy it a lot. I really like the whole milestone/phases/plan loop.  

I dont have claude max and my workflow is to create the phases/plans with claude opus in one terminal and in another terminal I am using my GLM sub with claude code to execute the plans and so far its working great.  
I might switch to openai pro plan and try it with gpt 5.2 with claude code because I heard a lot of good things about gpts planning capabilities and you can get a lot more usage with it compared to opus.

---

### u/officialtaches (score: 1) (reply, depth 1)

Cheers brother! Highly recommend you update.

Have you tried Claude Code Router?

---

### u/corpa (score: 1) (reply, depth 2)

No I didnt try this one. Thanks for the suggestion it looks interesting. I was wondering if you use some "PR"/code review agent for the changes that were implemented after the plan execution or even after a phase is completed?  

I know that you get some manual testing suggestions after the plan is done to check if everything is working but I also didnt specify yet that I want to do unit tests or even e2e with e.g. playwright.  

I tried a few times to review the latest plan implementation with a custom prompt to gemini pro that creates a code review md in the same format as the plan/summary files from gsd and it actually didnt really found much. I would say in 90% of my small test size it said the implemented code was good and included everything that was included in the plan.

---

## Extracted Tips and Insights

### Core GSD Architecture

- **Multi-agent orchestration**: System spawns specialized agents in parallel (4 researchers, parallel coders) rather than one long conversation
- **Context management is the key problem**: Claude has ~200k tokens of context. At 10% usage it's sharp; at 50%+ quality tanks with hallucinations, forgotten constraints, and drift
- **The fix is orchestration not prompting**: Break work into small, focused sub-agent tasks. Each sub-agent gets only the context it needs and operates in a fresh context window
- **Documentation-driven development**: System creates project.md, progress.md, and milestone-based planning files that persist context across agent invocations

### GSD Workflow

1. `/gsd:new-project` - Initialize and research existing or new project
2. System creates `.project/` directory with documentation, milestones, progress tracking
3. Orchestrator agent plans and delegates to specialized sub-agents
4. Sub-agents work in parallel with fresh context windows
5. Results are aggregated and progress is tracked in markdown files

### Key Principles for Autonomous Productivity

- **Keep context windows fresh**: Don't let a single conversation accumulate too much context
- **Specialize agents**: Research agents, coding agents, review agents each get focused context
- **Parallel execution**: Multiple sub-agents can work simultaneously on independent tasks
- **Persistent documentation**: Use markdown files to maintain state across agent invocations rather than relying on conversation memory
- **Milestone-based planning**: Break projects into milestones with clear deliverables
- **Works with existing projects**: Can initialize on brownfield/existing codebases, not just greenfield

### Model Usage

- Author runs Opus 4.5 all day, rarely hits limits unless going hard
- Orchestrator could use even Haiku since complex work is handled by sub-agents
- Sub-agents handle the heavy lifting and could be set to Opus

### User Experiences

- Users report completing milestones quickly with the orchestration approach
- Works with eBPF firewalls, full-stack web apps, and other diverse project types
- Some users compare favorably against alternatives like Speckit and Clavix
- Integration with existing CLAUDE.md files requires some consideration for projects already in progress
