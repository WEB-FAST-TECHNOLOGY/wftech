import React from 'react';
import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'À propos — WFTECH',
  description: 'Découvrez WFTECH, un studio startup spécialisé dans la création de solutions numériques innovantes.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'À propos — WFTECH',
    description: 'Découvrez WFTECH, un studio startup spécialisé dans la création de solutions numériques.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — À propos',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos — WFTECH',
    description: 'Découvrez WFTECH, un studio startup spécialisé dans la création de solutions numériques.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function APropos() {
  return <AboutClient />;
}
