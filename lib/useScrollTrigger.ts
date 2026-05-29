import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTriggerConfig {
  trigger: string | HTMLElement;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
  markers?: boolean;
  start?: string;
  end?: string;
}

export function useScrollTrigger(config: ScrollTriggerConfig) {
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: config.trigger,
      onEnter: config.onEnter,
      onLeave: config.onLeave,
      onEnterBack: config.onEnterBack,
      onLeaveBack: config.onLeaveBack,
      markers: config.markers || false,
      start: config.start || 'top center',
      end: config.end || 'bottom center',
    });

    return () => {
      trigger.kill();
    };
  }, [config]);
}

export function createScrollReveal(element: HTMLElement | null, delay = 0) {
  if (!element) return;

  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 100,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
      },
    }
  );
}
