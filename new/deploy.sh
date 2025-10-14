#!/bin/bash

# Riddle&Code Website - Deployment Script
# This script builds and prepares the website for deployment

set -e  # Exit on any error

echo "🚀 Starting Riddle&Code Website Build Process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 14+ to continue.${NC}"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo -e "${RED}❌ Node.js version 14+ is required. Current version: $(node --version)${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js $(node --version) detected${NC}"

# Clean previous build
echo -e "${BLUE}🧹 Cleaning previous build...${NC}"
if [ -d "build" ]; then
    rm -rf build
    echo -e "${GREEN}✓ Previous build cleaned${NC}"
fi

# Run the site generator
echo -e "${BLUE}🔨 Generating static site...${NC}"
node generate.js ./ ./build ./site-config.json

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Site generation completed successfully${NC}"
else
    echo -e "${RED}❌ Site generation failed${NC}"
    exit 1
fi

# Verify build output
if [ ! -d "build" ]; then
    echo -e "${RED}❌ Build directory not found${NC}"
    exit 1
fi

# Count generated files
HTML_FILES=$(find build -name "*.html" | wc -l)
CSS_FILES=$(find build -name "*.css" | wc -l)
JS_FILES=$(find build -name "*.js" | wc -l)

echo -e "${GREEN}✓ Build verification:${NC}"
echo -e "  📄 HTML files: $HTML_FILES"
echo -e "  🎨 CSS files: $CSS_FILES"
echo -e "  ⚡ JS files: $JS_FILES"

# Check for required files
REQUIRED_FILES=("build/index.html" "build/de.html" "build/assets/css/main.css" "build/assets/js/main.js")
for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ $file${NC}"
    else
        echo -e "${RED}❌ Missing: $file${NC}"
    fi
done

# Optional: Validate HTML structure
echo -e "${BLUE}📋 Basic HTML validation...${NC}"
for html_file in build/*.html build/*/*.html build/*/*/*.html; do
    if [ -f "$html_file" ]; then
        # Check for basic HTML structure
        if grep -q "<!DOCTYPE html>" "$html_file" && grep -q "<html" "$html_file" && grep -q "</html>" "$html_file"; then
            echo -e "${GREEN}✓ $(basename "$html_file") has valid HTML structure${NC}"
        else
            echo -e "${YELLOW}⚠ $(basename "$html_file") may have HTML structure issues${NC}"
        fi
    fi
done

# Display deployment instructions
echo -e "\n${BLUE}📦 Deployment Ready!${NC}"
echo -e "The website has been built successfully in the ${GREEN}build/${NC} directory."
echo -e "\n${YELLOW}Deployment Options:${NC}"
echo -e "1. ${BLUE}Static Hosting:${NC} Upload the entire 'build' directory to your web server"
echo -e "2. ${BLUE}Netlify:${NC} Drag and drop the 'build' folder to Netlify"
echo -e "3. ${BLUE}Vercel:${NC} Deploy the 'build' directory via Vercel CLI"
echo -e "4. ${BLUE}GitHub Pages:${NC} Push the 'build' contents to your gh-pages branch"
echo -e "5. ${BLUE}AWS S3:${NC} Sync the 'build' directory to your S3 bucket"

echo -e "\n${YELLOW}Local Testing:${NC}"
echo -e "To test locally, run: ${GREEN}npx http-server build -p 8080${NC}"
echo -e "Then visit: ${BLUE}http://localhost:8080${NC}"

echo -e "\n${GREEN}🎉 Build process completed successfully!${NC}"

# Optional: Open in default browser (uncomment if desired)
# if command -v open &> /dev/null; then
#     echo -e "${BLUE}🌐 Opening in browser...${NC}"
#     npx http-server build -p 8080 -o &
# fi