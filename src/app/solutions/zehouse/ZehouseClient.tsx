'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/lib/supabaseClient';

// ── Real estate SVG animated background elements ─────────────────────────────
function RealEstateAnimations() {
  return (
    <>
      <style>{`
        @keyframes floatUp { 0%,100%{transform:translateY(0) rotate(-3deg);} 50%{transform:translateY(-22px) rotate(3deg);} }
        @keyframes floatDown { 0%,100%{transform:translateY(-12px) rotate(2deg);} 50%{transform:translateY(10px) rotate(-2deg);} }
        @keyframes spinSlow { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes pulsePing { 0%,100%{transform:scale(1);opacity:0.6;} 50%{transform:scale(1.18);opacity:1;} }
        @keyframes driftRight { 0%,100%{transform:translateX(0) translateY(0) rotate(-1deg);} 50%{transform:translateX(18px) translateY(-10px) rotate(2deg);} }
        @keyframes driftLeft { 0%,100%{transform:translateX(0) translateY(-8px) rotate(1deg);} 50%{transform:translateX(-14px) translateY(6px) rotate(-2deg);} }
      `}</style>

      {/* House 1 - large, top right */}
      <div className="absolute top-16 right-12 opacity-[0.07] pointer-events-none" style={{animation:'floatUp 6s ease-in-out infinite'}}>
        <svg width="110" height="110" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 32L32 6L60 32" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" className="text-primary"/>
          <rect x="12" y="32" width="40" height="26" rx="2" stroke="currentColor" strokeWidth="3" className="text-primary"/>
          <rect x="26" y="42" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <rect x="16" y="36" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="38" y="36" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <path d="M32 6L44 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
          <rect x="40" y="4" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
        </svg>
      </div>

      {/* Building - bottom left */}
      <div className="absolute bottom-24 left-8 opacity-[0.06] pointer-events-none" style={{animation:'floatDown 8s ease-in-out infinite'}}>
        <svg width="80" height="100" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="10" width="40" height="54" rx="2" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <rect x="0" y="24" width="48" height="40" rx="2" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <rect x="8" y="28" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="21" y="28" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="34" y="28" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="8" y="42" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="21" y="42" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="34" y="42" width="6" height="7" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <rect x="18" y="54" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <path d="M14 10V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
          <path d="M34 10V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
          <path d="M24 10V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
        </svg>
      </div>

      {/* Key - top left floating */}
      <div className="absolute top-32 left-1/4 opacity-[0.06] pointer-events-none" style={{animation:'driftLeft 7s ease-in-out infinite'}}>
        <svg width="70" height="70" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <circle cx="16" cy="16" r="6" stroke="currentColor" strokeWidth="2" className="text-primary"/>
          <path d="M28 20L44 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-primary"/>
          <path d="M38 30L42 34L38 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"/>
          <path d="M34 34H38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
        </svg>
      </div>

      {/* Location pin - right middle */}
      <div className="absolute top-1/2 right-1/4 opacity-[0.06] pointer-events-none" style={{animation:'pulsePing 4s ease-in-out infinite'}}>
        <svg width="55" height="55" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C9.373 2 4 7.373 4 14C4 22 16 38 16 38C16 38 28 22 28 14C28 7.373 22.627 2 16 2Z" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <circle cx="16" cy="14" r="5" stroke="currentColor" strokeWidth="2" className="text-primary"/>
        </svg>
      </div>

      {/* Small house 2 - mid left */}
      <div className="absolute top-2/3 left-16 opacity-[0.05] pointer-events-none" style={{animation:'driftRight 9s ease-in-out infinite'}}>
        <svg width="55" height="55" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 20L20 4L38 20" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" className="text-primary"/>
          <rect x="8" y="20" width="24" height="18" rx="1" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <rect x="16" y="27" width="8" height="11" rx="1" stroke="currentColor" strokeWidth="2" className="text-primary"/>
        </svg>
      </div>

      {/* Currency/coin - floating */}
      <div className="absolute top-20 left-2/3 opacity-[0.05] pointer-events-none" style={{animation:'floatDown 5s ease-in-out infinite', animationDelay:'1s'}}>
        <svg width="50" height="50" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2.5" className="text-primary"/>
          <path d="M16 8v16M12 10.5h6a3.5 3.5 0 010 7h-4a3.5 3.5 0 000 7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
        </svg>
      </div>
    </>
  );
}

// ── Animated counter hook ─────────────────────────────────────────────────
function useCounter(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (ref.current) return;
    ref.current = true;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ── App Phone Mockup ──────────────────────────────────────────────────────
function PhoneMockup() {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { label: 'Accueil', color: 'from-indigo-500/20 to-violet-500/20', icon: '🏠' },
    { label: 'Annonces', color: 'from-cyan-500/20 to-blue-500/20', icon: '🔍' },
    { label: 'Favoris', color: 'from-rose-500/20 to-pink-500/20', icon: '❤️' },
    { label: 'Profil', color: 'from-amber-500/20 to-orange-500/20', icon: '👤' },
  ];
  useEffect(() => {
    const t = setInterval(() => setActiveScreen(s => (s + 1) % screens.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative mx-auto w-[220px]">
      {/* Glow */}
      <div className="absolute inset-0 bg-indigo-500/20 blur-[60px] rounded-full scale-150" />
      {/* Phone frame */}
      <div className="relative bg-[#0a0d14] border-2 border-white/20 rounded-[36px] p-3 shadow-2xl shadow-black/50">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#050810] rounded-full z-10" />
        {/* Screen */}
        <div className={`h-[380px] rounded-[28px] bg-gradient-to-b ${screens[activeScreen].color} overflow-hidden relative transition-all duration-700`}>
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-8 pb-3">
            <span className="text-[10px] text-white/60 font-mono">9:41</span>
            <div className="flex gap-1">
              <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
              <div className="w-1 h-1.5 bg-white/60 rounded-sm" />
            </div>
          </div>
          {/* Content */}
          <div className="px-4">
            <div className="text-4xl text-center mb-2">{screens[activeScreen].icon}</div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">{screens[activeScreen].label}</p>
              <p className="text-white/50 text-xs mt-1">ZEHOUSE</p>
            </div>
            {/* Mock cards */}
            <div className="mt-4 space-y-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white/10 rounded-2xl p-3 flex gap-3 items-center backdrop-blur">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex-shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-2 bg-white/20 rounded-full" style={{ width: `${60 + i * 15}%` }} />
                    <div className="h-1.5 bg-white/10 rounded-full" style={{ width: `${40 + i * 10}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Home indicator */}
        <div className="mt-2 mx-auto w-16 h-1 bg-white/20 rounded-full" />
      </div>
      {/* Screen dots */}
      <div className="flex justify-center gap-2 mt-5">
        {screens.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveScreen(i)}
            className={`rounded-full transition-all duration-300 ${i === activeScreen ? 'w-5 h-1.5 bg-indigo-400' : 'w-1.5 h-1.5 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
}

// ── Listings Section ──────────────────────────────────────────────────────
function ListingsSection({ pageT }: { pageT: any }) {
  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [maxPrice, setMaxPrice] = useState(5000000);
  const [minSurface, setMinSurface] = useState(0);

  useEffect(() => {
    supabase.from('user_listings').select('*').eq('is_active', true).order('created_at', { ascending: false })
      .then(({ data }) => { setListings(data || []); setLoading(false); });
  }, []);

  const filtered = listings.filter(item => {
    const s = (item.title || '').toLowerCase().includes(search.toLowerCase()) ||
      (item.address || '').toLowerCase().includes(search.toLowerCase());
    const t = typeFilter === 'all' || item.listing_type === typeFilter;
    const p = item.price <= maxPrice;
    const sf = item.surface >= minSurface;
    return s && t && p && sf;
  });

  return (
    <section id="biens" className="py-28 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-3">Base de données live</p>
            <h2 className="font-sans text-4xl font-bold text-foreground">{pageT.search_title}</h2>
            <p className="text-muted text-sm mt-2 max-w-md">Annonces actives connectées en direct à Supabase</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'sale', 'rent'] as const).map(f => (
              <button key={f} onClick={() => setTypeFilter(f)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                  ${typeFilter === f ? 'bg-foreground text-white' : 'bg-surface border border-border hover:border-primary/40 text-muted hover:text-foreground'}`}>
                {f === 'all' ? pageT.filter_all : f === 'sale' ? pageT.filter_sale : pageT.filter_rent}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="grid sm:grid-cols-12 gap-4 bg-surface border border-border p-5 rounded-3xl mb-10 shadow-sm">
          <div className="sm:col-span-6 relative">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-muted">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </span>
            <input type="text" placeholder={pageT.search_placeholder} value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
          </div>
          <div className="sm:col-span-3">
            <input type="number" placeholder="Prix max (CFA)" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary" />
          </div>
          <div className="sm:col-span-3">
            <input type="number" placeholder="Surface min (m²)" value={minSurface} onChange={e => setMinSurface(Number(e.target.value))}
              className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary" />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-surface border border-border rounded-3xl">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-muted text-sm">{pageT.no_listings}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filtered.map(item => (
              <div key={item.id} className="bg-surface border border-border rounded-3xl overflow-hidden hover:shadow-2xl hover:border-primary/30 transition-all duration-300 group">
                <div className="h-48 relative overflow-hidden bg-muted/10">
                  <img src={item.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'}
                    alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                    ${item.listing_type === 'sale' ? 'bg-primary text-white' : 'bg-emerald-500 text-white'}`}>
                    {item.listing_type === 'sale' ? pageT.filter_sale : pageT.filter_rent}
                  </span>
                </div>
                <div className="p-5">
                  <h4 className="text-base font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-muted mb-4 flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {item.address}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="text-base font-bold text-primary font-mono">{(item.price || 0).toLocaleString()} CFA</span>
                    <span className="text-xs text-muted font-semibold">{item.surface}m² · {item.rooms}p</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ── Main Export ───────────────────────────────────────────────────────────
export default function ZehouseClient() {
  const { t } = useLanguage();
  const pageT = t.zehouse_page;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const c1 = useCounter(1200);
  const c2 = useCounter(60);
  const c3 = useCounter(95);
  const c4 = useCounter(30);

  if (!pageT) return null;

  const socialProofClients = ['Nexity', 'Foncia', 'Orpi', 'Century 21', 'BNP Paribas Real Estate', 'Bouygues Immobilier'];

  const howItWorks = [
    {
      step: '01', title: 'Créez votre compte',
      desc: 'Inscrivez-vous en quelques secondes en tant que particulier, professionnel ou agence immobilière.',
      icon: (<svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>)
    },
    {
      step: '02', title: 'Publiez vos biens',
      desc: 'Ajoutez vos annonces avec photos, description et localisation. Votre bien est en ligne en moins de 5 minutes.',
      icon: (<svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>)
    },
    {
      step: '03', title: 'Connectez & Gérez',
      desc: 'Recevez des demandes, gérez vos locations et suivez vos performances depuis votre tableau de bord.',
      icon: (<svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>)
    },
  ];

  const plans = [
    {
      name: 'Particulier',
      price: '0',
      period: 'Gratuit',
      color: 'border-border',
      highlight: false,
      features: ['5 annonces maximum', 'Accès à la recherche', 'Messagerie de base', 'Profil public'],
    },
    {
      name: 'Professionnel',
      price: '15 000',
      period: '/mois CFA',
      color: 'border-primary',
      highlight: true,
      features: ['Annonces illimitées', 'Badge vérifié', 'Statistiques avancées', 'Support prioritaire', 'Mise en avant des biens'],
    },
    {
      name: 'Agence',
      price: '45 000',
      period: '/mois CFA',
      color: 'border-border',
      highlight: false,
      features: ['Tout Pro inclus', 'Multi-agents', 'Dashboard équipe', 'API personnalisée', 'SLA garanti 99.9%'],
    },
  ];

  const faqs = [
    { q: "Qu'est-ce que ZEHOUSE ?", a: "ZEHOUSE est une plateforme immobilière intelligente connectant particuliers, professionnels et agences au Cameroun. Publiez des biens, trouvez des locations et gérez votre portefeuille immobilier depuis une seule application." },
    { q: "Comment publier une annonce ?", a: "Créez un compte, choisissez 'Publier un bien', remplissez les informations (titre, photos, prix, localisation) et validez. Votre annonce est visible immédiatement par tous les utilisateurs de la plateforme." },
    { q: "La plateforme est-elle disponible sur mobile ?", a: "Oui ! ZEHOUSE dispose d'applications natives iOS et Android. Gérez vos biens, consultez vos statistiques et répondez à vos clients depuis votre smartphone." },
    { q: "Comment fonctionne la vérification professionnelle ?", a: "Soumettez vos documents professionnels (registre de commerce, carte professionnelle). Notre équipe vérifie et attribue le badge vérifié sous 24h ouvrées." },
    { q: "Mes données sont-elles sécurisées ?", a: "Oui. ZEHOUSE utilise Supabase avec chiffrement de bout en bout, authentification sécurisée et hébergement sur des serveurs certifiés. Vos données ne sont jamais revendues." },
    { q: "Puis-je annuler mon abonnement à tout moment ?", a: "Absolument. Aucun engagement minimum. Vous pouvez résilier ou changer de plan à tout moment depuis votre espace profil." },
  ];

  const testimonials = [
    { name: 'Marie-Claire Nguimbus', role: 'Agente immobilière', text: 'ZEHOUSE a transformé ma gestion quotidienne. Je gère 40 biens depuis mon téléphone. Incroyable.', stars: 5 },
    { name: 'Jean-Baptiste Essama', role: 'Investisseur immobilier', text: 'La qualité des annonces et la facilité de contact avec les propriétaires est sans égal. Je recommande.', stars: 5 },
    { name: 'Foncia Yaoundé', role: 'Agence immobilière', text: 'Le dashboard agence est parfait. Nos 8 agents travaillent dessus au quotidien. ROI prouvé en 2 semaines.', stars: 5 },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bg transition-colors duration-300">

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section className="pt-32 pb-24 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none text-primary">
            <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] bg-gradient-end/8 rounded-full blur-[100px]" />
            <RealEstateAnimations />
          </div>
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            {/* Breadcrumb */}
            <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted flex items-center gap-2 mb-12">
              <Link href="/homepage" className="hover:text-primary transition-colors">{pageT.breadcrumb[0]}</Link>
              <span className="text-border">/</span>
              <Link href="/homepage#solutions" className="hover:text-primary transition-colors">{pageT.breadcrumb[1]}</Link>
              <span className="text-border">/</span>
              <span className="text-foreground">{pageT.breadcrumb[2]}</span>
            </p>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                {/* Brand tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {pageT.tags.map((tag: string, i: number) => (
                    <span key={i} className="font-sans text-xs font-bold tracking-widest uppercase px-4 py-1.5 bg-primary/10 text-primary rounded-full border border-primary/20">
                      {tag}
                    </span>
                  ))}
                </div>
                {/* Title with integrated house icon — logo repositionné ici, pas au-dessus du texte */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center shadow-xl shadow-primary/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  </div>
                  <h1 className="font-sans text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-none">
                    {pageT.title}
                  </h1>
                </div>
                <p className="font-sans text-2xl font-light italic text-muted mb-6">{pageT.subtitle}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-primary to-gradient-end rounded-full mb-8" />
                <p className="font-sans text-lg text-muted leading-relaxed max-w-xl bg-surface p-6 rounded-3xl border border-border shadow-sm mb-10">
                  {pageT.intro}
                </p>
                <div className="flex flex-col gap-6">
                  {/* Web App CTA */}
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-muted mb-3">Plateforme Web</h3>
                    <div className="flex flex-wrap gap-4">
                      <Link href="/solutions/zehouse/app"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-gradient-end text-white px-8 py-4 rounded-full font-sans text-sm font-bold tracking-wide uppercase hover:opacity-90 transition-all shadow-xl shadow-primary/25 hover:scale-[1.02]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        Ouvrir la version Web
                      </Link>
                      <a href="#biens"
                        className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-sans text-sm font-bold tracking-wide uppercase hover:border-primary hover:text-primary transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        Explorer les biens
                      </a>
                    </div>
                  </div>
                  
                  {/* Mobile App CTA */}
                  <div className="pt-4 border-t border-border/50 max-w-lg">
                    <h3 className="text-xs font-bold tracking-widest uppercase text-muted mb-3">Télécharger l'App Mobile</h3>
                    <div className="flex flex-wrap gap-3">
                      <button className="flex items-center gap-3 bg-foreground text-bg px-5 py-3 rounded-xl hover:bg-foreground/90 transition-colors">
                        <svg className="w-7 h-7" viewBox="0 0 384 512" fill="currentColor"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
                        <div className="text-left">
                          <div className="text-[10px] leading-none text-bg/80 mb-1">Télécharger dans l'</div>
                          <div className="text-sm font-bold leading-none">App Store</div>
                        </div>
                      </button>
                      <button className="flex items-center gap-3 bg-foreground text-bg px-5 py-3 rounded-xl hover:bg-foreground/90 transition-colors">
                        <svg className="w-7 h-7" viewBox="0 0 512 512" fill="currentColor"><path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/></svg>
                        <div className="text-left">
                          <div className="text-[10px] leading-none text-bg/80 mb-1">DISPONIBLE SUR</div>
                          <div className="text-sm font-bold leading-none">Google Play</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup */}
              <div className="flex justify-center lg:justify-end">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTERS ─────────────────────────────────────────────────── */}
        <section className="py-16 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: c1, suffix: '+', label: 'Biens publiés' },
                { value: c2, suffix: '%', label: 'Tâches admin économisées' },
                { value: c3, suffix: '%', label: 'Satisfaction locataires' },
                { value: c4, suffix: '%', label: "Éco. d'énergie" },
              ].map((s, i) => (
                <div key={i} className="group">
                  <p className="font-sans text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-gradient-end mb-2 font-mono">
                    {s.value}{s.suffix}
                  </p>
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
        <section id="comment-ca-marche" className="py-28 bg-bg">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Simple & Rapide</p>
              <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Comment ça marche ?</h2>
              <p className="text-muted max-w-lg mx-auto">De l&apos;inscription à la mise en ligne, ZEHOUSE vous guide à chaque étape.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connector line */}
              <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-primary/30 via-gradient-end/50 to-primary/30" />
              {howItWorks.map((step, i) => (
                <div key={i} className="relative bg-surface border border-border rounded-3xl p-8 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group text-center">
                  <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-primary/20 to-gradient-end/20 border border-primary/20 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-primary/60 mb-2 block">{step.step}</span>
                  <h3 className="font-sans text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────── */}
        <section id="fonctionnalites" className="py-28 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Plateforme complète</p>
              <h2 className="font-sans text-4xl font-bold text-foreground">{pageT.features_title}</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageT.features.map((f: any, i: number) => (
                <div key={i} className="bg-bg p-7 rounded-3xl border border-border group hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary text-lg">{['🏘️', '👥', '🔌', '⚡', '📈', '🔧'][i] || '✦'}</span>
                  </div>
                  <h3 className="font-sans text-base font-bold text-foreground group-hover:text-primary mb-3 transition-colors">{f.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── LIVE LISTINGS ────────────────────────────────────────────── */}
        <ListingsSection pageT={pageT} />

        {/* ── USE CASES ────────────────────────────────────────────────── */}
        <section className="py-28 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-12">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Pour tous les profils</p>
              <h2 className="font-sans text-4xl font-bold text-foreground">{pageT.use_cases_title}</h2>
            </div>
            <div className="space-y-5">
              {pageT.use_cases.map((uc: any, i: number) => (
                <div key={i} className="bg-bg rounded-3xl p-8 flex flex-col md:flex-row md:items-start gap-6 border border-border hover:border-primary/30 transition-colors group">
                  <span className="font-sans text-xs font-bold tracking-widest uppercase px-4 py-1.5 bg-gradient-to-r from-primary to-gradient-end text-white rounded-full flex-shrink-0 self-start shadow-md shadow-primary/20">
                    {uc.tag}
                  </span>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{uc.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className="py-28 bg-bg">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Ils nous font confiance</p>
              <h2 className="font-sans text-4xl font-bold text-foreground">Ce que disent nos utilisateurs</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-surface border border-border rounded-3xl p-8 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex gap-1 mb-5">
                    {Array(t.stars).fill(0).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted text-sm leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                  <div>
                    <p className="font-bold text-foreground text-sm">{t.name}</p>
                    <p className="text-xs text-muted">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ─────────────────────────────────────────────── */}
        <div className="py-12 bg-surface border-y border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <SocialProof clients={socialProofClients} caseStudy={pageT.socialProof?.caseStudy} />
          </div>
        </div>

        {/* ── PRICING ──────────────────────────────────────────────────── */}
        <section id="tarifs" className="py-28 bg-bg">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Transparent & Simple</p>
              <h2 className="font-sans text-4xl font-bold text-foreground mb-4">Tarification</h2>
              <p className="text-muted max-w-md mx-auto">Sans engagement. Changez de plan à tout moment.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {plans.map((plan, i) => (
                <div key={i} className={`bg-surface rounded-3xl p-8 border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                  ${plan.highlight ? 'border-primary shadow-xl shadow-primary/10 relative' : 'border-border hover:border-primary/30'}`}>
                  {plan.highlight && (
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-gradient-end text-white text-[11px] font-bold uppercase tracking-widest px-5 py-1.5 rounded-full shadow-lg shadow-primary/30">
                      Recommandé
                    </span>
                  )}
                  <p className="font-sans text-lg font-bold text-foreground mb-2">{plan.name}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-foreground font-mono">{plan.price}</span>
                    <span className="text-muted text-sm ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2.5 text-sm text-muted">
                        <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact"
                    className={`block text-center py-3.5 rounded-2xl text-sm font-bold uppercase tracking-wider transition-all
                      ${plan.highlight
                        ? 'bg-gradient-to-r from-primary to-gradient-end text-white shadow-lg shadow-primary/25 hover:opacity-90'
                        : 'border border-border text-foreground hover:border-primary hover:text-primary'}`}>
                    {plan.price === '0' ? 'Commencer gratuitement' : 'Choisir ce plan'}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────── */}
        <section id="faq" className="py-28 bg-surface border-y border-border">
          <div className="max-w-3xl mx-auto px-6 md:px-8">
            <div className="text-center mb-16">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Questions fréquentes</p>
              <h2 className="font-sans text-4xl font-bold text-foreground">FAQ</h2>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className={`border rounded-2xl transition-all duration-300 overflow-hidden
                  ${openFaq === i ? 'border-primary/40 bg-primary/5' : 'border-border bg-bg hover:border-primary/20'}`}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="font-sans text-sm font-bold text-foreground pr-4">{faq.q}</span>
                    <svg
                      className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ${openFaq === i ? 'rotate-45' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-5">
                      <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPONSOR AD BLOCK & PREMIUM ADVANTAGE BANNER ────────────────── */}
        <section className="py-12 bg-bg border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-8">
            {/* Simulated Google AdSense / AdMob banner for web */}
            <div className="bg-surface border border-dashed border-border rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-64 shadow-sm">
              <span className="absolute top-4 right-4 bg-foreground/10 text-muted text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                Publicité Web
              </span>
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-primary mb-2">Partenaire AdSense</p>
                <h3 className="font-sans text-xl font-bold text-foreground mb-2">Financez vos projets immobiliers avec WFast Finance</h3>
                <p className="text-muted text-sm leading-relaxed">Simulez votre crédit immobilier en 3 clics et profitez de taux préférentiels négociés pour les membres Zehouse.</p>
              </div>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center py-3 bg-bg border border-border text-foreground hover:border-primary hover:text-primary transition-all text-xs font-bold rounded-2xl uppercase tracking-wider">
                Simuler mon crédit
              </a>
            </div>

            {/* Premium Marketing Banner */}
            <div className="bg-gradient-to-br from-indigo-900 to-primary rounded-3xl p-8 relative overflow-hidden flex flex-col justify-between h-64 text-white shadow-xl shadow-primary/20">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-white/5 rounded-full blur-2xl" />
              <div>
                <span className="bg-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  Zehouse Premium
                </span>
                <h3 className="font-sans text-2xl font-bold mt-4 mb-2">Multipliez par 5 vos chances de louer ou vendre !</h3>
                <p className="text-white/80 text-sm leading-relaxed">Les abonnés Premium bénéficient de l&apos;accès exclusif aux demandes directes des acheteurs et du badge &ldquo;Vérifié&rdquo;.</p>
              </div>
              <Link href="#tarifs" className="inline-flex items-center justify-center py-3 bg-white text-primary hover:bg-white/90 transition-all text-xs font-bold rounded-2xl uppercase tracking-wider">
                Passer au Premium
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="py-28 bg-bg">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="bg-gradient-to-br from-primary/8 to-gradient-end/8 border border-primary/20 rounded-3xl p-14 relative overflow-hidden text-center">
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-end/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
              <div className="relative z-10">
                <p className="font-mono text-xs font-bold uppercase tracking-widest text-primary mb-4">Prêt à commencer ?</p>
                <h2 className="font-sans text-4xl font-bold text-foreground mb-4">{pageT.cta_text}</h2>
                <p className="font-sans text-muted mb-10 max-w-md mx-auto">Rejoignez des centaines d&apos;utilisateurs qui gèrent leur immobilier avec ZEHOUSE.</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link href="/contact"
                    className="bg-gradient-to-r from-primary to-gradient-end text-white px-10 py-4 rounded-full font-sans text-sm font-bold tracking-wide uppercase hover:opacity-90 transition-all shadow-xl shadow-primary/30 hover:scale-[1.02]">
                    {pageT.cta_button}
                  </Link>
                  <a href="#biens"
                    className="border border-border text-foreground px-10 py-4 rounded-full font-sans text-sm font-bold tracking-wide uppercase hover:border-primary hover:text-primary transition-all">
                    Explorer les biens
                  </a>
                </div>
                <p className="mt-6 text-xs text-muted">📱 App disponible sur iOS & Android · 🔒 Données sécurisées · ✅ Sans engagement</p>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
