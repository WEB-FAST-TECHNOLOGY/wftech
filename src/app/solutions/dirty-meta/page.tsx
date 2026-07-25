import React from 'react';
import type { Metadata } from 'next';
import DirtyMetaClient from './DirtyMetaClient';

export const metadata: Metadata = {
  title: 'Dirty Meta — Données brutes, insights nets | WFTECH',
  description: 'Outil d\'analyse et de nettoyage de métadonnées pour extraction, transformation et valorisation des données non structurées.',
  alternates: { canonical: '/solutions/dirty-meta' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Dirty Meta — Données brutes, insights nets',
    description: 'Outil d\'analyse et de nettoyage de métadonnées pour transformation des données.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Dirty Meta — Outil de nettoyage de données',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dirty Meta — Données brutes, insights nets',
    description: 'Outil d\'analyse et de nettoyage de métadonnées pour transformation des données.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function DirtyMetaPage() {
  return <DirtyMetaClient />;
}
