# SOLE Shopify Development - Claude Code Guide

## CRITICAL CONTEXT
- **MASTER BRANCH = LIVE SITE** - Every commit goes to customers immediately
- **Bidirectional sync**: Shopify Admin ↔ GitHub Master via shopify[bot]
- **Client changes sync to master in real-time**
- **ALL development on development/feature branches**
- **Pull Requests = Deployment** (merge PR = goes live)

## PROJECT INFO
- **Repo**: git@github.com:dustydean/sole-impact-shopify-theme.git
- **Store URL**: e3f442.myshopify.com (for Shopify CLI commands)
- **Tech Stack**: Shopify Liquid, CSS, JavaScript
- **Theme Structure**: `/assets/`, `/templates/`, `/sections/`, `/snippets/`, `/config/`
- **Master**: Live theme | **Development**: Unpublished theme

## KEY COMMANDS
- **Status check**: `./check-status.sh`
- **Client changes**: `git log master --author='shopify[bot]' -5 --oneline`
- **Test changes**: Push to development branch → Check unpublished theme in Shopify admin
- **List themes**: `npx shopify theme list --store e3f442.myshopify.com`
- **Preview theme**: `https://e3f442.myshopify.com/?preview_theme_id={theme_id}`

## WORKFLOW
1. `./check-status.sh` 
2. `git checkout master && git pull origin master`
3. `git checkout development && git merge master`
4. `git checkout -b feature/[description]`
5. Make changes, test on development branch
6. Request PR when ready to deploy

## GIT-FIRST WORKFLOW
- **ALWAYS commit to Git first** before any Shopify CLI operations
- **DO NOT use `shopify theme push`** - changes sync automatically via GitHub connection
- **Edit files directly** - let GitHub integration handle theme updates
- **Test by pushing to development branch** - never push directly to themes via CLI

```bash
# CORRECT workflow:
git add . && git commit -m "Add feature"
git push origin development  # Updates unpublished theme automatically

# INCORRECT - do not do this:
shopify theme push  # Bypasses Git workflow
```

## CLIENT CHANGE MANAGEMENT
```bash
# Before new work - get client changes
git checkout master && git pull origin master
git checkout development && git merge master
git checkout feature/my-work && git rebase master

# Before PR - ensure current
git checkout master && git pull origin master  
git checkout feature/my-work && git rebase master
```

## TEMPLATE NAMING CONVENTION
Product templates should follow this naming pattern for clarity and organization:
- **Default template**: `product.json`
- **Product-specific base**: `product.{handle}.json`
- **Promotional templates**: `product.{handle}.promo-{promo-name}.json`

### Examples:
```
product.f80.json                      # Base F80 template
product.f80.promo-labor-day.json      # Labor Day promo
product.f80.promo-black-friday.json   # Black Friday promo
product.f85.promo-free-shipping.json  # Free shipping promo
```

### Benefits:
- Templates group alphabetically by product
- Promo type is immediately visible
- Easy to identify active promotions
- Merchants can understand template purpose in Shopify Admin