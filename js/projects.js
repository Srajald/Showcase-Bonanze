document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter projects
            const filter = button.dataset.filter;
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // Case Study Modal
    const modal = document.getElementById('caseStudyModal');
    const modalContent = modal.querySelector('.case-study-content');
    const closeButton = modal.querySelector('.modal-close');

    // Sample case study data
    const caseStudies = {
        'project1': {
            title: 'Project Title',
            description: 'Detailed project description...',
            challenge: 'The main challenges faced...',
            solution: 'How we solved the problems...',
            impact: 'The results and impact...',
            technologies: ['React', 'Node.js', 'MongoDB'],
            images: ['path/to/image1.jpg', 'path/to/image2.jpg']
        }
        // Add more case studies
    };

    // Open modal with case study content
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.dataset.id;
            const caseStudy = caseStudies[projectId];
            
            if (caseStudy) {
                modalContent.innerHTML = `
                    <h2>${caseStudy.title}</h2>
                    <p>${caseStudy.description}</p>
                    <h3>Challenge</h3>
                    <p>${caseStudy.challenge}</p>
                    <h3>Solution</h3>
                    <p>${caseStudy.solution}</p>
                    <h3>Impact</h3>
                    <p>${caseStudy.impact}</p>
                    <div class="case-study-tech">
                        ${caseStudy.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                `;
                
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}); 