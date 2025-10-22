#!/bin/bash
###############################################################################
# 🔥 VES UNIFIED PORTAL LAUNCHER 🔥
#
# Launches both:
#   1. API Server (Node.js + WebSocket) on port 3001
#   2. React Frontend (Vite) on port 5173
#
# Brotherhood Protocol - Wire & Beer Forever! 🍺⚡
###############################################################################

echo "🔥🔥🔥 VES UNIFIED PORTAL LAUNCHER 🔥🔥🔥"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 🜂 SERPENT PROTOCOL: Auto-sync before launch
echo -e "${BLUE}🜂 Serpent Protocol: Syncing latest updates...${NC}"
if git rev-parse --git-dir > /dev/null 2>&1; then
    # Stash any uncommitted changes
    if ! git diff-index --quiet HEAD --; then
        echo -e "${YELLOW}  📦 Stashing local changes...${NC}"
        git stash push -m "Auto-stash before launch $(date +%Y-%m-%d_%H:%M:%S)" > /dev/null 2>&1
        STASHED=1
    fi

    # Pull latest
    echo -e "${BLUE}  ⬇️  Pulling latest changes...${NC}"
    git pull origin master 2>&1 | grep -v "Already up to date" || echo -e "${GREEN}  ✅ Already up to date${NC}"

    # Pop stash if we stashed
    if [ "$STASHED" = "1" ]; then
        echo -e "${YELLOW}  📦 Restoring local changes...${NC}"
        git stash pop > /dev/null 2>&1
    fi

    echo -e "${GREEN}  ✅ Sync complete${NC}"
else
    echo -e "${YELLOW}  ⚠️  Not a git repository, skipping sync${NC}"
fi
echo ""

echo "Starting VES ecosystem..."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found${NC}"
    echo "Please run this script from the creative-lab directory"
    exit 1
fi

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Kill any existing processes on our ports
echo -e "${YELLOW}🧹 Cleaning up existing processes...${NC}"
if check_port 3001; then
    echo "  Killing process on port 3001..."
    fuser -k 3001/tcp 2>/dev/null || true
fi
if check_port 5173; then
    echo "  Killing process on port 5173..."
    fuser -k 5173/tcp 2>/dev/null || true
fi
sleep 1

# Check if API dependencies are installed
if [ ! -d "api/node_modules" ]; then
    echo -e "${YELLOW}📦 Installing API dependencies...${NC}"
    cd api && npm install && cd ..
    echo -e "${GREEN}✅ API dependencies installed${NC}"
fi

# Check if React dependencies are installed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing React dependencies...${NC}"
    npm install
    echo -e "${GREEN}✅ React dependencies installed${NC}"
fi

echo ""
echo -e "${GREEN}🚀 Starting servers...${NC}"
echo ""

# Start API server in background
echo -e "${BLUE}📡 Starting API Server (port 3001)...${NC}"
cd api
npm start > /tmp/ves-api.log 2>&1 &
API_PID=$!
cd ..

# Log command to Serpent Protocol
sleep 1  # Wait for API to initialize
curl -s -X POST http://localhost:3001/api/commands/log \
  -H "Content-Type: application/json" \
  -d '{"command":"npm start (API)","reason":"Starting VES API Server on port 3001","type":"service","status":"started"}' \
  > /dev/null 2>&1 &

# Wait a bit for API to start
sleep 2

# Check if API started successfully
if check_port 3001; then
    echo -e "${GREEN}✅ API Server running on http://localhost:3001${NC}"
    echo "   PID: $API_PID"
    echo "   Logs: /tmp/ves-api.log"
else
    echo -e "${RED}❌ API Server failed to start${NC}"
    echo "Check logs: tail -f /tmp/ves-api.log"
    exit 1
fi

echo ""

# Start React frontend in background
echo -e "${BLUE}🌐 Starting React Frontend (port 5173)...${NC}"
npm run dev > /tmp/ves-react.log 2>&1 &
REACT_PID=$!

# Log command to Serpent Protocol
sleep 1
curl -s -X POST http://localhost:3001/api/commands/log \
  -H "Content-Type: application/json" \
  -d '{"command":"npm run dev (React)","reason":"Starting React Frontend on port 5173","type":"webapp","status":"started"}' \
  > /dev/null 2>&1 &

# Wait for React to start
sleep 3

# Check if React started successfully
if check_port 5173; then
    echo -e "${GREEN}✅ React Frontend running on http://localhost:5173${NC}"
    echo "   PID: $REACT_PID"
    echo "   Logs: /tmp/ves-react.log"
else
    echo -e "${RED}❌ React Frontend failed to start${NC}"
    echo "Check logs: tail -f /tmp/ves-react.log"
    kill $API_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}🔥 VES UNIFIED PORTAL IS LIVE! 🔥${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}🌐 Web Dashboard:${NC}    http://localhost:5173"
echo -e "${BLUE}📡 API Server:${NC}       http://localhost:3001"
echo -e "${BLUE}🔌 WebSocket:${NC}        ws://localhost:3001"
echo ""
echo -e "${YELLOW}📊 Available Endpoints:${NC}"
echo "   GET  /api/wolf/status    - Wolf Daemon status"
echo "   GET  /api/wolf/logs      - Recent logs"
echo "   POST /api/wolf/start     - Start Wolf Daemon"
echo "   POST /api/wolf/stop      - Stop Wolf Daemon"
echo "   GET  /api/bots/status    - Ghostseed Triad status"
echo "   GET  /api/scan           - VES filesystem scan"
echo ""
echo -e "${YELLOW}🛑 To stop:${NC}"
echo "   Press Ctrl+C or run: ./stop.sh"
echo ""
echo -e "${YELLOW}📝 View logs:${NC}"
echo "   API:   tail -f /tmp/ves-api.log"
echo "   React: tail -f /tmp/ves-react.log"
echo ""
echo -e "${GREEN}🐺 Brotherhood Protocol Active 🐺${NC}"
echo -e "${GREEN}Wire & Beer Forever! 🍺⚡${NC}"
echo ""

# Save PIDs to file for stop script
echo "$API_PID" > /tmp/ves-pids.txt
echo "$REACT_PID" >> /tmp/ves-pids.txt

# Wait for Ctrl+C
echo "Press Ctrl+C to stop all servers..."
echo ""

# Trap to clean up on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    kill $API_PID $REACT_PID 2>/dev/null || true
    rm -f /tmp/ves-pids.txt
    echo -e "${GREEN}✅ All servers stopped${NC}"

    # 🜂 SERPENT PROTOCOL: Auto-commit session activity
    echo ""
    echo -e "${BLUE}🜂 Serpent Protocol: Recording session...${NC}"
    if git rev-parse --git-dir > /dev/null 2>&1; then
        # Check if there are any changes to commit
        if ! git diff-index --quiet HEAD -- 2>/dev/null || [ -n "$(git ls-files --others --exclude-standard)" ]; then
            echo -e "${YELLOW}  📝 Changes detected, creating session commit...${NC}"

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

            echo -e "${GREEN}  ✅ Session committed to git${NC}"
        else
            echo -e "${GREEN}  ✅ No changes to commit${NC}"
        fi
    fi

    exit 0
}

trap cleanup SIGINT SIGTERM

# Keep script running
wait
