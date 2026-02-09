# Claude Tips Project

## Privacy Rules

- Never reveal private/internal URLs (e.g. SharePoint, internal wikis, ADO links) in research output or documentation
- Never include PII (personally identifiable information) in research output or documentation
- Never include real names of individuals in research output -- use role descriptions (e.g. "a principal architect", "a senior developer") or anonymize
- When assimilating internal sources into research documents, strip all identifying information before writing to final docs
- Raw source files in `docs/research/raw/` may contain original content, but final documents in `docs/research/final/` and `docs/research/readme.md` must be sanitized

## Project Structure

- `docs/research/` -- Claude Code research compendium
  - `raw/` -- Raw scraped content from sources (articles, Reddit posts)
  - `final/` -- 16 organized topic documents (00-15)
  - `readme.md` -- Table of contents and source index
- `.claude/commands/research.md` -- `/research` skill for adding new sources
