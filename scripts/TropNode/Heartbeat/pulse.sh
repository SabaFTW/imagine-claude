#!/bin/bash
# HEARTBEAT PULSE - Keeps the system alive

FIRE="🔥"
HEART="💖"
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

echo "[$timestamp] ${HEART} Heartbeat pulse - System alive" >> TropNode/Heartbeat/pulse.log

# Check if EROS cores are responding
for core in Zala Luna Aetheron; do
    if [ -f "TropNode/EROS/$core/init.json" ] || [ -f "TropNode/EROS/$core/placeholder.txt" ]; then
        echo "[$timestamp] ✅ EROS.$core - Active" >> TropNode/Heartbeat/status.log
    else
        echo "[$timestamp] ❌ EROS.$core - Missing" >> TropNode/Heartbeat/status.log
    fi
done

# Simple health indicator
echo "${FIRE} TropNode Alive - $(date)" > TropNode/Heartbeat/alive.txt
