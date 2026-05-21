"use client";

import { useState } from "react";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function StaffLogin() {
  const [step, setStep] = useState<"credentials" | "totp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [totpCode, setTotpCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Simulated credentials verification
      if (email && password) {
        setStep("totp");
      } else {
        setError("Email et mot de passe requis");
      }
    } catch (err) {
      setError(`Erreur: ${String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!totpCode || totpCode.length !== 6) {
        setError("Code à 6 chiffres requis");
        setLoading(false);
        return;
      }

      // Here you would verify the TOTP code against the stored secret
      // For now, we'll just simulate success
      if (totpCode === "000000") {
        alert("Connexion réussie!");
        // Redirect to staff dashboard
        window.location.href = "/staff";
      } else {
        setError("Code TOTP invalide");
      }
    } catch (err) {
      setError(`Erreur: ${String(err)}`);
    } finally {
      setLoading(false);
    }
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
          <Link href="/">
            <LiquidMetalButton label="Accueil" />
          </Link>
        </div>
      </header>

      <div className="max-w-md mx-auto px-6 py-16 sm:py-24">
        <div className="rounded-2xl border border-[#B79A5B]/30 bg-[#0d0810]/50 p-8 backdrop-blur-xl">
          <h1 className="text-3xl font-bold text-[#B79A5B] mb-2">
            Connexion Staff
          </h1>
          <p className="text-[#f0c9e1]/60 mb-8">
            Authentification sécurisée avec 2FA
          </p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-900/20 border border-red-700/30 text-red-400 flex items-start gap-3">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {step === "credentials" && (
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="staff@chezmiss.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Mot de passe
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
                />
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full flex justify-center">
                  <LiquidMetalButton
                    label={loading ? "Vérification..." : "Continuer"}
                    onClick={() => {}}
                  />
                </button>
              </div>
            </form>
          )}

          {step === "totp" && (
            <form onSubmit={handleTOTPSubmit} className="space-y-4">
              <div className="p-4 rounded-lg bg-[#B79A5B]/10 border border-[#B79A5B]/20 mb-4">
                <p className="text-sm text-[#f0c9e1]/70">
                  Entrez le code à 6 chiffres de votre application d'authentification
                </p>
              </div>

              <div>
                <label htmlFor="totpCode" className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Code d'authentification
                </label>
                <input
                  id="totpCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  value={totpCode}
                  onChange={(e) => setTotpCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full px-4 py-4 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition text-center text-3xl tracking-widest font-mono"
                />
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading || totpCode.length !== 6} className="w-full flex justify-center">
                  <LiquidMetalButton
                    label={loading ? "Vérification..." : "Vérifier"}
                    onClick={() => {}}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setStep("credentials");
                  setError(null);
                }}
                className="w-full text-center text-sm text-[#B79A5B] hover:text-[#B79A5B]/80 transition"
              >
                Retour
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-[#B79A5B]/20">
            <p className="text-xs text-[#f0c9e1]/50 text-center">
              Première connexion ?{" "}
              <Link href="/staff/setup-2fa" className="text-[#B79A5B] hover:text-[#B79A5B]/80 transition">
                Configurer l'authentification
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
