# How to refactor 50k lines of legacy code without breaking prod using claude code
**Score:** 150 | **Comments:** 21 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qobg1g/how_to_refactor_50k_lines_of_legacy_code_without/
**Author:** u/thewritingwallah

## Post Content

I want to start the post off with a disclaimer: all the content within this post is merely me sharing what setup is working best for me currently and should not be taken as gospel or only correct way to do things. It's meant to hopefully inspire you to improve your setup and workflows with AI agentic coding. I'm just another average dev and this is just like, my opinion, man.

Well I wanted to share how I actually use Claude Code for legacy refactoring because I see a lot of people getting burned. They point Claude at a messy codebase, type 'refactor this to be cleaner', and watch it generate beautiful, modular code that doesn't work and then they spend next 2 days untangling what went wrong.

I just finished refactoring 50k lines of legacy code across a Django monolith that hadn't been meaningfully touched in 4 years. It took me 3 weeks without Claude Code, I'd estimate 2-3 months min but here's the thing: the speed didn't come from letting Claude run wild. It came from a specific workflow that kept the refactoring on rails.

**Core Problem With Legacy Refactoring**

Legacy code is different from greenfield. There's no spec. All tests are sparse or nonexistent. Half the 'design decisions' were made by old dev who left the company in 2020 and code is in prod which means if you break something, real users feel it. Claude Code is incredibly powerful but it has no idea what your code is supposed to do. It can only see what it does do right now but for refactoring, it's dangerous.

Counterintuitive move: before Claude writes a single line of refactored code, you need to lock down what the existing behavior actually is. Tests become your safety net, not an afterthought.

**Step 1: Characterization Tests First**

I don't start by asking Claude to refactor anything. I start by asking it to write tests that capture current codebase behavior.

My prompt: "Generate minimal pytest characterization tests for [module]. Focus on capturing current outputs given realistic inputs. No behavior changes, just document what this code actually does right now."

This feels slow. You're not 'making progress' yet but these tests are what let you refactor fearlessly later. Every time Claude makes a change, you run tests. If they pass, refactor preserved behavior. If they fail, you caught a regression before it hit prod.

I spent the first 4 days just generating characterization tests. By end, I had coverage on core parts of codebase, stuff I was most scared to touch.

**Step 2: Set Up Your CLAUDE.md File**

CLAUDE.md is a file that gets loaded into Claude's context automatically at the start of every conversation. Think of it as persistent memory for your project and for legacy refactoring specifically, this file is critical because Claude needs to understand not just how to write code but what it shouldn't touch.

Here's a structure I use:

- Build Commands section
- Architecture Overview section
- Refactoring Guidelines (IMPORTANT: Always run relevant tests after any code changes, prefer incremental changes over large rewrites, etc.)
- Hard Rules (DO NOT modify files in apps/auth/core without explicit approval, DO NOT change any database migration files, Always run tests before reporting a task as complete)

That 'Hard Rules' section is non-negotiable for legacy work. Every codebase has load-bearing walls, code that looks ugly but is handling some critical edge case nobody fully understands anymore. I explicitly tell Claude which modules are off-limits unless I specifically ask.

One thing I learned the hard way: CLAUDE.md files cascade hierarchically. If you have root/CLAUDE.md and apps/billing/CLAUDE.md, both get loaded when Claude touches billing code. I use this to add module-specific context.

**Step 3: Incremental Refactoring With Continuous Verification**

I break refactoring into small, specific tasks. Each task gets its own prompt. After each change, Claude runs the characterization tests. If they pass, we commit and move on. If they fail, we debug before touching anything else.

The prompt I use: "Implement this refactoring step: [specific task]. After making changes, run pytest tests/[relevant_test_file].py and confirm all tests pass. If any fail, debug and fix before reporting completion."

**Step 4: Code Review Catches What I Miss**

Even with tests passing, there's stuff you miss. Security issues, performance antipatterns, subtle logic errors that don't show up in your test cases. I run an AI code review tool on every PR before merging.

**Where This Breaks Down**

Context limits are real. Claude Code has a 200k token limit but performance degrades well before that. I try to stay under 25-30k tokens per session. For big refactors, I use handoff documents -- markdown files that summarize progress, decisions made and next steps so I can start fresh sessions without losing context.

Hallucinated APIs still happen. Claude will sometimes use methods that don't exist. The characterization tests catch most of this but not all.

Complex architectural decisions are still on you. Claude can execute a refactoring plan beautifully. It can't tell you whether that plan makes sense for where your codebase is headed. That judgment is still human work.

---

## Top Comments

### u/Ghostinheven (Score: 26)
I have refactored 20k+ lines of code too, which was not easy but I managed to get it done somehow. Using only claude won't be sufficient. It will bring bugs, and you prompting to solve bugs will bring more bugs. Even if you try to refactor things step by step, the context starts fading after 4-5 prompts. My approach was using spec driven development approach to deal with it. I generated specs for my existing code with a dedicated code refactoring workflow. I get my specs made, it broke the task into tickets. each ticket was a small task. I manually checked them. If the task was easy, I directly handed it off. Otherwise, I broke it down further into phases.

Note: While I'm doing all this, I don't need to worry about the context window because the claude will be referring these specs at every chat. So it actually made progress with every task, and not break things of step 1 when I reach step 4.

### u/OkWealth5939 (Score: 15)
TLDR: TDD

### u/EnriqueePerez (Score: 11)
Awesome post mate. I am leading a frontend refactor on nextjs and I will definitely take some of these advices. I didn't know you could create sub CLAUDE.md files, I always relay on README files and specific contexts files for Claude. I will try that. I would also strongly suggest, plan, plan and make more planning, it definitely lowers the chances of breaking something.

### u/TumanFig (Score: 4)
my verdict, this is a very long sales pitch for code rabbit. claude is just as good as a reviewer.

### u/campbellm (Score: 3)
Excellent writeup. This is the same zeitgeist that a lot of the spec-driven frameworks/plugins are starting to encode, too. Tests become your safety net, not an afterthought. Always were. The biggest win of tests are to make sure other and/or future stuff doesn't break what you did, not to ensure that what you did is correct.

### u/emisofi (Score: 2)
There is a huge application in the machine and process retrofit field. If this systems can characterize the control systems behavior of legacy systems, migrations would be way cheaper and painless.

### u/thewookielotion (Score: 2)
I had a 70k code base in python and I wanted to refactor it to use an HTML UI. It took me 2 weeks but I'm getting there. I think having a general idea of what needs to be done, and taking time to explain to an AI and brainstorm before starting the work is a valid strategy for people like me who aren't really professional coders.

### u/ThisGuyCrohns (Score: 2)
Two words. Documentation and Tests. That is your answer

### u/Saint_Nitouche (Score: 1)
Nice. For anyone unfamiliar 'snapshot testing' is a very useful technique for this kind of thing. There are some very useful libraries like Verify for .NET/JS which are great for ensuring a system produces byte-for-byte identical output before and after a change.

### u/imcguyver (Score: 1)
Seriously. That's all you need to say. How do I do something complex using AI and ensure mistakes are not made? Testing. That's it.

### u/piratebroadcast (Score: 1)
I don't mean to be rude but is it not obvious that one would ensure full test coverage before a refactor, AI or not?
