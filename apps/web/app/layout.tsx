import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TextureOverlay from '@/components/TextureOverlay';
import ProgressIndicator from '@/components/ProgressIndicator';

export const metadata: Metadata = {
  title: 'Sanctus | Contemplative Prayer for Health & Performance',
  description:
    'Sanctus is a wellness wearable and companion app rooted in 2,000 years of contemplative tradition — designed for the modern pursuit of health and performance. Join the waitlist.',
  keywords: [
    'contemplative prayer',
    'wellness wearable',
    'Christian wellness',
    'prayer wearable',
    'Lent prayer',
    'guided prayer',
    'spiritual formation',
    'health and performance',
    'restorative practice',
    'contemplative tradition',
  ],
  authors: [{ name: 'Sanctus Health & Performance' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Sanctus | Contemplative Prayer for Health & Performance',
    description:
      'Sanctus is a wellness wearable and companion app rooted in 2,000 years of contemplative tradition — designed for health and performance. Join the waitlist.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sanctus Health & Performance',
    url: 'https://sanctusprayer.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanctus | Contemplative Prayer for Health & Performance',
    description:
      'Sanctus is a wellness wearable and companion app rooted in 2,000 years of contemplative tradition — designed for health and performance.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Sanctus Health & Performance',
              url: 'https://sanctusprayer.com',
              description:
                'A wellness wearable and companion app rooted in 2,000 years of Christian contemplative tradition, designed for health and performance.',
              founder: {
                '@type': 'Person',
                name: 'Harrison Schertzinger',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <TextureOverlay />
        <Navigation />
        <ProgressIndicator />
        {children}
        <Footer />
      </body>
    </html>
  );
}
