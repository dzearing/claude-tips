# Prompt Engineering

## Purpose

How you communicate with Claude Code determines the quality of what you get back. The difference between a vague prompt and a well-structured one can mean the difference between a working feature and a cascade of broken logic. Effective prompting is not about magic words -- it is about providing the right context, constraints, and success criteria.

## How It Helps

- Prevents cascading errors from bad assumptions by front-loading planning
- Reduces token waste by scoping context to only what is relevant
- Produces more focused, actionable output with specific constraints
- Enables single-shot successful implementations when plans are well-crafted
- Aligns Claude's approach with your codebase's existing patterns

## What You Can Do

### Start with "What" and "Why", Not "How"

Structure prompts around your actual problem and goals rather than implementation details.

**Less effective:** "Create a file called auth.ts in src/lib with a function called verifyToken that takes a JWT string and returns the decoded payload using jose library"

**More effective:** "I need JWT verification for my API routes. Users authenticate via Supabase, but I need to verify tokens in edge functions where the Supabase client isn't available."

The second approach gives Claude room to evaluate existing patterns and make informed architectural decisions.

### Use Plan Mode Before Execution

Press `Shift+Tab` to enter Plan Mode. Iterate with Claude until the plan is satisfactory before writing any code.

**Workflow:**
1. Enter Plan mode with `Shift+Tab`
2. Iterate back and forth with Claude until the plan is right
3. Switch to auto-accept mode
4. Let Claude execute the plan

Plans are saved to `~/.claude/plans/` (since v2.0.34+). Combine with `Ctrl+G` to edit plans in an external editor.

"A good plan is critical. Quality plans often result in single-shot successful implementations, meaning Claude can produce a complete working PR without further back-and-forth." -- Boris Cherny

A game developer who shipped a full product over 6 months describes the same discipline: "I never let Claude just start coding. Instead, every feature started with: 'Here's what I want to do. Here's my approach. Do you agree? Any problems you see?' Only after we agreed on the plan did I say 'okay, implement it.' This caught so many issues before they became bugs buried in 50 files."

### Ask for Plans on Multi-File Changes

For tasks touching more than 3 files, request a plan first:

```
Plan how you'd implement user notifications. Don't write code yet -- just outline the approach.
```

Review the plan before saying "looks good, execute it." This catches problems before 15 files change.

### Break Large Tasks into Phases

Do not request entire features in one prompt:

1. **Plan phase:** "I need to add billing with Stripe. What's your plan?"
2. Review the plan and adjust
3. **Execute phase 1:** "Let's start with the webhook handler"
4. Verify (run tests, check code)
5. **Execute phase 2:** "Now add the pricing page"

"Each phase gets full attention. Claude won't rush step 5 because it's trying to remember step 1."

### Reference Existing Patterns

Point to existing implementations rather than describing patterns verbally:

```
Add a new API route for /api/projects. Follow the same pattern as /api/teams -- same error handling, same auth middleware, same response format.
```

Claude reads the referenced file and replicates the pattern. "Far more reliable than describing it in words."

### Use Surgical Prompting

Scope context dramatically to reduce token consumption and produce focused output:

**Less effective:** "Fix the bug in the auth module"

**More effective:** "Analyze only auth.py lines 120-180. Identify the logic error. Propose a patch <= 10 lines + 2 unit tests."

### Batch Plan + Execution

The bill climbs with 15 micro-iterations. Each round trip costs tokens for re-establishing context. Combine analysis and implementation into a single exchange when possible, rather than going back and forth iteratively.

### Provide Structured Debugging Context

When delegating debugging, provide complete context:

1. **Complete error with stack trace** (the full trace, not a summary)
2. **Relevant code** (the exact section producing the error)
3. **Context:** What worked previously, recent changes, reproduction conditions
4. **Environment details:** Node.js version, React version, browser, dev/production mode

**Before/After comparisons:** "Component broke after commit abc123. Here's the diff: [paste]"

### Spec-Based Development

Start with a minimal spec. Have Claude interview you to clarify requirements. Then execute in a new session with the complete spec. This separates requirements-gathering from implementation.

### Multi-Agent Planning as a Prompting Strategy

Instead of relying on a single plan from one agent, prompt Claude to spawn multiple planning agents before any code is written. The prompt is straightforward: enable plan mode, then tell Claude to "spin up several agents to best solve our problem." Each agent independently explores the problem and develops its own plan; they then collaborate and converge on a final consolidated plan.

This works as a prompting strategy because a single planning agent inevitably misses critical details when scope is large. Multiple agents generate variance that covers more corners. One user reported that plans from multi-agent planning were consistently more thorough than single-agent plans. Pair this with the "clear context and run plan" feature to execute the consolidated plan with a fresh context window.

### Prompting for Test-Driven Workflows

When using Claude for TDD, the prompting philosophy matters more than the mechanics. Codify your testing opinions into dedicated skills or CLAUDE.md rules rather than relying on ad-hoc prompts. Without strong opinions baked in, Claude defaults to writing unit tests that validate implementation details or mock behavior rather than actual system behavior.

Effective TDD prompting patterns:
- **Separate planning from execution explicitly:** Create a planning skill that hands off to an execution skill. The planning phase should be iterative and thorough; the execution phase should be mechanical.
- **Codify the testing trophy:** If you follow integration-heavy testing, state this explicitly: "Write integration tests that verify system behavior. Avoid unit tests that test implementation details. Tests should survive a refactor without themselves needing to be refactored."
- **Build review into the plan prompt:** Include a review phase in your execution plan prompts: "After implementation, spin up a review agent to check the work and provide feedback before finalizing."
- **Structure around issue trackers:** Prompt with the full workflow: "Get the issue, review it for detail, plan, audit the plan, write tests, execute, check tests, review items of concern." Each step can be a separate prompt or skill invocation.

## Details

### Anthropic's Official Claude 4 Prompting Best Practices

Anthropic published specific guidance for prompting Claude Opus 4.6, Sonnet 4.5, and Haiku 4.5, which have been trained for more precise instruction following than previous generations.

**Be explicit about desired behavior.** These models follow instructions literally. If you want "above and beyond" behavior, say so:

```
Create an analytics dashboard. Include as many relevant features and interactions
as possible. Go beyond the basics to create a fully-featured implementation.
```

Vague prompts like "Create an analytics dashboard" will produce minimal output because the model respects the scope you gave it.

**Provide the "why" behind rules.** Rather than bare directives, explain the motivation. Claude generalizes from explanations:

- Less effective: `NEVER use ellipses`
- More effective: `Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.`

**Use action-oriented language.** Claude 4 models interpret "suggest" literally. If you say "Can you suggest some changes?", Claude may only suggest without implementing. Say "Make these changes" or "Change this function to improve performance" when you want action.

To make Claude default to action, add to your system prompt:

```xml
<default_to_action>
By default, implement changes rather than only suggesting them. If the user's
intent is unclear, infer the most useful likely action and proceed, using tools
to discover any missing details instead of guessing.
</default_to_action>
```

**Dial back aggressive prompting from older models.** Opus 4.5 and 4.6 are more responsive to system prompts than previous models. Where you used to need `CRITICAL: You MUST use this tool when...`, you can now use `Use this tool when...`. Over-prompting causes overtriggering.

**Control overengineering.** These models tend to create extra files, add unnecessary abstractions, or build in flexibility that was not requested. Add explicit guidance:

```
Avoid over-engineering. Only make changes that are directly requested or clearly
necessary. Don't add features, refactor code, or make "improvements" beyond
what was asked. Don't add error handling for scenarios that can't happen.
```

**Manage subagent spawning.** Opus 4.6 has a strong predilection for subagents and may spawn them when a direct approach would suffice. Add guidance if this becomes excessive:

```
Use subagents when tasks can run in parallel, require isolated context, or
involve independent workstreams. For simple tasks, single-file edits, or tasks
where you need to maintain context across steps, work directly.
```

**Minimize hallucinations.** Instruct Claude to investigate before answering:

```xml
<investigate_before_answering>
Never speculate about code you have not opened. If the user references a
specific file, you MUST read the file before answering. Give grounded and
hallucination-free answers.
</investigate_before_answering>
```

**Multi-context window workflows.** For tasks spanning multiple context windows, Anthropic recommends:
1. Use the first context window to set up a framework (write tests, create setup scripts)
2. Have the model write tests in a structured format (e.g., `tests.json`) before starting work
3. Create setup scripts (e.g., `init.sh`) so fresh context windows can resume gracefully
4. Prefer starting with a brand new context window over compaction -- Claude's latest models are effective at discovering state from the filesystem
5. Provide verification tools (Playwright MCP, Chrome DevTools) for autonomous validation

### Choosing the Right Level of Abstraction

Development with Claude exists on a spectrum from "vibe coding" (high-level delegation) to deep, line-by-line inspection. This is not binary -- it varies by project criticality:

- **Prototype or personal project:** High-level prompts, auto-accept mode, minimal review
- **Production code:** Detailed plans, phased execution, thorough review
- **Critical system:** Step-by-step verification, TDD, manual review of every change

### Extended Thinking and Adaptive Thinking

Use `/ultrathink` for hard tasks, rigorous explanations, and self-review of changes. Press `Tab` to toggle extended thinking on/off.

**Note:** Only the `ultrathink` keyword triggers extended thinking as of v2.0.0+. Previous keywords (`think`, `think hard`, `think deeply`) were disabled.

For always-on extended thinking, add to `settings.json`:
```json
{
  "thinking": true
}
```

**Adaptive thinking (Claude Opus 4.6):** The latest model uses adaptive thinking by default, where Claude dynamically decides when and how much to think based on the `effort` parameter and query complexity. In Anthropic's internal evaluations, adaptive thinking reliably drives better performance than always-on extended thinking. If Claude is overthinking, you can add guidance:

```
When you're deciding how to approach a problem, choose an approach and commit to it. Avoid revisiting decisions unless you encounter new information that directly contradicts your reasoning.
```

When extended thinking is disabled, Claude Opus 4.5 is particularly sensitive to the word "think" -- replace it with "consider," "evaluate," or "believe" to avoid unintended behavior.

### Use @-Tags for File Context

Reference specific files directly in your prompts:

```
@filename.ts Can you review this file for potential issues?
```

**Shift + drag** a file into the Claude Code interface to reference it (standard drag opens it in a new tab).

### CLAUDE.md Instruction Priorities

Community testing and Anthropic's guidance suggest a hierarchy for how instructions in CLAUDE.md files are processed:

- Instructions at the very top of the file get highest priority
- Specific, actionable, and repeated instructions work better than general principles
- Negative instructions ("DO NOT do X") work better than soft preferences ("prefer Y")
- Instructions buried in the middle of long documents get deprioritized
- Making rules imperative ("Use MCP first" not "It's best to use MCP") improves compliance
- Repeating critical rules in multiple places reinforces adherence

Keep CLAUDE.md tight and focused. Remove stale instructions regularly. Use Skills for on-demand context loading rather than packing everything into CLAUDE.md, which consumes tokens on every session start.

### Codify Failures, Not Just Patterns

Every time an agent makes a mistake that wastes time, add a specific rule to prevent it. Negative rules are often more valuable than positive ones because they prevent the exact class of mistake LLMs tend to repeat. Example: "NEVER use threshold-based black removal -- destroys internal outlines." These rules accumulate into a valuable library of guardrails over time.

### Be Cold and Transactional

Limit chatty, free-flowing "pair programming" sessions. Everything in that mode is unpredictable -- your inputs, the context state, task progress, and model behavior all compound. Use the same set of prompts to guide a consistent flow for each task, varying only the inputs. A recommended structure: research, plan, implement, review. Subagents for each step. Persist progress externally at each step.

When things go wrong, reflect on what you could have changed. Code is cheap -- throw it away, tweak your prompts, and start again rather than arguing with a confused session.

### Meta-Prompting: Let Agents Refine Their Own Prompts

Rather than manually iterating on prompt wording, have the agent refine its own prompts based on feedback from prior runs. Give the agent your initial prompt and the output it produced, then ask it to improve the prompt to address gaps or errors. This creates a feedback loop where prompt quality improves with each cycle without requiring you to manually diagnose every failure mode. A large mobile team at a major tech company found meta-prompting to be one of the key technical patterns that emerged from an intensive AI adoption workshop. (Internal case study: team AI adoption workshop, January 2026)

### Context Over Model Selection

Rich, relevant context matters more than which AI model you use. Teams that invest time curating the context provided to agents -- specific file references, clear constraints, relevant examples, and well-structured background -- consistently get better results than teams that chase model upgrades while providing thin prompts. This principle was validated by a team that achieved significant productivity gains by focusing on context engineering rather than model selection during an adoption initiative. (Internal case study: team AI adoption workshop, January 2026)

### Prompt Sharing Over Code Hoarding

Store prompt files in version control as reusable team assets. When a developer crafts a prompt that reliably produces good results for a specific task (test generation, code review, migration), that prompt has value comparable to a shared library. One team produced 32 prompt PRs from 14 contributors during a two-week adoption sprint, building a shared prompt library that any team member could invoke. This shifts the team culture from hoarding individual knowledge to accumulating collective prompting expertise in the repository. (Internal case study: team AI adoption workshop, January 2026)

### Continuously Refine Your Approach

- Document which prompt structures produce better results
- Iterate on questioning techniques over time
- Revisit and adapt strategies based on accumulated experience
- Track patterns of success and failure across sessions

### Domain Expertise is Your Moat

"The more you know, the better you can prompt -- converting unknown unknowns to known unknowns." AI-generated code requires domain expert review, especially in specialized fields. Surface-level correctness does not equal actual correctness. Your expertise determines the quality of guidance you can give the model.

### Improving Prompting Through Better Communication

Improving articulation via writing helps with prompting. Better communication translates directly to better prompts. Consider speech-to-text tools for faster input to reduce the friction of crafting detailed prompts.

### Context Window Discipline

Do not exceed 40-50% of your context window and expect good results. Everything in the context is sent to the LLM with every message. What was signal 5 prompts ago becomes noise. When context rot sets in, Claude "forgets" things even with capacity remaining.

When you hit ~40% context usage, `/clear` and reload from externalized state (an .md file, issue tracker, or task list). If you have been updating your state file as you go, it will be dense with signal and you will be in a strong position to continue. Use `CLAUDE_CODE_TASK_LIST_ID=my-project-name claude` to persist tasks across `/clear` operations.

### Prompt in Your Native Language

Claude handles non-English prompts well. Code stays in English (variable names, comments), but explanations come in your language. You may need to remind Claude every 2-3 prompts to respond in your preferred language, but once you accept that as part of the workflow, it can feel more natural than forcing yourself to think in English.

### Formatting and Output Control (Claude 4 Models)

Several techniques are effective for steering output format with Claude 4 models:

- **Tell Claude what to do instead of what not to do.** Instead of "Do not use markdown," try "Your response should be composed of smoothly flowing prose paragraphs."
- **Use XML format indicators.** Wrap desired format instructions in descriptive XML tags.
- **Match your prompt style to the desired output.** Removing markdown from your prompt reduces markdown in the output.
- **LaTeX default:** Opus 4.6 defaults to LaTeX for math expressions. If you prefer plain text, explicitly instruct it to use standard text characters.

## Sources

- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://medium.com/@comeback01/how-to-code-4x-faster-with-claude-in-2026-without-blowing-your-anthropic-budget-42f764bb877d
- https://www.builder.io/blog/claude-code
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://aicodingdaily.substack.com/p/claude-code-tips-and-wild-2026-predictions
- https://www.oreateai.com/blog/claudemd-best-practices-reddit/3a29cdd605ebb2025681e71218021b5e
- https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices (Anthropic official: Claude 4 prompting best practices)
- https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/ (Opus tips: context discipline, CLAUDE.md priorities, transactional workflow)
- https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/ive_used_ai_to_write_100_of_my_code_for_1_year_as/ (13 lessons: 1-shot test, codifying failures, agent simplicity)
- https://www.reddit.com/r/ClaudeCode/comments/1qknr1v/what_i_learned_building_a_full_game_with_claude/ (Game dev: plan-before-code, native language prompting, context management)
- Internal case study: team AI adoption workshop (January 2026)
- https://www.reddit.com/r/ClaudeCode/comments/1qd64xx/tdd_workflows_with_claude_code_whats_actually/ (TDD prompting patterns from staff engineer)
- https://www.reddit.com/r/ClaudeCode/comments/1qhkfis/just_discovered_a_new_claude_code_superpower/ (Multi-agent planning as prompting strategy)
