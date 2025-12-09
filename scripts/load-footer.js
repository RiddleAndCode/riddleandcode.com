/**
 * Load footer template into all pages
 * Footer content is embedded directly to avoid CORS issues with file:// protocol
 * Image paths are relative and adjusted based on page depth
 */
(function() {
  'use strict';
  
  const footerHTML = `<div class="footer bright" data-w-id="c496049e-ceee-1b6a-a0a9-2445cd9bedf7">
  <div class="grid-footer">
    <div class="footer-logo" id="w-node-c496049e-ceee-1b6a-a0a9-2445cd9bedff-cd9bedf7">
      <img alt="" class="logo-footer" loading="lazy" sizes="(max-width: 912px) 100vw, 912px" src="images/6401702a38e8cf440c5d69e9_RIDDLE&CODE_SHORTLOGO_OPTION_C_POS.png" srcset="images/6401702a38e8cf440c5d69e9_RIDDLE&CODE_SHORTLOGO_OPTION_C_POS-p-500.png 500w, images/6401702a38e8cf440c5d69e9_RIDDLE&CODE_SHORTLOGO_OPTION_C_POS.png 912w">
      <p class="no-margin">Turning real-world production<br/>into verified digital value.</p>
    </div>
    <div class="footer-menu" id="w-node-c496049e-ceee-1b6a-a0a9-2445cd9bee07-cd9bedf7">
      <div class="menu-links">
        <div class="column">
          <a class="link-dark big w-inline-block" href="#">
            <p class="no-margin">Products</p>
          </a>
          <a class="link-dark w-inline-block" href="energy-community/mypwr.html">
            <p class="no-margin">MYPWR Info</p>
          </a>
          <a class="link-dark w-inline-block" href="product/security-technology.html">
            <p class="no-margin">Security Tech.</p>
          </a>
          <a class="link-dark w-inline-block" href="product/key-and-identity-management.html">
            <p class="no-margin">Key &amp; Identity</p>
          </a>
        </div>
        <div class="column">
          <a class="link-dark big w-inline-block" href="#">
            <p class="no-margin">Developers</p>
          </a>
          <a class="link-dark w-inline-block" href="https://rddl.io" target="_blank">
            <p class="no-margin">RDDL →</p>
          </a>
          <a class="link-dark w-inline-block" href="https://github.com/RiddleAndCode" target="_blank">
            <p class="no-margin">GitHub →</p>
          </a>
        </div>
        <div class="column">
          <a class="link-dark big w-inline-block" href="#">
            <p class="no-margin">Sustainability</p>
          </a>
          <a class="link-dark w-inline-block" href="sustainability.html">
            <p class="no-margin">R&amp;C Goals</p>
          </a>
          <a class="link-dark w-inline-block" href="https://sdgs.un.org/goals" target="_blank">
            <p class="no-margin">UN Goals →</p>
          </a>
        </div>
        <div class="column">
          <a class="link-dark big w-inline-block" href="showcase.html">
            <p class="no-margin">Showcase</p>
          </a>
        </div>
        <div class="column last">
          <a class="link-dark big w-inline-block" href="company/overview.html">
            <p class="no-margin">Company</p>
          </a>
          <a class="link-dark w-inline-block" href="company/news.html">
            <p class="no-margin">News</p>
          </a>
          <a class="link-dark w-inline-block" href="company/media.html">
            <p class="no-margin">Media</p>
          </a>
          <a class="link-dark w-inline-block" href="https://blog.riddleandcode.com/" target="_blank">
            <p class="no-margin">Blog →</p>
          </a>
          <a class="link-dark w-inline-block" href="company/about-us.html">
            <p class="no-margin">About Us</p>
          </a>
          <a class="link-dark w-inline-block" href="company/career.html">
            <p class="no-margin">Career</p>
          </a>
          <a class="link-dark w-inline-block" href="company/get-in-touch.html">
            <p class="no-margin">Contact</p>
          </a>
        </div>
      </div>
    </div>
    <div class="card" id="w-node-c496049e-ceee-1b6a-a0a9-2445cd9bee41-cd9bedf7">
      <div class="card-container space">
        <img alt="" class="icon" loading="lazy" src="images/6401846ced3ebc76aa3bf69c_thumbs-up_black.svg">
        <div class="card-content">
          <a class="link-dark big w-inline-block" href="https://x.com/riddleandcode" target="_blank">
            <p class="no-margin">X →</p>
          </a>
          <a class="link-dark big w-inline-block" href="https://discord.com/invite/Cza9zX8RZr" target="_blank">
            <p class="no-margin">Discord → </p>
          </a>
          <a class="link-dark big w-inline-block" href="https://at.linkedin.com/company/riddle-&-code" target="_blank">
            <p class="no-margin">LinkedIn →</p>
          </a>
          <a class="link-dark big w-inline-block" href="https://www.youtube.com/channel/UC0-MdDxin2K--lx1-2vmv1g" target="_blank">
            <p class="no-margin">Youtube →</p>
          </a>
        </div>
      </div>
    </div>
    <div class="card" id="w-node-c496049e-ceee-1b6a-a0a9-2445cd9bee4e-cd9bedf7">
      <div class="card-container space">
        <img alt="" class="icon" loading="lazy" src="images/6401a19e38e8cfa4c760c1a2_info-empty_black.svg">
        <div class="card-content">
          <a class="link-dark big w-inline-block" href="legal.html">
            <p class="no-margin">Legal Notice→</p>
          </a>
          <a class="link-dark big w-inline-block" href="terms.html">
            <p class="no-margin">Terms →</p>
          </a>
          <a class="link-dark big w-inline-block" href="privacy-policy.html">
            <p class="no-margin">Privacy Policy→</p>
          </a>
          <a class="link-dark big w-inline-block" href="company/get-in-touch.html">
            <p class="no-margin">Contact →</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`;
  
  function loadFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) {
      console.warn('Footer placeholder not found');
      return;
    }
    
    // Calculate the relative path to root based on the script tag location
    const scripts = document.getElementsByTagName('script');
    let scriptPath = 'scripts/load-footer.js';
    
    // Find the script tag that loaded this file
    for (let script of scripts) {
      const src = script.getAttribute('src');
      if (src && src.includes('load-footer.js')) {
        scriptPath = src;
        break;
      }
    }
    
    // Count how many '../' are in the script path to determine page depth
    const depth = (scriptPath.match(/\.\.\//g) || []).length;
    const pathToRoot = depth === 0 ? '' : '../'.repeat(depth);
    
    console.log('Loading footer - Script path:', scriptPath, 'Depth:', depth, 'PathToRoot:', pathToRoot);
    
    // Insert the footer HTML
    footerPlaceholder.innerHTML = footerHTML;
    
    // Fix relative href links based on page depth
    const links = footerPlaceholder.querySelectorAll('a[href]:not([href^="http"]):not([href^="#"])');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('/')) {
        link.setAttribute('href', pathToRoot + href);
      }
    });
    
    // Fix relative image src paths based on page depth
    const images = footerPlaceholder.querySelectorAll('img[src]:not([src^="http"]):not([src^="//"]):not([src^="/"])');
    console.log('Found images:', images.length);
    images.forEach(img => {
      const src = img.getAttribute('src');
      const newSrc = pathToRoot + src;
      console.log('Image src:', src, '-> New src:', newSrc);
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
    
    // Trigger a custom event when footer is loaded
    document.dispatchEvent(new CustomEvent('footerLoaded'));
    
    // Load Webflow replacement script
    loadWebflowReplacement();
  }
  
  // Load the Webflow replacement script dynamically
  function loadWebflowReplacement() {
    // Check if script already loaded
    if (document.querySelector('script[src*="webflow-replacement"]')) {
      return;
    }
    
    // Calculate path to scripts directory
    const scripts = document.getElementsByTagName('script');
    let scriptPath = 'scripts/';
    
    for (let script of scripts) {
      const src = script.getAttribute('src');
      if (src && src.includes('load-footer.js')) {
        scriptPath = src.replace('load-footer.js', '');
        break;
      }
    }
    
    // Load the replacement script
    const script = document.createElement('script');
    script.src = scriptPath + 'webflow-replacement.js';
    script.type = 'text/javascript';
    script.onload = function() {
      console.log('[Footer] Webflow replacement script loaded');
    };
    script.onerror = function() {
      console.error('[Footer] Failed to load webflow-replacement.js');
    };
    document.body.appendChild(script);
  }
  
  // Load footer when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFooter);
  } else {
    loadFooter();
  }
})();
