import { verifyTOTPToken } from "@/lib/totp";

export async function POST(request: Request) {
  try {
    const { secret, token } = await request.json();

    if (!secret || !token) {
      return Response.json(
        { error: "Secret et token requis" },
        { status: 400 }
      );
    }

    const isValid = verifyTOTPToken(secret, token);

    if (!isValid) {
      return Response.json(
        { error: "Code TOTP invalide ou expiré" },
        { status: 401 }
      );
    }

    return Response.json({
      valid: true,
      message: "Code TOTP validé avec succès",
    });
  } catch (error) {
    console.error("Erreur vérification TOTP:", error);
    return Response.json(
      { error: "Erreur lors de la vérification du code TOTP" },
      { status: 500 }
    );
  }
}
