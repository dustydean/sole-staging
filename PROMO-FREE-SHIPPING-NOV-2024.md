# SOLE Free Shipping Week Promo - November 2024

**Branch:** `promo-btcd-free-shipping-11-2`
**Promo Dates:** Through November 9, 2024 at 11:59 PM MT
**Created:** November 2, 2024

## Overview
This promo branch implements site-wide messaging for SOLE Free Shipping Week across collection pages and provides a reusable product template for treadmill promotions.

## Changes Made

### 1. Collection Page Promo Banners (3 files)

Updated promo messaging on the following collection pages:

- **`templates/collection.treadmills.json`** (Section: `f85-promo-banner`)
- **`templates/collection.ellipticals.json`** (Section: `e95-promo-banner`)
- **`templates/collection.bikes.json`** (Section: `sb900-promo-banner`)

**Changes:**
- Updated heading text to: `SOLE Free Shipping Week — Ends Nov 9 at 11:59 PM MT`
- Removed product-specific CTA links
- Maintained gray background styling (#e8e8e8)

**Visual:** Simple centered text banner with light gray background

### 2. Product Template Updates

**New Templates Created:**
- `templates/product.treadmills_template_free_shipping.json` - **With reviews + promo banner**
- `templates/product.treadmills_template_NoReviews_Free_Shipping.json` - **NEW: No reviews + promo banner**

**Features:**
- Red promo banner (#b21e2d background) with white text
- Timer icon (`picto-timer`) for urgency
- Message: `SOLE Free Shipping Week — Ends Nov 9 at 11:59 PM MT`
- Positioned after product title/ratings, before badges
- Must be manually assigned to products in Shopify Admin

**Template Variants Available:**
1. `product.treadmills_template.json` - Standard (no promo, with reviews)
2. `product.treadmills_template_free_shipping.json` - With reviews + promo banner
3. `product.treadmills_template_NoReviews_Free_Shipping.json` - No reviews + promo banner

## How to Use

### To Activate This Promo:

1. **Activate the branch in Shopify Admin:**
   - Go to Online Store > Themes
   - Find "Promo - BTCD - Free-Shipping - 11-2"
   - Click "Publish" to make it live

2. **Assign product templates to treadmills (optional):**
   - In Shopify Admin, go to Products
   - Select the treadmill product(s) you want to promote
   - Click "Theme templates" section
   - Choose the appropriate template:
     - `product.treadmills_template_free_shipping` - For products WITH reviews
     - `product.treadmills_template_NoReviews_Free_Shipping` - For products WITHOUT reviews
   - Save

### After Promo Ends:

1. **Switch back to previous live theme** (likely master or previous promo branch)
2. **Remove template assignments:**
   - Go to each product using `product.treadmills_template_free_shipping.json`
   - Change back to `product.treadmills_template.json` or default template

## Files Modified

```
templates/collection.bikes.json
templates/collection.ellipticals.json
templates/collection.treadmills.json
templates/product.treadmills_template_free_shipping.json (new)
templates/product.treadmills_template_NoReviews_Free_Shipping.json (new)
```

## Git Commit

```
commit a9c9bd5
Add SOLE Free Shipping Week promo (Nov 9 deadline)
```

## Notes

- Collection page banners are live as soon as the branch is published
- Product template must be manually assigned to products (not automatic)
- Template can be reused for future free shipping promos by updating the date
- Based on previous promo template pattern from `product.f85.promo-free-shipping.json`
