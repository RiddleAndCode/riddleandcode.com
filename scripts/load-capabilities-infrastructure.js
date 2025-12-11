// Load infrastructure capabilities section dynamically
(function() {
  const placeholder = document.getElementById('capabilities-infrastructure-placeholder');
  if (!placeholder) return;
  
  // Calculate depth based on current path
  const depth = window.location.pathname.split('/').filter(p => p).length;
  const pathPrefix = depth > 0 ? '../'.repeat(depth) : '';
  
  fetch(pathPrefix + 'includes/capabilities-infrastructure.html')
    .then(response => response.text())
    .then(html => {
      placeholder.outerHTML = html;
    })
    .catch(error => console.error('Error loading capabilities-infrastructure section:', error));
})();
