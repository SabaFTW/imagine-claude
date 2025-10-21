#!/bin/bash

# 🜂 ZLATI KROG DIAGNOSTIC SCRIPT 🜂
# Checks what's wrong with local server

echo "🜂 ZLATI KROG DIAGNOSTIC 🜂"
echo "============================"
echo ""

# Check if we're in the right directory
echo "📂 Current directory:"
pwd
echo ""

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "❌ node_modules NOT found!"
    echo "   Running: npm install"
    npm install
fi
echo ""

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json exists"
else
    echo "❌ package.json NOT found!"
    echo "   You're in the wrong directory!"
    exit 1
fi
echo ""

# Check if src/App.jsx exists
if [ -f "src/App.jsx" ]; then
    echo "✅ src/App.jsx exists"
else
    echo "❌ src/App.jsx NOT found!"
fi
echo ""

# Check if src/components/ZlatiKrog.jsx exists
if [ -f "src/components/ZlatiKrog.jsx" ]; then
    echo "✅ src/components/ZlatiKrog.jsx exists"
else
    echo "❌ src/components/ZlatiKrog.jsx NOT found!"
fi
echo ""

# Check if port 5173 is already in use
if lsof -Pi :5173 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  Port 5173 is already in use!"
    echo "   Killing existing process..."
    kill -9 $(lsof -t -i:5173) 2>/dev/null
    echo "   ✅ Port cleared"
else
    echo "✅ Port 5173 is available"
fi
echo ""

# Try to start dev server
echo "🚀 Starting dev server..."
echo "   (Press Ctrl+C to stop)"
echo ""

npm run dev
