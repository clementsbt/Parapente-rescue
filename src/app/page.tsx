import Link from "next/link";
import Image from "next/image";
import GoogleReviews from "@/components/GoogleReviews";
import ScrollEffect from "@/components/ScrollEffect";

const FOREST = "#1A3829";
const FOREST_DEEP = "#0F2218";

const IMG = {
  hero: "/images/atelier/Reparation-parapente-chambery-Grenoble--2048x1360.jpeg.webp",
  sewing1: "/images/atelier/machine.webp",
  sewing2: "/images/atelier/reparation-profil-parapente-Grenoble-2048x1152.jpg.webp",
  sewing3: "/images/atelier/suspente-parapente-Saint-Hilaire-1152x2048.jpg.webp",
};

function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-sm mb-4" style={{ background: "#D8E8DC", color: FOREST }}>
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <>
      {/* Mobile Hero */}
      <section className="lg:hidden pt-[64px]" style={{ background: "#fffdf9" }}>
        <div className="flex flex-col gap-[28px] px-[20px] py-[48px]">
          <h1 className="text-[38px] leading-[1.15]" style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 400, color: "#1c3328" }}>
            <span>Réparer votre voile. </span>
            <span style={{ color: "#82a390" }}>Retrouver le ciel.</span>
          </h1>

          <p className="text-[16px] leading-[1.5]" style={{ color: "#2f3e36" }}>
            Atelier spécialisé dans la réparation de voiles de parapente. Accrocs, tissu, coutures, suspentes : une solution adaptée et certifiée pour votre équipement.
          </p>

          <div className="flex flex-col gap-[12px] w-full">
            <Link
              href="/contact"
              className="flex items-center justify-center gap-[8px] w-full px-[24px] py-[14px] rounded-[999px] transition-transform hover:scale-105 active:scale-95"
              style={{ background: FOREST, boxShadow: "0px 4px 12px rgba(26,56,41,0.3)" }}
            >
              <span className="text-[14px] font-bold text-white">
                Demander un devis gratuit
              </span>
              <span className="text-white text-lg">↗</span>
            </Link>
            <Link
              href="/tarifs"
              className="flex items-center justify-center gap-[8px] w-full px-[24px] py-[14px] rounded-[999px] bg-white border-2 transition-transform hover:scale-105 active:scale-95"
              style={{ borderColor: FOREST }}
            >
              <span className="text-[14px] font-bold" style={{ color: FOREST }}>
                Voir nos tarifs
              </span>
              <span style={{ color: FOREST }} className="text-lg">↗</span>
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-[24px] px-[20px] py-[40px] w-full" style={{ background: "#e1ece5" }}>
          {[
            { val: "12+", label: "Années d'expérience" },
            { val: "100%", label: "Taux de satisfaction" },
            { val: "48h", label: "Diagnostic moyen" },
          ].map((s) => (
            <div key={s.val} className="flex flex-col gap-[4px] items-center w-full">
              <p className="text-[36px]" style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 400, color: "#1c3328" }}>{s.val}</p>
              <p className="text-[14px]" style={{ fontFamily: "var(--font-bricolage), sans-serif", fontWeight: 600, color: "#2f3e36" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Desktop Hero */}
      <section className="hidden lg:grid pt-16 min-h-screen grid-cols-2">
        <div className="flex flex-col justify-center px-14 py-0" style={{ background: "#F6F8F5" }}>
            <h1 className="text-6xl xl:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "var(--font-bricolage), sans-serif", color: "#111C17" }}>
              Réparer votre voile.<br />
              <em className="not-italic" style={{ color: FOREST }}>Retrouver le ciel.</em>
            </h1>
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: "#3D4D43" }}>
              Atelier spécialisé dans la réparation de voiles de parapente. Accrocs, tissu, coutures, suspentes : une solution adaptée et certifiée pour votre équipement.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="text-sm font-bold px-6 py-3 rounded-[999px] transition-all hover:scale-105 active:scale-95"
                style={{ background: FOREST, color: "#fff", boxShadow: "0px 4px 12px rgba(26,56,41,0.3)" }}
              >
                Demander un devis gratuit <span className="inline">↗</span>
              </Link>
              <Link
                href="/tarifs"
                className="text-sm font-bold px-6 py-3 rounded-[999px] bg-white border-2 transition-all hover:scale-105 active:scale-95"
                style={{ borderColor: FOREST, color: FOREST }}
              >
                Voir nos tarifs <span className="inline">↗</span>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-6 pt-10 border-t" style={{ borderColor: "#D8E8DC" }}>
              {[
                { val: "12+", label: "Années d'expérience" },
                { val: "100%", label: "Taux de satisfaction" },
                { val: "48h", label: "Diagnostic moyen" },
              ].map((s) => (
                <div key={s.val}>
                  <p className="text-3xl font-bold" style={{ fontFamily: "var(--font-bricolage), sans-serif", color: FOREST }}>{s.val}</p>
                  <p className="text-xs mt-1 leading-snug" style={{ color: "#6B7C72" }}>{s.label}</p>
                </div>
              ))}
            </div>
        </div>
        <div className="relative min-h-[600px]" style={{ background: "#D8E8DC" }}>
          <Image 
            src={IMG.hero} 
            alt="Parapente dans les Alpes" 
            fill
            priority
            className="object-cover" 
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,56,41,0.08), transparent)" }} />
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-8 md:px-14 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ScrollEffect>
            <Tag>Notre savoir-faire</Tag>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "var(--font-bricolage), sans-serif", color: "#111C17" }}>
              Des soins sur-mesure pour votre parapente
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#6B7C72" }}>
              Chaque intervention respecte minutieusement le cahier des charges constructeur.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: "🔧", title: "Accrocs & Déchirures", desc: "Réparation par patch collé double face ou couture bord à bord." },
                { icon: "📐", title: "Remplacement Panneaux", desc: "Découture et remplacement complet de profils intra ou extrados." },
                { icon: "🪡", title: "Bord d'attaque", desc: "Restauration des joncs Mylar et coutures de tension." },
                { icon: "⚙️", title: "Suspentes", desc: "Remplacement à l'identique de suspentes rompues." },
              ].map((c, i) => (
                <ScrollEffect key={c.title} delay={i * 0.1}>
                  <div className="p-6 rounded-sm border transition-all hover:shadow-lg hover:scale-105" style={{ borderColor: "#D8E8DC", background: "#fff" }}>
                    <div className="text-2xl mb-3">{c.icon}</div>
                    <h3 className="font-semibold text-base mb-2" style={{ color: "#111C17" }}>{c.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#6B7C72" }}>{c.desc}</p>
                  </div>
                </ScrollEffect>
              ))}
            </div>
          </ScrollEffect>
          <ScrollEffect direction="right" delay={0.2}>
            <div className="grid grid-rows-2 gap-4 h-[540px]">
              <img src={IMG.sewing1} alt="Technicien travaillant sur une voile" className="w-full h-full object-cover rounded-sm transition-transform duration-500 hover:scale-105" style={{ background: "#D8E8DC" }} />
              <div className="grid grid-cols-2 gap-4">
                <img src={IMG.sewing2} alt="Réparation tissu parapente" className="w-full h-full object-cover rounded-sm transition-transform duration-500 hover:scale-105" style={{ background: "#D8E8DC" }} />
                <img src={IMG.sewing3} alt="Couture de précision voile" className="w-full h-full object-cover rounded-sm transition-transform duration-500 hover:scale-105" style={{ background: "#D8E8DC" }} />
              </div>
            </div>
          </ScrollEffect>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 px-8 md:px-14" style={{ background: "#fff" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <ScrollEffect>
              <Tag>Méthodologie</Tag>
              <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-bricolage), sans-serif", color: "#111C17" }}>
                Comment nous sauvons votre voile
              </h2>
            </ScrollEffect>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { n: "01", title: "Décrivez", desc: "Envoyez-nous des photos et les détails des dégâts via le formulaire." },
              { n: "02", title: "Devis", desc: "Réception d'une estimation chiffrée et du délai d'intervention sous 48h." },
              { n: "03", title: "Déposez", desc: "Déposez votre matériel à l'atelier ou expédiez-le par transporteur." },
              { n: "04", title: "Récupérez", desc: "Votre aile est prête à voler. Retrait sur place ou renvoi sécurisé." },
            ].map((s, i) => (
              <ScrollEffect key={s.n} delay={i * 0.1}>
                <div className="relative p-6 rounded-sm border transition-all hover:shadow-lg hover:-translate-y-2 h-full flex flex-col justify-between" style={{ borderColor: "#D8E8DC", background: "#fff" }}>
                  <span className="text-7xl font-bold tabular-nums leading-none absolute top-2 right-4 opacity-10" style={{ fontFamily: "var(--font-bricolage), sans-serif" }}>{s.n}</span>
                  <h3 className="text-lg font-bold mb-2 relative z-10" style={{ color: "#111C17" }}>{s.title}</h3>
                  <p className="text-sm leading-relaxed relative z-10" style={{ color: "#6B7C72" }}>{s.desc}</p>
                </div>
              </ScrollEffect>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-14">
        <ScrollEffect>
          <div className="max-w-6xl mx-auto mb-12">
            <div className="flex items-center gap-3 mb-4">
              <Image 
                src="/images/GoogleLogo.svg.webp" 
                alt="Google" 
                width={24} 
                height={24}
                className="mb-1"
              />
              <Tag>Avis Google</Tag>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: "var(--font-bricolage), sans-serif", color: "#111C17" }}>
              Ils nous font confiance
            </h2>
          </div>
        </ScrollEffect>
        <GoogleReviews />
      </section>

      {/* CTA */}
      <section className="mx-6 md:mx-14 mb-0 rounded-sm py-20 px-10 text-center relative overflow-hidden" style={{ background: FOREST }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: "radial-gradient(circle, #fff 0%, transparent 70%)" }} />
        </div>
        <ScrollEffect>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white" style={{ fontFamily: "var(--font-bricolage), sans-serif" }}>
              Prêt à faire réparer votre matériel ?
            </h2>
            <p className="text-sm mb-8 opacity-70 max-w-md mx-auto" style={{ color: "#D8E8DC" }}>
              N'attendez pas que les dégâts s'aggravent. Contactez-nous pour une évaluation professionnelle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="text-sm font-bold px-6 py-3 rounded-[999px] transition-transform hover:scale-105 active:scale-95" style={{ background: "#F6F8F5", color: FOREST, boxShadow: "0px 4px 12px rgba(0,0,0,0.2)" }}>
                Demander un devis en ligne ↗
              </Link>
              <a href="tel:+33685452244" className="text-sm font-bold px-6 py-3 rounded-[999px] border-2 transition-transform hover:scale-105 active:scale-95" style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}>
                Nous appeler
              </a>
            </div>
          </div>
        </ScrollEffect>
      </section>
    </>
  );
}
