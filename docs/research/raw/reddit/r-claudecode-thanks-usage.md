# Reddit Thread: "Went from 0% to 7% usage by saying thanks"

- **Source**: https://www.reddit.com/r/ClaudeCode/comments/1q9jzvd/went_from_0_to_7_usage_by_saying_thanks/
- **Subreddit**: r/ClaudeCode
- **Author**: u/Successful-Camel165
- **Score**: 278 (89% upvoted)
- **Comments**: 69
- **Date Fetched**: 2026-02-09

---

## Original Post

> I said 1 word to start the session, immediately hit 7% usage.
>
> 0% -> 7%
>
> There is already stuff in the context window above this (from my last session window)

The post includes a screenshot showing the usage spike from a single "thanks" message.

---

## Top Comments (sorted by score)

### [Score: 120] u/stampeding_salmon

> Well if someone says thanks to you, you probably do need to gather enough context to understand why they're thanking you, or if they're being sarcastic, etc.

### [Score: 66] u/mrsheepuk

> If you have a 180k token context chat going, sending even a single character will spend 180k input tokens + however many tokens that single character is... so, in an existing chat, this could happen... depends on your plan and model what percentage of a session that would represent, but it's not just the 'thanks' it has to process.
>
> Input tokens ARE cached so they aren't necessarily 'charged' the same on every turn of the conversation, but I think they're only cached for 5 minutes so if you leave more than 5 minutes since the last message, all the input tokens of the whole conversation are, effectively, new.

### [Score: 32] u/EndlessZone123

> You admitted to having context before just before saying thanks. Do you think context tokens are free or something?

### [Score: 20] u/TheJudgeOfThings

> Well, don't do that.

### [Score: 15] u/s0m3d00dy0 (reply)

> That's exactly what they do use enough context to complete the token selection

### [Score: 11] u/tr14l (reply to mrsheepuk)

> It will add whatever token and what tokens it added in the reply. The KV is cached.
>
> I'm not sure if they don't count cached tokens at all, or if it's "discounted" though. Haven't done the math

### [Score: 8] u/tr14l

> /context
>
> Likely it loaded your system stuff after you started the session. It wouldn't ever start at 0% legitimately. It at least loads the default stuff

### [Score: 7] u/jazzy8alex

> t h a n k s = 6% + 1% tips . why you are upset?!

### [Score: 7] u/larowin (reply)

> there literally isn't a question posed in this post
>
> nor is there any useful information to help knowledgeable folks give an explanation (what model, what's the `/context` output, is thinking enabled, what's the CLAUDE.md like, did they clone one of the GitHub repos with a thousand agent templates, etc).

---

## Mid-Range Comments

### [Score: 5] u/MyUnbannableAccount (reply to mrsheepuk)

> Sorta, you're missing the cached tokens though, which are billed on the API at 10% on the reads.

### [Score: 3] u/FosterKittenPurrs (reply)

> Cache expires after a while, so if you start a new session in an old long chat, none of that is cached.
>
> Writing it all to cache is more expensive than just parsing the message once. If you use the API directly, you choose between 5m cache and 1h cache, with the 1h one being even more expensive.
>
> If it is cached, it costs 1/10th of the price.

### [Score: 3] u/PrudentStorage2376

> That 1 word - yes, it sucks to see your quota go from what seems like 0% usage to 7% usage with just 1 word. But if you did an A/B test, it wouldn't be like 15 words in a new prompt would then go from 7% used to 100% used. So there is a "start-up tax" for each prompt you give it, whether it is "thanks!" or "ok, let's get started". That start-up tax varies a lot from use case to use case. My own claude.md is pretty bloated, i know, i haven't been good at deleting things in it, but I know that yes, after my first message to the model, it goes through the claude.md, and if that claude.md is bloated, like mine, I pay "bloated-tax" as well as the regular start-up tax.
>
> So:
> Start-up tax is a bummer, but if you are aware of it, and try to remember that 1 word prompts in certain situations can lead to a lot of token use, then you will slowly get better Claude Code habits. Maybe it could be "Thanks! Ok, going to the next thing, here is a path to a .md file with a todo-list, let's start from the top", or whatever. You would still get token usage from the "thanks!" part of it, but the "thanks-tax" would be embedded into it doing the rest of the prompt you gave it as well.
>
> Good luck on your Claude Code journey, and may the start-up tax be kind!

### [Score: 3] u/Ciucku

> I have also tested this, /usage takes up 4%, did it again, I'm at 8% lol

### [Score: 3] u/equinoxDE

> man this is just getting ridiculous by the day. I hope Anthropic gets their shit together soon or else if OpenAI comes up with a Claude Code level model, I am never touching CC again.

### [Score: 2] u/jbcraigs (reply)

> That's precisely how Agents work though. You do understand that in CC, it is not just passing your words directly to an LLM? It passes lot of additional context.

### [Score: 2] u/ClinchySphincter

> token tipping culture is real

### [Score: 2] u/Eastern_Guess8854

> I opened a new chat the other day, checked the status and it was 2%...just for checking the status...anthropic is constantly cutting the token limits after they get you onboard and it's shifty bs. I cancelled my subscription the other day cos fuck that, I'll just use the next tool to offer me a good amount of token usage for a reasonable price

### [Score: 2] u/Old-School8916

> this is a problem even with the agent sdk. claude code has a big cold start token usage

### [Score: 2] u/devdnn

> Your current context window is likely quite large.
>
> And I'll leave this here why you shouldn't do it
>
> https://futurism.com/altman-please-thanks-chatgpt

---

## Lower-Scoring But Informative Comments

### [Score: 1] u/amnesia0287

> That's like the bootstrap. Before you send a message you consume 0 context, any messages is gonna inject the system prompt and potentially other prompts, I can't even remember if it actually loads Claude.md before a message is sent. On first request it takes all that and builds a context to start having a conversation with you.
>
> I'm guessing a single word for another response wouldn't increase it nearly as much.

### [Score: 1] u/InhaleTheAle (reply to amnesia0287)

> You're referring to the context window, OP is referring to the session limit that rolls over ever few hours. It sounds like OP loaded in a nearly full context window into a new "session," so something like 150K tokens counts again against that session limit, even if that same context also counted against a previous session limit.
>
> Someone else explained it better above.

### [Score: 1] u/yodacola

> Keep track of your token usage throughout your conversation. I have a gas bar that slowly goes down to zero once the context window goes to 80% full. It turns from green to gray once I've filled 75k of my context window and it turns red with a warning sign once I've filled about 66% percent of my window. Just be very intentional about your context and you will get good results.

### [Score: 1] u/thesnowmancometh

> I haven't seen anyone else mention this yet, but I wouldn't be surprised if you had a number of MCP servers installed (or even just a few big ones). MCP servers currently load all of their header data into context at the start of the session. So that could fill up your context window and consume tokens without you realizing.

### [Score: 1] u/moonshinemclanmower

> cut back on mcp tooling... use /context to see, that's why my personal plugins tools on https://github.com/AnEntrypoint/glootie-cc is context reduced but also a little context expanded to get the most out of startup context

### [Score: 1] u/soyjaimesolis

> I personally avoid obvious stuff, unnecessary back and forth meaning = tokens

### [Score: 1] u/wingman_anytime

> Why do we never see the output from /context in these posts complaining about token usage?

### [Score: 1] u/kinpoe_ray

> because of your setting /config /skills ..

### [Score: 1] u/SERRALEOA

> /context maybe you have some MCP running

### [Score: 1] u/cannontd

> You need to understand that from the first message of the session from you to Claude, every time you send more text, the entire conversation is sent.

### [Score: 1] u/mike21532153 (reply)

> Yep I tested this today and I used 10% of my 5 hour usage just by starting Claude code.

### [Score: 1] u/katsup_7

> Do it again but clear the context so there is nothing on screen, then you will see how much usage a thanks takes up

### [Score: 0] u/Dizonans

> Don't overthink the context window, I start my conversation at 22% context window and I build features for omny.chat without any issue.
>
> In some cases I reach 100% context window which starts to summarizing and then I continue

---

## Extracted Tips and Insights

### Token Usage Mechanics

1. **Every message resends the entire conversation context.** When you type a single word in a long conversation, the entire context (potentially 180k+ tokens) is resent as input tokens. The cost is not just the word you typed -- it is the entire accumulated conversation. (u/mrsheepuk, u/cannontd)

2. **Cache expiration matters.** Anthropic caches input tokens, but the cache expires after roughly 5 minutes of inactivity. If you step away and come back, all those input tokens are treated as fresh/new, costing more. On the API, cached reads cost 1/10th the price of uncached. (u/mrsheepuk, u/FosterKittenPurrs)

3. **"Cold start" / "startup tax" is real.** The first message of any session triggers loading of system prompts, CLAUDE.md files, MCP server headers, skills, and other bootstrapping context. This alone can consume 2-10% of your session quota before you even ask a real question. (u/tr14l, u/amnesia0287, u/Old-School8916, u/PrudentStorage2376, u/mike21532153)

4. **Session limits vs. context window are different concepts.** The session usage percentage tracks tokens consumed against a rolling rate limit (resets every few hours). The context window is the total conversation size the model can hold. Both matter, but the session limit is what gates your ability to keep working. (u/InhaleTheAle)

### Context Bloat Sources

5. **Bloated CLAUDE.md files increase every-message cost.** Since CLAUDE.md is injected into every request, a large one adds a recurring "tax" on every single message. Keep it concise. (u/PrudentStorage2376)

6. **MCP servers load header data into context at session start.** Having many or large MCP servers installed silently inflates your starting context. Use `/context` to audit what is loaded. (u/thesnowmancometh, u/SERRALEOA, u/moonshinemclanmower)

7. **Skills and config contribute to context overhead.** Settings loaded via `/config` and `/skills` also add to the context that gets sent with each message. (u/kinpoe_ray)

### Practical Optimization Tips

8. **Never send throwaway messages like "thanks" alone.** If you want to acknowledge and move on, combine it with your next instruction: "Thanks! Now let's move to X..." This amortizes the per-message cost across useful work. (u/PrudentStorage2376, u/TheJudgeOfThings)

9. **Use `/context` to audit what is in your context window.** Many users complaining about usage never check what is actually loaded. Understanding your context composition is the first step to optimizing it. (u/tr14l, u/wingman_anytime, u/larowin)

10. **Reduce unnecessary back-and-forth.** Every conversational round-trip resends the full context. Batching instructions into fewer, more substantive messages saves tokens. (u/soyjaimesolis)

11. **Track your token usage proactively.** One user built a custom status bar showing context fullness with color coding (green -> gray -> red). Being intentional about context leads to better results. (u/yodacola)

12. **Clear context when starting new tasks.** Rather than continuing a long conversation, start fresh when switching to unrelated work. This avoids paying the "re-read" cost for irrelevant old context. (u/katsup_7)

13. **Trim MCP tooling.** Cut back on installed MCP servers you do not actively need. Each one adds context overhead at startup and potentially on every message. (u/moonshinemclanmower)

### Mental Model

14. **Think of each message as "re-reading the entire conversation."** The model does not "remember" previous messages -- it re-processes everything from scratch each turn. A 1-word message in a 100k-token conversation costs ~100k input tokens, not 1 token. This is the fundamental insight most users miss.

15. **Cached tokens help but are not free.** Even with prompt caching, cached tokens still count at roughly 10% of their full cost on the API. And caching only helps if messages are sent within the cache TTL (~5 minutes). After that, everything is full-price again. (u/MyUnbannableAccount, u/FosterKittenPurrs, u/tr14l)
