import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TextureOverlay from '@/components/TextureOverlay';
import ProgressIndicator from '@/components/ProgressIndicator';

export const metadata: Metadata = {
  title: 'Sanctus | Renew Your Mind',
  description:
    'A spiritual training system rooted in 2,000 years of Christian contemplative tradition. Train your mind. Transform your life.',
  keywords: [
    'contemplative prayer',
    'Christian meditation',
    'spiritual training',
    'renewal of mind',
    'sacred center',
    'Christian spiritual formation',
  ],
  authors: [{ name: 'Sanctus Health & Performance' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Sanctus | Renew Your Mind',
    description:
      'A spiritual training system rooted in 2,000 years of Christian contemplative tradition.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Sanctus',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sanctus | Renew Your Mind',
    description:
      'A spiritual training system rooted in 2,000 years of Christian contemplative tradition.',
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
