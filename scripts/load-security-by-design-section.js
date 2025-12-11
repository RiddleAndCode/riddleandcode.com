// Load security by design section dynamically
(function() {
  const placeholder = document.getElementById('security-by-design-placeholder');
  if (!placeholder) return;
  
  // Calculate depth based on current path
  const depth = window.location.pathname.split('/').filter(p => p).length;
  const pathPrefix = depth > 0 ? '../'.repeat(depth) : '';
  
  fetch(pathPrefix + 'includes/security-by-design-section.html')
    .then(response => response.text())
    .then(html => {
      placeholder.outerHTML = html;
    })
    .catch(error => console.error('Error loading security-by-design section:', error));
})();
