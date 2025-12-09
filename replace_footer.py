#!/usr/bin/env python3
from pathlib import Path
import re

base_dir = Path('/home/jeckel/develop/rnc/riddleandcode.com')

# Read the footer template to know what we're looking for
with open(base_dir / 'footer-template.html', 'r', encoding='utf-8') as f:
    footer_content = f.read()

# Extract the starting line of the footer (the div with class="footer bright")
footer_start_pattern = r'<div class="footer bright" data-w-id="[^"]*">'

# Find all HTML files
html_files = list(base_dir.glob('*.html')) + list(base_dir.glob('*/*.html')) + list(base_dir.glob('*/*/*.html'))

# Exclude the footer template itself
html_files = [f for f in html_files if f.name != 'footer-template.html']

files_updated = 0

for html_path in html_files:
    try:
        with open(html_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Find the footer section
        match = re.search(footer_start_pattern, content)
        if not match:
            print(f'⚠ No footer found in {html_path.relative_to(base_dir)}')
            continue
        
        # Find everything from the footer start to </html>
        footer_start_pos = match.start()
        
        # Split content at footer start
        before_footer = content[:footer_start_pos]
        
        # Calculate relative path to scripts based on file depth
        depth = len(html_path.relative_to(base_dir).parts) - 1
        script_path = '../' * depth + 'scripts/load-footer.js' if depth > 0 else 'scripts/load-footer.js'
        
        # Create new content with placeholder
        new_content = before_footer + f'''<!-- Footer loaded dynamically -->
<div id="footer-placeholder"></div>
<script src="{script_path}"></script>
</body>
</html>'''
        
        # Write the updated content
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        files_updated += 1
        print(f'✓ Updated {html_path.relative_to(base_dir)}')
        
    except Exception as e:
        print(f'✗ Error processing {html_path.relative_to(base_dir)}: {e}')

print(f'\nUpdated {files_updated} HTML files with footer placeholder')
