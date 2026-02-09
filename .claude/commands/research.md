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
  - mcp__playwright__browser_navigate
  - mcp__playwright__browser_snapshot
  - mcp__playwright__browser_click
  - mcp__playwright__browser_take_screenshot
  - AskUserQuestion
---

<objective>
Research a source (URL, Reddit post, or topic) and assimilate new insights into the Claude Code Research Compendium at `docs/research/`.

Orchestrator stays lean: fetch content, save raw, map to documents, spawn enrichment agent(s), verify results.
</objective>

<context>
Source: $ARGUMENTS
Compendium location: `docs/research/`
</context>

<process>

## Step 1: Fetch the source content

Determine the source type from `$ARGUMENTS` and fetch accordingly:

**Web article (https://...):**
- Use WebFetch to retrieve and extract content
- If WebFetch fails (authentication, blocked), try Playwright browser tools:
  - `browser_navigate` to the URL
  - `browser_snapshot` to capture the full page content

**Reddit post (reddit.com/...):**
- WebFetch blocks Reddit. Use curl to fetch the JSON API:
  ```bash
  curl -s -H "User-Agent: ClaudeTipsResearch/1.0" "${URL}.json" | python3 -m json.tool > /tmp/reddit-post.json
  ```
- Extract the post title, body, score, author, and top comments from the JSON

**Internal/SharePoint URL:**
- Use Playwright browser tools (user is likely authenticated):
  - `browser_navigate` to the URL
  - `browser_snapshot` to capture full page content

**Topic (not a URL):**
- Use WebSearch to find 2-3 high-quality sources on the topic
- Fetch each source using the appropriate method above

## Step 2: Save raw content

Save the fetched content as markdown in `docs/research/raw/`:
- Derive a kebab-case filename from the source (e.g., `anthropic-prompt-best-practices.md`)
- Reddit posts go in `docs/research/raw/reddit/` (e.g., `r-claudecode-topic-name.md`)
- Include the source URL, title, date (if available), and full extracted content
- Format: markdown with the original structure preserved as much as possible

## Step 3: Map content to final documents

Read `docs/research/readme.md` to understand the current Table of Contents -- it lists all final documents with their topics and descriptions. This is the single source of truth for the compendium structure.

Then read the new raw content and determine which final documents it should enrich. A single source may map to multiple documents. Only map to documents where the source adds genuinely new information.

If the new content does not fit any existing document well, the enrichment agent may suggest (but not create) a new document -- flag this in the report for the user to decide.

## Step 4: Enrich final documents

Launch a Task agent (subagent_type: "general-purpose") with this prompt structure:

```
You are enriching the Claude Code Research Compendium.

First read docs/research/readme.md to understand the compendium structure and existing documents.
Then read the raw source file at [path].
Then read each final document you will enrich.
Finally, make targeted edits to incorporate new insights.

Documents to enrich: [list of file paths with brief notes on what to add]

Rules:
- Read the CLAUDE.md at the project root for privacy rules. Follow them strictly.
- Use the Edit tool for targeted additions. Do NOT rewrite entire files.
- Add new subsections where content introduces genuinely new information not already covered.
- Expand existing sections where content provides additional detail or community validation.
- Add the source URL to the "## Sources" section at the bottom of each modified document (skip for internal sources -- use text attribution instead).
- Preserve existing document structure, voice, and formatting (## for sections, ### for subsections, bold for key terms, lists for details).
- Do NOT duplicate information already present. If an insight is already covered, skip it.
- Keep additions focused and concise -- no filler.
- Each addition should clearly attribute where the insight came from (author, community post score, etc.) where relevant.
```

If the content maps to more than 5 documents, split into 2 agents to keep context manageable.

## Step 5: Update the README

After enrichment completes, add the new source URL to the Sources section of `docs/research/readme.md`.

## Step 6: Report

Summarize what was added:
- Which documents were enriched
- What new sections or insights were added
- The raw file location for reference

</process>

<quality-rules>
- Only add information genuinely useful to developers using Claude Code
- Maintain existing document voice and formatting conventions
- Deduplicate ruthlessly: if an insight is already covered, do not add it again
- Always cite sources with URLs
- Keep sections focused -- do not bloat documents with tangential content
- If the source has nothing new to add (everything is already covered), say so and skip enrichment
</quality-rules>
