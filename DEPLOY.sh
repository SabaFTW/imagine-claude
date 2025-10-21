#!/bin/bash
# DEPLOY TO GITHUB PAGES - AUTO SCRIPT

echo "🜂 DEPLOYING ZLATI KROG TO GITHUB PAGES 🜂"
echo ""

cd /home/saba/Desktop/Saba_Place/creative-lab

# Check if git repo exists
if [ ! -d ".git" ]; then
    echo "Initializing git repo..."
    git init
    git branch -M main
fi

# Copy HTML to index.html for GitHub Pages
cp ZLATI_KROG.html index.html

# Add all files
git add -A

# Commit
git commit -m "🜂 Zlati Krog - Live Deploy $(date +%Y-%m-%d)"

echo ""
echo "✅ Ready to push!"
echo ""
echo "NEXT STEPS:"
echo "1. Go to: https://github.com/new"
echo "2. Create repo named: zlati-krog"
echo "3. Run these commands:"
echo ""
echo "   git remote add origin https://github.com/YOUR-USERNAME/zlati-krog.git"
echo "   git push -u origin main"
echo ""
echo "4. Go to repo Settings → Pages → Deploy from main branch"
echo "5. Your site will be live at: https://YOUR-USERNAME.github.io/zlati-krog"
echo ""
