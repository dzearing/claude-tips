# How I Use Claude Code to Maximize Productivity

**Source:** https://medium.com/@shivang.tripathii/how-i-use-claude-code-to-maximize-productivity-c853104804d6
**Author:** Shivang Tripathi
**Published:** Jul 4, 2025
**Read time:** 4 min

---

## 1. Maintain and Evolve Your claude.md -- Like a Living Spec for Your AI

Treat Claude like an engineer who is being onboarded. Every good dev needs documentation.

Keep two `claude.md` files:

- **User-level claude.md:** Contains personal coding guidelines, conventions, and task preferences. Example: Since the author uses Kotlin, they tell Claude to always run formatting and compile checks before submitting code.
- **Project-level claude.md:** This file sits inside the repo and contains project-specific structure and logic.

This is not a set-it-and-forget-it deal. **Actively update** these files when Claude makes repeated mistakes. Real examples:

- Claude used to use the default timeout for large downloads and long-running commands, which often led to failures. The author added a guideline in the user-level `claude.md` to always use a higher timeout for such operations.
- Another persistent issue was that Claude would uncomment test blocks by itself -- a dangerous habit that could cause unnoticed test failures or false positives. The author explicitly wrote in `claude.md` that it must never uncomment tests unless instructed to do so.
- Claude kept creating redundant DAO functions instead of reusing existing ones because they had some extra data. The author added guidelines with good and bad examples to teach it what was expected.

It is like iteratively training your own AI assistant -- not just correcting it, but also upgrading its instruction manual with every stumble.

**Key insight:** claude.md is a living document. Every time Claude makes a repeated mistake, add a rule to prevent it.

`Tags:` `claude.md`, `configuration`, `onboarding`, `documentation`, `iterative-improvement`

---

## 2. Automate Your End-to-End Workflow with Claude + MCP

The author's setup:

- **Task tracking:** Notion
- **Code hosting:** GitHub
- **IDE:** JetBrains (Kotlin)
- **Tools:** Notion MCP, GitHub MCP, JetBrains MCP, Puppeteer MCP

Full dev workflow -- from fetching tasks to raising pull requests -- happens inside the Claude terminal:

1. Fetch tasks from Notion with Notion MCP
2. Ask Claude to create a new branch for the task
3. Guide it through implementation using guidelines
4. Review + test the code yourself
5. Let Claude push and raise a PR using a PR template

No browser tabs. No manual switching between Notion, GitHub, or JetBrains. Just fast, focused execution.

**Key insight:** MCP integrations allow you to collapse your entire dev workflow (task management, branching, implementation, PR creation) into a single terminal session.

`Tags:` `MCP`, `workflow-automation`, `Notion`, `GitHub`, `JetBrains`, `Puppeteer`, `end-to-end`

---

## 3. Use Claude Commands Extensively -- Automate the Repetitive Stuff

Claude Commands are power-ups. They compress long prompts into simple triggers, saving time on repetitive workflows and setup steps.

Use both built-in and **custom commands**. Daily-use examples:

- **`/pr`**: Creates a pull request using a step-by-step flow -- reviews commits, summarizes changes, uses the team's PR template.
- **`/lint`**: Runs local linters and fixes issues iteratively until the code is clean.
- **`/planned`**: Shows planned Notion tasks via Notion MCP.
- **`/checkout`**: Checks out a new GitHub branch based on a Notion task.

Custom commands should include clear, step-by-step instructions. Treat it like writing an SOP (Standard Operating Procedure) for your AI assistant.

### Recommended resources for command inspiration:

- **[awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code)** -- A growing GitHub collection of slash-commands and workflows for GitHub, linting, CI/CD, and more.
- **[Anthropic's official command docs](https://docs.anthropic.com/en/docs/claude-code/slash-commands)** -- Learn about built-in commands and how to define your own inside `.claude/commands/`.
- **[Reddit: Share Your Claude Code Commands](https://www.reddit.com/r/ClaudeAI/comments/1l3gouj/share_your_claude_code_commands/)** -- A thread where users share clever command setups like `commit-and-push.md` and `prime.md`.

**Custom commands location:** `.claude/commands/`

**Key insight:** Every repetitive multi-step workflow should be a slash command. Write them like SOPs with clear step-by-step instructions.

`Tags:` `commands`, `slash-commands`, `automation`, `custom-commands`, `SOP`, `.claude/commands/`

---

## 4. Plan Before You Code -- Good Inputs = Great Outputs

Claude works best when it has full-picture context. It is an agentic tool -- meaning it thrives when given a clearly defined goal.

**Always start with a detailed plan:**

1. Ask Claude to generate an implementation plan
2. Review it line by line
3. Correct assumptions or point out anything that does not align with the system

When you skip this step, mistakes snowball fast. You end up fixing code that is based on bad assumptions, and it turns into a rabbit hole of broken logic. Good planning avoids all of that.

**Key insight:** Never jump straight into code generation. Always have Claude produce a plan first, review it carefully, then proceed with implementation. This prevents cascading errors from bad assumptions.

`Tags:` `planning`, `implementation-plan`, `review`, `context`, `agentic-workflow`

---

## 5. Run Multiple Tasks in Parallel -- Turn Claude Into a Team

This is where things really scale.

Example: Three tasks across two repos:

1. Open the first repo, plan task #1, assign Claude to implement
2. Open the second repo (or a second clone of the same repo), plan task #2, assign Claude again
3. If both tasks are in the same repo, use **two separate clones** (instead of git worktrees) for isolation -- it is simpler to manage, avoids the cognitive overhead of worktree configs, and lets you freely switch between branches.

Claude can execute in parallel -- like a team of devs working independently. You can monitor and jump in only when testing or reviewing.

**Key insight:** Use multiple terminal sessions with separate repo clones to run Claude instances in parallel. Prefer separate clones over git worktrees for simpler isolation.

`Tags:` `parallelism`, `scaling`, `multiple-instances`, `repo-clones`, `productivity`

---

## General Philosophy and Mindset

Claude Code is powerful, but only if you treat it like a junior dev you are actively mentoring. The tools -- `claude.md`, MCPs, Commands -- are effective when you set them up right.

With thoughtful planning and a bit of structure, you can turn Claude from a tool into a **team**.

**Getting started advice:** Try writing your first `claude.md` or creating a custom command for a task you do often. That is the first step to building your AI-powered workflow.

`Tags:` `philosophy`, `mentoring`, `onboarding`, `getting-started`

---

## Summary of All Actionable Items

| # | Tip | Action |
|---|-----|--------|
| 1 | Maintain claude.md | Create user-level and project-level claude.md files; update them when Claude repeats mistakes |
| 2 | Use MCP integrations | Set up Notion MCP, GitHub MCP, JetBrains MCP, Puppeteer MCP for end-to-end workflow |
| 3 | Create custom commands | Build slash commands in `.claude/commands/` for repetitive workflows like PR creation, linting, task checkout |
| 4 | Plan before coding | Always generate and review an implementation plan before starting code changes |
| 5 | Run parallel instances | Use multiple terminal sessions with separate repo clones to run Claude on multiple tasks simultaneously |

## Article Tags

Developer Productivity, Claude AI, Agentic AI, Software Development, Artificial Intelligence
