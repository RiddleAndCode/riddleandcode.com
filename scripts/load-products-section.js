(function() {
  // Get the current script's path to determine relative path
  const currentScript = document.currentScript;
  const scriptPath = currentScript ? currentScript.src : '';
  const isInSubfolder = scriptPath.includes('/scripts/') && window.location.pathname.includes('/company/');
  
  // Determine the correct path prefix
  const pathPrefix = isInSubfolder ? '../' : '';
  
  fetch(pathPrefix + 'includes/products-section.html')
    .then(response => response.text())
    .then(html => {
      // Adjust paths if we're in a subfolder
      if (isInSubfolder) {
        html = html.replace(/href="product\//g, 'href="../product/');
      }
      
      const placeholder = document.getElementById('products-section-placeholder');
      if (placeholder) {
        placeholder.innerHTML = html;
      }
    })
    .catch(error => console.error('Error loading products section:', error));
})();
