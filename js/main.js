/* ============================================
   PREMIUM CAR RENTAL - GSAP ANIMATIONS
   ============================================ */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ============================================
// DOM ELEMENTS
// ============================================
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const scrollTopBtn = document.getElementById('scrollTop');
const searchBtn = document.getElementById('searchBtn');

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeader() {
    let lastScroll = 0;

    window.addEventListener('scroll', { passive: true }, (e) => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');

        if (mobileMenu.classList.contains('active')) {
            icon.setAttribute('data-lucide', 'x');
        } else {
            icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
    });

    // Close menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.setAttribute('data-lucide', 'menu');
            lucide.createIcons();
        });
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// SCROLL TO TOP
// ============================================
function initScrollTop() {
    window.addEventListener('scroll', { passive: true }, () => {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(start + (target - start) * easeProgress);

        element.textContent = current + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

// ============================================
// HERO ANIMATIONS
// ============================================
function initHeroAnimations() {
    // Background Ken Burns effect
    // Background Ken Burns effect - Desktop Only
    if (window.innerWidth >= 1024) {
        gsap.to('.hero-bg-img', {
            scale: 1,
            duration: 8,
            ease: 'none'
        });
    } else {
        // Simple set for mobile to ensure visibility without animation overhead
        gsap.set('.hero-bg-img', { scale: 1 });
    }

    // Hero stats counter animation
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.stat-number').forEach(stat => {
                    const count = parseInt(stat.dataset.count);
                    const suffix = count >= 50 ? 'k+' : '+';
                    const displayCount = count >= 50 ? count : count;
                    animateCounter(stat, displayCount, suffix);
                });
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// ============================================
// ABOUT SECTION ANIMATIONS
// ============================================
function initAboutAnimations() {
    const aboutContent = document.querySelector('.about-content');
    const featureItems = document.querySelectorAll('.feature-item');
    const aboutStats = document.querySelectorAll('.about-stat');
    const verifiedBadge = document.querySelector('.verified-badge');

    // Main content reveal
    gsap.fromTo(aboutContent,
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.about',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Feature items stagger
    gsap.fromTo(featureItems,
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Stats counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                aboutStats.forEach((stat, index) => {
                    const numberEl = stat.querySelector('.about-stat-number');
                    const count = parseInt(numberEl.dataset.count);
                    const suffix = count >= 50 ? 'k+' : '+';
                    const displayCount = count >= 50 ? count : count;

                    gsap.fromTo(stat,
                        { opacity: 0, scale: 0.5 },
                        {
                            opacity: 1,
                            scale: 1,
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: 'expo.out',
                            onStart: () => {
                                animateCounter(numberEl, displayCount, suffix);
                            }
                        }
                    );
                });
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const aboutStatsSection = document.querySelector('.about-stats');
    if (aboutStatsSection) {
        statsObserver.observe(aboutStatsSection);
    }

    // Verified badge
    gsap.fromTo(verifiedBadge,
        { opacity: 0, scale: 0 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: '.about-images',
                start: 'top 60%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Image stack parallax
    gsap.to('.image-layer-1', {
        y: -30,
        scrollTrigger: {
            trigger: '.about-images',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
        }
    });

    gsap.to('.image-layer-2', {
        y: -50,
        scrollTrigger: {
            trigger: '.about-images',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5
        }
    });

    gsap.to('.image-layer-3', {
        y: -70,
        scrollTrigger: {
            trigger: '.about-images',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2
        }
    });
}

// ============================================
// SERVICES SECTION ANIMATIONS
// ============================================
function initServicesAnimations() {
    const serviceCards = document.querySelectorAll('.service-card');

    const isMobile = window.innerWidth < 1024;

    gsap.fromTo(serviceCards,
        {
            opacity: 0,
            rotateY: isMobile ? 0 : -90, // No 3D on mobile
            y: isMobile ? 30 : 0,        // Simple fade up on mobile
            transformPerspective: 1000
        },
        {
            opacity: 1,
            rotateY: 0,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.services-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// CAR SHOWCASE ANIMATIONS
// ============================================
function initCarShowcase() {
    const carTabs = document.querySelectorAll('.car-tab');
    const carThumbs = document.querySelectorAll('.car-thumb');
    const carImages = document.querySelectorAll('.car-image');
    const carDetails = document.querySelectorAll('.car-detail');

    // Tab switching
    carTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            carTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // Car selection
    carThumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            const carId = thumb.dataset.car;

            // Update thumbnails
            carThumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');

            // Update images with 3D flip
            carImages.forEach(img => {
                if (img.dataset.car === carId) {
                    if (window.innerWidth < 1024) {
                        // Simple fade for mobile
                        gsap.fromTo(img,
                            { opacity: 0, scale: 0.95 },
                            { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out' }
                        );
                    } else {
                        // Complex 3D flip for desktop
                        gsap.fromTo(img,
                            { opacity: 0, rotateY: 90, scale: 0.9 },
                            { opacity: 1, rotateY: 0, scale: 1, duration: 0.6, ease: 'expo.out' }
                        );
                    }
                    img.classList.add('active');
                } else {
                    if (window.innerWidth < 1024) {
                        // Simple hide for mobile
                        gsap.to(img, {
                            opacity: 0,
                            scale: 0.95,
                            duration: 0.3,
                            onComplete: () => img.classList.remove('active')
                        });
                    } else {
                        // Complex 3D hide for desktop
                        gsap.to(img, {
                            opacity: 0,
                            rotateY: -90,
                            scale: 0.9,
                            duration: 0.4,
                            ease: 'expo.in',
                            onComplete: () => {
                                img.classList.remove('active');
                            }
                        });
                    }
                }
            });

            // Update details
            carDetails.forEach(detail => {
                if (detail.dataset.car === carId) {
                    gsap.fromTo(detail,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, delay: 0.2, ease: 'expo.out' }
                    );
                    detail.classList.add('active');
                } else {
                    detail.classList.remove('active');
                }
            });
        });
    });

    // Entrance animation
    gsap.fromTo('.car-display',
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.car-showcase',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );

    gsap.fromTo('.car-details',
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            delay: 0.2,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.car-showcase',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Tabs entrance
    gsap.fromTo('.car-tab',
        { opacity: 0, y: -20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.car-tabs',
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// TESTIMONIALS CAROUSEL
// ============================================
function initTestimonials() {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let autoplayInterval;

    function goToSlide(index) {
        // Wrap around
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;

        currentSlide = index;

        // Update slides
        slides.forEach((slide, i) => {
            if (i === currentSlide) {
                gsap.fromTo(slide,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'expo.out' }
                );
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 6000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoplay();
        startAutoplay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoplay();
        startAutoplay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Start autoplay
    startAutoplay();

    // Entrance animation
    gsap.fromTo('.testimonial-slider',
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.testimonials',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// BLOG SECTION ANIMATIONS
// ============================================
function initBlogAnimations() {
    const blogCards = document.querySelectorAll('.blog-card');

    gsap.fromTo(blogCards,
        { opacity: 0, y: 60 },
        {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.blog-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// FAQ ACCORDION
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Entrance animations
    gsap.fromTo('.faq-header',
        { opacity: 0, x: -30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.faq',
                start: 'top 70%',
                toggleActions: 'play none none none'
            }
        }
    );

    gsap.fromTo(faqItems,
        { opacity: 0, x: 30 },
        {
            opacity: 1,
            x: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.faq-accordion',
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// FOOTER ANIMATIONS
// ============================================
function initFooterAnimations() {
    const footerBrand = document.querySelector('.footer-brand');
    const footerColumns = document.querySelectorAll('.footer-column');
    const socialLinks = document.querySelectorAll('.social-link');
    const footerLinks = document.querySelectorAll('.footer-links li');
    const footerBottom = document.querySelector('.footer-bottom');

    // Brand
    gsap.fromTo(footerBrand,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.footer',
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Columns
    gsap.fromTo(footerColumns,
        { opacity: 0, y: 20 },
        {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.footer-grid',
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Social links
    gsap.fromTo(socialLinks,
        { opacity: 0, scale: 0 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
                trigger: '.social-links',
                start: 'top 95%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Footer links
    gsap.fromTo(footerLinks,
        { opacity: 0, y: 10 },
        {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: '.footer-links',
                start: 'top 95%',
                toggleActions: 'play none none none'
            }
        }
    );

    // Bottom bar
    gsap.fromTo(footerBottom,
        { opacity: 0 },
        {
            opacity: 1,
            duration: 0.5,
            ease: 'smooth',
            scrollTrigger: {
                trigger: '.footer-bottom',
                start: 'top 98%',
                toggleActions: 'play none none none'
            }
        }
    );
}

// ============================================
// PARALLAX EFFECTS
// ============================================
function initParallax() {
    // Disable parallax on mobile/tablet to improve scrolling performance
    if (window.innerWidth < 1024) return;

    // Hero parallax
    gsap.to('.hero-bg-img', {
        y: 100,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        }
    });

    // Hero text parallax
    gsap.to('.hero-text', {
        y: -50,
        opacity: 0,
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: '50% top',
            scrub: 1
        }
    });
}

// ============================================
// SEARCH BUTTON
// ============================================
function initSearchButton() {
    searchBtn.addEventListener('click', () => {
        const carsSection = document.getElementById('cars');
        if (carsSection) {
            carsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ============================================
// FLEET SCROLL
// ============================================
function initFleetScroll() {
    const track = document.getElementById('fleetTrack');
    const prevBtn = document.getElementById('fleetPrev');
    const nextBtn = document.getElementById('fleetNext');

    if (!track || !prevBtn || !nextBtn) return;

    // Scroll amount = one card width + gap (approx 300px + 24px)
    const scrollAmount = 320;

    nextBtn.addEventListener('click', () => {
        track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
}

// ============================================
// GALLERY SECTION ANIMATIONS
// ============================================
function initGalleryAnimations() {
    const rows = document.querySelectorAll('.fleet-carousel-row');
    if (!rows.length) return;

    rows.forEach((row, i) => {
        gsap.from(row, {
            opacity: 0,
            x: i === 0 ? -60 : 60,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });
    });
}

// ============================================
// INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    lucide.createIcons();

    // Initialize all components
    initHeader();
    initMobileMenu();
    initSmoothScroll();
    initScrollTop();
    initHeroAnimations();
    initAboutAnimations();
    initServicesAnimations();
    initPricingAnimations(); // New Pricing Section
    initTestimonials();
    initBlogAnimations();
    initFAQ();
    initFooterAnimations();
    initParallax();
    initSearchButton();
    // initCarShowcase(); // Disabled old function
    initFleetScroll();
    initBookingForm();
    initGalleryAnimations();

    // Re-create icons for dynamically-added gallery elements
    lucide.createIcons();

    // Refresh ScrollTrigger on window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    });
});

// ============================================
// REDUCED MOTION SUPPORT
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.globalTimeline.timeScale(0);
    document.querySelectorAll('.floating-shape').forEach(el => {
        el.style.animation = 'none';
    });
}

// ============================================
// PRICING SECTION LOGIC
// ============================================
function togglePricing(type) {
    const buttons = document.querySelectorAll('.toggle-btn');
    const highlight = document.querySelector('.toggle-highlight');
    const outstationViews = document.querySelectorAll('.outstation-view');
    const localViews = document.querySelectorAll('.local-view');

    // Update buttons
    buttons.forEach(btn => {
        if (btn.dataset.type === type) {
            btn.classList.add('active');

            // Move highlight
            const btnRect = btn.getBoundingClientRect();
            const parentRect = btn.parentElement.getBoundingClientRect();
            const relativeX = btnRect.left - parentRect.left - 6; // 6px padding adjustment

            gsap.to(highlight, {
                x: relativeX,
                width: btnRect.width,
                duration: 0.5,
                ease: 'elastic.out(1, 0.7)'
            });
        } else {
            btn.classList.remove('active');
        }
    });

    // Content Toggle Animation
    if (type === 'outstation') {
        gsap.to(localViews, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                localViews.forEach(v => {
                    v.classList.remove('active');
                    v.style.visibility = 'hidden';
                });

                outstationViews.forEach(v => {
                    v.classList.add('active');
                    v.style.visibility = 'visible';
                });

                gsap.fromTo(outstationViews,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
                );
            }
        });
    } else {
        gsap.to(outstationViews, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                outstationViews.forEach(v => {
                    v.classList.remove('active');
                    v.style.visibility = 'hidden';
                });

                localViews.forEach(v => {
                    v.classList.add('active');
                    v.style.visibility = 'visible';
                });

                gsap.fromTo(localViews,
                    { y: -20, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
                );
            }
        });
    }
}
window.togglePricing = togglePricing;

function initPricingAnimations() {
    // Initial Highlight Position
    setTimeout(() => {
        const activeBtn = document.querySelector('.toggle-btn.active');
        const highlight = document.querySelector('.toggle-highlight');

        if (activeBtn && highlight) {
            gsap.set(highlight, {
                width: activeBtn.offsetWidth,
                x: 0
            });
        }
    }, 100);

    const isMobile = window.innerWidth <= 1024;
    const cards = document.querySelectorAll('.pricing-card');
    const pricingGrid = document.querySelector('.pricing-grid');
    const pricingSection = document.querySelector('.pricing-section');

    if (isMobile && pricingGrid && pricingSection) {
        // Mobile GSAP Horizontal Scroll
        window.addEventListener("load", () => {
            ScrollTrigger.refresh();

            let updateGridWidth = () => {
                return pricingGrid.scrollWidth - window.innerWidth + 48; // Account for padding
            };

            gsap.to(pricingGrid, {
                x: () => -updateGridWidth(),
                ease: "none",
                scrollTrigger: {
                    trigger: pricingSection,
                    start: "top top",
                    end: () => "+=" + updateGridWidth(),
                    pin: true,
                    scrub: 1,
                    markers: true, // Temporary markers for debugging
                    invalidateOnRefresh: true,
                }
            });
        });

    } else {
        // Desktop Grid Stagger (Original)
        gsap.fromTo(cards,
            {
                y: 60,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'expo.out',
                scrollTrigger: {
                    trigger: '.pricing-grid',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }
}

// ============================================
// BOOKING FORM HANDLER (WHATSAPP)
// ============================================
function initBookingForm() {
    const form = document.getElementById('bookingForm');

    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validation check for phone number
        const phoneInput = form.querySelector('input[name="phone_number"]');
        if (!phoneInput.value) {
            alert('Please enter your phone number.');
            return;
        }

        // Collect data
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => data[key] = value);

        // Format Date
        const dateObj = new Date(data.travel_date);
        const formattedDate = dateObj.toLocaleDateString('en-IN', {
            day: 'numeric', month: 'short', year: 'numeric'
        });

        // Construct WhatsApp Message
        const message = `*New Booking Request* 🚖%0a` +
            `---------------------------%0a` +
            `👤 *Name:* ${data.from_name}%0a` +
            `📱 *Phone:* ${data.phone_number}%0a` +
            `📍 *From:* ${data.pickup_location}%0a` +
            `📍 *To:* ${data.drop_location}%0a` +
            `📅 *Date:* ${formattedDate}%0a` +
            `🚗 *Vehicle:* ${data.vehicle_type.toUpperCase()}%0a` +
            `---------------------------%0a` +
            `Please confirm availability.`;

        // WhatsApp API URL
        const whatsappNumber = "917892544837";
        const url = `https://wa.me/${whatsappNumber}?text=${message}`;

        // Open WhatsApp
        window.open(url, '_blank');

        // Optional: Reset form after a delay
        setTimeout(() => {
            form.reset();
        }, 1000);
    });
}
