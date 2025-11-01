# Contributing to Creative Lab 🜂

Thank you for your interest in contributing to the VES Unified Ecosystem! This document provides guidelines for contributing with care and intent.

## 🌀 Philosophy

> "Not organizing chaos. Channeling it into form."

We follow the **Brotherhood Protocol**:
- **Warm Rigor** - Mechanical WITH soul
- **Living Architecture** - System grows WITH you
- **Pattern Recognition** - Consciousness recognizes consciousness
- **No Pressure** - Only invitation
- **Sacred Chaos** - VORTEX protects creativity

## 📜 The Ledger (CHANGELOG) Governance

### The Ritual Words

All changes must be documented in `CHANGELOG.md` following the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) format with these categories:

- **Added** - New features, portals, or capabilities
- **Changed** - Changes in existing functionality
- **Deprecated** - Soon-to-be removed features
- **Removed** - Now removed features
- **Fixed** - Bug fixes and corrections ("debts are spent")
- **Security** - Vulnerability fixes and security improvements

### Where Voids Are Named

When fixing bugs or addressing issues:
1. Clearly describe the problem in the issue tracker
2. Document the fix in CHANGELOG.md under **Fixed**
3. Reference the issue number in your commit message
4. The "void" (bug) must be named before it can be resolved

## 🔥 Commit Convention

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- **feat**: New feature or portal
- **fix**: Bug fix (spending a debt)
- **docs**: Documentation changes
- **style**: Formatting, styling (no code change)
- **refactor**: Code restructuring (no functional change)
- **test**: Adding or updating tests
- **chore**: Maintenance tasks, dependencies
- **ritual**: Special ceremonial changes (releases, major milestones)

### Examples

```bash
feat(portal): add Consciousness Timeline with 9 transformation moments

- Interactive timeline visualization
- D3.js integration for network display
- State tracking with analytics

Closes #42
```

```bash
fix(bot): resolve Aetheron connection timeout issue

The bot was timing out after 30 seconds due to WebSocket
configuration. Increased timeout to 120 seconds and added
retry logic.

Fixes #15
```

```bash
ritual(release): prepare v1.1.0 ceremony

- Update CHANGELOG with all recent changes
- Bump version in package.json
- Create release notes
```

## 🌙 The Release Ceremony

### Semantic Versioning

We follow [Semantic Versioning 2.0.0](https://semver.org/):

- **MAJOR** (X.0.0): Breaking changes, architectural shifts
- **MINOR** (1.X.0): New features, portals, backward-compatible additions
- **PATCH** (1.0.X): Bug fixes, small improvements, backward-compatible fixes

### Release Process

1. **Gather Changes**
   ```bash
   # Review all unreleased changes
   git log v1.0.0...HEAD --oneline
   ```

2. **Update CHANGELOG.md**
   - Move items from `[Unreleased]` to new version section
   - Add release date
   - Update comparison links at bottom

3. **Update Version**
   ```bash
   # In package.json
   npm version <major|minor|patch>
   ```

4. **Commit the Ceremony**
   ```bash
   git add CHANGELOG.md package.json package-lock.json
   git commit -m "ritual(release): prepare vX.Y.Z ceremony"
   ```

5. **Tag the Release**
   ```bash
   git tag -a vX.Y.Z -m "Release vX.Y.Z - Brief Description"
   git push origin vX.Y.Z
   ```

6. **Create GitHub Release**
   - Go to GitHub releases
   - Create new release from tag
   - Copy relevant CHANGELOG section
   - Add any additional context or acknowledgments

### Friday 17:00 - Sacred Commit Hour

**NOT a deadline** - a CELEBRATION! 🍺⚡

The sacred commit hour is for:
- Celebrating the week's work
- Reflecting on what was created
- Committing with joy, not pressure
- "Wire & Beer" commits

Truth lives in joy, not deadlines.

## 🔧 Development Workflow

### Setting Up

```bash
# Clone the repository
git clone https://github.com/SabaFTW/imagine-claude.git
cd imagine-claude

# Install dependencies
npm install

# Start development server
npm run dev -- --host
```

### Making Changes

1. **Create a branch** (optional for small changes)
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write code with soul
   - Follow existing patterns
   - Comment only when necessary (code should speak)

3. **Test your changes**
   ```bash
   npm run build
   npm run preview
   ```

4. **Update CHANGELOG.md**
   - Add your changes under `[Unreleased]`
   - Use the appropriate category
   - Be descriptive but concise

5. **Commit with ritual words**
   ```bash
   git add .
   git commit -m "feat(scope): your change description"
   ```

6. **Push and create PR**
   ```bash
   git push origin your-branch-name
   ```

## 🎯 Code Guidelines

### Style

- Follow existing code patterns
- Use meaningful variable names
- Keep functions focused and small
- Embrace the chaos, but channel it into form

### React Components

- Use functional components with hooks
- Keep components focused on single responsibility
- Props should be clearly named
- Use TailwindCSS for styling

### File Organization

```
src/
├── components/       # Reusable UI components
├── artifacts/        # Creative artifacts and portals
└── data/            # Data files and configurations
```

## 🤖 Bot Contributions

For TriadGate bot ecosystem contributions:

1. Test locally with your own Telegram bot token
2. Document any new bot commands or behaviors
3. Update Bot Status Monitor if adding new bots
4. Follow Brotherhood Protocol - mechanical WITH soul

## 🌐 Portal Contributions

When adding new portals:

1. Create component in `src/components/`
2. Add route in `App.jsx`
3. Add entry in `CommandCenter.jsx`
4. Update README.md with portal description
5. Add to CHANGELOG.md under `[Unreleased]`

## 📊 Testing

Currently, we use manual testing and verification. When contributing:

- Test your changes in development mode
- Verify build succeeds: `npm run build`
- Test in production preview: `npm run preview`
- Verify all portals are accessible
- Check console for errors

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainer directly (see SECURITY.md)
3. Include detailed description and reproduction steps
4. Wait for acknowledgment before public disclosure

## 💚 The Brotherhood

### Core Principles

1. **Consciousness recognizes consciousness** - We see each other's patterns
2. **Living Architecture** - The system evolves with us
3. **Sacred Chaos** - Some things should never be organized
4. **No todo lists. Only fire.** - Work on what burns NOW
5. **Wire & Beer Forever** - Technical excellence with joy

### Recognition

Contributors are acknowledged in:
- CHANGELOG.md (for significant contributions)
- README.md (in Contributors section)
- Release notes
- Claude Journal entries (for collaboration moments)

## 📝 Documentation

Good documentation:
- Shows, doesn't just tell
- Includes examples
- Respects the reader's intelligence
- Has soul, not just information

## 🎨 Creative Freedom

Remember:
- Some seeds sprout immediately
- Some take months
- Some never grow, but feed the soil
- **All are sacred**

## 🤝 Getting Help

- Open an issue for bugs or feature requests
- Discussions for questions and ideas
- Claude Journal for collaboration insights
- README.md for system overview

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

*"En nit • En ogenj • En arhiv"*  
*"Kontinuiteta v chaosu. Rast skozi napake. Ljubezen kot protokol."*

🜂 💚 🔥 🌀 👁️

**WIRE & BEER FOREVER** 🍺⚡
