#!/bin/bash

# 🔥 CREATIVE LAB - Diagnostic Script 🔥

echo "============================================"
echo "🔥 CREATIVE LAB DIAGNOSTIC 🔥"
echo "============================================"
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in creative-lab directory!"
    echo "Please run: cd /home/saba/Desktop/Saba_Place/creative-lab"
    exit 1
fi

echo "✅ In correct directory"
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js installed: $NODE_VERSION"
else
    echo "❌ Node.js not installed!"
    echo "Install with: sudo pacman -S nodejs npm"
    exit 1
fi
echo ""

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm installed: $NPM_VERSION"
else
    echo "❌ npm not installed!"
    exit 1
fi
echo ""

# Check if node_modules exists
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ node_modules exists"
else
    echo "⚠️  node_modules missing - installing..."
    npm install
fi
echo ""

# Check required files
echo "📄 Checking project files..."
required_files=(
    "src/main.jsx"
    "src/App.jsx"
    "src/index.css"
    "src/App.css"
    "index.html"
    "vite.config.js"
)

for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
    fi
done
echo ""

# Check public directory
echo "📁 Checking public assets..."
public_files=(
    "public/flame.svg"
    "public/icon-192.png"
    "public/icon-512.png"
)

for file in "${public_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "⚠️  Missing: $file"
    fi
done
echo ""

echo "============================================"
echo "🔥 DIAGNOSTIC COMPLETE 🔥"
echo "============================================"
echo ""
echo "To start the development server:"
echo "  npm run dev"
echo ""
echo "To build for production:"
echo "  npm run build"
echo ""
