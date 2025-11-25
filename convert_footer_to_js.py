#!/usr/bin/env python3
import json

# Read the footer template
with open('footer-template.html', 'r', encoding='utf-8') as f:
    footer_html = f.read()

# Escape the HTML for JavaScript
footer_escaped = json.dumps(footer_html)

# Create the new JavaScript file
js_content = f'''/**
 * Load footer template into all pages
 * Footer content is embedded directly to avoid CORS issues with file:// protocol
 */
(function() {{
  'use strict';
  
  const footerHTML = {footer_escaped};
  
  function loadFooter() {{
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {{
      console.warn('Footer placeholder not found');
      return;
    }}
    
    // Insert the footer HTML
    footerPlaceholder.innerHTML = footerHTML;
    
    // Re-initialize any scripts that were in the footer
    const scripts = footerPlaceholder.querySelectorAll('script');
    scripts.forEach(oldScript => {{
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr => {{
        newScript.setAttribute(attr.name, attr.value);
      }});
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode.replaceChild(newScript, oldScript);
    }});
    
    // Trigger a custom event when footer is loaded
    document.dispatchEvent(new CustomEvent('footerLoaded'));
  }}
  
  // Load footer when DOM is ready
  if (document.readyState === 'loading') {{
    document.addEventListener('DOMContentLoaded', loadFooter);
  }} else {{
    loadFooter();
  }}
}})();
'''

# Write the new JavaScript file
with open('scripts/load-footer.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print('✓ Created scripts/load-footer.js with embedded footer content')
print(f'  Footer size: {len(footer_html)} characters')
print(f'  JavaScript size: {len(js_content)} characters')
