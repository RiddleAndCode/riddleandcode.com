# Footer Implementation

## Overview
The footer section (starting from line 620) has been extracted into a reusable component that's loaded dynamically via JavaScript.

## Files Created

### 1. `footer-template.html`
Contains the complete footer HTML including:
- Footer navigation menu
- Social media links
- Legal links
- Cookie consent banner
- All footer scripts (jQuery, Webflow, Swiper, Google Tag Manager)

### 2. `scripts/load-footer.js`
JavaScript module that:
- Automatically calculates the correct relative path based on page depth
- Fetches the footer template
- Injects it into the `#footer-placeholder` div
- Re-initializes any scripts within the footer
- Triggers a `footerLoaded` event when complete

## Implementation

All HTML files (52 total) have been updated to replace the footer section with:

```html
<--read-inspelnings Footer loaded dynamically -->
<div id="footer-placeholder"></div>
<script src="scripts/load-footer.js"></script>
</body>
</html>
```

The script automatically handles relative paths:
- Root level files: `scripts/load-footer.js`
- One level deep: `../scripts/load-footer.js`  
- Two levels deep: `../../scripts/load-footer.js`

## Benefits

1. **Single source of truth**: Footer content is maintained in one file
2. **Easy updates**: Changes to footer affect all pages automatically
3. **Reduced file size**: Each HTML file is ~245 lines smaller
4. **Maintainability**: No need to update 52 files when changing footer
5. **Consistency**: Ensures footer is identical across all pages

## Files Updated

- 52 HTML files across root, /de, /company, /product, /news, /showcase, /energy-community directories
- 3 presentation files in /slides were skipped (they don't have the standard footer)

## Testing

To test if the footer loads correctly:
1. Open any page in a browser
2. Check browser console for any errors
3. Verify footer content appears at the bottom
4. Test footer links and functionality
5. Verify cookie consent banner works

## Rollback

If needed, you can rollback by:
1. Delete `footer-template.html` and `scripts/load-footer.js`
2. Use git to restore the original HTML files
