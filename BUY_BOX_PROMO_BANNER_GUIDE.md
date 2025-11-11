# Buy Box Promo Banner System - Implementation Guide

## Overview
The Buy Box Promo Banner system allows you to display custom promotional banners on product pages using Shopify product metafields. This system is designed to be:

- **Clean**: No hardcoded promotional text in templates
- **Flexible**: Use for any promotion (Labor Day, Black Friday, etc.)
- **Scalable**: Easy to enable/disable on multiple products
- **Professional**: Banner only shows when explicitly configured

## How It Works

The banner is controlled entirely through **product metafields**. When a product has the required metafields configured, the banner automatically appears in the buy box area of the product page.

### Banner Appearance
- Displays between price and description sections
- Responsive design for mobile and desktop
- On-brand Sole Red (#B21E2D) background by default
- White (#FFFFFF) text for high contrast
- Optional icon support (timer, truck, gift, etc.)
- Two-line text structure: title and subtitle

## Required Product Metafields

For each product where you want to show the banner, configure these metafields:

| Metafield Key | Type | Required | Description | Example Value |
|---------------|------|----------|-------------|---------------|
| `custom.buy_box_promo_enabled` | Boolean | ✅ Yes | Controls banner visibility | `true` |
| `custom.buy_box_promo_title` | Single line text | ✅ Yes | Main banner message | `"Labor Day Special: FREE SHIPPING on F85 — $99 Value"` |
| `custom.buy_box_promo_subtitle` | Single line text | ❌ No | Secondary message | `"Ends Aug 31, 11:59 PM MT"` |
| `custom.buy_box_promo_background` | Color | ❌ No | Background color | `#B21E2D` (default: Sole Red) |
| `custom.buy_box_promo_text_color` | Color | ❌ No | Text color | `#FFFFFF` (default: White) |

## Implementation Methods

### Method 1: Shopify Admin UI (Individual Products)

1. **Go to**: Products → [Select Product] → Metafields section (bottom of page)
2. **Add metafields** for each field listed above
3. **Set values**:
   - ✅ Check "buy_box_promo_enabled"
   - 📝 Enter "buy_box_promo_title" text
   - 📝 Enter "buy_box_promo_subtitle" text (optional)
   - 🎨 Select colors (optional - will use defaults)

### Method 2: Bulk CSV Import (Multiple Products)

1. **Export** products with metafields enabled
2. **Add columns** for metafield data:
   - `Metafield: custom.buy_box_promo_enabled [boolean]`
   - `Metafield: custom.buy_box_promo_title [single_line_text_field]`
   - `Metafield: custom.buy_box_promo_subtitle [single_line_text_field]`
   - `Metafield: custom.buy_box_promo_background [color]`
   - `Metafield: custom.buy_box_promo_text_color [color]`
3. **Fill in values** for desired products
4. **Import CSV** back to Shopify

### Method 3: Shopify Admin API (Programmatic)

Use Shopify's Admin API to bulk-enable banners:

```javascript
// Example API call to enable banner for a product
const productId = 'gid://shopify/Product/1234567890';

const metafields = [
  {
    namespace: 'custom',
    key: 'buy_box_promo_enabled',
    value: 'true',
    type: 'boolean'
  },
  {
    namespace: 'custom',
    key: 'buy_box_promo_title',
    value: 'Labor Day Special: FREE SHIPPING on F85 — $99 Value',
    type: 'single_line_text_field'
  },
  {
    namespace: 'custom',
    key: 'buy_box_promo_subtitle',
    value: 'Ends Aug 31, 11:59 PM MT',
    type: 'single_line_text_field'
  }
];

// Create metafields for product
await shopify.rest.Metafield.save({
  session,
  owner_id: productId.split('/').pop(),
  owner_resource: 'product',
  ...metafield
});
```

### Method 4: Shopify CLI Script

Create a script to bulk-enable banners:

```javascript
// scripts/enable-labor-day-banner.js
const productHandles = ['f85-treadmill', 'f80-treadmill']; // Add product handles

productHandles.forEach(async (handle) => {
  const product = await getProductByHandle(handle);
  await enablePromoiBanner(product.id, {
    title: 'Labor Day Special: FREE SHIPPING — $99 Value',
    subtitle: 'Ends Aug 31, 11:59 PM MT'
  });
});
```

## Theme Configuration

### Adding the Banner Block

1. **Go to**: Theme Editor → Product Page Template
2. **Click**: "Add block"
3. **Select**: "Buy Box Promo Banner"
4. **Position**: Between price and description (recommended)
5. **Configure**: Icon and alignment settings

### Block Settings Available

- **Text Alignment**: Left or Center
- **Icon**: Timer, Truck, Gift, Percent, Star, or None
- **Icon Width**: 16-32px

## Example Usage Scenarios

### Labor Day Promotion
```
✅ Enabled: true
📝 Title: "Labor Day Special: FREE SHIPPING on F85 — $99 Value"
📝 Subtitle: "Ends Aug 31, 11:59 PM MT"
🎨 Background: #B21E2D (Sole Red)
🎨 Text Color: #FFFFFF (White)
🔧 Icon: Timer
```

### Black Friday Sale
```
✅ Enabled: true
📝 Title: "Black Friday: 50% OFF + FREE SHIPPING"
📝 Subtitle: "Limited Time - Ends Nov 29, 2024"
🎨 Background: #000000 (Black)
🎨 Text Color: #FFFFFF (White)
🔧 Icon: Percent
```

### Free Shipping Threshold
```
✅ Enabled: true
📝 Title: "FREE SHIPPING on Orders Over $500"
📝 Subtitle: "Automatically applied at checkout"
🎨 Background: #00A341 (Green)
🎨 Text Color: #FFFFFF (White)
🔧 Icon: Truck
```

## Promotional Lifecycle Management

### During Promotion
1. **Enable banners** on target products using any method above
2. **Monitor performance** through Shopify analytics
3. **Adjust messaging** by updating metafield values

### After Promotion Ends
1. **Option A**: Set `buy_box_promo_enabled` to `false` (preserves settings)
2. **Option B**: Delete metafields entirely (clean slate)
3. **Option C**: Update with new promotion messaging

### For Future Promotions
1. **Update existing metafields** with new promotion text
2. **Re-enable** by setting `buy_box_promo_enabled` to `true`
3. **No code changes required** - just update content

## Troubleshooting

### Banner Not Appearing
1. ✅ Verify `buy_box_promo_enabled` is set to `true`
2. ✅ Verify `buy_box_promo_title` has content
3. ✅ Check that "Buy Box Promo Banner" block is added to product template
4. ✅ Clear browser cache

### Wrong Colors/Styling
1. ✅ Check metafield values for background/text colors
2. ✅ Verify color values are valid hex codes (e.g., #B21E2D)
3. ✅ Test with default colors by removing color metafields

### Metafields Not Saving
1. ✅ Verify metafield namespace is `custom`
2. ✅ Check metafield types match documentation
3. ✅ Ensure proper API permissions for programmatic updates

## Best Practices

### Content Guidelines
- **Keep titles concise** (under 50 characters)
- **Use action words** (FREE, SAVE, LIMITED TIME)
- **Include value proposition** ($99 Value, 50% OFF)
- **Specify deadline** (Ends Aug 31, 11:59 PM MT)

### Design Guidelines
- **High contrast colors** for readability
- **Brand consistency** (use Sole Red #B21E2D when appropriate)
- **Appropriate icons** (timer for deadlines, truck for shipping)

### Management Guidelines
- **Test on development theme** before deploying to live
- **Document active promotions** and their expiration dates
- **Set reminders** to disable expired promotions
- **Archive old metafield values** for historical reference

## Technical Details

### Template Files Modified
- `/snippets/product-info.liquid` - Added buy_box_promo block handler
- `/sections/main-product.liquid` - Added schema definition for new block type

### CSS Classes Added
- `.product-info__buy-box-promo` - Main container
- `.buy-box-promo__content` - Content wrapper
- `.buy-box-promo__icon` - Icon container
- `.buy-box-promo__text` - Text wrapper
- `.buy-box-promo__title` - Main title text
- `.buy-box-promo__subtitle` - Subtitle text

### Liquid Variables
- `product.metafields.custom.buy_box_promo_enabled` - Boolean visibility control
- `product.metafields.custom.buy_box_promo_title` - Main message text
- `product.metafields.custom.buy_box_promo_subtitle` - Secondary text
- `product.metafields.custom.buy_box_promo_background` - Background color
- `product.metafields.custom.buy_box_promo_text_color` - Text color

## Support

For technical implementation questions or issues with the Buy Box Promo Banner system:

1. **Check troubleshooting section** above
2. **Test with simple values** first (just enabled + title)
3. **Verify metafield configuration** in Shopify admin
4. **Review browser developer tools** for any console errors

---

**Version**: 1.0  
**Last Updated**: August 2025  
**Compatible With**: Shopify Impact Theme v6.9.1+