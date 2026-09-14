"use client";

import { useState } from "react";
import Link from "next/link";

const FOREST = "#1A3829";

const FAQ_DATA = [
  { q: "Quels types de dommages réparez-vous ?", a: "Nous réparons l'ensemble des dommages sur voiles et intrados/extrados : des petits accrocs de suspente basse ou ripstop d'origine, jusqu'au remplacement intégral d'un caisson éclaté ou d'une cloison interne après impact." },
  { q: "Dois-je envoyer des photos avant d'expédier mon matériel ?", a: "Oui, il est fortement recommandé d'envoyer des photos claires des zones endommagées via notre formulaire de contact. Cela nous permet de vous fournir une estimation précise et d'anticiper les pièces nécessaires." },
  { q: "Comment puis-je demander un devis de réparation ?", a: "Via notre formulaire en ligne, par email à atelier@parapenterescue.fr, ou par téléphone au +33 (0)6 85 45 22 44. Nous vous répondons sous 48h ouvrées." },
  { q: "Quels sont les délais de réparation habituels ?", a: "Les délais varient selon la nature de l'intervention. Une réparation simple (patch, couture) est généralement réalisée en 3 à 5 jours ouvrés. Un remplacement de panneau complet peut prendre 7 à 14 jours." },
  { q: "Comment dois-je préparer ma voile pour l'expédition ?", a: "Retirez la sellette et le parachute de secours. Pliez la voile sans créer de contraintes sur les joncs. Incluez la fiche de renseignement dans le colis. Utilisez un carton rigide et protégez la voile avec du papier bulle." },
  { q: "Est-il possible de déposer mon matériel directement à l'atelier ?", a: "Oui, nous acceptons les dépôts sur rendez-vous du lundi au vendredi, de 9h à 18h. L'atelier est situé au 19 route des thermes, 38570 Goncelin, à quelques minutes de Saint-Hilaire du Touvet." },
  { q: "Comment vous contacter rapidement en cas d'urgence ?", a: "Pour toute urgence, appelez-nous directement au +33 (0)6 85 45 22 44. Pour les demandes électroniques, privilégiez atelier@parapenterescue.fr en précisant 'URGENT' en objet." },
];

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>
      {children}
    </span>
  );
}

function FaqAccordion({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b" style={{ borderColor: "#D8E8DC" }}>
      <button className="w-full flex items-center justify-between py-5 text-left" onClick={() => setOpen(!open)}>
        <span className="text-sm font-semibold pr-8" style={{ color: "#111C17" }}>{q}</span>
        <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold transition-transform" style={{ background: "#EBF3ED", color: FOREST, transform: open ? "rotate(45deg)" : "" }}>+</span>
      </button>
      {open && <p className="pb-5 text-sm leading-relaxed" style={{ color: "#6B7C72" }}>{a}</p>}
    </div>
  );
}

export default function FAQ() {
  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <Tag>Assistance & Conseils</Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>Foire Aux Questions</h1>
        </div>
      </section>
      <section className="py-20 px-8 md:px-14 max-w-3xl mx-auto">
        {FAQ_DATA.map((item) => <FaqAccordion key={item.q} q={item.q} a={item.a} />)}
        <div className="mt-16 p-10 rounded-sm text-center" style={{ background: "#EBF3ED" }}>
          <h2 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-fraunces), serif" }}>Vous ne trouvez pas votre réponse ?</h2>
          <p className="text-sm mb-6" style={{ color: "#6B7C72" }}>Notre équipe d'artisans voiliers est à votre disposition pour répondre à toutes vos interrogations techniques spécifiques.</p>
          <Link href="/contact" className="text-sm font-semibold px-6 py-3 rounded-sm inline-block" style={{ background: FOREST, color: "#F6F8F5" }}>
            Nous contacter directement →
          </Link>
        </div>
      </section>
    </>
  );
}
