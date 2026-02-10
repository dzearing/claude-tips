# Claude Code Research Compendium

A comprehensive, deduplicated collection of Claude Code tips, best practices, and workflows extracted from 20+ community sources including blog posts, articles, GitHub repositories, and newsletter digests. Content is organized by topic and ordered by impact to developers -- the foundational mindset shift comes first, followed by highest-leverage configuration, then progressively more specialized topics.

## Table of Contents

| # | Document | What You Will Learn |
|---|----------|-------------------|
| 00 | [The Developer Mindset Shift](./final/00-mindset-shift.md) | The fundamental shift from manual coding to AI-augmented development -- letting Claude execute for you, not just advise. This changes everything else. |
| 01 | [CLAUDE.md Configuration](./final/01-claude-md-configuration.md) | How to set up global, project, and nested CLAUDE.md files -- the single highest-impact configuration for Claude Code |
| 02 | [Context Management](./final/02-context-management.md) | Managing the 200k token context window with /clear, /compact, handoff documents, forking, and session strategies |
| 03 | [Skills, Commands, and Plugins](./final/03-skills-commands-plugins.md) | When to use CLAUDE.md vs Skills vs Slash Commands vs Subagents vs Plugins, with configuration examples for each |
| 04 | [Parallel Workflows](./final/04-parallel-workflows.md) | Running multiple Claude instances via terminal tabs, git worktrees, separate clones, subagents, and web sessions |
| 05 | [Git and Code Review](./final/05-git-and-code-review.md) | Delegating Git operations, draft PRs, interactive code review with gh CLI, and automated PR reviews |
| 06 | [Testing and Verification](./final/06-testing-and-verification.md) | TDD workflows, write-test cycles, browser testing, hook-based test enforcement, and verification approaches |
| 07 | [Prompt Engineering](./final/07-prompt-engineering.md) | Plan mode, phased execution, surgical prompting, referencing patterns, and structured debugging context |
| 08 | [Terminal Setup](./final/08-terminal-setup.md) | Aliases, status line customization, keyboard shortcuts, voice input, external editor integration |
| 09 | [MCP and Integrations](./final/09-mcp-and-integrations.md) | Adding MCP servers, Chrome/Playwright integration, end-to-end workflows, and managing MCP context costs |
| 10 | [Token Optimization](./final/10-token-optimization.md) | System prompt trimming, lazy-load MCP, smart model routing, auto-compact tuning, and cost management |
| 11 | [Automation and DevOps](./final/11-automation-devops.md) | Hook configuration for formatting/linting/testing, CI/CD debugging, GitHub Actions, and continuous improvement loops |
| 12 | [Containers and Safety](./final/12-containers-and-safety.md) | Docker isolation, sandbox mode, permission deny-lists, --dangerously-skip-permissions, and layered security |
| 13 | [Non-Code Uses](./final/13-non-code-uses.md) | Writing assistance, research, data analysis, media manipulation, and Claude as a universal computer interface |
| 14 | [Creator Workflow](./final/14-creator-workflow.md) | Boris Cherny's (Claude Code creator) daily setup, model selection, plan-first methodology, and team workflow |
| 15 | [Learning and Community](./final/15-learning-and-community.md) | Getting better at Claude Code, community resources, emerging trends, recommended learning path |

## How to Use This Compendium

**If you're new to Claude Code**: Start with document 00 (Mindset Shift), then 01 (CLAUDE.md). These two alone will transform your productivity.

**If you're already using Claude Code**: Scan the table above and jump to topics where you want to level up. Each document is self-contained.

**If you're setting up a team**: Documents 00, 01, 03, 05, and 06 form the core team workflow foundation.

## Sources

All content was extracted and synthesized from these sources:

- [Oreate AI -- CLAUDE.md Best Practices (Reddit-sourced)](https://www.oreateai.com/blog/claudemd-best-practices-reddit/3a29cdd605ebb2025681e71218021b5e)
- [InfoQ -- Claude Code Creator Workflow (Boris Cherny)](https://www.infoq.com/news/2026/01/claude-code-creator-workflow/)
- [VentureBeat -- Creator of Claude Code Revealed His Workflow](https://venturebeat.com/technology/the-creator-of-claude-code-just-revealed-his-workflow-and-developers-are)
- [Builder.io -- How I Use Claude Code (Steve Sewell)](https://www.builder.io/blog/claude-code)
- [Dev.to -- 15 Claude Code Best Practices from 6 Projects (Lukas Fryc)](https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb)
- [GitHub -- ykdojo/claude-code-tips (45 Tips)](https://github.com/ykdojo/claude-code-tips)
- [Medium -- Maximize Productivity with Claude Code (Shivang Tripathi)](https://medium.com/@shivang.tripathii/how-i-use-claude-code-to-maximize-productivity-c853104804d6)
- [Medium -- I Spent Months Building the Ultimate Claude Code Setup](https://medium.com/@sattyamjain96/i-spent-months-building-the-ultimate-claude-code-setup-heres-what-actually-works-ba72d5e5c07f)
- [Medium -- Code 4x Faster with Claude in 2026](https://medium.com/@comeback01/how-to-code-4x-faster-with-claude-in-2026-without-blowing-your-anthropic-budget-42f764bb877d)
- [F22 Labs -- 10 Claude Code Productivity Tips](https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/)
- [AlexOp -- Understanding Claude Code Full Stack](https://alexop.dev/posts/understanding-claude-code-full-stack/)
- [AlexOp -- Claude Code Customization Guide](https://alexop.dev/posts/claude-code-customization-guide-claudemd-skills-subagents/)
- [AI Coding Daily -- Claude Code Tips and 2026 Predictions](https://aicodingdaily.substack.com/p/claude-code-tips-and-wild-2026-predictions)
- [Dev.to -- 24 Claude Code Tips (Advent Calendar)](https://dev.to/oikon/24-claude-code-tips-claudecodeadventcalendar-52b5)
- [Siddharth Bharath -- Claude Code: The Complete Guide](https://www.siddharthbharath.com/claude-code-the-complete-guide/)
- [Shrivu Shankar -- How I Use Every Claude Code Feature](https://blog.sshh.io/p/how-i-use-every-claude-code-feature)
- [Agentic Coding Substack -- 32 Claude Code Tips](https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to)
- [Sankalp -- Experience with Claude Code 2.0](https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/)
- [r/ClaudeCode -- Why AI coding tools accidentally feel perfect for inattentive ADHD brains](https://www.reddit.com/r/ClaudeCode/comments/1qeb6od/why_ai_coding_tools_accidentally_feel_perfect_for/) (score 154)
- [r/ClaudeCode -- CLAUDE.md says 'MUST use agent' - Claude ignores it 80% of the time](https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/) (score 197)
- [r/ClaudeCode -- How Claude Code Auto-Memory works (v2.1.32)](https://www.reddit.com/r/ClaudeCode/comments/1qzmofn/how_claude_code_automemory_works_official_feature/) (score 140)
- [r/ClaudeCode -- Figured out why /compact loses so much useful context](https://www.reddit.com/r/ClaudeCode/comments/1qcjwou/figured_out_why_compact_loses_so_much_useful/) (score 70)
- [r/ClaudeCode -- TDD Workflows: What's Actually Working (Staff Engineer, 14 yrs exp)](https://www.reddit.com/r/ClaudeCode/comments/1qd64xx/tdd_workflows_with_claude_code_whats_actually/) (score 185)
- [r/ClaudeCode -- Reverse-Engineered How Agent Teams Works Under the Hood](https://www.reddit.com/r/ClaudeCode/comments/1qyj35i/i_reverse_engineered_how_agent_teams_works_under/) (score 187)
- [r/ClaudeCode -- Multi-Agent Planning Superpower](https://www.reddit.com/r/ClaudeCode/comments/1qhkfis/just_discovered_a_new_claude_code_superpower/) (score 155)
- [r/ClaudeCode -- Hooks Complete Guide (Most Underrated Feature)](https://www.reddit.com/r/ClaudeCode/comments/1qlzzzf/claude_codes_most_underrated_feature_hooks_wrote/) (score 170)
- [r/ClaudeCode -- Show Me Your /statusline](https://www.reddit.com/r/ClaudeCode/comments/1qycvdu/show_me_your_statusline/) (score 204)
- [r/ClaudeCode -- How to Refactor 50k Lines of Legacy Code Without Breaking Prod](https://www.reddit.com/r/ClaudeCode/comments/1qobg1g/how_to_refactor_50k_lines_of_legacy_code_without/) (score 150)
- [r/ClaudeCode -- How I Built an AI News Agency That Runs Itself (1B+ Tokens Locally)](https://www.reddit.com/r/ClaudeCode/comments/1qv4lqw/how_i_built_an_ai_news_agency_that_runs_itself/) (score 165)
- [r/ClaudeCode -- Claude Code + Playwright CLI = Superpowers](https://www.reddit.com/r/ClaudeCode/comments/1r03a0t/claude_code_playwright_cli_superpowers/) (score 161)
- [r/ClaudeCode -- Token Waste: There Has Got to Be a Better Way](https://www.reddit.com/r/ClaudeCode/comments/1qyt0fo/this_seems_like_a_waste_of_tokens_there_has_got/) (score 208)
- [r/ClaudeCode -- 18 Months & 990k LOC: Agentic Engineering Guide](https://www.reddit.com/r/ClaudeCode/comments/1qthtij/18_months_990k_loc_later_heres_my_agentic/) (score 131)
- [r/ClaudeCode -- Opus Fell Off? Workflow That Kept Code Quality Stable](https://www.reddit.com/r/ClaudeCode/comments/1qnhgcc/opus_fell_off_heres_the_workflow_that_kept_my/) (score 115)
