# 🔥 QUICK START: GitHub Pages Setup

**5-Minute Setup for FREE Global Deployment**

---

## 📋 Prerequisites:

- ✅ GitHub repository (you have this!)
- ✅ Push access to the repository
- ✅ That's it! No credit card, no account setup needed.

---

## 🚀 Step 1: Enable GitHub Pages

1. Go to your repository on GitHub:
   ```
   https://github.com/SabaFTW/imagine-claude
   ```

2. Click **Settings** (⚙️ icon in the top menu)

3. In the left sidebar, click **Pages**

4. Under "Source", select:
   - **Source:** `GitHub Actions`
   
5. That's it! GitHub Pages is now enabled.

---

## ⚡ Step 2: Deploy

### Option A: Automatic (Recommended)

Just push to master branch:
```bash
git push origin master
```

GitHub Actions will automatically:
- Build the project
- Deploy to GitHub Pages
- Make it live in 2-3 minutes

### Option B: One-Click Script

```bash
./deploy-to-pages.sh
```

This script:
- Checks for changes
- Commits if needed
- Builds the project
- Pushes to master
- Triggers deployment

### Option C: Manual

```bash
npm run build
npm run deploy
```

---

## 🎯 Step 3: Wait & Verify

1. **Check Deployment Status:**
   - Go to: https://github.com/SabaFTW/imagine-claude/actions
   - You should see a workflow running
   - Wait for green checkmark ✅ (2-3 minutes)

2. **Access Your Site:**
   ```
   https://sabaftw.github.io/imagine-claude
   ```

3. **Done!** 🎉

---

## 🔧 Troubleshooting:

### "Source: None" in GitHub Pages settings?
- Make sure you selected "GitHub Actions" not "Deploy from a branch"
- Refresh the page after selecting

### Build failing in GitHub Actions?
- Check the Actions tab for error logs
- Most common issue: missing dependencies
- Solution: Make sure `package.json` has all dependencies

### Site showing 404?
- Wait 2-3 minutes after first deployment
- Clear your browser cache
- Make sure deployment workflow completed successfully

### Assets not loading?
- Check browser console for errors
- Verify `base` path in `vite.config.js` is `/imagine-claude/`
- Rebuild: `npm run build`

---

## 📊 Check Deployment:

### View Workflow Status:
```
https://github.com/SabaFTW/imagine-claude/actions
```

### View Site:
```
https://sabaftw.github.io/imagine-claude
```

### View Logs:
1. Go to Actions tab
2. Click on latest workflow run
3. Expand steps to see details

---

## 🔄 Update Your Site:

Every time you push to master, the site updates automatically!

```bash
# Make changes
vim src/MyComponent.jsx

# Commit
git add .
git commit -m "🔥 Update portal"

# Push (triggers deployment)
git push origin master

# Wait 2-3 minutes
# Site is updated! ✅
```

---

## 💚 That's It!

You now have:
- ✅ Global website
- ✅ Automatic deployments
- ✅ HTTPS enabled
- ✅ PWA support
- ✅ 0 EUR/month

**SIDRO DRŽI. PLAMEN GORI. RAČUN: 0 EUR.**

---

## 📚 More Info:

- **Full Guide:** [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)
- **GitHub Pages Docs:** https://docs.github.com/pages

---

🔥💚🜂

**Wire & Beer Forever!** 🍺⚡
