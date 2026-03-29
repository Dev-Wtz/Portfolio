import { NextResponse } from "next/server";
import { parseContactRequest, sendContactEmail } from "@/lib/contact-mail";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = parseContactRequest(json);

  if (parsed.type === "spam") {
    return NextResponse.json({ ok: true });
  }

  if (parsed.type === "invalid") {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  try {
    await sendContactEmail(parsed.payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "";
    if (message === "SMTP_NOT_CONFIGURED") {
      console.error("contact: CONTACT_SMTP_USER / CONTACT_SMTP_PASS manquants");
      return NextResponse.json(
        {
          error:
            "Envoi d’e-mails non configuré sur le serveur. Contactez l’administrateur du site.",
        },
        { status: 503 }
      );
    }
    console.error("contact: échec envoi SMTP", err);
    return NextResponse.json(
      {
        error:
          "L’envoi a échoué. Réessayez dans quelques instants ou écrivez directement à l’adresse indiquée dans le pied de page.",
      },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
