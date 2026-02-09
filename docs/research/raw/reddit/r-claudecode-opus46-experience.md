# Reddit: r/ClaudeCode - "Opus 4.6 is" (Experience Thread)

- **Source**: https://www.reddit.com/r/ClaudeCode/comments/1qx76jb/opus_46_is/
- **Author**: u/Appropriate-Past-231
- **Score**: 245 (92% upvoted)
- **Comments**: 116
- **Date**: ~June 2025

---

## Original Post

> I've been using Max 5x for almost a year.
>
> Opus 4.6 made me as excited as the release of Opus 4.0.
>
> Amazing, watching it orchestrate and manage 6 agents simultaneously is sublime!
>
> I've only been using Opus 4.5 for scheduling lately. With 4.6, I noticed a high consumption of my limit with a single request, so let's learn from the past and go back to using Opus as the plan and Sonnet as the author.
>
> Opus 4.6 wrote a fantastic .md file. At the end of the file, it mocked Sonnet, telling it that it must be fast because it had already done the bulk of the work.
>
> Great job, Anthropic!

---

## Extracted Tips and Patterns

### 1. Opus-as-Planner, Sonnet-as-Executor Pattern

**Source**: OP (u/Appropriate-Past-231, score 245) + multiple commenters

The most prominent tip in this thread: Use Opus 4.6 for planning and orchestration, then switch to Sonnet (or even Haiku) for execution. This conserves tokens while leveraging Opus's superior reasoning.

> "I noticed a high consumption of my limit with a single request, so let's learn from the past and go back to using Opus as the plan and Sonnet as the author." -- OP

> "Ask opus in /plan, switch to /model sonnet when you need to run the plan." -- u/Appropriate-Past-231

> "If you write a detailed design with opus, you can get sonnet to execute it." -- u/TrapHuskie (score 1)

> "With a good plan and tasks that are atomic, you can even use Haiku for implementation. This is a seriously slept on token economy hack. Haiku is FAR better than most people assume, it just needs a bit more specific instructions. And Opus 4.6 is happy to provide that." -- u/xmnstr (score 1)

### 2. Token Usage and Rate Limits (Major Concern)

Heavy token consumption is the dominant concern in the thread. Opus 4.6 burns through quotas faster due to its extended thinking and agent orchestration.

> "Just running for 2 hours, I've spent 50% of my weekly quota, and I'm on the max plan." -- u/No_Comparison7855 (score 1)

> "What used to be enough work to fit in the 5 hour window I blow out in less than an hour now." -- u/RazerWolf (score 1)

> "I did a single request that was basically a find and replace operation. Just that request used 6% of my quota (pro plan)" -- u/Middle-Nerve1732 (score 1)

> "I'm on Max x5, and today was the first time I hit the session limit. Nothing special--just normal pair programming." -- u/iviireczech (score 1)

### 3. Agent Teams vs. Subagents (Token Economy)

Critical distinction: Agent teams burn tokens fast due to context duplication. Subagents are more efficient for most tasks.

> "I've tried to experiment with that agent team and launched 5 agents to work on 2 backend services and 2 frontend services - analysis and brainstorm for planning task (no implementation yet, just plan) - it ran pretty fast, full analysis in 5 minutes, but it took 20% of my max5 quota. I've created /insights and fed it to opus to give me advices on features from opus 4.6 to use - it told me to forget about agent teams and focus on subagents." -- u/gvoider (score 7)

> "You should only consider multiple agents if you want multiple approaches being tested more or less independently in parallel. Their work will overlap to a high degree. That sure means burning tokens. You shouldn't use them for speeding up the process. That's what subagents are for." -- u/Tobi-Random (score 1)

> "6 agents = 6x burn + supervisor overhead. However, each agent has more domain-specific context (smaller) that gets distilled into the main thread for even more reduction and the agents can be instructed to use the model appropriate for the work." -- u/pwarnock (score 4)

> "I wouldn't do any more than 2 or 3 agents in max 5 plan." -- u/who_am_i_to_say_so (score 1)

> "I had 50, burned through that quota REAL fast." -- u/zR0B3ry2VAiH (score 3)

### 4. How to Enable Agent Teams

> "First add env variable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` = '1' either to your env or to settings.json for claude. Then tell claude code explicitly to create an agent team for the task. I'd recommend first to read the guide on https://code.claude.com/docs/en/agent-teams" -- u/gvoider (score 13)

### 5. Context Management and Compaction

> "Using it single agent at a time, pair programming with you, planning first, and constantly compacting/clearing context, you'll never touch the cap. I've noticed without a plan it can fill up its own context with a lot of going-around-in-circles reasoning tokens though, far more than 4.5 did" -- u/bronfmanhigh (score 1)

> "On long coding sessions, I often (maybe 2-3 times every hour) hit a 'compaction timeout', which completely breaks my flow" -- u/Hungry_Pomelo_5044 (score 1)

### 6. Keeping Tasks Atomic / Avoiding Parallel Execution

> "Don't let it execute tasks in parallel with sub-agents because each sub-agent needs its own contextualizing. So parallel execution is faster but typically at a hefty token expense." -- u/TrapHuskie (score 1)

> "When you use planning and new agents and limit your feature/debug/fix/analyse requests to not do too much at once, I feel like 4.6 is using less tokens than 4.5 actually" -- u/ChrizFader (score 2)

### 7. MCP Servers as Force Multipliers

> "The more MCP servers and skills I use, the more blown away I am. Claude was able to basically just build an entire data pipeline for me. I enabled it set it up the cloud workers with pubsub, added dummy data to test db, ran tests, pulled logs, looked up debug solutions online, and just iterated over and over until it got a full solid pipeline up and running." -- u/CrunchyMage (score 10)

> "The biggest ones were supabase mcp and frontend design skill. Once claude could see table schema, read/write to test tables, and read logs, it could actually do most of the entire write/test/revise loop on its own." -- u/CrunchyMage (score 1)

### 8. Opus 4.6 for Deep Code Review

> "Had it do a deep code review of my extension (73K LOC across 5 frameworks) and a full competitive analysis against 20+ competing projects with star counts, feature matrices, and gap analysis. Both came back sharp with real architectural insights, not generic summaries." -- u/mobcat_40 (score 7)

### 9. Practical Model Comparison (4.5 vs 4.6)

> "4.6 is a step improvement, but doesn't blow 4.5 out of the water. I still find myself correcting major (and seemingly obvious) mistakes. I am working with a 250k line file code base, so the context window limitation is hit quite often." -- u/Hungry_Pomelo_5044 (score 1)

> "I would say it is on par with Opus from late November/early December" -- u/Valgav (score 1, referring to pre-quantization 4.5)

> "I had a bug that I literally have not been able to solve for about six months for a vibe coded app and it fixed it in two tries." -- u/javier71088 (score 1)

### 10. Third-Party Tools Mentioned

> "I am even more excited for things like https://github.com/zippoxer/subtask as we finally got smart orchestrator" -- u/Valgav (score 1)

> "Download the superpowers skill." -- u/TrapHuskie (score 1)

### 11. Usage with Pro vs. Max Plans

> "Since I am a pro user I cannot use too much because I run into the limit quite fast, however I've noticed that there is not much difference between using Opus 4.6 and Sonnet 4.5 in terms of usage. When I run a complex task in plan mode I use around 10-15% usage (the 6 hour limit), both with sonnet and opus, so I started using only Opus 4.6 and Haiku for simpler tasks." -- u/Arcanis8 (score 1)

---

## All Comments (87 extracted)

### Top-Level Comments (sorted by score)

#### u/MythrilFalcon (score 34)
> It's like Christmas again

**Reply** u/Last-Assistance-1687 (score 2): Christmas, Easter and Birthday combined

**Reply** u/merksam (score 2): and orchestrated by the main agent

---

#### u/thread-lightly (score 20)
> Here we go again

**Reply** u/Kedaism (score 7): The unending cycle of: Best model ever > has it become really stupid > omg best model ever

---

#### u/Playfade (score 19)
> only been using Max 5x for about a week. With Opus 4.5, I was able to handle all my planning and work without hitting usage limits. Is it possible to do the same with 4.6, for a similar type of usage, without exceeding the limit?

**Reply** u/ChrizFader (score 2): When you use planning and new agents and limit your feature/debug/fix/analyse requests to not do too much at once, I feel like 4.6 is using less tokens than 4.5 actually

**Reply** u/bronfmanhigh (score 1): really depends on your usage but using it single agent at a time, pair programming with you, planning first, and constantly compacting/clearing context, you'll never touch the cap lol. i've noticed without a plan it can fill up its own context with a lot of going-around-in-circles reasoning tokens though, far more than 4.5 did

**Reply** u/RazerWolf (score 1): In my experience so far, no. What used to be enough work to fit in the 5 hour window I blow out in less than an hour now.

**Reply** u/TrapHuskie (score 1): If you don't let it get stuck in loops or do too many code unnecessary analysis phases once the plan from opus is written. If you write a detailed design with opus, you can get sonnet to execute it. Also, don't let it execute tasks in parallel with sub-agents because each sub-agent needs its own contextualizing. So parallel execution is faster but typically at a hefty token expense.

**Reply** u/iviireczech (score 1): I'm on Max x5, and today was the first time I hit the session limit. Nothing special--just normal pair programming.

---

#### u/ErikThiart (score 17)
> useless without anthropic actually increasing the limits substantially. give me opus 4.5 but 100x the limit and I'll do more than whatever their next 5 model releases will offer. The bottleneck is the draconian rate limits

---

#### u/CrunchyMage (score 10)
> I feel like I'm tony stark building with Jarvis. The more MCP servers and skills I use, the more blown away I am. Claude was able to basically just build an entire data pipeline for me. I enabled it set it up the cloud workers with pubsub, added dummy data to test db, ran tests, pulled logs, looked up debug solutions online, and just iterated over and over until it got a full solid pipeline up and running. It's just actually so nuts. I feel like I am the bottleneck now. Just need to look up better ways of setting up agents and leveraging this to build even faster.

**Reply** u/gongsh0w (score 10): Anyone else not sleeping these days because you're doing a year's worth of work in one night?

**Reply** u/ragnhildensteiner (score 7): Which MCP servers had that effect on you? ... Same here. I can't describe a feature fast enough for it to start producing it. It feels like my brains thoughts/second is the bottleneck now.

**Reply** u/CrunchyMage (score 1): The biggest ones were supabase mcp and frontend design skill. Once claude could see table schema, read/write to test tables, and read logs, it could actually do most of the entire write/test/revise loop on its own. The front end design skill is just insane. I basically just one shot an amazing site with me just referencing a few example designs I liked.

---

#### u/mobcat_40 (score 7)
> The agents thing is next level. It tried before but never quite worked for me. Now it's still a tiny bit buggy but I got back great results: had it do a deep code review of my extension (73K LOC across 5 frameworks) and a full competitive analysis against 20+ competing projects with star counts, feature matrices, and gap analysis. Both came back sharp with real architectural insights, not generic summaries.

**Reply** u/ragnhildensteiner (score 6): How do you try the "agents thing" in Claude Code? Do you just tell it in chat to use multiple agents to do stuff, or is it a config somewhere?

**Reply** u/gvoider (score 13): First add env variable `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` = "1" either to your env or to settings.json for claude. Then tell claude code explicitly to create an agent team for the task. I'd recommend first to read the guide on https://code.claude.com/docs/en/agent-teams

---

#### u/williamtkelley (score 3)
> Do the 6 agents burn through quota?

**Reply** u/gvoider (score 7): Absolutely. The anthropic compares subagents to agents team - subagents use less tokens, agents team use significantly more tokens. I've tried to experiment with that agent team and launched 5 agents to work on 2 backend services and 2 frontend services - analysis and brainstorm for planning task (no implementation yet, just plan) - it ran pretty fast, full analysis in 5 minutes, but it took 20% of my max5 quota. I've created /insights and fed it to opus to give me advices on features from opus 4.6 to use - it told me to forget about agent teams and focus on subagents.

**Reply** u/Tobi-Random (score 1): You should only consider multiple agents if you want multiple approaches being tested more or less independently in parallel. Their work will overlap to a high degree. That sure means burning tokens. You shouldn't use them for speeding up the process. That's what subagents are for.

**Reply** u/pwarnock (score 4): 6 agents = 6x burn + supervisor overhead. However, each agent has more domain-specific context (smaller) that gets distilled into the main thread for even more reduction and the agents can be instructed to use the model appropriate for the work. The context window is now 1 million tokens.

**Reply** u/evilissimo (score 3): No it isn't, only if you use API and explicitly request the 1m variant

---

#### u/Son_Squall (score 2)
> They are cutting our limits! Can't do much with this. Feel like a kid that was giving a half candy! Anthropic please stop nerfing it otherwise we can't trust you!

**Reply** u/Middle-Nerve1732 (score 1): Yeah they have to do something about the limits. I did a single request that was basically a find and replace operation. Just that request used 6% of my quota (pro plan), that's not gonna work.

---

#### u/TriggerHydrant (score 2)
> After a (what I assumed was fake) ceases and desist letter for my app. I used 4.6 to rebrand my iOS app and website in about 1 hour and relaunch. Got approved tonight and now I'm back up and running.

---

#### u/Ok-Support-2385 (score 2)
> We have about 3 weeks until they quantize and nerf the model.

**Reply** u/Dolo12345 (score 1): 3 weeks? it could be tomorrow man

---

#### u/Noncookiecutterfreak (score 2)
> Question: what are you guys mostly using it for? Work related or private projects?

**Reply** u/Middle-Nerve1732 (score 1): I use it mainly for little personal apps. For example I built one to track my baby's sleep pattern, another one that acts like a Walkie talkie so my wife can talk to me even when I'm wearing headphones or in another room. These are things where apps exist to do this already, but they have lots of ads or want me to subscribe. With Claude I just build it myself exactly how I want it to be. I think this is how apps will work in the future.

---

#### u/xmnstr (score 1)
> With a good plan and tasks that are atomic, you can even use Haiku for implementation. This is a seriously slept on token economy hack. Haiku is FAR better than most people assume, it just needs a bit more specific instructions. And Opus 4.6 is happy to provide that.

---

#### u/Maximum-Wishbone5616 (score 1)
> Is it better than Opus 4.5 from November?

**Reply** u/Valgav (score 1): I would say it is on par with Opus from late November/early December

---

#### u/branik_10 (score 1)
> do you use the `default` model or `opusplan` or do you manually switch between `opus` and `sonnet`?

---

#### u/Valgav (score 1)
> I am even more excited for things like https://github.com/zippoxer/subtask as we finally got smart orchestrator (until next lobotomy at least) and based on how good codex 5.2 was for raw code output and now we have 5.3 we have reliable coder. Working with mid/large codebases might actually become a thing without limiting AI to work on single package/module at a time

---

#### u/egghead-research (score 1)
> What do you mean by using Opus 4.5 for scheduling?

**Reply** u/Appropriate-Past-231 (score 1): In /plan, there used to be an option to Use opus as orchestrator, Sonnet as executor. It's gone now, but you can switch when needed. Ask opus in /plan, switch to /model sonnet when you need to run the plan.

**Reply** u/chillebekk (score 1): Is that the same as the "opusplan" model alias? It's gone?

---

#### u/No_Comparison7855 (score 1)
> It is almost useless. It's a token burner. Unless the quota is increased, I am afraid the user cannot benefit from it. Just running for 2 hours, I've spent 50% of my weekly quota, and I'm on the max plan.

---

#### u/Arcanis8 (score 1)
> I've been using Opus 4.6 today and it feels like a big improvement from 4.5. Since I am a pro user I cannot use too much because I run into the limit quite fast, however I've noticed that there is not much difference between using Opus 4.6 and Sonnet 4.5 in terms of usage. When I run a complex task in plan mode I use around 10-15% usage (the 6 hour limit), both with sonnet and opus, so I started using only Opus 4.6 and Haiku for simpler tasks.

---

#### u/Electrical-Taro9659 (score 1)
> Anyone agrees with this sentiment when operating on large multi-repo codebase? 4.5 was a train wreck wrapped in a dumpster fire. Curious, if 4.6 is really that good? I'm kind of once burned twice shy.

---

#### u/ConftSea (score 1)
> Same here, and I bought 20x for a month to boost my projects following the release of Opus 4.6. It's so good!!

---

#### u/javier71088 (score 1)
> It's simply amazing. I had a bug that I literally have not been able to solve for about six months for a vibe coded app and it fixed it in two tries. I'm so happy.

---

#### u/TrapHuskie (score 1)
> Download the superpowers skill.

---

#### u/Hungry_Pomelo_5044 (score 1)
> I use Claude Opus for 8-10 hours a day for software development. I have a full AI driven workflow. I don't write code anymore though I have/did for the past 20 years. My take on opus 4.5 vs 4.6 is that 4.6 is a step improvement, but doesn't blow 4.5 out of the water. I still find myself correcting major (and seemingly obvious) mistakes. I am working with a 250k line file code base, so the context window limitation is hit quite often. On long coding sessions, I often (maybe 2-3 times every hour) hit a "compaction timeout", which completely breaks my flow, but is better then hiring 10 people to do the work I'm doing.

---

#### u/EfficientMasturbater (score 1)
> My first prompt was a plan mode prompt to implement a feature on a pwa that I've had stable for months and my documentation for all the API links is as good as it can be, and it was directed towards it. Opus 4.6 broke it. Idk guys

---

#### u/bzBetty (score 1)
> Do is the agent swarm an actual model feature or Claude code specific one? Would it happen for other editors using opus?

---

#### u/webjuggernaut (score -5)
> Can you give me a super quick walkthrough using Claude to orchestrate 6 agents? I'm on the $100/mo plan, and I'm afraid to burn usage experimenting.

**Reply** u/Secret-Collar-1941 (score 2): just ask claude to set it up for you

---

#### u/onepunchcode (score -8)
> i also hate the fact that they didn't reset the usage of all users after the new model release.

**Reply** u/666fuckyou (score 7): $50 credit available if you go to your usage page

**Reply** u/zR0B3ry2VAiH (score 2): In fairness, and due to all the outages they had, they did give me $50 in free credits on max.

---

## Key Takeaways Summary

### Workflow Patterns
1. **Opus plans, Sonnet/Haiku executes** -- the dominant token-saving strategy
2. **Use /plan mode** with Opus, then switch model for execution
3. **Keep tasks atomic** -- avoid overly broad requests
4. **Compact/clear context frequently** -- prevents reasoning loops
5. **Avoid unnecessary parallel agent execution** -- each agent duplicates context

### Agent Architecture
- **Agent teams** (`CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`) are powerful but token-expensive
- **Subagents** are preferred for most tasks (less token overhead)
- Agent teams best for **independent parallel exploration** of different approaches
- Limit to 2-3 agents on Max 5x plan to avoid burning quota
- Each agent output gets distilled back to main thread

### Token Economy
- Opus 4.6 consumes significantly more tokens than 4.5 per request
- Extended thinking generates more reasoning tokens, especially without a plan
- A single complex plan-mode request can use 10-15% of Pro plan quota
- Agent teams can consume 20% of Max 5x quota for a single analysis task
- Haiku execution with Opus-generated plans is an underused cost optimization

### MCP Servers Worth Investigating
- **Supabase MCP** -- enables Claude to see schema, read/write test tables, read logs
- **Frontend design skill** -- enables one-shot site designs from reference examples
- **Superpowers skill** -- mentioned but not elaborated

### Model Quality Assessment
- Significant improvement over quantized Opus 4.5
- Roughly on par with early (pre-quantization) Opus 4.5 from Nov/Dec 2024
- Better at orchestration and multi-agent coordination
- Still makes obvious mistakes on 250k+ LOC codebases
- Context window limitations remain a pain point
- Compaction timeouts disrupt flow on long sessions

### Skepticism / Concerns
- Rate limits are the primary frustration across all plan tiers
- Fear of future quantization/nerfing (happened to 4.5)
- "Here we go again" cycle: hype > degradation > new model hype
- Some users report it breaking previously stable code
- Token cost makes experimentation risky on lower-tier plans
