import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const toEmail = 'clementsubtil2006@gmail.com';
const fromEmail = 'Parapente Rescue <onboarding@resend.dev>';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      wingBrand,
      wingModel,
      interventionType,
      description,
      logistics,
    } = body;

    if (!fullName || !email || !description) {
      return NextResponse.json(
        { error: 'Les champs nom, email et description sont requis' },
        { status: 400 }
      );
    }

    const logisticsLabel = logistics === 'expedition' ? 'Expédition par colis' : 'Dépôt direct à l\'atelier';

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Nouvelle demande de devis - ${fullName}`,
      html: `
<div style="font-family: sans-serif; max-width: 600px;">
  <h2 style="color: #1A3829;">Nouvelle demande de devis</h2>
  
  <h3 style="color: #1A3829; margin-top: 20px;">Coordonnées</h3>
  <p><strong>Nom:</strong> ${fullName}</p>
  <p><strong>Email:</strong> ${email}</p>
  <p><strong>Téléphone:</strong> ${phone || 'Non fourni'}</p>
  
  <h3 style="color: #1A3829; margin-top: 20px;">Informations Voile</h3>
  <p><strong>Marque:</strong> ${wingBrand || 'Non précisée'}</p>
  <p><strong>Modèle:</strong> ${wingModel || 'Non précisé'}</p>
  
  <h3 style="color: #1A3829; margin-top: 20px;">Détails</h3>
  <p><strong>Type d'intervention:</strong> ${interventionType}</p>
  <p><strong>Description:</strong></p>
  <p>${description.replace(/\n/g, '<br/>')}</p>
  
  <h3 style="color: #1A3829; margin-top: 20px;">Logistique</h3>
  <p>${logisticsLabel}</p>
</div>
      `.trim(),
      text: `
Nouvelle demande de devis

Coordonnées:
- Nom: ${fullName}
- Email: ${email}
- Téléphone: ${phone || 'Non fourni'}

Informations Voile:
- Marque: ${wingBrand || 'Non précisée'}
- Modèle: ${wingModel || 'Non précises'}

Détails:
- Type d'intervention: ${interventionType}
- Description: ${description}

Logistique: ${logisticsLabel}
      `.trim(),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Resend error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}
