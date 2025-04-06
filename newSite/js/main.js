// Main JavaScript for Counseling Therapy Website

document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav ul');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      navToggle.classList.toggle('active');
    });
  }
  
  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for header height
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains('show')) {
          navMenu.classList.remove('show');
          navToggle.classList.remove('active');
        }
      }
    });
  });
  
  // Active Navigation Link Based on Current Page
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Simple Form Validation for Contact Form
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => el.remove());
      
      // Validate name
      if (!nameInput.value.trim()) {
        addErrorMessage(nameInput, 'Please enter your name');
        isValid = false;
      }
      
      // Validate email
      if (!emailInput.value.trim()) {
        addErrorMessage(emailInput, 'Please enter your email');
        isValid = false;
      } else if (!isValidEmail(emailInput.value)) {
        addErrorMessage(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        addErrorMessage(messageInput, 'Please enter your message');
        isValid = false;
      }
      
      // If valid, show success message (in real world, would submit to server)
      if (isValid) {
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        
        contactForm.innerHTML = '';
        contactForm.appendChild(successMessage);
      }
    });
  }
  
  // Helper Functions
  function addErrorMessage(inputElement, message) {
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    
    inputElement.parentNode.appendChild(errorMessage);
    inputElement.classList.add('error');
  }
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}); 