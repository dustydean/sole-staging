# ScaryGood Deployment - October 2025

**Deployment Date:** Tomorrow Night (October 12, 2025)
**Branch:** `promo-btcd-scarygood-a-10-13`
**Status:** Ready for Production

---

## Executive Summary

This deployment includes four major improvements to the SOLE Fitness website:

1. **Halloween/Midnight Miles Promotion** - Special pricing and offers for F63, F85, E95, and SB900 running Oct 13-26
2. **Homepage Slider Refresh** - Streamlined hero slider with 2 new Halloween-themed slides (removed 5 old Deal Days slides)
3. **Customer Reviews Upgrade** - Migration from Bazaarvoice to ResellerRatings for better review display and management
4. **Collection Pages Optimization** - Cleaner, more scannable copy on Bikes and Ellipticals collection pages to improve conversion rates

---

## 1. Halloween Promotion: Midnight Miles (Oct 13-26)

### Overview
Special promotional pricing and offers for four key products timed for the Halloween/fall season.

### Product-Specific Changes

#### F63 Treadmill
- **Offer:** $100 Off
- **Messaging:** "$100 Off F63 — Ends Oct 26"
- **What Changed:** Updated promo banner on product page and treadmills collection page
- **Template:** `product.f63.promo-100off.json`

#### F85 Treadmill
- **Offer:** FREE Delivery
- **Messaging:** "FREE Delivery on F85 — Ends Oct 26"
- **What Changed:** Updated promo banner on product page
- **Template:** `product.f85.promo-free-shipping.json`

#### E95 Elliptical (NEW)
- **Offer:** $200 Off
- **Messaging:** "$200 Off E95 — Ends Oct 26"
- **What Changed:** Created new promo template and added promo banner to ellipticals collection page
- **Template:** `product.e95.promo-200off.json` (newly created)

#### SB900 Indoor Cycling Bike
- **Offer:** $500 Off
- **Messaging:** "$500 Off SB900 — Ends Soon — Limited Stock"
- **What Changed:** Updated promo template from "Deal Days" to "Midnight Miles" campaign, added promo banner to bikes collection page
- **Template:** `product.sb900.promo-500off.json` (updated)

### Collection Page Updates
- **Treadmills Collection:** Updated featured promo to showcase F63 (was previously F80)
- **Ellipticals Collection:** Added new E95 promo banner section
- **Bikes Collection:** Added new SB900 promo banner section

### Homepage Slider Updates
The homepage hero slider has been completely refreshed for the Halloween/Midnight Miles promotion:

#### What Changed
- **Removed Old Slides:** Cleared out 5 previous "Deal Days" promotional slides
  - F80 Deal Days slider (removed)
  - F63 Deal Days slider (removed)
  - F85 Deal Days slider (removed)
  - SB900 Deal Days slider (removed)
  - SB1200 Deal Days slider (removed)

- **Added New Halloween Slides:** Two new promotional slides featuring Halloween-themed graphics
  - **Slide 1:** F63 Halloween banner (links to F63 product page)
  - **Slide 2:** F85 Halloween banner (links to F85 product page)

#### Visual Updates
- New Halloween/fall-themed banner graphics for F63 and F85
- Separate desktop and mobile optimized images
- Clean, streamlined slider with just 2 slides for better focus
- All slides link directly to their respective product pages

#### Why This Matters
- **Simplified User Experience:** Reduced from 5 slides to 2 for faster comprehension and less slider fatigue
- **Promotional Focus:** Spotlights the two hero products for the Midnight Miles campaign
- **Seasonal Branding:** Halloween graphics create timely, relevant messaging for the Oct 13-26 promotion period
- **Better Mobile Performance:** Fewer slides means faster load times on mobile devices

### ⚠️ Action Required (Manual in Shopify Admin)
After deployment, the following templates must be assigned in Shopify Admin:

1. Navigate to **Products → SOLE F63** → Select template: `product.f63.promo-100off`
2. Navigate to **Products → SOLE F85** → Select template: `product.f85.promo-free-shipping`
3. Navigate to **Products → SOLE E95** → Select template: `product.e95.promo-200off`
4. Navigate to **Products → SOLE SB900** → Select template: `product.sb900.promo-500off`

**Important:** Templates must be assigned manually after deployment for promo banners to appear.

---

## 2. Customer Reviews: ResellerRatings Integration

### Overview
Complete migration from Bazaarvoice to ResellerRatings for customer review display and collection. This improves review management, reduces costs, and provides better integration with product pages.

### What Changed
- **Review Widget:** ResellerRatings widget now displays on product pages
- **Star Ratings:** Star-only displays available for product cards and listings
- **Custom Styling:** Custom CSS applied to match SOLE brand guidelines
- **Theme Settings:** New toggle in Theme Editor to enable/disable ResellerRatings

### Key Features
- **Inline Star Reviews:** Product ratings display inline with product information
- **Review Summary:** Aggregate review scores and counts
- **Review Display:** Full customer reviews with ratings on product detail pages
- **Merchant Review Widget:** Store-level ratings and reviews
- **Mobile Optimized:** Responsive design works seamlessly on all devices

### Technical Implementation
- ResellerRatings custom CSS file: `assets/resellerratings-custom.css`
- Snippet for star display: `snippets/resellerratings-stars.liquid`
- Product template integration via Theme Editor blocks
- Settings in Theme Customizer: `resellerratings_enabled` (default: enabled)

### Benefits
- **Better UI/UX:** Cleaner, more modern review interface
- **Easier Management:** Centralized review collection and moderation
- **Cost Savings:** More affordable than Bazaarvoice enterprise solution
- **Better Performance:** Lighter-weight widget loads faster

---

## 3. Collection Pages Optimization

### Overview
Simplified and optimized copy on Bikes and Ellipticals collection pages to match the successful conversion-focused approach used on the Treadmills collection page. Focus on scannable, benefit-driven messaging that reduces cognitive load and highlights key differentiators.

### Bikes Collection Updates

#### Hero Section (Top of Page)
- **New Headline:** "Engineered for Smooth, Silent Rides"
- **New Subtitle:** "Magnetic resistance, sturdy steel frames, and precision flywheels deliver a premium indoor cycling experience—no subscription required."

#### Product Series Copy (Simplified)
**Before:** Long paragraphs with 3-4 bullet points explaining features and benefits

**After:** Scannable one-liners focusing on key benefits:
- **Recumbent Bikes:** "Comfortable seated design—ideal for low-impact cardio with back support."
- **Upright Bikes:** "Traditional bike posture—smooth, quiet performance for serious training."
- **Indoor Cycling Bikes:** "Studio-style intensity—heavy flywheel, magnetic resistance, zero maintenance."

### Ellipticals Collection Updates

#### Hero Section (Top of Page)
- **New Headline:** "Built for Comfort. Engineered for Endurance."
- **New Subtitle:** "Heavy flywheels, adjustable pedals, and whisper-quiet motion deliver a smooth, low-impact workout—no subscription required."

#### Product Series Copy (Simplified)
**Before:** 3 long paragraphs per series with detailed feature explanations

**After:** Scannable one-liners focusing on key benefits:
- **E25/E35 Series:** "Entry to mid-level ellipticals—smooth motion, adjustable incline, great value."
- **E9X Series:** "Premium ellipticals—adjustable pedals/stride, touchscreens, SOLE+ integration."

### What Stayed the Same
- Product comparison charts (preserved all technical specs)
- Product images and cards
- SOLE+ App section
- FAQ section
- All product listings and filtering

### Benefits
- **Improved Scannability:** Customers can quickly understand each product line
- **Reduced Cognitive Load:** Shorter, punchier copy is easier to process
- **Better Mobile Experience:** Less scrolling, faster comprehension
- **Higher Conversion Potential:** Clear value propositions lead customers to product pages faster
- **Consistent UX:** Matches the proven treadmills collection page structure
- **Emphasizes Differentiators:** "No subscription required" messaging addresses key customer concern

---

## Timeline & Deployment Process

### Pre-Deployment (Complete)
- ✅ All code changes committed to `promo-btcd-scarygood-a-10-13` branch
- ✅ Changes tested on preview theme
- ✅ Client approval obtained

### Deployment (Tomorrow Night - Oct 12, 2025)
1. Branch `promo-btcd-scarygood-a-10-13` will be merged to `master`
2. Changes will automatically sync to live site via GitHub integration
3. Approximate downtime: None (seamless deployment)

### Post-Deployment (Oct 13, 2025 - Morning)
**⚠️ Critical Action Items:**

1. **Assign Promo Templates** (Shopify Admin):
   - F63 → `product.f63.promo-100off`
   - F85 → `product.f85.promo-free-shipping`
   - E95 → `product.e95.promo-200off`
   - SB900 → `product.sb900.promo-500off`

2. **Verify ResellerRatings:**
   - Check product pages show review widgets correctly
   - Verify star ratings display on product cards
   - Test review submission flow
   - Confirm mobile display

3. **Verify Collection Pages:**
   - Review bikes collection page for correct copy
   - Review ellipticals collection page for correct copy
   - Test on mobile and desktop

4. **Verify Homepage Slider:**
   - Confirm only 2 slides are visible (F63 and F85 Halloween banners)
   - Check that old Deal Days slides are completely removed
   - Test slider on both desktop and mobile
   - Verify links go to correct product pages

### Rollback Plan
If issues arise, we can quickly revert by:
1. Merging previous stable branch to master
2. Removing promo template assignments
3. Estimated rollback time: 5-10 minutes

---

## Testing Checklist

Use this checklist to verify deployment success:

### Midnight Miles Promo
- [ ] F63 product page shows "$100 Off" banner
- [ ] F85 product page shows "FREE Delivery" banner
- [ ] E95 product page shows "$200 Off" banner
- [ ] SB900 product page shows "$500 Off" banner
- [ ] Treadmills collection features F63 promo
- [ ] Ellipticals collection features E95 promo
- [ ] Bikes collection features SB900 promo
- [ ] All banners show appropriate end dates ("Ends Oct 26" or "Ends Soon")
- [ ] Promo banners are mobile-responsive

### Homepage Slider
- [ ] Homepage slider shows only 2 slides (F63 and F85 Halloween banners)
- [ ] No old "Deal Days" slides are visible
- [ ] F63 slide links to F63 product page
- [ ] F85 slide links to F85 product page
- [ ] Halloween graphics display correctly on desktop
- [ ] Mobile-specific images load properly on mobile devices
- [ ] Slider transitions work smoothly

### ResellerRatings
- [ ] Star ratings visible on product cards (collections)
- [ ] Review widget loads on product detail pages
- [ ] Review count displays correctly
- [ ] "Write a Review" button functions
- [ ] Merchant reviews widget shows on homepage (if enabled)
- [ ] Mobile display is clean and functional
- [ ] No console errors related to ResellerRatings

### Collection Pages
- [ ] Bikes page shows new headline "Engineered for Smooth, Silent Rides"
- [ ] Bikes page shows SB900 promo banner after intro section
- [ ] Ellipticals page shows new headline "Built for Comfort. Engineered for Endurance."
- [ ] All series have one-line descriptions (not long paragraphs)
- [ ] Comparison charts still display correctly
- [ ] Product cards load properly
- [ ] SOLE+ section displays correctly
- [ ] Mobile layout is clean and readable
- [ ] No broken images or links

---

## Support & Questions

For questions about this deployment, contact:
- **Developer:** Dusty Dean (dusty@bitcadet.com)
- **Branch:** `promo-btcd-scarygood-a-10-13`
- **Documentation:** This file + commit history in GitHub

---

## Technical Notes (For Development Team)

### Files Changed
- `templates/index.json` (modified via Shopify admin - homepage slider updates)
- `templates/product.f63.promo-100off.json` (modified)
- `templates/product.f85.promo-free-shipping.json` (modified)
- `templates/product.e95.promo-200off.json` (newly created)
- `templates/product.sb900.promo-500off.json` (modified - updated to Midnight Miles campaign)
- `templates/collection.treadmills.json` (modified)
- `templates/collection.ellipticals.json` (modified)
- `templates/collection.bikes.json` (modified - added SB900 promo banner)
- `templates/collection.strength.json` (reverted to default)
- `assets/resellerratings-custom.css` (added)
- `snippets/resellerratings-stars.liquid` (added)
- Multiple theme setting updates via Shopify admin

### Commits Included
- 76a77c2: Revert strength collection to default template
- 5732cb0: Update opening copy for bikes and ellipticals collections
- 732e3f7: Clean up bikes and ellipticals collection pages
- 3417cad: Implement SOLE Midnight Miles promo for F63, F85, and E95
- 3b5ed93: Merge ResellerRatings feature into promo branch
- Multiple ResellerRatings UI fixes and enhancements
- 74b6252, ffb4a84, 6dcea5e, e268272: Homepage slider updates (via Shopify admin)
  - Replaced 5 Deal Days slides with 2 Halloween promotional slides
  - Updated slider to feature F63 and F85 with Halloween graphics
- 910d05c: Add SB900 promo banner to bikes collection page
  - Added promotional banner for SOLE Midnight Miles campaign
  - Message: '$500 Off SB900 — Ends Soon — Limited Stock'
  - Positioned after intro section, before product series
- 0049baf: Update SB900 promo badge to Midnight Miles campaign
  - Changed product page promotional banner from "Deal Days" to "Midnight Miles"
  - Aligns with F63, F85, and E95 Midnight Miles promotional messaging

### Branch History
This branch was created from `master` and includes:
1. ResellerRatings integration work (multiple commits)
2. Midnight Miles promotional templates
3. Collection page optimizations from `feature/collection-pages-cleanup`

---

**Document Generated:** October 11, 2025
**Last Updated:** October 12, 2025
**Version:** 1.2 (Added SB900 Midnight Miles promotion)
