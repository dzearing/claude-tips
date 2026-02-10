---
name: research
description: Research a URL or topic and assimilate findings into the research compendium
argument-hint: "<url-or-topic>"
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Task
  - WebFetch
  - WebSearch
  - mcp__chrome-devtools__navigate_page
  - mcp__chrome-devtools__take_snapshot
  - mcp__chrome-devtools__evaluate_script
  - AskUserQuestion
---

<objective>
Research a source (URL, Reddit post, or topic) and assimilate new insights into the Claude Code Research Compendium.

Follow the workflow defined in `docs/research/PROCESS.md`. Two distinct phases:
1. **Scraping** -- Fetch and save raw content only. No edits to final docs.
2. **Coordination** -- A single coordinator reads raw content and makes all edits to final docs.
</objective>

<context>
Source: $ARGUMENTS
Process doc: `docs/research/PROCESS.md`
Compendium: `docs/research/`
Privacy rules: `CLAUDE.md`
</context>

<process>

## Phase 1: Scrape

Fetch content from `$ARGUMENTS` and save to `docs/research/raw/`. This phase produces raw files only -- no edits to final documents.

**Determine source type:**

- **Web article (https://...):** Use WebFetch. If it fails (auth, blocked), use Chrome DevTools: `navigate_page` then `take_snapshot`.
- **Reddit (reddit.com/...):** Reddit blocks JSON API and unauthenticated browsers. Use Chrome DevTools: `navigate_page` then `take_snapshot` (user's browser is authenticated).
- **Internal/SharePoint:** Use Chrome DevTools (user is authenticated).
- **Topic (not a URL):** Use WebSearch to find 2-3 sources, then fetch each.

**For multiple URLs or batch scraping:** Launch parallel Task agents (subagent_type: "general-purpose") to scrape simultaneously. Each agent fetches its assigned URL(s) and writes raw files. Agents do NOT edit final documents.

**Save raw content as markdown:**
- Filename: kebab-case in `docs/research/raw/` (e.g., `anthropic-prompt-best-practices.md`)
- Reddit: `docs/research/raw/reddit/r-claudecode-{slug}.md`
- Apply privacy rules from CLAUDE.md to raw content
- Include: source URL, title, author, date, full content, top comments (if applicable)

## Phase 2: Coordinate

After all raw files are saved, launch a single coordinator Task agent (subagent_type: "general-purpose") to assimilate new content into the compendium.

The coordinator prompt should be:

```
You are the coordinator for the Claude Code Research Compendium.

First read these files:
- /Users/dzearing/git/claude-tips/CLAUDE.md (privacy rules)
- /Users/dzearing/git/claude-tips/docs/research/PROCESS.md (workflow rules)
- /Users/dzearing/git/claude-tips/docs/research/readme.md (TOC and document index)

Then read the new raw source file(s): [list paths]

For each final document that needs updates, process ONE at a time:
1. Read the current final document
2. Identify what is genuinely new (not already covered)
3. Make targeted edits using the Edit tool
4. Add source attribution to the Sources section
5. Move to the next document

After all final docs are updated, add new source URL(s) to docs/research/readme.md.

Documents to update: [list of file paths with brief notes on what to add from each source]

Rules:
- You are the ONLY agent that edits final documents. No other agent should.
- Use the Edit tool for targeted additions. Never rewrite entire files.
- Read each final document BEFORE editing it.
- Deduplicate: skip anything already covered.
- Maintain existing voice and formatting.
- For internal sources: text attribution only, no URLs.
- For public sources: add URL to Sources section.
```

**Context management:** If raw content is very large (many sources mapping to many documents), split into 2-3 coordinators. But each coordinator owns a non-overlapping set of final documents -- never have two coordinators editing the same document.

## Phase 3: Report

Summarize what was done:
- Which raw files were created
- Which final documents were enriched
- What new sections or insights were added
- Any sources that had nothing new to add (already covered)

</process>

<quality-rules>
- Only add information genuinely useful to developers using Claude Code
- Maintain existing document voice and formatting conventions
- Deduplicate ruthlessly: if an insight is already covered, do not add it again
- Always cite sources with URLs (or text attribution for internal sources)
- Keep sections focused -- do not bloat documents with tangential content
- If the source has nothing new to add, say so and skip enrichment
- Never create new final documents without explicit user approval
</quality-rules>
