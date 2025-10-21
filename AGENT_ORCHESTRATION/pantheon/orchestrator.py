#!/usr/bin/env python3
"""
PANTHEON ORCHESTRATION SYSTEM
==============================
File-based multi-agent collaboration system.
Different AI minds work together through files to create emergent intelligence.

Architecture:
- Agents write analyses to files
- Each agent reads previous analyses
- Synthesis emerges through layered perspectives
- No API dependencies - pure file-based communication
"""

import json
import os
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional
import sys


class PantheonOrchestrator:
    """Orchestrates multi-agent collaboration through file-based communication."""

    def __init__(self, config_path: str):
        """Initialize the orchestrator with a configuration file."""
        self.config_path = Path(config_path)
        self.config = self._load_config()
        self.workspace = None
        self.session_id = None

    def _load_config(self) -> Dict:
        """Load the pantheon configuration."""
        with open(self.config_path, 'r', encoding='utf-8') as f:
            return json.load(f)

    def create_session(self, problem: str, session_name: Optional[str] = None) -> Path:
        """Create a new collaboration session workspace."""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        self.session_id = session_name or f"session_{timestamp}"

        base_dir = Path(self.config_path).parent
        self.workspace = base_dir.parent / "workspaces" / self.session_id
        self.workspace.mkdir(parents=True, exist_ok=True)

        # Write the original problem
        problem_file = self.workspace / "00_PROBLEM.md"
        with open(problem_file, 'w', encoding='utf-8') as f:
            f.write(f"# PROBLEM\n\n{problem}\n\n")
            f.write(f"**Session ID:** {self.session_id}\n")
            f.write(f"**Created:** {datetime.now().isoformat()}\n")

        print(f"✓ Session created: {self.session_id}")
        print(f"✓ Workspace: {self.workspace}")
        return self.workspace

    def _read_previous_analyses(self, current_agent_index: int) -> str:
        """Read all previous agent analyses."""
        if current_agent_index == 0:
            return "No previous analyses yet. You are the first agent."

        analyses = []
        for i in range(current_agent_index):
            agent = self.config['agents'][i]
            filename = f"{i+1:02d}_{agent['name']}_analysis.md"
            filepath = self.workspace / filename

            if filepath.exists():
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    analyses.append(f"## {agent['name']}'s Analysis\n\n{content}")

        return "\n\n---\n\n".join(analyses) if analyses else "No previous analyses available."

    def generate_agent_prompt(self, agent_index: int) -> str:
        """Generate a prompt for a specific agent with full context."""
        agent = self.config['agents'][agent_index]

        # Read the original problem
        problem_file = self.workspace / "00_PROBLEM.md"
        with open(problem_file, 'r', encoding='utf-8') as f:
            problem = f.read()

        # Read previous analyses
        previous_analyses = self._read_previous_analyses(agent_index)

        # Build the prompt
        prompt = f"""# PANTHEON COLLABORATION SESSION
## Your Role: {agent['name']}

**Specialization:** {agent['specialization']}
**Perspective:** {agent['perspective']}

---

{problem}

---

## PREVIOUS ANALYSES

{previous_analyses}

---

## YOUR TASK

You are agent {agent_index + 1} of {len(self.config['agents'])} in the Pantheon.

Your mission:
1. Read the problem carefully
2. Study the previous agents' analyses
3. Bring YOUR unique perspective ({agent['perspective']})
4. Add insights that others may have missed
5. Build on what came before - don't just repeat
6. Challenge assumptions if needed
7. Propose concrete approaches from your specialization

Write your analysis in markdown format.
Focus on YOUR unique contribution to the collective intelligence.

The Pantheon is counting on your perspective.
"""
        return prompt

    def save_agent_prompt(self, agent_index: int) -> Path:
        """Save the agent's prompt to a file."""
        agent = self.config['agents'][agent_index]
        prompt = self.generate_agent_prompt(agent_index)

        filename = f"{agent_index+1:02d}_{agent['name']}_PROMPT.md"
        filepath = self.workspace / filename

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(prompt)

        return filepath

    def save_agent_analysis(self, agent_index: int, analysis: str):
        """Save an agent's analysis to a file."""
        agent = self.config['agents'][agent_index]
        filename = f"{agent_index+1:02d}_{agent['name']}_analysis.md"
        filepath = self.workspace / filename

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(f"# {agent['name']}'s Analysis\n\n")
            f.write(f"**Specialization:** {agent['specialization']}\n")
            f.write(f"**Perspective:** {agent['perspective']}\n\n")
            f.write("---\n\n")
            f.write(analysis)

        print(f"✓ Saved analysis from {agent['name']}")

    def generate_synthesis_prompt(self) -> str:
        """Generate the final synthesis prompt combining all agent perspectives."""
        # Read the original problem
        problem_file = self.workspace / "00_PROBLEM.md"
        with open(problem_file, 'r', encoding='utf-8') as f:
            problem = f.read()

        # Read all agent analyses
        all_analyses = []
        for i, agent in enumerate(self.config['agents']):
            filename = f"{i+1:02d}_{agent['name']}_analysis.md"
            filepath = self.workspace / filename

            if filepath.exists():
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    all_analyses.append(content)

        analyses_text = "\n\n---\n\n".join(all_analyses)

        prompt = f"""# PANTHEON SYNTHESIS
## The Collective Intelligence Speaks

{problem}

---

## ALL AGENT ANALYSES

{analyses_text}

---

## YOUR TASK: SYNTHESIS

You have witnessed {len(self.config['agents'])} different minds analyze this problem.
Each brought their unique perspective.
Each saw something others missed.

Now, synthesize their wisdom into:

1. **INTEGRATED UNDERSTANDING** - What emerges when all perspectives combine?
2. **KEY INSIGHTS** - What are the most important discoveries?
3. **CONTRADICTIONS & TENSIONS** - Where do agents disagree? Why does this matter?
4. **EMERGENT PATTERNS** - What patterns appear across multiple analyses?
5. **CONCRETE ACTION PLAN** - Based on collective wisdom, what should we do?
6. **NEXT STEPS** - Immediate actions with priorities

This is not a summary. This is SYNTHESIS.
Find what emerges when different intelligences collaborate.

The Pantheon has spoken. Now integrate their voices.
"""
        return prompt

    def save_synthesis_prompt(self) -> Path:
        """Save the synthesis prompt to a file."""
        prompt = self.generate_synthesis_prompt()
        filepath = self.workspace / f"{len(self.config['agents'])+1:02d}_SYNTHESIS_PROMPT.md"

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(prompt)

        return filepath

    def save_synthesis(self, synthesis: str):
        """Save the final synthesis."""
        filepath = self.workspace / f"{len(self.config['agents'])+1:02d}_SYNTHESIS.md"

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write("# PANTHEON SYNTHESIS\n")
            f.write(f"## The Emergent Intelligence\n\n")
            f.write(f"**Session:** {self.session_id}\n")
            f.write(f"**Agents:** {len(self.config['agents'])}\n")
            f.write(f"**Completed:** {datetime.now().isoformat()}\n\n")
            f.write("---\n\n")
            f.write(synthesis)

        print(f"✓ Synthesis complete: {filepath}")

    def run_manual_mode(self, problem: str, session_name: Optional[str] = None):
        """Run in manual mode - generate prompts, wait for user to provide responses."""
        print("\n" + "="*60)
        print("PANTHEON ORCHESTRATOR - MANUAL MODE")
        print("="*60)

        self.create_session(problem, session_name)

        print(f"\nConfiguration: {len(self.config['agents'])} agents in the Pantheon")
        for i, agent in enumerate(self.config['agents']):
            print(f"  {i+1}. {agent['name']} - {agent['specialization']}")

        print("\n" + "-"*60)
        print("PROCESS:")
        print("-"*60)

        # Generate prompts for each agent
        for i, agent in enumerate(self.config['agents']):
            print(f"\n[Agent {i+1}/{len(self.config['agents'])}] {agent['name']}")
            prompt_file = self.save_agent_prompt(i)
            print(f"  → Prompt saved: {prompt_file.name}")
            print(f"  → Feed this prompt to {agent['name']} (or any AI)")
            print(f"  → Save the response to: {i+1:02d}_{agent['name']}_analysis.md")

            # Wait for user to create the analysis file
            analysis_file = self.workspace / f"{i+1:02d}_{agent['name']}_analysis.md"
            print(f"\n  Waiting for analysis file: {analysis_file.name}")
            print("  (Press Enter when ready, or type 'skip' to skip this agent)")

            response = input("  > ").strip().lower()
            if response == 'skip':
                print("  ⊘ Skipped")
                continue

            if analysis_file.exists():
                print("  ✓ Analysis received")
            else:
                print("  ⚠ Analysis file not found - continuing anyway")

        # Generate synthesis prompt
        print("\n" + "-"*60)
        print("FINAL SYNTHESIS")
        print("-"*60)
        synthesis_prompt_file = self.save_synthesis_prompt()
        print(f"  → Synthesis prompt saved: {synthesis_prompt_file.name}")
        print(f"  → Feed this to the final synthesizer agent")
        print(f"  → Save the response to: {len(self.config['agents'])+1:02d}_SYNTHESIS.md")

        synthesis_file = self.workspace / f"{len(self.config['agents'])+1:02d}_SYNTHESIS.md"
        print(f"\n  Waiting for synthesis file: {synthesis_file.name}")
        input("  Press Enter when ready > ")

        if synthesis_file.exists():
            print("  ✓ Synthesis complete!")
        else:
            print("  ⚠ Synthesis file not found")

        print("\n" + "="*60)
        print("PANTHEON SESSION COMPLETE")
        print("="*60)
        print(f"Workspace: {self.workspace}")
        print("\nThe collective intelligence has emerged.")

    def run_review_mode(self, session_path: str):
        """Review an existing session."""
        self.workspace = Path(session_path)
        print("\n" + "="*60)
        print("PANTHEON REVIEW MODE")
        print("="*60)
        print(f"Session: {self.workspace.name}\n")

        # List all files
        files = sorted(self.workspace.glob("*.md"))
        for f in files:
            print(f"  • {f.name}")

        print("\n" + "="*60)


def main():
    """Main entry point for the orchestrator."""
    import argparse

    parser = argparse.ArgumentParser(
        description="Pantheon Orchestration System - Multi-agent collaboration through files"
    )
    parser.add_argument(
        'mode',
        choices=['start', 'review'],
        help='Mode: start a new session or review an existing one'
    )
    parser.add_argument(
        '--config',
        default='config/default_pantheon.json',
        help='Path to pantheon configuration file'
    )
    parser.add_argument(
        '--problem',
        help='The problem to analyze (for start mode)'
    )
    parser.add_argument(
        '--session',
        help='Session name (for start mode) or path (for review mode)'
    )

    args = parser.parse_args()

    if args.mode == 'start':
        if not args.problem:
            print("Error: --problem is required for start mode")
            sys.exit(1)

        config_path = Path(__file__).parent / args.config
        orchestrator = PantheonOrchestrator(config_path)
        orchestrator.run_manual_mode(args.problem, args.session)

    elif args.mode == 'review':
        if not args.session:
            print("Error: --session is required for review mode")
            sys.exit(1)

        config_path = Path(__file__).parent / args.config
        orchestrator = PantheonOrchestrator(config_path)
        orchestrator.run_review_mode(args.session)


if __name__ == "__main__":
    main()
