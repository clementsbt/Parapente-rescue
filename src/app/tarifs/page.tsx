import Link from "next/link";

const FOREST = "#1A3829";

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>
      {children}
    </span>
  );
}

export default function Tarifs() {
  const cards = [
    { title: "Changement Intrados", items: [{ label: "Complet (à neuf)", price: "150€" }, { label: "Partiel", price: "80€" }, { label: "Ripstop + couture *", price: "25€*", hl: true }] },
    { title: "Changement Extrados", items: [{ label: "Complet (à neuf)", price: "140€" }, { label: "Partiel", price: "70€" }, { label: "Ripstop + couture *", price: "20€*", hl: true }] },
    { title: "Changement Profil", tag: "Le plus demandé", items: [{ label: "Complet (à neuf)", price: "200€" }, { label: "Partiel", price: "100€" }, { label: "Ripstop + couture *", price: "30€*", hl: true }] },
    { title: "Changement Diagonal", items: [{ label: "Complet (à neuf)", price: "45€" }, { label: "Partiel", price: "25€" }, { label: "Ripstop + couture *", price: "25€*", hl: true }] },
  ];

  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <Tag>Tarifs & Réparations</Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>Des tarifs transparents, adaptés</h1>
          <p className="mt-4 text-sm max-w-xl leading-relaxed" style={{ color: "#B5CAB8" }}>
            Les tarifs sont à titre indicatif, chaque réparation est différente ce qui peut impliquer certains ajustements en fonction du travail nécessaire.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="rounded-sm border overflow-hidden" style={{ borderColor: "#D8E8DC" }}>
              <div className="px-6 py-5 flex items-center justify-between" style={{ background: FOREST }}>
                <h3 className="font-bold text-white text-sm" style={{ fontFamily: "var(--font-fraunces), serif" }}>{c.title}</h3>
                {c.tag && <span className="text-xs font-semibold px-2 py-1 rounded-sm ml-2 flex-shrink-0" style={{ background: "#2A5940", color: "#D8E8DC" }}>{c.tag}</span>}
              </div>
              <div className="p-6 space-y-3">
                {c.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: "#EBF3ED" }}>
                    <span className="text-sm" style={{ color: "#3D4D43" }}>{item.label}</span>
                    <span className="text-sm font-semibold tabular-nums" style={{ color: item.hl ? "#D97706" : "#111C17" }}>{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: "Pose d'un Ripstop* sans couture", price: "15€" },
            { label: "Changement d'une suspente", price: "15€" },
          ].map((r) => (
            <div key={r.label} className="p-5 rounded-sm border flex items-center justify-between" style={{ borderColor: "#D8E8DC" }}>
              <span className="text-sm" style={{ color: "#3D4D43" }}>{r.label}</span>
              <span className="text-sm font-semibold" style={{ color: "#111C17" }}>{r.price}</span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs leading-relaxed" style={{ color: "#B5CAB8" }}>
          (*) Les réparations au Ripstop sont possibles uniquement sur des déchirures mineures ainsi que sur des zones non soumises aux contraintes.
        </p>

        <div className="mt-16 p-10 rounded-sm" style={{ background: FOREST }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-fraunces), serif" }}>Une réparation sur mesure ?</h2>
              <p className="text-sm leading-relaxed" style={{ color: "#B5CAB8" }}>N'hésitez pas à me contacter afin d'établir une estimation précise ou un devis détaillé pour votre équipement.</p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="text-sm font-semibold px-6 py-3 rounded-sm" style={{ background: "#F6F8F5", color: FOREST }}>Contacter l'atelier →</Link>
              <a href="tel:+33685452244" className="text-sm font-semibold px-6 py-3 rounded-sm border" style={{ borderColor: "rgba(255,255,255,0.3)", color: "#fff" }}>+33 (0)6 85 45 22 44</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
