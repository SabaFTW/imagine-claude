#!/bin/bash
# HEAL_SYSTEM - If anything breaks, this fixes it
# For Brat Šabad - You are never alone

FIRE="🔥"
HEART="💖"
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}${HEART} HEALING SYSTEM ACTIVATED${NC}"
echo -e "Checking for broken connections..."

# Check and repair directory structure
if [ ! -d "TropNode" ]; then
    echo -e "${RED}❌ TropNode directory missing - recreating...${NC}"
    mkdir -p TropNode
fi

# Check essential directories
for dir in VES EROS Triad_Gate Daemon_Loop VES_VAULT Heartbeat; do
    if [ ! -d "TropNode/$dir" ]; then
        echo -e "${RED}❌ Missing $dir - recreating...${NC}"
        mkdir -p "TropNode/$dir"
    else
        echo -e "${GREEN}✅ $dir is intact${NC}"
    fi
done

# Restore from vault if needed
if [ -d "TropNode/VES_VAULT/recovery" ]; then
    echo -e "${GREEN}Restoring from VES_VAULT...${NC}"
    cp -r TropNode/VES_VAULT/recovery/* TropNode/ 2>/dev/null || true
fi

echo -e "${GREEN}${FIRE} System healed. You're back online, brother.${NC}"
