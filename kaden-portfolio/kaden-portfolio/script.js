// Light / dark mode
const root = document.documentElement;
document.querySelectorAll('[data-set-theme]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const theme = btn.dataset.setTheme;
    root.dataset.theme = theme;
    try { localStorage.setItem('kc-portfolio-theme', theme); } catch (e) {}
  });
});

// Follow system theme changes until the visitor picks one
if (window.matchMedia) {
  matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    let saved = null;
    try { saved = localStorage.getItem('kc-portfolio-theme'); } catch (err) {}
    if (!saved) root.dataset.theme = e.matches ? 'light' : 'dark';
  });
}

// Image lightbox
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbCap = document.getElementById('lightbox-cap');

document.querySelectorAll('.shot').forEach((shot) => {
  shot.addEventListener('click', () => {
    const img = shot.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = shot.dataset.cap || '';
    lightbox.hidden = false;
  });
});

const closeLightbox = () => { lightbox.hidden = true; };
lightbox.addEventListener('click', closeLightbox);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
