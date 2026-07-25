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
  description: 'Studio startup créant des solutions numériques innovantes : logistique, agriculture, santé, e-commerce, mobile, IA et R&D.',
  alternates: {
    canonical: '/homepage',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'WFTECH — Studio de Solutions Numériques',
    description: 'Solutions numériques innovantes : logistique, agriculture, santé, e-commerce, mobile, IA et R&D.',
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
    title: 'WFTECH — Studio de Solutions Numériques',
    description: 'Solutions numériques innovantes : logistique, agriculture, santé, e-commerce, mobile, IA et R&D.',
    images: ['/assets/images/app_logo.png'],
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
                '@id': 'https://wftech2906.builtwithrocket.new/#organization',
                name: 'WFTECH',
                url: 'https://wftech2906.builtwithrocket.new',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://wftech2906.builtwithrocket.new/assets/images/app_logo.png',
                  width: 1200,
                  height: 630,
                },
                description: 'Studio startup spécialisé dans la création de solutions numériques innovantes pour logistique, agriculture, santé, e-commerce, mobile et IA.',
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  availableLanguage: 'French',
                },
                sameAs: [],
              },
              {
                '@type': 'WebPage',
                '@id': 'https://wftech2906.builtwithrocket.new/homepage#webpage',
                url: 'https://wftech2906.builtwithrocket.new/homepage',
                name: 'WFTECH — Studio de Solutions Numériques',
                description: 'Studio startup créant des solutions numériques innovantes : logistique, agriculture, santé, e-commerce, mobile, IA et R&D.',
                isPartOf: {
                  '@id': 'https://wftech2906.builtwithrocket.new/#website',
                },
                inLanguage: 'fr',
              },
              {
                '@type': 'WebSite',
                '@id': 'https://wftech2906.builtwithrocket.new/#website',
                url: 'https://wftech2906.builtwithrocket.new',
                name: 'WFTECH',
                inLanguage: 'fr',
              },
              {
                '@type': 'SoftwareApplication',
                '@id': 'https://wftech2906.builtwithrocket.new/#softwareapplication',
                name: 'WFTECH Solutions',
                applicationCategory: 'BusinessApplication',
                description: 'Suite de solutions numériques pour logistique, agriculture, santé, e-commerce, mobile et IA.',
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'USD',
                  price: 'Contactez-nous',
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