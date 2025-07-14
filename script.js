document.querySelectorAll('.nav-item').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Only add event listener if #contact-form exists
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Form submitted! This is a demo, so no actual data is sent.');
    });
}

// Typewriter effect for Home section
function typeWriterEffect(elementId, text, delay = 60, callback) {
    const el = document.getElementById(elementId);
    el.textContent = '';
    el.style.width = '0';
    let i = 0;
    function type() {
        if (i <= text.length) {
            el.textContent = text.substring(0, i);
            el.style.width = i + 'ch';
            i++;
            setTimeout(type, delay);
        } else if (callback) {
            callback();
        }
    }
    type();
}

// Unified Timeline Functionality
function toggleTimelineItem(itemId) {
    const item = document.querySelector(`[data-company="${itemId}"]`);
    const isExpanded = item.classList.contains('expanded');
    
    // Close all other timeline items
    document.querySelectorAll('.unified-timeline .timeline-item').forEach(ti => {
        ti.classList.remove('expanded');
    });
    
    // Toggle current item
    if (!isExpanded) {
        item.classList.add('expanded');
        // Smooth scroll to the expanded item
        setTimeout(() => {
            item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
}

// Setup unified timeline interactions
function setupUnifiedTimeline() {
    const timelineItems = document.querySelectorAll('.unified-timeline .timeline-item');
    
    timelineItems.forEach(item => {
        const header = item.querySelector('.timeline-header');
        const expandBtn = item.querySelector('.expand-btn');
        
        // Add click handler to header (excluding expand button)
        header.addEventListener('click', function(e) {
            if (e.target !== expandBtn && !expandBtn.contains(e.target)) {
                const itemId = item.getAttribute('data-company');
                toggleTimelineItem(itemId);
            }
        });
        
        // Add hover effects
        item.addEventListener('mouseenter', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateX(5px)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (!this.classList.contains('expanded')) {
                this.style.transform = 'translateX(0)';
            }
        });
    });
}

// Enhanced scrollspy for unified timeline
function setupUnifiedTimelineScrollspy() {
    const timelineSection = document.getElementById('projects');
    const timelineItems = document.querySelectorAll('.unified-timeline .timeline-item');
    
    if (!timelineSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation to timeline items when section comes into view
                timelineItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(timelineSection);
}

// Initialize unified timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }

    // Typewriter effect: name and 'I'm' are static, only designation is animated
    const nameEl = document.getElementById('typewriter-name');
    const titleEl = document.getElementById('typewriter-title');
    const nameText = "Rahul Shivhare";
    const staticIm = "I'm ";
    const designations = [
        "DevOps Engineer",
        "DataOps Engineer",
        "MLOps Engineer"
    ];
    let designationIndex = 0;
    let desigCharIndex = 0;
    let typingDesignation = true;
    let deletingDesignation = false;
    let cursorSpan = '<span class="typewriter-cursor">|</span>';
    let typingSpeed = 100;
    let pauseAfterTyping = 1200;
    let pauseAfterDeleting = 400;

    // Set static name and I'm
    nameEl.textContent = nameText;
    titleEl.textContent = staticIm;

    function typeDesignation() {
        const currentDesignation = designations[designationIndex];
        if (typingDesignation) {
            if (desigCharIndex < currentDesignation.length) {
                titleEl.innerHTML = staticIm +
                    '<span class="designation-underline">' +
                    currentDesignation.substring(0, desigCharIndex) +
                    (desigCharIndex < currentDesignation.length ? currentDesignation[desigCharIndex] : '') +
                    '</span>' + cursorSpan;
                desigCharIndex++;
                setTimeout(typeDesignation, typingSpeed);
            } else {
                // At the end, show the full string with no cursor
                titleEl.innerHTML = staticIm +
                    '<span class="designation-underline">' +
                    currentDesignation +
                    '</span>';
                typingDesignation = false;
                setTimeout(typeDesignation, pauseAfterTyping);
            }
        } else if (deletingDesignation) {
            if (desigCharIndex > 0) {
                titleEl.innerHTML = staticIm +
                    '<span class="designation-underline">' +
                    currentDesignation.substring(0, desigCharIndex - 1) +
                    '</span>' + cursorSpan;
                desigCharIndex--;
                setTimeout(typeDesignation, typingSpeed / 2);
            } else {
                deletingDesignation = false;
                designationIndex = (designationIndex + 1) % designations.length;
                typingDesignation = true;
                setTimeout(typeDesignation, pauseAfterDeleting);
            }
        } else {
            // Pause before deleting
            deletingDesignation = true;
            setTimeout(typeDesignation, pauseAfterTyping);
        }
    }

    typeDesignation();

    // Fade-in animation for other sections
    const fadeIns = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeIns.forEach(element => {
        if (element && element instanceof Node) {
            element.dataset.delay = (Math.random() * 0.3).toFixed(2);
            observer.observe(element);
        }
    });

    // Highlight active nav item on click
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Robust Scrollspy: highlight nav item on scroll using getBoundingClientRect
    const sectionIds = Array.from(navLinks).map(link => link.getAttribute('href'));
    const sections = sectionIds.map(id => document.querySelector(id));

    function onScrollSpy() {
        let activeIndex = 0;
        let found = false;
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            if (section) {
                const rect = section.getBoundingClientRect();
                // Section top is at or above 120px from top, and section bottom is below 120px
                if (rect.top <= 120 && rect.bottom > 120) {
                    activeIndex = i;
                    found = true;
                    break;
                }
            }
        }
        // If at the bottom of the page, always highlight the last section
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 2) {
            activeIndex = sections.length - 1;
            found = true;
        }
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLinks[activeIndex]) navLinks[activeIndex].classList.add('active');
    }

    window.addEventListener('scroll', onScrollSpy);
    onScrollSpy(); // Run on load

    // Setup unified timeline
    setupUnifiedTimeline();
    setupUnifiedTimelineScrollspy();
    
    // Add initial styles for timeline items
    const timelineItems = document.querySelectorAll('.unified-timeline .timeline-item');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close all expanded timeline items when Escape is pressed
            document.querySelectorAll('.unified-timeline .timeline-item.expanded').forEach(item => {
                item.classList.remove('expanded');
            });
        }
    });
    
    // Add smooth reveal animation for timeline items
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                timelineObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        timelineObserver.observe(item);
    });
});

// Add hover effects for tech tags in timeline
function setupTimelineTechTagHoverEffects() {
    const techTags = document.querySelectorAll('.unified-timeline .tech-tag');
    techTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize tech tag effects for timeline
document.addEventListener('DOMContentLoaded', () => {
    setupTimelineTechTagHoverEffects();
});
