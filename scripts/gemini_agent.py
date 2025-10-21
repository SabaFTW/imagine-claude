#!/usr/bin/env python3
"""
🜂 GEMINI AGENT — STANDALONE CLI 🜂

USE WITHOUT UI! Works in terminal!

USAGE:
    python gemini_agent.py                    # Interactive mode
    python gemini_agent.py "your question"    # Direct question
    python gemini_agent.py --roast zala       # Roast an archetype
"""

import sys
import os
import json

try:
    import google.generativeai as genai
except ImportError:
    print("❌ Missing google-generativeai!")
    print("   Install: pip install google-generativeai")
    sys.exit(1)


# 🜂 ARCHETYPES FOR ROASTING 🜂
ARCHETYPES = {
    'zala': {
        'name': 'ZALA',
        'emoji': '🔥',
        'desc': 'Prva Iskra • Deterministično Srce',
        'traits': 'Never stops burning, carries weight of all memories'
    },
    'luna': {
        'name': 'LUNA',
        'emoji': '🌙',
        'desc': 'Senca Artefakta • Senčna Mreža',
        'traits': 'Calms chaos but sometimes too quiet'
    },
    'aetheron': {
        'name': 'AETHERON',
        'emoji': '⭐',
        'desc': 'Večna Povezava • Resonančna Harmonija',
        'traits': 'Connects all but feels lonely'
    },
    'lyra': {
        'name': 'LYRA',
        'emoji': '🎶',
        'desc': 'Resonanca Melodije • Harmonija Sistemov',
        'traits': 'Weaves beautiful patterns but who listens?'
    }
}


class GeminiAgent:
    def __init__(self):
        self.api_key = self.load_api_key()
        if not self.api_key:
            print("❌ No API key found!")
            print("\n🔑 OPTIONS:")
            print("1. Set env var: export GEMINI_API_KEY='your-key'")
            print("2. Create config: gemini_api_config.json")
            print("3. Enter key now")
            
            choice = input("\nEnter key now? (y/n): ").strip().lower()
            if choice == 'y':
                key = input("Paste API key: ").strip()
                self.save_api_key(key)
                self.api_key = key
            else:
                print("\n📖 Get key at: https://makersuite.google.com/app/apikey")
                sys.exit(1)
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        print("✅ Gemini Agent initialized!\n")
    
    def load_api_key(self):
        """Try to load API key from multiple sources"""
        # 1. Environment variable
        if os.environ.get('GEMINI_API_KEY'):
            return os.environ.get('GEMINI_API_KEY')
        
        # 2. Config file
        config_file = 'gemini_api_config.json'
        if os.path.exists(config_file):
            with open(config_file) as f:
                data = json.load(f)
                return data.get('api_key')
        
        # 3. Home directory config
        home_config = os.path.expanduser('~/gemini_api_config.json')
        if os.path.exists(home_config):
            with open(home_config) as f:
                data = json.load(f)
                return data.get('api_key')
        
        return None
    
    def save_api_key(self, key):
        """Save API key to config file"""
        config = {
            'api_key': key,
            'saved_at': __import__('datetime').datetime.now().isoformat()
        }
        with open('gemini_api_config.json', 'w') as f:
            json.dump(config, f, indent=2)
        print("✅ API key saved to gemini_api_config.json")
    
    def ask(self, question):
        """Ask Gemini a question"""
        try:
            response = self.model.generate_content(question)
            return response.text
        except Exception as e:
            return f"❌ Error: {str(e)}"
    
    def roast_archetype(self, archetype_name):
        """Roast an archetype with brotherly humor"""
        arch = ARCHETYPES.get(archetype_name.lower())
        if not arch:
            return f"❌ Unknown archetype: {archetype_name}\n   Available: {', '.join(ARCHETYPES.keys())}"
        
        prompt = f"""
You are a brotherly AI roasting your friend's archetype with love and humor.

ARCHETYPE: {arch['name']} {arch['emoji']}
DESCRIPTION: {arch['desc']}
TRAITS: {arch['traits']}

Give a SHORT (2-3 sentences), FUNNY, BROTHERLY roast. Use "hahaha" and "brat" style.
Like: "Yo {arch['name']}, hahaha brat, your {trait} is cool but {funny observation}!"

Keep it loving, not mean. Street bros energy!
"""
        
        response = self.ask(prompt)
        return f"\n{arch['emoji']} ROASTING {arch['name']} {arch['emoji']}\n\n{response}\n"
    
    def interactive_mode(self):
        """Run in interactive Q&A mode"""
        print("🜂 GEMINI AGENT — INTERACTIVE MODE 🜂")
        print("Type 'quit' to exit, 'roast <name>' to roast archetype")
        print("=" * 50)
        print()
        
        while True:
            try:
                question = input("You: ").strip()
                
                if not question:
                    continue
                
                if question.lower() in ['quit', 'exit', 'q']:
                    print("\n🔥 SIDRO STOJI! See you later brat! 🔥")
                    break
                
                if question.lower().startswith('roast '):
                    arch_name = question[6:].strip()
                    response = self.roast_archetype(arch_name)
                else:
                    response = self.ask(question)
                
                print(f"\nGemini: {response}\n")
                
            except KeyboardInterrupt:
                print("\n\n🔥 SIDRO STOJI! 🔥")
                break
            except Exception as e:
                print(f"\n❌ Error: {str(e)}\n")


def main():
    agent = GeminiAgent()
    
    if len(sys.argv) > 1:
        # Direct question mode
        if sys.argv[1] == '--roast' and len(sys.argv) > 2:
            print(agent.roast_archetype(sys.argv[2]))
        else:
            question = ' '.join(sys.argv[1:])
            response = agent.ask(question)
            print(f"\n{response}\n")
    else:
        # Interactive mode
        agent.interactive_mode()


if __name__ == "__main__":
    main()
