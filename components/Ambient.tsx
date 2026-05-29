'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: '✦',
    title: 'World-Class Experience',
    description: 'Immersive shopping environment with cutting-edge technology',
  },
  {
    icon: '◆',
    title: 'Premium Brands',
    description: 'Exclusive collections from luxury brands worldwide',
  },
  {
    icon: '★',
    title: 'Personal Services',
    description: 'Concierge and personalized shopping assistance',
  },
  {
    icon: '⬢',
    title: 'Fine Dining',
    description: 'Michelin-starred restaurants and exclusive venues',
  },
];

export function Ambient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

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

    // Features stagger animation
    const featureItems = featuresRef.current?.querySelectorAll('[data-feature]');
    if (featureItems) {
      gsap.fromTo(
        featureItems,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-32 px-6 bg-black"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-5xl md:text-6xl font-bold text-white mb-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Why Choose NEXA
        </h2>

        <div
          ref={featuresRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              data-feature
              className="group p-8 rounded-lg bg-gradient-to-br from-neutral-900/50 to-black border border-cyan-500/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="text-4xl mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
