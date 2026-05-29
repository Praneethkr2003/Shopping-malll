'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface FloorCardProps {
  floor: number;
  name: string;
  stores: string[];
  delay?: number;
}

export function FloorCard({ floor, name, stores, delay = 0 }: FloorCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 30,
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
      className="group relative bg-gradient-to-br from-neutral-900/50 to-black border border-cyan-500/30 hover:border-cyan-400/60 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-pink-500/0 group-hover:from-cyan-500/10 group-hover:to-pink-500/10 rounded-lg transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-6xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors">
            {floor}
          </span>
          <span className="text-xs uppercase tracking-widest text-gray-400">
            Floor
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
          {name}
        </h3>

        <div className="flex flex-wrap gap-2">
          {stores.map((store, index) => (
            <span
              key={index}
              className="text-xs bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/50 group-hover:bg-cyan-500/30 group-hover:border-cyan-400 transition-all"
            >
              {store}
            </span>
          ))}
        </div>

        <button className="mt-6 text-sm font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">
          Explore Floor →
        </button>
      </div>
    </div>
  );
}
