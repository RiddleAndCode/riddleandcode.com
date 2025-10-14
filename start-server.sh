#!/bin/bash

# Simple HTTP Server Setup for Testing Modular Components
# This script helps you test the modular header/footer system locally

echo "🚀 Riddle&Code Modular Component Test Server"
echo "============================================"
echo ""
echo "The modular header/footer system requires an HTTP server to work properly"
echo "due to browser CORS restrictions with local files."
echo ""
echo "Choose your preferred HTTP server:"
echo ""
echo "1. Python 3 (if available):"
echo "   python3 -m http.server 8000"
echo ""
echo "2. Node.js (if available):"
echo "   npx serve . -p 8000"
echo ""
echo "3. PHP (if available):"
echo "   php -S localhost:8000"
echo ""
echo "After starting a server, open your browser to:"
echo "   http://localhost:8000/company/career.html"
echo ""
echo "============================================"
echo ""

# Auto-detect and start server if possible
if command -v python3 &> /dev/null; then
    echo "✅ Python 3 detected. Starting HTTP server..."
    echo "   Press Ctrl+C to stop the server"
    echo "   Open: http://localhost:8000/company/career.html"
    echo ""
    python3 -m http.server 8000
elif command -v php &> /dev/null; then
    echo "✅ PHP detected. Starting HTTP server..."
    echo "   Press Ctrl+C to stop the server"
    echo "   Open: http://localhost:8000/company/career.html"
    echo ""
    php -S localhost:8000
elif command -v node &> /dev/null; then
    echo "✅ Node.js detected. Attempting to start server with npx serve..."
    echo "   Press Ctrl+C to stop the server"
    echo "   Open: http://localhost:8000/company/career.html"
    echo ""
    npx serve . -p 8000
else
    echo "❌ No suitable HTTP server found."
    echo "Please install Python 3, Node.js, or PHP to test the modular components."
    echo "Alternatively, use any other HTTP server of your choice."
fi