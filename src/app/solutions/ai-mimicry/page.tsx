import React from 'react';
import type { Metadata } from 'next';
import AiMimicryClient from './AiMimicryClient';

export const metadata: Metadata = {
  title: 'AI-Mimicry — L\'IA qui s\'adapte | WFTECH',
  description: 'Moteur d\'IA générative et adaptative pour agents conversationnels, automatisation de processus et modèles IA personnalisés.',
  alternates: { canonical: '/solutions/ai-mimicry' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'AI-Mimicry — L\'IA qui s\'adapte',
    description: 'Moteur d\'IA générative pour agents conversationnels et automatisation de processus.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'AI-Mimicry — Moteur d\'intelligence artificielle',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Mimicry — L\'IA qui s\'adapte',
    description: 'Moteur d\'IA générative pour agents conversationnels et automatisation de processus.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function AiMimicryPage() {
  return <AiMimicryClient />;
}
