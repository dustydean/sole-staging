# Deployment Guide

## Pre-Deployment Checklist

### 1. Content Verification ✅
- [x] Shipping disclaimers corrected (curbside delivery no longer free)
- [x] Fitness classes text updated to "FREE online fitness classes"
- [x] Collection titles properly set
- [x] All product templates consistent

### 2. File Changes Made
The following files were modified to fix shipping disclaimer issues:

```
templates/product.srvo.json                    - Removed incorrect curbside delivery text
templates/product.treadmills_template.json     - Removed incorrect curbside delivery text  
templates/product.treadmills_wo_vid_templat.json - Removed incorrect curbside delivery text
templates/product.treadmills_wo_specs.json     - Removed incorrect curbside delivery text
templates/product.closeout_template.json       - Removed incorrect curbside delivery text
templates/product.treadmills_wo_vid_specs.json - Removed incorrect curbside delivery text
```

### 3. Deployment Methods

#### Method A: Shopify Admin (Fastest)
1. Create ZIP file of entire theme directory
2. Shopify Admin → Online Store → Themes
3. "Add theme" → "Upload ZIP file"
4. Upload and test in preview mode
5. Publish when ready

#### Method B: Shopify CLI
```bash
shopify theme push --store soletreadmills.myshopify.com
```

#### Method C: Direct File Upload
Upload individual files through the theme editor if only specific changes are needed.

## Post-Deployment Testing

### Critical Tests
1. **Product Pages**: Verify shipping information is correct
2. **Collection Pages**: Check titles and content
3. **Homepage**: Confirm slideshow works
4. **Mobile**: Test responsive design
5. **Checkout**: Verify cart and payment flow

### Content Spots to Check
- Any mention of "Curbside Delivery is always FREE" should be gone
- "FREE online fitness classes" text should appear correctly
- Shipping upgrade options should show proper pricing

## Rollback Plan

If issues arise:
1. Revert to previous live theme immediately
2. Address issues in this repository
3. Re-deploy after fixes

## Contact Information

- Repository Owner: dustydean
- Theme Ready: August 23, 2025
- Deployment Target: Monday deployment