// Loading screen functionality
document.addEventListener('DOMContentLoaded', () => {
    // Reset any lingering transition effects from back button navigation
    resetTransitionState();
    
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    
    // Hide loading screen after 4 seconds
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        
        // Remove loading screen from DOM after fade animation
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 4000);
});

// Intersection Observer for scroll animations with fade out
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Element is coming into view - fade in
            entry.target.classList.add('visible');
        } else {
            // Element is going out of view - fade out
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in-element');
    fadeElements.forEach(element => {
        // Keep header always visible once it appears
        if (element.tagName === 'HEADER') {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        // Stop observing once visible
                        headerObserver.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            headerObserver.observe(element);
        } else {
            observer.observe(element);
        }
    });

    // Add smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Check if it's an external link (starts with http/https) or internal anchor
            if (targetId.startsWith('http') || targetId.startsWith('//')) {
                // Let external links work normally
                return;
            }
            
            // Only prevent default for internal anchor links
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Enhanced transition functionality for syster and system buttons
    setupTransitionButtons();
});

function setupTransitionButtons() {
    // Syster button transition
    const butterflyButton = document.querySelector('.butterfly-button a');
    if (butterflyButton) {
        butterflyButton.addEventListener('click', (e) => {
            e.preventDefault();
            const url = butterflyButton.href;
            
            // Syster's color scheme (from the CSS you provided)
            const buttterflyColors = {
                '--twilight-dark': '#2a1b3d',
                '--twilight-medium': '#44318d',
                '--twilight-light': '#6b5b95',
                '--butterfly-purple': '#9b7cb6',
                '--sugar-pink': '#f8d7da',
                '--sugar-cream': '#fff8dc',
                '--accent-glow': '#a388ee'
            };
            
            performTransition(url, buttterflyColors, 'Changing to magical content...', '🍩');
        });
    }
}

function performTransition(url, colorScheme, loadingText, emoji = '✦') {
    // Create transition overlay with HARDCODED starting colors
    const transitionOverlay = document.createElement('div');
    transitionOverlay.className = 'transition-overlay';
    
    // Set initial hardcoded cyan colors AND transition property
    transitionOverlay.style.background = 'linear-gradient(135deg, #003f5c 0%, #2f6690 100%)';
    transitionOverlay.style.transition = 'opacity 0.6s ease, background 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Create loading content
    const transitionContent = document.createElement('div');
    transitionContent.className = 'transition-content';
    transitionContent.innerHTML = `
        <div class="spinning-emoji">${emoji}</div>
        <div class="transition-diamonds">
            <span class="diamond">✦</span>
            <span class="diamond">✧</span>
            <span class="diamond">⋆</span>
            <span class="diamond">✦</span>
            <span class="diamond">✧</span>
        </div>
        <p class="transition-text">${loadingText}</p>
    `;
    
    transitionOverlay.appendChild(transitionContent);
    document.body.appendChild(transitionOverlay);

    // Add the transition overlay styles dynamically
    if (!document.getElementById('transition-styles')) {
        const transitionStyles = document.createElement('style');
        transitionStyles.id = 'transition-styles';
        transitionStyles.textContent = `
            .transition-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
            }
            
            .transition-overlay.fade-in {
                opacity: 1;
            }
            
            .transition-content {
                text-align: center;
                color: var(--text-light);
            }
            
            .spinning-emoji {
                font-size: 4rem;
                margin-bottom: 20px;
                animation: spin-emoji 1.5s linear infinite;
                text-shadow: 0 0 25px var(--accent-glow), 0 0 50px var(--accent-glow);
                filter: drop-shadow(0 0 10px var(--accent-glow));
            }
            
            @keyframes spin-emoji {
                from { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                to { transform: rotate(360deg) scale(1); }
            }
            
            .transition-diamonds {
                display: flex;
                justify-content: center;
                gap: 10px;
                margin-bottom: 20px;
            }
            
            .transition-diamonds .diamond {
                font-size: 1.8rem;
                color: var(--accent-glow);
                animation: transition-bounce 1.4s ease-in-out infinite both;
                text-shadow: 0 0 15px var(--accent-glow);
            }
            
            .transition-diamonds .diamond:nth-child(1) { animation-delay: -0.32s; }
            .transition-diamonds .diamond:nth-child(2) { animation-delay: -0.16s; }
            .transition-diamonds .diamond:nth-child(3) { animation-delay: 0s; }
            .transition-diamonds .diamond:nth-child(4) { animation-delay: 0.16s; }
            .transition-diamonds .diamond:nth-child(5) { animation-delay: 0.32s; }
            
            @keyframes transition-bounce {
                0%, 80%, 100% {
                    transform: scale(0.8) translateY(0);
                    opacity: 0.7;
                }
                40% {
                    transform: scale(1.2) translateY(-15px);
                    opacity: 1;
                }
            }
            
            .transition-text {
                font-size: 1.2rem;
                color: var(--text-light);
                margin-top: 20px;
                animation: transition-pulse 2s ease-in-out infinite;
            }
            
            @keyframes transition-pulse {
                0%, 100% { opacity: 0.6; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(transitionStyles);
    }

    // Start the transition sequence
    setTimeout(() => {
        // Fade in the overlay
        transitionOverlay.classList.add('fade-in');
        
        // Start color transition after overlay is visible
        setTimeout(() => {
            // Transition the overlay background to target colors
            const targetGradient = `linear-gradient(135deg, ${colorScheme['--twilight-dark'] || colorScheme['--cyan-dark']} 0%, ${colorScheme['--twilight-medium'] || colorScheme['--cyan-medium']} 100%)`;
            transitionOverlay.style.background = targetGradient;
            
            // Also change the page colors behind it
            changeColors(colorScheme);
        }, 400);
        
        // Navigate after everything is complete
        setTimeout(() => {
            window.location.href = url;
        }, 2800);
    }, 50);
}

function changeColors(colorScheme) {
    const root = document.documentElement;
    
    // Create longer, smoother color transition animations
    root.style.transition = 'all 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    document.body.style.transition = 'background 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    // Apply new color scheme with smooth transition
    Object.entries(colorScheme).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Update the background gradient with smooth transition
    document.body.style.background = `linear-gradient(135deg, ${colorScheme['--cyan-dark'] || colorScheme['--twilight-dark']} 0%, ${colorScheme['--cyan-medium'] || colorScheme['--twilight-medium']} 100%)`;
    
    // Clean up transition styles after animation completes
    setTimeout(() => {
        root.style.transition = '';
        document.body.style.transition = '';
    }, 1800);
}

function resetTransitionState() {
    // Remove any existing transition overlays
    const existingOverlays = document.querySelectorAll('.transition-overlay');
    existingOverlays.forEach(overlay => overlay.remove());
    
    // Remove transition styles
    const transitionStyles = document.getElementById('transition-styles');
    if (transitionStyles) {
        transitionStyles.remove();
    }
    
    // Reset CSS custom properties to original values
    const root = document.documentElement;
    const originalColors = {
        '--cyan-dark': '#003f5c',
        '--cyan-medium': '#2f6690',
        '--cyan-light': '#84a9ac',
        '--lavender-purple': '#9b7cb6',
        '--diamond-pink': '#f8d7da',
        '--diamond-cream': '#fff8dc',
        '--text-light': '#f5f5f5',
        '--text-muted': '#d1c7d8',
        '--accent-glow': '#a388ee'
    };
    
    Object.entries(originalColors).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
    
    // Reset body background to original
    document.body.style.background = 'linear-gradient(135deg, var(--cyan-dark) 0%, var(--cyan-medium) 100%)';
}

// Also reset on page show event (handles back button better)
window.addEventListener('pageshow', (event) => {
    // If page is loaded from cache (back button), reset transition state
    if (event.persisted) {
        resetTransitionState();
    }
});
