# Claude Tips Project

## Privacy Rules

- Never reveal private/internal URLs (e.g. SharePoint, internal wikis, ADO links) in any research output or documentation
- Never include PII (personally identifiable information) in research output or documentation
- Never include real names of individuals -- use role descriptions (e.g. "a principal architect", "a senior developer") or anonymize
- Never include company names, product names, or internal branding that could identify the source organization
- Never include internal acronyms, project codenames, or team-specific terminology (e.g. org-specific initiative names, internal tool names) -- generalize them (e.g. "an internal analytics tool", "a company-wide AI initiative")
- These rules apply to ALL research output including raw source files in `docs/research/raw/` and final documents in `docs/research/final/`

## Research Workflow

See `docs/research/PROCESS.md` for the full repeatable research workflow. Key rules:

- **Scraping agents** fetch and save raw content to `docs/research/raw/` only. They never edit final documents.
- **A single coordinator** reads raw content and makes all edits to `docs/research/final/`. This ensures consistent voice and prevents conflicts.
- The `/research` skill at `.claude/commands/research.md` orchestrates this workflow.

## Project Structure

- `docs/research/` -- Claude Code research compendium
  - `raw/` -- Raw scraped content from sources (articles, Reddit posts)
  - `final/` -- 16 organized topic documents (00-15)
  - `readme.md` -- Table of contents and source index (source of truth for document structure)
  - `PROCESS.md` -- Research workflow documentation
- `.claude/commands/research.md` -- `/research` skill for adding new sources
