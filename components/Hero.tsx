'use client';

import { Suspense, lazy } from 'react';

const HeroParticles = lazy(() =>
  import('./HeroParticles').then((mod) => ({
    default: mod.HeroParticles,
  }))
);

const HeroContent = lazy(() =>
  import('./HeroContent').then((mod) => ({
    default: mod.HeroContent,
  }))
);

export function Hero() {
  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background particles */}
      <Suspense fallback={null}>
        <HeroParticles />
      </Suspense>

      {/* Hero content */}
      <Suspense fallback={null}>
        <HeroContent />
      </Suspense>
    </section>
  );
}
