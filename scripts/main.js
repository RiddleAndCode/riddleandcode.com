/**
 * Main application script for riddleandcode.com
 * Handles common head elements, component loading, and animations.
 * This centralizes logic previously spread across multiple load-*.js scripts.
 */

(function() {
  // --- 1. CONFIGURATION & STATE ---
  
  // Determine directory depth for path fixing
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const isFile = window.location.pathname.includes('.');
  const depth = isFile ? pathParts.length - 1 : pathParts.length;
  const prefix = depth > 0 ? '../'.repeat(depth) : '';

  const components = [
    { id: 'nav-placeholder', file: 'includes/nav.html', init: initNav },
    { id: 'footer-modern-placeholder', file: 'includes/footer.html' },
    { id: 'solutions-section-placeholder', file: 'includes/solutions-section.html' },
    { id: 'capabilities-section-placeholder', file: 'includes/capabilities-section.html' },
    { id: 'technology-section-placeholder', file: 'includes/technology-section.html' },
    { id: 'products-section-placeholder', file: 'includes/products-section.html' },
    { id: 'partners-section-placeholder', file: 'includes/partners-section.html' },
    { id: 'security-by-design-placeholder', file: 'includes/security-by-design-section.html' },
    { id: 'capabilities-key-management-placeholder', file: 'includes/capabilities-key-management.html' },
    { id: 'capabilities-infrastructure-placeholder', file: 'includes/capabilities-infrastructure.html' }
  ];

  // --- 2. HEAD MANAGEMENT ---
  
  function initHead() {
    // 2.1 Webflow-like detection
    (function(o,c){
      var n=c.documentElement,t=" w-mod-";
      n.className+=t+"js";
      if("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch){
        n.className+=t+"touch";
      }
    })(window,document);

    // 2.2 Favicons
    addLinkTag({ rel: 'shortcut icon', type: 'image/x-icon', href: prefix + 'images/641436b897f1d137d2d2845d_fav_icon.png' });
    addLinkTag({ rel: 'apple-touch-icon', href: prefix + 'images/641437162f7f81829faa8c24_webclip.png' });

    // 2.3 Analytics & Scripts
    const gaId = document.documentElement.getAttribute('data-ga-id') || 'G-K86LPV2ZGE';
    addScriptTag(`https://www.googletagmanager.com/gtag/js?id=${gaId}`, true);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    if (gaId === 'G-K86LPV2ZGE') gtag('set', 'developer_id.dZGVlNj', true);
    gtag('config', gaId);

    // Cookie Consent
    addScriptTag('https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js', true, { 'fs-cc-mode': 'opt-in' });

    // GTM
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-T2VR79F');

    // Referrer
    if (!document.querySelector('meta[name="referrer"]')) {
      const meta = document.createElement('meta');
      meta.name = 'referrer';
      meta.content = 'no-referrer';
      document.head.appendChild(meta);
    }
  }

  // Helper: Add link tag if not present
  function addLinkTag(attrs) {
    const selector = attrs.rel === 'shortcut icon' ? 'link[rel="shortcut icon"]' : `link[rel="${attrs.rel}"][href*="${attrs.href.split('/').pop()}"]`;
    if (!document.querySelector(selector)) {
      const link = document.createElement('link');
      Object.entries(attrs).forEach(([k, v]) => link.setAttribute(k, v));
      document.head.appendChild(link);
    }
  }

  // Helper: Add script tag if not present
  function addScriptTag(src, async, attrs = {}) {
    const fileName = src.split('/').pop().split('?')[0];
    if (!document.querySelector(`script[src*="${fileName}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      if (async) script.async = true;
      Object.entries(attrs).forEach(([k, v]) => script.setAttribute(k, v));
      document.head.appendChild(script);
    }
  }

  // --- 3. COMPONENT LOADING ---

  function loadComponents() {
    components.forEach(comp => {
      const el = document.getElementById(comp.id);
      if (el) {
        fetch(prefix + comp.file)
          .then(r => r.text())
          .then(html => {
            // Fix relative paths in HTML
            let fixedHtml = html;
            if (depth > 0) {
              // Fix href="..." and src="..." that don't start with http, /, #, or mailto
              fixedHtml = fixedHtml.replace(/(href|src)="(?!\/|http|https|#|mailto:)([^"]+)"/g, (match, p1, p2) => {
                return `${p1}="${prefix}${p2}"`;
              });
            }
            el.innerHTML = fixedHtml;
            if (comp.init) comp.init(el);
            
            // Re-trigger animations for new content
            initAnimations();
          })
          .catch(e => console.error(`Failed to load component ${comp.id}:`, e));
      }
    });
  }

  function initNav(container) {
    const toggle = container.querySelector('#navToggle');
    const menu = container.querySelector('#navMenu');
    
    if (toggle && menu) {
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        menu.classList.toggle('active');
      });
      
      document.addEventListener('click', function(event) {
        if (!toggle.contains(event.target) && !menu.contains(event.target)) {
          menu.classList.remove('active');
        }
      });
      
      container.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.remove('active'));
      });
    }
  }

  // --- 4. ANIMATIONS ---

  function initAnimations() {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const targets = document.querySelectorAll('.target-card, .value-card, .tech-layer, .showcase-card, .news-card, .value-grid > div, .fade-in-on-scroll');
    targets.forEach(t => observer.observe(t));
  }

  // --- 5. INITIALIZATION ---
  
  function init() {
    initHead();
    loadComponents();
    initAnimations();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

