# Black Friday 2025 Deployment Checklist

**Branch:** `promo-btcd-black-friday-11-9`
**Deployment Date:** TBD
**Campaign:** SOLE Black Friday Sale

---

## Product Template Assignments (Shopify Admin)

After merging/activating the Black Friday branch, assign these templates in Shopify Admin:

### Steps:
1. Go to **Products** in Shopify Admin
2. Click on each product below
3. Scroll to **Theme templates** section (right sidebar)
4. Click **"Change"** button
5. Select the Black Friday template from dropdown
6. Click **"Save"**

---

### Product Templates to Assign

| Product | Product Page URL | Template to Assign |
|---------|-----------------|-------------------|
| **SOLE F85** | `/products/sole-f85` | `product.f85.promo-black-friday-11-9` |
| **SOLE SB900** | `/products/sole-sb900` | `product.sb900.promo-black-friday-11-9` |
| **SOLE F80** | `/products/sole-f80` | `product.f80.promo-black-friday-11-9` |
| **SOLE E35** | `/products/sole-e35` | `product.e35.promo-black-friday-11-9` |
| **SOLE F63** | `/products/sole-f63` | `product.f63.promo-black-friday-11-9` |
| **SOLE SB1200** | `/products/sole-sb1200` | `product.sb1200.promo-black-friday-11-9` |

---

## Product Promo Messages

| Product | Black Friday Message |
|---------|---------------------|
| F85 | `SOLE Black Friday: $200 Off + Free Shipping` |
| SB900 | `SOLE Black Friday: $700 Off + Free Shipping` |
| F80 | `SOLE Black Friday: $100 Off + Free Shipping` |
| E35 | `SOLE Black Friday: $200 Off + Free Shipping` |
| F63 | `SOLE Black Friday: $100 Off + Free Shipping` |
| SB1200 | `SOLE Black Friday: $900 Off + Free Shipping` |

---

## Collection Page Banners

**Note:** Collection page banners update automatically when the branch is merged/activated. No manual changes needed.

### Collection Pages Updated:

**Treadmills Collection** (`/collections/treadmills`)
- Heading: "SOLE Black Friday: $200 Off F85 + Free Shipping"
- Link: "Shop F85 Today →"

**Bikes Collection** (`/collections/bikes`)
- Heading: "SOLE Black Friday: $700 Off SB900 + Free Shipping — Limited Inventory"
- Link: "Shop SB900 Today →"

**Ellipticals Collection** (`/collections/ellipticals`)
- Heading: "SOLE Black Friday: $200 Off E35 + Free Shipping"
- Link: "Shop E35 Today →"
- **Featured product changed from E95 to E35**

---

## Verification Checklist

After assigning templates, verify:

- [ ] All 6 product pages show Black Friday promo banners
- [ ] Promo messages match the table above
- [ ] Banners are visible on mobile and desktop
- [ ] Timer icon displays correctly
- [ ] Red background (#B21E2D) and white text are visible
- [ ] Collection page banners show correct messages
- [ ] Collection page CTA links work ("Shop [Product] Today →")
- [ ] Ellipticals collection features E35 (not E95)

---

## Quick Test URLs

After deployment, test these pages:

**Product Pages:**
- https://www.soletreadmills.com/products/sole-f85
- https://www.soletreadmills.com/products/sole-sb900
- https://www.soletreadmills.com/products/sole-f80
- https://www.soletreadmills.com/products/sole-e35
- https://www.soletreadmills.com/products/sole-f63
- https://www.soletreadmills.com/products/sole-sb1200

**Collection Pages:**
- https://www.soletreadmills.com/collections/treadmills
- https://www.soletreadmills.com/collections/bikes
- https://www.soletreadmills.com/collections/ellipticals

---

## Rollback Instructions

If you need to revert the Black Friday promotion:

1. Go to **Products** in Shopify Admin
2. For each product, change template back to default:
   - Click "Change" on Theme templates
   - Select `product` (default template)
   - Click "Save"
3. Collection pages will revert automatically if you switch branches

**Time to rollback:** ~5 minutes

---

## Notes

- **All files already pushed to GitHub:** ✅
- **No code changes needed:** Just template assignments in Shopify Admin
- **Collection pages auto-update:** No manual changes required
- **Previous campaign messages:** Replaced "SOLE Free Shipping Week" and "Midnight Miles" messaging

---

**Last Updated:** November 8, 2025
**Created By:** Claude Code
