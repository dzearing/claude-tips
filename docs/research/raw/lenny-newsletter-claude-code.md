# Lenny's Newsletter: Everyone Should Be Using Claude Code

**Source:** https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code
**Author:** Lenny Rachitsky
**Fetched:** 2026-02-09
**Note:** Some content is behind a paywall (34+ additional use cases for paid subscribers). This document captures everything available from the public portion plus partial paid content.

---

## Reframe Claude Code as "Claude Local" or "Claude Agent"

The single most important mental shift: stop thinking of Claude Code as a coding tool. Think of it as an intelligent AI agent running locally on your machine with direct file system access. The "Code" in the name creates a barrier for non-developers who assume it is not for them. In reality, it can handle any task that involves files, system operations, research, or automation on your local machine.

**Why this matters:**
- Handles larger files than cloud-based chatbots
- Runs longer without interruption on extended tasks
- Executes tasks directly on your computer's file system
- Faster processing for file-intensive work
- Maintains privacy for sensitive local operations
- Auto-generates context when run from project directories

**Category tags:** `#mindset` `#getting-started` `#non-developers`

---

## Install Claude Code

**Mac installation:**
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

**Windows installation:**
```powershell
irm https://claude.ai/install.ps1 | iex
```

**Launch (both platforms):**
```bash
claude
```

**Tip:** If you encounter installation issues, install the Warp terminal app as a replacement for your default terminal. Warp can automatically resolve common installation problems.

**Category tags:** `#installation` `#getting-started` `#setup`

---

## Use Warp Terminal for a Better Experience

Warp is recommended as a terminal replacement that provides a smoother experience with Claude Code. It can help resolve installation issues automatically and provides a more user-friendly terminal interface for people who are not accustomed to command-line tools.

**Category tags:** `#tools` `#terminal` `#setup`

---

## System Diagnostics and Troubleshooting

**Contributor:** Anthony Roux

Ask Claude Code to diagnose system performance issues. It can check load averages, memory pressure, disk space analysis, stuck processes, and swap activity. After running the analysis, it explains what each metric means, identifies the cause of any problems, and suggests fixes with risk assessments for each action.

**Example prompt:**
> "How can I clear some storage on my computer?"

Claude Code provides personalized recommendations based on your actual disk contents rather than generic advice.

**Deeper prompt pattern:**
> "Check my system load averages, memory pressure, disk space, stuck processes, and swap activity. Explain what each means and suggest fixes."

**Category tags:** `#system-management` `#diagnostics` `#non-developers`

---

## Batch File Renaming and Organization

**Contributor:** Martin Merschroth

Use Claude Code to rename and organize files in bulk following a specific naming convention, then sort them into folders automatically.

**Example prompt pattern:**
> "Rename all invoices in this folder to the format YYYY-MM-DD Vendor - Invoice - ProductOrService.pdf and organize them into folders by vendor."

This works for any file type and any naming convention you define.

**Category tags:** `#file-organization` `#automation` `#productivity`

---

## Duplicate File Detection

**Contributor:** Justin Dielmann

Claude Code can scan directories for duplicate files and help you decide which copies to keep.

**Example prompt:**
> "Find duplicate files in this directory and help me decide which ones to keep."

**Category tags:** `#file-organization` `#cleanup` `#productivity`

---

## Directory Structure Review and Cleanup

Ask Claude Code to review your folder organization and suggest improvements. It can also identify old files you likely no longer need.

**Example prompts:**
> "Review my directory structure and suggest improvements for organization."

> "Identify old files I likely no longer need."

**Category tags:** `#file-organization` `#cleanup` `#productivity`

---

## Screenshot and Image Enhancement

**Contributor:** Lenny Rachitsky

Prompt Claude Code to upscale and refine image quality for screenshots or other images.

**Example prompt:**
> "Improve the image quality of [filename]"

**Category tags:** `#media` `#image-processing` `#content-creation`

---

## YouTube Video Downloads

**Contributor:** Lenny Rachitsky

Claude Code can download YouTube videos when prompted.

**Example prompt:**
> "Download this YouTube video: [URL]"

**Warning:** Lenny notes he "ignored all of the warnings" when doing this, acknowledging potential copyright and terms-of-service concerns. Use at your own discretion.

**Category tags:** `#media` `#downloads` `#content`

---

## Extract High-Res Images from Google Docs

**Contributor:** Lenny Rachitsky

Pull all high-resolution images out of a Google Doc automatically.

**Example prompt:**
> "Download all of the images in high-res from this Google Doc: [URL]"

**Category tags:** `#media` `#image-processing` `#google-docs`

---

## Audio Manipulation and Translation

**Contributor:** Dan Heller

Claude Code can handle audio file operations including sample rate conversion, file renaming, and even translating audio content from one language to another (e.g., Portuguese to English).

**Category tags:** `#media` `#audio` `#translation`

---

## Domain Name Brainstorming with Availability Checks

**Contributor:** Ben Aiad

Describe your project to Claude Code and ask for creative domain name suggestions across multiple TLDs (.com, .io, .dev, etc.). It can also verify domain availability.

**Example prompt pattern:**
> "I'm building [project description]. Suggest creative domain names across .com, .io, and .dev TLDs and check which ones are available."

**Category tags:** `#business` `#domains` `#brainstorming`

---

## Lead Identification from Source Code Analysis

**Contributor:** Jeff Lindquist

Point Claude Code at your app's source code directory and ask it to identify the top companies that would be good pilot candidates, then find relevant contacts on LinkedIn.

**Example prompt pattern:**
> "Analyze this app's source code and identify the top 5 companies that would be good pilots for this product. Find relevant contacts on LinkedIn."

**Category tags:** `#business` `#sales` `#lead-generation`

---

## Advanced Lead Discovery via GitHub Pattern Analysis

**Contributor:** Sergei Zotov

Search public GitHub repositories for specific patterns (such as sensitive data handling) to identify companies that would benefit from your product. Generate priority scores and gather LinkedIn profile URLs for outreach.

**Category tags:** `#business` `#sales` `#lead-generation` `#github`

---

## Content Writing Workflow with Outline Iteration

**Contributor:** Teresa Torres

Use Claude Code within VS Code for an end-to-end content writing workflow:

1. **Outline collaboration** - Iterate on article outlines together with Claude Code
2. **Research integration** - Have Claude Code conduct research and add citations to the outline
3. **Section-by-section feedback** - Get grammar, style, and content reviews as each section is written
4. **Revision loop** - Continue iterating until the piece is complete

Teresa uses Claude Code in VS Code specifically for all her content writing.

**Category tags:** `#writing` `#content-creation` `#workflow` `#vscode`

---

## Voice-to-Article Pipeline

**Contributor:** Helen Lee Kupp (described as a mom and non-developer)

A multi-step workflow for turning voice notes into published content:

1. Record voice memos during walks (e.g., stroller walks)
2. Feed voice recordings into Claude Code
3. Claude Code organizes ideas into research themes
4. Generates full articles that match your personal writing voice
5. Auto-generates LinkedIn-adapted versions of longer articles
6. Can produce publication-ready files with templates

**Key detail:** Claude Code can learn and match your writing voice from your recorded speech patterns.

**Category tags:** `#writing` `#voice` `#content-creation` `#non-developers` `#workflow`

---

## Automated Publishing with Templates

Generate publication-ready files from content using predefined templates. This pairs with the voice-to-article pipeline or any content workflow.

**Category tags:** `#writing` `#publishing` `#automation`

---

## Job Description and Hiring Collateral Generation

**Contributor:** Justin Bleuel (Clay)

Use Claude Code's planning mode to generate comprehensive hiring materials:

- Full job descriptions
- Hiring plans
- Interview rubrics
- Evaluation frameworks

**Workflow tip:** Feed internal Notion documents and competitor job description examples as reference material to produce higher-quality, context-aware output.

**Key feature used:** Planning mode for multi-step generation tasks.

**Category tags:** `#hiring` `#hr` `#planning-mode` `#business`

---

## Customer Call Transcript Synthesis

**Contributor:** Derek DeHart

Compile customer call transcripts to validate or invalidate product assumptions. Derek integrates MCPs (Model Context Protocol servers) with Fireflies, Linear, and Notion to create a connected product research hub.

**Integration stack:**
- Fireflies (call recording/transcription)
- Linear (project management)
- Notion (knowledge base)
- Claude Code with MCPs connecting these tools

**Category tags:** `#product-management` `#research` `#mcp` `#integrations`

---

## Self-Driving Documentation with Playwright

**Contributor:** James Pember

Use Claude Code combined with Playwright (browser automation) to create a "self-driving documentation" system:

1. Claude Code uses Playwright to autonomously explore your software application
2. It identifies gaps in existing documentation
3. It creates or updates documentation to fill those gaps
4. The entire process runs with minimal human intervention

**Key integration:** Playwright for browser automation paired with Claude Code's reasoning.

**Category tags:** `#documentation` `#playwright` `#browser-automation` `#workflow`

---

## Meeting Recording Self-Analysis

**Contributor:** Dan Shipper

Download meeting recordings into a folder and have Claude Code analyze your behavior patterns.

**Example prompt:**
> "Tell me all times I subtly avoided conflict."

This enables personal behavioral insights from your own meeting history.

**Category tags:** `#self-improvement` `#meetings` `#analysis`

---

## Weekly Self-Improvement Loop via Journal + Git Analysis

**Contributor:** Gang Rui

Set up a recurring (weekly) analysis that compares:
- Your journal entries (stated intentions and goals)
- Your Git commit history (actual work completed)

Claude Code identifies gaps between what you say you want to do and what you actually do, then suggests system-level improvements.

**Implementation detail:** Gang Rui uses a slash command to trigger this weekly analysis.

**Category tags:** `#self-improvement` `#habits` `#git` `#slash-commands` `#workflow`

---

## Raffle Winner Selection from Google Sheets

**Contributor:** Lenny Rachitsky

Use Claude Code to pick random rows from a Google Sheet for giveaway winner selection.

**Example prompt:**
> "Pick a random row from this Google Sheet to select a winner."

**Category tags:** `#utility` `#google-sheets` `#automation`

---

## DIY Construction Planning

**Contributor:** John Conneely

Generate design specifications and detailed material lists for building projects. John used it to plan a slide tower for his children.

**Category tags:** `#personal-projects` `#planning` `#diy`

---

## Competitor Ad Research and Inspiration

**Contributor:** Sumant Subrahmanya (partial - behind paywall)

Extract ad copy and creative strategies from competitors' advertising. The full details of this use case are behind the newsletter's paywall.

**Category tags:** `#marketing` `#competitive-analysis` `#advertising`

---

## Run Claude Code from Project Directories for Auto-Context

When you launch Claude Code from within a project directory, it automatically picks up context about what you are building. This is more effective than starting from a generic location and manually explaining your project.

**Category tags:** `#workflow` `#context` `#best-practice`

---

## Use Planning Mode for Multi-Step Tasks

Planning mode is specifically called out for complex generation tasks (such as job description creation). When a task has multiple steps or requires iterating through a structured process, activate planning mode.

**Category tags:** `#planning-mode` `#workflow` `#best-practice`

---

## Feed Reference Materials for Better Output

Multiple contributors mention feeding existing documents as reference material:
- Internal Notion docs for job descriptions (Justin Bleuel)
- Competitor examples for benchmarking
- Voice recordings for voice matching (Helen Lee Kupp)
- Call transcripts for synthesis (Derek DeHart)

The pattern: the more relevant context you provide, the higher quality the output. Claude Code's local file access makes it straightforward to point at directories of reference material.

**Category tags:** `#prompting` `#context` `#best-practice`

---

## Connect External Tools via MCP (Model Context Protocol)

**Contributor:** Derek DeHart

MCP servers allow Claude Code to interact with external productivity tools. Derek's stack includes Fireflies, Linear, and Notion connected via MCPs. This transforms Claude Code from a local-only tool into a hub that can pull and push data across your tool ecosystem.

**Category tags:** `#mcp` `#integrations` `#advanced` `#workflow`

---

## Use Claude Code in VS Code

**Contributor:** Teresa Torres

Claude Code can be used directly within VS Code, which is useful for writing workflows where you want to see file changes in real time and use the editor's features alongside Claude Code's capabilities.

**Category tags:** `#vscode` `#tools` `#setup`

---

# People Credited in the Article

| Name | Role/Context | Use Case |
|------|-------------|----------|
| Lenny Rachitsky | Author, newsletter publisher | Image enhancement, YouTube downloads, Google Doc images, raffle selection |
| Anthony Roux | Contributor | System diagnostics and troubleshooting |
| Martin Merschroth | Contributor | Batch file renaming and organization |
| Justin Dielmann | Contributor | Duplicate file detection |
| Ben Aiad | Contributor | Domain name brainstorming |
| Jeff Lindquist | Contributor | Lead identification from source code |
| Sergei Zotov | Contributor | GitHub pattern analysis for lead discovery |
| Dan Shipper | Contributor | Meeting recording self-analysis |
| Helen Lee Kupp | Mom, non-developer | Voice-to-article pipeline |
| Justin Bleuel | Clay (company) | Job description and hiring collateral |
| Derek DeHart | Contributor | Customer call synthesis with MCPs |
| Teresa Torres | Contributor | Content writing workflow in VS Code |
| Dan Heller | Contributor | Audio manipulation and translation |
| James Pember | Contributor | Self-driving documentation with Playwright |
| Gang Rui | Contributor | Weekly self-improvement loop |
| John Conneely | Contributor | DIY construction planning |
| Sumant Subrahmanya | Contributor (partial, behind paywall) | Competitor ad research |

**Total contributors noted:** 500+ practitioners contributed use cases; the article showcases the most innovative applications.

---

# Paywall Note

The article indicates that 34+ additional use cases are available to paid subscribers beyond what is captured above.
