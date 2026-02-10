# Creator Workflow: Boris Cherny's Approach

## Purpose

Boris Cherny created Claude Code at Anthropic. His publicly shared workflow and configuration went viral in the developer community because it demonstrates how the tool's creator actually uses it. Understanding his approach provides a validated baseline for configuring your own workflow -- especially around parallel sessions, model selection, and the balance between customization and defaults.

## How It Helps

- Provides a proven workflow from the person who built the tool
- Demonstrates that light customization outperforms heavy configuration
- Shows practical parallel session management at scale (10-15 concurrent sessions)
- Validates the plan-first, execute-second methodology
- Establishes realistic expectations (10-20% session abandonment rate)

## What You Can Do

### Boris's Daily Setup

- **5 local terminal sessions** running Claude Code
- **5-10 remote sessions** on Anthropic's website
- Each local session uses its own **separate git checkout** (not branches or worktrees)
- **10-20% abandonment rate** is normal and expected

### Model Selection

Use Opus 4.5 with thinking mode enabled for all coding tasks. Despite slower token generation speed:
- Delivers superior quality and reliability compared to Sonnet
- Excels at tool use
- Proves faster overall because higher quality means fewer iterations and corrections
- Better communicator and pair-programmer

### Plan-First Workflow

1. Enter Plan mode
2. Iterate back and forth with Claude until the plan is satisfactory
3. Switch to auto-accept edits mode
4. Let Claude execute the plan in one shot

"If my goal is to write a Pull Request, I will use Plan mode, and go back and forth with Claude until I like its plan. From there, I switch into auto-accept edits mode."

Quality plans often result in single-shot successful implementations -- a complete working PR without further back-and-forth.

### Slash Commands for Daily Workflows

Store daily workflow commands in `.claude/commands/`:

- A `/commit-push-pr` command used dozens of times daily
- Commands include inline bash that pre-computes git status and other metadata
- Pre-computed context minimizes model back-and-forth during execution

### PostToolUse Hooks for Formatting

Auto-format code after every write or edit:

```json
"PostToolUse": [
  {
    "matcher": "Write|Edit",
    "hooks": [
      {
        "type": "command",
        "command": "bun run format || true"
      }
    ]
  }
]
```

### Strategic Permission Management

Enable commonly-used safe bash commands via `/permissions`:
- `bun run build:*`
- `bun run test:*`
- `cc:*`

Reserve `--dangerously-skip-permissions` only for long-running tasks in sandboxed environments.

### CLAUDE.md as Team Knowledge Base

Cherny's team maintains a **2.5k-token** CLAUDE.md file containing:
- Mistakes Claude commonly makes (so it learns to avoid them)
- Best practices for the codebase
- Style conventions
- Design guidelines
- PR templates

Use `@claude` tag on colleagues' pull requests to preserve learnings from code review into the CLAUDE.md file, ensuring knowledge accumulates over time.

### Verification Through Feedback Loops

Implement continuous verification:
- Running test suites after changes
- Using the Claude Chrome extension to test UI
- Opening a browser and iterating until UI functions properly
- Running bash commands to validate state

"Give Claude a way to verify its work through feedback loops...can improve quality by a factor of 2-3."

### Remote Sessions with Teleport

- Start remote sessions with `&` from the CLI to run in the background
- Use `--teleport` to move sessions between local and remote

### The Agentic Engineering Methodology (990k LOC, 18 Months)

One developer produced 990k lines of code over 18 months using a disciplined agentic engineering methodology inspired by functional programming concepts. The core insight: agents make it easier to be lazy, not harder. Developers who offload cognition completely to agents often become less productive -- a few undisciplined days create architecture debt that takes an equivalent amount of time to clean up.

**The core loop: Talk, Brainstorm, Plan, Decompose, Review.** Talking activates deliberate thinking and prevents "AI autopilot mode." The developer draws an analogy to Japan's "Point and Call" system used by train drivers -- physically pointing at signals and calling out what they see forces conscious attention. It sounds unnecessary, but it reduces error rates dramatically.

**Decomposition order matters.** The plan should be decomposed in this sequence:
1. **Data model (types first)** -- The most important step. Types are usually tiny (a few lines) but shape everything downstream. Problems here cascade. In typed languages, a function's name, input type, and output type on a single line give the agent everything it needs.
2. **Pure logic** -- Interactions between modules and functions. The architecture layer.
3. **Edge logic** -- Where tech debt creeps in. Scrutinize boundaries carefully.
4. **UI components** -- Separated to reduce complexity for the LLM, keeping UI concerns away from high-level decisions.
5. **Integration** -- E2E testing here ensures original specs work end-to-end.

**Why types are critical for agents:** Agents read text. With typed languages, a pure function is perfectly described by its name, input type, and output type -- all in one line. This comes from domain-driven design concepts in functional architecture: the shape of your inputs and outputs, made explicit in your code's data structures, is of utmost importance for agent comprehension.

**The key distinction:** Agents are excellent at mapping patterns (converting between representations of data, e.g., from English description to code). They struggle at creating genuinely novel ideas from scratch. Your job is the creative reasoning; the agent's job is the faithful implementation.

### Workflow Resilience When Model Quality Fluctuates

When model quality feels inconsistent -- more "confident wrong" answers, edits that drift, missed constraints -- a structured spec-driven workflow can maintain stable output quality regardless of model fluctuations. One developer shared a loop that works reliably across both Sonnet and Opus:

**The resilience loop: Specs, Tickets, Execution, Verification.**

- **Specs as single source of truth.** Treat specs like code: if they are vague, they are wrong. Use a template with non-goals (explicit), user stories, acceptance criteria (checkboxes), edge cases, API/data model changes, observability requirements, and rollout plan/risk. Prompt: "You are my staff engineer. Draft a spec for the feature below using the template. Ask up to 5 clarifying questions first."
- **Tickets as executable slices.** Convert each spec into 5-12 engineering tickets. Each ticket must be independently mergeable, typically 1-3 files, with explicit acceptance checks (commands + expected behavior). No ambiguity, no "do everything" tasks.
- **One ticket at a time.** Paste one ticket per execution step. If Claude drifts, stop and re-anchor: "You're going out of scope. Re-read the ticket. Propose the smallest diff that satisfies the acceptance checks."
- **Verification loop.** The model does not get to decide it is done. Run checks (tests, lint, typecheck), show failures, confirm acceptance criteria line-by-line, and feed only the failures back in. Repeat until checks are green and acceptance criteria is visibly satisfied.

**The ground rules:** A collection of specs (one file per feature) that never gets "hand-wavy," execution that does not rewrite the spec, and verification that checks diffs against the ticket context. If any of these are skipped, the workflow degrades to unstructured coding.

### Community Workflow Patterns from Prolific Users

A highly-upvoted Reddit thread (499 score, 122 comments) revealed how prolific users structure their daily Claude Code usage. The patterns below complement Boris Cherny's approach with real-world community practices.

**Terminal-first workflow:** Many experienced developers have abandoned IDE-based editing entirely. They run Claude Code in a standalone terminal (iTerm2, Zed) and use the IDE only as a terminal host. One 30-year veteran noted: "After 30 years of IDEs, I am finding using the CLI Claude faster to work with."

**Orchestration with scripting:** One senior iOS developer migrated 110 UIKit custom views to SwiftUI in a single day using a Python orchestrator bash loop, with all snapshot tests passing. Wrapping repetitive Claude Code tasks in shell scripts amplifies throughput significantly.

**Multi-LLM review pipeline:** One user described a workflow of "collaborating for a spec, getting other LLMs to review and improve it, then letting Claude implement and using other agents to test." This parallels Boris's multi-model approach but extends it to the full lifecycle.

**Hooks for self-management:** One user set up a hook that injects the current time with every prompt. After 11 PM it suggests wrapping up for the night every time a commit is made. Another planned a hook to detect when he was working on tooling instead of his main project and "give a kick in the ass" if too much time was spent on it. This addresses the addictive "one more turn" pattern many users reported.

**Skills for repetitive patterns:** Multiple users recommended creating Claude Code skills for anything done repeatedly, shifting the effort from in-session prompting to reusable configuration.

### The Workaholic Pattern and Burnout Risk

The community widely reports an addictive quality to Claude Code productivity. Developers with 20-45 years of experience describe feeling "like a kid in a candy store" -- re-energized by the tool. Multiple users compare the experience to Civilization's "one more turn" loop, with developers regularly staying up until 3-5 AM.

**Common signs reported:**
- Gaming addictions replaced by coding sessions
- Working on personal projects from a phone during downtime at work
- Running multiple parallel projects simultaneously because "Post MVP is no longer a thing"
- Clearing entire backlogs (50+ issues) and running out of problems to solve
- Non-programmers building real production systems in weeks

**The overcorrection risk (from u/cosuna_ia):** "AI removes resistance, but resistance used to be the governor that forced prioritization. The new senior skill is not typing or even designing systems -- it is deciding what NOT to build, when to stop, and when 'good enough' actually creates more value than 'perfect.' Treat Claude like a power tool, not an IV drip."

**Health warnings from the community:**
- Multiple users caution about eye strain, sedentary behavior, and disrupted sleep
- Forced boundaries (toddler schedules, hook-based time reminders) are described as features, not bugs
- One user: "Easy to forget sleep, water or food"

### Test Quality Warning

Community feedback consistently flags that Claude-generated tests tend to "fake it until you make it" -- simulating behavior rather than genuinely validating it. One user observed: "Claude doesn't understand tests other than they are a hurdle to jump. Often it just makes the test simpler so it passes." The recommended approach is to pre-write test stubs and provide explicit test patterns before letting Claude implement the test bodies.

## Details

### The Minimal Customization Philosophy

Cherny explicitly states he "does not customize Claude Code, as he finds it works great out-of-the-box." The customizations he uses (CLAUDE.md, slash commands, hooks, permissions) are lightweight and focused on reducing friction rather than fundamentally changing behavior.

### Team Workflow Shift

Claude Code enables teams to "focus on code review and steering" rather than implementation details. PRs arrive in polished condition, shifting the human role toward:
- Architectural decisions
- Code review quality
- Directional guidance

Rather than line-by-line implementation.

### Team Adoption Case Study: Immersive Workshop Format

A large mobile team at a major tech company ran an 8-day immersive AI adoption workshop that produced measurable results and offers a replicable format for teams looking to accelerate adoption. (Internal case study: team AI adoption workshop, January 2026)

**Structure:**
- **Week 1 (4 days):** Hands-on morning sessions led by team members who had already made the agent-first shift. Topics covered agent-first development, prompt engineering, AI-assisted code review, and code modernization.
- **Week 2:** Independent practice on real backlog work with continued mentor support. Reduced delivery pressure allowed skill consolidation without sacrificing real output.

**Measurable output:** 32 prompt PRs merged across multiple repositories from 14 active contributors. Each prompt file represents a repeatable workflow that any team member can reuse -- from unit test generation to code review automation.

**Key success factors:**
- **Post-holiday timing as a psychological reset:** Scheduling the workshop after a holiday break created a natural window for embracing new workflows. Developers returned with fresh energy rather than being asked to change habits mid-sprint.
- **"Wild West" experimentation:** Rather than standardizing on best practices upfront, the team encouraged unconstrained prompt iteration. In a rapidly evolving space, personal discovery and experimentation produced better outcomes than top-down prescription.
- **Real work, not exercises:** Every workshop output was production-oriented -- prompts that solved actual backlog items, not contrived training scenarios.

### The Role Shift: From Coder to Architect

Community feedback confirms that the role shift Boris describes is widely experienced. One 45-year veteran programmer: "CC makes tons of poor choices but he does it so fast and does not argue or complain or try to prove he is right." A developer who worked since the 90s described it as: "now it's like the role I never wanted -- project manager with dev experience to point out 'you should implement this this way.'"

The architecture and product skills were always the strength for senior developers, and now they can lean into them more. The type of developer who enjoyed writing technically interesting code may feel differently about where things are headed, but those who were frustrated by the gap between vision and implementation capacity report a significant boost in satisfaction.

### Opus 4.5 Migration Plugin

Anthropic provides an official Skills plugin for Opus 4.5 migration, addressing known behavioral tendencies:
- Excessive tool invocations
- Over-engineering solutions
- Insufficient code exploration
- Frontend design quality variations
- Over-reaction to "think" keywords

Plugin location: `anthropics/claude-code/tree/main/plugins/claude-opus-4-5-migration`

### Multi-Model Considerations

While Boris uses Opus 4.5 exclusively, other practitioners recommend multi-model approaches:
- **Claude Code** as the main driver for implementation
- **GPT-5.2-Codex** for code review (finds subtle bugs with severity ratings, fewer false positives)
- **Cursor** for reading code and manual edits

## Sources

- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://aicodingdaily.substack.com/p/claude-code-tips-and-wild-2026-predictions
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qsa6oz/with_claude_i_have_become_a_workaholic/
- https://www.reddit.com/r/ClaudeCode/comments/1qthtij/18_months_990k_loc_later_heres_my_agentic/ (agentic engineering guide: 990k LOC methodology)
- https://www.reddit.com/r/ClaudeCode/comments/1qnhgcc/opus_fell_off_heres_the_workflow_that_kept_my/ (spec-driven workflow resilience)
- Internal case study: team AI adoption workshop (January 2026)
