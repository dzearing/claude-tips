# 18 months & 990k LOC later, here's my Agentic Engineering Guide (Inspired by functional programming, beyond TDD & Spec-Driven Development).
**Score:** 131 | **Comments:** 26 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qthtij/18_months_990k_loc_later_heres_my_agentic/
**Author:** u/manummasson

## Post Content

I learnt from Japanese train drivers how to not become a lazy agentic engineer, and consistently produce clean code & architecture without very low agent failure rates.

People often become LESS productive when using coding agents. They offload their cognition completely to the agents. It's too easy. It's such low effort just to see what they do, and then tell them it's broken.

I have gone through many periods of this, where my developer habits fall apart and I start letting Claude go wild, because the last feature worked so why not roll the dice now. A day or two of this mindset and my architecture would get so dirty, I'd then spend an equivalent amount of time cleaning up the debt, kicking myself for not being disciplined.

**The core loop: talk -> brainstorm -> plan -> decompose -> review**

Why? Talking activates System 2. It prevents "AI autopilot mode". When you talk, explaining out loud the shape of your solution, without AI feeding you, you are forced to actually think.

This is how Japan ensured an insanely low error rate for their train system. Point & Call. Drivers physically point at signals and call out what they see. It sounds unnecessary. It looks a bit silly. But it works, because it forces conscious attention.

**Agents map your patterns, you create them**

LLMs are great at mapping patterns. It's how they were trained. They will convert between different representations of data amazingly well. From a high level explanation in English, to the representation of that in Rust.

But creating that idea from scratch? Nah. They will struggle significantly, and are bound to fail somewhere if that idea is genuinely novel, requiring some amount of creative reasoning.

**The Loop in Practice**

You start by talking about your task. Describe it. Try to define it from first principles. Then create a mindmap to start exploring the different branches of thinking you have about this problem.

When it comes to the actual plan, get Claude to decompose the plan into:

1. Data model
2. Pure logic at high level (interactions between functions)
3. Edge logic
4. UI component
5. Integration

**Why Types Are Everything**

The data model, i.e. the types, is the most important. It's also (if done right) a tiny amount of code to review.

Whatever you are building does something. That something can be considered a function that takes some sort of input, and produces some sort of output or side effect. The inputs and outputs have a shape. That structure being made explicit, and being well mapped into your code's data structures is of upmost importance.

This comes from the ideas in "Functional Design and Architecture" by Alexander Granin, specifically the concept of domain-driven design.

It's even more important with coding agents. Because for coding agents they just read text. With typed languages, a function will include its descriptive name, input type, output type. All in one line. A pure function will be perfectly described ONLY by these three things.

**Why Each Stage Matters**

- Data model first because problems here cascade. Review it carefully. It's usually tiny, a few lines, but it shapes everything.
- Pure logic second because these are the interactions between modules and functions. The architecture.
- Edge logic third because this is where tech debt creeps in. Scrutinize these boundaries.
- UI component fourth to reduce complexity for the LLM. You don't want UI muddled with the really important high level decisions.
- Integration last because here you will want E2E testing to ensure your original specs work.

The uncomfortable truth is that agents make it easier to be lazy, not harder. Point and talk. Force yourself to think first. Then let the agents do what they're actually good at.

---

## Top Comments

### u/Otherwise_Wave9374 (Score: 5)
This resonates hard. The "agents make you lazier" point is real, and the Point and Call analogy is a great mental model for forcing deliberate attention. Ive had the best results with a similar loop: I write the spec and acceptance tests myself, then let the agent propose an implementation, then I review like a cranky maintainer. Also agree that types/data model first massively reduces agent flailing.

### u/antonkw_sky (Score: 4)
I would add "use all tooling to bring more limitations into your type system", it works like format enforcement and nudges LLM not only provide valid outputs but also makes it more accurate and thinking about edge cases.

### u/Aphova (Score: 4)
The visual graph approach is fascinating. I've long felt that the 2D text format of the traditional IDE was a bizarrely long-lived constraint that simply lived on because it mapped 1:1 to the output.

### u/kassuro (Score: 3)
Your approach sounds logic overall to me. But I wonder what is the benefit in this. What do I gain in comparison to the traditional way? Don't we just offload the syntax writing at this point? All the actual work is done by the human this way, as this is like 80% of the hard work for development.

### u/manummasson (OP Reply) (Score: 2)
High level plan you think of yourself -> 10 mins (which you would have to do anyway in trad eng). Plan -> agent produces first draft, you review the most important parts -> 10 mins. Agent produces 400 lines of code -> only review the most important 40 lines. And with this method you can be confident that these are 400 lines of robust code and architectural changes. So the AI did multiply you.

But if you let it go fully autonomous, AI writes 800 LOC which then fails for three iterations, has silent bugs for 5 iterations, and makes the next feature 2x slower and harder to build. It doesn't scale.

### u/nnennahacks (Score: 2)
Thanks for sharing this! Just starred on GitHub. Will hopefully test it out over the weekend

### u/AdCommon2138 (Score: 2)
About system 2. Not entirely how it works. You can have very long back and forth between people in debate, yet their system 2 doesn't activate.

### u/Illustrious_Yam9237 (Score: 2)
try to find places where you can create boundaries, document those interfaces and start building little walled gardens of self-contained functionality.

### u/manummasson (OP Reply) (Score: 2)
I am not disagreeing with you. Speaking doesn't automatically make you completely rational. But the alternative is *not* thinking, and just going with whatever AI recommends. Try think out loud for the next problem you have, it's uncomfortable and hard and makes you realise you didn't actually have as good of a grasp on the problem as you thought.
