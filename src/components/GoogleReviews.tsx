"use client";

import { useState } from "react";
import Image from "next/image";

interface Review {
  name: string;
  date: string;
  text: string;
  rating: number;
}

const reviews: Review[] = [
  {
    name: "Clément Subtil",
    date: "il y a 5 jours",
    text: "NOUVEAU! Réparation au top ! J'ai confié ma voile à Hugo un dimanche, et je l'ai reçue chez moi, entièrement réparée, le vendredi suivant. Les délais sont vraiment très, très courts. Hugo est à l'écoute du client, réactif et pro. Je recommande vivement pour toute réparation de voile.",
    rating: 5,
  },
  {
    name: "Agnès Gorgues",
    date: "il y a 4 jours",
    text: "Hugo a été très réactif pour réparer ma voile en quelques jours. Je recommande sans hésiter :)",
    rating: 5,
  },
  {
    name: "Frederic Briatte",
    date: "il y a un mois",
    text: "Prise de RDV rapide et réparation encore plus rapide. Changement de 3 suspentes en une soirée. Je recommande vivement.",
    rating: 5,
  },
  {
    name: "Animals'Interest",
    date: "il y a un mois",
    text: "J'étais si triste quand j'ai déchiré ma voile. Luckily Hugo a su me rassurer et m'expliquer comment il allait la réparer. Je sens que je volerai en sécurité. Merci pour tout :)",
    rating: 5,
  },
  {
    name: "Lucas Bruchet",
    date: "il y a 7 mois",
    text: "Merci beaucoup à Hugo, réparation express en fin d'après-midi de 2 suspentes. Très réactif et disponible, il a pris le temps de me montrer et m'expliquer comment il faisait ce genre de réparation. Le prix est plus que raisonnable pour ce genre de prestation, je recommande fortement !",
    rating: 5,
  },
  {
    name: "David Kerzerho",
    date: "il y a 8 mois",
    text: "Travail de qualité, relation client au top ! Un vrai professionnel du parapente. Je recommande vivement à tous ceux qui ont'abîmé leur aile !!!!",
    rating: 5,
  },
  {
    name: "Ivan Haas",
    date: "il y a 8 mois",
    text: "Réparation parfaite en 3 jours ! Je recommande 👍",
    rating: 5,
  },
  {
    name: "Jules Gaire",
    date: "il y a 10 mois",
    text: "Je recommande sans hésiter !",
    rating: 5,
  },
];

export default function GoogleReviews() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const reviewsPerSlide = 3;
  const totalSlides = Math.ceil(reviews.length / reviewsPerSlide);

  const prev = () => setCurrent((current - 1 + totalSlides) % totalSlides);
  const next = () => setCurrent((current + 1) % totalSlides);

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
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
                {reviews
                  .slice(slideIndex * reviewsPerSlide, slideIndex * reviewsPerSlide + reviewsPerSlide)
                  .map((review, localIndex) => {
                    const globalIndex = slideIndex * reviewsPerSlide + localIndex;
                    const isExpanded = expanded[globalIndex] || false;
                    
                    return (
                      <div key={localIndex} className="p-6 rounded-xl" style={{ background: "#F9F9F9" }}>
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

                        </div>

                        {/* Text */}
                        <p className="text-xs leading-relaxed" style={{ color: "#3D4D43" }}>
                          {review.text.length > 120 && !isExpanded ? (
                            <>
                              {review.text.slice(0, 120)}...
                              <button 
                                onClick={() => toggleExpand(globalIndex)}
                                className="ml-1 font-medium hover:underline"
                                style={{ color: "#1A3829" }}
                              >
                                Lire la suite
                              </button>
                            </>
                          ) : (
                            <>
                              {review.text}
                              {review.text.length > 120 && (
                                <button 
                                  onClick={() => toggleExpand(globalIndex)}
                                  className="ml-1 font-medium hover:underline"
                                  style={{ color: "#1A3829" }}
                                >
                                  Réduire
                                </button>
                              )}
                            </>
                          )}
                        </p>
                      </div>
                    );
                  })}
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
    </div>
  );
}
