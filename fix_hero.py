import re

with open('src/app/page.tsx', 'r') as f:
    content = f.read()

# Pattern to match Desktop Hero section with ScrollEffect
old_pattern = r'''      \{/\* Desktop Hero \*/\}
      <section className="hidden lg:grid pt-16 min-h-screen grid-cols-2">
        <div className="flex flex-col justify-center px-14 py-0" style=\{\{ background: "#F6F8F5" \}\}>
          <ScrollEffect>
            <h1 className="text-6xl xl:text-7xl font-bold leading-\[1\.05\] mb-6" style=\{\{ fontFamily: "var\(--font-bricolage\), sans-serif", color: "#111C17" \}\}>
              Réparer votre voile\.<br />
              <em className="not-italic" style=\{\{ color: FOREST \}\}>Retrouver le ciel\.</em>
            </h1>
          </ScrollEffect>
          <ScrollEffect delay=\{0\.1\}>
            <p className="text-lg leading-relaxed mb-8 max-w-md" style=\{\{ color: "#3D4D43" \}\}>
              Atelier spécialisé dans la réparation de voiles de parapente\. Accrocs, tissu, coutures, suspentes : une solution adaptée et certifiée pour votre équipement\.
            </p>
          </ScrollEffect>
          <ScrollEffect delay=\{0\.2\}>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="text-sm font-bold px-6 py-3 rounded-\[999px\] transition-all hover:scale-105 active:scale-95"
                style=\{\{ background: FOREST, color: "#fff", boxShadow: "0px 4px 12px rgba\(26,56,41,0\.3)" \}\}
              >
                Demander un devis gratuit <span className="inline">↗</span>
              </Link>
              <Link
                href="/tarifs"
                className="text-sm font-bold px-6 py-3 rounded-\[999px\] bg-white border-2 transition-all hover:scale-105 active:scale-95"
                style=\{\{ borderColor: FOREST, color: FOREST \}\}
              >
                Voir nos tarifs <span className="inline">↗</span>
              </Link>
            </div>
          </ScrollEffect>
          <ScrollEffect delay=\{0\.3\}>
            <div className="mt-16 grid grid-cols-3 gap-6 pt-10 border-t" style=\{\{ borderColor: "#D8E8DC" \}\}>
              \{[
                \{ val: "12\+", label: "Années d'expérience" \},
                \{ val: "100%", label: "Taux de satisfaction" \},
                \{ val: "48h", label: "Diagnostic moyen" \},
              \]\.map\(\(s\) => \(
                <div key=\{s\.val\}>
                  <p className="text-3xl font-bold" style=\{\{ fontFamily: "var\(--font-bricolage\), sans-serif", color: FOREST \}\}>\{s\.val\}</p>
                  <p className="text-xs mt-1 leading-snug" style=\{\{ color: "#6B7C72" \}\}>\{s\.label\}</p>
                </div>
              \))\}
            </div>
          </ScrollEffect>
        </div>
        <div className="relative min-h-\[600px\]" style=\{\{ background: "#D8E8DC" \}\}>
          <ScrollEffect direction="right" duration=\{0\.8\}>
            <Image 
              src=\{IMG\.hero\} 
              alt="Parapente dans les Alpes" 
              fill
              priority
              className="object-cover" 
            />
          </ScrollEffect>
          <div className="absolute inset-0" style=\{\{ background: "linear-gradient\(to right, rgba\(26,56,41,0\.08\), transparent\)" \}\} />
        </div>
      </section>'''

new_section = '''      {/* Desktop Hero */}
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
      </section>'''

# Use simple string replace instead
content = content.replace('''      {/* Desktop Hero */}
      <section className="hidden lg:grid pt-16 min-h-screen grid-cols-2">
        <div className="flex flex-col justify-center px-14 py-0" style={{ background: "#F6F8F5" }}>
          <ScrollEffect>
            <h1 className="text-6xl xl:text-7xl font-bold leading-[1.05] mb-6" style={{ fontFamily: "var(--font-bricolage), sans-serif", color: "#111C17" }}>
              Réparer votre voile.<br />
              <em className="not-italic" style={{ color: FOREST }}>Retrouver le ciel.</em>
            </h1>
          </ScrollEffect>
          <ScrollEffect delay={0.1}>
            <p className="text-lg leading-relaxed mb-8 max-w-md" style={{ color: "#3D4D43" }}>
              Atelier spécialisé dans la réparation de voiles de parapente. Accrocs, tissu, coutures, suspentes : une solution adaptée et certifiée pour votre équipement.
            </p>
          </ScrollEffect>
          <ScrollEffect delay={0.2}>
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
          </ScrollEffect>
          <ScrollEffect delay={0.3}>
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
          </ScrollEffect>
        </div>
        <div className="relative min-h-[600px]" style={{ background: "#D8E8DC" }}>
          <ScrollEffect direction="right" duration={0.8}>
            <Image 
              src={IMG.hero} 
              alt="Parapente dans les Alpes" 
              fill
              priority
              className="object-cover" 
            />
          </ScrollEffect>
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,56,41,0.08), transparent)" }} />
        </div>
      </section>''', new_section)

with open('src/app/page.tsx', 'w') as f:
    f.write(content)

print("Done")
