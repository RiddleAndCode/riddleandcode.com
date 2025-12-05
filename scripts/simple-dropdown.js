/**
 * Simple dropdown implementation without Webflow dependencies
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    // Show all hidden elements with opacity:0
    const hiddenElements = document.querySelectorAll('[style*="opacity:0"], [style*="opacity: 0"]');
    hiddenElements.forEach(function(el) {
      el.style.opacity = '1';
    });
    
    // Find all dropdowns
    const dropdowns = document.querySelectorAll('.w-dropdown');
    
    dropdowns.forEach(function(dropdown) {
      const toggle = dropdown.querySelector('.w-dropdown-toggle');
      const list = dropdown.querySelector('.w-dropdown-list');
      
      if (!toggle || !list) return;
      
      // Make sure list is hidden by default
      list.style.display = 'none';
      list.style.opacity = '1';
      
      // Click handler for toggle
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Check if already open
        const isOpen = dropdown.classList.contains('w--open');
        
        // Close all other dropdowns first
        document.querySelectorAll('.w-dropdown').forEach(function(d) {
          d.classList.remove('w--open');
          const l = d.querySelector('.w-dropdown-list');
          if (l) l.style.display = 'none';
        });
        
        // Toggle this dropdown
        if (!isOpen) {
          dropdown.classList.add('w--open');
          list.style.display = 'block';
        }
      });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.w-dropdown')) {
        document.querySelectorAll('.w-dropdown').forEach(function(d) {
          d.classList.remove('w--open');
          const list = d.querySelector('.w-dropdown-list');
          if (list) list.style.display = 'none';
        });
      }
    });
    
    // Handle hamburger menu
    const navIcon = document.querySelector('.nav-icon');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    
    if (navIcon && navMenu) {
      navIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle menu visibility
        if (navMenu.style.display === 'flex' || navMenu.style.display === 'block') {
          navMenu.style.display = 'none';
          navbar.classList.remove('open');
        } else {
          navMenu.style.display = 'flex';
          navbar.classList.add('open');
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
          navMenu.style.display = 'none';
          navbar.classList.remove('open');
        }
      });
    }
    
    console.log('Simple dropdowns initialized');
  });
})();
