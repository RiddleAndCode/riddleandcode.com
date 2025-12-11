// Load modern footer
(function() {
  const placeholder = document.getElementById('footer-modern-placeholder');
  if (placeholder) {
    // Determine the correct path based on current location
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    fetch(prefix + 'includes/footer.html')
      .then(response => response.text())
      .then(html => {
        placeholder.innerHTML = html;
        
        // Fix relative paths in the loaded content based on depth
        if (depth > 0) {
          const footerLinks = placeholder.querySelectorAll('a[href^="/"]');
          footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('/')) {
              link.setAttribute('href', prefix + href.substring(1));
            }
          });
        }
      })
      .catch(error => console.error('Error loading footer:', error));
  }
})();
