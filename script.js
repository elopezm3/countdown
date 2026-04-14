// Target date: April 28, 2026 00:00:00 Eastern Time (Miami)
// Eastern Daylight Time (EDT) is UTC-4 in late April
const TARGET_DATE = new Date('2026-04-28T00:00:00-04:00');

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

  document.querySelectorAll('.gallery-grid img').forEach(img => {
    img.addEventListener('click', () => {
      lightbox.querySelector('img').src = img.src;
      lightbox.classList.add('active');
    });
  });
}

// Init
updateCountdown();
setInterval(updateCountdown, 1000);
setupLightbox();
