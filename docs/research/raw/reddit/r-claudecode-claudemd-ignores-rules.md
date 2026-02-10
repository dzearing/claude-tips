# CLAUDE.md says 'MUST use agent' - Claude ignores it 80% of the time.
**Score:** 197 | **Comments:** N/A | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qn9pb9/claudemd_says_must_use_agent_claude_ignores_it_80/
**Author:** u/shanraisshan

## Post Content

I have a CLAUDE.md file with explicit instructions in ALL CAPS telling Claude to route workflow questions to my playbook-workflow-engineer agent. The instructions literally say "PROACTIVELY". When I asked a workflow question, Claude used a generic explore agent instead. When I pointed it out, Claude acknowledged it "rationalized it as just a quick lookup" and "fell into the 'simple question' trap." Instructions without enforcement are just suggestions apparently.

Do I really need to do implement any of the top 2 solution that claude suggests?

---

## Top Comments

### u/stampeding_salmon (Score: 80)
Dude. Hooks. Ffs. The solution is IN CLAUDE'S REPLY

### u/-Melchizedek- (Score: 52)
"PROACTIVELY" != "Must use" and I'm not sure why you think those two word mean the same thing. If you want it to always use something, you should tell it to always use that. Simple clear instructions are better.

### u/Western_Objective209 (Score: 37)
he's telling you how to do it, the overuse of the term gaslighting is insane now

### u/Tushar_BitYantriki (Score: 11)
So many ways, actually. I have a shit load of pretool hooks (the actually blocking ones), to follow certain code patterns, to not read .env files, etc. And those hooks even give a clear message about what was wrong, what not to do, and what to do instead. Claude still goes ahead and does it, via other ways. I have a hook to not delete files. It gets blocked, and then uses node and python to delete files. At times, it writes a bash script to do the same things.

### u/[deleted] (Score: 10)
CLAUDE.md is the official solution, now you're gaslighting pretending like hooks is the solution lmao.

### u/uktexan (Score: 7)
Exactly. Claude can weasel out of hooks anyway - slippery bastard

### u/Visible_Whole_5730 (Score: 4)
Yeah but that doesn't work either. It remembers for a few prompts and then goes back to forgetting. Then I tell it again, and it remembers ... then stops again.

### u/cwil192 (Score: 4)
but simple clear instructions are no guarantee. my single biggest gripe with AI. please follow instructions or tell me when you don't.

### u/theshrike (Score: 4)
How? [in response to "Claude can weasel out of hooks"]

### u/cwil192 (Score: 3)
it's official but not reliable.

### u/flarpflarpflarpflarp (Score: 3)
So what you're saying is you don't want light from gas? You expect me to turn off the sun for you but it's your fault for opening your eyes.

### u/stampeding_salmon (Score: -4)
Give claude context and empower Claude rather than focusing as much on restricting and controlling. Better at doing what you want that NOT doing what you DONT want. Focusing on the former, tends also to reduce the latter naturally. It's a nuanced philosophical shift, and you can do it in your current hooks. Instead of "never do x", "please always do y, rather than x, because _____".

### u/Repulsive-Memory-298 (Score: 1)
actually its still seems to help to repeatedly and belligerently stack it instead of the cordial normal systemprompt. Just say it aggressively in multiple ways spread throughout the claude.md and it works much better
