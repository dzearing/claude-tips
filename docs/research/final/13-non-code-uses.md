# Non-Code Uses

## Purpose

Claude Code is fundamentally a general-purpose agent that happens to be good at coding. Because it has direct access to your terminal, filesystem, and external tools, it functions as a universal interface to your computer. Writing assistance, research, data analysis, video editing, and more become accessible through the same terminal interface you use for development.

## How It Helps

- Writing and editing content without switching tools
- Research that is more effective than Google for specific technical queries
- Data analysis including non-traditional data sources (DNA, financial records)
- Media manipulation via command-line tools (ffmpeg, Whisper)
- Universal interface to any tool accessible via terminal commands

## What You Can Do

### Writing Assistant

Use Claude Code for editing, refining, and structuring written content:

1. Provide context and detailed voice instructions for first draft
2. Collaborate line-by-line on phrasing
3. Use markdown as the primary format (most efficient for Claude)

For platforms that do not accept markdown, paste into Notion first to preserve formatting and links.

### Research Tool

Claude Code is often more effective than Google for specific queries:

- **GitHub Actions failures** -- Give Claude the CI logs, it identifies root causes faster than searching Stack Overflow
- **Sentiment and market analysis** -- Analyze data sets and provide summaries
- **Codebase exploration** -- "How does authentication work in this project?"
- **Public information discovery** -- Finding specific technical details across documentation

**Key principle:** Provide Claude with the right information access methods (web search, file access, CLI tools) rather than expecting it to know everything from training data.

### Universal Computer Interface

Claude Code can operate any tool accessible from the terminal:

| Task | Tool |
|------|------|
| Video editing | ffmpeg |
| Audio transcription | Whisper |
| Data analysis | Python scripts, pandas |
| Image manipulation | ImageMagick |
| PDF processing | Various CLI tools |
| Internet access | curl, web search MCP |
| File format conversion | Any CLI converter |

Example: "Take this video file, extract the audio, transcribe it with Whisper, and create a summary document."

### DNA Analysis Case Study

One user (Pietro) demonstrated feeding raw DNA data from an ancestry test into Claude Code. Claude parsed the data, analyzed genetic markers, and identified health-related genes worth monitoring. This illustrates Claude Code's capability as a general-purpose analysis tool beyond software development.

### Data Analysis

Feed Claude structured data files and ask for analysis:

```
Analyze this CSV of sales data. Identify trends, anomalies, and create
a summary report with visualizations saved as PNG files.
```

Claude can write and execute Python scripts with pandas, matplotlib, or other analysis libraries to process your data.

### Game Development (Non-Developer Case Study)

A user with zero programming background built and shipped a full retro football manager game across three platforms (Android, PC, Web) over 6 months using Claude Code and Godot/GDScript. The project included 120 GDScript files, match simulation with live events, transfers, contracts, finances, European cups with group stages and knockout rounds, a stadium editor, and career mode -- all in approximately 360 hours of work.

Beyond the game itself, Claude Code also handled:
- Two trilingual websites (German, English, Turkish) with HTML, CSS, SEO structure, and legal pages
- All marketing content: Reddit posts, store descriptions, changelogs for 30+ versions, Discord announcements
- Translation across three languages

Claude Code handled GDScript/Godot particularly well, suggesting the model is well-trained on this stack. The user tried and dropped MCP servers and plugins early on, finding the base tool sufficient.

**Key insight:** The total output was a game, two websites, and all marketing material across three platforms and three languages -- demonstrating Claude Code as a full project delivery tool, not just a code generator.

### Content Writing and Publishing Workflows

Lenny Rachitsky's newsletter documents a voice-to-article pipeline where non-developers record voice memos during walks, feed recordings into Claude Code, and get full articles that match their personal writing voice. Claude Code can also auto-generate LinkedIn-adapted versions and publication-ready files with templates.

For more structured content work, Teresa Torres uses Claude Code in VS Code for an end-to-end writing workflow: outline iteration, research integration with citations, section-by-section feedback on grammar and style, and revision loops until completion.

### System Diagnostics and Troubleshooting

Claude Code can diagnose system performance issues by checking load averages, memory pressure, disk space, stuck processes, and swap activity. It provides personalized recommendations based on actual disk contents rather than generic advice.

Example prompts:
- "How can I clear some storage on my computer?"
- "Check my system load averages, memory pressure, disk space, stuck processes, and swap activity."

### Business and Sales Applications

- **Domain name brainstorming** with availability checks across multiple TLDs
- **Lead identification** by analyzing your app's source code to identify ideal pilot companies and relevant LinkedIn contacts
- **Competitor ad research** to extract ad copy and creative strategies
- **Job description generation** using planning mode with internal docs and competitor examples as reference material
- **Customer call transcript synthesis** by connecting Claude Code to Fireflies, Linear, and Notion via MCPs

### Self-Improvement and Personal Analysis

- **Meeting recording analysis** -- Download recordings and ask Claude Code to identify behavior patterns (e.g., "Tell me all times I subtly avoided conflict")
- **Weekly journal-vs-Git analysis** -- Compare journal entries (stated intentions) against Git commit history (actual work) to identify gaps, triggered via a slash command
- **DIY construction planning** -- Generate design specifications and detailed material lists for building projects

### Background Explanations for Stakeholders

Create background async agents to explain technical changes to non-technical stakeholders. Claude's communication abilities make it effective for documentation and explanation tasks that do not require your direct attention.

## Details

### Markdown Is the Best Format

Markdown is the most efficient format for new documents when working with Claude Code. It outputs and processes markdown naturally. For content destined for Google Docs, Notion, or other platforms, create in markdown first and then convert or paste.

**Notion tip:** Use Notion to preserve links when pasting. When text with links does not preserve formatting in other platforms, route through Notion first.

### Research Document Pattern

When using Claude for research, structure output with a consistent format:

```markdown
# Research: <Topic>

**Date:** <YYYY-MM-DD>
**Status:** Complete

## Problem Statement
<Describe the problem>

## Key Findings
<Summarize solutions and approaches>

## Recommended Approach
<Your recommendation>

## Sources
- [Source Title](URL) - Brief description
```

### Non-English Prompting

Claude Code handles prompts in non-English languages well. Code output stays in English (variable names, comments), but explanations come in your native language. You may need to remind it every 2-3 prompts. One user built an entire game and two websites while prompting in German, finding it more natural than forcing English at 11 PM.

### The Universal Interface Philosophy

"Claude Code is fundamentally a tool for general computer automation. Anything achievable by typing commands becomes automatable." The feature stack -- from external connections (MCP) through explicit workflows (commands) to automatic behaviors (skills) -- transforms it from a coding assistant into a customizable agent framework.

Lenny Rachitsky's newsletter argues the most important mental shift is to stop thinking of Claude Code as a coding tool entirely. Think of it as an intelligent AI agent running locally on your machine with direct file system access. The "Code" in the name creates a barrier for non-developers who assume it is not for them.

## Sources

- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://aicodingdaily.substack.com/p/claude-code-tips-and-wild-2026-predictions
- https://alexop.dev/posts/understanding-claude-code-full-stack/
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qknr1v/what_i_learned_building_a_full_game_with_claude/
- https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code
