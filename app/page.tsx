import type { Metadata } from 'next';
import Hero from '@/components/Hero/Hero';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Find your perfect campervan for your next road trip with TravelTrucks.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Home | TravelTrucks',
    description:
      'Find your perfect campervan for your next road trip with TravelTrucks.',
    url: 'https://travel-trucks.vercel.app',
    images: [
      {
        url: '/image/hero_2.webp',
        width: 1440,
        height: 696,
        alt: 'Campers of your dreams',
      },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
