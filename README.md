# SOLE Fitness Shopify Development Platform

A comprehensive development environment for the SOLE Fitness e-commerce platform, featuring advanced visual regression testing, Git-first workflow management, and integrated Shopify theme development.

## 🚀 Quick Start

```bash
# 1. Check project status
./check-status.sh

# 2. Start development
git checkout master && git pull origin master
git checkout development && git merge master
git checkout -b feature/your-feature-name

# 3. Make changes and test visually
./shopify-preview.sh test your-feature-name quick

# 4. Analyze screenshots with Claude Code for visual verification
```

## 📋 Project Overview

**SOLE Fitness Shopify Development Platform** provides a production-ready development environment for managing the SOLE Fitness Shopify theme with:

- **Visual Regression Testing** - Automated screenshot capture and AI-powered analysis
- **Git-First Workflow** - Safe development with bidirectional Shopify sync
- **Dynamic Preview System** - Live theme testing with dynamic URL generation
- **Claude Code Integration** - AI-assisted development and visual verification

### Key Stats
- **Theme**: Shopify Impact v6.9.1 (Maestrooo)
- **Repository**: [sole-impact-shopify-theme](https://github.com/dustydean/sole-impact-shopify-theme)
- **Production Status**: Master branch = Live customer site
- **Development Method**: Feature branches with visual verification

## 🏗️ Architecture

### Core Components

```
Sole-Fitness-Shopify/
├── 📦 sole-impact-shopify-theme/    # Main Shopify theme
│   ├── assets/                      # CSS, JS, images
│   ├── templates/                   # Page templates  
│   ├── sections/                    # Reusable sections
│   ├── snippets/                    # Code components
│   └── config/                      # Theme settings
├── 🧪 Visual Testing System/
│   ├── visual-test.js              # Screenshot engine
│   ├── visual-workflow.sh          # Git-integrated workflow
│   ├── analyze-screenshots.js      # AI analysis generator
│   └── shopify-preview.sh          # Dynamic URL system
└── 📋 Development Docs/
    ├── CLAUDE.md                   # Development workflow guide
    ├── VISUAL-TESTING.md           # Testing system docs
    └── README.md                   # This file
```

### Technology Stack

- **Frontend**: Shopify Liquid, CSS, JavaScript
- **Testing**: Puppeteer, Node.js
- **Workflow**: Git, Shopify CLI
- **Analysis**: Claude Code AI vision
- **Deployment**: GitHub ↔ Shopify bidirectional sync

## 🔧 Development Workflow

### Critical Context
⚠️ **MASTER BRANCH = LIVE SITE** - Every commit goes directly to customers
- Bidirectional sync between Shopify Admin ↔ GitHub Master
- Client changes sync to master in real-time via `shopify[bot]`
- ALL development must happen on feature branches
- Pull Requests = Deployment (merging PR = goes live)

### Standard Development Process

1. **Status Check**
   ```bash
   ./check-status.sh
   ```

2. **Sync with Latest**
   ```bash
   git checkout master && git pull origin master
   git checkout development && git merge master
   ```

3. **Create Feature Branch**
   ```bash
   git checkout -b feature/description
   ```

4. **Make Changes & Test**
   ```bash
   # Edit files, commit changes
   git push origin feature/description
   
   # Visual verification with dynamic URLs
   ./shopify-preview.sh test feature-name quick    # Homepage + product
   ./shopify-preview.sh test feature-name full     # All pages
   ```

5. **AI Visual Analysis**
   - Claude Code automatically analyzes screenshots
   - Structured feedback on layout, responsive design, functionality
   - Severity classification: CRITICAL, HIGH, MEDIUM, LOW

6. **Create Pull Request**
   - Request PR when changes are verified
   - Merging PR = immediate deployment to customers

## 🎯 Visual Regression Testing

### Overview
Comprehensive visual testing system that captures screenshots before/after changes and uses AI analysis to identify regressions.

### Key Features
- **Dynamic Store URLs** - Automatically detects Shopify store URLs via CLI
- **Multi-Viewport Testing** - Desktop (1920x1080), Tablet (768x1024), Mobile (390x844)
- **Git Integration** - Baseline from master, current from feature branch
- **AI Analysis** - Claude Code provides structured visual feedback
- **Full-Page Capture** - Complete page screenshots, not just viewport

### Testing Commands

```bash
# Complete workflow (baseline → test → compare → analyze)
./visual-workflow.sh full feature-name

# Quick test (homepage + product only)
./visual-workflow.sh quick feature-name

# Individual steps
./visual-workflow.sh baseline feature-name  # Capture from master
./visual-workflow.sh test feature-name      # Capture from feature branch
./visual-workflow.sh compare feature-name   # Generate comparison report

# Preview URLs in browser
./shopify-preview.sh urls                   # Generate all preview URLs
./shopify-preview.sh open                   # Open preview URLs in browser
```

### Pages Tested
- **Homepage** (`/`)
- **Treadmills Collection** (`/collections/treadmills`)
- **Product Page** (`/products/sole-f63-treadmill`)
- **Cart** (`/cart`)
- **Search** (`/search`)

### Screenshot Organization
```
screenshots/
├── baseline/                    # Before changes (master branch)
│   └── 2025-08-26_feature-name/
├── current/                     # After changes (feature branch)
│   └── 2025-08-26_feature-name/
└── comparisons/                 # Analysis results
    └── 2025-08-26_feature-name/
        ├── report.md            # Human-readable report
        └── report.json          # Machine-readable data
```

## 🤖 Claude Code Integration

### AI-Powered Development
This project is designed to work seamlessly with Claude Code for:
- **Visual Analysis** - AI reads screenshots and provides structured feedback
- **Code Review** - Analysis of template changes and improvements
- **Documentation** - Auto-generated analysis instructions
- **Workflow Guidance** - Step-by-step development assistance

### Analysis Categories
- **Layout Issues** - Alignment, spacing, overlaps
- **Responsive Design** - Multi-device compatibility
- **Visual Consistency** - Brand colors, fonts, imagery
- **Functionality** - Buttons, forms, navigation
- **Accessibility** - Contrast, hierarchy, usability

## 📈 Advanced Features

### Dynamic Shopify Integration
- **Auto URL Detection** - Extracts store URLs from `shopify theme list`
- **Theme ID Management** - Dynamic development theme ID retrieval
- **Preview URL Generation** - Creates theme preview URLs with proper parameters
- **Live Theme Testing** - Test changes on unpublished development theme

### Git-First Approach
- **No CLI Push** - Never use `shopify theme push` (bypasses Git workflow)
- **Branch Safety** - Warns about uncommitted changes
- **Client Change Tracking** - Monitor `shopify[bot]` commits from client
- **Automatic Sync** - GitHub integration handles theme updates

### Buy Box Promo System
Advanced metafield-based promotional banner system:
- **Clean Implementation** - No hardcoded promotional text
- **Flexible Configuration** - Easy to enable/disable promotions
- **Professional Appearance** - On-brand styling with icons
- **Bulk Management** - CSV import/export support

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js** (for visual testing scripts)
- **Shopify CLI** (for theme management)
- **Git** (for version control)
- **Puppeteer** (installed at `/Users/dustydean/mcp-puppeteer/`)

### First-Time Setup
```bash
# 1. Clone and setup
git clone https://github.com/dustydean/sole-impact-shopify-theme.git
cd Sole-Fitness-Shopify

# 2. Initialize visual testing
./visual-workflow.sh setup

# 3. Test the system
./shopify-preview.sh urls
```

### Shopify Authentication
```bash
# Login to Shopify CLI
shopify auth login

# Verify connection
shopify theme list
```

## 📚 Documentation

- **[CLAUDE.md](CLAUDE.md)** - Complete development workflow guide
- **[VISUAL-TESTING.md](VISUAL-TESTING.md)** - Visual regression testing documentation  
- **[BUY_BOX_PROMO_BANNER_GUIDE.md](sole-impact-shopify-theme/BUY_BOX_PROMO_BANNER_GUIDE.md)** - Promotional banner system
- **[DEPLOYMENT.md](sole-impact-shopify-theme/DEPLOYMENT.md)** - Theme deployment procedures

## 🔍 Troubleshooting

### Common Issues

**Screenshots Not Captured**
- Verify Puppeteer installation at `/Users/dustydean/mcp-puppeteer/`
- Check network connectivity to soletreadmills.com
- Ensure Shopify CLI authentication

**Git Integration Problems**  
- Verify you're in a Git repository
- Check that origin/master exists and is accessible
- Ensure permissions to checkout/pull master

**Visual Analysis Missing**
- Check that manifest.json exists in session directory
- Verify analyze-screenshots.js is executable
- Ensure Claude Code can read screenshot files

### Support Channels
- **Repository Issues**: [GitHub Issues](https://github.com/dustydean/sole-impact-shopify-theme/issues)
- **Theme Documentation**: [Maestrooo Support](https://support.maestrooo.com/)
- **Development Questions**: Review CLAUDE.md workflow guide

## 🚦 Project Status

✅ **Production Ready** - Visual testing system fully operational  
✅ **Git Workflow** - Bidirectional sync with Shopify configured  
✅ **AI Integration** - Claude Code analysis system active  
✅ **Documentation** - Comprehensive guides available  
✅ **Theme Updated** - Latest Impact v6.9.1 with custom enhancements  

## 🤝 Contributing

### Development Standards
- **Feature branches only** - Never commit directly to master
- **Visual verification required** - All changes must pass visual testing
- **AI analysis mandatory** - Use Claude Code for screenshot review
- **Documentation updates** - Update relevant .md files for significant changes

### Pull Request Process
1. Create feature branch from latest master
2. Make changes and commit with clear messages
3. Run visual regression testing workflow
4. Get AI analysis approval for visual changes
5. Request PR with test results and analysis
6. Merge approval = immediate live deployment

---

**Version**: 2.0  
**Last Updated**: August 26, 2025  
**Maintainer**: dustydean  
**Status**: Active Development

*This development platform ensures SOLE Fitness theme changes are visually perfect before reaching customers through comprehensive testing and AI-powered analysis.*