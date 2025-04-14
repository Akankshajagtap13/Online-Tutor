document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active') && 
            !event.target.closest('nav') && 
            !event.target.closest('.mobile-menu-btn')) {
            nav.classList.remove('active');
        }
    });

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    // Function to show a specific slide
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Calculate the slide index
        currentSlide = (n + slides.length) % slides.length;
        
        // Show the current slide and activate the dot
        slides[currentSlide].style.display = 'block';
        dots[currentSlide].classList.add('active');
    }

    // Initialize slider
    showSlide(currentSlide);

    // Add event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Add event listeners to prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    // Auto advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);

    // Form Submissions
    const bookingForm = document.getElementById('bookingForm');
    const newsletterForm = document.getElementById('newsletterForm');

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Gather form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Simple form validation
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', formData);
            
            // Show success message
            alert('Thank you for your request! I will get back to you shortly.');
            
            // Reset form
            bookingForm.reset();
        });
    }

    // Newsletter form submission
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = newsletterForm.querySelector('input[type="email"]').value;
            
            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to my newsletter!');
            
            // Reset form
            newsletterForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('header nav a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            // Check if the link points to an internal section
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                event.preventDefault();
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    // Close mobile menu if it's open
                    if (nav.classList.contains('active')) {
                        nav.classList.remove('active');
                    }
                    
                    // Scroll to the section
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState({}, '', targetId);
                }
            }
        });
    });

    // Active link highlighting based on scroll position
    function highlightActiveLink() {
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('header').offsetHeight;
        
        // Get current scroll position
        const scrollPosition = window.pageYOffset + headerHeight + 50;
        
        // Check each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            // If the scroll position is within this section
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding navigation link
                document.querySelector(`header nav a[href="#${sectionId}"]`)?.classList.add('active');
            }
        });
    }

    // Run the highlight function on load and scroll
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink();

    // Header shrink on scroll
    const header = document.querySelector('header');
    let scrollPos = 0;

    function checkScrollPosition() {
        const currentScrollPos = window.pageYOffset;
        
        if (currentScrollPos > 100) {
            header.style.padding = '5px 0';
        } else {
            header.style.padding = '15px 0';
        }
        
        scrollPos = currentScrollPos;
    }

    window.addEventListener('scroll', checkScrollPosition);
    checkScrollPosition();
});