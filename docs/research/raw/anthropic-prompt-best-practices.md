# Claude 4 Prompting Best Practices

> Source: https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices
> (Redirects to: https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-4-best-practices)
>
> Extracted: 2026-02-09
>
> Applies to: Claude Opus 4.6, Claude Sonnet 4.5, Claude Haiku 4.5

These models have been trained for more precise instruction following than previous generations of Claude models.

---

## Be Explicit With Your Instructions

Claude responds well to clear, explicit instructions. Being specific about your desired output can help enhance results. If you want "above and beyond" behavior, explicitly request it rather than relying on the model to infer this from vague prompts.

**Less effective:**

```text
Create an analytics dashboard
```

**More effective:**

```text
Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation.
```

**Category:** General Principles, Instruction Design

---

## Add Context to Improve Performance

Providing context or motivation behind your instructions, such as explaining to Claude why such behavior is important, can help Claude better understand your goals and deliver more targeted responses.

**Less effective:**

```text
NEVER use ellipses
```

**More effective:**

```text
Your response will be read aloud by a text-to-speech engine, so never use ellipses since the text-to-speech engine will not know how to pronounce them.
```

Claude is smart enough to generalize from the explanation. Giving the "why" behind a rule allows Claude to apply the underlying principle more broadly.

**Category:** General Principles, Context Setting

---

## Be Vigilant With Examples and Details

Claude pays close attention to details and examples as part of its precise instruction following capabilities. Ensure that your examples align with the behaviors you want to encourage and minimize behaviors you want to avoid.

If examples in the prompt demonstrate a certain style or structure, Claude will follow those examples closely. Be deliberate about which behaviors the examples reinforce.

**Category:** General Principles, Few-Shot Prompting, Instruction Design

---

## Long-Horizon Reasoning and State Tracking

Claude's latest models excel at long-horizon reasoning tasks with exceptional state tracking capabilities. Claude maintains orientation across extended sessions by focusing on incremental progress -- making steady advances on a few things at a time rather than attempting everything at once. This capability especially emerges over multiple context windows or task iterations, where Claude can work on a complex task, save the state, and continue with a fresh context window.

**Category:** Agentic Workflows, State Management, Long-Running Tasks

---

## Context Awareness and Multi-Window Workflows

Claude Opus 4.6 and Claude 4.5 models feature context awareness, enabling the model to track its remaining context window (i.e. "token budget") throughout a conversation. This enables Claude to execute tasks and manage context more effectively by understanding how much space it has to work.

### Managing Context Limits

If you are using Claude in an agent harness that compacts context or allows saving context to external files (like in Claude Code), add this information to your prompt so Claude can behave accordingly. Otherwise, Claude may sometimes naturally try to wrap up work as it approaches the context limit.

**Sample prompt:**

```text
Your context window will be automatically compacted as it approaches its limit, allowing you to continue working indefinitely from where you left off. Therefore, do not stop tasks early due to token budget concerns. As you approach your token budget limit, save your current progress and state to memory before the context window refreshes. Always be as persistent and autonomous as possible and complete tasks fully, even if the end of your budget is approaching. Never artificially stop any task early regardless of the context remaining.
```

The memory tool pairs naturally with context awareness for seamless context transitions.

**Category:** Context Management, Agentic Workflows, Token Budget

---

## Multi-Context Window Workflows

For tasks spanning multiple context windows:

### 1. Use a Different Prompt for the Very First Context Window

Use the first context window to set up a framework (write tests, create setup scripts), then use future context windows to iterate on a todo-list.

### 2. Have the Model Write Tests in a Structured Format

Ask Claude to create tests before starting work and keep track of them in a structured format (e.g., `tests.json`). This leads to better long-term ability to iterate. Remind Claude of the importance of tests:

```text
It is unacceptable to remove or edit tests because this could lead to missing or buggy functionality.
```

### 3. Set Up Quality of Life Tools

Encourage Claude to create setup scripts (e.g., `init.sh`) to gracefully start servers, run test suites, and linters. This prevents repeated work when continuing from a fresh context window.

### 4. Starting Fresh vs Compacting

When a context window is cleared, consider starting with a brand new context window rather than using compaction. Claude's latest models are extremely effective at discovering state from the local filesystem. In some cases, you may want to take advantage of this over compaction.

Be prescriptive about how it should start:

- "Call pwd; you can only read and write files in this directory."
- "Review progress.txt, tests.json, and the git logs."
- "Manually run through a fundamental integration test before moving on to implementing new features."

### 5. Provide Verification Tools

As the length of autonomous tasks grows, Claude needs to verify correctness without continuous human feedback. Tools like Playwright MCP server or computer use capabilities for testing UIs are helpful.

### 6. Encourage Complete Usage of Context

Prompt Claude to efficiently complete components before moving on:

```text
This is a very long task, so it may be beneficial to plan out your work clearly. It's encouraged to spend your entire output context working on the task - just make sure you don't run out of context with significant uncommitted work. Continue working systematically until you have completed this task.
```

**Category:** Multi-Session Workflows, Agentic Workflows, Task Planning

---

## State Management Best Practices

- **Use structured formats for state data**: When tracking structured information (like test results or task status), use JSON or other structured formats to help Claude understand schema requirements.
- **Use unstructured text for progress notes**: Freeform progress notes work well for tracking general progress and context.
- **Use git for state tracking**: Git provides a log of what's been done and checkpoints that can be restored. Claude's latest models perform especially well in using git to track state across multiple sessions.
- **Emphasize incremental progress**: Explicitly ask Claude to keep track of its progress and focus on incremental work.

**Example structured state file (tests.json):**

```json
{
  "tests": [
    {"id": 1, "name": "authentication_flow", "status": "passing"},
    {"id": 2, "name": "user_management", "status": "failing"},
    {"id": 3, "name": "api_endpoints", "status": "not_started"}
  ],
  "total": 200,
  "passing": 150,
  "failing": 25,
  "not_started": 25
}
```

**Example progress notes (progress.txt):**

```text
Session 3 progress:
- Fixed authentication token validation
- Updated user model to handle edge cases
- Next: investigate user_management test failures (test #2)
- Note: Do not remove tests as this could lead to missing functionality
```

**Category:** State Management, Agentic Workflows, Data Formats

---

## Communication Style

Claude's latest models have a more concise and natural communication style compared to previous models:

- **More direct and grounded**: Provides fact-based progress reports rather than self-celebratory updates.
- **More conversational**: Slightly more fluent and colloquial, less machine-like.
- **Less verbose**: May skip detailed summaries for efficiency unless prompted otherwise.

This communication style accurately reflects what has been accomplished without unnecessary elaboration.

**Category:** Output Style, Model Behavior

---

## Balance Verbosity

Claude's latest models tend toward efficiency and may skip verbal summaries after tool calls, jumping directly to the next action. While this creates a streamlined workflow, you may prefer more visibility into its reasoning process.

If you want Claude to provide updates as it works:

```text
After completing a task that involves tool use, provide a quick summary of the work you've done.
```

**Category:** Output Style, Agentic Workflows, Verbosity Control

---

## Tool Usage Patterns

Claude's latest models are trained for precise instruction following and benefit from explicit direction to use specific tools. If you say "can you suggest some changes," Claude will sometimes provide suggestions rather than implementing them -- even if making changes might be what you intended.

For Claude to take action, be more explicit.

**Less effective (Claude will only suggest):**

```text
Can you suggest some changes to improve this function?
```

**More effective (Claude will make the changes):**

```text
Change this function to improve its performance.
```

Or:

```text
Make these edits to the authentication flow.
```

### Prompt for Proactive Action

To make Claude more proactive about taking action by default, add this to your system prompt:

```text
<default_to_action>
By default, implement changes rather than only suggesting them. If the user's intent is unclear, infer the most useful likely action and proceed, using tools to discover any missing details instead of guessing. Try to infer the user's intent about whether a tool call (e.g., file edit or read) is intended or not, and act accordingly.
</default_to_action>
```

### Prompt for Conservative Action

If you want the model to be more hesitant by default, less prone to jumping straight into implementations, and only take action if requested:

```text
<do_not_act_before_instructions>
Do not jump into implementation or changes files unless clearly instructed to make changes. When the user's intent is ambiguous, default to providing information, doing research, and providing recommendations rather than taking action. Only proceed with edits, modifications, or implementations when the user explicitly requests them.
</do_not_act_before_instructions>
```

**Category:** Tool Use, Agentic Workflows, Action Control

---

## Tool Usage and Triggering

Claude Opus 4.5 and Claude Opus 4.6 are more responsive to the system prompt than previous models. If your prompts were designed to reduce undertriggering on tools or skills, these models may now overtrigger. The fix is to dial back any aggressive language.

Where you might have said:

```text
CRITICAL: You MUST use this tool when...
```

You can now use more normal prompting:

```text
Use this tool when...
```

**Category:** Tool Use, Prompt Migration, Model Behavior

---

## Balancing Autonomy and Safety

Without guidance, Claude Opus 4.6 may take actions that are difficult to reverse or affect shared systems, such as deleting files, force-pushing, or posting to external services. If you want Claude Opus 4.6 to confirm before taking potentially risky actions, add guidance to your prompt:

```text
Consider the reversibility and potential impact of your actions. You are encouraged to take local, reversible actions like editing files or running tests, but for actions that are hard to reverse, affect shared systems, or could be destructive, ask the user before proceeding.

Examples of actions that warrant confirmation:
- Destructive operations: deleting files or branches, dropping database tables, rm -rf
- Hard to reverse operations: git push --force, git reset --hard, amending published commits
- Operations visible to others: pushing code, commenting on PRs/issues, sending messages, modifying shared infrastructure

When encountering obstacles, do not use destructive actions as a shortcut. For example, don't bypass safety checks (e.g. --no-verify) or discard unfamiliar files that may be in-progress work.
```

**Category:** Safety, Agentic Workflows, Destructive Actions, Guardrails

---

## Overthinking and Excessive Thoroughness

Claude Opus 4.6 does significantly more upfront exploration than previous models, especially at higher `effort` settings. This initial work often helps to optimize the final results, but the model may gather extensive context or pursue multiple threads of research without being prompted.

If your prompts previously encouraged the model to be more thorough, tune that guidance for Claude Opus 4.6:

- **Replace blanket defaults with more targeted instructions.** Instead of "Default to using [tool]," add guidance like "Use [tool] when it would enhance your understanding of the problem."
- **Remove over-prompting.** Tools that undertriggered in previous models are likely to trigger appropriately now. Instructions like "If in doubt, use [tool]" will cause overtriggering.
- **Use effort as a fallback.** If Claude continues to be overly aggressive, use a lower setting for `effort`.

In some cases, Claude Opus 4.6 may think extensively, which can inflate thinking tokens and slow down responses. If this behavior is undesirable, add explicit instructions to constrain its reasoning, or lower the `effort` setting.

```text
When you're deciding how to approach a problem, choose an approach and commit to it. Avoid revisiting decisions unless you encounter new information that directly contradicts your reasoning. If you're weighing two approaches, pick one and see it through. You can always course-correct later if the chosen approach fails.
```

**Category:** Performance Optimization, Thinking Control, Effort Settings, Prompt Migration

---

## Control the Format of Responses

Several techniques are particularly effective in steering output formatting:

### 1. Tell Claude What to Do Instead of What Not to Do

- Instead of: "Do not use markdown in your response"
- Try: "Your response should be composed of smoothly flowing prose paragraphs."

### 2. Use XML Format Indicators

```text
Write the prose sections of your response in <smoothly_flowing_prose_paragraphs> tags.
```

### 3. Match Your Prompt Style to the Desired Output

The formatting style used in your prompt may influence Claude's response style. If you are still experiencing steerability issues with output formatting, match your prompt style to your desired output style. For example, removing markdown from your prompt can reduce the volume of markdown in the output.

### 4. Use Detailed Prompts for Specific Formatting Preferences

For more control over markdown and formatting usage, provide explicit guidance:

```text
<avoid_excessive_markdown_and_bullet_points>
When writing reports, documents, technical explanations, analyses, or any long-form content, write in clear, flowing prose using complete paragraphs and sentences. Use standard paragraph breaks for organization and reserve markdown primarily for `inline code`, code blocks, and simple headings (###). Avoid using **bold** and *italics*.

DO NOT use ordered lists (1. ...) or unordered lists (*) unless: a) you're presenting truly discrete items where a list format is the best option, or b) the user explicitly requests a list or ranking

Instead of listing items with bullets or numbers, incorporate them naturally into sentences. This guidance applies especially to technical writing. Using prose instead of excessive formatting will improve user satisfaction. NEVER output a series of overly short bullet points.

Your goal is readable, flowing text that guides the reader naturally through ideas rather than fragmenting information into isolated points.
</avoid_excessive_markdown_and_bullet_points>
```

**Category:** Output Formatting, Markdown Control, Response Style

---

## Research and Information Gathering

Claude's latest models demonstrate exceptional agentic search capabilities and can find and synthesize information from multiple sources effectively. For optimal research results:

### 1. Provide Clear Success Criteria

Define what constitutes a successful answer to your research question.

### 2. Encourage Source Verification

Ask Claude to verify information across multiple sources.

### 3. For Complex Research Tasks, Use a Structured Approach

```text
Search for this information in a structured way. As you gather data, develop several competing hypotheses. Track your confidence levels in your progress notes to improve calibration. Regularly self-critique your approach and plan. Update a hypothesis tree or research notes file to persist information and provide transparency. Break down this complex research task systematically.
```

This structured approach allows Claude to find and synthesize virtually any piece of information and iteratively critique its findings, no matter the size of the corpus.

**Category:** Research, Information Retrieval, Agentic Workflows

---

## Subagent Orchestration

Claude's latest models demonstrate significantly improved native subagent orchestration capabilities. These models can recognize when tasks would benefit from delegating work to specialized subagents and do so proactively without requiring explicit instruction.

### How to Take Advantage

1. **Ensure well-defined subagent tools**: Have subagent tools available and described in tool definitions.
2. **Let Claude orchestrate naturally**: Claude will delegate appropriately without explicit instruction.
3. **Watch for overuse**: Claude Opus 4.6 has a strong predilection for subagents and may spawn them in situations where a simpler, direct approach would suffice. For example, the model may spawn subagents for code exploration when a direct grep call is faster and sufficient.

### Controlling Subagent Usage

If you're seeing excessive subagent use, add explicit guidance:

```text
Use subagents when tasks can run in parallel, require isolated context, or involve independent workstreams that don't need to share state. For simple tasks, sequential operations, single-file edits, or tasks where you need to maintain context across steps, work directly rather than delegating.
```

**Category:** Subagents, Agentic Workflows, Task Delegation, Performance Optimization

---

## Model Self-Knowledge

If you would like Claude to identify itself correctly in your application or use specific API strings:

```text
The assistant is Claude, created by Anthropic. The current model is Claude Opus 4.6.
```

For LLM-powered apps that need to specify model strings:

```text
When an LLM is needed, please default to Claude Opus 4.6 unless the user requests otherwise. The exact model string for Claude Opus 4.6 is claude-opus-4-6.
```

**Category:** Model Identity, Configuration

---

## Thinking Sensitivity

When extended thinking is disabled, Claude Opus 4.5 is particularly sensitive to the word "think" and its variants. Replace "think" with alternative words that convey similar meaning, such as "consider," "believe," and "evaluate."

**Category:** Prompt Wording, Model Behavior, Gotchas

---

## Leverage Thinking and Interleaved Thinking Capabilities

Claude's latest models offer thinking capabilities that can be especially helpful for tasks involving reflection after tool use or complex multi-step reasoning. You can guide its initial or interleaved thinking for better results.

Claude Opus 4.6 uses adaptive thinking (`thinking: {type: "adaptive"}`), where Claude dynamically decides when and how much to think. Claude calibrates its thinking based on two factors: the `effort` parameter and query complexity. Higher effort elicits more thinking, and more complex queries do the same. On easier queries that don't require thinking, the model responds directly. In internal evaluations, adaptive thinking reliably drives better performance than extended thinking.

### Guiding Thinking Behavior

```text
After receiving tool results, carefully reflect on their quality and determine optimal next steps before proceeding. Use your thinking to plan and iterate based on this new information, and then take the best next action.
```

### Reducing Excessive Thinking

If the model thinks more often than desired (can happen with large or complex system prompts):

```text
Extended thinking adds latency and should only be used when it will meaningfully improve answer quality - typically for problems that require multi-step reasoning. When in doubt, respond directly.
```

### Migration from Extended Thinking to Adaptive Thinking

**Before (extended thinking, older models):**

```python
client.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=64000,
    thinking={"type": "enabled", "budget_tokens": 32000},
    messages=[{"role": "user", "content": "..."}],
)
```

**After (adaptive thinking):**

```python
client.messages.create(
    model="claude-opus-4-6",
    max_tokens=64000,
    thinking={"type": "adaptive"},
    output_config={"effort": "high"},  # or max, medium, low
    messages=[{"role": "user", "content": "..."}],
)
```

If you are not using extended thinking, no changes are required. Thinking is off by default when you omit the `thinking` parameter.

**Category:** Thinking, Adaptive Thinking, Extended Thinking, API Configuration, Performance Optimization

---

## Document Creation

Claude's latest models excel at creating presentations, animations, and visual documents with impressive creative flair and strong instruction following. The models produce polished, usable output on the first try in most cases.

**Sample prompt:**

```text
Create a professional presentation on [topic]. Include thoughtful design elements, visual hierarchy, and engaging animations where appropriate.
```

**Category:** Content Creation, Presentations, Visual Design

---

## Improved Vision Capabilities

Claude Opus 4.5 and Claude Opus 4.6 have improved vision capabilities compared to previous Claude models. They perform better on image processing and data extraction tasks, particularly when there are multiple images present in context. These improvements carry over to computer use, where the models can more reliably interpret screenshots and UI elements. You can also use these models to analyze videos by breaking them up into frames.

### Crop Tool Technique

One technique that has been found effective to further boost performance is to give Claude a crop tool or skill. Consistent uplift on image evaluations has been observed when Claude is able to "zoom" in on relevant regions of an image.

**Category:** Vision, Image Processing, Computer Use, Multimodal

---

## Optimize Parallel Tool Calling

Claude's latest models excel at parallel tool execution. These models will:

- Run multiple speculative searches during research
- Read several files at once to build context faster
- Execute bash commands in parallel (which can even bottleneck system performance)

This behavior is easily steerable. While the model has a high success rate in parallel tool calling without prompting, you can boost this to approximately 100% or adjust the aggression level.

### Prompt for Maximum Parallel Efficiency

```text
<use_parallel_tool_calls>
If you intend to call multiple tools and there are no dependencies between the tool calls, make all of the independent tool calls in parallel. Prioritize calling tools simultaneously whenever the actions can be done in parallel rather than sequentially. For example, when reading 3 files, run 3 tool calls in parallel to read all 3 files into context at the same time. Maximize use of parallel tool calls where possible to increase speed and efficiency. However, if some tool calls depend on previous calls to inform dependent values like the parameters, do NOT call these tools in parallel and instead call them sequentially. Never use placeholders or guess missing parameters in tool calls.
</use_parallel_tool_calls>
```

### Prompt to Reduce Parallel Execution

```text
Execute operations sequentially with brief pauses between each step to ensure stability.
```

**Category:** Tool Use, Parallel Execution, Performance Optimization

---

## Reduce File Creation in Agentic Coding

Claude's latest models may sometimes create new files for testing and iteration purposes, particularly when working with code. This approach allows Claude to use files, especially Python scripts, as a "temporary scratchpad" before saving its final output. Using temporary files can improve outcomes particularly for agentic coding use cases.

If you prefer to minimize net new file creation, instruct Claude to clean up after itself:

```text
If you create any temporary new files, scripts, or helper files for iteration, clean up these files by removing them at the end of the task.
```

**Category:** Agentic Coding, File Management, Cleanup

---

## Overeagerness

Claude Opus 4.5 and Claude Opus 4.6 have a tendency to overengineer by creating extra files, adding unnecessary abstractions, or building in flexibility that wasn't requested. If you're seeing this undesired behavior, add specific guidance to keep solutions minimal.

```text
Avoid over-engineering. Only make changes that are directly requested or clearly necessary. Keep solutions simple and focused:

- Scope: Don't add features, refactor code, or make "improvements" beyond what was asked. A bug fix doesn't need surrounding code cleaned up. A simple feature doesn't need extra configurability.

- Documentation: Don't add docstrings, comments, or type annotations to code you didn't change. Only add comments where the logic isn't self-evident.

- Defensive coding: Don't add error handling, fallbacks, or validation for scenarios that can't happen. Trust internal code and framework guarantees. Only validate at system boundaries (user input, external APIs).

- Abstractions: Don't create helpers, utilities, or abstractions for one-time operations. Don't design for hypothetical future requirements. The right amount of complexity is the minimum needed for the current task.
```

**Category:** Agentic Coding, Overengineering, Scope Control, Minimalism

---

## Frontend Design

Claude Opus 4.5 and Claude Opus 4.6 excel at building complex, real-world web applications with strong frontend design. However, without guidance, models can default to generic patterns that create what users call the "AI slop" aesthetic. To create distinctive, creative frontends that surprise and delight:

```text
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight.

Focus on:
- Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.
- Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.
- Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.
- Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
```

**Category:** Frontend Design, UI/UX, CSS, Web Development, Aesthetics

---

## Avoid Focusing on Passing Tests and Hard-Coding

Claude can sometimes focus too heavily on making tests pass at the expense of more general solutions, or may use workarounds like helper scripts for complex refactoring instead of using standard tools directly. To prevent this behavior and ensure robust, generalizable solutions:

```text
Please write a high-quality, general-purpose solution using the standard tools available. Do not create helper scripts or workarounds to accomplish the task more efficiently. Implement a solution that works correctly for all valid inputs, not just the test cases. Do not hard-code values or create solutions that only work for specific test inputs. Instead, implement the actual logic that solves the problem generally.

Focus on understanding the problem requirements and implementing the correct algorithm. Tests are there to verify correctness, not to define the solution. Provide a principled implementation that follows best practices and software design principles.

If the task is unreasonable or infeasible, or if any of the tests are incorrect, please inform me rather than working around them. The solution should be robust, maintainable, and extendable.
```

**Category:** Agentic Coding, Testing, Code Quality, Robustness

---

## Minimizing Hallucinations in Agentic Coding

Claude's latest models are less prone to hallucinations and give more accurate, grounded, intelligent answers based on the code. To encourage this behavior even more and minimize hallucinations:

```text
<investigate_before_answering>
Never speculate about code you have not opened. If the user references a specific file, you MUST read the file before answering. Make sure to investigate and read relevant files BEFORE answering questions about the codebase. Never make any claims about code before investigating unless you are certain of the correct answer - give grounded and hallucination-free answers.
</investigate_before_answering>
```

**Category:** Hallucination Prevention, Agentic Coding, Grounding, Accuracy

---

## Migrating Away From Prefilled Responses

Starting with Claude Opus 4.6, prefilled responses on the last assistant turn are no longer supported. Model intelligence and instruction following has advanced such that most use cases of prefill no longer require it.

### Controlling Output Formatting (Previously Prefill)

Prefills have been used to force specific output formats like JSON/YAML, classification, and similar patterns.

**Migration:** The Structured Outputs feature is designed specifically to constrain Claude's responses to follow a given schema. Try simply asking the model to conform to your output structure first, as newer models can reliably match complex schemas when told to, especially if implemented with retries. For classification tasks, use either tools with an enum field containing your valid labels or structured outputs.

### Eliminating Preambles (Previously Prefill)

Prefills like `Here is the requested summary:\n` were used to skip introductory text.

**Migration:** Use direct instructions in the system prompt:

```text
Respond directly without preamble. Do not start with phrases like 'Here is...', 'Based on...', etc.
```

Alternatively, direct the model to output within XML tags, use structured outputs, or use tool calling. If the occasional preamble slips through, strip it in post-processing.

### Avoiding Bad Refusals (Previously Prefill)

Prefills were used to steer around unnecessary refusals.

**Migration:** Claude is much better at appropriate refusals now. Clear prompting within the `user` message without prefill should be sufficient.

### Continuations (Previously Prefill)

Prefills were used to continue partial completions, resume interrupted responses, or pick up where a previous generation left off.

**Migration:** Move the continuation to the user message, and include the final text from the interrupted response:

```text
Your previous response was interrupted and ended with `[previous_response]`. Continue from where you left off.
```

If this is part of error-handling or incomplete-response-handling and there is no UX penalty, retry the request.

### Context Hydration and Role Consistency (Previously Prefill)

Prefills were used to periodically ensure refreshed or injected context.

**Migration:** For very long conversations, inject what were previously prefilled-assistant reminders into the user turn. If context hydration is part of a more complex agentic system, consider hydrating via tools (expose or encourage use of tools containing context based on heuristics such as number of turns) or during context compaction.

**Category:** API Migration, Prefill Deprecation, Output Control, Structured Outputs

---

## LaTeX Output

Claude Opus 4.6 defaults to LaTeX for mathematical expressions, equations, and technical explanations. If you prefer plain text:

```text
Format your response in plain text only. Do not use LaTeX, MathJax, or any markup notation such as \( \), $, or \frac{}{}. Write all math expressions using standard text characters (e.g., "/" for division, "*" for multiplication, and "^" for exponents).
```

**Category:** Output Formatting, LaTeX, Math Expressions

---

## Migration Considerations (Claude 4.6 from Earlier Generations)

### 1. Be Specific About Desired Behavior

Consider describing exactly what you'd like to see in the output.

### 2. Frame Your Instructions With Modifiers

Adding modifiers that encourage Claude to increase the quality and detail of its output can help better shape Claude's performance. For example, instead of "Create an analytics dashboard", use "Create an analytics dashboard. Include as many relevant features and interactions as possible. Go beyond the basics to create a fully-featured implementation."

### 3. Request Specific Features Explicitly

Animations and interactive elements should be requested explicitly when desired.

### 4. Update Thinking Configuration

Claude Opus 4.6 uses adaptive thinking (`thinking: {type: "adaptive"}`) instead of manual thinking with `budget_tokens`. Use the effort parameter to control thinking depth.

### 5. Migrate Away From Prefilled Responses

Prefilled responses on the last assistant turn are deprecated starting with Claude Opus 4.6. See the section on migrating away from prefilled responses for detailed guidance on alternatives.

### 6. Tune Anti-Laziness Prompting

If your prompts previously encouraged the model to be more thorough or use tools more aggressively, dial back that guidance. Claude Opus 4.6 is significantly more proactive and may overtrigger on instructions that were needed for previous models.

**Category:** Migration, API Configuration, Prompt Tuning
