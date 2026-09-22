"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { COLORS } from "@/theme";

const { forest: FOREST, forestDeep: FOREST_DEEP } = COLORS;

type Page = "accueil" | "reparations" | "processus" | "apropos" | "faq" | "contact" | "tarifs";

const NAV_LINKS: { label: string; page: Page; href: string }[] = [
  { label: "Accueil", page: "accueil", href: "/" },
  { label: "Réparations", page: "reparations", href: "/reparations" },
  { label: "Comment ça marche ?", page: "processus", href: "/processus" },
  { label: "À propos", page: "apropos", href: "/apropos" },
  { label: "FAQ", page: "faq", href: "/faq" },
  { label: "Tarifs", page: "tarifs", href: "/tarifs" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const current = NAV_LINKS.find((l) => l.href === pathname)?.page || "accueil";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[20px] md:px-10 h-16 border-b"
        style={{ background: "#fffdf9", borderColor: "#e5e1d8" }}
      >
        <Logo />

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.page}
              href={l.href}
              className="text-sm font-medium transition-colors"
              style={{
                color: current === l.page ? FOREST : "COLORS.textLight",
                borderBottom: current === l.page ? `2px solid ${FOREST}` : "2px solid transparent",
                paddingBottom: "2px",
              }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:block text-sm font-semibold px-4 py-2 rounded-sm transition-all"
            style={{ background: FOREST, color: "COLORS.bgLight" }}
          >
            Demander un devis
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Menu"
          >
            <span className="block w-5 h-px transition-all" style={{ background: FOREST, transform: open ? "rotate(45deg) translate(0,5px)" : "" }} />
            <span className="block w-5 h-px transition-all" style={{ background: FOREST, opacity: open ? 0 : 1 }} />
            <span className="block w-5 h-px transition-all" style={{ background: FOREST, transform: open ? "rotate(-45deg) translate(0,-5px)" : "" }} />
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 flex flex-col pt-16" style={{ background: "#fffdf9" }}>
          <nav className="flex flex-col p-8 gap-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.page}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-left text-2xl font-medium py-3 border-b transition-colors"
                style={{ borderColor: "COLORS.lightGreen", color: current === l.page ? FOREST : "COLORS.textDark" }}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 text-left text-2xl font-medium py-3 border-b"
              style={{ borderColor: "COLORS.lightGreen", color: current === "contact" ? FOREST : "COLORS.textDark" }}
            >
              Contact & Devis
            </Link>
          </nav>
          <div className="mt-auto p-8 border-t" style={{ borderColor: "COLORS.lightGreen" }}>
            <a href="tel:+33685452244" className="block text-sm" style={{ color: "COLORS.textLight" }}>+33 (0)6 85 45 22 44</a>
            <a href="mailto:atelier@parapenterescue.fr" className="block text-sm mt-1" style={{ color: "COLORS.textLight" }}>atelier@parapenterescue.fr</a>
          </div>
        </div>
      )}
    </>
  );
}
