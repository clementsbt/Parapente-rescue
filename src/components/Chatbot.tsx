"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface DevisState {
  active: boolean;
  step: 'start' | 'name' | 'email' | 'phone' | 'wing' | 'model' | 'type' | 'description' | 'logistics';
  fullName?: string;
  email?: string;
  phone?: string;
  wingBrand?: string;
  wingModel?: string;
  interventionType?: string;
  description?: string;
}

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

INFORMATIONS TARIFAIRES:
- Changement Intrados: Complet 150€, Partiel 80€
- Changement Extrados: Complet 140€, Partiel 70€
- Changement Profil: Complet 200€, Partiel 100€
- Changement Diagonal: Complet 45€, Partiel 25€
- Pose d'un Ripstop: 15€
- Changement d'une suspente: 15€

Autres infos:
- Délai moyen: 48h
- Contact: +33 (0)6 85 45 22 44, atelier@parapenterescue.fr

RÈGLE: Réponds toujours dans la même langue que l'utilisateur.`;

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Bonjour ! Je suis l'assistant Parapente Rescue. Comment puis-je vous aider ? (tarifs, réparations, devis...)" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [devis, setDevis] = useState<DevisState>({ active: false, step: 'start' });
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

  const addMessage = (role: "user" | "assistant", content: string) => {
    setMessages(prev => [...prev, { role, content }]);
  };

  const sendToApi = async (userMessage: string) => {
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
      addMessage("assistant", data.response || "Désolé, une erreur est survenue.");
    } catch {
      addMessage("assistant", "Désolé, une erreur est survenue. Veuillez réessayer.");
    }
    setIsLoading(false);
  };

  const sendMessage = () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput("");
    addMessage("user", userMessage);

    // Gestion du flux devis conversationnel
    if (devis.active) {
      handleDevisStep(userMessage);
    } else {
      // Vérifier si l'utilisateur demande un devis
      if (userMessage.toLowerCase().includes('devis') || 
          userMessage.toLowerCase().includes('réparation') ||
          userMessage.toLowerCase().includes('réparer')) {
        addMessage("assistant", "Je serais ravi de vous aider ! Voulez-vous que je vous prépare une demande de devis ? (répondez simplement oui ou non)");
        setDevis({ active: true, step: 'start' });
      } else {
        sendToApi(userMessage);
      }
    }
  };

  const handleDevisStep = async (userMessage: string) => {
    const currentStep = devis.step;
    let nextStep: DevisState = { ...devis };
    let botResponse = "";

    switch (currentStep) {
      case 'start':
        if (userMessage.toLowerCase().includes('oui') || userMessage.toLowerCase() === 'ok' || userMessage.toLowerCase() === 'yes') {
          botResponse = "Parfait ! Commençons. Quel est votre nom complet ?";
          nextStep.step = 'name';
        } else {
          botResponse = "Pas de problème ! Comment puis-je vous aider autrement ?";
          nextStep = { active: false, step: 'start' };
        }
        break;

      case 'name':
        if (userMessage.length < 2) {
          botResponse = "Pouvez-vous me donner votre nom complet ?";
        } else {
          nextStep.fullName = userMessage;
          botResponse = "Merci ! Quelle est votre adresse email ?";
          nextStep.step = 'email';
        }
        break;

      case 'email':
        if (!userMessage.includes('@') || !userMessage.includes('.')) {
          botResponse = "L'email ne semble pas valide. Pouvez-vous me donner un email valide ?";
        } else {
          nextStep.email = userMessage;
          botResponse = "Parfait ! (optionnel) Quel est votre numéro de téléphone ?";
          nextStep.step = 'phone';
        }
        break;

      case 'phone':
        if (userMessage.trim()) {
          nextStep.phone = userMessage;
        }
        botResponse = "Quelle est la marque de votre aile ? (ex: Ozone, Niviuk, Advance...)";
        nextStep.step = 'wing';
        break;

      case 'wing':
        nextStep.wingBrand = userMessage;
        botResponse = "Et le modèle de votre aile ? (ex: Hook 5, Enjoi 2, Peak 5...)";
        nextStep.step = 'model';
        break;

      case 'model':
        nextStep.wingModel = userMessage;
        botResponse = "Quel type de réparation avez-vous besoin ? (déchirure, suspentes, bord d'attaque, révision complète, autre)";
        nextStep.step = 'type';
        break;

      case 'type':
        nextStep.interventionType = userMessage;
        botResponse = "Décrivez le problème en quelques mots (localisation, taille de l'accroc, etc.)";
        nextStep.step = 'description';
        break;

      case 'description':
        nextStep.description = (nextStep.description || '') + '\n\nDétails: ' + userMessage;
        botResponse = "Préférez-vous expédier votre aile par colis ou la déposer directement à l'atelier ?";
        nextStep.step = 'logistics';
        break;

      case 'logistics':
        const logistics = userMessage.toLowerCase().includes('déposer') || userMessage.toLowerCase().includes('atelier') ? 'depot' : 'expedition';
        
        // Envoyer le devis
        try {
          await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fullName: nextStep.fullName,
              email: nextStep.email,
              phone: nextStep.phone,
              wingBrand: nextStep.wingBrand,
              wingModel: nextStep.wingModel,
              interventionType: nextStep.interventionType || 'Demande via chatbot',
              description: nextStep.description,
              logistics: logistics,
            }),
          });
          botResponse = "✅ Votre demande de devis a été envoyée ! Nous vous répondrons sous 48h à l'adresse " + nextStep.email + ".";
        } catch {
          botResponse = "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.";
        }
        nextStep = { active: false, step: 'start' };
        break;
    }

    addMessage("assistant", botResponse);
    setDevis(nextStep);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
              onClick={() => { setIsOpen(false); setDevis({ active: false, step: 'start' }); }}
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

          <div className="p-3 border-t" style={{ borderColor: "#E5E5E5" }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={devis.active ? "Votre réponse..." : "Votre message..."}
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
        </div>
      )}
    </>
  );
}
