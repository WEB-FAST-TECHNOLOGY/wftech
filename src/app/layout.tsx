import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { LanguageProvider } from '@/context/LanguageContext';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'WFTECH — Développement Logiciel & Web B2B',
  description: 'WFTECH conçoit et développe des logiciels et sites web sur mesure pour les entreprises et PME. Solutions précises, fiables et scalables.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'WFTECH — Développement Logiciel & Web B2B',
    description: 'Solutions logicielles et web sur mesure pour entreprises et PME.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — Studio de solutions numériques',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WFTECH — Développement Logiciel & Web B2B',
    description: 'Solutions logicielles et web sur mesure pour entreprises et PME.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <LanguageProvider>
          {children}
        </LanguageProvider>
</body>
    </html>
  );
}