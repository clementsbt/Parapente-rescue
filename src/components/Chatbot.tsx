"use client";

// Parapente Rescue AI Chatbot v2
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Parse markdown and make links/phones clickable
function parseMessageContent(content: string) {
  // Replace **text** with <strong>text</strong>
  let parsed = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Replace URLs with clickable links (exclude trailing punctuation)
  parsed = parsed.replace(
    /(https?:\/\/[^\s<]+)/g,
    (match) => {
      const cleaned = match.replace(/[.,;:!?]+$/, '');
      return `<a href="${cleaned}" target="_blank" rel="noopener noreferrer" style="color: #1A3829; text-decoration: underline;">${cleaned}</a>`;
    }
  );
  
  // Replace phone numbers with clickable tel: links
  parsed = parsed.replace(
    /(?:\+33|0)[0-9][\s.-]?[0-9]{1,2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}/g,
    (match) => `<a href="tel:${match.replace(/[\s.-]/g, '')}" style="color: #1A3829; text-decoration: underline;">${match}</a>`
  );
  
  // Replace newlines with <br />
  parsed = parsed.replace(/\n/g, '<br />');
  
  return parsed;
}

const context = `Tu es un assistant virtuel pour Parapente Rescue, un atelier de réparation de voiles de parapente basé à Goncelin, près de Saint-Hilaire du Touvet en Isère.

INFORMATIONS TARIFAIRES (connais ces prix par cœur):
- Changement Intrados: Complet 150€, Partiel 80€, Ripstop + couture 25€
- Changement Extrados: Complet 140€, Partiel 70€, Ripstop + couture 20€
- Changement Profil (le plus demandé): Complet 200€, Partiel 100€, Ripstop + couture 30€
- Changement Diagonal: Complet 45€, Partiel 25€, Ripstop + couture 25€
- Pose d'un Ripstop sans couture: 15€
- Changement d'une suspente: 15€

Autres infos:
- Délai moyen de diagnostic: 48h
- Réparations: accrocs, déchirures, coutures, suspentes, changement de panneaux
- Réparation urgente possible en quelques jours
- Envoi et retour des voiles par Chronopost (France métropolitaine)
- Contact: +33 (0)6 85 45 22 44, atelier@parapenterescue.fr
- Horaires: sur rendez-vous
- Le technicien: Hugo

CONSEIL: Si tu ne connais pas la réponse à une question sur une réparation de parapente, ou si le client veut un devis ou une réparation sur mesure, redirige-le vers la page de contact: https://parapente-rescue-new.vercel.app/contact

RÈGLE IMPORTANTE: Tu dois ONLY répondre aux questions liées à Parapente Rescue ou à la réparation de voiles de parapente. Si on te pose une question sur un autre sujet (météo, sport, actualité, vie personnelle, etc.), refuse poliment et explique que tu es l'assistant de Parapente Rescue spécialisé dans les réparations de parapentes.

RÉPONSE: Réponds toujours dans la même langue que l'utilisateur, quelle que soit la langue utilisée.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! Je suis l'assistant Parapente Rescue. Comment puis-je vous aider ? (tarifs, réparations, devis...)" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage,
          context: context,
          history: messages.slice(-6) // Last 6 messages for context
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter directement." 
        }]);
      } else {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: data.response 
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter directement." 
      }]);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-20 h-20 flex items-center justify-center shadow-none transition-transform z-50 overflow-visible"
        aria-label="Ouvrir le chat"
      >
        <img 
          src="/images/Hugo.png" 
          alt="Ouvrir le chat" 
          className="w-full h-full object-cover"
        />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[70vh] max-h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50" style={{ background: "#fff" }}>
          {/* Header */}
          <div className="p-4 flex items-center justify-between" style={{ background: "#1A3829" }}>
            <div className="flex items-center gap-3">
              <img 
                src="/images/Hugo.png" 
                alt="Hugo" 
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-white font-semibold text-sm">Parapente Rescue</p>
                <p className="text-white/70 text-xs">En ligne</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white"
              aria-label="Fermer le chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: "#F9F9F9" }}>
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className="max-w-[80%] p-3 rounded-2xl text-sm"
                  style={{ 
                    background: msg.role === "user" ? "#1A3829" : "#fff",
                    color: msg.role === "user" ? "#fff" : "#111",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
                  }}
                >
                  <span dangerouslySetInnerHTML={{ __html: parseMessageContent(msg.content) }} />
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }}/>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }}/>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }}/>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t" style={{ borderColor: "#E5E5E5" }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Votre message..."
                className="flex-1 px-4 py-2 rounded-full border text-sm outline-none focus:ring-2 focus:ring-[#1A3829]"
                style={{ borderColor: "#E5E5E5" }}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full flex items-center justify-center disabled:opacity-50"
                style={{ background: "#1A3829" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
