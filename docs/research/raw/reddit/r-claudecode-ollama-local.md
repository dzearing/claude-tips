# Reddit: Has anyone tried Claude Code with local model? Ollama just dropped official support

**Source:** [r/ClaudeCode](https://www.reddit.com/r/ClaudeCode/comments/1qhj13v/has_anyone_tried_claude_code_with_local_model/)
**Author:** u/konal89 | **Score:** 366 | **Upvote Ratio:** 99%
**Retrieved:** 2026-02-09

---

## Original Post

Could be interesting setup for small tasks, especially with new GLM 4.7 flash 30B.

You could run Ralph loop as many as you want without worrying about the usage limit.

Anyone has any experiment with this setup?

[Official blog post from Ollama](https://ollama.com/blog/claude).

---

## Top Comments (sorted by score)

### 1. u/Prof_ChaosGeography (score: 77) -- Comprehensive local model experience

> I have. I've used Claude router to local models right out of llamacpp server and I also have a litellm proxy setup with an anthropic endpoint. I've found it's alright. Don't expect cloud Claude levels of intelligence out of other models especially local models that you can run, and don't expect good intelligence from ollama created models.
>
> Do yourself a favor and ditch ollama. You'll get better performance with llamacpp and have better control over model selection and quants. Don't go below q6 if your watching it and q8 if your gonna let it rock.
>
> Non anthropic and non openai models will need to be explicitly told what to do and how to do it and where to find something. Claude and GPT are extremely good at interpreting what you meant and filling in the blanks. They are also really good at breaking down tasks. You will need to get extremely verbose and get really good at prompt engineering and context management. Don't compact and if you change something in context clear it and start fresh.
>
> **Edit:** Claude is really good at helping you build good initial prompts for local models. It's why I kept Claude but lowered it to the $20 plan and might ditch it entirely.

### 2. u/onil34 (score: 11) -- VRAM requirements

> In my experience the models at 8gb suck at tool calls. At 16gb you get okayish tool calls but way too small of a context window (4k) so you would need at least 24GB of VRAM in my opinion.

### 3. u/mpones (score: 8) -- Local models shine at scale

> True but damn are local models lifesavers when you scale... "Claude scanned those documents easily though..." ok, true, awesome. Now you've been tasked with finding an unidentifiable needle in a haystack of a million documents... either prepare for a hefty lift on API usage, or recognize that this is one of the core use cases to local models (assuming you can support quality medium models locally).
>
> I'm curious: have you tried using Opus 4.5 to generate a PRD, but with those added requirements (what to do, where to find it, version numbers, etc) and let the local model follow the PRD? Very curious about this.

### 4. u/zkoolkyle (score: 8) -- PRD generation workflow

> SWE here with $20 Claude sub. I've had success with this approach while stuck on mobile and want to note a good idea / thought. I'll use Claude Opus on my mobile to generate a "Cursor formatted PRD" + some Vitest test to validate the result.
>
> Then I can review/execute when I'm back in the office: I usually exec with Composer 1... but FWIW - these are "Claude projects" with high level scope for added context. Try it, can vouch.
>
> I have a 3090 but $20/m is worth it to *avoid* any downtime related to having to maintaining a local model 24/7. I'm also not a fan of the added heat/noise that comes from running my gaming pc and Anthropic quality is top notch. I still enjoy experimenting with local models on my GPU.

### 5. u/StardockEngineer (score: 8) -- Context window constraints

> At 30b or 24b, you'll be starving for context. CC has about 30k context _on the first call_.
>
> Running Devstral 24b at Q6 on my 5090, I only have room for 70k. It'll be lower with 30b. You will want to consider quantizing the KV Cache, at minimum.

### 6. u/Designer-Leg-2618 (score: 7) -- Setup simplicity

> There're two parts. The hard part (done by Ollama) is implementing the Anthropic Messages API protocol. The easy part (users like you and me) is setting the API endpoint and (pseudo) API key with two environment variables.

### 7. u/buildwizai (score: 6) -- Ralph loop unlimited

> Now that's an interesting idea - Claude Code + Ralph without the limit.

### 8. u/Artistic_Okra7288 (score: 4) -- Devstral 2 Small success

> I'm currently rocking Devstral 2 Small 24b via llama.cpp + Claude Code and Get-Shit-Done (GSD). It has been working out quite nicely although I've had to fix some template issues and tweak some settings due to loops. Overall has saved me quite a bit of $$$ from API calls so far.

### 9. u/SatoshiNotMe (score: 4) -- llama-server guide with Qwen3

> Not for serious coding but for sensitive docs work I've been using ~30B models with CC via llama-server (which recently added anthropic messages API compat) on my M1 MacBook Pro Max 64GB, and TPS and work quality is surprisingly good. Here's a guide I put together for running local LLMs (Qwen3, Nemotron, GPT-OSS, etc) via llama-server with CC:
>
> https://github.com/pchalasani/claude-code-tools/blob/main/docs/local-llm-setup.md
>
> Qwen3-30B-A3B is what I settled on, though I did not do an exhaustive comparison.

### 10. u/MobileNo8348 (score: 2) -- 5090 with 32B models

> Running qwen and deepseek on my 5090 and there are decent. I think is the 32B that fit smoothly with context headroom.
>
> One can have uncensored models offline. That's an up too.

### 11. u/larsupb (score: 2) -- MiniMax 2.1 experience

> 30b models are not a good option at all for using it with codex opencode or Claude. We are running a MiniMax 2.1 in AWQ 4bit quant and it works okay. But for complex tasks this setup still is questionable.

### 12. u/Practical-Bed3933 (score: 2) -- Session persistence bug

> `ollama launch claude` starts cloud code fine for me. It also processes the very first prompt but then loses the conversation. It's stuck in the first prompt forever. It's like it's a new session with every prompt. Anyone else? I use glm-4.7-flash:bf16.

### 13. u/raucousbasilisk (score: 3) -- Devstral recommendation

> Devstral small is the only model I've ever actually felt like using so far.

### 14. u/Prof_ChaosGeography (score: 3) -- Hardware and model recommendations

> I have a strix halo machine like the framework desktop that I run models on in addition to my desktop with 192GB for larger models.
>
> I've found gpt-oss-120b with high reasoning is rather good and devstral small in q8 especially the new one does extremely well. I've used qwen coder 30b and found it works great at implementing.
>
> I've used the GLM air series and liked them but need to keep the desktop running so I don't use it heavily.

### 15. u/Prof_ChaosGeography (score: 3) -- Ralph loop with TDD

> I've been using something similar to the Ralph loop since I've started using LLMs for code. Using a local model with Ralph is great if your using test driven development for the loop and have premade the unit tests.

### 16. u/EveningGold1171 (score: 1) -- MiniMax on MacBook Pro

> 2 bit quant of minimax m2.1 if you have a 128gb mbp has been my go to.

### 17. u/StardockEngineer (score: 1) -- Claude Code Router context

> A lot of us have been using other models with CC for quite some time, thanks to Claude Code Router. You could have been doing this this whole time.
>
> But it's nice Ollama added to natively. Llama.cpp and vllm added it some time ago (for those that don't know).

### 18. u/konal89 (score: 1) -- GLM 4.7 test failure

> I have tried on my M1 32G + LM Studio. Did not end well. Spitted out weird numbers. Though might be because my machine is too weak for that.

### 19. u/konal89 (score: 1) -- Use case for local models

> I would say like if you need to work with a static website, or better if you divide your task into small chunks - then it also can work. Bigger model for planning, small model for implementing. Privacy + cost is the thing keep local setup alive (uncensored is also a good reason too).

---

## Extracted Tips and Insights

### Setup Methods

- **Ollama native support:** Ollama now implements the Anthropic Messages API protocol. Set the API endpoint and pseudo API key via two environment variables.
- **llama.cpp / llama-server:** Preferred over Ollama by experienced users. Better performance, more control over model selection and quantization. Recently added Anthropic Messages API compatibility.
- **Claude Code Router:** Has been available for some time to route Claude Code to alternative models, including local ones.
- **LiteLLM proxy:** Can set up with an Anthropic endpoint to route to local models.

### Recommended Models for Local Use

| Model | Notes |
|-------|-------|
| **Devstral 2 Small 24b** | Multiple users recommend; works well with llama.cpp + CC |
| **Qwen3-30B-A3B** | Good for docs work on M1 Max 64GB |
| **Qwen Coder 30b** | Works great at implementing |
| **gpt-oss-120b** | Good with high reasoning (needs large RAM/VRAM) |
| **MiniMax M2.1 (AWQ 4bit)** | Okay for general tasks; 2-bit quant works on 128GB MBP |
| **GLM 4.7 Flash 30b** | Mixed results; may need more than 32GB RAM |
| **Deepseek 32B** | Decent on 5090 |

### Hardware Requirements

- **Minimum practical VRAM:** 24GB (8GB = poor tool calls; 16GB = okay tool calls but only ~4k context)
- **Context window constraint:** Claude Code uses ~30k context on the first call alone. A 24b model at Q6 on a 5090 only provides ~70k total context. Consider KV cache quantization.
- **Recommended minimum RAM/VRAM:** 32GB+ for usable experience
- **M1 Max 64GB:** Workable for ~30B models with decent TPS
- **128GB MacBook Pro:** Can run MiniMax M2.1 at 2-bit quant
- **192GB desktop:** Needed for larger models like gpt-oss-120b

### Quantization Guidance

- **Q8:** Recommended if running unattended ("let it rock")
- **Q6:** Minimum if you are actively watching and can intervene
- **Below Q6:** Not recommended
- **KV cache quantization:** Worth considering to extend context window on consumer GPUs

### Workflow Tips

1. **Use Claude for planning, local for implementing.** The "bigger model for planning, small model for implementing" pattern. Use Claude Opus to generate a detailed PRD with explicit requirements, then let the local model follow the PRD.
2. **Be extremely verbose with local models.** Non-Anthropic/OpenAI models need explicit instructions about what to do, how to do it, and where to find things. They do not fill in blanks like Claude does.
3. **Use Claude to write prompts for local models.** Claude excels at crafting good initial prompts that local models can follow effectively.
4. **Test-driven development with Ralph loop.** Pre-make unit tests, then let the local model iterate in the Ralph loop using TDD. This gives automated verification without needing cloud intelligence.
5. **Do not compact context with local models.** If you change something, clear context and start fresh rather than compacting.
6. **Divide tasks into small chunks.** Local models work better on focused, small tasks (e.g., static websites, single-file changes).
7. **Local models excel at scale/batch processing.** When you need to process a million documents, local models avoid massive API costs.

### Cost Optimization Strategy

- Keep Claude at $20/month plan for planning, prompt engineering, and complex reasoning tasks.
- Route routine implementation and iteration tasks to local models for unlimited usage.
- Use Ralph loop with local models for unlimited agentic iterations without hitting usage limits.
- Privacy-sensitive work is a strong use case for local models.

### Known Issues

- **Ollama session persistence bug:** Some users report `ollama launch claude` loses conversation state after the first prompt (glm-4.7-flash:bf16).
- **Thinking mode incompatibility:** Claude Code Router may not support "thinking high" mode with local models.
- **Template issues:** Some models require fixing chat templates and tweaking settings to avoid loops.
- **GLM 4.7 on M1 32GB:** Produced garbage output (weird numbers); likely insufficient resources.

### Tools and Resources

- [Ollama blog post on Claude support](https://ollama.com/blog/claude)
- [Local LLM setup guide for Claude Code](https://github.com/pchalasani/claude-code-tools/blob/main/docs/local-llm-setup.md)
- Claude Code Router (for routing CC to alternative models)
- LiteLLM (proxy for API endpoint routing)
- llama.cpp / llama-server (preferred local inference server)
