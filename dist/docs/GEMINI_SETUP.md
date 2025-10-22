# 🤖 GEMINI ORACLE — QUICK SETUP GUIDE 🤖

## Why Gemini Instead of Claude?

**Claude:** Expensive tokens, rate limits, costs add up  
**Gemini:** FREE tier, generous limits, perfect for rituals

---

## 🔥 SETUP IN 3 STEPS 🔥

### **STEP 1: Get Your Free API Key**

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with Google account
3. Click "Create API Key"
4. Copy the key (looks like: `AIzaSyD...`)

---

### **STEP 2: Install Python Package**

```bash
pip install google-generativeai
```

Or if you use `pip3`:
```bash
pip3 install google-generativeai
```

---

### **STEP 3: Set Your API Key**

**Option A: Environment Variable (Recommended)**
```bash
export GEMINI_API_KEY="AIzaSyD..."
```

Add to your `~/.bashrc` or `~/.zshrc` to make permanent:
```bash
echo 'export GEMINI_API_KEY="AIzaSyD..."' >> ~/.bashrc
source ~/.bashrc
```

**Option B: In Code**
```python
from gemini_oracle import GeminiOracle
oracle = GeminiOracle(api_key="AIzaSyD...")
```

---

## 🜂 USAGE EXAMPLES 🜂

### **Interactive Mode**
```bash
cd /home/saba/Desktop/Saba_Place/creative-lab/scripts
python gemini_oracle.py
# Choose option 1 for interactive Q&A
```

### **Command Line Mode**
```bash
python gemini_oracle.py "Explain quantum computing in simple terms"
```

### **In Your Python Scripts**
```python
from gemini_oracle import GeminiOracle

oracle = GeminiOracle()

# Simple question
answer = oracle.ask("What is the meaning of ZALAAA?")
print(answer)

# Extract wisdom from text
wisdom = oracle.extract_wisdom(long_text, focus="key insights")

# Pattern Weaver ritual
patterns = oracle.pattern_weave([text1, text2, text3])
```

---

## 🔥 INTEGRATION WITH PATTERN WEAVER 🔥

**Before (using Claude):**
- Costs tokens
- Rate limited
- Expensive at scale

**After (using Gemini):**
```python
from gemini_oracle import GeminiOracle

oracle = GeminiOracle()

# Load your YouTube transcripts
transcripts = [
    open('transcript1.txt').read(),
    open('transcript2.txt').read(),
    open('transcript3.txt').read(),
]

# Weave patterns - FREE!
patterns = oracle.pattern_weave(transcripts)
print(patterns)
```

---

## 💡 PRO TIPS

1. **Free Tier Limits:**
   - 60 requests per minute
   - Plenty for personal use!

2. **Best Practices:**
   - Keep prompts clear and focused
   - Use `max_tokens` to control length
   - Temperature 0.7 = balanced creativity

3. **Save Your Work:**
   ```python
   wisdom = oracle.extract_wisdom(text)
   with open('wisdom_archive.md', 'a') as f:
       f.write(f"\n\n## {datetime.now()}\n{wisdom}")
   ```

---

## 🜂 TROUBLESHOOTING 🜂

**Error: "GEMINI_API_KEY not found"**
- Make sure you exported the key
- Check: `echo $GEMINI_API_KEY`

**Error: "google.generativeai not found"**
- Install: `pip install google-generativeai`

**Error: "API key invalid"**
- Regenerate key at https://makersuite.google.com/app/apikey
- Make sure no extra spaces in the key

---

## 🔥 NEXT LEVEL 🔥

**Combine with existing rituals:**
- YouTube transcript extraction → Gemini wisdom distillation
- Daily oracle cron job → Morning wisdom via Gemini
- Pattern Weaver automation → Free batch processing

**No more token anxiety. Just pure creation.** ✨

---

**SIDRO STOJI. TOKENS SO FREE.** 🔥

**Built with 🤖 by Saba & Echo**  
**October 2025 | GHOSTLINE Active**
