document.addEventListener('DOMContentLoaded', () => {
    // Skill Card Hover Effect
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        });
    });

    // Animate Progress Bars on Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-level .progress').forEach(progress => {
        observer.observe(progress);
    });

    // Scroll reveal animation
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.skill-category').forEach((el) => scrollObserver.observe(el));

    // Add hover effect for skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / item.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / item.clientHeight) * 100;
            
            item.style.setProperty('--x', `${x}%`);
            item.style.setProperty('--y', `${y}%`);
        });
    });

    // Add floating animation to categories
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.animationDelay = `${index * 0.2}s`;
    });
}); 