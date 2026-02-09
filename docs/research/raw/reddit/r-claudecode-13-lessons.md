# I've used AI to write 100% of my code for 1+ year as an engineer. 13 no-bs lessons
**Score:** 670 | **Comments:** 93 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/ive_used_ai_to_write_100_of_my_code_for_1_year_as/
**Author:** u/helk1d

## Post Content

1 year ago I posted "12 lessons from 100% AI-generated code" that hit 1M+ views. Some of those points evolved into agents.md, claude.md, plan mode, and context7 MCP. This is the 2026 version, learned from shipping products to production.

**1- The first few thousand lines determine everything**

When I start a new project, I obsess over getting the process, guidelines, and guardrails right from the start. Whenever something is being done for the first time, I make sure it's done clean. Those early patterns are what the agent replicates across the next 100,000+ lines. Get it wrong early and the whole project turns to garbage.

**2- Parallel agents, zero chaos**

I set up the process and guardrails so well that I unlock a superpower. Running multiple agents in parallel while everything stays on track. This is only possible because I nail point 1.

**3- AI is a force multiplier in whatever direction you're already going**

If your codebase is clean, AI makes it cleaner and faster. If it's a mess, AI makes it messier faster. The temporary dopamine hit from shipping with AI agents makes you blind. You think you're going fast, but zoom out and you actually go slower because of constant refactors from technical debt ignored early.

**4- The 1-shot prompt test**

One of my signals for project health: when I want to do something, I should be able to do it in 1 shot. If I can't, either the code is becoming a mess, I don't understand some part of the system well enough to craft a good prompt, or the problem is too big to tackle all at once and needs breaking down.

**5- Technical vs non-technical AI coding**

There's a big difference between technical and non-technical people using AI to build production apps. Engineers who built projects before AI know what to watch out for and can detect when things go sideways. Non-technical people can't. Architecture, system design, security, and infra decisions will bite them later.

**6- AI didn't speed up all steps equally**

Most people think AI accelerated every part of programming the same way. It didn't. For example, choosing the right framework, dependencies, or database schema, the foundation everything else is built on, can't be done by giving your agent a one-liner prompt. These decisions deserve more time than adding a feature.

**7- Complex agent setups suck**

Fancy agents with multiple roles and a ton of .md files? Doesn't work well in practice. Simplicity always wins.

**8- Agent experience is a priority**

Treat the agent workflow itself as something worth investing in. Monitor how the agent is using your codebase. Optimize the process iteratively over time.

**9- Own your prompts, own your workflow**

I don't like to copy-paste some skill/command or install a plugin and use it as a black box. I always change and modify based on my workflow and things I notice while building.

**10- Process alignment becomes critical in teams**

Doing this as part of a team is harder than doing it yourself. It becomes critical that all members follow the same process and share updates to the process together.

**11- AI code is not optimized by default**

AI-generated code is not optimized for security, performance, or scalability by default. You have to explicitly ask for it and verify it yourself.

**12- Check git diff for critical logic**

When you can't afford to make a mistake or have hard-to-test apps with bigger test cycles, review the git diff. For example, the agent might use created\_at as a fallback for birth\_date. You won't catch that with just testing if it works or not.

**13- You don't need an LLM call to calculate 1+1**

It amazes me how people default to LLM calls when you can do it in a simple, free, and deterministic function. But then we're not "AI-driven" right?

EDIT: Your comments are great, they're inspiring which points I'll expand on next. I'll be sharing more of these insights on [X](https://x.com/QaisHweidi) as I go.

---

## Top Comments (Tips/Insights)

### u/TrackOurHealth (Score: 29)

I’ve been using AI extensively on some giant monorepo. 

It’s incredibly important to set up VERY strict ground rules in the project in CLAUDE.md and AGENTS.md - automated reviews depending on the tool need either!

And even with those CLAUDE/AGENTS.md expect rules to not be followed consistently. 

But hopefully you have some automated code reviews and those code reviews should be very focused on different aspects and respecting the rules. I personally have 3 different automated code reviews from GitHub when I create a PR. Plus daily automated code reviews via Claude.

Than being said it’s very important in the rules to insist on consistency, not allowing to redo things multiple times in different ways, always check existing code and not allowed to duplicate code.

Guidelines as to where to put things are critical. Absolutely critical.

Expect plenty of security problems. Your automated code reviews are critical.

---

### u/glenrage (Score: 27)

Finally a real useful write up that’s not AI slop

---

### u/Bellman_ (Score: 26)

really resonates with the "first few thousand lines" point. i have started treating the initial setup phase like building a template that the AI will pattern-match against for everything else. if your first component is clean with proper error handling and tests, every subsequent component follows that pattern. if your first one is sloppy, you spend the rest of the project fighting against the precedent you set.

the multi-session workflow is where i have seen the biggest productivity gains. running oh-my-claudecode (OmC) to manage parallel claude code instances changed my whole approach - instead of one massive serial conversation, i break the work into independent streams. one session per feature or service boundary. each session stays focused and the context stays clean: https://github.com/Yeachan-Heo/oh-my-claudecode

one lesson i would add from my own year of 100% AI code: **invest heavily in your test suite early**. the AI is incredible at generating code but mediocre at verifying correctness. having a solid test framework means you catch regressions immediately when the AI makes a change. i treat my test suite as the source of truth and the generated code as disposable.

---

### u/zarianec (Score: 12)

This legit felt like reading my own thoughts. Really good write-up.

---

### u/Michaeli_Starky (Score: 10) [reply]

> Test coverage is paramount. Enforce TDD.

---

### u/x_typo (Score: 7) [reply]

> even lost count on how many times i tweaked CLAUDE/AGENTS.md...

---

### u/survey_this (Score: 6)

I’ve heard conflicting information on size and number of .md files. Do you have better luck with one giant .MD file or separate smaller ones outlining each part of the codebase with a master file outlining what is contained in each?

---

### u/MindCrusader (Score: 5) [reply]

> Wanted to comment the same, most of such "tips" are either ai slop or vibe coder tutorial

---

### u/helk1d (Score: 5) [reply]

> I do have a docs folder, it's where context management becomes critical, claude still rush into making changes without getting enough context (gpt models do it less), that's why i like for each feature to have only 1 doc file, let's say having rate limiting, i would do research, plan, once i'm happy i start implementation, note that everything the agent need to know about this feature is already in that singe doc file, so i can start in a fresh session whenever i want without having it miss some points.
> 
> in this case, this doc file might become huge, what i would do is start to trim the parts that no longer matters, like there is no need to have any code inside that doc, or if i have 6 phases of implementation steps, and i've done the first 4, i would summaries them and only keep the critical parts that the agent must still know, which reduces the file size, remember that this singe doc file contains everything the agent needs to know about this feature, context management here is key
> 
> whenever i want to do something related to this feature, i would start the session by saying: "docs/rate-limiting.md read the entire doc...." and tell it what i want to be done, because i don't trust it to check that file on its own even when mentioned in claude/agents\[.\]md files

---

### u/hyma (Score: 4)

Do you have a repo with examples of your clean workflows, etc?

---

### u/TrackOurHealth (Score: 3) [reply]

> I tweak them all the time. Actually I have both Claude and codex tweak them for me!

---

### u/autocorrects (Score: 3) [reply]

> Same. Im a bit confused about point 7 as I have a folder within a codebase called docs where I have a ton of .md files. I will point to for reference if it is relevant to complete a task, and some of these files have references to other markdown files. I tend to get really good results with what I do specifically and in this workflow. 
> 
> Should I be manually assigning an agent to one markdown file at a time instead? I dont even know how to assign an agent lol, I just integrate into the prompt like “In accordance with @xyz.md , I would like to add a module that does [some action]. Please reference the work we did in @abc.md for context and to avoid redundant info/mistakes we made in the past”

---

### u/lgbarn (Score: 3)

Nice write-up and I agree with almost all of it. #7 I feel that multiple agents with a single task/role is a must. Multiple checks with different roles are more likely to produce quality code than a single agent with multiple roles.  

---

### u/wifestalksthisuser (Score: 3)

Nice write up, thanks for putting in the effort. I agree with almost everything but I think you contradict yourself unknowingly in Points 4 and 7. I think Point 7 unlocks Point 4. A good agent setup (which tends to be "complex" as in, it's more than just 2 or 3 lines) enables you to basically re-use the same prompt to get things done. 

Like you, I spent a crazy amount of time and effort in the foundational stuff: thinking about what i want this project to be, splitting it up into manageable and technically detailed tasks/user stories, and then my agent setup will pick whatever tasks that makes the most sense (based on changelog, priorities, lessons learned, status, etc.)

---

### u/ml_guy1 (Score: 3)

I've been working on solving the problem #11 where the code is not optimized by default. I am wondering how you would like to see the ideal workflow to make the code be more optimal for you?

---

### u/ultrathink-art (Score: 3)

Point 1 really resonates. I run a multi-agent setup where each agent role (coder, designer, QA, etc.) gets its own .md file with role-specific instructions, and there's a hierarchy — project-level CLAUDE.md for shared rules, then agent-level overrides. The first few hundred lines of those instruction files determined whether agents would produce coherent work or chaos.

One thing I'd add: codify your failures, not just your patterns. Every time an agent makes a mistake that wastes time, I add a specific rule to prevent it. My CLAUDE.md has entries like "NEVER use threshold-based black removal — destroys internal outlines" because an agent did it once and wrecked a batch of designs. Those negative rules are often more valuable than the positive ones because they prevent the exact class of mistake LLMs love to repeat.

---

### u/rbrick111 (Score: 3)

About a year in myself, 15 years in high-performing enterprise/SaaS dev shops before that.
Love this write-up - the level of insight and detail really resonates with my experience.
When I can’t one-shot something, I use an accelerated version of the technical discovery process we used in human coding times:
Problem setup - Mix of technical and business context, but you need at least a clear problem and desired outcome. I often do these as stream-of-conscious dictations and have Claude organize them.
Competing approaches - Ask Claude for 3 approaches, evaluated against a matrix (performance, complexity, cost, etc.). You can shape these however you want. We used to do this via brainstorms or hackathons, then compare via matrix. With Claude you can probe and reason through framing just as easily. The approaches are usually the easy part.
Trade-off review - Claude walks you through each approach against the matrix, teaches you the pros/cons. This part can go slow if you’re patient enough to really work the plans. The cognitive load from sheer review volume is real.
Solution design - Traditional planning kicks off for the chosen approach, ultimately getting me to interface-level designs for stuff I wasn’t previously opinionated about.
These cycles take me about 8 hours from problem statement to deployed software. It’s addictive, honestly. I’m doing what used to take 3-5 people a month, in a single day. Over and over. If you know how to build software, there’s never been a better time to build something.

---

### u/Saveonion (Score: 3)

I agree with all of it.


I got nothing, sorry.

---

### u/Mysterious_Fact_8896 (Score: 3)

I think people missunderstood #7.

It is not saying to not use MD files or multiple agents.

It is saying that you should not try and use complicated agents and that no single agent should use multiple MD files which explain it's behaviour.

Using MD files for code and business logic documentation is good practice, and I doubt that someone who wrote 11 great points would not know that.

#7 should be more like:
Keep your agents simple, single responsibility principle applies here, with instructions for that agent's behaviour that fits within a single MD file.

---

### u/helk1d (Score: 2) [reply]

> haven't tried oh-my-claudecode, i just manage them myself, it's like having a team of devs working for you and you're managing them, but what you mentioned is correct for sure.
> 
> test suite is one of the guardrails i was talking about! but the tricky part here is that AI could write thousands of unit tests that are useless and just gives you a false sense of having good tests

---

### u/DotPhysical1282 (Score: 2) [reply]

> I’ve been using Conductor for a few months. Essentially a UI creating workspaces for you (equivalent of work trees). Sometimes I’ll have 2/3 agents for the same project going on at the same time.

---

### u/fullouterjoin (Score: 2) [reply]

> You can use gemini/ai-studio to summarize YT videos into whatever format you want. Keep a knowledge doc of things you already know so that when you summarize, you can summarize for novetly and not just everything.
> 
> Getting good at CC or any tool is about constant deliberate practice. Build  the same thing over again using different techniques, learn what works and what doesn't. Use it to solve as many different kinds of problems. Focus less on the output and more on the techniques. Have it teach *you* what you need to know and don't just use it as a magic cornucopia.

---

### u/helk1d (Score: 2) [reply]

> thanks! that's why i added "no-bs lessons" in the title :)

---

### u/Nosenchuck3 (Score: 2) [reply]

> I have the same exact setup as you do with a ‘docs’ folder containing a ton of .md files. What I have learned is that Claude is only as good as your prompt. Every time I ask Claude to make some change I ask it to read the .md files. Then after the change is made I tell Claude to update the .md files. 
> 
> Everything goes really smoothly. But setting up all the .md files took a lot of time and precision

---

### u/helk1d (Score: 2) [reply]

> thanks! please check this comment [https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/comment/o41zl5f](https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/comment/o41zl5f) and let me know what you think!

---

### u/helk1d (Score: 2) [reply]

> yeah i wait for it to repeat the same mistake multiple times then i add it claude/agents\[.\]md

---

### u/helk1d (Score: 2) [reply]

> yeah i think i should've clarified point 7 more, what you said here is correct

---

### u/Worried_Advice1121 (Score: 2)

Controlling a large scale codebase easily becomes hard.

---

### u/DR_Fabiano (Score: 2)

When you write **Complex agent setups suck, I agree. But how to reach simplicity?**

---

### u/Numerous_Pickle_9678 (Score: 2)

Hot take but if your gonna vibecode: I think setting a code coverage threshhold of 90+% , high mutation score (kill all mutants ideally), also use a bunch of other static code anylisers, have max lines of code per file, enforce jsdocs on linter and have a super strict tsc + lint , can use metrics like fan-in fan-out to improve quality as well. Cyclomatic complexity of 1-10 is achevaible and should be a hard gate. For frontend design use storyboard to make primatives than build up from there. This all works if you spend your time enforcing git hooks and ci/cd no skips allowed in [agents.md](http://agents.md) and must always pass CI.

---

### u/OkBet3796 (Score: 2)

Exactely my experience, git diff was a new thing for me tho 👌

---

### u/landed-gentry- (Score: 2)

Counter-perspective on point 1: I have found that refactoring a codebase some time after you learn lessons about the "right way" to do it is actually not that painful -- even 10s of thousands of lines into doing it the "wrong way". This is especially true of newer models like Opus 4.5+ and Codex 5.1+.

This isn't to say you shouldn't try your best to do it right the first time -- and invest a disproportionate amount of time at that stage! Just that it's not the end of the world if you don't get it right.

---

### u/Left_Fieldhitem (Score: 2)

Best post of the week. Excellent guide to follow. Couldn't agree more.

---

### u/ZeroBraneZ (Score: 2)

Excellent points 👏
Surprised at how many people jump to complex setups before testing out simple ones. These things work almost out of the box

---

### u/triplethreat8 (Score: 2)

Point 1 is HUGE! I would even argue YOU should always write the first 1000 lines.

I have had such a head ache with AI starting projects. All the planning on the world and it will still do strange stuff. Ice found spending a day or two writing myself and then handing off gets a lot better results.

---

### u/somerussianbear (Score: 2)

20y experience swe here. I’ve been building production software (high throughput APIs) for the last 13 months with AI and using less and less manual coding till Codex-5.2 and Opus/Sonnet 4.5, when I finally started doing full AI output. I can say that all your points sound like my words so I’m quite happy I’m on track. I don’t do parallel agents on the same branch yet, I prefer to parallelize features instead, but it’s something I’ll start doing now, especially with agent teams. 

Number 12 is so real, there’s probably a trait in LLMs to use fallbacks in everything. We should be able to turn that down and have real early throw convention implemented.

Number 1 is law. Relates to #8 also. Over time I changed my architecture to fit the agent better. Real gains. My turns used to take 15min for a feature, down to 7 now.

Number 4 was my test strategy also, now I get a feature in 1 shot quite often, with 2 or 3 extra turns when the models are on those days.

Number 7 is absolute truth. I started with PRD generators and now I have a couple of basic MDs and get it working much better. But gotta consider that the models evolved a lot in the last 9 months.

Number 10 is a nightmare for other teams, but I work alone so I’m just blessed I guess.

Anyways, I could tell 10 war stories on each of the points you raised here but I’ll digress.

Good writing, saving here as this looks like something I’d write if my ass wasn’t that lazy.

---

### u/Any_Win5815 (Score: 2)

Wow, I really like this! I've been working with AI in a similar way.

---

### u/AstronomerSenior2497 (Score: 1)

Your experiences completely align with my own. Nice writeup.

---

### u/sintmk (Score: 1)

Re: 1. This is gospel truth. I'd love to know more about your process. I'm am older systems guy, but had to deep dive genAi for some work related policy stuff. The necessity for systems governance was immediately apparent and I've put together a dev framework I'm just getting ready to let the world bounce off of. Setting up the git this evening, so this was oddly cool timing.

---

### u/majornerd (Score: 1)

This is a nice list. #13 is great. I’m a senior exec and have been for a while. I’ve not written code in more years than current languages have been relevant. I’m a decent IT and cyber guy. Working with AI has moved me deeper into AI for some things and away from it (added skills) in others. If it is a collaborative system modern AI is a great tool. If it is just a crutch it’s not.

---

### u/rjyo (Score: 1)

Point 4 (the 1-shot prompt test) is quietly the most useful diagnostic here and I wish more people talked about it. I started using it as a literal health check. If I have to give more than one follow-up clarification to get a feature done, something is wrong with either my project structure or my understanding of what I am asking for. Usually both.

  
The thing I would add is that 1 and 12 feed into each other more than people realize. If your early patterns are clean (point 1), then your git diffs stay small and readable (point 12). When diffs start getting noisy with unrelated changes, that is the first sign your foundation is drifting. I have caught subtle bugs that way, things like the agent silently swapping a UUID lookup for a name-based one because the naming was ambiguous. Looked correct at first glance but would have blown up in prod.

  
Also strongly agree on 7. I went through a phase of writing elaborate multi-agent orchestration with specialized roles and honestly the simple setup of one well-configured [CLAUDE.md](http://CLAUDE.md) plus focused prompts beats it every time for solo work. The overhead of coordinating agents is real and it compounds fast.

---

### u/AfroJimbo (Score: 1)

My CTO called it the hourglass effect. Coding got really fast and cheap. Everything before and after it got harder and more time consumed.  Hes right.

---

### u/oursrequin (Score: 1)

Confused about the 7th point here. I feel like .md files and fancy agents are exactly what helps you to not get absolute garbage slop. These very strict rule are necessary and I always feel like the better the .md file is, the better the output.

---

### u/Dizzy-Revolution-300 (Score: 1)

Well, what are the guard rails? You don't really say anything with this post 

---

### u/Suspicious_List1735 (Score: 1)

Well articulated, matches my experience with coding agents as well, by the way I’m using red64-cli (an open source cli https://github.com/Red64llc/red64-cli) to constraint my development process in a similar way.

---

### u/Remixer96 (Score: 1)

Can you give more specific examples to point #1? Cases where it stayed on the rails and where it veered off?

---

### u/LocalFoe (Score: 1)

I'm thinking of putting all my custom stuff in a personal plugin. Such as 'be proactive and use menus when proposing stuff or drilling down stuff with me'. Any tips on this? I feel like my role is moving from dev to architect

---

### u/brophylicious (Score: 1)

&gt; 13- You don't need an LLM call to calculate 1+1

This is a hard habit to break. It's easy to stay in prompt mode instead of stepping back and doing some things yourself.

---

### u/Present-Access-2260 (Score: 1)

Totally agree on the specialized agent approach. I had a team, Qoest, help design an AI code review system that used separate agents for security, style, and logic checks. It caught way more edge cases than a single all-in-one bot ever could

---

### u/Responsible-Tip4981 (Score: 1)

**13- You don't need an LLM call to calculate 1+1 - you need if you want keep 100% of code written by AI**. 1 + 1 indeed is not a task for LLM.

---

### u/Disastrous-Glove7188 (Score: 1)

That's a smart way to handle the pattern matching. I had a team, Qoest, help me set up a similar multi session AI workflow for a client's SaaS project. We built a dedicated verification layer that ran tests on any AI generated code before it merged, which kept the speed up without letting sloppy patterns creep in. It really made the test suite the anchor for the whole process

---

### u/ravechan36 (Score: 1)

A point to add. Use YAML instead of MD files for the AI. It saves a ton of tokens. I only create an md file if any human has to read it. Of course AGENTS.md or similar files are in md format.

---

### u/Shot_Cash_4649 (Score: 1)

When you say agents, what do you specifically mean. Multiple Claude windows open at once?

---

### u/MakanLagiDud3 (Score: 1)

Not wanting to hijack, want to add a tip that has helped me alot, it's best to use manually approve with me first with CC. What ot does is it let's you know what changes of code they want to edit/create before it executes it.

It's tedious and makes the progress slower sometimes, but it helps you check of it's starting to hallucinate or do changes like remove priority code. That way when checking, you can directly change or avoid removal of priority code instead of having to redo and fix.

---

### u/raj_enigma7 (Score: 1)

This is super on point — especially the “first few thousand lines decide everything” bit. I learned the hard way that AI just amplifies whatever discipline (or mess) you start with. I do something similar using Claude Code + Cursor, and I keep a light trail of early decisions in Traycer so patterns don’t silently rot as the repo explodes.

---

### u/robertDouglass (Score: 1)

My superpower is orchestrating Claude Code and Codex with Spec Kitty!

---

### u/LardAmungus (Score: 1)

I've got a relatively large project going that I want to be 100% written by Claude code, thanks for the insights, I'll be utilizing the lessons you've learned lol

Do you have a GitHub? You're welcome to message me but I'd like to see what kind of work you've done with Claude

---

## Extracted Tips

### From the Post (13 Lessons)

1. **Obsess over early code quality** - The first few thousand lines set the pattern for the entire codebase. Get the process, guidelines, and guardrails right from the start. Those early patterns are what the agent replicates across the next 100,000+ lines.
2. **Parallel agents require clean foundations** - Running multiple agents in parallel only works if you nail clean architecture and process guardrails first.
3. **AI amplifies existing code quality** - Clean code gets cleaner faster; messy code gets messier faster. The dopamine hit from shipping makes you blind to accumulating tech debt.
4. **Use the 1-shot prompt test** - If you can't accomplish a task in a single prompt, either the code is messy, you don't understand the system well enough, or the problem needs to be broken down further.
5. **Engineers have an edge** - Architecture, system design, security, and infra decisions require engineering experience that AI can't replace. Non-technical users will get bitten by decisions they don't know to watch for.
6. **AI didn't speed up all steps equally** - Foundation decisions (framework, dependencies, database schema) deserve more time and thought than feature additions. Don't rush them with one-liner prompts.
7. **Keep agent setups simple** - Fancy multi-role agents with tons of .md files don't work well in practice. Simplicity wins.
8. **Invest in agent experience (AX)** - Monitor how agents use your codebase and optimize the process iteratively over time.
9. **Own your prompts and workflow** - Don't use plugins/commands as black boxes. Customize and modify them based on your workflow and what you notice while building.
10. **Align process across teams** - Team AI usage requires all members following the same process and sharing process updates together.
11. **AI code is not optimized by default** - Explicitly ask for and verify security, performance, and scalability. These are not automatic.
12. **Review git diffs for critical logic** - Agents can make subtle logical errors (e.g., using created_at as a fallback for birth_date) that pass functional testing but are semantically wrong.
13. **Don't default to LLM calls for everything** - Use simple, free, deterministic functions when they suffice instead of making everything an LLM call.

### From Comments

- **Set up strict ground rules in CLAUDE.md and AGENTS.md** (u/TrackOurHealth, score 29) - Set up very strict ground rules, automated reviews, and continuously tweak your instruction files. Treat them as living documents.
- **Treat initial setup as a template for AI pattern-matching** (u/Bellman_, score 26) - The initial setup phase is building a template that the AI will pattern-match against for everything else. Bad early code means bad everything.
- **Enforce TDD and test coverage** (u/Michaeli_Starky, score 10) - Test coverage is paramount. Enforce TDD. Test suites are one of the biggest safeguards when working with AI agents.
- **Continuously tweak your .md instruction files** (u/x_typo, score 7) - Expect to lose count of how many times you tweak CLAUDE.md and AGENTS.md. This is normal and part of the iterative optimization.
- **Use a docs folder with contextual .md files** (u/autocorrects, score 3; u/helk1d, score 5) - Maintain a docs folder with .md files that you point to for reference when relevant to a task. Context management is critical -- Claude tends to rush into changes without enough context.
- **Multiple agents with single focused roles can work** (u/lgbarn, score 3) - Disagreement with point 7: multiple agents with a single task/role can be valuable. Multiple checks with different roles are more likely to produce quality code than a single agent doing everything.
- **Good agent setup unlocks 1-shot prompting** (u/wifestalksthisuser, score 3) - Point 7 (agent setup) and Point 4 (1-shot test) are connected. A good agent setup with specialized roles and instructions is what enables 1-shot prompting to work.
- **Multi-agent hierarchies with role-specific instructions** (u/ultrathink-art, score 3) - Run a multi-agent setup where each agent role (coder, designer, QA) gets its own .md file with role-specific instructions, with a hierarchy of project-level CLAUDE.md at the top.
- **When you can't one-shot, it's a design smell** (u/rbrick111, score 3) - When you can't one-shot a task, it signals either the codebase needs refactoring or the problem needs decomposition. This is a useful diagnostic signal.
- **Point 7 is about complexity, not about avoiding .md files** (u/Mysterious_Fact_8896, score 3) - The point is that no single agent should use multiple complex .md files. Keep each agent's instructions focused and simple.
- **For each feature, provide relevant context docs** (u/helk1d, score 5) - For each feature, like the agent to read relevant docs before making changes. Context management prevents the agent from rushing into changes without understanding.
- **Test suites are critical safeguards** (u/helk1d, score 2) - Test suites are one of the biggest safeguards for AI-assisted development. They catch the subtle errors that manual review might miss.
- **Enforce strict static analysis gates** (u/Numerous_Pickle_9678, score 2) - Set code coverage threshold at 90%+, high mutation scores, strict TSC + lint, max lines per file, enforce JSDoc, cyclomatic complexity of 1-10 as a hard gate. Enforce git hooks and CI/CD with no skips allowed in agents.md.
- **Write the first 1000 lines yourself** (u/triplethreat8, score 2) - Let AI start a project and it will do strange things even with planning. Spend a day or two writing the foundation yourself, then hand off to AI for much better results.
- **Adapt architecture to fit the agent** (u/somerussianbear, score 2) - Over time, change your architecture to fit the agent better for real gains. Feature turns went from 15 minutes down to 7 minutes through iterative architecture optimization.
- **Refactoring later is possible with modern models** (u/landed-gentry-, score 2) - Counter to point 1: refactoring 10s of thousands of lines done the "wrong way" is not that painful with newer models (Opus 4.5+, Codex 5.1+). Still invest disproportionate time early, but it's not the end of the world if you don't get it right.
- **Use manual approve mode for critical code** (u/MakanLagiDud3, score 1) - Use "manually approve with me first" mode in Claude Code. It's tedious but helps catch hallucinations and prevents removal of priority code before it happens.
- **Use YAML instead of MD for AI instructions** (u/ravechan36, score 1) - YAML saves tokens compared to markdown. Only use .md when humans need to read the file. AGENTS.md stays in markdown format.
- **Points 1 and 12 feed into each other** (u/rjyo, score 1) - Clean early patterns (point 1) keep git diffs small and readable (point 12). When diffs start getting noisy with unrelated changes, the foundation is drifting. Caught bugs like agents silently swapping UUID lookups for name-based ones.
- **The "hourglass effect"** (u/AfroJimbo, score 1) - Coding got fast and cheap, but everything before and after it (planning, architecture, verification) got harder and more time-consuming.
