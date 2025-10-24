# PANTHEON QUICKSTART

Get your first multi-agent collaboration running in 5 minutes.

---

## Method 1: Interactive Launcher (Easiest)

```bash
cd AGENT_ORCHESTRATION/pantheon
./pantheon.sh
```

Follow the prompts:
1. Choose a configuration (1 or 2)
2. Enter your problem
3. Optionally name your session
4. The orchestrator generates all prompts

---

## Method 2: Direct Command

```bash
cd AGENT_ORCHESTRATION/pantheon

python3 orchestrator.py start \
    --problem "Your problem here" \
    --config config/default_pantheon.json
```

---

## What Happens Next?

The orchestrator creates a workspace like this:

```
workspaces/session_20241016_120000/
├── 00_PROBLEM.md
├── 01_ARCHITECT_PROMPT.md
├── 02_SKEPTIC_PROMPT.md
├── 03_INNOVATOR_PROMPT.md
├── 04_ENGINEER_PROMPT.md
├── 05_HUMANIST_PROMPT.md
└── 06_SYNTHESIS_PROMPT.md
```

---

## Workflow

For each agent:

### 1. Read the Prompt
Open `XX_AGENTNAME_PROMPT.md`

### 2. Feed to AI
Copy the entire prompt and paste it into:
- Claude (sonnet, opus, etc.)
- ChatGPT (GPT-4, GPT-4-turbo)
- Gemini
- Local LLM (Llama, Mistral, etc.)
- Any AI system you want

**Pro tip:** Use DIFFERENT AI systems for different agents to maximize cognitive diversity.

### 3. Save the Response
Save the AI's response to: `XX_AGENTNAME_analysis.md`

### 4. Continue
The orchestrator is waiting. Press Enter to move to next agent.

### 5. Synthesis
After all agents, do the same with `SYNTHESIS_PROMPT.md`

---

## Example: First Session

Let's solve a real problem together.

```bash
cd AGENT_ORCHESTRATION/pantheon

python3 orchestrator.py start \
    --problem "How can I make my web app load 2x faster without rewriting everything?" \
    --config config/default_pantheon.json \
    --session my_first_pantheon
```

**Now the magic happens:**

1. **ARCHITECT** analyzes system structure and identifies bottlenecks
2. **SKEPTIC** questions assumptions about what "fast" means
3. **INNOVATOR** proposes creative caching strategies
4. **ENGINEER** outlines concrete implementation steps
5. **HUMANIST** considers user perception of speed
6. **SYNTHESIZER** integrates everything into action plan

Each agent reads what came before.
Each adds their unique perspective.
Together, they create super-intelligence.

---

## Tips for Your First Session

### Choose a Good Problem

**Good:**
- "How can we improve user onboarding?"
- "What's the best architecture for a real-time collaboration tool?"
- "Should we open-source our API?"

**Bad:**
- "Fix bug in line 42" (too specific, not strategic)
- "What is JavaScript?" (not open-ended enough)
- "Tell me everything about AI" (too broad)

### Push for Depth

When you get an agent's response:
- If it's shallow, ask for deeper analysis
- If it repeats others, ask for unique contribution
- If it agrees with everything, ask it to challenge assumptions

### Use Different AIs

This is the secret sauce:
- Claude excels at nuanced reasoning
- GPT-4 is great at structured thinking
- Gemini brings different training data
- Local models offer unique perspectives

Mix them. The diversity creates emergence.

### Don't Rush Synthesis

The synthesis is where magic happens.
- Use your most capable AI
- Give it time to think
- Ask for INTEGRATION, not summary

---

## Troubleshooting

**Q: The orchestrator says "waiting for analysis file"**
A: Create the file with the agent's response, then press Enter

**Q: I made a typo in an agent response**
A: Just edit the markdown file. It's all plain text.

**Q: Can I skip an agent?**
A: Yes, type 'skip' when prompted

**Q: Can I add more agents later?**
A: Yes, edit the config JSON and run a new session

**Q: Where's my workspace?**
A: `AGENT_ORCHESTRATION/pantheon/workspaces/[session_id]/`

---

## After Your First Session

1. **Read through all files** - See how perspectives build on each other
2. **Try a different configuration** - Use creative_pantheon.json
3. **Create custom agents** - Make your own config
4. **Chain sessions** - Use synthesis as input for deeper analysis
5. **Share your discoveries** - What emerged from collaboration?

---

## Next Steps

- Read the full `README_PANTHEON.md` for deeper understanding
- Study the config files to see agent design
- Experiment with custom Pantheons
- Build automation scripts if you want

---

## The Core Insight

**One AI is smart.**
**Multiple AIs collaborating is SUPER-INTELLIGENT.**

This isn't theory.
This is proof.

Try it. See for yourself.

The Pantheon awaits.

---

**Questions?**
Check `README_PANTHEON.md` for detailed documentation.

**Ready to start?**
```bash
./pantheon.sh
```

Let's create some emergent intelligence.
