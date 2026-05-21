"use client";

import Link from "next/link";
import { LiquidMetalButton } from "@/ui-lib/components/liquid-metal-button";
import Image from "next/image";

export default function SignUp() {
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
          <h1 className="text-3xl font-bold text-[#B79A5B] mb-2">Créer un compte</h1>
          <p className="text-[#f0c9e1]/60 mb-8">Rejoignez la communauté CHEZ MISS</p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstname" className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Prénom
                </label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Marie"
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
                />
              </div>
              <div>
                <label htmlFor="lastname" className="block text-sm text-[#f0c9e1]/70 mb-2">
                  Nom
                </label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Dupont"
                  className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-[#f0c9e1]/70 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="votre@email.com"
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
                className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm text-[#f0c9e1]/70 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg bg-[#080508]/50 border border-[#B79A5B]/20 text-[#f0c9e1] placeholder-[#f0c9e1]/30 focus:outline-none focus:border-[#B79A5B]/50 transition"
              />
            </div>

            <div className="flex items-start gap-2">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 mt-1 cursor-pointer accent-[#B79A5B]"
              />
              <label htmlFor="terms" className="text-xs text-[#f0c9e1]/60">
                J'accepte les conditions d'utilisation et la politique de confidentialité
              </label>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Inscription en développement");
                }}
              >
                <LiquidMetalButton label="Créer un compte" onClick={() => {}} />
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-[#B79A5B]/20">
            <p className="text-sm text-[#f0c9e1]/60 text-center">
              Vous avez déjà un compte ?{" "}
              <Link href="/signin" className="text-[#B79A5B] hover:text-[#B79A5B]/80 transition">
                Se connecter
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
