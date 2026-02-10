# Figured out why /compact loses so much useful context - and a potential fix
**Score:** 70 | **Comments:** 29 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qcjwou/figured_out_why_compact_loses_so_much_useful/
**Author:** u/mrgoonvn

## Post Content

Been using claude code for about 7 months now on some fairly complex projects.

The /compact command drives me crazy sometimes - hit it to save context space, then 30 minutes later realize I need to reference something that got summarized away.

**The problem with current /compact:**

- Happens server-side (no local backup of what was summarized)
- Treats all content equally when summarizing
- Original content is permanently lost
- Can't selectively restore specific tool results later

But here's the thing - tool results are mostly re-fetchable. Files can be re-read, greps can be re-run. Why permanently lose them in summarization?

**Analysis of what fills up the context window during long sessions:**

- 68% tool results (file reads, grep outputs, etc)
- 23% tool use inputs
- 6% user messages
- 3% assistant responses

The thing is - most of those tool results are re-fetchable. But once /compact runs, they're gone from context permanently.

(This is when I realized that /compact command happens server-side, I thought it would write the JSONL logs of the compacted conversation, but NO)

Cursor just published their "dynamic context discovery" approach which handles this quite differently - instead of truncating long tool responses, they write them to files and let the agent fetch what it needs.

Got me thinking - what if /compact worked similarly?

- Write original content to local files before compacting
- Replace context with summaries + file references
- Add commands to selectively restore specific messages when needed

I built a quick prototype to test (based on my local JSONL logs):

- 4.6MB session: 277k tokens -> 46k tokens (83% reduction)
- 900KB session: 47k tokens -> 9.6k tokens (79% reduction)

I think it works.

So I filed a feature request on github with the full proposal: https://github.com/anthropics/claude-code/issues/17428

PS: I'm totally aware of the existing "context editing" feature of claude code, but I believe the cursor's approach can be an enhancement of claude code /compact command. If this is achieved, it would give us more control on the context engineering part and also help claude code handle long-running tasks better.

---

## Top Comments

### u/fjdh (Score: 16)
Good thinking. I'm mainly confused why claude code cannot handle this natively given that it has a rollback function built in that includes context.

### u/SatoshiNotMe (Score: 12)
I built the aichat feature in my Claude-code-tools repo with exactly this sort of thought; the aichat rollover option puts you in a fresh session, with the original session path injected, and you use sub agents to recover any arbitrary detail at any time. Now I keep auto-compact turned off and don't compact ever.

https://github.com/pchalasani/claude-code-tools

It's a relatively simple idea, and the tool makes it seamless: first type ">resume" in your session (this copies session id to clipboard), then quit and run `aichat resume <pasted session id>`. There's also an aichat search command for rust/tantivy based fast full text search to search across sessions.

### u/Keep-Darwin-Going (Score: 7)
There is cost involved for picking up information from the older session so they probably do not want it to be automatic but in theory cc can index and search the history locally if they add that feature in.

### u/joeyda3rd (Score: 4)
Ya, without testing it, I like it in theory. There's still some context lost server side around the summary references, but is it low enough to make an impact? And what happens on fetch? The entire message or tool call is fed into context? Kind defeats the purpose, no?

### u/helldit (Score: 4)
"happens server-side (no local backup of what was summarized)" -- Not true. The summarized output tells Claude where the full history jsonl is in your .claude/projects folder and instructs it to go back to it if it needs more info on past conversations.

### u/n3s_online (Score: 3)
I'd like to propose an alternative mental model for using Claude Code:

Every task you do should fit within one context window, preferably within 50% of it to keep output quality high. If your task can't fit, split it up into smaller sub-tasks.

Every task you do should start with a completely empty context window. "/clear" instead of "/compact"

You should 'build' the right context prior to starting your task - launch Explore agents, get the right files in memory, have CC interview you with AskUserQuestionTool to gather requirements. Then execute the implementation.

My reasoning: The output quality is directly tied to what is in your context window. Therefore, if you go work on module X, and are switching to work on module Y, everything in the context window about module X is garbage and will only degrade output quality; its better to start from scratch.

### u/godofpumpkins (Score: 3)
"Search the history locally" I think is going a step farther than what you're proposing. Like, we don't even need to rerun tools if we just preserve a full log of the context locally. There's no reason that history needs to be the same as model context. The full history should remain searchable/indexable via some tool available to the model if the need arises.

### u/muhlfriedl (Score: 2)
You can pass instructions during compact: /compact "Remember my tooling for the widget function". All the project files ARE saved, so you can tell claude to go back and read them at any time...

### u/rbaudi (Score: 2)
In Windows, past session transcripts and the current uncompacted session transcript are stored in C:\Users\[user]\.claude\projects\ as JSONL files. Search them for historical context when needed (e.g., why a design decision was made, when a bug was introduced). Put an instruction to that effect into the Claude instructions.

### u/MythrilFalcon (Score: 2)
Sounds great. Hope they adopt it!
