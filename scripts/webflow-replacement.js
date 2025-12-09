/**
 * Lightweight Webflow Replacement Script
 * Replaces Webflow animations and interactions with vanilla JS
 * Total size: ~2KB unminified
 */

(function() {
  'use strict';

  // ===== FADE-IN ANIMATIONS =====
  // Replaces Webflow's data-w-id fade-in effects
  
  const fadeInElements = document.querySelectorAll('[data-w-id][style*="opacity:0"], [data-w-id][style*="opacity: 0"]');
  
  if (fadeInElements.length > 0 && 'IntersectionObserver' in window) {
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          // Add fade-in animation
          element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          
          // Unobserve after animation
          fadeInObserver.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    fadeInElements.forEach(element => {
      // Set initial state
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      fadeInObserver.observe(element);
    });
  } else if (fadeInElements.length > 0) {
    // Fallback for browsers without IntersectionObserver
    fadeInElements.forEach(element => {
      element.style.opacity = '1';
    });
  }

  // ===== MODAL/POPUP CLOSE HANDLERS =====
  // Replaces Webflow's close button functionality
  
  document.addEventListener('click', (e) => {
    const closeButton = e.target.closest('.close-pop-up, [data-w-id*="close"]');
    if (closeButton) {
      e.preventDefault();
      
      // Find the closest modal/popup container
      const modal = closeButton.closest('.modal, .popup, [class*="pop-up"]');
      if (modal) {
        modal.style.transition = 'opacity 0.3s ease-out';
        modal.style.opacity = '0';
        
        setTimeout(() => {
          modal.style.display = 'none';
        }, 300);
      }
    }
  });

  // ===== SCROLL-TRIGGERED ANIMATIONS =====
  // Additional animations for elements that should animate on scroll
  
  const scrollElements = document.querySelectorAll('.section[data-w-id]');
  
  if (scrollElements.length > 0 && 'IntersectionObserver' in window) {
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    scrollElements.forEach(element => {
      scrollObserver.observe(element);
    });
  }

  // ===== UTILITY: Remove unused Webflow attributes =====
  // Clean up data-wf-* attributes that were used by Webflow CMS
  
  function cleanupWebflowAttributes() {
    const webflowAttrs = ['data-wf-page', 'data-wf-site', 'data-wf-domain', 'data-wf-collection', 'data-wf-item-slug'];
    
    webflowAttrs.forEach(attr => {
      const elements = document.querySelectorAll(`[${attr}]`);
      elements.forEach(el => {
        // Keep for reference but these don't affect functionality
        // Uncomment to remove: el.removeAttribute(attr);
      });
    });
  }

  // Run cleanup on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', cleanupWebflowAttributes);
  } else {
    cleanupWebflowAttributes();
  }

  // ===== DEBUG INFO =====
  console.log('[Webflow Replacement] Initialized');
  console.log(`  - Fade-in elements: ${fadeInElements.length}`);
  console.log(`  - Scroll elements: ${scrollElements.length}`);
  console.log('  - Modal close handlers: active');

})();
