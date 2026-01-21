/**
 * So Easy a Monkey Can Do It
 * Main JavaScript File
 * Techno-Jungle x Grateful Dead Psychedelic
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavbar();
  initMobileMenu();
  initFloatingMonkey();
  initPortfolioFilter();
  initContactForm();
  initParallax();
  initScrollAnimations();
});

/**
 * Navbar Scroll Effect
 * Adds 'scrolled' class when user scrolls down
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (!mobileMenuBtn || !navLinks) return;

  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Floating Monkey that follows scroll
 */
function initFloatingMonkey() {
  const monkey = document.getElementById('floatingMonkey');
  if (!monkey) return;

  let targetX = window.innerWidth - 80;
  let targetY = 150;
  let currentX = targetX;
  let currentY = targetY;

  // Set initial position
  monkey.style.right = '30px';
  monkey.style.top = '150px';

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    // Monkey gently follows scroll with offset
    targetY = 150 + (scrollY * 0.1);
  }, { passive: true });

  // Smooth animation loop
  function animate() {
    currentY += (targetY - currentY) * 0.05;
    monkey.style.top = `${currentY}px`;
    requestAnimationFrame(animate);
  }

  animate();

  // Add gentle bounce on hover
  monkey.addEventListener('mouseenter', () => {
    monkey.style.transform = 'scale(1.2) rotate(10deg)';
  });

  monkey.addEventListener('mouseleave', () => {
    monkey.style.transform = 'scale(1) rotate(0deg)';
  });
}

/**
 * Portfolio Filter Functionality
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length === 0 || portfolioCards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter cards with animation
      portfolioCards.forEach(card => {
        const category = card.dataset.category;

        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          card.style.animation = 'fadeOut 0.3s ease forwards';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Add keyframe animations dynamically
  if (!document.getElementById('filterAnimations')) {
    const style = document.createElement('style');
    style.id = 'filterAnimations';
    style.textContent = `
      @keyframes fadeOut {
        from { opacity: 1; transform: scale(1); }
        to { opacity: 0; transform: scale(0.9); }
      }
    `;
    document.head.appendChild(style);
  }
}

/**
 * Contact Form Validation & Submission
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset errors
    form.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });

    // Validate
    let isValid = true;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const message = form.querySelector('#message');

    if (!name.value.trim()) {
      name.closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (!email.value.trim() || !isValidEmail(email.value)) {
      email.closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (!message.value.trim()) {
      message.closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (isValid) {
      // Simulate form submission
      const submitBtn = form.querySelector('.submit-btn');
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      // Simulate API call delay
      setTimeout(() => {
        form.style.display = 'none';
        successMessage.classList.add('show');
      }, 1500);
    }
  });

  // Real-time validation feedback
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => {
      const group = input.closest('.form-group');
      if (input.value.trim()) {
        group.classList.remove('error');
      }
    });

    input.addEventListener('input', () => {
      const group = input.closest('.form-group');
      if (group.classList.contains('error') && input.value.trim()) {
        group.classList.remove('error');
      }
    });
  });
}

/**
 * Reset contact form
 */
function resetForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('successMessage');

  if (!form || !successMessage) return;

  form.reset();
  form.style.display = 'block';
  successMessage.classList.remove('show');

  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  submitBtn.disabled = false;
}

/**
 * Email validation helper
 */
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Parallax Effect for sections
 */
function initParallax() {
  const parallaxSections = document.querySelectorAll('.parallax-section');

  if (parallaxSections.length === 0) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    parallaxSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const speed = 0.3;

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const yPos = (scrollY - section.offsetTop) * speed;
        section.style.transform = `translateY(${yPos}px)`;
      }
    });
  }, { passive: true });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.mission-box, .vision-box, .portfolio-card');

  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
}

/**
 * Add smooth hover effect to cards
 */
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.portfolio-card');

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Only apply effect if mouse is near the card
    if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      if (card.matches(':hover')) {
        card.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    }
  });
});

// Reset card transform on mouse leave
document.querySelectorAll('.portfolio-card').forEach(card => {
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/**
 * Psychedelic cursor trail effect (subtle)
 */
(function initCursorTrail() {
  const colors = ['#9d4edd', '#00d4ff', '#39ff14', '#ff6b35', '#ff006e'];
  let particles = [];

  document.addEventListener('mousemove', (e) => {
    // Only create particles occasionally for performance
    if (Math.random() > 0.85) {
      createParticle(e.clientX, e.clientY);
    }
  });

  function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      pointer-events: none;
      width: 8px;
      height: 8px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      z-index: 9999;
      opacity: 0.7;
      transition: all 1s ease;
    `;

    document.body.appendChild(particle);
    particles.push(particle);

    // Animate and remove
    setTimeout(() => {
      particle.style.opacity = '0';
      particle.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`;
    }, 10);

    setTimeout(() => {
      particle.remove();
      particles = particles.filter(p => p !== particle);
    }, 1000);

    // Limit particles
    if (particles.length > 30) {
      const oldParticle = particles.shift();
      if (oldParticle) oldParticle.remove();
    }
  }
})();

/**
 * Keyboard navigation support
 */
document.addEventListener('keydown', (e) => {
  // ESC closes mobile menu
  if (e.key === 'Escape') {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileMenuBtn && navLinks && navLinks.classList.contains('active')) {
      mobileMenuBtn.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
});

// Make resetForm available globally
window.resetForm = resetForm;
