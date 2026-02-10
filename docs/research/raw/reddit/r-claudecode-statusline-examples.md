# Show me your /statusline
**Score:** 204 | **Comments:** 78 | **Subreddit:** r/ClaudeCode
**URL:** https://www.reddit.com/r/ClaudeCode/comments/1qycvdu/show_me_your_statusline/
**Author:** u/Gohanbe

## Post Content

[Image post showing an elaborate statusline configuration for Claude Code]

---

## Top Comments

### u/Special-Economist-64 (Score: 71)
This is statusparagraph, instead of statusline

### u/Gohanbe (OP Reply with setup instructions) (Score: 29)
On Windows:

Put this in C:\Users\<username>\.claude\settings.json

```json
"statusLine": {
  "type": "command",
  "command": "powershell -NoProfile -ExecutionPolicy Bypass -File C:\\Users\\<username>\\.claude\\statusline.ps1"
},
```

change <username> to your user name, duh..

2. create a file called statusline.ps1 like C:\Users\<username>\.claude\statusline.ps1

3. copy code from here and paste it into statusline.ps1: https://pastebin.com/h2GhCV7C

Restart your Terminal and Claude Code. this assumes you have already your claude credentials in .claude\.credentials.json which should be there already if you ever logged into claude code.

On Linux: Ask Claude to convert the above for .bashrc

### u/CalmProcess9764 (Score: 27)
[response to OP]

### u/OSUWebby (Score: 26)
Mind sharing how you created this status line? It's been a bit since I looked into options here but last time I did I couldn't find a good way to show session and weekly limits / reset times.

### u/Bohdanowicz (Score: 15)
Just ask CC to build it and input the screenshot.

### u/Narrow-Belt-5030 (Score: 5)
Thank you. I have one stolen from Get-Shit-Done but I like yours more. Take an upvote.

### u/_megazz (Score: 3)
Is the context usage accurate? I tried adding it to mine, but it doesn't seem to align with the remaining x% when that pops up.

### u/DatabaseUnhappy4043 (Score: 3)
[response to OP setup]

### u/Pimzino (Score: 2)
This is amazing, I use javascript for mine but was able to convert. Mine was similar to yours without the api calls to usage API but just replicated yours! THANKS!
