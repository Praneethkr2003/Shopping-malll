'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function GlobalEffects() {
  useEffect(() => {
    // Scroll skew effect
    let proxy = { skew: 0, skewSetter: function(value: number) { this.skew = value; }, getSkew: function() { return this.skew; } },
      skewSetter = gsap.quickSetter(proxy, 'skew', 'deg'),
      clamp = gsap.utils.clamp(-20, 20);

    gsap.set('body', { transformOrigin: 'center center', force3D: true });

    gsap.set('main', { transformStyle: 'preserve-3d' });

    ScrollTrigger.create({
      onUpdate: (self: ScrollTrigger) => {
        let skew = clamp(self.getVelocity() / 300);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          skewSetter(skew);
        }
      },
    });

    // Animate skew back to 0
    gsap.ticker.add((self: any) => {
      if (Math.abs(proxy.skew) > 0.05) {
        proxy.skew *= 0.85;
        skewSetter(proxy.skew);
      }
    });

    // Smooth page transitions
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        const href = target.getAttribute('href');

        gsap.to('main', {
          opacity: 0,
          duration: 0.3,
          onComplete: () => {
            if (href) {
              window.location.href = href;
            }
          },
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
}
