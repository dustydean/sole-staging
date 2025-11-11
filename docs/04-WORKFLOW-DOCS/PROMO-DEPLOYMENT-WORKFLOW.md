# Promotional Deployment Workflow

**Purpose:** Standardized workflow for biweekly promotional deployments to prevent missed steps and ensure consistency.

**Last Updated:** October 12, 2025

---

## Quick Reference

### Available Product Promo Templates

Current promo templates ready to use:

| Product | Handle | Template File | Common Promos |
|---------|--------|---------------|---------------|
| F63 Treadmill | `sole-f63` | `product.f63.promo-100off.json` | $100 off |
| F65 Treadmill | `sole-f65` | `product.f65.promo-100off.json` | $100 off |
| F80 Treadmill | `sole-f80` | `product.f80.promo-100off.json` | $100 off |
| F85 Treadmill | `sole-f85` | `product.f85.promo-free-shipping.json` | Free delivery |
| E95 Elliptical | `sole-e95` | `product.e95.promo-200off.json` | $200 off |
| SB900 Bike | `sole-sb900` | `product.sb900.promo-500off.json` | $500 off |
| SB1200 Bike | `sole-sb1200` | `product.sb1200.promo-700off.json` | $700 off |

### Collection Pages with Promo Banners

| Collection | File | Promo Banner Section Pattern |
|------------|------|------------------------------|
| Treadmills | `templates/collection.treadmills.json` | `{product}_promo_banner` (e.g., `f85-promo-banner`) |
| Ellipticals | `templates/collection.ellipticals.json` | `{product}_promo_banner` (e.g., `e95-promo-banner`) |
| Bikes | `templates/collection.bikes.json` | `{product}_promo_banner` (e.g., `sb900-promo-banner`) |
| Strength | `templates/collection.strength.json` | (currently default template) |

### Common Messaging Formats

**Product Page Badge:**
```
"[Campaign Name]: [Offer] [Product] — [End Date/Urgency]"
```

Examples:
- `"SOLE Midnight Miles: $100 Off F63 — Ends Oct 26"`
- `"SOLE Deal Days: FREE Delivery on F85 — Offer Ends 10/12"`
- `"SOLE Midnight Miles: $500 Off SB900 — Ends Soon — Limited Stock"`

**Collection Page Banner:**
```
Heading: "[Campaign Name]: [Offer] [Product] — [End Date/Urgency]"
Link: "Shop [Product] Today →"
```

### Key File Locations

```
templates/
├── product.{handle}.promo-{type}.json    # Product page badges
├── collection.{handle}.json               # Collection page banners
└── index.json                             # Homepage slider

docs/
└── DEPLOYMENT_*.md                        # Deployment documentation
```

---

## Standard 6-Phase Workflow

### Phase 1: Setup (Branch Creation)

**Start from the active theme (master branch):**

```bash
# 1. Ensure you're on master and pull latest
cd sole-impact-shopify-theme
git checkout master
git pull origin master

# 2. Create promo branch (naming convention: promo-{client-name}-{date})
git checkout -b promo-btcd-{promo-name}-{m-d}

# Example: promo-btcd-scarygood-a-10-13
```

**Why this matters:** Master = Live theme. Always start from production state.

---

### Phase 2: Planning (Promo Details)

**Fill out this template BEFORE making changes:**

```markdown
## [Promo Name] - [Date Range]

### Campaign Details
- **Promo Name:** [e.g., "Midnight Miles", "Deal Days", "Labor Day Sale"]
- **Start Date:** YYYY-MM-DD
- **End Date:** YYYY-MM-DD
- **Theme/Messaging:** [e.g., "Halloween themed", "Back to School"]

### Products in Promo
- [ ] F63 - Offer: _______ - Message: _______
- [ ] F65 - Offer: _______ - Message: _______
- [ ] F80 - Offer: _______ - Message: _______
- [ ] F85 - Offer: _______ - Message: _______
- [ ] E95 - Offer: _______ - Message: _______
- [ ] SB900 - Offer: _______ - Message: _______
- [ ] SB1200 - Offer: _______ - Message: _______
- [ ] Other: _______ - Offer: _______ - Message: _______

### Touchpoints Checklist
- [ ] Product page badges (which products? _______)
- [ ] Collection page banners (which collections? _______)
- [ ] Homepage slider (yes/no? what products featured? _______)
- [ ] New promo templates needed? (product + offer type: _______)

### Messaging
**Campaign Line:** _______________________________
**Urgency Message:** _____________________________ (e.g., "Ends Oct 26", "Limited Stock", "While Supplies Last")
```

---

### Phase 3: Implementation

#### A. Product Page Badges

**What:** Update the promotional banner that appears on product detail pages (below title, above price).

**Where:** `templates/product.{handle}.promo-{type}.json`

**How to update:**

1. **Find the promo badge block** (search for `promo_banner` or `labor_day_banner` or `{product}_promo_banner`)

2. **Update the title field:**

```json
{
  "type": "offer",
  "settings": {
    "text_alignment": "start",
    "icon_position": "aligned",
    "icon": "picto-timer",
    "icon_width": 28,
    "title": "SOLE [Campaign Name]: [Offer] [Product] — [End Date]",
    "content": "",
    "background": "#B21E2D",
    "text_color": "#FFFFFF"
  }
}
```

**Example (F63 Midnight Miles):**
```json
"title": "SOLE Midnight Miles: $100 Off F63 — Ends Oct 26"
```

**Example (SB900 with urgency):**
```json
"title": "SOLE Midnight Miles: $500 Off SB900 — Ends Soon — Limited Stock"
```

**Common icons:**
- `picto-timer` - Clock icon (time urgency)
- `picto-coupon` - Coupon icon (discount)
- `picto-box` - Box icon (delivery)

**Common backgrounds:**
- `#B21E2D` - SOLE red (most promos)
- `#d1f9e1` - Light green (sale badges)

#### B. Collection Page Banners

**What:** Rich-text promotional banner sections on collection pages that drive traffic to featured products.

**Where:** `templates/collection.{handle}.json`

**Structure:** These are `rich-text` type sections with:
- 1 heading block (promo message)
- 1 richtext block (link to product)
- Light gray background (#e8e8e8)
- Centered, full-width

**How to update:**

1. **Find or create the promo banner section** (e.g., `sb900-promo-banner`)

2. **Update both blocks:**

```json
"{product}-promo-banner": {
  "type": "rich-text",
  "blocks": {
    "promo-heading": {
      "type": "heading",
      "settings": {
        "text": "SOLE [Campaign]: [Offer] [Product] — [End Date]",
        "heading_tag": "h3",
        "text_color": "",
        "gradient": ""
      }
    },
    "promo-link": {
      "type": "richtext",
      "settings": {
        "content": "<p><a href=\"/products/[product-handle]\" title=\"Shop [Product]\"><strong>Shop [Product] Today →</strong></a></p>"
      }
    }
  },
  "block_order": ["promo-heading", "promo-link"],
  "settings": {
    "full_width": true,
    "content_width": "large",
    "text_position": "center",
    "background": "#e8e8e8",
    "background_gradient": "",
    "text_color": ""
  }
}
```

3. **Add to order array** (if new section):
   - Position: After intro section, before first product series section
   - Use Node.js or manually insert section ID into `order` array

**Example (SB900 on Bikes Collection):**
```json
"sb900-promo-banner": {
  "type": "rich-text",
  "blocks": {
    "promo-heading": {
      "type": "heading",
      "settings": {
        "text": "SOLE Midnight Miles: $500 Off SB900 — Ends Soon — Limited Stock",
        "heading_tag": "h3"
      }
    },
    "promo-link": {
      "type": "richtext",
      "settings": {
        "content": "<p><a href=\"/products/sole-sb900\" title=\"Shop SB900 Indoor Cycling Bike\"><strong>Shop SB900 Today →</strong></a></p>"
      }
    }
  }
}
```

#### C. Homepage Slider (Optional)

**What:** Hero slider on homepage (typically updated via Shopify Admin Theme Editor)

**Where:** `templates/index.json` (modified via Shopify admin)

**When to update:** Major seasonal campaigns (Halloween, Black Friday, etc.)

**Process:**
1. Upload new slide images to Shopify Files (desktop + mobile versions)
2. Use Shopify Theme Editor to update slider section
3. Changes sync via shopify[bot] commits

**Note:** These changes appear as "Update from Shopify" commits by shopify[bot].

---

### Phase 4: Deployment

#### Git Workflow

```bash
# 1. Review your changes
git status
git diff

# 2. Commit all changes
git add templates/
git commit -m "Implement [Promo Name] for [Products]

Updated promo messaging for [campaign description] running [dates]:

Product Templates:
- [Product 1]: [Change description]
- [Product 2]: [Change description]

Collection Pages:
- [Collection 1]: [Change description]
- [Collection 2]: [Change description]

Template Assignment Required (Manual via Shopify Admin):
1. Products → [Product 1] → Select template: [template name]
2. Products → [Product 2] → Select template: [template name]

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 3. Push to remote
git push origin promo-btcd-{promo-name}-{date}

# 4. Create deployment documentation
# (See Phase 6 for deployment doc template)
```

#### Create Deployment Documentation

Create `DEPLOYMENT_[PROMO-NAME]_[DATE].md` in the theme root documenting:
- Products included
- Changes made
- Manual steps required
- Testing checklist
- Rollback plan

---

### Phase 5: Shopify Admin (Manual Template Assignment)

**⚠️ CRITICAL: Templates must be manually assigned in Shopify Admin**

After deployment (merge to master):

```
1. Log into Shopify Admin
2. Navigate to: Products
3. For each promo product:
   a. Click product name
   b. Scroll to "Theme templates" section (right sidebar)
   c. Click "Change" button
   d. Select: product.[handle].promo-[type]
   e. Click "Save"

Example:
- F63 → product.f63.promo-100off
- F85 → product.f85.promo-free-shipping
- E95 → product.e95.promo-200off
- SB900 → product.sb900.promo-500off
```

**Why this matters:** Template changes via Git don't automatically assign templates to products. Must be done manually.

---

### Phase 6: Verification (Testing Checklist)

Use this checklist after deployment:

#### Product Pages
- [ ] Each promo product shows correct banner
- [ ] Banner message matches campaign messaging
- [ ] Banner end date is correct
- [ ] Banner is mobile-responsive
- [ ] "Add to Cart" button works
- [ ] Promo badge visible on all devices

#### Collection Pages
- [ ] Featured promo banners display on correct collections
- [ ] Banner links go to correct product pages
- [ ] Banner text matches campaign messaging
- [ ] Banners positioned correctly (after intro, before products)
- [ ] Mobile layout displays correctly

#### Homepage Slider (if updated)
- [ ] Slider shows correct number of slides
- [ ] Halloween/seasonal graphics display properly
- [ ] Desktop images load correctly
- [ ] Mobile images load correctly
- [ ] Slide links go to correct pages
- [ ] Slider transitions smoothly

#### Cross-Browser/Device
- [ ] Desktop Chrome
- [ ] Desktop Safari
- [ ] Desktop Firefox
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)
- [ ] Tablet (iPad/Android)

---

## Common Patterns & Examples

### Pattern 1: Simple Badge Text Update (Most Common)

**Scenario:** Same product, different promo campaign

**Example:** F85 from "Back on Track Sale" → "SOLE Deal Days"

```bash
# Before:
"title": "Back on Track Sale: FREE Delivery on F85 — Offer Ends 9/15"

# After:
"title": "SOLE Deal Days: FREE $99 Delivery on F85 — Offer Ends 10/12"
```

**Files changed:** 1
**Complexity:** Low
**Time:** 2 minutes

### Pattern 2: Collection Banner Update

**Scenario:** Rotate featured product on collection page

**Example:** Treadmills collection from F80 → F63

```bash
# Update heading and link in collection.treadmills.json:

# Before:
"text": "SOLE Deal Days: $100 Off F80 — Best-Seller Ends 10/12"
"content": "<p><a href=\"/products/sole-f80\">Shop F80 Today →</a></p>"

# After:
"text": "SOLE Midnight Miles: $100 Off F63 — Ends Oct 26"
"content": "<p><a href=\"/products/sole-f63\">Shop F63 Today →</a></p>"
```

**Files changed:** 1
**Complexity:** Low
**Time:** 3 minutes

### Pattern 3: Add New Product to Existing Promo

**Scenario:** Expand promo to include additional product

**Example:** Add SB900 to Midnight Miles campaign

**Steps:**
1. Update product badge in `product.sb900.promo-500off.json`
2. Add banner section to `collection.bikes.json`
3. Add to deployment docs
4. Add to Shopify Admin template assignment list

**Files changed:** 2-3
**Complexity:** Medium
**Time:** 15 minutes

### Pattern 4: New Product Promo Template

**Scenario:** Product has never had a promo before

**Steps:**
1. Duplicate existing similar product promo template
2. Rename file: `product.[new-handle].promo-[type].json`
3. Update promo badge section with new messaging
4. Test on preview theme
5. Document in deployment notes

**Files changed:** 1 (new)
**Complexity:** Medium
**Time:** 20 minutes

### Pattern 5: Homepage Slider Overhaul

**Scenario:** Major seasonal campaign with new hero slides

**Process:**
1. Client prepares new slide images (desktop + mobile)
2. Upload to Shopify Files
3. Use Theme Editor to update slider section
4. Test on preview theme
5. Changes sync via shopify[bot]

**Files changed:** `templates/index.json` (via Shopify admin)
**Complexity:** Medium (if done in Shopify) / High (if done in Git)
**Time:** 30-45 minutes

---

## Troubleshooting & Rollback

### Common Issues

#### Issue: Promo badge not showing after template assignment
**Cause:** Browser cache or CDN cache
**Solution:**
1. Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
2. Open incognito window
3. Wait 5-10 minutes for CDN cache to clear

#### Issue: Collection banner not displaying
**Cause:** Section not in `order` array
**Solution:** Verify section ID is in `order` array in collection JSON file

#### Issue: Wrong product featured in collection banner
**Cause:** Copied section from previous promo, forgot to update link
**Solution:** Check both `text` (heading) and `content` (link) are updated

#### Issue: Template not available in Shopify Admin dropdown
**Cause:** File not committed/pushed, or not yet synced
**Solution:**
1. Verify file exists in GitHub
2. Wait 5-10 minutes for sync
3. Refresh Shopify Admin page

### Rollback Procedures

#### Quick Rollback (Template Assignment Only)

If only template assignments need to be reverted:

```
1. Go to Shopify Admin → Products
2. For each product, change template back to default:
   - Click "Change" on Theme templates
   - Select "product" (default template)
   - Click "Save"
```

**Time to rollback:** 2-5 minutes

#### Full Rollback (Code Changes)

If code changes need to be reverted:

```bash
# Option 1: Revert merge commit (if already merged)
git revert [merge-commit-hash]
git push origin master

# Option 2: Force push previous master (DANGER: only if no other changes)
git checkout master
git reset --hard [previous-commit-hash]
git push origin master --force

# Option 3: Create hotfix branch from previous state
git checkout [previous-stable-commit]
git checkout -b hotfix/revert-promo
# Make necessary fixes
git push origin hotfix/revert-promo
# Merge hotfix to master
```

**Time to rollback:** 5-10 minutes

---

## Tips & Best Practices

### Before Starting
- ✅ Always pull latest master before creating promo branch
- ✅ Fill out planning template completely before making changes
- ✅ Check which templates already exist (avoid recreating)
- ✅ Coordinate with client on messaging and dates

### During Implementation
- ✅ Update one product at a time (easier to verify)
- ✅ Use consistent messaging format across all touchpoints
- ✅ Include end dates or urgency messaging
- ✅ Test on preview theme before merging to master
- ✅ Commit related changes together (product + collection banner)

### After Deployment
- ✅ Verify template assignments immediately
- ✅ Test on multiple devices
- ✅ Document what was changed for future reference
- ✅ Set calendar reminder to revert promos after end date

### Naming Conventions
- **Branches:** `promo-btcd-{promo-name}-{m-d}`
- **Templates:** `product.{handle}.promo-{type}.json`
- **Section IDs:** `{product}-promo-banner` (lowercase, hyphenated)
- **Deployment Docs:** `DEPLOYMENT_[PROMO-NAME]_[DATE].md`

---

## Frequency & Maintenance

**Typical Schedule:** Biweekly promotional rotations

**Maintenance Tasks:**
- Review and update this document after each promo
- Add new products to Quick Reference when promo templates created
- Archive old deployment docs after 90 days
- Audit unused promo templates quarterly

---

## Questions?

For questions or improvements to this workflow:
- **Developer:** Dusty Dean (dusty@bitcadet.com)
- **Documentation:** This file + individual deployment docs
- **Git History:** Review past promo commits for examples

---

**Document Version:** 1.0
**Created:** October 12, 2025
**Last Updated:** October 12, 2025
