import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — WFTECH',
  description: 'Contactez WFTECH pour discuter de votre projet. Équipe disponible pour vous accompagner.',
  alternates: { canonical: '/contact' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Contact — WFTECH',
    description: 'Contactez WFTECH pour discuter de votre projet.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — Studio de solutions numériques',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact — WFTECH',
    description: 'Contactez WFTECH pour discuter de votre projet.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}