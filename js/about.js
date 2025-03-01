// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

// Observe all elements with scroll-animate class
document.querySelectorAll('.scroll-animate').forEach((el) => observer.observe(el));

// Initialize skill levels
document.querySelectorAll('.skill-level').forEach(skill => {
    const level = skill.getAttribute('data-level');
    setTimeout(() => {
        skill.style.width = `${level}%`;
    }, 500);
});

// Add mouse move effect for hobby cards
document.querySelectorAll('.hobby-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
    });
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.hobby-card, .fact-card, .quote-card');
const revealOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const revealCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    revealObserver.observe(el);
}); 