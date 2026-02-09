# What I learned building a full game with Claude Code over 6 months (tips for long-term projects)

**Source:** https://www.reddit.com/r/ClaudeCode/comments/1qknr1v/what_i_learned_building_a_full_game_with_claude/
**Author:** u/DigiManufakturRU
**Score:** 227
**Date:** 2026-01-23
**Subreddit:** r/ClaudeCode

---

## Post Content

Hey everyone,

Yesterday I released my first game. A retro football manager, playable on Android, PC, and in the browser. 6 months ago I had never written a line of GDScript and didn't know what Godot was. I want to share what I learned along the way -- maybe it helps someone who's thinking about a bigger project.

I'm not a developer. I work a full-time job that has nothing to do with tech. I have a toddler at home, which means my coding window was 10pm to midnight, after everyone was asleep. I used the 5x plan and still hit the daily limit more often than I'd like to admit.

What I wanted to build: a football manager like the ones I played as a teenager in the 90s. Simple graphics, deep gameplay, no pay-to-win nonsense. The kind of game I'd actually want to play on my commute.

### The search for the right tool

Before I could build anything, I needed to figure out which AI tool could actually handle a project this size. That part alone took about 1-2 months.

I started with Gemini. The generated code had constant bugs, and it struggled to keep context across files. So I switched to ChatGPT, but the context window was too small -- after 3-4 files it would forget what I was building and suggest things that contradicted earlier decisions. Cursor was better, but something still felt off for longer projects.

Then I found Claude Code, and things finally clicked. What made the difference: it actually remembers my project. I could say "the TransferManager needs to talk to the SaveGameService" and it knew what I meant without me explaining the entire architecture again. That alone saved hours every week.

One thing I didn't expect: I could write all my prompts in German -- my native language. Claude handled it fine. Code stayed in English (variable names, comments, everything), but explanations came in German. I had to remind it every 2-3 prompts ("please respond in German"), but once I accepted that as part of the workflow, it felt much more natural than forcing myself to think in English at 11pm.

### The process that worked

With the right tool in place, I needed a way to actually structure the work. The most important decision I made was to not start coding immediately.

Instead, I sat down and mapped out the entire project first. Not just "I want to build a game" but breaking it into 8 playable mini-projects. First: a basic loop where you pick a team and simulate a match. Then: match events like goals and injuries. Then: cup competitions. And so on. Every time I finished one of these kernels, I had something that actually worked. Those small wins kept me going through the months when progress felt slow.

To keep Claude on track across all these features, I wrote down my project rules in a file called claude.md -- architecture decisions, naming conventions, how managers communicate with each other. The key was keeping it precise: few words, but the right ones. Here's the thing though: Claude doesn't automatically remember this file. I had to reference it every 2-3 prompts. "Remember claude.md" or "follow the architecture from claude.md." Otherwise it would drift and do its own thing. Annoying at first, but once I accepted this as part of the workflow, it actually worked well.

This discipline extended to how I approached every new feature. I never let Claude just start coding. Instead, every feature started with: "Here's what I want to do. Here's my approach. Do you agree? Any problems you see?" Only after we agreed on the plan did I say "okay, implement it." This caught so many issues before they became bugs buried in 50 files.

Of course, not everything went smoothly. Some bugs took 2 minutes to fix. Others took 100+ prompts. The EU cup bracket system nearly broke me -- home and away legs, aggregate scoring, away goals rule. Teams that should have been eliminated kept advancing. I spent three evenings on this, prompt after prompt. At some point I wasn't even sure if the "fix" was actually correct or just moving the bug somewhere else.

That experience taught me something important: you cannot blindly trust AI-generated code. So I started reading every single line Claude produced. Not because I'm paranoid -- okay, maybe a little -- but because that's how I learned. When something didn't work, debugging together taught me more than any tutorial could have.

And then there were the days when nothing worked at all. Same prompt, different results. Sometimes Claude would nail it on the first try. Other days, garbage output no matter how I rephrased things. I started thinking of it like a casino -- some days you're lucky, some days you're not. Eventually I learned to recognize when Claude was "having a bad day" and just try again tomorrow instead of burning through my daily limit on a lost cause.

One bright spot through all of this: GDScript and Godot worked incredibly well. Better than I expected. The model seems well-trained on it, which made the actual game development smoother than the debugging sessions might suggest. And I kept the setup simple -- no plugins, no MCP servers, nothing fancy. Just Claude Code out of the box. I tried some plugins early on but dropped them. The base tool is trained well enough.

### Beyond the code

Here's what surprised me most about this whole journey: I didn't just use Claude Code for the game itself. Once I got comfortable with it, I started using it for everything around the project too.

I built two websites -- one for the game, one for my publisher brand. Both are trilingual (German, English, Turkish). Landing pages, legal pages, the whole thing. Claude Code wrote the HTML, CSS, handled the translations, even helped with the SEO structure.

And all the marketing content came from Claude Code too. Reddit posts, store descriptions, changelogs for 30+ versions, Discord announcements. I'd describe what I needed, it would draft something, I'd edit and refine, and repeat. The amount of text a game release needs is insane -- having an AI assistant made it actually manageable.

So in the end, this wasn't just "I built a game with AI." It was: I built a game, two websites, and all the marketing material. Three platforms (Android, PC, Web). Three languages. With zero programming background. That still feels surreal to write.

### What I'd do again

Looking back, a few things made the real difference. Planning first -- seriously mapping it out before touching code. Keeping the rules file short but precise, and referencing it constantly. Never skipping plan mode. Reading every line. Accepting the casino days instead of fighting them.

If I could tell myself something at the start, it would be: expect to spend time finding the right tool. Those 1-2 months I "lost" on tools that didn't work weren't wasted -- they taught me what to look for. And if you're working in a non-English language: try prompting in your native language. It might work better than you expect.

One more thing: my toddler kept me sane. Forces you to stop at midnight. Forces you to step away when you're stuck in a debugging spiral. Boundaries turned out to be a feature, not a bug.

### What came out of it

6 months total, including the tool search. Maybe 360 hours of actual work. 120 GDScript files. 22 autoload managers. Match simulation with live events. Transfers, contracts, finances. European cups with group stages and knockout rounds. Stadium editor. Career mode from club manager to national coach. Three languages. Two websites. All the marketing material.

Is it perfect? No. There are rough edges. But it exists. It works. People can play it. That's more than I had 6 months ago.

---

## Top Comments (sorted by score)

### u/msaleh (score: 23)

> Thank you for sharing your personal experience! This is an incredible journey and very insightful and inspiring! Best of luck with the game.

---

### u/Fonduemeup (score: 13)

> Ok, so you're not a developer, but you definitely talk like you've been around the block. Come on, you're not getting off that easy - does your toddler work for Anthropic or something?
>
> > This discipline extended to how I approached every new feature. I never let Claude just start coding. Instead, every feature started with: "Here's what I want to do. Here's my approach. Do you agree? Any problems you see?" Only after we agreed on the plan did I say "okay, implement it." This caught so many issues before they became bugs buried in 50 files.
>
> This right here is key, especially if you are not an expert. I have never built frontends before so any time I instruct CC to update my JS, I leave some ambiguity, or I propose an idea and ask it for a recommendation based on engineering best practices.
>
> To answer your question on large projects:
>
> I ran into similar issues and started to build nested CLAUDE.md files within each subfolder. This helped quite a bit, but it killed my context since Claude reads these md files automatically every time it is initiated. I have now opted to build skills instead. In essence, skills docs are practically the same thing as my nested CLAUDE.md docs, but Claude only reads them when it determines it needs to based on the current context.
>
> I also use a new Claude session for each single update. Never compact, always clear. CLAUDE.md and skills make that much easier to do.

---

### u/cowwoc (score: 7)

> There are three things you need to become a good software developer: curiosity, persistence and humility.

---

### u/DigiManufakturRU (score: 7, reply to Fonduemeup)

> Haha, no Anthropic insiders here - just learning by doing (and breaking things repeatedly). And well.. the reason I "talk like I've been around the block" is because Claude Code wrote most of that post. So you're basically complimenting Claude's writing skills. Thanks for the tips on skills and CLAUDE.md structure! I'll definitely look into that as my project grows.

---

### u/DigiManufakturRU (score: 7, game links and Godot rationale)

> Steam: https://store.steampowered.com/app/4245520/Anpfiff1__Retro_Fussball_Manager/
>
> GooglePlay: https://play.google.com/store/apps/details?id=com.anpfiff1.manager
>
> Godot - mainly for cost and licensing reasons. No royalties, no revenue share, MIT license with no surprises. Also cross-platform export out of the box, lightweight (~40MB), and GDScript is Python-like so it's easy to pick up. Plus no account or login required - just download and go.

---

### u/Evening_Reply_4958 (score: 3)

> First off - massive respect for shipping this. Game, two sites, trilingual marketing, three platforms, zero dev background, and a 10pm-midnight window with a toddler at home. The discipline and project management behind this are what made it real. The 500-line rule you mentioned is gold. I've found 300-400 is the sweet spot where Claude still holds the full file's logic in context without drift. Beyond that it starts "forgetting" edge cases in earlier functions when editing later ones. How did you approach splitting when a feature naturally wanted to be 800+ lines? Did you split by layer (data/logic/UI) or by sub-feature?

---

### u/DigiManufakturRU (score: 3, reply to Evening_Reply_4958)

> Thanks! Honestly I learned that rule too late - got a few 3000-5000 line monsters now that I'm scared to touch with AI. First refactoring attempt ended in disaster so I just left them alone lol
>
> Split by layer mostly (core logic vs UI in separate folders), which helped. But when something wanted to be 800+ lines? I just let it happen. My StatisticsCollector is 5700 lines of pure chaos now.
>
> For the sequel I'll definitely split by sub-feature from the start.

---

### u/Abject_Foot_4355 (score: 3)

> Nice post! I'm in the exact same spot! I submitted a post a couple of days ago, but it got stuck in mod approval due to this account being new. But my situation is the same. Limited time. limited skills. Kids at home. Still pulled through to produce something. This tech is incredible.

---

### u/lorrsa (score: 3)

> I recognise a lot of what you are talking about here. I'm in the middle of a project myself with claude code and godot. I don't have the ambition to launch it as a ready product, its more for learning myself different aspects of designing a game.
>
> My key takeaway a few weeks into it is that first making sure that the goal and the design is clear for each feature before starting with code is really important. Its also a really fun experience iterating on ideas this way. Another things for efficiency is to learn claude to run the game itself and to make it customize the debug trace for each run so that it gets the right info and only the right info when debugging a problem. Saves time and tokens I've found so far. Would be interesting to hear others experience with that.

---

### u/Both-Currency7367 (score: 3)

> Soapbox opinion - Context, I'm a web developer. He's been in the industry for 13 years. This is a prime example of why I'm excited for the next phase of what software development looks like. This is why I love vibe coding.
> I got into software development to build cool stuff. When anyone can build anything they can imagine the world becomes a better place. The industry will change, but I think the greater community of the world will be better off when people can build the games they want, the tools they need, and not be limited by what venture capital or corporations think we need.

---

### u/DigiManufakturRU (score: 2, on what Claude struggled with)

> Complex logic was the biggest issue - specifically game schedule generation with country-specific variations. Too many branches, Claude kept losing track. Next time I'll break stuff like that into way smaller modules and sketch out the architecture myself before involving AI. Animations were also rough. AI just isn't there yet for creating motion graphics, so I'll probably do those manually or use proper animation tools and only let Claude handle the integration part.
>
> **Biggest takeaway: keep code files under 500 lines. Above that, AI starts making dumb mistakes. Learned that the hard way.**

---

### u/Fonduemeup (score: 2, on modularization)

> I've never had that issue unless I was just tuned out and blindly accepting all edits on some side project. Claude has graciously solved the coding part. You are now the architect. If you don't specify where or how to build something, Claude will do it based on what's in its current context which is many times going to be wrong.
>
> **When it comes to AI, modularization is paramount. Always focus on that, and major refactors are never needed.**

---

### u/Evening_Reply_4958 (score: 1, on skills approach)

> The skills approach makes total sense for context control. I've hit similar limits with nested CLAUDE.md files - they help consistency but murder your token budget every session start. One question: how do you decide which functionality gets its own skill vs staying in a shared doc? I've been splitting by "subsystem" (auth, rendering, data layer) but curious if you use a different mental model.

---

### u/Fonduemeup (score: 2, reply to above)

> Yep, mine are about the same.

---

### u/Nice_Check_1039 (score: 2)

> Congratulations to you! I'm following a similar journey (though I've been a developer for many years) and hope to have my first game to release in the next month or so. Curious if the artwork was AI-generated as well or if you hired an artist? I had some artwork done for a game idea I had a couple years ago now and have been able to make more progress in the past few weeks than I did in the past 2 years. I'm old and started playing around with Claude making updated versions of C64 games I enjoyed. It would use Electron and Pygame and after Opus came out I asked it to plan out an approach for my game I had been very slowly working on in Unity. Surprisingly, it recommended Godot, and I took the plunge and have been really surprised how well it has done with it. As you said, some sessions can be really frustrating, but it's been really cool to see how quickly the game has come together.

---

### u/DisappointedDodo (score: 2)

> One lesson I learned is to ask CC to check online if there are solutions. Fixed a bug that I got stuck on in minutes after running in circles for 4 hours. Yeah, just what a human would do.

---

### u/alecfokapu (score: 2)

> I am exactly like you. Building a game with CC since 7 months - no game engine though. I went to the exact same journey and landed on the similar realizations, learnings and practices as you did. Probably because of laziness to babysit Claude, I ended up building a framework in parallel of my project that would substantially free me from the tedious work of supervising CC.
>
> https://github.com/afokapu/atdd

---

### u/dmitche3 (score: 2)

> ChatGPT isn't good for coding. It front ends Codex but very poorly. I started that way until I learned about Codex's CLI. No more disconnects but it did forget since I was ignorant and kept restarting the same thread each day. I'm in my third week of writing a 3D space game using Unity. I bought some Claude time but after I spoke out about my problems I got some amazing help. Claude.md or agents.md is a must to keep your sanity.

---

### u/Evening_Reply_4958 (score: 1, on maintaining large files)

> "Scared to touch with AI" but presumably you still have to maintain those monsters sometimes - what's your workflow when you *need* to change something in the 5700-liner? Do you manually edit, or use Claude with extremely specific prompts scoped to tiny sections? I'm curious if there's a salvage pattern that works without a full rewrite.

---

## Extracted Tips and Lessons

### Project Planning and Structure

1. **Map the entire project before writing code.** Break a large project into small, playable "kernels" -- mini-projects that each produce something functional. This provides incremental wins and keeps motivation high over months.

2. **Break large projects into 8+ discrete milestones.** Each milestone should be independently testable and functional. Example progression: basic game loop -> match events -> cup competitions -> transfers -> etc.

3. **Expect 1-2 months to find the right tool.** Time spent evaluating tools (Gemini, ChatGPT, Cursor, Claude Code) was not wasted -- it taught what to look for in a long-term AI coding partner.

### CLAUDE.md and Context Management

4. **Keep your CLAUDE.md file short but precise.** Architecture decisions, naming conventions, inter-module communication patterns. Few words, but the right ones.

5. **Reference CLAUDE.md every 2-3 prompts.** Claude does not automatically retain the rules file across the session. Explicitly say "Remember claude.md" or "follow the architecture from claude.md" regularly.

6. **Use skills instead of nested CLAUDE.md files** (from u/Fonduemeup). Nested CLAUDE.md files in subfolders help consistency but consume context on every session start. Skills are loaded on-demand based on what Claude determines is relevant, saving tokens.

7. **Start a new Claude session for each single update** (from u/Fonduemeup). Never compact, always clear. CLAUDE.md and skills make fresh sessions viable because context is externalized.

8. **Split skills/docs by subsystem** (auth, rendering, data layer) -- this seems to be the common approach among experienced users.

### Prompting and Workflow Discipline

9. **Never let Claude just start coding.** Every feature should start with: "Here's what I want to do. Here's my approach. Do you agree? Any problems you see?" Only after agreement say "okay, implement it." This catches issues before they become bugs buried across 50 files.

10. **Use plan mode consistently.** Never skip it. It forces structured thinking before implementation.

11. **You are the architect, Claude is the coder** (from u/Fonduemeup). If you don't specify where or how to build something, Claude will do it based on whatever is in its current context, which is often wrong. Specify the architecture yourself.

12. **Prompt in your native language if you prefer.** Claude handles non-English prompts well. Code stays in English (variable names, comments), but explanations come in your language. You may need to remind it every 2-3 prompts.

### Code Quality and File Size

13. **Keep code files under 500 lines.** Above that, AI starts making mistakes. The 300-400 line range may be the sweet spot where Claude holds full file logic without drift. Beyond 500 lines, it "forgets" edge cases in earlier functions when editing later ones.

14. **Split by layer (core logic vs UI) into separate folders.** This is the primary decomposition strategy that worked.

15. **Read every single line Claude produces.** Do not blindly trust AI-generated code. Reading the output is also how you learn. Debugging together teaches more than any tutorial.

16. **Avoid letting files grow into "monsters."** Refactoring 3000-5000 line files with AI is risky -- first refactoring attempts can end in disaster. Plan modular structure from the start.

### Debugging and Problem-Solving

17. **Accept "casino days."** Some days Claude nails it on the first try; other days, garbage output no matter how you rephrase. Learn to recognize bad days and try again tomorrow instead of burning through your daily limit.

18. **Teach Claude to run the game and customize debug traces** (from u/lorrsa). Have Claude generate targeted debug output for each run so it gets the right info and only the right info. Saves time and tokens.

19. **Ask Claude to check online for solutions** (from u/DisappointedDodo). When stuck on a bug for hours, telling CC to search for existing solutions online can resolve it in minutes.

20. **Complex branching logic is where AI struggles most.** Game schedule generation with country-specific variations, tournament bracket systems with aggregate scoring -- too many branches cause Claude to lose track. Break these into much smaller modules and sketch architecture yourself before involving AI.

### Modularization Philosophy

21. **Modularization is paramount when working with AI** (from u/Fonduemeup). Always focus on keeping things modular, and major refactors are never needed.

22. **For the sequel/next project, split by sub-feature from the start** (lesson learned from OP). Layer-based splitting works but sub-feature splitting may prevent the 5000+ line monster files.

### Setup and Tools

23. **Keep the setup simple.** No plugins, no MCP servers -- just Claude Code out of the box. The base tool is well-trained enough. Plugins tried early were dropped.

24. **Claude Code handles Godot/GDScript well.** The model seems well-trained on this stack, making game development smoother than expected.

25. **Use Claude for everything around the project too.** Websites, marketing copy, store descriptions, changelogs, translations -- the amount of text a release needs is significant, and AI makes it manageable.

### Time Management and Sustainability

26. **Forced boundaries are a feature, not a bug.** Having to stop at midnight (toddler schedule) prevents debugging spirals and burnout. Step away when stuck.

27. **360 hours over 6 months is achievable with limited daily windows.** 10pm-midnight, roughly 2 hours/day, produced a full game, two websites, and all marketing material across three languages and three platforms.

### Project Output Summary

- 6 months total (including tool evaluation)
- ~360 hours of work
- 120 GDScript files
- 22 autoload managers
- 3 platforms (Android, PC, Web)
- 3 languages (German, English, Turkish)
- 2 websites (game + publisher brand)
- 30+ version changelogs
- Zero prior programming experience
