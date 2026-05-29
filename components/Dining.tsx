'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { DiningCard } from './DiningCard';

gsap.registerPlugin(ScrollTrigger);

const restaurants = [
  { name: 'Éclat Fine Dining', cuisine: 'French', rating: 5 },
  { name: 'Sakura', cuisine: 'Japanese', rating: 5 },
  { name: 'La Bella Italia', cuisine: 'Italian', rating: 4.5 },
  { name: 'Spice Route', cuisine: 'Indian', rating: 4.5 },
  { name: 'The Grill House', cuisine: 'Steakhouse', rating: 5 },
  { name: 'Café Noir', cuisine: 'European', rating: 4 },
];

export function Dining() {
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
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-6xl md:text-7xl font-bold text-white mb-16"
          style={{
            background: 'linear-gradient(135deg, #ff006e, #00d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Culinary Excellence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <DiningCard
              key={index}
              name={restaurant.name}
              cuisine={restaurant.cuisine}
              rating={restaurant.rating}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
