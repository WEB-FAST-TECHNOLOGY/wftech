import React from 'react';
import type { Metadata } from 'next';
import ZehouseClient from './ZehouseClient';

export const metadata: Metadata = {
  title: 'ZEHOUSE — Habitat connecté | WFTECH',
  description: 'Solution de gestion immobilière et domotique avec pilotage des biens, suivi des locataires et automatisation des espaces de vie.',
  alternates: { canonical: '/solutions/zehouse' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'ZEHOUSE — Habitat connecté',
    description: 'Solution de gestion immobilière et domotique pour habitat intelligent.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'ZEHOUSE — Plateforme immobilière connectée',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ZEHOUSE — Habitat connecté',
    description: 'Solution de gestion immobilière et domotique pour habitat intelligent.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function ZehousePage() {
  return <ZehouseClient />;
}
