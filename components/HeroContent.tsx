'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function HeroContent() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    // Text reveal animations
    timeline
      .fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      )
      .fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out',
        },
        '-=0.4'
      );
  }, []);

  return (
    <div className="relative z-20 flex flex-col items-center justify-center h-full text-center">
      <h1
        ref={titleRef}
        className="text-7xl md:text-8xl font-bold mb-6 tracking-tight"
        style={{
          background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Experience Luxury
      </h1>

      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12 leading-relaxed"
      >
        Welcome to NEXA MALL, where innovation meets elegance. Discover the
        future of shopping in an immersive environment crafted for discerning
        tastes.
      </p>

      <button
        ref={ctaRef}
        className="px-8 py-4 bg-cyan-400 text-black font-bold rounded-full hover:bg-cyan-300 transition-colors text-lg"
      >
        Explore Now
      </button>
    </div>
  );
}
