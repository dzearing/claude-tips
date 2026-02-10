# Token Optimization

## Purpose

Claude Code's default configuration consumes a significant portion of the context window before you even start working. The system prompt alone takes ~18k tokens (9% of 200k), MCP tools add 8-30% more, and the auto-compact buffer reserves another 16%. Understanding and optimizing these costs is essential for getting the most out of each session, especially on complex tasks where every token counts.

## How It Helps

- Reduces system overhead from ~18k to ~10k tokens (41% overhead reduction)
- Frees up 8-30% of context window by managing MCP tool registrations
- Enables longer productive sessions before compaction is needed
- Reduces subscription costs through more efficient token usage
- Allows more room for actual code and conversation in the context window

## What You Can Do

### Slim Down the System Prompt

The default system prompt consumes ~18k tokens. Patching can reduce this to ~10k tokens, saving ~7,300 tokens (41% of static overhead).

**Disable the auto-updater:**
```json
{
  "env": {
    "DISABLE_AUTOUPDATER": "1"
  }
}
```

**Enable lazy-load MCP tools:**
```json
{
  "env": {
    "ENABLE_TOOL_SEARCH": "true"
  }
}
```

With lazy-load enabled, MCP tool definitions are not loaded into context upfront. Instead, they are loaded on-demand when the agent determines they are needed.

### Audit MCP Tool Registrations

MCP tools consume context even when not used. Measure your overhead:

```
/context
```

A fresh monorepo session typically consumes ~20k tokens (10% of 200k) as baseline. Each MCP server adds to this.

**Actions:**
- Remove MCP servers you rarely use
- Replace heavy MCP tools with lightweight CLI scripts where possible
- Browser automation MCP tools consume the most context
- Consider using Skills instead of MCP for stateless operations

### Manage Auto-Compact Settings

The auto-compact buffer reserves context for compression:
- Default: 32k tokens (22.5% of 200k)
- With max output tokens set to 64k: buffer increases to ~40%

```bash
# Only increase if you specifically need longer outputs
export CLAUDE_CODE_MAX_OUTPUT_TOKENS=64000
```

Disable auto-compact for manual control:
```
/config
```

Toggle auto-compact off and use manual `/compact` with specific preservation instructions instead.

### Use Surgical Prompting

Less context per request means lower token consumption:

**Broad (expensive):** "Fix the bug in the auth module"

**Surgical (efficient):** "Analyze only auth.py lines 120-180. Identify the logic error. Propose a patch <= 10 lines + 2 unit tests."

### Avoid Throwaway Messages Like "Thanks"

A single word like "thanks" in a long conversation can consume 5-7% of your session quota. This happens because every message resends the entire accumulated context (potentially 180k+ tokens) as input tokens. The cost is not the word you typed -- it is the entire conversation being reprocessed.

If you want to acknowledge and move on, combine it with your next instruction: "Thanks! Now let's move to the next item on the list..." This amortizes the per-message cost across useful work rather than wasting a full round-trip on a social nicety.

**Cache expiration compounds the problem.** Anthropic caches input tokens, but the cache expires after roughly 5 minutes of inactivity. If you step away and come back to say "thanks," all those input tokens are treated as fresh, costing significantly more than a cached read. On the API, cached reads cost 1/10th the price of uncached.

### Batch Requests

Each round trip re-establishes context. Combine plan + execution into a single exchange rather than 15 micro-iterations.

### Smart Model Routing

Route tasks by complexity to optimize cost:

**Route to cheaper/faster models (~70% of tasks):**
- Boilerplate code generation
- Refactoring
- Writing tests
- Formatting, docstrings, linting

**Reserve for Opus (~30% of tasks):**
- Architecture decisions
- Complex debugging
- Nuanced reasoning

**Tools for routing:**
- **claude-code-router** -- Open-source proxy supporting dynamic model switching with `/model` command (https://github.com/musistudio/claude-code-router)
- **RouterLab/claude-scionos** -- Runner with ephemeral, memory-only auth
- **Ollama** -- Local models for routine tasks at near-zero cost

```bash
# Ollama integration
export ANTHROPIC_AUTH_TOKEN="ollama"
export ANTHROPIC_BASE_URL="http://localhost:11434"
```

Reported impact: monthly bills dropping from ~$200 to ~$50 with smart routing.

### Understand the Startup Tax

Claude Code burns ~1-3% of your session quota on startup before you type anything. Community investigation of network traffic confirmed the CLI immediately triggers a `v1/messages` request that includes the entire JSON schema for every tool plus your full CLAUDE.md context, using the Opus model.

**Implications for your workflow:**
- If you open and close the CLI frequently (switching directories, checking usage, managing MCPs), you pay this startup tax every time
- If you open the CLI and wait more than 5 minutes before sending your first prompt, the cache from the warmup may expire, resulting in double billing for the same context
- Subagents each incur their own startup cost -- 10k-23k tokens depending on tool/MCP count
- Prefer `/clear` within a session over killing and restarting the terminal to avoid repeated startup costs

**Mitigation:** Anthropic addressed the eager warmup in v2.1.6 by removing it, but the general principle remains: every new session or subagent has a non-trivial initialization cost. Minimize unnecessary session restarts. Use `ccusage` for more accurate usage tracking than the built-in `/usage` command, which some users report as unreliable.

### Manage Subagent Token Overhead

Subagents (Explore, Plan, Coder) can consume tokens at a surprising rate. Community observations:

- **Explore agents use Haiku** (or sometimes Sonnet), which is cheaper per token than Opus but not free. Multiple parallel Explore agents can burn 100k-300k tokens on a single research pass because they tend to peruse the entire codebase.
- **Plan mode can double-bill.** One user had Opus go through Plan mode, create a comprehensive plan, then clear context to execute -- only to burn half a million tokens planning again in the new context.
- **Disabling Explore and Plan agents** is reported to save significant tokens. The trade-off is tightening the scope of each session and plan manually.
- **Folder-level CLAUDE.md as an index.** To reduce unnecessary file reads, maintain a CLAUDE.md in every folder that Claude updates at the end of every plan -- containing an index of files, their purposes, and module APIs. This lets Claude interact with modules without opening files just to understand them.
- **Local models for Explore work.** Offloading the activity that normally goes to Haiku to a locally installed model costs zero tokens with negligible delay.

The core trade-off remains: Cost, Quality, Speed -- pick two. For complex tasks, subagent delegation protects the main context (which is priceless). For simple one-off tasks, the overhead may not be worth it.

### Local Processing as a Cost Optimization Strategy

Running small models locally on consumer GPUs can dramatically reduce cloud API costs for token-heavy workloads. One production system processes approximately 40 million tokens per day on two consumer GPUs (RTX 3090 + RTX 4060 Ti), with 96% of processing handled locally. Cloud API usage is reserved only for the final output step -- the part where quality matters most to end users.

This tiered approach applies directly to Claude Code workflows: use local models (via Ollama or llama.cpp) for exploration, research, and iteration-heavy tasks, and reserve cloud API calls for planning, architecture decisions, and final code synthesis. See [09-mcp-and-integrations.md](./09-mcp-and-integrations.md) for local model setup details.

### Disable Background Processes

A `DISABLE_BACKGROUND_PROCESSES` environment variable was added as an option to reduce token waste from background Haiku calls for prompt hints, plugin checks, and other exploratory behavior that runs on every session start. If you are on a constrained plan, disabling these background processes can meaningfully reduce overhead.

## Details

### Context Budget Breakdown

| Component | Tokens | % of 200k | Optimization |
|-----------|--------|-----------|-------------|
| System prompt (default) | ~18,000 | 9% | Reduce to ~10k |
| Auto-compact buffer | ~32,000 | 16% | Manual compact instead |
| CLAUDE.md + rules | 2,000-5,000 | 1-2.5% | Keep concise |
| MCP tool definitions | 16,000-60,000 | 8-30% | Lazy-load, remove unused |
| Startup warmup (per session) | ~1-3% of quota | varies | Minimize session restarts |
| **Available for work** | **~95,000-140,000** | **47-70%** | Maximize this |

### Model Switching Behavior

Claude Code defaults to using the Opus model until approximately 50% of your usage threshold, then automatically switches to Sonnet for cost efficiency. You can also manually switch models.

**Opus 4.5** delivers superior quality with:
- Faster execution
- Better communication and collaboration
- Superior intent detection
- More thorough reasoning with extended thinking

**Sonnet 4.5** caution: can produce "haphazard changes which would lead to bugs." Requires closer review.

### Session Limit vs Context Window

These are different concepts that both matter. The **session usage percentage** tracks tokens consumed against a rolling rate limit (resets every few hours). The **context window** is the total conversation size the model can hold. A message that consumes very few context tokens still costs input tokens against your session limit because the entire prior conversation is resent. Understanding this distinction is critical for budgeting sessions effectively.

### Cost Management Mindset

Treat AI usage like cloud infrastructure -- optimized, routed, and cost-efficient. Just as you would not run every workload on the most expensive cloud instance, you should not send every coding task to the most expensive model.

### Enterprise API Key Management

For teams, use `ANTHROPIC_API_KEY` with `apiKeyHelper` for usage-based pricing:

```json
{
  "ANTHROPIC_API_KEY": "<key>",
  "apiKeyHelper": "<helper-command>"
}
```

This accounts for the 1:100x variance in developer usage across a team.

### Pricing Reference

- Claude Max: $100/month for maximum plan access with Opus model usage
- Direct provider advantage: no reseller markup, tighter feedback loop between tool and model improvements

### Do Not Trust Full Context Window Capacity

Effective context is typically only 50-60% of the stated maximum. Do not start complicated tasks mid-conversation. Use compaction or start fresh with critical features.

### Version-Specific Token Efficiency

Community testing found significant version-to-version variance in token efficiency. For example, v2.0.76 was reported to be 60-70% less wasteful in tool calls and token usage compared to v2.1.5. If you notice a sudden increase in token consumption after updating, checking the Claude Code changelog and community reports may reveal whether it is a known regression.

### The Mental Model: Every Message Re-reads Everything

The fundamental insight many users miss is that the model does not "remember" previous messages. It re-processes the entire conversation from scratch on every turn. A 1-word message in a 100k-token conversation costs ~100k input tokens, not 1 token. This is not a Claude Code-specific behavior; it is how transformer-based LLMs work. Keep this in mind when deciding whether to send that quick follow-up versus batching it with your next substantive instruction.

## Sources

- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://medium.com/@comeback01/how-to-code-4x-faster-with-claude-in-2026-without-blowing-your-anthropic-budget-42f764bb877d
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://www.builder.io/blog/claude-code
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1q9jzvd/ ("saying thanks" wastes 7% of session quota)
- https://www.reddit.com/r/ClaudeCode/comments/1qazqq6/ (startup burn rate: 1-3% of quota on launch)
- https://github.com/anthropics/claude-code/issues/16157#issuecomment-3737070631 (Anthropic fix for warmup in v2.1.6)
- https://www.reddit.com/r/ClaudeCode/comments/1qyt0fo/this_seems_like_a_waste_of_tokens_there_has_got/ (subagent token waste patterns and mitigation)
- https://www.reddit.com/r/ClaudeCode/comments/1qv4lqw/how_i_built_an_ai_news_agency_that_runs_itself/ (local processing as cost optimization)
