(function() {
  const placeholder = document.getElementById('kern-product-bar-placeholder');
  if (!placeholder) return;
  const depth = (window.location.pathname.match(/\//g) || []).length - 1;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';
  fetch(prefix + 'includes/kern-product-bar.html')
    .then(r => r.text())
    .then(html => { placeholder.innerHTML = html; })
    .catch(e => console.error('Error loading kern product bar:', e));
})();
