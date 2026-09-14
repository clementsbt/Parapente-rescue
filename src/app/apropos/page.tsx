const FOREST = "#1A3829";

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>
      {children}
    </span>
  );
}

export default function APropos() {
  return (
    <>
      <section className="pt-32 pb-16 px-8 md:px-14" style={{ background: FOREST }}>
        <div className="max-w-6xl mx-auto">
          <Tag>L'humain et la technique</Tag>
          <h1 className="text-4xl md:text-5xl font-bold text-white" style={{ fontFamily: "var(--font-fraunces), serif" }}>
            Derrière Parapente Rescue
          </h1>
          <p className="mt-4 text-sm max-w-xl leading-relaxed" style={{ color: "#B5CAB8" }}>
            Né d'une passion inébranlable pour le vol libre et d'une exigence méticuleuse pour la sécurité. Nous ne réparons pas seulement du tissu, nous préservons votre liberté dans les airs.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-base leading-loose mb-6" style={{ color: "#3D4D43" }}>
              Chaque point de couture, chaque suspente est vérifiée avec des instruments de mesure calibrés. Notre tolérance à l'erreur est de zéro, car votre sécurité dépend de notre rigueur.
            </p>
            <p className="text-base leading-loose" style={{ color: "#3D4D43" }}>
              Nous sommes avant tout des pilotes. Nous comprenons l'importance d'une aile réactive et fiable. Notre mission est de vous remettre en l'air dans les meilleures conditions.
            </p>
          </div>
          <div className="h-80 rounded-sm overflow-hidden" style={{ background: "#D8E8DC" }}>
            <img src="https://images.unsplash.com/photo-1623578059518-bbdb071eab81?w=800&h=600&fit=crop&auto=format" alt="Technicien à l'atelier" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Précision Technique", text: "Chaque point de couture, chaque suspente est vérifiée avec des instruments de mesure calibrés. Notre tolérance à l'erreur est de zéro.", icon: "🔬" },
            { label: "Transparence Totale", text: "Un rapport d'intervention détaillé accompagne chaque voile réparée. Vous connaissez exactement l'état de votre équipement.", icon: "📋" },
            { label: "Passion du Vol", text: "Nous sommes avant tout des pilotes. Nous comprenons l'importance d'une aile réactive et fiable dans les airs.", icon: "🪂" },
          ].map((p) => (
            <div key={p.label} className="p-8 rounded-sm border" style={{ borderColor: "#D8E8DC" }}>
              <span className="text-3xl mb-4 block">{p.icon}</span>
              <h3 className="font-semibold mb-3 text-base" style={{ color: "#111C17" }}>{p.label}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6B7C72" }}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 px-8 md:px-14 max-w-6xl mx-auto">
        <Tag>Coulisses</Tag>
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-fraunces), serif", color: "#111C17" }}>
          Au cœur de l'atelier
        </h2>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "https://images.unsplash.com/photo-1606501126768-b78d4569d3f9?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1457972657980-4c9fddebec8d?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1739117441029-9f2a8e59e8b2?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1568288796918-03e7d93306bd?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1623578059518-bbdb071eab81?w=800&h=600&fit=crop&auto=format",
            "https://images.unsplash.com/photo-1674558281713-413dbaccb8f8?w=800&h=600&fit=crop&auto=format",
          ].map((src, i) => (
            <div key={i} className="aspect-square rounded-sm overflow-hidden" style={{ background: "#D8E8DC" }}>
              <img src={src} alt={`Atelier ${i + 1}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
