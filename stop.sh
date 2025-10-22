#!/bin/bash
###############################################################################
# 🛑 VES PORTAL STOPPER 🛑
# Stops all VES portal processes
###############################################################################

echo "🛑 Stopping VES Portal..."

# Kill processes by PID file
if [ -f /tmp/ves-pids.txt ]; then
    while read pid; do
        if ps -p $pid > /dev/null 2>&1; then
            echo "  Killing process $pid..."
            kill $pid 2>/dev/null || true
        fi
    done < /tmp/ves-pids.txt
    rm -f /tmp/ves-pids.txt
fi

# Kill by port as backup
fuser -k 3001/tcp 2>/dev/null || true
fuser -k 5173/tcp 2>/dev/null || true

echo "✅ All VES Portal processes stopped"

# 🜂 SERPENT PROTOCOL: Auto-commit session activity
echo ""
echo "🜂 Serpent Protocol: Recording session..."
if git rev-parse --git-dir > /dev/null 2>&1; then
    # Check if there are any changes to commit
    if ! git diff-index --quiet HEAD -- 2>/dev/null || [ -n "$(git ls-files --others --exclude-standard)" ]; then
        echo "  📝 Changes detected, creating session commit..."

        # Add all changes
        git add -A

        # Create commit with timestamp
        TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
        git commit -m "$(cat <<EOF
🜂 VES Session Activity - $TIMESTAMP

Auto-committed session changes on shutdown.

🜂 Serpent Protocol: Living system tracks itself

Co-Authored-By: Claude <noreply@anthropic.com>
EOF
)" > /dev/null 2>&1

        echo "  ✅ Session committed to git"
    else
        echo "  ✅ No changes to commit"
    fi
else
    echo "  ⚠️  Not a git repository, skipping auto-commit"
fi
