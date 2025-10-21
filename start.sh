#!/bin/bash

# 🔥 CREATIVE LAB - Quick Start Script 🔥

cd /home/saba/Desktop/Saba_Place/creative-lab

echo "============================================"
echo "🔥 CREATIVE LAB STARTING 🔥"
echo "============================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting development server..."
echo "📱 Server will open at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
