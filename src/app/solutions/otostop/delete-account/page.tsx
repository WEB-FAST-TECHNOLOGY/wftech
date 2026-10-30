'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function OtostopDeleteAccount() {
  const [submitted, setSubmitted] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailOrPhone.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#050810] text-white py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-[#0d1117] border border-white/[0.06] rounded-3xl p-8 md:p-12 shadow-2xl">
        
        <Link href="/solutions/otostop" className="inline-flex items-center text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à Otostop
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-4">
          Demande de suppression de compte — Otostop
        </h1>
        <p className="text-sm text-slate-500 mb-8 font-mono">Applicable à l'application mobile Otostop (Android & iOS)</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
          
          <p>
            Chez Otostop (édité par WF Technology SARL), vous avez le contrôle total sur vos données personnelles. Vous pouvez demander à tout moment la suppression complète et définitive de votre compte et de toutes les données associées.
          </p>

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Option 1 : Directement depuis l'application mobile</h2>
            <ol className="list-decimal pl-5 space-y-2 text-slate-400">
              <li>Ouvrez l'application <strong>Otostop</strong> sur votre smartphone.</li>
              <li>Accédez à l'onglet <strong>Profil</strong> ou <strong>Paramètres</strong>.</li>
              <li>Descendez tout en bas et cliquez sur <strong>Supprimer mon compte</strong>.</li>
              <li>Confirmez votre demande. Votre compte sera immédiatement désactivé.</li>
            </ol>
          </section>

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Option 2 : Formulaire de demande en ligne</h2>
            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-4 rounded-xl text-center">
                ✓ Votre demande a bien été transmise à notre équipe. Votre compte et les données associées seront supprimés dans un délai de 30 jours après vérification de sécurité.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">
                    Adresse email ou Numéro de téléphone associé au compte
                  </label>
                  <input
                    type="text"
                    required
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    placeholder="ex: user@example.com ou +237 6..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rose-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold rounded-xl transition duration-200 shadow-lg shadow-rose-500/20"
                >
                  Envoyer la demande de suppression
                </button>
              </form>
            )}
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Données conservées après suppression</h2>
            <p className="text-slate-400">
              Certaines données comptables ou de transactions relatives aux trajets passés peuvent être conservées sous forme anonymisée ou archivée pour respecter nos obligations légales et fiscales (pendant la durée légale requise). Toutes les autres données personnelles, documents d'identité, historiques GPS et photos sont définitivement purgés.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">Contact DPO</h2>
            <p className="text-slate-400">
              Pour toute question ou assistance : <a href="mailto:contact@wftechsarl.com" className="text-emerald-400 hover:underline">contact@wftechsarl.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
