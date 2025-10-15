#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function prettifyHTML(html) {
    // More robust HTML prettifier
    let formatted = html;
    
    // Normalize whitespace but preserve content
    formatted = formatted.replace(/>\s*</g, '><');
    
    // Add newlines before opening tags and after closing tags
    formatted = formatted.replace(/(<[^\/][^>]*>)/g, '\n$1');
    formatted = formatted.replace(/(<\/[^>]*>)/g, '$1\n');
    
    // Special handling for self-closing tags
    formatted = formatted.replace(/(<[^>]*\/>)/g, '\n$1\n');
    
    // Clean up multiple newlines
    formatted = formatted.replace(/\n\s*\n/g, '\n');
    
    let result = '';
    let indent = 0;
    const lines = formatted.split('\n');
    
    for (let line of lines) {
        line = line.trim();
        if (!line) continue;
        
        // Check if this is a closing tag
        const isClosingTag = line.match(/^<\/[^>]+>/);
        const isSelfClosing = line.match(/^<[^>]*\/>$/) || 
                             line.match(/^<(meta|link|img|input|br|hr|area|base|col|embed|source|track|wbr|!DOCTYPE)[^>]*>?$/i);
        const isOpeningTag = line.match(/^<[^\/!][^>]*>/) && !isSelfClosing;
        const isComment = line.match(/^<!--/);
        const isScript = line.match(/^<script[^>]*>/i);
        const isStyle = line.match(/^<style[^>]*>/i);
        
        // Decrease indent for closing tags
        if (isClosingTag) {
            indent = Math.max(0, indent - 2);
        }
        
        // Add indentation
        result += ' '.repeat(indent) + line + '\n';
        
        // Increase indent for opening tags
        if (isOpeningTag && !isComment && !isScript && !isStyle) {
            // Don't increase indent for inline tags
            if (!line.match(/^<(a|span|strong|em|i|b|small|code|abbr|acronym|cite|dfn|kbd|samp|var|bdo|br|img|input|label|select|textarea|button|noscript)[^>]*>/i)) {
                indent += 2;
            }
        }
        
        // Special handling for script and style content
        if (isScript || isStyle) {
            indent += 2;
        }
        if (line.match(/^<\/(script|style)>/i)) {
            indent = Math.max(0, indent - 2);
        }
    }
    
    return result.trim();
}

function prettifyFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const prettified = prettifyHTML(content);
        fs.writeFileSync(filePath, prettified);
        console.log(`✓ Prettified: ${filePath}`);
    } catch (error) {
        console.error(`✗ Error prettifying ${filePath}:`, error.message);
    }
}

function findHTMLFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            findHTMLFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    }
    
    return fileList;
}

// Main execution
const args = process.argv.slice(2);
if (args.length === 0) {
    // Prettify all HTML files in key directories
    const directories = ['./templates', './components', './pages', './content', './build'];
    const allFiles = [];
    
    for (const dir of directories) {
        if (fs.existsSync(dir)) {
            findHTMLFiles(dir, allFiles);
        }
    }
    
    console.log(`Found ${allFiles.length} HTML files to prettify...`);
    allFiles.forEach(prettifyFile);
    console.log('Done!');
} else {
    // Prettify specific files
    args.forEach(prettifyFile);
}