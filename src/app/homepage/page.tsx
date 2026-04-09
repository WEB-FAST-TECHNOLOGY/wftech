import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import SolutionsSection from './components/SolutionsSection';

export const metadata: Metadata = {
  title: 'WFTECH — Studio de Solutions Numériques',
  description:
    'WFTECH est un studio startup qui crée des solutions numériques dans les domaines des services, logiciels logistiques, agricoles, de santé, e-commerce, R&D, applications mobiles et IA.',
  alternates: {
    canonical: '/homepage',
  },
  openGraph: {
    title: 'WFTECH — Studio de Solutions Numériques',
    description: 'Solutions numériques sur mesure : logistique, agriculture, santé, e-commerce, mobile, IA et R&D.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
  },
};

export default function Homepage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                name: 'WFTECH',
                url: 'https://wftech.fr',
                logo: '/assets/images/app_logo.png',
                description:
                  'Studio startup spécialisé dans la création de solutions numériques : logiciels logistiques, agricoles, de santé, e-commerce, applications mobiles, IA et R&D.',
                contactPoint: {
                  '@type': 'ContactPoint',
                  email: 'contact@wftech.fr',
                  contactType: 'customer service',
                  availableLanguage: 'French',
                },
              },
              {
                '@type': 'WebPage',
                name: 'WFTECH — Studio de Solutions Numériques',
                url: 'https://wftech.fr/homepage',
                description:
                  'WFTECH crée des solutions numériques innovantes pour les secteurs de la logistique, l\'agriculture, la santé, l\'e-commerce, le mobile et l\'IA.',
              },
              {
                '@type': 'SoftwareApplication',
                name: 'WFTECH',
                applicationCategory: 'BusinessApplication',
                offers: {
                  '@type': 'Offer',
                  description: 'Solutions numériques sur mesure : logistique, agriculture, santé, e-commerce, mobile, IA, R&D',
                },
              },
            ],
          }),
        }}
      />

      <Header />

      <main>
        {/* Hero — cinematic full-bleed photo */}
        <HeroSection />

        {/* Services — asymmetric bento grid */}
        <ServicesSection />

        {/* Solutions — 7 produits WFTECH */}
        <SolutionsSection />

        {/* Contact — split layout form */}
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}