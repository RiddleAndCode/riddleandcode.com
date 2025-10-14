# Modular Header/Footer System

This project now uses a modular component system for the header and footer to improve maintainability and reusability.

## 📁 Structure

```
riddleandcode.com/
├── includes/
│   ├── header.html       # Reusable header component
│   └── footer.html       # Reusable footer component
├── company/
│   └── career.html       # Updated to use modular components
├── start-server.sh       # HTTP server setup script
└── README-modular.md     # This file
```

## 🚀 How It Works

### Header Component (`includes/header.html`)
- Contains navigation menu and page header
- Uses template variables for dynamic content:
  - `{{PAGE_TITLE}}` - Page-specific title
  - `{{HEADER_IMAGE}}` - Page-specific header image
  - `{{HEADER_IMAGE_SRCSET}}` - Responsive image srcset

### Footer Component (`includes/footer.html`)
- Contains site footer with links and social media
- Static content that's the same across all pages

### JavaScript Loading
- Uses `fetch()` API to load components dynamically
- Replaces template variables with page-specific content
- Handles errors gracefully with fallback messages

## 🔧 Testing Locally

**Important:** The modular system requires an HTTP server due to browser CORS restrictions.

### Quick Start
```bash
# Make sure you're in the project root directory
cd /path/to/riddleandcode.com

# Run the setup script
./start-server.sh

# Or manually start a server:
python3 -m http.server 8000
# OR
npx serve . -p 8000
# OR  
php -S localhost:8000
```

Then open: `http://localhost:8000/company/career.html`

### Why HTTP Server Required?
- Browsers block `fetch()` requests to local files (`file://` protocol)
- This is a security restriction called CORS (Cross-Origin Resource Sharing)
- An HTTP server serves files via `http://` protocol, which allows fetch requests

## 📝 Adding Modular Components to Other Pages

To convert another page (e.g., `about-us.html`) to use modular components:

1. **Add header include:**
```html
<!-- INCLUDE: header.html -->
<div id="header-include"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    if (location.protocol === 'file:') {
        document.getElementById('header-include').innerHTML = '<div>Header requires HTTP server</div>';
        return;
    }
    
    fetch('../includes/header.html')
        .then(response => response.text())
        .then(data => {
            // Replace template variables
            data = data.replace('{{PAGE_TITLE}}', 'About Us'); // Change this
            data = data.replace('{{HEADER_IMAGE}}', 'your-header-image-url');
            data = data.replace('{{HEADER_IMAGE_SRCSET}}', 'your-responsive-srcset');
            document.getElementById('header-include').innerHTML = data;
        })
        .catch(error => console.error('Error loading header:', error));
});
</script>
```

2. **Add footer include:**
```html
<!-- INCLUDE: footer.html -->
<div id="footer-include"></div>
<script>
document.addEventListener('DOMContentLoaded', function() {
    if (location.protocol === 'file:') {
        document.getElementById('footer-include').innerHTML = '<div>Footer requires HTTP server</div>';
        return;
    }
    
    fetch('../includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-include').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
</script>
```

3. **Remove old header/footer HTML** from the page

## 🎯 Benefits

- **Maintainability**: Update navigation or footer once, applies everywhere
- **Consistency**: Ensures all pages use the same header/footer
- **Template System**: Dynamic content injection for page-specific elements
- **Clean Separation**: Content separated from layout components
- **Easy Updates**: Add new menu items or footer links in one place

## 🔍 Troubleshooting

### Components Not Loading?
1. **Check browser console** for error messages
2. **Verify HTTP server** is running (not opening file:// directly)
3. **Check file paths** - includes folder should be at project root
4. **Network issues** - ensure files are accessible via HTTP

### Template Variables Not Replaced?
1. **Check JavaScript console** for errors
2. **Verify template variable names** match exactly (case-sensitive)
3. **Ensure script runs** after DOM is loaded

### Server Not Starting?
1. **Install required tools**: Python 3, Node.js, or PHP
2. **Check port availability**: Try different port if 8000 is in use
3. **File permissions**: Ensure script is executable (`chmod +x start-server.sh`)

## 📈 Future Enhancements

- Convert more pages to use modular system
- Add more template variables for customization
- Consider build system for production deployment
- Add CSS/JS minification for modular components
- Implement server-side includes for production