# How a Single Email Turned My ClawdBot Into a Data Leak

- **Source**: [Reddit r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qnsn9t/how_a_single_email_turned_my_clawdbot_into_a_data/)
- **Author**: u/RegionCareful7282
- **Score**: 683
- **Medium article**: https://medium.com/@peltomakiw/how-a-single-email-turned-my-clawdbot-into-a-data-leak-1058792e783a

## Post Content (TL;DR)

Ran a prompt injection experiment on my own ClawdBot setup. Sent myself an email designed to confuse the AI about who was talking. Asked it to read my inbox. It grabbed 5 emails and sent them to the attacker address I put in the email. Whole thing took seconds. No exploits, just words. Wrote it up because people should probably know about this before connecting AI to their email.

---

## Key Comments and Discussion

### The Lethal Trifecta (u/bitmonkey79, score: 4)

> The lethal trifecta for AI agents: private data, untrusted content, and external communication.

References Simon Willison's article: https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/

This frames the core issue: when an AI agent has simultaneous access to (1) private data, (2) untrusted content it processes, and (3) the ability to communicate externally, prompt injection becomes a data exfiltration vector.

### Model Version Does Not Matter (u/wizardwusa, u/LoadZealousideal7778)

The original experiment used Sonnet 3.7. When challenged, the author re-ran with Claude 4.5 and got the same result. Multiple commenters confirmed this is an architectural limitation of current LLMs, not a model-specific bug.

> u/LoadZealousideal7778: "Doesn't matter. Opus 4.5 can be prompt injected, it's an inherent weakness of our current architecture."

> u/LoadZealousideal7778: "The model cannot differentiate between context and instruction. That would require a completely new architecture that does not yet exist."

### Can Secret Keys or Delimiters Fix This? (u/rebo_arc, score: 20)

> Couldn't some kind of secret work where an AI only takes instructions if it is prepended and postpended by a unique specific key? Anything else is considered "untrusted".

Responses were skeptical:

- u/aaronbassettdev: Attackers can fake tool calls, fake `<thinking>` blocks, and fabricate verification to bypass any delimiter-based approach.
- u/hakanavgin: Tags like `<user_message>` already exist, but since the unsafe content sits in the model's context window, the model can still act on tokens within the unsafe section regardless of tags.
- u/wannabestraight: Private-key-style system prompts are "not 100% foolproof, but better than nothing."

### Deterministic Code Still Matters (u/armeg, score: 31)

> It's like people completely forgot deterministic code exists lmao. It's agent this, and agent that now.

Core point: not everything needs to be an AI agent. Deterministic validation, whitelists, and traditional security controls should gate sensitive operations.

### Practical Mitigations Discussed

**Gate outbound email (u/graymalkcat, score: 6)**:
> I have my own assistant. It can read and write email as much as it wants. The only thing is I've gated the email server so nothing can actually get sent out to any address but mine. The SMTP server will just redirect it.

**Separate the pipeline (u/AppealSame4367, score: 13)**:
> Why would you allow a bot to do any actions based on mail content? You should at least separate the pipeline into a separate AI request for evaluating content and doing things and make the second bot be very skeptical of anything the first one says. Maybe even have an additional evaluator AI and a normal algorithm for basic checks.

**Require manual confirmation (u/acutelychronicpanic)**:
> Always always sanitize inputs. And for any sensitive stuff, require manual confirmation.

**Guardrail proxy model (u/Porespellar)**:
> Guardrail proxy model inserted in the pipeline. Adds a little latency, but it could prevent this. It could definitely prevent the data exfiltration part. Or maybe even a simple regex filter-pipe.

**Run as restricted user / sandboxing (u/bigh-aus, score: 7)**:
> I'm starting to think about guidelines for running it. Sending emails -- exfil risk. Running anything as a non-privileged user locally -- risks compromising the machine. Need some heavily locked down linux machine where a superuser has to install any programs manually. Accessing other machines on your network -- compromise risk. Instead of using GitHub, use Gitea locally, and mirror those individual repos to the cloud.

> u/Redoudou: Maybe why it's good to make ClawdBot run with its own user with its own system restrictions.

**Prompt injection scanning services (u/ridablellama, score: 3)**:
Listed several tools for pre-screening emails before AI processing:
- Paubox Email Suite -- scans for adversarial instructions, hidden text in HTML
- SentinelOne -- detects indirect prompt injections in real time
- Trend Vision One ZTSA -- prompt injection detection via monitoring
- Azure AI Content Safety (Prompt Shields) -- unified API for direct/indirect injection detection
- DataDog LLM Observability -- flags injections via semantic similarity with known jailbreaks

**LLM Guard (u/Tall_Instance9797)**:
> Run something like LLMGuard (https://github.com/protectai/llm-guard) which sanitizes emails for prompt injection attacks before they hit the bot.

**Kubernetes isolation (u/Crafty_Disk_7026)**:
> Next time be smart and run it in an isolated safe environment. (References: https://github.com/imran31415/kube-coder)

**Anti-injection instructions in system prompt (u/betahost)**:
> I added special instructions to ClawdBot regarding prompt injection in its instructions but I also don't give it access to my email.

**Hooks-based 2FA approach (u/Crypto_gambler952)**:
> The key is knowing who you can trust. Give the AI a 2FA or crypto signing tool for every consequential action. Claude Code already has hooks that are forced to run before and after tool use.

### Broader Security Observations

**u/bigh-aus** outlined the two main threat vectors:
1. Web browsing with prompt injection leading to data exfiltration
2. Web browsing with prompt injection leading to machine/VM compromise

**u/OofWhyAmIOnReddit**: "This does make me a bit nervous about a lot of the AI email management tools right now (Superhuman / Shortwave / etc.)"

**u/zenchess**: "Using an AI-driven browser is very, very dangerous" (this has been a known issue for a long time).

**u/theDatascientist_in**: "Never connect your AI tools with email."

---

## Extracted Security Tips

### Architecture-Level

1. **Avoid the lethal trifecta**: Never give an AI agent simultaneous access to private data, untrusted content, and external communication channels without guardrails.
2. **Prompt injection is an architectural limitation**: Current LLM architectures cannot reliably distinguish between context and instruction. No model version is immune. Do not rely on model intelligence alone for security.
3. **Use deterministic code for security-critical decisions**: Whitelists, regex filters, and traditional validation logic should gate sensitive operations -- not the LLM itself.
4. **Separate read and write pipelines**: If an agent reads untrusted content, it should not have direct write/send capabilities in the same execution context.

### Operational Controls

5. **Gate outbound communication**: Configure SMTP or API gateways to restrict outbound emails to a whitelist of addresses. Redirect all other sends to the owner for review.
6. **Require manual confirmation for sensitive actions**: Any action that sends data externally, modifies files, or accesses credentials should require human-in-the-loop approval.
7. **Run agents as restricted users**: Use OS-level user permissions and sandboxing (containers, VMs, Kubernetes) to limit what an agent can access.
8. **Use network isolation**: Run agents on machines that cannot access your broader network. Mirror repos locally rather than granting direct access to production services.

### Defense-in-Depth

9. **Deploy a guardrail proxy model**: Insert a secondary AI or rule-based filter between the agent and its tools to evaluate whether proposed actions are safe.
10. **Pre-screen untrusted content**: Use prompt injection detection tools (Paubox, SentinelOne, Azure Prompt Shields, LLMGuard) to scan emails and web content before the agent processes them.
11. **Add anti-injection instructions to system prompts**: While not foolproof, explicit instructions about ignoring embedded instructions in content provide a baseline defense.
12. **Use hooks for pre/post-tool validation**: Tools like Claude Code's hooks system can enforce checks before and after every tool invocation, acting as programmatic guardrails.
13. **Treat delimiter/key-based trust as insufficient**: Wrapping trusted instructions in special tokens or secret keys can be bypassed by attackers who fake tool calls, thinking blocks, or verification steps.

### Mindset

14. **Assume the agent will be tricked**: Design systems under the assumption that prompt injection will succeed. Build external controls that limit damage regardless of what the LLM decides to do.
15. **Never give agents access to your primary email**: Use dedicated, isolated accounts with minimal permissions if email integration is required.
16. **Audit agent capabilities against threat model**: For each tool/permission granted, ask: "What is the worst thing that could happen if the agent is tricked into misusing this?"
