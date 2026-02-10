# Claude Code's Most Underrated Feature: Hooks - wrote a complete guide
**Score:** 170 | **Comments:** 25 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qlzzzf/claude_codes_most_underrated_feature_hooks_wrote/
**Author:** u/karanb192

## Post Content

Hooks are the most underrated feature in Claude Code. Most engineers skip right past them, but they completely changed my workflow.

Wrote a deep dive covering everything I wish I knew when I started.

What hooks let you do:

- Run your own code at any point in Claude Code's workflow
- 13 different events to hook into (PreToolUse, PostToolUse, Notification, Stop, etc.)
- Block, allow, or modify actions before they happen
- Add context, send notifications, enforce workflows

What I cover in the post:

- All 13 hook events explained with examples
- The data flow (JSON stdin -> your logic -> JSON stdout)
- Exit codes and what they mean
- Python vs Node.js for hooks (spoiler: Node for high-frequency events)
- Ready-to-use safety hooks

The hooks I use daily:

- Block dangerous commands (rm -rf ~/, force push main, fork bombs)
- Protect secrets (.env, SSH keys, AWS creds)
- Slack notifications when Claude needs input

Blog post: https://karanbansal.in/blog/claude-code-hooks

GitHub repo: https://github.com/karanb192/claude-code-hooks

This is part 1 - more coming on prompt-based hooks, context injection, and session memory.

What hooks are you all building?

---

## Top Comments

### u/Own_Amoeba_5710 (Score: 31)
The thing I often to struggle with is when and where. Hooks, subagents, skills, plugins, when should I use each one? Maybe I should write about that in my next blog entry. I use plugins often but when should I be using a subagent instead?

### u/clbphanmem (Score: 18)
My understanding is simple:

Hook: When you need it before, after, or while Claude is doing something, it runs a script externally. It has nothing to do with AI, like planning a trip where you need to refuel at point A and find a supermarket to eat at point B.

Subagents: Imagine you have multiple Claude Code instances. Each one does a different task, and each instance has a different context. It only focuses on its task, meaning it's not affected by the context of other instances, so it only executes the instruction passed to it, which in this case is the Main Agent. Practical use cases: searching for relevant files to synthesize the problem, or an agent reading files like PROGRESS.md or ROADMAP.md to track your progress and return the information to the Main Agent. This way, the Main Agent doesn't waste many steps, as each tool call consumes unnecessary tokens.

Skills: It's not like a Subagent, nor is it like a markdown document that you reference. It simply branches the context (if you allow it in the frontmatter), inserts the skill content, uses it at the right time, returns the result, and the AI forgets that skill content, preventing token inflation. Or, if it doesn't branch, Skills are still different because they support running scripts. Like an upgrade to Hooks, but triggered by AI.

Plugins & Marketplace: This is just a place to gather all of the above during installation.

### u/editor_of_the_beast (Score: 15)
This stuff is all new. Everyone is just experimenting, no one knows the best workflow.

### u/GoldenBalls169 (Score: 13)
Yes [in response to "how many Slack notifications do you have at the end of the day?"]

### u/straightouttaireland (Score: 7)
This is what I've happily come to terms with lately. I used to think I was behind because everyone else in my workplace is sharing all these cool new tools and their workflows, when in reality everyone is still in experimentation mode.

### u/spiritualManager5 (Score: 5)
How many slack Notifications do you have at the end of the day?

### u/karanb192 (Score: 3)
That's fair feedback - appreciate it. You're right that "run your own code" undersells it. Better framing: Hooks are event-driven triggers that let you intercept and control Claude's workflow at specific points.

### u/darrenphillipjones (Score: 3)
AI right now is like filling a pot of water with meat. Instead of tenderizing it slowly for 2 hours, the heat is cranked up, the meat is boiled to temp asap and served like a big bowl of rubber soup. I honestly hate it all and think it's all bullshit. Not the things existing, but this doom circle we're in where nothing new is happening, so we get another artifact to use, but that's a slightly tweaked version of other artifacts.

### u/snow_schwartz (Score: 2)
Nice post and repo covering the basics! I'm also interested in using hooks for complex programs built directly into Claude via the plugin system. I agree that this system is ripe for more inventiveness within the community. https://github.com/kylesnowschwartz/claude-bumper-lanes is my most complex to date - it's a configurable circuit breaker that blocks Claude from making unbounded changes.

### u/karanb192 (Score: 2)
This is the exact confusion I had too. Here's my mental model:
- Hooks: Event-driven automation (before/after actions, notifications)
- Skills: Reusable prompts/workflows you invoke manually
- Subagents: Parallel workers for isolated tasks
- Plugins: Persistent extensions with their own tools

### u/Infamous_Research_43 (Score: 2)
I feel like the explanation here isn't doing it justice. It's not just "Claude running your code", that would literally be all Claude does all the time already. Hooks are essentially skills that execute code, to make it clearer. I know, skills and hooks are two different things, but that's the best way I can describe it.

### u/CharlesWiltgen (Score: 2)
You can ask Claude Code, the world's foremost expert on Claude Code, how to do things in Claude Code. If you're not even sure what to ask or how to ask it, the Superpowers brainstorming skill is great for this. To make sure that Claude Code is fortified with the very latest guidance, I like to ask Claude Code to web search for recent authoritative guidance as part of its research.
