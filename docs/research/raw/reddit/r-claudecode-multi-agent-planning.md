# Just Discovered a New Claude Code Superpower - Multi Agent Planning
**Score:** 155 | **Comments:** 20 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qhkfis/just_discovered_a_new_claude_code_superpower/
**Author:** u/256BitChris

## Post Content

I always use plan mode for every conversation starting prompt, along with slash commands, subagents, etc.

However, today I just found out something that has been yielding insane results - I still enable plan mode, but I specifically tell Claude to spin up several agents (plan, custom, whatever it sees fit) to best solve our problem.

As you can see in my screenshot, it kicked off 3 Plan agents and one explore. Each came up with its own plan then they collaborated and came up with a final plan.

I'm actually blown away - had to share with someone!!

---

## Top Comments

### u/MR_PRESIDENT__ (Score: 11)
I've been doing this. Not even sure what other context agents are useful for at this point. They do really well at splitting up planning or telling them to understand a codebase

### u/Corv9tte (Score: 10)
Yep, this is really good. Token hungry though, it's probably overkill for a bit of brainstorming, but for the occasional big refactor it actually saves time because one planning agent will ALWAYS miss critical details because the scope is too big (and then get roasted by the plan reviewing agent). I still tend to only use one though. Claude overseeing it will just modify the incomplete plan all by itself, then launch another review until it's all perfect. I'm not actually sure which is more efficient, I'll have to see!

### u/Keep-Darwin-Going (Score: 5)
Actually I asked it to spin up 2 for each model instead since all model have strength and weakness. I figured that it should give enough variant to cover all corners

### u/Historical-Lie9697 (Score: 4)
Try the feature dev plugin from the official anthropic plugins in /plugin. It has a nice brainstorm -> implement -> review workflow.

### u/Attacus (Score: 3)
Just tell it to use multiple agents

### u/256BitChris (OP Reply) (Score: 2)
Good question - I just let it run off the plan it comes up with - one of the new features I've noticed is that when it presents the plan, there is now an option that says 'clear context and run plan' - I've been choosing this and it runs through the plan and does everything it has planned. I will say that I always start a new conversation and I break my conversations into distinct tasks. I don't say, build me a SaaS that does all the things - I break things down like I would if I were tasking an engineering team - usually atomic features with specific focus that can be done in about 10-15 mins of claude chunking.

### u/256BitChris (OP Reply) (Score: 2)
Are you asking about each of the plans each agent makes? I never see those directly, I just seem them being built behind the scenes (they write to .md files). When they're done, Claude goes through them all, with those agents and then surfaces just one plan to me - so from my user viewpoint, it's no different than running a single plan agent. However, I've been loving the plans that have been coming out of planning with multiagents - they seem to be much more extensive and 'thoughtful'

### u/cactrwar (Score: 2)
oh yeah, i've heard good things about the updates to plan mode, need to try them out. how do you manage all the different subtasks, especially once you have to put stuff together? do you use separate docs to manage the different design decisions, or do you just let them all share one central doc? or do you just let claude manage the plan and you just vibe it

### u/cactrwar (Score: 1)
nice, how do you manage that plan once it starts getting large? do you tend to break plans down into multiple subdocs, or do you just let it go off a single plan

### u/256BitChris (OP Reply) (Score: 1)
I posted the prompt I used - just tell it to spawn multiple agents to solve the problem, do the plan, etc. One of the things that's been hardest to learn is that really all you need to do to get Claude to do anything is just ask it nicely :-)

### u/Otje89 (Score: 1)
That's an interesting approach. Did you also noticed recently the improvement of the planner agent? I haven't used it in a while and used a custom skill for it, because I wasn't happy with the CC's planner agent. However, it seems to be improved massively.

### u/AttentionTall4235 (Score: 1)
Hi, how do I get CC to do this? Is it a prompt or command? What prompt are you passing?
