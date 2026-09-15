import type { Metadata } from "next";
import { Fraunces, Figtree, Bricolage_Grotesque } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Parapente Rescue - Réparation de voiles de parapente",
  description: "Atelier certifié de réparation de voiles de parapente dans les Alpes françaises. Accrocs, tissu, coutures, suspentes : une solution adaptée et certifiée.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fraunces.variable} ${figtree.variable} ${bricolage.variable}`}>
      <body className="min-h-full flex flex-col" style={{ background: "#F6F8F5", fontFamily: "var(--font-figtree), sans-serif" }}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
