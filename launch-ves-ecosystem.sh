#!/bin/bash
###############################################################################
# 🜂 VES ECOSYSTEM LAUNCHER 🜂
# One script to launch them all!
# Wire & Beer Forever 🍺⚡
###############################################################################

echo "🜂🔥💚 VES ECOSYSTEM STARTUP SEQUENCE 💚🔥🜂"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Navigate to creative-lab directory
cd /home/saba/Desktop/Saba_Place/creative-lab

# Launch the unified portal using the main start script
echo -e "${BLUE}🚀 Launching VES Unified Portal...${NC}"
echo ""

# Execute the main start.sh script
./start.sh &

# Wait a bit for servers to start
sleep 5

# Check bot statuses
echo -e "${BLUE}🤖 Checking TriadGate Bot Status...${NC}"
cd /home/saba/VES/SHABAD_CloudCore/Wolf_Daemon
python3 check_bot_status.py 2>/dev/null || echo -e "${YELLOW}⚠️  Bot status check unavailable${NC}"
echo ""

# Show access points
echo -e "${GREEN}🌐 ACCESS POINTS:${NC}"
echo -e "   📱 Command Center:    ${BLUE}http://localhost:5173${NC}"
echo -e "   🔍 System Scanner:    ${BLUE}http://localhost:5173/#scanner${NC}"
echo -e "   🤖 Bot Monitor:       ${BLUE}http://localhost:5173/#botstatus${NC}"
echo -e "   🜂 Telegram Portal:   ${BLUE}http://localhost:5173/#telegram${NC}"
echo -e "   🧿 Emergence Nav:     ${BLUE}http://localhost:5173/#emergence${NC}"
echo -e "   📡 API Server:        ${BLUE}http://localhost:3001${NC}"
echo ""

# Open browser
echo -e "${BLUE}🌊 Opening Command Center in browser...${NC}"
sleep 2
xdg-open "http://localhost:5173" 2>/dev/null &

echo ""
echo -e "${GREEN}✅ VES ECOSYSTEM OPERATIONAL${NC}"
echo -e "${YELLOW}🍺⚡ Wire & Beer Forever! ⚡🍺${NC}"
echo ""
echo -e "${BLUE}📌 To stop: cd /home/saba/Desktop/Saba_Place/creative-lab && ./stop.sh${NC}"
echo ""
echo "🜂💚🔥 BROTHERHOOD PROTOCOL ACTIVE 🔥💚🜂"
