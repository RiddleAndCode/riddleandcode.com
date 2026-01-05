// Load common head elements (analytics, favicons, etc.)
// This should be called in the <head> section before closing </head>
(function() {
  // Get the base path for assets (handles root vs subdirectory)
  const basePath = document.querySelector('link[href*="main.css"]')?.getAttribute('href').replace('styles/main.css', '') || '';
  
  // 1. Webflow Detection Script
  // This helps with Webflow-specific styling (w-mod-js, w-mod-touch)
  (function(o,c){
    var n=c.documentElement,t=" w-mod-";
    n.className+=t+"js";
    if("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch){
      n.className+=t+"touch";
    }
  })(window,document);

  // 2. Add favicons if not already present
  if (!document.querySelector('link[rel="shortcut icon"]')) {
    const favicon = document.createElement('link');
    favicon.rel = 'shortcut icon';
    favicon.type = 'image/x-icon';
    favicon.href = basePath + 'images/641436b897f1d137d2d2845d_fav_icon.png';
    document.head.appendChild(favicon);
  }
  
  if (!document.querySelector('link[rel="apple-touch-icon"]')) {
    const appleIcon = document.createElement('link');
    appleIcon.rel = 'apple-touch-icon';
    appleIcon.href = basePath + 'images/641437162f7f81829faa8c24_webclip.png';
    document.head.appendChild(appleIcon);
  }
  
  // 3. Add Google Analytics if not already present
  // Note: GA ID should be set via data attribute on <html> tag: data-ga-id="G-K86LPV2ZGE"
  const gaId = document.documentElement.getAttribute('data-ga-id') || 'G-K86LPV2ZGE';
  if (!document.querySelector(`script[src*="gtag/js?id=${gaId}"]`)) {
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
    document.head.appendChild(gaScript);
    
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    if (gaId === 'G-K86LPV2ZGE') {
      gtag('set', 'developer_id.dZGVlNj', true);
    }
    gtag('config', gaId);
  }
  
  // 4. Add Cookie Consent if not already present
  if (!document.querySelector('script[src*="cookie-consent"]')) {
    const cookieScript = document.createElement('script');
    cookieScript.async = true;
    cookieScript.setAttribute('fs-cc-mode', 'opt-in');
    cookieScript.src = 'https://cdn.jsdelivr.net/npm/@finsweet/cookie-consent@1/fs-cc.js';
    document.head.appendChild(cookieScript);
  }
  
  // 5. Add Google Tag Manager if not already present
  if (!document.querySelector('script[src*="gtm.js"]')) {
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','GTM-T2VR79F');
  }

  // 6. Add referrer meta if not present
  if (!document.querySelector('meta[name="referrer"]')) {
    const meta = document.createElement('meta');
    meta.name = 'referrer';
    meta.content = 'no-referrer';
    document.head.appendChild(meta);
  }
})();

