import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

const SELECTOR = '[data-reveal], [data-reveal-img], [data-reveal-rule], [data-draw-group]';

export function initReveal(ScrollTrigger: typeof ScrollTriggerType) {
  const targets = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR));
  if (!targets.length) return;

  ScrollTrigger.batch(targets, {
    start: 'top 88%',
    once: true,
    interval: 0.08,
    batchMax: 6,
    onEnter: (batch) => {
      (batch as HTMLElement[]).forEach((el, i) => {
        if (!el.style.getPropertyValue('--d')) el.style.setProperty('--d', `${i * 0.09}s`);
        el.classList.add('is-in');
      });
    }
  });
}
