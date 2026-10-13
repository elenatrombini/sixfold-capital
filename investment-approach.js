(() => {
  const track = document.querySelector('.process-track');
  const previous = document.querySelector('.process-prev');
  const next = document.querySelector('.process-next');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  function update() {
    previous.disabled = track.scrollLeft <= 2;
    next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }
  function move(direction) {
    const step = track.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap);
    track.scrollBy({left: direction * step, behavior: reducedMotion.matches ? 'instant' : 'smooth'});
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', update, {passive:true});
  new ResizeObserver(update).observe(track);
  update();
})();

// Match the Home's gentle, once-only entrance for each text block.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const elements = [...document.querySelectorAll('.approach-copy > h2, .approach-copy > p, .process-card > :not(.process-image), .research-callout > *')];
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold:0, rootMargin:'0px 0px -40px 0px'});
  for (const element of elements) {
    const rect = element.getBoundingClientRect();
    if (!element.matches('.approach-copy:not(.approach-details) > h2, .approach-copy:not(.approach-details) > p') && rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0) continue;
    element.classList.add('reveal-pending');
    observer.observe(element);
  }
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    elements.forEach(element => element.classList.remove('reveal-pending', 'reveal-visible'));
  });
})();
