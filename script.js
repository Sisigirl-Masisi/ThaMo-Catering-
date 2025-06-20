
// Navbar toggle for mobile
const toggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");

toggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  toggle.classList.toggle("open");
});

// Close menu when clicking on a link (for mobile UX)
document.querySelectorAll(".nav-links a").forEach(link =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    toggle.classList.remove("open");
  })
);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  });
});

// Scroll reveal animations
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".reveal").forEach(section => {
  observer.observe(section);
});

// Dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Carousel functionality
const reviewTrack = document.querySelector('.review-track');
  const reviewCards = document.querySelectorAll('.review-card');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  let reviewIndex = 0;
  let interval;

  function updateReviewCarousel() {
    const cardWidth = reviewCards[0].clientWidth;
    reviewTrack.style.transform = `translateX(-${reviewIndex * cardWidth}px)`;
  }

  function startAutoSlide() {
    interval = setInterval(() => {
      reviewIndex = (reviewIndex + 1) % reviewCards.length;
      updateReviewCarousel();
    }, 4000); // Change slide every 4 seconds
  }

  function resetAutoSlide() {
    clearInterval(interval);
    startAutoSlide();
  }

  nextBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex + 1) % reviewCards.length;
    updateReviewCarousel();
    resetAutoSlide();
  });

  prevBtn.addEventListener('click', () => {
    reviewIndex = (reviewIndex - 1 + reviewCards.length) % reviewCards.length;
    updateReviewCarousel();
    resetAutoSlide();
  });

  window.addEventListener('resize', updateReviewCarousel);

  // Initialize on page load
  updateReviewCarousel();
  startAutoSlide();
