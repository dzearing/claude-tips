# Subtask: Claude Code Creates Tasks and Spawns Subagents in Git Worktrees

**Source:** [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qhzagf/subtask_claude_code_creates_tasks_and_spawns/)
**Author:** u/zippoxer | **Score:** 263
**Retrieved:** 2026-02-09

---

## Original Post

Subtask gives Claude Code a Skill and CLI to create tasks, spawn subagents, track progress, review and request changes.

- Each task gets a Git worktree, so they can be **done in parallel** safely
- **Claude can interrupt and talk with subagents**!
- TUI shows progress, diffs & conversations
- Tasks are persisted in folders
- Codex subagents supported
- Ralph not needed

### Installation

[Get the CLI and Claude Skill from GitHub](https://github.com/zippoxer/subtask/tree/main?tab=readme-ov-file#tui)

### Usage

Talk with Claude about what you want done, ask it to load the Subtask skill, and it'll guide you from there.

Once tasks are in flight, hop into the TUI to see everything yourself:

```
subtask
```

### Subtask is Built with Subtask

- I use Claude Code to lead the development (I talk, it creates tasks and tracks everything)
- I use Codex for subagents (just preference, Claude Code works too)
- ~60 tasks merged in the past week

---

## Top Comments (sorted by score)

### Score 11 -- u/Secret_Course_9241

> Does it work with vscode Claude code extension? Or do we need to use the regular terminal?

### Score 9 -- u/zippoxer (OP)

> I use Claude Code as the "lead", I talk to it, it creates tasks and spawns subagents, but those subagents can be either Claude Code or Codex.
>
> I prefer Codex subagents because they're more reliable for long or complex tasks, and more likely to do what you asked rather than inventing creative shortcuts.

### Score 9 -- u/ins0mniac007

> Is it like vibe kanban?

### Score 8 -- u/zippoxer (OP)

> Might work, but since Claude Code in VS Code doesn't yet have background terminals (AFAIK), it'll likely be blocked until each subagent completes.
>
> I'll try to think of a way to make it play nice with the extension.

### Score 6 -- u/BerryBrigs

> You use codex as the subagent but this is a Claude skill? Can you explain please?

### Score 4 -- u/clamz

> This looks really awesome. Has anyone tried this out yet?

### Score 3 -- u/Lorenzo9196

> Can we use it in opencode?

### Score 2 -- u/Coded_Kaa

> You can make the extension use the terminal, it'll still connect to your ide

### Score 2 -- u/jangwao

> I'm testing subtask now, burned 10% weekly on Max5 :) I would appreciate

### Score 2 -- u/raycuppin

> Seriously impressive TUI tho. Love when people build with the Charm tools.

### Score 2 -- u/nyldn

> In my install I'm getting some errors unfortunately. After following the instructions running subtask on the command line I get "list refs: exit status 128". Substack in claude is working though, maybe that's the only place I should be looking.

### Score 2 -- u/cowwoc

> I love how it says ralph not needed :)

### Score 2 -- u/Much-Independent4644

> I'm going to try this. I'm using Claude Code Router plus Ollama to run locally on M1 Pro 32GB, so we'll see how slow that is.

### Score 2 -- u/cataklix

> Looks very promising! How does the merged check works?

### Score 2 -- u/zippoxer (OP)

> Either when Claude uses `subtask merge`, or when you merge it should detect automatically :)

### Score 2 -- u/casper_wolf

> I do something similar with jj and workspaces instead of github and worktrees.

### Score 2 -- u/casper_wolf

> Same here. I've had to cut down to 4 terminals recently cuz I'm cutting it too close to my weekly quota.

### Score 2 -- u/AdministrativeJob521

> Combine this with Superpowers....and it would be next level

### Score 2 -- u/UhhYeahMightBeWrong

> I like how the screenshots are of you using subtask, to build subtask. Very meta.
>
> This looks excellent, I will give it a spin. At the moment I am typically running 1-4 Claude Code sessions and those often use subagents via the Superpowers skill. I am curious to see how this compares.

### Score 2 -- u/Wilendar

> This is awesome! can't wait for codex skill and how to setup relation Claude + Codex

### Score 2 -- u/DragonTree

> This look awesome! I was trying to do something similar but your TUI is amazing. I was trying to track using json state files and make a local webui but was hitting issues with syncing states.

### Score 2 -- u/Ok_Action3016

> Dude, this is awesome. Using it right now. great work

### Score 2 -- u/dinhtungdu

> Sick TUI! The SKILL is eye opening! I built my own TUI with Zellij as the backend for switching between multiple worktrees but having Claude manages workspaces itself is far more superior. Will try this and probably delete my TUI haha.

### Score 2 -- u/Careful_Gur_9597

> Use GSD, it already does this and does it much better by using age for research, discussion, planning, execution, testing and bug fixing

### Score 2 -- u/zippoxer (OP)

> Skill tells Claude to run `subtask send` commands in the background (Claude Code supports this).
>
> This is great because Claude gets notified when they're done, and can react right away without your involvement.

### Score 1 -- u/zippoxer (OP)

> Very similar. I was working in separate clones, however I often get lost with ~5 terminal tabs, and I really hate talking with Codex, and so Subtask was born.

### Score 1 -- u/mrw1986

> I've actually created my own custom script that does exactly what this one does, but also includes superpowers. I made it a week or two ago and it's really accelerated my development.

### Score 1 -- u/BlueVajra

> How does it handle questions from the llm? Will it prompt you? Does your main terminal send answers back to the background agent or do you attach to that terminal and answer there?
>
> Really like this and have been building something similar, but can't quite wrap my head around that.

### Score 1 -- u/Tasty-Cup2074

> This is superb but how difficult to review those all task code. When we are working one task itself modal write many lines of code. Just think if running parallel task on different gitsubtree how will manage code review process. In that status "merged" means branch merge or something else?

### Score 1 -- u/opsedar

> I've been using [beads](https://github.com/steveyegge/beads) for tracking tasks and it also uses git worktree, not sure if it can be used together.

### Score 1 -- u/tobalsan

> Really cool! The task overview is sexy.
>
> What do you use for subagents, are you spawning tmux sessions or running headless as background tasks?

### Score 1 -- u/aTeikun

> Aren't most tasks start with "I'm not sure, let's plan and discuss first"? How subtask handles this scenario?

### Score 1 -- u/zippoxer (OP)

> Planning to support :) *(re: opencode support)*

### Score 1 -- u/zippoxer (OP)

> hey, i just released an update, hopefully it fixes it, you can try with `subtask update`
>
> also make sure to run Claude Code or Subtask commands inside a Git repository
>
> i'm simplifying how Subtask works right now, you won't need to "init" anymore, it will work in any Git repo, even from subdirectories

### Score 1 -- u/stark007

> I was wondering about this exact thing! Very excited to try out the combination of the two. *(re: combining with Superpowers)*

---

## Extracted Tips: Subtask, Subagents, and Git Worktrees

### Architecture and Core Concepts

1. **Git worktrees for parallel isolation.** Each task gets its own Git worktree, allowing multiple Claude Code / Codex agents to work on different tasks simultaneously without file conflicts.

2. **Lead agent + subagent pattern.** Use Claude Code as the "lead" orchestrator that creates tasks, spawns subagents, and tracks progress. The subagents do the actual implementation work.

3. **Background command execution.** The Subtask skill tells Claude to run `subtask send` commands in the background (Claude Code supports background terminal commands). Claude gets notified when subagents complete and can react without human involvement.

4. **Task persistence.** Tasks are persisted in folders, meaning you can resume, review, and track them across sessions.

### Subagent Configuration

5. **Codex vs Claude Code subagents.** The author prefers Codex subagents because "they're more reliable for long or complex tasks, and more likely to do what you asked rather than inventing creative shortcuts." Claude Code works as subagents too.

6. **VS Code limitation.** Claude Code in VS Code does not yet have background terminals, so subagents will likely block sequentially rather than running in parallel. The terminal CLI is the recommended approach for parallel execution.

7. **Workaround for VS Code.** You can configure the VS Code extension to use the terminal directly and it will still connect to your IDE.

### Workflow Patterns

8. **Conversational task creation.** Talk with Claude about what you want done, load the Subtask skill, and Claude guides you through task creation and delegation.

9. **Claude-to-subagent communication.** Claude can interrupt and talk with subagents -- this is a key differentiator from just running separate terminal sessions.

10. **Automatic merge detection.** Subtask detects merges either when Claude uses `subtask merge` or when you merge manually.

11. **No init required (recent update).** Subtask now works in any Git repo, even from subdirectories, without needing to run an init command first.

### Scaling and Resource Considerations

12. **Token burn rate.** One user reported burning 10% of their weekly Max5 quota testing subtask. Running multiple parallel agents consumes quota fast -- another user cut down to 4 terminals to stay within weekly limits.

13. **Throughput.** The author reports ~60 tasks merged in a single week using this workflow, building Subtask itself with Subtask.

### Related Tools and Alternatives

14. **Superpowers skill.** Multiple users suggest combining Subtask with the Superpowers skill for enhanced capabilities. One user reports already having a custom script combining both.

15. **GSD (Get Stuff Done).** Mentioned as an alternative that handles research, discussion, planning, execution, testing, and bug fixing in stages.

16. **Beads.** Another task tracking tool ([github.com/steveyegge/beads](https://github.com/steveyegge/beads)) that also uses git worktrees.

17. **jj + workspaces.** An alternative approach using jj (Jujutsu VCS) with workspaces instead of git worktrees.

18. **Zellij-based TUI.** One user built their own TUI with Zellij as the backend for switching between multiple worktrees, but noted that having Claude manage workspaces itself is superior.

### Open Questions from the Community

- How does code review work when running many parallel tasks producing lots of code changes?
- How does Subtask handle the common scenario where a task begins with "I'm not sure, let's plan and discuss first"?
- How are questions from the LLM subagent handled -- does the main terminal send answers back, or do you attach to that terminal?
