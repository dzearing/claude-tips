# Research Process

This document describes the repeatable workflow for adding new sources to the compendium.

## Architecture

```
[User provides URL/topic]
        |
        v
  Scraping Agent(s)          ← Parallel, one per source
  - Fetch content
  - Save to docs/research/raw/
  - Output: raw markdown only
  - NO edits to final docs
        |
        v
  Coordinator (single)       ← Sequential, one agent
  - Reads raw content
  - Reads each final doc before editing
  - Maps new insights to documents
  - Makes all edits to final docs
  - Updates readme.md sources
  - Deduplicates against existing content
  - Maintains consistent voice
```

## Roles

### Scraping Agents

**Purpose:** Fetch and save raw content only. Never edit final documents.

**Input:** A URL or topic to research.

**Output:** A markdown file in `docs/research/raw/` (or `docs/research/raw/reddit/` for Reddit posts).

**Format:**
```markdown
# {Title}
**Source:** {URL}
**Author:** {author} | **Score:** {score} (if applicable)
**Date:** {date if known}

## Content

{full extracted content}

---

## Comments (if applicable)

### {commenter} (Score: {score})
{comment text}
```

**Source types and fetch methods:**
- **Web articles:** WebFetch, fallback to Playwright browser
- **Reddit posts:** Chrome DevTools browser (Reddit blocks JSON API as of Feb 2026)
- **Internal/SharePoint:** Chrome DevTools browser (user must be authenticated)
- **Topic search:** WebSearch to find sources, then fetch each

**Rules:**
- Apply privacy rules from CLAUDE.md to raw content (no real names, no internal URLs, no company names)
- Preserve original structure as much as possible
- Include source URL, author, date, and full content
- Use kebab-case filenames (e.g., `anthropic-prompt-best-practices.md`)

### Coordinator

**Purpose:** Read raw content and make all edits to final documents. This is the only role that writes to `docs/research/final/`.

**Input:** Path(s) to raw source file(s) in `docs/research/raw/`.

**Process:**
1. Read `docs/research/readme.md` for the current TOC and document structure
2. Read `CLAUDE.md` for privacy rules
3. Read each raw source file
4. For each final document that needs updates:
   a. Read the current final document
   b. Identify what is genuinely new (not already covered)
   c. Make targeted edits using the Edit tool
   d. Add source attribution to the Sources section
   e. Move to the next document
5. Add new source URLs to `docs/research/readme.md`
6. Report what was changed

**Rules:**
- Process one final document at a time (read, edit, move on) to manage context
- Use the Edit tool for targeted additions -- never rewrite entire files
- Deduplicate ruthlessly: skip anything already covered
- Maintain existing document voice and formatting conventions
- Add new subsections for genuinely new topics
- Expand existing sections where new content adds depth
- For internal sources: use text attribution, not URLs
- For public sources: add URL to the Sources section

**Context management:** If the raw content is very large (multiple sources), the coordinator may need to be split into 2-3 focused coordinators, each handling a subset of final documents. But each coordinator should handle ALL raw sources relevant to its assigned documents -- never have two coordinators editing the same document.

## Document Structure Convention

Each final document follows this structure:
```markdown
# {Title}

## Purpose
{Why this topic matters}

## How It Helps
{Bullet list of benefits}

## What You Can Do
{Actionable sections with ### subsections}

## Details
{Deep dives with ### subsections}

## Sources
{List of URLs or text attributions}
```

## Topic Index

The source of truth for which topics belong in which document is `docs/research/readme.md`. Read it before mapping content.

## When to Create a New Document

Only if a source introduces a topic that doesn't fit any existing document. Flag this in the coordinator's report for the user to decide -- do not create new documents without explicit approval.
