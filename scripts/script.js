document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.getElementById('toggle-dark-mode');
    const body = document.body;
    const darkModeIcon = document.getElementById('dark-mode-icon');

    // Check saved theme
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        darkModeIcon.src = "assets/sun-icon.png";
    }

    // Toggle dark mode
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            darkModeIcon.src = "assets/sun-icon.png";
            localStorage.setItem('theme', 'dark');
        } else {
            darkModeIcon.src = "assets/moon-icon.png";
            localStorage.setItem('theme', 'light');
        }
    });

    // Animate skill items on load
    const skillItems = document.querySelectorAll('.skill-item');
    if (skillItems.length > 0) {
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

    // Animate project cards on scroll
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

    // Soft Skills horizontal scroll controls
    const ssGrid = document.getElementById('soft-skills-grid');
    const ssLeft = document.querySelector('.ss-arrow.left');
    const ssRight = document.querySelector('.ss-arrow.right');

    if (ssGrid && ssLeft && ssRight) {
        const getStep = () => {
            const card = ssGrid.querySelector('.skill-item');
            const gap = 20;
            return (card ? card.offsetWidth : 300) + gap;
        };

        ssLeft.addEventListener('click', () => {
            ssGrid.scrollBy({ left: -getStep(), behavior: 'smooth' });
        });

        ssRight.addEventListener('click', () => {
            ssGrid.scrollBy({ left: getStep(), behavior: 'smooth' });
        });

        // Allow vertical scroll wheel to move horizontally
        ssGrid.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                ssGrid.scrollBy({ left: e.deltaY, behavior: 'auto' });
            }
        }, { passive: false });
    }

    // Contact form animation
    const contactForm = document.querySelector('.contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }

            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;

            submitButton.disabled = true;
            submitButton.innerHTML = '<img src="assets/spinner.gif" class="submit-spinner"> Sending...';

            setTimeout(() => {
                submitButton.innerHTML = '<img src="assets/checkmark.png" class="submit-check"> Message Sent!';
                submitButton.style.backgroundColor = '#4CAF50';

                contactForm.reset();

                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    submitButton.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }

    // Section reveal on scroll
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
        if (section !== document.querySelector('.hero')) {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            sectionObserver.observe(section);
        }
    });

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '0.15em solid #fca311';
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
        setTimeout(typeWriter, 500);
    }
});

// Cursor animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes blinking-cursor {
      from, to { border-color: transparent }
      50% { border-color: #fca311 }
    }
`;
document.head.appendChild(style);
