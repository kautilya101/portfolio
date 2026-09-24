import type { gsap as GsapType } from 'gsap';

const DISTANCE = { desktop: 90, mobile: 30 };

export function initParallax(gsap: typeof GsapType) {
  const mm = gsap.matchMedia();

  mm.add(
    {
      desktop: '(min-width: 900px)',
      mobile: '(max-width: 899px)'
    },
    (ctx) => {
      const { desktop } = ctx.conditions as { desktop: boolean };
      const distance = desktop ? DISTANCE.desktop : DISTANCE.mobile;

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.parallax ?? 1);
        if (!desktop && el.dataset.parallaxMobile === 'off') return;
        const shift = (1 - speed) * distance;
        if (!shift) return;
        const trigger = el.closest<HTMLElement>('[data-parallax-root]') ?? el.parentElement ?? el;
        gsap.fromTo(
          el,
          { y: -shift },
          {
            y: shift,
            ease: 'none',
            force3D: true,
            scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 }
          }
        );
      });
    }
  );
}
