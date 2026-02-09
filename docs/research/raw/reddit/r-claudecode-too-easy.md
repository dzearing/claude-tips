# Reddit: "It's too easy now. I have to pace myself."

- **Source**: https://www.reddit.com/r/ClaudeCode/comments/1qy4qv1/its_too_easy_now_i_have_to_pace_myself/
- **Subreddit**: r/ClaudeCode
- **Author**: u/brucewbenson
- **Score**: 402 | **Upvote Ratio**: 94% | **Comments**: 54
- **Retrieved**: 2026-02-09

---

## Post Content

> It's so easy to make changes to so many things (add a feature to an app, create a new app, reconfigure to optimize a server, self host a new service) that I have to slow down, think about what changes will really make a useful difference, and then spread the changes out a bit.
>
> My wife is addicted to the self hosted photoviewer server I vibe coded (with her input) that randomly shows our 20K family pictures (usually on the family room big TV), and allows her to delete photos as needed, add events and trips (to show which photos were during what trip or for what event, if any), rotate photos when needed, move more sensitive photos out of the normal random rotation, and more to surely come.
>
> This is a golden age of programming. Cool. Glad I'm retired and can just play.

---

## Top Comments

### Thread 1 (score: 108) -- u/rjyo

> The photo viewer for your wife is exactly the kind of thing that makes this era special. Personal software that solves a real problem for someone you care about, not some startup pitch.
>
> I have the same pacing problem though. Every time I finish one project I immediately think of three more things I could build. The backlog grows faster than I can ship.
>
> What stack are you using for the photo viewer? Sounds like it could be a fun weekend project for others here too.

- **u/jpcaparas** (score: 20): "This is the dawn of personal software. I love it."
  - **u/swiftmerchant** (score: 1): "Guys, we said these words in 1990 when Visual Basic came out. That was the dawn. This could very well be the dusk lol"
- **u/brucewbenson** (score: 6): "Python flask server running on a proxmox Ubuntu LXC. Photos were already on a windows/samba share organized by year and month. Public API to get locations from photo gps coordinates. I also vibe coded a structure checker to make sure the photo folders were arranged correctly, named correctly, and checked filename embedded dates vs photo meta data dates vs file mtimes."
- **u/Chris266** (score: 16): "The SaaS is dead. Long live the SaaS."
  - **u/sundevil21CS** (score: 3): "Bloated B2B vertical SaaS is dead. Why pay for sales force or rippling when you can build your own all in one business system for cheap and not pay crazy pay per seat costs."
- **u/guifontes800** (score: 3): Going a similar route but with Rust because the compiler rigidity helps the LLM write better code. "If I tell it to follow idiomatic Rust then even better."
  - **u/brucewbenson** (score: 4): "Python flask as that is what Claude code picked plus I know Python well enough to feel comfortable with what it produced."
- **u/EvilPencil** (score: 1): Suggests starting from existing projects like Immich and forking/extending with vibe coding rather than building from scratch.

### Thread 2 (score: 31) -- u/justoneofus7

> That last bit is so true. Golden age for real.
>
> I've been reviewing AI-written code for months now and honestly... it's writing really solid code. Not perfect, but better than a lot of devs I've worked with.
>
> Building a productivity app for myself right now and others (hopefully). Would've taken me months before. Now it's... still taking months lol because I like to build a really good app through and through. The bottleneck isn't coding anymore - it's knowing what to build and why.
>
> This is the golden age for creative folks who can think through problems. The "just writing code" part is becoming commodity. Wild time to be building stuff.

- **u/EquipableFiness** (score: 5): "Knowing what to build and why is exactly the domain I am super interested. Very good point. Honestly it's like the fun part of coding in general for me. So I am kinda happy to move upstream so to speak"

### Thread 3 (score: 9) -- u/ultrathink-art

> The pacing thing is real and underappreciated. I've found the biggest trap is making changes just because you can -- you end up with scope creep across your own projects.
>
> What helped me: I keep a plain text backlog and force myself to batch changes. Instead of immediately implementing every idea that comes to mind, I write it down and revisit it 24-48 hours later. Half the time I realize the change wasn't worth making, or I've thought of a better approach.
>
> The photo viewer sounds great -- that's the kind of personal software that used to take weeks of weekends. Now you can actually build exactly what someone needs rather than settling for whatever app is close enough.

- **u/brucewbenson** (score: 2): "Plus I can't overwhelm my wife with 'gee, look at this' or else she'll stop using it. If she mentions something she'd like that will likely become a feature which I'll coordinate the GUI details with her. Also, it can't break or especially destroy pictures. Can not. The delete function waits 30 days before actually deleting anything. And I have normal system backups that can reach back further if needed."

### Thread 4 (score: 6) -- u/FuzzyBucks

> Last couple nights after work I bought a $20 webcam and created a program that streams the webcam video and uses computer vision to count the cars going by on the street outside. The program lets me crop the detection area to focus on a certain part of the feed and control settings that help with tracking cars in motion without undercounting/over counting. Now I can do my own traffic study if I want to complain to the city that there are too many cars driving too fast.

- **u/LordOfTheDips** (score: 1): Similar idea for tracking street parking availability and finding optimal parking times.

### Thread 5 (score: 5) -- u/thewookielotion

> As a scientist, this thing is a revolution. I think of a problem, I provide the equations and the general method in a markdown, and I don't even have to bother building a python skeleton anymore (as I used to 6 months ago)

### Thread 6 (score: 4) -- u/MultipliedBy

> I built a super simple but fast commuter app a few days ago which shows the next departure of my regular bus commute and you can flip the direction if you want to see the way home. This was out of frustration with Google maps and other maps services which, even if you searched from the exact bus station, added like 4 minute walk time which meant you always had to wind back the departure time to see if you would make it to the bus or not. Took me 30 minutes from no PRD to deployment on Github Pages, fully open-sourced, real-time data from the public transport system.

### Thread 7 (score: 3) -- u/xRedStaRx

> Talk more about the TV photo thing, how is it connected to the TV

- **u/bishopLucas** (score: 14): "This one is fun. Ask Claude 'what can you see on my network' in my case it found my lg tv, then went on to find that there is an api/python package for the tv. After that is whatever you want."
  - **u/mrwski** (score: 5): Took a photo of a non-WiFi digital water heater and Claude researched how to connect it to Home Assistant safely, providing a parts list and build instructions.
- **u/Secret-Collar-1941** (score: 6): "I've been vibecoding a custom instanced renderer for pointclouds and large geometry in pure C. Was happy with it on my Apple Silicon Mac. Then ported it to Android and put the apk on my Nvidia Shield. Now the thing runs on the 4k TV. Why? Because fuck you, that's why. What vibecoding has done to us..."
- **u/brucewbenson** (score: 1): Uses a smart TV with HDMI to a PC, accesses photo viewer via browser. Keyboard shortcuts (e.g. 0 to delete), remote control keypad support, and Claude added touch screen support without being asked.

### Thread 8 (score: 3) -- u/rafaelRiv15

> You are discovering SWE. Bottle neck was never the code.

### Thread 9 (score: 2) -- u/PliablePotato

> I think the difference here is that generally you sound like someone who would know how to do this if LLMs weren't available just slower. The issue that these tools have is it now limits the opportunity to learn. You can whip this up because you know the architecture, general layout and the technical requirements to get it done. Just saying "build me a picture app" won't always result in what you were able to accomplish because you've done a lot of skill building before AI. I worry that in this age of personal software people just won't bother to develop these skills at all.

- **u/brucewbenson** (score: 1): "I'm a retired software engineer with a BS in computer science. With that said a lot of good programmers are self taught (I started that way). Programming IMO should be a shop/skills class in our schools, but now especially with AI, it's something learnable by anyone with a bit of determination. What I do like is how Claude shows what it is doing and I can just review and approve or modify each step. I've learned a lot from seeing its work. I think it is a great learning tool if one uses it to learn rather than just say 'do it'."

### Thread 10 (score: 2) -- u/diogodiogogod

> This is so true. I was never a dev, and now I want to make additions to pretty much anything I use... For example decided to take TagGUI, a program that captions images and handles dataset, to also support videos (TagGUI_video). And from there I added so many new things to it... I wanted a masonry view for example that pretty much turned it into a video and images visualizer, the best one I've ever used... with cache, database, optimizations and everything... And now I took it into a quest to be able to make it work and load a 1M dataset in a masonry view... and I'm pretty dam close to make it work... it's a never ending code frenzy... the worse part is I get 0 money from all of this...

### Thread 11 (score: 2) -- u/DimfreD

> I so much agree with this. It's insane, I feel like a god lately. All small things I wanted which cost time suddenly cost me a couple of minutes. It's insane. I am so hyped. Tho also scared where it goes.

### Thread 12 (score: 2) -- u/wannabeaggie123

> Would you tell your child to get a computer science degree today lol

- **u/brucewbenson** (score: 1): "I would. Both my 20 something kids have CS degrees as do I and my wife. One is working in the field, the other is working part time jobs and looking for something outside of software engineering. Still a perfectly good degree and field, but harder to break into."

### Thread 13 (score: 2) -- u/BuildAISkills

> Yeah, I love building random small (and large) tools. I recently made an ai assistant to quickly answer questions in terminal, and now I'm working on a Trello clone for my workplace.

### Thread 14 (score: 1) -- u/jeeksq

Suggests Google Photos app for Chromecast/Google TV.

- **u/brucewbenson** (score: 1): "Trying to get other kinds of apps was always this way. Install the app, configure it as closely as possible to what we want, decide it has too many issues or just too difficult to make work as needed, uninstall, try a new app. Repeat until mediocre match to what we want... Now. One day at most to an app that does one of the key basic things we need. It is rock solid or it gets tweaked a time or two and then is rock solid. Add a feature that does exactly what we want. Maybe an hour or two. Repeat until after a week we have a great app doing exactly what we want and no more. Rock solid. Safe. Productive. No random breaking updates. No upsell or ads. Just works. My fear is the price of AI will skyrocket."

### Thread 15 (score: 1) -- u/Bigfeet17

> I'm trying to build my own app right now. I don't have any programming experience except for what I learned over 30 years ago. I would love to know more about how you are executing on this.

- **u/brucewbenson** (score: 2): "Describe in detail what you want the app to do. Describe it to Claude chat (to start). Tell it what you have available to you (PC, laptop, notebook, phone). Have a discussion with the AI about initial features and UI. Give it pictures or drawings or examples (another similar app, but with changes) to work with. Ask it how you would personally go about making this app happen. Just do it ;-)"

---

## Extracted Tips and Insights

### Workflow and Pacing

1. **Pace yourself deliberately**: The biggest trap is making changes just because you can. Scope creep across your own projects is a real risk when building is this easy.

2. **Maintain a plain text backlog**: Write down ideas instead of immediately implementing them. Revisit after 24-48 hours. Half the time the change is not worth making, or a better approach emerges.

3. **Batch changes**: Instead of continuous small tweaks, group related changes together and ship them as batches.

4. **Don't overwhelm your users**: Even when building for family/friends, introducing too many changes at once causes people to disengage. Let feature requests come from the user organically.

5. **From zero PRD to deployment in 30 minutes**: One commenter went from no product requirements document to a fully deployed commuter app on GitHub Pages in 30 minutes using real-time public transport APIs.

### Autonomous Productivity

6. **The bottleneck is no longer code -- it's knowing what to build and why**: Multiple commenters converge on this insight. "You are discovering SWE. Bottleneck was never the code." The creative/product thinking is now the scarce skill.

7. **Build personal software that solves real problems for people you care about**: The most successful projects mentioned solve specific pain points for the builder or someone close to them, not abstract startup ideas.

8. **One day to a working app, then iterative refinement**: The pattern is: build the core feature in a day or less, then incrementally add features over a week until you have exactly what you need.

9. **Safety-first design**: The photo viewer's delete function waits 30 days before actually deleting, with system backups reaching further. When building tools that handle important data, design for safety.

10. **Let Claude pick the stack**: OP used Python Flask because "that is what Claude code picked plus I know Python well enough to feel comfortable with what it produced." Trust the tool's suggestions when they align with your competencies.

11. **Describe in detail, discuss first, then build**: For beginners, the recommended approach is: describe what you want in detail, discuss features and UI with Claude chat, provide pictures/drawings/examples, then ask how to make it happen.

### Mindset Insights

12. **"The SaaS is dead"**: The era of personal software means not settling for bloated apps that are "close enough." Build exactly what you need with no upsell, no ads, no random breaking updates.

13. **Existing skills still matter tremendously**: Knowing architecture, layout, and technical requirements means you can guide AI effectively. "Just saying 'build me a picture app' won't always result in what you were able to accomplish because you've done a lot of skill building before AI."

14. **Claude as a learning tool**: "I do like how Claude shows what it is doing and I can just review and approve or modify each step. I've learned a lot from seeing its work. I think it is a great learning tool if one uses it to learn rather than just say 'do it'."

15. **Scientists and non-devs are empowered**: A scientist now provides equations and methods in markdown and gets working code without building Python skeletons. A non-dev extended an existing app with masonry views, caching, database optimization to handle 1M datasets.

16. **Network discovery as a starting point**: "Ask Claude 'what can you see on my network'" -- it found an LG TV and its API/Python package, opening up integration possibilities the user had not considered.

17. **Language rigidity helps AI**: One commenter uses Rust because the compiler's rigidity makes the LLM write better code. Telling it to "follow idiomatic Rust" improves output quality further.

18. **Fear of price increases**: Multiple commenters express concern that AI tool pricing will increase significantly as the value becomes undeniable. The current pricing feels unsustainably generous.

19. **The install-configure-uninstall cycle is over**: The old pattern of trying app after app and settling for mediocre matches is replaced by building exactly what you need in a day, then iterating to perfection.

20. **CS degrees still valuable but the field is shifting**: Domain knowledge, system design thinking, and problem decomposition remain valuable. The "just writing code" part is becoming commodity.
