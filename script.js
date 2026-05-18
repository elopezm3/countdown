// Target date: June 24, 2026 20:00:00 Eastern Time (Miami)
// Eastern Daylight Time (EDT) is UTC-4 in June
const TARGET_DATE = new Date('2026-06-24T20:00:00-04:00');

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE - now;

  if (diff <= 0) {
    document.getElementById('days').textContent = '0';
    document.getElementById('hours').textContent = '0';
    document.getElementById('minutes').textContent = '0';
    document.getElementById('seconds').textContent = '0';
    document.querySelector('.hero h1').textContent = 'Mi alma ya esta al lado de su complemento perfecto';
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}


// Lightbox for gallery photos
function setupLightbox() {
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  lightbox.innerHTML = '<img src="" alt="">';
  document.body.appendChild(lightbox);

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  document.querySelectorAll('.gallery-grid img, .carousel-track img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.querySelector('img').src = img.src;
      lightbox.classList.add('active');
    });
  });
}

// Sliding photo carousels for memory sections
function setupCarousels() {
  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    let index = 0;

    if (slides.length <= 1) {
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }

    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dotsContainer.querySelectorAll('button').forEach((d, di) => {
        d.classList.toggle('active', di === index);
      });
    }

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));

    let auto = setInterval(() => goTo(index + 1), 6000);
    const pause = () => clearInterval(auto);
    const resume = () => { auto = setInterval(() => goTo(index + 1), 6000); };
    carousel.addEventListener('mouseenter', pause);
    carousel.addEventListener('mouseleave', resume);

    // Touch swipe support
    let startX = 0;
    let deltaX = 0;
    track.addEventListener('touchstart', (e) => {
      pause();
      startX = e.touches[0].clientX;
      deltaX = 0;
    }, { passive: true });
    track.addEventListener('touchmove', (e) => {
      deltaX = e.touches[0].clientX - startX;
    }, { passive: true });
    track.addEventListener('touchend', () => {
      if (Math.abs(deltaX) > 40) {
        goTo(index + (deltaX < 0 ? 1 : -1));
      }
      resume();
    });
  });
}

// Anniversary banner: show only during April 20, 2026 in Eastern Time (EDT = UTC-4)
const BANNER_START = new Date('2026-04-20T00:00:00-04:00');
const BANNER_END = new Date('2026-04-21T00:00:00-04:00');

function updateAnniversaryBanner() {
  const banner = document.getElementById('anniversary-banner');
  if (!banner) return;
  const now = new Date();
  banner.hidden = !(now >= BANNER_START && now < BANNER_END);
}

// Init
updateCountdown();
setInterval(updateCountdown, 1000);
updateAnniversaryBanner();
setInterval(updateAnniversaryBanner, 60 * 1000);
setupCarousels();
setupLightbox();
