import React from 'react';
import Link from 'next/link';

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-[#050810] text-white py-12 px-6 sm:px-12 lg:px-24">
      <div className="max-w-3xl mx-auto bg-[#0d1117] border border-white/[0.06] rounded-3xl p-8 md:p-12 shadow-2xl">
        
        <Link href="/solutions/zehouse" className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors mb-8">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Retour à l'accueil
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400 mb-4">
          Demande de suppression de compte
        </h1>
        <p className="text-sm text-slate-500 mb-8 font-mono">Applicable pour l'application mobile et web Zehouse</p>

        <div className="space-y-8 text-slate-300 leading-relaxed text-sm md:text-base">
          
          <p>
            Chez Zehouse (édité par Web Fast Technology), vous avez le contrôle total sur vos données personnelles. Si vous ne souhaitez plus utiliser nos services, vous pouvez demander la suppression complète et définitive de votre compte ainsi que toutes les données associées.
          </p>

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Méthode 1 : Depuis l'application mobile (Recommandé)</h2>
            <ol className="list-decimal pl-5 space-y-2 text-slate-400">
              <li>Ouvrez l'application mobile Zehouse et connectez-vous.</li>
              <li>Allez dans l'onglet <strong>Profil</strong>.</li>
              <li>Appuyez sur <strong>Paramètres</strong>.</li>
              <li>Sélectionnez l'option <strong>Supprimer mon compte</strong> en bas de la page.</li>
              <li>Confirmez votre choix. La suppression sera immédiate.</li>
            </ol>
          </section>

          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-4">Méthode 2 : Par Email</h2>
            <p className="mb-4">
              Si vous n'avez plus accès à l'application, vous pouvez demander la suppression de votre compte en contactant notre équipe d'assistance.
            </p>
            <p className="text-slate-400 mb-2">Veuillez envoyer un e-mail avec les informations suivantes :</p>
            <ul className="list-disc pl-5 space-y-2 text-slate-400 mb-6">
              <li><strong>Objet :</strong> Demande de suppression de compte Zehouse</li>
              <li><strong>Contenu :</strong> Indiquez l'adresse e-mail associée à votre compte Zehouse.</li>
            </ul>
            
            <a 
              href="mailto:webfasttechnologysarl@gmail.com?subject=Demande de suppression de compte Zehouse" 
              className="inline-flex px-6 py-3 bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-xl font-semibold hover:bg-rose-500/20 transition-colors"
            >
              Envoyer la demande par email
            </a>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Quelles données sont supprimées ?</h2>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400">
              <li>Votre profil utilisateur (Nom, Email, Téléphone, Photo).</li>
              <li>Toutes vos annonces immobilières publiées.</li>
              <li>L'historique de vos messages et chats.</li>
              <li>Vos favoris et recherches enregistrées.</li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              Note : Certaines données transactionnelles (factures d'abonnement ou paiements) peuvent être conservées à des fins légales et comptables pendant la durée exigée par la loi avant d'être anonymisées ou détruites.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
