import React from 'react';
import type { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Carrières — WFTECH',
  description: 'Rejoignez l\'\u00e9quipe WFTECH et participez à la création de solutions numériques innovantes.',
  alternates: { canonical: '/carrieres' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Carrières — WFTECH',
    description: 'Rejoignez l\'\u00e9quipe WFTECH et participez à la création de solutions numériques.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — Rejoignez notre équipe',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carrières — WFTECH',
    description: 'Rejoignez l\'\u00e9quipe WFTECH et participez à la création de solutions numériques.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Carrieres() {
  return <CareersClient />;
}
