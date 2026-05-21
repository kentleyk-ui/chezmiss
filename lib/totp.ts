import speakeasy from "speakeasy";
import QRCode from "qrcode";

const TOTP_WINDOW = 1; // Accept codes from ±1 time step

export async function generateTOTPSecret(email: string, issuer: string = "CHEZ MISS") {
  const secret = speakeasy.generateSecret({
    name: `CHEZ MISS (${email})`,
    issuer,
    length: 32,
  });

  return {
    secret: secret.base32,
    qrCode: secret.otpauth_url || "",
  };
}

export async function generateQRCode(otpauthUrl: string): Promise<string> {
  return await QRCode.toDataURL(otpauthUrl);
}

export function verifyTOTPToken(secret: string, token: string): boolean {
  try {
    const verified = speakeasy.totp.verify({
      secret,
      encoding: "base32",
      token,
      window: TOTP_WINDOW,
    });

    return verified;
  } catch (err) {
    return false;
  }
}

export function generateBackupCodes(count: number = 10): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    codes.push(code);
  }
  return codes;
}
