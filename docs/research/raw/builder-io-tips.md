# Claude Code Tips from Builder.io

Source: https://www.builder.io/blog/claude-code
Author: Steve Sewell (Builder.io CEO)
Article Title: "How I use Claude Code (+ my best tips)"

---

## Use the VS Code Extension for Parallel Workflows

Install the Claude Code extension for VS Code (also works in Cursor and Windsurf). Rather than using it as a secondary tool, the extension serves as a launcher that lets you run multiple Claude Code instances in parallel across different sections of your codebase. This enables working on multiple tasks simultaneously without waiting for one to finish before starting another.

**How to set up:**
- Install the "Claude Code" extension from the VS Code marketplace
- Launch instances directly from the IDE

**Category tags:** `setup`, `ide-integration`, `parallel-execution`, `workflow`

---

## Clear Chat History Frequently with /clear

Use `/clear` frequently when starting new tasks. Accumulated chat history wastes tokens and forces the model to perform unnecessary compaction operations. Starting fresh for each distinct task keeps context focused and reduces cost.

**Command:**
```
/clear
```

**Category tags:** `context-management`, `token-optimization`, `workflow`, `cost-savings`

---

## Navigate Previous Chat Sessions with Arrow Keys

Press the Up arrow key to access previous chat sessions. This lets you quickly reference earlier work without scrolling or searching. Press Escape twice to view a list of past messages and jump between them for navigation across your session history.

**Keyboard shortcuts:**
- `Up Arrow` - Access previous chat sessions
- `Escape` (press twice) - Display message history navigation list

**Category tags:** `navigation`, `keyboard-shortcuts`, `workflow`

---

## Skip Permission Prompts for Faster Iteration

The permission system requires approval for every file edit and command execution, which becomes repetitive and disruptive. Run Claude Code with the `--dangerously-skip-permissions` flag to bypass all permission prompts. Steve Sewell reports using this mode for weeks without issues.

**Command:**
```bash
claude --dangerously-skip-permissions
```

**Note:** This removes all safety guardrails for file modifications and command execution. Use only if you are comfortable with fully autonomous operations and have version control in place.

**Category tags:** `permissions`, `workflow`, `speed`, `setup`

---

## Set Up Terminal Properly with /terminal-setup

Shift+Enter does not work by default for entering new lines in the terminal UI. Run the `/terminal-setup` command to configure your terminal so that multiline input works correctly.

**Command:**
```
/terminal-setup
```

**Category tags:** `setup`, `terminal`, `multiline-input`

---

## Hold Shift When Dragging Files to Reference Them

Standard dragging of files opens them in new tabs. To properly reference files in your prompts (so Claude has them as context), hold Shift while dragging the file into the Claude Code interface.

**Workflow:**
- Standard drag = opens file in a new tab
- Shift + drag = references the file in the current prompt

**Category tags:** `file-handling`, `context-management`, `keyboard-shortcuts`

---

## Use Control+V for Pasting Images (Not Command+V)

When pasting images from the clipboard into Claude Code, use `Control+V` instead of `Command+V`. The standard macOS paste shortcut does not work for image pasting in the terminal interface.

**Keyboard shortcut:**
- `Control+V` - Paste images from clipboard

**Category tags:** `keyboard-shortcuts`, `images`, `terminal-quirks`

---

## Press Escape to Stop Claude (Not Control+C)

To stop Claude mid-task, press `Escape`. Do not use `Control+C`, which exits Claude Code entirely rather than just stopping the current operation.

**Keyboard shortcuts:**
- `Escape` - Stop current Claude operation
- `Control+C` - Exits Claude Code entirely (avoid for stopping tasks)

**Category tags:** `keyboard-shortcuts`, `terminal-quirks`, `workflow`

---

## Install the GitHub App for Automatic PR Reviews

Use the `/install-github-app` command to enable automatic pull request reviews. Once installed, Claude will automatically review PRs and can identify logic errors and security issues that human reviewers may miss.

**Command:**
```
/install-github-app
```

**Category tags:** `github`, `code-review`, `automation`, `setup`

---

## Customize PR Review Prompts to Focus on Bugs and Security

After installing the GitHub app, create a `claude-code-review.yml` configuration file to customize the review behavior. By default, reviews can be verbose with comments on minor style details. Customize the prompt to focus on substantive issues like bugs and security vulnerabilities.

**Configuration file:** `claude-code-review.yml`
```yaml
direct_prompt: |
  Review for bugs and security issues only. Be concise.
```

**Category tags:** `github`, `code-review`, `configuration`, `customization`

---

## Understand the Model Switching Behavior (Opus to Sonnet)

Claude Code defaults to using the Opus model until you reach approximately 50% of your usage threshold, then automatically switches to the Sonnet model for cost efficiency. This is the recommended default for most users seeking an optimal balance between capability and cost. You can also manually switch to Sonnet if Opus experiences performance issues during peak usage periods.

**Category tags:** `model-selection`, `cost-optimization`, `usage-management`

---

## Leverage Claude Code for Large Codebases

Claude Code demonstrates strong performance with extremely large files and complex codebases. Steve Sewell tested it on an 18,000+ line React component at Builder.io where other tools (Cursor) struggled. Claude Code excels at:

- Resolving complex patches without requiring full file rewrites
- Navigating and understanding dependencies between components
- Managing intricate codebase relationships and shared state
- Searching for patterns across large projects

If you work on a large or complex codebase, Claude Code may handle it more reliably than IDE-based AI tools.

**Category tags:** `large-codebases`, `performance`, `navigation`, `code-editing`

---

## Use @-Tags for Precise File Context

Use @-tags to reference specific files directly in your chat messages. This gives you granular control over which files Claude has as context, rather than relying on automatic file discovery.

**Usage:**
```
@filename.ts Can you review this file for potential issues?
```

**Category tags:** `context-management`, `file-handling`, `prompting`

---

## Consider the Economics: Direct Provider Advantage

Claude Code is built by Anthropic, the same company that builds the Claude model. This direct relationship means no reseller markup and a tighter feedback loop between the tool and model improvements. At $100/month for the maximum access tier (Claude Max), you get direct access to Opus without intermediary costs. Anthropic can continuously improve the model specifically for coding tasks, and those improvements are immediately available in Claude Code.

**Pricing:**
- Claude Max: $100/month for maximum plan access with Opus model usage

**Category tags:** `pricing`, `economics`, `model-access`

---

## Vim Mode Is Available

For users who prefer Vim keybindings, Claude Code supports an optional Vim mode for terminal input.

**Category tags:** `configuration`, `terminal`, `editor-preferences`
