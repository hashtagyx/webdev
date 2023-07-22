document.addEventListener('DOMContentLoaded', function () {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
  
    // Show or hide the button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        scrollToTopBtn.classList.remove('d-none');
      } else {
        scrollToTopBtn.classList.add('d-none');
      }
    });
  
    // Scroll to the top when the button is clicked
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });
  