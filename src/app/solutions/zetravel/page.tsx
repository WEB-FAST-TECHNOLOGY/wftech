import React from 'react';
import type { Metadata } from 'next';
import ZetravelClient from './ZetravelClient';

export const metadata: Metadata = {
  title: 'ZETRAVEL — Voyages sans friction | WFTECH',
  description: 'Application de planification et réservation de voyages avec itinéraires personnalisés, gestion des réservations et expériences sur mesure.',
  alternates: { canonical: '/solutions/zetravel' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'ZETRAVEL — Voyages sans friction',
    description: 'Application de planification et réservation de voyages avec itinéraires personnalisés.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'ZETRAVEL — Plateforme de voyage',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZETRAVEL — Voyages sans friction',
    description: 'Application de planification et réservation de voyages avec itinéraires personnalisés.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function ZetravelPage() {
  return <ZetravelClient />;
}
