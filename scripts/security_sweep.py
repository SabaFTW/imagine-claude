#!/usr/bin/env python3
"""Sanitize verified public-client credentials and disable unsafe provider calls.

This script intentionally does not rewrite Git history. It updates the current
working tree only. Exposed credentials must still be revoked or rotated at the
provider.
"""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AI_UNAVAILABLE_EN = (
    "AI tools unavailable. Secure provider connection has not been configured. "
    "No input was sent."
)
AI_UNAVAILABLE_SL = (
    "AI orodja niso na voljo. Varna povezava s ponudnikom ni nastavljena. "
    "Noben vnos ni bil poslan."
)

# Google API keys use an AIza prefix followed by a long URL-safe token. This
# pattern deliberately ignores short documentation placeholders such as
# `AIza...` while redacting concrete credential-shaped values.
GOOGLE_KEY_PATTERN = re.compile(r"AIza[0-9A-Za-z_-]{30,}")


def read(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def write_if_changed(path: str, original: str, updated: str) -> bool:
    if updated == original:
        return False
    target = ROOT / path
    target.write_text(updated, encoding="utf-8")
    print(f"updated: {path}")
    return True


def replace_between(text: str, start: str, end: str, replacement: str, path: str) -> str:
    start_index = text.find(start)
    if start_index < 0:
        print(f"marker already absent: {path}: {start.strip()}")
        return text
    end_index = text.find(end, start_index)
    if end_index < 0:
        raise RuntimeError(f"End marker not found in {path}: {end.strip()}")
    return text[:start_index] + replacement + text[end_index:]


def sanitize_forge() -> None:
    path = "public/portals/forge.html"
    original = read(path)
    replacement = f'''    // Public-client provider integration disabled.
    const AI_UNAVAILABLE_MESSAGE = {AI_UNAVAILABLE_SL!r};

    function callGemini(_prompt, outputElement, buttonElement) {{
      outputElement.classList.remove('hidden');
      outputElement.textContent = AI_UNAVAILABLE_MESSAGE;
      if (buttonElement) {{
        buttonElement.disabled = true;
        buttonElement.title = AI_UNAVAILABLE_MESSAGE;
      }}
    }}

    document.getElementById('generate-structure-btn').addEventListener('click', () => {{
      const out = document.getElementById('project-structure-output');
      callGemini('', out, document.getElementById('generate-structure-btn'));
    }});

    document.getElementById('generate-summary-btn').addEventListener('click', () => {{
      const out = document.getElementById('tech-summary-output');
      callGemini('', out, document.getElementById('generate-summary-btn'));
    }});

    document.getElementById('ask-assistant-btn').addEventListener('click', () => {{
      const out = document.getElementById('assistant-answer-output');
      callGemini('', out, document.getElementById('ask-assistant-btn'));
    }});

'''
    updated = replace_between(
        original,
        "    // Gemini API Integration (preserved from old file)",
        "    // Smooth scrolling",
        replacement,
        path,
    )
    write_if_changed(path, original, updated)


def sanitize_forge_backup() -> None:
    path = "public/portals/forge_backup_OLD_INDUSTRY_5.html"
    original = read(path)
    replacement = f'''        // Public-client provider integration disabled.
        const AI_UNAVAILABLE_MESSAGE = {AI_UNAVAILABLE_SL!r};

        function callGemini(_prompt, outputElement, buttonElement) {{
            outputElement.classList.remove('hidden');
            outputElement.textContent = AI_UNAVAILABLE_MESSAGE;
            if (buttonElement) {{
                buttonElement.disabled = true;
                buttonElement.title = AI_UNAVAILABLE_MESSAGE;
            }}
        }}

        const generateStructureBtn = document.getElementById('generate-structure-btn');
        generateStructureBtn.addEventListener('click', () => {{
            callGemini('', document.getElementById('project-structure-output'), generateStructureBtn);
        }});

        const generateSummaryBtn = document.getElementById('generate-summary-btn');
        generateSummaryBtn.addEventListener('click', () => {{
            callGemini('', document.getElementById('tech-summary-output'), generateSummaryBtn);
        }});

        const askAssistantBtn = document.getElementById('ask-assistant-btn');
        askAssistantBtn.addEventListener('click', () => {{
            callGemini('', document.getElementById('assistant-answer-output'), askAssistantBtn);
        }});

'''
    updated = replace_between(
        original,
        "        // --- Gemini API Integration ---",
        "        // Theme change handler for chart colors",
        replacement,
        path,
    )
    write_if_changed(path, original, updated)


def sanitize_ghostcore() -> None:
    path = "public/ghostcore-v3-unified.html"
    original = read(path)
    replacement = f'''        // Public-client provider integration disabled.
        const AI_UNAVAILABLE_MESSAGE = {AI_UNAVAILABLE_EN!r};

        async function callGemini(_prompt, outputElement, buttonElement, _systemPrompt = null) {{
            outputElement.classList.remove('hidden');
            outputElement.textContent = AI_UNAVAILABLE_MESSAGE;
            if (buttonElement) {{
                buttonElement.disabled = true;
                buttonElement.title = AI_UNAVAILABLE_MESSAGE;
            }}
        }}

'''
    updated = replace_between(
        original,
        "        // Gemini API Integration",
        "        // Workshop Feature",
        replacement,
        path,
    )

    rune_pattern = re.compile(
        r"            async function getRuneWhisper\(rune\) \{.*?\n"
        r"            \}\n\n"
        r"            function displayWhisper",
        re.DOTALL,
    )
    rune_replacement = f'''            async function getRuneWhisper(_rune) {{
                if (portalState === 'FETCHING_WHISPER') return;
                portalState = 'FETCHING_WHISPER';
                displayWhisper({AI_UNAVAILABLE_EN!r}, 5000);
                portalState = 'ORACLE_AWAKE';
            }}

            function displayWhisper'''
    updated, count = rune_pattern.subn(rune_replacement, updated, count=1)
    if count == 0 and "Oracle unavailable" not in updated:
        raise RuntimeError(f"Rune provider block not found in {path}")

    write_if_changed(path, original, updated)


def sanitize_deployment_note() -> None:
    path = "DUAL_PORTAL_DEPLOYMENT_SESSION.md"
    original = read(path)
    updated = original
    remediation = (
        "> **Security remediation — 2026-08-04:** A provider credential was previously "
        "embedded in public client code and repeated in this session record. The value "
        "has been redacted from the current tree. It must be revoked or rotated at the "
        "provider; current-tree removal does not erase Git history.\n\n"
    )
    if "Security remediation — 2026-08-04" not in updated:
        first_break = updated.find("\n\n")
        updated = updated[: first_break + 2] + remediation + updated[first_break + 2 :]

    updated = updated.replace(
        "Current: Key exposed in HTML (acceptable for demo/personal use)",
        "Current: The credential was exposed in public HTML. This is not acceptable for a public client and requires revocation or rotation.",
    )
    write_if_changed(path, original, updated)


def redact_concrete_google_keys() -> int:
    changed_files = 0
    skipped_dirs = {".git", "node_modules", "dist", "build", ".cache", ".vite"}
    text_suffixes = {
        ".html", ".htm", ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
        ".py", ".md", ".txt", ".json", ".yaml", ".yml", ".sh", ".env",
        ".seja", ".toml", ".ini", ".conf",
    }

    for target in ROOT.rglob("*"):
        if not target.is_file():
            continue
        if any(part in skipped_dirs for part in target.parts):
            continue
        if target.name == ".env.example":
            continue
        if target.suffix.lower() not in text_suffixes and target.name != ".env":
            continue

        try:
            original = target.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            continue

        updated, count = GOOGLE_KEY_PATTERN.subn("[REDACTED-COMPROMISED-CREDENTIAL]", original)
        if count:
            target.write_text(updated, encoding="utf-8")
            changed_files += 1
            print(f"redacted {count} credential-shaped value(s): {target.relative_to(ROOT)}")

    return changed_files


def remove_committed_env() -> None:
    env_path = ROOT / ".env"
    if env_path.exists():
        env_path.unlink()
        print("removed tracked .env")


def main() -> None:
    sanitize_forge()
    sanitize_forge_backup()
    sanitize_ghostcore()
    sanitize_deployment_note()
    remove_committed_env()
    redacted_files = redact_concrete_google_keys()
    print(f"credential sweep complete; files with concrete values redacted: {redacted_files}")
    print("Reminder: revoke or rotate exposed credentials at the provider.")


if __name__ == "__main__":
    main()
