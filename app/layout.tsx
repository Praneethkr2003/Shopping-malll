import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CustomCursor } from '@/components/CustomCursor';
import { SmoothScroll } from '@/components/SmoothScroll';
import { GlobalEffects } from '@/components/GlobalEffects';

const geistSans = Geist({ subsets: ['latin'] });
const geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NEXA MALL',
  description: 'Premium ultra-luxury shopping experience with cutting-edge design and technology',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${geistSans.className} bg-black text-white`}>
        <CustomCursor />
        <GlobalEffects />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
