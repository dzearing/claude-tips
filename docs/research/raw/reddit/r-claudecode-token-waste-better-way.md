# This seems like a waste of tokens. There has got to be a better way, right?
**Score:** 208 | **Comments:** 84 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qyt0fo/this_seems_like_a_waste_of_tokens_there_has_got/
**Author:** u/UnknownEssence

## Post Content

[Image post showing Claude Code using multiple sub-agents for what appears to be a simple task]

---

## Top Comments

### u/Ok-Experience9774 (Score: 122)
Explore uses haiku, which is essentially free compared to the other agents.

The explore agent follows the instruction and gives the answer.

Simple example:

Claude(opus): Go find me all the code that deals with widgets

Explorer(haiku) goes and searches the code base and responds back with a list of files -- Claude context use, virtually nothing, haiku cost, virtually nothing

Claude (opus) Now I have to read these files and understand them -- Claude context cost high, token usage medium.

Claude: Coder agent, modify these files and make the widgets brown.

Coder(sonnet) reads the files into its own context, does whatever needs doing, reports back a summary. Claude context usage: low, overall cost: medium.

Depending on the complexity having a subagent coder could be more expensive in this situation since claude(opus) might have been able to do it itself.

If you've got lots of work to do, Claude needs to protect its context, that's priceless, so it should be farming everything off. For a simple one off, meh.

In the end it comes down to what it has always come down to: Cost, Quality, Speed. Pick 2

### u/Main-Lifeguard-6739 (Score: 28)
Haiku is far away from being "essentially free". It cost about 20% of opus but those agentic searches easily consume 100s of 1000s of tokens.

### u/acutelychronicpanic (Score: 12)
I straight up had to turn off explore and plan agents and it has saved so many tokens. The adjustment is tightening the scope of the session/plan.

It sounds nice to keep their contexts separate, but I'd watch 3 parallel explore agents burn 100k-300k tokens. Claude is way too eager to use them and they love to peruse the whole codebase apparently.

Only other thing is ensuring that every folder has a CLAUDE.md that Claude is instructed to update at the end of every plan with an index of what is in that folder, what each thing does, and the api of each module so it doesn't have to open files just to interact with that part of the codebase.

### u/tcn33 (Score: 9)
I had Opus 4.6 go through plan mode, come up with a comprehensive plan, then clear context to execute it - only to burn a half-million tokens on planning again.

### u/Ok-Experience9774 (Score: 5)
thats true, I guess i was thinking of "compared to having opus do the research". I'll actually have some numbers on that soon -- i'm dogfooding writing a claude coordinator (isn't everyone?) and have detailed per model stats from real world use.

### u/1millionbucks (Score: 2)
Brilliant response

### u/Obvious_Equivalent_1 (Score: 1)
That's why I try to offload a lot of activity that goes to Haiku normally to a locally installed model, the delay is almost negligible but the local AI cost 0 tokens compared.

The real solution if you work in an already small code base is to learn to use backtick commands for MD files.

### u/Dependent-Drag-5790 (Score: 1)
I have other experiences with explore where opus 4.6 is using sonnet 4.5 to explore

### u/Ok-Experience9774 (Score: 1)
oooff. At least it wasn't spinning up sonnet[1m] (I hope!)
