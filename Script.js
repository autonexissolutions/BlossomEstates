// Tailwind configuration
tailwind.config = {
  theme: {
    extend: {
      colors: {
        'scc-navy': '#1e3a8a',
        'scc-blue': '#3b82f6',
        'scc-gold': '#f59e0b',
        'scc-emerald': '#10b981'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      }
    }
  }
};

// Modal functions
function openScheduleVisitModal() {
  document.getElementById('scheduleVisitModal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeScheduleVisitModal() {
  document.getElementById('scheduleVisitModal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}

// FAQ Toggle Functionality
function toggleFAQ(id) {
  const content = document.getElementById(`faq-content-${id}`);
  const icon = document.getElementById(`faq-icon-${id}`);

  if (content.classList.contains('hidden')) {
    content.classList.remove('hidden');
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  } else {
    content.classList.add('hidden');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  }
}


// Close modal when clicking outside
const modal = document.getElementById('scheduleVisitModal');
if (modal) {
  modal.addEventListener('click', function (e) {
    if (e.target === this) {
      closeScheduleVisitModal();
    }
  });
}

// Form submission handling
const forms = document.querySelectorAll('form');
forms.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically send the form data to your server
    // For demo purposes, we'll just show an alert
    alert('Thank you for your submission! We will contact you soon.');
    form.reset();
    if (form.closest('#scheduleVisitModal')) {
      closeScheduleVisitModal();
    }
  });
});

// Mobile menu toggle (if you add mobile menu functionality later)
function toggleMobileMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('hidden');
}



// Form submission handling
document.getElementById('partnerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // Here you would typically send the form data to your server
  // For demo purposes, we'll just show the success message

  // Hide form
  this.style.display = 'none';

  // Show success message
  document.getElementById('formSuccess').classList.remove('hidden');

  // Scroll to success message
  document.getElementById('formSuccess').scrollIntoView({ behavior: 'smooth' });
});






//BLOG
// Toggle blog content visibility (your existing function)
function toggleBlogContent(id) {
  const content = document.getElementById(id);
  content.classList.toggle('expanded');

  // Change button text based on state
  const button = content.previousElementSibling;
  if (content.classList.contains('expanded')) {
    button.textContent = 'Read Less →';
  } else {
    button.textContent = 'Read More →';
  }
}



// Pagination functionality
document.addEventListener('DOMContentLoaded', function () {
  const blogContainer = document.querySelector('.grid.md\\:grid-cols-3.gap-8');
  const blogPosts = blogContainer.querySelectorAll('.property-card');
  const postsPerPage = 6;
  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  let currentPage = 1;

  // Create pagination controls if needed
  if (totalPosts > postsPerPage) {
    createPaginationControls();
    showPage(1); // Show first page initially
  }

  function showPage(page) {
    currentPage = page;
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = Math.min(startIndex + postsPerPage, totalPosts);

    // Hide all blog posts
    blogPosts.forEach(post => {
      post.style.display = 'none';
    });

    // Show posts for current page
    for (let i = startIndex; i < endIndex; i++) {
      blogPosts[i].style.display = 'block';
    }

    // Update pagination controls
    updatePaginationButtons();
  }

  function createPaginationControls() {
    const paginationDiv = document.createElement('div');
    paginationDiv.className = 'flex justify-center mt-12';

    const paginationNav = document.createElement('nav');
    paginationNav.className = 'flex items-center space-x-2';
    paginationDiv.appendChild(paginationNav);

    // Previous button
    const prevButton = document.createElement('a');
    prevButton.href = '#';
    prevButton.className = 'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50';
    prevButton.textContent = 'Previous';
    prevButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage > 1) showPage(currentPage - 1);
    });
    paginationNav.appendChild(prevButton);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement('a');
      pageLink.href = '#';
      pageLink.className = 'px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50';
      if (i === 1) pageLink.className += ' bg-scc-blue text-white';
      pageLink.textContent = i;
      pageLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(i);
      });
      paginationNav.appendChild(pageLink);
    }

    // Next button
    const nextButton = document.createElement('a');
    nextButton.href = '#';
    nextButton.className = 'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50';
    nextButton.textContent = 'Next';
    nextButton.addEventListener('click', (e) => {
      e.preventDefault();
      if (currentPage < totalPages) showPage(currentPage + 1);
    });
    paginationNav.appendChild(nextButton);

    // Insert after blog container
    blogContainer.parentNode.insertBefore(paginationDiv, blogContainer.nextSibling);
  }

  function updatePaginationButtons() {
    const paginationNav = document.querySelector('.flex.justify-center.mt-12 nav');
    if (!paginationNav) return;

    const pageLinks = paginationNav.querySelectorAll('a');

    // Update Previous button
    pageLinks[0].className = currentPage === 1 ?
      'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 cursor-not-allowed' :
      'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50';

    // Update page number buttons
    for (let i = 1; i <= totalPages; i++) {
      pageLinks[i].className = i === currentPage ?
        'px-4 py-2 border border-gray-300 rounded-md bg-scc-blue text-white' :
        'px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50';
    }

    // Update Next button
    pageLinks[pageLinks.length - 1].className = currentPage === totalPages ?
      'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-gray-100 cursor-not-allowed' :
      'px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50';
  }
});






// Smooth scrolling for navigation links
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();



// Counter animation function
function animateCounters() {
  const counters = document.querySelectorAll('.counter');
  const speed = 8000; // The lower the faster

  counters.forEach(counter => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(animateCounters, 1);
    } else {
      counter.innerText = target;
    }
  });
}

// Intersection Observer to trigger animation when section is in view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// Observe the section
const statsSection = document.querySelector('section.py-20');
if (statsSection) {
  observer.observe(statsSection);
}




function createParticles() {
  const container = document.querySelector('.particles');
  const particleCount = window.innerWidth < 768 ? 30 : 50;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    // Random properties
    const size = Math.random() * 5 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    const opacity = Math.random() * 0.4 + 0.1;

    // Apply styles
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.opacity = opacity;
    particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;

    // Add to container
    container.appendChild(particle);
  }

  // Add floating animation
  const style = document.createElement('style');
  style.innerHTML = `
            @keyframes float {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(10px, 10px); }
                50% { transform: translate(20px, -5px); }
                75% { transform: translate(-10px, 15px); }
            }
        `;
  document.head.appendChild(style);
}