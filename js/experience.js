// Scroll reveal animation
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.timeline-item').forEach((el) => observer.observe(el));

// Add this to your existing JavaScript
document.querySelectorAll('.education-card').forEach((card, index) => {
    card.style.setProperty('--i', index);
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
    });
});

// Enhanced scroll animations
const scrollElements = document.querySelectorAll('.scroll-animate');
const scrollOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const scrollCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
        }
    });
};

const scrollObserver = new IntersectionObserver(scrollCallback, scrollOptions);
scrollElements.forEach(el => {
    el.style.transform = 'translateY(30px)';
    el.style.opacity = '0';
    el.style.transition = 'all 0.6s ease-out';
    scrollObserver.observe(el);
});

// Add smooth reveal animations with different delays
document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Add parallax effect to hero section
const hero = document.querySelector('.experience-hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
});

// Enhanced hover effects for cards
document.querySelectorAll('.experience-card, .education-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
        
        // Update gradient position
        card.style.setProperty('--x', `${x}%`);
        card.style.setProperty('--y', `${y}%`);
        
        // Add subtle rotation
        const rotateX = (y - 50) * 0.1;
        const rotateY = (x - 50) * 0.1;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Add scroll progress indicator
const addScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progress.style.width = `${scrolled}%`;
    });
};

addScrollProgress();

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 