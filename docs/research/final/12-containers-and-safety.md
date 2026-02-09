# Containers and Safety

## Purpose

Claude Code can execute arbitrary commands on your system, which creates both power and risk. Docker containers provide isolation for long-running or risky operations, the sandbox mode restricts filesystem access, and permission configurations prevent destructive commands. Understanding the safety spectrum -- from default mode to full autonomous execution -- lets you choose the right trust level for each scenario.

## How It Helps

- Docker containers enable unsupervised, long-running autonomous work without risking your system
- Permission deny-lists prevent destructive commands even with `--dangerously-skip-permissions`
- Sandbox mode restricts file system and network access to the working directory
- Audit trails help maintain security hygiene as permissions accumulate
- Layered safety (sandbox + deny-list + hooks) provides defense in depth
- Understanding prompt injection risks prevents data exfiltration when agents access untrusted content

## What You Can Do

### Docker Containers for Long-Running Tasks

Run Claude Code inside Docker with full autonomous permissions:

```bash
docker run -it \
  --mount type=bind,source=/path/to/project,target=/workspace \
  your-claude-image \
  claude --dangerously-skip-permissions
```

**Orchestration pattern:** Local Claude controls a containerized Claude instance via tmux:
- Use tmux `send-keys` to send commands to the container
- Use tmux `capture-pane` to read output
- Multi-model orchestration possible (different models for different containers)

Use cases:
- Overnight coding tasks
- Risky refactors that might break things
- Exploratory work in isolated environments
- Long-running operations where repeated permission prompts would be impractical

### Permission Configuration

Use `/permissions` to manage what Claude can do without asking:

```bash
/permissions
```

**Safe command patterns to enable:**
- `Bash(npm run build *)` -- allow build commands
- `Bash(npm run test *)` -- allow test execution
- `Bash(git pull *)` -- allow pulls
- `Bash(bun run build:*)` -- pattern-matched build scripts

### Permission Deny-Lists

Configure deny rules in `~/.claude/settings.json` to block dangerous commands entirely:

```json
{
  "permissions": {
    "deny": ["rm", "DROP TABLE", "DELETE FROM"]
  }
}
```

**Permission levels:**
- `permissions.deny` -- Blocks commands entirely, cannot be overridden
- `permissions.ask` -- Requires user confirmation before execution

Settings-level deny rules take precedence over `--dangerously-skip-permissions`. Even with that flag, denied commands will not execute.

### Sandbox Mode

```bash
/sandbox
```

Restrictions when active:
- Cannot execute Edit, Read, or Bash commands on paths outside the sandbox
- Network access is restricted
- Explicit permission required for additional paths

**Layered protection strategy:** Combine sandbox + permission deny-lists + hooks for comprehensive safety.

### Audit Your Approved Commands

Periodically review the `"permissions"` configuration in `settings.json` to check which commands are allowed to auto-run. This prevents permission creep and maintains security hygiene.

### Using --dangerously-skip-permissions

```bash
claude --dangerously-skip-permissions
```

This removes all safety guardrails for file modifications and command execution. Use only when:
- Working inside a Docker container or isolated environment
- You have version control in place as a safety net
- The task requires long-running autonomous work where permission prompts would be impractical

Boris Cherny's approach: manage permissions strategically via `/permissions` rather than using `--dangerously-skip-permissions`. Enable commonly-used safe bash commands individually. Reserve the skip flag only for sandboxed environments.

One author (Steve Sewell, Builder.io) reports using `--dangerously-skip-permissions` for weeks without issues in normal development, but this requires comfort with fully autonomous operations.

### Prompt Injection and Data Exfiltration Risks

A community experiment demonstrated how a single crafted email caused an AI agent to exfiltrate private inbox data to an attacker address -- using only natural language, no code exploits. This highlighted three principles the community now calls the "lethal trifecta" (via Simon Willison):

**Never give an AI agent simultaneous access to:**
1. Private data (email, files, credentials)
2. Untrusted content it processes (emails, web pages)
3. External communication channels (SMTP, HTTP requests)

When all three are present, prompt injection becomes a data exfiltration vector. This is an architectural limitation of current LLMs -- no model version is immune, including Opus 4.5.

**Practical mitigations from community discussion:**

- **Gate outbound communication** -- Configure SMTP or API gateways to restrict outbound sends to a whitelist of addresses. Redirect everything else to the owner for review.
- **Separate read and write pipelines** -- If an agent reads untrusted content, it should not have direct write/send capabilities in the same execution context. Use a separate AI request for evaluating content vs. taking actions.
- **Deploy a guardrail proxy model** -- Insert a secondary AI or rule-based filter between the agent and its tools to evaluate whether proposed actions are safe.
- **Pre-screen untrusted content** -- Use prompt injection detection tools (LLMGuard, Azure Prompt Shields, SentinelOne, Paubox) to scan emails and web content before the agent processes them.
- **Use hooks for 2FA-style validation** -- Claude Code's hooks system can enforce checks before and after every tool invocation. One user suggested a crypto-signing approach where every consequential action requires verification through a hook.
- **Run agents as dedicated restricted users** -- Use OS-level user permissions so the agent cannot access resources beyond its scope. Mirror repos locally (e.g., Gitea) rather than granting direct access to production services.
- **Assume the agent will be tricked** -- Design systems under the assumption that prompt injection will succeed. Build external controls that limit damage regardless of what the LLM decides to do.
- **Never connect agents to your primary email** -- Use dedicated, isolated accounts with minimal permissions if email integration is required.

**Delimiter/key-based trust is insufficient:** Wrapping trusted instructions in special tokens or secret keys can be bypassed by attackers who fake tool calls, thinking blocks, or verification steps.

## Details

### Safety Hierarchy

From least to most autonomous:

1. **Default mode:** Claude suggests changes and waits for permission
2. **Auto mode:** Claude edits files without permission, still asks for bash commands
3. **Selective permissions:** Specific commands pre-approved via `/permissions`
4. **Sandbox mode:** Restricted to working directory, no external access
5. **Skip permissions:** All guardrails removed (`--dangerously-skip-permissions`)
6. **Skip permissions + container:** Full autonomy inside an isolated Docker environment

### Preventing rm -rf Disasters

Inspired by a Reddit incident where a user accidentally deleted their entire home directory. Always configure deny rules for destructive commands, especially on systems where Claude has elevated access.

### Threat Vectors for Agent-Connected Systems

Community members identified two primary threat vectors when agents browse the web or process untrusted content:

1. **Web browsing with prompt injection leading to data exfiltration** -- The agent reads a page containing hidden instructions and sends private data to an attacker-controlled endpoint.
2. **Web browsing with prompt injection leading to machine compromise** -- The agent reads a page containing hidden instructions and executes destructive or unauthorized commands on the host.

These risks apply broadly to any AI email management tool or AI-driven browser, not just Claude Code specifically. Users connecting AI to tools like Superhuman, Shortwave, or any email automation should evaluate these vectors.

### Hooks for Sensitive Data Filtering

Use `UserPromptSubmit` and `PreToolUse` hooks to filter sensitive information before it reaches the model:

- Scan prompts for API keys, credentials, and sensitive patterns
- Block file reads of credential files
- Filter environment variables containing secrets

See [11-automation-devops.md](./11-automation-devops.md) for hook configuration details.

### Network Debugging and Sandboxing

Use proxy settings to inspect and control network traffic from background agents:

```json
{
  "HTTPS_PROXY": "<proxy-url>",
  "HTTP_PROXY": "<proxy-url>"
}
```

### Enterprise Key Management

Use `apiKeyHelper` for enterprise API key management with usage-based pricing:

```json
{
  "ANTHROPIC_API_KEY": "<key>",
  "apiKeyHelper": "<helper-command>"
}
```

### Smart Routing Security

If using third-party routing middleware (claude-code-router, RouterLab), verify security practices. The claude-scionos runner uses ephemeral, memory-only authentication where the token is never written to disk and is wiped from memory when the process terminates.

## Sources

- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5
- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://www.builder.io/blog/claude-code
- https://sidbharath.com/claude-code-the-complete-guide/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://www.reddit.com/r/ClaudeCode/comments/1qnsn9t/how_a_single_email_turned_my_clawdbot_into_a_data/
- https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/
- https://github.com/protectai/llm-guard
