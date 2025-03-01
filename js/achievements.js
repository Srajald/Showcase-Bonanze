document.addEventListener('DOMContentLoaded', () => {
    // Initialize intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Ensure the element becomes visible
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '20px'
    });

    // Observe all animated elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Make sure all cards are visible initially if needed
    setTimeout(() => {
        document.querySelectorAll('.achievement-card').forEach(card => {
            card.style.opacity = '1';
        });
    }, 100);

    // Add hover effects for achievement cards
    document.querySelectorAll('.achievement-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / card.clientWidth) * 100;
            const y = ((e.clientY - rect.top) / card.clientHeight) * 100;
            
            card.style.setProperty('--x', `${x}%`);
            card.style.setProperty('--y', `${y}%`);
        });
    });

    // Add floating animation to badges
    document.querySelectorAll('.badge img').forEach((badge, index) => {
        badge.style.animationDelay = `${index * 0.2}s`;
    });

    // Add click handler for verify buttons
    document.querySelectorAll('.verify-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Add verification logic here
            alert('Redirecting to verification page...');
        });
    });
}); 