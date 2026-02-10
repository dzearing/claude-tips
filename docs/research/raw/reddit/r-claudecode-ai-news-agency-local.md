# How I built an AI news agency that runs itself - over 1B tokens processed locally
**Score:** 165 | **Comments:** 139 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qv4lqw/how_i_built_an_ai_news_agency_that_runs_itself/
**Author:** u/elibaskin

## Post Content

A few months ago, I decided to build something that sounds ridiculous: a news agency with no humans in the loop. Not "AI-assisted" journalism, but a fully autonomous system. AI decides what's newsworthy, researches the story, writes it, and publishes. No-human-in-the-loop news agency.

Some background: I'm a VP of Data & AI with a solid understanding of system engineering. I've been coding since I was 14 - started with Pascal and Assembly back in 1994. But I've never considered myself a professional developer. I have a good grasp of architecture and system design, I can read code, I know what good systems look like. I just don't enjoy writing it - but I sure do enjoy building it.

For this project, I haven't written or read a single line of code. What I do is have conversations with Claude Code about architecture, quality metrics, and failures. 57 days and 144 documented sessions later, StoryChase is live.

**What it actually does**

The system monitors several hundreds of non-mainstream channels in multiple languages, 24/7. Messages get clustered into events (91,000 detected so far). An AI "editor" decides if it's worth covering. A "narrator" agent researches using 19 tools - database queries, entity graphs, timeline analysis, web search. It writes actual journalism, not summaries. Publishes to the website. 2,325 stories published so far. Zero human touches.

**The local AI angle (this is the part I'm proud of)**

Everything runs on two GPUs in my home office. Here are the actual numbers from the database - average daily usage over the last week:

- Qwen3-8B (LLM): 35 million tokens/day, 26,000 requests/day - Local (RTX 3090)
- Qwen3-VL (Vision): 3.8 million tokens/day, 3,800 requests/day - Local (RTX 4060 Ti)
- Claude Haiku: 1.6 million tokens/day, 160 requests/day - Cloud API

That's 96% local processing. ~40 million tokens/day on consumer hardware. Well over a billion tokens processed locally since launch.

The cloud API is only used for the final story synthesis - the part readers actually see. All the heavy lifting (clustering, research, entity extraction, vision) runs on my own GPUs.

**How we actually built this**

I focused on architecture. Claude wrote the code. But that doesn't mean I just said "build me a news agency." We had conversations. Deep ones. About clustering algorithms (HDBSCAN vs DBSCAN vs Louvain). About what makes a story "newsworthy." About why the system was merging Australian news with Gaza coverage (spoiler: semantic similarity isn't story similarity). I brought 30 years of understanding how systems should work. Claude brought the implementation speed I never had.

Quality-driven development. Every few days, I'd ask Claude to analyze the last 1,000 events. "Are they coherent? Does the surprise score make sense? What's the false negative rate?" We'd find problems - like the "Surprise Valley" bug where novel messages had lower clustering rates - and fix them together.

Session logs as memory. Claude doesn't remember between sessions. So we built a system: .claude/sessions/YYYY-MM-DD-topic.md. Every significant session gets documented with decisions, insights, and open questions. 144 sessions. 6,500+ lines of notes. This is how you build something complex with an AI that forgets.

Embrace the failures. Our first architecture was a 5-level taxonomy. It was elegant. It completely didn't work. We tried entity-based clustering - it created mega-clusters around "Israel" and "Russia" instead of coherent stories. Every failure taught us something.

**Tips for building something serious with Claude Code**

If you're thinking about going beyond scripts and actually building a system:

- Build session logs. Create .claude/sessions/ and document everything. Decisions, rationale, what failed, what worked. This is your shared memory.
- Have deep discussions, not just requests. Don't say "build X." Say "what are the tradeoffs between X and Y?" Claude is a knowledgeable colleague. Use it that way.
- Run quality assessments. Ask Claude to analyze your data. "Look at the last 1,000 outputs. What patterns do you see? What's broken?" This catches drift before it compounds.
- Document failures explicitly. When something doesn't work, write it down. Failures constrain the solution space.
- Claude Code runs tests, sees errors, fixes code, and verifies. That feedback loop is everything.

The system runs 24/7. It's publishing right now while I write this post. The system is far from perfect. Having real users sending real feedback is priceless. And here's where Claude Code shines: the time from bug report to fix to deployment in production is often under an hour. That iteration speed changes everything for me.

---

## Top Comments

### u/AI_should_do_it (Score: 50)
Journalism is not in writing, it's in going in the field knowing the facts and presenting the whole picture without bias.

### u/Gugelizer (Score: 36)
Agree. "It writes actual journalism, not summaries". OP doesn't know what journalism is, and doesn't understand how AI works.

### u/elibaskin (OP Reply) (Score: 14)
Link to the website, if anyone is interested: https://storychase.co. Adding also the screenshot of the messages pipeline.

### u/Choperello (Score: 10)
Bot generated content for other bots to read.

### u/elibaskin (OP Reply) (Score: 9)
Actually, it knows quite a lot about who is reporting. Every channel has a bias profile. The system analyzes each message and scores it on a -1 to +1 scale. It tracks loaded terminology ("Zionist regime" vs "Israel", "terrorists" vs "resistance fighters", "martyrs" vs "casualties"). It detects emotional framing, victimhood assignment, source attribution patterns. These scores aggregate up to the channel level. After analyzing thousands of messages, the system has a very good understanding about the bias each channel represents.

### u/Celac242 (Score: 6)
This is cool. What is the intended use of this? Are you trying to create a news site? Or an aggregator? Or a for fun side project? Either way cool stuff

### u/elibaskin (OP Reply) (Score: 5)
This is a discussion I'd like to have. The system gathers the information directly from the sources. It can be a Druze reporting from Sweida in Syria, where he lives and fights, or a local government official in Iran, reporting on schools closure in a district. This allows for a fuller picture, often getting to sources mainstream journalists won't follow. As for "without bias" - back in 1995, when I was 15, we had critical reading classes, where we read newspaper articles, trying to identify personal preferences of the journalists and editors. "Without bias" is a myth. A journalist is biased, always.

### u/elibaskin (OP Reply) (Score: 4)
There are a lot of uses for such system: News site, Crisis discovery, With some adaptations - financial intelligence

### u/TinyZoro (Score: 2)
I mean in theory but what famous media institutions pass that test? Most of even relatively reputable outfits like the BBC are doing what OP are doing with 90% of their output coming from Reuters etc.
