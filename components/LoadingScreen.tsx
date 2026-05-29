'use client';

import { useEffect, useRef, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { useIsMobile } from '@/lib/useIsMobile';

const MorphingBlob = lazy(() =>
  import('./MorphingBlob').then((mod) => ({
    default: mod.MorphingBlob,
  }))
);

export function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timeline = gsap.timeline();

    // Logo wipe animation
    timeline
      .fromTo(
        logoRef.current,
        {
          clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
          opacity: 1,
        },
        {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          duration: 1.5,
          ease: 'power2.inOut',
        }
      )
      .to(
        textRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.8'
      )
      .to(
        contentRef.current,
        {
          opacity: 0,
          delay: 1.2,
          duration: 0.8,
          pointerEvents: 'none',
        },
        0
      );
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black flex items-center justify-center z-[10000]"
    >
      {/* Background blob - hidden on mobile for performance */}
      {!isMobile && (
        <Suspense fallback={null}>
          <MorphingBlob />
        </Suspense>
      )}

      {/* Content */}
      <div
        ref={contentRef}
        className="text-center relative z-10"
      >
        <div
          ref={logoRef}
          className="text-8xl font-bold mb-6"
          style={{
            background: 'linear-gradient(135deg, #00d9ff, #ff006e)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 900,
            letterSpacing: '-0.02em',
          }}
        >
          NEXA
        </div>
        <div
          ref={textRef}
          className="text-2xl tracking-[0.3em] opacity-0 translate-y-4"
          style={{
            background: 'linear-gradient(135deg, #ff006e, #00d9ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontWeight: 300,
          }}
        >
          MALL
        </div>
      </div>
    </div>
  );
}
