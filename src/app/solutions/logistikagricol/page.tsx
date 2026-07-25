import React from 'react';
import type { Metadata } from 'next';
import LogistikAgricolClient from './LogistikagricolClient';

export const metadata: Metadata = {
  title: 'LogistikAgricol — Agriculture numérique | WFTECH',
  description: 'Logiciel de gestion logistique agricole avec traçabilité des cultures, optimisation des stocks et coordination des livraisons.',
  alternates: { canonical: '/solutions/logistikagricol' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'LogistikAgricol — Agriculture numérique',
    description: 'Logiciel de gestion logistique agricole avec traçabilité et optimisation des stocks.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'LogistikAgricol — Plateforme agricole numérique',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LogistikAgricol — Agriculture numérique',
    description: 'Logiciel de gestion logistique agricole avec traçabilité et optimisation des stocks.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function LogistikAgricolPage() {
  return <LogistikAgricolClient />;
}
