#!/usr/bin/env python3
import re
import os
import glob
from pathlib import Path

# Read the list of image URLs
with open('/tmp/image_urls.txt', 'r') as f:
    image_urls = [line.strip() for line in f if line.strip()]

# Create a mapping of URL to local filename
url_to_filename = {}
for url in image_urls:
    # Extract filename and decode URL encoding
    filename = url.split('/')[-1]
    filename = filename.replace('%26', '&')
    filename = filename.replace('%20', ' ')
    filename = filename.replace('%25', '%')
    filename = filename.replace('%C3%97', '×')
    filename = filename.replace('%2C', ',')
    url_to_filename[url] = filename

# Process all HTML files
html_files = []
base_dir = '/home/jeckel/develop/rnc/riddleandcode.com'

# Find all HTML files (excluding slides directory initially since we already did AssetDevelopment.html)
for pattern in ['*.html', '*/*.html', '*/*/*.html', '*/*/*/*.html']:
    html_files.extend(glob.glob(os.path.join(base_dir, pattern)))

print(f"Found {len(html_files)} HTML files to process")

processed_count = 0
for html_file in html_files:
    # Skip if not in main directory or subdirectories (not slides)
    with open(html_file, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # Replace each URL with local path
    for url, filename in url_to_filename.items():
        # Determine the relative path from the HTML file to images directory
        html_path = Path(html_file)
        html_dir = html_path.parent
        
        # Calculate relative path to images in project root
        depth = len(html_path.relative_to(base_dir).parts) - 1
        if depth == 0:
            # Files in root directory
            rel_path = f"images/{filename}"
        else:
            # Files in subdirectories
            rel_path = '../' * depth + f"images/{filename}"
        
        # Replace the URL
        if url in content:
            content = content.replace(url, rel_path)
            changes += 1
    
    # Write back if changed
    if content != original_content:
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        processed_count += 1
        print(f"✓ Updated {html_file} ({changes} images)")

print(f"\nProcessed {processed_count} files with image references")
