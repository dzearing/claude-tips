# Reddit Post: I'm printing paper receipts after every Claude Code session

- **Source**: https://www.reddit.com/r/ClaudeCode/comments/1qxu7qp/
- **Author**: u/Htch
- **Date**: 2026-02-06
- **Score**: 1196
- **Comments**: 121
- **Subreddit**: r/ClaudeCode

---

## Post Content

> This has been one of my favourite creative side projects yet (and just in time for Opus 4.6).
>
> I picked up a second hand receipt printer and hooked it up to Claude Code's `SessionEnd` hook. With some `ccusage` wrangling, a receipt is printed, showing a breakdown of that session's spend by model, along with token counts.
>
> It's dumb, the receipts are beautiful, and I love it so much.
>
> It open sourced on GitHub -- [claude-receipts](https://github.com/chrishutchinson/claude-receipts) -- and available as a command line tool via NPM -- [claude-receipts on npm](https://www.npmjs.com/package/claude-receipts) -- if you want to try it yourself (and don't worry, there's a browser output if you don't have a receipt printer lying around..!).
>
> Of course, Claude helped me build it, working miracles to get the USB printer interface working -- so thanks Claude, and sorry I forgot to add a tip.

---

## Key Technical Details

### Hook Used: `SessionEnd`

The project hooks into Claude Code's `SessionEnd` lifecycle event. When a Claude Code session ends, the hook triggers a script that:

1. Uses **ccusage** to pull session cost/token data
2. Formats the data as a receipt layout
3. Sends it to an **Epson TM-T88V** thermal receipt printer via USB
4. Also supports browser-based output as a fallback

### Tools / Stack

- **GitHub repo**: https://github.com/chrishutchinson/claude-receipts
- **npm package**: `claude-receipts`
- **Printer**: Epson TM-T88V (confirmed by OP; other ESC/POS printers likely extensible)
- **ccusage**: Used for extracting per-model cost breakdown and token counts
- **Output**: Physical thermal receipt or browser-rendered receipt

---

## Extracted Tips and Patterns

### 1. SessionEnd Hook for Post-Session Automation

The core pattern: use Claude Code's `SessionEnd` hook to trigger any arbitrary action after a coding session completes. The receipt printer is a fun example, but the hook itself is the real takeaway -- it can drive any post-session workflow.

### 2. Barcode/QR Code for Session Resume

> **u/kevlar99** [30 points]: You should print a barcode that has the session id, so you can hook up a barcode scanner to continue old claude code sessions.

> **u/Adventurous_Ad_3889** [7 points]: Or even print QR codes to recall with your phone camera.

> **u/rjyo** [1 point]: claude --resume already takes a session ID so you could literally scan a receipt to pick up where you left off.

**Pattern**: Encode the session ID into a barcode or QR code on the receipt. Since `claude --resume <session-id>` is a supported command, scanning the barcode could directly resume a session. This bridges physical artifacts with digital session continuity.

### 3. Receipt Printer as Physical Notification System

> **u/rjyo** [1 point]: hook it up to print when a long-running agent session finishes. like a build notification you can hear from the kitchen. the thermal printer clacking away is your signal to come back to the desk.

**Pattern**: Use the thermal printer sound as an audible notification for long-running background tasks. The physical noise of the printer serves as a passive alert that work is complete.

### 4. Daily Briefing via Receipt Printer (n8n + AI)

> **u/r_hcaz** [10 points]: I have a daily briefing which includes weather, news, Todo, and summary of emails. Had it for years with n8n and before that my own scripts. All goes to a receipt printer each morning. I added AI to it last year to handle the generation of the output and give it a bit more of a 'personal assistant tone' it's pretty cool.

**Pattern**: Combine n8n (workflow automation) with AI-generated summaries, outputting to a receipt printer for a daily physical briefing. This predates the Claude Code receipt idea but shows the same hardware integration pattern.

### 5. Physical Todo Lists

> **u/Nervous_Apartment464** [1 point]: I would love this to have a ready printed out todo list for the day! I do enjoy digital ones, but it is so much satisfying having a pen to note off each task on a piece of paper.

**Pattern**: Use Claude Code hooks or automation to generate and print physical task lists. The tangible satisfaction of crossing off items on paper is a motivator some people prefer over digital checklists.

### 6. Location-Stamped Receipts for Remote Workers

> **u/Zestyclose-War8716** [1 point]: I usually collect paper receipts whenever i order out, and i keep them. Just to have a proof or reminder that i was at that place. Might tweak this a bit to add location to the receipt since i work from different places.

**Pattern**: Augment receipts with geolocation metadata to create a physical log of where coding sessions happened.

### 7. ccusage for Cost Tracking

The project relies on `ccusage` to extract session-level cost and token breakdowns by model. This tool appears to be a community utility for parsing Claude Code usage data, enabling per-session cost visibility.

### 8. Browser Fallback Output

The `claude-receipts` npm package supports browser-based rendering if no physical printer is available. This makes the tool accessible without specialized hardware while preserving the receipt aesthetic.

---

## Notable Comments (sorted by score)

### Top-Level Threads

**u/docfilmworkshop** [74 points]:
> I love this idea, its absurdist of course, but wow, what a flood of ideas I've just had for a Claude connected receipt printer. Daily weather report? List of remaining todos on project x? My kid would love it. I would love it.

**u/kevlar99** [30 points]:
> You should print a barcode that has the session id, so you can hook up a barcode scanner to continue old claude code sessions.

**u/wirenutter** [28 points]:
> That is pretty creative I'll say. I'd have a desk full of receipt paper by the end of the week.

**u/bozzy253** [17 points]:
> Up next are pop up stands in the mall where people can request pay for an app to be developed and a receipt like this.

**u/wifestalksthisuser** [12 points]:
> Cool and creative idea, don't let people trash you for it. I think its obvious this is a fun project and that you won't be printing a receipt for every single session until you die.

**u/NoYou3406** [2 points]:
> No way!!! Dude i'm working on a side project that is a voice AI agent hub (like alexa vibes) that is also wired to a receipt printer, that way you can prompt it to print things out. It would trigger a tool call to the receipt printer and u can use it to print anything. I just love the idea of having physical logs of AI, because often times good ideas, tips, recipes, etc. get lost in history. I will be adding your code to my own to have this as a feature!

**u/rjyo** [1 point]:
> this is the kind of project that makes me love this community. completely unnecessary, completely delightful. what would actually make this useful though: hook it up to print when a long-running agent session finishes. like a build notification you can hear from the kitchen. the thermal printer clacking away is your signal to come back to the desk. also I saw someone mention barcodes for session IDs and that rules. claude --resume already takes a session ID so you could literally scan a receipt to pick up where you left off.

**u/Htch (OP)** [5 points] (replying to printer compatibility question):
> Currently it works with the Epson TM-T88V, but I'm pretty sure it could be extended to work with other receipt printers!

**u/Heavy-Focus-1964** [22 points] (replying to environmental concern):
> good news! i've connected Claude to an autonomous gun turret that shoots at endangered birds

**u/k8s-problem-solved** [9 points]:
> Can burn digital and physical resources at the same time.

**u/NotEasyBeingGreener** [0 points]:
> You really need to get into the habit of writing/generating tests for your code in these projects. It will make the code far more robust to accepting contributions from other contributors and easier for others to adopt/modify.

**u/bookposting5** [1 point]:
> Very nice. Maybe Cashier should be Claude Code version? Instead of model.

---

## Broader Ideas Mentioned in Comments

| Idea | Commenter | Relevance |
|------|-----------|-----------|
| Barcode with session ID for `claude --resume` | u/kevlar99, u/rjyo | Session continuity via physical artifact |
| QR codes for phone-based session recall | u/Adventurous_Ad_3889 | Mobile workflow integration |
| Daily briefing (weather, todos, emails) via receipt printer + n8n | u/r_hcaz | Broader automation pattern |
| Voice AI agent hub with receipt printer tool calls | u/NoYou3406 | Multi-modal AI + physical output |
| Build notification sound from printer | u/rjyo | Passive alerting for long-running tasks |
| Physical todo list printing | u/Nervous_Apartment464 | Tangible task management |
| Location-stamped receipts | u/Zestyclose-War8716 | Remote work logging |
| Fax integration | u/9Blu | Retro communication channel |
| Cyber cafe / coffee shop billing model | u/vicdotso | Commercial application of per-session billing |
| Tax/expense tracking | u/DMmeyourarmveins, u/teophilus | Business cost documentation |
| 3D-printed enclosure for receipt printer | u/Jeff46K4 | Hardware project (github.com/Pharkie/scribe-evolution) |
| Kitchen/dot-matrix printer for durability | u/Riegel_Haribo | Alternative hardware |

---

## Related Projects Mentioned

- **claude-receipts**: https://github.com/chrishutchinson/claude-receipts (the main project)
- **scribe-evolution**: https://github.com/Pharkie/scribe-evolution (3D-printed enclosure + AliExpress receipt printer, by u/Jeff46K4)
- **ccusage**: Community tool for extracting Claude Code session cost/token data

---

## Summary of Actionable Patterns for Claude Code Users

1. **SessionEnd hook** is the key integration point. Any post-session automation (logging, notifications, analytics, physical output) can be triggered here.
2. **ccusage** enables per-session cost visibility, broken down by model and token count.
3. **Session ID** can be encoded into barcodes/QR codes and used with `claude --resume <id>` for physical-to-digital session continuity.
4. **Physical output** (receipt printers, speakers, displays) can serve as passive notification systems for long-running AI sessions.
5. The **npm package** (`claude-receipts`) is installable and provides both printer and browser output modes.
6. **n8n** (or similar workflow tools) can orchestrate broader automation that includes AI-generated content and physical output.
