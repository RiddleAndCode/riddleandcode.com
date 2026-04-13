#!/usr/bin/env python3
"""
Script to extract and download all image/media URLs from CSV files.
Downloads are organized into subfolders based on CSV filenames.
"""

import csv
import os
import re
import sys
from pathlib import Path
from urllib.parse import urlparse, unquote
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


def create_session():
    """Create a requests session with retry logic."""
    session = requests.Session()
    retry = Retry(
        total=3,
        backoff_factor=0.5,
        status_forcelist=[500, 502, 503, 504]
    )
    adapter = HTTPAdapter(max_retries=retry)
    session.mount('http://', adapter)
    session.mount('https://', adapter)
    return session


def extract_folder_name(csv_filename):
    """Extract folder name from CSV filename."""
    # Remove 'Riddle & Code  - ' prefix and '.csv' suffix
    name = csv_filename.replace('Riddle & Code  - ', '').replace('.csv', '')
    
    # Map to folder names
    folder_mapping = {
        'MYPWR Animation PopUps': 'animations',
        'News': 'news',
        'Partners': 'partners',
        'Presses': 'presses',
        'Showcases': 'showcases',
        'Team Members': 'teammembers',
        'Wallets': 'wallets'
    }
    
    return folder_mapping.get(name, name.lower().replace(' ', '_'))


def is_url(text):
    """Check if text is a valid URL."""
    if not text or not isinstance(text, str):
        return False
    
    # Check if it starts with http:// or https://
    if text.startswith(('http://', 'https://')):
        return True
    
    return False


def extract_urls_from_csv(csv_path):
    """Extract all URLs from a CSV file."""
    urls = []
    
    try:
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            
            for row in reader:
                # Check all fields in the row for URLs
                for field_name, value in row.items():
                    if is_url(value):
                        urls.append(value)
                    # Also check if the field contains multiple URLs (comma or space separated)
                    elif value and isinstance(value, str):
                        # Find all URLs in the text
                        found_urls = re.findall(r'https?://[^\s,]+', value)
                        urls.extend(found_urls)
        
    except Exception as e:
        print(f"Error reading {csv_path}: {e}")
    
    return urls


def get_filename_from_url(url):
    """Extract filename from URL."""
    # Parse the URL
    parsed = urlparse(url)
    path = unquote(parsed.path)
    
    # Get the filename from the path
    filename = os.path.basename(path)
    
    # If no filename found, create one from the URL
    if not filename or '.' not in filename:
        filename = f"image_{hash(url) % 100000}.jpg"
    
    return filename


def download_image(session, url, output_path):
    """Download an image from URL to output_path."""
    try:
        response = session.get(url, timeout=30, stream=True)
        response.raise_for_status()
        
        # Write to file
        with open(output_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
        
        return True
    
    except Exception as e:
        print(f"  ✗ Failed to download {url}: {e}")
        return False


def main():
    # Get the script directory
    script_dir = Path(__file__).parent
    csv_dir = script_dir
    
    # Get all CSV files
    csv_files = list(csv_dir.glob('Riddle & Code  - *.csv'))
    
    if not csv_files:
        print("No CSV files found!")
        return
    
    print(f"Found {len(csv_files)} CSV files")
    print("-" * 60)
    
    # Create session
    session = create_session()
    
    # Process each CSV file
    total_downloaded = 0
    total_failed = 0
    
    for csv_file in csv_files:
        print(f"\nProcessing: {csv_file.name}")
        
        # Extract folder name
        folder_name = extract_folder_name(csv_file.name)
        output_dir = csv_dir / folder_name
        
        # Create output directory
        output_dir.mkdir(exist_ok=True)
        print(f"Output directory: {output_dir}")
        
        # Extract URLs from CSV
        urls = extract_urls_from_csv(csv_file)
        unique_urls = list(set(urls))  # Remove duplicates
        
        print(f"Found {len(unique_urls)} unique URLs")
        
        if not unique_urls:
            print("  No URLs found in this file")
            continue
        
        # Download each image
        downloaded = 0
        failed = 0
        
        for i, url in enumerate(unique_urls, 1):
            filename = get_filename_from_url(url)
            output_path = output_dir / filename
            
            # Skip if file already exists
            if output_path.exists():
                print(f"  [{i}/{len(unique_urls)}] ⊙ Skipping (exists): {filename}")
                downloaded += 1
                continue
            
            print(f"  [{i}/{len(unique_urls)}] ↓ Downloading: {filename}")
            
            if download_image(session, url, output_path):
                print(f"  [{i}/{len(unique_urls)}] ✓ Downloaded: {filename}")
                downloaded += 1
            else:
                failed += 1
        
        print(f"\n  Summary: {downloaded} downloaded, {failed} failed")
        total_downloaded += downloaded
        total_failed += failed
    
    print("\n" + "=" * 60)
    print(f"TOTAL: {total_downloaded} images downloaded, {total_failed} failed")
    print("=" * 60)


if __name__ == "__main__":
    main()
