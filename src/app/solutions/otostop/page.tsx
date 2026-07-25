import React from 'react';
import type { Metadata } from 'next';
import OtoStopClient from './OtoStopClient';

export const metadata: Metadata = {
  title: 'OtoStop — Mobilité intelligente | WFTECH',
  description: 'Plateforme de gestion et d\'optimisation des arrêts de transport avec suivi en temps réel et planification de trajets.',
  alternates: { canonical: '/solutions/otostop' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'OtoStop — Mobilité intelligente',
    description: 'Plateforme de gestion des arrêts de transport avec suivi en temps réel et optimisation des trajets.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'OtoStop — Plateforme de mobilité intelligente',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OtoStop — Mobilité intelligente',
    description: 'Plateforme de gestion des arrêts de transport avec suivi en temps réel et optimisation des trajets.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function OtoStopPage() {
  return <OtoStopClient />;
}
