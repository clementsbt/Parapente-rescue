"use client";

import { useState, useRef, useEffect } from "react";
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
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [currentSlide, setCurrentSlide] = useState<number | undefined>(undefined);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cardsPerView = isMobile ? 1 : 3;
  const totalSlides = isMobile ? reviews.length : (reviews.length - cardsPerView + 1);

  const handleScroll = () => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const firstCard = container.querySelector('.review-card') as HTMLElement;
      if (firstCard) {
        const cardWidth = firstCard.offsetWidth + (isMobile ? 12 : 16);
        if (isMobile) {
          const newSlide = Math.round(scrollLeft / cardWidth);
          setCurrentSlide(newSlide);
        } else {
          // Desktop: calculate which group of 3 cards is visible
          const newSlide = Math.floor(scrollLeft / cardWidth);
          setCurrentSlide(Math.min(newSlide, totalSlides - 1));
        }
      }
    }
  };

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-0">
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-4 p-2 scrollbar-hide"
        style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {reviews.map((review, index) => (
          <div key={index} className="review-card flex-shrink-0 w-[85vw] md:w-[30vw] lg:w-[28vw] snap-center">
            <ReviewCard review={review} index={index} expanded={expanded} toggleExpand={toggleExpand} />
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className="w-2 h-2 rounded-full transition-all"
            style={{ background: (currentSlide === undefined ? index === 0 : currentSlide === index) ? "#1A3829" : "#D8E8DC" }}
          />
        ))}
      </div>
    </div>
  );
}

function ReviewCard({ review, index, expanded, toggleExpand }: { 
  review: Review; 
  index: number; 
  expanded: { [key: number]: boolean };
  toggleExpand: (index: number) => void;
}) {
  const isExpanded = expanded[index] || false;
  
  return (
    <div className="p-4 md:p-6 rounded-xl h-full" style={{ background: "#F9F9F9" }}>
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

      <div className="flex items-center gap-2 mb-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-xs" style={{ color: "#F59E0B" }}>★</span>
          ))}
        </div>
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "#3D4D43" }}>
        {review.text.length > 120 && !isExpanded ? (
          <>
            {review.text.slice(0, 120)}...
            <button 
              onClick={() => toggleExpand(index)}
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
                onClick={() => toggleExpand(index)}
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
}
