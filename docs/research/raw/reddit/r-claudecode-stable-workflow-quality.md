# Opus fell off? Here's the workflow that kept my code quality stable
**Score:** 115 | **Comments:** 16 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qnhgcc/opus_fell_off_heres_the_workflow_that_kept_my/
**Author:** u/tech-coder-pro

## Post Content

I've seen the same pattern a bunch of you are posting about: Opus feels off, more "confident wrong," edits that drift, missed constraints, and it takes extra cycles to land a clean change.

I'm not here to litigate why (infra bugs, routing, whatever). I just want to share a workflow that made my day-to-day coding feel reliable again. It works great for me with most good models like sonnet or opus.

**This is the loop:**

1) Specs -> 2) Tickets -> 3) Execution -> 4) Verification -> back to (3) until all good.

**0) Ground rules (the whole thing depends on this)**

- Single source of truth: a collection of specs (e.g. specs/ with one file per feature) that never gets "hand-wavy."
- Execution: it doesn't rewrite the spec, just works on tickets.
- Verification: Check the diff based on the ticket context.
- If you skip any of these, you're back to vibe-coding.

**1) Specs (make the model do the thinking once)**

Goal: turn "what I want" into something testable and reviewable.

My spec template:
- Non-goals (explicit)
- User stories (bullets)
- Acceptance criteria (checkboxes)
- Edge cases (bullets)
- API / data model changes (if any)
- Observability (logs/metrics)
- Rollout plan / risk

Prompt: "You are my staff engineer. Draft a spec for the feature below using the template. Ask up to 5 clarifying questions first. Then produce a spec that is measurable (acceptance criteria) and includes edge cases + non-goals."

Key move: I treat the spec like code. If it's vague, it's wrong.

**2) Tickets (convert spec -> executable slices)**

Goal: no ticket ambiguity, no "do everything" tasks.

Ticket format I use: Title, Context (link to spec section), Scope (what changes), Out of scope, Implementation notes (optional), Acceptance checks (commands + expected behavior)

Prompt: "Convert this spec into 5-12 engineering tickets. Each ticket must be independently mergeable. Keep tickets small (1-3 files typically). For each ticket: include acceptance checks (commands + what to verify)."

**3) Execution (ticket-in, patch-out)**

I paste ONE ticket at a time. Prompt: "Implement Ticket #3 exactly. Constraints: Do not change behavior outside the ticket scope. If you need to touch more than 5 files, stop and propose a split. Keep diffs minimal."

If it starts drifting, I don't argue and just stop it and re-anchor: "You're going out of scope. Re-read the ticket. Propose the smallest diff that satisfies the acceptance checks."

**4) Verification loop (don't trust the model's "done" signal)**

Goal: the model doesn't get to decide it's done.

At this stage: run the checks (tests / lint / typecheck), show exactly what failed, confirm acceptance criteria line-by-line, flag mismatches vs the spec or ticket.

Then feed only the failures back into Claude Code: "Here are the failing checks + error output. Fix only what's needed to make them pass, staying within Ticket #3."

Repeat until checks are green and acceptance criteria is visibly satisfied.

---

## Top Comments

### u/Moonknight_shank (Score: 11)
nice workflow! I also kinda do something similar by making PRD and Tech docs with opus manually but i ll try the automated way, sounds appealing.

### u/Memezawy (Score: 2)
I was wondering in that case would using opus 4.1 be better if limits isn't an issue?

### u/tech-coder-pro (OP Reply) (Score: 2)
I tried pairing with sonnet 4.5 and it worked very good so opus 4.1 should work

### u/TheOriginalAcidtech (Score: 1)
Add hooks so you cant skip the steps. The human interface is always the most brittle. Simply live with the fact you MUST force the model/harness to corral the USER more than ANY model.

### u/Conscious_Concern113 (Score: 1)
I agree with everything you said. I run a similar flow but I use codex as the verifier.

### u/Kyan1te (Score: 1)
Got a GitHub repo as an example?

### u/martinsky3k (Score: 1)
What good is all this when claude hallucinates on first prompt? Your grounded truth is one of the issues that claude just ignores. It feels a lot like a beating around the bush bandaid. Instead of, you know, let me keep the model I subscribed to.
