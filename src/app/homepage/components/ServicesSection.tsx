import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Service {
  id: string;
  label: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  colSpan: string;
}

const services: Service[] = [
  {
    id: '01',
    label: 'Service_01',
    title: 'Logistique & Transport',
    description:
      'WFTECH conçoit des logiciels de gestion logistique de bout en bout : suivi des stocks, optimisation des tournées, tableaux de bord temps réel et traçabilité des flux. Notre produit LogistikAgricol en est l\'illustration directe.',
    tags: ['Supply Chain', 'WMS', 'TMS', 'Tracking', 'LogistikAgricol'],
    icon: 'TruckIcon',
    colSpan: 'md:col-span-2',
  },
  {
    id: '02',
    label: 'Service_02',
    title: 'AgriTech',
    description:
      'Nous développons des outils numériques pour moderniser l\'agriculture : gestion des exploitations, suivi des cultures, traçabilité et aide à la décision. LogistikAgricol connecte producteurs, transporteurs et distributeurs.',
    tags: ['AgriTech', 'IoT', 'Traçabilité', 'LogistikAgricol'],
    icon: 'SunIcon',
    colSpan: 'md:col-span-1',
  },
  {
    id: '03',
    label: 'Service_03',
    title: 'HealthTech',
    description:
      'WFTECH développe des solutions de santé numérique : suivi patient, télémédecine et outils de gestion pour professionnels de santé. Notre produit Health-of centralise les données de santé pour un suivi personnalisé et continu.',
    tags: ['HealthTech', 'Télémédecine', 'Health-of', 'DMP'],
    icon: 'HeartIcon',
    colSpan: 'md:col-span-1',
  },
  {
    id: '04',
    label: 'Service_04',
    title: 'E-Commerce & Marketplace',
    description:
      'Boutiques en ligne performantes, marketplaces et expériences d\'achat optimisées. ZEHOUSE et ZETRAVEL illustrent notre capacité à créer des plateformes transactionnelles robustes dans l\'immobilier et le voyage.',
    tags: ['Marketplace', 'ZEHOUSE', 'ZETRAVEL', 'UX', 'Paiement'],
    icon: 'ShoppingCartIcon',
    colSpan: 'md:col-span-2',
  },
  {
    id: '05',
    label: 'Service_05',
    title: 'Applications Mobiles',
    description:
      'WFTECH conçoit et déploie des applications mobiles iOS et Android pour tous ses produits : OtoStop, ZEHOUSE, ZETRAVEL, Health-of et plus encore — de la conception UX/UI au lancement sur les stores.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android', 'OtoStop'],
    icon: 'DevicePhoneMobileIcon',
    colSpan: 'md:col-span-1',
  },
  {
    id: '06',
    label: 'Service_06',
    title: 'Intelligence Artificielle',
    description:
      'L\'IA est au cœur de notre studio : AI-Mimicry reproduit des comportements humains complexes via le machine learning, tandis que Dirty Meta exploite les métadonnées pour des insights stratégiques. Automatisation, NLP et agents intelligents.',
    tags: ['AI-Mimicry', 'Dirty Meta', 'LLM', 'NLP', 'ML'],
    icon: 'CpuChipIcon',
    colSpan: 'md:col-span-1',
  },
  {
    id: '07',
    label: 'Service_07',
    title: 'Recherche & Développement',
    description:
      'Notre cellule R&D explore en permanence de nouvelles technologies pour anticiper les marchés de demain. Prototypage rapide, expérimentation et innovation sont au cœur de l\'ADN de WFTECH en tant que startup studio.',
    tags: ['Prototypage', 'Innovation', 'R&D', 'Startup Studio'],
    icon: 'BeakerIcon',
    colSpan: 'md:col-span-1',
  },
  {
    id: '08',
    label: 'Service_08',
    title: 'Studio Startup & Numérique',
    description:
      'WFTECH est avant tout un startup studio : nous idéons, construisons et lançons nos propres produits numériques. De OtoStop à AI-Mimicry, chaque solution naît d\'une vision interne et d\'une expertise technique de pointe.',
    tags: ['Startup Studio', '7 Produits', 'OtoStop', 'ZEHOUSE', 'ZETRAVEL'],
    icon: 'GlobeAltIcon',
    colSpan: 'md:col-span-2',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="max-w-7xl mx-auto w-full px-4 md:px-6 py-20 md:py-24">
      {/* Section header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
        <div className="space-y-4">
          <span className="label-tag text-muted tracking-widest block">// Nos domaines</span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-none text-foreground">
            Des solutions pour
            <br />
            <span className="italic font-light">chaque secteur.</span>
          </h2>
        </div>
        <p className="text-muted text-sm max-w-xs leading-relaxed md:text-right">
          WFTECH est un startup studio qui conçoit et lance ses propres produits numériques dans 8 domaines : logistique, agriculture, santé, e-commerce, mobile, IA et R&D.
        </p>
      </div>

      {/* Bento Grid — 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <div
            key={service.id}
            className={`service-card ${service.colSpan} bg-surface border border-border rounded-3xl p-8 md:p-10 flex flex-col justify-between gap-8 group cursor-default`}
          >
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className="service-icon size-12 rounded-2xl bg-bg border border-border flex items-center justify-center transition-all duration-300">
                <Icon
                  name={service.icon as Parameters<typeof Icon>[0]['name']}
                  size={22}
                  variant="outline"
                  className="text-foreground"
                />
              </div>
              <span className="service-label label-tag text-muted transition-colors duration-300">
                {service.label}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted group-hover:text-white/70 transition-colors duration-300">
                {service.description}
              </p>
            </div>

            {/* Tags + Arrow */}
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label-tag px-3 py-1.5 rounded-full border border-border group-hover:border-white/20 text-muted group-hover:text-white/50 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="service-arrow size-9 rounded-full border border-border flex items-center justify-center flex-shrink-0 transition-all duration-300">
                <Icon name="ArrowUpRightIcon" size={16} variant="outline" className="text-foreground group-hover:text-foreground transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}