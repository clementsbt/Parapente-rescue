"use client";

import { useState } from "react";
import Image from "next/image";

const reviews = [
  {
    name: "Marc L.",
    date: "il y a 2 semaines",
    text: "Excellent atelier ! Mon aile avait un accroc important après un crash dans un arbre. Ils ont fait un travail remarquable, presque invisible. Délai rapide et prix raisonnable. Je recommande sincèrement.",
    rating: 5,
  },
  {
    name: "Sophie M.",
    date: "il y a 1 mois",
    text: "Premier vol après réparation et c'est parfait ! Équipe très professionnelle, ils prennent le temps d'expliquer les réparations effectuées. Ma voile est comme neuvelle. Merci !",
    rating: 5,
  },
  {
    name: "Jean-Pierre D.",
    date: "il y a 3 semaines",
    text: "Réparation de plusieurs accrocs sur ma Crosscountry. Travail soigné, bon conseils pour l'entretien. Atelier sérieux avec du matériel professionnel. À recommendersans hésitation.",
    rating: 5,
  },
  {
    name: "Claire B.",
    date: "il y a 5 jours",
    text: "Suite à une mauvaise rencontre avec un pylône, ma voile avait besoin de réparations importantes. Résultat : parfait ! Le souci de qualité est evident. Je reprends confiance pour voler.",
    rating: 5,
  },
  {
    name: "Philippe R.",
    date: "il y a 2 semaines",
    text: "Bonjour j'ai fait réparer mon aile après un incident en montagne. Résultat très satisfaisant. Equipe à l'écoute et professionnelle. Le + : conseils avisés pour la Suite.",
    rating: 5,
  },
];

export default function GoogleReviews() {
  const [current, setCurrent] = useState(0);
  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  const prev = () => setCurrent((current - 1 + totalSlides) % totalSlides);
  const next = () => setCurrent((current + 1) % totalSlides);

  const getVisibleReviews = () => {
    const start = current * reviewsPerSlide;
    return reviews.slice(start, start + reviewsPerSlide);
  };

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Cards Container */}
      <div className="overflow-hidden rounded-xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * (100 / reviewsPerSlide)}%)` }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div key={slideIndex} className="w-full flex-shrink-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                {reviews.slice(slideIndex * reviewsPerSlide, slideIndex * reviewsPerSlide + reviewsPerSlide).map((review, index) => (
                  <div key={index} className="p-6 rounded-xl" style={{ background: "#F9F9F9" }}>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "#1A3829", color: "#fff" }}>
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm" style={{ color: "#111C17" }}>{review.name}</p>
                          <p className="text-xs" style={{ color: "#6B7C72" }}>{review.date}</p>
                        </div>
                      </div>
                      <Image 
                        src="/images/GoogleLogo.svg.webp" 
                        alt="Google" 
                        width={20} 
                        height={20}
                        className="opacity-80"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xs" style={{ color: "#F59E0B" }}>★</span>
                        ))}
                      </div>
                      <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "#E8F5E9", color: "#1A3829" }}>Avis vérifié</span>
                    </div>

                    {/* Text */}
                    <p className="text-xs leading-relaxed" style={{ color: "#3D4D43" }}>
                      {review.text.length > 120 ? review.text.slice(0, 120) + "..." : review.text}
                      {review.text.length > 120 && (
                        <span className="ml-1" style={{ color: "#6B7C72" }}>Lire la suite</span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
      <button 
        onClick={prev}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform bg-white"
        style={{ left: "-20px" }}
      >
        ←
      </button>
      <button 
        onClick={next}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full items-center justify-center shadow-lg hover:scale-110 transition-transform bg-white"
        style={{ right: "-20px" }}
      >
        →
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: current === index ? "#1A3829" : "#D8E8DC" }}
          />
        ))}
      </div>

      {/* Mobile Navigation - Swipe hints and dots */}
      <div className="md:hidden flex justify-center gap-2 mt-4">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="w-3 h-3 rounded-full transition-all"
            style={{ background: current === index ? "#1A3829" : "#D8E8DC" }}
          />
        ))}
      </div>

      {/* Trustindex Badge */}
      <div className="flex justify-end mt-4">
        <span className="text-xs px-2 py-1 rounded flex items-center gap-1" style={{ background: "#E8F5E9", color: "#1A3829" }}>
          Certifié par : Trustindex ✓
        </span>
      </div>
    </div>
  );
}
