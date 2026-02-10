# Claude Code + playwright CLI = superpowers
**Score:** 161 | **Comments:** 39 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1r03a0t/claude_code_playwright_cli_superpowers/
**Author:** u/Hopeful-Fly-5292

## Post Content

Playwright CLI is out and it's a really solid addition for agentic coding. I've started using it across my projects and it makes browser interactions much more reliable and predictable, which was often the tricky part before. I put together a short explainer video showing how it works and how I'm using it together with Claude Code, in case that's useful for others experimenting in this space.

I disabled playwright MCP - fully on playwright CLI now

---

## Top Comments

### u/lockyourdoor24 (Score: 13)
Opus 4.6 is a lot better at browser use in general. I've noticed a massive increase in speed and it's not getting stuck nearly as often when using devtools mcp. Also far fewer warnings about large 30k+ pages being read so I'm guessing it has been optimised for token usage too. It was one of the things that was noted in the improvements from 4.5 to 4.6.

### u/sizebzebi (Score: 8)
supertokens for the mcp, I tried once and instantly deleted it. what difference does this make is you don't have to transfer the context and cli will do the job for you?

### u/Careless_Bat_9226 (Score: 5)
We have playwright tests that run in CI and locally for key flows but I've been wishing I could tell Claude Code something like "test the feature I'm working on in playwright" and have it figure out a playwright test that would run through the necessary UI flows.

I like the CLI but even then it's really slow if after each action the LLM has to think about what to do next.

Anyone have ideas? I've thought about maybe creating a skill that builds up the whole testing sequence as a typescript file beforehand and then runs it and then evaluates the result.

### u/AI_should_do_it (Score: 3)
I tell Claude to use playwright to test features

### u/Careless_Bat_9226 (Score: 3)
Well, sure, but that's slow as molasses.

### u/AI_should_do_it (Score: 2)
It's faster than me describing what's wrong. Btw there are two ways to use playwright, the LLM direct interaction and the e2e tests using playwright library

### u/ProfitNowThinkLater (Score: 1)
IMO the best approach is a combination. Using playwright to test each commit. But also creating a skill with screen recording/transcription like OBS + Screenpipe. You run your skill and claude starts watching your desktop. You click through your app, point and describe what's wrong and have claude create bugs according to a preconfigured template.

### u/beth_maloney (Score: 1)
I have a skill that writes js scripts that call playwright. Honestly I don't find it any better than using the mcp server. Maybe if I invested more time in creating a testing framework for my app it would be better but not sure if it's worth the investment.

### u/Careless_Bat_9226 (Score: 1)
If you have CC controlling each playwright command then it's multiple seconds for the LLM to evaluate each command. I don't want to just run my predefined playwright tests - I want it to create custom flows. I want to run it locally as I'm developing and be able to give it plain English instructions like I would a qa tester, eg "create a new user and go through X wizard and then try to do X".

### u/Flannel_Man_ (Score: 1)
You can do that. Have you tried?
