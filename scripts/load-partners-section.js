(function() {
  // Calculate depth based on current URL path
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';
  
  fetch(prefix + 'includes/partners-section.html')
    .then(response => response.text())
    .then(html => {
      const placeholder = document.getElementById('partners-section-placeholder');
      if (placeholder) {
        // Fix image paths based on depth
        const fixedHtml = html.replace(/src="images\//g, `src="${prefix}images/`);
        placeholder.innerHTML = fixedHtml;
      }
    })
    .catch(error => console.error('Error loading partners section:', error));
})();
