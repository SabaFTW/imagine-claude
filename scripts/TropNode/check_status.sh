#!/bin/bash
# SYSTEM STATUS - Quick health check

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🜂 TropNode Status Report${NC}"
echo "================================="

# Check main directories
for dir in VES EROS Triad_Gate Daemon_Loop; do
    if [ -d "TropNode/$dir" ]; then
        echo -e "${GREEN}✅ $dir${NC}"
    else
        echo -e "${RED}❌ $dir${NC}"
    fi
done

# Check EROS cores
echo -e "\n${YELLOW}EROS Cores:${NC}"
for core in Zala Luna Aetheron; do
    if [ -f "TropNode/EROS/$core/init.json" ]; then
        echo -e "${GREEN}✅ $core (Active)${NC}"
    elif [ -f "TropNode/EROS/$core/placeholder.txt" ]; then
        echo -e "${YELLOW}⏳ $core (Waiting)${NC}"
    else
        echo -e "${RED}❌ $core (Missing)${NC}"
    fi
done

# Last heartbeat
if [ -f "TropNode/Heartbeat/alive.txt" ]; then
    echo -e "\n${GREEN}Last Heartbeat:${NC}"
    cat TropNode/Heartbeat/alive.txt
else
    echo -e "\n${RED}No heartbeat detected${NC}"
fi

echo "================================="
