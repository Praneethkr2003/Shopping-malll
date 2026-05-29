'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface PromoCardProps {
  title: string;
  discount: string;
  description: string;
  delay?: number;
  featured?: boolean;
}

export function PromoCard({
  title,
  discount,
  description,
  delay = 0,
  featured = false,
}: PromoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        scale: featured ? 0.8 : 0.95,
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: 'back.out(1.7)',
      }
    );
  }, [delay, featured]);

  if (featured) {
    return (
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/50 hover:border-cyan-400/80 transition-all p-12 cursor-pointer group md:col-span-2 md:row-span-2"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10">
          <div className="inline-block mb-4">
            <span className="text-sm uppercase tracking-widest text-cyan-400 font-bold">
              Limited Time
            </span>
          </div>

          <h3 className="text-4xl md:text-5xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
            {title}
          </h3>

          <div className="text-6xl md:text-7xl font-black mb-6 text-transparent bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text">
            {discount}
          </div>

          <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
            {description}
          </p>

          <button className="bg-cyan-400 text-black px-8 py-3 font-bold rounded-full hover:bg-cyan-300 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className="relative overflow-hidden rounded-lg bg-neutral-900/50 border border-cyan-500/30 hover:border-cyan-400/60 transition-all p-6 cursor-pointer group"
    >
      {/* Hover gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:to-pink-500/10 transition-all duration-300" />

      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-2xl font-bold text-cyan-400">{discount}</span>
          <span className="text-xs text-gray-400 uppercase">Off</span>
        </div>

        <h4 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
          {title}
        </h4>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">{description}</p>

        <div className="text-xs text-cyan-400/60 uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity">
          Explore →
        </div>
      </div>
    </div>
  );
}
