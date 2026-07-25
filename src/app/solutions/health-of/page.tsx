import React from 'react';
import type { Metadata } from 'next';
import HealthOfClient from './HealthOfClient';

export const metadata: Metadata = {
  title: 'Health-of — Santé augmentée | WFTECH',
  description: 'Plateforme de suivi de santé et de bien-être avec dossiers patients numériques, téléconsultation et outils de prévention.',
  alternates: { canonical: '/solutions/health-of' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Health-of — Santé augmentée',
    description: 'Plateforme de suivi de santé avec dossiers patients numériques et téléconsultation.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Health-of — Plateforme de santé numérique',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Health-of — Santé augmentée',
    description: 'Plateforme de suivi de santé avec dossiers patients numériques et téléconsultation.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function HealthOfPage() {
  return <HealthOfClient />;
}
