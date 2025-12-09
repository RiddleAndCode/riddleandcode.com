/**
 * Fix Webflow animations and interactions for local development
 * Ensures elements become visible and dropdowns work even if Webflow.js doesn't load properly
 */
(function() {
  'use strict';
  
  // Wait a bit for Webflow to initialize
  setTimeout(function() {
    // If elements are still hidden after 1 second, show them
    const hiddenElements = document.querySelectorAll('[style*="opacity:0"], [style*="opacity: 0"]');
    
    if (hiddenElements.length > 0) {
      console.log('Webflow animations not triggered, showing', hiddenElements.length, 'hidden elements');
      hiddenElements.forEach(function(el) {
        el.style.opacity = '1';
      });
    }
    
    // Fix dropdowns if Webflow didn't initialize them
    const dropdowns = document.querySelectorAll('.w-dropdown');
    dropdowns.forEach(function(dropdown) {
      const toggle = dropdown.querySelector('.w-dropdown-toggle');
      const list = dropdown.querySelector('.w-dropdown-list');
      
      if (toggle && list) {
        // Remove existing click handlers
        const newToggle = toggle.cloneNode(true);
        toggle.parentNode.replaceChild(newToggle, toggle);
        
        // Add simple click handler
        newToggle.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          
          // Toggle open class
          const isOpen = dropdown.classList.contains('w--open');
          
          // Close all other dropdowns
          document.querySelectorAll('.w-dropdown').forEach(function(d) {
            d.classList.remove('w--open');
          });
          
          // Toggle this dropdown
          if (!isOpen) {
            dropdown.classList.add('w--open');
          }
        });
      }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.w-dropdown')) {
        document.querySelectorAll('.w-dropdown').forEach(function(d) {
          d.classList.remove('w--open');
        });
      }
    });
    
    // Fix hamburger menu
    const navIcon = document.querySelector('.nav-icon');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navIcon && navMenu) {
      const newNavIcon = navIcon.cloneNode(true);
      navIcon.parentNode.replaceChild(newNavIcon, navIcon);
      
      newNavIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const nav = document.querySelector('.navbar');
        if (nav) {
          nav.classList.toggle('open');
        }
        
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
      });
    }
    
    console.log('Webflow interactions manually initialized');
  }, 1000);
})();
