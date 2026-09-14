import Link from "next/link";
import Image from "next/image";

const FOREST = "#1A3829";
const FOREST_DEEP = "#0F2218";

export default function Footer() {
  return (
    <footer className="mt-24 py-16 px-6 md:px-10" style={{ background: FOREST_DEEP, color: "#D8E8DC" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <div className="relative w-10 h-10">
              <Image
                src="/images/logo/atelier-reparation-parapente-rescue-.png.webp"
                alt="Parapente Rescue"
                fill
                className="object-contain rounded-sm bg-white"
              />
            </div>
            <span className="text-sm font-semibold tracking-wide uppercase" style={{ fontFamily: "var(--font-fraunces), serif" }}>Parapente Rescue</span>
          </Link>
          <p className="text-sm leading-relaxed opacity-70 max-w-xs">
            Atelier professionnel de réparation et de révision de voiles de parapente. Basé à quelques minutes de Saint-Hilaire du Touvet.
          </p>
          <div className="mt-6 flex gap-3">
            {["IG", "FB", "YT"].map((s) => (
              <div key={s} className="w-8 h-8 rounded-sm flex items-center justify-center text-xs font-semibold cursor-pointer opacity-60 hover:opacity-100 transition-opacity" style={{ border: "1px solid #2A5940" }}>{s}</div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-40">Atelier</p>
          <Link href="/" className="block text-sm mb-2 opacity-70 hover:opacity-100 transition-opacity">Accueil</Link>
          <Link href="/reparations" className="block text-sm mb-2 opacity-70 hover:opacity-100 transition-opacity">Réparations</Link>
          <Link href="/processus" className="block text-sm mb-2 opacity-70 hover:opacity-100 transition-opacity">Processus</Link>
          <Link href="/tarifs" className="block text-sm mb-2 opacity-70 hover:opacity-100 transition-opacity">Tarifs</Link>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-4 opacity-40">Contact</p>
          <p className="text-sm opacity-70 mb-1">+33 (0)6 85 45 22 44</p>
          <p className="text-sm opacity-70 mb-1">atelier@parapenterescue.fr</p>
          <p className="text-sm opacity-70 mt-4">19 route des thermes<br />38570 Goncelin, France</p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-12 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderTop: "1px solid #2A5940" }}>
        <p className="text-xs opacity-40">© 2026 Parapente Rescue — Tous droits réservés.</p>
        <div className="flex gap-6">
          <Link href="/mentions" className="text-xs opacity-40 hover:opacity-70 transition-opacity">Mentions légales</Link>
          <Link href="/mentions" className="text-xs opacity-40 hover:opacity-70 transition-opacity">CGV</Link>
        </div>
      </div>
    </footer>
  );
}
