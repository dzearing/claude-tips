# Testing and Verification

## Purpose

Giving Claude the ability to verify its own work through feedback loops improves final result quality by a factor of 2-3, according to Boris Cherny. Without verification, you get one-shot generation with no guarantee of correctness. With verification, Claude iterates until the code actually works -- running tests, checking the browser, and validating output autonomously.

## How It Helps

- Reported 70% fewer production bugs with TDD approach
- 50% faster debugging when tests exist as specification
- 90% test coverage achievable vs. 40% without structured testing
- Write-test-fix cycles run 5x faster than manual copy-paste debugging
- Requirements become executable specifications through test-first development

## What You Can Do

### Embed Test Commands in CLAUDE.md

Include test commands so Claude can run and fix tests autonomously:

```markdown
## Commands
- Test: pnpm vitest run
- Test watch: pnpm vitest
- Test single: pnpm vitest run path/to/test
- Coverage: pnpm vitest run --coverage
```

Then prompt: "Run the tests and fix any failures." Claude executes the suite, reads failures, fixes them, and re-runs automatically.

### Test-Driven Development with Claude

Have Claude write failing tests first, then implement code to pass them:

**Step 1 -- Define requirements through tests:**

```
Using Vitest, write FAILING tests for a ShoppingCart component:
- Display empty state when no items
- Show correct item count badge
- Calculate total with 8.5% tax
- Apply 'SUMMER10' discount (10% off)
- Handle removing items
- Persist to localStorage
- Handle network errors

Save as ShoppingCart.test.tsx. Do NOT implement yet.
```

**Step 2:** Review tests for edge cases and realistic scenarios.

**Step 3 -- Implement to pass:**

```
Now implement ShoppingCart to make all tests pass. Follow our patterns in CLAUDE.md.
```

**Step 4 -- Verify coverage:**

```
Run tests and show coverage. Missing scenarios?
```

### The Write-Test Cycle for Autonomous Tasks

Enable autonomous execution by providing verification methods:

- Use **tmux** for interactive testing: start a session, send commands, capture output
- Use **Playwright MCP** or **Chrome DevTools MCP** for web app testing
- Playwright is generally better for non-visual automated tasks
- Use accessibility tree refs instead of pixel coordinates for reliable element targeting

### Comprehensive Testing Strategy

When setting up testing, provide Claude with a detailed prompt covering all layers:

```
I want bulletproof testing for our app:

- Unit tests for all utility functions (currency formatting, date calculations, validation)
- Component tests using React Testing Library for every UI component
- Integration tests for API endpoints with proper database setup/teardown
- End-to-end tests for critical user flows
- Performance tests to ensure the app stays fast as data grows

Set up the testing infrastructure, then write comprehensive tests for existing features.
```

Claude will analyze the codebase, install packages, create testing utilities, and write tests reflecting actual business logic.

### Verification Approaches

| Method | Best For | How |
|--------|----------|-----|
| Run test suite | Functional correctness | Embed test command in CLAUDE.md |
| Browser testing | UI verification | `/chrome` or Playwright MCP |
| Draft PRs | Diff review | `gh pr create --draft` |
| Git diff | Change inspection | `git diff` before accepting |
| Self-verify | Fact checking | "Double check every claim and make a table" |
| Type checking | Compile-time errors | `tsc --noEmit` in CLAUDE.md commands |
| Mutation testing | Test quality validation | Verify tests catch real bugs, not just trivial assertions |
| 1-shot prompt test | Codebase health check | If a task cannot be done in one prompt, the code or decomposition needs work |

### Hook-Based Test Enforcement

Block commits unless tests pass using a PreToolUse hook (see [11-automation-devops.md](./11-automation-devops.md) for hook configuration details):

The pattern:
1. Wrap `Bash(git commit)` with a PreToolUse hook
2. Check for the existence of `/tmp/agent-pre-commit-pass` file
3. This file is only created after all tests pass
4. If missing, block the commit and force a test-and-fix loop
5. The agent keeps iterating until tests pass

## Details

### Why TDD Works with AI

- Requirements become executable specifications -- impossible to forget tests
- Hard-to-test code reveals design problems early
- Protection against regressions as code evolves
- Claude has a clear success criterion (all tests green) rather than ambiguous "looks right"

### Beware of False Test Coverage

AI can write thousands of unit tests that are technically passing but functionally useless -- testing trivial assertions that give a false sense of security. Review AI-generated tests for meaningful assertions. One experienced user notes: "AI is incredible at generating code but mediocre at verifying correctness." Treat your test suite as the source of truth and the generated code as disposable, but the tests themselves need human review for quality.

Set hard quality gates beyond simple coverage numbers: mutation testing scores (kill all mutants ideally), cyclomatic complexity of 1-10 as a hard gate, max lines of code per file, and enforce JSDoc on the linter. Git hooks and CI/CD with no skips allowed should be codified in AGENTS.md.

### Block at Commit, Not at Write

Do NOT use block-at-write hooks for test enforcement. Blocking an agent mid-plan confuses it. Let agents finish their work, then check the final result at the commit stage. This is a critical principle from enterprise usage.

### Browser Testing with Chrome Integration

```bash
/chrome
# or
claude --chrome
```

Capabilities:
- Navigate pages, click buttons, fill forms directly
- Read console logs and monitor network requests
- Test the app without switching between terminal and browser
- Debug in real-time with immediate feedback loop

Workflow: Write code -> test in browser -> see errors -> iterate, all in one continuous flow.

### Performance Testing

Provide Claude with specific metrics to validate:

```
Our app is getting slower with more data. I'm seeing:
- Dashboard: 3+ seconds to load with 1000+ transactions
- Transaction list: janky scrolling
- Bundle size: over 1MB
- API responses: 400ms+

Run a performance audit. Show before/after metrics for every optimization.
```

### The First-Draft Throwaway Approach

For complex features: create a new branch, let Claude write the full feature end-to-end while observing. Compare output against requirements to identify divergences and error patterns. Use these insights for sharper second iteration prompts. The first draft is intentionally disposable -- it serves as a learning tool for refining your prompts.

### The 1-Shot Prompt Test as a Health Check

Use single-prompt task completion as a diagnostic signal for project health. If you cannot accomplish a task in one prompt, it means one of three things: the codebase is becoming messy, you do not understand the system well enough to craft a good prompt, or the problem needs further decomposition. Experienced users report that as they optimized their architecture to fit the agent better, feature implementation turns dropped from 15 minutes to 7 minutes, with single-shot success becoming common.

### File Size Limits for Reliable AI Editing

Keep code files under 500 lines when working with AI. The 300-400 line range appears to be the sweet spot where Claude holds the full file's logic in context without drift. Beyond 500 lines, AI starts "forgetting" edge cases in earlier functions when editing later ones. Files that grow to 3000-5000 lines become dangerous to touch with AI -- first refactoring attempts on such files can end in disaster. Plan modular structure from the start and split by sub-feature rather than by layer alone.

### Read Every Line the AI Produces

Do not blindly trust AI-generated code. One game developer who shipped a full product over 6 months found that reading every line Claude produced was essential -- not just for catching bugs but for learning. Debugging together taught more than any tutorial. Complex branching logic (tournament brackets, schedule generation with variations) is where AI struggles most and where manual review is most critical.

### Teach Claude to Generate Targeted Debug Output

Have Claude customize debug traces for each test run so it gets exactly the diagnostic information needed and nothing else. This is more token-efficient than dumping full logs and helps Claude focus on the actual problem. Tell Claude to run the application itself and capture only the relevant output.

## Sources

- https://www.infoq.com/news/2026/01/claude-code-creator-workflow/
- https://dev.to/lukaszfryc/claude-code-best-practices-15-tips-from-running-6-projects-2026-9eb
- https://www.f22labs.com/blogs/10-claude-code-productivity-tips-for-every-developer/
- https://github.com/ykdojo/claude-code-tips
- https://agenticcoding.substack.com/p/32-claude-code-tips-from-basics-to
- https://sidbharath.com/claude-code-the-complete-guide/
- https://blog.sshh.io/p/how-i-use-every-claude-code-feature
- https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
- https://www.reddit.com/r/ClaudeCode/comments/1qxvobt/ive_used_ai_to_write_100_of_my_code_for_1_year_as/ (13 lessons: TDD enforcement, test quality, 1-shot test)
- https://www.reddit.com/r/ClaudeCode/comments/1qknr1v/what_i_learned_building_a_full_game_with_claude/ (Game dev: file size limits, reading every line, debug traces)
- https://www.reddit.com/r/ClaudeCode/comments/1qpd4ro/before_you_complain_about_opus_45_being_nerfed/ (Opus tips: verification workflows, predictable testing)
- https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices (Anthropic: test-first multi-context workflows)
