document.addEventListener('DOMContentLoaded', function() {
  // Toggle between monthly and annual pricing
  const billingToggle = document.getElementById('billing-toggle');
  const monthlyLabel = document.querySelector('.toggle-label:first-child');
  const annualLabel = document.querySelector('.toggle-label:last-child');
  const monthlyPrices = document.querySelectorAll('.monthly-price');
  const annualPrices = document.querySelectorAll('.annual-price');
  
  billingToggle.addEventListener('change', function() {
    // Toggle active class for labels
    monthlyLabel.classList.toggle('active');
    annualLabel.classList.toggle('active');
    
    // Toggle price display
    monthlyPrices.forEach(price => {
      price.style.display = this.checked ? 'none' : 'block';
    });
    
    annualPrices.forEach(price => {
      price.style.display = this.checked ? 'block' : 'none';
    });
  });
  
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle current item
      item.classList.toggle('active');
    });
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
      mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') !== '#') {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Highlight active plan on hover
  const pricingCards = document.querySelectorAll('.pricing-card');
  
  pricingCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      pricingCards.forEach(otherCard => {
        if (otherCard !== card) {
          otherCard.style.opacity = '0.8';
        }
      });
    });
    
    card.addEventListener('mouseleave', function() {
      pricingCards.forEach(otherCard => {
        otherCard.style.opacity = '1';
      });
    });
  });
  
  // Animated counter for session packs
  const sessionPrices = document.querySelectorAll('.session-price');
  let hasAnimated = false;
  
  function animateCounter(element, start, end, duration) {
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      
      element.innerHTML = `$${value}<span>${element.querySelector('span').textContent}</span>`;
      
      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  // Trigger animation on scroll
  window.addEventListener('scroll', function() {
    if (!hasAnimated) {
      const singleSessionsSection = document.querySelector('.single-sessions');
      if (singleSessionsSection) {
        const position = singleSessionsSection.getBoundingClientRect();
        
        if (position.top < window.innerHeight && position.bottom >= 0) {
          sessionPrices.forEach(price => {
            const priceValue = parseInt(price.textContent.replace(/[^0-9]/g, ''));
            animateCounter(price, 0, priceValue, 1000);
          });
          hasAnimated = true;
        }
      }
    }
  });
  
  // Form validation for CTA buttons
  const ctaButtons = document.querySelectorAll('.cta .btn');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
        // Show sign-up modal or redirect to signup page
        alert('Sign up functionality would be implemented here!');
      }
    });
  });
});




document.addEventListener('DOMContentLoaded', function() {
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Basic validation
        let isValid = true;
        
        if (name === '') {
          highlightField('name', true);
          isValid = false;
        } else {
          highlightField('name', false);
        }
        
        if (email === '' || !isValidEmail(email)) {
          highlightField('email', true);
          isValid = false;
        } else {
          highlightField('email', false);
        }
        
        if (subject === '') {
          highlightField('subject', true);
          isValid = false;
        } else {
          highlightField('subject', false);
        }
        
        if (message === '') {
          highlightField('message', true);
          isValid = false;
        } else {
          highlightField('message', false);
        }
        
        // If valid, proceed with form submission
        if (isValid) {
          // Show success message (in a real scenario, this would be after AJAX submission)
          showFormMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
          
          // Reset form
          contactForm.reset();
          
          // In a real implementation, you would send the form data to a server here
          // Example AJAX code is commented out below:
          /*
          fetch('your-endpoint', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: name,
              email: email,
              phone: document.getElementById('phone').value.trim(),
              subject: subject,
              message: message,
              inquiry: document.getElementById('inquiry').value,
              newsletter: document.getElementById('newsletter').checked
            })
          })
          .then(response => response.json())
          .then(data => {
            if (data.success) {
              showFormMessage('Your message has been sent successfully! We will get back to you soon.', 'success');
              contactForm.reset();
            } else {
              showFormMessage('There was an error sending your message. Please try again.', 'error');
            }
          })
          .catch(error => {
            showFormMessage('There was a network error. Please try again later.', 'error');
            console.error('Error:', error);
          });
          */
        } else {
          showFormMessage('Please fill in all required fields correctly.', 'error');
        }
      });
    }
    
    // Helper functions
    function highlightField(fieldId, isError) {
      const field = document.getElementById(fieldId);
      if (isError) {
        field.style.borderColor = '#dc3545';
      } else {
        field.style.borderColor = '#ddd';
      }
    }
    
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email.toLowerCase());
    }
    
    function showFormMessage(message, type) {
      // Check if message element exists, if not create it
      let messageElement = document.querySelector('.form-message');
      if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.className = 'form-message';
        contactForm.parentNode.insertBefore(messageElement, contactForm);
      }
      
      // Update message content and style
      messageElement.textContent = message;
      messageElement.className = 'form-message ' + type;
      messageElement.style.display = 'block';
      
      // Scroll to message
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 5000);
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', function() {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            otherAnswer.style.maxHeight = '0';
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
        const answer = item.querySelector('.faq-answer');
        
        if (item.classList.contains('active')) {
          answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
          answer.style.maxHeight = '0';
        }
      });
    });
    
    // Testimonial slider functionality
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
      const testimonials = testimonialSlider.querySelectorAll('.testimonial');
      const totalTestimonials = testimonials.length;
      let currentIndex = 0;
      
      // Create navigation dots
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'slider-dots';
      testimonialSlider.appendChild(dotsContainer);
      
      for (let i = 0; i < totalTestimonials; i++) {
        const dot = document.createElement('span');
        dot.className = 'slider-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
      
      // Create prev/next buttons
      const prevButton = document.createElement('button');
      prevButton.className = 'slider-nav prev';
      prevButton.innerHTML = '&lt;';
      prevButton.addEventListener('click', prevSlide);
      
      const nextButton = document.createElement('button');
      nextButton.className = 'slider-nav next';
      nextButton.innerHTML = '&gt;';
      nextButton.addEventListener('click', nextSlide);
      
      testimonialSlider.appendChild(prevButton);
      testimonialSlider.appendChild(nextButton);
      
      // Functions to control slider
      function goToSlide(index) {
        testimonials.forEach((testimonial, i) => {
          testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
        });
        
        // Update active dot
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
          dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
      }
      
      function nextSlide() {
        const newIndex = (currentIndex + 1) % totalTestimonials;
        goToSlide(newIndex);
      }
      
      function prevSlide() {
        const newIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        goToSlide(newIndex);
      }
      
      // Initialize slider
      testimonials.forEach((testimonial, i) => {
        testimonial.style.transform = `translateX(${100 * i}%)`;
      });
      
      // Auto-slide every 5 seconds
      setInterval(nextSlide, 5000);
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
      });
      
      // Close menu when clicking outside
      document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        }
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          // Close mobile menu if open
          if (navMenu && navMenu.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
          }
          
          // Scroll to element
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
          });
        }
      });
    });
  });