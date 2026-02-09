# Reddit: Confirmed Claude Code CLI burns ~1-3% of your quota on startup

**Source:** [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qazqq6/confirmed_claude_code_cli_burns_13_of_your_quota/)
**Author:** u/JohnGalth | **Score:** 217 | **Comments:** 114
**Date:** 2026-01-12

---

## Original Post

I saw some posts here recently about the new CLI draining usage limits really fast, but honestly I thought people were just burning through tokens without realizing it. I decided to test it myself to be sure.

I'm on the Max 20 plan. I made sure I didn't have an active session open, then I just launched the Claude Code CLI and did absolutely nothing. I didn't type a single prompt. I just let it sit there for a minute.

Result: I lost about 1-3% of my 5h window instantly. Just for opening the app.

If it's hitting a Max plan like this, I assume it's hurting Pro/Max 5 users way harder.

I got curious and inspected the background network traffic to see what was going on. It turns out the "initialization" isn't just a simple handshake.

1. The CLI immediately triggers a request to `v1/messages`.
2. It defaults to the **Opus 4.5** model (the most expensive one) right from the start.
3. The payload is massive. Even with no user input, it sends a "Warmup" message that includes the **entire JSON schema definition for every single tool** (Bash, Grep, Edit, etc.) plus your entire [`CLAUDE.md`](http://CLAUDE.md) project context.

So basically, every time you launch the tool, you are forcing a full-context inference call on Opus just to "warm up" the session.

I have the logs saved, but just wanted to put this out there. It explains the "startup tax" we're seeing. Hopefully the Anthropic team can optimize this routine (maybe use Haiku for the handshake?) because burning quota just to initialize the shell feels like a bug.

---

## All Comments (sorted by score)

### u/Aggressive-Pea4775 (score: 32)

Genuinely believe this is a versioning issue, nothing to do with models or CC itself.

2.1.5 is busted IMHO - which is where your test falls down.

2.0.76 (as I was looking at this) has been 60-70% less wasteful in tool calls and token usage. It just gets it done.

Give it a go - you’ll see what I mean.

---

### u/drumnation (score: 20)

People seem confused about what you are saying. If you want to chain sessions together there are a few different ways. Clear and handoff or kill the instance start a fresh instance… OP is saying if you kill and start fresh you incur a token penalty during startup every single time. If you extend that to many many handoffs you can see that getting out of control.

---

### u/buyurgan (score: 12)

what is going on here.. people clearly doesn't get the point.  
if its true (which i hardly can believe it is, but I expect bad practices or bugs), this is clearly very problematic behavior for both Anthropic and customers. if you open 100 instances of a claude code and do nothing and kill the processes after 10 seconds, you basically spending tokens on nothing.  
a proper tool should only handshake, Oauth, check updates, server status, analytics etc etc and nothing more, until user enters a prompt. I don't even think otherwise can be considered legal.

---

### u/TheXIIILightning (score: 7)

&gt;plus your entire [`CLAUDE.md`](http://CLAUDE.md) project context.

This one is shocking for me, because unless I remind Claude Code to read that file or .claude, it'll just blatantly ignore every written rule and reference directory and start doing its own thing.

What's even the point of loading all that info before there's any interaction..

---

> > ### u/tomchenorg (score: 6)

> > "This is a feature, not a bug!" 😄
> > 
> > Indeed, those warmup messages seem to be intended for caching and later reuse, which would save tokens. However, they send the warmup messages eagerly instead of lazily, they are sent at startup, instead of when the user sends their first message, or more precisely, the first message that actually requires those warmup messages.

---

> ### u/JohnGalth (score: 6)

> Spot on. That is exactly the point.
> 
> It creates an invisible "overhead cost" for every new session. If you work in a way where you open fresh instances often (which is a very common workflow for developers), you are effectively paying a premium just for that workflow style, regardless of the complexity of your actual prompts.

---

> > ### u/t4a8945 (score: 6)

> > Yes that seems obvious, it should be lazy-loaded and not triggered just by typing "claude" in the terminal. Good finding

---

> ### u/JohnGalth (score: 6)

> **T**hat logic only holds true if you assume 100% of sessions result in a prompt being sent immediately. In reality, that is often not the case, and that's where the waste happens.
> 
> **1. The "Abandoned Session" Tax:** If I open the CLI, just to /usage, manage mcps etc or realize I'm in the wrong directory, and exit (or kill the terminal) without sending a message, I have paid that full context cost for absolutely zero value. With lazy loading (wait for input), that cost would be $0.
> 
> 2. The Cache TTL Problem: Prompt caching has a Time-To-Live (Anthropic’s default TTL is **5 minutes**). If I open the CLI and spend 10 minutes crafting a complex, structured prompt (or get distracted), the cache from that "Warmup" request may expire before I hit Enter.
> 
> Result: I pay for the Warmup -&gt; It expires -&gt; I send my prompt -&gt; I pay to process the context again.
> 
> So no, it is not always a "sunk cost." In many scenarios, it is a **double cost** or a **dead cost**.

---

> ### u/JohnGalth (score: 6)

> It's not about being "butthurt", it's about software efficiency.
> 
> Wasting compute resources on empty sessions benefits no one. It hurts the user's quota, and it costs Anthropic money for zero value delivered.
> 
> If a car burned 3% of its gas tank every time you just unlocked the door, pointing that out wouldn't be "complaining about gas prices"—it would be a valid bug report.

---

> ### u/tomchenorg (score: 5)

> By 2.1.15, you mean 2.1.5 right?
> 
> v2.1.5 was released 20 hours ago, Claude's developer [said](https://github.com/anthropics/claude-code/issues/16157#issuecomment-3737070631) they were fixing it 11 hours ago

---

> > ### u/Aggressive-Pea4775 (score: 5)

> > Fancy me, the human, having too many 1’s and 0’s 😉
> > 
> > Fixed.
> > 
> > And yep, chatted with Boris earlier - hopefully a fix on the way soon!

---

> ### u/JohnGalth (score: 5)

> Wow. Are you on the **Pro** plan?

---

### u/ZealousidealShoe7998 (score: 5)

this has been observed when a user decides to use subagents as well.  
Main CLi Triggers subagents, subagents start the token usage with like over 10k tokens. If you have more tools and mcp this can start at even higher numbers like 15, 19, 23k

---

> ### u/JohnGalth (score: 5)

> I'm not speculating about how it *feels* to use it; I am looking at the actual network traffic logs.
> 
> The CLI undeniably triggers a `v1/messages` request to Opus 4.5 with a massive payload immediately upon launch. That costs tokens. That is a fact.
> 
> If you keep a single session open for 10 hours straight, you only pay this "startup tax" once, so it might seem negligible to you. But for workflows where you open and close the terminal frequently (switching contexts, restarting tools), that \~1-3% hit happens **every single time** you launch the app.

---

> ### u/JohnGalth (score: 4)

> That’s an interesting data point. If `2.0.76` doesn't trigger this specific `v1/messages` "Warmup" call on startup, then this is definitely a regression introduced in the newer versions.
> 
> However, just to be clear: I'm not talking about it being wasteful *during* a task (like getting stuck in loops or bad tool calls). I'm talking about the hard-coded startup sequence.
> 
> Does `2.0.76` skip that initial Opus inference call entirely? If so, that confirms they broke the initialization logic in `2.1.x`.

---

> > ### u/Historical-Lie9697 (score: 4)

> > I think that's why the disable all background processes variable was just added as an option. There is a ridiculous amount of haikus running around in the background for things like prompt hints, checking available plugins, etc. Feels like its basically an unprompted explore agent on every session start. So I disable all that stuff. Plus now even with auto compact off you've got conversation compaction going on in the background which is nice but also eats up tokens

---

> ### u/JohnGalth (score: 4)

> You hit the nail on the head.
> 
> The "100 instances" scenario is the perfect stress test to demonstrate why this logic is broken. If you ran a script right now to open and close the CLI 100 times, you would indeed burn through your quota having produced absolutely zero value (cached hits are cheaper, but not free).
> 
> It seems like an aggressive optimization gone wrong—trying to "pre-warm" the context so the first response feels snappy—but they failed to account for the fact that the user is paying a premium for that warmup. It should absolutely be lazy-loaded (wait for prompt -&gt; send context).

---

> > ### u/ReasonableLoss6814 (score: 4)

> > It’s only cached until evicted (1-5 hours)

---

### u/tomchenorg (score: 4)

Yes, the notorious Warmup call. 11 hours ago, they said they were removing it: [https://github.com/anthropics/claude-code/issues/16157#issuecomment-3737070631](https://github.com/anthropics/claude-code/issues/16157#issuecomment-3737070631). By the way, v2.1.5 was released 20 hours ago, so it’s not there yet

---

### u/southernPepe (score: 4)

I just opened mine and typed /usage.  Just doing that took 12%

---

> ### u/JohnGalth (score: 4)

> The issue isn't that my context counts as usage—I expect to pay for the tokens I use. The issue is **when** and **how** it triggers.
> 
> Currently, it burns quota in the background purely for initialization. If I open the CLI, realize I'm in the wrong directory, and close it immediately without sending a single message, I've still lost some of my quota.
> 
> That is bad UX. It should be lazy-loaded: load the context and charge me when I actually send my first prompt, not just for launching the executable.

---

> > ### u/Aggressive-Pea4775 (score: 3)

> > Hard to know 100% but they patched 2.1.0 quickly with 2.1.1 which was ok-ish on the weekend but nowhere near 2.0.76.
> > 
> > 2.1.5 horrid, tried 2.1.1 still shocking, but got all my productivity back with the downgrade to 2.0.76.
> > 
> > Agree with your assertion, and I know correlation doesn’t equal causation but I’d put some money on your take being true.

---

> > ### u/southernPepe (score: 3)

> > yes

---

### u/Low-Efficiency-9756 (score: 3)

The payload is massive. Even with no user input, it sends a "Warmup" message that includes the entire JSON schema definition for every single tool (Bash, Grep, Edit, etc.) plus your entire CLAUDE.md project context.

If I’m not mistaken, these items should be sent upfront. Then we just cache em.

---

> > ### u/JohnGalth (score: 3)

> > True, but you are overlooking the **TTL (Time-To-Live)**.
> > 
> > The cache isn't permanent. It typically has a short lifespan (e.g., 5 minutes for Anthropic).
> > 
> > If I launch the CLI and take more than 5 minutes to craft a complex prompt or read documentation before hitting Enter, the cache from that "Warmup" request expires.
> > 
> > So in that scenario, the mandatory warmup literally causes **double billing** for the same context.
> > 
> > If I open the terminal, the CLI forces me to pay for that **Cache Write** immediately. If I then close the terminal (even if I just manage mcps, plugins etc, or I made a mistake) without sending a real message, I paid for the Write but never got the benefit of the cheap **Cache Read**.
> > 
> > That is the waste. With lazy loading, I would only pay that write cost if I actually intended to use the session.

---

### u/MannToots (score: 3)

In my experience this is expected and happens in every tool. A new chat includes a new copy of the system prompt and tool definitions. That eats context. I understood this to be the understood way that everyone knew it worked. 

---

> ### u/tomchenorg (score: 3)

> Yes those warmup messages seem to be intended for caching and later reuse, which would save tokens. However, they send the warmup messages eagerly instead of lazily, they are sent at startup, instead of when the user sends their first message, or more precisely, the first message that actually requires those warmup messages.
> 
> If a user opens CC just to check their usage, then the warmup messages are a waste of tokens.

---

> > ### u/lucianw (score: 3)

> > If it was lazy, it wouldn't be a warmup!

---

> ### u/Transhuman-A (score: 3)

> Subsidized is not really a thing. 
> 
> It just means *think* they should charge more for it, not that it costs more than they charge.
> 
> Value. Not cost. I could start a torn condom company, price a condom at 100,000$ a pop and then subsidize it down to 1000$ and ask you to be grateful that I gave you the chance to buy it.

---

> > ### u/drumnation (score: 3)

> > You’re doing the lords work. That’s an important thing to know. That it’s preferable to clear a session to restarting the terminal for more than one reason. Especially if you might be spinning up fresh terminal instances before starting Claude code with automation.

---

> > ### u/Brandroid-Loom99 (score: 2)

> > It really doesn't though.  If you know how these things work, caching is the only way it's possible to do in a sane way.  You are sending your entire context with every single message regardless.  That's just a fact.  So you really aren't paying any tax for the opening of the session.  
> > 
> > There is a tax, but it's really for opening a session and letting it sit there without using it.  I agree it sucks and as soon as I get my claude back, I'm going to write a proxy to block this crap anyway :)

---

> ### u/Brandroid-Loom99 (score: 2)

> You do know that all of the context is sent with every request, right?  LLMs are stateless, there is no 'up front'.  You have one big chunk of text that gets processed more or less at the same time, then you get tokens back.  Everything else is just an illusion built on top of that.
> 
> The reason this is important is because there is no such thing as "it's not sending my CLAUDE.md".  Yes it is, it's sending it with every single message.  That is fundamental to the technology.  
> 
> I'm not saying it's not ignoring it, what I'm saying is that the reason is somewhere else besides "it never got it".  Are you saying "You must always use 2 space indent, NEVER tabs" and it ignores that?  Or "You must use the correct formatting style and best practices" and it ignores that?

---

> ### u/Difficult_Knee_1796 (score: 2)

> Unfortunately, most people here don't bother to try to understand how any of this works. Even though you can literally ask the tool itself in natural language at any time to help figure it out/understand better.

---

> ### u/MythrilFalcon (score: 2)

> Explains why people were complaining that a session launching subagents could burn an entire 5hr pro window

---

### u/Firm_Meeting6350 (score: 2)

Soooo many bugs, it also load files over and over again, seems like it's not able to read its context currently. And for me it looks like it adds the project context to EACH message, additionally the "Background notification system" seems to be broken - Claude constantly thinks there are diagnostic (Typescript) issues, then loads the full file again, runs validation without any modifications and comments "Diagnostics were stale, all good"

---

### u/emerybirb (score: 2)

The fundamental problem by design is that users are penalized for Anthropic's own bugs to begin with. Doesn't matter what the bug of the day is that causes them to use too much of our quotas. This entire rate limiting model is a scam. They make the client, it is inefficient, we pay for their own inefficiency, not them.

The irony is most of the inefficiency comes from the degradation. They attempt to make it work less, thinking that will save tokens, but really it just pushes users into an infinite loop of not being able to accomplish their tasks, burning through tokens and getting no value.

Context windows are a super obvious example of this... they keep finding ways to reduce it, but you can never finish anything, always restarting compact, always having to re-read everything to get context back, this just goes on forever with only a tiny bit of headroom to do any work. If they simply had a larger context to begin with, the tasks could just be finished once, not after 10 hours of undersized context windows being compacted moving at a snails pace.

The same for review agents... we need tons of agents to fact check and quality control claude because it cuts corners and cheats. All of this is 10x more expensive than it just doing the work the first time and not trying to cut corners.

Everything they attempt to do to save costs backfires and costs more, then they blame us, and gaslight us.

---

### u/emerybirb (score: 2)

Something I notice since the update is it will just sit there streaming in tokens.... 1k, 2k, 10k..... for 3-5 minutes. Then after all of it say nothing but "ok" like wtf.

They aren't thinking either. Just zero explanation what these tokens supposedly are or what it's doing. Complete mystery. Just, fake apparently.

---

> ### u/the_quark (score: 2)

> I'll get downvoted with you because apparently people dislike having more information.
> 
> I'm on Max 5 and I also can't reproduce this. I have 18.5k tokens in MCP tools and opening a new session does not move my "Current session" bar at all.
> 
> Also on 2.1.5.
> 
> Note I'm not saying the people reporting this are *wrong* -- but it's not universal. There's some other variable.

---

> ### u/adelie42 (score: 1)

> It isn't an arbitrary penalty. It has to consume the system prompt which is sent quietly before the first user prompt.

---

> > ### u/drumnation (score: 1)

> > TBH, another problem here is claude code doesn't provide a good way to smoothly chain interactive sessions together. All these things we do feel like workarounds. The 100 instances scenario is only even really an issue because you can't have claude clear itself so you have to setup a rube goldberg machine to do that properly.  The other way potentially would be auto-compact with a custom prompt, but there doesn't seem to be a way to set a default custom compaction prompt. Meaning the only way to get that custom behavior is a manual slash command and then you need to be managing claude outside of claude to allow fully autonomous handoffs.
> > 
> > Autocompact is the only way to really autonomously chain sessions together supported by claude code in interactive mode. But it's very wasteful on tokens and starts to blur it's mission after a while.  If you could set your own default compaction prompt you could choose for compaction to function more like a session clear with a short handoff. Sometimes my post-autocompact sessions start at 100k tokens, I'm pretty sure it's just bugged in general. Right now I feel like we're being discouraged from automating the management of the context window more effectively because the lack of tools provided by claude code make it difficult to do that.
> > 
> > There have been complaints in the forums about autocompact, most of us turn it off or come up with what feels like a bandaid. Out of everything they could fix, fixing compaction would make their entire system so much more efficient for everyone. It should be a feature you customize as the user with your own dedicated rules and you should have a lot of control over the compaction... don't even call it compaction, just make an actual handoff ability within claude, so you can choose if you want claude to garble up your conversation into 100K tokens with compaction or write what's actually necessary to create continuity and bridge a longer session together in 20K tokens. Automate a clear instead of a compact at 50-75% context and have a recover from handoff protocol or lifecycle hook that runs after the auto-clear runs? something that would make it easier to hook the scaffolding layer with all the planning into these handoffs.
> > 
> > But then you're saying we're paying a big penalty if the method we're using to get around claude code making it hard to automate clean low token handoffs, which would be to automate spawning new terminal sessions running claude code and now we're getting hit with token waste there too? Not to mention anytime you update your claude code configuration you have to restart all your open instances anyway... more penalty. Sorry for the book. I figured if you're running these kinds of experiments you're trying to do some of the same stuff. I hope claude reads this too lol.

---

> ### u/adelie42 (score: 1)

> The difference between CC and web is that it works the way you say for web, but when you send that first prompt it initialized a new session with the system prompt, then processes the user prompt. This is why the first response is slightly slower. With CC, unless you are resuming a session, starting CC starts a new session on launch consuming the system prompt.
> 
> It's like calling a technician and having them drive to your house only to tell them you don't need anything and wondering why they still charge you a service fee for no service.
> 
> Also worth noting that Claude's system prompt is exceptionally long. It is also one of many things that makes it so good.
> 
> Not only does the documentation confirm this, but you get the same thing running a local LLM. Start a new session and see your GPU usage spike. 
> 
> Think of it like spinning up a new AWS server and doing "nothing" with it. You are still expected to pay for the resources of bioting up the OS.

---

> > ### u/buyurgan (score: 1)

> > interesting points ... i agree most of it but still, we are paying for the token usage ...  
> > it this is required, then, it should also clearly be documented, each time claude code is started, it costs 3k token etc. or give an optional argument for cold starting the tool.

---

> ### u/Difficult_Knee_1796 (score: 1)

> Show us what happens when you type /context on a fresh chat window. How many subagent definitions do you have included by default in each chat. Or tools, or MCP servers etc.

---

> ### u/lucianw (score: 1)

> They are cached.
> 
> They're sent on every single message, but they're used just as "cache keys" -- on subsequent messages, they don't count against quota; they just find the stuff that was previously sent and cached.

---

> ### u/TheOriginalAcidtech (score: 1)

> Those are sent on the first user prompt as well so unless you are "using" claude code by opening it and NOT DOING ANYTHING WITH IT, then this doesn't change how many tokens you use. THE VERY FIRST USER PROMPT loads those SAME TOKENS. With the push back of course this will get reverted to lazy loading but the tokens will STILL BE USED all the same.

---

> ### u/Difficult_Knee_1796 (score: 1)

> lmao welcome to why people who understand how it works don't impulsively install the "mega super expert all domains pro super pack" of 30 1000+ token agent definitions that are posted here all the time. Agent definitons take up context, if you include each one of them in all of your projects they'll eat that shit up. To phrase it like an LLM, It's not "this has been observed", it's you slowly noticing you didn't understand what you were signing up for.

---

> ### u/Brandroid-Loom99 (score: 1)

> I was over in LocalOllama subreddit the other day and a rig capable of running GLM 4.7 @ 20 TPS costs as much as 4-6 years of paying for Claude Max 20.  We get 80-100 TPS.  
> 
> I'll restate that: if you wanted to get anywhere close to what Claude provides, you will be spending $15k-$20k, up front, for an inferior model and ~1/4 the speed.  You have to pay for electricity, any parts that go bad, you have to set it all up and maintain it yourself.  Not that it's impossible, I was a cloud engineer on an ML platform team, but installing Nvidia drivers on linux is not how I like to spend my free time.  
> 
> God himself could come down from heaven and cure world hunger and people would complain that eating wasn't as fun now or something.

---

> ### u/Brandroid-Loom99 (score: 1)

> Have you ever considered pressing ctrl+o to see what it's doing?

---

### u/EmotionalAd1438 (score: 1)

Plugins and mcps also kill memory on immediate startup. Best way to test would be fresh laptop. Fresh install, initial startup, after subscription login.

---

### u/Beginning_Aioli1373 (score: 1)

Interestingly enough, up until today, I was using my personal account with a Pro subscription. Today, I've created a new account (with business domain) and Max account. I've tested this early when v2.1.15 came out and it was happening. But then I switched accounts (logged off personal and logged with business domain) and it seems this is not a case anymore. Actually it is even more weird because I'm pushing CC much harder than on 20$ plan and the session is still at 0% which is even weirder now.

---

> > ### u/Beginning_Aioli1373 (score: 1)

> > Well...I hit the session limit and it still shows 0% in claude webpage &amp; CC /usage is somehow broken so I need to figure how to fix it. However, just installed ccusage and it shows 92% and at least it is being more accurate then claude webpage...

---

> > ### u/Brandroid-Loom99 (score: 1)

> > It's hilarious you think Anthropic has more than like 10 people working on Claude Code.

---

### u/AVanWithAPlan (score: 1)

The heads up a lot of people don't realize that due to the granularity of this signal 1% doesn't really mean anything in the UI because it is calculated based on the ceiling of the percent so any amount from zero to one will appear as one it's the same reason why you have 1% left after you hit 100%

---

### u/ThreeKiloZero (score: 1)

It's cache preloading. 

In theory, these things do not change, so it's write once and read from the cache for the duration of the session. That does assume a particular behavior, which may not be standard for everyone. 

I also noticed huge differences in my cache hits and writes from the new year but my usage seems to be progressing more normally than it has (other than this preloading).

---

### u/gissisim (score: 1)

Does this mean that Ralph Loops are getting hit by this on each loop?

---

> ### u/Brandroid-Loom99 (score: 1)

> Yes, in that the context is cached in this case as well as with CC.  the real problem is if you open CC and let it sit there until the cache expires, that's a waste.  If you hit the cache, it refreshes the TTL.  Once you go 5 minutes w/o hitting the cache it expires.  
> 
> Ralph loops are probably all cache hits.

---

### u/formatme (score: 1)

It could be the system prompt getting accounted for which is most likely a bug

---

### u/adelie42 (score: 1)

1. For pro of a 5h session. Not weekly or for max.

2. Given no USER  prompt. You are still responsible for the system prompt. The system prompt is the initial alignment that makes Claude better than others, among other things.

You can confirm this by reading the documentation.

---

### u/moonshinemclanmower (score: 1)

type /context to see whats up, that's why my tooling [https://github.com/AnEntrypoint/glootie-cc](https://github.com/AnEntrypoint/glootie-cc) has months and months of tweaks slightly increasing and vastly reducing the context along the way, to get the most out of context, if you want to get rid of the system prompt, add a coding style

---

### u/uxdirector (score: 1)

I've noticed that the token reduction and the session are getting a lot shorter since the first of the year.  Claude ran a promo doubling the tokens/sessions before the end of the year, but didn't warn customers about the reduction! Very shady!

---

### u/Different-Use2635 (score: 1)

lot of that burn comes from the search phase - Claude reads way more files than it needs to because grep/ripgrep can't tell what's actually relevant

been augmenting with warpgrep via mcp. it's agentic search (like cognitions swe-grep but cheaper and actually usable). no embeddings, just reasons through the codebase and pulls exactly what's needed

makes a noticeable difference in token usage because you're not dumping irrelevant files into context. docs are sparse but setup is easy

---

### u/ShelZuuz (score: 1)

I don't repo this - also on Max 20 and opened Claude for the first time today just now and let it sit for 5 minutes - it's still at 0%.   
  
I have MCPs loaded, even my own, and they connected.

---

> > ### u/tomchenorg (score: 1)

> > It was easily provable if you guys had simply done a traffic interception and inspection like OP, the warmup message was there.
> > 
> > I was on Max 5, and I had to start the CLI an average of 6 times to consume 1% of 5-hour usage. If you guys just started the CLI once or twice with Max, of course the percentage could stay unchanged.
> > 
> > Anyway, Anthropic quietly (not stated in v2.1.6 changelog, only mentioned in this [reply](https://github.com/anthropics/claude-code/issues/16157#issuecomment-3737070631) which rebuked the users but nevertheless admitted the unnecessary warmup) fixed this, removing the warmup in v2.1.6 released 13 hours ago, which I can confirm

---

> ### u/ardicli2000 (score: 1)

> Cc versions?

---

> > ### u/ShelZuuz (score: 1)

> > 2.1.5

---

> > ### u/amado88 (score: 1)

> > Initialisation does spend tokens, and it's not surprising. You need to load the system prompt and the tool definitions before you can start, and it's now ready for you to use.

---

> > ### u/emerybirb (score: 1)

> > lol and you only need to open another session to type /usage because the CLI is so buggy and you can't do it while the agent is running

---

> > ### u/Brandroid-Loom99 (score: 1)

> > No, you pay it every 30 minutes or so actually.  Every session is sending a cache warmup every 30 minutes.

---

> ### u/Brandroid-Loom99 (score: 0)

> &gt; I don't even think otherwise can be considered legal.
> 
> I'm actually laughing

---

> ### u/inkluzje_pomnikow (score: 0)

> they are definitely fucking up our usage in a/b manner

---

### u/throwawayfapugh (score: 0)

What about if you just /clear and reprompt?

---

> > ### u/Brandroid-Loom99 (score: 0)

> > You do understand that businesses have costs, right?  If you sold your torn condoms for 1/10 what you paid for them, you'd be losing money.  When people say "subsidized" that is what they mean.  It doesn't mean they're selling it for less than some imaginary price or every business would immediately mark it up to infinity and write off the losses.

---

### u/lucianw (score: -1)

You might be misunderstanding. This is a cost that you would always have born. All they're doing is using up quota slightly earlier in order to make the first response a touch more responsive.

Every single request you send includes the entire json tool schema for all tools, and your CLAUDE.md. However you only burn quota for the \*incremental additions\* in a given request, over and above the previous request.

So: (1) it sends the warmup, and burns quota for tool-descriptions and CLAUDE markdown file, (2) then you type in your first prompt and it burns quota just for the characters in your prompt.

The alternative without warmup is that (1) you type in your prompt and it burns quota for tool-descriptions and CLAUDE markdown file and your first prompt. Same total usage cost.

The only difference is that, with warmup, it is able to compute inference on tool-descriptions and CLAUDE while you're sitting at your terminal wondering what to type, so that its first prompt response ends up being faster.

---

> > ### u/lucianw (score: -2)

> > I don't think that's true. I don't believe that cache hits count against your quota. I couldn't find a direct statement on this; the following is the closts I found.
> > 
> > [https://platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits)  
> > \&gt; **For most Claude models, only uncached input tokens count towards your ITPM rate limits**

---

> > ### u/One_Internal_6567 (score: -2)

> > So that’s again just mcp clutter problem, not cc or cli

---

> ### u/lucianw (score: -4)

> You're not spending tokens. The 99 other instances will send a request, and Anthropic's servers will discover that the content was exactly the same as an earlier request, so it will use the prompt-cache it made on the first response. Therefore the other 99 instances won't count against quota.
> 
> [https://platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)

---

> > ### u/Gold_Dragonfly_3438 (score: -5)

> > Well, maybe it’s faster that way? I don’t care about 3% as I almost never run out session quota anyway, as I expect vast majority of user sessions.
> > 
> > If I do I go out and touch grass. Thanks Claude.

---

> > ### u/Gold_Dragonfly_3438 (score: -5)

> > You are orders of magnitude wrong in this example.
> > 
> > Which to API pricing.

---

> > ### u/UteForLife (score: -6)

> > This is not how it works, it has to load the Claude.md, rules, mcp etc. That is how it works

---

### u/[deleted] (score: -8)

[deleted]

---

### u/One_Internal_6567 (score: -9)

It does not. Weekly limit burning through cli or web relatively complicated task even with 10h a day sessions

---

### u/Gold_Dragonfly_3438 (score: -13)

Why is everyone so butthurt about the limits/tokens which are subsidized in rhe first place?

Enjoy they while they last, or pick another product.

---

## Extracted Token/Usage Optimization Tips

The following tips and insights about token usage and optimization were extracted from the discussion:

1. **u/Aggressive-Pea4775** (score: 32):
   Genuinely believe this is a versioning issue, nothing to do with models or CC itself.
   2.1.5 is busted IMHO - which is where your test falls down.
   2.0.76 (as I was looking at this) has been 60-70% less wasteful in tool calls and token usage. It just gets it done.
   Give it a go - you’ll see what I mean.

2. **u/drumnation** (score: 20):
   People seem confused about what you are saying. If you want to chain sessions together there are a few different ways. Clear and handoff or kill the instance start a fresh instance… OP is saying if you kill and start fresh you incur a token penalty during startup every single time. If you extend that to many many handoffs you can see that getting out of control.

3. **u/buyurgan** (score: 12):
   what is going on here.. people clearly doesn't get the point.  
   if its true (which i hardly can believe it is, but I expect bad practices or bugs), this is clearly very problematic behavior for both Anthropic and customers. if you open 100 instances of a claude code and do nothing and kill the processes after 10 seconds, you basically spending tokens on nothing.  
   a proper tool should only handshake, Oauth, check updates, server status, analytics etc etc and nothing more, until user enters a prompt. I don't even think otherwise can be considered legal.

4. **u/TheXIIILightning** (score: 7):
   &gt;plus your entire [`CLAUDE.md`](http://CLAUDE.md) project context.
   This one is shocking for me, because unless I remind Claude Code to read that file or .claude, it'll just blatantly ignore every written rule and reference directory and start doing its own thing.
   What's even the point of loading all that info before there's any interaction..

5. **u/tomchenorg** (score: 6):
   "This is a feature, not a bug!" 😄
   Indeed, those warmup messages seem to be intended for caching and later reuse, which would save tokens. However, they send the warmup messages eagerly instead of lazily, they are sent at startup, instead of when the user sends their first message, or more precisely, the first message that actually requires those warmup messages.

6. **u/JohnGalth** (score: 6):
   Spot on. That is exactly the point.
   It creates an invisible "overhead cost" for every new session. If you work in a way where you open fresh instances often (which is a very common workflow for developers), you are effectively paying a premium just for that workflow style, regardless of the complexity of your actual prompts.

7. **u/JohnGalth** (score: 6):
   **T**hat logic only holds true if you assume 100% of sessions result in a prompt being sent immediately. In reality, that is often not the case, and that's where the waste happens.
   **1. The "Abandoned Session" Tax:** If I open the CLI, just to /usage, manage mcps etc or realize I'm in the wrong directory, and exit (or kill the terminal) without sending a message, I have paid that full context cost for absolutely zero value. With lazy loading (wait for input), that cost would be $0.
   2. The Cache TTL Problem: Prompt caching has a Time-To-Live (Anthropic’s default TTL is **5 minutes**). If I open the CLI and spend 10 minutes crafting a complex, structured prompt (or get distracted), the cache from that "Warmup" request may expire before I hit Enter.
   Result: I pay for the Warmup -&gt; It expires -&gt; I send my prompt -&gt; I pay to process the context again.
   So no, it is not always a "sunk cost." In many scenarios, it is a **double cost** or a **dead cost**.

8. **u/JohnGalth** (score: 6):
   It's not about being "butthurt", it's about software efficiency.
   Wasting compute resources on empty sessions benefits no one. It hurts the user's quota, and it costs Anthropic money for zero value delivered.
   If a car burned 3% of its gas tank every time you just unlocked the door, pointing that out wouldn't be "complaining about gas prices"—it would be a valid bug report.

9. **u/JohnGalth** (score: 5):
   Wow. Are you on the **Pro** plan?

10. **u/ZealousidealShoe7998** (score: 5):
   this has been observed when a user decides to use subagents as well.  
   Main CLi Triggers subagents, subagents start the token usage with like over 10k tokens. If you have more tools and mcp this can start at even higher numbers like 15, 19, 23k

11. **u/JohnGalth** (score: 5):
   I'm not speculating about how it *feels* to use it; I am looking at the actual network traffic logs.
   The CLI undeniably triggers a `v1/messages` request to Opus 4.5 with a massive payload immediately upon launch. That costs tokens. That is a fact.
   If you keep a single session open for 10 hours straight, you only pay this "startup tax" once, so it might seem negligible to you. But for workflows where you open and close the terminal frequently (switching contexts, restarting tools), that \~1-3% hit happens **every single time** you launch the app.

12. **u/JohnGalth** (score: 4):
   That’s an interesting data point. If `2.0.76` doesn't trigger this specific `v1/messages` "Warmup" call on startup, then this is definitely a regression introduced in the newer versions.
   However, just to be clear: I'm not talking about it being wasteful *during* a task (like getting stuck in loops or bad tool calls). I'm talking about the hard-coded startup sequence.
   Does `2.0.76` skip that initial Opus inference call entirely? If so, that confirms they broke the initialization logic in `2.1.x`.

13. **u/Historical-Lie9697** (score: 4):
   I think that's why the disable all background processes variable was just added as an option. There is a ridiculous amount of haikus running around in the background for things like prompt hints, checking available plugins, etc. Feels like its basically an unprompted explore agent on every session start. So I disable all that stuff. Plus now even with auto compact off you've got conversation compaction going on in the background which is nice but also eats up tokens

14. **u/JohnGalth** (score: 4):
   You hit the nail on the head.
   The "100 instances" scenario is the perfect stress test to demonstrate why this logic is broken. If you ran a script right now to open and close the CLI 100 times, you would indeed burn through your quota having produced absolutely zero value (cached hits are cheaper, but not free).
   It seems like an aggressive optimization gone wrong—trying to "pre-warm" the context so the first response feels snappy—but they failed to account for the fact that the user is paying a premium for that warmup. It should absolutely be lazy-loaded (wait for prompt -&gt; send context).

15. **u/JohnGalth** (score: 4):
   The issue isn't that my context counts as usage—I expect to pay for the tokens I use. The issue is **when** and **how** it triggers.
   Currently, it burns quota in the background purely for initialization. If I open the CLI, realize I'm in the wrong directory, and close it immediately without sending a single message, I've still lost some of my quota.
   That is bad UX. It should be lazy-loaded: load the context and charge me when I actually send my first prompt, not just for launching the executable.

16. **u/Low-Efficiency-9756** (score: 3):
   The payload is massive. Even with no user input, it sends a "Warmup" message that includes the entire JSON schema definition for every single tool (Bash, Grep, Edit, etc.) plus your entire CLAUDE.md project context.
   If I’m not mistaken, these items should be sent upfront. Then we just cache em.

17. **u/JohnGalth** (score: 3):
   True, but you are overlooking the **TTL (Time-To-Live)**.
   The cache isn't permanent. It typically has a short lifespan (e.g., 5 minutes for Anthropic).
   If I launch the CLI and take more than 5 minutes to craft a complex prompt or read documentation before hitting Enter, the cache from that "Warmup" request expires.
   So in that scenario, the mandatory warmup literally causes **double billing** for the same context.
   If I open the terminal, the CLI forces me to pay for that **Cache Write** immediately. If I then close the terminal (even if I just manage mcps, plugins etc, or I made a mistake) without sending a real message, I paid for the Write but never got the benefit of the cheap **Cache Read**.
   That is the waste. With lazy loading, I would only pay that write cost if I actually intended to use the session.

18. **u/MannToots** (score: 3):
   In my experience this is expected and happens in every tool. A new chat includes a new copy of the system prompt and tool definitions. That eats context. I understood this to be the understood way that everyone knew it worked. 

19. **u/tomchenorg** (score: 3):
   Yes those warmup messages seem to be intended for caching and later reuse, which would save tokens. However, they send the warmup messages eagerly instead of lazily, they are sent at startup, instead of when the user sends their first message, or more precisely, the first message that actually requires those warmup messages.
   If a user opens CC just to check their usage, then the warmup messages are a waste of tokens.

20. **u/Brandroid-Loom99** (score: 2):
   It really doesn't though.  If you know how these things work, caching is the only way it's possible to do in a sane way.  You are sending your entire context with every single message regardless.  That's just a fact.  So you really aren't paying any tax for the opening of the session.  
   There is a tax, but it's really for opening a session and letting it sit there without using it.  I agree it sucks and as soon as I get my claude back, I'm going to write a proxy to block this crap anyway :)

21. **u/Brandroid-Loom99** (score: 2):
   You do know that all of the context is sent with every request, right?  LLMs are stateless, there is no 'up front'.  You have one big chunk of text that gets processed more or less at the same time, then you get tokens back.  Everything else is just an illusion built on top of that.
   The reason this is important is because there is no such thing as "it's not sending my CLAUDE.md".  Yes it is, it's sending it with every single message.  That is fundamental to the technology.  
   I'm not saying it's not ignoring it, what I'm saying is that the reason is somewhere else besides "it never got it".  Are you saying "You must always use 2 space indent, NEVER tabs" and it ignores that?  Or "You must use the correct formatting style and best practices" and it ignores that?

22. **u/MythrilFalcon** (score: 2):
   Explains why people were complaining that a session launching subagents could burn an entire 5hr pro window

23. **u/Firm_Meeting6350** (score: 2):
   Soooo many bugs, it also load files over and over again, seems like it's not able to read its context currently. And for me it looks like it adds the project context to EACH message, additionally the "Background notification system" seems to be broken - Claude constantly thinks there are diagnostic (Typescript) issues, then loads the full file again, runs validation without any modifications and comments "Diagnostics were stale, all good"

24. **u/emerybirb** (score: 2):
   The fundamental problem by design is that users are penalized for Anthropic's own bugs to begin with. Doesn't matter what the bug of the day is that causes them to use too much of our quotas. This entire rate limiting model is a scam. They make the client, it is inefficient, we pay for their own inefficiency, not them.
   The irony is most of the inefficiency comes from the degradation. They attempt to make it work less, thinking that will save tokens, but really it just pushes users into an infinite loop of not being able to accomplish their tasks, burning through tokens and getting no value.
   Context windows are a super obvious example of this... they keep finding ways to reduce it, but you can never finish anything, always restarting compact, always having to re-read everything to get context back, this just goes on forever with only a tiny bit of headroom to do any work. If they simply had a larger context to begin with, the tasks could just be finished once, not after 10 hours of undersized context windows being compacted moving at a snails pace.
   The same for review agents... we need tons of agents to fact check and quality control claude because it cuts corners and cheats. All of this is 10x more expensive than it just doing the work the first time and not trying to cut corners.
   Everything they attempt to do to save costs backfires and costs more, then they blame us, and gaslight us.

25. **u/emerybirb** (score: 2):
   Something I notice since the update is it will just sit there streaming in tokens.... 1k, 2k, 10k..... for 3-5 minutes. Then after all of it say nothing but "ok" like wtf.
   They aren't thinking either. Just zero explanation what these tokens supposedly are or what it's doing. Complete mystery. Just, fake apparently.

26. **u/the_quark** (score: 2):
   I'll get downvoted with you because apparently people dislike having more information.
   I'm on Max 5 and I also can't reproduce this. I have 18.5k tokens in MCP tools and opening a new session does not move my "Current session" bar at all.
   Also on 2.1.5.
   Note I'm not saying the people reporting this are *wrong* -- but it's not universal. There's some other variable.

27. **u/adelie42** (score: 1):
   It isn't an arbitrary penalty. It has to consume the system prompt which is sent quietly before the first user prompt.

28. **u/drumnation** (score: 1):
   TBH, another problem here is claude code doesn't provide a good way to smoothly chain interactive sessions together. All these things we do feel like workarounds. The 100 instances scenario is only even really an issue because you can't have claude clear itself so you have to setup a rube goldberg machine to do that properly.  The other way potentially would be auto-compact with a custom prompt, but there doesn't seem to be a way to set a default custom compaction prompt. Meaning the only way to get that custom behavior is a manual slash command and then you need to be managing claude outside of claude to allow fully autonomous handoffs.
   Autocompact is the only way to really autonomously chain sessions together supported by claude code in interactive mode. But it's very wasteful on tokens and starts to blur it's mission after a while.  If you could set your own default compaction prompt you could choose for compaction to function more like a session clear with a short handoff. Sometimes my post-autocompact sessions start at 100k tokens, I'm pretty sure it's just bugged in general. Right now I feel like we're being discouraged from automating the management of the context window more effectively because the lack of tools provided by claude code make it difficult to do that.
   There have been complaints in the forums about autocompact, most of us turn it off or come up with what feels like a bandaid. Out of everything they could fix, fixing compaction would make their entire system so much more efficient for everyone. It should be a feature you customize as the user with your own dedicated rules and you should have a lot of control over the compaction... don't even call it compaction, just make an actual handoff ability within claude, so you can choose if you want claude to garble up your conversation into 100K tokens with compaction or write what's actually necessary to create continuity and bridge a longer session together in 20K tokens. Automate a clear instead of a compact at 50-75% context and have a recover from handoff protocol or lifecycle hook that runs after the auto-clear runs? something that would make it easier to hook the scaffolding layer with all the planning into these handoffs.
   But then you're saying we're paying a big penalty if the method we're using to get around claude code making it hard to automate clean low token handoffs, which would be to automate spawning new terminal sessions running claude code and now we're getting hit with token waste there too? Not to mention anytime you update your claude code configuration you have to restart all your open instances anyway... more penalty. Sorry for the book. I figured if you're running these kinds of experiments you're trying to do some of the same stuff. I hope claude reads this too lol.

29. **u/adelie42** (score: 1):
   The difference between CC and web is that it works the way you say for web, but when you send that first prompt it initialized a new session with the system prompt, then processes the user prompt. This is why the first response is slightly slower. With CC, unless you are resuming a session, starting CC starts a new session on launch consuming the system prompt.
   It's like calling a technician and having them drive to your house only to tell them you don't need anything and wondering why they still charge you a service fee for no service.
   Also worth noting that Claude's system prompt is exceptionally long. It is also one of many things that makes it so good.
   Not only does the documentation confirm this, but you get the same thing running a local LLM. Start a new session and see your GPU usage spike. 
   Think of it like spinning up a new AWS server and doing "nothing" with it. You are still expected to pay for the resources of bioting up the OS.

30. **u/buyurgan** (score: 1):
   interesting points ... i agree most of it but still, we are paying for the token usage ...  
   it this is required, then, it should also clearly be documented, each time claude code is started, it costs 3k token etc. or give an optional argument for cold starting the tool.

31. **u/Difficult_Knee_1796** (score: 1):
   Show us what happens when you type /context on a fresh chat window. How many subagent definitions do you have included by default in each chat. Or tools, or MCP servers etc.

32. **u/lucianw** (score: 1):
   They are cached.
   They're sent on every single message, but they're used just as "cache keys" -- on subsequent messages, they don't count against quota; they just find the stuff that was previously sent and cached.

33. **u/TheOriginalAcidtech** (score: 1):
   Those are sent on the first user prompt as well so unless you are "using" claude code by opening it and NOT DOING ANYTHING WITH IT, then this doesn't change how many tokens you use. THE VERY FIRST USER PROMPT loads those SAME TOKENS. With the push back of course this will get reverted to lazy loading but the tokens will STILL BE USED all the same.

34. **u/Difficult_Knee_1796** (score: 1):
   lmao welcome to why people who understand how it works don't impulsively install the "mega super expert all domains pro super pack" of 30 1000+ token agent definitions that are posted here all the time. Agent definitons take up context, if you include each one of them in all of your projects they'll eat that shit up. To phrase it like an LLM, It's not "this has been observed", it's you slowly noticing you didn't understand what you were signing up for.

35. **u/Brandroid-Loom99** (score: 1):
   I was over in LocalOllama subreddit the other day and a rig capable of running GLM 4.7 @ 20 TPS costs as much as 4-6 years of paying for Claude Max 20.  We get 80-100 TPS.  
   I'll restate that: if you wanted to get anywhere close to what Claude provides, you will be spending $15k-$20k, up front, for an inferior model and ~1/4 the speed.  You have to pay for electricity, any parts that go bad, you have to set it all up and maintain it yourself.  Not that it's impossible, I was a cloud engineer on an ML platform team, but installing Nvidia drivers on linux is not how I like to spend my free time.  
   God himself could come down from heaven and cure world hunger and people would complain that eating wasn't as fun now or something.

36. **u/EmotionalAd1438** (score: 1):
   Plugins and mcps also kill memory on immediate startup. Best way to test would be fresh laptop. Fresh install, initial startup, after subscription login.

37. **u/Beginning_Aioli1373** (score: 1):
   Interestingly enough, up until today, I was using my personal account with a Pro subscription. Today, I've created a new account (with business domain) and Max account. I've tested this early when v2.1.15 came out and it was happening. But then I switched accounts (logged off personal and logged with business domain) and it seems this is not a case anymore. Actually it is even more weird because I'm pushing CC much harder than on 20$ plan and the session is still at 0% which is even weirder now.

38. **u/Beginning_Aioli1373** (score: 1):
   Well...I hit the session limit and it still shows 0% in claude webpage &amp; CC /usage is somehow broken so I need to figure how to fix it. However, just installed ccusage and it shows 92% and at least it is being more accurate then claude webpage...

39. **u/ThreeKiloZero** (score: 1):
   It's cache preloading. 
   In theory, these things do not change, so it's write once and read from the cache for the duration of the session. That does assume a particular behavior, which may not be standard for everyone. 
   I also noticed huge differences in my cache hits and writes from the new year but my usage seems to be progressing more normally than it has (other than this preloading).

40. **u/Brandroid-Loom99** (score: 1):
   Yes, in that the context is cached in this case as well as with CC.  the real problem is if you open CC and let it sit there until the cache expires, that's a waste.  If you hit the cache, it refreshes the TTL.  Once you go 5 minutes w/o hitting the cache it expires.  
   Ralph loops are probably all cache hits.

41. **u/formatme** (score: 1):
   It could be the system prompt getting accounted for which is most likely a bug

42. **u/adelie42** (score: 1):
   1. For pro of a 5h session. Not weekly or for max.
   2. Given no USER  prompt. You are still responsible for the system prompt. The system prompt is the initial alignment that makes Claude better than others, among other things.
   You can confirm this by reading the documentation.

43. **u/moonshinemclanmower** (score: 1):
   type /context to see whats up, that's why my tooling [https://github.com/AnEntrypoint/glootie-cc](https://github.com/AnEntrypoint/glootie-cc) has months and months of tweaks slightly increasing and vastly reducing the context along the way, to get the most out of context, if you want to get rid of the system prompt, add a coding style

44. **u/uxdirector** (score: 1):
   I've noticed that the token reduction and the session are getting a lot shorter since the first of the year.  Claude ran a promo doubling the tokens/sessions before the end of the year, but didn't warn customers about the reduction! Very shady!

45. **u/Different-Use2635** (score: 1):
   lot of that burn comes from the search phase - Claude reads way more files than it needs to because grep/ripgrep can't tell what's actually relevant
   been augmenting with warpgrep via mcp. it's agentic search (like cognitions swe-grep but cheaper and actually usable). no embeddings, just reasons through the codebase and pulls exactly what's needed
   makes a noticeable difference in token usage because you're not dumping irrelevant files into context. docs are sparse but setup is easy

46. **u/tomchenorg** (score: 1):
   It was easily provable if you guys had simply done a traffic interception and inspection like OP, the warmup message was there.
   I was on Max 5, and I had to start the CLI an average of 6 times to consume 1% of 5-hour usage. If you guys just started the CLI once or twice with Max, of course the percentage could stay unchanged.
   Anyway, Anthropic quietly (not stated in v2.1.6 changelog, only mentioned in this [reply](https://github.com/anthropics/claude-code/issues/16157#issuecomment-3737070631) which rebuked the users but nevertheless admitted the unnecessary warmup) fixed this, removing the warmup in v2.1.6 released 13 hours ago, which I can confirm

47. **u/amado88** (score: 1):
   Initialisation does spend tokens, and it's not surprising. You need to load the system prompt and the tool definitions before you can start, and it's now ready for you to use.

48. **u/emerybirb** (score: 1):
   lol and you only need to open another session to type /usage because the CLI is so buggy and you can't do it while the agent is running

49. **u/Brandroid-Loom99** (score: 1):
   No, you pay it every 30 minutes or so actually.  Every session is sending a cache warmup every 30 minutes.

