'use client';

import { useState, useEffect } from 'react';
import { LoadingScreen } from '@/components/LoadingScreen';
import { Hero } from '@/components/Hero';
import { FeaturedStores } from '@/components/FeaturedStores';
import { FloorDirectory } from '@/components/FloorDirectory';
import { Promotions } from '@/components/Promotions';
import { Dining } from '@/components/Dining';
import { Ambient } from '@/components/Ambient';
import { Footer } from '@/components/Footer';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading phase
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main className="relative bg-black">
      <Hero />
      <FeaturedStores />
      <FloorDirectory />
      <Promotions />
      <Dining />
      <Ambient />
      <Footer />
    </main>
  );
}
