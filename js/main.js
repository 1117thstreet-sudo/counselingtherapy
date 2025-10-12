// Main JavaScript for Counseling Therapy Website

document.addEventListener('DOMContentLoaded', function() {
  // Load header and footer components
  loadComponent('header', 'header.header');
  loadComponent('footer', 'footer.footer');

  // Initialize testimonials carousel
  initTestimonialsCarousel();

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

/**
 * Load a component from the components directory
 * @param {string} componentName - Name of the component file (without .html)
 * @param {string} targetSelector - CSS selector for the element to insert the component into
 */
function loadComponent(componentName, targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  if (!targetElement) return;
  
  fetch(`components/${componentName}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${componentName} component`);
      }
      return response.text();
    })
    .then(html => {
      targetElement.innerHTML = html;
      
      // If it's the header component, reinitialize the navigation
      if (componentName === 'header') {
        initializeNavigation();
      }
    })
    .catch(error => {
      console.error(`Error loading ${componentName} component:`, error);
    });
}

/**
 * Initialize navigation after header is loaded dynamically
 */
function initializeNavigation() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Reinitialize mobile navigation
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav ul');
  
  if (navToggle) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('show');
      navToggle.classList.toggle('active');
    });
  }
}

/**
 * Initialize testimonials carousel functionality
 */
function initTestimonialsCarousel() {
  const carousel = document.querySelector('.testimonials-carousel');
  if (!carousel) return;
  
  const testimonials = carousel.querySelectorAll('.testimonial');
  const dots = carousel.querySelectorAll('.dot');
  let currentIndex = 0;
  let interval;
  
  // Function to show testimonial at given index
  function showTestimonial(index) {
    // Remove active class from all testimonials and dots
    testimonials.forEach(testimonial => {
      testimonial.classList.remove('active');
      testimonial.classList.remove('prev');
    });
    
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Add prev class to the previous testimonial
    const prevIndex = (index === 0) ? testimonials.length - 1 : index - 1;
    testimonials[prevIndex].classList.add('prev');
    
    // Add active class to current testimonial and dot
    testimonials[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update currentIndex
    currentIndex = index;
  }
  
  // Function to advance to next testimonial
  function nextTestimonial() {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(nextIndex);
  }
  
  // Add click event listeners to dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      showTestimonial(index);
      startCarousel();
    });
  });
  
  // Function to start automatic carousel rotation
  function startCarousel() {
    interval = setInterval(nextTestimonial, 5000);
  }
  
  // Initialize the carousel
  showTestimonial(0);
  startCarousel();
} 