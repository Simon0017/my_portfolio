const swiper = new Swiper('.swiper', {
  loop: true,
  preloadImages: false,
  lazy: {
    loadPrevNext: true,  
    loadOnTransitionStart: true
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
});


// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});