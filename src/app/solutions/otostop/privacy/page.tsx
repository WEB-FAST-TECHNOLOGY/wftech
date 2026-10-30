import React from 'react';
import Link from 'next/link';

export default function OtostopPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050810] text-white py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-[#0d1117] border border-white/[0.06] rounded-3xl p-8 md:p-12 shadow-2xl">
        
        <Link href="/solutions/otostop" className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à Otostop
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 mb-4">
          Politique de Confidentialité — Otostop
        </h1>
        <p className="text-sm text-slate-500 mb-8 font-mono">Édité par WF Technology — Dernière mise à jour : 30 Octobre 2026</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
          
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Introduction</h2>
            <p>
              La présente Politique de Confidentialité s'applique à l'application mobile <strong>Otostop</strong> (ci-après « l'Application »), développée et exploitée par <strong>WF Technology SARL</strong> (« nous », « notre »).
              Otostop est une solution de covoiturage et de mise en relation de confiance entre conducteurs et passagers. Nous nous engageons à protéger vos données personnelles avec les standards de sécurité les plus stricts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Données collectées</h2>
            <p>
              Dans le cadre de l'utilisation d'Otostop, nous collectons les données strictement nécessaires au bon déroulement de vos trajets :
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-400">
              <li><strong className="text-white">Identité et profil :</strong> nom, prénom, numéro de téléphone, adresse email, photo de profil.</li>
              <li><strong className="text-white">Vérification conducteur :</strong> permis de conduire, carte grise et photo du véhicule (sécurité des usagers et contrôle d'authenticité).</li>
              <li><strong className="text-white">Données de localisation GPS (Premier plan et Arrière-plan) :</strong> position géographique en temps réel pendant un trajet actif pour permettre le suivi cartographique, le calcul d'itinéraires, l'estimation des temps d'arrivée (ETA) et les alertes de proximité radar.</li>
              <li><strong className="text-white">Historique et transactions :</strong> détails des réservations, trajets proposés, avis, évaluations et montants réglés via nos partenaires de paiement sécurisé (CinetPay, Moneroo, Mobile Money).</li>
              <li><strong className="text-white">Communications in-app :</strong> appels et échanges audio en direct entre conducteur et passager via l'infrastructure Agora RTC sans divulgation des numéros privés.</li>
            </ul>
          </section>

          <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-amber-400 mb-2">📍 Utilisation de la Localisation en Arrière-Plan</h3>
            <p className="text-amber-200/90 text-sm">
              Otostop utilise la localisation en arrière-plan (Foreground Service Location) <strong>uniquement pendant les trajets actifs</strong> pour garantir un guidage fluide, avertir le passager lorsque le conducteur s'approche du point de rendez-vous, et sécuriser le parcours. Vos données GPS ne sont jamais revendues ni utilisées à des fins publicitaires.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Partage des données</h2>
            <p>Vos données sont confidentielles. Elles ne sont partagées qu'avec nos prestataires techniques indispensables :</p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li><strong className="text-white">Supabase :</strong> hébergement sécurisé de la base de données et authentification chiffrée.</li>
              <li><strong className="text-white">Firebase (Google) :</strong> notifications push pour le statut des réservations et des trajets.</li>
              <li><strong className="text-white">Mapbox :</strong> cartographie et calcul d'itinéraires routiers.</li>
              <li><strong className="text-white">Agora :</strong> flux audio en temps réel pour les appels.</li>
              <li><strong className="text-white">CinetPay & Moneroo :</strong> traitement conforme et sécurisé des paiements.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Sécurité et conservation</h2>
            <p>
              Toutes les données en transit sont chiffrées (HTTPS / TLS). Vos données de compte sont conservées tant que votre compte reste actif. Les informations comptables et de trajets sont archivées conformément aux obligations légales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Vos droits et Suppression de compte</h2>
            <p>
              Conformément à la réglementation sur la protection des données, vous disposez d'un droit d'accès, de rectification et de suppression totale de vos données personnelles.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
              <Link href="/solutions/otostop/delete-account" className="inline-flex items-center px-4 py-2 bg-rose-600/20 text-rose-300 border border-rose-500/30 rounded-xl hover:bg-rose-600/30 transition text-sm font-semibold">
                Demande de suppression de compte &rarr;
              </Link>
              <a href="mailto:contact@wftechsarl.com" className="inline-flex items-center px-4 py-2 bg-white/5 text-slate-300 border border-white/10 rounded-xl hover:bg-white/10 transition text-sm">
                Contacter le support DPO
              </a>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Contact</h2>
            <p className="text-slate-400">
              <strong>WF Technology SARL</strong><br />
              Email : <a href="mailto:contact@wftechsarl.com" className="text-emerald-400 hover:underline">contact@wftechsarl.com</a><br />
              Site web : <a href="https://wftechsarl.com" className="text-emerald-400 hover:underline">https://wftechsarl.com</a><br />
              Douala, Cameroun
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
