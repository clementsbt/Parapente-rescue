import Link from "next/link";
import Image from "next/image";

const FOREST = "#1A3829";

const services = [
  { title: "Accrocs & Déchirures", img: "https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=800&h=600&fit=crop&auto=format", desc: "Intervention sur les micro déchirures et accrocs superficiels. Application de patchs autocollants techniques ou coutures selon la criticité de la zone affectée, garantissant aucune altération du profil aérodynamique.", bullets: ["Tissu Porcher Marine d'origine", "Joncs de rigidification de rechange d'usine", "Respect de la tension structurelle"] },
  { title: "Panneaux Ripstop", img: "https://images.unsplash.com/photo-1606501126768-b78d4569d3f9?w=800&h=600&fit=crop&auto=format", desc: "Remplacement complet de panneaux endommagés. Découture précise et intégration d'un nouveau tissu respectant le grammage et l'élasticité d'origine de la voile.", bullets: ["Contrôle systématique laser du calage", "Fils polyester haute ténacité", "Résistance certifiée"] },
  { title: "Bords d'attaque, fuite & stabilos", img: "https://images.unsplash.com/photo-1568288796918-03e7d93306bd?w=800&h=600&fit=crop&auto=format", desc: "Restauration des zones de haute contrainte aérodynamique. Reconstruction des mylars du bord d'attaque, renforcement du bord de fuite effiloché, et réparation des oreilles (stabilos) souvent exposées aux frottements.", bullets: ["Reproduction des points d'usine", "Renforts dacron auto-adhésif", "Garantie aérodynamique"] },
  { title: "Suspentes & Ancrages", img: "https://images.unsplash.com/photo-1739117441029-9f2a8e59e8b2?w=800&h=600&fit=crop&auto=format", desc: "Remplacement à l'identique de suspentes rompues (Dyneema, Kevlar) et réparation des points d'ancrage arrachés (pattes d'attache). Re-calibrage de la longueur sous tension standardisée.", bullets: ["Curseurs YKK robustes", "Bandes velcro de qualité marine", "Double piqûre anti-arrachement"] },
];

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>
      {children}
    </span>
  );
}

export default function Reparations() {
  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <Tag>Catalogue technique</Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight" style={{ fontFamily: "var(--font-fraunces), serif" }}>
            Réparation de voiles de parapente
          </h1>
          <p className="mt-4 text-sm max-w-xl leading-relaxed" style={{ color: "#B5CAB8" }}>
            Chaque intervention respecte minutieusement le cahier des charges constructeur. Nous garantissons la solidité et l'aérologie d'origine de votre aile.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 md:px-14 max-w-6xl mx-auto">
        <div className="space-y-20">
          {services.map((s, i) => (
            <div key={s.title} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-fraunces), serif", color: "#111C17" }}>{s.title}</h2>
                <p className="text-sm leading-relaxed mb-6" style={{ color: "#3D4D43" }}>{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-3 text-sm" style={{ color: "#3D4D43" }}>
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: FOREST }} />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`h-72 rounded-sm overflow-hidden ${i % 2 === 1 ? "lg:order-1" : ""}`} style={{ background: "#D8E8DC" }}>
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 px-8 md:px-14" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <Tag>Avant / Après</Tag>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-fraunces), serif", color: "#111C17" }}>
            Découvrez la qualité de nos réparations
          </h2>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="space-y-3">
                <div className="aspect-[4/3] rounded-sm overflow-hidden flex items-center justify-center" style={{ background: "#EBF3ED" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#B5CAB8" }}>Avant</span>
                </div>
                <div className="aspect-[4/3] rounded-sm overflow-hidden flex items-center justify-center" style={{ background: "#D8E8DC" }}>
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: FOREST }}>Après</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-16 px-8 text-center">
        <Link href="/contact" className="text-sm font-semibold px-8 py-3 rounded-sm" style={{ background: FOREST, color: "#F6F8F5" }}>
          Demander un devis →
        </Link>
      </div>
    </>
  );
}
