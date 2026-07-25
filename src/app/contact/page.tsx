import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact — WFTECH',
  description: 'Une question ? Un projet ? Contactez WFTECH.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Contact — WFTECH',
    description: 'Une question ? Un projet ? Contactez WFTECH.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — Contact',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — WFTECH',
    description: 'Une question ? Un projet ? Contactez WFTECH.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function Contact() {
  return <ContactClient />;
}
