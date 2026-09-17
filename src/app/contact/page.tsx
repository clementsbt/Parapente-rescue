"use client";

import { useState } from "react";

const FOREST = "#1A3829";

export default function Contact() {
  const [logistics, setLogistics] = useState<"expedition" | "depot">("expedition");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      wingBrand: formData.get('wingBrand'),
      wingModel: formData.get('wingModel'),
      interventionType: formData.get('interventionType'),
      description: formData.get('description'),
      logistics,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi');
      setSubmitted(true);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-8 pt-32">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl" style={{ background: "#EBF3ED" }}>✓</div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-fraunces), serif" }}>Demande envoyée !</h2>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <p className="text-sm" style={{ color: "#6B7C72" }}>Nous vous répondrons sous 48h ouvrées avec une estimation détaillée.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>Formulaire & Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>Parlez-nous de votre voile</h1>
        </div>
      </section>
      <section className="py-20 px-8 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "var(--font-fraunces), serif" }}>Nous joindre</h2>
            <div className="space-y-5">
              {[
                { label: "Téléphone", val: "+33 (0)6 85 45 22 44", href: "tel:+33685452244" },
                { label: "Email", val: "atelier@parapenterescue.fr", href: "mailto:atelier@parapenterescue.fr" },
              ].map((c) => (
                <div key={c.label}>
                  <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#B5CAB8" }}>{c.label}</p>
                  <a href={c.href} className="text-sm font-medium" style={{ color: FOREST }}>{c.val}</a>
                </div>
              ))}
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#B5CAB8" }}>Horaires d'atelier</p>
                <p className="text-sm" style={{ color: "#3D4D43" }}>Lun – Ven : 9h00 – 18h00</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#B5CAB8" }}>Adresse</p>
                <p className="text-sm" style={{ color: "#3D4D43" }}>Parapente Rescue<br />19 route des thermes<br />38570 Goncelin, France</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B5CAB8" }}>1 · Vos Coordonnées</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Nom complet</label>
                    <input required name="fullName" placeholder="Nom Prénom" className="w-full text-sm px-4 py-3 rounded-sm border outline-none" style={{ borderColor: "#D8E8DC", background: "#fff" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Adresse email</label>
                    <input required name="email" type="email" placeholder="exemple@exemple.com" className="w-full text-sm px-4 py-3 rounded-sm border outline-none" style={{ borderColor: "#D8E8DC", background: "#fff" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Téléphone</label>
                    <input name="phone" type="tel" placeholder="Ex : 06 00 00 00 00" className="w-full text-sm px-4 py-3 rounded-sm border outline-none" style={{ borderColor: "#D8E8DC", background: "#fff" }} />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B5CAB8" }}>2 · Informations Voile</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Marque de l'aile</label>
                    <input name="wingBrand" placeholder="Ex : Ozone, Level Wings, Niviuk..." className="w-full text-sm px-4 py-3 rounded-sm border outline-none" style={{ borderColor: "#D8E8DC", background: "#fff" }} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Modèle & Taille</label>
                    <input name="wingModel" placeholder="Ex : HOOK 5, taille M..." className="w-full text-sm px-4 py-3 rounded-sm border outline-none" style={{ borderColor: "#D8E8DC", background: "#fff" }} />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B5CAB8" }}>3 · Détails & Réparation</legend>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Type d'intervention principale</label>
                    <select name="interventionType" className="w-full text-sm px-4 py-3 rounded-sm border outline-none bg-white" style={{ borderColor: "#D8E8DC", color: "#111C17" }}>
                      <option>Réparation de déchirure / panneau de tissu</option>
                      <option>Remplacement de suspentes</option>
                      <option>Bord d'attaque / fuite</option>
                      <option>Diagnostics & révision complète</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "#6B7C72" }}>Description détaillée du problème</label>
                    <textarea required name="description" rows={4} placeholder="Veuillez décrire le problème rencontré, l'origine de l'impact, ou les suspentes endommagées..." className="w-full text-sm px-4 py-3 rounded-sm border outline-none resize-none" style={{ borderColor: "#D8E8DC", background: "#fff" }} />
                  </div>
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: "#B5CAB8" }}>4 · Mode de Logistique</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: "expedition", label: "Expédition par colis", desc: "J'envoie mon aile par transporteur (Colissimo, Chronopost) après validation du devis." },
                    { id: "depot", label: "Dépôt direct à l'atelier", desc: "Je souhaite amener ma voile directement à Goncelin (Isère) sur rendez-vous." },
                  ].map((opt) => (
                    <button key={opt.id} type="button" onClick={() => setLogistics(opt.id as "expedition" | "depot")} className="p-5 rounded-sm border text-left transition-all" style={{ borderColor: logistics === opt.id ? FOREST : "#D8E8DC", background: logistics === opt.id ? "#EBF3ED" : "#fff" }}>
                      <p className="text-sm font-semibold mb-1" style={{ color: "#111C17" }}>{opt.label}</p>
                      <p className="text-xs leading-relaxed" style={{ color: "#6B7C72" }}>{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </fieldset>

              <button type="submit" disabled={loading} className="w-full py-4 rounded-sm text-sm font-semibold transition-all disabled:opacity-50" style={{ background: FOREST, color: "#F6F8F5" }}>
                {loading ? 'Envoi en cours...' : 'Envoyer la demande de devis →'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
