import Link from "next/link";

const FOREST = "#1A3829";

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>
      {children}
    </span>
  );
}

export default function Processus() {
  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <Tag>Méthode & transparence</Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>
            Faire réparer votre voile, simplement.
          </h1>
          <p className="mt-4 text-sm max-w-xl leading-relaxed" style={{ color: "#B5CAB8" }}>
            Un processus transparent, pensé pour les pilotes. De la prise de contact au retour de votre équipement sur zone de décollage.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold mb-10" style={{ fontFamily: "var(--font-fraunces), serif" }}>Comment se déroule votre réparation</h2>
            <div className="space-y-10">
              {[
                { n: "01", title: "Contactez-nous", desc: "Initiez la démarche par un simple appel téléphonique ou via notre formulaire technique en ligne." },
                { n: "02", title: "Échange direct", desc: "Nous discutons précisément de la nature du dommage pour évaluer l'intervention nécessaire avant tout envoi." },
                { n: "03", title: "Envoi ou dépôt", desc: "Envoyez-nous votre voile ou déposez-la à l'atelier. Suivez nos conseils pour un pliage sécurisé." },
                { n: "04", title: "Réparation et retour", desc: "Intervention experte dans notre atelier, contrôle qualité rigoureux, puis réexpédition sécurisée vers votre domicile." },
              ].map((step) => (
                <div key={step.n} className="flex gap-6">
                  <span className="text-4xl font-bold tabular-nums flex-shrink-0 leading-none" style={{ fontFamily: "var(--font-fraunces), serif", color: "#EBF3ED" }}>{step.n}</span>
                  <div className="-mt-1">
                    <h3 className="text-base font-semibold mb-1" style={{ color: "#111C17" }}>{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7C72" }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="rounded-sm p-8 mb-8" style={{ background: "#EBF3ED" }}>
              <h2 className="text-lg font-bold mb-4" style={{ fontFamily: "var(--font-fraunces), serif" }}>Consignes d'envoi de votre voile</h2>
              <ul className="space-y-3">
                {[
                  "Retirez la sellette et le parachute de secours de la voile.",
                  "Pliez la voile de manière à ne pas créer de nouvelles contraintes sur les joncs.",
                  "Incluez la fiche de renseignement dûment remplie dans le colis.",
                  "Utilisez un carton rigide et protégez la voile avec du papier bulle ou journal.",
                ].map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#3D4D43" }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: FOREST }} />{c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-sm p-8 border" style={{ borderColor: "#D8E8DC" }}>
              <h2 className="text-lg font-bold mb-5" style={{ fontFamily: "var(--font-fraunces), serif" }}>L'Atelier</h2>
              <div className="space-y-4">
                {[
                  { label: "Adresse postale", val: "PARAPENTE RESCUE\n19 route des thermes, 38570 Goncelin, France" },
                  { label: "Téléphone & Horaires", val: "+33 (0)6 85 45 22 44\nLundi au Vendredi : 9h00 – 18h00" },
                  { label: "Email de contact", val: "atelier@parapenterescue.com" },
                ].map((item) => (
                  <div key={item.label}>
                    <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: "#B5CAB8" }}>{item.label}</p>
                    <p className="text-sm whitespace-pre-line" style={{ color: "#3D4D43" }}>{item.val}</p>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="mt-6 text-sm font-semibold px-5 py-2.5 rounded-sm block text-center" style={{ background: FOREST, color: "#F6F8F5" }}>
                Demander notre guide PDF
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="h-72 mx-6 md:mx-14 mb-0 rounded-sm overflow-hidden" style={{ background: "#D8E8DC" }}>
        <img src="https://images.unsplash.com/photo-1739117441029-9f2a8e59e8b2?w=800&h=600&fit=crop&auto=format" alt="Atelier de réparation" className="w-full h-full object-cover" />
      </div>
    </>
  );
}
