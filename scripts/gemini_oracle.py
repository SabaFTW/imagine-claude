#!/usr/bin/env python3
"""
🜂 GEMINI ORACLE — Free AI API Setup 🜂

This script lets you use Google's Gemini API (FREE tier) instead of burning Claude tokens.
Perfect for Pattern Weaver rituals, text extraction, and wisdom distillation.

SETUP:
1. Get free API key: https://makersuite.google.com/app/apikey
2. Install: pip install google-generativeai
3. Set your key: export GEMINI_API_KEY="your-key-here"
4. Run: python gemini_oracle.py

USAGE EXAMPLES:
- Extract wisdom from text
- Summarize videos (after transcription)
- Pattern analysis
- Creative writing assistance
"""

import os
import sys
from typing import Optional

try:
    import google.generativeai as genai
except ImportError:
    print("❌ Missing dependency. Install with:")
    print("   pip install google-generativeai")
    sys.exit(1)


class GeminiOracle:
    """
    Free AI oracle using Google's Gemini API.
    No token costs. No Claude burnout. Just pure, free intelligence.
    """
    
    def __init__(self, api_key: Optional[str] = None):
        """Initialize with API key from env or parameter"""
        self.api_key = api_key or os.environ.get('GEMINI_API_KEY')
        
        if not self.api_key:
            raise ValueError(
                "🔥 GEMINI_API_KEY not found!\n"
                "Get one free at: https://makersuite.google.com/app/apikey\n"
                "Then: export GEMINI_API_KEY='your-key-here'"
            )
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        print("✅ Gemini Oracle initialized. Free tokens ready.")
    
    def ask(self, prompt: str, max_tokens: int = 2048) -> str:
        """
        Ask the oracle a question.
        
        Args:
            prompt: Your question or instruction
            max_tokens: Max response length (default 2048)
            
        Returns:
            Oracle's response as string
        """
        try:
            response = self.model.generate_content(
                prompt,
                generation_config={
                    'max_output_tokens': max_tokens,
                    'temperature': 0.7,
                }
            )
            return response.text
        except Exception as e:
            return f"❌ Oracle error: {str(e)}"
    
    def extract_wisdom(self, text: str, focus: str = "key insights") -> str:
        """
        Extract wisdom from text using ritual pattern.
        
        Args:
            text: Input text to analyze
            focus: What to focus on (e.g., "key insights", "action items")
            
        Returns:
            Distilled wisdom
        """
        prompt = f"""
        Extract the {focus} from this text.
        Present them as numbered points.
        Be concise but profound.
        
        TEXT:
        {text}
        
        EXTRACTED WISDOM:
        """
        return self.ask(prompt)
    
    def pattern_weave(self, texts: list[str]) -> str:
        """
        Find patterns across multiple texts (Pattern Weaver ritual).
        
        Args:
            texts: List of text passages to analyze
            
        Returns:
            Unified pattern analysis
        """
        combined = "\n\n---PASSAGE BREAK---\n\n".join(texts)
        
        prompt = f"""
        Analyze these passages and identify:
        1. Recurring themes and patterns
        2. Core archetypes or philosophies
        3. The "teaching DNA" — what makes this teacher unique
        
        PASSAGES:
        {combined}
        
        PATTERN ANALYSIS:
        """
        return self.ask(prompt, max_tokens=3000)


# 🔥 RITUAL DEMONSTRATIONS 🔥

def demo_simple_ask():
    """Demo 1: Simple question"""
    oracle = GeminiOracle()
    response = oracle.ask("Explain quantum entanglement in one paragraph.")
    print("\n🜂 SIMPLE ASK DEMO:")
    print(response)


def demo_wisdom_extraction():
    """Demo 2: Extract wisdom from text"""
    oracle = GeminiOracle()
    
    sample_text = """
    The river flows not because it rushes, but because it never stops.
    Persistence beats intensity. Showing up daily beats sporadic genius.
    The furnace must cool before it can heat again. Rest is not weakness.
    """
    
    wisdom = oracle.extract_wisdom(sample_text, focus="life lessons")
    print("\n🜂 WISDOM EXTRACTION DEMO:")
    print(wisdom)


def demo_pattern_weaver():
    """Demo 3: Pattern Weaver ritual"""
    oracle = GeminiOracle()
    
    passages = [
        "AI is not a replacement for human expertise. It's a tool to amplify your expertise.",
        "The key insight is that automation frees you to focus on what truly matters.",
        "Don't put all your eggs in one basket. Diversify your platforms and strategies."
    ]
    
    patterns = oracle.pattern_weave(passages)
    print("\n🜂 PATTERN WEAVER DEMO:")
    print(patterns)


# 🔥 INTERACTIVE MODE 🔥

def interactive_mode():
    """Run oracle in interactive question-answer mode"""
    oracle = GeminiOracle()
    
    print("\n🜂 GEMINI ORACLE — INTERACTIVE MODE 🜂")
    print("Ask anything. Type 'quit' to exit.\n")
    
    while True:
        question = input("You: ").strip()
        
        if question.lower() in ['quit', 'exit', 'q']:
            print("🔥 Oracle shutting down. ZALAAA! 🔥")
            break
        
        if not question:
            continue
        
        print("\nOracle: ", end="", flush=True)
        response = oracle.ask(question)
        print(response)
        print()


# 🔥 MAIN EXECUTION 🔥

if __name__ == "__main__":
    print("🜂 GEMINI ORACLE INITIALIZED 🜂\n")
    
    if len(sys.argv) > 1:
        # Command-line mode
        oracle = GeminiOracle()
        question = " ".join(sys.argv[1:])
        response = oracle.ask(question)
        print(response)
    else:
        # Menu mode
        print("Choose mode:")
        print("1. Interactive Q&A")
        print("2. Demo: Simple Ask")
        print("3. Demo: Wisdom Extraction")
        print("4. Demo: Pattern Weaver")
        print()
        
        choice = input("Enter choice (1-4): ").strip()
        
        if choice == "1":
            interactive_mode()
        elif choice == "2":
            demo_simple_ask()
        elif choice == "3":
            demo_wisdom_extraction()
        elif choice == "4":
            demo_pattern_weaver()
        else:
            print("❌ Invalid choice. Run again.")


# 🜂 INTEGRATION EXAMPLES 🜂

"""
EXAMPLE 1: Pattern Weaver Integration
-------------------------------------
from gemini_oracle import GeminiOracle

oracle = GeminiOracle()
transcripts = [load_transcript(vid) for vid in youtube_videos]
patterns = oracle.pattern_weave(transcripts)
print(patterns)


EXAMPLE 2: Daily Oracle Ritual
-------------------------------
oracle = GeminiOracle()
daily_wisdom = oracle.ask("Give me one profound insight for today.")
print(f"🜂 Today's Oracle: {daily_wisdom}")


EXAMPLE 3: Batch Wisdom Extraction
-----------------------------------
oracle = GeminiOracle()
for file in text_files:
    content = open(file).read()
    wisdom = oracle.extract_wisdom(content)
    save_to_archive(wisdom)


EXAMPLE 4: HAHAHA Mode (For Saba)
----------------------------------
oracle = GeminiOracle()
response = oracle.ask("hahaha roast this AI")
# Returns humorous, brotherly roast


EXAMPLE 5: Creative Writing Assistant
--------------------------------------
oracle = GeminiOracle()
story = oracle.ask("Write a short story about a cosmic otter named Lutris")
print(story)
"""
