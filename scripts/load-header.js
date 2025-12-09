/**
 * Load header navigation into all pages
 */
(function() {
  'use strict';
  
  const headerHTML = `<nav class="navbar navigation-2 navigation-3">
  <div class="nav">
    <a class="nav-logo w-nav-brand" href="index.html">
      <img alt="" class="logo" loading="lazy" sizes="(max-width: 479px) 98vw, (max-width: 767px) 99vw, (max-width: 912px) 100vw, 912px" src="images/640eb41653155cff97638680_RIDDLE&CODE_SHORTLOGO_OPTION_C_POS_grey.png" srcset="images/640eb41653155cff97638680_RIDDLE&CODE_SHORTLOGO_OPTION_C_POS_grey-p-500.png 500w, images/640eb41653155cff97638680_RIDDLE&CODE_SHORTLOGO_OPTION_C_POS_grey.png 912w"/>
    </a>
    <div class="nav-container">
      <a class="link w-inline-block" href="company/get-in-touch.html">
        <p class="button nav">Get in Touch</p>
      </a>
      <div class="locales-wrapper-2 w-locales-list">
        <div class="dropdown-2 w-dropdown" data-delay="0" data-hover="false">
          <div class="dropdown-toggle-2 w-dropdown-toggle">
            <div class="w-icon-dropdown-toggle"></div>
            <div class="text-block-69">Language</div>
          </div>
          <nav class="dropdown-list-2 w-dropdown-list">
            <div class="locales-list-2 w-locales-items" role="list">
              <div class="w-locales-item" role="listitem">
                <a class="link-5" href="index.html" hreflang="en">English</a>
              </div>
              <div class="w-locales-item" role="listitem">
                <a class="link-5" href="de.html" hreflang="de">German</a>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <a class="nav-icon w-inline-block" data-w-id="f6c561d2-5e30-59be-3524-d2f6206c0a97" href="#">
        <div class="nav-icon-line _1"></div>
        <div class="nav-icon-line _2"></div>
        <div class="nav-icon-line _3"></div>
      </a>
    </div>
  </div>
  <div class="nav-menu" fs-scrolldisable-element="when-visible">
    <div class="menu-links">
      <a class="link menu w-inline-block" href="company/get-in-touch.html">
        <p class="button no-margin">Get in Touch</p>
      </a>
      <div class="column">
        <div class="nav-column-heading">
          <img alt="" class="icon menu" loading="lazy" src="images/640eb6e891ce977fa6a568df_3d-select-solid_bright.svg"/>
          <p class="big no-margin">Products</p>
        </div>
        <a class="link-bright w-inline-block" href="energy-community/mypwr.html">
          <p class="no-margin">MYPWR Info</p>
        </a>
        <a class="link-bright w-inline-block" href="product/security-technology.html">
          <p class="no-margin">Security Tech.</p>
        </a>
        <a class="link-bright w-inline-block" href="product/key-and-identity-management.html">
          <p class="no-margin">Key &amp; Identity</p>
        </a>
      </div>
      <div class="column">
        <div class="nav-column-heading">
          <img alt="" class="icon menu" loading="lazy" src="images/640eb70a979c11f3936e0cd4_puzzle_bright.svg"/>
          <p class="big no-margin">Developers</p>
        </div>
        <a class="link-bright w-inline-block" href="https://rddl.io" target="_blank">
          <p class="no-margin">RDDL →</p>
        </a>
        <a class="link-bright w-inline-block" href="https://github.com/RiddleAndCode" target="_blank">
          <p class="no-margin">GitHub →</p>
        </a>
      </div>
      <div class="column">
        <div class="nav-column-heading">
          <img alt="" class="icon menu" loading="lazy" src="images/640eb7703fa34ac399a3c122_tree_bright.svg"/>
          <a class="link-bright big w-inline-block" href="#">
            <p class="no-margin">Sustainability</p>
          </a>
        </div>
        <a class="link-bright w-inline-block" href="sustainability.html">
          <p class="no-margin">R&amp;C Goals</p>
        </a>
        <a class="link-bright w-inline-block" href="https://sdgs.un.org/goals" target="_blank">
          <p class="no-margin">UN Goals →</p>
        </a>
      </div>
      <div class="column">
        <div class="nav-column-heading">
          <img alt="" class="icon menu" loading="lazy" src="images/640eb751bae1c52d740359ca_planet_bright.svg"/>
          <a class="link-bright big w-inline-block" href="showcase.html">
            <p class="no-margin">Showcase</p>
          </a>
        </div>
      </div>
      <div class="column last">
        <div class="nav-column-heading">
          <img alt="" class="icon menu" loading="lazy" src="images/640eb777ec613903362fb954_sofa_bright.svg"/>
          <a class="link-bright big w-inline-block" href="company/overview.html">
            <p class="no-margin">Company</p>
          </a>
        </div>
        <a class="link-bright w-inline-block" href="company/news.html">
          <p class="no-margin">News</p>
        </a>
        <a class="link-bright w-inline-block" href="company/media.html">
          <p class="no-margin">Media</p>
        </a>
        <a class="link-bright w-inline-block" href="https://blog.riddleandcode.com/" target="_blank">
          <p class="no-margin">Blog →</p>
        </a>
        <a class="link-bright w-inline-block" href="https://discord.gg/59KSQ7hHkJ" target="_blank">
          <p class="no-margin">Discord →</p>
        </a>
        <a class="link-bright w-inline-block" href="company/about-us.html">
          <p class="no-margin">About Us</p>
        </a>
        <a class="link-bright w-inline-block" href="company/career.html">
          <p class="no-margin">Career</p>
        </a>
        <a class="link-bright w-inline-block" href="company/get-in-touch.html">
          <p class="no-margin">Contact</p>
        </a>
      </div>
    </div>
  </div>
</nav>`;
  
  function loadHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) {
      console.warn('Header placeholder not found');
      return;
    }
    
    // Calculate the relative path to root based on the script tag location
    const scripts = document.getElementsByTagName('script');
    let scriptPath = 'scripts/load-header.js';
    
    // Find the script tag that loaded this file
    for (let script of scripts) {
      const src = script.getAttribute('src');
      if (src && src.includes('load-header.js')) {
        scriptPath = src;
        break;
      }
    }
    
    // Count how many '../' are in the script path to determine page depth
    const depth = (scriptPath.match(/\.\.\//g) || []).length;
    const pathToRoot = depth === 0 ? '' : '../'.repeat(depth);
    
    console.log('Loading header - Script path:', scriptPath, 'Depth:', depth, 'PathToRoot:', pathToRoot);
    
    // Load custom navigation CSS if not already loaded
    if (!document.querySelector('link[href*="custom-nav.css"]')) {
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = pathToRoot + 'styles/custom-nav.css';
      document.head.appendChild(cssLink);
    }
    
    // Insert the header HTML
    headerPlaceholder.innerHTML = headerHTML;
    
    // Fix relative href links based on page depth
    const links = headerPlaceholder.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"])');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('/')) {
        link.setAttribute('href', pathToRoot + href);
      }
    });
    
    // Fix relative image src paths based on page depth
    const images = headerPlaceholder.querySelectorAll('img[src]:not([src^="http"]):not([src^="//"]):not([src^="/"])');
    images.forEach(img => {
      const src = img.getAttribute('src');
      const newSrc = pathToRoot + src;
      img.setAttribute('src', newSrc);
      
      // Also fix srcset if present
      const srcset = img.getAttribute('srcset');
      if (srcset) {
        const fixedSrcset = srcset.split(',').map(item => {
          const parts = item.trim().split(' ');
          if (parts[0] && !parts[0].startsWith('http') && !parts[0].startsWith('//') && !parts[0].startsWith('/')) {
            parts[0] = pathToRoot + parts[0];
          }
          return parts.join(' ');
        }).join(', ');
        img.setAttribute('srcset', fixedSrcset);
      }
    });
    
    // Show any hidden elements in the header
    const hiddenElements = headerPlaceholder.querySelectorAll('[style*="opacity:0"], [style*="opacity: 0"]');
    hiddenElements.forEach(function(el) {
      el.style.opacity = '1';
    });
    
    console.log('Header loaded with', images.length, 'images and', links.length, 'links');
    
    // Trigger a custom event when header is loaded
    document.dispatchEvent(new CustomEvent('headerLoaded'));
  }
  
  // Load header when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
