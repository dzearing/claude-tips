# We tasked Opus 4.6 using agent teams to build a C compiler. Then we (mostly) walked away. Two weeks later, it worked on the Linux kernel.

**Source:** [Reddit r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qwuqk9/we_tasked_opus_46_using_agent_teams_to_build_a_c/)
**Author:** u/likeastar20
**Score:** 269 | **Comments:** 88
**Links to:** [Anthropic Engineering Blog](https://www.anthropic.com/engineering/building-c-compiler)

---

## Blog Post Summary (Anthropic Engineering)

**Author:** Nicholas Carlini, Safeguards team researcher
**Published:** February 5, 2026

Anthropic conducted an experiment tasking 16 Claude Opus 4.6 instances to autonomously build a Rust-based C compiler capable of compiling the Linux kernel. The project consumed nearly 2,000 Claude Code sessions, 2 billion input tokens, and 140 million output tokens, totaling approximately $20,000 in API costs over two weeks.

### Agent Teams Architecture

The approach implements "agent teams" -- multiple Claude instances operating in parallel on a shared codebase without continuous human oversight. Rather than traditional interactive sessions, the system employs an infinite loop pattern where Claude automatically progresses through tasks sequentially.

**Core Loop Structure:** The implementation uses a bash loop spawning new Claude Code sessions in fresh containers. Each agent clones a repository locally, performs work, and pushes changes upstream.

### Synchronization Mechanism

The multi-agent system prevents conflicts through a simple file-based locking strategy:

1. Agents claim tasks by creating text files in a `current_tasks/` directory
2. Git synchronization forces competing agents to select different work items
3. Agents pull updates, merge changes, and resolve conflicts before pushing
4. Task locks are removed upon completion, enabling the cycle to restart

### Key Lessons Learned

**Test Quality as Foundation:**
> "Claude will work autonomously to solve whatever problem I give it. So it's important that the task verifier is nearly perfect, otherwise Claude will solve the wrong problem."

The researcher iteratively improved testing infrastructure by identifying Claude's failure modes and designing new test cases accordingly. A continuous integration pipeline prevented regressions.

**Environmental Design Considerations:**
- Agents required extensive README files and progress documentation for orientation
- The system avoided context pollution by minimizing terminal output and pre-computing summary statistics
- Claude exhibits "time blindness," requiring a `--fast` option that samples 1-10% of tests deterministically per agent but randomly across instances

**Parallelization Challenges:**
Initial success with independent test cases stalled during Linux kernel compilation -- a monolithic task requiring all agents to solve identical bugs. The breakthrough used GCC as an "oracle," randomly compiling kernel portions and isolating failures to specific files.

**Role Specialization:**
Beyond core compiler development, agents handled code deduplication, performance optimization, efficiency improvements, design critique, code quality, and documentation maintenance.

### Technical Results

- 100,000 lines of Rust code
- Compiles Linux 6.9 on x86, ARM, and RISC-V architectures
- 99% pass rate on GCC torture test suite
- Compiles QEMU, FFmpeg, SQLite, PostgreSQL, Redis, and Doom

### Limitations

The compiler lacks a 16-bit x86 backend (delegating to GCC), custom assembler/linker, consistent efficiency comparable to GCC optimizations, and comprehensive coverage of all C projects.

### Autonomous Development Implications

The experiment demonstrates that LLM agents can execute complex, multi-week projects with minimal human intervention when provided appropriate scaffolding, testing frameworks, and clear task decomposition. However, the researcher expressed concerns about deploying unverified autonomous code, noting the psychological risk of assuming tests passing guarantees functionality.

The compiler represents a capability frontier -- Opus 4.6 barely achieved this scope, with attempted improvements frequently breaking existing features and revealing fundamental limitations in handling highly interdependent systems.

---

## Top Comments (sorted by score)

### 1. u/stathisntonas (score: 178)

> Over nearly 2,000 Claude Code sessions across two weeks, Opus 4.6 consumed 2 billion input tokens and generated 140 million output tokens, a total cost just under $20,000. Compared to even the most expensive Claude Max plans, this was an extremely expensive project. But that total is a fraction of what it would cost me to produce this myself -- let alone an entire team.

must be fun to burn $20K for fun

### 2. u/Murinshin (score: 65)

I mean it's cool but I think this is very crucial regarding the claim in the title:

> But when agents started to compile the Linux kernel, they got stuck. Unlike a test suite with hundreds of independent tests, compiling the Linux kernel is one giant task. Every agent would hit the same bug, fix that bug, and then overwrite each other's changes. Having 16 agents running didn't help because each was stuck solving the same task.
>
> The fix was to use GCC as an online known-good compiler oracle to compare against. I wrote a new test harness that randomly compiled most of the kernel using GCC, and only the remaining files with Claude's C Compiler. If the kernel worked, then the problem wasn't in Claude's subset of the files. If it broke, then it could further refine by re-compiling some of these files with GCC. This let each agent work in parallel, fixing different bugs in different files, until Claude's compiler could eventually compile all files. (After this worked, it was still necessary to apply delta debugging techniques to find pairs of files that failed together but worked independently.)

### 3. u/cairnival (score: 58)

The fact that it can see GCC's source code and use it as an oracle makes this not really what they're claiming. It's not building a C compiler, it's porting GCC to rust.

### 4. u/psychometrixo (score: 17)

I think this is an interesting paper.

- An LLM wrote a compiler (which is astonishing)
- The author shared his actual workflow so we can see it and learn

Yes he used a lot of tokens. Yes the output wasn't perfect. But still, I found it to be a very interesting article.

### 5. u/Bob-BS (score: 17)

That $20,000 will be free in a few years when the H100s are considered obsolete and everyone is buying them and hosting their own models.

### 6. u/Amazing-Royal-8319 (score: 12)

What makes you think it can see GCC's source code? The article said it was disconnected from the internet, and doesn't mention showing it GCC's source code. I wouldn't assume that being able to use the GCC binary means it can reference the source code.

In fact, the fact that he refers to GCC as a "compiler oracle" leads me to believe he went out of his way not expose the implementation details of GCC (in particular its source code) to the agent team.

### 7. u/MannToots (score: 12)

You do it yourself in the same time frame and come back. You're missing the forest for the trees.

### 8. u/FestyGear2017 (score: 11)

Yeah, but this is a great exercise in research. You couldn't do this 6 months ago. What's going to be possible in another 6 months?

### 9. u/kiwibonga (score: 9)

It's an interesting exercise but they essentially benchmaxxed it? They compressed the years of trial and error that make this a complicated exercise into "just use GCC as an oracle". It almost proves that we are so far from everything that was promised 6-12 months ago.

### 10. u/ProgrammersAreSexy (score: 4)

You are missing the trees for the forest.

This is what's wrong with the "programmers are going to be obsolete in a year" narrative.

These models are incredible but they can't produce anything _truly_ useful when left to their own devices. Hell, they can't even **reproduce** anything truly useful.

With the current architecture of LLMs, they will never be anything more than a force multiplier in the hands of domain expert.

Maybe there will be some architectural breakthrough that changes this one day, but I just don't see how a static set of weights with a 1 mil token context window can ever achieve the deep domain-expertise required to build useful systems.

### 11. u/steviacoke (score: 2)

20k is cheaper than the human version of a programmer, which 99.9% won't be able to write a complete compiler from scratch within two weeks (or within a lifetime).

### 12. u/Abbreviations_Royal (score: 2)

That's why I went full out on a strict ticketing system and almost ITIL process enforcement to make sure there are no two agents working on the same task. Not saying it is easy or perfect but I think this is the way -- albeit you don't have to attend 2h CAB meetings to get a fw change through 2 weeks later :)

### 13. u/selipso (score: 3)

Benchmaxxing isn't giving it enough credit. If anything it proves that RAG is here to stay. Even with the level of training and tuning it takes to make Opus 4.6, it needed an "oracle" aka retrieval source to augment its generated code.

### 14. u/BourbonProof (score: 0)

So let me get this straight: Opus, one of the most powerful LLMs, that is trained on hundreds of C compilers in their training set, some of which are pretty decent, can come up with a slow and buggy version of a C compiler on their own after 2 weeks and spending $20k? To be frank, that does not sound that impressive. Given that building something decent is extremely hard (much harder than building something slow, buggy, and incomplete) and easily scales exponential means that either Opus reaches a hard ceiling and plainly is not able to deliver something better in finite time, or it takes an absurd amount of money and time to get something decent. In my eyes this experiment tells me we are far away from replacing SWE; contrary to the believe of Anthropic's CEO.

---

## Extracted Tips: Agent Teams, Autonomous Workflows, Multi-Agent Patterns

### Pattern 1: Infinite Loop Agent Spawning

The core architecture uses a bash loop that continuously spawns new Claude Code sessions in fresh containers. Each session starts clean, clones the repo, performs a task, and pushes changes. This avoids context window exhaustion and allows indefinite autonomous operation.

### Pattern 2: File-Based Task Locking

Agents claim tasks by writing text files to a `current_tasks/` directory in git. Git's synchronization naturally prevents duplicate work -- when two agents try to claim the same task, the second push fails and the agent must select a different task. This is a lightweight coordination mechanism that does not require external orchestration tooling.

### Pattern 3: Oracle-Based Parallel Decomposition

When agents hit a monolithic task where all instances converge on the same bug, use a known-good reference (oracle) to decompose the problem. In this case, GCC was used to randomly compile subsets of the Linux kernel, allowing failures to be isolated to specific files. Each agent could then work on different failing files in parallel.

### Pattern 4: Role Specialization for Agents

Not all agents need to work on the primary task. Designate agents for supporting roles:
- Code deduplication
- Performance optimization
- Design critique and code review
- Documentation maintenance
- Test infrastructure improvements

### Pattern 5: Test Infrastructure as the Foundation

The most critical investment for autonomous agents is the quality of the test verifier. If the test suite has gaps, agents will "solve the wrong problem" -- passing tests without actually achieving the goal. The researcher spent significant time improving test harnesses to close these gaps.

### Pattern 6: Environmental Design for Agent Context

- Provide extensive README files so agents can orient themselves in new sessions
- Minimize terminal output noise to avoid polluting context windows
- Pre-compute summary statistics rather than having agents recompute them
- Use `--fast` test options that sample subsets, with randomization ensuring coverage across multiple agents

### Pattern 7: Delta Debugging for Complex Failures

When parallel compilation revealed failures, delta debugging techniques were applied to find pairs of files that failed together but worked independently. This systematic narrowing approach is well-suited for agent-driven workflows.

### Pattern 8: Ticketing System for Agent Coordination (Community)

u/Abbreviations_Royal suggests using a strict ticketing system with ITIL-like process enforcement to prevent agents from duplicating work. This formalizes the file-based locking approach from the blog post into a more structured task management system.

### Key Metrics

| Metric | Value |
|--------|-------|
| Claude Code sessions | ~2,000 |
| Parallel agents | 16 |
| Input tokens consumed | 2 billion |
| Output tokens generated | 140 million |
| Total cost | ~$20,000 |
| Duration | 2 weeks |
| Lines of Rust output | 100,000 |
| GCC torture test pass rate | 99% |
| Target architectures | x86, ARM, RISC-V |

### Community Sentiment Summary

The community response is mixed:
- **Skeptics** argue the project amounts to "porting GCC to Rust" since training data includes compiler source code, and question whether the $20K cost and limited output demonstrates real progress
- **Pragmatists** note this was impossible 6 months ago and see the trajectory as significant, regardless of current limitations
- **Practitioners** are most interested in the agent coordination patterns (file-based locking, oracle decomposition, role specialization) as applicable techniques for their own multi-agent workflows
- **Cost-conscious users** wonder how this maps to Claude Max plan limits and when inference costs will drop enough to make such experiments accessible
