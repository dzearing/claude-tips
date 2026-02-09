# Superpowers is now on the official Claude marketplace

**Source:** [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qgkupf/superpowers_is_now_on_the_official_claude/)
**Author:** u/Hozukr | **Score:** 221

## Post Content

Today I noticed that the Superpowers plugin was available on both the Superpowers marketplace and the Claude plugins official marketplace, and then I found this: [anthropics/claude-plugins-official PR #148](https://github.com/anthropics/claude-plugins-official/pull/148).

Pretty nice to see Anthropic recognizing this plugin as a valuable addition to their library. This is also why I don't waste time/energy triaging the 1,238,563 plugins/skills that are shared every day on Reddit, X, etc. There is far too much noise/AI slop around. If things are genuinely valuable, Anthropic will either embed and release their version in Claude Code or the plugin will eventually find its way to their marketplace (after being vetted by their team).

---

## Top Comments (sorted by score)

### 1. Combining skills and emergent behavior (u/ryan_the_dev, score: 28)

> Yeah. Be sure to constantly tell Claude. You can also combine skills. Here is an article I wrote up showing a bit how I use skills.
>
> https://vibeandscribe.xyz/posts/2026-01-07-emergent-behavior.html

### 2. General endorsement (u/Inevitable_Service62, score: 19)

> Been killing it with superpowers.

### 3. Obra's plugin made official? (u/Then-Alarm5425, score: 18)

> Is this still Obra's plugin, just made official? Or is it a new plugin with the same name?

**Reply from OP (u/Hozukr, score: 10):**

> Exactly the same

### 4. How to actually use it (u/CandidFault9602, score: 15)

> How do you exactly use it? Anything other than verbally telling Claude to use that plugin to conduct his/her affairs?!
>
> I did the same for frontend design plug-in/skill and Claude "read" it, which seems really nothing more than a page of instructions and motivational speech (which yours truly could have done the same), and then proceeded to do whatever the fuck it usually does anyway! So I don't really get much the 'skill' sentiment and the magic of it I am hearing here and there. Yes, skill plug-in might come up with examples too. For other things like Stripe integration it might actually learn correct APIs etc. but for frontend design it's more like "DONT FUCK IT UP WITH PURPLE COLOR."

### 5. "The single best plugin ever created" (u/Nonomomomo2, score: 13)

> The single best plugin ever created. I use it 90% more than anything else.
>
> Obra is a legend.

### 6. GSD as alternative (u/Liszewski, score: 8)

> I liked super powers but find I get better results without using as many tokens with gsd. Could've been user error but

**Link:** https://github.com/glittercowboy/get-shit-done

**Elaboration (u/Liszewski, score: 3):**

> So, not that superpowers is bad or anything - like I said, could've been user error but I found that with similar prompts given to each, gsd was able to one shot ideas whereas superpowers would have some debugging I'd have to do. Now, the superpowers debugging skill is wonderful, same with gsd's debugging, but I found I had to use it less with gsd's outputs. Perhaps this is because of the more extensive/prompted planning gsd performs or the verification it takes? Either way I have both installed just for testing if I ever want to, I just find for my flow I reach for gsd more often

### 7. Brainstorming skill workflow (u/fschwiet, score: 7)

> I always start larger changes with the brainstorming skill with a prompt like "use the brainstorming skill to ___" even when it seems like a straightforward task. It'll ask questions clarifying what you want, write a design doc, plan, and then implement. When it asks to use worktrees I say no, then when it asks to use agents or a parallel session I use the parallel session. (Claude was really misbehaving the few times I tried using agents).

### 8. Combining multiple skills (u/tigerzxzz, score: 5)

> I did something similar the other day with a hybrid.
>
> I asked Claude to use both his skill superpowers writing-plans and front-end design and load them before he started the mission.
>
> It just worked.

### 9. Ryan the Dev resources (u/deadcoder0904, score: 5)

> Watch his YT channel too. This is on his LIVE - https://www.youtube.com/watch?v=5L3dm7KBCmY
>
> But yeah, his other smaller 30-mins YT videos are good too. And his other resource I love called cc-resources which is also useful for creating skills, etc...

### 10. Combining skills across tools (u/Nonomomomo2, score: 6, and u/sendralt, score: 3)

**u/Nonomomomo2:**
> I don't know why you're being downvoted. This is a clever trick. You're basically just saying do X but with Y also, right?

**u/sendralt:**
> I also did something similar. I have a "King Mode" prompt and a "Frontend" prompt. I combined the 2 and created a new Mode in Roo Code with this new prompt as the system instruction. It works flawlessly with Opus, Sonnet, Gemini 3, GPT 5.2, and Zai-GLM-4.7.
>
> The prompt is here: https://github.com/sendralt/Frontend-King-Mode.git

### 11. Consistency issues and CASS (u/PretendEarth7769, score: 3)

> It's a good plugin but constantly reminding CC to use it gets old real quick. Even in the middle of using the subagent dev workflow it will skip the review steps pretty much every time. Only after pointing it out will it go back and do the reviews. I find plan mode with subagents is far more consistent and effective. Am I doing something wrong? Whatever feature I'm attempting work on, I'll include "remember to use your superpowers for every step/task" or "use superpowers: subagent driven development workflow for this". Episodic memory is hit or miss. I mainly use CASS now. I'm all ears for what I need to do differently to make it work consistently and thoroughly. Thanks!

**CASS reference:** https://github.com/Dicklesworthstone/cass_memory_system

### 12. Token usage concern (u/ebalonabol, score: 1)

> Superpowers is dope. After trying a ton of plugins and MCPs, I ended up sticking with just Superpowers and the Codex MCP. Honestly don't need anything else. My only pet peeve is token usage - Sonnet on the Pro plan blows through the daily limit in ~30 minutes of continuous subagent-driven work. But that feels more like a subagent issue than a Superpowers one.

### 13. Design philosophy (u/uhgrippa, score: 2)

> Really cool, although I hope they defer to Obra's initial design philosophy of simple yet powerful, as that's what made superpowers great in the first place. Sharp tool that is easy to understand

### 14. Token usage tradeoff (u/ravechan36, score: 1)

> It eats up a lot of tokens and I hit the limit faster. But it is a great tool and I use it a lot.

### 15. Hook-based reminder (u/TheOriginalAcidtech, score: 1)

> You could modify it (or add if it doesn't have one) so the usersubmithook adds the reminder to every prompt you send.

---

## Extracted Tips and Insights

### Superpowers Core Capabilities

1. **Subagent-driven development workflow** - The plugin provides structured workflows using subagents for planning, implementation, and review steps.
2. **Brainstorming skill** - Start tasks with "use the brainstorming skill to ___" to get clarifying questions, design docs, plans, then implementation.
3. **Debugging skill** - A dedicated debugging workflow that multiple users praised.
4. **Writing-plans skill** - Structured planning before implementation.
5. **Episodic memory** - Stores context across sessions (described as "hit or miss" by some users).

### Effective Usage Patterns

1. **Constantly remind Claude to use it** - Multiple users noted that Claude tends to skip Superpowers steps (especially review steps) unless explicitly reminded each time.
2. **Combine multiple skills** - Load multiple skills at once (e.g., "use both superpowers writing-plans and front-end design and load them before starting"). Users report this works well.
3. **Use parallel sessions over agents** - When Superpowers offers to use worktrees or agents, prefer parallel sessions. One user reported agents "misbehaving."
4. **Start every non-trivial task with brainstorming** - Even for seemingly straightforward tasks, the brainstorming skill adds value by structuring the approach.
5. **Use usersubmithook** - Automate the "remember to use superpowers" reminder by adding it to a submit hook so every prompt includes it.
6. **Plan mode with subagents** - Some users find this more consistent than relying on Superpowers' own subagent workflow.

### Known Limitations

1. **Token-heavy** - Subagent-driven work consumes tokens rapidly. Pro plan Sonnet can hit daily limit in ~30 minutes of continuous subagent work.
2. **Consistency** - Claude sometimes skips review steps and needs to be reminded to follow the full workflow.
3. **Episodic memory** - Described as "hit or miss" for maintaining context.
4. **Skill instructions may not change behavior** - Some users (especially for frontend design) found that skill instructions didn't meaningfully alter Claude's behavior, working more like motivational text than concrete directives.

### Alternative/Complementary Tools Mentioned

| Tool | Link | Notes |
|------|------|-------|
| **Get Shit Done (GSD)** | https://github.com/glittercowboy/get-shit-done | Compared favorably for one-shot results and lower token usage |
| **CASS Memory System** | https://github.com/Dicklesworthstone/cass_memory_system | Alternative to Superpowers' episodic memory |
| **Codex MCP** | (not linked) | Mentioned as complementary to Superpowers |
| **SuperBeads Wiggum** | https://github.com/EliaAlberti/superbeads-universal-framework | Framework built around Superpowers |
| **Frontend King Mode** | https://github.com/sendralt/Frontend-King-Mode.git | Combined "King Mode" + "Frontend" prompts |
| **TDAD** | https://link.tdad.ai/githublink | VS Code extension with visual n8n-style canvas for BDD workflows |
| **cc-resources** | (ryan_the_dev) | Resource for creating skills |

### Key Takeaway

Superpowers is widely regarded as the most valuable single plugin for Claude Code, with its inclusion in the official Anthropic marketplace seen as validation. The primary challenge is getting Claude to consistently follow the full workflow without manual reminders. Power users get the most value by combining skills, starting with brainstorming, using parallel sessions, and automating reminders via hooks.
