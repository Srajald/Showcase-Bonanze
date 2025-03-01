document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const successModal = document.getElementById('successModal');
    
    // Form Validation and Submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('.submit-btn');
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span>';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success modal
            successModal.style.display = 'flex';
            setTimeout(() => successModal.classList.add('active'), 10);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            console.error('Error sending message:', error);
            alert('There was an error sending your message. Please try again.');
            
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <span class="btn-text">Send Message</span>
                <span class="btn-icon"><i class="fas fa-paper-plane"></i></span>
            `;
        }
    });
    
    // Close modal
    document.querySelector('.close-modal').addEventListener('click', () => {
        successModal.classList.remove('active');
        setTimeout(() => successModal.style.display = 'none', 300);
    });
    
    // Form input animations
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        // Validate on input
        input.addEventListener('input', () => {
            if (input.value) {
                input.classList.add('has-value');
            } else {
                input.classList.remove('has-value');
            }
        });
    });
    
    // Add floating label animations
    document.querySelectorAll('.floating').forEach(group => {
        const input = group.querySelector('.form-input');
        const label = group.querySelector('label');
        
        input.addEventListener('focus', () => {
            label.style.transform = 'translateY(-100%) scale(0.8)';
            label.style.color = 'var(--primary)';
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                label.style.transform = '';
                label.style.color = '';
            }
        });
        
        if (input.value) {
            label.style.transform = 'translateY(-100%) scale(0.8)';
        }
    });
}); 