const root = document.documentElement;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

async function start() {
  if (reduced) return;
  try {
    const [{ gsap }, { ScrollTrigger }, { initReveal }, { initParallax }, { initHorizontalScroll }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('./Reveal'),
      import('./Parallax'),
      import('./HorizontalScroll')
    ]);
    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({ ease: 'power3.out' });
    ScrollTrigger.config({ ignoreMobileResize: true });
    initHorizontalScroll(gsap);
    initParallax(gsap);
    initReveal(ScrollTrigger);
    root.classList.add('motion-ready');
    if (document.fonts?.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  } catch {
    root.classList.remove('motion');
  }
}

if ('requestIdleCallback' in window) {
  requestIdleCallback(start, { timeout: 600 });
} else {
  setTimeout(start, 60);
}
