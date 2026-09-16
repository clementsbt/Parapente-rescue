import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message, context, history } = await request.json();

    // Build conversation history
    let conversation = `Contexte: ${context}\n\n`;
    
    // Add recent history
    if (history && history.length > 0) {
      history.forEach((msg: { role: string; content: string }) => {
        conversation += `${msg.role === "user" ? "Utilisateur" : "Assistant"}: ${msg.content}\n`;
      });
    }
    
    conversation += `\nUtilisateur: ${message}\n\nAssistant:`;

    // Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ 
        error: "Clé API non configurée",
        response: "Désolé, le service de chat n'est pas disponible pour le moment. Veuillez nous contacter directement."
      });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: conversation
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          }
        })
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ 
        error: data.error.message,
        response: "Désolé, une erreur est survenue. Veuillez réessayer."
      });
    }

    const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Désolé, je n'ai pas pu générer de réponse. Veuillez nous contacter directement.";

    return NextResponse.json({ response: botResponse });

  } catch (error) {
    console.error("Chatbot error:", error);
    return NextResponse.json({ 
      error: "Erreur serveur",
      response: "Désolé, une erreur est survenue. Veuillez réessayer ou nous contacter directement."
    });
  }
}
