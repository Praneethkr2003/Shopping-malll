'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface DiningCardProps {
  name: string;
  cuisine: string;
  rating: number;
  delay?: number;
}

export function DiningCard({ name, cuisine, rating, delay = 0 }: DiningCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
        },
      }
    );
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden rounded-lg bg-gradient-to-br from-neutral-900 to-black border border-cyan-500/30 hover:border-cyan-400/60 transition-all cursor-pointer"
    >
      {/* Image placeholder with gradient */}
      <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-pink-500/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/5 to-pink-500/10 group-hover:from-cyan-500/20 group-hover:to-pink-500/20 transition-all duration-300" />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="text-white font-bold text-lg">View Menu</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
            {name}
          </h3>
          <div className="flex gap-1">
            {Array.from({ length: Math.round(rating) }).map((_, i) => (
              <span key={i} className="text-cyan-400 text-lg">
                ★
              </span>
            ))}
          </div>
        </div>

        <p className="text-sm text-cyan-400/60 mb-4 uppercase tracking-wide">
          {cuisine}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-cyan-500/20">
          <span className="text-xs text-gray-400">FLOOR 4 - DINING</span>
          <span className="text-xs text-cyan-400 font-bold">→</span>
        </div>
      </div>
    </div>
  );
}
