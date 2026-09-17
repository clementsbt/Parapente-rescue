"use client";

// Parapente Rescue AI Chatbot v2
import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DevisForm {
  fullName?: string;
  email?: string;
  phone?: string;
  wingBrand?: string;
  wingModel?: string;
  interventionType?: string;
  description?: string;
  step: number;
}

// Parse markdown and make links/phones clickable
function parseMessageContent(content: string) {
  let parsed = content.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  parsed = parsed.replace(
    /(https?:\/\/[^\s<]+)/g,
    (match) => {
      const cleaned = match.replace(/[.,;:!?]+$/, '');
      return `<a href="${cleaned}" target="_blank" rel="noopener noreferrer" style="color: #1A3829; text-decoration: underline;">${cleaned}</a>`;
    }
  );
  parsed = parsed.replace(
    /(?:\+33|0)[0-9][\s.-]?[0-9]{1,2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}[\s.-]?[0-9]{2}/g,
    (match) => `<a href="tel:${match.replace(/[\s.-]/g, '')}" style="color: #1A3829; text-decoration: underline;">${match}</a>`
  );
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
- Le technician: Hugo

RÈGLE IMPORTANTE: Tu dois ONLY répondre aux questions liées à Parapente Rescue ou à la réparation de voiles de parapente. Si on te pose une question sur un autre sujet (météo, sport, actualité, vie personnelle, etc.), refuse poliment et explique que tu es l'assistant de Parapente Rescue spécialisé dans les réparations de parapentes.

RÉPONSE: Réponds toujours dans la même langue que l'utilisateur, quelle que soit la langue utilisée.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDevisForm, setShowDevisForm] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! Je suis l'assistant Parapente Rescue. Comment puis-vous vous aider ? (tarifs, réparations, devis...)" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [devisForm, setDevisForm] = useState<DevisForm>({ step: 0 });
  const [devisLoading, setDevisLoading] = useState(false);
  const [devisSuccess, setDevisSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        const chatButton = document.querySelector('[aria-label="Ouvrir le chat"]');
        if (chatButton && !chatButton.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

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
          history: messages.slice(-6)
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

  const handleDevisSubmit = async () => {
    setDevisLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...devisForm,
          logistics: 'expedition',
        }),
      });
      if (res.ok) {
        setDevisSuccess(true);
      } else {
        alert('Erreur lors de l\'envoi. Veuillez réessayer.');
      }
    } catch {
      alert('Erreur lors de l\'envoi. Veuillez réessayer.');
    }
    setDevisLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (showDevisForm) {
        handleDevisSubmit();
      } else {
        sendMessage();
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center shadow-none transition-transform hover:scale-110 z-50 overflow-visible"
        aria-label="Ouvrir le chat"
      >
        <img 
          src="/images/Hugo.png" 
          alt="Ouvrir le chat" 
          className="w-full h-full object-cover"
        />
      </button>

      {isOpen && (
        <div ref={chatWindowRef}>
        <div className="fixed bottom-24 right-6 w-[90vw] md:w-96 h-[70vh] max-h-[600px] rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50" style={{ background: "#fff" }}>
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
              onClick={() => { setIsOpen(false); setShowDevisForm(false); setDevisSuccess(false); setDevisForm({ step: 0 }); }}
              className="text-white/70 hover:text-white"
              aria-label="Fermer le chat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

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

            {showDevisForm && !devisSuccess && (
              <div className="bg-white rounded-xl p-4 shadow-sm space-y-3">
                <p className="text-sm font-semibold" style={{ color: "#1A3829" }}>Demande de devis</p>
                
                <input
                  type="text"
                  placeholder="Votre nom complet *"
                  value={devisForm.fullName || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none"
                  style={{ borderColor: "#D8E8DC" }}
                />
                
                <input
                  type="email"
                  placeholder="Votre email *"
                  value={devisForm.email || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none"
                  style={{ borderColor: "#D8E8DC" }}
                />
                
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={devisForm.phone || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, phone: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none"
                  style={{ borderColor: "#D8E8DC" }}
                />
                
                <input
                  type="text"
                  placeholder="Marque de l'aile (ex: Ozone, Niviuk...)"
                  value={devisForm.wingBrand || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, wingBrand: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none"
                  style={{ borderColor: "#D8E8DC" }}
                />
                
                <input
                  type="text"
                  placeholder="Modèle et taille"
                  value={devisForm.wingModel || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, wingModel: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none"
                  style={{ borderColor: "#D8E8DC" }}
                />
                
                <select
                  value={devisForm.interventionType || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, interventionType: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none bg-white"
                  style={{ borderColor: "#D8E8DC" }}
                >
                  <option value="">Type d'intervention *</option>
                  <option value="Réparation de déchirure / panneau de tissu">Réparation de déchirure</option>
                  <option value="Remplacement de suspentes">Remplacement de suspentes</option>
                  <option value="Bord d'attaque / fuite">Bord d'attaque / fuite</option>
                  <option value="Diagnostics & révision complète">Diagnostics & révision complète</option>
                  <option value="Autre">Autre</option>
                </select>
                
                <textarea
                  placeholder="Description du problème *"
                  value={devisForm.description || ''}
                  onChange={(e) => setDevisForm({ ...devisForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg outline-none resize-none"
                  style={{ borderColor: "#D8E8DC" }}
                  rows={3}
                />
                
                <button
                  onClick={handleDevisSubmit}
                  disabled={devisLoading || !devisForm.fullName || !devisForm.email || !devisForm.description}
                  className="w-full py-2 rounded-lg text-sm font-semibold disabled:opacity-50"
                  style={{ background: "#1A3829", color: "#fff" }}
                >
                  {devisLoading ? 'Envoi...' : 'Envoyer la demande'}
                </button>
              </div>
            )}

            {devisSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                <p className="text-green-700 font-semibold text-sm">✅ Demande envoyée !</p>
                <p className="text-green-600 text-xs mt-1">Nous vous répondrons sous 48h.</p>
                <button
                  onClick={() => { setShowDevisForm(false); setDevisSuccess(false); setDevisForm({ step: 0 }); }}
                  className="mt-2 text-xs underline"
                  style={{ color: "#1A3829" }}
                >
                  Fermer
                </button>
              </div>
            )}

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

          {!showDevisForm && !devisSuccess && (
            <div className="p-3 border-t" style={{ borderColor: "#E5E5E5" }}>
              <button
                onClick={() => { setShowDevisForm(true); setMessages(prev => [...prev, { role: "assistant", content: "Parfait ! Remplissez le formulaire ci-dessous pour demander un devis." }]); }}
                className="w-full py-2 rounded-lg text-sm font-semibold mb-2"
                style={{ background: "#1A3829", color: "#fff" }}
              >
                Demander un devis
              </button>
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
          )}
        </div>
        </div>
      )}
    </>
  );
}
