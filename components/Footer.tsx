'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const footerLinks = {
  Shopping: ['Browse Stores', 'Featured Brands', 'Promotions', 'Gift Cards'],
  Services: ['Concierge', 'Personal Shopping', 'Events', 'Corporate'],
  Info: ['About NEXA', 'Sustainability', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'],
};

export function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    // Stagger animation for footer sections
    const sections = footerRef.current.querySelectorAll('[data-section]');
    gsap.fromTo(
      sections,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-black border-t border-cyan-500/20 py-20 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand section */}
          <div data-section className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span
                style={{
                  background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NEXA
              </span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              The future of luxury shopping. Experience elegance, innovation, and
              world-class service in every corner.
            </p>
          </div>

          {/* Links sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} data-section>
              <h4 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-cyan-500/20 py-8 mb-8">
          {/* Social links */}
          <div className="flex justify-center gap-6 mb-8">
            {['Instagram', 'Facebook', 'LinkedIn', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-bold uppercase"
              >
                {social}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>© 2024 NEXA MALL. All rights reserved.</p>
          <p>Premium Shopping Experience</p>
        </div>
      </div>
    </footer>
  );
}
