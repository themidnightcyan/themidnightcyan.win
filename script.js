// Loading screen functionality
document.addEventListener('DOMContentLoaded', () => {
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
});
