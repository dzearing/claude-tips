# Claude Code Best Practices: 15 Tips from Running 6 Projects (2026)

**Source:** https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
**Author:** Lukas Fryc
**Context:** Author has run 6 production SaaS projects with Claude Code over the past year -- real products with users, payments, and deployments. Emphasizes that "Writing a CLAUDE.md file" is the single highest-impact practice, saving hours of repeated explanations per session.

---

## 1. Write a CLAUDE.md File

Place a `CLAUDE.md` file in your project root. Claude Code reads it at the start of every session, eliminating the need to re-explain stack, patterns, and rules. Without it, each session starts from zero. With it, Claude Code immediately understands your technical foundation.

**Template structure:**

- Project name and brief description
- Tech stack (e.g., "Next.js 15 (App Router), Supabase (auth + database), Stripe (payments), Tailwind CSS v4")
- Architecture details (directory structure and purposes: "/src/app -- pages and API routes", "/src/lib -- shared utilities and services", "/src/components -- React components (use shadcn/ui)")
- Rules (TypeScript strict mode, server components by default, error handling patterns, testing frameworks)
- Commands (Dev: `pnpm dev`, Test: `pnpm test`, Build: `pnpm build`)

**Key quote:** "10 minutes to write. Hours saved in every subsequent session."

**Category tags:** `configuration`, `CLAUDE.md`, `session-setup`, `foundational`

---

## 2. Use .claude/rules/ for Domain-Specific Rules

While `CLAUDE.md` covers the entire project, domain-specific rules go in `.claude/rules/`. Each file loads contextually -- Claude Code reads `api-routes.md` when working on API routes, not when styling buttons.

**File structure:**

```
.claude/rules/
  api-routes.md      # How to write API routes
  database.md        # Migration and query patterns
  testing.md         # Testing conventions
  components.md      # Component patterns
```

**Key quote:** "Focused context = better results."

**Category tags:** `configuration`, `rules`, `context-management`, `modular-instructions`

---

## 3. Add Custom Commands

Custom commands turn repetitive prompts into one-word shortcuts. Create files in `.claude/commands/` describing multi-step workflows.

**Example file `.claude/commands/new-feature.md`:**

```
Create a new feature following our standard pattern:
1. Create the API route in /src/app/api/
2. Create the database migration in /supabase/migrations/
3. Create the React component in /src/components/
4. Add a Vitest test file next to each new file
5. Update the sidebar navigation if needed
```

**Usage:** Type `/new-feature` to trigger the entire workflow.

The author has about 15 custom commands and identifies them as "the single biggest time saver after CLAUDE.md."

**Category tags:** `configuration`, `custom-commands`, `automation`, `workflow`

---

## 4. Set Up .claudeignore

Similar to `.gitignore`, `.claudeignore` reduces noise and keeps context focused by excluding files Claude Code should not scan.

**Example `.claudeignore` content:**

```
node_modules/
.next/
dist/
*.lock
*.log
coverage/
.env*
```

**Key quote:** "Less context to scan = faster, more accurate responses."

**Category tags:** `configuration`, `context-management`, `performance`

---

## 5. Start with "What" and "Why", Not "How"

Structure prompts around your actual problem and goals rather than implementation details.

**Bad prompt:** "Create a file called auth.ts in src/lib with a function called verifyToken that takes a JWT string and returns the decoded payload using jose library"

**Good prompt:** "I need JWT verification for my API routes. Users authenticate via Supabase, but I need to verify tokens in edge functions where the Supabase client isn't available."

The second approach gives Claude Code room to think, evaluate existing patterns, and make informed architectural decisions rather than mechanically following instructions.

**Category tags:** `prompting`, `prompt-engineering`, `task-framing`

---

## 6. Break Large Tasks into Phases

Do not request entire features in one prompt. Instead, structure work as sequential phases:

1. **Plan phase:** "I need to add billing with Stripe. What's your plan?"
2. Review the plan and adjust if needed
3. **Execute phase 1:** "Let's start with the webhook handler"
4. Verify (run tests, check code)
5. **Execute phase 2:** "Now add the pricing page"

**Key quote:** "Each phase gets full attention. Claude Code won't rush step 5 because it's trying to remember step 1."

**Category tags:** `prompting`, `task-management`, `phased-execution`, `large-tasks`

---

## 7. Reference Existing Patterns

When defining expected behavior, point to existing implementations rather than describing patterns verbally.

**Example prompt:** "Add a new API route for /api/projects. Follow the same pattern as /api/teams -- same error handling, same auth middleware, same response format."

Claude Code reads the referenced file and replicates the pattern. "Far more reliable than describing it in words."

**Category tags:** `prompting`, `pattern-reuse`, `consistency`

---

## 8. Ask for Plans Before Execution

For tasks touching more than 3 files, request a plan first without code generation.

**Example prompt:** "Plan how you'd implement user notifications. Don't write code yet -- just outline the approach."

Then review the plan before saying "looks good, execute it."

**Key quote:** "Catch problems before 15 files change. Saves significant time on reverts."

**Category tags:** `prompting`, `planning`, `risk-reduction`, `large-tasks`

---

## 9. Commit Before Big Changes

Before any significant refactor, create a checkpoint commit:

```bash
git add -A && git commit -m "checkpoint before refactor"
```

The author learned this "the hard way -- lost 3 hours of work to a botched migration that touched every model file." Now commits religiously.

**Key quote:** "If it goes wrong: one `git reset` away from safety. Without this, you're manually undoing changes across 20 files."

**Category tags:** `git`, `safety`, `version-control`, `checkpointing`

---

## 10. Use /compact When Context Gets Long

Long conversations degrade Claude Code quality. It spends tokens processing old, irrelevant context instead of focusing on the current task.

**Rule of thumb:** Compact after every major task completion. When responses slow or accuracy decreases, that signals context overload.

**Command:** `/compact`

**Category tags:** `session-management`, `context-management`, `performance`, `quality`

---

## 11. Let Claude Code Run Tests

Instead of copy-pasting test output, embed the test command in `CLAUDE.md`:

```markdown
## Commands
- Test: pnpm vitest run
- Test watch: pnpm vitest
```

Then prompt: "Run the tests and fix any failures."

Claude Code executes the suite, reads failures, fixes them, and re-runs automatically.

**Key quote:** "This loop is 5x faster than manual copy-paste."

**Category tags:** `testing`, `automation`, `CLAUDE.md`, `workflow`

---

## 12. One Task Per Session

Do not batch unrelated tasks. Instead of asking Claude Code to "Fix the login bug, then add dark mode, then refactor the API routes, then write tests," complete each task separately.

**Process:** Fix the login bug -> compact or start fresh -> add dark mode -> and so on.

**Key quote:** "Each task gets focused context."

**Category tags:** `session-management`, `focus`, `task-management`, `quality`

---

## 13. Use Hooks for Automation

Hooks run shell commands automatically before or after Claude Code actions, reducing manual follow-ups.

**Example hook configuration (auto-format files):**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0"
          }
        ]
      }
    ]
  }
}
```

This auto-formats every file Claude Code writes, eliminating "fix the linting errors" follow-ups.

The author references a "complete hooks guide with 20+ examples" available on their blog.

**Key quote:** "Hooks are the most underused Claude Code feature."

**Category tags:** `automation`, `hooks`, `configuration`, `linting`, `formatting`

---

## 14. Build Project-Specific Kits

Package reusable configurations into kits for repeated project setups.

**Standard kit structure:**

```
.claude/
  commands/
    new-feature.md
    deploy.md
    test-all.md
  rules/
    api-patterns.md
    testing.md
  knowledge/
    architecture.md
  CLAUDE.md
```

Copy this `.claude/` directory to any new project, and Claude Code instantly knows your standards. The author packages kits for different domains: development, marketing, QA, product.

**Category tags:** `configuration`, `reusability`, `project-setup`, `scaling`

---

## 15. Review Before Approving

Claude Code is fast but not infallible. Before accepting large changes:

1. Run `git diff` to see everything that changed
2. Check for hardcoded values, missing error handling, security issues
3. Run the full test suite
4. Build the project to catch type errors

**Key quote:** "Trust but verify. Claude Code handles 90% of the work. Your job is catching the 10% it misses."

**Category tags:** `review`, `quality-assurance`, `safety`, `verification`

---

## Bonus: The Author's Actual Workflow

The author describes a voice-driven, parallel-session workflow using additional tools:

- **Voice input tool:** Wispr Flow for voice commands instead of typing
- **Terminal tool:** Warp for running multiple Claude Code sessions in parallel
- **Workflow pattern:**
  1. Open 2-3 Claude Code sessions in Warp
  2. Voice-assign each session a task via Wispr Flow
  3. Switch between sessions reviewing output
  4. Approve or reject by voice
  5. Commit and move on

**Key quote:** "My hands are for code review. That's it." The author writes 10-20 lines of code per day by hand; Claude Code writes thousands daily.

**Category tags:** `workflow`, `voice-input`, `parallel-sessions`, `scaling`, `tooling`

---

## Overall Impact Summary

The author emphasizes the compound effect: "Any single tip saves a few minutes. Combined, they transform the workflow. A well-configured project with CLAUDE.md, custom commands, hooks, and proper prompting ships features 5-10x faster than vanilla Claude Code."

With voice input and parallel sessions added, the scaling effect increases dramatically: "You're not 5x faster -- you're operating at a completely different scale."

**Total setup investment:** "The setup takes an afternoon. The savings compound every day."
