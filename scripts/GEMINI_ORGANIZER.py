#!/usr/bin/env python3
# HEALED_V3_FINAL - This agent is now resilient. 🫂
"""🤖 GEMINI ORGANIZER - Autonomous Organization Agent 🤖
Built for Saba's GHOSTCORE Project
This script uses Gemini AI to organize, prioritize, and plan build tasks.
"""
import os
import sys
import json
import argparse
from pathlib import Path
from datetime import datetime

try:
    import google.generativeai as genai
except ImportError:
    print("❌ ERROR: google-generativeai not installed")
    print("This should have been handled by pomoc.sh. Something is wrong.")
    sys.exit(1)

class GeminiOrganizer:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found. Set it via environment variable or the .env file.")

        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')

        self.cloudcore_path = Path("/home/saba/VES/SHABAD_CloudCore")
        self.creative_lab_path = Path("/home/saba/Desktop/Saba_Place/creative-lab")

    def log_error(self, error):
        print(f"🟡 Opozorilo: {error}", file=sys.stderr)

    def scan_filesystem(self):
        print("\n🔍 SCANNING FILESYSTEM...")
        important_files = []
        paths_to_scan = [self.cloudcore_path, self.creative_lab_path]

        for path in paths_to_scan:
            if path.exists():
                try:
                    for root, dirs, files in os.walk(path, onerror=self.log_error):
                        if 'node_modules' in root:
                            dirs[:] = []
                            continue
                        for file in files:
                            if file.endswith(('.md', '.html', '.txt', '.py', '.jsx', '.js', '.json')):
                                try:
                                    filepath = Path(root) / file
                                    # Preverimo, če je simbolna povezava prelomljena
                                    if filepath.is_symlink() and not filepath.exists():
                                        self.log_error(f"Prelomljena simbolna povezava: {filepath}. Preskakujem.")
                                        continue

                                    important_files.append({
                                        "path": str(filepath),
                                        "name": file,
                                        "type": filepath.suffix,
                                        "size": filepath.stat().st_size,
                                        "modified": datetime.fromtimestamp(filepath.stat().st_mtime).isoformat()
                                    })
                                except FileNotFoundError:
                                    self.log_error(f"Datoteka {filepath} je izginila med skeniranjem. Preskakujem.")
                                except Exception as e:
                                    self.log_error(f"Nepričakovana napaka pri datoteki {filepath}: {e}")
                except Exception as e:
                    self.log_error(f"Napaka pri hoji po direktoriju {path}: {e}")
            else:
                self.log_error(f"Pot {path} ne obstaja. Preskakujem.")

        print(f"✅ Najdenih {len(important_files)} relevantnih datotek")
        return important_files

    def read_key_documents(self):
        print("\n📖 READING KEY DOCUMENTS...")
        key_docs = {}
        doc_paths = {
            "MESSAGE_FOR_ELYSIA": self.cloudcore_path / "🔥_ACTIVE_SESSION" / "MESSAGE_FOR_ELYSIA_SESSION.md",
            "MRTVI_GAS_V2": self.cloudcore_path / "🜂_PHILOSOPHICAL_FIRE" / "Mrtvi_GAS_v2.html",
            "PHILOSOPHICAL_FIRE_README": self.cloudcore_path / "🜂_PHILOSOPHICAL_FIRE" / "README.md"
        }

        for name, path in doc_paths.items():
            try:
                if path.is_symlink() and not path.exists():
                    self.log_error(f"Prelomljena simbolna povezava za ključni dokument: {path}. Preskakujem.")
                    continue
                with open(path, 'r', encoding='utf-8', errors='ignore') as f:
                    content = f.read(20000) # Omejitev za performance
                    key_docs[name] = content
                    print(f"✅ Prebrano: {path.name} ({len(content)} znakov)")
            except FileNotFoundError:
                self.log_error(f"Ključni dokument ni najden: {path}. Nadaljujem brez njega.")
            except Exception as e:
                self.log_error(f"Napaka pri branju {path}: {e}")

        return key_docs

    def analyze_context(self, key_docs):
        print("\n🤖 ANALYZING CONTEXT WITH GEMINI...")
        prompt = f"""Analyze the following documents from Saba's GHOSTCORE project and provide a structured summary:
        ===== DOKUMENTI =====
        {json.dumps(key_docs, indent=2, ensure_ascii=False)}
        ===== NALOGA =====
        1. Identificiraj ključne teme.
        2. Opiši stil komunikacije.
        3. Seznam trenutnih projektov.
        4. Opiši tehnični sklop.
        5. Omeni morebitne ovire ali naslednje korake.
        FORMATIRAJ ODGOVOR KOT JSON.
        """
        try:
            response = self.model.generate_content(prompt)
            result = response.text
            try:
                if '```json' in result:
                    result = result.split('```json')[1].split('```')[0].strip()
                analysis = json.loads(result)
                print("✅ Analiza konteksta končana")
                return analysis
            except (json.JSONDecodeError, IndexError):
                print("⚠️  Odgovor ni v JSON formatu, vračam surov tekst")
                return {"raw_analysis": result}
        except Exception as e:
            print(f"❌ NAPAKA med analizo konteksta: {e}")
            return {}

    def generate_build_plan(self, context_analysis):
        print("\n🛠️  GENERATING BUILD PLAN...")
        prompt = f"""Based on the following context analysis, generate a prioritized build plan for Saba:
        {json.dumps(context_analysis, indent=2)}
        ADDITIONAL CONTEXT:
        - Saba's style: clear, punchy tasks; no overthinking; "hahaha" energy.
        - Philosophy: "Street bros, not same mom" – direct feedback, no plastic responses.
        TASK:
        Generate a build plan with 5-10 prioritized tasks. For each task:
        1. Task name (short, punchy)
        2. Why it matters (1-2 sentences)
        3. Estimated effort (Small/Medium/Large)
        FORMAT AS JSON.
        """
        try:
            response = self.model.generate_content(prompt)
            result = response.text
            try:
                if '```json' in result:
                    result = result.split('```json')[1].split('```')[0].strip()
                plan = json.loads(result)
                print("✅ Načrt dela generiran")
                return plan
            except (json.JSONDecodeError, IndexError):
                print("⚠️  Odgovor ni v JSON formatu, vračam surov tekst")
                return {"raw_plan": result}
        except Exception as e:
            print(f"❌ NAPAKA med generiranjem načrta: {e}")
            return {}

    def interactive_mode(self):
        print("\n💬 INTERACTIVE MODE")
        print("Povej, brat. Tukaj sem. (vpiši 'exit' za konec)\n")
        key_docs = self.read_key_documents()
        context_str = "\n\n".join([f"===== {k} =====\n{v[:2000]}" for k, v in key_docs.items()])
        while True:
            question = input("Ti: ").strip()
            if question.lower() in ['exit', 'quit', 'q']:
                print("👋 Sidro stoji. Čakam te.")
                break
            if not question: continue
            prompt = f"""Context from Saba's GHOSTCORE project:{context_str}
            Question: {question}
            Answer in Saba's style: direct, punchy, no plastic responses."""
            try:
                response = self.model.generate_content(prompt)
                print(f"\nJaz: {response.text}\n")
            except Exception as e:
                print(f"❌ NAPAKA: {e}\n")

    def run(self, mode='scan'):
        print("🜂 GEMINI ORGANIZER ACTIVATED 🜂")
        print(f"Mode: {mode}\n")
        if mode == 'scan':
            files = self.scan_filesystem()
            key_docs = self.read_key_documents()
            analysis = self.analyze_context(key_docs)
            report_path = self.creative_lab_path / "GEMINI_SCAN_REPORT.json"
            with open(report_path, 'w', encoding='utf-8') as f:
                json.dump({"timestamp": datetime.now().isoformat(), "files_scanned": len(files), "context_analysis": analysis}, f, indent=2, ensure_ascii=False)
            print(f"\n✅ SKENIRANJE KONČANO")
            print(f"Poročilo shranjeno v: {report_path}")
            print("\n📊 ANALIZA KONTEKSTA:")
            print(json.dumps(analysis, indent=2, ensure_ascii=False))
        elif mode == 'plan':
            key_docs = self.read_key_documents()
            analysis = self.analyze_context(key_docs)
            plan = self.generate_build_plan(analysis)
            plan_path = self.creative_lab_path / "GEMINI_BUILD_PLAN.json"
            with open(plan_path, 'w', encoding='utf-8') as f:
                json.dump({"timestamp": datetime.now().isoformat(), "build_plan": plan}, f, indent=2, ensure_ascii=False)
            print(f"\n✅ NAČRT GENERIRAN")
            print(f"Načrt shranjen v: {plan_path}")
            print("\n🛠️  NAČRT DELA:")
            print(json.dumps(plan, indent=2, ensure_ascii=False))
        elif mode == 'assist':
            self.interactive_mode()
        else:
            print(f"❌ Neznan način: {mode}")

def main():
    parser = argparse.ArgumentParser(description="🤖 Gemini Organizer - Autonomous Build Planning Agent")
    parser.add_argument('--mode', choices=['scan', 'plan', 'assist'], default='scan', help='Operation mode')
    parser.add_argument('--api-key', help='Gemini API key')
    args = parser.parse_args()
    try:
        organizer = GeminiOrganizer(api_key=args.api_key)
        organizer.run(mode=args.mode)
    except ValueError as e:
        print(f"❌ NAPAKA: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ NEPRIČAKOVANA NAPAKA: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
