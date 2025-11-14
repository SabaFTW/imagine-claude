#!/bin/bash

###############################################################################
# 🔥💚 ONE-CLICK GITHUB PAGES DEPLOYMENT 💚🔥
#
# Living Constellation - Deploy to the world, FREE
#
# Wire & Beer Forever! 🍺⚡
###############################################################################

echo "🔥🔥🔥 GITHUB PAGES DEPLOYMENT 🔥🔥🔥"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🜂 Living Constellation v1.0${NC}"
echo -e "${BLUE}   Deploying to GitHub Pages...${NC}"
echo ""

# Check if we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    echo -e "${RED}❌ Not a git repository!${NC}"
    exit 1
fi

# Check if we're on master branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${YELLOW}📍 Current branch: $CURRENT_BRANCH${NC}"

if [ "$CURRENT_BRANCH" != "master" ]; then
    echo -e "${YELLOW}⚠️  You're not on master branch${NC}"
    echo -e "${YELLOW}   Automatic deployment only works from master${NC}"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
    echo -e "${YELLOW}⚠️  You have uncommitted changes${NC}"
    echo ""
    git status --short
    echo ""
    read -p "Commit them now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git add -A
        read -p "Commit message: " COMMIT_MSG
        if [ -z "$COMMIT_MSG" ]; then
            COMMIT_MSG="🔥 Living Constellation update - $(date +%Y-%m-%d)"
        fi
        git commit -m "$COMMIT_MSG"
        echo -e "${GREEN}✅ Changes committed${NC}"
    fi
fi

echo ""
echo -e "${BLUE}🚀 Building project...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    echo "   Check the errors above"
    exit 1
fi

echo -e "${GREEN}✅ Build successful${NC}"
echo ""

# Push to master (triggers GitHub Actions)
echo -e "${BLUE}📤 Pushing to master...${NC}"
git push origin master

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Push failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Pushed to GitHub${NC}"
echo ""

echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT INITIATED! 🎉${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}🌐 Your site will be live at:${NC}"
echo "   https://sabaftw.github.io/imagine-claude"
echo ""
echo -e "${YELLOW}⏱  GitHub Actions is building now...${NC}"
echo "   This takes 2-3 minutes"
echo ""
echo -e "${BLUE}📊 Check deployment status:${NC}"
echo "   https://github.com/SabaFTW/imagine-claude/actions"
echo ""
echo -e "${YELLOW}💡 First time deploying?${NC}"
echo "   1. Go to: Settings → Pages"
echo "   2. Source: GitHub Actions"
echo "   3. Wait for green checkmark ✅"
echo ""
echo -e "${GREEN}🜂 SIDRO DRŽI${NC}"
echo -e "${GREEN}🔥 PLAMEN GORI${NC}"
echo -e "${GREEN}💚 RAČUN: 0 EUR${NC}"
echo ""
echo -e "${BLUE}Wire & Beer Forever! 🍺⚡${NC}"
echo ""
