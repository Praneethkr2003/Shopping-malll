'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface StoreCardProps {
  name: string;
  category: string;
  image?: string;
  delay?: number;
}

export function StoreCard({ name, category, delay = 0 }: StoreCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay,
        ease: 'back.out',
      }
    );

    // Hover effects
    const onMouseEnter = () => {
      gsap.to(imageRef.current, {
        scale: 1.1,
        duration: 0.3,
      });
    };

    const onMouseLeave = () => {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.3,
      });
    };

    cardRef.current.addEventListener('mouseenter', onMouseEnter);
    cardRef.current.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cardRef.current?.removeEventListener('mouseenter', onMouseEnter);
      cardRef.current?.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-64 group cursor-pointer"
    >
      <div className="relative h-80 bg-gradient-to-br from-neutral-900 to-black rounded-xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/60 transition-colors">
        <div
          ref={imageRef}
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-purple-500/20 to-pink-500/30 transition-transform duration-300"
        />
        
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl group-hover:bg-cyan-400/40 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl group-hover:bg-pink-500/40 transition-all duration-300" />
        
        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-5xl font-bold text-transparent bg-gradient-to-br from-cyan-400 to-pink-400 bg-clip-text">
            {name.charAt(0)}
          </div>
          <div className="mt-4 text-sm text-gray-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
            Explore
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>
        <p className="text-cyan-400/60 text-xs mt-2 uppercase tracking-wide">
          {category}
        </p>
      </div>
    </div>
  );
}
