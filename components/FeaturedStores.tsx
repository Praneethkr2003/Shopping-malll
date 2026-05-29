'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { StoreCard } from './StoreCard';

gsap.registerPlugin(ScrollTrigger);

const stores = [
  { name: 'Luxury Couture', category: 'Fashion' },
  { name: 'Tech Hub', category: 'Electronics' },
  { name: 'Jewelry Prime', category: 'Accessories' },
  { name: 'Wellness Spa', category: 'Beauty' },
  { name: 'Gourmet Dining', category: 'Restaurants' },
  { name: 'Art Gallery', category: 'Culture' },
];

export function FeaturedStores() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current || !containerRef.current) return;

    // Title animation
    gsap.fromTo(
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
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          markers: false,
        },
      }
    );

    // Horizontal scroll animation
    gsap.to(scrollRef.current, {
      x: -((stores.length - 4) * 280),
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 1,
        markers: false,
      },
      ease: 'none',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-white mb-16"
          style={{
            background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Featured Stores
        </h2>

        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-8"
          >
            {stores.map((store, index) => (
              <StoreCard
                key={index}
                name={store.name}
                category={store.category}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
