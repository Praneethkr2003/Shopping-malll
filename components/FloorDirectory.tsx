'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FloorCard } from './FloorCard';

gsap.registerPlugin(ScrollTrigger);

const floors = [
  {
    floor: 'G',
    name: 'Ground Level',
    stores: ['Luxury Entrance', 'Welcome Hub', 'Information'],
  },
  {
    floor: '1',
    name: 'Designer Fashion',
    stores: ['Haute Couture', 'Accessories', 'Footwear', 'Jewelry'],
  },
  {
    floor: '2',
    name: 'Premium Electronics',
    stores: ['Tech Hub', 'Gaming Zone', 'Audio Systems'],
  },
  {
    floor: '3',
    name: 'Lifestyle & Wellness',
    stores: ['Beauty & Spa', 'Wellness Center', 'Sports Brands'],
  },
  {
    floor: '4',
    name: 'Dining & Entertainment',
    stores: ['Fine Dining', 'Cafés', 'Entertainment'],
  },
  {
    floor: '5',
    name: 'Culture & Art',
    stores: ['Art Gallery', 'Exhibition Space', 'Cultural Hub'],
  },
];

export function FloorDirectory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

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
        },
      }
    );

    // Subtitle animation
    gsap.fromTo(
      subtitleRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
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
        <div className="mb-16">
          <h2
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold text-white mb-4"
            style={{
              background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Floor Directory
          </h2>
          <p
            ref={subtitleRef}
            className="text-gray-400 text-lg max-w-2xl"
          >
            Explore all six floors of NEXA MALL, each designed with unique
            experiences and world-class brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {floors.map((floor, index) => (
            <FloorCard
              key={index}
              floor={floor.floor}
              name={floor.name}
              stores={floor.stores}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
