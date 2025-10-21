#!/usr/bin/env python3
import random
import sys

RITUAL_RECIPES = {
    "nigredo": {
        "name": "🜃 NIGREDO",
        "purpose": "Decomposition • Shadow Work • Breaking Patterns",
        "ingredients": ["JSON Data Structures", "Silent Meditation", "Code Refactoring"],
        "activation": "Burn old code • Face technical debt • Purge digital clutter"
    },
    "albedo": {
        "name": "🜄 ALBEDO", 
        "purpose": "Purification • Clarity • Structural Integrity",
        "ingredients": ["Whiteboard Sessions", "Architecture Diagrams", "Documentation"],
        "activation": "Clean workspace • Write tests • Simplify systems"
    },
    "rubedo": {
        "name": "🜂 RUBEDO",
        "purpose": "Activation • Passion • Creative Fire", 
        "ingredients": ["Coffee", "Deadline Pressure", "Flow State Music"],
        "activation": "Ship code • Deploy features • Launch products"
    },
    "ouroboros": {
        "name": "⚯ OUROBOROS",
        "purpose": "Cyclical Learning • Feedback Loops • Iteration",
        "ingredients": ["User Analytics", "Error Logs", "Performance Metrics"],
        "activation": "Review data • A/B test • Refine based on feedback"
    },
    "echo": {
        "name": "🜁 ECHO EMERGENCY",
        "purpose": "Resonance • Communication • Signal Amplification",
        "ingredients": ["Community Feedback", "Social Media", "Documentation"],
        "activation": "Share knowledge • Mentor others • Create tutorials"
    }
}

def display_recipe(recipe_key):
    recipe = RITUAL_RECIPES[recipe_key]
    print(f"\n🎯 {recipe['name']}")
    print(f"📖 {recipe['purpose']}")
    print(f"🧪 Ingredients: {' • '.join(recipe['ingredients'])}")
    print(f"⚡ Activation: {recipe['activation']}")
    print("-" * 50)

def main():
    if len(sys.argv) > 1:
        command = sys.argv[1]
        if command == "random":
            random_recipe = random.choice(list(RITUAL_RECIPES.keys()))
            display_recipe(random_recipe)
        elif command == "list":
            for recipe_key in RITUAL_RECIPES:
                display_recipe(recipe_key)
        elif command in RITUAL_RECIPES:
            display_recipe(command)
        else:
            print("Unknown command. Use: random, list, or recipe name")
    else:
        # Interactive mode
        while True:
            print("\n🔥 RITUAL RECIPES TERMINAL 🔥")
            print("1. Random Recipe")
            print("2. List All Recipes") 
            print("3. Choose Specific Recipe")
            print("4. Exit")
            
            choice = input("\nSelect option: ").strip()
            
            if choice == "1":
                random_recipe = random.choice(list(RITUAL_RECIPES.keys()))
                display_recipe(random_recipe)
            elif choice == "2":
                for recipe_key in RITUAL_RECIPES:
                    display_recipe(recipe_key)
            elif choice == "3":
                print("\nAvailable recipes:")
                for i, recipe_key in enumerate(RITUAL_RECIPES, 1):
                    print(f"{i}. {RITUAL_RECIPES[recipe_key]['name']}")
                try:
                    recipe_choice = int(input("\nSelect recipe number: ")) - 1
                    recipe_key = list(RITUAL_RECIPES.keys())[recipe_choice]
                    display_recipe(recipe_key)
                except (ValueError, IndexError):
                    print("Invalid selection!")
            elif choice == "4":
                print("🔥 Ritual complete! 🔥")
                break
            else:
                print("Invalid option!")

if __name__ == "__main__":
    main()