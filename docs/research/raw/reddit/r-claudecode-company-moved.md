# Reddit Thread: "Did my whole company just move to Claude?"

- **Source**: https://www.reddit.com/r/ClaudeCode/comments/1qpbdao/did_my_whole_company_just_move_to_claude/
- **Subreddit**: r/ClaudeCode
- **Author**: u/Ghostinheven
- **Score**: 515 (94% upvoted)
- **Comments**: 183
- **Fetched**: 2026-02-09

---

## Original Post

> Last thursday my company told us to wrap up whatever we were doing by friday's eod because we were starting something new. I thought they were going to give a new project, but no, it's worse. I found out this monday that we're starting to use Claude, *for everything*. And when I say for everything, I mean *everything*. The PMs are going to use it to ask for feedback on product decisions. The designers to churn out designs in Figma. And of course, us programmers are plugging it into the IDE so it spits out code.
>
> I've always been skeptical of AI for coding, but claude actually does it pretty well. That said, using it to this extreme... I don't know if that's the right move.
>
> But anyway, here I am. I'm watching some videos on prompt engineering and tokens and honestly, I want to blow my brains out. They're all nonsense videos telling you how to draft sentences so the AI god pays attention to you. I mean, things like context and keeping it focused make sense, but still.
>
> The company is dedicating the next two weeks to this "hackathon" using Claude, where we have to implement features using it and see what happens. They also gave us subscriptions to traycer for planning and specs, coderabbit for reviews, and suggested we request more tools if we need any.
>
> Can anyone recommend any reading material? Has anyone gone through something like this at their company? What was the result?

---

## Top Comments (sorted by score)

### u/GetDynamoi (score: 141)

> I've been using claude-code since they first made it public about a year ago.
>
> For me, the only useful learning material is experience with it. Use our own agency and curiosity and you'll learn 100x faster than watching videos and how other people use it.
>
> I do pick up useful tips from posts on X and here but only if they are bite sized, it's more like understanding what the new capabilities are and keeping up to date with what the devs are adding to the cli tool.
>
> But I do think this is going to be really hard for people who are not able to self-direct, self-motivate, and aren't curious about the capabilities.

### u/hau5keeping (score: 96)

> You will realize one day that this is how software engineering is done now + its actually more productive when used properly.

### u/Corv9tte (score: 39)

> Sounds like they're doing the right move

### u/HeavyDluxe (score: 34, reply to GetDynamoi)

> Just replying here to highlight something:
> Don't get caught in the social media hype cycle. As other commenters have said, focus on clear RESEARCH-PLAN-IMPLEMENT-TEST cycles and only embrace things you see get traction with trusted developers. For example, the "Ralph Wiggum" mentioned below. There's not nothing to that phenomenon, but every stupid idea that 'revolutionizes Claude Code output' gets its heyday in the thirst for clicks and then winds up proving it was less than promised.
>
> There's usually worthwhile nuggets to glean... But focus on the tried and true.

### u/circuitfive (score: 30)

> The best reading material is Anthropic's official plugin library. Just spend a bunch of time reverse engineering those commands/skills and you'll learn a ton.
>
> https://github.com/anthropics/claude-plugins-official

### u/NoCat2443 (score: 19)

> whatever you do, start with spec-driven development and don't look back... find your own balance or find a tool you like but don't focus on prompt engineering, focus on creating right commands, skills and ensure you do not outsource code review, VAPT and QA to AI please.. it is ok to do 90% of it with AI but human must take a serious look

### u/RoadKill_11 (score: 19)

> Honestly there's not much reading material I think would help you.
>
> I think you have to just use it to get a hang of it
>
> Claude code features are cool (skills, hooks etc) but you don't need most of them to get 90% of the value
>
> Slash commands for CI/scripts are very helpful
>
> Plan mode is good for harder features
>
> I dont think prompt engineering is that useful, the heuristic I try to use is give as much info so that a human eng could do the task. Interrupt frequently if you see it going off track

### u/elcapitansammy (score: 17)

> I'm about 6 months ahead of you. There's no going back. We're starting to automate it so we're focusing more on reviewing plans and PRs instead of writing lines of code. I haven't written code in the traditional sense in about a quarter.
>
> I've been in software engineering over 25 years and this is not a fad. Embrace it and be the person who moves your workflows and codebase knowledge into skills. Sad to say it, but resistance is career limiting.
>
> For complex planning encourage the company to include Codex. It's often better at really hard tasks that require a lot of context.

### u/jbrianfrancis (score: 14, reply to NoCat2443)

> Can't second this strongly enough - spec driven is ESSENTIAL for Claude Code to work properly.
>
> - Plan Mode - Claude's own plan mode has gotten really good
> - Get-Shit-Done - this is the real deal and is being continually updated - https://github.com/glittercowboy/get-shit-done
>
> Don't get sucked into the Ralph Wiggum hype-cycle. If you really want to understand what long-running agent harnesses can do, go back and read the Anthropic white paper - https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents - then look at tools like Autocoder or Automaker.

### u/ahmet-chromedgeic (score: 10)

> Good that they're forcing you, looks like you would fall behind if it wasn't the case.

### u/FactorialANOVA (score: 8, reply to GetDynamoi)

> Thank you I was going to say the same thing! Stop watching videos and go try it for yourself. Like Boris says, don't even code with it just ask questions about your existing code for a while. Then maybe have it plan a small feature, implement and review its work.

### u/Altruistic_Ad8462 (score: 7)

> Wait your company said if you want other tools they'll pay for it, and they're offering an opportunity to the whole company to see who wants to be the AI masterminds? And your thought is, "this sucks". You get to be part of a process that likely dictates your companies technology for the next 5-infinity years and instead of testing the fluck out of it, making yourself a trusted asset that helps guide future decisions, your like, "uuuuggggg".
>
> People dream about being in your shoes. I wish my company gate a damn about AI, I'd immediately become a more valuable piece of knowledge.

### u/TheOriginalAcidtech (score: 6, reply to hau5keeping)

> Its just the new tool. At least for now. From hacking hex codes to asm to C to modern high level languages to natural language to PM for agents. It was inevitable.

### u/AttorneyIcy6723 (score: 5)

> Been using Claude exclusively for coding commercial products for around 6 months, hardly written a single line myself. 25 years experience before this.
>
> For context: I'm an independent product designer and engineer, so use it for everything from writing specs, docs, contracts to actual code.
>
> There is a lot of nonsense out there but the best advice I could give you is treat AI like a junior member of the team, specifically:
>
> - Setup Skills to teach it best practice and convention - there are a lot of opinionated trash MCPs and skills out there, but honestly I've found it best just to write my own as if I were writing a playbook for a team of engineers
> - Talk to it as you'd talk to a fellow engineer. Be specific about how you'd like thinks architected, what dependencies to use, etc.
> - Spend more time in planning mode than you think you need to. 3 hours of planning can save you a day of arguing back and forth as the AI iterates itself into corner after corner.
>
> And generally try to ignore all the shit on YouTube, setup your IDE, your Skills, your service-based MCPs (for interacting with third party services) and feel it out for yourself.
>
> Oh also, get the Context7 MCP. Thank me later.

### u/AverageFoxNewsViewer (score: 4)

> Maybe it's my instinctive distrust of accounts with hidden comment histories, but this sounds like a fake bait post.
>
> I refuse to believe any business out there is just implementing an extremely expensive company wide shift on a timescale that is faster than most companies roll out changes to their expense reporting processes and then halting operations for 2 weeks just to figure it out.

### u/flavorfox (score: 4)

> Downvote me all you want, but the majority of replies in here are from sycophantic ai bros, who have no place in serious development.

### u/tr14l (score: 4)

> From experience, this will go bad. There are very effective ways to use generated code in production.
>
> But it takes research and engineering work to make a full AI platform with a defined lifecycle and engineered context checkpoints and handoffs. And that takes months of bullet proofing with people who are frontier experts on what is known right now about it.
>
> If you do that and you hire (or give capacity to smart people who can go innovate it) you can get some really dope results. This involves tons of documentation being made for the AI to use, lots of experimenting in the different phases of the SDLC, figuring out how to dehumanize the review and gating process (you will overwhelm humans with the amount of code), and a lot of other optimizing to get context to not skyrocket and lobotomize the agent.
>
> If you don't do that, you will mangle your codebase. This is equivalent to hiring a platform team to facilitate your other engineers with devex tooling and deployment tooling.

---

## Notable Deep Comments

### u/elcapitansammy's detailed workflow advice (score: 2, in reply chain)

> The trick is making sure Claude gets the context for what you want when it starts. If it does something stupid that's a repo wide issue (linting. test generation, organization requirement, etc), tell Claude to put it in the repo CLAUDE.md to always do it that way. (Aside: always tell Claude to maintain its own files). If it's specific to you, tell it to put it in your home directory version, or just use memory: # don't ever do that again, do this instead.
>
> Eventually you'll build up enough rules to factor out logic into skills where it's appropriate (colocating Jira knowledge specific to your company) but for now just keep putting in guard rails.
>
> As you add guards be very careful how you phrase things. It's a literal dum-dum sometimes. Logic conflicts just mean it's going to pick something some statistical probability of the time. So make sure the repo CLAUDE.md and skills don't disagree with your personal ones. If they do, tell Claude it's very important to always use one. Again, tell Claude to maintain it, not your job to figure out its config files.
>
> When you develop, ask more questions than you give commands. If you tell it what to do, it'll do it. If you ask if that's the right way to solve it. It'll think and tell you when you're wrong.
>
> Add context7 mcp. Install ccstatusline to monitor context. I also use ripgrep by recommendation but I'm not sure it's necessary. I avoid all other mcps (though I turn on Figma as necessary). It's perfectly capable of handling Jira (acli) and GitHub(gh) through cli commands. Unless you use custom fields in Jira where acli fails miserably (whole side rant on that). Goal though is to leave context for work, not for system APIs.
>
> Start each work session in plan mode, make sure it's exactly what you want. Newer versions will ask to dump context and execute the plan. It's a little aggressive for me so I'll let it ride under 100k. Beyond that you run the risk of compacting. It's usually better to dump the plan to .MD file, clear, and reload it than compact (time saver). If you have a really complex plan writing to file the implementation milestones and updating it to clear periodically is your only real option. This is often where I reach for Codex because I don't have patience for being Claude's nanny.
>
> When you get comfortable on your own, start figuring out what to automate with skills. If you do some mundane task every ticket/PR, tell Claude you want a skill for it. It's lowk "take my job" level of paranoia inducing, but if you teach it to think like you, it'll do what you want.
>
> FTR I use Opus daily. Experience may vary with Sonnet, but the overall guidance is the same. Train it as you go and you'll be surprised how quickly you're focusing on what to solve, not how to solve it.

### u/elcapitansammy's follow-up debugging tip (score: 1)

> One more trick I thought of this morning. I've started using a prompt like, "you just did X. We don't want that, we want Y. Why did you do that and how can we make sure it's done correctly going forward?". It will figure out where to store the logic and sometimes point out conflicts in config that led it to that decision. This becomes more important as your config grows in complexity and skills have duplicate but slightly varying logic. It'll refactor things for you but you have to tell it that's important.

### u/Aaronski1974 (score: 3, reply to GetDynamoi)

> A friends company did this, 20% of staff took to it, 20% are now looking to him for Claude advice, 40% are probably getting laid off/quiting because they hate it, but the ones who embrace curiosity more than make up for it. You don't code, you manage a coding project now. Your job is to meet with the engineers (Claude's) tell them what to do, ensure they got the right idea, then keep an eye on them/redirect them. Pro tip - while Claude's working you can send a message, it'll pickup the message and keep going - why are you doing xyz like abc? It will answer quick and continue. Do xyz like cde, it will just change course midstream.

### u/RandomMyth22 (score: 2, reply to tr14l)

> Been using Claude Code now for over six months and agree on the engineering work. My corporate role is DevOps and you need to develop frameworks and orchestration models to produce consistent outcomes. Otherwise, each developer will produce different results. And, that is the tip of the iceberg. Your frameworks need to be designed for coding with LLM's which excel with declarative coding vs imperative. You also should be aggressively following recent academic and industry research on LLM coding. Subjects like iMAD, AST, chain of thoughts, tree of thoughts, etc.

### u/disgruntled_pie (score: 2, reply to RoadKill_11)

> The most important thing is to understand how your workflow really works. There are big bundles of skills/sub-agents and things like that which radically overhaul Claude Code. AI influencers love to talk about them because it's easy content. I strongly recommend against using them.
>
> Making skills is ridiculously easy, as are sub-agents. And if you make it yourself, you'll understand how it works and how to customize/improve it.
>
> Certainly try approaches like spec driven development, but don't be dogmatic about it. Different approaches work well in different scenarios. Try things and see what works for you.

### u/munkymead (score: 1)

> Learn the context engineering and how it works, how to build agents, how to program them, get them to do the job right. These things are programmable. More recently my IDE has become read-only and I'm using the the interactive claude code TUI less. You can script the claude executable with any language and put anything you want into it to get what you want out. Like an arbitrary function that will do anything you ask of it [...] I had 53 custom claude agents running in a bash loop the other day researching an open source framework repo and it's documentation for features I have planned to explore how they've implemented it and each would come up with 3 implementation options based on MY requirements and methodologies.
>
> Context, knowledge and data are the new gold standard since software can be easily cloned now within weeks.

### u/Affectionate-Aide422 (score: 2)

> From my experience, I get the best results treating it like a coworker, asking it to look at code and give me a plan before proceeding. It does an amazing job, especially at refactoring, but it needs a lot of guidance. Also, when I introduce it to a new codebase, I have it document our tech stack, architectural approaches, services/controllers/utils/etc so that it has a reference for what tools to use and where code goes. That doc comes in handy to keep it true to our codebase.

### u/Flashy-Whereas-3234 (score: 1)

> Don't lead the witness. AI wants to please you, rarely says no, or tells you you're mistaken, it'll do its best to prove you right.
>
> For little jobs, write the comment line about what you want, and let it auto complete the code. This is a real gateway drug to using AI for more.
>
> Work in small chunks, don't be afraid to throw it all out and start fresh, the context window can get weird. Fast iterations often beats building on mistakes. Sure it's an expensive use of tokens, but you're not paying the bills, right?
>
> Checkpoint good work. Commit the wip and move on to the next round. AI goes rogue pretty quick, it's always good to checkpoint.
>
> Markdown and tests keep it on task, but it won't build it unless you ask. Organize your files don't spray shit everywhere. The AI will also over-specify which can make change in future more difficult, so don't feel bad about culling what it writes.
>
> Don't cheat by having it do all the thinking. Your domain knowledge and architectural design is as important as ever. Class leakage, single responsibility, usage of patterns, AI will make bad design choices and cram hacks in because the user asks for something that requires violating the established patterns. It's no better than a junior in regards to keeping lines clean.
>
> And, finally, do keep reviewing, but review at a higher level. Unless you're dealing with security, you probably don't need to eyeball every line and pick at syntax or usage checks, it's very good at that, but again it'll go off the rails and stab a hole through 3 layers of classes just to get at some data.

### u/Bulky_Consideration (score: 2)

> Claude Code is great. The biggest issue is people not actually reviewing the output. Both in code and doc writing.
>
> The output looks good on its surface, but is it doing what you want (or communicating your intent when writing docs).
>
> For both code and docs, I have to go through several rounds of planning and review until it matches what I want.
>
> The messy reality is a ALOT of people don't do this, so PRs require more scrutiny and docs that have AI generated assumptions can often be inaccurate and completely lying.

### u/c4chokes (score: 2)

> I've been doing this for a few months now, here are some tips.
>
> - Log the fuck out of everything and ask it to read back the logs after you run a test run.
> - Run one test at a time and ask it to verify.
> - Breakdown huge projects into modules that you can run and test out. Log the fuck out of that too! (It's the most effective way to give it feedback on what code it wrote.)
> - It tends to write a lot of fallback options that are unnecessary (even if you tell it not to use any fallback options).
> - Once you think you are done with code development, ask it to remove all fallback options. Yes it sneakily puts in fallback options anyway.
> - Fallback options, make it much harder to debug.
> - Claude fatigue is real. Step away, come back tomorrow and take it from there. You will do more harm to the code base in Claude fatigue than being productive.

### u/No_Individual_6528 (score: 2)

> The real killer for me as the CTO is to connect Claude to everything and blast from it. I got it connected to jira. Got it connected to our ai meeting transcripts, got it connected to the front end and backend and our database and browser. Within reason. But I can run everything from Claude terminal. I'm even using vs code less and less.
>
> I've obviously set the connection to db as read only. Because I'm a little bit scared.
>
> It's a small startup so don't get carried away. But the fact I am in charge and can basically do everything myself is pretty nuts. Or Claude can that is. I'm for sure moving 80% as fast as a team with a PO, a designer, a frontender and backender. 5 years ago.

### u/pbalIII (score: 1)

> Two weeks is actually a reasonable trial window. Most teams that forced this kind of rollout found the wins were patchy... refactoring, writing tests, boilerplate code got 80-90% faster. Complex architecture decisions, not so much.
>
> The prompt engineering videos are mostly noise. What actually helps: clear context upfront (file paths, constraints, what you already tried), treating it like a very fast junior dev who needs explicit guardrails, and learning when to bail and just write the code yourself.
>
> One thing nobody warns you about: review becomes the bottleneck. Junior devs produce way more code, seniors spend more time checking it. Worth flagging that to your leads early.

### u/b33eep (score: 2)

> For a company-wide rollout, the biggest challenge will be consistency -- everyone setting up Claude Code differently, different CLAUDE.md files, different workflows, different coding conventions.
>
> I built an open-source setup that solves this: one-liner install that gives everyone the same workflow (/catchup to start a session, /wrapup to end it), persistent context via CLAUDE.md, and coding standards that auto-load based on your tech stack. Plus custom modules -- so you can add company-specific skills, commands, and MCP servers that everyone gets automatically.
>
> https://github.com/b33eep/claude-code-setup

### u/papikk (score: 1)

> Outsourcing company did a big e-commerce PoC with Claude writing code and devs mostly reviewing. It "worked," team got cut down to basically just the lead, headcount dropped 60 to 40, now they're pushing AI-written code as the default and telling us we won't be coding much...
>
> The old flow used to be: task -> technical analysis -> dev implements. Now it's: task -> technical analysis -> AI implements -> dev maybe reviews (if that).
>
> Management is also putting all the spend and hype into tools/subscriptions/process around AI, and we're straight up being told "you won't really be writing code anymore."

### u/whiskeybot23 (score: 1, reply to psychosisnaut)

> UX/Product designer here! It's taken me some time, but I'm now using it to create live working demos/POCs instead of clickable prototypes for feedback. Recently, I was able to quickly wireframe and then build out a POC that even works directly with an EHR sandbox to show how we can automate some manual processes our team was doing. I left me with both the feedback from the stakeholders, and a cheat sheet for our dev team on how to work with the EHR's API.

---

## Extracted Tips: Enterprise Adoption and Team Workflows

### Planning and Process

1. **Spec-driven development is essential** -- Multiple commenters stressed that planning before coding is the single most important workflow. Use plan mode, write specs first, and do not skip this step. (NoCat2443, jbrianfrancis, AttorneyIcy6723)

2. **Follow the RESEARCH-PLAN-IMPLEMENT-TEST cycle** -- Structure work in clear phases rather than letting Claude free-form. This keeps output focused and reviewable. (HeavyDluxe)

3. **Spend more time in plan mode than feels necessary** -- "3 hours of planning can save you a day of arguing back and forth as the AI iterates itself into corner after corner." (AttorneyIcy6723)

4. **Start each session in plan mode** -- Get alignment on exactly what you want before execution begins. Keep context under 100k to avoid compaction issues. For complex plans, dump to .md file, clear context, and reload. (elcapitansammy)

5. **Ask questions instead of giving commands** -- If you tell Claude what to do, it will do it. If you ask whether that is the right approach, it will think critically and tell you when you are wrong. (elcapitansammy)

### CLAUDE.md and Configuration

6. **Treat CLAUDE.md as project memory, not a readme** -- Store conventions, guardrails, and anti-patterns. Let Claude maintain its own config files -- tell it to update CLAUDE.md when it does something wrong. (Coded_Kaa, elcapitansammy)

7. **Guard against conflicting rules** -- As your CLAUDE.md and skills grow, logic conflicts cause non-deterministic behavior. Periodically ask Claude to review its own config for contradictions. (elcapitansammy)

8. **Use the post-mistake prompt pattern** -- "You just did X. We don't want that, we want Y. Why did you do that and how can we make sure it's done correctly going forward?" Claude will identify where to store the corrective rule. (elcapitansammy)

9. **Document tech stack and architecture for Claude** -- When introducing Claude to a new codebase, have it document your stack, architectural patterns, and where code belongs. This reference keeps output consistent. (Affectionate-Aide422)

### Team Rollout

10. **Standardize team workflows for consistency** -- The biggest challenge in company-wide rollout is everyone configuring Claude differently. Standardize CLAUDE.md files, shared skills, and session workflows. (b33eep)

11. **Expect the 20/20/40 adoption split** -- In one company's experience: 20% took to it naturally, 20% sought help to get up to speed, and 40% resisted or struggled. The productive minority more than compensated. (Aaronski1974)

12. **Review becomes the bottleneck** -- Junior devs produce way more code with AI, but seniors spend more time reviewing it. Flag this shift to leadership early. (pbalIII)

13. **Human code review remains essential** -- Do not outsource code review, security audits (VAPT), and QA entirely to AI. 90% AI-assisted is fine, but humans must do a serious review pass. (NoCat2443, Bulky_Consideration)

14. **Enterprise adoption needs engineering investment** -- Requires documentation built for AI consumption, experimentation across the SDLC, context management strategies, and eventually dehumanized review gates to handle code volume. Without this, the codebase will degrade. (tr14l)

15. **Develop frameworks for consistent outcomes** -- DevOps should build orchestration models and coding frameworks designed for LLMs (which favor declarative over imperative patterns). Otherwise each developer produces different results. (RandomMyth22)

### Productivity Patterns

16. **Start simple, increase autonomy as confidence grows** -- Do not jump to autonomous agentic coding with sub-agents. Begin with small tasks, build trust in capabilities. (Pretty-Spend-2550, Negative-Age-4566)

17. **Treat Claude as a junior engineer you supervise** -- Give clear context, set guardrails, and monitor output. Your role shifts from writing code to managing a coding project. (Aaronski1974, pbalIII, Flashy-Whereas-3234)

18. **Work in small chunks and checkpoint frequently** -- Commit WIP regularly. Context windows degrade over long sessions. Fast iterations beat building on accumulated mistakes. (Flashy-Whereas-3234)

19. **Log aggressively** -- Add verbose logging everywhere and have Claude read the logs after test runs. This is the most effective feedback mechanism for AI-generated code. (c4chokes)

20. **Watch for unnecessary fallback code** -- Claude tends to insert fallback options that obscure bugs and complicate debugging. Explicitly ask it to remove them after feature completion. (c4chokes)

21. **Claude fatigue is real** -- When you feel fatigued from steering Claude, step away. Pushing through causes more harm to the codebase than stopping. (c4chokes)

22. **Interrupt mid-execution when needed** -- You can send a message while Claude is working. It will read the message and adjust course without starting over. (Aaronski1974)

### Tools and Resources

23. **Context7 MCP for up-to-date docs** -- Recommended by multiple commenters as the essential MCP for keeping Claude informed about library/framework documentation. (AttorneyIcy6723, dergachoff, elcapitansammy)

24. **Minimize MCPs to save context** -- Use GitHub (gh) and Jira (acli) through CLI commands rather than dedicated MCPs. Leave context space for actual work, not system APIs. (elcapitansammy)

25. **Build your own skills rather than using third-party bundles** -- Making skills yourself is easy and ensures you understand what they do. Third-party mega-bundles eat context and are hard to customize. (disgruntled_pie, Coded_Kaa)

26. **Automate repetitive per-ticket/per-PR tasks as skills** -- Any mundane workflow you repeat every ticket should become a skill. (elcapitansammy)

27. **Use Codex for complex tasks requiring deep context** -- When tasks exceed comfortable Claude Code context limits, Codex can handle more context and harder planning. (elcapitansammy)

### Recommended Resources

28. **Anthropic Academy courses** -- The official AI Fluency course and Claude Code course as structured starting points. https://anthropic.skilljar.com/ (seyal84, The-Agency-Group, Ok-Inevitable-2853)

29. **Anthropic white paper on long-running agents** -- https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents (jbrianfrancis)

30. **Get-Shit-Done framework** -- https://github.com/glittercowboy/get-shit-done -- Spec-driven workflow tool for Claude Code, frequently recommended. (jbrianfrancis, Scotteh101, Whole-Pressure-7396)

31. **claude-code-setup for team rollouts** -- https://github.com/b33eep/claude-code-setup -- Standardized onboarding with shared workflows, conventions, and skills. (b33eep)

32. **Anthropic official plugin library** -- Reverse-engineering official plugins teaches more than tutorial videos. https://github.com/anthropics/claude-plugins-official (circuitfive)

33. **Learn by doing, not by watching tutorials** -- Near-universal consensus that hands-on experience vastly outperforms video content. Most YouTube prompt engineering content is noise. (GetDynamoi, RoadKill_11, Big_Dick_NRG, AgentCapital8101, cannontd)

### Skeptical/Cautionary Voices

34. **Without proper engineering investment, codebases will degrade** -- AI-generated code at scale without lifecycle management, context checkpoints, and review infrastructure will create unsustainable technical debt. (tr14l)

35. **Review AI-generated docs carefully** -- AI docs often contain plausible-sounding but inaccurate assumptions. Do not ship AI-generated documentation without human verification. (Bulky_Consideration)

36. **Architectural judgment cannot be delegated** -- Domain knowledge, design patterns, and single-responsibility enforcement remain human responsibilities. Claude will hack through architectural layers if asked to do something that violates patterns. (Flashy-Whereas-3234)

37. **Not all tasks benefit equally** -- Refactoring, test writing, and boilerplate got 80-90% faster. Complex architecture decisions did not. Know when to bail and write code yourself. (pbalIII)

### Non-Engineering Use Cases

38. **Product managers can use Claude Code for non-code work** -- RFP responses, standards compliance, pricing models, risk taxonomies, Power Query formulas. (caseywh)

39. **Designers can build live POCs instead of prototypes** -- UX designers using Claude to build working demos that connect to real APIs, replacing clickable prototypes. (whiskeybot23)

40. **CTOs at small startups can run multi-role workflows** -- Connect Claude to Jira, meeting transcripts, frontend, backend, and database (read-only) to operate as a near-complete team of one. (No_Individual_6528)
