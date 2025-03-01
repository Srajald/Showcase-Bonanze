// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
    darkModeToggle.checked = savedTheme === 'dark';
}

// Mobile menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Scroll reveal animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.85) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
window.addEventListener('load', scrollReveal);

// Typing animation for hero section
const phrases = [
    "Software Engineer",
    "Full Stack Developer",
    "AI/ML Enthusiast",
    "Problem Solver"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let deletingDelay = 50;
let newPhraseDelay = 2000;

function typeText() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;

    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        charIndex--;
        typingDelay = deletingDelay;
    } else {
        charIndex++;
        typingDelay = 100;
    }
    
    typedTextElement.textContent = currentPhrase.substring(0, charIndex);
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingDelay = newPhraseDelay;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    
    setTimeout(typeText, typingDelay);
}

// Initialize typing animation
document.addEventListener('DOMContentLoaded', () => {
    typeText(); // This will start the typing animation
    
    // Fade in the hero content
    setTimeout(() => {
        document.querySelector('.hero-content').style.opacity = '1';
        document.querySelector('.hero-content').style.transform = 'translateY(0)';
    }, 500);
});

// Smooth scroll behavior for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Skills progress bar animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
};

// Contact form handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        // Add your form submission logic here
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        alert('Failed to send message. Please try again.');
    } finally {
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
});

// Particle background effect
const createParticles = () => {
    const particles = document.createElement('div');
    particles.className = 'particles';
    document.body.appendChild(particles);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        particles.appendChild(particle);
    }
};

// Project preview modal
const createProjectModal = (project) => {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${project.title}</h2>
            <div class="project-preview">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-details">
                <p>${project.description}</p>
                <div class="tech-stack">${project.techStack}</div>
                <div class="project-links">
                    <a href="${project.demo}" target="_blank">Live Demo</a>
                    <a href="${project.github}" target="_blank">GitHub</a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);

    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
};

// Gallery preview functionality
const initGallery = () => {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const projectData = getProjectData(projectId); // Create this function
            createProjectModal(projectData);
        });
    });
};

// Blog functionality
const initBlog = () => {
    document.querySelectorAll('.read-more').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const blogPost = {
                title: link.closest('.blog-card').querySelector('h3').textContent,
                content: 'Full blog post content goes here...',
                date: link.closest('.blog-card').querySelector('.blog-date').textContent
            };
            createBlogModal(blogPost);
        });
    });
};

// Create blog post modal
const createBlogModal = (post) => {
    const modal = document.createElement('div');
    modal.className = 'modal blog-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <div class="blog-post">
                <h2>${post.title}</h2>
                <div class="blog-meta">${post.date}</div>
                <div class="blog-body">${post.content}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
    
    modal.querySelector('.modal-close').addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
};

// Enhanced scroll animations
const initScrollAnimations = () => {
    const options = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.dataset.animation) {
                    entry.target.classList.add(entry.target.dataset.animation);
                }
            }
        });
    }, options);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });
};

// Scroll progress indicator
const createScrollProgress = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.transform = `scaleX(${scrolled / 100})`;
    });
};

// Enhanced project gallery with lightbox
const initEnhancedGallery = () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const img = item.querySelector('img').cloneNode(true);
            lightbox.appendChild(img);
            
            lightbox.addEventListener('click', () => {
                lightbox.classList.add('fade-out');
                setTimeout(() => lightbox.remove(), 300);
            });
            
            document.body.appendChild(lightbox);
            setTimeout(() => lightbox.classList.add('active'), 50);
        });
    });
};

// Newsletter form handling
const initNewsletterForm = () => {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('input').value;
            const button = form.querySelector('button');
            
            button.textContent = 'Subscribing...';
            button.disabled = true;
            
            try {
                // Add your newsletter subscription logic here
                await new Promise(resolve => setTimeout(resolve, 1000));
                showNotification('Successfully subscribed!', 'success');
                form.reset();
            } catch (error) {
                showNotification('Failed to subscribe. Please try again.', 'error');
            } finally {
                button.textContent = 'Subscribe';
                button.disabled = false;
            }
        });
    }
};

// Notification system
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// 3D card effect
const init3DCards = () => {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
};

// Skill progress animation
const initSkillsAnimation = () => {
    const skillCards = document.querySelectorAll('.skill-category-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-progress').forEach(progress => {
                    progress.style.setProperty('--progress', progress.style.getPropertyValue('--progress'));
                });
            }
        });
    }, { threshold: 0.5 });

    skillCards.forEach(card => observer.observe(card));
};

// Testimonial carousel
const initTestimonialCarousel = () => {
    const testimonials = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.opacity = i === index ? '1' : '0';
            testimonial.style.transform = i === index ? 'scale(1)' : 'scale(0.9)';
        });
    };

    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);
};

// Enhanced mobile menu
const initMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    const body = document.body;

    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            body.style.overflow = '';
        }
    });
};

// Project filter system
const initProjectFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filter = btn.dataset.filter;
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                    project.classList.add('scale-animation');
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
};

// Loading animation
const initLoading = () => {
    const loader = document.querySelector('.loading-overlay');
    
    // Show loading animation
    document.body.style.overflow = 'hidden';
    
    // Hide loading animation after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            document.body.style.overflow = '';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1000);
    });
};

// Scroll to top button
const initScrollToTop = () => {
    const scrollBtn = document.getElementById('scrollToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Timeline animation
const initTimelineAnimation = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.5 });
    
    timelineItems.forEach(item => observer.observe(item));
};

// Enhanced scroll animations
const initEnhancedScrollAnimations = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(entry.target.dataset.aos);
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
};

// Skills Radar Chart
const initSkillsRadar = () => {
    const ctx = document.getElementById('skillsRadar').getContext('2d');
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Frontend', 'Backend', 'AI/ML', 'DevOps', 'Database', 'Problem Solving'],
            datasets: [{
                label: 'Skills Proficiency',
                data: [90, 85, 95, 80, 85, 90],
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderColor: 'rgba(37, 99, 235, 1)',
                pointBackgroundColor: 'rgba(37, 99, 235, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
            }]
        },
        options: {
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 14,
                            family: 'Inter'
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        stepSize: 20
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
};

// Enhanced Project Preview
const createEnhancedProjectModal = (project) => {
    const modal = document.createElement('div');
    modal.className = 'project-preview-modal';
    modal.innerHTML = `
        <div class="project-preview-content">
            <div class="project-preview-header">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-preview-info">
                <h2>${project.title}</h2>
                <p class="tech-stack">${project.techStack}</p>
                <p class="description">${project.description}</p>
                <div class="project-preview-gallery">
                    ${project.gallery.map(img => `
                        <div class="preview-gallery-item">
                            <img src="${img}" alt="Project preview">
                        </div>
                    `).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" target="_blank" class="btn">Live Demo</a>
                    <a href="${project.github}" target="_blank" class="btn">GitHub</a>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.querySelector('.project-preview-content').style.transform = 'scale(1)';
    }, 10);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            modal.querySelector('.project-preview-content').style.transform = 'scale(0.9)';
            setTimeout(() => modal.remove(), 300);
        }
    });
};

// Form Validation
const initFormValidation = () => {
    const form = document.getElementById('contactForm');
    const fields = {
        name: {
            regex: /^[a-zA-Z\s]{2,30}$/,
            message: 'Please enter a valid name (2-30 characters)'
        },
        email: {
            regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address'
        },
        subject: {
            regex: /^.{5,100}$/,
            message: 'Subject must be between 5 and 100 characters'
        },
        message: {
            regex: /^[\s\S]{10,500}$/,
            message: 'Message must be between 10 and 500 characters'
        }
    };

    const validateField = (input, field) => {
        const value = input.value.trim();
        const formGroup = input.closest('.form-group');
        const regex = fields[field].regex;
        
        if (!regex.test(value)) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            formGroup.querySelector('.error-message').textContent = fields[field].message;
            return false;
        }
        
        formGroup.classList.remove('error');
        formGroup.classList.add('success');
        return true;
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        Object.keys(fields).forEach(field => {
            const input = form.querySelector(`[name="${field}"]`);
            if (!validateField(input, field)) {
                isValid = false;
            }
        });

        if (isValid) {
            // Submit form
            submitForm(form);
        }
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input, input.name);
        });
    });
};

// Custom cursor
const initCustomCursor = () => {
    const cursor = document.createElement('div');
    const follower = document.createElement('div');
    cursor.className = 'cursor';
    follower.className = 'cursor-follower';
    document.body.appendChild(cursor);
    document.body.appendChild(follower);

    let posX = 0, posY = 0;
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Add hover effect on interactive elements
        const target = e.target;
        if (target.tagName === 'A' || target.tagName === 'BUTTON' || 
            target.classList.contains('project-card') || 
            target.classList.contains('skill-category-card')) {
            cursor.style.transform = 'scale(1.5)';
            follower.style.transform = 'scale(0.5)';
        } else {
            cursor.style.transform = 'scale(1)';
            follower.style.transform = 'scale(1)';
        }
    });

    function loop() {
        posX += (mouseX - posX) * 0.1;
        posY += (mouseY - posY) * 0.1;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
        follower.style.left = `${posX - 4}px`;
        follower.style.top = `${posY - 4}px`;

        requestAnimationFrame(loop);
    }
    loop();
};

// Animate statistics
function animateStats() {
    const stats = document.querySelectorAll('.stat-item');
    
    stats.forEach(stat => {
        const numberSpan = stat.querySelector('.stat-number');
        const target = parseInt(numberSpan.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50; // Made animation faster
        
        const updateCount = () => {
            if (current < target) {
                current += increment;
                numberSpan.textContent = Math.ceil(current);
                requestAnimationFrame(updateCount);
            } else {
                numberSpan.textContent = target;
            }
        };
        
        updateCount();
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    typeText();
    
    // Initialize stats animation
    const statsSection = document.querySelector('.quick-stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        animateStats();
                    }, 300); // Small delay for better visual effect
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(statsSection);
    }
});

// Parallax Effect
const initParallax = () => {
    document.addEventListener('mousemove', (e) => {
        const elements = document.querySelectorAll('.parallax');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        elements.forEach(element => {
            const speed = element.dataset.speed || 1;
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            element.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
};

// Smooth Scroll with Progress
const initSmoothScroll = () => {
    const progress = document.createElement('div');
    progress.className = 'scroll-progress';
    document.body.appendChild(progress);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progress.style.width = `${scrolled}%`;
    });
};

// Add floating animation to decorative elements
const initFloatingElements = () => {
    const elements = document.querySelectorAll('.floating-element');
    
    elements.forEach(element => {
        const randomX = Math.random() * 100 - 50;
        const randomY = Math.random() * 100 - 50;
        const randomDuration = Math.random() * 3 + 2;
        const randomDelay = Math.random() * 2;
        
        element.style.animation = `
            float ${randomDuration}s ease-in-out ${randomDelay}s infinite alternate,
            rotate 20s linear infinite
        `;
        
        element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
};

// Enhanced hover effects
const initHoverEffects = () => {
    const cards = document.querySelectorAll('.hover-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
};

// Form animation
const initFormAnimations = () => {
    const inputs = document.querySelectorAll('.form-input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
};

// Page Transitions
document.addEventListener('DOMContentLoaded', () => {
    // Initial page load animation
    document.body.classList.add('loaded');

    // Handle navigation transitions
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
            if (link.href.includes(window.location.origin)) {
                e.preventDefault();
                const target = link.href;
                
                document.querySelector('.page-transition').classList.add('active');
                
                setTimeout(() => {
                    window.location.href = target;
                }, 600);
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navigation scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.nav-container');
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }

        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
});

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    animateProgressBars();
    
    // Add project preview listeners
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', () => {
            const project = {
                title: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent,
                techStack: card.querySelector('.tech-stack').textContent,
                image: 'path/to/project-image.jpg', // Add your project images
                demo: '#',
                github: '#'
            };
            createProjectModal(project);
        });
    });

    initGallery();
    initBlog();
    initScrollAnimations();
    createScrollProgress();
    initEnhancedGallery();
    initNewsletterForm();
    init3DCards();
    initSkillsAnimation();
    initTestimonialCarousel();
    initMobileMenu();
    initProjectFilter();
    initLoading();
    initScrollToTop();
    initTimelineAnimation();
    initEnhancedScrollAnimations();
    initSkillsRadar();
    initFormValidation();
    initCustomCursor();
    initParallax();
    initSmoothScroll();
    initFloatingElements();
    initHoverEffects();
    initFormAnimations();
    
    // Animate statistics when they come into view
    const statsSection = document.querySelector('#statistics');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
}); 