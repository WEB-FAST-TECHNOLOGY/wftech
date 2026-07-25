import React from 'react';
import type { Metadata } from 'next';
import NewsroomClient from './NewsroomClient';

export const metadata: Metadata = {
  title: 'Newsroom — WFTECH',
  description: 'Actualités, annonces et communiqués de presse de WFTECH.',
  alternates: { canonical: '/newsroom' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Newsroom — WFTECH',
    description: 'Actualités, annonces et communiqués de presse de WFTECH.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — Actualités et communiqués',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsroom — WFTECH',
    description: 'Actualités, annonces et communiqués de presse de WFTECH.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Newsroom() {
  return <NewsroomClient />;
}
