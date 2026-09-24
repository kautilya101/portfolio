import type { gsap as GsapType } from 'gsap';

export function initHorizontalScroll(gsap: typeof GsapType) {
  const sections = gsap.utils.toArray<HTMLElement>('[data-horizontal]');
  if (!sections.length) return;

  const mm = gsap.matchMedia();

  mm.add('(min-width: 1024px) and (min-height: 620px)', () => {
    const pinned: HTMLElement[] = [];
    sections.forEach((section) => {
      const track = section.querySelector<HTMLElement>('[data-horizontal-track]');
      if (!track) return;
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      if (distance() < 40) return;
      section.classList.add('is-pinned');
      pinned.push(section);

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'center center',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });
    });
    return () => pinned.forEach((section) => section.classList.remove('is-pinned'));
  });
}
