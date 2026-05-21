import { generateTOTPSecret, generateQRCode, generateBackupCodes } from "@/lib/totp";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: "Email requis" }, { status: 400 });
    }

    const { secret, qrCode } = await generateTOTPSecret(email);
    const qrCodeDataUrl = await generateQRCode(qrCode);
    const backupCodes = generateBackupCodes(10);

    return Response.json({
      secret,
      qrCode: qrCodeDataUrl,
      backupCodes,
      message: "Secret TOTP généré avec succès",
    });
  } catch (error) {
    console.error("Erreur génération TOTP:", error);
    return Response.json(
      { error: "Erreur lors de la génération du secret TOTP" },
      { status: 500 }
    );
  }
}
