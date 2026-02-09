# I've Open Sourced my Personal Claude Setup (Adderall not included)

**Score:** 454 | **Comments:** 107 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qq2lur/ive_open_sourced_my_personal_claude_setup/

## Post Content

**TLDR:** OP open sourced their personal VibeCoding setup called "Maestro". Link: https://github.com/its-maestro-baby/maestro

For those who didn't see the previous post in r/ClaudeCode, everyone is moving super fast (at least on Twitter), so OP built an internal tool to get the most out of Claude Max. "Every day I don't run out of tokens is a day wasted."

Been dogfooding this on client projects and side projects for a while. Finally decided to ship it properly.

**Quick rundown:**

- **Multi-Session Orchestration** -- Run 1-12 Claude Code (or Gemini/Codex) sessions simultaneously in a grid (very aesthetic). Real-time status indicators per session so you can see at a glance what each agent is doing (hacked together an MCP server for this)
- **Git Worktree Isolation** -- Each session gets its own WorkTree and branch. Agents stop shooting themselves in the foot. Automatic cleanup when sessions close
- **Skills/MCP Marketplace** -- Plugin ecosystem with skills, commands, MCP servers, hooks. Per-session configuration so each agent can have different capabilities. Literally just put in any git repo, and we shall do the rest
- **Visual Git Graph** -- GitKraken-style commit graph with colored rails. See where all your agents are and what they're doing to your codebase
- **Quick Actions** -- Custom action buttons per session ("Run App", "Commit & Push", whatever). One click to send
- **Template Presets** -- Save session layouts. "4 Claude sessions", "3 Claude + 2 Gemini + 1 Plain", etc.

YouTube demo: https://youtu.be/FVPavz78w0Y?si=BVl_-rnxk_9SRdSp

Currently a native macOS app (Swift). Fully open source. Linux + Windows versions planned.

- GitHub: https://github.com/its-maestro-baby/maestro
- Discord: https://discord.gg/z6GY4QuGe6

## Top Comments (Tips/Insights)

### u/gldkhoward (Score: 80)
> My usage costs just 10x'd when I looked at this

### u/Horror_Brother67 (Score: 27)
> A man of his word. I didn't think you'd ever come through. Thank you.

### u/markosolo (Score: 22)
> Tried loading. It says insert Vyvanse 70mg to continue?

### u/PerformanceSevere672 (Score: 13)
> Everyone coming up with and vibe coding the same ideas down to the very name. We are truly living in 2026.

### u/Impressive_Hurry6662 (Score: 12)
> Looks great. Let me know if you create the native windows version. Would love to test it out!

### u/cametolaughnotfeel (Score: 11)
> Has anyone checked whether running this is actually safe? Any cr?

### u/WarlockSyno (Score: 9)
> Same name as https://github.com/pedramamini/Maestro

### u/shaman-warrior (Score: 3)
> In time I noticed I'm much better with maximum 2 tasks at once. I usually work with Opus 4.5 for fast iteration, but GPT5.2 is my go-to goat for when I'm really stuck or need help or need a thorough review I could trust.

### u/Main-Lifeguard-6739 (Score: 4)
> looks great but i don't understand the case. I can already run 1-12 or even more in a grid with the right IDE or window manager. I can use git worktrees anytime I want, I just tell the agent. Sometimes i don't even want to. There are already marketplaces, one is built right into claude code. I don't need a visual git graph as my agent is either on the dev/staging/main branch or a worktree branch. I can already customize hotkeys for quick actions. I don't need template presets as starting a CLI is 0.005% of my time compared to coding.

### u/Calm_Antelope_6571 (Score: 4)
> Cool project! If anyone's looking for a cross-platform alternative, I've been building https://github.com/DonutsDelivery/simple-code-gui - similar multi-terminal tiled layout, but:
> - Windows/Linux/macOS (Electron-based, not locked to Apple)
> - Mobile app - connect your phone via QR code and run sessions remotely
> - Voice input/output - Whisper for STT, XTTS/Piper for TTS (Claude talks back to you)
> - Multiple AI backends - Claude, Aider, Gemini, Opencode, not just Claude Code
> - Theme builder with custom color pickers
> - Per-project settings - backend, voice, colors, categories/organization
>
> The worktree isolation is clever, but in practice AI assistants read-edit-write atomically so conflicts aren't really an issue.

### u/antonlvovych (Score: 3)
> Just leave it here:
> - https://www.conductor.build/
> - https://agents.craft.do/

### u/djdadi (Score: 1)
> craft agents looks pretty cool. maybe I am the odd man out here, but I work in the terminal all day. The last thing I want is a *different terminal*. But something more minimal like an inbox style app piques my interest

### u/Calm_Antelope_6571 (Score: 3)
> ill just use this opportunity to shill my session manager aswell https://github.com/DonutsDelivery/simple-code-gui the best thing about it: RGB gamer theme. it has some advanced features but im focusing on the basics and have custom theme support to make it personalized. its got nothing that will require anyone to change their workflow if they dont want to. git conflicts has never been an issue for me when working with agents since they make instant changes to the documents they load.

### u/1millionbucks (Score: 3)
> How to waste a billion tokens and accomplish nothing

### u/Interesting-Bus948 (Score: 1)
> Quick feedback:
> 1. I can't copy and paste.
> 2. The session boxes are broken when you initiate them. I have to click the commit icon on the right to fix them.
> 3. Codex crashes when the codex config file contains "project_doc_fallback_filenames."
> 4. I wish I could select a new folder from the panels or boxes. I have to work on the same project.
> 5. In dark mode, autocomplete texts are not visible. Selecting themes and fonts would be a great addition.
> 6. I use iTerm instead of the default terminal. I wish there were an option to select which terminal to use.

### u/Yashoyash (Score: 2)
> I don't get how you could possibly be working on different parts of the same project if they were to rely on each other?

### u/StardockEngineer (Score: 1)
> Cool! I wrote pretty much exactly this for myself (never planned to open source it). This has a few extras I like. Maybe I'll add to this with an opencode integration. This doesn't seem to be actually "isolated" outside of the git perspective, though? edit: It's in swift. Oh. That makes contributing and isolating inside docker harder, doesn't it?

### u/mpones (Score: 1)
> Having test driven for fun before I ran out of usage for the week: slid nicely in with MARVIN and GSD, but token use was comical. Also copy paste function no worky worky. That's a no from me, dawg. But really, i do love the visual and preset concept spanning each LLM provider. It picked up my local configs and went to work right away.

### u/pekz0r (Score: 1)
> Nice! But how do you verify the work of each agent? Do they spin up a webserver with a unique URL so you can test before you merge? How does your workflow for setting up the work trees and merging look like?

### u/graph-crawler (Score: 1)
> Does it handle testing isolation end to end? Git worktree doesn't seem to allow port isolation.

### u/SellMyServer (Score: 1)
> Does this support jump box? IE, I don't do anything from my Mac other than SSH into a headless Linux VM that hosts my AI instances such as Claude Code, as well as sync all my git projects. Would I be able to save the IP and SSH info to it and have it default launch instances of the SSH terminal logged in each time, or is this for local work only?

### u/Shackless (Score: 1)
> Man, I type my prompt into the single input field and go do something fun in the meantime. Guess I'm 2025...

### u/Working_Asparagus966 (Score: 1)
> Nice. Thanks for releasing. I'm unaware of SwiftTerm. Have you tried to integrate Ghostty?

### u/peterhddcoding (Score: 1)
> For worktree workflow check the following repo: https://github.com/PeterHdd/Git-Worktree-Visualizer Demo video: https://www.youtube.com/watch?v=MN7pqxWY-Bc

### u/Waypoint101 (Score: 1)
> Just use vibe kanban to do everything this does and supports multiple providers thus you can spread usage. You can also run it on your private network and use your phone to update tasks on the go

### u/Zockeplast (Score: 1)
> What are you guys even building with this setup, and how do you measure the actual quality of the overall output?

## Extracted Tips

### Multi-Session Agent Orchestration
- **Maestro** (https://github.com/its-maestro-baby/maestro) -- macOS native app for running 1-12 Claude Code / Gemini / Codex sessions simultaneously in a tiled grid layout with real-time status indicators per session (via custom MCP server)
- Git worktree isolation per session prevents agents from conflicting with each other; each session gets its own branch with automatic cleanup on close
- Template presets let you save session layouts (e.g. "4 Claude sessions", "3 Claude + 2 Gemini + 1 Plain")
- Quick Actions let you create custom one-click buttons per session ("Run App", "Commit & Push", etc.)

### Alternative Multi-Session Tools
- **simple-code-gui** (https://github.com/DonutsDelivery/simple-code-gui) -- cross-platform (Electron), supports multiple AI backends (Claude, Aider, Gemini, Opencode), voice input/output, mobile app with QR code connection, custom themes
- **Conductor** (https://www.conductor.build/) -- agent orchestration tool
- **Craft Agents** (https://agents.craft.do/) -- more of an inbox-style minimal approach
- **Vibe Kanban** -- kanban-style task management supporting multiple providers, can run on private network with phone access
- **Git Worktree Visualizer** (https://github.com/PeterHdd/Git-Worktree-Visualizer) -- for visualizing worktree workflows

### Workflow Insights
- Multiple users report that git worktree isolation is the key differentiator -- prevents agents from stepping on each other's changes when working on the same codebase
- Counter-opinion: "AI assistants read-edit-write atomically so conflicts aren't really an issue" for single-agent workflows (u/Calm_Antelope_6571)
- Practical limit noted by u/shaman-warrior: "I noticed I'm much better with maximum 2 tasks at once" despite tools supporting 12+ sessions
- Token consumption is a real concern with multi-session setups -- multiple users noted dramatically higher usage
- Skeptic view (u/Main-Lifeguard-6739): Most of what Maestro does can be achieved with a good window manager + IDE + existing Claude Code features; the overhead may not be worth it for everyone
- Copy/paste is broken in Maestro's terminal, which is a deal-breaker for some users
- Port isolation is an unsolved problem -- git worktrees handle file isolation but not port/service isolation for testing

### Model Strategy
- u/shaman-warrior: Uses Opus 4.5 for fast iteration, GPT 5.2 for when stuck or needing thorough review -- suggests mixing models based on task type

### Key Questions Raised (Unanswered)
- How do you verify the work of each agent before merging? (u/pekz0r)
- How do you handle port isolation for testing across worktrees? (u/graph-crawler)
- How do you work on interdependent parts of the same project across agents? (u/Yashoyash)
- How do you measure the actual quality of multi-agent output? (u/Zockeplast)
- Can this work over SSH to a remote headless VM? (u/SellMyServer)
