// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

// Randomized, page-wide watercolor flower fall
const flowerField = document.getElementById('flower-field');
const flowerTypes = ['pink', 'blue', 'white', 'purple', 'yellow', 'coral', 'hydrangea', 'blossom'];

function createFlowerField() {
    if (!flowerField) return;

    flowerField.replaceChildren();
    const flowerCount = window.innerWidth <= 480 ? 3 : window.innerWidth <= 768 ? 4 : 5;
    const duration = 45;
    const randomEdgePosition = () => Math.random() < 0.5
        ? Math.random() * 14
        : 82 + Math.random() * 14;

    for (let index = 0; index < flowerCount; index += 1) {
        const type = flowerTypes[index % flowerTypes.length];
        const flower = document.createElement('img');
        const left = randomEdgePosition();
        const phaseDelay = -((index / flowerCount) * duration);

        flower.className = `flower flower--${type}`;
        flower.src = `assets/flowers/flower-${type}.png`;
        flower.alt = '';
        flower.style.setProperty('--flower-left', `${left.toFixed(1)}%`);
        flower.style.setProperty('--flower-size', `${Math.round(28 + Math.random() * 38)}px`);
        flower.style.setProperty('--flower-opacity', (0.25 + Math.random() * 0.3).toFixed(2));
        flower.style.setProperty('--flower-duration', `${duration}s`);
        flower.style.setProperty('--flower-delay', `${phaseDelay.toFixed(1)}s`);
        flower.style.setProperty('--flower-tilt', `${Math.round(-8 + Math.random() * 16)}deg`);
        flower.addEventListener('animationiteration', () => {
            flower.style.setProperty('--flower-left', `${randomEdgePosition().toFixed(1)}%`);
        });
        flowerField.appendChild(flower);
    }
}

createFlowerField();

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile nav when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Highlight the navigation item for the section currently in view
const sectionLinks = [...navLinks.querySelectorAll('a[href^="#"]')];
const trackedSections = sectionLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

function updateActiveNavigation() {
    const marker = window.scrollY + window.innerHeight * 0.35;
    let activeSection = null;

    trackedSections.forEach(section => {
        if (section.offsetTop <= marker) activeSection = section;
    });

    sectionLinks.forEach(link => {
        const isActive = activeSection && link.getAttribute('href') === `#${activeSection.id}`;
        link.classList.toggle('active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation, { passive: true });
window.addEventListener('resize', updateActiveNavigation);
updateActiveNavigation();

// Scroll-triggered fade-in animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll(
    '.research-item, .publication-item, .project-card, .timeline-item, .skill-category, .info-card, .contact-card'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Add visible class styles
const style = document.createElement('style');
style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(style);
