"use client";

import { useState } from "react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check, AlertCircle } from "lucide-react";

export default function SetupTwoFA() {
  const [email, setEmail] = useState("");
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [step, setStep] = useState<"email" | "qrcode" | "verify">("email");

  const handleGenerateQR = async () => {
    if (!email) {
      setError("Email requis");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/totp/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la génération");
      }

      setQrCode(data.qrCode);
      setSecret(data.secret);
      setBackupCodes(data.backupCodes);
      setStep("qrcode");
    } catch (err) {
      setError(`Erreur: ${String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <main className="cm-marble cm-page-enter min-h-screen text-[#f8edf3] overflow-x-hidden bg-black">
      <header className="sticky top-0 z-50 border-b border-[#B79A5B]/[0.10] bg-black/70 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Image
              src="/logo-chezmiss.png"
              alt="CHEZ MISS"
              width={200}
              height={50}
              className="h-12 w-auto"
            />
          </Link>
          <Link href="/staff">
            <LiquidMetalButton label="Retour" />
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
        <div className="rounded-2xl border border-[#B79A5B]/30 bg-[#0d0810]/50 p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-[#B79A5B] mb-2">
            Configuration 2FA
          </h1>
          <p className="text-[#f0c9e1]/60 mb-8">
            Sécurisez votre compte staff avec l'authentification à deux facteurs
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-700/30 text-red-400 flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {step === "email" && (
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
                />
              </div>

              <div className="pt-4">
                <button
                  onClick={handleGenerateQR}
                  disabled={loading}
                  className="w-full flex justify-center"
                >
                  <LiquidMetalButton
                    label={loading ? "Génération..." : "Générer QR Code"}
                    onClick={() => {}}
                  />
                </button>
              </div>

              <div className="mt-6 p-4 rounded-lg bg-[#B79A5B]/10 border border-[#B79A5B]/20">
                <h3 className="font-semibold text-[#B79A5B] mb-2">
                  Comment ça marche?
                </h3>
                <ol className="text-sm text-[#f0c9e1]/70 space-y-2 list-decimal ml-5">
                  <li>Générez un QR code unique pour votre compte</li>
                  <li>Scannez le avec Google Authenticator</li>
                  <li>À chaque connexion, entrez le code 6 chiffres</li>
                  <li>Sauvegardez les codes de secours au cas où</li>
                </ol>
              </div>
            </div>
          )}

          {step === "qrcode" && qrCode && secret && (
            <div className="space-y-6">
              <div className="bg-white p-4 rounded-lg w-64 mx-auto">
                <Image
                  src={qrCode}
                  alt="QR Code TOTP"
                  width={256}
                  height={256}
                  className="w-full h-auto"
                />
              </div>

              <div>
                <label className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Clé secrète (si le QR code ne marche pas)
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={secret}
                    readOnly
                    className="flex-1 px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] font-mono text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(secret, "secret")}
                    className="p-3 rounded-lg border border-[#B79A5B]/20 hover:bg-[#B79A5B]/10 transition"
                    title="Copier"
                  >
                    {copied === "secret" ? (
                      <Check size={18} className="text-green-400" />
                    ) : (
                      <Copy size={18} className="text-[#B79A5B]" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-[#B79A5B] mb-3">
                  Codes de sauvegarde (conservez-les en lieu sûr)
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {backupCodes.map((code, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20"
                    >
                      <code className="text-sm font-mono text-[#f0c9e1]">
                        {code}
                      </code>
                      <button
                        onClick={() => copyToClipboard(code, `code-${idx}`)}
                        className="p-1 hover:bg-[#B79A5B]/10 rounded transition"
                      >
                        {copied === `code-${idx}` ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} className="text-[#B79A5B]/60" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setStep("verify")}
                  className="flex-1 flex justify-center"
                >
                  <LiquidMetalButton label="Vérifier le code" onClick={() => {}} />
                </button>
              </div>

              <div className="p-4 rounded-lg bg-amber-900/20 border border-amber-700/30 text-amber-400 text-sm">
                ⚠️ Conservez les codes de secours dans un endroit sûr. Vous en
                aurez besoin si vous perdez votre téléphone.
              </div>
            </div>
          )}

          {step === "verify" && (
            <div className="space-y-4">
              <p className="text-[#f0c9e1]/70">
                Entrez le code à 6 chiffres depuis Google Authenticator pour
                confirmer la configuration.
              </p>
              <input
                type="text"
                maxLength={6}
                placeholder="000000"
                className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition text-center text-2xl tracking-widest font-mono"
              />
              <button className="w-full flex justify-center">
                <LiquidMetalButton label="Confirmer" onClick={() => {}} />
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
