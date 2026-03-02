/* ═══════════════════════════════════════════════
   PORTFOLIO — Yogesh Bandekar
   Interactive Scripts
   ═══════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── Typing Effect ───────────────────────────
    const roles = [
        'Senior Software Engineer',
        'Cloud Migration Expert',
        'Production Support Specialist',
        'DevOps Practitioner',
        'Database & SQL Expert'
    ];

    const typingEl = document.getElementById('typingText');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingEl.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // pause at end
            } else {
                typingSpeed = 80;
            }
        } else {
            typingEl.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 400; // pause before new word
            } else {
                typingSpeed = 40;
            }
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();


    // ── Navbar Scroll Effect ────────────────────
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });


    // ── Mobile Hamburger Menu ───────────────────
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });


    // ── Active Nav Link on Scroll ───────────────
    const sections = document.querySelectorAll('section[id]');
    const allNavLinks = document.querySelectorAll('.nav-link');

    function highlightNav() {
        const scrollY = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                allNavLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });


    // ── Scroll Reveal (Intersection Observer) ───
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // ── Counter Animation ───────────────────────
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 40;
        const duration = 1500;
        const stepTime = duration / 40;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, stepTime);
    }


    // ── Smooth Scroll for anchor links ──────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Email Obfuscation ───────────────────────
    // Email is base64-encoded in data attributes to prevent bot scraping
    const emailLinks = document.querySelectorAll('.email-link');

    emailLinks.forEach(link => {
        const encoded = link.getAttribute('data-email');
        if (!encoded) return;

        const decoded = atob(encoded);

        // Set the mailto href
        link.setAttribute('href', 'mailto:' + decoded);

        // If contact card, show email text on hover
        const emailText = link.querySelector('.email-text');
        if (emailText) {
            emailText.textContent = decoded;
        }
    });

});
