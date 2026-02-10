# How Claude Code Auto-Memory works (official feature added in 2.1.32)
**Score:** 140 | **Comments:** 31 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qzmofn/how_claude_code_automemory_works_official_feature/
**Author:** u/jeremynsl

## Post Content

It seems a more complex memory system was recently added to Claude Code. Right now there are very few docs about it. A bit of info on this page: https://code.claude.com/docs/en/memory#manage-auto-memory

I asked Claude about it after I saw it writing to memory and got the response below. My takeaways:

- You may want to inspect these project-specific memories. If something odd is saved in there, it could cause unexpected behaviour - and your CLAUDE.md would look normal and fine.
- There is a 200-line limit per project for this auto-memory
- You can turn off auto-memory as well. CLAUDE_CODE_DISABLE_AUTO_MEMORY=1

**CLAUDE.md (Project Root) -- Your instructions to me.**

- Source Control: Checked into Git and shared with your entire team.
- Ownership: You write and own it. I only update it when specifically asked.
- Content: Project architecture, coding conventions, test commands, and "do/don't" rules.
- Analogy: Think of this as the onboarding manual for a new developer.

**MEMORY.md (~/.claude/projects/.../memory/) -- My notes to my future self.**

- Source Control: NOT in Git; local to your machine and persists across conversations.
- Ownership: I write and own it. I update it proactively as I learn your project's quirks.
- Content: Debugging lessons, specific "gotchas," patterns that failed, and internal logic flow.
- Analogy: Think of this as a developer's personal scratchpad or "til" (today I learned) log.

**Quick Comparison:**

| Feature | CLAUDE.md | Auto-memory (MEMORY.md) |
|---------|-----------|------------------------|
| Who writes it | You (or me when asked) | Me, proactively |
| In Git? | Yes | No |
| Purpose | Project truth & instructions | Operational knowledge & "gotchas" |
| Example | "Run tests with pytest tests/" | "Logic check A must happen before B or Test X fails." |

The auto-memory is the newer, sharper pattern. It lets me remember that "one weird trick" needed to make your build pass without cluttering your professional project documentation with my internal "aha!" moments.

---

## Top Comments

### u/Ok-Experience9774 (Score: 38)
This just automated what some people have been doing for awhile. Implement task X, keep notes in JOURNAL.md of problems, conclusions, questions, what the plan is, and tick off tasks as you finish them. You can and should add to your journal on things you fix. If you find something that needs fixing but isn't part of your assignment, note it in your journal and continue with your assignment.

### u/cleverhoods (Score: 15)
Make sure to recheck the memory every now and then, conflicting instructions can populate there. Also, memory can go stale if you have a context collapse (running out of context window mid agent operation).

### u/Obvious_Equivalent_1 (Score: 14)
It's relentless. Honestly Anthropic team out there deprecating community plugins with native implementations faster then you can attempt to smile and say cheese for the photo

### u/jeremynsl (Score: 10)
Yup. I like the way they have implemented this so far. It's simple and everyone can benefit regardless if they are doing advanced prompting. I can see this becoming more advanced in the future. The obvious next step is some kind of auto-memory that lives outside the project folder - learnings between projects.

### u/taylorwilsdon (Score: 5)
Beads is worth a look if you are using multiple dev tools or want parallel orchestration. It's memory and project tracking with a dependency-aware graph instead of markdown docs.

### u/HaagNDaazer (Score: 4)
This is really interesting! I personally store all my plan files as Linear issues, and when Claude figures something out, I ask it to store it in the linear issue as a comment for future Claude to reference. Also the plans in there contain a user decision section from the planning phase. Then when working on the next task the planning phase goes and finds relevant linear issues to find historical context and important factoids.

### u/jeremynsl (Score: 4)
The new Tasks in Claude code were inspired by beads.

### u/Bellman_ (Score: 3)
i've been using automemory too - it's pretty solid for capturing context you'd otherwise lose. the 200 line limit is a bit tight but forces you to be concise i guess

### u/FourthmasWish (Score: 2)
I turned MEMORY.md into a live rules index at the top with Top of Mind (five most salient observations from the session) and Critical Patterns (patterns that are not yet rules) underneath, and it only touches those lower sections when updating it. Working quite well so far even across several repos. Do remember to keep it under 200 lines as I think it truncates past that.

### u/Illustrious-Day-4199 (Score: 2)
I overdid it and added a task view to my project build info, coupled them to sprints and then used them to log burndown progress and create better default prompts for claude when kicking off the tasks. Then I built repo commit hooks to monitor all the stats and add anything not covered by my task list into the backlog.

### u/HaagNDaazer (Score: 2)
The extra piece I use is a local RAG vector index of my project so Claude can trace through the whole project super accurately. It uses an MCP server and starts with a full index, but part of my workflow is after every feature worktree has been merged back into main, the agent team lead then reindexes all the files that were changed in that feature branch so everything is back up to date.

### u/Murkwan (Score: 1)
This is my workflow. I've setup a host of skills to allow claude to use Linear as a project manager + memory bank where all the plans, implementation logs, bugs and updates go. It's been working very well for me.
