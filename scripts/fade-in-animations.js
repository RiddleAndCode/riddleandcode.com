// Simple fade-in animation on scroll
(function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        // Unobserve after animation is triggered
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  function init() {
    // Elements that should fade in on scroll
    // These should NOT have the 'fade-in' class in the HTML initially
    const elementsToObserve = document.querySelectorAll('.target-card, .value-card, .tech-layer, .showcase-card, .news-card, .value-grid > div');
    
    elementsToObserve.forEach(el => {
      observer.observe(el);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

