
# Amigo Widget Integration Guide

This guide explains how to integrate the Amigo support widget into any website.

## Quick Start

### Method 1: Auto-initialization
Add these two lines to your HTML `<head>` section:

```html
<link rel="stylesheet" href="https://yoursite.com/amigo-widget.css">
<script src="https://yoursite.com/amigo-widget.umd.js" data-amigo-widget="auto"></script>
```

### Method 2: Manual initialization
For more control over when the widget initializes:

```html
<link rel="stylesheet" href="https://yoursite.com/amigo-widget.css">
<script src="https://yoursite.com/amigo-widget.umd.js"></script>
<script>
  // Initialize when ready
  AmigoWidget.init();
</script>
```

## Configuration Options

```javascript
AmigoWidget.init({
  containerId: 'custom-widget-container', // Default: 'amigo-widget-container'
  theme: 'light',                         // Default: 'light' (future: 'dark')
  position: 'bottom-right'                // Default: 'bottom-right' (future options)
});
```

## API Methods

### `AmigoWidget.init(config?)`
Initializes the widget with optional configuration.

### `AmigoWidget.destroy()`
Removes the widget from the page completely.

## Widget Features

The embedded widget includes all the same functionality as the full application:

- **All Chat States**: Horizontal, Modal, Sidebar, and Minimized views
- **Complete Conversation Flows**: Smart Shopper, Value Shopper, Vista, Max CR, Contact Agent
- **Serial Number Lookup**: Full integration with NetSuite API
- **Real-time Support**: Live troubleshooting and parts ordering assistance

## Styling

The widget uses scoped CSS to prevent conflicts with your site's styles. All widget styles are prefixed and contained within the widget container.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11+ (with polyfills)
- Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

After building, you'll have these files in the `dist-widget/` directory:

```
dist-widget/
├── amigo-widget.umd.js     # Main widget script (UMD format)
├── amigo-widget.es.js      # ES module version
└── amigo-widget.css        # Widget styles
```

## Building the Widget

To build the embeddable widget:

```bash
npm run build:widget
```

To build both the main app and widget:

```bash
npm run build:all
```

## Testing

Use the included `widget-integration-example.html` file to test the widget integration locally.

## Deployment

1. Build the widget files using `npm run build:widget`
2. Upload the `dist-widget/` files to your CDN or web server
3. Update the URLs in your integration code
4. Test the integration on your website

## Troubleshooting

### Widget not appearing
- Check browser console for errors
- Verify CSS and JS files are loading correctly
- Ensure the container element exists

### Style conflicts
- The widget uses scoped styles, but if conflicts occur, increase CSS specificity
- Check z-index values (widget uses 999999)

### API issues
- Verify CORS settings if hosting on different domain
- Check network tab for failed API requests

For support, contact our development team or refer to the main application documentation.
