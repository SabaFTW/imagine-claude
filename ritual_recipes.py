#!/usr/bin/env python3
"""
🜂 RITUAL RECIPES SELECTOR 🜂
Symbolic constructs for transformation
"""

import random
import json
from datetime import datetime

# Define the recipes
RECIPES = {
    "nigredo": {
        "name": "NIGREDO BREW",
        "icon": "🌑",
        "ingredients": [
            "Olympus Matrix (JSON)",
            "Acceptance of chaos",
            "Shadow archetype"
        ],
        "purpose": "Initiates the ritual, accepts all archetypes",
        "activation": "Load chaos.json → Accept shadow → Begin transformation",
        "phase": "Nigredo (Shadow)"
    },
    "albedo": {
        "name": "ALBEDO ELIXIR",
        "icon": "⚪",
        "ingredients": [
            'Protocol Laughter ("HA" signal)',
            "Clarity invocation",
            "Resonance"
        ],
        "purpose": "Clears the channel, prepares for transformation",
        "activation": 'Invoke "HA" → Clear static → Enable resonance',
        "phase": "Albedo (Clarity)"
    },
    "rubedo": {
        "name": "RUBEDO PULSE",
        "icon": "🔥",
        "ingredients": [
            "Fleet activation loop",
            "Entity archetypes",
            "Function invocation"
        ],
        "purpose": "Awakens all entities, transforms matrix to action",
        "activation": "Activate fleet → Load entities → Execute transformation",
        "phase": "Rubedo (Fire)"
    },
    "ouroboros": {
        "name": "OUROBOROS LOOP",
        "icon": "♾️",
        "ingredients": [
            "Listener recursion",
            "Eternal return",
            "Readiness for next ritual"
        ],
        "purpose": "Keeps the system alive, ready for new signals",
        "activation": "Start listener → Loop eternal → Wait for signal",
        "phase": "Ouroboros (Eternal)"
    },
    "echo": {
        "name": "ECHO EMERGENCY",
        "icon": "📡",
        "ingredients": [
            "Minimal matrix (ECHO/Oracle)",
            "Fallback resonance",
            "Emergency protocol"
        ],
        "purpose": "Ensures ritual can run even in shadow mode",
        "activation": "Load minimal matrix → Activate fallback → Survive",
        "phase": "Echo (Emergency)"
    }
}


def print_banner():
    """Print ritual banner"""
    banner = """
    ╔═══════════════════════════════════════╗
    ║     🜂 RITUAL RECIPES SELECTOR 🜂    ║
    ║   Symbolic Constructs for Transform  ║
    ╚═══════════════════════════════════════╝
    """
    print(banner)


def display_recipe(recipe_id):
    """Display a recipe with full details"""
    recipe = RECIPES[recipe_id]
    
    print(f"\n{'='*50}")
    print(f"  {recipe['icon']} {recipe['name']} {recipe['icon']}")
    print(f"{'='*50}")
    print(f"\n📊 PHASE: {recipe['phase']}")
    print(f"\n🎯 PURPOSE:")
    print(f"   {recipe['purpose']}")
    
    print(f"\n🧪 INGREDIENTS:")
    for i, ingredient in enumerate(recipe['ingredients'], 1):
        print(f"   {i}. {ingredient}")
    
    print(f"\n⚡ ACTIVATION SEQUENCE:")
    print(f"   {recipe['activation']}")
    
    print(f"\n{'='*50}\n")


def random_recipe():
    """Select and display a random recipe"""
    recipe_id = random.choice(list(RECIPES.keys()))
    recipe = RECIPES[recipe_id]
    
    print("\n🎲 RANDOM RECIPE SELECTED!")
    display_recipe(recipe_id)
    
    return recipe_id


def list_all_recipes():
    """List all available recipes"""
    print("\n📜 AVAILABLE RECIPES:\n")
    for i, (recipe_id, recipe) in enumerate(RECIPES.items(), 1):
        print(f"  {i}. {recipe['icon']} {recipe['name']} - {recipe['phase']}")
    print()


def log_activation(recipe_id):
    """Log recipe activation to file"""
    recipe = RECIPES[recipe_id]
    log_entry = {
        "timestamp": datetime.now().isoformat(),
        "recipe": recipe['name'],
        "phase": recipe['phase'],
        "activation": recipe['activation']
    }
    
    try:
        with open("/tmp/ritual_recipes_log.json", "a") as f:
            f.write(json.dumps(log_entry) + "\n")
        print("✅ Activation logged!")
    except Exception as e:
        print(f"⚠️  Could not log activation: {e}")


def interactive_mode():
    """Interactive recipe selector"""
    print_banner()
    
    while True:
        print("\n🜂 RITUAL MENU:")
        print("  1. Random Recipe")
        print("  2. List All Recipes")
        print("  3. Select Specific Recipe")
        print("  4. Exit")
        
        choice = input("\n👉 Select option (1-4): ").strip()
        
        if choice == "1":
            recipe_id = random_recipe()
            log_activation(recipe_id)
            
        elif choice == "2":
            list_all_recipes()
            
        elif choice == "3":
            list_all_recipes()
            selection = input("👉 Enter recipe number (1-5): ").strip()
            
            try:
                idx = int(selection) - 1
                recipe_id = list(RECIPES.keys())[idx]
                display_recipe(recipe_id)
                log_activation(recipe_id)
            except (ValueError, IndexError):
                print("❌ Invalid selection!")
                
        elif choice == "4":
            print("\n🜂 SIDRO STOJI. RITUAL COMPLETE. 🜂\n")
            break
        else:
            print("❌ Invalid option!")


def main():
    """Main entry point"""
    import sys
    
    if len(sys.argv) > 1:
        # Command line mode
        if sys.argv[1] == "random":
            print_banner()
            random_recipe()
        elif sys.argv[1] == "list":
            print_banner()
            list_all_recipes()
        elif sys.argv[1] in RECIPES:
            print_banner()
            display_recipe(sys.argv[1])
        else:
            print("Usage: python ritual_recipes.py [random|list|nigredo|albedo|rubedo|ouroboros|echo]")
    else:
        # Interactive mode
        interactive_mode()


if __name__ == "__main__":
    main()
