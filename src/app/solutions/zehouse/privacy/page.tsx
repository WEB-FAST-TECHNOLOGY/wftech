import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050810] text-white py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-[#0d1117] border border-white/[0.06] rounded-3xl p-8 md:p-12 shadow-2xl">
        
        <Link href="/solutions/zehouse" className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
          Politique de Confidentialité de Zehouse
        </h1>
        <p className="text-sm text-slate-500 mb-8 font-mono">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Collecte des données</h2>
            <p>
              Dans le cadre de l'utilisation de l'application Zehouse (mobile et web), nous sommes amenés à collecter certaines données personnelles nécessaires au bon fonctionnement de nos services. Ces données incluent, sans s'y limiter :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Vos informations d'identification (nom, adresse e-mail, numéro de téléphone).</li>
              <li>Votre localisation géographique exacte ou approximative (uniquement si vous autorisez l'accès au GPS) pour vous afficher les annonces et services à proximité.</li>
              <li>Le contenu de vos annonces, messages échangés via notre système de chat, et médias (photos des biens).</li>
              <li>Les informations relatives à vos transactions financières (via nos partenaires de paiement sécurisé).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Utilisation de vos données</h2>
            <p>Vos données sont utilisées exclusivement pour :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Créer et gérer votre compte utilisateur.</li>
              <li>Faciliter la mise en relation entre propriétaires, agents immobiliers et clients.</li>
              <li>Vous géolocaliser sur la carte interactive pour une recherche immobilière optimale.</li>
              <li>Assurer la sécurité de la plateforme (modération des fausses annonces et blocage des utilisateurs abusifs).</li>
              <li>Vous envoyer des notifications Push relatives à vos annonces ou alertes de recherche.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Partage des informations</h2>
            <p>
              Zehouse, édité par Web Fast Technology, s'engage à ne jamais vendre vos données personnelles à des tiers. Les informations ne sont partagées qu'avec :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Les autres utilisateurs de l'application (uniquement les informations publiques de votre profil et annonces).</li>
              <li>Nos fournisseurs de services techniques (ex: Supabase pour la base de données, Mapbox pour la cartographie, partenaires de paiement).</li>
              <li>Les autorités compétentes en cas de réquisition légale.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Conservation et Suppression</h2>
            <p>
              Nous conservons vos données tant que votre compte est actif. Vous avez le droit, à tout moment, de demander la suppression intégrale de votre compte et de vos données en nous contactant ou directement via l'application (Paramètres &gt; Supprimer le compte).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Sécurité</h2>
            <p>
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles nécessaires (chiffrement, accès restreint) pour protéger vos données contre l'accès non autorisé, l'altération, la divulgation ou la destruction.
            </p>
          </section>

          <section className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 mt-10">
            <h2 className="text-lg font-bold text-indigo-400 mb-2">6. Nous contacter</h2>
            <p className="text-slate-300">
              Si vous avez des questions concernant cette politique de confidentialité ou vos données personnelles, vous pouvez nous contacter à l'adresse suivante :
              <br />
              <a href="mailto:webfasttechnologysarl@gmail.com" className="text-white font-semibold hover:underline mt-2 inline-block">webfasttechnologysarl@gmail.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
