// Riddle&Code Website - Main JavaScript

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const lines = navToggle.querySelectorAll('.nav-toggle-line');
            if (navMenu.classList.contains('active')) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }
});

// Smooth Scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Language Switcher Functionality
class LanguageSwitcher {
    constructor() {
        this.currentLang = this.detectLanguage();
        this.init();
    }
    
    detectLanguage() {
        // Check URL path for language
        const path = window.location.pathname;
        if (path.startsWith('/de/') || path === '/de.html') {
            return 'de';
        }
        return 'en';
    }
    
    init() {
        const switcher = document.querySelector('.language-switcher');
        if (switcher) {
            this.updateCurrentLanguage();
        }
    }
    
    updateCurrentLanguage() {
        const currentLangElement = document.querySelector('.language-current span');
        if (currentLangElement) {
            currentLangElement.textContent = this.currentLang === 'de' ? 'Deutsch' : 'English';
        }
    }
    
    switchLanguage(lang) {
        const currentPath = window.location.pathname;
        let newPath;
        
        if (lang === 'de') {
            if (currentPath === '/' || currentPath === '/index.html') {
                newPath = '/de.html';
            } else if (currentPath.startsWith('/de/')) {
                newPath = currentPath; // Already in German
            } else {
                newPath = '/de' + currentPath;
            }
        } else {
            if (currentPath.startsWith('/de/')) {
                newPath = currentPath.replace('/de', '');
            } else if (currentPath === '/de.html') {
                newPath = '/index.html';
            } else {
                newPath = currentPath; // Already in English
            }
        }
        
        window.location.href = newPath;
    }
}

// Initialize Language Switcher
document.addEventListener('DOMContentLoaded', function() {
    new LanguageSwitcher();
});

// Fade-in Animation on Scroll
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        if ('IntersectionObserver' in window) {
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        this.observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            // Observe all elements with animation class
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            animatedElements.forEach(el => {
                this.observer.observe(el);
            });
        }
    }
}

// Initialize Scroll Animations
document.addEventListener('DOMContentLoaded', function() {
    new ScrollAnimations();
});

// Cookie Consent (Simple Implementation)
class CookieConsent {
    constructor() {
        this.cookieName = 'rc-cookie-consent';
        this.init();
    }
    
    init() {
        if (!this.hasConsent()) {
            this.showBanner();
        }
    }
    
    hasConsent() {
        return localStorage.getItem(this.cookieName) === 'accepted';
    }
    
    showBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p>We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.</p>
                <div class="cookie-actions">
                    <button class="btn btn-primary accept-cookies">Accept</button>
                    <button class="btn btn-secondary decline-cookies">Decline</button>
                </div>
            </div>
        `;
        
        // Add styles
        banner.style.cssText = `
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--background-dark);
            color: var(--text-light);
            padding: var(--spacing-lg);
            z-index: 10000;
            transform: translateY(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(banner);
        
        // Show banner
        setTimeout(() => {
            banner.style.transform = 'translateY(0)';
        }, 100);
        
        // Add event listeners
        banner.querySelector('.accept-cookies').addEventListener('click', () => {
            this.acceptCookies();
            this.hideBanner(banner);
        });
        
        banner.querySelector('.decline-cookies').addEventListener('click', () => {
            this.declineCookies();
            this.hideBanner(banner);
        });
    }
    
    acceptCookies() {
        localStorage.setItem(this.cookieName, 'accepted');
    }
    
    declineCookies() {
        localStorage.setItem(this.cookieName, 'declined');
    }
    
    hideBanner(banner) {
        banner.style.transform = 'translateY(100%)';
        setTimeout(() => {
            banner.remove();
        }, 300);
    }
}

// Initialize Cookie Consent
document.addEventListener('DOMContentLoaded', function() {
    new CookieConsent();
});

// Utility Functions
const Utils = {
    // Debounce function for performance
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },
    
    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Get element height including margin
    getOuterHeight(element) {
        const styles = window.getComputedStyle(element);
        const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
        return Math.ceil(element.offsetHeight + margin);
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LanguageSwitcher, ScrollAnimations, CookieConsent, Utils };
}