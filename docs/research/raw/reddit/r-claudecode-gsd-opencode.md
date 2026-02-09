# GSD Now Officially Supports OpenCode

- **Source**: https://www.reddit.com/r/ClaudeCode/comments/1qk3f46/gsd_now_officially_supports_opencode/
- **Author**: u/officialtaches
- **Score**: 244 (97% upvote ratio)
- **Comments**: 46
- **Date**: 2026-01-22

## Post Content

By popular demand, GSD is now officially supporting OpenCode.

No need to go fork it anymore guys - just install with `npx get-shit-done-cc`

This means you can now use GSD for **completely** free with the OpenCode free models.

**Repo**: https://github.com/glittercowboy/get-shit-done

---

## Top Comments and Discussion

### Token Usage and Budget Concerns (Major Theme)

**u/keekje** (score: 30):
> Maybe I'm using it wrong, but I tried GSD. Got less accurate results than using plan mode with superpowers, and I was burning through my limits like crazy.

**u/jmdl04** (score: 9, reply):
> first time i maxed my weekly limit.

**u/officialtaches** (score: 9, reply from author):
> If you're not on a 200/m plan I recommend you run `/gsd:settings` to turn to "budget" model profile, and turn off research before planning, checking after planning and verification after executing.
>
> GSD at its max settings isn't light by any means.

**u/Obvious_Equivalent_1** (score: 33, humorous):
> Better call it ~~Getting~~ Shit (your weekly limit is now) Done

**u/baxet** (score: 1):
> I really like the results I get using GSD and the zero enterprise fluff philosophy but man it does eat through your quotas so damn fast. Got a question regarding that, would it technically be possible to make it work in harnesses like Windsurf's Cascade etc? I've seen antigravity fork so it should be possible? I'm on windsurf 10$ grandfathered plan so that might be pretty cost effective still if it can work

**u/Pristine_Pie_3867** (score: 1):
> Hello guys, so any token friendly advice on using GSD, I tried setting it into budget mode, I turned off research and going on through planning and executing phases, might say it uses less tokens, but still it racks them up after a while and I'm stuck between the idea that this will never end and what I'm working for would not be achieved. What do you think?

### Experienced Dev Skepticism

**u/RunedAwesome** (score: 7):
> Experienced devs do not waste your time on this. I lost a day you don't have to.

**u/Serious-Tax1955** (score: 3):
> I tried this and it's rubbish. It's much easier and much more effective to just use Claude code directly.

### GSD vs. Other Frameworks (Superpowers, BMAD, Kata)

**u/mraza007** (score: 2):
> Looks pretty cool. But just out of curiosity how is it different from using superpowers plugin as that's what i have been mostly using?

**u/BerryBrigs** asked about superpowers; **u/keekje** linked: https://github.com/obra/superpowers

**u/Rafewey** (score: 2):
> I'm currently using the BMAD method. Anyone with experience using BMAD and swapping to this, are you satisfied?

**u/Miserable_Review_756** (score: 1, reply):
> I personally found bmad overkill. GSD seems a bit more structured and straight forward without missing important information about the project.

**u/Parabola2112** (score: 1):
> I started using this today: https://github.com/gannonh/kata. Game changer for me. I think it's a fork of GSD but is skills based so you can drive the whole process with natural language. This unlocks full conversational workflows. Feels like they spent a lot of time getting the triggers to work, which can be kinda hit and miss with skills. Interestingly their skills can't be explicitly invoked but they have GSD equivalent commands that then invoke the skills. It's also comes as a Claude code plugin which makes way more sense for cc than npm. In general though I like how these newer frameworks work natively with cc's system, as opposed to super complex RAG, semantic search, blah blah blah.

### Understanding What GSD Actually Does

**u/korboybeats** (score: 1):
> can someone ELI5 what the actual benefit of GSD and OpenCode is? I already use Claude CLI and it can scan my repo, read files, and plan changes. what do GSD and OpenCode really add on top of that? is it supposed to save tokens, give better context, or is it mostly just a workflow or safety preference? I'm having trouble understanding what problem it actually solves compared to just using Claude CLI.

**u/band-of-horses** (score: 1, reply):
> My impression is it's more for the vibe coders out there who just want to type a prompt and walk away and hope it works. I feel like for people who know what they are doing and want control over the implementation and planning and decisions the agent makes, it's probably less valuable than spending more time involved in planning, building task lists and reviewing choices / output.

**u/creaturefeature16** (score: 1, reply):
> That, and this guy also is just trying to promote his cryptocoin, as is the case with all these "OMG I MADE SOOOOO MUCH MONEY WITH THIS" influencers.

### External Provider / Ban Concerns

**u/funguslungusdungus** (score: 6):
> Is it still working after Claude's "ban" for external providers?

**u/siberianmi** (score: 10, reply):
> It's not an external provider, it's using the Claude code CLI it's just an orchestrator. Not banned or even remotely likely to be. The ban was non-ClaudeCode harnesses using fixed cost plans. This uses the standard approved harness.

**u/Simple_Split5074** (score: 1, reply):
> I think the question was about opencode as a harness. I guess the answer is 'try your luck' (or use codex that is officially sanctioned by OpenAI)

### Platform Issues (Windows)

**u/sk8mod** (score: 2):
> I'm having issues on Windows while this fork works fine: https://github.com/rokicool/gsd-opencode. I probably did something wrong, but it installs to .opencode instead of .config/opencode.
>
> EDIT: Solved in 1.9.7: https://github.com/glittercowboy/get-shit-done/commit/707d4b47b06809e52670348b648ae6e4a6c25360

**u/TheGoddessInari** (score: 1):
> Following the directions, this just breaks for me on Windows: agents stop being able to do any successful tool calls when trying to follow the GSD instructions.

### Positive Reactions

**u/majornerd** (score: 3):
> I watched your 4 hour video today and am really impressed.

**u/Ok-Safe5050** (score: 6):
> I created this account only to thank you, man! This is INSANE! I've been messing around to create something like this in opencode for days!

**u/Miserable_Review_756** (score: 1):
> Keep going brother. Loving GSD! Would be good to maybe have the option to use codex 5.2 if one wanted to. Keep up the videos as well.

### Integration Questions

**u/Independent-Dish-128** (score: 6):
> What about codex?

**u/pphogat** (score: 1):
> Can GSD be integrated with other context and memory agents like Byterover?

**u/Simple_Split5074** (score: 1):
> Any chance to get command in kebap-case (`/gsd-command-something`) instead of the weird `/gsd/something` that is in place right now?

---

## Extracted Tips and Insights

### GSD Budget Configuration Tips
1. **Use `/gsd:settings` to configure budget mode** - Turn to "budget" model profile to reduce token consumption significantly.
2. **Toggle off expensive phases** - Turn off "research before planning", "checking after planning", and "verification after executing" to conserve tokens. GSD at max settings burns through limits extremely fast.
3. **Requires $200/month plan for full features** - Multiple users report maxing their weekly limit on lower-tier plans when running GSD at full settings.

### GSD Architecture Understanding
4. **GSD is an orchestrator, not an external provider** - It uses the Claude Code CLI as its harness, wrapping standard tool calls. It is not subject to Anthropic's ban on non-ClaudeCode harnesses on fixed-cost plans.
5. **Install via `npx get-shit-done-cc`** - Single command installation that works with both Claude Code and OpenCode.
6. **OpenCode support enables free usage** - With OpenCode's free models, GSD can be used at zero cost (though potentially with reduced model quality).

### When GSD May Not Be Worth It
7. **Experienced devs may find diminishing returns** - Multiple experienced developers report that direct Claude Code usage with plan mode or superpowers yields better results with more control and fewer tokens.
8. **GSD is more suited for "vibe coding"** - Users who want to type a prompt and walk away benefit more. Developers who want control over planning, task lists, and implementation decisions may prefer direct CLI usage.
9. **Superpowers (github.com/obra/superpowers)** is cited as a lighter-weight alternative that some users prefer for accuracy and token efficiency.

### Alternative Frameworks Mentioned
10. **BMAD method** - Considered "overkill" by at least one user who found GSD more structured and straightforward.
11. **Kata (github.com/gannonh/kata)** - A GSD fork that is skills-based, using natural language to drive workflows. Comes as a Claude Code plugin rather than npm package.
12. **Superpowers (github.com/obra/superpowers)** - A plan-mode enhancement plugin that competes with GSD for structured development workflows.

### Autonomous Workflow Patterns
13. **GSD phases**: research -> planning -> checking -> executing -> verification. Each phase can be toggled on/off independently for token budget control.
14. **The core value proposition of GSD** is automating the full development cycle (plan, execute, verify) in a single prompt. The trade-off is significantly higher token usage vs. manual step-by-step Claude Code interaction.
15. **Native CC integration preferred** - Users express preference for tools that work natively with Claude Code's system (slash commands, plugins) rather than complex RAG/semantic search layers.

### Platform Notes
16. **Windows support is problematic** - Multiple users report issues on Windows. WSL may be needed. Config path differences (`.opencode` vs `.config/opencode`) caused installation failures, fixed in v1.9.7.
