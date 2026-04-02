/* ===================================================
   PORTFOLIO - Main JavaScript
   =================================================== */

// ========== SCROLL REVEAL ==========
const scrollRevealElements = document.querySelectorAll('.scroll-reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
    }
);

scrollRevealElements.forEach((el) => revealObserver.observe(el));

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('dock-theme-toggle');
const sunIcon = themeToggle.querySelector('.sun-icon');
const moonIcon = themeToggle.querySelector('.moon-icon');

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);

    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

// Load saved theme or default to light
const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ========== DOCK ACTIVE STATE ==========
const dockHome = document.getElementById('dock-home');
const sections = document.querySelectorAll('.section, .hero');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && entry.target.classList.contains('hero')) {
                dockHome.classList.add('active');
            }
        });
    },
    { threshold: 0.3 }
);

sections.forEach((section) => sectionObserver.observe(section));

// ========== SMOOTH SCROLL FOR DOCK LINKS ==========
document.querySelectorAll('.dock-item[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ========== PARALLAX SUBTLE EFFECT ON AVATAR ==========
const avatar = document.querySelector('.hero-avatar');
if (avatar) {
    window.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 60;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 60;
        avatar.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
    });

    window.addEventListener('mouseleave', () => {
        avatar.style.transform = 'translate(0, 0)';
    });
}

// ========== DOCK HOVER MAGNIFICATION ==========
const dockItems = document.querySelectorAll('.dock-item');

dockItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
        dockItems.forEach((sibling) => {
            const distance = Math.abs(
                Array.from(dockItems).indexOf(item) -
                Array.from(dockItems).indexOf(sibling)
            );
            if (distance === 0) {
                sibling.style.transform = 'translateY(-4px) scale(1.15)';
            } else if (distance === 1) {
                sibling.style.transform = 'scale(1.05)';
            } else {
                sibling.style.transform = 'scale(1)';
            }
        });
    });
});

document.querySelector('.dock').addEventListener('mouseleave', () => {
    dockItems.forEach((item) => {
        item.style.transform = '';
    });
});

// ========== SKILL ANIMATION PAUSE ON HOVER (touch devices) ==========
const skillTracks = document.querySelectorAll('.skills-track');
skillTracks.forEach((track) => {
    track.addEventListener('touchstart', () => {
        track.style.animationPlayState = 'paused';
    });
    track.addEventListener('touchend', () => {
        track.style.animationPlayState = 'running';
    });
});
