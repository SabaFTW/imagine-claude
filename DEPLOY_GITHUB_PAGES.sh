#!/bin/bash

# 🔥 GitHub Pages Deployment Script 🔥
# Copy-paste this whole script into your terminal!

echo "🔥 GitHub Pages Deployment Starting... 🔥"
echo ""

# 1. Install gh-pages
echo "📦 Installing gh-pages..."
npm install --save-dev gh-pages

# 2. Add to package.json (you'll need to edit manually)
echo ""
echo "⚠️  MANUAL STEP REQUIRED:"
echo "Open package.json and add these lines:"
echo ""
echo '  "homepage": "https://sabaftw.github.io/creative-lab",'
echo '  "scripts": {'
echo '    "predeploy": "npm run build",'
echo '    "deploy": "gh-pages -d dist"'
echo '  }'
echo ""
echo "Press Enter when done..."
read

# 3. Edit vite.config.js (manual)
echo ""
echo "⚠️  MANUAL STEP 2:"
echo "Open vite.config.js and add:"
echo ""
echo "  base: '/creative-lab/'"
echo ""
echo "Press Enter when done..."
read

# 4. Build and deploy
echo ""
echo "🚀 Building and deploying..."
npm run deploy

echo ""
echo "✅ DONE! Check: https://sabaftw.github.io/creative-lab"
echo "   (Wait 1-2 minutes for GitHub Pages to activate)"
echo ""
echo "🔥 Wire & Beer Forever! 🍺⚡"
