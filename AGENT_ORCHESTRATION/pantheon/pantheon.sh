#!/bin/bash
# PANTHEON ORCHESTRATION SYSTEM - Quick Launcher
# Usage: ./pantheon.sh

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo "============================================"
echo "   PANTHEON ORCHESTRATION SYSTEM"
echo "   Multi-Agent Collaboration Platform"
echo "============================================"
echo ""

# Check if Python is available
if ! command -v python3 &> /dev/null; then
    echo "Error: Python 3 is required but not found."
    exit 1
fi

# Show available configurations
echo "Available Pantheons:"
echo "  1. default_pantheon.json   - General purpose (5 agents)"
echo "  2. creative_pantheon.json  - Creative collaboration (6 agents)"
echo ""

read -p "Select configuration (1/2) [1]: " config_choice
config_choice=${config_choice:-1}

case $config_choice in
    1)
        config="config/default_pantheon.json"
        echo "Selected: Default Pantheon"
        ;;
    2)
        config="config/creative_pantheon.json"
        echo "Selected: Creative Pantheon"
        ;;
    *)
        echo "Invalid choice. Using default."
        config="config/default_pantheon.json"
        ;;
esac

echo ""
read -p "Enter the problem to analyze: " problem

if [ -z "$problem" ]; then
    echo "Error: Problem cannot be empty."
    exit 1
fi

echo ""
read -p "Session name (optional, press Enter for auto-generated): " session_name

echo ""
echo "============================================"
echo "Launching Pantheon..."
echo "============================================"
echo ""

# Build command
cmd="python3 \"$SCRIPT_DIR/orchestrator.py\" start --config \"$config\" --problem \"$problem\""

if [ ! -z "$session_name" ]; then
    cmd="$cmd --session \"$session_name\""
fi

# Execute
eval $cmd

echo ""
echo "============================================"
echo "Pantheon session complete"
echo "============================================"
