'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { PromoCard } from './PromoCard';

gsap.registerPlugin(ScrollTrigger);

const promotions = [
  {
    title: 'Summer Collection',
    discount: '40%',
    description: 'Premium fashion items from top designers',
    featured: true,
  },
  {
    title: 'Tech Gadgets',
    discount: '30%',
    description: 'Latest electronics and accessories',
  },
  {
    title: 'Beauty & Wellness',
    discount: '25%',
    description: 'Luxury beauty and spa products',
  },
  {
    title: 'Accessories',
    discount: '35%',
    description: 'Designer bags, watches, and more',
  },
  {
    title: 'Home Décor',
    discount: '20%',
    description: 'Premium home and lifestyle items',
  },
];

export function Promotions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
        },
      }
    );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-black py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
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
          Featured Promotions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
          {promotions.map((promo, index) => (
            <PromoCard
              key={index}
              title={promo.title}
              discount={promo.discount}
              description={promo.description}
              featured={promo.featured}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
