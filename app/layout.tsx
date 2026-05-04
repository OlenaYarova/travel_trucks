import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/Header/Header';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
  colorScheme: 'light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://travel-trucks.vercel.app'),
  applicationName: 'TravelTrucks',
  title: {
    default: 'TravelTrucks',
    template: '%s | TravelTrucks',
  },
  description:
    'Find your perfect camper van for your next adventure with TravelTrucks.',
  keywords: [
    'camper rental',
    'campervan booking',
    'road trip',
    'travel trucks',
    'RV rental',
  ],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  manifest: '/manifest.webmanifest',
  category: 'travel',
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  openGraph: {
    title: 'TravelTrucks',
    description:
      'Find your perfect camper van for your next adventure with TravelTrucks.',
    url: 'https://travel-trucks.vercel.app',
    siteName: 'TravelTrucks',
    images: [
      {
        url: '/image/hero_2.webp',
        width: 1440,
        height: 696,
        alt: 'TravelTrucks hero image',
      },
    ],
    locale: 'uk_UA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TravelTrucks',
    description:
      'Find your perfect camper van for your next adventure with TravelTrucks.',
    images: ['/image/hero_2.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <TanStackProvider>
          <Header />
          <main>{children}</main>
        </TanStackProvider>
      </body>
    </html>
  );
}
