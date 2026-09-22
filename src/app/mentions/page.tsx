import { COLORS } from "@/theme";

const FOREST = COLORS.forest;

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "COLORS.lightGreen", color: FOREST }}>
      {children}
    </span>
  );
}

export default function Mentions() {
  const sections = [
    { title: "1. Éditeur du Site", content: "Le présent site internet Parapente Rescue est édité et exploité sous la responsabilité légale de l'entreprise individuelle :\n\n• Dénomination sociale : Parapente Rescue SAS\n• Siège social : 19 route des thermes, 38570 Goncelin, France\n• Immatriculation : RCS Annecy B 889 001 122\n• TVA Intracommunautaire : FR 45 889 001 122\n• Direction : Marc Lemoine & Pierre Vasseur" },
    { title: "2. Hébergement", content: "Le site internet Parapente Rescue est hébergé de manière sécurisée en Europe par la société d'infrastructure technologique :\n\nScaleway Cloud SAS\n8 rue de la Ville l'Évêque, 75008 Paris, France.\nTéléphone assistance : +33 (0)1 84 13 00 00." },
    { title: "3. Données Personnelles (RGPD)", content: "Conformément au Règlement Général sur la Protection des Données (RGPD), l'atelier s'engage à préserver la stricte confidentialité des données fournies (notamment via le formulaire de devis). Vos données de contact ne sont utilisées que dans le cadre unique de l'élaboration de vos fiches de diagnostic et de l'envoi de votre matériel réparé.\n\nVous disposez à tout moment d'un droit d'accès, de rectification ou de suppression de vos données personnelles sur simple demande par email à l'adresse privacy@parapenterescue.fr." },
    { title: "4. Politique de Cookies", content: "Nous utilisons des cookies uniquement techniques essentiels au bon fonctionnement du site (mémorisation de vos formulaires en cours). Aucun cookie publicitaire ou de tracking tiers n'est déposé sans votre consentement éclairé lors de votre première visite." },
    { title: "5. Propriété Intellectuelle", content: "L'ensemble du contenu du présent site (textes originaux, photographies de l'atelier de Goncelin, graphismes et logo original) est la propriété intellectuelle exclusive de Parapente Rescue SAS. Toute reproduction ou copie, totale ou partielle, de ces éléments sans autorisation préalable écrite est passible de poursuites au titre de la contrefaçon." },
  ];

  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <Tag>Cadre Juridique</Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>Mentions Légales & CGV</h1>
        </div>
      </section>
      <section className="py-20 px-8 md:px-14 max-w-4xl mx-auto">
        <div className="mb-10 p-6 rounded-sm" style={{ background: "#EBF3ED" }}>
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#B5CAB8" }}>Somnaire</p>
          <ul className="space-y-1">{sections.map((s) => <li key={s.title} className="text-sm" style={{ color: FOREST }}>{s.title}</li>)}</ul>
        </div>
        <div className="space-y-12">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: "var(--font-fraunces), serif", color: "COLORS.textDark" }}>{s.title}</h2>
              <p className="text-sm leading-loose whitespace-pre-line" style={{ color: "COLORS.textLight" }}>{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
