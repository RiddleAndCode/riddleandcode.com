# Riddle&Code Website - New Maintainable Version

A modern, maintainable static website for Riddle&Code built with a custom template system.

## 🚀 Features

- **Maintainable Architecture**: Shared components, templates, and configuration
- **Multilingual Support**: English and German versions with shared template system
- **Responsive Design**: Modern CSS with mobile-first approach
- **SEO Optimized**: Proper meta tags, structured data, and semantic HTML
- **Performance Focused**: Minimal dependencies, optimized assets
- **Easy Content Management**: JSON configuration for pages and content

## 📁 Project Structure

```
new/
├── assets/
│   ├── css/main.css          # Modern CSS with custom properties
│   ├── js/main.js            # JavaScript functionality
│   └── images/               # Website images and assets
├── components/
│   ├── header.html           # Reusable header component
│   └── footer.html           # Reusable footer component
├── templates/
│   └── base.html             # Base template with SEO and structure
├── pages/
│   ├── home-en.html          # English homepage content
│   ├── home-de.html          # German homepage content
│   └── about-us-en.html      # About us page content
├── site-config.json          # Site configuration and page definitions
├── generate.js               # Enhanced site generator
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## 🛠 Setup and Development

### Prerequisites
- Node.js 14+ (for the build process)

### Quick Start

1. **Install dependencies:**
   ```bash
   cd new/
   npm install
   ```

2. **Build the website:**
   ```bash
   npm run build
   ```

3. **Preview locally:**
   ```bash
   npm run dev
   ```
   This will build the site and serve it at `http://localhost:8080`

### Manual Build
```bash
node generate.js ./ ./build ./site-config.json
```

## 📝 Content Management

### Adding New Pages

1. **Create content file** in `pages/` directory:
   ```html
   <!-- pages/new-page-en.html -->
   <section class="section">
       <div class="container">
           <h1>New Page Title</h1>
           <p>Page content here...</p>
       </div>
   </section>
   ```

2. **Add page configuration** to `site-config.json`:
   ```json
   {
     "template": "base.html",
     "output": "new-page.html",
     "lang": "en",
     "current_page": "new-page.html",
     "page_title": "New Page Title",
     "page_description": "Description for SEO",
     "content_file": "pages/new-page-en.html"
   }
   ```

3. **Rebuild the site:**
   ```bash
   npm run build
   ```

### Editing Existing Content

- **Page content**: Edit files in `pages/` directory
- **Header/Footer**: Edit `components/header.html` or `components/footer.html`
- **Site-wide settings**: Edit `site-config.json`
- **Styling**: Edit `assets/css/main.css`

### Multilingual Content

The template system supports conditional content based on language:

```html
{%if lang == 'de'%}
    German content here
{%else%}
    English content here
{%endif%}
```

## 🎨 Styling and Theming

### CSS Custom Properties

The CSS uses custom properties for easy theming:

```css
:root {
  --primary-color: #1a1a1a;
  --secondary-color: #f5f5f5;
  --accent-color: #6366f1;
  --accent-orange: #f59e0b;
  /* ... more variables */
}
```

### Responsive Design

The site uses a mobile-first approach with responsive grid system:

```css
.grid-2 {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
```

### Component Classes

- `.container`: Max-width container with padding
- `.section`: Standard section spacing
- `.grid`, `.grid-2`, `.grid-3`: Responsive grid layouts
- `.card`: Card component with hover effects
- `.btn`, `.btn-primary`, `.btn-secondary`: Button styles

## 🔧 Template System

### Variables
```html
{{page_title}} - Page title
{{page_description}} - Meta description
{{content}} - Main page content
{{lang}} - Current language (en/de)
```

### Conditionals
```html
{%if lang == 'de'%}German text{%else%}English text{%endif%}
{%if condition%}Show if true{%endif%}
```

### Includes
```html
{%include components/header.html%}
{%include components/footer.html%}
```

## 🚀 Deployment

### Build for Production
```bash
npm run clean && npm run build
```

The generated files in `build/` directory can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Traditional web hosting

### Environment-Specific Builds

You can create different configuration files for different environments:

- `site-config.json` - Development
- `site-config.prod.json` - Production

Then build with:
```bash
node generate.js ./ ./build ./site-config.prod.json
```

## 🧪 Advantages Over Previous Version

### ✅ Maintainability
- **Single source of truth**: Components are defined once and reused
- **DRY principle**: No code duplication across pages
- **Easy updates**: Change header/footer in one place, affects all pages

### ✅ Performance
- **Minimal dependencies**: No heavy frameworks or external CDNs
- **Optimized CSS**: Custom properties, efficient selectors
- **Modern JavaScript**: ES6+ features, performance-focused

### ✅ SEO & Accessibility
- **Semantic HTML**: Proper structure and landmarks
- **Meta tags**: Complete SEO optimization
- **Structured data**: JSON-LD for search engines
- **Accessibility**: Focus management, ARIA labels, semantic elements

### ✅ Developer Experience
- **Easy setup**: Simple Node.js build process
- **Clear structure**: Logical file organization
- **Documentation**: Comprehensive README and code comments
- **Flexibility**: Easy to extend and customize

## 📦 Migration from Old Site

1. **Content preserved**: All original content maintained
2. **URLs maintained**: Same URL structure for SEO
3. **Functionality enhanced**: Better mobile experience, faster loading
4. **Assets optimized**: Cleaner CSS, efficient JavaScript

## 🤝 Contributing

1. **Content updates**: Edit files in `pages/` directory
2. **Styling changes**: Modify `assets/css/main.css`
3. **New features**: Extend `generate.js` template system
4. **Testing**: Use `npm run dev` to preview changes

## 📞 Support

For questions about this implementation:
- Check the code comments in `generate.js`
- Review the template examples in `templates/`
- Examine the CSS architecture in `assets/css/main.css`

---

**Built with ❤️ for easier maintenance and better performance**