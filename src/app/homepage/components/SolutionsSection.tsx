'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';

interface Solution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  domain: string;
  tags: string[];
  icon: string;
  colSpan: string;
  rowSpan?: string;
  accent: string;
  href: string;
}

const solutions: Solution[] = [
  {
    id: '01',
    name: 'OtoStop',
    tagline: 'Mobilité intelligente',
    description:
      'Plateforme de gestion et d\'optimisation des arrêts de transport. Suivi en temps réel, planification de trajets et coordination des flux de mobilité urbaine.',
    domain: 'Transport & Mobilité',
    tags: ['Mobilité', 'Temps réel', 'Optimisation'],
    icon: 'MapPinIcon',
    colSpan: 'md:col-span-2',
    accent: 'group-hover:border-white/30',
    href: '/solutions/otostop',
  },
  {
    id: '02',
    name: 'ZEHOUSE',
    tagline: 'Habitat connecté',
    description:
      'ZEHOUSE est une plateforme de mise en relation des professionnels de l\'immobilier B2BC.',
    domain: 'Immobilier & Smart Home',
    tags: ['PropTech', 'IoT', 'Gestion'],
    icon: 'HomeIcon',
    colSpan: 'md:col-span-1',
    accent: 'group-hover:border-white/30',
    href: '/solutions/zehouse',
  },
  {
    id: '03',
    name: 'ZETRAVEL',
    tagline: 'Voyages sans friction',
    description:
      'Application de planification et réservation de voyages. Itinéraires personnalisés, gestion des réservations et expériences de voyage sur mesure.',
    domain: 'TravelTech',
    tags: ['Tourisme', 'Réservation', 'IA'],
    icon: 'GlobeAltIcon',
    colSpan: 'md:col-span-1',
    accent: 'group-hover:border-white/30',
    href: '/solutions/zetravel',
  },
  {
    id: '04',
    name: 'LogistikAgricol',
    tagline: 'Agriculture numérique',
    description:
      'Logiciel de gestion logistique agricole. Traçabilité des cultures, optimisation des stocks, coordination des livraisons et tableaux de bord pour exploitants.',
    domain: 'AgriTech & Logistique',
    tags: ['AgriTech', 'Traçabilité', 'Supply Chain'],
    icon: 'SunIcon',
    colSpan: 'md:col-span-2',
    accent: 'group-hover:border-white/30',
    href: '/solutions/logistikagricol',
  },
  {
    id: '05',
    name: 'Dirty Meta',
    tagline: 'Données brutes, insights nets',
    description:
      'DIRTY META est le Jeu immersif le plus bizarre au monde',
    domain: 'Data & Analytics',
    tags: ['Data', 'ETL', 'Métadonnées'],
    icon: 'CircleStackIcon',
    colSpan: 'md:col-span-1',
    accent: 'group-hover:border-white/30',
    href: '/solutions/dirty-meta',
  },
  {
    id: '06',
    name: 'Health-of',
    tagline: 'Santé augmentée',
    description:
      'Plateforme de suivi de santé et de bien-être. Dossiers patients numériques, téléconsultation et outils de prévention pour professionnels et patients.',
    domain: 'HealthTech',
    tags: ['Santé', 'Télémédecine', 'DMP'],
    icon: 'HeartIcon',
    colSpan: 'md:col-span-1',
    accent: 'group-hover:border-white/30',
    href: '/solutions/health-of',
  },
  {
    id: '07',
    name: 'AI-Mimicry',
    tagline: 'L\'IA qui s\'adapte',
    description:
      'Moteur d\'intelligence artificielle générative et adaptative. Agents conversationnels, automatisation de processus et modèles IA personnalisés pour chaque métier.',
    domain: 'Intelligence Artificielle',
    tags: ['LLM', 'Agents IA', 'Automatisation'],
    icon: 'CpuChipIcon',
    colSpan: 'md:col-span-2',
    accent: 'group-hover:border-white/30',
    href: '/solutions/ai-mimicry',
  },
];

export default function SolutionsSection() {
  const { t } = useLanguage();

  return (
    <section id="solutions" className="max-w-7xl mx-auto w-full px-4 md:px-6 py-20 md:py-24">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="space-y-4">
          <span className="label-tag text-muted tracking-widest block">{t.solutions.label}</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-foreground">
            {t.solutions.headline1}
            <br />
            <span className="italic font-light">{t.solutions.headline2}</span>
          </h2>
        </div>
        <p className="text-muted text-sm max-w-xs leading-relaxed md:text-right">
          {t.solutions.description}
        </p>
      </div>

      {/* Asymmetric Bento Grid — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {solutions.map((solution) => (
          <Link
            key={solution.id}
            href={solution.href}
            className={`${solution.colSpan} bg-surface border border-border rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-8 group cursor-pointer transition-all duration-500 hover:bg-foreground`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="size-12 rounded-2xl bg-bg border border-border flex items-center justify-center transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20">
                {solution.id === '01' ? (
                  <Image
                    src="/assets/images/Logos_Android_OtoStop_1-1777551579025.png"
                    alt="Logo OtoStop"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                ) : solution.id === '02' ? (
                  <Image
                    src="/assets/images/Screenshot_20260503_064014_Chrome-1778639103026.jpg"
                    alt="Logo ZEHOUSE"
                    width={32}
                    height={32}
                    className="object-contain rounded"
                  />
                ) : solution.id === '04' ? (
                  <Image
                    src="/assets/images/Screenshot_20260513_040035_Chrome-1778641301341.jpg"
                    alt="Logo LogistikAgricol"
                    width={32}
                    height={32}
                    className="object-contain rounded"
                  />
                ) : (
                  <Icon
                    name={solution.icon as Parameters<typeof Icon>[0]['name']}
                    size={22}
                    variant="outline"
                    className="text-foreground group-hover:text-white transition-colors duration-300"
                  />
                )}
              </div>
              <span className="label-tag text-muted transition-colors duration-300 group-hover:text-white/40">
                Prod_{solution.id}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3">
              <div className="flex items-baseline gap-3">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-white transition-colors duration-300">
                  {solution.name}
                </h3>
                <span className="label-tag text-muted group-hover:text-white/40 transition-colors duration-300 hidden sm:inline">
                  — {solution.tagline}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-muted group-hover:text-white/70 transition-colors duration-300">
                {solution.description}
              </p>
            </div>

            {/* Tags + Arrow */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {solution.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label-tag px-3 py-1.5 rounded-full border border-border group-hover:border-white/20 text-muted group-hover:text-white/50 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="size-9 rounded-full border border-border group-hover:border-white/30 flex items-center justify-center flex-shrink-0 transition-all duration-300">
                <Icon
                  name="ArrowUpRightIcon"
                  size={16}
                  variant="outline"
                  className="text-foreground group-hover:text-white transition-colors duration-300"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
