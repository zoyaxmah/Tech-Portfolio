document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const icon = toggleButton.querySelector('i');

    const darkModeIcon = document.getElementById('dark-mode-icon');

    // Check for saved theme in localStorage
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeIcon.src = "assets/sun-icon.png"; // Your sun icon for dark mode
    }

    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Update icon
        if (body.classList.contains('dark-mode')) {
            darkModeIcon.src = "assets/sun-icon.png";
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeIcon.src = "assets/moon-icon.png";
            localStorage.setItem('theme', 'light');
        }
    });;

    // Add animation to skill items
    const skillItems = document.querySelectorAll('.skill-item');

    if (skillItems.length > 0) {
        // Apply initial delay to each skill item for a staggered appearance
        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }

    // Add animation to project cards
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        projectCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(card);
        });
    }

    // Form submission animation
    const contactForm = document.querySelector('.contact form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }

            // Animation for successful submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.innerHTML = '<img src="assets/spinner.gif" class="submit-spinner"> Sending...';

            // Simulate form submission
            setTimeout(() => {
                submitButton.innerHTML = '<img src="assets/checkmark.png" class="submit-check"> Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';

                // Reset form
                contactForm.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Navigation highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            link.style.fontWeight = '700';
        }
    });

    // Add scroll reveal animation to sections
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        if (section !== document.querySelector('.hero')) {  // Skip hero section
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        }
    });

    // Add typing animation to hero title
    const heroTitle = document.querySelector('.hero h1');

    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '0.15em solid var(--primary-color)';
        heroTitle.style.animation = 'blinking-cursor 0.7s step-end infinite';

        let charIndex = 0;

        function typeWriter() {
            if (charIndex < text.length) {
                heroTitle.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
                heroTitle.style.animation = 'none';
            }
        }

        // Start typing animation after a brief delay
        setTimeout(typeWriter, 500);
    }
});

// Add missing CSS animation for the cursor
const style = document.createElement('style');
style.textContent = `
    @keyframes blinking-cursor {
      from, to { border-color: transparent }
      50% { border-color: var(--primary-color) }
    }
  `;
document.head.appendChild(style);