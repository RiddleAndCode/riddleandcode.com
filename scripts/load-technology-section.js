// Load technology section
(function() {
  const placeholder = document.getElementById('technology-section-placeholder');
  if (placeholder) {
    // Determine the correct path based on current location
    const scriptPath = document.currentScript.src;
    const depth = (window.location.pathname.match(/\//g) || []).length - 1;
    const prefix = depth > 0 ? '../'.repeat(depth) : '';
    
    fetch(prefix + 'includes/technology-section.html')
      .then(response => response.text())
      .then(html => {
        placeholder.innerHTML = html;
      })
      .catch(error => console.error('Error loading technology section:', error));
  }
})();
