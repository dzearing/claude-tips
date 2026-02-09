# Learning and Community

## Purpose

Claude Code is evolving rapidly -- features like syntax highlighting, fuzzy search, async subagents, and Skills have all shipped in recent months. The developers who get the most value are the ones who practice consistently, stay current with releases, and share their learnings. This document covers how to improve your proficiency, where to find community resources, and the broader mindset shifts happening in AI-assisted development.

## How It Helps

- Consistent practice builds intuition for when and how to use Claude effectively
- Community resources provide tested workflows and configurations to adopt
- Staying current prevents using outdated patterns when better features exist
- Sharing knowledge creates feedback loops that improve the entire ecosystem
- Understanding mindset shifts helps you focus your skill development

## What You Can Do

### Practice Deliberately

"The best way to get better is by using it." Like the "10,000 hour rule" but for tokens. Key practices:

- Try tasks you think models cannot handle -- develop intuition through experimentation
- Use Opus 4.5 for best results during learning
- Track which prompt structures produce better results
- Revisit and adapt strategies based on accumulated experience

### Invest in Your Workflow

Personalize your setup incrementally:

1. Start with a basic CLAUDE.md (see [01-claude-md-configuration.md](./01-claude-md-configuration.md))
2. Create your first custom command for a task you do often
3. Add terminal aliases and keyboard shortcuts (see [08-terminal-setup.md](./08-terminal-setup.md))
4. Explore voice input for hands-free operation
5. Set up hooks for automated formatting (see [11-automation-devops.md](./11-automation-devops.md))
6. Build project-specific kits that you can copy to new projects

"The setup takes an afternoon. The savings compound every day."

### Build Domain Expertise

"You need to be a DOMAIN expert. That's your moat against AI agents who can 'just' write code." Domain expertise is the true competitive advantage, not coding ability or prompting skill alone.

- AI makes domain-knowledge bugs regularly (see: poker solver case study where surface-level correctness hid incorrect domain logic)
- Your expertise determines the quality of guidance you give the model
- Converting unknown unknowns to known unknowns is the core skill

### Shift Focus to Software Engineering

Since implementation is much faster now, invest more time in:
- System design and planning
- Requirements analysis
- Good naming and documentation
- Refactoring and code quality
- Tests and typed annotations
- Taste refinement

### Stay Current

Track releases regularly. Recent additions include:
- Syntax highlighting (v2.0.71)
- Fuzzy file search 3x faster (v2.0.72)
- Chrome integration with GIF recording (v2.0.72)
- Async subagents (v2.0.60)
- Conditional project rules (v2.0.64)
- Prompt suggestions (v2.0.73)
- Send tasks to web with `&` (v2.0.45)

### Share Your Knowledge

Document learnings, share tools, contribute to community resources. The AI coding space benefits from shared configurations, command templates, and workflow patterns.

## Details

### Community Resources

| Resource | Description |
|----------|-------------|
| [awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Growing collection of slash-commands and workflows |
| [Anthropic Official Skills Repository](https://github.com/anthropics/claude-code) | Ready-to-use skill examples |
| [Obra Superpowers Library](https://github.com/anthropics/claude-code) | Spec-driven skills for TDD, debugging, code review |
| [Superpowers (Official Marketplace)](https://github.com/obra/superpowers) | Now on Anthropic's official Claude plugins marketplace, vetted by their team |
| [Get Shit Done (GSD)](https://github.com/glittercowboy/get-shit-done) | Autonomous workflow orchestrator (research -> plan -> execute -> verify) |
| [Kata](https://github.com/gannonh/kata) | Skills-based GSD fork with natural language workflow triggers |
| [CASS Memory System](https://github.com/Dicklesworthstone/cass_memory_system) | Alternative episodic memory system for cross-session context |
| [Skills Registry](https://agentskills.io/home) | Cross-platform skill discovery |
| [MCP Registry](https://registry.modelcontextprotocol.io/) | MCP server discovery |
| [Reddit: ClaudeAI](https://www.reddit.com/r/ClaudeAI/) | Community discussions and command sharing |
| [Reddit: ClaudeCode](https://www.reddit.com/r/ClaudeCode/) | Dedicated subreddit for Claude Code usage patterns |
| [Anthropic Docs: Slash Commands](https://docs.anthropic.com/en/docs/claude-code/slash-commands) | Official command documentation |
| [Lenny's Newsletter](https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code) | 500+ practitioner use cases for non-code and code applications |

### Superpowers: The Community's Top Plugin

Superpowers (by Obra) is now listed on Anthropic's official Claude plugins marketplace, having been vetted by the Anthropic team. The community widely regards it as the single most valuable plugin for Claude Code. Its core capabilities include:

- **Subagent-driven development workflow** -- Structured workflows using subagents for planning, implementation, and review steps
- **Brainstorming skill** -- Start tasks with "use the brainstorming skill to ___" to get clarifying questions, design docs, plans, then implementation
- **Debugging skill** -- A dedicated debugging workflow praised by multiple users
- **Episodic memory** -- Stores context across sessions (described as "hit or miss" by some)

**Effective usage patterns:**
- Constantly remind Claude to use Superpowers -- it tends to skip steps (especially review steps) unless reminded each time
- Combine multiple skills in one prompt (e.g., "use both superpowers writing-plans and front-end design and load them before starting")
- Prefer parallel sessions over agents when Superpowers offers worktrees
- Start every non-trivial task with the brainstorming skill, even seemingly straightforward ones
- Automate the "remember to use superpowers" reminder via a `usersubmithook`

**Known limitation:** Subagent-driven work is token-heavy. Sonnet on the Pro plan can hit the daily limit in approximately 30 minutes of continuous subagent work.

### GSD (Get Shit Done): Autonomous Workflow Orchestrator

GSD automates the full development cycle in phases: research, planning, checking, executing, and verification. It now officially supports OpenCode in addition to Claude Code, enabling free usage with OpenCode's free models.

**Budget configuration (important for non-$200/month plans):**
- Use `/gsd:settings` to switch to "budget" model profile
- Toggle off expensive phases: "research before planning", "checking after planning", and "verification after executing"
- GSD at maximum settings burns through rate limits extremely fast -- multiple users reported maxing their weekly limit

**When GSD may not fit:**
- Experienced developers often find direct Claude Code usage with plan mode yields better results with more control and fewer tokens
- GSD is better suited for users who want to type a prompt and walk away ("vibe coding") than for developers who want granular control over planning and implementation decisions

GSD is an orchestrator that uses the Claude Code CLI as its harness. It is not an external provider and is not subject to Anthropic's ban on non-ClaudeCode harnesses.

### Lenny's Newsletter: Non-Developer Community Growth

Lenny Rachitsky's newsletter (with 500+ practitioner contributions) argues that the most important mental shift is reframing Claude Code as "Claude Local" or "Claude Agent" rather than a coding tool. The "Code" in the name creates a barrier for non-developers. In reality, it handles any task involving files, system operations, research, or automation.

Notable non-developer use cases from the newsletter:
- Voice-to-article pipeline (recording voice memos on walks, getting publication-ready articles)
- Job description and hiring collateral generation using planning mode
- Customer call transcript synthesis via MCPs connecting Fireflies, Linear, and Notion
- Self-driving documentation using Playwright browser automation
- Meeting recording behavioral analysis
- Weekly self-improvement loops comparing journal entries against Git history

### Emerging Trends and Predictions

**Agent Harnesses (2026):** The concept that standalone agents give way to framework-based systems managing multiple specialized agents. Rather than a single AI doing everything, "harness" systems orchestrate teams of agents with different specializations. The GSD-to-OpenCode expansion is an early example of this -- a single orchestration framework supporting multiple underlying agent harnesses.

**Cross-Tool Ecosystem:** Community frameworks are converging on native Claude Code integration patterns (slash commands, plugins, skills) rather than complex RAG or semantic search layers. Users express clear preference for tools that work within Claude Code's system. The progression from Superpowers (skills-based) to GSD (orchestrator) to Kata (skills-based GSD fork) shows rapid iteration toward the right abstraction level.

**Code Purity Shift:** As AI generates more code at higher velocity, the development community may shift toward accepting functional code over pristine code. Traditional emphasis on clean, elegant codebases may be deprioritized in favor of speed and output volume.

**Trust-Based Workflows:** Developers are increasingly dispatching multiple agents in parallel and accepting output with minimal inspection, representing growing confidence in agent capabilities.

**Swarming (Coming 2026):** Anthropic has confirmed enhanced multi-agent coordination as a focus area.

### Adoption Insights from an Immersive Team Workshop

A large mobile team at a major tech company ran an 8-day immersive AI adoption initiative and distilled several principles for sustained adoption that align with and extend the community trends above. (Internal case study: team AI adoption workshop, January 2026)

- **Immersion over gradual rollout.** Modality shifts need protected time and space. The team found that gradual adoption stalls at 30-40% -- developers revert to old habits when the surrounding environment does not reinforce the new workflow. Concentrated immersion drove adoption past this plateau.
- **Decentralized experimentation over standardization.** In a rapidly evolving space, personal discovery beats top-down best practices. The team encouraged a "Wild West" approach to prompt iteration rather than prescribing standard workflows, and the diversity of approaches surfaced techniques that no single architect would have designed.
- **Peer learning builds community and sustained momentum.** Shared exploration creates collective excellence that persists beyond individual motivation. The team's workshop format -- led by peers who had already adopted agent-first workflows -- built social reinforcement that continued after the formal sessions ended.
- **Growth mindset over gatekeeping.** Removing barriers to sharing and creating psychological safety accelerates learning across the team. When contributors felt safe to share imperfect prompts and experimental workflows, the rate of knowledge accumulation increased significantly.

### The Era of Personalized Software

AI coding tools enable customization to match individual workflows. Every developer's setup becomes unique -- tailored commands, hooks, skills, and configurations that reflect their specific work patterns and preferences.

### Game Development as a Learning Path

A non-developer's 6-month journey building a full game with Claude Code and Godot produced practical lessons for the learning community. Key takeaways for learners:

- **Keep code files under 500 lines** -- Above that, AI starts making mistakes. The 300-400 line range is the sweet spot where Claude holds full file logic without drift.
- **Use skills instead of nested CLAUDE.md files** -- Nested CLAUDE.md files in subfolders consume context on every session start. Skills load on-demand based on relevance, saving tokens.
- **Start new sessions for each update** -- Never compact, always clear. CLAUDE.md and skills make fresh sessions viable.
- **Teach Claude to run the application and customize debug traces** -- Have Claude generate targeted debug output so it gets the right info for each run. Saves time and tokens.
- **Accept "casino days"** -- Some days Claude produces good output; other days, garbage. Learn to recognize bad days and try again tomorrow instead of burning through rate limits.

### Judge by Final PR Quality

Evaluate tools and workflows by the final PR quality, not how the code was generated. The aesthetics of the process matter less than the end result. One author's perspective: "The 'you're absolutely right!' sycophancy isn't a notable bug; it's a signal that you're too in-the-loop."

### Recommended Learning Path

1. **Week 1:** Install Claude Code, run `/init`, learn `/clear` and `/compact`
2. **Week 2:** Create your first CLAUDE.md, try Plan mode, experiment with git workflows
3. **Week 3:** Build 2-3 custom slash commands, set up terminal aliases
4. **Week 4:** Configure hooks for auto-formatting, explore MCP servers
5. **Ongoing:** Add skills as needed, try parallel sessions, refine based on experience

### The Compound Effect

"Any single tip saves a few minutes. Combined, they transform the workflow. A well-configured project with CLAUDE.md, custom commands, hooks, and proper prompting ships features 5-10x faster than vanilla Claude Code."

With voice input and parallel sessions added: "You're not 5x faster -- you're operating at a completely different scale."

## Sources

- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://aicodingdaily.substack.com/p/claude-code-tips-and-wild-2026-predictions
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.oreateai.com/blog/claudemd-best-practices-reddit/3a29cdd605ebb2025681e71218021b5e
- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://www.reddit.com/r/ClaudeCode/comments/1qgkupf/superpowers_is_now_on_the_official_claude/
- https://www.reddit.com/r/ClaudeCode/comments/1qk3f46/gsd_now_officially_supports_opencode/
- https://www.reddit.com/r/ClaudeCode/comments/1qknr1v/what_i_learned_building_a_full_game_with_claude/
- https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code
- https://github.com/obra/superpowers
- https://github.com/glittercowboy/get-shit-done
- Internal case study: team AI adoption workshop (January 2026)
