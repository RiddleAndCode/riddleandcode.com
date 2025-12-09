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
      // Set initial state - only on mobile
      const isMobile = window.innerWidth <= 991;
      
      if (isMobile) {
        navMenu.style.maxHeight = '0';
        navMenu.style.overflow = 'hidden';
        navMenu.style.opacity = '0';
      }
      
      navMenu.style.transition = 'max-height 0.4s ease-out, opacity 0.3s ease-out';
      
      navIcon.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Toggle menu visibility with slide animation
        const isOpen = navbar.classList.contains('open');
        
        if (isOpen) {
          // Close: slide up
          navMenu.style.maxHeight = '0';
          navMenu.style.opacity = '0';
          setTimeout(function() {
            navMenu.style.overflow = 'hidden';
          }, 400); // Wait for animation to complete
          navbar.classList.remove('open');
        } else {
          // Open: slide down
          navMenu.style.display = 'flex';
          navMenu.style.overflow = 'hidden'; // Keep hidden during animation
          // Use a large fixed height for smooth animation
          navMenu.style.maxHeight = '2000px';
          navMenu.style.opacity = '1';
          setTimeout(function() {
            navMenu.style.overflow = 'visible'; // Allow dropdowns to show
          }, 400);
          navbar.classList.add('open');
        }
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar')) {
          const isMobile = window.innerWidth <= 991;
          if (isMobile) {
            navMenu.style.maxHeight = '0';
            navMenu.style.opacity = '0';
            navMenu.style.overflow = 'hidden';
          }
          navbar.classList.remove('open');
        }
      });
      
      // Handle window resize
      window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 991;
        if (!isMobile) {
          // Reset styles on desktop
          navMenu.style.maxHeight = '';
          navMenu.style.opacity = '';
          navMenu.style.overflow = '';
          navbar.classList.remove('open');
        } else if (!navbar.classList.contains('open')) {
          // Ensure menu is hidden on mobile
          navMenu.style.maxHeight = '0';
          navMenu.style.opacity = '0';
          navMenu.style.overflow = 'hidden';
        }
      });
    }
    
    console.log('Simple dropdowns initialized');
  });
})();
