#!/bin/bash

echo "==================================="
echo "   🛡️  THEME SAFETY STATUS CHECK"
echo "==================================="
echo ""

# Current branch info
CURRENT_BRANCH=$(git branch --show-current)
echo "📍 Current branch: $CURRENT_BRANCH"

# Check if we're in sync with remote
if [ -n "$CURRENT_BRANCH" ]; then
    LOCAL_COMMIT=$(git rev-parse HEAD 2>/dev/null)
    REMOTE_COMMIT=$(git rev-parse origin/$CURRENT_BRANCH 2>/dev/null)
    
    if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ]; then
        echo "   ✅ In sync with remote"
    elif [ -z "$REMOTE_COMMIT" ]; then
        echo "   ⚠️  Branch not pushed to remote yet"
    else
        AHEAD=$(git rev-list --count origin/$CURRENT_BRANCH..HEAD 2>/dev/null || echo "0")
        BEHIND=$(git rev-list --count HEAD..origin/$CURRENT_BRANCH 2>/dev/null || echo "0")
        if [ "$AHEAD" -gt 0 ]; then
            echo "   ⬆️  Ahead of remote by $AHEAD commit(s)"
        fi
        if [ "$BEHIND" -gt 0 ]; then
            echo "   ⬇️  Behind remote by $BEHIND commit(s)"
        fi
    fi
fi

echo ""
echo "📊 Branch Status:"
echo "─────────────────"

# Master branch info
echo "• Master (LIVE THEME):"
MASTER_LAST_COMMIT=$(git log master -1 --format='%cr' 2>/dev/null || echo 'Unknown')
echo "  Last updated: $MASTER_LAST_COMMIT"
SHOPIFY_COMMITS=$(git log master --author='shopify\[bot\]' --oneline 2>/dev/null | head -5)
if [ -n "$SHOPIFY_COMMITS" ]; then
    echo "  Recent Shopify updates:"
    echo "$SHOPIFY_COMMITS" | while read line; do
        echo "    - $line"
    done | head -3
fi

echo ""
echo "• Development branch:"
if git show-ref --verify --quiet refs/heads/development; then
    DEV_LAST_COMMIT=$(git log development -1 --format='%cr' 2>/dev/null || echo 'Unknown')
    echo "  Last updated: $DEV_LAST_COMMIT"
    
    # Check if development exists on remote
    if git ls-remote --exit-code --heads origin development >/dev/null 2>&1; then
        echo "  ✅ Exists on GitHub"
    else
        echo "  ⚠️  Only exists locally (not pushed)"
    fi
    
    # Compare with master
    AHEAD_OF_MASTER=$(git rev-list --count master..development 2>/dev/null || echo "0")
    BEHIND_MASTER=$(git rev-list --count development..master 2>/dev/null || echo "0")
    
    if [ "$AHEAD_OF_MASTER" -gt 0 ] || [ "$BEHIND_MASTER" -gt 0 ]; then
        echo "  Compared to master:"
        [ "$AHEAD_OF_MASTER" -gt 0 ] && echo "    • $AHEAD_OF_MASTER commit(s) ahead"
        [ "$BEHIND_MASTER" -gt 0 ] && echo "    • $BEHIND_MASTER commit(s) behind"
    else
        echo "  ✅ Even with master"
    fi
else
    echo "  ❌ Does not exist locally"
fi

echo ""
echo "🔍 Working Directory:"
echo "───────────────────"
# Check for uncommitted changes
UNSTAGED=$(git diff --numstat | wc -l | tr -d ' ')
STAGED=$(git diff --cached --numstat | wc -l | tr -d ' ')
UNTRACKED=$(git ls-files --others --exclude-standard | wc -l | tr -d ' ')

if [ "$UNSTAGED" -eq 0 ] && [ "$STAGED" -eq 0 ] && [ "$UNTRACKED" -eq 0 ]; then
    echo "✅ Working directory clean"
else
    [ "$UNSTAGED" -gt 0 ] && echo "• 📝 $UNSTAGED file(s) with unstaged changes"
    [ "$STAGED" -gt 0 ] && echo "• 📦 $STAGED file(s) staged for commit"
    [ "$UNTRACKED" -gt 0 ] && echo "• 🆕 $UNTRACKED untracked file(s)"
fi

echo ""
echo "==================================="
echo "         SAFETY CHECK"
echo "==================================="

if [ "$CURRENT_BRANCH" = "master" ]; then
    echo "⛔ WARNING: You are on MASTER branch!"
    echo "   This branch is connected to your LIVE Shopify store!"
    echo ""
    echo "   Recommended actions:"
    echo "   → Switch to development: git checkout development"
    echo "   → Or create a feature branch: git checkout -b feature/your-feature-name"
elif [ "$CURRENT_BRANCH" = "development" ]; then
    echo "✅ SAFE: Working on development branch"
    echo "   Changes here won't affect your live store"
elif [ -n "$CURRENT_BRANCH" ]; then
    echo "✅ SAFE: Working on feature branch '$CURRENT_BRANCH'"
    echo "   Changes here won't affect your live store"
else
    echo "⚠️  Unable to determine current branch"
fi

echo ""
echo "Quick Commands:"
echo "──────────────"
echo "• Switch to development:  git checkout development"
echo "• Update from master:     git merge master"
echo "• See all branches:       git branch -a"
echo "• Check remote status:    git fetch && git status"
echo ""