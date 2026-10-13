// Match the Home's gentle, once-only entrance for each text block.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const elements = [...document.querySelectorAll('.intro > h2, .intro > p, .report > *')];
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
    if (!element.matches('.intro > h2, .intro > p') && rect.top < innerHeight && rect.bottom > 0 && rect.left < innerWidth && rect.right > 0) continue;
    element.classList.add('reveal-pending');
    observer.observe(element);
  }
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    elements.forEach(element => element.classList.remove('reveal-pending', 'reveal-visible'));
  });
})();
