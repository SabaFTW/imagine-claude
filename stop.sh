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
