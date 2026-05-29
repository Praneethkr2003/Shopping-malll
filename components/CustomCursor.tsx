'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      // Update cursor position
      gsap.to(cursor, {
        x: e.clientX - 8,
        y: e.clientY - 8,
        duration: 0,
      });

      // Ring follows slightly delayed
      gsap.to(ring, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.1,
      });
    };

    const onMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.3 });
      gsap.to(ring, { opacity: 1, duration: 0.3 });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.3 });
      gsap.to(ring, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Handle interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        gsap.to(ring, {
          scale: 2,
          borderColor: 'rgb(0, 217, 255)',
          duration: 0.3,
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgb(0, 217, 255)',
          duration: 0.3,
        });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-4 h-4 bg-cyan-400 rounded-full pointer-events-none z-[9999] opacity-0"
        style={{
          boxShadow: '0 0 20px rgba(0, 217, 255, 0.8)',
        }}
      />

      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 border-2 border-cyan-400 rounded-full pointer-events-none z-[9998] opacity-0"
        style={{
          boxShadow: '0 0 30px rgba(0, 217, 255, 0.4)',
        }}
      />
    </>
  );
}
