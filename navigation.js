const nav = document.querySelector('body > nav');
const observer = new ResizeObserver(() => {
  document.documentElement.style.setProperty('--nav-height', `${nav.offsetHeight + 16}px`);
});
observer.observe(nav);

// Reveal once; content remains visible if motion is reduced or observers unavailable.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const sections = [...document.querySelectorAll('.home-page > .band > *, .home-page > .pillars > .label, .home-page > .pillars > h2, .home-page > .team > .label, .home-page > .team > h2, .home-page > .team > .sub, .home-page .m')];
let revealObserver;
if (!motionPreference.matches && 'IntersectionObserver' in window) {
  revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.remove('reveal-pending');
      entry.target.classList.add('reveal-visible');
      revealObserver.unobserve(entry.target);
    }
  }, {threshold:0, rootMargin:'0px 0px -40px 0px'});
  for (const section of sections) {
    // Never hide content already on screen, including direct anchor landings.
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) continue;
    section.classList.add('reveal-pending');
    revealObserver.observe(section);
  }
}
motionPreference.addEventListener('change', event => {
  if (!event.matches) return;
  revealObserver?.disconnect();
  sections.forEach(section => section.classList.remove('reveal-pending', 'reveal-visible'));
});
