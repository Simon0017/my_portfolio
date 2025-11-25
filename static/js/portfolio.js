// Initialize variables
let currentGalleryIndex = 0;
const typingTexts = [
    "Electronic & Computer Engineer",
    "Full Stack Developer", 
    "Cybersecurity Enthusiast",
    "Computer Vision amatuer",
    "Embedded Systems amatuer",
    "ML & DL amateur"
];
let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;

// Custom cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// HUD uptime counter
let startTime = Date.now();
function updateUptime() {
    const now = Date.now();
    const diff = Math.floor((now - startTime) / 1000);
    const hours = Math.floor(diff / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
    const seconds = (diff % 60).toString().padStart(2, '0');
    document.getElementById('uptime').textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateUptime, 1000);

// Mouse coordinates
document.addEventListener('mousemove', (e) => {
    document.getElementById('coordinates').textContent = `${e.clientX}, ${e.clientY}`;
});

// Typing effect
function typeEffect() {
    const currentText = typingTexts[typingIndex];
    const typingElement = document.getElementById('typingText');
    
    if (isDeleting) {
        typingElement.innerHTML = currentText.substring(0, charIndex - 1) + '<span class="typing-cursor">|</span>';
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            typingIndex = (typingIndex + 1) % typingTexts.length;
            setTimeout(typeEffect, 500);
            return;
        }
    } else {
        typingElement.innerHTML = currentText.substring(0, charIndex + 1) + '<span class="typing-cursor">|</span>';
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}




// Scroll reveal animation
function scrollReveal() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        
        if (isVisible) {
            section.classList.add('visible');
            
            // Animate skill bars
            const skillBars = section.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                if (!bar.style.width) {
                    const targetWidth = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = targetWidth;
                    }, 300);
                }
            });
        }
    });
}

// Navigation
function updateNavigation() {
    const sections = document.querySelectorAll('.section');
    const navDots = document.querySelectorAll('.nav-dot');
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navDots.forEach(dot => dot.classList.remove('active'));
            navDots[index].classList.add('active');
        }
    });
}

// Navigation click events
document.querySelectorAll('.nav-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        const sections = document.querySelectorAll('.section');
        sections[index].scrollIntoView({ behavior: 'smooth' });
        
        // Play click sound
        const clickSound = document.getElementById('clickSound');
        clickSound.currentTime = 0;
        clickSound.play().catch(e => {});
    });
});

// Hover effects with sound
document.querySelectorAll('.skill-card, .project-card, .achievement-badge, .gallery-item').forEach(element => {
    element.addEventListener('mouseenter', () => {
        const hoverSound = document.getElementById('hoverSound');
        hoverSound.currentTime = 0;
        hoverSound.play().catch(e => {});
    });
});

// Random FPS counter simulation
function updateFPS() {
    const fps = Math.floor(Math.random() * 5) + 58;
    document.getElementById('fps').textContent = fps;
}
setInterval(updateFPS, 1000);

// Loading screen
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('hidden');
}

// Event listeners
window.addEventListener('scroll', () => {
    scrollReveal();
    updateNavigation();
});

window.addEventListener('resize', scrollReveal);

// Initialize
window.addEventListener('load', () => {
    setTimeout(hideLoadingScreen, 3000);
    typeEffect();
    scrollReveal();
});

// Keyboard controls - updated
document.addEventListener('keydown', (e) => {
    // Globe controls are now handled in setupGalleryControls()
    // This prevents conflicts
});

// Performance optimization
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(scrollReveal);
        ticking = true;
    }
}

window.addEventListener('scroll', () => {
    requestTick();
    ticking = false;
});

// Add some dynamic effects
document.addEventListener('click', (e) => {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = e.clientX + 'px';
    ripple.style.top = e.clientY + 'px';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(0, 243, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '9999';
    document.body.appendChild(ripple);
    
    setTimeout(() => {
        ripple.style.transform = 'scale(10)';
        ripple.style.opacity = '0';
    }, 10);
    
    setTimeout(() => {
        document.body.removeChild(ripple);
    }, 600);
});

// swiper
var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "1",
    coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
    },
    pagination: {
    el: ".swiper-pagination"
    },
    breakpoints: {
    320: { slidesPerView: 1.5 },
    580: { slidesPerView: 2 },
    767: { slidesPerView: 3 },
    992: { slidesPerView: 3.5 },
    1200: { slidesPerView: 4 },
    1400: { slidesPerView: 4.5 }
    }
});