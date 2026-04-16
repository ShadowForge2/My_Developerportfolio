// Premium Web3 Portfolio - Advanced JavaScript
// Initialize GSAP and register plugins
gsap.registerPlugin(ScrollTrigger);

// Global variables
let isAnimating = false;
const cursor = document.querySelector('.custom-cursor');
const particlesContainer = document.getElementById('particles');

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    
    // GSAP animation for mobile menu
    if (navMenu.classList.contains('active')) {
        gsap.from('.nav-item', {
            opacity: 0,
            y: -20,
            duration: 0.5,
            stagger: 0.1,
            ease: 'power2.out'
        });
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Premium Custom Cursor
if (cursor && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-circle, .stat-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Particle System
function createParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Premium Smooth Scrolling with GSAP
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            gsap.to(window, {
                duration: 1.5,
                scrollTo: { y: offsetTop, autoKill: false },
                ease: 'power2.inOut'
            });
        }
    });
});

// Premium GSAP Scroll Animations
function initScrollAnimations() {
    // Hero section animations
    gsap.from('.hero-badge', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.gradient-text', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.4,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.6,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-description', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-buttons', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.hero-stats', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.2,
        ease: 'power3.out'
    });
    
    // Profile image animation
    gsap.from('.profile-glow', {
        opacity: 0,
        scale: 0.8,
        duration: 1.5,
        delay: 0.6,
        ease: 'elastic.out(1, 0.5)'
    });
    
    // Floating elements animation
    gsap.from('.float-element', {
        opacity: 0,
        scale: 0,
        duration: 1,
        delay: 1.5,
        stagger: 0.2,
        ease: 'back.out(1.7)'
    });
    
    // Section animations with ScrollTrigger
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section.children, {
            opacity: 0,
            y: 50,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            ease: 'power2.out'
        });
    });
    
    // Skills circular progress animation
    const skillCircles = document.querySelectorAll('.skill-progress-circle');
    skillCircles.forEach((circle, index) => {
        const progress = circle.getAttribute('data-progress');
        const circumference = 2 * Math.PI * 45;
        const offset = circumference - (progress / 100) * circumference;
        
        ScrollTrigger.create({
            trigger: circle.closest('.skills'),
            start: 'top 70%',
            onEnter: () => {
                gsap.to(circle, {
                    strokeDashoffset: offset,
                    duration: 2,
                    delay: index * 0.1,
                    ease: 'power2.out'
                });
            }
        });
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach((number, index) => {
        const target = parseInt(number.getAttribute('data-target'));
        
        ScrollTrigger.create({
            trigger: number.closest('.stats'),
            start: 'top 70%',
            onEnter: () => {
                animateCounter(number, target, index * 0.2);
            }
        });
    });
    
    // Project cards stagger animation
    gsap.utils.toArray('.project-card').forEach((card, index) => {
        gsap.from(card, {
            opacity: 0,
            y: 50,
            scale: 0.9,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            ease: 'back.out(1.7)'
        });
    });
}

// Counter animation function
function animateCounter(element, target, delay = 0) {
    gsap.fromTo(element, 
        { textContent: 0 },
        { 
            textContent: target,
            duration: 2,
            delay: delay,
            ease: 'power2.out',
            snap: { textContent: 1 },
            onUpdate: function() {
                element.textContent = Math.ceil(element.textContent);
            }
        }
    );
}

// Project filtering functionality
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: 'power2.out',
                        onStart: () => {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        ease: 'power2.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Parallax effect for hero section
function initParallax() {
    gsap.to('.hero', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
    
    // Parallax for floating elements
    gsap.to('.float-element', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });
}

// Magnetic effect for buttons
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .project-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            gsap.to(button, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)'
            });
        });
    });
}

// Gradient blob animation
function initBlobAnimation() {
    const blobs = document.querySelectorAll('.gradient-blob');
    
    blobs.forEach((blob, index) => {
        gsap.to(blob, {
            x: 'random(-100, 100)',
            y: 'random(-100, 100)',
            duration: 'random(15, 25)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 2
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initProjectFilters();
    initParallax();
    initMagneticButtons();
    initBlobAnimation();
    
    // Add loading animation
    gsap.from('body', {
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    });
});

// Enhanced navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        toggleClass: { className: 'scrolled', targets: navbar }
    });
    
    // Add scrolled class styling
    gsap.set(navbar, { 
        background: 'rgba(15, 23, 42, 0.4)',
        backdropFilter: 'blur(20px)'
    });
}

// Initialize navbar scroll
initNavbarScroll();

// Premium typing effect for hero title
function typeWriter() {
    const text = "Bashir Abdulganiyy";
    const element = document.querySelector('.typing-text');
    if (!element) return;
    
    element.textContent = '';
    let i = 0;
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, 80);
        }
    }
    
    setTimeout(type, 800);
}

// Initialize typing effect
typeWriter();

// Premium navbar active section highlighting
function initActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
            const current = sections[self.direction === 1 ? Math.floor(self.progress * sections.length) : Math.ceil(self.progress * sections.length)];
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Initialize active section tracking
initActiveSection();

// Enhanced form interactions
function initFormInteractions() {
    const form = document.querySelector('.contact-form');
    const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            gsap.to(input.parentElement, {
                scale: 1.02,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        input.addEventListener('blur', () => {
            gsap.to(input.parentElement, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animate submit button
            const submitBtn = form.querySelector('.submit-btn');
            gsap.to(submitBtn, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    showNotification('Message sent successfully! I\'ll get back to you soon.');
                    form.reset();
                }
            });
        });
    }
}

// Initialize form interactions
initFormInteractions();

// Premium project button interactions
function initProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const projectTitle = button.closest('.project-card').querySelector('.project-title').textContent;
            const isPrimary = button.classList.contains('primary');
            
            if (isPrimary) {
                showNotification(`Opening ${projectTitle}... (Demo - no actual project link)`);
            } else {
                showNotification(`Viewing ${projectTitle} on GitHub... (Demo - no actual link)`);
            }
            
            // Button animation
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

// Initialize project buttons
initProjectButtons();

// Enhanced notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        background: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(56, 189, 248, 0.4);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
        font-weight: 500;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    gsap.to(notification, {
        x: 0,
        duration: 0.5,
        ease: 'back.out(1.7)',
        delay: 0.1
    });
    
    // Remove after 4 seconds
    setTimeout(() => {
        gsap.to(notification, {
            x: 400,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                document.body.removeChild(notification);
            }
        });
    }, 4000);
}

// Social media link interactions
function initSocialLinks() {
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'contact-ripple';
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = link.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.marginLeft = -size / 2 + 'px';
            ripple.style.marginTop = -size / 2 + 'px';
            
            link.style.position = 'relative';
            link.appendChild(ripple);
            
            setTimeout(() => {
                if (link.contains(ripple)) {
                    link.removeChild(ripple);
                }
            }, 600);
            
            // Show brief notification then let link redirect
            showNotification('Opening social link...');
        });
    });
}

// Initialize social links
initSocialLinks();

// Enhanced contact button interactions
function initContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn, .quick-contact-btn, .floating-whatsapp');
    
    contactButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            createRipple(e, button);
            
            // Track contact method (for analytics if needed)
            const contactType = button.classList.contains('whatsapp-btn') || button.classList.contains('whatsapp-quick') || button.classList.contains('floating-whatsapp') ? 'whatsapp' : 'email';
            console.log(`Contact initiated via: ${contactType}`);
        });
    });
}

// Create ripple effect for buttons
function createRipple(event, button) {
    const ripple = document.createElement('div');
    ripple.className = 'contact-ripple';
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
        pointer-events: none;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
    `;
    
    button.style.position = 'relative';
    button.appendChild(ripple);
    
    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
        }
    }, 600);
}

// Initialize contact buttons
initContactButtons();


// Premium performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let ticking = false;
    function updateAnimations() {
        if (!ticking) {
            requestAnimationFrame(() => {
                // Update any scroll-based animations here
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', updateAnimations);
    
    // Lazy load images when they come into view
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
        ScrollTrigger.create({
            trigger: img,
            start: 'top 80%',
            onEnter: () => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    });
}

// Initialize performance optimizations
optimizePerformance();

// Console welcome message
console.log('%c 🚀 Premium Web3 Portfolio by Bashir Abdulganiyy', 'background: linear-gradient(135deg, #38bdf8 0%, #6366f1 100%); color: white; font-size: 16px; font-weight: bold; padding: 15px; border-radius: 8px;');
console.log('%c Built with GSAP, Glassmorphism, and Premium Animations', 'color: #38bdf8; font-size: 12px;');

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Mouse Move Effect for Profile Image
document.querySelector('.profile-glow')?.addEventListener('mousemove', (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;
    
    e.currentTarget.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
});

document.querySelector('.profile-glow')?.addEventListener('mouseleave', (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
});

// Loading Animation - Fixed for mobile
window.addEventListener('load', () => {
    // Check if mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
        // Only apply loading animation on desktop
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    } else {
        // Ensure content is immediately visible on mobile
        document.body.style.opacity = '1';
        document.body.style.visibility = 'visible';
    }
});

// Console Welcome Message
console.log('%c Welcome to Bashir Abdulganiyy Portfolio! ', 'background: #38bdf8; color: #0f172a; font-size: 16px; font-weight: bold; padding: 10px; border-radius: 5px;');
