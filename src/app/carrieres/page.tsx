import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Carrières — WFTECH',
  description: 'Rejoignez l\'équipe WFTECH et participez à la création de solutions numériques innovantes.',
  alternates: { canonical: '/carrieres' },
};

interface JobOffer {
  title: string;
  department: string;
  type: string;
  location: string;
}

const jobOffers: JobOffer[] = [
  { title: 'Développeur Full-Stack', department: 'Ingénierie', type: 'CDI', location: 'Remote / Hybride' },
  { title: 'Ingénieur IA & Machine Learning', department: 'R&D', type: 'CDI', location: 'Remote' },
  { title: 'Designer UX/UI', department: 'Design', type: 'CDI', location: 'Hybride' },
  { title: 'Développeur Mobile (React Native)', department: 'Ingénierie', type: 'CDI', location: 'Remote' },
  { title: 'Chef de Projet Digital', department: 'Management', type: 'CDI', location: 'Hybride' },
];

export default function Carrieres() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
              Entreprise · Carrières
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Rejoignez-nous
            </h1>
            <div className="w-16 h-px bg-foreground" />
          </div>

          {/* Intro */}
          <div className="max-w-2xl mb-20">
            <p className="font-sans text-lg text-muted leading-relaxed">
              Chez WFTECH, nous construisons l'avenir numérique. Nous recherchons des talents passionnés, 
              curieux et ambitieux qui souhaitent avoir un impact réel à travers la technologie.
            </p>
          </div>

          {/* Why Join */}
          <div className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">Pourquoi WFTECH ?</h2>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {[
                { icon: '🚀', title: 'Projets ambitieux', desc: 'Travaillez sur des produits qui transforment des industries entières.' },
                { icon: '🌍', title: 'Impact réel', desc: 'Vos solutions touchent des milliers d\'utilisateurs à travers le monde.' },
                { icon: '📈', title: 'Évolution rapide', desc: 'Un environnement startup où vous grandissez aussi vite que l\'entreprise.' },
                { icon: '🤝', title: 'Culture collaborative', desc: 'Une équipe soudée, bienveillante et tournée vers l\'excellence.' },
              ].map((item) => (
                <div key={item.title} className="bg-white p-8 group hover:bg-foreground transition-colors">
                  <span className="text-3xl mb-4 block">{item.icon}</span>
                  <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-white mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-muted group-hover:text-white/70 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Offers */}
          <div>
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">Postes ouverts</h2>
            <div className="space-y-px bg-border">
              {jobOffers.map((job) => (
                <div
                  key={job.title}
                  className="bg-white px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-foreground transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-white">{job.title}</h3>
                    <p className="font-mono text-[11px] tracking-widest uppercase text-muted group-hover:text-white/60 mt-1">
                      {job.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-muted group-hover:text-white/60 border border-border group-hover:border-white/30 px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                    <span className="font-mono text-[11px] tracking-widest uppercase text-muted group-hover:text-white/60">
                      {job.location}
                    </span>
                    <span className="font-sans text-sm font-medium text-foreground group-hover:text-white">→</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 border border-border">
              <h3 className="font-sans text-xl font-bold text-foreground mb-2">Candidature spontanée</h3>
              <p className="font-sans text-sm text-muted mb-4">
                Vous ne trouvez pas le poste idéal ? Envoyez-nous votre candidature spontanée.
              </p>
              <a
                href="mailto:carrieres@wftech.com"
                className="inline-block font-mono text-[11px] font-medium tracking-widest uppercase bg-foreground text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-colors"
              >
                Envoyer ma candidature
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
