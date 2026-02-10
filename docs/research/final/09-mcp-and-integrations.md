# MCP and Integrations

## Purpose

Model Context Protocol (MCP) servers extend Claude Code beyond the local terminal to interact with external services, APIs, browsers, and tools. They connect Claude to the broader development ecosystem -- from Playwright for browser testing to GitHub for repository operations to Sentry for error tracking. However, MCP comes with significant context costs that must be managed carefully.

## How It Helps

- Connects Claude to external tools without leaving the terminal
- Enables end-to-end workflows: fetch tasks from Notion, implement, test in browser, create PR
- Browser automation (Playwright, Chrome DevTools) enables real-user testing
- Eliminates context switching between terminal, browser, and external services
- Supports the universal protocol standard across multiple AI tools

## What You Can Do

### Adding MCP Servers

```bash
# Install a server
claude mcp add playwright npx @playwright/mcp@latest

# Add with project scope
claude mcp add brave-search -s project -- npx @modelcontextprotocol/server-brave-search

# Check MCP status
/mcp
```

### Essential MCP Servers

| Server | Purpose |
|--------|---------|
| **Playwright** | Browser automation, E2E testing |
| **Chrome DevTools** | Direct Chrome control, console logs, network monitoring |
| **GitHub** | Repository operations, PR management |
| **Sentry** | Error tracking and monitoring |
| **Figma** | Design system access |
| **Notion** | Task management |
| **Puppeteer** | Website automation |
| **Brave Search** | Web search capabilities |
| **context7** | LLM/AI code editor documentation |
| **JetBrains** | IDE integration |
| **warpgrep** | Agentic codebase search (reduces token waste from irrelevant file reads) |

**Discovery resources:**
- https://registry.modelcontextprotocol.io/
- https://github.com/mcp

### Browser Testing with Chrome Integration

```bash
/chrome
# or
claude --chrome
```

Chrome integration (v2.0.72+) provides:
- Navigate pages, click buttons, fill forms
- Read console logs and monitor network requests
- GIF recording of browser automation sessions
- Leverages browser user profile for authenticated interactions
- Direct Chrome control via MCP tools

### Playwright CLI vs MCP for Browser Automation

The Playwright CLI is an alternative to the Playwright MCP server that some users prefer for more reliable and predictable browser interactions. Key differences and community observations:

- **CLI over MCP:** Some users have fully disabled the Playwright MCP server in favor of the CLI, reporting more reliable interactions without the MCP context overhead.
- **Speed considerations:** When the LLM controls each Playwright command individually, each action incurs multiple seconds of evaluation time. For faster execution, consider creating a skill that generates the entire testing sequence as a script file, runs it, then evaluates the results -- rather than having the LLM drive each step interactively.
- **Two modes of use:** Direct LLM interaction (step-by-step browser control) and E2E test generation (Claude writes Playwright test scripts that run independently). The latter is more token-efficient for repeatable flows.
- **Generating custom flows:** Users report good results giving Claude plain-English instructions like "create a new user and go through the signup wizard," having it generate a Playwright test script for the flow, and then running it. This approach bridges the gap between ad-hoc manual testing and pre-defined E2E tests.
- **Model quality matters:** Opus 4.6 was noted as significantly better at browser use compared to earlier models -- faster, less likely to get stuck, and more token-efficient when reading page content.

### End-to-End Workflow with MCP

One author's complete workflow using MCP integrations:

1. Fetch tasks from Notion with Notion MCP
2. Ask Claude to create a new branch for the task
3. Guide through implementation using CLAUDE.md guidelines
4. Review + test the code
5. Let Claude push and raise a PR using a PR template

No browser tabs. No manual switching between tools. Just focused execution.

### Local Model Integration via Ollama and llama.cpp

Claude Code can be routed to local models for cost savings, privacy, and unlimited iteration loops. There are several community-tested approaches:

**Setup methods:**
- **Ollama native support:** Ollama now implements the Anthropic Messages API protocol. Set `ANTHROPIC_BASE_URL` and a pseudo API key via environment variables.
- **llama.cpp / llama-server:** Preferred by experienced users over Ollama for better performance and quantization control. Also supports the Anthropic Messages API.
- **Claude Code Router:** Open-source proxy (`github.com/musistudio/claude-code-router`) that has supported routing to alternative models (including local) for some time.
- **LiteLLM proxy:** Can set up with an Anthropic endpoint to route to local models.

**Recommended local models for Claude Code (community-tested):**

| Model | Notes |
|-------|-------|
| Devstral 2 Small 24b | Multiple users recommend; works well with llama.cpp + CC |
| Qwen3-30B-A3B | Good for docs work on M1 Max 64GB |
| Qwen Coder 30b | Works well at implementing tasks |
| gpt-oss-120b | Good with high reasoning (needs 192GB+ RAM) |
| MiniMax M2.1 (AWQ 4bit) | Okay for general tasks; 2-bit quant works on 128GB MBP |

**Hardware requirements:** Minimum practical VRAM is 24GB. Claude Code uses ~30k context on the first call alone, so a 24b model at Q6 on a 5090 only provides ~70k total context. Consider KV cache quantization to extend the context window on consumer GPUs. Quantization below Q6 is not recommended.

**Workflow pattern:** Use Claude (cloud) for planning and prompt engineering, then route routine implementation to local models. This keeps Claude at the $20/month tier while offloading iteration-heavy work. Local models require far more verbose and explicit prompts -- they do not fill in blanks like Claude does. Use Claude to write good prompts for your local models.

**Production-scale local processing case study.** One developer built a fully autonomous content processing system that runs 96% locally on consumer hardware -- two GPUs (RTX 3090 and RTX 4060 Ti) processing approximately 40 million tokens per day. The architecture uses small local models (Qwen3-8B for text at 35M tokens/day, Qwen3-VL for vision at 3.8M tokens/day) for all heavy lifting -- clustering, research, entity extraction, and vision tasks. Cloud API calls (Claude Haiku at 1.6M tokens/day) are reserved only for the final output synthesis that end users see. Over a billion tokens have been processed locally since launch. This tiered model demonstrates that consumer hardware can handle production-scale workloads when cloud API usage is reserved for the highest-value steps. See also [10-token-optimization.md](./10-token-optimization.md) for cost implications of local processing.

**Setup guide:** https://github.com/pchalasani/claude-code-tools/blob/main/docs/local-llm-setup.md

### Multi-Session Orchestration Tools

The community has built several tools for managing multiple Claude Code sessions simultaneously:

- **Maestro** (`github.com/its-maestro-baby/maestro`) -- macOS native app (Swift) for running 1-12 Claude/Gemini/Codex sessions in a tiled grid with real-time status indicators via custom MCP server. Each session gets its own git worktree and branch for isolation.
- **simple-code-gui** (`github.com/DonutsDelivery/simple-code-gui`) -- Cross-platform (Electron), supports multiple AI backends, voice input/output, mobile app with QR code connection.
- **Conductor** (`conductor.build`) and **Craft Agents** (`agents.craft.do`) -- Agent orchestration tools with different UI paradigms.

Community feedback indicates git worktree isolation per session is the key differentiator for multi-agent work, but port isolation (for testing web services) remains unsolved. A practical limit noted by multiple users: most developers work best with a maximum of 2 concurrent tasks despite tools supporting 12+ sessions.

### Gemini CLI as Fallback for Blocked Sites

Create a skill that tells Claude to use Gemini CLI via tmux for sites WebFetch cannot access (like Reddit):

Store in `~/.claude/skills/reddit-fetch/SKILL.md`. The skill loads only when needed, improving token efficiency. It uses tmux to launch Gemini, send queries, and capture output.

## Details

### MCP Context Cost Warning

MCP tools consume 8-30% of the context window simply by being available, even when never used during a session. Tool descriptions are loaded into the agent's context automatically when tools are registered.

**Measure your overhead:**
```
/context
```

Browser automation MCP tools tend to consume the most context. Skills do not eliminate this overhead -- only removing tools or replacing them with scripts reduces consumption.

**Actionable advice:**
- Audit MCP tool registrations regularly
- Remove tools you rarely use
- Consider replacing heavy MCP tools with lightweight scripts
- Enable lazy-load MCP tools where available (see [10-token-optimization.md](./10-token-optimization.md))
- Be cautious when installing community "mega packs" of 30+ agent definitions -- each one consumes context on every message, and many users do not realize the cumulative overhead until their sessions are significantly impacted

### Post-Skills MCP Philosophy

One enterprise perspective: after Skills, MCP should function as a "secure gateway" providing high-level tools rather than mirroring REST APIs one-to-one. MCP's role is to manage auth, networking, and security boundaries, then get out of the way.

**Recommended MCP tool patterns:**
- `download_raw_data(filters...)` -- High-level data access
- `take_sensitive_gated_action(args...)` -- Controlled sensitive operations
- `execute_code_in_environment_with_state(code...)` -- Stateful execution

**What to keep as MCP:** Stateful, complex environments like Playwright.

**What to migrate away from MCP:** Stateless tools (Jira, AWS, GitHub) should become simple CLIs or skills instead. Instead of defining dozens of individual tools, expose code APIs and let Claude write code to make the tool calls.

### Claude Code on the Web

The remote Web environment requires separate setup configuration. Local configuration does not transfer automatically.

Key details:
- Environment variable `CLAUDE_CODE_REMOTE` is set when running remotely
- Create a `SessionStart` Hook to detect remote execution and run setup scripts
- Works with GitHub-hosted repositories
- Requires GitHub app installation

### Timeout Adjustments

Increase timeouts for complex MCP operations:

```json
{
  "MCP_TOOL_TIMEOUT": 60000,
  "BASH_MAX_TIMEOUT_MS": 120000
}
```

### Network Debugging

Use proxy settings to inspect raw traffic for network sandboxing:

```json
{
  "HTTPS_PROXY": "<proxy-url>",
  "HTTP_PROXY": "<proxy-url>"
}
```

### Claude Code Ecosystem

The platform has expanded into a comprehensive ecosystem:
- **CLI** -- Primary interface
- **SDK** -- Programmatic integration
- **IDE Extensions** -- VS Code, JetBrains
- **Web** -- Remote sandbox execution
- **Mobile / Desktop Apps** -- Multi-platform access
- **Slack Integration** -- Team collaboration
- **Chrome Extension** -- Browser automation
- **GitHub Actions** -- CI/CD integration

Tasks can flow between components across devices and platforms.

## Sources

- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://medium.com/@shivang.tripathii/how-i-use-claude-code-to-maximize-productivity-c853104804d6
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://sidbharath.com/claude-code-the-complete-guide/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qhj13v/ (Ollama local model integration with Claude Code)
- https://www.reddit.com/r/ClaudeCode/comments/1qq2lur/ (open source multi-session orchestration tools)
- https://www.reddit.com/r/ClaudeCode/comments/1qazqq6/ (MCP context overhead and startup cost community findings)
- https://ollama.com/blog/claude (Ollama official Claude Code support)
- https://github.com/pchalasani/claude-code-tools/blob/main/docs/local-llm-setup.md (local LLM setup guide)
- https://www.reddit.com/r/ClaudeCode/comments/1qv4lqw/how_i_built_an_ai_news_agency_that_runs_itself/ (1B-token local processing architecture)
- https://www.reddit.com/r/ClaudeCode/comments/1r03a0t/claude_code_playwright_cli_superpowers/ (Playwright CLI vs MCP patterns)
