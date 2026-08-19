const slides = [...document.querySelectorAll('.slide')];
const currentEl = document.getElementById('current');
const progressBar = document.getElementById('progressBar');
const dotsEl = document.getElementById('dots');
let index = 0;
let touchStartX = null;

slides.forEach((_, i) => {
  const d = document.createElement('span');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.addEventListener('click', () => show(i));
  dotsEl.appendChild(d);
});

function show(nextIndex) {
  index = (nextIndex + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === index));
  [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === index));
  currentEl.textContent = String(index + 1).padStart(2, '0');
  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;
  document.title = `${String(index + 1).padStart(2,'0')} · ${slides[index].dataset.title} | NAVER SA`;
  history.replaceState(null, '', `#${index + 1}`);
}
document.getElementById('prev').addEventListener('click', () => show(index - 1));
document.getElementById('next').addEventListener('click', () => show(index + 1));

document.addEventListener('keydown', e => {
  if (['ArrowRight','PageDown',' '].includes(e.key)) { e.preventDefault(); show(index + 1); }
  if (['ArrowLeft','PageUp'].includes(e.key)) { e.preventDefault(); show(index - 1); }
  if (e.key === 'Home') show(0);
  if (e.key === 'End') show(slides.length - 1);
});

document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].clientX, {passive:true});
document.addEventListener('touchend', e => {
  if (touchStartX === null) return;
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  touchStartX = null;
}, {passive:true});

const hash = parseInt(location.hash.replace('#',''), 10);
if (hash >= 1 && hash <= slides.length) show(hash - 1);
else show(0);
