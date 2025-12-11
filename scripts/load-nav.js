// Load modern navigation
(function() {
  const placeholder = document.getElementById('nav-placeholder');
  if (placeholder) {
    // Determine the correct path based on current location
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    fetch(prefix + 'includes/nav.html')
      .then(response => response.text())
      .then(html => {
        placeholder.innerHTML = html;
        
        // Fix relative paths in the loaded content based on depth
        if (depth > 0) {
          const navLinks = placeholder.querySelectorAll('a[href^="/"]');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('/')) {
              link.setAttribute('href', prefix + href.substring(1));
            }
          });
          
          const navImages = placeholder.querySelectorAll('img[src^="/"]');
          navImages.forEach(img => {
            const src = img.getAttribute('src');
            if (src.startsWith('/')) {
              img.setAttribute('src', prefix + src.substring(1));
            }
          });
        }
      })
      .catch(error => console.error('Error loading navigation:', error));
  }
})();
