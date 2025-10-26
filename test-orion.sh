#!/bin/bash
# 🧪 AI Analyst Quick Test Script
# Run this to verify Orion setup

echo "🜂 ORION AI ANALYST - QUICK TEST 🜂"
echo "=================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in creative-lab directory"
    echo "Run: cd ~/Desktop/Saba_Place/creative-lab"
    exit 1
fi

echo "✅ Directory check passed"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "⚠️  node_modules not found - installing dependencies..."
    npm install
fi

# Check for Leaflet
echo "Checking dependencies..."
if npm list leaflet &>/dev/null; then
    echo "✅ leaflet installed"
else
    echo "⚠️  Installing leaflet..."
    npm install leaflet react-leaflet
fi

# Check for required files
echo ""
echo "Checking Orion files..."

files=(
    "src/components/AIAnalystModal.jsx"
    "src/components/OrionDashboard.jsx"
    "src/App.jsx"
    "src/main.jsx"
)

all_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file - MISSING!"
        all_exist=false
    fi
done

echo ""

if [ "$all_exist" = false ]; then
    echo "⚠️  Some files are missing. AI Analyst may not work."
    echo "Check that all components were created correctly."
    exit 1
fi

# Check for Leaflet CSS import
if grep -q "leaflet/dist/leaflet.css" src/main.jsx; then
    echo "✅ Leaflet CSS import found"
else
    echo "⚠️  Leaflet CSS not imported in main.jsx"
    echo "Add this line: import 'leaflet/dist/leaflet.css'"
fi

echo ""
echo "=================================="
echo "✅ Setup verification complete!"
echo ""
echo "🚀 Ready to test. Run:"
echo "   npm run dev"
echo ""
echo "Then open: http://localhost:5173"
echo "Click: 🛰️ Orion → 🤖 AI Analyst"
echo ""
echo "Test questions:"
echo "  1. Zakaj je Holcim hipokrit?"
echo "  2. Kakšna je situacija s svincem v Savi?"
echo "  3. Kaj je narobe s SIJ Acroni?"
echo "  4. Kakšen je vpliv Krškega?"
echo ""
echo "🜂 Plamen gori! 🔥"
