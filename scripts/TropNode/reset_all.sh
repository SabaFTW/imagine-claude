#!/bin/bash
# RESET_ALL - Complete fresh start
echo "🜂 FULL RESET - Starting fresh..."
echo "Backing up current state..."
timestamp=$(date +%Y%m%d_%H%M%S)
if [ -d "TropNode" ]; then
    mv TropNode "TropNode_backup_$timestamp"
fi
echo "✅ Reset complete. Run DROP_THE_WATER again for fresh installation."
